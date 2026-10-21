import "server-only";

/**
 * The revenue page's summary: the billing settings form, revenue, cost and
 * plan tiles, and the models and users that cost the most. Amounts are
 * `Money` from `@intelligo-dev/admin`, written by `adminFormat()`; nothing
 * here converts one currency into another or sums across them.
 */

import type {
  PlanDistributionRow,
  UsageByModelRow,
  UsageByUserRow,
} from "@intelligo-dev/admin";
import type { ResolvedBillingSettings } from "@intelligo-dev/billing";
import { money, toMajor, type Money } from "@intelligo-dev/core/money";
import { getTranslations } from "next-intl/server";

import { updateBillingSettingsAction } from "@/actions/admin-console";
import { ActionForm, Field } from "@/components/admin/action-form";
import { Panel, Stat } from "@/components/admin/panel";
import { settled } from "@/components/admin/settled";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { adminFormat } from "@/lib/admin-format";
import { CURRENCY } from "@/lib/billing-config";

export async function BillingSettingsForm({
  settings,
}: {
  settings: ResolvedBillingSettings;
}) {
  const t = await getTranslations("admin-console.revenue.settings");
  // What one USD costs, as an amount of the deployment's currency.
  const rate = toMajor(money(settings.usdRateMicros, settings.currency));
  return (
    <>
      {settings.currency !== CURRENCY && (
        <Alert variant="destructive">
          <AlertDescription>
            {t("mismatch", { database: settings.currency, app: CURRENCY })}
          </AlertDescription>
        </Alert>
      )}
      <ActionForm action={updateBillingSettingsAction} submit={t("submit")}>
        <div className="grid gap-3 sm:grid-cols-3">
          <Field label={t("currency")}>
            <Input
              name="currency"
              defaultValue={settings.currency}
              maxLength={3}
              required
            />
          </Field>
          <Field label={t("rate")}>
            <Input
              name="usdRate"
              type="number"
              step="any"
              min={0}
              defaultValue={rate}
              required
            />
          </Field>
          <Field label={t("margin")}>
            <Input
              name="marginPercent"
              type="number"
              step={1}
              min={1}
              defaultValue={settings.marginBp / 100}
              required
            />
          </Field>
        </div>
        <p className="text-xs text-muted-foreground">{t("note")}</p>
      </ActionForm>
    </>
  );
}

export async function RevenueStats({
  revenue,
  cost,
  plans,
}: {
  revenue: PromiseSettledResult<Money[]>;
  cost: PromiseSettledResult<Money>;
  plans: PromiseSettledResult<PlanDistributionRow[]>;
}) {
  const t = await getTranslations("admin-console.revenue.stats");
  const f = await adminFormat();
  const planCounts = (rows: PlanDistributionRow[]) =>
    rows
      .map((r) => t("planCount", { plan: r.planSlug, count: r.subscriptions }))
      .join(" · ");
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {settled(
        revenue,
        (rows) => (
          <Stat
            label={t("revenue")}
            value={rows.length ? f.moneyList(rows) : t("none")}
            hint={t("revenueHint")}
          />
        ),
        "admin-console.reads.revenue"
      )}
      {settled(
        cost,
        (value) => (
          <Stat label={t("cost")} value={f.money(value)} />
        ),
        "admin-console.reads.cost"
      )}
      {settled(
        plans,
        (rows) => (
          <Stat
            label={t("plans")}
            value={rows.length ? planCounts(rows) : t("none")}
          />
        ),
        "admin-console.reads.plans"
      )}
    </div>
  );
}

export async function UsageTables({
  byModel,
  byUser,
}: {
  byModel: PromiseSettledResult<UsageByModelRow[]>;
  byUser: PromiseSettledResult<UsageByUserRow[]>;
}) {
  const t = await getTranslations("admin-console.revenue.usage");
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Panel title={t("byModel")}>
        {settled(
          byModel,
          (rows) => (
            <ModelTable rows={rows} />
          ),
          "admin-console.reads.usageByModel"
        )}
      </Panel>
      <Panel title={t("byUser")}>
        {settled(
          byUser,
          (rows) => (
            <UserTable rows={rows} />
          ),
          "admin-console.reads.usageByUser"
        )}
      </Panel>
    </div>
  );
}

async function ModelTable({ rows }: { rows: UsageByModelRow[] }) {
  const t = await getTranslations("admin-console.revenue.usage");
  const f = await adminFormat();
  if (rows.length === 0)
    return <p className="text-sm text-muted-foreground">{t("empty")}</p>;
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{t("model")}</TableHead>
          <TableHead className="text-right">{t("requests")}</TableHead>
          <TableHead className="text-right">{t("tokens")}</TableHead>
          <TableHead className="text-right">{t("cost")}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((r) => (
          <TableRow key={r.model ?? ""}>
            <TableCell className="text-xs">{r.model ?? ""}</TableCell>
            <TableCell className="text-right tabular-nums">
              {f.number(r.requests)}
            </TableCell>
            <TableCell className="text-right text-xs tabular-nums">
              {t("inOut", {
                input: f.number(r.inputTokens),
                output: f.number(r.outputTokens),
              })}
            </TableCell>
            <TableCell className="text-right tabular-nums">
              {f.money(r.providerCost)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

async function UserTable({ rows }: { rows: UsageByUserRow[] }) {
  const t = await getTranslations("admin-console.revenue.usage");
  const f = await adminFormat();
  if (rows.length === 0)
    return <p className="text-sm text-muted-foreground">{t("empty")}</p>;
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{t("user")}</TableHead>
          <TableHead className="text-right">{t("requests")}</TableHead>
          <TableHead className="text-right">{t("cost")}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((r) => (
          <TableRow key={r.userId ?? ""}>
            <TableCell className="text-xs">
              {r.email ?? r.name ?? t("noUser")}
            </TableCell>
            <TableCell className="text-right tabular-nums">
              {f.number(r.requests)}
            </TableCell>
            <TableCell className="text-right tabular-nums">
              {f.money(r.providerCost)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
