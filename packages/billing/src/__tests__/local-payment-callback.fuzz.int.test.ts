/**
 * Local-payment settlement by an arbitrary callback invoice id, against
 * a real database: whatever string the unauthenticated callback names,
 * settling never fails the request and grants nothing the provider has
 * not reported paid.
 *
 * The provider under test reports every invoice pending. Two workspaces
 * hold open invoices, so an id can name either one's invoice or payment
 * row as well as nothing. The empty id is left out: it is the scheduled
 * sweep, not a callback (the route answers it 400).
 *
 * Runs when TEST_PG_URL is set; DATABASE_URL must point at the same
 * database. The seed and the number of cases come from
 * `tests/setup/fast-check.ts` (`FC_SEED`, `FC_RUNS`).
 */

import fc from "fast-check";
import { Client } from "pg";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";

import { fromMajor } from "@intelligo-dev/core/money";

const PG_URL = process.env.TEST_PG_URL;
const d = PG_URL ? describe : describe.skip;

const suffix = Date.now();
const WORKSPACES = [`ws_cb_fuzz_a_${suffix}`, `ws_cb_fuzz_b_${suffix}`];
const USER = `user_cb_fuzz_${suffix}`;
const MODE = `fuzz-pending-${suffix}`;

vi.setConfig({ testTimeout: 120_000, hookTimeout: 60_000 });

d("local-payment settlement by an arbitrary callback id", () => {
  const client = new Client({ connectionString: PG_URL });
  let local: typeof import("../local-payments");
  let payment: typeof import("../payment");
  const named: string[] = [];
  let fulfilled = 0;
  const fulfil = (): never => {
    fulfilled++;
    throw new Error("nothing was paid");
  };

  beforeAll(async () => {
    await client.connect();
    vi.stubEnv("PAYMENT_MODE", MODE);
    local = await import("../local-payments");
    payment = await import("../payment");
    payment.registerPaymentProvider(MODE, {
      ...payment.mockPaymentProvider,
      async checkPayment(invoiceId) {
        return { invoiceId, status: "pending", amount: 0 };
      },
    });

    await client.query(
      `INSERT INTO users (id, name, email, email_verified, created_at, updated_at)
       VALUES ($1, 'Buyer', $2, true, now(), now())`,
      [USER, `${USER}@example.test`]
    );
    for (const workspaceId of WORKSPACES) {
      await client.query(
        `INSERT INTO organization (id, name, slug, created_at) VALUES ($1, 'Callback fuzz', $1, now())`,
        [workspaceId]
      );
      const invoice = await local.openLocalInvoice({
        workspaceId,
        userId: USER,
        reference: "bundle-5",
        price: fromMajor(5, "USD"),
      });
      const { rows } = await client.query<{ id: string }>(
        `SELECT id FROM payments WHERE invoice_id = $1`,
        [invoice.invoiceId]
      );
      named.push(invoice.invoiceId, rows[0]!.id);
    }
  });

  afterAll(async () => {
    payment?.clearPaymentProviders();
    vi.unstubAllEnvs();
    await client.query(`DELETE FROM organization WHERE id = ANY($1)`, [
      WORKSPACES,
    ]);
    await client.query(`DELETE FROM users WHERE id = $1`, [USER]);
    await client.end();
  });

  const invoiceIds = () =>
    fc.oneof(
      fc.string({ unit: "binary", minLength: 1, maxLength: 80 }),
      fc.constantFrom(...named),
      fc.constantFrom(...named).map((id) => ` ${id}`),
      fc.string({ minLength: 1_000, maxLength: 20_000 }),
      fc
        .tuple(fc.string({ unit: "binary" }), fc.string({ unit: "binary" }))
        .map(([a, b]) => `${a}\u0000${b}`)
    );

  it("L1: never rejects, and reports a failed invoice only in its result", async () => {
    await fc.assert(
      fc.asyncProperty(invoiceIds(), async (invoiceId) => {
        const result = await local.settlePendingLocalInvoices({
          invoiceId,
          fulfil,
        });
        expect(result.errors).toEqual([]);
        expect(result.paid).toBe(0);
      })
    );
  });

  it("L2: nothing is granted, and every invoice stays pending and unfulfilled", async () => {
    expect(fulfilled).toBe(0);
    const { rows } = await client.query<{
      status: string;
      fulfilled_at: Date | null;
    }>(
      `SELECT status, fulfilled_at FROM payments WHERE workspace_id = ANY($1)`,
      [WORKSPACES]
    );
    expect(rows).toHaveLength(2);
    for (const row of rows) {
      expect(row).toEqual({ status: "pending", fulfilled_at: null });
    }
    const { rows: credit } = await client.query(
      `SELECT 1 FROM credit_balances WHERE workspace_id = ANY($1) AND balance_micros <> 0`,
      [WORKSPACES]
    );
    expect(credit).toEqual([]);
  });

  it("L3: reading the id from any callback URL never throws", async () => {
    const provider = payment.getPaymentProviderFor(MODE);
    await fc.assert(
      fc.asyncProperty(
        fc.webUrl({ withQueryParameters: true, withFragments: true }),
        fc.option(fc.string({ unit: "grapheme" })),
        async (base, invoice) => {
          const url = new URL(base);
          if (invoice !== null) url.searchParams.set("invoice", invoice);
          const read = await provider.invoiceIdFromCallback!(
            new Request(url, { method: "POST" })
          );
          expect(read === null || typeof read === "string").toBe(true);
          if (invoice !== null) expect(read).toBe(invoice);
        }
      )
    );
  });
});
