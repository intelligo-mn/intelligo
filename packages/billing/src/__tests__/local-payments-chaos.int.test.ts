/**
 * One QR-and-poll invoice settled by everything that settles it at
 * once — the buyer's polls, the provider's callback, the scheduled
 * sweep — while the provider's answer moves through its timeline:
 * pending, then paid, failed or expired, and sometimes paid after all,
 * sometimes for another amount than was invoiced. Against a real
 * database and the in-memory mock provider, whose invoice this test
 * moves along.
 *
 * Whatever the interleaving: the invoice is fulfilled at most once and
 * its fulfilment never changes; a fulfilled invoice is never marked
 * failed; a mismatched amount never grants; and what was bought — credit
 * or a plan — is granted exactly once when the provider ends paid, and
 * not at all otherwise.
 *
 * Runs against a real database when TEST_PG_URL is set. DATABASE_URL
 * must point at the same database.
 */

import fc from "fast-check";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { Client } from "pg";

import { fromMajor } from "@intelligo-dev/core/money";

const PG_URL = process.env.TEST_PG_URL;
const d = PG_URL ? describe : describe.skip;

const suffix = Date.now();
const USER = `user_local_chaos_${suffix}`;
const PLAN = `local-chaos-pro-${suffix}`;
const DAYS = 30;

type Kind = "credit" | "plan";
type ProviderStatus = "paid" | "failed" | "expired";
type Call = "poll" | "recheck" | "callback" | "sweep";

/** The provider's answers after `pending`, in order. */
const timelines: ProviderStatus[][] = [
  [],
  ["paid"],
  ["failed"],
  ["expired"],
  ["expired", "paid"],
  ["failed", "paid"],
];

type Scenario = {
  timeline: ProviderStatus[];
  mismatch: boolean;
  fulfilFailsOnce: boolean;
  rounds: Call[][];
  moves: number[];
};

const scenario: fc.Arbitrary<Scenario> = fc.record({
  timeline: fc.constantFrom(...timelines),
  /** The provider reports a paid amount other than the invoice's. */
  mismatch: fc.boolean(),
  /** fulfil throws the first time it is asked. */
  fulfilFailsOnce: fc.boolean(),
  /** Concurrent settles per round; the provider moves between rounds. */
  rounds: fc.array(
    fc.array(fc.constantFrom<Call>("poll", "recheck", "callback", "sweep"), {
      minLength: 1,
      maxLength: 4,
    }),
    { minLength: 1, maxLength: 5 }
  ),
  /** The round before which each of the timeline's moves happens. */
  moves: fc.array(fc.nat(), { minLength: 2, maxLength: 2 }),
});

d("local-payment settlement chaos (integration)", () => {
  const client = new Client({ connectionString: PG_URL });
  const workspaces: string[] = [];
  const openedAfter = new Date(Date.now() - 1_000);
  let local: typeof import("../local-payments");
  let payment: typeof import("../payment");
  let ledgerCurrency: string;

  const credits = () => fromMajor(5, ledgerCurrency);

  async function workspace(): Promise<string> {
    const id = `ws_local_chaos_${suffix}_${workspaces.length}`;
    workspaces.push(id);
    await client.query(
      `INSERT INTO organization (id, name, slug, created_at) VALUES ($1, 'Local chaos', $1, now())`,
      [id]
    );
    return id;
  }

  async function observe(workspaceId: string, invoiceId: string) {
    const { rows } = await client.query<{
      status: string;
      fulfilled_at: Date | null;
      balance: string | null;
      plan_days: string | null;
    }>(
      `SELECT p.status, p.fulfilled_at,
         (SELECT balance_micros FROM credit_balances WHERE workspace_id = $1) AS balance,
         (SELECT round(extract(epoch FROM current_period_end - current_period_start) / 86400)
            FROM subscriptions WHERE workspace_id = $1) AS plan_days
         FROM payments p WHERE p.invoice_id = $2`,
      [workspaceId, invoiceId]
    );
    const row = rows[0]!;
    return {
      status: row.status,
      fulfilledAt: row.fulfilled_at?.getTime() ?? null,
      balance: Number(row.balance ?? 0),
      planDays: row.plan_days === null ? null : Number(row.plan_days),
    };
  }

  beforeAll(async () => {
    await client.connect();
    await client.query(
      `INSERT INTO users (id, name, email, email_verified, created_at, updated_at)
       VALUES ($1, 'Buyer', $2, true, now(), now())`,
      [USER, `${USER}@example.test`]
    );
    await client.query(
      `INSERT INTO plans (id, name, slug, price_monthly, price_yearly, features, limits)
       VALUES ($1, $2, $2, 0, 0, '[]', '{}')`,
      [`plan_${PLAN}`, PLAN]
    );
    local = await import("../local-payments");
    payment = await import("../payment");
    const settings = await import("../billing-settings");
    settings.invalidateBillingSettingsCache();
    ledgerCurrency = (await settings.getBillingSettings()).currency;
  });

  afterAll(async () => {
    await client.query(`DELETE FROM organization WHERE id = ANY($1)`, [
      workspaces,
    ]);
    await client.query(`DELETE FROM users WHERE id = $1`, [USER]);
    await client.query(`DELETE FROM plans WHERE slug = $1`, [PLAN]);
    await client.end();
  });

  async function run(kind: Kind, s: Scenario) {
    const workspaceId = await workspace();
    const invoice = await local.openLocalInvoice({
      workspaceId,
      userId: USER,
      reference: kind === "credit" ? "bundle-5" : PLAN,
      price: fromMajor(12.5, "USD"),
    });
    const invoiceId = invoice.invoiceId;
    const provider = payment.getMockPayment(invoiceId)!;
    const invoiced = provider.amount;

    let fulfilCalls = 0;
    const fulfil = () => {
      fulfilCalls++;
      if (s.fulfilFailsOnce && fulfilCalls === 1) {
        throw new Error("fulfil failed once");
      }
      return kind === "credit"
        ? { credits: credits() }
        : { plan: PLAN, days: DAYS };
    };
    const expectedFailures = (message: string) =>
      (s.mismatch && /different amount/.test(message)) ||
      (s.fulfilFailsOnce && /fulfil failed once/.test(message));

    const call = async (kind: Call): Promise<void> => {
      if (kind === "poll" || kind === "recheck") {
        await local.settleLocalInvoice({
          invoiceId,
          workspaceId,
          fulfil,
          recheckFailed: kind === "recheck",
        });
        return;
      }
      const result = await local.settlePendingLocalInvoices({
        fulfil,
        ...(kind === "callback"
          ? { invoiceId }
          : { openedAfter, openedBefore: new Date(Date.now() + 60_000) }),
      });
      for (const error of result.errors) {
        if (!error.startsWith(`${invoiceId}:`)) continue;
        expect(expectedFailures(error), error).toBe(true);
      }
    };

    const moveAt = s.timeline.map(
      (_, i) => s.moves[i]! % (s.rounds.length + 1)
    );
    const moveProvider = (to: ProviderStatus) => {
      provider.status = to;
      provider.amount = to === "paid" && s.mismatch ? invoiced + 1 : invoiced;
    };

    let fulfilledAt: number | null = null;
    let everPaid = false;
    const check = async () => {
      const seen = await observe(workspaceId, invoiceId);
      if (fulfilledAt !== null) expect(seen.fulfilledAt).toBe(fulfilledAt);
      fulfilledAt = seen.fulfilledAt;
      if (seen.fulfilledAt !== null) {
        expect(seen.status).toBe("paid");
        expect(everPaid && !s.mismatch).toBe(true);
      }
      const granted = seen.fulfilledAt !== null;
      if (kind === "credit") {
        expect(seen.balance).toBe(granted ? credits().amount : 0);
        expect(seen.planDays).toBeNull();
      } else {
        expect(seen.planDays).toBe(granted ? DAYS : null);
        expect(seen.balance).toBe(0);
      }
    };

    let next = 0;
    for (const [round, calls] of s.rounds.entries()) {
      // Every move scheduled for this round, in the timeline's order.
      while (next < s.timeline.length && moveAt[next]! <= round) {
        moveProvider(s.timeline[next]!);
        if (s.timeline[next] === "paid") everPaid = true;
        next++;
      }
      const results = await Promise.allSettled(calls.map(call));
      for (const result of results) {
        if (result.status === "rejected") {
          const message = String(
            (result.reason as Error)?.message ?? result.reason
          );
          expect(expectedFailures(message), message).toBe(true);
        }
      }
      await check();
    }
    while (next < s.timeline.length) {
      moveProvider(s.timeline[next]!);
      if (s.timeline[next] === "paid") everPaid = true;
      next++;
    }

    // The provider's callback, once its answer is final: a paid invoice
    // is granted now if no settle granted it yet.
    await call("callback").catch((error: Error) =>
      expect(expectedFailures(error.message), error.message).toBe(true)
    );
    await call("callback").catch(() => {});
    await check();
    const paidInFull =
      s.timeline[s.timeline.length - 1] === "paid" && !s.mismatch;
    expect(fulfilledAt !== null).toBe(paidInFull);

    // Out of every later sweep's way.
    if (fulfilledAt === null) {
      await client.query(
        `UPDATE payments SET status = 'failed' WHERE invoice_id = $1`,
        [invoiceId]
      );
    }
  }

  it("grants credit once, and only for an invoice paid in full", async () => {
    await fc.assert(
      fc.asyncProperty(scenario, (s) => run("credit", s)),
      { numRuns: 20 }
    );
  }, 120_000);

  it("grants a plan once, and only for an invoice paid in full", async () => {
    await fc.assert(
      fc.asyncProperty(scenario, (s) => run("plan", s)),
      { numRuns: 20 }
    );
  }, 120_000);

  it("leaves the invoice unfulfilled when fulfil throws, and the next settle grants once", async () => {
    const workspaceId = await workspace();
    const invoice = await local.openLocalInvoice({
      workspaceId,
      userId: USER,
      reference: "bundle-5",
      price: fromMajor(12.5, "USD"),
    });
    payment.mockCompletePayment(invoice.invoiceId);

    await expect(
      local.settleLocalInvoice({
        invoiceId: invoice.invoiceId,
        workspaceId,
        fulfil: () => {
          throw new Error("catalogue unavailable");
        },
      })
    ).rejects.toThrow("catalogue unavailable");
    expect(await observe(workspaceId, invoice.invoiceId)).toMatchObject({
      status: "pending",
      fulfilledAt: null,
      balance: 0,
    });

    const settle = () =>
      local.settleLocalInvoice({
        invoiceId: invoice.invoiceId,
        workspaceId,
        fulfil: () => ({ credits: credits() }),
      });
    expect(await Promise.all([settle(), settle()])).toEqual(["paid", "paid"]);
    expect(await settle()).toBe("paid");
    expect(await observe(workspaceId, invoice.invoiceId)).toMatchObject({
      status: "paid",
      balance: credits().amount,
    });
  });
});
