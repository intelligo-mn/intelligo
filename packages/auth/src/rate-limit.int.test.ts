/**
 * The auth rate limits hold over HTTP: a client's fourth sign-in attempt
 * within the window answers 429. Better-Auth enables its limiter only in
 * production and reads NODE_ENV when it loads, so the environment is set
 * before the server is imported.
 *
 * Runs when TEST_PG_URL is set (the limiter counts in the database).
 */

import { randomUUID } from "node:crypto";
import { afterEach, describe, expect, it, vi } from "vitest";

import { AUTH_RATE_LIMIT_RULES } from "./request-hardening";

const d = process.env.TEST_PG_URL ? describe : describe.skip;

/**
 * A random address in the IPv6 documentation range, so counts a previous
 * run left in the database do not carry over. Better-Auth counts an IPv6
 * client by its /64 prefix, which holds 32 of the random bits.
 */
function freshAddress(): string {
  const hex = randomUUID().replace(/-/g, "");
  const groups = hex.slice(0, 24).match(/.{4}/g) ?? [];
  return ["2001", "db8", ...groups].join(":");
}

d("auth rate limits over HTTP (integration)", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("answers 429 to the attempt past the sign-in limit", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.resetModules();
    const { auth } = await import("./server");
    const origin = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:4000";
    const ip = freshAddress();
    const signIn = () =>
      auth.handler(
        new Request(`${origin}/api/auth/sign-in/email`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
            origin,
            "x-forwarded-for": ip,
          },
          body: JSON.stringify({
            email: `${randomUUID()}@example.com`,
            password: "not-the-password",
          }),
        })
      );

    const { max } = AUTH_RATE_LIMIT_RULES["/sign-in/*"];
    for (let i = 0; i < max; i++) {
      expect((await signIn()).status).not.toBe(429);
    }
    expect((await signIn()).status).toBe(429);
  });
});
