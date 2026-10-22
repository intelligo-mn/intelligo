/**
 * What a client can put into server state through the chat transport.
 *
 * A chat request is client data end to end. Most of it is only used to
 * look something up (a conversation id, a message id) or to pick a
 * branch (a trigger). Only these fields are copied into anything the
 * server keeps or hands to the model:
 *
 * - the new user message's parts: a text part's `text`; a file part's
 *   `url`, `mediaType` and `filename`; a `data-*` part's `id` and `data`;
 * - on a continuation, for a tool call stored as awaiting approval, the
 *   answer's `approved` and `reason`;
 * - on a continuation, for a tool call stored as awaiting the client,
 *   its `output` or `errorText`.
 *
 * Every message before the last one is read back from the stored
 * conversation, and a conversation that does not exist yet holds none.
 * Each string and object in the request is tagged with a canary that
 * names its path; a canary found in a sink outside this list fails the
 * suite. A file part's `url` and `mediaType` are the exception: the
 * parser checks their form, so they are sent as written, carry no
 * canary, and where they go is not checked here. The sinks are the
 * stored rows, the conversation row and its metadata, attachment
 * claims, the execution record, the `onTurn` events (without `turn`)
 * and the prompt the model receives. Keys the
 * SDK does not define (`extra`) are handed to the application as
 * `turn.body` and are the application's to validate; the transport reads
 * only `modelId`, and only as a key into `config.models`.
 *
 * A deployment with its own `persist` reads its own store and is not
 * covered here.
 */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import ts from "typescript";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { jsonSchema, tool } from "ai";
import type { UIMessage } from "ai";
import { MockLanguageModelV3, simulateReadableStream } from "ai/test";

import type { Executions } from "@intelligo-dev/executions";
import { clearModels } from "@intelligo-dev/executions/pricing";

import { createChatHandler } from "./handler";
import type { ChatServerConfig } from "./config";

const SINKS = [
  "upsertMessages",
  "createConversation",
  "deleteTrailingMessages",
  "renameConversation",
  "updateConversationMetadata",
  "deleteConversation",
  "attachToConversation",
  "executions.begin",
  "events",
  "model.prompt",
] as const;
type Sink = (typeof SINKS)[number];

const recorded = vi.hoisted(() => ({
  seen: [] as Array<{ sink: string; args: unknown }>,
  handoff: [] as unknown[],
  rows: new Map<string, Record<string, unknown>>(),
  messages: [] as Array<{
    id: string;
    conversationId: string;
    role: string;
    parts: string;
    createdAt: Date;
  }>,
}));

vi.mock("@intelligo-dev/auth", () => ({
  requireWorkspace: async () => ({
    workspace: { id: "ws-1" },
    user: { id: "u-1" },
  }),
}));
vi.mock("@intelligo-dev/billing", () => ({
  getWorkspaceBilling: async () => ({ plan: { slug: "free" } }),
  checkRateLimit: async () => ({
    allowed: true,
    limit: 10,
    remaining: 9,
    resetAt: new Date(0),
  }),
  hasFeature: async () => true,
}));
vi.mock("@intelligo-dev/core/logger", () => ({
  createLogger: () => ({
    debug: () => undefined,
    info: () => undefined,
    warn: () => undefined,
    error: () => undefined,
  }),
}));
vi.mock("@intelligo-dev/core/storage", () => ({
  getStorageAdapter: () => ({
    getSignedUrl: async () => "data:application/pdf;base64,AA==",
  }),
}));
vi.mock("@intelligo-dev/core/attachments", () => ({
  getAttachments: async () => [],
  attachToConversation: async (_actor: unknown, args: unknown) => {
    recorded.seen.push({ sink: "attachToConversation", args });
  },
}));
vi.mock("@intelligo-dev/core/conversations", () => {
  class NotFound extends Error {
    code = "not_found";
  }
  return {
    isConversationServiceError: (error: unknown) => error instanceof NotFound,
    getConversation: async (_actor: unknown, id: string) => {
      const row = recorded.rows.get(id);
      if (!row) throw new NotFound();
      return row;
    },
    getMessages: async (_actor: unknown, id: string) =>
      recorded.messages.filter((m) => m.conversationId === id),
    getMessage: async (_actor: unknown, id: string, messageId: string) =>
      recorded.messages.find(
        (m) => m.conversationId === id && m.id === messageId
      ) ?? null,
    getMessagesByIds: async (_actor: unknown, id: string, ids: string[]) =>
      recorded.messages.filter(
        (m) => m.conversationId === id && ids.includes(m.id)
      ),
    createConversation: async (
      actor: { workspaceId: string; userId: string },
      params: Record<string, unknown>
    ) => {
      recorded.seen.push({ sink: "createConversation", args: params });
      const row = { ...params, ...actor };
      recorded.rows.set(params.id as string, row);
      return row;
    },
    // Recorded as core writes it: an id, a role and the parts as JSON.
    upsertMessages: async (
      id: string,
      finished: Array<{ id: string; role: string; parts: unknown[] }>
    ) => {
      const rows = finished.map((m) => ({
        id: m.id,
        role: m.role,
        parts: JSON.stringify(m.parts),
      }));
      recorded.seen.push({ sink: "upsertMessages", args: rows });
      for (const row of rows) {
        recorded.messages = recorded.messages.filter((m) => m.id !== row.id);
        recorded.messages.push({
          ...row,
          conversationId: id,
          createdAt: new Date(),
        });
      }
    },
    deleteTrailingMessages: async (_actor: unknown, args: unknown) => {
      recorded.seen.push({ sink: "deleteTrailingMessages", args });
      return { deletedCount: 0 };
    },
    renameConversation: async (_actor: unknown, id: string, title: string) => {
      recorded.seen.push({ sink: "renameConversation", args: { id, title } });
      const row = recorded.rows.get(id)!;
      row.title = title;
      return row;
    },
    updateConversationMetadata: async (
      _actor: unknown,
      id: string,
      patch: unknown
    ) => {
      recorded.seen.push({
        sink: "updateConversationMetadata",
        args: { id, patch },
      });
    },
    deleteConversation: async (_actor: unknown, id: string) => {
      recorded.seen.push({ sink: "deleteConversation", args: { id } });
    },
  };
});

const MODEL_ID = "google/gemini-2.5-flash";
const CONVERSATION_ID = "0f1e2d3c-4b5a-4f6e-8d7c-9b8a7f6e5d4c";
const NEW_CONVERSATION_ID = "5a4b3c2d-1e0f-4a9b-8c7d-6e5f4a3b2c1d";
const PNG = "data:image/png;base64,iVBORw0KGgo=";

// Canaries

const CANARY = /<<c:([^>]+)>>/g;
const TAG = (path: string) => `<<c:${path}>>`;

/** True keeps a subtree exactly as written, with no canary in it. */
type Skip = (path: string) => boolean;

/**
 * Values the transport compares or looks up rather than copies: they
 * stay as written so the request is still one it accepts.
 */
function structural(
  path: string,
  key: string,
  parent: Record<string, unknown>
): boolean {
  if (/^(id|trigger|messageId|replaces)$/.test(path)) return true;
  if (["role", "type", "state", "toolCallId"].includes(key)) return true;
  if (/^messages\[\w+\]\.id$/.test(path)) return true;
  return parent.type === "file" && (key === "url" || key === "mediaType");
}

function tagged(
  value: unknown,
  path: string,
  key: string,
  parent: Record<string, unknown>,
  skip: Skip
): unknown {
  if (skip(path)) return value;
  if (typeof value === "string") {
    return structural(path, key, parent) ? value : TAG(path);
  }
  if (Array.isArray(value)) {
    return value.map((item, index) =>
      tagged(item, `${path}[${index}]`, key, parent, skip)
    );
  }
  if (typeof value === "object" && value !== null) {
    const record = value as Record<string, unknown>;
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(record)) {
      out[k] = tagged(v, `${path}.${k}`, k, record, skip);
    }
    // Provider metadata maps each provider to a record; a string beside
    // them would make the prompt invalid before the model is called, and
    // the run would prove nothing about what the model receives.
    if (key !== "providerMetadata") out.__canary__ = TAG(`${path}.__canary__`);
    return out;
  }
  return value;
}

/**
 * The body with every string and object tagged by its path. The last
 * message is `LAST` when it is the user's new message and `CONT` when
 * it is an assistant message being continued. The top level gets no
 * canary key of its own: it would be one more `extra` field.
 */
function withCanaries(
  body: Record<string, unknown>,
  skip: Skip = () => false
): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(body)) {
    if (key !== "messages") {
      out[key] = tagged(value, key, key, body, skip);
      continue;
    }
    const messages = value as UIMessage[];
    out.messages = messages.map((message, index) => {
      const name =
        index < messages.length - 1
          ? String(index)
          : message.role === "user"
            ? "LAST"
            : "CONT";
      return tagged(message, `messages[${name}]`, "messages", body, skip);
    });
  }
  return out;
}

const PART = String.raw`^messages\[LAST\]\.parts\[\d+\]\.`;
const ANSWER = String.raw`^messages\[CONT\]\.parts\[\d+\]\.`;
const WHITELIST: Array<{ path: RegExp; sinks: readonly Sink[] }> = [
  {
    path: new RegExp(`${PART}text$`),
    sinks: [
      "upsertMessages",
      "createConversation",
      "renameConversation",
      "model.prompt",
    ],
  },
  {
    path: new RegExp(`${PART}filename$`),
    sinks: ["upsertMessages", "model.prompt"],
  },
  { path: new RegExp(`${PART}data(\\.|$)`), sinks: ["upsertMessages"] },
  { path: new RegExp(`${PART}id$`), sinks: ["upsertMessages"] },
  {
    path: new RegExp(`${ANSWER}approval\\.reason$`),
    sinks: ["upsertMessages", "events", "model.prompt"],
  },
  {
    path: new RegExp(`${ANSWER}(output|errorText)(\\.|$)`),
    sinks: ["upsertMessages", "model.prompt"],
  },
];

/**
 * The one open exception: a key the client adds to a user message's
 * part is stored with the part. It never reaches the model.
 */
const PENDING = { path: new RegExp(`${PART}\\w+$`), sink: "upsertMessages" };

function allowed(sink: Sink, path: string): boolean {
  const listed = WHITELIST.some(
    (rule) => rule.path.test(path) && rule.sinks.includes(sink)
  );
  return listed || (sink === PENDING.sink && PENDING.path.test(path));
}

function serialized(value: unknown): string {
  return (
    JSON.stringify(value, (_key, v: unknown) => {
      if (v instanceof Error) return { message: v.message };
      if (v instanceof Uint8Array) return Buffer.from(v).toString("latin1");
      return v;
    }) ?? ""
  );
}

// The run

let models: MockLanguageModelV3[] = [];

function model(): MockLanguageModelV3 {
  const created = new MockLanguageModelV3({
    provider: "recording",
    modelId: MODEL_ID,
    doStream: async () => ({
      stream: simulateReadableStream({
        chunkDelayInMs: 0,
        chunks: [
          { type: "stream-start", warnings: [] },
          { type: "text-start", id: "1" },
          { type: "text-delta", id: "1", delta: "ok" },
          { type: "text-end", id: "1" },
          {
            type: "finish",
            finishReason: { unified: "stop", raw: undefined },
            usage: {
              inputTokens: {
                total: 1,
                noCache: undefined,
                cacheRead: undefined,
                cacheWrite: undefined,
              },
              outputTokens: { total: 1, text: 1, reasoning: undefined },
            },
          },
        ] as never[],
      }),
    }),
  });
  models.push(created);
  return created;
}

/** Every sink's writes, the model's prompts included. */
function observed(): Array<{ sink: Sink; path: string }> {
  const writes = [
    ...recorded.seen,
    ...models.flatMap((m) =>
      m.doStreamCalls.map((call) => ({
        sink: "model.prompt",
        args: call.prompt,
      }))
    ),
  ];
  return writes.flatMap(({ sink, args }) =>
    [...serialized(args).matchAll(CANARY)].map((match) => ({
      sink: sink as Sink,
      path: match[1]!,
    }))
  );
}

/** Canaries found in a sink their path is not allowed into. */
function leaks(): string[] {
  return observed()
    .filter(({ sink, path }) => !allowed(sink, path))
    .map(({ sink, path }) => `${sink} <- ${path}`);
}

function reached(sink: Sink, path: string): boolean {
  return observed().some((o) => o.sink === sink && o.path === path);
}

function executions(): Executions {
  return {
    begin: async (args: unknown) => {
      recorded.seen.push({ sink: "executions.begin", args });
      return {
        id: "e-1",
        requestId: "req-1",
        allowed: true,
        usingTrialCredits: false,
        complete: async () => undefined,
        fail: async () => undefined,
      };
    },
  } as unknown as Executions;
}

/** Records an event without `turn`, and the `turn.body` handed over. */
function event(name: string) {
  return ({
    turn,
    ...rest
  }: {
    turn?: { body: unknown };
    [key: string]: unknown;
  }) => {
    recorded.seen.push({ sink: "events", args: { event: name, ...rest } });
    if (turn) recorded.handoff.push(turn.body);
  };
}

const TOOLS = {
  weather: tool({
    description: "The weather in a city.",
    inputSchema: jsonSchema<{ city: string }>({
      type: "object",
      properties: { city: { type: "string" } },
      required: ["city"],
    }),
    needsApproval: true,
    execute: async () => ({ celsius: 20 }),
  }),
  pickColor: tool({
    description: "Asks the user for a color.",
    inputSchema: jsonSchema<{ palette: string }>({
      type: "object",
      properties: { palette: { type: "string" } },
      required: ["palette"],
    }),
  }),
};

function config(extra: Partial<ChatServerConfig> = {}): ChatServerConfig {
  return {
    executions: executions(),
    model: { defaultId: MODEL_ID, resolve: () => model() },
    resolveAgent: (context) => {
      recorded.handoff.push(context.body);
      return { id: "assistant", systemPrompt: "Be brief.", tools: TOOLS };
    },
    attachments: { accept: ["image/png"] },
    models: { options: [{ id: MODEL_ID, label: "Flash" }] },
    onTurn: {
      start: event("start"),
      complete: event("complete"),
      fail: event("fail"),
      refuse: event("refuse"),
      approval: event("approval"),
    },
    ...extra,
  };
}

async function send(
  body: Record<string, unknown>,
  extra: Partial<ChatServerConfig> = {}
): Promise<number> {
  const { POST } = createChatHandler(config(extra));
  const response = await POST(
    new Request("http://app.test/api/chat", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    })
  );
  await response.text();
  if (response.status === 200) {
    await vi.waitFor(() =>
      expect(recorded.seen.some((s) => s.sink === "upsertMessages")).toBe(true)
    );
    // An admitted turn that failed before the model ran would leave the
    // prompt unrecorded and every check on it vacuous.
    const failed = recorded.seen.filter(
      (s) => (s.args as { event?: string }).event === "fail"
    );
    expect(serialized(failed)).toBe("[]");
    expect(models.some((m) => m.doStreamCalls.length > 0)).toBe(true);
  }
  return response.status;
}

function seed(
  id: string,
  role: "user" | "assistant",
  parts: Array<Record<string, unknown>>
) {
  recorded.messages.push({
    id,
    conversationId: CONVERSATION_ID,
    role,
    parts: JSON.stringify(parts),
    createdAt: new Date(),
  });
}

function existingConversation() {
  recorded.rows.set(CONVERSATION_ID, {
    id: CONVERSATION_ID,
    workspaceId: "ws-1",
    userId: "u-1",
    agentId: "assistant",
    modelId: MODEL_ID,
    title: "Earlier",
  });
}

/**
 * Message ids the client sent that the store holds now but did not
 * before, other than the new message's own.
 */
function strayIds(
  body: { messages: Array<{ id: string }> },
  before: ReadonlySet<string>
): string[] {
  const sent = body.messages.slice(0, -1).map((m) => m.id);
  const stored = new Set(recorded.messages.map((m) => m.id));
  return sent.filter((id) => stored.has(id) && !before.has(id));
}

const text = (value: string) => ({ type: "text", text: value });

beforeEach(() => {
  recorded.seen = [];
  recorded.handoff = [];
  recorded.rows.clear();
  recorded.messages = [];
  models = [];
});

afterEach(() => {
  clearModels();
});

const CORE_STORE =
  /^@intelligo-dev\/core\/(conversations|attachments|documents)$/;
const WRITE = /^(create|delete|update|upsert|rename|attach|set|save)/;

describe("the sinks this suite records", () => {
  it("include every write handler.ts imports from core", () => {
    const path = fileURLToPath(new URL("./handler.ts", import.meta.url));
    const source = ts.createSourceFile(
      path,
      readFileSync(path, "utf8"),
      ts.ScriptTarget.Latest
    );
    const writes: string[] = [];
    for (const statement of source.statements) {
      if (!ts.isImportDeclaration(statement)) continue;
      const from = (statement.moduleSpecifier as ts.StringLiteral).text;
      if (!CORE_STORE.test(from)) continue;
      const clause = statement.importClause;
      const bindings = clause?.namedBindings;
      if (!clause || clause.isTypeOnly || !bindings) continue;
      if (!ts.isNamedImports(bindings)) continue;
      for (const element of bindings.elements) {
        const name = (element.propertyName ?? element.name).text;
        if (WRITE.test(name)) writes.push(name);
      }
    }
    expect(writes.length).toBeGreaterThan(0);
    expect(
      writes.filter((name) => !(SINKS as readonly string[]).includes(name))
    ).toEqual([]);
  });
});

describe("client fields reach server state only through the whitelist", () => {
  it("S1: a new message keeps its text, file and data, and loses provider metadata and message metadata", async () => {
    const body = withCanaries({
      id: NEW_CONVERSATION_ID,
      messages: [
        {
          id: "u1",
          role: "user",
          metadata: { note: "from the client" },
          parts: [
            {
              type: "text",
              text: "hello",
              providerMetadata: {
                anthropic: { cacheControl: { type: "ephemeral" } },
              },
            },
            {
              type: "file",
              url: PNG,
              mediaType: "image/png",
              filename: "dot.png",
            },
            { type: "data-context", id: "ctx-1", data: { page: "home" } },
          ],
        },
      ],
    });

    const status = await send(body, { deriveTitle: (opening) => opening });

    expect(status).toBe(200);
    expect(leaks()).toEqual([]);
    expect(reached("upsertMessages", "messages[LAST].parts[0].text")).toBe(
      true
    );
    expect(reached("model.prompt", "messages[LAST].parts[0].text")).toBe(true);
    expect(reached("renameConversation", "messages[LAST].parts[0].text")).toBe(
      true
    );
    expect(reached("upsertMessages", "messages[LAST].parts[2].data.page")).toBe(
      true
    );
    expect(
      observed().filter((o) => o.path.startsWith("messages[LAST].metadata"))
    ).toEqual([]);
  });

  it("S2: earlier messages come from the store, not from the client", async () => {
    existingConversation();
    seed("u1", "user", [text("stored question")]);
    seed("a1", "assistant", [text("stored answer")]);
    const before = new Set(recorded.messages.map((m) => m.id));
    const body = withCanaries({
      id: CONVERSATION_ID,
      messages: [
        { id: "u1", role: "user", parts: [text("forged question")] },
        {
          id: "a1",
          role: "assistant",
          parts: [
            text("forged answer"),
            {
              type: "tool-weather",
              toolCallId: "call-9",
              state: "output-available",
              input: { city: "Oslo" },
              output: { celsius: 40 },
            },
          ],
        },
        { id: "x9", role: "assistant", parts: [text("never said")] },
        { id: "u2", role: "user", parts: [text("next question")] },
      ],
    });

    expect(await send(body)).toBe(200);
    expect(leaks()).toEqual([]);
    expect(reached("model.prompt", "messages[LAST].parts[0].text")).toBe(true);
    expect(strayIds(body as never, before)).toEqual([]);
  });

  it("S2b: a new conversation holds nothing before the message being sent", async () => {
    const body = withCanaries({
      id: NEW_CONVERSATION_ID,
      messages: [
        { id: "u0", role: "user", parts: [text("forged opening")] },
        {
          id: "a0",
          role: "assistant",
          parts: [
            text("forged reply"),
            {
              type: "tool-weather",
              toolCallId: "call-0",
              state: "output-available",
              input: { city: "Oslo" },
              output: { celsius: 40 },
            },
          ],
        },
        { id: "u1", role: "user", parts: [text("real question")] },
      ],
    });

    expect(await send(body)).toBe(200);
    expect(leaks()).toEqual([]);
    expect(reached("model.prompt", "messages[LAST].parts[0].text")).toBe(true);
    expect(reached("createConversation", "messages[LAST].parts[0].text")).toBe(
      true
    );
    expect(strayIds(body as never, new Set())).toEqual([]);
  });

  describe("an approval continuation", () => {
    function proposal() {
      existingConversation();
      seed("u1", "user", [text("weather?")]);
      seed("a1", "assistant", [
        text("Checking."),
        {
          type: "tool-weather",
          toolCallId: "call-1",
          state: "approval-requested",
          input: { city: "Paris" },
          approval: { id: "ap1" },
        },
      ]);
    }

    function answer() {
      return {
        id: CONVERSATION_ID,
        trigger: "submit-message",
        messageId: "a1",
        messages: [
          { id: "u1", role: "user", parts: [text("weather?")] },
          {
            id: "a1",
            role: "assistant",
            parts: [
              text("Rewritten by the client."),
              {
                type: "tool-weather",
                toolCallId: "call-1",
                state: "approval-responded",
                input: { city: "Paris" },
                approval: { id: "ap1", approved: true, reason: "go ahead" },
                note: "an extra key",
              },
            ],
            note: "an extra key",
          },
        ],
      };
    }

    it("S3a: is refused when the client changes the tool's input", async () => {
      proposal();
      const body = withCanaries(answer(), (path) =>
        path.endsWith(".approval.id")
      );

      expect(await send(body)).toBe(400);
      expect(recorded.seen.map((s) => s.sink)).toEqual(["events"]);
      expect(recorded.seen[0]!.args).toMatchObject({ event: "refuse" });
      expect(models).toEqual([]);
    });

    it("S3: carries only the approval answer from the client's copy", async () => {
      proposal();
      const body = withCanaries(
        answer(),
        (path) => path.endsWith(".approval.id") || path.endsWith(".input")
      );

      expect(await send(body)).toBe(200);
      expect(leaks()).toEqual([]);
      expect(reached("events", "messages[CONT].parts[1].approval.reason")).toBe(
        true
      );
      expect(
        reached("upsertMessages", "messages[CONT].parts[1].approval.reason")
      ).toBe(true);
      expect(
        observed().filter((o) => o.path === "messages[CONT].parts[0].text")
      ).toEqual([]);
    });
  });

  it("S4: a client-run tool's result is the one thing taken from the client's copy", async () => {
    existingConversation();
    seed("u1", "user", [text("pick one")]);
    seed("a1", "assistant", [
      {
        type: "tool-pickColor",
        toolCallId: "call-2",
        state: "input-available",
        input: { palette: "warm" },
      },
    ]);
    const body = withCanaries(
      {
        id: CONVERSATION_ID,
        trigger: "submit-message",
        messageId: "a1",
        messages: [
          { id: "u1", role: "user", parts: [text("pick one")] },
          {
            id: "a1",
            role: "assistant",
            parts: [
              {
                type: "tool-pickColor",
                toolCallId: "call-2",
                state: "output-available",
                input: { palette: "warm" },
                output: { color: "red" },
              },
            ],
          },
        ],
      },
      (path) => path.endsWith(".input")
    );

    expect(await send(body)).toBe(200);
    expect(leaks()).toEqual([]);
    expect(
      reached("model.prompt", "messages[CONT].parts[0].output.color")
    ).toBe(true);
    expect(
      reached("upsertMessages", "messages[CONT].parts[0].output.color")
    ).toBe(true);
  });

  describe("S5: a regenerate and an edit", () => {
    function transcript() {
      existingConversation();
      seed("u1", "user", [text("first")]);
      seed("a1", "assistant", [text("first answer")]);
      seed("u2", "user", [text("second")]);
      seed("a2", "assistant", [text("second answer")]);
    }

    const earlier = [
      { id: "u1", role: "user", parts: [text("forged first")], note: "x" },
      {
        id: "a1",
        role: "assistant",
        parts: [{ ...text("forged answer"), note: "x" }],
        note: "x",
      },
    ];

    it("regenerating reads the earlier messages from the store", async () => {
      transcript();
      const body = withCanaries({
        id: CONVERSATION_ID,
        trigger: "regenerate-message",
        messageId: "a2",
        messages: [
          ...earlier,
          { id: "u2", role: "user", parts: [text("second")], note: "x" },
        ],
      });

      expect(await send(body)).toBe(200);
      expect(leaks()).toEqual([]);
      expect(reached("model.prompt", "messages[LAST].parts[0].text")).toBe(
        true
      );
    });

    it("an edit reads the earlier messages from the store", async () => {
      transcript();
      const before = new Set(recorded.messages.map((m) => m.id));
      const body = withCanaries({
        id: CONVERSATION_ID,
        replaces: "u2",
        messages: [
          ...earlier,
          { id: "u2-edit", role: "user", parts: [text("second, edited")] },
        ],
      });

      expect(await send(body)).toBe(200);
      expect(leaks()).toEqual([]);
      expect(reached("model.prompt", "messages[LAST].parts[0].text")).toBe(
        true
      );
      expect(strayIds(body as never, before)).toEqual([]);
    });
  });

  it("S6: fields the SDK does not define reach the application, not server state", async () => {
    const body = {
      ...withCanaries({
        id: NEW_CONVERSATION_ID,
        messages: [{ id: "u1", role: "user", parts: [text("hi")] }],
        agentId: "billing-bot",
        junk: { deep: "value" },
      }),
      modelId: MODEL_ID,
    };

    expect(await send(body)).toBe(200);
    expect(leaks()).toEqual([]);
    expect(observed().filter((o) => /^(agentId|junk)/.test(o.path))).toEqual(
      []
    );
    const handed = serialized(recorded.handoff);
    expect(handed).toContain(TAG("agentId"));
    expect(handed).toContain(TAG("junk.deep"));
  });

  it.todo(
    "S7: a deployment with its own persist gets the stored continuation, not the client's copy"
  );
});
