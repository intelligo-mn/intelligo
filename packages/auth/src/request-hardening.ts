/**
 * Settings that keep the auth endpoints behind the framework's services
 * and tell the rate limiter who a request is from. Pure, so they are
 * testable without starting Better-Auth.
 */

/**
 * Organization endpoints the team and workspace services wrap. Called
 * over HTTP they would skip what the services apply around them — the
 * plan's member and workspace limits, the subscription cancelled before
 * a workspace is deleted, the refusal to leave or delete a last
 * workspace — so the router answers them 404. The services call the
 * same endpoints server-side through `auth.api`, which the router never
 * sees. `set-active` and the reads stay open: the workspace switcher
 * calls `set-active` from the browser.
 */
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

/**
 * Admin endpoints the framework wraps or does not offer: impersonation
 * goes through `impersonateUser` (the allowlist check) and
 * `@intelligo-dev/admin`'s `startImpersonation` / `stopImpersonation`
 * (the reason and the audit events); the console reads users from its
 * own audited queries. Called over HTTP these would list every user and
 * their sessions, or end an impersonation, with no audit row. The
 * plugin's user writes — creating, editing, banning or removing a user,
 * setting a role or a password, revoking sessions — have no audited
 * wrapper, and the platform role holds no permission for them; they are
 * closed too, so a role that gains one does not open them to the
 * browser. `has-permission` stays open.
 */
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

const list = (value: string | undefined) =>
  (value ?? "")
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);

/**
 * Where the client's address is read from. `AUTH_IP_HEADERS` names the
 * headers in order (default `x-forwarded-for`); `AUTH_TRUSTED_PROXIES`
 * lists the proxies in front of the app (CIDRs), so a forwarded chain is
 * read up to the first hop that is not one of them. Behind more than one
 * proxy without it, no client address resolves and every client shares
 * one rate-limit bucket.
 */
export function ipAddressOptions(env: Record<string, string | undefined>): {
  ipAddressHeaders?: string[];
  trustedProxies?: string[];
} {
  const headers = list(env.AUTH_IP_HEADERS).map((h) => h.toLowerCase());
  const proxies = list(env.AUTH_TRUSTED_PROXIES);
  return {
    ...(headers.length > 0 ? { ipAddressHeaders: headers } : {}),
    ...(proxies.length > 0 ? { trustedProxies: proxies } : {}),
  };
}

/**
 * Why a display name is refused, or null when it is fine. A user's name
 * reaches other people's inboxes (an invitation names its inviter, a
 * personal workspace is named after its owner), so the server holds it
 * to what the sign-up form allows — at most 50 characters — and keeps
 * links out of it.
 */
export function displayNameProblem(name: unknown): string | null {
  if (typeof name !== "string") return null;
  const trimmed = name.trim();
  if (trimmed.length > 50) return "A name is at most 50 characters.";
  if (containsLink(trimmed)) return "A name cannot contain a link.";
  return null;
}

/**
 * Whether text holds something a mail client would turn into a link: a
 * scheme (`https://`), a `www.` host, or a bare domain (`example.com`,
 * `pay.example.co/x`). A dot between two words with no space after it
 * counts as a domain, which is the price of catching the bare form.
 */
export function containsLink(text: string): boolean {
  return /:\/\/|\bwww\.|\b[a-z0-9-]+\.[a-z]{2,}\b/i.test(text);
}

/**
 * Why a workspace name is refused, or null when it is fine. It is printed
 * in invitation emails sent to any address, so it is held to the same
 * rule as a person's name: no links.
 */
export function workspaceNameProblem(name: unknown): string | null {
  if (typeof name !== "string") return null;
  if (containsLink(name)) return "A workspace name cannot contain a link.";
  return null;
}
