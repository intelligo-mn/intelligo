---
title: "Production checklist"
description: "Every setting, cron and limit to confirm before an Intelligo app takes real users and money: env, secrets, email, Stripe, rate limits, cron."
order: 1
label: "Production checklist"
---

Go through this once before launch, and again after every release that changes a template (`intelligo upgrade --check` lists them).

## Environment and secrets

- [ ] `DATABASE_URL`, `BETTER_AUTH_SECRET` (at least 32 characters, from `openssl rand -base64 32`) and `NEXT_PUBLIC_APP_URL` are set. `assertEnv` refuses to start without them, or with a shorter secret.
- [ ] `NEXT_PUBLIC_APP_URL` is the public `https://` origin. It is the only origin the auth CSRF check trusts, and email links are built from it.
- [ ] An email provider is set (`RESEND_API_KEY` with `EMAIL_FROM` on a verified domain, or `LOOPS_API_KEY`). Production refuses to start without one unless `EMAIL_PROVIDER=console`, which leaves sign-ups unverified.
- [ ] `STRIPE_SECRET_KEY` is a live key, not `sk_test_`, and `STRIPE_WEBHOOK_SECRET` is the live endpoint's secret.
- [ ] `CRON_SECRET` is at least 32 characters. Below that, the maintenance route answers 403.
- [ ] The `[Env]` lines in the first boot log name no half-set group (Google, GitHub, Stripe, `STORAGE_*`): such a group is a feature that fails later. The one line listing optional variables left unset is expected.
- [ ] `pnpm exec intelligo doctor` reports no failure with the production environment.
- [ ] Secrets live in the host's secret store, not in the repository, and you know how to rotate each one.

## Behind a proxy

- [ ] With more than one proxy in front of the app (CDN plus load balancer), set `AUTH_TRUSTED_PROXIES` to their CIDRs, and `AUTH_IP_HEADERS` if the client address is not in `x-forwarded-for`. Without them, every client shares one auth rate-limit bucket.

## Rate limits

- [ ] Auth endpoints are limited per client address, counted in Postgres and active when `NODE_ENV=production`. The global limit is 100 requests per 10 s; these paths have their own:

<!-- snippet: packages/auth/src/request-hardening.ts#AUTH_RATE_LIMIT_RULES -->

```ts
export const AUTH_RATE_LIMIT_RULES = {
  "/sign-in/*": { window: 10, max: 3 },
  "/sign-up/*": { window: 10, max: 3 },
  "/change-password": { window: 10, max: 3 },
  "/change-email": { window: 10, max: 3 },
  "/request-password-reset": { window: 60, max: 3 },
  "/send-verification-email": { window: 60, max: 3 },
  "/forget-password": { window: 60, max: 3 },
} as const;
```

- [ ] Chat and uploads are limited per workspace per minute by the plan. Each plan you sell has an entry; an unregistered plan gets the floor:

<!-- snippet: packages/billing/src/plan-registry.ts#DEFAULT_REQUESTS_PER_MINUTE -->

```ts
export const DEFAULT_REQUESTS_PER_MINUTE = 10;
```

<!-- snippet: packages/cli/templates/app-scaffold/plans.ts.tpl#RATE_LIMITS -->

```ts
export const RATE_LIMITS = plans.values({
  free: 10,
  pro: 60,
});
```

## Platform admins

- [ ] `PLATFORM_ADMIN_EMAILS` names only verified addresses of people who need the console.
- [ ] To revoke an admin, remove the address from `PLATFORM_ADMIN_EMAILS`, then run `pnpm exec intelligo admin revoke <email> --force` against production. The revoke is audited, and an address left in the variable is promoted again on its next visit.
- [ ] Impersonation reasons are reviewed: every start and stop is in the audit log.

## The maintenance cron

- [ ] `GET /api/cron/maintenance` runs on a schedule with `Authorization: Bearer $CRON_SECRET`, every five minutes where the host allows it. A stale run keeps its credit hold until the first run after:

<!-- snippet: packages/cli/templates/maintenance/maintenance-route.ts.tpl#STALE_AFTER_MS -->

```ts
const STALE_AFTER_MS = 10 * 60_000;
```

- [ ] The route includes `purgeDeletedAccounts` (with `eraseActorFromAuditEvents`) and `pruneNotifications` (maintenance template 1.4.0 or later). Without them, deleted accounts are never erased.
- [ ] `ACCOUNT_DELETION_GRACE_DAYS` matches your privacy policy (30 by default).
- [ ] An alert fires when the route answers anything but 200. A 207 means a step failed, and its name is in `errors`.
- [ ] If you use jobs, a separate route drains the queue; maintenance only prunes it.

## Stripe

- [ ] The webhook endpoint is `NEXT_PUBLIC_APP_URL` + `/api/webhooks/stripe` and sends the events [Billing with Stripe](/docs/guides/billing-stripe) lists, including `charge.refunded` and `charge.dispute.created`.
- [ ] Stripe's dashboard shows no failing deliveries. A 500 means a handler threw and Stripe will retry; a 409 means a concurrent delivery holds the event.
- [ ] Your edge caps the request body on `/api/webhooks/stripe`; the handler reads it whole.
- [ ] `PAYMENT_MODE` names a registered provider if you sell outside Stripe; production refuses the mock.

## The AI surface

- [ ] `lib/chat-model.ts` binds a real model, and every model id is registered with its price (`registerModels`). An unregistered id refuses the turn as `unknown_model`.
- [ ] `INTELLIGO_ALLOW_STUB_MODEL` is unset.
- [ ] Every tool that writes, sends or spends has `needsApproval`, and `onTurn.approval` records the answer.
- [ ] Any user-authored text you add to a system prompt goes through `sanitizeForSystemPrompt`.
- [ ] `imageHosts` names the image CDNs replies may load from (none by default), and `linkHosts` is set if the model reads pages you do not control.
- [ ] `cors.origins` in `lib/chat-server-config.ts` lists only the sites that embed the widget.
- [ ] With stored attachments: `lib/intelligo.ts` binds the storage adapter (`setStorageAdapter(s3StorageFromEnv())`), `STORAGE_*` is set, the bucket is private, and the routes `createChatUploadHandler` and `createChatAttachmentHandler` serve are mounted.

## Edge and database

- [ ] TLS everywhere. The scaffold sends HSTS, nosniff, a referrer policy and a `Content-Security-Policy` of only `frame-ancestors 'none'`. Extend that header in `next.config.mjs` with `script-src` and the rest, and keep `frame-ancestors`.
- [ ] Migrations run as their own deploy step with an owner role: `DATABASE_URL=<owner-role url> pnpm exec intelligo migrate`. The app's runtime `DATABASE_URL` uses a role with data access only (no DDL, no trigger changes), so a build that migrates with the runtime URL has to change.
- [ ] Backups and point-in-time recovery are on, and a restore has been tested.
- [ ] `pnpm db:check` (`intelligo migrate --check`) reports nothing pending after each deploy.

## What to watch

| Signal                 | Where                                       | Act when                                                          |
| ---------------------- | ------------------------------------------- | ----------------------------------------------------------------- |
| Integration health     | Admin console, `getIntegrationHealth`       | any probe `degraded` or `down`                                    |
| Database latency       | health probe `database`                     | `degraded`                                                        |
| Job backlog            | health probe `jobs`                         | jobs overdue or running longer than the threshold below           |
| Unsettled executions   | health probe `settlement`                   | runs unsettled longer than the threshold below                    |
| Maintenance result     | the cron's HTTP status                      | not 200                                                           |
| Chat refusals by code  | `onTurn.refuse`                             | a jump in `RATE_LIMITED`, `QUOTA_EXCEEDED` or `MODEL_UNAVAILABLE` |
| Turn failures by phase | `onTurn.fail`                               | any `settlement` or `persistence` failure                         |
| Webhook failures       | Stripe dashboard, `StripeWebhook` log lines | any 500                                                           |
| Startup warnings       | `[Env]` log lines                           | a new one                                                         |

<!-- snippet: packages/admin/src/health.ts#JOB_BACKLOG_WARN_MS -->

```ts
const JOB_BACKLOG_WARN_MS = 15 * 60_000;
```

<!-- snippet: packages/admin/src/health.ts#UNSETTLED_MS -->

```ts
const UNSETTLED_MS = 10 * 60_000;
```

Add probes for your payment, mail and model providers with `registerIntegrationProbe`.
