/**
 * The ledger against a reference model, on a real database.
 *
 * A generated sequence of commands — admit, several admissions at once,
 * settle, replay a settlement, release, expire a hold, top up — runs
 * against `reserveQuota`, `recordFixedCharge`, `releaseReservation` and
 * `creditWorkspace`, and against a model of the three pools written
 * here, independently of the engine. After every command the database
 * must hold what the model holds: the allowance used, the top-up
 * balance, the trial grant, the outstanding holds and the total charged;
 * every admission must be decided as the model decides it; and while no
 * settlement exceeded its hold, the top-up balance never had to be
 * clamped at zero (nothing was forgiven).
 *
 * Runs against a real database when TEST_PG_URL is set. DATABASE_URL
 * must point at the same database.
 */

import fc from "fast-check";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { Client } from "pg";

import { money } from "@intelligo-dev/core/money";

const PG_URL = process.env.TEST_PG_URL;
const d = PG_URL ? describe : describe.skip;

/** Whole tugrik as micros. */
const mnt = (whole: number) => whole * 1_000_000;

const ALLOWANCE = mnt(100);

type Init = {
  allowanceUsed: number;
  topup: number;
  /** The trial grant's remaining micros; null for no trial. */
  trial: number | null;
};

type Command =
  | { kind: "admit"; amount: number }
  | { kind: "parallelAdmit"; amount: number; k: number }
  | { kind: "settle"; pick: number; over: boolean; factor: number }
  | { kind: "replay"; pick: number }
  | { kind: "release"; pick: number }
  | { kind: "expire"; pick: number }
  | { kind: "topup"; amount: number };

/** The pools as the model keeps them, in micros. */
type Model = {
  allowanceUsed: number;
  topup: number;
  trial: number;
  /** The trial row is `active`; settlement debits only an active row. */
  trialRow: boolean;
  /** Outstanding holds, oldest first. */
  holds: { id: string; amount: number }[];
  settled: string[];
  charged: number;
  /** Every top-up share settlement took, the clamped part included. */
  topupTaken: number;
  /** What the top-up balance could not cover and its clamp forgave. */
  forgiven: number;
  credited: number;
  /** A settlement charged more than its hold. */
  overHold: boolean;
};

/** The admission rule: non-trial pools first, the trial only as fallback. */
function decide(
  m: Model,
  amount: number
): { allowed: boolean; trial: boolean } {
  const reserved = m.holds.reduce((sum, h) => sum + h.amount, 0);
  const nonTrial = Math.max(0, ALLOWANCE - m.allowanceUsed) + m.topup;
  if (nonTrial - reserved >= amount) return { allowed: true, trial: false };
  const trialActive = m.trialRow && m.trial > 0;
  const trialFree = m.trial - Math.max(0, reserved - nonTrial);
  if (trialActive && trialFree >= amount) return { allowed: true, trial: true };
  return { allowed: false, trial: false };
}

/** Settlement's split: the allowance, then the top-up, then the trial. */
function settle(m: Model, charged: number): void {
  const allowanceLeft = Math.max(0, ALLOWANCE - m.allowanceUsed);
  const plan = Math.min(charged, allowanceLeft);
  const remainder = charged - plan;
  m.allowanceUsed += plan;
  m.charged += charged;
  if (remainder === 0) return;
  const fromTopup = Math.min(remainder, m.topup);
  const trial = m.trialRow ? Math.min(remainder - fromTopup, m.trial) : 0;
  const topup = remainder - trial;
  if (trial > 0) {
    m.trial -= trial;
    if (m.trial <= 0) m.trialRow = false;
  }
  m.forgiven += Math.max(0, topup - m.topup);
  m.topup = Math.max(0, m.topup - topup);
  m.topupTaken += topup;
}

const amounts = fc.integer({ min: 1, max: 60 }).map(mnt);

const init: fc.Arbitrary<Init> = fc.record({
  allowanceUsed: fc.integer({ min: 0, max: 100 }).map(mnt),
  topup: fc.integer({ min: 0, max: 150 }).map(mnt),
  trial: fc.option(fc.integer({ min: 1, max: 80 }).map(mnt), {
    nil: null,
  }),
});

const command: fc.Arbitrary<Command> = fc.oneof(
  {
    weight: 4,
    arbitrary: amounts.map((amount) => ({ kind: "admit", amount }) as const),
  },
  {
    weight: 1,
    arbitrary: fc
      .record({ amount: amounts, k: fc.integer({ min: 2, max: 4 }) })
      .map((c) => ({ kind: "parallelAdmit", ...c }) as const),
  },
  {
    weight: 4,
    arbitrary: fc
      .record({
        pick: fc.nat(),
        over: fc.constant(false),
        factor: fc.double({ min: 0, max: 1, noNaN: true }),
      })
      .map((c) => ({ kind: "settle", ...c }) as const),
  },
  {
    weight: 1,
    arbitrary: fc
      .record({
        pick: fc.nat(),
        over: fc.constant(true),
        factor: fc.double({ min: 0, max: 1, noNaN: true }),
      })
      .map((c) => ({ kind: "settle", ...c }) as const),
  },
  {
    weight: 1,
    arbitrary: fc.nat().map((pick) => ({ kind: "replay", pick }) as const),
  },
  {
    weight: 1,
    arbitrary: fc.nat().map((pick) => ({ kind: "release", pick }) as const),
  },
  {
    weight: 1,
    arbitrary: fc.nat().map((pick) => ({ kind: "expire", pick }) as const),
  },
  {
    weight: 1,
    arbitrary: amounts.map((amount) => ({ kind: "topup", amount }) as const),
  }
);

d("ledger against a reference model (integration)", () => {
  const client = new Client({ connectionString: PG_URL });
  const suffix = Date.now();
  const product = `ledger-model-${suffix}`;
  const workspaces: string[] = [];

  let quota: typeof import("../quota");
  let credits: typeof import("../credit-adjustments");

  /**
   * A timestamp as drizzle binds it to a naive `timestamp` column: UTC
   * wall clock.
   */
  const naive = (date: Date) =>
    date.toISOString().slice(0, 19).replace("T", " ");

  beforeAll(async () => {
    await client.connect();

    const { ensureBillingSettingsRow, invalidateBillingSettingsCache } =
      await import("../billing-settings");
    await ensureBillingSettingsRow();
    await client.query(
      `UPDATE billing_settings
          SET currency = 'MNT', usd_rate_micros = 3450000000, margin_bp = 40000
        WHERE id = 'default'`
    );
    invalidateBillingSettingsCache();

    const { setDefaultProductSlug, registerProductPlans } =
      await import("../plans");
    setDefaultProductSlug(product);
    registerProductPlans(product, {
      free: {
        name: "Free",
        slug: "free",
        description: "",
        priceOneTime: 0,
        targetAudience: "",
        aiModelLabel: "",
        monthlyAllowance: money(ALLOWANCE, "MNT"),
        limits: { chatMessages: 30 },
        features: [],
      },
    });

    quota = await import("../quota");
    credits = await import("../credit-adjustments");
  });

  afterAll(async () => {
    for (const table of [
      "usage_records",
      "monthly_usage",
      "credit_reservations",
      "credit_balances",
      "trial_credits",
    ]) {
      await client.query(`DELETE FROM ${table} WHERE workspace_id = ANY($1)`, [
        workspaces,
      ]);
    }
    await client.query(`DELETE FROM organization WHERE id = ANY($1)`, [
      workspaces,
    ]);
    await client.end();
  });

  /** A fresh workspace with the pools `init` describes. */
  async function provision(start: Init): Promise<string> {
    const workspaceId = `ledger-ws-${suffix}-${workspaces.length}`;
    workspaces.push(workspaceId);
    await client.query(
      `INSERT INTO organization (id, name, slug, created_at, updated_at)
       VALUES ($1, 'Ledger model', $1, now(), now())`,
      [workspaceId]
    );
    const { getCurrentPeriodStart, getCurrentPeriodEnd } =
      await import("../quota-usage");
    await client.query(
      `INSERT INTO monthly_usage (id, workspace_id, period_start, period_end, allowance_used_micros, currency)
       VALUES ($1, $1, $2, $3, $4, 'MNT')`,
      [
        workspaceId,
        naive(getCurrentPeriodStart()),
        naive(getCurrentPeriodEnd()),
        start.allowanceUsed,
      ]
    );
    await client.query(
      `INSERT INTO credit_balances (id, workspace_id, balance_micros, currency)
       VALUES ($1, $1, $2, 'MNT')`,
      [workspaceId, start.topup]
    );
    if (start.trial !== null) {
      await client.query(
        `INSERT INTO trial_credits (id, workspace_id, initial_micros, remaining_micros, currency, status)
         VALUES ($1, $1, $2, $2, 'MNT', 'active')`,
        [workspaceId, start.trial]
      );
    }
    return workspaceId;
  }

  async function observe(workspaceId: string) {
    const { rows } = await client.query<{
      allowance_used: string;
      balance: string;
      total_used: string;
      trial: string | null;
      trial_status: string | null;
      held: string;
      charged: string;
    }>(
      `SELECT
         (SELECT allowance_used_micros FROM monthly_usage WHERE workspace_id = $1) AS allowance_used,
         (SELECT balance_micros FROM credit_balances WHERE workspace_id = $1) AS balance,
         (SELECT total_used_micros FROM credit_balances WHERE workspace_id = $1) AS total_used,
         (SELECT remaining_micros FROM trial_credits WHERE workspace_id = $1) AS trial,
         (SELECT status FROM trial_credits WHERE workspace_id = $1) AS trial_status,
         (SELECT coalesce(sum(estimated_micros), 0) FROM credit_reservations
           WHERE workspace_id = $1 AND status = 'active'
             AND expires_at > (now() AT TIME ZONE 'UTC')) AS held,
         (SELECT coalesce(sum(charged_micros), 0) FROM usage_records
           WHERE workspace_id = $1 AND type <> 'credit') AS charged`,
      [workspaceId]
    );
    const row = rows[0]!;
    return {
      allowanceUsed: Number(row.allowance_used),
      balance: Number(row.balance),
      totalUsed: Number(row.total_used),
      trial: row.trial === null ? null : Number(row.trial),
      trialActive: row.trial_status === "active",
      held: Number(row.held),
      charged: Number(row.charged),
    };
  }

  async function admit(workspaceId: string, amount: number) {
    const id = crypto.randomUUID();
    const admission = await quota.reserveQuota(workspaceId, {
      amount: money(amount, "MNT"),
      requestId: id,
    });
    return { id, admission };
  }

  async function run(start: Init, commands: Command[]): Promise<void> {
    const workspaceId = await provision(start);
    const m: Model = {
      allowanceUsed: start.allowanceUsed,
      topup: start.topup,
      trial: start.trial ?? 0,
      trialRow: start.trial !== null,
      holds: [],
      settled: [],
      charged: 0,
      topupTaken: 0,
      forgiven: 0,
      credited: 0,
      overHold: false,
    };
    const before = await observe(workspaceId);

    for (const c of commands) {
      switch (c.kind) {
        case "admit": {
          const expected = decide(m, c.amount);
          const { id, admission } = await admit(workspaceId, c.amount);
          expect(admission.allowed, JSON.stringify(c)).toBe(expected.allowed);
          if (admission.allowed) {
            expect(admission.usingTrialCredits).toBe(expected.trial);
            m.holds.push({ id, amount: c.amount });
          }
          break;
        }
        case "parallelAdmit": {
          const results = await Promise.all(
            Array.from({ length: c.k }, () => admit(workspaceId, c.amount))
          );
          let expected = 0;
          const shadow = { ...m, holds: [...m.holds] };
          for (let i = 0; i < c.k; i++) {
            if (!decide(shadow, c.amount).allowed) break;
            shadow.holds.push({ id: `shadow-${i}`, amount: c.amount });
            expected++;
          }
          const admitted = results.filter((r) => r.admission.allowed);
          expect(admitted.length, JSON.stringify(c)).toBe(expected);
          for (const r of admitted)
            m.holds.push({ id: r.id, amount: c.amount });
          break;
        }
        case "settle": {
          if (m.holds.length === 0) break;
          const [hold] = m.holds.splice(c.pick % m.holds.length, 1);
          const actual = c.over
            ? hold!.amount + 1 + Math.floor(c.factor * hold!.amount)
            : Math.max(1, Math.ceil(c.factor * hold!.amount));
          if (actual > hold!.amount) m.overHold = true;
          const outcome = await quota.recordFixedCharge({
            workspaceId,
            capability: "ledger.model",
            requestId: hold!.id,
            amount: money(actual, "MNT"),
          });
          expect(outcome.replayed).toBe(false);
          expect(
            outcome.plan.amount + outcome.topup.amount + outcome.trial.amount
          ).toBe(actual);
          settle(m, actual);
          m.settled.push(hold!.id);
          break;
        }
        case "replay": {
          if (m.settled.length === 0) break;
          const outcome = await quota.recordFixedCharge({
            workspaceId,
            capability: "ledger.model",
            requestId: m.settled[c.pick % m.settled.length]!,
            amount: money(mnt(1), "MNT"),
          });
          expect(outcome.replayed).toBe(true);
          break;
        }
        case "release": {
          if (m.holds.length === 0) break;
          const [hold] = m.holds.splice(c.pick % m.holds.length, 1);
          await quota.releaseReservation(hold!.id, workspaceId);
          break;
        }
        case "expire": {
          if (m.holds.length === 0) break;
          const [hold] = m.holds.splice(c.pick % m.holds.length, 1);
          await client.query(
            `UPDATE credit_reservations SET expires_at = '2000-01-01'
              WHERE request_id = $1`,
            [hold!.id]
          );
          break;
        }
        case "topup": {
          await credits.creditWorkspace(workspaceId, money(c.amount, "MNT"), {
            reason: "ledger model",
            requestId: crypto.randomUUID(),
          });
          m.topup += c.amount;
          m.credited += c.amount;
          break;
        }
      }

      const seen = await observe(workspaceId);
      const where = JSON.stringify(c);
      expect(seen.allowanceUsed, where).toBe(m.allowanceUsed);
      expect(seen.balance, where).toBe(m.topup);
      expect(seen.balance, where).toBeGreaterThanOrEqual(0);
      if (start.trial !== null) {
        expect(seen.trial, where).toBe(m.trial);
        expect(seen.trialActive, where).toBe(m.trialRow);
      }
      expect(seen.held, where).toBe(
        m.holds.reduce((sum, h) => sum + h.amount, 0)
      );
      expect(seen.charged, where).toBe(m.charged);
    }

    const after = await observe(workspaceId);
    expect(after.totalUsed - before.totalUsed).toBe(m.topupTaken);
    if (!m.overHold) {
      expect(m.forgiven).toBe(0);
      expect(after.balance - before.balance).toBe(m.credited - m.topupTaken);
    }
  }

  it("matches the model under any sequence of commands", async () => {
    await fc.assert(
      fc.asyncProperty(
        init,
        fc.array(command, { maxLength: 25 }),
        async (start, commands) => run(start, commands)
      ),
      { numRuns: 20 }
    );
  }, 120_000);
});
