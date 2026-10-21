---
title: "Threat model: billing"
description: "STRIDE threats against plans, credits, rate limits, trials, Stripe webhooks and local payments in @intelligo-dev/billing, and what holds each."
order: 3
label: "Billing threats"
---

- **Scope:** `@intelligo-dev/billing`: the quota engine, credit balances and reservations, feature gates, trials, rate limiting, `createStripeWebhookHandler`, checkout, payment providers.
- **Assets:** credit balances, subscriptions, plan grants, finance events.
- **Trust boundaries:** Stripe → `/api/webhooks/stripe`; a payment provider → `/api/webhooks/local-payment`; server actions → checkout.

## Spoofing

| Threat                        | Control                                                                                                                                                  | Yours                                                   |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| Forged Stripe event           | `constructEvent` with `STRIPE_WEBHOOK_SECRET`; a missing or bad signature gets 400                                                                       | Keep the secret per environment                         |
| Forged local-payment callback | Only the invoice id is read from the request; the invoice is settled by asking the provider (`checkPayment`), so a forged callback grants nothing unpaid | Implement `invoiceIdFromCallback` defensively           |
| Mock payments in production   | The mock provider is refused in production                                                                                                               | Register a real provider with `registerPaymentProvider` |

## Tampering

| Threat                                         | Control                                                                                                                                     |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Replaying an event to grant credit twice       | Receipt keyed by Stripe's event id; processing is gated by a claim; a processed event answers 200 as a duplicate, one in flight answers 409 |
| An old subscription update undoing a newer one | The handler reads the subscription back from Stripe and writes its current state; a late event never reactivates a canceled subscription    |
| Keeping purchased credit after a refund        | `charge.refunded` and `charge.dispute.created` take the refunded or disputed share back out of the balance                                  |
| Racing two requests past a limit               | Admission and settlement are transactions; the rate-limit counter is an atomic upsert                                                       |

## Repudiation

Every Stripe event is written to `finance_events`, keyed by its id, before any handler runs, and is marked processed only after the handlers succeed. Payments and credit purchases are rows with their own status, and each execution's usage is a row in `usage_records`.

## Information disclosure

The webhook's answers say nothing beyond Stripe's contract. The local-payment callback answers the provider's expected response, or `{ ok }`; what failed is only in the server log. Billing reads are scoped to the caller's workspace.

## Denial of service

| Threat                        | Control                                                                        | Yours                                                     |
| ----------------------------- | ------------------------------------------------------------------------------ | --------------------------------------------------------- |
| Flooding chat or uploads      | Per-workspace, per-minute limits from the plan                                 | A rate for every plan you sell                            |
| Failed runs locking up credit | Holds expire; maintenance reconciles stale runs and drops expired reservations | Schedule the cron                                         |
| A huge webhook body           | —                                                                              | Cap the body size at the edge; the handler reads it whole |

<!-- snippet: packages/billing/src/plan-registry.ts#DEFAULT_REQUESTS_PER_MINUTE -->

```ts
export const DEFAULT_REQUESTS_PER_MINUTE = 10;
```

## Elevation of privilege

| Threat                                   | Control                                                                                                                                   | Yours                                                                                                      |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Repeated trials through address variants | `checkTrialAbuse` normalizes addresses and allows at most 3 trials per address and 5 per IP; it limits repetition, it does not prevent it | Pass the client IP as `ipAddress` to `provisionTrialCredits`; the scaffold's example passes only the email |
| Using a feature the plan lacks           | `hasFeature` gates on the server; an unregistered feature is denied, and so is every feature while the flags cannot be read               | —                                                                                                          |

## Residual risks

- The Stripe webhook reads its body without a size cap.
- Signed-in surfaces are limited per workspace, not per IP. A public route needs its own `checkRateLimit` on a hashed IP.
