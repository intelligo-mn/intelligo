/**
 * SECURITY.md's supported-versions table.
 *
 * A reporter and a deployment read that table to know whether a line
 * gets fixes, so it names the minor the packages are released at as the
 * current line, and an older line still marked supported carries an end
 * date that the newest release in CHANGELOG.md has not passed. A release
 * that opens a new minor without updating the table fails here. The
 * policy documents' relative links resolve.
 */

import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

import { ROOT } from "./tree";

type Row = { version: string; status: string };

const CURRENT = "Supported (current)";
const UNTIL = /^Supported until (\d{4}-\d{2}-\d{2})$/;

/** The rows of the table under `## Supported versions`. */
function supportedRows(markdown: string): Row[] {
  const section = markdown.split(/^## Supported versions$/m)[1];
  if (section === undefined) return [];
  const body = section.split(/^## /m)[0]!;
  return body
    .split("\n")
    .filter((line) => line.startsWith("|"))
    .slice(2)
    .map((line) => {
      const [version = "", status = ""] = line
        .slice(1, -1)
        .split("|")
        .map((cell) => cell.trim());
      return { version, status };
    });
}

/**
 * Rows that still claim support on `day` (YYYY-MM-DD) but should not: an
 * older line whose end date is before it, or one marked supported with no
 * end date at all.
 */
function staleRows(rows: readonly Row[], day: string): Row[] {
  return rows.filter((row) => {
    if (row.status === CURRENT || !row.status.startsWith("Supported"))
      return false;
    const until = UNTIL.exec(row.status)?.[1];
    return until === undefined || until < day;
  });
}

const security = readFileSync(path.join(ROOT, "SECURITY.md"), "utf8");
const rows = supportedRows(security);

const coreVersion = (
  JSON.parse(
    readFileSync(path.join(ROOT, "packages/core/package.json"), "utf8")
  ) as { version: string }
).version;

/** The date of the newest released section of CHANGELOG.md. */
function newestReleaseDay(): string {
  const changelog = readFileSync(path.join(ROOT, "CHANGELOG.md"), "utf8");
  const day = /^## \[\d[^\]]*\] — (\d{4}-\d{2}-\d{2})$/m.exec(changelog)?.[1];
  if (day === undefined) throw new Error("CHANGELOG.md has no dated release");
  return day;
}

describe("SECURITY.md supported versions", () => {
  it("has a table", () => {
    expect(rows.length).toBeGreaterThan(0);
  });

  it("names the released minor as the one current line", () => {
    const [major, minor] = coreVersion.split(".");
    const line = `${major}.${minor}.x`;
    expect(
      rows.filter((row) => row.status === CURRENT).map((row) => row.version),
      `the packages are at ${coreVersion}; SECURITY.md's current line must be ${line}`
    ).toEqual([line]);
  });

  it("supports no older line past its end date", () => {
    expect(staleRows(rows, newestReleaseDay())).toEqual([]);
  });

  describe("staleRows", () => {
    const fixture: Row[] = [
      { version: "1.3.x", status: CURRENT },
      { version: "1.2.x", status: "Supported until 2027-01-31" },
      { version: "1.1.x", status: "Supported" },
      { version: "1.0.x and older", status: "Unsupported" },
    ];

    it("keeps a line inside its window, through its last day", () => {
      expect(staleRows(fixture.slice(0, 2), "2027-01-31")).toEqual([]);
    });

    it("reports a line once its end date has passed", () => {
      expect(staleRows(fixture.slice(0, 2), "2027-02-01")).toEqual([
        fixture[1],
      ]);
    });

    it("reports an older line marked supported with no end date", () => {
      expect(staleRows(fixture, "2026-01-01")).toEqual([fixture[2]]);
    });
  });
});

describe("policy documents", () => {
  it.each(["SECURITY.md", "RELEASES.md", "SUPPORT.md"])(
    "%s links only to files that exist",
    (file) => {
      const text = readFileSync(path.join(ROOT, file), "utf8");
      const missing = [...text.matchAll(/\]\(([^)#\s]+)(?:#[^)]*)?\)/g)]
        .map((match) => match[1]!)
        .filter((target) => !/^[a-z]+:/.test(target))
        .filter((target) => !existsSync(path.join(ROOT, target)));
      expect(missing).toEqual([]);
    }
  );
});
