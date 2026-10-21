/**
 * The hold ceiling, as properties: within the workload a run declares,
 * no run is charged more than the hold admission took for it, and the
 * rounding on the way there stays inside its stated bound.
 */

import fc from "fast-check";
import { beforeAll, describe, expect, it } from "vitest";

import { currency } from "@intelligo-dev/core/money";

import {
  DEFAULT_MODELS,
  chargeFor,
  clearModels,
  estimateWorstCaseCharge,
  modelKind,
  registerModels,
  type BillingRate,
  type ModelPricing,
} from "./pricing";

// Nothing self-registers: this suite is its own composition root.
beforeAll(() => {
  clearModels();
  registerModels(DEFAULT_MODELS);
});

const chatModels = DEFAULT_MODELS.filter((p) => modelKind(p) !== "embedding");
const embeddingModels = DEFAULT_MODELS.filter(
  (p) => modelKind(p) === "embedding"
);

const chatModel = fc.constantFrom(...chatModels);
const anyModel = fc.constantFrom(...DEFAULT_MODELS);

const usdRate = fc
  .integer({ min: 10_000, max: 100_000 })
  .map((marginBp): BillingRate => ({
    currency: currency("USD"),
    usdRateMicros: 1_000_000,
    marginBp,
  }));

const foreignRate = fc
  .tuple(
    fc.constantFrom("MNT", "JPY", "EUR"),
    fc.integer({ min: 1, max: 5_000_000_000 }),
    fc.integer({ min: 10_000, max: 100_000 })
  )
  .map(([code, usdRateMicros, marginBp]): BillingRate => ({
    currency: currency(code),
    usdRateMicros,
    marginBp,
  }));

const rate = fc.oneof(usdRate, foreignRate);

/** A prompt's size, up to a long context. */
const promptTokens = fc.integer({ min: 0, max: 400_000 });
const steps = fc.integer({ min: 1, max: 20 });

/** Token counts a whole run can reach: 20 steps of a long prompt. */
const runTokens = fc.integer({ min: 0, max: 8_000_000 });

const charged = (
  model: ModelPricing,
  input: number,
  output: number,
  r: BillingRate
) => chargeFor(model.id, input, output, r).charged.amount;

describe("chargeFor", () => {
  it("never charges less for more input or more output", () => {
    fc.assert(
      fc.property(
        chatModel,
        rate,
        runTokens,
        runTokens,
        runTokens,
        runTokens,
        (model, r, input, output, moreInput, moreOutput) => {
          const base = charged(model, input, output, r);
          expect(
            charged(model, input + moreInput, output, r)
          ).toBeGreaterThanOrEqual(base);
          expect(
            charged(model, input, output + moreOutput, r)
          ).toBeGreaterThanOrEqual(base);
        }
      )
    );
  });

  it("never charges less for usage split across calls than for the same usage in one", () => {
    fc.assert(
      fc.property(
        anyModel,
        rate,
        runTokens,
        runTokens,
        runTokens,
        runTokens,
        (model, r, inA, outA, inB, outB) => {
          expect(charged(model, inA + inB, outA + outB, r)).toBeLessThanOrEqual(
            charged(model, inA, outA, r) + charged(model, inB, outB, r)
          );
        }
      )
    );
  });

  it("never charges under the exact price, and less than (margin + 1) × rate + 1 micros over it", () => {
    // Exact arithmetic in BigInt: the token price × margin × rate, as a
    // fraction over PRICE_SCALE × bp-per-multiple × micros-per-unit.
    const DENOMINATOR = 1_000_000n * 10_000n * 1_000_000n;
    fc.assert(
      fc.property(
        anyModel,
        rate,
        runTokens,
        runTokens,
        (model, r, input, output) => {
          const scaled = (price: number) =>
            BigInt(Math.round(price * 1_000_000));
          const numerator =
            (BigInt(input) * scaled(model.costPerMInputTokens) +
              BigInt(output) * scaled(model.costPerMOutputTokens)) *
            BigInt(r.marginBp) *
            BigInt(r.usdRateMicros);
          const over =
            BigInt(charged(model, input, output, r)) * DENOMINATOR - numerator;
          // ((marginBp / 1e4 + 1) × (usdRateMicros / 1e6) + 1) × DENOMINATOR
          const bound =
            BigInt(r.marginBp + 10_000) * BigInt(r.usdRateMicros) * 1_000_000n +
            DENOMINATOR;
          expect(over >= 0n).toBe(true);
          expect(over < bound).toBe(true);
        }
      )
    );
  });
});

describe("estimateWorstCaseCharge", () => {
  /** A run inside its declared workload: per step, input and output. */
  const run = fc
    .tuple(chatModel, rate, promptTokens, steps)
    .chain(([model, r, prompt, stepCount]) =>
      fc.tuple(
        fc.constant(model),
        fc.constant(r),
        fc.constant(prompt),
        fc.array(
          fc.tuple(
            fc.integer({ min: 0, max: prompt }),
            fc.integer({ min: 0, max: model.maxOutputTokens })
          ),
          { minLength: 1, maxLength: stepCount }
        ),
        fc.constant(stepCount)
      )
    );

  it("covers every run inside the declared workload", () => {
    fc.assert(
      fc.property(run, ([model, r, prompt, calls, stepCount]) => {
        const input = calls.reduce((sum, [i]) => sum + i, 0);
        const output = calls.reduce((sum, [, o]) => sum + o, 0);
        const hold = estimateWorstCaseCharge(model.id, r, {
          inputTokens: prompt,
          steps: stepCount,
        });
        expect(charged(model, input, output, r)).toBeLessThanOrEqual(
          hold.amount
        );
      })
    );
  });

  it("holds no less for more steps or a longer prompt", () => {
    fc.assert(
      fc.property(
        anyModel,
        rate,
        promptTokens,
        steps,
        promptTokens,
        steps,
        (model, r, prompt, stepCount, morePrompt, moreSteps) => {
          const hold = (inputTokens: number, n: number) =>
            estimateWorstCaseCharge(model.id, r, { inputTokens, steps: n })
              .amount;
          const base = hold(prompt, stepCount);
          expect(hold(prompt + morePrompt, stepCount)).toBeGreaterThanOrEqual(
            base
          );
          expect(hold(prompt, stepCount + moreSteps)).toBeGreaterThanOrEqual(
            base
          );
        }
      )
    );
  });

  it("holds only the input of an embedding model", () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...embeddingModels),
        rate,
        promptTokens,
        steps,
        (model, r, prompt, stepCount) => {
          expect(
            estimateWorstCaseCharge(model.id, r, {
              inputTokens: prompt,
              steps: stepCount,
            }).amount
          ).toBe(charged(model, prompt * stepCount, 0, r));
        }
      )
    );
  });
});
