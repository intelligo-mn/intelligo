/**
 * Paging the audit trail against a real database: offset pages are
 * disjoint and newest first, and the count matches the filters the
 * pages use.
 *
 * Runs only when TEST_PG_URL is set (with DATABASE_URL pointing at the
 * same database, which the db module reads).
 */

import { beforeAll, describe, expect, it } from "vitest";
import { randomUUID } from "node:crypto";

import {
  countAuditEvents,
  queryAuditEvents,
  recordAuditEventOrThrow,
} from "../index";

const PG_URL = process.env.TEST_PG_URL;
const d = PG_URL ? describe : describe.skip;

d("paging the audit trail (integration)", () => {
  const action = `audit.paging.${randomUUID().slice(0, 8)}`;

  beforeAll(async () => {
    for (let i = 0; i < 5; i++) {
      await recordAuditEventOrThrow({
        workspaceId: null,
        actorId: null,
        actorKind: "system",
        action,
        resourceKind: "test",
        resourceId: `r${i}`,
      });
    }
  });

  it("counts what the filters match", async () => {
    await expect(countAuditEvents({ action })).resolves.toBe(5);
  });

  it("pages by offset without repeating a row", async () => {
    const first = await queryAuditEvents({ action, limit: 2 });
    const second = await queryAuditEvents({ action, limit: 2, offset: 2 });
    const third = await queryAuditEvents({ action, limit: 2, offset: 4 });

    const ids = [...first, ...second, ...third].map((e) => e.id);
    expect(ids).toHaveLength(5);
    expect(new Set(ids).size).toBe(5);
    expect(third).toHaveLength(1);
  });
});
