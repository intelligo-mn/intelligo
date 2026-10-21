---
title: "Security model"
description: "What Intelligo enforces for you (tenancy, roles, credits, webhooks, audit) and what stays your job: prompts, tools, keys, headers and hosting."
order: 0
label: "Overview"
---

Intelligo is the half of your product that decides who someone is, which workspace they act in, what they may spend and what was recorded. This page says which of those guarantees the framework holds on its own, and which hold only if you do your part.

## What the framework enforces

| Risk                                        | What holds it                                                                                                                                                                                                                                                                     | Where                                                                 |
| ------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| One tenant reads another's data             | Services take resolved actor ids; transports call `requireWorkspace` / `requireRole` first; framework queries filter by workspace, and by user where data is private                                                                                                              | `@intelligo-dev/auth`, every service                                  |
| A workspace limit is skipped over HTTP      | Better-Auth's organization mutations answer 404; only the team and workspace services call them                                                                                                                                                                                   | `SERVICE_ONLY_ORGANIZATION_PATHS`                                     |
| Platform admin power used without a record  | Impersonation, the raw user listings and the admin plugin's user writes answer 404 over HTTP; impersonation goes through `startImpersonation` (reason required, audit row written first, 30 minutes at most); grants and revokes go through `intelligo admin` with an audit event | `SERVICE_ONLY_ADMIN_PATHS`                                            |
| A workspace owner reaches platform surfaces | Platform admin is `users.role`, never a workspace role; `PLATFORM_ADMIN_EMAILS` promotes a verified address only                                                                                                                                                                  | `requirePlatformAdmin`                                                |
| Cross-site requests to auth                 | Only `NEXT_PUBLIC_APP_URL` is a trusted origin; in production, an unset value trusts none                                                                                                                                                                                         | `resolveTrustedOrigins`                                               |
| Credential stuffing                         | Auth attempts are counted in Postgres, shared by every instance, at limits set by `@intelligo-dev/auth` (production only)                                                                                                                                                         | `AUTH_RATE_LIMIT_RULES`                                               |
| A turn runs without being paid for          | Each turn opens an execution with a credit hold before the model runs; settlement is compare-and-swap                                                                                                                                                                             | `createChatHandler`, `@intelligo-dev/executions`                      |
| A client rewrites the assistant's message   | Continuations rebuild from the stored message and apply only an approval answer or a client tool's output                                                                                                                                                                         | `@intelligo-dev/chat`                                                 |
| A forged or replayed Stripe event           | Signature verified; receipt recorded before handling; one claim per event                                                                                                                                                                                                         | `createStripeWebhookHandler`                                          |
| A shared chat leaks internals               | Reasoning, tool input and output, provider metadata and file URLs are stripped                                                                                                                                                                                                    | share policy (`keepToolOutput`)                                       |
| Audit history is rewritten                  | Database triggers refuse UPDATE and DELETE on the audit tables, except clearing who acted (a deleted workspace or user, or the erasure of a deleted account), and refuse TRUNCATE                                                                                                 | migrations `0007_schema_hardening`, `0008_wide_counters_kept_ledgers` |
| A deployment runs on fakes                  | Production refuses the mock payment provider and the stub model                                                                                                                                                                                                                   | `PAYMENT_MODE`, `INTELLIGO_ALLOW_STUB_MODEL`                          |

## What stays yours

- **Your agent.** Prompts, tools and what a tool may do. Put a destructive or paying tool behind the AI SDK's `needsApproval`, and record decisions with `onTurn.approval`.
- **Text you put in a prompt.** The framework adds no user text to a system prompt. When you do, pass it through `sanitizeForSystemPrompt` (one layer of English phrases and structural markers; extend the patterns for your language).
- **What the model's output may load.** Set `imageHosts` and `linkHosts` in `lib/chat-config.tsx` for any model that reads pages you do not control.
- **Secrets and their rotation.** `BETTER_AUTH_SECRET`, `CRON_SECRET`, Stripe and provider keys live in your host's secret store.
- **The network edge.** TLS, `AUTH_TRUSTED_PROXIES` behind a proxy chain, WAF and DDoS protection, and request-body limits for routes you add. The scaffold's `next.config.mjs` sends HSTS, nosniff, a referrer policy and a `Content-Security-Policy` that carries only `frame-ancestors 'none'`: extend that header with `script-src` and the rest, and keep `frame-ancestors`.
- **The database.** A runtime role with data access only, separate from the role that runs `intelligo migrate`, so the app cannot drop the audit triggers; backups and point-in-time recovery.
- **Your own queries and routes.** Anything you add must filter by workspace itself; the framework cannot see it.
- **Operations.** Scheduling the maintenance route and watching its result, and the [production checklist](/docs/security/production-checklist).

## Threat models

Each one walks STRIDE (spoofing, tampering, repudiation, information disclosure, denial of service, elevation of privilege) over the package's entry points, names the control that answers each threat, and says what is left to you.

- [Auth](/docs/security/threat-model-auth)
- [Billing](/docs/security/threat-model-billing)
- [Chat](/docs/security/threat-model-chat)
- [Executions](/docs/security/threat-model-executions)
- [Storage and uploads](/docs/security/threat-model-storage)
- [Admin console and impersonation](/docs/security/threat-model-admin)

## Reporting

Report a vulnerability privately, as [SECURITY.md](https://github.com/intelligo-dev/intelligo/blob/main/SECURITY.md) describes. It also lists which release lines receive fixes.
