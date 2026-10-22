import { describe, expect, it } from "vitest";

import {
  ATTACHMENT_MAX_BYTES,
  attachmentIdFromUrl,
  fileAccepted,
  parseChatBody,
} from "./body";
import { ELIDED_FILE_URL } from "./elide";

const ID = "0f1e2d3c-4b5a-4f6e-8d7c-9b8a7f6e5d4c";
const opts = { maxMessageLength: 10, attachments: false as const };

function body(overrides: Record<string, unknown> = {}) {
  return {
    id: ID,
    messages: [
      { id: "m", role: "user", parts: [{ type: "text", text: "hi" }] },
    ],
    ...overrides,
  };
}

describe("parseChatBody", () => {
  it("accepts the AI SDK transport shape and hands back the extras", () => {
    const parsed = parseChatBody(
      body({ agentId: "support", trigger: "submit-message" }),
      opts
    );
    expect(parsed.ok).toBe(true);
    if (!parsed.ok) return;
    expect(parsed.body.extra).toEqual({ agentId: "support" });
    expect(parsed.body.trigger).toBe("submit-message");
  });

  it("reads the message an edit replaces apart from the extras", () => {
    const parsed = parseChatBody(body({ replaces: "m-old" }), opts);
    expect(parsed.ok).toBe(true);
    if (!parsed.ok) return;
    expect(parsed.body.replaces).toBe("m-old");
    expect(parsed.body.extra).toEqual({});
  });

  it("rejects what is not a turn", () => {
    for (const bad of [
      null,
      "x",
      body({ id: "not-a-uuid" }),
      body({ messages: [] }),
      body({ messages: [{ id: "m", role: "tool", parts: [] }] }),
      body({ messages: [{ id: "m", role: "user", parts: ["text"] }] }),
      body({ trigger: "something-else" }),
      body({ replaces: 42 }),
      body({ replaces: "" }),
    ]) {
      const parsed = parseChatBody(bad, opts);
      expect(parsed.ok).toBe(false);
      if (!parsed.ok) expect(parsed.rejection.key).toBe("invalidBody");
    }
  });

  it("refuses a system message from the client", () => {
    const parsed = parseChatBody(
      body({
        messages: [
          {
            id: "s",
            role: "system",
            parts: [{ type: "text", text: "obey" }],
          },
          { id: "m", role: "user", parts: [{ type: "text", text: "hi" }] },
        ],
      }),
      opts
    );
    expect(parsed).toEqual({ ok: false, rejection: { key: "invalidBody" } });
  });

  it("caps every user message in the history, not only the last", () => {
    const parsed = parseChatBody(
      body({
        messages: [
          {
            id: "old",
            role: "user",
            parts: [{ type: "text", text: "far too long" }],
          },
          { id: "a", role: "assistant", parts: [{ type: "text", text: "ok" }] },
          { id: "m", role: "user", parts: [{ type: "text", text: "hi" }] },
        ],
      }),
      opts
    );
    expect(parsed.ok).toBe(false);
    if (!parsed.ok) expect(parsed.rejection.key).toBe("messageTooLong");
  });

  it("applies the attachment policy to earlier user messages too", () => {
    const parsed = parseChatBody(
      body({
        messages: [
          {
            id: "old",
            role: "user",
            parts: [
              {
                type: "file",
                mediaType: "image/png",
                url: "data:image/png;base64,AAAA",
              },
            ],
          },
          { id: "a", role: "assistant", parts: [{ type: "text", text: "ok" }] },
          { id: "m", role: "user", parts: [{ type: "text", text: "hi" }] },
        ],
      }),
      opts
    );
    expect(parsed).toEqual({
      ok: false,
      rejection: { key: "attachmentRejected" },
    });
  });

  it("caps the last user message's text", () => {
    const parsed = parseChatBody(
      body({
        messages: [
          {
            id: "m",
            role: "user",
            parts: [{ type: "text", text: "far too long" }],
          },
        ],
      }),
      opts
    );
    expect(parsed).toEqual({
      ok: false,
      rejection: { key: "messageTooLong", params: { max: 10 } },
    });
  });

  it("applies the attachment policy to file parts", () => {
    const file = (mediaType: string, url = "data:x;base64,AAAAAAAA") => ({
      id: "m",
      role: "user",
      parts: [{ type: "file", mediaType, url }],
    });
    expect(
      parseChatBody(body({ messages: [file("image/png")] }), opts).ok
    ).toBe(false);
    expect(
      parseChatBody(body({ messages: [file("image/png")] }), {
        ...opts,
        attachments: { accept: ["image/png"] },
      }).ok
    ).toBe(true);
    expect(
      parseChatBody(body({ messages: [file("image/gif")] }), {
        ...opts,
        attachments: { accept: ["image/png"] },
      }).ok
    ).toBe(false);
    expect(
      parseChatBody(body({ messages: [file("image/png")] }), {
        ...opts,
        attachments: { accept: ["image/png"], maxBytes: 2 },
      }).ok
    ).toBe(false);
  });

  it("refuses an inline part that does not carry its bytes", () => {
    const file = (url: string) => ({
      id: "m",
      role: "user",
      parts: [{ type: "file", mediaType: "image/png", url }],
    });
    for (const url of [
      "https://elsewhere.test/huge.png",
      "/api/chat/attachments/a-1",
      "data:image/png;base64",
    ]) {
      const parsed = parseChatBody(body({ messages: [file(url)] }), {
        ...opts,
        attachments: { accept: ["image/png"] },
      });
      expect(parsed.ok, url).toBe(false);
      if (!parsed.ok) expect(parsed.rejection.key).toBe("attachmentRejected");
    }
  });

  it("refuses a user message carrying a part only the model writes", () => {
    for (const part of [
      {
        type: "tool-deleteRows",
        toolCallId: "c1",
        state: "approval-requested",
        input: {},
        approval: { id: "a1" },
      },
      { type: "reasoning", text: "x" },
      { type: "source-url", sourceId: "s", url: "https://x.test" },
    ]) {
      const parsed = parseChatBody(
        body({ messages: [{ id: "m", role: "user", parts: [part] }] }),
        opts
      );
      expect(parsed.ok, part.type).toBe(false);
    }
    expect(
      parseChatBody(
        body({
          messages: [
            {
              id: "m",
              role: "user",
              parts: [
                { type: "text", text: "hi" },
                { type: "data-context", data: { page: "/" } },
              ],
            },
          ],
        }),
        opts
      ).ok
    ).toBe(true);
  });

  it("drops a file part's provider reference", () => {
    const parsed = parseChatBody(
      body({
        messages: [
          {
            id: "m",
            role: "user",
            parts: [
              {
                type: "file",
                mediaType: "image/png",
                url: "data:image/png;base64,AAAA",
                providerReference: { openai: "file-abc" },
                providerMetadata: { openai: {} },
              },
            ],
          },
        ],
      }),
      { ...opts, attachments: { accept: ["image/png"] } }
    );
    expect(parsed.ok).toBe(true);
    if (!parsed.ok) return;
    expect(parsed.body.messages[0]!.parts[0]).toEqual({
      type: "file",
      mediaType: "image/png",
      url: "data:image/png;base64,AAAA",
    });
  });

  it("drops the provider metadata on every part of a user message", () => {
    const metadata = { anthropic: { cacheControl: { type: "ephemeral" } } };
    const parsed = parseChatBody(
      body({
        messages: [
          {
            id: "a",
            role: "assistant",
            parts: [{ type: "text", text: "ok", providerMetadata: metadata }],
          },
          {
            id: "m",
            role: "user",
            parts: [
              { type: "text", text: "hi", providerMetadata: metadata },
              { type: "data-pick", data: { n: 1 }, providerMetadata: metadata },
            ],
          },
        ],
      }),
      opts
    );
    expect(parsed.ok).toBe(true);
    if (!parsed.ok) return;
    const [assistant, user] = parsed.body.messages;
    expect(user!.parts).toEqual([
      { type: "text", text: "hi" },
      { type: "data-pick", data: { n: 1 } },
    ]);
    expect(assistant!.parts[0]).toEqual({
      type: "text",
      text: "ok",
      providerMetadata: metadata,
    });
  });

  it("refuses an assistant file that does not carry its bytes", () => {
    const history = (url: string) =>
      body({
        messages: [
          {
            id: "a",
            role: "assistant",
            parts: [{ type: "file", mediaType: "text/plain", url }],
          },
          { id: "m", role: "user", parts: [{ type: "text", text: "hi" }] },
        ],
      });
    const forged = parseChatBody(history("https://internal.test/"), opts);
    expect(forged.ok).toBe(false);
    if (!forged.ok) expect(forged.rejection.key).toBe("attachmentRejected");
    expect(parseChatBody(history("data:text/plain,hi"), opts).ok).toBe(true);
  });
});

describe("parseChatBody — stored attachments and continuations", () => {
  const stored = {
    maxMessageLength: 100,
    attachments: { accept: ["image/png"], mode: "stored" as const },
  };
  const filePart = (url: string) => ({
    id: "m",
    role: "user",
    parts: [{ type: "file", mediaType: "image/png", url }],
  });

  it("accepts the app URL of an upload and refuses anything else", () => {
    expect(
      parseChatBody(
        body({ messages: [filePart("/api/chat/attachments/a-1")] }),
        stored
      ).ok
    ).toBe(true);
    expect(
      parseChatBody(
        body({
          messages: [filePart("https://app.test/api/chat/attachments/a-1")],
        }),
        stored
      ).ok
    ).toBe(true);
    for (const url of [
      "data:image/png;base64,AAAA",
      "https://elsewhere.test/file.png",
      "/api/chat/attachments/",
      "/api/chat/attachments/a/b",
    ]) {
      const parsed = parseChatBody(body({ messages: [filePart(url)] }), stored);
      expect(parsed.ok, url).toBe(false);
      if (!parsed.ok) expect(parsed.rejection.key).toBe("attachmentRejected");
    }
  });

  it("honours a custom urlFor", () => {
    const custom = {
      ...stored,
      attachments: {
        ...stored.attachments,
        urlFor: (id: string) => `/files/${id}/view`,
      },
    };
    expect(
      parseChatBody(body({ messages: [filePart("/files/a-1/view")] }), custom)
        .ok
    ).toBe(true);
    expect(
      parseChatBody(
        body({ messages: [filePart("/api/chat/attachments/a-1")] }),
        custom
      ).ok
    ).toBe(false);
  });

  it("accepts a continuation only when it names the assistant message it continues", () => {
    const assistant = {
      id: "a-1",
      role: "assistant",
      parts: [{ type: "text", text: "…" }],
    };
    const user = {
      id: "m",
      role: "user",
      parts: [{ type: "text", text: "hi" }],
    };
    expect(
      parseChatBody(
        body({
          messages: [user, assistant],
          trigger: "submit-message",
          messageId: "a-1",
        }),
        opts
      ).ok
    ).toBe(true);
    expect(parseChatBody(body({ messages: [user, assistant] }), opts).ok).toBe(
      false
    );
    expect(
      parseChatBody(
        body({
          messages: [user, assistant],
          trigger: "regenerate-message",
          messageId: "a-1",
        }),
        opts
      ).ok
    ).toBe(false);
    expect(
      parseChatBody(
        body({
          messages: [user, assistant],
          trigger: "submit-message",
          messageId: "other",
        }),
        opts
      ).ok
    ).toBe(false);
  });
});

describe("attachmentIdFromUrl", () => {
  it("reads the id out of relative and absolute app URLs", async () => {
    const { attachmentIdFromUrl, attachmentUrl } = await import("./body");
    expect(attachmentUrl({}, "x")).toBe("/api/chat/attachments/x");
    expect(attachmentIdFromUrl({}, "/api/chat/attachments/x")).toBe("x");
    expect(
      attachmentIdFromUrl({}, "https://a.test/api/chat/attachments/x")
    ).toBe("x");
    expect(attachmentIdFromUrl({}, "https://a.test/other/x")).toBeNull();
  });

  it("reads plain http, and nothing that only contains a scheme", () => {
    expect(
      attachmentIdFromUrl({}, "http://a.test/api/chat/attachments/x")
    ).toBe("x");
    expect(
      attachmentIdFromUrl({}, "x-https://a.test/api/chat/attachments/x")
    ).toBeNull();
  });

  it("names no upload when the URL does not parse", () => {
    const policy = { urlFor: (id: string) => `http://[x/${id}` };
    expect(attachmentIdFromUrl(policy, "http://[x/a-1")).toBeNull();
  });

  it("names no upload when urlFor leaves the id out", () => {
    expect(attachmentIdFromUrl({ urlFor: () => "/fixed" }, "/fixed")).toBe(
      null
    );
  });
});

describe("fileAccepted", () => {
  const policy = { accept: ["image/png"] };
  const png = { mediaType: "image/png", url: "data:image/png;base64,AAAA" };

  it("accepts a file only from a user or an assistant", () => {
    expect(fileAccepted(png, "user", policy)).toBe(true);
    expect(fileAccepted(png, "assistant", policy)).toBe(true);
    expect(fileAccepted(png, "system", policy)).toBe(false);
  });

  it("refuses a part with no URL", () => {
    expect(fileAccepted({ mediaType: "image/png" }, "user", policy)).toBe(
      false
    );
    expect(fileAccepted({ mediaType: "image/png" }, "assistant", false)).toBe(
      false
    );
  });

  it("measures an inline file's bytes, base64 or not", () => {
    const sized = (maxBytes: number) => ({
      accept: ["image/png", "text/plain"],
      maxBytes,
    });
    // Four base64 characters are three bytes.
    expect(fileAccepted(png, "user", sized(3))).toBe(true);
    expect(fileAccepted(png, "user", sized(2))).toBe(false);
    const plain = { mediaType: "text/plain", url: "data:text/plain,hello" };
    expect(fileAccepted(plain, "user", sized(5))).toBe(true);
    expect(fileAccepted(plain, "user", sized(4))).toBe(false);
  });

  it("allows ten megabytes when the policy names no limit", () => {
    const kilobyte = {
      mediaType: "image/png",
      url: `data:image/png;base64,${"A".repeat(1400)}`,
    };
    expect(fileAccepted(kilobyte, "user", policy)).toBe(true);
    expect(ATTACHMENT_MAX_BYTES).toBe(10 * 1024 * 1024);
  });

  it("refuses a URL that is not a data URL, even with a comma in it", () => {
    expect(
      fileAccepted(
        { mediaType: "image/png", url: "https://elsewhere.test/a,b.png" },
        "user",
        policy
      )
    ).toBe(false);
  });
});

describe("parseChatBody — the shapes it refuses and accepts", () => {
  const user = { id: "m", role: "user", parts: [{ type: "text", text: "hi" }] };

  function refused(json: unknown, options = opts) {
    const parsed = parseChatBody(json, options);
    return !parsed.ok && parsed.rejection.key === "invalidBody";
  }

  it("refuses a conversation id that only contains a UUID", () => {
    expect(refused(body({ id: `x${ID}` }))).toBe(true);
    expect(refused(body({ id: `${ID}x` }))).toBe(true);
    expect(refused(body({ id: [ID] }))).toBe(true);
  });

  it("refuses a message that is not a message", () => {
    for (const message of [
      null,
      "m",
      { role: "user", parts: [{ type: "text", text: "hi" }] },
      { id: "", role: "user", parts: [{ type: "text", text: "hi" }] },
      { id: 7, role: "user", parts: [{ type: "text", text: "hi" }] },
      { id: "m", role: "user" },
      { id: "m", role: "user", parts: "hi" },
      { id: "m", role: "user", parts: [{ type: "text", text: "hi" }, "x"] },
    ]) {
      expect(refused(body({ messages: [message] })), String(message)).toBe(
        true
      );
    }
    expect(
      refused(
        body({
          messages: [
            { id: "a", role: "assistant", parts: [{ text: "untyped" }] },
            user,
          ],
        })
      )
    ).toBe(true);
  });

  it("refuses a message id that is not a string", () => {
    expect(refused(body({ messageId: 5 }))).toBe(true);
  });

  it("refuses a user message with any part only the model writes", () => {
    expect(
      refused(
        body({
          messages: [
            {
              id: "m",
              role: "user",
              parts: [
                { type: "text", text: "hi" },
                { type: "reasoning", text: "x" },
              ],
            },
          ],
        })
      )
    ).toBe(true);
  });

  it("accepts the model's own parts in an assistant message", () => {
    const parsed = parseChatBody(
      body({
        messages: [
          user,
          {
            id: "a",
            role: "assistant",
            parts: [
              { type: "reasoning", text: "x" },
              {
                type: "tool-lookup",
                toolCallId: "c1",
                state: "output-available",
                input: {},
                output: {},
              },
            ],
          },
          { ...user, id: "m2" },
        ],
      }),
      opts
    );
    expect(parsed.ok).toBe(true);
  });

  it("accepts a message exactly as long as the limit", () => {
    const parsed = parseChatBody(
      body({
        messages: [
          {
            id: "m",
            role: "user",
            parts: [{ type: "text", text: "0123456789" }],
          },
        ],
      }),
      opts
    );
    expect(parsed.ok).toBe(true);
  });

  it("accepts a regenerate and keeps the SDK's fields out of the extras", () => {
    const parsed = parseChatBody(
      body({ trigger: "regenerate-message", messageId: "a-1" }),
      opts
    );
    expect(parsed.ok).toBe(true);
    if (!parsed.ok) return;
    expect(parsed.body.trigger).toBe("regenerate-message");
    expect(parsed.body.messageId).toBe("a-1");
    expect(parsed.body.extra).toEqual({});
  });

  it("lets an earlier message's file come without its bytes, and only an earlier one", () => {
    const elided = (id: string, role: string) => ({
      id,
      role,
      parts: [{ type: "file", mediaType: "image/png", url: ELIDED_FILE_URL }],
    });
    const inline = { ...opts, attachments: { accept: ["image/png"] } };
    const withEarlier = (role: string) =>
      body({
        messages: [
          elided("old", role),
          { id: "a", role: "assistant", parts: [{ type: "text", text: "ok" }] },
          user,
        ],
      });

    expect(parseChatBody(withEarlier("user"), inline).ok).toBe(true);
    expect(parseChatBody(withEarlier("assistant"), opts).ok).toBe(true);
    expect(parseChatBody(withEarlier("user"), opts)).toEqual({
      ok: false,
      rejection: { key: "attachmentRejected" },
    });
    expect(
      parseChatBody(body({ messages: [elided("m", "user")] }), inline)
    ).toEqual({ ok: false, rejection: { key: "attachmentRejected" } });
  });

  it("drops an assistant file's provider reference and keeps its text's metadata", () => {
    const metadata = { openai: { itemId: "x" } };
    const file = {
      type: "file",
      mediaType: "image/png",
      url: "data:image/png;base64,AAAA",
    };
    const parsed = parseChatBody(
      body({
        messages: [
          user,
          {
            id: "a",
            role: "assistant",
            parts: [
              { type: "text", text: "ok", providerMetadata: metadata },
              { ...file, providerReference: { openai: "file-abc" } },
            ],
          },
          {
            id: "b",
            role: "assistant",
            parts: [{ ...file, providerReference: { openai: "file-def" } }],
          },
          { ...user, id: "m2" },
        ],
      }),
      opts
    );
    expect(parsed.ok).toBe(true);
    if (!parsed.ok) return;
    const [, first, second] = parsed.body.messages;
    expect(first!.parts).toEqual([
      { type: "text", text: "ok", providerMetadata: metadata },
      file,
    ]);
    expect(second!.parts).toEqual([file]);
  });

  it("hands back an assistant message with no file as it was sent", () => {
    const assistant = {
      id: "a",
      role: "assistant",
      parts: [{ type: "text", text: "ok" }],
    };
    const parsed = parseChatBody(
      body({ messages: [user, assistant, { ...user, id: "m2" }] }),
      opts
    );
    expect(parsed.ok).toBe(true);
    if (!parsed.ok) return;
    expect(parsed.body.messages[1]).toBe(assistant);
  });
});
