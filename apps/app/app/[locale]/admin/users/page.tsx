import {
  getSignupsByDay,
  listUserSummaries,
  type UserSummary,
} from "@intelligo-dev/admin";
import { getTimeZone, getTranslations } from "next-intl/server";

import { DataList, type ListRow } from "@/components/admin/data-list";
import { PageTitle } from "@/components/admin/page-title";
import { Panel, Stat } from "@/components/admin/panel";
import { Properties, PropertySection } from "@/components/admin/properties";
import { settled } from "@/components/admin/settled";
import { Link } from "@/i18n/navigation";
import { adminFormat, type AdminFormat } from "@/lib/admin-format";
import { readListQuery, type ListSearchParams } from "@/lib/admin-list";
import { adminPage } from "@/lib/admin-page";
import { planName } from "@/lib/plan-copy";

export const dynamic = "force-dynamic";

type T = Awaited<ReturnType<typeof getTranslations>>;

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: Promise<ListSearchParams>;
}) {
  await adminPage("admin.users.viewed");
  const query = readListQuery(await searchParams);
  const t = await getTranslations("admin-console.users");

  const [users, signups] = await Promise.allSettled([
    listUserSummaries({
      query: query.q || undefined,
      limit: query.size,
      offset: query.offset,
    }),
    getSignupsByDay({ days: 30, timeZone: await getTimeZone() }),
  ]);

  return (
    <>
      <PageTitle title={t("title")} description={t("description")} />
      {settled(
        signups,
        (days) => (
          <SignupStats days={days} />
        ),
        "admin-console.reads.signups"
      )}
      <Panel title={t("list")}>
        {settled(
          users,
          (page) => (
            <UserList rows={page.rows} total={page.total} query={query} />
          ),
          "admin-console.reads.users"
        )}
      </Panel>
    </>
  );
}

async function SignupStats({ days }: { days: { count: number }[] }) {
  const t = await getTranslations("admin-console.users.signups");
  const f = await adminFormat();
  const sum = (list: { count: number }[]) =>
    list.reduce((total, d) => total + d.count, 0);
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      <Stat label={t("month")} value={f.number(sum(days))} />
      <Stat label={t("week")} value={f.number(sum(days.slice(-7)))} />
      <Stat label={t("today")} value={f.number(days.at(-1)?.count ?? 0)} />
    </div>
  );
}

async function UserList({
  rows,
  total,
  query,
}: {
  rows: UserSummary[];
  total: number;
  query: ReturnType<typeof readListQuery>;
}) {
  const t = await getTranslations("admin-console.users");
  const tPlans = await getTranslations("plans");
  const f = await adminFormat();
  const open = rows.find((u) => u.id === query.open) ?? null;
  const first = open?.workspaces[0];

  return (
    <DataList
      columns={[
        { key: "user", header: t("columns.user") },
        { key: "workspace", header: t("columns.workspace") },
        { key: "plan", header: t("columns.plan") },
        { key: "joined", header: t("columns.joined"), className: "text-right" },
      ]}
      rows={rows.map((u) => userRow(u, t, tPlans, f))}
      total={total}
      page={query.page}
      pageSize={query.size}
      search={query.q}
      searchPlaceholder={t("search")}
      openId={open?.id ?? null}
      panelTitle={open ? open.name || open.email : undefined}
      panelDescription={open?.name ? open.email : undefined}
      fullPageHref={first ? `/admin/users/${first.id}` : undefined}
      panel={open ? <UserPanel user={open} /> : undefined}
      empty={t("empty")}
    />
  );
}

function userRow(u: UserSummary, t: T, tPlans: T, f: AdminFormat): ListRow {
  const [first, ...more] = u.workspaces;
  return {
    id: u.id,
    cells: {
      user: {
        text: u.name ?? u.email,
        note: u.name ? u.email : undefined,
        badge: u.platformRole ? t("platformAdmin") : undefined,
        tone: "info",
      },
      workspace: first
        ? {
            text: first.name,
            note: more.length
              ? t("more", { role: first.role, count: more.length })
              : first.role,
          }
        : "",
      plan: first?.planSlug
        ? planName(tPlans, first.planSlug, first.planSlug)
        : "",
      joined: f.date(u.createdAt),
    },
  };
}

async function UserPanel({ user }: { user: UserSummary }) {
  const t = await getTranslations("admin-console.users.panel");
  const tPlans = await getTranslations("plans");
  const f = await adminFormat();
  return (
    <div className="flex flex-col gap-4">
      <Properties
        properties={[
          { key: "email", label: t("email"), value: user.email },
          { key: "name", label: t("name"), value: user.name },
          { key: "role", label: t("platformRole"), value: user.platformRole },
          {
            key: "joined",
            label: t("joined"),
            value: f.dateTime(user.createdAt),
          },
          { key: "id", label: t("id"), value: user.id, mono: true },
        ]}
      />
      <PropertySection title={t("workspaces")}>
        {user.workspaces.length === 0 ? (
          <p className="text-sm text-muted-foreground">{t("noWorkspaces")}</p>
        ) : (
          <ul className="divide-y text-sm">
            {user.workspaces.map((w) => (
              <li
                key={w.id}
                className="flex items-center justify-between gap-2 py-2"
              >
                <Link
                  href={`/admin/users/${w.id}`}
                  className="font-medium hover:underline"
                >
                  {w.name}
                </Link>
                <span className="text-xs text-muted-foreground">
                  {w.planSlug
                    ? t("roleOnPlan", {
                        role: w.role,
                        plan: planName(tPlans, w.planSlug, w.planSlug),
                      })
                    : w.role}
                </span>
              </li>
            ))}
          </ul>
        )}
      </PropertySection>
    </div>
  );
}
