import fc from "fast-check";
import { describe, expect, it } from "vitest";

import {
  currency,
  formatMoney,
  money,
  type Micros,
  type Money,
} from "@intelligo-dev/core/money";

import { ChargeError } from "./charge-error";
import { assertChargeable, decideQuota, type Pools } from "./quota-decision";

const CODE = "MNT";

/**
 * Up to a million units of the currency, in micros. Empty pools and
 * small amounts are drawn often, so equal amounts and exhausted pools
 * come up in a run rather than once in 10^12.
 */
const MAX = 1e12;
const micros = fc.oneof(
  fc.constant(0),
  fc.integer({ min: 0, max: 1_000 }),
  fc.integer({ min: 0, max: MAX })
);
const positive = fc.oneof(
  fc.integer({ min: 1, max: 1_000 }),
  fc.integer({ min: 1, max: MAX })
);

const mnt = (amount: number): Money => money(amount, CODE);

/**
 * Pools as `readPools` hands them over: the plan's remainder is what
 * the allowance has left, and `used` may run past the allowance. The
 * trial pool is generated whether or not the trial is active, so the
 * rule is held to `trialActive` rather than to an empty pool.
 */
const pools: fc.Arbitrary<Pools> = fc
  .record({
    planSlug: fc.constantFrom("free", "pro"),
    trialActive: fc.boolean(),
    allowance: micros,
    used: micros,
    topupBalance: micros,
    trialRemaining: micros,
    usdRateMicros: positive,
    marginBp: fc.integer({ min: 0, max: 100_000 }),
  })
  .map((p) => ({
    planSlug: p.planSlug,
    trialActive: p.trialActive,
    allowance: mnt(p.allowance),
    used: mnt(p.used),
    planRemaining: mnt(Math.max(0, p.allowance - p.used)),
    topupBalance: mnt(p.topupBalance),
    trialRemaining: mnt(p.trialRemaining),
    rate: {
      currency: currency(CODE),
      usdRateMicros: p.usdRateMicros,
      marginBp: p.marginBp,
    },
  }));

/** What other requests hold, up to more than every pool together. */
const reserved = fc.oneof(
  fc.constant(0),
  fc.integer({ min: 0, max: 1_000 }),
  fc.integer({ min: 0, max: 3 * MAX })
);

const price = positive.map((amount) => ({ amount: mnt(amount) }));

const nonTrial = (p: Pools) => p.planRemaining.amount + p.topupBalance.amount;

/** The trial left once reservations have used up plan and top-up. */
const trialAvailable = (p: Pools, held: number) =>
  p.trialRemaining.amount - Math.max(0, held - nonTrial(p));

describe("admission's decision", () => {
  it("admits without the trial only what plan and top-up cover after reservations", () => {
    fc.assert(
      fc.property(pools, price, reserved, (p, { amount }, held) => {
        const decision = decideQuota(p, { amount }, held);
        if (decision.allowed && !decision.usingTrialCredits) {
          expect(nonTrial(p) - held).toBeGreaterThanOrEqual(amount.amount);
        }
      })
    );
  });

  it("admits on the trial only an active trial that covers the price", () => {
    fc.assert(
      fc.property(pools, price, reserved, (p, { amount }, held) => {
        const decision = decideQuota(p, { amount }, held);
        if (decision.usingTrialCredits) {
          expect(decision.allowed).toBe(true);
          expect(p.trialActive).toBe(true);
          expect(trialAvailable(p, held)).toBeGreaterThanOrEqual(amount.amount);
        }
      })
    );
  });

  it("admits, without the trial, whatever plan and top-up cover", () => {
    fc.assert(
      fc.property(pools, price, reserved, (p, { amount }, held) => {
        fc.pre(nonTrial(p) - held >= amount.amount);
        const decision = decideQuota(p, { amount }, held);
        expect(decision.allowed).toBe(true);
        expect(decision.usingTrialCredits).toBe(false);
      })
    );
  });

  it("admits on an active trial whatever it covers once plan and top-up cannot", () => {
    fc.assert(
      fc.property(pools, price, reserved, (p, { amount }, held) => {
        fc.pre(nonTrial(p) - held < amount.amount);
        fc.pre(p.trialActive && trialAvailable(p, held) >= amount.amount);
        const decision = decideQuota(p, { amount }, held);
        expect(decision.allowed).toBe(true);
        expect(decision.usingTrialCredits).toBe(true);
      })
    );
  });

  it("admits a price equal to what plan and top-up leave, without the trial", () => {
    fc.assert(
      fc.property(pools, reserved, (p, held) => {
        fc.pre(nonTrial(p) - held > 0);
        const decision = decideQuota(
          p,
          { amount: mnt(nonTrial(p) - held) },
          held
        );
        expect(decision.allowed).toBe(true);
        expect(decision.usingTrialCredits).toBe(false);
      })
    );
  });

  it("admits on an active trial a price equal to what the trial leaves", () => {
    fc.assert(
      fc.property(pools, reserved, (p, held) => {
        const left = trialAvailable(p, held);
        fc.pre(left > 0 && nonTrial(p) - held < left);
        const decision = decideQuota(
          { ...p, trialActive: true },
          { amount: mnt(left) },
          held
        );
        expect(decision.allowed).toBe(true);
        expect(decision.usingTrialCredits).toBe(true);
      })
    );
  });

  it("never refuses for more in a pool, and never admits for more reserved", () => {
    const pool = fc.constantFrom(
      "planRemaining",
      "topupBalance",
      "trialRemaining"
    );
    fc.assert(
      fc.property(
        pools,
        price,
        reserved,
        pool,
        positive,
        (p, { amount }, held, key, extra) => {
          const before = decideQuota(p, { amount }, held).allowed;
          const richer = { ...p, [key]: mnt(p[key].amount + extra) };
          const activated = { ...p, trialActive: true };
          if (before) {
            expect(decideQuota(richer, { amount }, held).allowed).toBe(true);
            expect(decideQuota(activated, { amount }, held).allowed).toBe(true);
          } else {
            expect(decideQuota(p, { amount }, held + extra).allowed).toBe(
              false
            );
          }
        }
      )
    );
  });

  it("refuses every price on empty pools as allowance_depleted, trial or not", () => {
    const empty = pools.map((p) => ({
      ...p,
      used: p.allowance,
      planRemaining: mnt(0),
      topupBalance: mnt(0),
      trialRemaining: mnt(0),
    }));
    fc.assert(
      fc.property(empty, price, reserved, (p, { amount }, held) => {
        const decision = decideQuota(p, { amount }, held);
        expect(decision.allowed).toBe(false);
        expect(decision.code).toBe("allowance_depleted");
        expect(decision.usingTrialCredits).toBe(false);
      })
    );
  });

  it("refuses as insufficient_credits while any pool holds anything, else allowance_depleted", () => {
    fc.assert(
      fc.property(pools, price, reserved, (p, { amount }, held) => {
        const decision = decideQuota(p, { amount }, held);
        if (decision.allowed) {
          expect(decision.code).toBeUndefined();
          return;
        }
        const remaining = mnt(nonTrial(p) + p.trialRemaining.amount);
        expect(decision.code).toBe(
          remaining.amount > 0 ? "insufficient_credits" : "allowance_depleted"
        );
        expect(decision.usingTrialCredits).toBe(false);
        // The reason names what was needed and what there is, each in
        // its own currency.
        if (decision.code === "insufficient_credits") {
          expect(decision.reason).toContain(formatMoney(amount, "en-US"));
          expect(decision.reason).toContain(formatMoney(remaining, "en-US"));
        } else {
          expect(decision.reason).toMatch(/allowance depleted/);
        }
      })
    );
  });

  it("reports the price as the estimate and the remaining total across every pool", () => {
    fc.assert(
      fc.property(pools, price, reserved, (p, { amount }, held) => {
        const decision = decideQuota(p, { amount }, held);
        expect(decision.estimated).toEqual(amount);
        expect(decision.remaining).toEqual(
          mnt(nonTrial(p) + p.trialRemaining.amount)
        );
        expect(decision.creditBalance).toEqual(p.topupBalance);
        expect(decision.billingMode).toBe("subscription");
        expect(decision.graceActive).toBe(false);
      })
    );
  });

  it("reports the allowance used as a rounded percentage, capped at 100", () => {
    fc.assert(
      fc.property(pools, price, reserved, (p, { amount }, held) => {
        const { usage } = decideQuota(p, { amount }, held);
        expect(usage.used).toBe(p.used.amount);
        expect(usage.limit).toBe(p.allowance.amount);
        if (p.allowance.amount === 0) {
          expect(usage.percentage).toBe(0);
        } else {
          const exact = Math.min(
            100,
            (100 * p.used.amount) / p.allowance.amount
          );
          expect(Number.isInteger(usage.percentage)).toBe(true);
          expect(Math.abs(usage.percentage - exact)).toBeLessThanOrEqual(0.5);
        }
      })
    );
  });

  it("refuses a model no price is registered for, and holds nothing for it", () => {
    const unpriced = fc.stringMatching(/^unpriced-[a-z]{1,8}$/);
    fc.assert(
      fc.property(pools, unpriced, reserved, (p, modelId, held) => {
        const decision = decideQuota(p, { modelId }, held);
        expect(decision).toEqual({
          allowed: false,
          code: "unknown_model",
          reason: expect.stringContaining(modelId),
          billingMode: "subscription",
          usage: {
            used: p.used.amount,
            limit: p.allowance.amount,
            percentage: 0,
          },
          usingTrialCredits: false,
          graceActive: false,
        });
      })
    );
  });

  it("never admits, one reservation after another, more than the pools hold", () => {
    fc.assert(
      fc.property(
        pools,
        fc.array(positive, { maxLength: 20 }),
        (p, estimates) => {
          let held = 0;
          for (const estimate of estimates) {
            if (decideQuota(p, { amount: mnt(estimate) }, held).allowed) {
              held += estimate;
            }
          }
          const ceiling =
            nonTrial(p) + (p.trialActive ? p.trialRemaining.amount : 0);
          expect(held).toBeLessThanOrEqual(ceiling);
        }
      )
    );
  });
});

describe("a fixed amount admission can hold", () => {
  function chargeError(run: () => unknown): ChargeError | undefined {
    try {
      run();
    } catch (error) {
      if (error instanceof ChargeError) return error;
      throw error;
    }
    return undefined;
  }

  it("is a positive whole number of micros", () => {
    const invalid = fc.oneof(
      fc.integer({ min: -MAX, max: 0 }),
      fc
        .double({ min: -MAX, max: MAX, noNaN: true })
        .filter((n) => !Number.isInteger(n)),
      fc.constantFrom(Number.NaN, Infinity, -Infinity, 2 ** 53)
    );
    fc.assert(
      fc.property(pools, invalid, reserved, (p, amount, held) => {
        const price = {
          amount: { amount: amount as Micros, currency: currency(CODE) },
        };
        const error = chargeError(() => decideQuota(p, price, held));
        expect(error?.code).toBe("invalid_amount");
        expect(error?.message).toContain(String(amount));
      })
    );
  });

  it("is in the deployment's currency", () => {
    fc.assert(
      fc.property(
        pools,
        positive,
        fc.constantFrom("USD", "EUR", "JPY"),
        reserved,
        (p, amount, code, held) => {
          const price = { amount: money(amount, code) };
          const error = chargeError(() => decideQuota(p, price, held));
          expect(error?.code).toBe("currency_mismatch");
          expect(error?.message).toContain(CODE);
          expect(error?.message).toContain(code);
        }
      )
    );
  });

  it("passes the check whenever it is both", () => {
    fc.assert(
      fc.property(positive, (amount) => {
        expect(() => assertChargeable(mnt(amount), CODE)).not.toThrow();
      })
    );
  });
});
