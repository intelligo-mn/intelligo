/**
 * Every route handler the reference app ships, called as another
 * workspace's owner and member with the victim's ids, unsigned, and
 * with a wrong cron secret, against real sessions and a real database.
 *
 * A handler takes a Web `Request` and reads the session through the
 * request context, so each call runs inside
 * `withRequestHeaders(request.headers, ...)` with the actor's cookie.
 * Every refusal must leave the victim's rows unchanged (`fingerprint`)
 * and answer with none of its data; a 500 is never a refusal.
 *
 * The folder starts with an underscore, so Next.js does not route it.
 * The first block needs no database: it discovers the handlers and
 * fails on one that has no case here.
 */

import { readdirSync, statSync } from "node:fs";
import path from "node:path";

import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";

import {
  closeFixtures,
  dropTenants,
  headersOf,
  leaks,
  pg,
  seedTenant,
  settledFingerprint,
  fingerprint,
  type Actor,
  type Tenant,
} from "@/actions/__tests__/tenant-fixtures";

vi.mock("next/cache", () => ({
  revalidatePath: () => undefined,
  revalidateTag: () => undefined,
}));

vi.mock("next/headers", () => ({
  cookies: async () => ({ get: () => undefined, getAll: () => [] }),
  headers: async () => new Headers(),
}));

// Messages are their keys, with the values a message interpolates.
vi.mock("next-intl/server", () => {
  const translator = (namespace?: string) =>
    Object.assign(
      (key: string, values?: Record<string, unknown>) =>
        `${namespace ? `${namespace}.` : ""}${key}${values ? JSON.stringify(values) : ""}`,
      {
        has: () => false,
        raw: (key: string) => key,
        rich: (key: string) => key,
      }
    );
  return {
    getTranslations: async (namespace?: string | { namespace?: string }) =>
      translator(
        typeof namespace === "string" ? namespace : namespace?.namespace
      ),
    getLocale: async () => "en",
  };
});

const DATABASE_URL = process.env.DATABASE_URL;
const d = DATABASE_URL ? describe : describe.skip;

vi.setConfig({ testTimeout: 120_000, hookTimeout: 120_000 });

const API_DIR = path.resolve(__dirname, "..");
const CRON_SECRET = "tenant-isolation-cron-secret-0123456789";
const ORIGIN = "http://localhost:4002";

const METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"];

type Handler = (request: Request) => Promise<Response>;

function routeFiles(dir: string, found: string[] = []): string[] {
  for (const name of readdirSync(dir).sort()) {
    if (name.startsWith("_")) continue;
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) routeFiles(full, found);
    else if (name === "route.ts") found.push(full);
  }
  return found;
}

/** Every exported method of every `route.ts` under `app/api`, by `path#METHOD`. */
async function loadRoutes(): Promise<Map<string, Handler>> {
  const found = new Map<string, Handler>();
  for (const file of routeFiles(API_DIR)) {
    const route = path
      .relative(API_DIR, path.dirname(file))
      .split(path.sep)
      .join("/");
    const mod = (await import(/* @vite-ignore */ file)) as Record<
      string,
      unknown
    >;
    for (const method of METHODS) {
      if (typeof mod[method] === "function") {
        found.set(`${route}#${method}`, mod[method] as Handler);
      }
    }
  }
  return found;
}

/**
 * What each handler is, and where it is exercised. `excluded` gives the
 * reason a handler has no case in this file.
 */
const ROUTE_CASES: Record<string, { covers: string } | { excluded: string }> = {
  "assistant#POST": { covers: "a request without a session is refused" },
  "auth/[...all]#GET": {
    excluded:
      "Better-Auth's own routes: set-active is covered by the actions tenant-isolation suite, the raw organization paths by raw-organization-paths.int.test.ts",
  },
  "auth/[...all]#POST": {
    excluded:
      "Better-Auth's own routes: set-active is covered by the actions tenant-isolation suite, the raw organization paths by raw-organization-paths.int.test.ts",
  },
  "chat#POST": {
    covers:
      "a turn on the victim's conversation, and a continuation of its reply",
  },
  "chat#DELETE": {
    covers: "deleting the victim's conversation, by query and by body",
  },
  "cron/maintenance#GET": {
    covers: "no bearer, a wrong one, one a character short",
  },
  "payments/local/settle#GET": {
    covers: "no bearer, a wrong one, one a character short",
  },
  "webhooks/local-payment#GET": {
    covers: "a callback naming the victim's unpaid invoice",
  },
  "webhooks/local-payment#POST": {
    covers: "a callback naming the victim's unpaid invoice",
  },
  "webhooks/stripe#POST": { covers: "no signature, and a forged one" },
};

describe("every route handler is classified", () => {
  it("has a case for every exported method, and every case names one", async () => {
    const routes = await loadRoutes();
    const unclassified = [...routes.keys()].filter(
      (key) => !(key in ROUTE_CASES)
    );
    const stale = Object.keys(ROUTE_CASES).filter((key) => !routes.has(key));
    expect(unclassified, "classify each new handler in ROUTE_CASES").toEqual(
      []
    );
    expect(stale, "these cases name no exported handler").toEqual([]);
  });
});

d("route handlers refuse another workspace's ids", () => {
  let routes: Map<string, Handler>;
  let victim: Tenant;
  let attacker: Tenant;
  let baseline: Record<string, string>;
  const tenants: Tenant[] = [];
  const suffix = Date.now();

  const attackers = () =>
    [
      ["owner", attacker.owner],
      ["member", attacker.member],
    ] as const;

  /** Calls a handler as `actor` (or nobody), and reads the whole answer. */
  async function send(
    key: string,
    actor: Actor | null,
    init: {
      url?: string;
      method?: string;
      body?: unknown;
      headers?: Record<string, string>;
    } = {}
  ): Promise<{ status: number; text: string }> {
    const headers = new Headers({
      origin: ORIGIN,
      ...(actor ? { cookie: headersOf(actor).get("cookie")! } : {}),
      ...(init.body !== undefined
        ? { "content-type": "application/json" }
        : {}),
      ...init.headers,
    });
    const request = new Request(
      init.url ?? `${ORIGIN}/api/${key.split("#")[0]}`,
      {
        method: init.method ?? key.split("#")[1],
        headers,
        ...(init.body !== undefined
          ? {
              body:
                typeof init.body === "string"
                  ? init.body
                  : JSON.stringify(init.body),
            }
          : {}),
      }
    );
    const { withRequestHeaders } =
      await import("@intelligo-dev/core/request-context");
    const response = await withRequestHeaders(request.headers, () =>
      routes.get(key)!(request)
    );
    return { status: response.status, text: await response.text() };
  }

  async function expectRefused(
    label: string,
    answer: { status: number; text: string },
    statuses: number[],
    args: unknown[] = []
  ) {
    expect(
      statuses,
      `${label} answered ${answer.status}: ${answer.text.slice(0, 300)}`
    ).toContain(answer.status);
    expect(
      leaks(answer.text, victim, args),
      `${label} answered with the victim's data`
    ).toEqual([]);
    expect(
      await fingerprint(victim),
      `${label} changed the victim's rows`
    ).toEqual(baseline);
  }

  const userTurn = (conversationId: string, text = "hello") => ({
    id: conversationId,
    trigger: "submit-message",
    messages: [
      {
        id: crypto.randomUUID(),
        role: "user",
        parts: [{ type: "text", text }],
      },
    ],
  });

  beforeAll(async () => {
    vi.stubEnv("GOOGLE_GENERATIVE_AI_API_KEY", "");
    vi.stubEnv("RESEND_API_KEY", "");
    vi.stubEnv("EMAIL_PROVIDER", "");
    vi.stubEnv("PLATFORM_ADMIN_EMAILS", "");
    vi.stubEnv("PAYMENT_MODE", "mock");
    vi.stubEnv("CRON_SECRET", CRON_SECRET);
    vi.stubEnv("NEXT_PUBLIC_APP_URL", ORIGIN);
    vi.resetModules();

    const { composeIntelligo, seedIntelligo } = await import("@/lib/intelligo");
    composeIntelligo();
    await seedIntelligo();
    routes = await loadRoutes();

    victim = await seedTenant(`tr-victim-${suffix}`);
    attacker = await seedTenant(`tr-attacker-${suffix}`);
    tenants.push(victim, attacker);
    baseline = await settledFingerprint(victim);
  });

  afterAll(async () => {
    vi.unstubAllEnvs();
    await dropTenants(tenants).catch(() => undefined);
    await closeFixtures();
  });

  it("the attacker's own conversation takes a turn and can be deleted: the refusals below are about whose it is", async () => {
    const own = crypto.randomUUID();
    const turn = await send("chat#POST", attacker.owner, {
      body: userTurn(own, `${attacker.canary} turn`),
    });
    expect(turn.status, turn.text.slice(0, 300)).toBe(200);
    expect(turn.text).toContain(attacker.canary);

    const deleted = await send("chat#DELETE", attacker.owner, {
      url: `${ORIGIN}/api/chat?id=${own}`,
    });
    expect(deleted.status).toBe(200);
    const { rows } = await (
      await pg()
    ).query(`SELECT 1 FROM conversations WHERE id = $1`, [own]);
    expect(rows).toEqual([]);
    expect(await fingerprint(victim)).toEqual(baseline);
  });

  it("a turn on the victim's conversation is refused", async () => {
    for (const [role, actor] of attackers()) {
      await expectRefused(
        `chat POST as the attacker's ${role}`,
        await send("chat#POST", actor, {
          body: userTurn(victim.conversationId),
        }),
        [403, 404],
        [victim.conversationId]
      );
    }
  });

  it("a continuation naming the victim's reply is refused", async () => {
    for (const [role, actor] of attackers()) {
      const body = {
        id: attacker.conversationId,
        trigger: "submit-message",
        messageId: victim.assistantMessageId,
        messages: [
          {
            id: crypto.randomUUID(),
            role: "user",
            parts: [{ type: "text", text: "hello" }],
          },
          {
            id: victim.assistantMessageId,
            role: "assistant",
            parts: [{ type: "text", text: "continued" }],
          },
        ],
      };
      await expectRefused(
        `chat continuation as the attacker's ${role}`,
        await send("chat#POST", actor, { body }),
        // The stored message is looked up in the caller's conversation,
        // finds nothing, and the turn is refused as an invalid body.
        [400],
        [victim.assistantMessageId]
      );
    }
  });

  it("deleting the victim's conversation is refused, by query and by body", async () => {
    for (const [role, actor] of attackers()) {
      await expectRefused(
        `chat DELETE ?id as the attacker's ${role}`,
        await send("chat#DELETE", actor, {
          url: `${ORIGIN}/api/chat?id=${victim.conversationId}`,
        }),
        [403, 404],
        [victim.conversationId]
      );
      await expectRefused(
        `chat DELETE body as the attacker's ${role}`,
        await send("chat#DELETE", actor, {
          body: { id: victim.conversationId },
        }),
        [403, 404],
        [victim.conversationId]
      );
    }
  });

  it("the assistant refuses a request without a session", async () => {
    await expectRefused(
      "assistant POST without a session",
      await send("assistant#POST", null, { body: { prompt: "hello" } }),
      [401, 403]
    );
  });

  it("the cron routes refuse no bearer, a wrong one, and one a character short", async () => {
    for (const key of ["cron/maintenance#GET", "payments/local/settle#GET"]) {
      for (const [label, authorization] of [
        ["no bearer", undefined],
        ["a wrong bearer", `Bearer ${"x".repeat(CRON_SECRET.length)}`],
        ["a bearer a character short", `Bearer ${CRON_SECRET.slice(0, -1)}`],
      ] as const) {
        await expectRefused(
          `${key} with ${label}`,
          await send(key, null, {
            ...(authorization ? { headers: { authorization } } : {}),
          }),
          [401, 403]
        );
      }
    }
    const { rows } = await (
      await pg()
    ).query(`SELECT status, fulfilled_at FROM payments WHERE id = $1`, [
      victim.paymentId,
    ]);
    expect(rows[0]).toMatchObject({ status: "pending", fulfilled_at: null });
  });

  it("a local-payment callback naming the victim's unpaid invoice grants nothing", async () => {
    for (const key of [
      "webhooks/local-payment#GET",
      "webhooks/local-payment#POST",
    ]) {
      for (const invoice of [victim.invoiceId, victim.paymentId]) {
        const answer = await send(key, null, {
          url: `${ORIGIN}/api/webhooks/local-payment?invoice=${encodeURIComponent(invoice)}`,
        });
        await expectRefused(
          `${key} ?invoice=${invoice}`,
          answer,
          [200],
          [invoice]
        );
      }
    }
    const { rows } = await (
      await pg()
    ).query(`SELECT status, fulfilled_at FROM payments WHERE id = $1`, [
      victim.paymentId,
    ]);
    expect(rows[0]).toMatchObject({ status: "pending", fulfilled_at: null });
  });

  it("the Stripe webhook refuses a missing and a forged signature, and records nothing", async () => {
    const count = async () =>
      Number(
        (
          await (
            await pg()
          ).query<{ n: string }>(`SELECT count(*) AS n FROM finance_events`)
        ).rows[0]!.n
      );
    const before = await count();
    const event = JSON.stringify({
      id: `evt_${suffix}`,
      type: "checkout.session.completed",
      data: {
        object: {
          metadata: {
            workspaceId: victim.workspaceId,
            userId: victim.owner.userId,
          },
        },
      },
    });
    for (const [label, signature] of [
      ["no signature", undefined],
      [
        "a forged signature",
        `t=${Math.floor(Date.now() / 1000)},v1=${"0".repeat(64)}`,
      ],
    ] as const) {
      await expectRefused(
        `stripe webhook with ${label}`,
        await send("webhooks/stripe#POST", null, {
          body: event,
          ...(signature ? { headers: { "stripe-signature": signature } } : {}),
        }),
        [400]
      );
    }
    expect(await count()).toBe(before);
  });
});
