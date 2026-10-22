/**
 * What happens to the money when the process dies or the database
 * connection drops between admission and settlement, against a real
 * database and the billing-bound execution boundary.
 *
 * A run that crashed with nothing recorded is abandoned and its hold
 * released; one that recorded progress is charged once; a settlement
 * that committed before the process died is confirmed, not charged
 * again; a settlement whose connection is killed while it waits for the
 * workspace lock leaves no charge, keeps its hold, and is settled once
 * by reconcile; an admission killed the same way leaves no hold and no
 * run; and a late complete() racing reconcile charges once.
 *
 * Runs against a real database when TEST_PG_URL is set. DATABASE_URL
 * must point at the same database. Killing a connection needs a role
 * that may call pg_terminate_backend (CI's and the local one are
 * superusers).
 */

import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { Client } from "pg";

import { money } from "@intelligo-dev/core/money";

const PG_URL = process.env.TEST_PG_URL;
const d = PG_URL ? describe : describe.skip;

const MODEL = "google/gemini-2.5-flash";
const BALANCE = 1_000_000_000_000;

d("crash and disconnect between admission and settlement (integration)", () => {
  const client = new Client({ connectionString: PG_URL });
  const suffix = Date.now();
  const workspaceId = `chaos-ws-${suffix}`;
  const product = `chaos-${suffix}`;

  let billing: typeof import("../executions");
  let executions: ReturnType<
    typeof import("../executions").createBillingExecutions
  >;

  const usage = { inputTokens: 1_000, outputTokens: 500 };

  const begin = (on = executions) =>
    on.begin({ workspaceId, capability: "chaos.turn", model: MODEL });

  async function state(executionId?: string) {
    const { rows } = await client.query<{
      balance: string;
      usage_rows: string;
      charged: string;
      held: string;
      executions: string;
    }>(
      `SELECT
         (SELECT balance_micros FROM credit_balances WHERE workspace_id = $1) AS balance,
         (SELECT count(*) FROM usage_records WHERE workspace_id = $1 AND type <> 'credit') AS usage_rows,
         (SELECT coalesce(sum(charged_micros), 0) FROM usage_records
           WHERE workspace_id = $1 AND type <> 'credit') AS charged,
         (SELECT count(*) FROM credit_reservations
           WHERE workspace_id = $1 AND status = 'active') AS held,
         (SELECT count(*) FROM executions WHERE workspace_id = $1) AS executions`,
      [workspaceId]
    );
    const row = rows[0]!;
    const status = executionId
      ? (
          await client.query<{ status: string }>(
            `SELECT status FROM executions WHERE id = $1`,
            [executionId]
          )
        ).rows[0]?.status
      : undefined;
    return {
      balance: Number(row.balance),
      usageRows: Number(row.usage_rows),
      charged: Number(row.charged),
      held: Number(row.held),
      executions: Number(row.executions),
      status,
    };
  }

  /** Make a running row look older than any abandonment cutoff. */
  const backdate = (executionId: string) =>
    client.query(
      `UPDATE executions SET started_at = started_at - interval '1 day' WHERE id = $1`,
      [executionId]
    );

  /**
   * Hold the workspace's advisory lock on a connection of its own, run
   * `operation` until it waits for that lock, kill the waiting backend,
   * then let the lock go. Returns what `operation` threw.
   */
  async function killWhileWaiting(
    operation: () => Promise<unknown>
  ): Promise<unknown> {
    const blocker = new Client({ connectionString: PG_URL });
    await blocker.connect();
    try {
      await blocker.query("BEGIN");
      await blocker.query("SELECT pg_advisory_xact_lock(hashtext($1))", [
        workspaceId,
      ]);
      const blockerPid = (
        await blocker.query<{ pid: number }>("SELECT pg_backend_pid() AS pid")
      ).rows[0]!.pid;

      const outcome = operation().then(
        () => undefined,
        (error: unknown) => error ?? new Error("rejected")
      );

      let waiting: number | undefined;
      for (let attempt = 0; attempt < 250 && waiting === undefined; attempt++) {
        const { rows } = await client.query<{ pid: number }>(
          `SELECT pid FROM pg_stat_activity
            WHERE datname = current_database()
              AND pid <> $1
              AND wait_event_type = 'Lock'
              AND query ILIKE '%pg_advisory_xact_lock%'`,
          [blockerPid]
        );
        waiting = rows[0]?.pid;
        if (waiting === undefined) {
          await new Promise((resolve) => setTimeout(resolve, 20));
        }
      }
      expect(waiting, "no backend waited for the workspace lock").toBeDefined();
      await client.query("SELECT pg_terminate_backend($1)", [waiting]);

      const thrown = await outcome;
      await blocker.query("ROLLBACK");
      return thrown;
    } finally {
      await blocker.end();
    }
  }

  beforeAll(async () => {
    await client.connect();
    await client.query(
      `INSERT INTO organization (id, name, slug, created_at, updated_at)
       VALUES ($1, 'Chaos WS', $1, now(), now())`,
      [workspaceId]
    );

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
        monthlyAllowance: money(0, "MNT"),
        limits: { chatMessages: 30 },
        features: [],
      },
    });

    // reconcile() settles with the row's model, so it must have a price.
    const { DEFAULT_MODELS, registerModels } =
      await import("@intelligo-dev/executions");
    registerModels(DEFAULT_MODELS);

    billing = await import("../executions");
    executions = billing.createBillingExecutions();
  });

  beforeEach(async () => {
    for (const table of [
      "credit_reservations",
      "usage_records",
      "monthly_usage",
      "executions",
    ]) {
      await client.query(`DELETE FROM ${table} WHERE workspace_id = $1`, [
        workspaceId,
      ]);
    }
    await client.query(
      `INSERT INTO credit_balances (id, workspace_id, balance_micros, currency)
       VALUES ($1, $1, $2, 'MNT')
       ON CONFLICT (workspace_id) DO UPDATE SET balance_micros = EXCLUDED.balance_micros`,
      [workspaceId, BALANCE]
    );
  });

  afterAll(async () => {
    for (const table of [
      "credit_reservations",
      "usage_records",
      "monthly_usage",
      "executions",
      "credit_balances",
    ]) {
      await client.query(`DELETE FROM ${table} WHERE workspace_id = $1`, [
        workspaceId,
      ]);
    }
    await client.query(`DELETE FROM organization WHERE id = $1`, [workspaceId]);
    await client.end();
  });

  it("abandons a run that crashed with no usage, releasing its hold", async () => {
    const run = await begin();
    expect(run.allowed).toBe(true);
    expect((await state()).held).toBe(1);

    await backdate(run.id);
    expect(
      await executions.reconcile(run.id, { abandonRunningAfterMs: 60_000 })
    ).toEqual({ action: "abandoned" });

    const after = await state(run.id);
    expect(after).toMatchObject({
      status: "failed",
      held: 0,
      usageRows: 0,
      balance: BALANCE,
    });
    const { rows } = await client.query<{ how: string }>(
      `SELECT metadata->>'how' AS how FROM audit_events
        WHERE resource_id = $1 AND action = 'execution.reconciled'`,
      [run.id]
    );
    expect(rows).toEqual([{ how: "abandoned" }]);
  });

  it("charges a run that crashed after recording progress, once", async () => {
    const run = await begin();
    await run.progress!({ usage });
    await backdate(run.id);

    const result = await executions.reconcile(run.id, {
      abandonRunningAfterMs: 60_000,
    });
    expect(result.action).toBe("settled");
    await executions.reconcile(run.id, { abandonRunningAfterMs: 60_000 });

    const after = await state(run.id);
    expect(after).toMatchObject({ status: "succeeded", held: 0, usageRows: 1 });
    expect(after.charged).toBeGreaterThan(0);
    expect(after.balance).toBe(BALANCE - after.charged);
  });

  it("confirms a settlement that committed before the process died", async () => {
    const crashing = billing.createBillingExecutions({
      settleUsage: async (s) => {
        await billing.billingExecutionPorts().settleUsage(s);
        throw new Error("process died after the charge committed");
      },
    });
    const run = await begin(crashing);
    await expect(run.complete({ usage })).rejects.toThrow("process died");
    expect(await state(run.id)).toMatchObject({
      status: "settling",
      usageRows: 1,
    });

    const result = await executions.reconcile(run.id);
    expect(result.action).toBe("confirmed");
    expect(await executions.reconcile(run.id)).toEqual({
      action: "noop",
      status: "succeeded",
    });

    const after = await state(run.id);
    expect(after).toMatchObject({ status: "succeeded", held: 0, usageRows: 1 });
    expect(after.balance).toBe(BALANCE - after.charged);
  });

  it("settles once after the connection drops mid-settlement", async () => {
    const run = await begin();

    const thrown = await killWhileWaiting(() => run.complete({ usage }));
    expect(thrown).toBeInstanceOf(Error);
    expect(await state(run.id)).toMatchObject({
      status: "settling",
      held: 1,
      usageRows: 0,
      balance: BALANCE,
    });

    expect((await executions.reconcile(run.id)).action).toBe("settled");
    expect((await executions.reconcile(run.id)).action).toBe("noop");

    const after = await state(run.id);
    expect(after).toMatchObject({ status: "succeeded", held: 0, usageRows: 1 });
    expect(after.balance).toBe(BALANCE - after.charged);
  });

  it("leaves no hold and no run when the connection drops mid-admission", async () => {
    const thrown = await killWhileWaiting(() => begin());
    expect(thrown).toBeInstanceOf(Error);

    expect(await state()).toMatchObject({
      held: 0,
      executions: 0,
      usageRows: 0,
      balance: BALANCE,
    });

    // The pool recovered: the next admission is answered.
    const run = await begin();
    expect(run.allowed).toBe(true);
    await run.fail({ error: new Error("cleanup") });
  });

  it("charges once when a late complete() races reconcile", async () => {
    for (let round = 0; round < 5; round++) {
      const run = await begin();
      await run.progress!({ usage });

      await Promise.allSettled([
        run.complete({ usage: { inputTokens: 2_000, outputTokens: 900 } }),
        executions.reconcile(run.id, { abandonRunningAfterMs: 0 }),
      ]);
      // Whatever either left in `settling` is finished here.
      await executions.reconcile(run.id);

      const { rows } = await client.query<{ n: string }>(
        `SELECT count(*) AS n FROM usage_records WHERE request_id = $1`,
        [run.requestId]
      );
      expect(rows[0]!.n).toBe("1");
      expect((await state(run.id)).status).toBe("succeeded");
    }
    const after = await state();
    expect(after).toMatchObject({ held: 0, usageRows: 5 });
    expect(after.balance).toBe(BALANCE - after.charged);
  });
});
