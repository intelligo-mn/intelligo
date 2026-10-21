/**
 * A server action is a public endpoint: its arguments arrive from the
 * client as whatever was sent, not as their declared types. Each action
 * here refuses a value the page never sends before a service sees it,
 * and still passes the values it does send.
 */

import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  updateConversationMetadata: vi.fn(),
  setConversationVisibility: vi.fn(),
  getConversation: vi.fn(),
  getMessage: vi.fn(),
  recordChatFeedback: vi.fn(),
  saveDocument: vi.fn(),
  onStepSubmit: vi.fn(),
  getState: vi.fn(),
  setStep: vi.fn(),
  summarizeExecutions: vi.fn(),
}));

vi.mock("next-intl/server", () => ({
  getTranslations: async () => (key: string) => key,
}));
vi.mock("next/cache", () => ({ revalidatePath: vi.fn() }));

vi.mock("@intelligo-dev/auth", () => ({
  requireWorkspace: async () => ({
    workspace: { id: "w-1" },
    user: { id: "u-1" },
    membership: { role: "owner" },
  }),
  isOnboardingServiceError: () => false,
}));
vi.mock("@intelligo-dev/chat", () => ({
  recordChatFeedback: mocks.recordChatFeedback,
  toUIMessages: (rows: Array<{ id: string; role: string; parts: string }>) =>
    rows.map((row) => ({
      id: row.id,
      role: row.role,
      parts: JSON.parse(row.parts) as unknown[],
    })),
}));
vi.mock("@intelligo-dev/core/documents", () => ({
  getDocumentVersions: vi.fn(),
  isDocumentServiceError: () => false,
  saveDocument: mocks.saveDocument,
}));
vi.mock("@intelligo-dev/core/conversations", () => ({
  conversationSharing: () => "workspace",
  deleteConversation: vi.fn(),
  getConversation: mocks.getConversation,
  getMessage: mocks.getMessage,
  getRecentMessages: vi.fn(),
  getVotes: vi.fn(),
  isConversationServiceError: () => false,
  listConversations: vi.fn(),
  renameConversation: vi.fn(),
  setConversationVisibility: mocks.setConversationVisibility,
  shareRef: (row: { id: string }) => row.id,
  updateConversationMetadata: mocks.updateConversationMetadata,
}));
vi.mock("@/lib/chat-server-config", () => ({ chatServerConfig: {} }));

vi.mock("@/lib/onboarding-profile", () => ({ profile: {} }));
vi.mock("@/lib/onboarding", () => ({
  onboarding: { getState: mocks.getState, setStep: mocks.setStep },
}));
vi.mock("@/lib/onboarding-steps", () => ({
  onboardingConfig: { onStepSubmit: mocks.onStepSubmit },
}));

vi.mock("@intelligo-dev/core/request-context", () => ({
  getRequestHeaders: () => new Headers(),
  resolveTimeZone: () => "UTC",
}));
vi.mock("@intelligo-dev/billing", () => ({
  getQuotaThresholds: vi.fn(),
  getTrialStatus: vi.fn(),
  getWorkspaceBilling: vi.fn(),
}));
vi.mock("@intelligo-dev/executions", () => ({
  listExecutions: vi.fn(),
  summarizeExecutions: mocks.summarizeExecutions,
  summarizeExecutionsByDay: vi.fn(),
}));
vi.mock("@/lib/plan-copy", () => ({ planName: () => "" }));

const chat = await import("../base/chat/actions");
const { advanceStep } = await import("../base/onboarding/actions");
const { getUsagePeriodSummary } = await import("../base/usage/actions");

/** A value that crossed the wire with a type the action does not declare. */
const forged = <T>(value: unknown) => value as T;

describe("server action inputs", () => {
  beforeEach(() => {
    for (const mock of Object.values(mocks)) mock.mockReset();
    mocks.getConversation.mockResolvedValue({ id: "c-1" });
    mocks.setConversationVisibility.mockResolvedValue({
      id: "c-1",
      visibility: "public",
    });
    mocks.recordChatFeedback.mockResolvedValue({ ok: true });
    mocks.saveDocument.mockImplementation(
      async (_actor: unknown, doc: { id: string; title: string }) => doc
    );
    mocks.summarizeExecutions.mockResolvedValue({
      totals: { totalTokens: 0, charged: [], count: 0 },
    });
  });

  it("pins a conversation with a boolean only", async () => {
    const refused = await chat.setConversationPinned(
      "c-1",
      forged<boolean>({ x: 1 })
    );
    expect(refused.success).toBe(false);
    expect(mocks.updateConversationMetadata).not.toHaveBeenCalled();

    expect((await chat.setConversationPinned("c-1", true)).success).toBe(true);
    expect(mocks.updateConversationMetadata).toHaveBeenCalledWith(
      { workspaceId: "w-1", userId: "u-1" },
      "c-1",
      { pinned: true }
    );
  });

  it("shares a conversation with a boolean only", async () => {
    const refused = await chat.setConversationShared(
      "c-1",
      forged<boolean>("yes")
    );
    expect(refused.success).toBe(false);
    expect(mocks.setConversationVisibility).not.toHaveBeenCalled();

    expect((await chat.setConversationShared("c-1", true)).success).toBe(true);
    expect(mocks.setConversationVisibility).toHaveBeenCalledWith(
      expect.anything(),
      "c-1",
      "public"
    );
  });

  it("records up, down or a withdrawn vote, and nothing else", async () => {
    const refused = await chat.voteMessage(
      "c-1",
      "m-1",
      forged<"up">("sideways")
    );
    expect(refused.success).toBe(false);
    expect(mocks.recordChatFeedback).not.toHaveBeenCalled();

    for (const vote of ["up", "down", null] as const) {
      expect((await chat.voteMessage("c-1", "m-1", vote)).success).toBe(true);
    }
    expect(mocks.recordChatFeedback).toHaveBeenCalledTimes(3);
  });

  it("saves a reply's stored text, not the text the client sends", async () => {
    mocks.getMessage.mockResolvedValue({
      id: "m-1",
      role: "assistant",
      parts: JSON.stringify([
        { type: "text", text: "# Stored reply" },
        { type: "tool-search", input: {} },
        { type: "text", text: "second paragraph" },
      ]),
    });

    const result = await chat.saveMessageAsArtifact(
      forged<{ conversationId: string; messageId: string }>({
        conversationId: "c-1",
        messageId: "m-1",
        content: "text the reply never said",
      })
    );

    expect(result).toEqual({
      success: true,
      data: { id: "m-1", title: "Stored reply" },
    });
    expect(mocks.getMessage).toHaveBeenCalledWith(
      { workspaceId: "w-1", userId: "u-1" },
      "c-1",
      "m-1"
    );
    expect(mocks.saveDocument).toHaveBeenCalledWith(expect.anything(), {
      id: "m-1",
      title: "Stored reply",
      content: "# Stored reply\n\nsecond paragraph",
      kind: "text",
      conversationId: "c-1",
    });
  });

  it("refuses to save a message the conversation does not hold as a reply", async () => {
    mocks.getMessage.mockResolvedValueOnce(null);
    const missing = await chat.saveMessageAsArtifact({
      conversationId: "c-1",
      messageId: "m-404",
    });
    expect(missing).toEqual({
      success: false,
      error: "actions.unstoredArtifact",
    });

    mocks.getMessage.mockResolvedValueOnce({
      id: "m-2",
      role: "user",
      parts: JSON.stringify([{ type: "text", text: "my own words" }]),
    });
    const user = await chat.saveMessageAsArtifact({
      conversationId: "c-1",
      messageId: "m-2",
    });
    expect(user).toEqual({
      success: false,
      error: "actions.invalidArtifact",
    });

    for (const params of [
      null,
      { messageId: "m-1" },
      { conversationId: "c-1", messageId: 7 },
      { conversationId: "c-1", messageId: "m-1", title: { x: 1 } },
    ]) {
      const result = await chat.saveMessageAsArtifact(
        forged<{ conversationId: string; messageId: string }>(params)
      );
      expect(result.success).toBe(false);
    }
    expect(mocks.saveDocument).not.toHaveBeenCalled();
  });

  it("saves an artifact version made of four strings", async () => {
    type Version = Parameters<typeof chat.saveArtifactVersion>[0];
    for (const params of [
      undefined,
      { documentId: "d-1", title: "T", kind: "text" },
      { documentId: "d-1", title: "T", kind: "text", content: { x: 1 } },
      { documentId: "d-1", title: ["T"], kind: "text", content: "body" },
      { documentId: "", title: "T", kind: "text", content: "body" },
    ]) {
      const result = await chat.saveArtifactVersion(forged<Version>(params));
      expect(result.success).toBe(false);
    }
    expect(mocks.saveDocument).not.toHaveBeenCalled();

    const ok = await chat.saveArtifactVersion({
      documentId: "d-1",
      title: "T",
      kind: "text",
      content: "body",
    });
    expect(ok.success).toBe(true);
    expect(mocks.saveDocument).toHaveBeenCalledWith(expect.anything(), {
      id: "d-1",
      title: "T",
      kind: "text",
      content: "body",
    });
  });

  it("advances onboarding with step ids and string answers only", async () => {
    type Move = Parameters<typeof advanceStep>[0];
    for (const move of [
      { from: 1 },
      { from: "a", to: 2 },
      { from: "a", to: null, answers: [] },
      { from: "a", to: null, answers: { name: { first: "x" } } },
      "a",
    ]) {
      const result = await advanceStep(forged<Move>(move));
      expect(result).toEqual({ success: false, error: "errors.generic" });
    }
    expect(mocks.onStepSubmit).not.toHaveBeenCalled();
    expect(mocks.setStep).not.toHaveBeenCalled();

    const forward = await advanceStep({
      from: "profile",
      to: "team",
      answers: { displayName: "Ada" },
    });
    expect(forward.success).toBe(true);
    expect(mocks.onStepSubmit).toHaveBeenCalledWith("profile", {
      displayName: "Ada",
    });
    expect(mocks.setStep).toHaveBeenCalledWith("team");

    expect((await advanceStep({ from: "team", to: "profile" })).success).toBe(
      true
    );
    expect(mocks.onStepSubmit).toHaveBeenCalledTimes(1);
  });

  it("resolves the caller before the consumer's onStepSubmit runs", async () => {
    mocks.getState.mockRejectedValue(new Error("Unauthorized"));
    const result = await advanceStep({
      from: "profile",
      to: "team",
      answers: { displayName: "Ada" },
    });
    expect(result).toEqual({ success: false, error: "errors.generic" });
    expect(mocks.onStepSubmit).not.toHaveBeenCalled();
    expect(mocks.setStep).not.toHaveBeenCalled();
  });

  it("summarizes a known period only", async () => {
    const refused = await getUsagePeriodSummary(forged<"7d">("1y"));
    expect(refused).toEqual({ success: false, error: "errors.loadSummary" });
    expect(mocks.summarizeExecutions).not.toHaveBeenCalled();

    expect((await getUsagePeriodSummary("30d")).success).toBe(true);
    expect(mocks.summarizeExecutions).toHaveBeenCalledTimes(1);
  });
});
