/**
 * One workspace, for support: its plan, credit and members, its payments
 * and recent executions — and the three things support may do about them:
 * grant a plan, add credit, act as a member. Each needs a reason and is
 * audited, or refused when the audit row cannot be written. The product's
 * own panels for the workspace follow (`adminConfig.workspacePanels`).
 */

import {
  getWorkspace,
  listPayments,
  listWorkspaceExecutions,
  listWorkspaceMembers,
} from "@intelligo-dev/admin";
import {
  getBillingSettings,
  getWorkspaceBilling,
} from "@intelligo-dev/billing";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import { PageTitle } from "@/components/admin/page-title";
import { Panel, Stat } from "@/components/admin/panel";
import { settled } from "@/components/admin/settled";
import {
  ExecutionTable,
  MemberTable,
  PaymentTable,
} from "@/components/admin/workspace-tables";
import { SupportActions } from "@/components/admin/support-actions";
import { adminConfig } from "@/lib/admin-config";
import { adminFormat } from "@/lib/admin-format";
import { adminPage } from "@/lib/admin-page";
import { planName } from "@/lib/plan-copy";

export const dynamic = "force-dynamic";

export default async function AdminWorkspacePage({
  params,
}: {
  params: Promise<{ workspaceId: string }>;
}) {
  const { workspaceId } = await params;
  await adminPage("admin.workspace.viewed", {
    kind: "workspace",
    id: workspaceId,
    workspaceId,
  });
  const workspace = await getWorkspace(workspaceId);
  if (!workspace) notFound();

  const t = await getTranslations("admin-console.workspace");
  const f = await adminFormat();
  const [billing, members, payments, executions, settings, product] =
    await Promise.allSettled([
      getWorkspaceBilling(workspaceId),
      listWorkspaceMembers(workspaceId),
      listPayments({ workspaceId, limit: 20 }),
      listWorkspaceExecutions(workspaceId, 20),
      getBillingSettings(),
      (async () =>
        (await adminConfig.workspacePanels?.(workspaceId)) ?? null)(),
    ]);

  return (
    <>
      <PageTitle
        title={workspace.name}
        description={t("description", {
          slug: workspace.slug ?? workspace.id,
          created: f.date(workspace.createdAt),
        })}
        crumbs={[{ label: t("crumb"), href: "/admin/users" }]}
      />
      {settled(
        billing,
        (value) => (
          <BillingStats
            billing={value}
            members={
              members.status === "fulfilled" ? members.value.length : null
            }
          />
        ),
        "admin-console.reads.billing"
      )}
      {settled(
        settings,
        (value) => (
          <SupportActions
            workspaceId={workspaceId}
            currency={value.currency}
            members={members.status === "fulfilled" ? members.value : []}
          />
        ),
        "admin-console.reads.billingSettings"
      )}
      {settled(product, (panels) => panels, "admin-console.reads.product")}
      <Panel title={t("members.title")}>
        {settled(
          members,
          (rows) => (
            <MemberTable rows={rows} />
          ),
          "admin-console.reads.members"
        )}
      </Panel>
      <Panel title={t("payments.title")}>
        {settled(
          payments,
          (page) => (
            <PaymentTable rows={page.rows} />
          ),
          "admin-console.reads.payments"
        )}
      </Panel>
      <Panel title={t("executions.title")}>
        {settled(
          executions,
          (rows) => (
            <ExecutionTable rows={rows} />
          ),
          "admin-console.reads.executions"
        )}
      </Panel>
    </>
  );
}

async function BillingStats({
  billing,
  members,
}: {
  billing: Awaited<ReturnType<typeof getWorkspaceBilling>>;
  members: number | null;
}) {
  const t = await getTranslations("admin-console.workspace.stats");
  const tPlans = await getTranslations("plans");
  const f = await adminFormat();
  const { plan, subscription, creditBalance } = billing;
  const end = subscription?.currentPeriodEnd;
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      <Stat
        label={t("plan")}
        value={plan ? planName(tPlans, plan.slug, plan.name) : t("noPlan")}
        hint={
          end
            ? t("until", { date: f.date(end) })
            : (subscription?.status ?? undefined)
        }
      />
      <Stat
        label={t("credit")}
        value={
          creditBalance.currency
            ? f.money({
                amount: creditBalance.balanceMicros,
                currency: creditBalance.currency,
              })
            : t("noCredit")
        }
      />
      <Stat
        label={t("members")}
        value={members === null ? "" : f.number(members)}
      />
    </div>
  );
}
