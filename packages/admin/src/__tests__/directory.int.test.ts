/**
 * The console's directory reads against a real database: users with
 * their workspaces and plans, searched literally and paged with a total;
 * a workspace's members; the local-payment ledger with workspace names;
 * names for the ids an audit page shows.
 *
 * Every row carries this run's suffix, and searches are scoped to it, so
 * the suite shares a database with others.
 *
 * Runs when TEST_PG_URL is set. DATABASE_URL must point at the same
 * database.
 */

import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { Client } from "pg";

vi.mock("server-only", () => ({}));
// The read models check for a platform admin; this test has no request.
vi.mock("../gate", () => ({ assertPlatformAdmin: async () => {} }));

const PG_URL = process.env.TEST_PG_URL;
const d = PG_URL ? describe : describe.skip;

const run = `dir${Date.now()}`;
const WS = `ws_${run}`;
const OTHER = `ws_${run}_other`;
const PLAN = `plan_${run}`;
const ids = {
  ada: `u_${run}_ada`,
  bob: `u_${run}_bob`,
  root: `u_${run}_root`,
};

type Person = {
  id: string;
  email: string;
  name: string;
  role: string | null;
  createdAt: string;
};

d("the directory reads (integration)", () => {
  const client = new Client({ connectionString: PG_URL });

  const user = (p: Person) =>
    client.query(
      `INSERT INTO users (id, name, email, role, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $5)`,
      [p.id, p.name, p.email, p.role, p.createdAt]
    );
  const join = (userId: string, workspaceId: string, role: string) =>
    client.query(
      `INSERT INTO member (id, organization_id, user_id, role, created_at, updated_at)
       VALUES ($1, $2, $3, $4, now(), now())`,
      [`m_${userId}_${workspaceId}`, workspaceId, userId, role]
    );
  const both = [WS, OTHER];

  const cleanup = async () => {
    await client.query(`DELETE FROM payments WHERE workspace_id = ANY($1)`, [
      both,
    ]);
    await client.query(
      `DELETE FROM subscriptions WHERE workspace_id = ANY($1)`,
      [both]
    );
    await client.query(`DELETE FROM organization WHERE id = ANY($1)`, [both]);
    await client.query(`DELETE FROM plans WHERE id = $1`, [PLAN]);
    await client.query(`DELETE FROM users WHERE id LIKE $1`, [`u_${run}_%`]);
  };

  beforeAll(async () => {
    await client.connect();
    await cleanup();
    await client.query(
      `INSERT INTO organization (id, name, slug, created_at)
       VALUES ($1, $2, $1, now()), ($3, $4, $3, now())`,
      [WS, `Acme ${run}`, OTHER, `Other 100%_${run}`]
    );
    await client.query(
      `INSERT INTO plans (id, name, slug, price_monthly, price_yearly, features, limits)
       VALUES ($1, 'Pro', $1, 0, 0, '[]', '{}')`,
      [PLAN]
    );
    await client.query(
      `INSERT INTO subscriptions (id, workspace_id, plan_id, status) VALUES ($1, $2, $3, 'active')`,
      [`sub_${run}`, WS, PLAN]
    );
    await user({
      id: ids.ada,
      email: `ada_${run}@example.test`,
      name: "Ada",
      role: null,
      createdAt: "2026-01-01T00:00:00Z",
    });
    await user({
      id: ids.bob,
      email: `bob_${run}@example.test`,
      name: "",
      role: null,
      createdAt: "2026-01-02T00:00:00Z",
    });
    await user({
      id: ids.root,
      email: `root_${run}@example.test`,
      name: "Root",
      role: "admin",
      createdAt: "2026-01-03T00:00:00Z",
    });
    // Ada joins Acme first, so it is her first workspace.
    await join(ids.ada, WS, "owner");
    await join(ids.bob, WS, "member");
    await join(ids.ada, OTHER, "member");
    await client.query(
      `INSERT INTO payments (id, provider, invoice_id, workspace_id, user_id, reference, amount_minor, currency, status, created_at)
       VALUES ($1, 'mock', $1, $2, $3, 'pro-month', 2500, 'usd', 'paid', '2026-01-04T00:00:00Z'),
              ($4, 'mock', $4, $5, NULL, 'bundle', 900, 'USD', 'pending', '2026-01-05T00:00:00Z')`,
      [`pay_${run}_1`, WS, ids.ada, `pay_${run}_2`, OTHER]
    );
  });

  afterAll(async () => {
    await cleanup();
    await client.end();
  });

  it("lists users newest first with every workspace, platform admins included", async () => {
    const { listUserSummaries } = await import("../directory");
    const page = await listUserSummaries({ query: run, limit: 10 });

    expect(page.total).toBe(3);
    expect(page.rows.map((r) => r.id)).toEqual([ids.root, ids.bob, ids.ada]);
    expect(page.rows[0]).toMatchObject({
      platformRole: "admin",
      workspaces: [],
    });
    expect(page.rows[1]).toMatchObject({ name: null });
    expect(page.rows[2]!.workspaces).toEqual([
      expect.objectContaining({
        id: WS,
        role: "owner",
        planSlug: PLAN,
        subscriptionStatus: "active",
      }),
      expect.objectContaining({
        id: OTHER,
        role: "member",
        planSlug: null,
        subscriptionStatus: null,
      }),
    ]);
  });

  it("pages with a total that does not change with the page", async () => {
    const { listUserSummaries } = await import("../directory");
    const second = await listUserSummaries({ query: run, limit: 2, offset: 2 });
    expect(second.total).toBe(3);
    expect(second.rows.map((r) => r.id)).toEqual([ids.ada]);
  });

  it("matches a workspace's name, and % and _ only literally", async () => {
    const { listUserSummaries } = await import("../directory");
    const literal = await listUserSummaries({
      query: `100%_${run}`,
      limit: 10,
    });
    expect(literal.rows.map((r) => r.id)).toEqual([ids.ada]);

    // As a pattern this would match "Other 100%_…"; taken literally it matches nothing.
    const wildcard = await listUserSummaries({
      query: `Other 1_0%_${run}`,
      limit: 10,
    });
    expect(wildcard.total).toBe(0);
  });

  it("reads one workspace and its members in the order they joined", async () => {
    const { getWorkspace, listWorkspaceMembers } = await import("../directory");
    await expect(getWorkspace(WS)).resolves.toMatchObject({
      id: WS,
      name: `Acme ${run}`,
    });
    await expect(getWorkspace(`${WS}_missing`)).resolves.toBeNull();

    const members = await listWorkspaceMembers(WS);
    expect(members.map((m) => [m.userId, m.role])).toEqual([
      [ids.ada, "owner"],
      [ids.bob, "member"],
    ]);
  });

  it("lists the payment ledger with workspace names, filtered and as money", async () => {
    const { listPayments } = await import("../payments");
    const mine = await listPayments({ workspaceId: WS, limit: 10 });
    expect(mine.total).toBe(1);
    expect(mine.rows[0]).toMatchObject({
      workspaceName: `Acme ${run}`,
      userEmail: `ada_${run}@example.test`,
      amount: { amount: 25_000_000, currency: "USD" },
      status: "paid",
    });

    const pending = await listPayments({
      workspaceId: OTHER,
      status: "pending",
      limit: 10,
    });
    expect(pending.rows.map((r) => r.id)).toEqual([`pay_${run}_2`]);
  });

  it("names the users and workspaces it can, and leaves the rest out", async () => {
    const { resolveDisplayNames } = await import("../directory");
    const names = await resolveDisplayNames({
      userIds: [ids.ada, ids.bob, `u_${run}_gone`],
      workspaceIds: [WS],
    });
    expect(names.users).toEqual({
      [ids.ada]: { name: "Ada", email: `ada_${run}@example.test` },
      [ids.bob]: { name: null, email: `bob_${run}@example.test` },
    });
    expect(names.workspaces).toEqual({ [WS]: `Acme ${run}` });
  });
});
