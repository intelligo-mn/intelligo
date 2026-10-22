/**
 * Admission's rule: whether a workspace's pools cover a price, decided
 * from values already read. Nothing here reads or writes the database;
 * `quota.ts` reads the pools under the workspace lock and acts on the
 * decision.
 */

import {
  UnknownModelError,
  estimateWorstCaseCharge,
  type BillingRate,
  type Workload,
} from "@intelligo-dev/executions/pricing";
import {
  add,
  compare,
  formatMoney,
  isNegative,
  money,
  subtract,
  type Money,
} from "@intelligo-dev/core/money";
import type { QuotaCheckResult } from "./quota-types";
import { ChargeError } from "./charge-error";

/**
 * The three pools a workspace can spend from, read once per decision.
 *
 *   remaining = max(zero, allowance − used) + topupBalance + trialRemaining
 *
 * `allowanceUsedMicros` is the part of this period's spend that the plan
 * allowance funded — `recordTokenUsage` increments it only up to the
 * allowance and sends the remainder to top-up or trial — so the three
 * pools never count one charge twice.
 */
export type Pools = {
  planSlug: string;
  trialActive: boolean;
  /** The pools, in the deployment's own currency. */
  allowance: Money;
  used: Money;
  planRemaining: Money;
  topupBalance: Money;
  trialRemaining: Money;
  /** What this deployment bills in — currency, USD rate, margin. */
  rate: BillingRate;
};

/**
 * What admission holds for: the worst case of a run on a model (one
 * call, or its workload's), or a fixed amount the product charges for
 * one unit of work.
 */
export type Price =
  { modelId: string; workload?: Workload } | { amount: Money };

/**
 * A fixed amount must be a positive whole number of micros in the
 * deployment's currency; the pools hold nothing else.
 */
export function assertChargeable(amount: Money, currency: string): void {
  if (!Number.isSafeInteger(amount.amount) || amount.amount <= 0) {
    throw new ChargeError(
      "invalid_amount",
      `A charge is a positive whole number of micros, not ${amount.amount}.`
    );
  }
  if (amount.currency !== currency) {
    throw new ChargeError(
      "currency_mismatch",
      `This deployment bills in ${currency}; ${amount.currency} cannot be charged.`
    );
  }
}

/**
 * Admits `price` against `pools` less `reservedMicros` already held by
 * other requests: plan and top-up first, the trial only as a fallback.
 */
export function decideQuota(
  pools: Pools,
  price: Price,
  reservedMicros: number
): QuotaCheckResult {
  {
    const { trialActive } = pools;
    const remaining = add(
      add(pools.planRemaining, pools.topupBalance),
      pools.trialRemaining
    );
    const reserved = money(reservedMicros, pools.rate.currency);

    // A model with no registered price cannot be estimated, and
    // admission must not invent a ceiling. Refuse with a code the
    // transport can turn into a 402 that says why, rather than letting
    // the throw become a 500.
    let estimated: Money;
    try {
      if ("amount" in price) {
        assertChargeable(price.amount, pools.rate.currency);
        estimated = price.amount;
      } else {
        estimated = estimateWorstCaseCharge(
          price.modelId,
          pools.rate,
          price.workload
        );
      }
    } catch (error) {
      if (error instanceof UnknownModelError) {
        return {
          allowed: false,
          code: "unknown_model",
          reason: error.message,
          billingMode: "subscription",
          usage: {
            used: pools.used.amount,
            limit: pools.allowance.amount,
            percentage: 0,
          },
          usingTrialCredits: false,
          graceActive: false,
        };
      }
      throw error;
    }
    const percentage =
      pools.allowance.amount > 0
        ? Math.min(
            100,
            Math.round((pools.used.amount / pools.allowance.amount) * 100)
          )
        : 0;

    const base = {
      billingMode: "subscription" as const,
      usage: {
        used: pools.used.amount,
        limit: pools.allowance.amount,
        percentage,
      },
      estimated,
      creditBalance: pools.topupBalance,
      remaining,
      graceActive: false,
    };

    // Plan + top-up first; trial is fallback only. The pools, the
    // ceiling and the outstanding reservations are all in the
    // deployment's own currency.
    const nonTrial = subtract(
      add(pools.planRemaining, pools.topupBalance),
      reserved
    );
    if (compare(nonTrial, estimated) >= 0) {
      return { allowed: true, usingTrialCredits: false, ...base };
    }
    // Reservations count against the trial pool once the non-trial
    // pool (minus reservations) can no longer cover them.
    const overflow = subtract(
      reserved,
      add(pools.planRemaining, pools.topupBalance)
    );
    const trialAvailable = isNegative(overflow)
      ? pools.trialRemaining
      : subtract(pools.trialRemaining, overflow);
    if (trialActive && compare(trialAvailable, estimated) >= 0) {
      return { allowed: true, usingTrialCredits: true, ...base };
    }
    return remaining.amount > 0
      ? {
          allowed: false,
          code: "insufficient_credits",
          // Both amounts name their own currency.
          reason: `Insufficient credits for this request (need ~${formatMoney(estimated, "en-US")}, have ${formatMoney(remaining, "en-US")}). Top up to continue.`,
          usingTrialCredits: false,
          ...base,
        }
      : {
          allowed: false,
          code: "allowance_depleted",
          reason:
            "Monthly credit allowance depleted. Top up or upgrade your plan to continue.",
          usingTrialCredits: false,
          ...base,
        };
  }
}
