/**
 * Step usage, as properties: whatever a provider reports, a step that
 * answered is never free and a step refused before answering costs
 * nothing.
 */

import fc from "fast-check";
import { describe, expect, it } from "vitest";

import {
  abortedUsage,
  inFlightTracker,
  sumStepUsage,
  sumUsage,
  type TokenUsage,
} from "./usage";
import { estimateTokenCount } from "./windowing";

type Chunk = { type: string; text?: string };

type Step = {
  chunks: Chunk[];
  /** What the provider reported when the step finished. */
  usage: TokenUsage | undefined;
};

const tokens = fc.integer({ min: 0, max: 200_000 });

const TEXT_TYPES = ["text-delta", "reasoning-delta"];

/**
 * Text and reasoning deltas, sometimes without their text, and other
 * chunks, sometimes carrying a `text` field that must not count.
 */
const chunk: fc.Arbitrary<Chunk> = fc.record(
  {
    type: fc.constantFrom(...TEXT_TYPES, "tool-call", "source", "raw"),
    text: fc.string({ maxLength: 40 }),
  },
  { requiredKeys: ["type"] }
);

/** A text delta that carries nothing. */
const emptyDelta: fc.Arbitrary<Chunk> = fc.record(
  { type: fc.constantFrom(...TEXT_TYPES), text: fc.constant("") },
  { requiredKeys: ["type"] }
);

const positive = fc.integer({ min: 1, max: 200_000 });

/** Usage a provider reported: one side or both, and above zero. */
const someUsage: fc.Arbitrary<TokenUsage> = fc.oneof(
  fc.record({ inputTokens: positive, outputTokens: tokens }),
  fc.record({ inputTokens: tokens, outputTokens: positive }),
  fc.record({ inputTokens: positive })
);

/** Reported usage, a report of zeros, or none at all. */
const reported: fc.Arbitrary<TokenUsage | undefined> = fc.oneof(
  someUsage,
  fc.constant({ inputTokens: 0, outputTokens: 0, totalTokens: 0 }),
  fc.constant(undefined)
);

const step: fc.Arbitrary<Step> = fc.record({
  chunks: fc.array(chunk, { maxLength: 8 }),
  usage: reported,
});

const steps = fc.array(step, { maxLength: 6 });
const promptTokens = fc.integer({ min: 0, max: 100_000 });

type Tracker = ReturnType<typeof inFlightTracker>;

function play(tracker: Tracker, s: Step): void {
  tracker.onStepStart();
  for (const c of s.chunks) tracker.onChunk({ chunk: c });
  tracker.onStepFinish({ usage: s.usage });
}

const reportedTotal = (s: Step) =>
  (s.usage?.inputTokens ?? 0) + (s.usage?.outputTokens ?? 0);

const streamedText = (chunks: readonly Chunk[]) =>
  chunks
    .filter((c) => TEXT_TYPES.includes(c.type))
    .map((c) => c.text ?? "")
    .join("");

const total = (u: TokenUsage) => u.totalTokens ?? 0;

describe("inFlightTracker", () => {
  it("never settles finished steps for less than they reported", () => {
    fc.assert(
      fc.property(promptTokens, steps, (prompt, run) => {
        const tracker = inFlightTracker(prompt);
        for (const s of run) play(tracker, s);
        const sum = run.reduce((acc, s) => acc + reportedTotal(s), 0);
        expect(total(tracker.spent())).toBeGreaterThanOrEqual(sum);
      })
    );
  });

  it("settles a step that reported usage at exactly what it reported", () => {
    fc.assert(
      fc.property(
        promptTokens,
        steps,
        fc.array(chunk, { maxLength: 8 }),
        someUsage,
        (prompt, before, chunks, usage) => {
          const tracker = inFlightTracker(prompt);
          for (const s of before) play(tracker, s);
          const spentBefore = total(tracker.spent());
          play(tracker, { chunks, usage });
          expect(total(tracker.spent())).toBe(
            spentBefore + (usage.inputTokens ?? 0) + (usage.outputTokens ?? 0)
          );
        }
      )
    );
  });

  it("charges a step in flight its input and the text and reasoning it streamed", () => {
    fc.assert(
      fc.property(
        promptTokens,
        fc.array(someUsage, { maxLength: 4 }),
        fc.array(chunk, { maxLength: 12 }),
        (prompt, before, chunks) => {
          const tracker = inFlightTracker(prompt);
          for (const usage of before) play(tracker, { chunks: [], usage });
          const spentBefore = total(tracker.spent());
          tracker.onStepStart();
          for (const c of chunks) tracker.onChunk({ chunk: c });
          const text = streamedText(chunks);
          // The step reads the previous step's prompt and output, or for
          // the first step the conversation.
          const previous = before[before.length - 1];
          const input = previous
            ? (previous.inputTokens ?? 0) + (previous.outputTokens ?? 0)
            : prompt;
          expect(total(tracker.spent())).toBe(
            spentBefore + (text ? input + estimateTokenCount(text) : 0)
          );
        }
      )
    );
  });

  it("charges a step that streamed text but reported nothing", () => {
    fc.assert(
      fc.property(
        promptTokens,
        steps,
        step.filter((s) => streamedText(s.chunks).length > 0),
        fc.constantFrom<TokenUsage | undefined>(undefined, {
          inputTokens: 0,
          outputTokens: 0,
        }),
        (prompt, before, answered, zero) => {
          const tracker = inFlightTracker(prompt);
          for (const s of before) play(tracker, s);
          const spentBefore = total(tracker.spent());
          const unreportedBefore = total(tracker.unreported());
          play(tracker, { ...answered, usage: zero });
          expect(total(tracker.unreported())).toBeGreaterThan(unreportedBefore);
          expect(total(tracker.spent())).toBeGreaterThan(spentBefore);
        }
      )
    );
  });

  it("charges nothing for a step refused before any output", () => {
    fc.assert(
      fc.property(
        promptTokens,
        steps,
        fc.array(chunk, { maxLength: 4 }),
        fc.array(emptyDelta, { maxLength: 4 }),
        fc.boolean(),
        (prompt, before, stray, empty, finishes) => {
          const tracker = inFlightTracker(prompt);
          for (const s of before) play(tracker, s);
          const spentBefore = tracker.spent();
          // A chunk outside any step belongs to none.
          for (const c of stray) tracker.onChunk({ chunk: c });
          expect(tracker.spent()).toEqual(spentBefore);
          tracker.onStepStart();
          for (const c of empty) tracker.onChunk({ chunk: c });
          // Refused: the step ends with no usage, or the stream errors
          // while it is still in flight.
          if (finishes) tracker.onStepFinish({ usage: undefined });
          expect(tracker.spent()).toEqual(spentBefore);
        }
      )
    );
  });

  it("never lowers what a step in flight has spent as it streams", () => {
    fc.assert(
      fc.property(
        promptTokens,
        steps,
        fc.array(chunk, { maxLength: 12 }),
        (prompt, before, chunks) => {
          const tracker = inFlightTracker(prompt);
          for (const s of before) play(tracker, s);
          tracker.onStepStart();
          let last = total(tracker.spent());
          for (const c of chunks) {
            tracker.onChunk({ chunk: c });
            const now = total(tracker.spent());
            expect(now).toBeGreaterThanOrEqual(last);
            last = now;
          }
        }
      )
    );
  });
});

describe("sumUsage", () => {
  const usage: fc.Arbitrary<TokenUsage> = fc.record(
    { inputTokens: tokens, outputTokens: tokens, totalTokens: tokens },
    { requiredKeys: [] }
  );

  it("is commutative and associative", () => {
    fc.assert(
      fc.property(usage, usage, usage, (a, b, c) => {
        expect(sumUsage(a, b)).toEqual(sumUsage(b, a));
        expect(sumUsage(sumUsage(a, b), c)).toEqual(
          sumUsage(a, sumUsage(b, c))
        );
      })
    );
  });

  it("reads a missing total as input plus output", () => {
    fc.assert(
      fc.property(usage, usage, (a, b) => {
        const { totalTokens: _a, ...withoutA } = a;
        const sum = sumUsage(withoutA, b);
        expect(sum.totalTokens).toBe(
          (a.inputTokens ?? 0) +
            (a.outputTokens ?? 0) +
            (b.totalTokens ?? (b.inputTokens ?? 0) + (b.outputTokens ?? 0))
        );
      })
    );
  });
});

describe("abortedUsage", () => {
  it("with no step in flight is the finished steps' sum", () => {
    const finished = fc.array(
      fc.record({ usage: reported }, { requiredKeys: [] })
    );
    fc.assert(
      fc.property(finished, (done) => {
        expect(abortedUsage(done, null)).toEqual(sumStepUsage(done));
      })
    );
  });
});
