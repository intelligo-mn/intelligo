/**
 * How settlement splits one charge across the pools, as arithmetic on
 * values already read. The rows, their locks and the clamping of what
 * they hold to zero stay with the caller in `quota.ts`.
 */

import {
  isNegative,
  subtract,
  zero,
  type Money,
} from "@intelligo-dev/core/money";

/**
 * The lesser of two amounts in one currency, `a` when they are equal.
 * Read off the sign of the difference rather than a comparison, so
 * there is no `<` against `<=` choice that equal amounts cannot tell
 * apart.
 */
function lesser(a: Money, b: Money): Money {
  return isNegative(subtract(b, a)) ? b : a;
}

/**
 * The allowance takes the lesser of the charge and what is left of it;
 * an allowance already overspent takes nothing. Taking the remainder by
 * subtraction keeps `charged === plan + remainder` exact.
 */
export function allowanceShare(
  charged: Money,
  allowance: Money,
  allowanceUsed: Money
): { plan: Money; remainder: Money } {
  const allowanceLeft = subtract(allowance, allowanceUsed);
  const plan = isNegative(allowanceLeft)
    ? zero(allowance.currency)
    : lesser(charged, allowanceLeft);
  return { plan, remainder: subtract(charged, plan) };
}

/**
 * Splits what the allowance did not fund in admission's order: the
 * top-up up to `topupHeld`, then the trial up to `trialHeld` (null when
 * no trial is active). A shortfall neither holds is left on the top-up,
 * so `remainder === topup + trial` exactly.
 */
export function remainderShares(
  remainder: Money,
  topupHeld: Money,
  trialHeld: Money | null
): { topup: Money; trial: Money } {
  const fromTopup = lesser(remainder, topupHeld);
  const trial = trialHeld
    ? lesser(subtract(remainder, fromTopup), trialHeld)
    : zero(remainder.currency);
  return { topup: subtract(remainder, trial), trial };
}
