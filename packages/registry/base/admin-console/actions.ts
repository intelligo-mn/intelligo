"use server";

/**
 * The console's actions. Thin transports: parse, authorize with an audit
 * row or refuse (`requireAdminOrRefuse`), call the framework's service,
 * answer an `ActionResult` whose message is a key in
 * `admin-console.actions`, revalidate. The policy — who may act as whom,
 * how a plan grant ends, how credit is recorded, what a billing settings
 * change converts (nothing) — is the services'.
 *
 * A failure is answered with a key, never the error's own text, which can
 * carry internals; the error itself goes to the server log.
 */

import { requireAdminOrRefuse, startImpersonation } from "@intelligo-dev/admin";
import {
  creditWorkspace,
  getBillingSettings,
  grantPlan,
  updateBillingSettings,
} from "@intelligo-dev/billing";
import { createLogger } from "@intelligo-dev/core/logger";
import { fromMajor } from "@intelligo-dev/core/money";
import { revalidatePath } from "next/cache";
import { getFormatter, getLocale, getTranslations } from "next-intl/server";
import { z } from "zod";

import type { ActionResult } from "@/components/admin/action-form";
import { redirect } from "@/i18n/navigation";
import { adminConfig } from "@/lib/admin-config";
import { adminFormat } from "@/lib/admin-format";
import { composeIntelligo } from "@/lib/intelligo";
import { planName } from "@/lib/plan-copy";

const log = createLogger("admin-console");

const KEY = "admin-console.actions";

/** Error codes the services throw, and the message each is answered with. */
const ERRORS: Record<string, string> = {
  invalid_plan: "invalidPlan",
  invalid_currency: "invalidCurrency",
  invalid_rate: "invalidRate",
  invalid_margin: "invalidMargin",
  empty_update: "invalid",
  currency_mismatch: "currencyMismatch",
  invalid_amount: "invalid",
  forbidden: "refused",
  unauthenticated: "refused",
};

function failure(error: unknown, action: string): ActionResult {
  if (error instanceof z.ZodError) {
    const reason = error.issues.some((i) => i.path[0] === "reason");
    return {
      ok: false,
      message: `${KEY}.${reason ? "reasonRequired" : "invalid"}`,
    };
  }
  const code = (error as { code?: unknown } | null)?.code;
  const known = typeof code === "string" ? ERRORS[code] : undefined;
  if (known) return { ok: false, message: `${KEY}.${known}` };
  log.error("An admin action failed", {
    action,
    error:
      error instanceof Error ? (error.stack ?? error.message) : String(error),
  });
  return { ok: false, message: `${KEY}.failed` };
}

const done = (
  message: string,
  values?: Record<string, string>
): ActionResult => {
  revalidatePath("/[locale]/admin", "layout");
  return {
    ok: true,
    message: `${KEY}.${message}`,
    ...(values ? { values } : {}),
  };
};

const reason = z.string().trim().min(3);

const grantInput = z.object({
  workspaceId: z.string().min(1),
  planSlug: z.string().min(1),
  days: z.coerce.number().int().min(0).max(3650),
  reason,
});

export async function grantPlanAction(
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  composeIntelligo();
  try {
    const input = grantInput.parse(Object.fromEntries(formData));
    const actor = await requireAdminOrRefuse(
      "admin.plan.granted",
      {
        kind: "workspace",
        id: input.workspaceId,
        workspaceId: input.workspaceId,
      },
      { planSlug: input.planSlug, days: input.days, reason: input.reason }
    );
    const result = await grantPlan({
      workspaceId: input.workspaceId,
      planSlug: input.planSlug,
      reason: input.reason,
      actorId: actor.userId,
      ...(input.days > 0 ? { days: input.days } : { endsAt: null }),
    });
    const f = await adminFormat();
    const plan = planName(
      await getTranslations("plans"),
      input.planSlug,
      input.planSlug
    );
    return result.endsAt
      ? done("planGranted", { plan, endsAt: f.date(result.endsAt) })
      : done("planGrantedOpen", { plan });
  } catch (error) {
    return failure(error, "grantPlan");
  }
}

const creditInput = z.object({
  workspaceId: z.string().min(1),
  amount: z.coerce.number().positive().max(1_000_000_000),
  reason,
  /** Minted when the form renders, so a resubmitted form is the same request, credited once. */
  requestId: z.uuid(),
});

export async function creditAction(
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  composeIntelligo();
  try {
    const input = creditInput.parse(Object.fromEntries(formData));
    const actor = await requireAdminOrRefuse(
      "admin.credit.granted",
      {
        kind: "workspace",
        id: input.workspaceId,
        workspaceId: input.workspaceId,
      },
      { amount: input.amount, reason: input.reason }
    );
    // Credit is added in what the deployment bills in, never a currency the form names.
    const { currency } = await getBillingSettings();
    const amount = fromMajor(input.amount, currency);
    const { replayed } = await creditWorkspace(input.workspaceId, amount, {
      reason: input.reason,
      requestId: `admin-credit:${input.requestId}`,
      actorId: actor.userId,
    });
    if (replayed) return done("creditReplayed");
    const f = await adminFormat();
    return done("creditAdded", { amount: f.money(amount) });
  } catch (error) {
    return failure(error, "credit");
  }
}

const impersonateInput = z.object({
  userId: z.string().min(1),
  reason,
});

export async function impersonateAction(
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  composeIntelligo();
  try {
    const { userId, reason } = impersonateInput.parse(
      Object.fromEntries(formData)
    );
    const result = await startImpersonation({ targetUserId: userId, reason });
    log.warn("Impersonation started", {
      targetUserId: userId,
      expiresAt: result.expiresAt.toISOString(),
    });
  } catch (error) {
    if (error instanceof z.ZodError) return failure(error, "impersonate");
    // Not surfaced: why it failed (not an admin, the target is one, the
    // audit row could not be written) is what a caller who should not be
    // here would want to learn.
    log.error("Impersonation refused", {
      error: error instanceof Error ? error.message : String(error),
    });
    return { ok: false, message: `${KEY}.impersonationFailed` };
  }
  // Outside the try: redirect() signals by throwing.
  redirect({ href: adminConfig.backHref, locale: await getLocale() });
  return null;
}

const settingsInput = z.object({
  currency: z.string().trim().toUpperCase().length(3),
  usdRate: z.coerce.number().positive(),
  marginPercent: z.coerce.number().int().positive().max(100_000),
});

export async function updateBillingSettingsAction(
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  composeIntelligo();
  try {
    const input = settingsInput.parse(Object.fromEntries(formData));
    await requireAdminOrRefuse(
      "admin.billing_settings.updated",
      { kind: "billing_settings", id: "default" },
      { ...input }
    );
    await updateBillingSettings({
      currency: input.currency,
      // What one USD costs, as an amount of the new currency.
      usdRateMicros: fromMajor(input.usdRate, input.currency).amount,
      marginBp: input.marginPercent * 100,
    });
    const format = await getFormatter();
    return done("settingsSaved", {
      currency: input.currency,
      rate: format.number(input.usdRate),
    });
  } catch (error) {
    return failure(error, "updateBillingSettings");
  }
}
