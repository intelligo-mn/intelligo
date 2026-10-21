/**
 * The Stripe webhook entry under arbitrary input: any body with any
 * signature, and any well-formed event Stripe could sign.
 *
 * Signatures are real: `./stripe` is a Stripe client with a dummy key,
 * whose `constructEvent` and `generateTestHeaderString` work offline.
 * The database and the handlers are mocked; the receipt insert stands
 * for the claim. The seed and the number of cases come from
 * `tests/setup/fast-check.ts` (`FC_SEED`, `FC_RUNS`).
 */

import fc from "fast-check";
import Stripe from "stripe";
import { beforeEach, describe, expect, it, vi } from "vitest";

const SECRET = "whsec_fuzz_secret";

const mocks = vi.hoisted(() => ({
  claim: { value: "claimed" as "claimed" | "processed" | "in_flight" },
  handlerFails: { value: false },
  handlerCalls: { value: 0 },
  inserts: { value: 0 },
}));

vi.mock("./stripe", () => {
  const stripe = new Stripe("sk_test_fuzz");
  return { getStripe: () => stripe };
});

vi.mock("./webhook-handlers", () => {
  const handler = async () => {
    mocks.handlerCalls.value++;
    if (mocks.handlerFails.value) throw new Error("handler failed");
  };
  return {
    handleCheckoutCompleted: handler,
    handleCheckoutAsyncPaymentSucceeded: handler,
    handleCheckoutAsyncPaymentFailed: handler,
    handleInvoicePaid: handler,
    handleInvoicePaymentFailed: handler,
    handleSubscriptionUpdated: handler,
    handleSubscriptionDeleted: handler,
    handleChargeRefunded: handler,
    handleChargeDisputeCreated: handler,
  };
});

vi.mock("@intelligo-dev/core/logger", () => ({
  createLogger: () => ({
    debug: () => undefined,
    info: () => undefined,
    warn: () => undefined,
    error: () => undefined,
  }),
}));

vi.mock("@intelligo-dev/core/db/schema", () => ({
  financeEvents: {
    __name: "finance_events",
    stripeEventId: "stripe_event_id",
    processedAt: "processed_at",
    claimedAt: "claimed_at",
    id: "id",
  },
  organization: { __name: "organization", id: "organization.id" },
}));

vi.mock("@intelligo-dev/core/db", () => ({
  db: {
    select: () => ({
      from: (table: { __name: string }) => ({
        where: () => ({
          limit: async () =>
            table.__name === "organization"
              ? [{ id: "ws-1" }]
              : [
                  {
                    processedAt:
                      mocks.claim.value === "processed" ? new Date() : null,
                  },
                ],
        }),
      }),
    }),
    insert: () => ({
      values: () => {
        mocks.inserts.value++;
        return { onConflictDoNothing: async () => undefined };
      },
    }),
    update: () => ({
      set: () => ({
        where: () => ({
          returning: async () =>
            mocks.claim.value === "claimed" ? [{ id: "fe-1" }] : [],
          then: (resolve: (value: unknown) => void) => resolve([]),
        }),
      }),
    }),
  },
}));

import { createStripeWebhookHandler } from "./webhook-route";

const handler = createStripeWebhookHandler({ secret: SECRET });
const stripe = new Stripe("sk_test_fuzz");

beforeEach(() => {
  mocks.claim.value = "claimed";
  mocks.handlerFails.value = false;
  mocks.handlerCalls.value = 0;
  mocks.inserts.value = 0;
});

const post = (body: string | Uint8Array, signature: string | null) =>
  handler(
    new Request("http://localhost/api/webhooks/stripe", {
      method: "POST",
      body: body as BodyInit,
      headers: signature === null ? {} : { "stripe-signature": signature },
    })
  );

/** What a header value can hold: visible ASCII, spaces inside. */
const headerValues = fc.stringMatching(
  /^[\x21-\x7e]([\x20-\x7e]*[\x21-\x7e])?$/
);
const hex = fc.stringMatching(/^[0-9a-f]{0,80}$/);
const timestamps = fc.integer({ min: -1, max: 2 ** 40 });

/** Signature headers shaped like Stripe's, and not. */
const signatures = fc.oneof(
  headerValues,
  fc.tuple(timestamps, hex).map(([t, v1]) => `t=${t},v1=${v1}`),
  fc
    .tuple(timestamps, hex, hex)
    .map(([t, a, b]) => `t=${t},v1=${a},v1=${b},t=${t + 1}`),
  fc.tuple(hex, hex).map(([a, b]) => `v1=${a},v0=${b}`),
  fc.constantFrom("t=", "v1=", ",", "t=,v1=", "")
);

const bodies = fc.oneof(
  fc.string({ unit: "binary", maxLength: 300 }),
  fc.uint8Array({ maxLength: 300 }),
  fc.jsonValue().map((value) => JSON.stringify(value))
);

const TYPES = [
  "checkout.session.completed",
  "checkout.session.async_payment_succeeded",
  "checkout.session.async_payment_failed",
  "invoice.paid",
  "invoice.payment_failed",
  "customer.subscription.updated",
  "customer.subscription.deleted",
  "charge.refunded",
  "charge.dispute.created",
];

/** Stripe metadata: string keys, string values. */
const metadata = fc.dictionary(fc.string({ maxLength: 12 }), fc.string(), {
  maxKeys: 4,
});

/** An event as Stripe sends one: `data.object` is always an object. */
const events = fc.record({
  id: fc.string({ minLength: 1, maxLength: 24 }).map((s) => `evt_${s}`),
  object: fc.constant("event"),
  type: fc.oneof(fc.constantFrom(...TYPES), fc.string({ maxLength: 40 })),
  created: fc.nat(),
  livemode: fc.boolean(),
  data: fc.record({
    object: fc.record(
      {
        id: fc.string(),
        object: fc.string(),
        metadata,
        amount_total: fc.oneof(fc.integer(), fc.jsonValue()),
        amount_paid: fc.oneof(fc.integer(), fc.jsonValue()),
        currency: fc.oneof(
          fc.constantFrom("usd", "eur", "mnt"),
          fc.jsonValue()
        ),
        subscription: fc.oneof(fc.string(), fc.record({ metadata })),
        customer: fc.oneof(fc.string(), fc.record({ metadata })),
        extra: fc.jsonValue({ maxDepth: 2 }),
      },
      { requiredKeys: [] }
    ),
  }),
});

describe("the Stripe webhook entry", () => {
  it("W1: any body with any signature is refused with 400, and nothing is recorded", async () => {
    await fc.assert(
      fc.asyncProperty(
        bodies,
        fc.option(signatures),
        async (body, signature) => {
          mocks.inserts.value = 0;
          mocks.handlerCalls.value = 0;
          const response = await post(body, signature);
          expect(response.status).toBe(400);
          expect(mocks.inserts.value).toBe(0);
          expect(mocks.handlerCalls.value).toBe(0);
        }
      )
    );
  });

  it("W2: a signed, well-formed event is answered by its claim and its handler", async () => {
    await fc.assert(
      fc.asyncProperty(
        events,
        fc.constantFrom("claimed", "processed", "in_flight" as const),
        fc.boolean(),
        async (event, claim, fails) => {
          mocks.claim.value = claim;
          mocks.handlerFails.value = fails;
          mocks.handlerCalls.value = 0;
          const payload = JSON.stringify(event);
          const signature = stripe.webhooks.generateTestHeaderString({
            payload,
            secret: SECRET,
          });
          const response = await post(payload, signature);
          // Only a claimed event of a type with a handler is dispatched,
          // once; a processed one is a duplicate, an in-flight one is
          // Stripe's to retry, and only a handler failure is a 500.
          const dispatched = claim === "claimed" && TYPES.includes(event.type);
          expect(mocks.handlerCalls.value).toBe(dispatched ? 1 : 0);
          const status =
            claim === "in_flight" ? 409 : dispatched && fails ? 500 : 200;
          expect(response.status).toBe(status);
        }
      )
    );
  });

  it("W3: a valid signature on a stale timestamp is refused with 400", async () => {
    await fc.assert(
      fc.asyncProperty(
        events,
        fc.integer({ min: 301, max: 10 ** 8 }),
        async (event, age) => {
          mocks.inserts.value = 0;
          const payload = JSON.stringify(event);
          const signature = stripe.webhooks.generateTestHeaderString({
            payload,
            secret: SECRET,
            timestamp: Math.floor(Date.now() / 1000) - age,
          });
          const response = await post(payload, signature);
          expect(response.status).toBe(400);
          expect(mocks.inserts.value).toBe(0);
        }
      )
    );
  });
});
