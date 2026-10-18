/**
 * Checks that run before any database call. `db` is a lazy proxy that throws
 * only on its first query, so these import the real service without
 * DATABASE_URL; persistence is covered by service.integration.test.ts.
 */

import { describe, it, expect } from "vitest";
import {
  deleteDocumentVersions,
  DOCUMENT_LIMITS,
  saveDocument,
} from "./service";
import { isDocumentServiceError } from "./errors";

const actor = { workspaceId: "ws-1", userId: "u-1" };

describe("saveDocument — input validation", () => {
  const valid = { id: "doc-1", title: "Notes", content: "x", kind: "text" };
  const refused = (params: Parameters<typeof saveDocument>[1]) =>
    expect(saveDocument(actor, params)).rejects.toSatisfy(
      (err: unknown) =>
        isDocumentServiceError(err) && err.code === "invalid_input"
    );

  it("refuses an empty or too long id, a too long title or content", async () => {
    await refused({ ...valid, id: "" });
    await refused({ ...valid, id: "x".repeat(DOCUMENT_LIMITS.idChars + 1) });
    await refused({
      ...valid,
      title: "t".repeat(DOCUMENT_LIMITS.titleChars + 1),
    });
    await refused({
      ...valid,
      content: "c".repeat(DOCUMENT_LIMITS.contentChars + 1),
    });
  });

  it("refuses a kind that is not a plain lower-case name", async () => {
    for (const kind of ["", "Code", "html<script>", "k".repeat(33)])
      await refused({ ...valid, kind });
  });
});

describe("deleteDocumentVersions — input validation", () => {
  it("rejects an unparsable timestamp with invalid_input", async () => {
    await expect(
      deleteDocumentVersions(actor, "doc-1", "not-a-date")
    ).rejects.toSatisfy((err: unknown) => {
      return isDocumentServiceError(err) && err.code === "invalid_input";
    });
  });

  it("rejects a timestamp older than the delete window with invalid_input", async () => {
    const tooOld = new Date(
      Date.now() - 31 * 24 * 60 * 60 * 1000
    ).toISOString();

    await expect(
      deleteDocumentVersions(actor, "doc-1", tooOld)
    ).rejects.toSatisfy((err: unknown) => {
      return isDocumentServiceError(err) && err.code === "invalid_input";
    });
  });
});
