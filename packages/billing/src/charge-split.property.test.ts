import fc from "fast-check";
import { describe, expect, it } from "vitest";

import { add, money, type Money } from "@intelligo-dev/core/money";

import { allowanceShare, remainderShares } from "./charge-split";

/** Up to a million units of a currency, in micros. */
const MAX = 1e12;
const micros = fc.integer({ min: 0, max: MAX });

/**
 * One settlement's inputs as the caller hands them over: the charge,
 * the allowance and what this period already took from it (which can
 * exceed the allowance), and what the top-up and trial rows hold after
 * clamping to zero. A null trial is a workspace with no active trial.
 */
const settlement = fc.record({
  code: fc.constantFrom("USD", "MNT"),
  charged: micros,
  allowance: micros,
  allowanceUsed: micros,
  topupHeld: micros,
  trialHeld: fc.option(micros, { nil: null }),
});

type Settlement = {
  code: string;
  charged: number;
  allowance: number;
  allowanceUsed: number;
  topupHeld: number;
  trialHeld: number | null;
};

/** allowanceShare followed by remainderShares, as settleCharge runs them. */
function split(s: Settlement): {
  plan: Money;
  remainder: Money;
  topup: Money;
  trial: Money;
} {
  const { plan, remainder } = allowanceShare(
    money(s.charged, s.code),
    money(s.allowance, s.code),
    money(s.allowanceUsed, s.code)
  );
  const { topup, trial } = remainderShares(
    remainder,
    money(s.topupHeld, s.code),
    s.trialHeld === null ? null : money(s.trialHeld, s.code)
  );
  return { plan, remainder, topup, trial };
}

const allowanceLeft = (s: Settlement) =>
  Math.max(0, s.allowance - s.allowanceUsed);

describe("the split of one charge across the pools", () => {
  it("conserves the charge: plan + topup + trial === charged", () => {
    fc.assert(
      fc.property(settlement, (s) => {
        const { plan, topup, trial } = split(s);
        expect(add(add(plan, topup), trial)).toEqual(money(s.charged, s.code));
      })
    );
  });

  it("gives every share in the charge's currency, and none below zero", () => {
    fc.assert(
      fc.property(settlement, (s) => {
        const { plan, remainder, topup, trial } = split(s);
        for (const share of [plan, remainder, topup, trial]) {
          expect(share.currency).toBe(s.code);
          expect(share.amount).toBeGreaterThanOrEqual(0);
        }
      })
    );
  });

  it("takes from the allowance no more than is left of it", () => {
    fc.assert(
      fc.property(settlement, (s) => {
        expect(split(s).plan.amount).toBeLessThanOrEqual(allowanceLeft(s));
      })
    );
  });

  it("takes from the allowance first, up to the charge", () => {
    fc.assert(
      fc.property(settlement, (s) => {
        expect(split(s).plan.amount).toBe(
          Math.min(s.charged, allowanceLeft(s))
        );
      })
    );
  });

  it("uses the trial only for what the top-up cannot hold", () => {
    fc.assert(
      fc.property(settlement, (s) => {
        const { remainder, trial } = split(s);
        if (trial.amount > 0) {
          expect(remainder.amount).toBeGreaterThan(s.topupHeld);
        }
      })
    );
  });

  it("never takes more from the trial than it holds", () => {
    fc.assert(
      fc.property(settlement, (s) => {
        expect(split(s).trial.amount).toBeLessThanOrEqual(s.trialHeld ?? 0);
      })
    );
  });

  it("takes nothing from a trial that is not there", () => {
    fc.assert(
      fc.property(settlement, (s) => {
        const { trial } = split({ ...s, trialHeld: null });
        expect(trial.amount).toBe(0);
      })
    );
  });

  it("leaves a shortfall on the top-up exactly when no pool can cover the charge", () => {
    fc.assert(
      fc.property(settlement, (s) => {
        const shortfall = Math.max(0, split(s).topup.amount - s.topupHeld);
        const covered = allowanceLeft(s) + s.topupHeld + (s.trialHeld ?? 0);
        expect(shortfall > 0).toBe(s.charged > covered);
        expect(shortfall).toBe(Math.max(0, s.charged - covered));
      })
    );
  });

  it("never takes more from the plan or the trial when the top-up holds more", () => {
    fc.assert(
      fc.property(settlement, micros, (s, extra) => {
        const before = split(s);
        const after = split({ ...s, topupHeld: s.topupHeld + extra });
        expect(after.plan.amount).toBeLessThanOrEqual(before.plan.amount);
        expect(after.trial.amount).toBeLessThanOrEqual(before.trial.amount);
      })
    );
  });
});
