/**
 * Where a turn's stream fails, as a property: whichever step the
 * provider refuses or breaks off, the steps it already billed are
 * settled, and the hold is released only when nothing was spent.
 *
 * The transport fires both terminals on purpose — the run's own finish
 * and the stream's error can each settle — and the execution boundary
 * keeps the first. The fake run here does the same, so the assertions
 * are on the outcome that took effect.
 */

import fc from "fast-check";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { jsonSchema, tool, type UIMessage } from "ai";
import { MockLanguageModelV3, simulateReadableStream } from "ai/test";

import type { Executions } from "@intelligo-dev/executions";

import type { ChatServerConfig } from "./config";
import { createChatHandler } from "./handler";

const mocks = vi.hoisted(() => ({
  requireWorkspace: vi.fn(),
  getWorkspaceBilling: vi.fn(),
  checkRateLimit: vi.fn(),
  hasFeature: vi.fn(),
  estimateQuota: vi.fn(),
}));

vi.mock("@intelligo-dev/auth", () => ({
  requireWorkspace: mocks.requireWorkspace,
}));
vi.mock("@intelligo-dev/billing", () => ({
  getWorkspaceBilling: mocks.getWorkspaceBilling,
  checkRateLimit: mocks.checkRateLimit,
  hasFeature: mocks.hasFeature,
  estimateQuota: mocks.estimateQuota,
}));
vi.mock("@intelligo-dev/core/logger", () => ({
  createLogger: () => ({
    debug: () => {},
    info: () => {},
    warn: () => {},
    error: () => {},
  }),
}));

type Row = { id: string; userId: string; title: string | null };

const store = vi.hoisted(() => ({
  rows: new Map<string, { id: string; userId: string; title: string | null }>(),
}));

class FakeConversationServiceError extends Error {
  constructor(public code: string) {
    super(code);
  }
}

vi.mock("@intelligo-dev/core/conversations", () => ({
  isConversationServiceError: (e: unknown) =>
    e instanceof FakeConversationServiceError,
  createConversation: async (
    actor: { workspaceId: string; userId: string },
    params: Row
  ) => {
    const row = { ...params, ...actor, title: params.title ?? null };
    store.rows.set(row.id, row);
    return row;
  },
  getConversation: async (_actor: unknown, id: string) => {
    const row = store.rows.get(id);
    if (!row) throw new FakeConversationServiceError("not_found");
    return row;
  },
  getMessages: async () => [],
  getMessage: async () => null,
  getMessagesByIds: async () => [],
  upsertMessages: async () => {},
  deleteTrailingMessages: async () => ({ deletedCount: 0 }),
  deleteConversation: async () => {},
  renameConversation: async (_actor: unknown, id: string, title: string) => {
    const row = store.rows.get(id)!;
    row.title = title;
    return row;
  },
  updateConversationMetadata: async () => undefined,
}));

vi.mock("@intelligo-dev/core/attachments", () => ({
  getAttachments: async () => [],
  attachToConversation: async () => undefined,
}));

vi.mock("@intelligo-dev/core/storage", () => ({
  getStorageAdapter: () => ({ getSignedUrl: async (key: string) => key }),
}));

const MODEL_ID = "google/gemini-2.5-flash";
const CONVERSATION_ID = "0f1e2d3c-4b5a-4f6e-8d7c-9b8a7f6e5d4c";

type Usage = {
  inputTokens?: number;
  outputTokens?: number;
  totalTokens?: number;
};

type Outcome = { kind: "complete"; usage: Usage } | { kind: "fail" };

/**
 * A run handle that keeps the first terminal call, as the lifecycle's
 * compare-and-swap does, and records every progress write.
 */
function fakeRun() {
  const outcomes: Outcome[] = [];
  const progress: Usage[] = [];
  const handle = {
    id: "e-1",
    requestId: "req-1",
    allowed: true,
    usingTrialCredits: false,
    complete: async ({ usage = {} }: { usage?: Usage } = {}) => {
      outcomes.push({ kind: "complete", usage });
    },
    fail: async () => {
      outcomes.push({ kind: "fail" });
    },
    progress: async ({ usage = {} }: { usage?: Usage }) => {
      progress.push(usage);
    },
  };
  const executions = {
    begin: async () => handle,
  } as unknown as Executions;
  return { executions, outcomes, progress };
}

type Step = { input: number; output: number; text: string[] };

/** How the turn's last model call ends. */
type End =
  | { kind: "stop"; step: Step }
  | { kind: "refused" }
  | { kind: "broken"; text: string[] };

const text = fc.array(fc.string({ minLength: 1, maxLength: 30 }), {
  maxLength: 3,
});
const step: fc.Arbitrary<Step> = fc.record({
  input: fc.integer({ min: 1, max: 5_000 }),
  output: fc.integer({ min: 0, max: 2_000 }),
  text,
});
const end: fc.Arbitrary<End> = fc.oneof(
  step.map((s) => ({ kind: "stop" as const, step: s })),
  fc.constant({ kind: "refused" as const }),
  text.map((t) => ({ kind: "broken" as const, text: t }))
);

/** Up to three steps that call a tool, then the step that ends the turn. */
const scenario = fc.record({
  finished: fc.array(step, { maxLength: 3 }),
  end,
});

const usageOf = (input: number, output: number) => ({
  inputTokens: {
    total: input,
    noCache: undefined,
    cacheRead: undefined,
    cacheWrite: undefined,
  },
  outputTokens: { total: output, text: output, reasoning: undefined },
});

function textChunks(parts: string[], id: string) {
  if (parts.length === 0) return [];
  return [
    { type: "text-start", id },
    ...parts.map((delta) => ({ type: "text-delta", id, delta })),
    { type: "text-end", id },
  ];
}

function modelFor({ finished, end }: { finished: Step[]; end: End }) {
  let call = 0;
  return new MockLanguageModelV3({
    provider: "scripted",
    modelId: MODEL_ID,
    doStream: async () => {
      const n = call++;
      const done = finished[n];
      let chunks: unknown[];
      if (done) {
        chunks = [
          ...textChunks(done.text, `t-${n}`),
          {
            type: "tool-call",
            toolCallId: `c-${n}`,
            toolName: "ping",
            input: JSON.stringify({ n }),
          },
          {
            type: "finish",
            finishReason: { unified: "tool-calls", raw: undefined },
            usage: usageOf(done.input, done.output),
          },
        ];
      } else if (end.kind === "refused") {
        throw new Error("provider overloaded");
      } else if (end.kind === "broken") {
        chunks = [
          ...textChunks(end.text, `t-${n}`).filter(
            (c) => c.type !== "text-end"
          ),
          { type: "error", error: new Error("connection reset") },
        ];
      } else {
        chunks = [
          ...textChunks(end.step.text, `t-${n}`),
          {
            type: "finish",
            finishReason: { unified: "stop", raw: undefined },
            usage: usageOf(end.step.input, end.step.output),
          },
        ];
      }
      return {
        stream: simulateReadableStream({
          chunkDelayInMs: 0,
          chunks: [
            { type: "stream-start", warnings: [] },
            ...chunks,
          ] as never[],
        }),
      };
    },
  });
}

function config(
  executions: Executions,
  model: MockLanguageModelV3
): ChatServerConfig {
  return {
    executions,
    model: { defaultId: MODEL_ID, resolve: () => model },
    agent: {
      systemPrompt: "Use tools.",
      tools: {
        ping: tool({
          description: "ping",
          inputSchema: jsonSchema<{ n: number }>({
            type: "object",
            properties: { n: { type: "number" } },
            required: ["n"],
          }),
          execute: async () => ({ ok: true }),
        }),
      },
    },
  };
}

function turn(): Request {
  const message: UIMessage = {
    id: "m-user-1",
    role: "user",
    parts: [{ type: "text", text: "go" }],
  };
  return new Request("http://app.test/api/chat", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ id: CONVERSATION_ID, messages: [message] }),
  });
}

/** Lets the callbacks the SDK does not await land. */
async function flush(): Promise<void> {
  for (let i = 0; i < 5; i++) await new Promise((r) => setTimeout(r, 0));
}

const total = (u: Usage) =>
  u.totalTokens ?? (u.inputTokens ?? 0) + (u.outputTokens ?? 0);

beforeEach(() => {
  store.rows.clear();
  mocks.requireWorkspace.mockResolvedValue({
    workspace: { id: "ws-1" },
    user: { id: "u-1" },
  });
  mocks.getWorkspaceBilling.mockResolvedValue({ plan: { slug: "free" } });
  mocks.checkRateLimit.mockResolvedValue({
    allowed: true,
    limit: 10,
    remaining: 9,
    resetAt: new Date(0),
  });
  mocks.hasFeature.mockResolvedValue(true);
});

afterEach(() => {
  vi.clearAllMocks();
});

/**
 * Each case streams a whole turn, tens of milliseconds, so the timeout
 * follows the number of cases `FC_RUNS` asks for.
 */
const TIMEOUT_MS = 10_000 + (fc.readConfigureGlobal().numRuns ?? 100) * 100;

describe("a turn's stream failing at any point", () => {
  it(
    "settles what the finished steps spent, and releases only when nothing was",
    { timeout: TIMEOUT_MS },
    async () => {
      await fc.assert(
        fc.asyncProperty(scenario, async (plan) => {
          store.rows.clear();
          const run = fakeRun();
          const { POST } = createChatHandler(
            config(run.executions, modelFor(plan))
          );
          const response = await POST(turn());
          expect(response.status).toBe(200);
          await response.text();
          await vi.waitFor(() =>
            expect(run.outcomes.length).toBeGreaterThan(0)
          );
          await flush();

          const billed = [
            ...plan.finished,
            ...(plan.end.kind === "stop" ? [plan.end.step] : []),
          ].reduce((sum, s) => sum + s.input + s.output, 0);
          const answered =
            plan.finished.length > 0 ||
            plan.end.kind === "stop" ||
            (plan.end.kind === "broken" && plan.end.text.length > 0);

          // (1) One outcome takes effect: the first terminal call.
          const [effective] = run.outcomes;
          expect(effective).toBeDefined();

          if (answered) {
            // (2) Billed steps are settled, whatever failed after them.
            expect(effective!.kind).toBe("complete");
            if (effective!.kind === "complete") {
              expect(total(effective!.usage)).toBeGreaterThanOrEqual(billed);
            }
          }
          // (3) The hold is released for nothing only when nothing was spent.
          if (effective!.kind === "fail") expect(answered).toBe(false);

          // (4) Progress written per finished step never goes backwards.
          const written = run.progress.map(total);
          for (let i = 1; i < written.length; i++) {
            expect(written[i]).toBeGreaterThanOrEqual(written[i - 1]!);
          }
        })
      );
    }
  );
});
