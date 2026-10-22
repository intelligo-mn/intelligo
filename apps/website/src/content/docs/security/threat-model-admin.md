---
title: "Threat model: admin console"
description: "STRIDE threats against the operator's console and support impersonation: the platform-admin gate, audited reads and actions, and session swaps."
order: 7
label: "Admin threats"
---

- **Scope:** `@intelligo-dev/admin` (`requireAdmin`, `requireAdminOrRefuse`, `isPlatformAdmin`, the cross-tenant reads, `startImpersonation` / `stopImpersonation`, the health probes) and the `admin-console` registry item's pages and actions under `/admin`.
- **Assets:** every tenant's users, workspaces, payments, usage and audit trail; plan grants and credit; the ability to act as a user.
- **Trust boundaries:** a signed-in browser → `/admin` pages and their server actions; the console → billing services; an admin's session → the target's session during impersonation.

## Spoofing

| Threat                                                  | Control                                                                                                                | Yours                               |
| ------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| A workspace owner opening the console                   | The gate is the platform-admin role on the user row, never a workspace role; every self-serve sign-up owns a workspace | —                                   |
| Becoming an admin by registering an allowlisted address | `PLATFORM_ADMIN_EMAILS` promotes a verified address only, and the promotion is an audit event                          | Keep the list to people who need it |
| Impersonating another admin to borrow their reach       | A platform admin cannot be impersonated, by role or by allowlist, checked before Better-Auth's own check               | —                                   |

## Tampering

| Threat                                                    | Control                                                                                                                                                                         | Yours                                 |
| --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| Granting a plan or credit with no record                  | Each action authorizes with `requireAdminOrRefuse`, which refuses when its audit event cannot be written; a reason of at least three characters is required                     | Review the reasons                    |
| A resubmitted form crediting twice                        | The credit form carries a request id minted when it renders; the same id credits once                                                                                           | —                                     |
| Calling the admin plugin's user writes directly           | They answer 404 over HTTP (see the [auth threat model](/docs/security/threat-model-auth))                                                                                       | —                                     |
| A page or action added under `/admin` that skips the gate | The layout gate does not guard a page's reads or actions, so every console page and action calls the gate itself, and every cross-tenant read checks for a platform admin again | Do the same in your own console pages |

<!-- snippet: packages/admin/src/authorization.ts#requireAdminOrRefuse -->

```ts
export async function requireAdminOrRefuse(
  action: string,
  resource: { kind: string; id?: string; workspaceId?: string },
  metadata?: Record<string, unknown>
): Promise<AdminActor> {
  const actor = await platformAdmin();

  await recordAuditEventOrThrow({
    workspaceId: resource.workspaceId ?? null,
    actorId: actor.userId,
    actorKind: "support",
    action,
    resourceKind: resource.kind,
    resourceId: resource.id ?? null,
    ...(metadata ? { metadata } : {}),
  });

  return actor;
}
```

## Repudiation

Every console page visit is an audit event with `actorKind: "support"`; a failed write there is logged and does not block a support engineer mid-incident. Every action and every impersonation start is recorded before it happens, and refused if the record cannot be written. A start that Better-Auth then refuses is followed by a refusal event, so the trail does not show an impersonation that never happened. Stopping records the end before ending it, with the admin named by the session's `impersonatedBy` stamp as the actor.

## Information disclosure

| Threat                           | Control                                                                                                     | Yours                                                                                                |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Learning that the console exists | A visitor who is not a platform admin gets the app's 404, not a refusal                                     | —                                                                                                    |
| Internals in an error            | Actions answer with a message key, never the error's text; why an impersonation failed is logged, not shown | —                                                                                                    |
| Seeing more than support needs   | —                                                                                                           | Grant the role to as few people as possible; `intelligo admin revoke` removes it with an audit event |

## Denial of service

The console's reads are paged. Health probes report a failing check as `down` with its own message rather than failing the page.

## Elevation of privilege

| Threat                                | Control                                                                                            | Yours                                                      |
| ------------------------------------- | -------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| An impersonation that lasts           | The session is capped (below)                                                                      | —                                                          |
| Spending or deleting as the customer  | While impersonating, checkout, the billing portal, local payments and account deletion are refused | Refuse the same in your own actions with `isImpersonating` |
| Using the console while impersonating | The session is the target's, so the console answers 404 until the impersonation ends               | —                                                          |

<!-- snippet: packages/auth/src/request-hardening.ts#IMPERSONATION_SECONDS -->

```ts
export const IMPERSONATION_SECONDS = 30 * 60;
```

## Residual risks

- What an admin does while impersonating, other than the refused actions above, runs as the target user and is recorded as theirs; the start and stop events bracket it.
- An impersonation that simply expires has a start event and no stop event.
- A page visit whose audit write fails is not recorded; only actions are refused in that case.
- A platform admin can read every tenant's data. The role is the control, and the audit trail is how its use is reviewed.
