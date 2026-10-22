/**
 * Properties of the request body parser, the attachment URL reader and
 * the bounded body reader, over inputs a client can send.
 *
 * The seed and the number of cases come from `tests/setup/fast-check.ts`
 * (`FC_SEED`, `FC_RUNS`); a failure prints the seed and path that replay it.
 */

import fc from "fast-check";
import { describe, expect, it } from "vitest";

import {
  ATTACHMENT_MAX_BYTES,
  attachmentIdFromUrl,
  parseChatBody,
  type ChatAttachmentPolicy,
} from "./body";
import { ELIDED_FILE_URL } from "./elide";
import { readJsonUpTo } from "./read-body";
import { extractText } from "./windowing";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const SDK_FIELDS = ["id", "messages", "trigger", "messageId", "replaces"];
const MAX_LENGTH = 40;
const MAX_BYTES = 64;

const inline: ChatAttachmentPolicy = {
  accept: ["image/png", "text/plain"],
  maxBytes: MAX_BYTES,
};
const stored: ChatAttachmentPolicy = { ...inline, mode: "stored" };

const policies = fc.constantFrom<ChatAttachmentPolicy | false>(
  false,
  inline,
  stored
);

/** The payload size of a data URL, as the parser counts it. */
function dataUrlBytes(url: string): number {
  const comma = url.indexOf(",");
  const payload = url.slice(comma + 1);
  return url.slice(0, comma).endsWith(";base64")
    ? Math.floor((payload.length * 3) / 4)
    : payload.length;
}

/** Mostly what the transport sends, sometimes anything else. */
const mostly = <T>(valid: fc.Arbitrary<T>, invalid: fc.Arbitrary<unknown>) =>
  fc.oneof({ arbitrary: valid, weight: 19 }, { arbitrary: invalid, weight: 1 });

const ids = mostly(
  fc.constantFrom("m-1", "m-2", "m-3"),
  fc.oneof(fc.string({ maxLength: 8 }), fc.anything())
);

const attachmentIds = fc.stringMatching(/^[A-Za-z0-9_-]{1,12}$/);

const urls = fc.oneof(
  fc.string({ maxLength: 120 }).map((s) => `data:image/png;base64,${s}`),
  fc.string({ maxLength: 120 }).map((s) => `data:text/plain,${s}`),
  fc.constant(ELIDED_FILE_URL),
  attachmentIds.map((id) => `/api/chat/attachments/${id}`),
  attachmentIds.map(
    (id) => `https://app.example.test/api/chat/attachments/${id}`
  ),
  fc.webUrl(),
  fc.string({ maxLength: 40 }),
  fc.anything()
);

const parts = mostly(
  fc.oneof(
    {
      arbitrary: fc.record({
        type: fc.constant("text"),
        text: fc.string({ maxLength: 30 }),
      }),
      weight: 4,
    },
    {
      arbitrary: fc.record(
        {
          type: fc.constant("file"),
          mediaType: fc.constantFrom("image/png", "text/plain", "video/mp4"),
          url: urls,
          providerReference: fc.anything(),
          providerMetadata: fc.anything(),
        },
        { requiredKeys: ["type", "url"] }
      ),
      weight: 3,
    },
    {
      arbitrary: fc.record({
        type: fc.constant("data-note"),
        data: fc.jsonValue({ maxDepth: 1 }),
      }),
      weight: 2,
    },
    // Parts only the model writes: refused in a user message.
    {
      arbitrary: fc.record({
        type: fc.constantFrom("reasoning", "tool-x", "source-url"),
        toolCallId: fc.string({ maxLength: 4 }),
        state: fc.string({ maxLength: 4 }),
      }),
      weight: 1,
    }
  ),
  fc.oneof(
    fc.record({ type: fc.constant("text"), text: fc.anything() }),
    fc.anything()
  )
);

const messages = fc.record(
  {
    id: ids,
    role: mostly(
      fc.constantFrom("user", "assistant"),
      fc.constantFrom("system", "tool", "", "USER")
    ),
    parts: mostly(fc.array(parts, { maxLength: 3 }), fc.anything()),
    metadata: fc.anything(),
  },
  { requiredKeys: ["id", "role", "parts"] }
);

/** Bodies near the transport's shape, a field now and then wrong. */
const nearValidBodies = fc
  .record(
    {
      id: mostly(
        fc.uuid(),
        fc.oneof(fc.string({ maxLength: 40 }), fc.anything())
      ),
      messages: mostly(
        fc.array(messages, { minLength: 1, maxLength: 3 }),
        fc.anything()
      ),
      trigger: mostly(
        fc.constantFrom("submit-message", "regenerate-message"),
        fc.anything()
      ),
      messageId: ids,
      replaces: mostly(
        fc.string({ minLength: 1, maxLength: 8 }),
        fc.anything()
      ),
      agentId: fc.anything(),
      continues: fc.boolean(),
    },
    { requiredKeys: ["id", "messages", "continues"] }
  )
  .map(({ continues, ...body }) => {
    // A continuation names the assistant message it resumes, as the SDK does.
    const last = Array.isArray(body.messages)
      ? (body.messages[body.messages.length - 1] as
          { id?: unknown } | undefined)
      : undefined;
    return continues && last ? { ...body, messageId: last.id } : body;
  });

const bodies = fc.oneof(nearValidBodies, fc.anything());

const parse = (json: unknown, attachments: ChatAttachmentPolicy | false) =>
  parseChatBody(json, { maxMessageLength: MAX_LENGTH, attachments });

type Part = Record<string, unknown> & { type: string };

describe("parseChatBody", () => {
  it("P1: never throws, whatever the client sends", () => {
    fc.assert(
      fc.property(bodies, policies, (json, attachments) => {
        parse(json, attachments);
      })
    );
  });

  it("P2: an accepted body has the shape the handler relies on", () => {
    fc.assert(
      fc.property(nearValidBodies, policies, (json, attachments) => {
        const parsed = parse(json, attachments);
        if (!parsed.ok) return;
        const body = parsed.body;
        expect(body.id).toMatch(UUID);
        expect(body.messages.length).toBeGreaterThan(0);
        for (const message of body.messages) {
          expect(["user", "assistant"]).toContain(message.role);
          for (const part of message.parts as unknown as Part[]) {
            if (part.type === "file") {
              expect(part).not.toHaveProperty("providerReference");
              expect(part).not.toHaveProperty("providerMetadata");
            }
          }
          if (message.role !== "user") continue;
          for (const part of message.parts as unknown as Part[]) {
            expect(
              part.type === "text" ||
                part.type === "file" ||
                part.type.startsWith("data-")
            ).toBe(true);
          }
          expect(extractText(message.parts).length).toBeLessThanOrEqual(
            MAX_LENGTH
          );
        }
        for (const key of SDK_FIELDS)
          expect(body.extra).not.toHaveProperty(key);
        const last = body.messages[body.messages.length - 1]!;
        if (last.role === "assistant") {
          expect(body.messageId).toBe(last.id);
          expect(body.trigger).not.toBe("regenerate-message");
        }
      })
    );
  });

  it("P3: inline, every file of the last message carries its bytes, within the limit", () => {
    fc.assert(
      fc.property(nearValidBodies, (json) => {
        const parsed = parse(json, inline);
        if (!parsed.ok) return;
        const last = parsed.body.messages[parsed.body.messages.length - 1]!;
        for (const part of last.parts as unknown as Part[]) {
          if (part.type !== "file") continue;
          const url = part.url as string;
          expect(url.startsWith("data:")).toBe(true);
          if (last.role === "user") {
            expect(dataUrlBytes(url)).toBeLessThanOrEqual(MAX_BYTES);
          }
        }
      })
    );
  });

  it("P4: stored, every file the user attached to the last message names an upload", () => {
    fc.assert(
      fc.property(nearValidBodies, (json) => {
        const parsed = parse(json, stored);
        if (!parsed.ok) return;
        const last = parsed.body.messages[parsed.body.messages.length - 1]!;
        if (last.role !== "user") return;
        for (const part of last.parts as unknown as Part[]) {
          if (part.type !== "file") continue;
          expect(
            attachmentIdFromUrl(stored, part.url as string)
          ).not.toBeNull();
        }
      })
    );
  });

  it("an inline policy with no limit holds files to the default", () => {
    const over = "A".repeat(Math.ceil((ATTACHMENT_MAX_BYTES * 4) / 3) + 4);
    const parsed = parse(
      {
        id: "0f1e2d3c-4b5a-4f6e-8d7c-9b8a7f6e5d4c",
        messages: [
          {
            id: "m",
            role: "user",
            parts: [
              {
                type: "file",
                mediaType: "image/png",
                url: `data:image/png;base64,${over}`,
              },
            ],
          },
        ],
      },
      { accept: ["image/png"] }
    );
    expect(parsed.ok).toBe(false);
  });
});

describe("attachmentIdFromUrl", () => {
  const custom = { urlFor: (id: string) => `/files/${id}/raw` };
  const attachmentIds = fc.stringMatching(/^[A-Za-z0-9_-]{1,64}$/);

  it("P5: answers null or one path segment, for any URL", () => {
    fc.assert(
      fc.property(
        fc.constantFrom({}, custom),
        fc.oneof(fc.string(), fc.webUrl({ withQueryParameters: true })),
        (policy, url) => {
          const id = attachmentIdFromUrl(policy, url);
          if (id === null) return;
          expect(id.length).toBeGreaterThan(0);
          expect(id).not.toContain("/");
        }
      )
    );
  });

  it("P5: reads back the id it put in a URL, relative or absolute", () => {
    fc.assert(
      fc.property(attachmentIds, fc.webUrl(), (id, base) => {
        const origin = new URL(base).origin;
        expect(attachmentIdFromUrl({}, `/api/chat/attachments/${id}`)).toBe(id);
        expect(
          attachmentIdFromUrl({}, `${origin}/api/chat/attachments/${id}`)
        ).toBe(id);
        expect(attachmentIdFromUrl(custom, custom.urlFor(id))).toBe(id);
        expect(
          attachmentIdFromUrl(custom, `${origin}${custom.urlFor(id)}`)
        ).toBe(id);
      })
    );
  });
});

describe("readJsonUpTo", () => {
  const LIMIT = 256;
  /** What a header value may hold: visible ASCII and spaces. */
  const headerValues = fc.stringMatching(
    /^[\x21-\x7e]([\x20-\x7e]*[\x21-\x7e])?$/
  );

  it("P6: never rejects, and never yields a body over the limit", async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.oneof(
          fc.uint8Array({ maxLength: LIMIT * 2 }),
          fc
            .jsonValue()
            .map((value) => new TextEncoder().encode(JSON.stringify(value)))
        ),
        fc.option(fc.oneof(fc.nat().map(String), headerValues)),
        async (bytes, contentLength) => {
          const request = new Request("http://localhost/api/chat", {
            method: "POST",
            body: bytes,
            ...(contentLength !== null
              ? { headers: { "content-length": contentLength } }
              : {}),
          });
          const read = await readJsonUpTo(request, LIMIT);
          if (typeof read === "object") {
            expect(bytes.byteLength).toBeLessThanOrEqual(LIMIT);
          } else {
            expect(["too_large", "invalid"]).toContain(read);
          }
        }
      )
    );
  });
});
