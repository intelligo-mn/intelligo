import "server-only";

/**
 * Integration health: each check's status and the one line saying what to
 * do about it. The built-in checks (database, job queue, settlement) are
 * written from their numbers in the reader's language
 * (`admin-console.health.<key>.<status>`); a product's own probe — or a
 * check that failed outright — shows the line it returned.
 */

import type { IntegrationHealth as Health } from "@intelligo-dev/admin";
import { getTranslations } from "next-intl/server";

import { Panel, Status } from "@/components/admin/panel";

type Translator = Awaited<ReturnType<typeof getTranslations>>;

function label(t: Translator, check: Health): string {
  const key = `${check.key}.label`;
  return t.has(key) ? t(key) : check.label;
}

function detail(t: Translator, check: Health): string {
  const key = `${check.key}.${check.status}`;
  // A check that threw reports `down` with its error and no numbers.
  if (!check.metrics || !t.has(key)) return check.detail;
  return t(key, check.metrics);
}

export async function IntegrationHealth({
  integrations,
}: {
  integrations: Health[];
}) {
  const t = await getTranslations("admin-console.health");
  return (
    <Panel title={t("title")}>
      <ul className="divide-y text-sm">
        {integrations.map((check) => (
          <li key={check.key} className="flex flex-wrap items-start gap-3 py-2">
            <span className="w-40 shrink-0 font-medium">{label(t, check)}</span>
            <Status status={check.status} />
            <span className="min-w-0 flex-1 text-muted-foreground">
              {detail(t, check)}
            </span>
          </li>
        ))}
      </ul>
    </Panel>
  );
}
