import "server-only";

/**
 * Who is on the platform: users with the workspaces they belong to, one
 * workspace and its members, and sign-ups per day. Cross-tenant by
 * design: each checks that a platform admin is asking; the page calls
 * `requireAdmin` first to record the visit.
 *
 * A plan here is the subscription row as stored — its slug and status.
 * Whether that status entitles the workspace is billing's decision
 * (`getWorkspaceBilling`), which this package does not depend on.
 */

import { db } from "@intelligo-dev/core/db";
import {
  member,
  organization,
  plans,
  subscriptions,
  users,
} from "@intelligo-dev/core/db/schema";
import {
  and,
  asc,
  count,
  desc,
  eq,
  exists,
  gt,
  ilike,
  inArray,
  or,
  sql,
} from "drizzle-orm";

import { assertPlatformAdmin } from "./gate";

/** A page of rows and how many match in all. */
export type Paged<T> = { rows: T[]; total: number };

/** The page bounds every list takes: at most 200 rows, never before 0. */
export function pageBounds(input: { limit: number; offset?: number }) {
  return {
    limit: Math.min(Math.max(1, Math.floor(input.limit)), 200),
    offset: Math.max(0, Math.floor(input.offset ?? 0)),
  };
}

/**
 * `value` as a literal inside a LIKE pattern: `%`, `_` and the escape
 * character itself match only themselves.
 */
export function likeLiteral(value: string): string {
  return value.replace(/[\\%_]/g, (c) => `\\${c}`);
}

export type UserWorkspace = {
  id: string;
  name: string;
  slug: string | null;
  /** The user's role in it (`owner`, `admin`, `member`…). */
  role: string;
  /** The subscription's plan; null when the workspace has none. */
  planSlug: string | null;
  subscriptionStatus: string | null;
};

export type UserSummary = {
  id: string;
  email: string;
  name: string | null;
  /** `users.role` — the platform role, `admin` for a platform admin. */
  platformRole: string | null;
  createdAt: Date;
  /** Oldest membership first. */
  workspaces: UserWorkspace[];
};

/**
 * Users, newest first, with every workspace each belongs to. `query`
 * matches the email, the name or a workspace's name, case-insensitively
 * and literally. Platform admins are listed like anyone else: this is
 * the directory, not the list of who can be impersonated.
 */
export async function listUserSummaries(input: {
  query?: string;
  limit: number;
  offset?: number;
}): Promise<Paged<UserSummary>> {
  await assertPlatformAdmin();
  const { limit, offset } = pageBounds(input);
  const where = userSearch(input.query);

  const [found, [counted]] = await Promise.all([
    db
      .select({
        id: users.id,
        email: users.email,
        name: users.name,
        platformRole: users.role,
        createdAt: users.createdAt,
      })
      .from(users)
      .where(where)
      .orderBy(desc(users.createdAt), asc(users.id))
      .limit(limit)
      .offset(offset),
    db.select({ n: count() }).from(users).where(where),
  ]);

  const memberships = await workspacesOf(found.map((u) => u.id));
  return {
    rows: found.map((u) => ({
      ...u,
      name: u.name || null,
      workspaces: memberships.get(u.id) ?? [],
    })),
    total: Number(counted?.n ?? 0),
  };
}

function userSearch(query: string | undefined) {
  const text = query?.trim();
  if (!text) return undefined;
  const pattern = `%${likeLiteral(text)}%`;
  return or(
    ilike(users.email, pattern),
    ilike(users.name, pattern),
    exists(
      db
        .select({ one: sql`1` })
        .from(member)
        .innerJoin(organization, eq(organization.id, member.organizationId))
        .where(
          and(eq(member.userId, users.id), ilike(organization.name, pattern))
        )
    )
  );
}

/** Each user's workspaces, with the plan each is subscribed to. */
async function workspacesOf(
  userIds: string[]
): Promise<Map<string, UserWorkspace[]>> {
  const byUser = new Map<string, UserWorkspace[]>();
  if (userIds.length === 0) return byUser;
  const rows = await db
    .select({
      userId: member.userId,
      id: organization.id,
      name: organization.name,
      slug: organization.slug,
      role: member.role,
      planSlug: plans.slug,
      subscriptionStatus: subscriptions.status,
    })
    .from(member)
    .innerJoin(organization, eq(organization.id, member.organizationId))
    .leftJoin(subscriptions, eq(subscriptions.workspaceId, organization.id))
    .leftJoin(plans, eq(plans.id, subscriptions.planId))
    .where(inArray(member.userId, userIds))
    .orderBy(asc(member.createdAt));
  for (const { userId, ...workspace } of rows) {
    const list = byUser.get(userId) ?? [];
    list.push({
      ...workspace,
      planSlug: workspace.planSlug ?? null,
      subscriptionStatus: workspace.subscriptionStatus ?? null,
    });
    byUser.set(userId, list);
  }
  return byUser;
}

export type WorkspaceDetail = {
  id: string;
  name: string;
  slug: string | null;
  logo: string | null;
  createdAt: Date;
};

/** One workspace, or null when no workspace has the id. */
export async function getWorkspace(
  workspaceId: string
): Promise<WorkspaceDetail | null> {
  await assertPlatformAdmin();
  const [row] = await db
    .select({
      id: organization.id,
      name: organization.name,
      slug: organization.slug,
      logo: organization.logo,
      createdAt: organization.createdAt,
    })
    .from(organization)
    .where(eq(organization.id, workspaceId))
    .limit(1);
  return row ?? null;
}

export type WorkspaceMember = {
  userId: string;
  email: string;
  name: string | null;
  /** The role in this workspace. */
  role: string;
  /** `users.role`; a platform admin cannot be impersonated. */
  platformRole: string | null;
  joinedAt: Date;
};

/** A workspace's members, in the order they joined. */
export async function listWorkspaceMembers(
  workspaceId: string
): Promise<WorkspaceMember[]> {
  await assertPlatformAdmin();
  const rows = await db
    .select({
      userId: users.id,
      email: users.email,
      name: users.name,
      role: member.role,
      platformRole: users.role,
      joinedAt: member.createdAt,
    })
    .from(member)
    .innerJoin(users, eq(users.id, member.userId))
    .where(eq(member.organizationId, workspaceId))
    .orderBy(asc(member.createdAt));
  return rows.map((row) => ({ ...row, name: row.name || null }));
}

export type DisplayNames = {
  /** By user id: the name, or the email when the user has none. */
  users: Record<string, { name: string | null; email: string }>;
  /** By workspace id: its name. */
  workspaces: Record<string, string>;
};

/**
 * Names for ids a page shows — an audit event's actor and resource, a
 * ledger row's workspace — read in two queries. An id that no longer
 * resolves (a deleted user) is simply absent.
 */
export async function resolveDisplayNames(input: {
  userIds?: readonly string[];
  workspaceIds?: readonly string[];
}): Promise<DisplayNames> {
  await assertPlatformAdmin();
  const userIds = [...new Set(input.userIds ?? [])].slice(0, 500);
  const workspaceIds = [...new Set(input.workspaceIds ?? [])].slice(0, 500);
  const [userRows, workspaceRows] = await Promise.all([
    userIds.length === 0
      ? []
      : db
          .select({ id: users.id, name: users.name, email: users.email })
          .from(users)
          .where(inArray(users.id, userIds)),
    workspaceIds.length === 0
      ? []
      : db
          .select({ id: organization.id, name: organization.name })
          .from(organization)
          .where(inArray(organization.id, workspaceIds)),
  ]);
  return {
    users: Object.fromEntries(
      userRows.map((u) => [u.id, { name: u.name || null, email: u.email }])
    ),
    workspaces: Object.fromEntries(workspaceRows.map((w) => [w.id, w.name])),
  };
}

export type SignupDay = {
  /** `YYYY-MM-DD`, the calendar day in the zone asked for. */
  day: string;
  count: number;
};

/** The calendar day an instant falls on in `timeZone`, as `YYYY-MM-DD`. */
function dayIn(instant: Date, timeZone: string): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(instant);
}

/** The `YYYY-MM-DD` label `n` days before `label`. */
function daysBefore(label: string, n: number): string {
  const [y, m, d] = label.split("-").map(Number) as [number, number, number];
  return new Date(Date.UTC(y, m - 1, d - n)).toISOString().slice(0, 10);
}

/**
 * Sign-ups per calendar day for the last `days` days, today included,
 * as the days fall in `timeZone` (an IANA name; an unknown one throws).
 * Oldest first, one entry per day, a day with none at zero — so the
 * last entry is always today.
 */
export async function getSignupsByDay(input: {
  days: number;
  timeZone: string;
}): Promise<SignupDay[]> {
  await assertPlatformAdmin();
  const days = Math.min(Math.max(1, Math.floor(input.days)), 366);
  const today = dayIn(new Date(), input.timeZone);

  // `created_at` is a timestamp without a zone holding a UTC instant:
  // the first AT TIME ZONE makes it an instant, the second reads it as
  // the wall clock in the zone asked for.
  const day = sql<string>`to_char(${users.createdAt} AT TIME ZONE 'UTC' AT TIME ZONE ${input.timeZone}, 'YYYY-MM-DD')`;
  // A day and a half of slack covers every zone's offset from UTC.
  const since = new Date(Date.now() - (days + 2) * 24 * 60 * 60 * 1000);
  const rows = await db
    .select({ day, n: count() })
    .from(users)
    .where(gt(users.createdAt, since))
    .groupBy(day);

  const counts = new Map(rows.map((r) => [r.day, Number(r.n)]));
  return Array.from({ length: days }, (_, i) => {
    const label = daysBefore(today, days - 1 - i);
    return { day: label, count: counts.get(label) ?? 0 };
  });
}
