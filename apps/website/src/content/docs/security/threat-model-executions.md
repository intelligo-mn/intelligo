---
title: "Threat model: executions"
description: "STRIDE threats against the execution boundary: tokens without a record, double settlement, holds that never end, and lost usage."
order: 5
label: "Execution threats"
---

- **Scope:** `createExecutions` (`begin`, `complete`, `fail`, `reconcile`), its ports to billing, `findStaleExecutions`, the `/pricing` registry.
- **Assets:** the execution record, credit holds, settled usage and cost.
- **Trust boundaries:** your agent code → the execution handle; the handle → billing ports.

## Spoofing

Server code opens an execution with resolved actor ids; there is no HTTP surface. A reused `requestId` hits a unique index: the hold admission just took is released and the call fails.

## Tampering

| Threat                                         | Control                                                                                                                                                                                                                |
| ---------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Settling the same run twice                    | Terminal transitions are compare-and-swap; the first of complete or fail wins, and a reconcile racing either cannot charge or release twice                                                                            |
| A crash mid-settlement leaving a false success | `settling` is non-terminal; reconcile asks the ledger (`findSettlement`) whether the charge exists, confirms it if so, and otherwise re-runs settlement from the recorded usage. Without that port it refuses to guess |
| Pricing a run with a made-up model id          | Pricing throws `UnknownModelError`; chat refuses the turn                                                                                                                                                              |

## Repudiation

Every run, admitted or refused, is a row with actor, workspace, capability, usage, cost and credits. Audit events record refusals, completions, failures, failed settlements and reconciliations.

## Information disclosure

The framework writes accounting fields only: no prompts, messages or tool data. The row's `metadata` holds whatever the caller puts there.

## Denial of service

| Threat                        | Control                                                                                                                                                                       | Yours                                               |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| Abandoned runs holding credit | Maintenance reconciles runs older than the threshold below, charging the usage a run recorded or releasing its hold; the admin health probe flags runs unsettled past its own | Schedule the cron every five minutes where possible |

<!-- snippet: packages/cli/templates/maintenance/maintenance-route.ts.tpl#STALE_AFTER_MS -->

```ts
const STALE_AFTER_MS = 10 * 60_000;
```

<!-- snippet: packages/admin/src/health.ts#UNSETTLED_MS -->

```ts
const UNSETTLED_MS = 10 * 60_000;
```

## Elevation of privilege

| Threat                               | Control | Yours                                                                                                                                                   |
| ------------------------------------ | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Calling a model outside the boundary | —       | Every model call goes through `executions.begin()` or `createChatHandler`; `runWithExecution` from `@intelligo-dev/mastra` does this for a Mastra agent |

## Residual risks

- The boundary cannot see a model call your code makes without it. Code review is the control.
- On a host whose cron runs daily, a failed turn's hold can stay for up to a day.
