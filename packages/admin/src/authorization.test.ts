/**
 * Two contracts matter here, and they are deliberately opposite:
 *
 *  - reading must not be blocked by a failed audit write (a support
 *    engineer mid-incident should not be locked out by a logging
 *    problem);
 *  - a destructive or impersonating action must be refused if it
 *    cannot be recorded, because "who did this" has to be answerable
 *    afterwards.
 */

import { describe, it, expect, vi, beforeEach } from "vitest";

const mocks = vi.hoisted(() => {
  class AuthGuardError extends Error {}
  return {
    AuthGuardError,
    requirePlatformAdmin: vi.fn(),
    recordAuditEvent: vi.fn(),
    recordAuditEventOrThrow: vi.fn(),
  };
});

vi.mock("@intelligo-dev/auth", () => ({
  requirePlatformAdmin: mocks.requirePlatformAdmin,
  isAuthGuardError: (error: unknown) => error instanceof mocks.AuthGuardError,
}));

vi.mock("@intelligo-dev/audit", () => ({
  recordAuditEvent: mocks.recordAuditEvent,
  recordAuditEventOrThrow: mocks.recordAuditEventOrThrow,
}));

vi.mock("server-only", () => ({}));

import {
  isPlatformAdmin,
  requireAdmin,
  requireAdminOrRefuse,
} from "./authorization";

beforeEach(() => {
  vi.clearAllMocks();
  mocks.requirePlatformAdmin.mockResolvedValue({
    user: { id: "u-admin", email: "admin@example.test" },
  });
  mocks.recordAuditEvent.mockResolvedValue(undefined);
  mocks.recordAuditEventOrThrow.mockResolvedValue(undefined);
});

describe("requireAdmin", () => {
  it("gates on the platform admin check, not a workspace role", async () => {
    // Workspace `owner` is per-tenant and every self-serve signup has one.
    await requireAdmin("admin.overview.viewed");

    expect(mocks.requirePlatformAdmin).toHaveBeenCalledTimes(1);
  });

  it("refuses when the caller is not a platform admin", async () => {
    mocks.requirePlatformAdmin.mockRejectedValue(
      new Error("Insufficient permissions")
    );

    await expect(requireAdmin("admin.overview.viewed")).rejects.toThrow(
      "Insufficient permissions"
    );
    expect(mocks.recordAuditEvent).not.toHaveBeenCalled();
  });

  it("records the access as a support action against the tenant", async () => {
    await requireAdmin("admin.workspace.viewed", {
      kind: "workspace",
      id: "ws-1",
      workspaceId: "ws-1",
    });

    expect(mocks.recordAuditEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        actorKind: "support",
        actorId: "u-admin",
        action: "admin.workspace.viewed",
        resourceKind: "workspace",
        resourceId: "ws-1",
        workspaceId: "ws-1",
      })
    );
  });

  it("still authorizes a read when the audit write fails", async () => {
    // recordAuditEvent swallows its own failures; this asserts the
    // gate does not add one back.
    mocks.recordAuditEvent.mockResolvedValue(undefined);

    await expect(requireAdmin("admin.overview.viewed")).resolves.toMatchObject({
      userId: "u-admin",
    });
  });
});

describe("isPlatformAdmin", () => {
  it("answers true for a platform admin and records no visit", async () => {
    await expect(isPlatformAdmin()).resolves.toBe(true);
    expect(mocks.recordAuditEvent).not.toHaveBeenCalled();
    expect(mocks.recordAuditEventOrThrow).not.toHaveBeenCalled();
  });

  it("answers false when the guard refuses the caller", async () => {
    mocks.requirePlatformAdmin.mockRejectedValue(
      new mocks.AuthGuardError("Insufficient permissions")
    );
    await expect(isPlatformAdmin()).resolves.toBe(false);
  });

  it("throws any other failure rather than calling it a refusal", async () => {
    mocks.requirePlatformAdmin.mockRejectedValue(new Error("db down"));
    await expect(isPlatformAdmin()).rejects.toThrow("db down");
  });

  it("still records an allowlist promotion it made", async () => {
    mocks.requirePlatformAdmin.mockResolvedValue({
      user: { id: "u-admin", email: "admin@example.test" },
      promoted: true,
    });
    await isPlatformAdmin();
    expect(mocks.recordAuditEvent).toHaveBeenCalledTimes(1);
    expect(mocks.recordAuditEvent).toHaveBeenCalledWith(
      expect.objectContaining({ action: "admin.platform_admin.granted" })
    );
  });
});

describe("an allowlist promotion", () => {
  it("is recorded when this request made it, and not otherwise", async () => {
    mocks.requirePlatformAdmin.mockResolvedValue({
      user: { id: "u-admin", email: "admin@example.test" },
      promoted: true,
    });
    await requireAdmin("admin.overview.viewed");
    expect(mocks.recordAuditEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        action: "admin.platform_admin.granted",
        resourceId: "u-admin",
        metadata: { email: "admin@example.test", via: "allowlist" },
      })
    );

    vi.clearAllMocks();
    mocks.requirePlatformAdmin.mockResolvedValue({
      user: { id: "u-admin", email: "admin@example.test" },
      promoted: false,
    });
    await requireAdmin("admin.overview.viewed");
    expect(mocks.recordAuditEvent).not.toHaveBeenCalledWith(
      expect.objectContaining({ action: "admin.platform_admin.granted" })
    );
  });
});

describe("requireAdminOrRefuse", () => {
  it("uses the throwing audit write", async () => {
    await requireAdminOrRefuse("admin.workspace.impersonated", {
      kind: "workspace",
      id: "ws-1",
      workspaceId: "ws-1",
    });

    expect(mocks.recordAuditEventOrThrow).toHaveBeenCalledTimes(1);
    expect(mocks.recordAuditEvent).not.toHaveBeenCalled();
  });

  it("refuses the action when it cannot be recorded", async () => {
    // Acting as a customer with no trail of who did it is the one
    // thing this package must not allow.
    mocks.recordAuditEventOrThrow.mockRejectedValue(new Error("audit down"));

    await expect(
      requireAdminOrRefuse("admin.workspace.impersonated", {
        kind: "workspace",
        id: "ws-1",
      })
    ).rejects.toThrow("audit down");
  });

  it("checks authorization before writing anything", async () => {
    mocks.requirePlatformAdmin.mockRejectedValue(
      new Error("Insufficient permissions")
    );

    await expect(
      requireAdminOrRefuse("admin.workspace.impersonated", {
        kind: "workspace",
      })
    ).rejects.toThrow("Insufficient permissions");
    expect(mocks.recordAuditEventOrThrow).not.toHaveBeenCalled();
  });
});
