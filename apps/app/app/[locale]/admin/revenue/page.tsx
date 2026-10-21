import {
  countUsageRecords,
  getPlanDistribution,
  getProviderCostTotal,
  getRevenue,
  getUsageByModel,
  getUsageByUser,
  listPayments,
  listUsageRecords,
} from "@intelligo-dev/admin";
import { getBillingSettings } from "@intelligo-dev/billing";
import { getTranslations } from "next-intl/server";

import { UrlTabs } from "@/components/admin/data-list";
import { PageTitle } from "@/components/admin/page-title";
import { Panel } from "@/components/admin/panel";
import {
  BillingSettingsForm,
  RevenueStats,
  UsageTables,
} from "@/components/admin/revenue";
import { PaymentList, UsageLedger } from "@/components/admin/revenue-lists";
import { settled } from "@/components/admin/settled";
import { TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { readListQuery, type ListSearchParams } from "@/lib/admin-list";
import { adminPage } from "@/lib/admin-page";

export const dynamic = "force-dynamic";

const TABS = ["summary", "payments", "ledger"] as const;
type Tab = (typeof TABS)[number];

export default async function AdminRevenuePage({
  searchParams,
}: {
  searchParams: Promise<ListSearchParams>;
}) {
  await adminPage("admin.revenue.viewed");
  const params = await searchParams;
  const tab: Tab = TABS.find((name) => name === params.tab) ?? "summary";
  const t = await getTranslations("admin-console.revenue");

  return (
    <>
      <PageTitle title={t("title")} description={t("description")} />
      <UrlTabs initial="summary">
        <TabsList>
          {TABS.map((name) => (
            <TabsTrigger key={name} value={name}>
              {t(`tabs.${name}`)}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value={tab} className="space-y-6 pt-4">
          {tab === "summary" && <Summary />}
          {tab === "payments" && <Payments params={params} />}
          {tab === "ledger" && <Ledger params={params} />}
        </TabsContent>
      </UrlTabs>
    </>
  );
}

async function Summary() {
  const t = await getTranslations("admin-console.revenue");
  const [settings, revenue, cost, plans, byModel, byUser] =
    await Promise.allSettled([
      getBillingSettings(),
      getRevenue(),
      getProviderCostTotal(),
      getPlanDistribution(),
      getUsageByModel(20),
      getUsageByUser(20),
    ]);
  return (
    <>
      <Panel title={t("settings.title")}>
        {settled(
          settings,
          (value) => (
            <BillingSettingsForm settings={value} />
          ),
          "admin-console.reads.billingSettings"
        )}
      </Panel>
      <RevenueStats revenue={revenue} cost={cost} plans={plans} />
      <UsageTables byModel={byModel} byUser={byUser} />
    </>
  );
}

async function Payments({ params }: { params: ListSearchParams }) {
  const query = readListQuery(params, { facets: ["status"] });
  const result = await listPayments({
    status: query.filters.status,
    limit: query.size,
    offset: query.offset,
  }).then(
    (value) => ({ status: "fulfilled" as const, value }),
    (reason: unknown) => ({ status: "rejected" as const, reason })
  );
  return settled(
    result,
    (page) => <PaymentList page={page} query={query} />,
    "admin-console.reads.payments"
  );
}

async function Ledger({ params }: { params: ListSearchParams }) {
  const query = readListQuery(params);
  const [records, total] = await Promise.allSettled([
    listUsageRecords(query.size, query.offset),
    countUsageRecords(),
  ]);
  return settled(
    records,
    (rows) => (
      <UsageLedger
        rows={rows}
        total={total.status === "fulfilled" ? total.value : rows.length}
        query={query}
      />
    ),
    "admin-console.reads.ledger"
  );
}
