/**
 * A connection that dies while a query holds it — the server restarts,
 * an operator or a timeout terminates the backend, the network drops —
 * rejects that query and nothing else: no uncaught exception reaches the
 * process, and the pool hands out a working connection next.
 *
 * Runs against a real database when TEST_PG_URL is set. DATABASE_URL
 * must point at the same database.
 */

import { describe, expect, it } from "vitest";
import { sql } from "drizzle-orm";

const PG_URL = process.env.TEST_PG_URL;
const d = PG_URL ? describe : describe.skip;

d("a connection lost while in use (integration)", () => {
  it("rejects the query using it and leaves the pool working", async () => {
    const { db } = await import("../client");

    await expect(
      db.transaction(async (tx) => {
        await tx.execute(sql`SELECT pg_terminate_backend(pg_backend_pid())`);
      })
    ).rejects.toThrow();

    const { rows } = (await db.execute(sql`SELECT 1 AS one`)) as unknown as {
      rows: { one: number }[];
    };
    expect(rows).toEqual([{ one: 1 }]);
  });
});
