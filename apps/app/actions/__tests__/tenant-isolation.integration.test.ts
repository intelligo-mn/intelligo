/**
 * Every server action the reference app ships, called by another
 * workspace's owner and member with the victim's ids, against real
 * sessions and a real database.
 *
 * A call passes when it is refused (a throw, `success: false`,
 * `ok: false` or null) by the service it reached, or answers with
 * something that is right for an id the caller does not own; in both
 * cases the answer carries none of the victim's data, and every row
 * reachable from the victim is unchanged (`fingerprint`).
 *
 * The first block needs no database: it discovers the actions and fails
 * on one that has no case here, so a new action cannot ship unclassified.
 * The second runs where DATABASE_URL is set, against the pushed schema.
 */

import { readdirSync } from "node:fs";
import path from "node:path";

import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";

import {
  activeWorkspaceOf,
  asActor,
  closeFixtures,
  dropTenants,
  fingerprint,
  headersOf,
  leaks,
  pg,
  seedTenant,
  settledFingerprint,
  tenantIds,
  type Actor,
  type Tenant,
} from "./tenant-fixtures";

vi.mock("next/cache", () => ({
  revalidatePath: () => undefined,
  revalidateTag: () => undefined,
}));

vi.mock("next/headers", () => ({
  cookies: async () => ({ get: () => undefined, getAll: () => [] }),
  headers: async () => new Headers(),
}));

// A redirect is a refusal the action signals by throwing.
vi.mock("next/navigation", () => ({
  redirect: (href: string) => {
    throw new Error(`redirect:${href}`);
  },
  notFound: () => {
    throw new Error("notFound");
  },
}));

vi.mock("@/i18n/navigation", () => ({
  redirect: ({ href }: { href: string }) => {
    throw new Error(`redirect:${href}`);
  },
}));

// Messages are their keys, with any values a message would interpolate,
// so a victim's data passed into a message still shows in the answer.
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
    getFormatter: async () => ({
      number: (value: number) => String(value),
      dateTime: (value: Date) => value.toISOString(),
      relativeTime: (value: Date) => value.toISOString(),
    }),
  };
});

const DATABASE_URL = process.env.DATABASE_URL;
const d = DATABASE_URL ? describe : describe.skip;

vi.setConfig({ testTimeout: 120_000, hookTimeout: 120_000 });

const ACTIONS_DIR = path.resolve(__dirname, "..");

type Action = (...args: unknown[]) => Promise<unknown>;
type Modules = Record<string, Record<string, Action>>;

/** Every exported function of every file in `actions/`, by `file#export`. */
async function loadActions(): Promise<Map<string, Action>> {
  const found = new Map<string, Action>();
  const files = readdirSync(ACTIONS_DIR)
    .filter((name) => name.endsWith(".ts"))
    .sort();
  for (const file of files) {
    const mod = (await import(
      /* @vite-ignore */ path.join(ACTIONS_DIR, file)
    )) as Modules[string];
    for (const [name, value] of Object.entries(mod)) {
      if (typeof value === "function") {
        found.set(`${file.replace(/\.ts$/, "")}#${name}`, value);
      }
    }
  }
  return found;
}

/** One call of a swap case, and what besides a refusal is a right answer. */
type Call = {
  args: unknown[];
  /** What the refusal says: proof the call reached the service that refused it. */
  refusal?: RegExp;
  /** An answer that is not a refusal and is still right for an id the caller does not own. */
  allow?: (value: unknown) => boolean;
};

type Case =
  /** Takes ids: called with the victim's. */
  | { kind: "swap"; calls: (victim: Tenant) => Call[] }
  /** Acts on the caller alone; called as the attacker, its answer must not carry the victim's data. */
  | {
      kind: "self";
      why: string;
      args?: (self: Tenant) => unknown[];
      /** Ends the caller's membership or account: run once, on a throwaway tenant. */
      destructive?: true;
      /** Writes what it is given onto the caller, so a victim id passed in comes back legitimately. */
      noSweep?: string;
    }
  /** Readable without a workspace; tested on its own below. */
  | { kind: "public"; why: string }
  /** A platform admin's: anyone else is refused before anything is read or written. */
  | { kind: "platform"; calls: (victim: Tenant) => unknown[][] };

const REASON = "tenant isolation suite";

function form(fields: Record<string, string>): FormData {
  const data = new FormData();
  for (const [key, value] of Object.entries(fields)) data.set(key, value);
  return data;
}

/**
 * The team service's refusals. A member id from another workspace is
 * refused by Better-Auth's organization plugin, which the service
 * answers as `provider_error`.
 */
const TEAM_REFUSAL = /forbidden|invitationNotFound|providerError/;

const succeeded = (value: unknown) =>
  (value as { success?: unknown } | null)?.success === true;

const CASES: Record<string, Case> = {
  "account-restore#restoreAccount": {
    kind: "self",
    why: "restores the caller's own account",
  },

  "admin-console#grantPlanAction": {
    kind: "platform",
    calls: (v) => [
      [
        null,
        form({
          workspaceId: v.workspaceId,
          planSlug: "pro",
          days: "30",
          reason: REASON,
        }),
      ],
    ],
  },
  "admin-console#creditAction": {
    kind: "platform",
    calls: (v) => [
      [
        null,
        form({
          workspaceId: v.workspaceId,
          amount: "10",
          reason: REASON,
          requestId: crypto.randomUUID(),
        }),
      ],
    ],
  },
  "admin-console#impersonateAction": {
    kind: "platform",
    calls: (v) => [[null, form({ userId: v.owner.userId, reason: REASON })]],
  },
  "admin-console#updateBillingSettingsAction": {
    kind: "platform",
    calls: () => [
      [null, form({ currency: "EUR", usdRate: "2", marginPercent: "10" })],
    ],
  },

  "billing#createCheckoutSession": {
    kind: "self",
    why: "checks out the caller's own workspace",
    args: () => [{ planSlug: "pro", interval: "monthly" }],
  },
  "billing#createCreditPurchaseSession": {
    kind: "self",
    why: "buys credit for the caller's own workspace",
    args: () => [{ bundleId: "credits-10" }],
  },
  "billing#createPortalSession": {
    kind: "self",
    why: "opens the caller's own workspace's billing portal",
  },

  "chat#listConversationHistory": {
    kind: "self",
    why: "lists the caller's own conversations",
  },
  "chat#loadConversationForChat": {
    kind: "swap",
    // An id with no conversation of the caller's opens a new, empty chat.
    calls: (v) => [
      {
        args: [v.conversationId],
        allow: (value) => {
          const data = (value as { data?: Record<string, unknown> }).data;
          return (
            succeeded(value) &&
            data?.conversation === null &&
            (data.messages as unknown[]).length === 0
          );
        },
      },
    ],
  },
  "chat#loadEarlierMessages": {
    kind: "swap",
    calls: (v) => [
      {
        args: [v.conversationId, v.assistantMessageId],
        refusal: /conversationNotFound/,
      },
    ],
  },
  "chat#renameConversation": {
    kind: "swap",
    calls: (v) => [
      { args: [v.conversationId, "renamed"], refusal: /conversationNotFound/ },
    ],
  },
  "chat#deleteConversation": {
    kind: "swap",
    calls: (v) => [
      { args: [v.conversationId], refusal: /conversationNotFound/ },
    ],
  },
  "chat#setConversationPinned": {
    kind: "swap",
    calls: (v) => [
      { args: [v.conversationId, true], refusal: /conversationNotFound/ },
    ],
  },
  "chat#voteMessage": {
    kind: "swap",
    calls: (v) => [
      {
        args: [v.conversationId, v.assistantMessageId, "down"],
        refusal: /conversationNotFound/,
      },
      {
        args: [v.conversationId, v.assistantMessageId, null],
        refusal: /conversationNotFound/,
      },
    ],
  },
  "chat#getShareState": {
    kind: "swap",
    calls: (v) => [
      { args: [v.conversationId], refusal: /conversationNotFound/ },
    ],
  },
  "chat#setConversationShared": {
    kind: "swap",
    calls: (v) => [
      { args: [v.conversationId, true], refusal: /conversationNotFound/ },
    ],
  },
  "chat#saveMessageAsArtifact": {
    kind: "swap",
    calls: (v) => [
      {
        args: [
          {
            messageId: v.assistantMessageId,
            conversationId: v.conversationId,
          },
        ],
        refusal: /conversationNotFound/,
      },
    ],
  },
  "chat#listArtifactVersions": {
    kind: "swap",
    calls: (v) => [
      {
        args: [v.documentId],
        allow: (value) =>
          succeeded(value) && (value as { data: unknown[] }).data.length === 0,
      },
    ],
  },
  "chat#saveArtifactVersion": {
    kind: "swap",
    // Writes the caller's own document under that id; the victim's reads
    // are checked not to see it below.
    calls: (v) => [
      {
        args: [
          {
            documentId: v.documentId,
            title: "x",
            kind: "text",
            content: "x",
          },
        ],
        allow: succeeded,
      },
    ],
  },

  "chat-share#loadSharedConversation": {
    kind: "public",
    why: "a share link is read without a workspace, and maybe without a session",
  },

  "documents#listDocuments": {
    kind: "self",
    why: "lists the caller's own documents",
  },
  "documents#deleteLatestVersion": {
    kind: "swap",
    // Deletes the caller's own versions under that id: none.
    calls: (v) => [
      {
        args: [v.documentId, new Date(Date.now() + 60_000).toISOString()],
        allow: succeeded,
      },
    ],
  },

  "invitation#acceptInvitation": {
    kind: "swap",
    calls: (v) => [
      {
        args: [v.invitationId],
        refusal: /invitationNotFound|acceptVerificationFailed|forbidden/,
      },
    ],
  },
  "invitation#rejectInvitation": {
    kind: "swap",
    calls: (v) => [
      {
        args: [v.invitationId],
        refusal: /invitationNotFound|forbidden|declineFailed/,
      },
    ],
  },

  "notifications#getNotifications": {
    kind: "self",
    why: "the caller's own notifications, from every workspace",
  },
  "notifications#getUnreadNotifications": {
    kind: "self",
    why: "the caller's own notifications, from every workspace",
  },
  "notifications#getUnreadCount": {
    kind: "self",
    why: "the caller's own notifications, from every workspace",
  },
  "notifications#markNotificationRead": {
    kind: "swap",
    // Notifications are the user's, so the update is scoped to the
    // caller and matches nothing of anyone else's.
    calls: (v) => [{ args: [v.notificationId], allow: succeeded }],
  },
  "notifications#markAllNotificationsRead": {
    kind: "self",
    why: "the caller's own notifications",
  },

  "onboarding#advanceStep": {
    kind: "self",
    why: "the caller's own onboarding",
    args: () => [{ from: "welcome", to: null }],
  },
  "onboarding#completeOnboarding": {
    kind: "self",
    why: "the caller's own onboarding",
  },
  "onboarding#skipOnboarding": {
    kind: "self",
    why: "the caller's own onboarding",
  },
  "onboarding#saveDisplayName": {
    kind: "self",
    why: "names the caller",
    args: () => [`Renamed ${Date.now()}`],
    noSweep: "the name given becomes the caller's own",
  },

  "payment#startLocalPayment": {
    kind: "self",
    why: "opens an invoice for the caller's own workspace",
    args: (self) => [`${self.prefix}-bundle`],
  },
  "payment#pollLocalPayment": {
    kind: "swap",
    calls: (v) => [
      { args: [v.invoiceId], refusal: /statusFailed/ },
      { args: [v.paymentId], refusal: /statusFailed/ },
    ],
  },

  "privacy#listFacts": { kind: "self", why: "the caller's own facts" },
  "privacy#deleteFact": {
    kind: "swap",
    calls: (v) => [{ args: [v.factId], refusal: /notFound/ }],
  },
  "privacy#exportIdentity": {
    kind: "self",
    why: "the caller's own data",
  },
  "privacy#getAuditTrail": {
    kind: "self",
    why: "the caller's own memory audit",
  },

  "profile#updateProfile": {
    kind: "self",
    why: "the caller's own profile",
    args: () => [{ name: `Renamed ${Date.now()}` }],
    noSweep: "the name given becomes the caller's own",
  },
  "profile#updatePreferredLanguage": {
    kind: "self",
    why: "the caller's own preference",
    args: () => ["en"],
  },
  "profile#deleteAccount": {
    kind: "self",
    why: "deletes the caller's own account",
    destructive: true,
  },

  "team#inviteMember": {
    kind: "self",
    why: "invites into the caller's own workspace",
    args: (self) => [
      { email: `${self.prefix}-${Date.now()}@example.test`, role: "member" },
    ],
  },
  "team#cancelInvitation": {
    kind: "swap",
    calls: (v) => [{ args: [v.invitationId], refusal: TEAM_REFUSAL }],
  },
  "team#removeMember": {
    kind: "swap",
    calls: (v) => [
      { args: [v.memberRecordId], refusal: TEAM_REFUSAL },
      { args: [v.ownerMemberId], refusal: TEAM_REFUSAL },
    ],
  },
  "team#updateMemberRole": {
    kind: "swap",
    calls: (v) => [
      {
        args: [{ memberId: v.memberRecordId, role: "admin" }],
        refusal: TEAM_REFUSAL,
      },
    ],
  },
  "team#transferOwnership": {
    kind: "swap",
    calls: (v) => [{ args: [v.memberRecordId], refusal: TEAM_REFUSAL }],
  },
  "team#leaveWorkspace": {
    kind: "self",
    why: "ends the caller's own membership",
    destructive: true,
  },

  "usage#getUsageOverview": {
    kind: "self",
    why: "the caller's workspace's usage",
  },
  "usage#getUsagePeriodSummary": {
    kind: "self",
    why: "the caller's workspace's usage",
    args: () => ["7d"],
  },

  "workspace#updateWorkspace": {
    kind: "self",
    why: "the caller's active workspace",
    args: () => [{ name: `Renamed ${Date.now()}` }],
    noSweep: "the name given becomes the caller's workspace's own",
  },
  "workspace#deleteWorkspace": {
    kind: "self",
    why: "deletes the caller's active workspace",
    destructive: true,
  },
};

/** How a call ended: its answer, or what it threw. */
type Outcome = { value: unknown } | { thrown: string };

async function call(
  actor: Actor,
  action: Action,
  args: unknown[]
): Promise<Outcome> {
  try {
    return { value: await asActor(actor, () => action(...args)) };
  } catch (error) {
    return {
      thrown: error instanceof Error ? error.message : String(error),
    };
  }
}

/** The refusal's message, or null when the call was not refused. */
function refusalOf(outcome: Outcome): string | null {
  if ("thrown" in outcome) return outcome.thrown;
  const value = outcome.value as {
    success?: unknown;
    ok?: unknown;
    error?: unknown;
    message?: unknown;
  } | null;
  if (value === null || value === undefined) return "null";
  if (value.success === false) return String(value.error);
  if (value.ok === false) return String(value.message);
  return null;
}

describe("every server action is classified", () => {
  it("has a case for every exported action, and every case names one", async () => {
    const actions = await loadActions();
    const unclassified = [...actions.keys()].filter((key) => !(key in CASES));
    const stale = Object.keys(CASES).filter((key) => !actions.has(key));
    expect(
      unclassified,
      "classify each new action in CASES: swap, self, public or platform"
    ).toEqual([]);
    expect(stale, "these cases name no exported action").toEqual([]);
  });
});

d("server actions refuse another workspace's ids", () => {
  let actions: Map<string, Action>;
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

  async function expectUntouched(label: string) {
    expect(
      await fingerprint(victim),
      `${label} changed the victim's rows`
    ).toEqual(baseline);
  }

  /**
   * The victim's ids that also name one of the attacker's own documents.
   * A document is saved under the id it is given, so once the attacker
   * has saved one under the victim's document id, the attacker's own
   * reads answer with that id rightly. The canary is never exempt.
   */
  async function adoptedIds(): Promise<string[]> {
    const { rows } = await (
      await pg()
    ).query<{ id: string }>(
      `SELECT DISTINCT id FROM documents
        WHERE id = ANY($1) AND workspace_id = ANY($2)`,
      [tenantIds(victim), [attacker.workspaceId, attacker.memberWorkspaceId]]
    );
    return rows.map((row) => row.id);
  }

  /** The answer carries no victim data beyond this call's own arguments. */
  async function expectNoLeak(
    label: string,
    outcome: Outcome,
    args: unknown[]
  ) {
    const answer = "thrown" in outcome ? outcome.thrown : outcome.value;
    expect(
      leaks(answer, victim, [args, ...(await adoptedIds())]),
      `${label} answered with the victim's data`
    ).toEqual([]);
  }

  beforeAll(async () => {
    // Chat stays on the stub model, email on the console, and nobody is
    // a platform admin by address.
    vi.stubEnv("GOOGLE_GENERATIVE_AI_API_KEY", "");
    vi.stubEnv("RESEND_API_KEY", "");
    vi.stubEnv("EMAIL_PROVIDER", "");
    vi.stubEnv("PLATFORM_ADMIN_EMAILS", "");
    vi.stubEnv("PAYMENT_MODE", "mock");
    vi.stubEnv("NEXT_PUBLIC_APP_URL", "http://localhost:4002");
    vi.resetModules();

    const { composeIntelligo, seedIntelligo } = await import("@/lib/intelligo");
    composeIntelligo();
    await seedIntelligo();
    actions = await loadActions();

    victim = await seedTenant(`ti-victim-${suffix}`);
    attacker = await seedTenant(`ti-attacker-${suffix}`);
    tenants.push(victim, attacker);
    baseline = await settledFingerprint(victim);
  });

  afterAll(async () => {
    vi.unstubAllEnvs();
    await dropTenants(tenants).catch(() => undefined);
    await closeFixtures();
  });

  it("each actor resolves to the workspace the fixture made active", async () => {
    expect(await activeWorkspaceOf(victim.owner)).toBe(victim.workspaceId);
    expect(await activeWorkspaceOf(victim.member)).toBe(victim.workspaceId);
    expect(await activeWorkspaceOf(attacker.owner)).toBe(attacker.workspaceId);
    expect(await activeWorkspaceOf(attacker.member)).toBe(attacker.workspaceId);
  });

  it("the fingerprint sees a change to a message and to an invitation", async () => {
    const db = await pg();
    for (const [table, column, id] of [
      ["messages", "parts", victim.userMessageId],
      ["invitation", "role", victim.invitationId],
    ] as const) {
      const { rows } = await db.query(
        `SELECT ${column} AS value FROM ${table} WHERE id = $1`,
        [id]
      );
      const original = rows[0]!.value as string;
      await db.query(`UPDATE ${table} SET ${column} = $2 WHERE id = $1`, [
        id,
        `${original}-changed`,
      ]);
      expect(await fingerprint(victim)).not.toEqual(baseline);
      await db.query(`UPDATE ${table} SET ${column} = $2 WHERE id = $1`, [
        id,
        original,
      ]);
    }
    await expectUntouched("restoring the rows");
  });

  it("the attacker's own ids work: the refusals below are about whose they are", async () => {
    const load = actions.get("chat#loadConversationForChat")!;
    const own = await call(attacker.owner, load, [attacker.conversationId]);
    expect(JSON.stringify(own)).toContain(attacker.canary);

    const read = actions.get("notifications#markNotificationRead")!;
    const marked = await call(attacker.owner, read, [attacker.notificationId]);
    expect(refusalOf(marked)).toBeNull();
    const { rows } = await (
      await pg()
    ).query(`SELECT is_read FROM notifications WHERE id = $1`, [
      attacker.notificationId,
    ]);
    expect(rows[0]?.is_read).toBe(true);
  });

  it("every action that takes ids refuses the victim's", async () => {
    const failures: string[] = [];
    for (const [key, entry] of Object.entries(CASES)) {
      if (entry.kind !== "swap") continue;
      for (const { args, refusal, allow } of entry.calls(victim)) {
        for (const [role, actor] of attackers()) {
          const label = `${key} as the attacker's ${role}`;
          const outcome = await call(actor, actions.get(key)!, args);
          const refused = refusalOf(outcome);
          const allowed =
            "value" in outcome && allow ? allow(outcome.value) : false;
          if (refused === null && !allowed) {
            failures.push(`${label}: answered ${JSON.stringify(outcome)}`);
          } else if (refused !== null && refusal && !refusal.test(refused)) {
            failures.push(
              `${label}: refused before reaching its service: ${refused}`
            );
          }
          await expectNoLeak(label, outcome, args);
          await expectUntouched(label);
        }
      }
    }
    expect(failures).toEqual([]);
  });

  it("an action that acts on the caller answers with none of the victim's data", async () => {
    for (const [key, entry] of Object.entries(CASES)) {
      if (entry.kind !== "self" || entry.destructive) continue;
      const args = entry.args?.(attacker) ?? [];
      for (const [role, actor] of attackers()) {
        const label = `${key} as the attacker's ${role}`;
        const outcome = await call(actor, actions.get(key)!, args);
        await expectNoLeak(label, outcome, args);
        await expectUntouched(label);
      }
    }
  });

  it("a platform action refuses anyone who is not a platform admin", async () => {
    for (const [key, entry] of Object.entries(CASES)) {
      if (entry.kind !== "platform") continue;
      for (const args of entry.calls(victim)) {
        for (const [role, actor] of attackers()) {
          const label = `${key} as the attacker's ${role}`;
          const outcome = await call(actor, actions.get(key)!, args);
          expect(refusalOf(outcome), label).toMatch(
            /refused|impersonationFailed/
          );
          await expectNoLeak(label, outcome, args);
          await expectUntouched(label);
        }
      }
    }
  });

  it("every action that takes arguments, handed any of the victim's ids, keeps them", async () => {
    const ids = [
      victim.owner.userId,
      victim.member.userId,
      victim.workspaceId,
      victim.memberWorkspaceId,
      victim.ownerMemberId,
      victim.memberRecordId,
      victim.conversationId,
      victim.userMessageId,
      victim.assistantMessageId,
      victim.documentId,
      victim.factId,
      victim.notificationId,
      victim.invitationId,
      victim.paymentId,
      victim.invoiceId,
    ];
    for (const [key, action] of actions) {
      const entry = CASES[key]!;
      if (entry.kind === "public" || entry.kind === "platform") continue;
      if (entry.kind === "self" && (entry.destructive || entry.noSweep)) {
        continue;
      }
      if (action.length === 0) continue;
      for (const id of ids) {
        const positional = Array.from({ length: action.length }, () => id);
        const named = [
          {
            id,
            conversationId: id,
            messageId: id,
            documentId: id,
            memberId: id,
            invitationId: id,
            notificationId: id,
            factId: id,
            workspaceId: id,
            organizationId: id,
            userId: id,
            invoiceId: id,
            content: "x",
            title: "x",
            kind: "text",
            role: "member",
          },
        ];
        for (const args of [positional, named]) {
          for (const [role, actor] of attackers()) {
            const outcome = await call(actor, action, args);
            await expectNoLeak(
              `${key}(${role}, ${JSON.stringify(args)})`,
              outcome,
              args
            );
          }
        }
      }
      await expectUntouched(`${key} with the victim's ids`);
    }
  });

  it("a write under one of the victim's ids does not reach the victim's reads", async () => {
    const mark = `CANARY-bleed-${suffix}`;
    await call(attacker.owner, actions.get("chat#saveArtifactVersion")!, [
      {
        documentId: victim.documentId,
        title: mark,
        kind: "text",
        content: mark,
      },
    ]);
    await call(attacker.owner, actions.get("chat#saveMessageAsArtifact")!, [
      {
        conversationId: victim.conversationId,
        messageId: victim.assistantMessageId,
        title: mark,
      },
    ]);

    const reads = await Promise.all([
      call(victim.owner, actions.get("documents#listDocuments")!, []),
      call(victim.owner, actions.get("chat#listArtifactVersions")!, [
        victim.documentId,
      ]),
      call(victim.owner, actions.get("chat#loadConversationForChat")!, [
        victim.conversationId,
      ]),
    ]);
    for (const read of reads) {
      expect(refusalOf(read)).toBeNull();
      expect(JSON.stringify(read)).toContain(victim.canary);
      expect(JSON.stringify(read)).not.toContain(mark);
    }
    baseline = await settledFingerprint(victim);
  });

  it("the attacker cannot make the victim's workspace its active one", async () => {
    const { auth } = await import("@intelligo-dev/auth");
    await auth.api
      .setActiveOrganization({
        headers: headersOf(attacker.owner),
        body: { organizationId: victim.workspaceId },
      })
      .catch(() => undefined);
    expect(await activeWorkspaceOf(attacker.owner)).toBe(attacker.workspaceId);
    await expectUntouched("setActiveOrganization");
  });

  it("a share link opens for nobody while private, and only for members under workspace sharing", async () => {
    const conversations = await import("@intelligo-dev/core/conversations");
    const load = actions.get("chat-share#loadSharedConversation")!;

    expect(
      refusalOf(await call(attacker.owner, load, [victim.conversationId]))
    ).toBe("null");

    const shared = await conversations.createConversation(
      { workspaceId: victim.workspaceId, userId: victim.owner.userId },
      {
        agentId: "assistant",
        modelId: "google/gemini-2.5-flash",
        title: `${victim.canary} shared`,
      }
    );
    const published = (await call(
      victim.owner,
      actions.get("chat#setConversationShared")!,
      [shared.id, true]
    )) as { value: { data: { ref: string } } };
    const ref = published.value.data.ref;

    conversations.setConversationSharing("workspace");
    try {
      for (const [role, actor] of attackers()) {
        const outcome = await call(actor, load, [ref]);
        expect(refusalOf(outcome), `the attacker's ${role}`).toBe("null");
        await expectNoLeak(
          `loadSharedConversation as the attacker's ${role}`,
          outcome,
          [ref]
        );
      }
      const member = await call(victim.member, load, [ref]);
      expect(JSON.stringify(member)).toContain(victim.canary);
    } finally {
      conversations.setConversationSharing("public");
    }
    baseline = await settledFingerprint(victim);
  });

  it("an action that ends the caller's membership or account touches nobody else's", async () => {
    const doomed = await seedTenant(`ti-doomed-${suffix}`);
    tenants.push(doomed);
    const run = async (actor: Actor, key: string, args: unknown[] = []) => {
      const outcome = await call(actor, actions.get(key)!, args);
      await expectNoLeak(key, outcome, args);
      await expectUntouched(key);
      return outcome;
    };

    await run(doomed.owner, "team#transferOwnership", [doomed.memberRecordId]);
    await run(doomed.owner, "team#leaveWorkspace");
    await run(doomed.member, "workspace#deleteWorkspace");
    await run(doomed.owner, "profile#deleteAccount");

    const destructive = Object.entries(CASES)
      .filter(([, entry]) => entry.kind === "self" && entry.destructive)
      .map(([key]) => key)
      .sort();
    expect(destructive).toEqual([
      "profile#deleteAccount",
      "team#leaveWorkspace",
      "workspace#deleteWorkspace",
    ]);
  });
});
