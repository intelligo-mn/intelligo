---
title: "Threat model: chat"
description: "STRIDE threats against the chat transport: prompt injection, tool approval, rendered replies, attachments, share links and embedding."
order: 4
label: "Chat threats"
---

- **Scope:** `createChatHandler` (POST and DELETE), `createChatUploadHandler`, `createChatAttachmentHandler`, share links, and the `chat` registry item's renderer.
- **Assets:** conversations, attachments, the model budget, tools' side effects.
- **Trust boundaries:** browser → `/api/chat`; the model → your tools; the model's output → the reader's browser; the public → a share link.

## Spoofing

| Threat                                            | Control                                                                                                                                         | Yours                |
| ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| An unauthenticated turn                           | Authentication runs before the body is read, so an anonymous request costs no more than its headers; nothing is loaded or held without an actor | —                    |
| A site embedding the chat with the user's cookies | CORS headers go only to origins listed in `cors.origins`; the scaffold forbids framing                                                          | List only your sites |

## Tampering

| Threat                                                                                | Control                                                                                                                                                                                                               | Yours                                                                                                                    |
| ------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| A client rewriting what the assistant said, or a tool call's input, on a continuation | The stored message is the base and only the client's approval answers and client-tool outputs are copied onto it; a continuation that does not match is refused. Earlier messages are replaced by their stored copies | With your own `persist`, make the same check in `prepareMessages`                                                        |
| Prompt injection through user text, files or pages the model reads                    | The framework adds no user text to the system prompt                                                                                                                                                                  | `needsApproval` on every tool that writes, sends or spends; `sanitizeForSystemPrompt` on text you add to a system prompt |

## Repudiation

Each turn is an execution row with usage and cost. `onTurn.approval` fires once per approval answer, which is your record of who allowed a gated action.

## Information disclosure

| Threat                                                                | Control                                                                                                                                                           | Yours                                                           |
| --------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| A reply that loads a tracking image or carries data out through a URL | Images load only from `imageHosts` (none by default); relative URLs resolve to nothing; links are http, https, mailto and tel only                                | `linkHosts` when the model reads untrusted pages                |
| A shared link leaking reasoning, tool data or files                   | New shares use a random token, and sharing again after unsharing issues a new one. Reasoning, tool input and output, provider metadata and file URLs are stripped | `keepToolOutput` only for tools whose output is safe to publish |
| A file URL outliving access                                           | Signed URLs expire (below) and are never stored; the attachment route looks the file up by workspace and uploader on every request                                | A private bucket                                                |
| An uploaded file run as a page                                        | Only the types below are served inline; anything else downloads                                                                                                   | —                                                               |
| Probing for another workspace's conversation                          | Another workspace's id answers as if it did not exist                                                                                                             | —                                                               |

<!-- snippet: packages/chat/src/attachments.ts#SIGNED_URL_SECONDS -->

```ts
const SIGNED_URL_SECONDS = 900;
```

<!-- snippet: packages/chat/src/attachments.ts#INLINE_TYPES -->

```ts
const INLINE_TYPES: ReadonlySet<string> = new Set([
  "image/png",
  "image/jpeg",
  "image/gif",
  "image/webp",
  "image/avif",
  "application/pdf",
  "text/plain",
]);
```

## Denial of service

| Threat                    | Control                                                                | Yours                                                          |
| ------------------------- | ---------------------------------------------------------------------- | -------------------------------------------------------------- |
| Flooding turns or uploads | Per-workspace plan rate limits; uploads count in their own bucket      | Rates per plan                                                 |
| Huge requests             | Body cap, message length cap, history window and tool-step cap (below) | Lower them with `maxBodyBytes`, `maxMessageLength`, `maxSteps` |
| Unbounded spend           | Credit hold at `executions.begin()`; unknown models refused            | Register every model's price                                   |

<!-- snippet: packages/chat/src/handler.ts#DEFAULT_MAX_MESSAGE_LENGTH -->

```ts
const DEFAULT_MAX_MESSAGE_LENGTH = 8000;
```

<!-- snippet: packages/chat/src/handler.ts#DEFAULT_MAX_STEPS -->

```ts
const DEFAULT_MAX_STEPS = 5;
```

<!-- snippet: packages/chat/src/handler.ts#DEFAULT_WINDOW -->

```ts
const DEFAULT_WINDOW = { maxMessages: 40, maxTokens: 12_000 } as const;
```

<!-- snippet: packages/chat/src/handler.ts#TRANSCRIPT_BODY_BYTES -->

```ts
const TRANSCRIPT_BODY_BYTES = 8 * 1024 * 1024;
```

## Elevation of privilege

| Threat                                   | Control                                                                        |
| ---------------------------------------- | ------------------------------------------------------------------------------ |
| Asking for a model the plan lacks        | Model gate per request; a model's `featureKey` is checked                      |
| Reading another workspace's conversation | Conversations load by id and the actor's workspace; anything else is NOT_FOUND |

## Residual risks

- Prompt injection is not solved; approval and least-privilege tools are the real control.
- The injection patterns `sanitizeForSystemPrompt` removes are English phrases plus structural markers.
- A conversation shared before share tokens existed is still found by its conversation id until it is unshared and shared again.
