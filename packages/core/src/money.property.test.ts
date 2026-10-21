import fc from "fast-check";
import { describe, expect, it } from "vitest";

import {
  MoneyError,
  add,
  compare,
  currency,
  fromMinor,
  fromStripeMinor,
  minorExponent,
  money,
  multiply,
  subtract,
  toMinor,
  toStripeMinor,
  type Money,
} from "./money";

const MAX = Number.MAX_SAFE_INTEGER;

/**
 * Two decimals, none, three, and the three Stripe takes in hundredths
 * although none are in use.
 */
const codes = fc.constantFrom("USD", "EUR", "JPY", "MNT", "ISK", "UGX", "KWD");

/** ±2^50 micros: the sum of three of them is still a safe integer. */
const BOUND = 2 ** 50;
const amounts = fc.integer({ min: -BOUND, max: BOUND });

const moneyIn = (code: string) => amounts.map((amount) => money(amount, code));

/** Three amounts in one currency. */
const sameCurrency = codes.chain((code) =>
  fc.tuple(moneyIn(code), moneyIn(code), moneyIn(code))
);

/** Two amounts in two different currencies. */
const mixedCurrencies = fc
  .uniqueArray(codes, { minLength: 2, maxLength: 2 })
  .chain(([a, b]) => fc.tuple(moneyIn(a!), moneyIn(b!)));

/** Micros in one minor unit of the currency. */
const scaleOf = (m: Money) => 1_000_000 / 10 ** minorExponent(m.currency);

function moneyErrorCode(run: () => unknown): string | undefined {
  try {
    run();
  } catch (error) {
    if (error instanceof MoneyError) return error.code;
    throw error;
  }
  return undefined;
}

describe("arithmetic within one currency", () => {
  it("add is commutative", () => {
    fc.assert(
      fc.property(sameCurrency, ([a, b]) => {
        expect(add(a, b)).toEqual(add(b, a));
      })
    );
  });

  it("add is associative", () => {
    fc.assert(
      fc.property(sameCurrency, ([a, b, c]) => {
        expect(add(add(a, b), c)).toEqual(add(a, add(b, c)));
      })
    );
  });

  it("subtract undoes add", () => {
    fc.assert(
      fc.property(sameCurrency, ([a, b]) => {
        expect(subtract(add(a, b), b)).toEqual(a);
      })
    );
  });

  it("compare is antisymmetric and agrees with the amounts", () => {
    fc.assert(
      fc.property(sameCurrency, ([a, b]) => {
        expect(compare(a, b)).toBe(-compare(b, a) || 0);
        expect(compare(a, b)).toBe(Math.sign(a.amount - b.amount));
      })
    );
  });
});

describe("currencies never mix", () => {
  it("add, subtract and compare refuse two currencies", () => {
    fc.assert(
      fc.property(mixedCurrencies, ([a, b]) => {
        expect(moneyErrorCode(() => add(a, b))).toBe("currency_mismatch");
        expect(moneyErrorCode(() => subtract(a, b))).toBe("currency_mismatch");
        expect(moneyErrorCode(() => compare(a, b))).toBe("currency_mismatch");
      })
    );
  });
});

describe("overflow", () => {
  // 2^52 + 2^52 is the first sum past the safe range.
  const large = fc.integer({ min: 2 ** 52, max: MAX });

  it("a sum past the safe range throws instead of losing precision", () => {
    fc.assert(
      fc.property(codes, large, large, (code, x, y) => {
        expect(moneyErrorCode(() => add(money(x, code), money(y, code)))).toBe(
          "out_of_range"
        );
        expect(
          moneyErrorCode(() => add(money(-x, code), money(-y, code)))
        ).toBe("out_of_range");
        expect(
          moneyErrorCode(() => subtract(money(x, code), money(-y, code)))
        ).toBe("out_of_range");
      })
    );
  });
});

describe("minor units", () => {
  /** Minor-unit counts whose micros are still a safe integer. */
  const minorCounts = codes.chain((code) => {
    const scale = 1_000_000 / 10 ** minorExponent(currency(code));
    const limit = Math.floor(MAX / scale);
    return fc.tuple(fc.constant(code), fc.integer({ min: -limit, max: limit }));
  });

  it("fromMinor and toMinor round-trip exactly", () => {
    fc.assert(
      fc.property(minorCounts, ([code, n]) => {
        expect(toMinor(fromMinor(n, code))).toBe(n);
      })
    );
  });

  it("toMinor never undercharges, and rounds up by less than one minor unit", () => {
    fc.assert(
      fc.property(codes.chain(moneyIn), (m) => {
        const scale = scaleOf(m);
        const charged = toMinor(m) * scale;
        expect(charged).toBeGreaterThanOrEqual(m.amount);
        expect(charged).toBeLessThan(m.amount + scale);
      })
    );
  });

  it("an amount Stripe is sent comes back as at least that amount", () => {
    fc.assert(
      fc.property(codes.chain(moneyIn), (m) => {
        const back = fromStripeMinor(toStripeMinor(m), m.currency);
        expect(back.currency).toBe(m.currency);
        expect(back.amount).toBeGreaterThanOrEqual(m.amount);
      })
    );
  });

  it("whole units round-trip through Stripe exactly", () => {
    // ±2^30 major units keeps the micros of every currency safe.
    const units = fc.integer({ min: -(2 ** 30), max: 2 ** 30 });
    fc.assert(
      fc.property(codes, units, (code, n) => {
        const m = money(n * 1_000_000, code);
        expect(fromStripeMinor(toStripeMinor(m), code)).toEqual(m);
      })
    );
  });
});

describe("multiply", () => {
  const factors = fc.double({ min: 1, max: 1000, noNaN: true });

  it("a factor of at least one never shrinks a non-negative amount", () => {
    fc.assert(
      fc.property(
        codes,
        fc.integer({ min: 0, max: Math.floor(MAX / 1000) }),
        factors,
        (code, amount, factor) => {
          const m = money(amount, code);
          const scaled = multiply(m, factor);
          expect(scaled.currency).toBe(m.currency);
          expect(scaled.amount).toBeGreaterThanOrEqual(m.amount);
          expect(scaled.amount).toBeGreaterThanOrEqual(amount * factor);
        }
      )
    );
  });
});
