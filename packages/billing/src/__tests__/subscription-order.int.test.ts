/**
 * A canceled subscription stays canceled, whatever Stripe delivers
 * after the deletion and in whatever order: shuffled and duplicated
 * `customer.subscription.updated` (active or past due),
 * `customer.subscription.deleted` and `invoice.paid` for one
 * subscription, run through the webhook dispatch against a real
 * database. Once the deletion has been handled, the subscription row is
 * canceled with no Stripe id, and the workspace resolves to the free
 * plan.
 *
 * Stripe's read of the subscription is mocked to answer with the state
 * the delivery carried, the stalest answer a late retry could meet.
 *
 * Runs against a real database when TEST_PG_URL is set. DATABASE_URL
 * must point at the same database.
 */

import fc from "fast-check";
import type Stripe from "stripe";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { Client } from "pg";

const stripe = vi.hoisted(() => ({
  /** What Stripe answers for the subscription while a delivery runs. */
  current: null as null | Record<string, unknown>,
}));

vi.mock("../stripe", () => ({
  getStripe: () => ({
    subscriptions: { retrieve: async () => stripe.current },
  }),
}));

const PG_URL = process.env.TEST_PG_URL;
const d = PG_URL ? describe : describe.skip;

type Delivery =
  | { type: "customer.subscription.updated"; status: "active" | "past_due" }
  | { type: "customer.subscription.deleted" }
  | { type: "invoice.paid" };

const delivery: fc.Arbitrary<Delivery> = fc.oneof(
  fc
    .constantFrom<"active" | "past_due">("active", "past_due")
    .map(
      (status) => ({ type: "customer.subscription.updated", status }) as const
    ),
  fc.constant({ type: "invoice.paid" } as const)
);

/** Deliveries with at least one deletion among them, in any order. */
const deliveries = fc
  .tuple(
    fc.array(delivery, { maxLength: 8 }),
    fc.integer({ min: 1, max: 3 }),
    fc.array(fc.nat(), { minLength: 3, maxLength: 3 })
  )
  .map(([others, deletions, positions]) => {
    const list: Delivery[] = [...others];
    for (let i = 0; i < deletions; i++) {
      list.splice(positions[i]! % (list.length + 1), 0, {
        type: "customer.subscription.deleted",
      });
    }
    return list;
  });

d("subscription events in any order (integration)", () => {
  const client = new Client({ connectionString: PG_URL });
  const suffix = Date.now();
  const paidPlan = `plan_sub-order-pro-${suffix}`;
  const workspaces: string[] = [];
  let insertedFree = false;
  let route: typeof import("../webhook-route");
  let queries: typeof import("../queries");

  beforeAll(async () => {
    await client.connect();
    await client.query(
      `INSERT INTO plans (id, name, slug, price_monthly, price_yearly, features, limits)
       VALUES ($1, 'Pro', $2, 0, 0, '[]', '{}')`,
      [paidPlan, `sub-order-pro-${suffix}`]
    );
    const free = await client.query(
      `INSERT INTO plans (id, name, slug, price_monthly, price_yearly, features, limits)
       VALUES ($1, 'Free', 'free', 0, 0, '[]', '{}')
       ON CONFLICT DO NOTHING RETURNING id`,
      [`plan_free_sub_order_${suffix}`]
    );
    insertedFree = free.rows.length > 0;
    route = await import("../webhook-route");
    queries = await import("../queries");
  });

  afterAll(async () => {
    await client.query(`DELETE FROM organization WHERE id = ANY($1)`, [
      workspaces,
    ]);
    await client.query(`DELETE FROM plans WHERE id = $1`, [paidPlan]);
    if (insertedFree) {
      await client.query(`DELETE FROM plans WHERE id = $1`, [
        `plan_free_sub_order_${suffix}`,
      ]);
    }
    await client.end();
  });

  async function subscribed() {
    const workspaceId = `ws_sub_order_${suffix}_${workspaces.length}`;
    workspaces.push(workspaceId);
    const subscriptionId = `sub_${workspaceId}`;
    await client.query(
      `INSERT INTO organization (id, name, slug, created_at) VALUES ($1, 'Sub order', $1, now())`,
      [workspaceId]
    );
    await client.query(
      `INSERT INTO subscriptions (id, workspace_id, plan_id, status, stripe_subscription_id)
       VALUES ($1, $2, $3, 'active', $4)`,
      [`row_${workspaceId}`, workspaceId, paidPlan, subscriptionId]
    );
    return { workspaceId, subscriptionId };
  }

  function event(
    sent: Delivery,
    ids: { workspaceId: string; subscriptionId: string },
    n: number
  ): Stripe.Event {
    const start = Math.floor(Date.now() / 1000);
    const period = { start, end: start + 30 * 86_400 };
    const subscription = {
      id: ids.subscriptionId,
      status:
        sent.type === "customer.subscription.updated"
          ? sent.status
          : "canceled",
      cancel_at_period_end: false,
      metadata: { planId: paidPlan, workspaceId: ids.workspaceId },
      items: {
        data: [
          {
            price: { id: `price_${suffix}` },
            current_period_start: period.start,
            current_period_end: period.end,
          },
        ],
      },
    };
    const object =
      sent.type === "invoice.paid"
        ? {
            id: `in_${ids.workspaceId}_${n}`,
            subscription: ids.subscriptionId,
            lines: { data: [{ period }] },
          }
        : subscription;
    return {
      id: `evt_${ids.workspaceId}_${n}`,
      type: sent.type,
      data: { object },
    } as unknown as Stripe.Event;
  }

  it("leaves a canceled subscription canceled and the workspace on the free plan", async () => {
    await fc.assert(
      fc.asyncProperty(deliveries, async (list) => {
        const ids = await subscribed();
        let deleted = false;
        for (const [n, sent] of list.entries()) {
          const delivered = event(sent, ids, n);
          stripe.current =
            sent.type === "invoice.paid"
              ? null
              : (delivered.data.object as unknown as Record<string, unknown>);
          await route.dispatchStripeEvent(delivered);
          if (sent.type === "customer.subscription.deleted") deleted = true;
          if (!deleted) continue;

          const { rows } = await client.query<{
            status: string;
            stripe_subscription_id: string | null;
          }>(
            `SELECT status, stripe_subscription_id FROM subscriptions WHERE workspace_id = $1`,
            [ids.workspaceId]
          );
          expect(rows, JSON.stringify(list)).toEqual([
            { status: "canceled", stripe_subscription_id: null },
          ]);
          const billing = await queries.getWorkspaceBilling(ids.workspaceId);
          expect(billing.plan?.slug).toBe("free");
        }
      }),
      { numRuns: 25 }
    );
  }, 120_000);
});
