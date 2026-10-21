---
title: "Threat model: storage and uploads"
description: "STRIDE threats against chat file uploads, the storage port and the bucket behind it: tenant keys, signed URLs, size caps and cleanup."
order: 6
label: "Storage threats"
---

- **Scope:** the storage port in `@intelligo-dev/core/storage` (`setStorageAdapter`, `createS3Storage`, `s3StorageFromEnv`), attachment rows and `sweepAttachments` in `@intelligo-dev/core/attachments`, and the stored-attachment routes `createChatUploadHandler` and `createChatAttachmentHandler` build. Inline attachments travel inside the message and are covered by the [chat threat model](/docs/security/threat-model-chat).
- **Assets:** uploaded files, the bucket and its credentials, the workspace's storage budget.
- **Trust boundaries:** browser → the upload route; browser → the attachment route → the bucket; the transport → the model provider, which fetches a signed URL.

## Spoofing

| Threat                                        | Control                                                                                                                               | Yours                                                     |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| An anonymous upload                           | The upload route authenticates first and refuses without a session and a workspace                                                    | —                                                         |
| Fetching someone else's file through the app  | The attachment route looks the row up by id, workspace and uploader, then redirects to a fresh signed URL; anything else is not found | —                                                         |
| Requests to the bucket that are not the app's | The S3 adapter signs every request with AWS Signature Version 4                                                                       | Keys scoped to this bucket, with put, get and delete only |

## Tampering

| Threat                                                      | Control                                                                                                                                                                        | Yours |
| ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----- |
| A file part naming a URL the server would fetch             | A user's file part must carry the app URL of an upload (stored mode) or a data URL within the size cap (inline mode); an assistant's only a data URL. Any other URL is refused | —     |
| A file part naming another tenant's upload                  | Stored parts are resolved against the actor's own rows; one that is not theirs is dropped before the model sees it                                                             | —     |
| A file name that walks a path or carries control characters | The name is cut to its last segment, control characters removed and the length capped at 255; the object key never uses it                                                     | —     |
| A stored object written under another workspace             | Keys are built by the server from the workspace id and a random id                                                                                                             | —     |

<!-- snippet: packages/core/src/storage/index.ts#attachmentStorageKey -->

```ts
export function attachmentStorageKey(workspaceId: string, id: string): string {
  return `ws/${workspaceId}/att/${id}`;
}
```

## Repudiation

Every upload is a row with workspace, uploader, file name, type, size and time. Uploads write no audit event; deleting a row queues its object for deletion in the database (`storage_deletions`), so a cascade from a deleted workspace or account leaves a record of what to remove.

## Information disclosure

| Threat                                                | Control                                                                                                       | Yours                                                       |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| A file URL outliving access                           | Signed URLs expire and are never persisted; the transcript keeps the app URL, and shared pages drop file URLs | A private bucket with no public listing                     |
| An uploaded file run as a page on the bucket's origin | Only the types below are served inline; anything else is sent as a download                                   | Serve the bucket from an origin that is not your app's      |
| A signed URL handed to the model provider             | It lasts 15 minutes and names one object                                                                      | Choose a provider whose retention you accept                |
| Files kept after an account is erased                 | Rows cascade with the workspace or user; the sweep deletes their queued objects                               | Schedule the maintenance route with a storage adapter bound |

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

| Threat                                     | Control                                                                                                         | Yours                                          |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| Many uploads                               | Per-workspace rate limit from the plan, counted apart from chat turns; the chat feature gate                    | Rates per plan                                 |
| One huge upload                            | A declared length over the cap is refused before the body is read; an undeclared one is read only up to the cap | Lower `maxBytes`; cap bodies at the edge       |
| Filling the bucket with files no turn uses | Unclaimed uploads are capped per workspace; the sweep deletes unclaimed rows after a day                        | `admitUpload` for a per-plan or per-user quota |
| A slow bucket holding requests             | Each request to the bucket is abandoned after 30 seconds by default                                             | —                                              |

<!-- snippet: packages/chat/src/body.ts#ATTACHMENT_MAX_BYTES -->

```ts
export const ATTACHMENT_MAX_BYTES = 10 * 1024 * 1024;
```

<!-- snippet: packages/chat/src/attachments.ts#DEFAULT_UNCLAIMED_FILES -->

```ts
const DEFAULT_UNCLAIMED_FILES = 10;
```

<!-- snippet: packages/cli/templates/maintenance/maintenance-route.ts.tpl#UNCLAIMED_UPLOAD_AFTER_MS -->

```ts
const UNCLAIMED_UPLOAD_AFTER_MS = 24 * 60 * 60_000;
```

## Elevation of privilege

| Threat                                   | Control                                                          | Yours                                                                                    |
| ---------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Uploading on a plan without chat         | The upload route checks the chat feature before reading the body | —                                                                                        |
| A parser exploited by a crafted document | The framework parses no file content                             | `extractText` runs your parser on untrusted bytes at upload: keep it patched and bounded |

## Residual risks

- A file's media type is the one the browser declared; the bytes are not inspected. The inline list keeps a mislabelled file to types a browser displays without running anything.
- Files are not scanned for malware.
- Text that `extractText` returns reaches the model, so a document can carry a prompt injection like any page the model reads.
- Objects are deleted only when the maintenance route runs with a storage adapter bound; a deletion storage refuses stays queued and is retried.
