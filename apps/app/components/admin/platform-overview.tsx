import "server-only";

/**
 * The platform in the last 24 hours — workspaces, users, executions,
 * failures and refusals side by side (a spike in refusals is a pricing or
 * provisioning problem that looks like nothing in an error dashboard),
 * what was charged per currency — and the newest workspaces, each a link
 * to its support page.
 */

import type {
  PlatformOverview as Overview,
  WorkspaceRow,
} from "@intelligo-dev/admin";
import { getTranslations } from "next-intl/server";

import { Panel, Stat } from "@/components/admin/panel";
import { Link } from "@/i18n/navigation";
import { adminFormat } from "@/lib/admin-format";

export async function PlatformOverview({
  overview,
  workspaces,
  unsettled,
}: {
  overview: Overview;
  workspaces: WorkspaceRow[];
  /** How many executions are stuck unsettled. */
  unsettled: number;
}) {
  const t = await getTranslations("admin-console.overview.platform");
  const f = await adminFormat();
  const charged = overview.charged24h.length
    ? f.moneyList(overview.charged24h)
    : t("nothingCharged");

  return (
    <Panel title={t("title")}>
      <div className="grid gap-3 sm:grid-cols-3">
        <Stat label={t("workspaces")} value={f.number(overview.workspaces)} />
        <Stat label={t("users")} value={f.number(overview.users)} />
        <Stat label={t("charged")} value={charged} />
        <Stat
          label={t("executions")}
          value={f.number(overview.executions24h)}
        />
        <Stat label={t("failed")} value={f.number(overview.failed24h)} />
        <Stat
          label={t("refused")}
          value={f.number(overview.refused24h)}
          hint={
            unsettled > 0 ? (
              <Link href="/admin/operations" className="underline">
                {t("unsettled", { count: unsettled })}
              </Link>
            ) : undefined
          }
        />
      </div>
      <h3 className="pt-2 text-sm font-medium">{t("newest")}</h3>
      {workspaces.length === 0 ? (
        <p className="text-sm text-muted-foreground">{t("noWorkspaces")}</p>
      ) : (
        <ul className="divide-y text-sm">
          {workspaces.map((w) => (
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
              <span className="text-xs text-muted-foreground tabular-nums">
                {f.date(w.createdAt)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </Panel>
  );
}
