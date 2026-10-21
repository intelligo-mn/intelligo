import "server-only";

/**
 * The operations page's two short lists: jobs that exhausted their
 * retries, with the error they last failed on, and executions stuck
 * between running and settled.
 */

import type {
  listFailedJobs,
  listUnsettledExecutions,
} from "@intelligo-dev/admin";
import { getTranslations } from "next-intl/server";

import { Status } from "@/components/admin/panel";
import { Link } from "@/i18n/navigation";
import { adminFormat } from "@/lib/admin-format";

type Job = Awaited<ReturnType<typeof listFailedJobs>>[number];
type Execution = Awaited<ReturnType<typeof listUnsettledExecutions>>[number];

export async function FailedJobs({ rows }: { rows: Job[] }) {
  const t = await getTranslations("admin-console.operations.jobs");
  const f = await adminFormat();
  if (rows.length === 0)
    return <p className="text-sm text-muted-foreground">{t("empty")}</p>;
  return (
    <ul className="space-y-2">
      {rows.map((job) => (
        <li key={job.id} className="rounded-lg border p-2">
          <div className="flex items-center justify-between gap-2">
            <span className="font-medium">{job.kind}</span>
            <span className="text-xs text-muted-foreground tabular-nums">
              {t("attempts", {
                at: f.dateTime(job.finishedAt ?? job.createdAt),
                attempts: job.attempts,
                max: job.maxAttempts,
              })}
            </span>
          </div>
          {job.lastError && (
            <p className="mt-1 line-clamp-3 text-xs text-destructive">
              {job.lastError}
            </p>
          )}
        </li>
      ))}
    </ul>
  );
}

export async function UnsettledExecutions({ rows }: { rows: Execution[] }) {
  const t = await getTranslations("admin-console.operations.unsettled");
  const f = await adminFormat();
  if (rows.length === 0)
    return <p className="text-sm text-muted-foreground">{t("empty")}</p>;
  return (
    <ul className="divide-y text-sm">
      {rows.map((e) => (
        <li key={e.id} className="flex flex-wrap items-center gap-2 py-2">
          <span className="text-xs text-muted-foreground tabular-nums">
            {f.dateTime(e.startedAt)}
          </span>
          <span className="font-medium">{e.capability}</span>
          <Status status={e.status} />
          <Link
            href={`/admin/users/${e.workspaceId}`}
            className="ml-auto text-xs underline underline-offset-2"
          >
            {t("workspace")}
          </Link>
        </li>
      ))}
    </ul>
  );
}
