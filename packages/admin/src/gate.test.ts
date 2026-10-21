import { beforeEach, describe, expect, it, vi } from "vitest";

const requirePlatformAdmin = vi.fn();
vi.mock("server-only", () => ({}));
vi.mock("@intelligo-dev/auth", () => ({ requirePlatformAdmin }));
vi.mock("@intelligo-dev/core/db", () => ({ db: {} }));

const { countAuditEvents, listUsers, queryAuditEvents } =
  await import("./queries");
const { countUsageRecords, getRevenue } = await import("./usage");
const directory = await import("./directory");
const { listPayments } = await import("./payments");

describe("the cross-tenant read models", () => {
  beforeEach(() => {
    requirePlatformAdmin.mockReset();
    requirePlatformAdmin.mockRejectedValue(
      new Error("Insufficient permissions")
    );
  });

  it("refuse a caller who is not a platform admin before reading anything", async () => {
    await expect(listUsers()).rejects.toThrow("Insufficient permissions");
    await expect(getRevenue()).rejects.toThrow("Insufficient permissions");
    await expect(queryAuditEvents({})).rejects.toThrow(
      "Insufficient permissions"
    );
  });

  it.each([
    ["listUserSummaries", () => directory.listUserSummaries({ limit: 10 })],
    ["getWorkspace", () => directory.getWorkspace("ws-1")],
    ["listWorkspaceMembers", () => directory.listWorkspaceMembers("ws-1")],
    [
      "getSignupsByDay",
      () => directory.getSignupsByDay({ days: 7, timeZone: "UTC" }),
    ],
    [
      "resolveDisplayNames",
      () => directory.resolveDisplayNames({ userIds: ["u-1"] }),
    ],
    ["listPayments", () => listPayments({ limit: 10 })],
    ["countUsageRecords", () => countUsageRecords()],
    ["countAuditEvents", () => countAuditEvents({})],
  ])("%s refuses before reading", async (_name, read) => {
    // `db` is an empty object: reaching it would throw a TypeError.
    await expect(read()).rejects.toThrow("Insufficient permissions");
  });
});
