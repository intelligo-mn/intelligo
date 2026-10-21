/**
 * Tenants for the isolation suites: real users signed up through
 * Better-Auth, a shared workspace with an owner and an invited member,
 * and one of every row a server action reads or writes, each free-text
 * field carrying the tenant's canary.
 *
 * Nothing here is imported at module load: the suites stub the
 * environment and reset modules first, so every framework module is
 * loaded lazily from inside a function.
 */

import { Client } from "pg";

/** One signed-in user: what a request from them carries. */
export type Actor = {
  userId: string;
  email: string;
  cookie: string;
};

export type Tenant = {
  prefix: string;
  /** Written into every free-text field the tenant owns. */
  canary: string;
  owner: Actor;
  member: Actor;
  /** The owner's personal workspace, which the member joined. */
  workspaceId: string;
  /** The member's own personal workspace. */
  memberWorkspaceId: string;
  ownerMemberId: string;
  memberRecordId: string;
  conversationId: string;
  userMessageId: string;
  assistantMessageId: string;
  documentId: string;
  factId: string;
  notificationId: string;
  invitationId: string;
  paymentId: string;
  invoiceId: string;
};

export const PASSWORD = "Password123!";

let client: Client | undefined;

/** One raw connection for fixtures and fingerprints, closed by `closeFixtures`. */
export async function pg(): Promise<Client> {
  if (!client) {
    client = new Client({ connectionString: process.env.DATABASE_URL });
    await client.connect();
  }
  return client;
}

export async function closeFixtures(): Promise<void> {
  await client?.end();
  client = undefined;
}

export function headersOf(actor: Actor): Headers {
  return new Headers({ cookie: actor.cookie });
}

/** Runs `fn` as `actor`: the framework reads the request's headers from here. */
export async function asActor<T>(
  actor: Actor,
  fn: () => Promise<T>
): Promise<T> {
  const { withRequestHeaders } =
    await import("@intelligo-dev/core/request-context");
  return withRequestHeaders(headersOf(actor), fn);
}

export async function signUpVerified(
  email: string,
  name: string
): Promise<Actor> {
  const { auth } = await import("@intelligo-dev/auth");
  const res = await auth.api.signUpEmail({
    body: { email, password: PASSWORD, name },
    asResponse: true,
  });
  const setCookie = res.headers.get("set-cookie");
  if (!setCookie) throw new Error(`sign-up set no session cookie for ${email}`);
  const cookie = setCookie.split(",")[0]!.split(";")[0]!;
  const session = await auth.api.getSession({
    headers: new Headers({ cookie }),
  });
  if (!session?.user) throw new Error(`no session after sign-up for ${email}`);
  // No inbox in a test: invitations need a verified address.
  await (
    await pg()
  ).query(`UPDATE users SET email_verified = true WHERE id = $1`, [
    session.user.id,
  ]);
  return { userId: session.user.id, email, cookie };
}

/** The workspace `actor` resolves to, as every action resolves it. */
export async function activeWorkspaceOf(actor: Actor): Promise<string> {
  const { requireWorkspace } = await import("@intelligo-dev/auth");
  return asActor(actor, async () => (await requireWorkspace()).workspace.id);
}

export async function setActive(actor: Actor, workspaceId: string) {
  const { auth } = await import("@intelligo-dev/auth");
  await auth.api.setActiveOrganization({
    headers: headersOf(actor),
    body: { organizationId: workspaceId },
  });
  const active = await activeWorkspaceOf(actor);
  if (active !== workspaceId) {
    throw new Error(
      `${actor.email} is active in ${active}, not ${workspaceId}`
    );
  }
}

async function personalWorkspace(userId: string): Promise<string> {
  const { rows } = await (
    await pg()
  ).query<{ organization_id: string }>(
    `SELECT organization_id FROM member WHERE user_id = $1 AND role = 'owner'
      ORDER BY created_at LIMIT 1`,
    [userId]
  );
  if (!rows[0]) throw new Error(`no personal workspace for ${userId}`);
  return rows[0].organization_id;
}

async function memberRecord(workspaceId: string, userId: string) {
  const { rows } = await (
    await pg()
  ).query<{ id: string }>(
    `SELECT id FROM member WHERE organization_id = $1 AND user_id = $2`,
    [workspaceId, userId]
  );
  if (!rows[0]) throw new Error(`${userId} is not a member of ${workspaceId}`);
  return rows[0].id;
}

/**
 * A workspace with an owner and a member, and a row of each kind the
 * actions touch, owned by the owner.
 */
export async function seedTenant(prefix: string): Promise<Tenant> {
  const { auth } = await import("@intelligo-dev/auth");
  const conversations = await import("@intelligo-dev/core/conversations");
  const { saveDocument } = await import("@intelligo-dev/core/documents");
  const { createNotification } =
    await import("@intelligo-dev/core/notifications");
  const { openLocalInvoice } = await import("@intelligo-dev/billing");
  const { fromMajor } = await import("@intelligo-dev/core/money");

  const canary = `CANARY-${prefix}`;
  const owner = await signUpVerified(
    `${prefix}-owner@example.test`,
    `${canary} owner`
  );
  const member = await signUpVerified(
    `${prefix}-member@example.test`,
    `${canary} member`
  );
  const workspaceId = await personalWorkspace(owner.userId);
  const memberWorkspaceId = await personalWorkspace(member.userId);
  await setActive(owner, workspaceId);

  const joining = await auth.api.createInvitation({
    headers: headersOf(owner),
    body: { email: member.email, role: "member", organizationId: workspaceId },
  });
  await auth.api.acceptInvitation({
    headers: headersOf(member),
    body: { invitationId: joining.id },
  });
  await setActive(member, workspaceId);

  const pending = await auth.api.createInvitation({
    headers: headersOf(owner),
    body: {
      email: `${prefix}-invitee@example.test`,
      role: "member",
      organizationId: workspaceId,
    },
  });

  const actor = { workspaceId, userId: owner.userId };
  const conversation = await conversations.createConversation(actor, {
    agentId: "assistant",
    modelId: "google/gemini-2.5-flash",
    title: `${canary} conversation`,
  });
  const userMessageId = crypto.randomUUID();
  const assistantMessageId = crypto.randomUUID();
  await conversations.saveMessages(actor, [
    {
      id: userMessageId,
      conversationId: conversation.id,
      role: "user",
      parts: JSON.stringify([{ type: "text", text: `${canary} question` }]),
    },
    {
      id: assistantMessageId,
      conversationId: conversation.id,
      role: "assistant",
      parts: JSON.stringify([{ type: "text", text: `${canary} answer` }]),
    },
  ]);
  await conversations.voteMessage(actor, {
    chatId: conversation.id,
    messageId: assistantMessageId,
    type: "up",
  });

  const documentId = crypto.randomUUID();
  for (const version of ["first", "second"]) {
    await saveDocument(actor, {
      id: documentId,
      title: `${canary} document`,
      content: `${canary} ${version} version`,
      kind: "text",
    });
  }

  const factId = crypto.randomUUID();
  await (
    await pg()
  ).query(
    `INSERT INTO user_facts
       (id, user_id, workspace_id, category, key, value, confidence, importance, created_at)
     VALUES ($1, $2, $3, 'skill', 'testing', $4, 0.9, 7, now())`,
    [factId, owner.userId, workspaceId, JSON.stringify(`${canary} fact`)]
  );

  const notification = await createNotification({
    userId: owner.userId,
    workspaceId,
    type: "system",
    title: `${canary} notification`,
    message: `${canary} notification body`,
  });
  if (!notification) throw new Error("notification not created");

  const invoice = await openLocalInvoice({
    workspaceId,
    userId: owner.userId,
    reference: `${prefix}-bundle`,
    price: fromMajor(5, "USD"),
    description: `${canary} invoice`,
  });
  const { rows } = await (
    await pg()
  ).query<{ id: string }>(`SELECT id FROM payments WHERE invoice_id = $1`, [
    invoice.invoiceId,
  ]);

  return {
    prefix,
    canary,
    owner,
    member,
    workspaceId,
    memberWorkspaceId,
    ownerMemberId: await memberRecord(workspaceId, owner.userId),
    memberRecordId: await memberRecord(workspaceId, member.userId),
    conversationId: conversation.id,
    userMessageId,
    assistantMessageId,
    documentId,
    factId,
    notificationId: notification.id,
    invitationId: pending.id,
    paymentId: rows[0]!.id,
    invoiceId: invoice.invoiceId,
  };
}

/** Every identifier of the tenant's that an answer to someone else must not carry. */
export function tenantIds(t: Tenant): string[] {
  return [
    t.owner.userId,
    t.member.userId,
    t.owner.email,
    t.member.email,
    t.workspaceId,
    t.memberWorkspaceId,
    t.ownerMemberId,
    t.memberRecordId,
    t.conversationId,
    t.userMessageId,
    t.assistantMessageId,
    t.documentId,
    t.factId,
    t.notificationId,
    t.invitationId,
    t.paymentId,
    t.invoiceId,
  ];
}

/**
 * Whether `outcome` carries the victim's data: its canary, or one of
 * its ids that the call was not handed. An id the caller passed in
 * may come back (a write under a reused id answers with it).
 */
export function leaks(
  outcome: unknown,
  victim: Tenant,
  args: unknown[]
): string[] {
  const passed = JSON.stringify(args);
  const text = JSON.stringify(outcome) ?? "";
  return [victim.canary, ...tenantIds(victim)].filter(
    (needle) => !passed.includes(needle) && text.includes(needle)
  );
}

/**
 * Columns whose values move without anyone acting on the tenant, by
 * table, with the reason. They are left out of the fingerprint.
 */
export const VOLATILE_COLUMNS: Record<
  string,
  { columns: string[]; why: string }
> = {
  sessions: {
    columns: ["expires_at", "updated_at"],
    why: "a session's expiry slides whenever its owner's request reads it",
  },
};

/**
 * Tables left out of the fingerprint, with the reason. Everything else
 * that names a workspace, user, organization, conversation or chat is
 * in it, so a new table is covered without being listed.
 */
export const EXCLUDED_TABLES: Record<string, string> = {
  verifications:
    "keyed by an identifier string, not by a user: no column ties it to a tenant",
  rate_limits: "keyed by an IP and path, not by a tenant",
};

const SCOPE_COLUMNS = [
  "workspace_id",
  "organization_id",
  "user_id",
  "inviter_id",
  "conversation_id",
  "chat_id",
] as const;

/**
 * A hash per table of every row reachable from the tenant: its
 * workspaces, its users and its conversations. Two equal fingerprints
 * mean nobody changed, added or removed one of the tenant's rows.
 */
export async function fingerprint(t: Tenant): Promise<Record<string, string>> {
  const db = await pg();
  const { rows: columns } = await db.query<{
    table_name: string;
    column_name: string;
  }>(
    `SELECT c.table_name, c.column_name
       FROM information_schema.columns c
       JOIN information_schema.tables t
         ON t.table_schema = c.table_schema AND t.table_name = c.table_name
      WHERE c.table_schema = 'public' AND t.table_type = 'BASE TABLE'
      ORDER BY c.table_name, c.ordinal_position`
  );
  const tables = new Map<string, string[]>();
  for (const { table_name, column_name } of columns) {
    tables.set(table_name, [...(tables.get(table_name) ?? []), column_name]);
  }

  const workspaces = [t.workspaceId, t.memberWorkspaceId];
  const users = [t.owner.userId, t.member.userId];
  const { rows: owned } = await db.query<{ id: string }>(
    `SELECT id FROM conversations WHERE workspace_id = ANY($1) OR user_id = ANY($2)`,
    [workspaces, users]
  );
  const chats = [t.conversationId, ...owned.map((row) => row.id)];
  const values: Record<(typeof SCOPE_COLUMNS)[number], string[]> = {
    workspace_id: workspaces,
    organization_id: workspaces,
    user_id: users,
    inviter_id: users,
    conversation_id: chats,
    chat_id: chats,
  };

  const result: Record<string, string> = {};
  for (const [table, names] of tables) {
    if (table in EXCLUDED_TABLES) continue;
    const filters: string[] = [];
    const params: string[][] = [];
    for (const column of SCOPE_COLUMNS) {
      if (!names.includes(column)) continue;
      params.push(values[column]);
      filters.push(`"${column}"::text = ANY($${params.length})`);
    }
    if (table === "organization") {
      params.push(workspaces);
      filters.push(`id = ANY($${params.length})`);
    }
    if (table === "users") {
      params.push(users);
      filters.push(`id = ANY($${params.length})`);
    }
    if (filters.length === 0) continue;
    const volatile = new Set(VOLATILE_COLUMNS[table]?.columns ?? []);
    const kept = names
      .filter((name) => !volatile.has(name))
      .map((name) => `"${name}"`)
      .join(", ");
    const { rows } = await db.query<{ hash: string | null; n: string }>(
      `SELECT md5(string_agg(r::text, '|' ORDER BY r::text)) AS hash, count(*) AS n
         FROM (SELECT ${kept} FROM "${table}" WHERE ${filters.join(" OR ")}) r`,
      params
    );
    result[table] = `${rows[0]!.n}:${rows[0]!.hash ?? "-"}`;
  }
  return result;
}

/**
 * The fingerprint once work the tenant's creation started in the
 * background (a welcome notification) has landed.
 */
export async function settledFingerprint(
  t: Tenant
): Promise<Record<string, string>> {
  let previous = await fingerprint(t);
  for (let attempt = 0; attempt < 20; attempt++) {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const next = await fingerprint(t);
    if (JSON.stringify(next) === JSON.stringify(previous)) return next;
    previous = next;
  }
  throw new Error(`the fingerprint of ${t.prefix} did not settle`);
}

/** Deletes the tenants' workspaces and users, and everything that cascades from them. */
export async function dropTenants(tenants: Tenant[]): Promise<void> {
  const db = await pg();
  for (const t of tenants) {
    await db.query(`DELETE FROM organization WHERE id = ANY($1)`, [
      [t.workspaceId, t.memberWorkspaceId],
    ]);
    await db.query(`DELETE FROM users WHERE id = ANY($1)`, [
      [t.owner.userId, t.member.userId],
    ]);
  }
}
