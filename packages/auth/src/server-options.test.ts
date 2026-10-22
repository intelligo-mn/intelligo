/**
 * The Better-Auth instance is built from the named limits in
 * `request-hardening.ts`: the rate-limit rules, the session lifetime and
 * the impersonation length reach its options as those same objects.
 * Better-Auth's own defaults use the same numbers, so only reading the
 * options shows that the constants, rather than the defaults, are what it
 * runs with. Building the instance does not open a database connection.
 */

import { afterEach, describe, expect, it, vi } from "vitest";

afterEach(() => {
  vi.unstubAllEnvs();
});

/** The server and the constants from one module graph, so identity holds. */
async function load() {
  vi.stubEnv(
    "DATABASE_URL",
    process.env.DATABASE_URL ?? "postgres://user:pass@localhost:5432/db"
  );
  vi.stubEnv("BETTER_AUTH_SECRET", "a".repeat(32));
  vi.resetModules();
  const { auth } = await import("./server");
  const limits = await import("./request-hardening");
  return { options: auth.options, limits };
}

describe("auth server options", () => {
  it("rate-limits with the named rules and default", async () => {
    const { options, limits } = await load();
    expect(options.rateLimit?.customRules).toBe(limits.AUTH_RATE_LIMIT_RULES);
    expect(options.rateLimit?.window).toBe(limits.AUTH_RATE_LIMIT.window);
    expect(options.rateLimit?.max).toBe(limits.AUTH_RATE_LIMIT.max);
  });

  it("keeps sessions for the named lifetime", async () => {
    const { options, limits } = await load();
    expect(options.session).toBe(limits.SESSION_LIFETIME);
  });

  it("ends an impersonation after the named length", async () => {
    const { options, limits } = await load();
    const adminPlugin = options.plugins?.find(
      (plugin) => plugin.id === "admin"
    );
    expect(adminPlugin?.options).toMatchObject({
      impersonationSessionDuration: limits.IMPERSONATION_SECONDS,
    });
  });
});
