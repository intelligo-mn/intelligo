/**
 * What went wrong and who did what: jobs that exhausted their retries,
 * executions left unsettled (credit still held against them), and the
 * audit trail — filtered by action, paged, each event's actor and
 * resource named where they still resolve.
 */

import {
  countAuditEvents,
  listFailedJobs,
  listUnsettledExecutions,
  queryAuditEvents,
} from "@intelligo-dev/admin";
import { getTranslations } from "next-intl/server";

import { AuditList } from "@/components/admin/audit-list";
import { FailedJobs, UnsettledExecutions } from "@/components/admin/operations";
import { PageTitle } from "@/components/admin/page-title";
import { Panel } from "@/components/admin/panel";
import { settled } from "@/components/admin/settled";
import { readListQuery, type ListSearchParams } from "@/lib/admin-list";
import { adminPage } from "@/lib/admin-page";

export const dynamic = "force-dynamic";

export default async function AdminOperationsPage({
  searchParams,
}: {
  searchParams: Promise<ListSearchParams>;
}) {
  await adminPage("admin.operations.viewed");
  const query = readListQuery(await searchParams);
  const t = await getTranslations("admin-console.operations");
  const filter = query.q ? { action: query.q } : {};

  const [jobs, unsettled, events, total] = await Promise.allSettled([
    listFailedJobs(50),
    listUnsettledExecutions(),
    queryAuditEvents({ ...filter, limit: query.size, offset: query.offset }),
    countAuditEvents(filter),
  ]);

  return (
    <>
      <PageTitle title={t("title")} description={t("description")} />
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title={t("jobs.title")}>
          {settled(
            jobs,
            (rows) => (
              <FailedJobs rows={rows} />
            ),
            "admin-console.reads.jobs"
          )}
        </Panel>
        <Panel title={t("unsettled.title")}>
          {settled(
            unsettled,
            (rows) => (
              <UnsettledExecutions rows={rows} />
            ),
            "admin-console.reads.unsettled"
          )}
        </Panel>
      </div>
      <Panel title={t("audit.title")}>
        {settled(
          events,
          (rows) => (
            <AuditList
              rows={rows}
              total={total.status === "fulfilled" ? total.value : rows.length}
              query={query}
            />
          ),
          "admin-console.reads.audit"
        )}
      </Panel>
    </>
  );
}
