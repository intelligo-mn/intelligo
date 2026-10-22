---
title: "Threat model: auth"
description: "STRIDE threats against sign-in, sessions, workspaces, roles and impersonation in @intelligo-dev/auth, and the control that answers each one."
order: 2
label: "Auth threats"
---

- **Scope:** `@intelligo-dev/auth` and the Better-Auth instance it configures, mounted at `/api/auth/[...all]` by `@intelligo-dev/next/auth`; the team, workspace, profile and onboarding services; the guards `requireAuth`, `requireWorkspace`, `requireRole`, `requirePlatformAdmin`.
- **Assets:** sessions, credentials, workspace membership and roles, the platform-admin role.
- **Trust boundaries:** browser → `/api/auth/*`; server actions → services; the database.

## Spoofing

| Threat                                                               | Control                                                                                                                                                                      | Yours                                                                                                     |
| -------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| Password guessing                                                    | Per-address limits on sign-in, sign-up and credential changes, counted in Postgres across instances, active in production (below)                                            | `AUTH_TRUSTED_PROXIES` behind a proxy chain, or every client shares one bucket; WAF or captcha for volume |
| Registering someone else's address to inherit an invitation or admin | Verification is required whenever an email provider exists, and production will not start without one unless told to; `PLATFORM_ADMIN_EMAILS` counts only a verified address | Do not run production on `EMAIL_PROVIDER=console`                                                         |
| Stolen session                                                       | Sessions expire and refresh as below; a password reset revokes every session                                                                                                 | Cookie domain and TLS                                                                                     |
| Cross-site request with the user's cookie                            | Only `NEXT_PUBLIC_APP_URL` is trusted                                                                                                                                        | Keep it the exact public origin                                                                           |

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

<!-- snippet: packages/auth/src/request-hardening.ts#SESSION_LIFETIME -->

```ts
export const SESSION_LIFETIME = {
  expiresIn: 60 * 60 * 24 * 7,
  updateAge: 60 * 60 * 24,
} as const;
```

<!-- snippet: packages/auth/src/trusted-origins.ts#resolveTrustedOrigins -->

```ts
export function resolveTrustedOrigins(env: {
  NEXT_PUBLIC_APP_URL?: string;
  NODE_ENV?: string;
}): string[] {
  if (env.NEXT_PUBLIC_APP_URL) return [env.NEXT_PUBLIC_APP_URL];
  if (env.NODE_ENV === "production") return [];
  return ["http://localhost:*", "http://127.0.0.1:*"];
}
```

## Tampering

| Threat                                                                                      | Control                                                                                               |
| ------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| Calling Better-Auth's organization or admin endpoints directly to skip plan limits or audit | These paths answer 404; the services call them server-side                                            |
| Links in a display or workspace name, phishing through invitation emails                    | `displayNameProblem` refuses links and names over 50 characters; `workspaceNameProblem` refuses links |

<!-- snippet: packages/auth/src/request-hardening.ts#SERVICE_ONLY_ORGANIZATION_PATHS -->

```ts
export const SERVICE_ONLY_ORGANIZATION_PATHS = [
  "/organization/create",
  "/organization/update",
  "/organization/delete",
  "/organization/invite-member",
  "/organization/accept-invitation",
  "/organization/reject-invitation",
  "/organization/cancel-invitation",
  "/organization/remove-member",
  "/organization/update-member-role",
  "/organization/leave",
] as const;
```

<!-- snippet: packages/auth/src/request-hardening.ts#SERVICE_ONLY_ADMIN_PATHS -->

```ts
export const SERVICE_ONLY_ADMIN_PATHS = [
  "/admin/impersonate-user",
  "/admin/stop-impersonating",
  "/admin/list-users",
  "/admin/get-user",
  "/admin/list-user-sessions",
  "/admin/create-user",
  "/admin/update-user",
  "/admin/set-role",
  "/admin/set-user-password",
  "/admin/ban-user",
  "/admin/unban-user",
  "/admin/remove-user",
  "/admin/revoke-user-session",
  "/admin/revoke-user-sessions",
] as const;
```

## Repudiation

Impersonation start and stop and platform-admin grants and revokes write audit events. Impersonation writes its row before the session exists and aborts if the write fails. The admin plugin's own user writes are closed over HTTP (above). Audit rows cannot be updated or deleted, except that the database lets the actor and workspace be cleared, which happens when a workspace or user is deleted or a deleted account is erased.

## Information disclosure

| Threat                                             | Control                                                                               | Yours                                      |
| -------------------------------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------ |
| Reading another workspace's data                   | Guards resolve the active workspace from the session; framework services filter by it | Every query you write filters by workspace |
| Listing users or sessions through the admin plugin | Closed over HTTP; the console reads through its own queries                           | —                                          |

## Denial of service

Reset and verification emails have their own, stricter limit (above). Volumetric attacks are the edge's job.

## Elevation of privilege

| Threat                                 | Control                                                                                                             | Yours                                                                          |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| A workspace owner gains platform reach | Platform admin is `users.role`; workspace roles never grant it                                                      | —                                                                              |
| A member promotes themselves           | Role changes go through the team service, which requires an owner or admin caller and sets only `admin` or `member` | —                                                                              |
| A removed admin keeps access           | `intelligo admin revoke <email>` clears the role and records it                                                     | Remove the address from `PLATFORM_ADMIN_EMAILS` first, or it is promoted again |
| Impersonation outlives its purpose     | A reason is required; the session is capped (below)                                                                 | Review the reasons                                                             |

<!-- snippet: packages/auth/src/request-hardening.ts#IMPERSONATION_SECONDS -->

```ts
export const IMPERSONATION_SECONDS = 30 * 60;
```

## Residual risks

- The auth rate limits are off outside `NODE_ENV=production`.
- No static check proves that a query you add filters by workspace.
