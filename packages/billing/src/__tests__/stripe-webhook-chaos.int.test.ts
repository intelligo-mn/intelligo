/**
 * Stripe's deliveries as Stripe makes them — duplicated, concurrent,
 * out of order, retried after a failure — through the webhook route
 * and its handlers, against a real database.
 *
 * The claim protocol: concurrent deliveries of one event run its
 * handlers once, a failed run is released for the retry, and a claim
 * older than any lease can be taken again. Then a property over one
 * credit purchase's whole timeline (the payment, refunds, a dispute)
 * delivered in any order with duplicates and one failed delivery: the
 * purchase is credited at most once, the balance is never negative, and
 * it ends where the timeline says it must.
 *
 * Stripe itself is mocked: signature checks pass, and the reads the
 * handlers make return the timeline's final state, as Stripe would by
 * the time its events arrive.
 *
 * Runs against a real database when TEST_PG_URL is set. DATABASE_URL
 * must point at the same database.
 */

import fc from "fast-check";
import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { Client } from "pg";

const stripe = vi.hoisted(() => ({
  /** The payment's charge as Stripe holds it now. */
  charge: null as null | Record<string, unknown>,
  checkoutSession: "",
  chargesListFailures: 0,
}));

vi.mock("../stripe", () => ({
  getStripe: () => ({
    webhooks: { constructEvent: (body: string) => JSON.parse(body) },
    checkout: {
      sessions: {
        list: async () => ({ data: [{ id: stripe.checkoutSession }] }),
      },
    },
    charges: {
      list: async () => {
        if (stripe.chargesListFailures > 0) {
          stripe.chargesListFailures--;
          throw new Error("Stripe is unavailable");
        }
        return { data: stripe.charge ? [stripe.charge] : [] };
      },
      retrieve: async () => stripe.charge,
    },
  }),
}));

const PG_URL = process.env.TEST_PG_URL;
const d = PG_URL ? describe : describe.skip;

/** What the customer paid, in minor units, and the credit it buys. */
const PAID = 3500;
const GRANTED = 40_000_000;

type Outcome = "paid" | "async_succeeded" | "async_failed";

type Timeline = {
  outcome: Outcome;
  /** The charge's cumulative refunded amount after each refund. */
  refunds: number[];
  /** A dispute's amount, when the charge is disputed. */
  dispute: number | null;
};

d("Stripe webhook delivery chaos (integration)", () => {
  const client = new Client({ connectionString: PG_URL });
  const suffix = Date.now();
  const workspaces: string[] = [];
  let currency: string;
  let route: typeof import("../webhook-route");

  /** Fails the next delivery after its handlers ran, once. */
  let failNext = false;
  let handlerRuns = 0;

  const handler = () =>
    route.createStripeWebhookHandler({
      secret: "whsec_test",
      onEvent: async () => {
        handlerRuns++;
        if (failNext) {
          failNext = false;
          throw new Error("delivery failed after its handlers ran");
        }
      },
    });

  const deliver = (
    post: (request: Request) => Promise<Response>,
    event: unknown
  ) =>
    post(
      new Request("http://localhost/api/webhooks/stripe", {
        method: "POST",
        headers: { "stripe-signature": "t=1,v1=test" },
        body: JSON.stringify(event),
      })
    );

  /** A workspace with one pending credit purchase, and its Stripe ids. */
  async function purchase() {
    const n = workspaces.length;
    const workspaceId = `webhook-chaos-ws-${suffix}-${n}`;
    workspaces.push(workspaceId);
    const ids = {
      workspaceId,
      purchaseId: `cp_${workspaceId}`,
      session: `cs_${workspaceId}`,
      intent: `pi_${workspaceId}`,
      charge: `ch_${workspaceId}`,
      event: (name: string) => `evt_${workspaceId}_${name}`,
    };
    await client.query(
      `INSERT INTO organization (id, name, slug, created_at, updated_at)
       VALUES ($1, 'Webhook chaos', $1, now(), now())`,
      [workspaceId]
    );
    await client.query(
      `INSERT INTO credit_purchases (id, workspace_id, price_minor, price_currency, granted_micros, granted_currency, stripe_checkout_session_id, status)
       VALUES ($1, $2, $3, 'usd', $4, $5, $6, 'pending')`,
      [ids.purchaseId, workspaceId, PAID, GRANTED, currency, ids.session]
    );
    stripe.checkoutSession = ids.session;
    stripe.charge = null;
    stripe.chargesListFailures = 0;
    return ids;
  }

  async function ledger(workspaceId: string) {
    const { rows } = await client.query<{
      balance: string | null;
      reversed: string;
      status: string;
    }>(
      `SELECT
         (SELECT balance_micros FROM credit_balances WHERE workspace_id = $1) AS balance,
         (SELECT coalesce(sum(charged_micros), 0) FROM usage_records
           WHERE workspace_id = $1 AND type = 'credit') AS reversed,
         (SELECT status FROM credit_purchases WHERE workspace_id = $1) AS status`,
      [workspaceId]
    );
    return {
      balance: Number(rows[0]!.balance ?? 0),
      reversed: Number(rows[0]!.reversed),
      status: rows[0]!.status,
    };
  }

  const session = (
    ids: Awaited<ReturnType<typeof purchase>>,
    type: string,
    paymentStatus: "paid" | "unpaid"
  ) => ({
    id: ids.event(type),
    type,
    data: {
      object: {
        id: ids.session,
        mode: "payment",
        payment_status: paymentStatus,
        payment_intent: ids.intent,
        metadata: { workspaceId: ids.workspaceId, purchaseId: ids.purchaseId },
      },
    },
  });

  const chargeState = (
    ids: Awaited<ReturnType<typeof purchase>>,
    refunded: number
  ) => ({
    id: ids.charge,
    amount: PAID,
    amount_refunded: refunded,
    refunded: refunded >= PAID,
    payment_intent: ids.intent,
  });

  beforeAll(async () => {
    await client.connect();
    const settings = await import("../billing-settings");
    settings.invalidateBillingSettingsCache();
    currency = (await settings.getBillingSettings()).currency;
    route = await import("../webhook-route");
  });

  beforeEach(() => {
    failNext = false;
    handlerRuns = 0;
  });

  afterAll(async () => {
    for (const table of [
      "usage_records",
      "credit_balances",
      "credit_purchases",
      "finance_events",
    ]) {
      await client.query(`DELETE FROM ${table} WHERE workspace_id = ANY($1)`, [
        workspaces,
      ]);
    }
    await client.query(
      `DELETE FROM finance_events WHERE stripe_event_id LIKE $1`,
      [`evt_webhook-chaos-ws-${suffix}-%`]
    );
    await client.query(`DELETE FROM organization WHERE id = ANY($1)`, [
      workspaces,
    ]);
    await client.end();
  });

  describe("the claim", () => {
    it("runs one event's handlers once under concurrent deliveries", async () => {
      const ids = await purchase();
      const post = handler();
      const event = session(ids, "checkout.session.completed", "paid");

      const responses = await Promise.all(
        Array.from({ length: 5 }, () => deliver(post, event))
      );
      const bodies = await Promise.all(responses.map((r) => r.json()));

      expect(handlerRuns).toBe(1);
      expect(
        bodies.filter((b) => b.received === true && !b.duplicate)
      ).toHaveLength(1);
      for (const response of responses) {
        expect([200, 409]).toContain(response.status);
      }
      const { rows } = await client.query(
        `SELECT 1 FROM finance_events WHERE stripe_event_id = $1`,
        [event.id]
      );
      expect(rows).toHaveLength(1);
      expect(await ledger(ids.workspaceId)).toMatchObject({
        balance: GRANTED,
        status: "completed",
      });
    });

    it("releases a failed delivery's claim, and the retry finishes the event once", async () => {
      const ids = await purchase();
      const post = handler();
      const event = session(ids, "checkout.session.completed", "paid");
      stripe.chargesListFailures = 1;

      expect((await deliver(post, event)).status).toBe(500);
      const { rows } = await client.query<{ claimed_at: Date | null }>(
        `SELECT claimed_at FROM finance_events WHERE stripe_event_id = $1`,
        [event.id]
      );
      expect(rows[0]!.claimed_at).toBeNull();

      expect((await deliver(post, event)).status).toBe(200);
      expect((await deliver(post, event)).status).toBe(200);
      expect(handlerRuns).toBe(1);
      expect(await ledger(ids.workspaceId)).toMatchObject({
        balance: GRANTED,
        status: "completed",
      });
    });

    it("lets a delivery take a claim older than any lease", async () => {
      const ids = await purchase();
      const post = handler();
      const event = session(ids, "checkout.session.completed", "paid");
      await client.query(
        `INSERT INTO finance_events (id, workspace_id, stripe_event_id, type, claimed_at)
         VALUES ($1, $2, $1, $3, now() AT TIME ZONE 'UTC')`,
        [event.id, ids.workspaceId, event.type]
      );

      expect((await deliver(post, event)).status).toBe(409);

      await client.query(
        `UPDATE finance_events SET claimed_at = claimed_at - interval '1 day'
          WHERE stripe_event_id = $1`,
        [event.id]
      );
      expect((await deliver(post, event)).status).toBe(200);
      expect(handlerRuns).toBe(1);
      expect((await ledger(ids.workspaceId)).balance).toBe(GRANTED);
    });
  });

  describe("one purchase's timeline, delivered in any order", () => {
    const timeline: fc.Arbitrary<Timeline> = fc.record({
      outcome: fc.constantFrom<Outcome>(
        "paid",
        "async_succeeded",
        "async_failed"
      ),
      refunds: fc
        .uniqueArray(fc.integer({ min: 1, max: PAID }), { maxLength: 3 })
        .map((amounts) => [...amounts].sort((a, b) => a - b)),
      dispute: fc.option(fc.integer({ min: 1, max: PAID }), { nil: null }),
    });

    /** The deliveries: every event once in some order, some twice, one failing. */
    const scenario = timeline.chain((t) => {
      const count = eventCount(t);
      const indices = Array.from({ length: count }, (_, i) => i);
      return fc.record({
        timeline: fc.constant(t),
        order: fc.shuffledSubarray(indices, {
          minLength: count,
          maxLength: count,
        }),
        duplicates: fc.array(fc.tuple(fc.nat(), fc.nat()), { maxLength: 3 }),
        failAt: fc.option(fc.nat(), { nil: null }),
      });
    });

    function eventCount(t: Timeline): number {
      if (t.outcome === "async_failed") return 2;
      const payment = t.outcome === "paid" ? 1 : 2;
      return payment + t.refunds.length + (t.dispute === null ? 0 : 1);
    }

    function events(t: Timeline, ids: Awaited<ReturnType<typeof purchase>>) {
      const list: { id: string; type: string; data: { object: unknown } }[] =
        [];
      if (t.outcome === "paid") {
        list.push(session(ids, "checkout.session.completed", "paid"));
      } else {
        list.push(session(ids, "checkout.session.completed", "unpaid"));
        list.push(
          session(
            ids,
            t.outcome === "async_succeeded"
              ? "checkout.session.async_payment_succeeded"
              : "checkout.session.async_payment_failed",
            "paid"
          )
        );
      }
      if (t.outcome === "async_failed") return list;
      for (const [n, refunded] of t.refunds.entries()) {
        list.push({
          id: ids.event(`refund_${n}`),
          type: "charge.refunded",
          data: { object: chargeState(ids, refunded) },
        });
      }
      if (t.dispute !== null) {
        list.push({
          id: ids.event("dispute"),
          type: "charge.dispute.created",
          data: {
            object: {
              id: `dp_${ids.workspaceId}`,
              amount: t.dispute,
              charge: ids.charge,
              payment_intent: ids.intent,
            },
          },
        });
      }
      return list;
    }

    /**
     * The events whose handlers run, in order: every first delivery, and
     * the failed one again at its next delivery or at the retry that
     * follows the rest.
     */
    function dispatchOrder<E extends { id: string }>(
      deliveries: E[],
      failing: number
    ): E[] {
      const done = new Set<string>();
      const ran: E[] = [];
      let retry: E | null = null;
      for (const [i, event] of deliveries.entries()) {
        if (done.has(event.id)) continue;
        ran.push(event);
        if (i === failing) {
          retry = event;
          continue;
        }
        done.add(event.id);
      }
      if (retry && !done.has(retry.id)) ran.push(retry);
      return ran;
    }

    /**
     * Where, in the order events were first handled, a full refund or a
     * dispute refused the grant by coming before it; -1 when none did.
     */
    function refusingEvent(
      t: Timeline,
      list: { id: string; type: string; data: { object: unknown } }[],
      firstHandled: string[]
    ): number {
      if (t.outcome === "async_failed") return -1;
      const position = (id: string) => firstHandled.indexOf(id);
      const grant = list.find(
        (e) =>
          (e.type === "checkout.session.completed" && t.outcome === "paid") ||
          e.type === "checkout.session.async_payment_succeeded"
      )!;
      const blocking = list
        .filter(
          (e) =>
            e.type === "charge.dispute.created" ||
            (e.type === "charge.refunded" &&
              (e.data.object as { refunded: boolean }).refunded)
        )
        .map((e) => position(e.id));
      const first = Math.min(...blocking);
      return first < position(grant.id) ? first : -1;
    }

    /**
     * What the purchase must end with. It is granted unless the payment
     * failed or a full refund or a dispute was handled before the grant;
     * a granted purchase then loses the refunded share (the charge's
     * final refunded amount) and the disputed share, never more than the
     * grant.
     */
    function expected(
      t: Timeline,
      list: { id: string; type: string; data: { object: unknown } }[],
      firstHandled: string[]
    ): { granted: boolean; balance: number } {
      const refused = { granted: false, balance: 0 };
      if (t.outcome === "async_failed") return refused;
      if (refusingEvent(t, list, firstHandled) !== -1) return refused;

      const refunded = t.refunds[t.refunds.length - 1] ?? 0;
      const taken =
        Math.floor((GRANTED * refunded) / PAID) +
        (t.dispute === null ? 0 : Math.floor((GRANTED * t.dispute) / PAID));
      return { granted: true, balance: GRANTED - Math.min(GRANTED, taken) };
    }

    it("credits once and ends where the timeline says", async () => {
      await fc.assert(
        fc.asyncProperty(scenario, async (s) => {
          const ids = await purchase();
          const t = s.timeline;
          const list = events(t, ids);
          const finalRefund = t.refunds[t.refunds.length - 1];
          stripe.charge =
            t.outcome === "async_failed"
              ? null
              : chargeState(ids, finalRefund ?? 0);

          const deliveries = s.order.map((i) => list[i]!);
          for (const [event, at] of s.duplicates) {
            deliveries.splice(
              at % (deliveries.length + 1),
              0,
              list[event % list.length]!
            );
          }
          const failing = s.failAt === null ? -1 : s.failAt % deliveries.length;

          // A purchase whose grant a full refund or a dispute refused is
          // checked only up to that event: later refunds and disputes of
          // it are outside this property.
          const dispatched = dispatchOrder(deliveries, failing);
          const handledOrder = [...new Set(dispatched.map((e) => e.id))];
          const refusedAt = refusingEvent(t, list, handledOrder);
          const refusedBy = handledOrder[refusedAt];
          fc.pre(
            refusedAt === -1 ||
              !dispatched.some(
                (e, i) =>
                  i > dispatched.findIndex((d) => d.id === refusedBy) &&
                  (e.type === "charge.refunded" ||
                    e.type === "charge.dispute.created")
              )
          );

          const post = handler();
          const firstHandled: string[] = [];
          const retries: typeof deliveries = [];
          for (const [i, event] of deliveries.entries()) {
            failNext = i === failing;
            const handled = !firstHandled.includes(event.id);
            const response = await deliver(post, event);
            if (handled) firstHandled.push(event.id);
            if (i === failing && handled) {
              expect(response.status).toBe(500);
              retries.push(event);
            } else {
              expect(response.status).toBe(200);
            }
            failNext = false;
            const { balance } = await ledger(ids.workspaceId);
            expect(balance).toBeGreaterThanOrEqual(0);
            expect(balance).toBeLessThanOrEqual(GRANTED);
          }
          for (const event of retries) {
            expect((await deliver(post, event)).status).toBe(200);
          }

          const end = await ledger(ids.workspaceId);
          const want = expected(t, list, firstHandled);
          const where = JSON.stringify({ s, firstHandled });
          expect(end.balance, where).toBe(want.balance);
          // Credited once: whatever is not in the balance was reversed.
          expect(end.reversed, where).toBe(
            want.granted ? GRANTED - end.balance : 0
          );
        }),
        { numRuns: 25 }
      );
    }, 120_000);
  });
});
