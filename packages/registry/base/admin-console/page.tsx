/**
 * The console's overview: the product's own panels first
 * (`adminConfig.overviewPanels`), then the platform's — the last 24 hours,
 * the newest workspaces and integration health — so every deployment shows
 * the same operational truth.
 *
 * Each read renders on its own: one that fails says so, and the rest of
 * the page still renders.
 */

import {
  getIntegrationHealth,
  getPlatformOverview,
  listUnsettledExecutions,
  listWorkspaces,
} from "@intelligo-dev/admin";
import { getTranslations } from "next-intl/server";

import { IntegrationHealth } from "@/components/admin/integration-health";
import { PageTitle } from "@/components/admin/page-title";
import { PlatformOverview } from "@/components/admin/platform-overview";
import { settled } from "@/components/admin/settled";
import { adminConfig } from "@/lib/admin-config";
import { adminPage } from "@/lib/admin-page";

export const dynamic = "force-dynamic";

export default async function AdminOverviewPage() {
  await adminPage("admin.overview.viewed");
  const t = await getTranslations("admin-console.overview");

  const [product, platform, integrations] = await Promise.allSettled([
    (async () => (await adminConfig.overviewPanels?.()) ?? null)(),
    Promise.all([
      getPlatformOverview(),
      listWorkspaces(10),
      listUnsettledExecutions(),
    ]),
    getIntegrationHealth(),
  ]);

  return (
    <>
      <PageTitle title={t("title")} description={t("description")} />
      {settled(product, (panels) => panels, "admin-console.reads.product")}
      {settled(
        platform,
        ([overview, workspaces, unsettled]) => (
          <PlatformOverview
            overview={overview}
            workspaces={workspaces}
            unsettled={unsettled.length}
          />
        ),
        "admin-console.reads.platform"
      )}
      {settled(
        integrations,
        (value) => (
          <IntegrationHealth integrations={value} />
        ),
        "admin-console.reads.health"
      )}
    </>
  );
}
