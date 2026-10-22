/**
 * Properties of `trustedContinuation`: whatever the client sends back,
 * the message a continuation resumes is the stored one, changed only by
 * the answers a client may give.
 *
 * Both messages come from JSON (the stored row and the request body),
 * so the generators draw JSON values. The seed and the number of cases
 * come from `tests/setup/fast-check.ts` (`FC_SEED`, `FC_RUNS`).
 */

import fc from "fast-check";
import type { UIMessage } from "ai";
import { describe, expect, it } from "vitest";

import { trustedContinuation } from "./continuation";

type Part = Record<string, unknown>;

const STATES = [
  "input-streaming",
  "input-available",
  "approval-requested",
  "approval-responded",
  "output-available",
  "output-error",
];

/** The transitions a client's answer may make, from the stored state. */
const ANSWERS: Record<string, string[]> = {
  "approval-requested": ["approval-responded"],
  "input-available": ["output-available", "output-error"],
};

const callIds = fc.constantFrom("call-1", "call-2", "call-3");

const toolParts = fc.record(
  {
    type: fc.constantFrom("tool-search", "tool-delete", "dynamic-tool"),
    toolCallId: callIds,
    state: fc.constantFrom(...STATES),
    input: fc.jsonValue({ maxDepth: 2 }),
    approval: fc.oneof(
      fc.record(
        {
          id: fc.constantFrom("appr-1", "appr-2"),
          approved: fc.jsonValue({ maxDepth: 0 }),
          reason: fc.jsonValue({ maxDepth: 0 }),
        },
        { requiredKeys: [] }
      ),
      fc.jsonValue({ maxDepth: 1 })
    ),
    output: fc.jsonValue({ maxDepth: 2 }),
    errorText: fc.jsonValue({ maxDepth: 0 }),
  },
  { requiredKeys: ["type", "toolCallId", "state"] }
);

const otherParts = fc.oneof(
  fc.record({ type: fc.constant("text"), text: fc.string() }),
  fc.record({ type: fc.constant("reasoning"), text: fc.string() }),
  fc.record({
    type: fc.constant("data-note"),
    data: fc.jsonValue({ maxDepth: 1 }),
  })
);

const partLists = fc.array(fc.oneof(toolParts, otherParts), { maxLength: 5 });

const message = (role: fc.Arbitrary<string>, id: fc.Arbitrary<string>) =>
  fc
    .record({ id, role, parts: partLists })
    .map((m) => m as unknown as UIMessage);

const ids = fc.constantFrom("m-1", "m-2");
const roles = fc.constantFrom("assistant", "user", "system");

const isTool = (part: Part) => typeof part.toolCallId === "string";

const approvalOf = (part: Part): Part | undefined =>
  typeof part.approval === "object" && part.approval !== null
    ? (part.approval as Part)
    : undefined;

/**
 * The client's copy of a stored tool call: the same type, call id and
 * input, with a state, approval, output and error text the client may
 * or may not be allowed to send. The state leans to the stored one and
 * to the answers it allows, and the approval to the stored approval's
 * id and a boolean, so accepted answers are common.
 */
const answersTo = (stored: Part): fc.Arbitrary<Part> => {
  const storedState = stored.state as string;
  const storedApprovalId = approvalOf(stored)?.id;
  return fc
    .record(
      {
        state: fc.oneof(
          { weight: 1, arbitrary: fc.constant(storedState) },
          {
            weight: 3,
            arbitrary: fc.constantFrom(
              ...(ANSWERS[storedState] ?? [storedState])
            ),
          },
          { weight: 1, arbitrary: fc.constantFrom(...STATES) }
        ),
        approval: fc.oneof(
          {
            weight: 6,
            arbitrary: fc.record(
              {
                id: fc.oneof(
                  fc.constant(storedApprovalId),
                  fc.constantFrom("appr-1", "appr-2")
                ),
                approved: fc.oneof(
                  { weight: 3, arbitrary: fc.boolean() },
                  { weight: 1, arbitrary: fc.jsonValue({ maxDepth: 0 }) }
                ),
                reason: fc.oneof(fc.string(), fc.jsonValue({ maxDepth: 0 })),
              },
              { requiredKeys: ["id", "approved"] }
            ),
          },
          { weight: 1, arbitrary: fc.jsonValue({ maxDepth: 1 }) }
        ),
        output: fc.jsonValue({ maxDepth: 2 }),
        errorText: fc.oneof(fc.string(), fc.jsonValue({ maxDepth: 0 })),
      },
      { requiredKeys: ["state"] }
    )
    .map((answer) => ({
      type: stored.type,
      toolCallId: stored.toolCallId,
      input: stored.input,
      ...answer,
    }));
};

/**
 * A stored assistant message as the model writes one: each tool call
 * under its own id, most of them awaiting an answer, and an approval
 * that is mostly a well-formed one.
 */
const storedMessages = fc
  .array(
    fc.oneof(
      {
        weight: 3,
        arbitrary: fc.record({
          type: fc.constantFrom("tool-search", "tool-delete", "dynamic-tool"),
          state: fc.oneof(
            {
              weight: 3,
              arbitrary: fc.constantFrom(
                "approval-requested",
                "input-available"
              ),
            },
            { weight: 1, arbitrary: fc.constantFrom(...STATES) }
          ),
          input: fc.jsonValue({ maxDepth: 2 }),
          approval: fc.oneof(
            {
              weight: 4,
              arbitrary: fc.record({
                id: fc.constantFrom("appr-1", "appr-2"),
              }),
            },
            { weight: 1, arbitrary: fc.jsonValue({ maxDepth: 1 }) }
          ),
        }),
      },
      { weight: 1, arbitrary: otherParts }
    ),
    { maxLength: 3 }
  )
  .map(
    (parts) =>
      ({
        id: "m-1",
        role: "assistant",
        parts: parts.map((part, index) =>
          "state" in part ? { ...part, toolCallId: `call-${index}` } : part
        ),
      }) as unknown as UIMessage
  );

/**
 * A stored assistant message, and a client copy of it: each part kept,
 * answered (a tool call), or replaced by anything, plus a few extra
 * tool calls.
 */
const pairs = storedMessages.chain((stored) =>
  fc
    .tuple(
      fc.tuple(
        ...(stored.parts as unknown as Part[]).map((part) =>
          fc.oneof(
            { weight: 1, arbitrary: fc.constant(part) },
            {
              weight: 6,
              arbitrary: isTool(part) ? answersTo(part) : otherParts,
            },
            { weight: 1, arbitrary: fc.oneof(toolParts, otherParts) }
          )
        )
      ),
      fc.oneof(
        { weight: 5, arbitrary: fc.constant([]) },
        { weight: 1, arbitrary: fc.array(toolParts, { maxLength: 2 }) }
      )
    )
    .map(([parts, added]) => ({
      stored,
      sent: {
        ...stored,
        parts: [...parts, ...added] as unknown as UIMessage["parts"],
      },
    }))
);

/** A stored message with one tool call, and a client copy answering it with `answer`. */
const answering = (stored: Part, answer: Part) => ({
  stored: {
    id: "m-1",
    role: "assistant",
    parts: [{ type: "text", text: "checking" }, stored],
  } as unknown as UIMessage,
  sent: {
    id: "m-1",
    role: "assistant",
    parts: [
      { type: "text", text: "changed" },
      { ...stored, ...answer },
    ],
  } as unknown as UIMessage,
});

const awaitingApproval = {
  type: "tool-delete",
  toolCallId: "call-0",
  state: "approval-requested",
  input: { path: "/a" },
  approval: { id: "appr-1" },
};

const awaitingOutput = {
  type: "tool-search",
  toolCallId: "call-0",
  state: "input-available",
  input: { q: "x" },
};

/**
 * Pairs C2 always tries before the generated ones: every answer the
 * rules allow, and approvals with another id or a non-boolean
 * `approved`, which must be refused.
 */
const ANSWERED = [
  answering(awaitingApproval, {
    state: "approval-responded",
    approval: { id: "appr-1", approved: false, reason: "no" },
  }),
  answering(awaitingOutput, { state: "output-available", output: [1] }),
  answering(awaitingOutput, { state: "output-error", errorText: "failed" }),
  answering(awaitingApproval, {
    state: "approval-responded",
    approval: { id: "appr-2", approved: true },
  }),
  answering(awaitingApproval, {
    state: "approval-responded",
    approval: { id: "appr-1", approved: "true" },
  }),
];

/** The client's copy of a call: the last tool part under its id, as the continuation reads it. */
const sentCall = (sent: UIMessage, toolCallId: unknown): Part | undefined => {
  const calls = (sent.parts as unknown as Part[]).filter(
    (part) => isTool(part) && part.toolCallId === toolCallId
  );
  return calls[calls.length - 1];
};

/** Every field but the ones an answer may set. */
const withoutAnswer = ({
  state: _state,
  approval: _approval,
  output: _output,
  errorText: _errorText,
  ...rest
}: Part) => rest;

describe("trustedContinuation", () => {
  it("C1: never throws", () => {
    fc.assert(
      fc.property(
        fc.option(message(roles, ids), { nil: undefined }),
        message(roles, ids),
        (stored, sent) => {
          trustedContinuation(stored, sent);
        }
      )
    );
    fc.assert(
      fc.property(pairs, ({ stored, sent }) => {
        trustedContinuation(stored, sent);
      })
    );
  });

  it("C2: a resumed message is the stored one, changed only by answers", () => {
    const answered = new Set<string>();
    fc.assert(
      fc.property(pairs, ({ stored, sent }) => {
        const resumed = trustedContinuation(stored, sent);
        if (!resumed) return;
        expect(resumed.id).toBe(stored.id);
        expect(resumed.role).toBe(stored.role);
        expect(resumed.parts).toHaveLength(stored.parts.length);
        const before = stored.parts as unknown as Part[];
        const after = resumed.parts as unknown as Part[];
        before.forEach((part, index) => {
          const next = after[index]!;
          if (!isTool(part) || next.state === part.state) {
            expect(next).toEqual(part);
            return;
          }
          expect(ANSWERS[part.state as string] ?? []).toContain(next.state);
          expect(withoutAnswer(next)).toEqual(withoutAnswer(part));
          const answer = sentCall(sent, part.toolCallId)!;
          expect(answer.type).toBe(part.type);
          expect(answer.state).toBe(next.state);
          answered.add(next.state as string);
          if (next.state === "approval-responded") {
            const proposed = approvalOf(part)!;
            const given = approvalOf(answer)!;
            expect(given.id).toBe(proposed.id);
            expect(typeof given.approved).toBe("boolean");
            expect(next.approval).toEqual({
              ...proposed,
              approved: given.approved,
              ...(typeof given.reason === "string"
                ? { reason: given.reason }
                : {}),
            });
            return;
          }
          expect(next.approval).toEqual(part.approval);
          if (next.state === "output-available") {
            expect(next.output).toEqual(answer.output);
          } else {
            expect(typeof answer.errorText).toBe("string");
            expect(next.errorText).toBe(answer.errorText);
          }
        });
      }),
      { examples: ANSWERED.map((pair) => [pair]) }
    );
    // The answers above were given, not only the unchanged copies.
    expect([...answered].sort()).toEqual([
      "approval-responded",
      "output-available",
      "output-error",
    ]);
  });

  it("C3: a tool call the stored message never made refuses the continuation", () => {
    fc.assert(
      fc.property(
        message(fc.constant("assistant"), fc.constant("m-1")),
        toolParts,
        (stored, extra) => {
          const known = new Set(
            (stored.parts as unknown as Part[])
              .filter(isTool)
              .map((part) => part.toolCallId)
          );
          fc.pre(!known.has(extra.toolCallId));
          const sent = {
            ...stored,
            parts: [...stored.parts, extra] as unknown as UIMessage["parts"],
          };
          expect(trustedContinuation(stored, sent)).toBeNull();
        }
      )
    );
  });

  it("C4: nothing stored, a stored message not the assistant's, or another id refuses it", () => {
    fc.assert(
      fc.property(message(roles, ids), message(roles, ids), (stored, sent) => {
        expect(trustedContinuation(undefined, sent)).toBeNull();
        if (stored.role !== "assistant" || stored.id !== sent.id) {
          expect(trustedContinuation(stored, sent)).toBeNull();
        }
      })
    );
  });
});
