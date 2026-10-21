import "server-only";

/**
 * What support may do about a workspace: grant a plan, add credit, act as
 * a member. Each form needs a reason, which the audit row keeps; the
 * actions (`@/actions/admin-console`) refuse when that row cannot be
 * written.
 */

import type { WorkspaceMember } from "@intelligo-dev/admin";
import {
  getDefaultProductSlug,
  getProductPlans,
} from "@intelligo-dev/billing/plan-registry";
import { getTranslations } from "next-intl/server";

import {
  creditAction,
  grantPlanAction,
  impersonateAction,
} from "@/actions/admin-console";
import { ActionForm, Field, selectClass } from "@/components/admin/action-form";
import { Panel } from "@/components/admin/panel";
import { Input } from "@/components/ui/input";
import { planName } from "@/lib/plan-copy";

/** The catalogue's plans, or none when billing names no product yet. */
function catalogue(): { slug: string; name: string }[] {
  try {
    return Object.values(getProductPlans(getDefaultProductSlug()) ?? {});
  } catch {
    return [];
  }
}

export async function SupportActions({
  workspaceId,
  currency,
  members,
}: {
  workspaceId: string;
  /** The deployment's billing currency, which credit is added in. */
  currency: string;
  members: WorkspaceMember[];
}) {
  const t = await getTranslations("admin-console.workspace");
  const tPlans = await getTranslations("plans");
  const plans = catalogue();
  // A platform admin cannot be impersonated; offering one only fails.
  const impersonable = members.filter((m) => !m.platformRole);

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <Panel title={t("grant.title")}>
        <ActionForm action={grantPlanAction} submit={t("grant.submit")}>
          <input type="hidden" name="workspaceId" value={workspaceId} />
          <Field label={t("grant.plan")}>
            <select name="planSlug" required className={selectClass}>
              {plans.map((plan) => (
                <option key={plan.slug} value={plan.slug}>
                  {planName(tPlans, plan.slug, plan.name)}
                </option>
              ))}
            </select>
          </Field>
          <Field label={t("grant.days")}>
            <Input
              name="days"
              type="number"
              min={0}
              max={3650}
              defaultValue={30}
            />
          </Field>
          <Field label={t("reason")}>
            <Input
              name="reason"
              required
              minLength={3}
              placeholder={t("grant.reasonHint")}
            />
          </Field>
        </ActionForm>
      </Panel>

      <Panel title={t("credit.title")}>
        <ActionForm action={creditAction} submit={t("credit.submit")}>
          <input type="hidden" name="workspaceId" value={workspaceId} />
          {/* Minted per render: a resubmitted form is the same request and credits once; the refresh after a success mints the next. */}
          <input type="hidden" name="requestId" value={crypto.randomUUID()} />
          <Field label={t("credit.amount", { currency })}>
            <Input name="amount" type="number" min={0.01} step="any" required />
          </Field>
          <Field label={t("reason")}>
            <Input
              name="reason"
              required
              minLength={3}
              placeholder={t("credit.reasonHint")}
            />
          </Field>
        </ActionForm>
      </Panel>

      <Panel title={t("impersonate.title")}>
        <p className="text-xs text-muted-foreground">{t("impersonate.note")}</p>
        {impersonable.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            {t("impersonate.nobody")}
          </p>
        ) : (
          <ActionForm
            action={impersonateAction}
            submit={t("impersonate.submit")}
            variant="destructive"
          >
            <input type="hidden" name="workspaceId" value={workspaceId} />
            <Field label={t("impersonate.member")}>
              <select name="userId" required className={selectClass}>
                {impersonable.map((m) => (
                  <option key={m.userId} value={m.userId}>
                    {m.email}
                  </option>
                ))}
              </select>
            </Field>
            <Field label={t("reason")}>
              <Input name="reason" required minLength={3} />
            </Field>
          </ActionForm>
        )}
      </Panel>
    </div>
  );
}
