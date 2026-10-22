/**
 * A release's changelog section says at its top whether to upgrade, what
 * breaks and which migrations run.
 *
 * scripts/release-notes.mjs is what the release workflow runs; this
 * holds CHANGELOG.md to it before a release does, and proves each rule
 * on fixtures, including a promotion from a prerelease series, where the
 * migrations are counted from the previous stable release.
 */

import { afterAll, describe, expect, it } from "vitest";
import { execFileSync } from "node:child_process";
import {
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import * as prettier from "prettier";

import { ROOT } from "./tree";

type Section = { version: string; notes: string };
type NotesModule = {
  HEADER_SINCE: string;
  needsHeader: (version: string) => boolean;
  parseSections: (text: string) => Section[];
  journalTags: (journal: unknown) => string[];
  checkCategories: (notes: string) => string[];
  checkHeader: (
    notes: string,
    options: { version: string; known: string[]; added?: string[] }
  ) => string[];
  checkAdvisories: (notes: string, options: { version: string }) => string[];
  previousRelease: (options: {
    version: string;
    sha: string;
    cwd?: string;
  }) => string | null;
  migrationsAddedSince: (options: {
    base: string;
    cwd?: string;
    known: string[];
  }) => string[];
};

const notes = (await import(
  path.join(ROOT, "scripts/release-notes.mjs")
)) as NotesModule;

const JOURNAL = "packages/core/src/db/migrations/meta/_journal.json";
const changelog = readFileSync(path.join(ROOT, "CHANGELOG.md"), "utf8");
const known = notes.journalTags(
  JSON.parse(readFileSync(path.join(ROOT, JOURNAL), "utf8"))
);

const HEADER = [
  "- **Upgrade:** recommended — a safer share default.",
  "- **Breaking:** none",
  "- **Migrations:** none",
];

function section(header: string[], body = "### Fixed\n\n- A fix.") {
  return [...header, "", body].join("\n");
}

const check = (text: string, added?: string[], version = "1.3.0") =>
  notes.checkHeader(text, { version, known: [...known, "0010_x"], added });

describe("CHANGELOG.md", () => {
  it("opens every section from HEADER_SINCE on with the three bullets", () => {
    for (const { version, notes: text } of notes.parseSections(changelog)) {
      if (!notes.needsHeader(version)) continue;
      expect(
        notes.checkHeader(text, { version, known }),
        `CHANGELOG.md [${version}]`
      ).toEqual([]);
    }
  });

  it("links an advisory from every Security entry of a released section", () => {
    for (const { version, notes: text } of notes.parseSections(changelog)) {
      expect(
        notes.checkAdvisories(text, { version }),
        `CHANGELOG.md [${version}]`
      ).toEqual([]);
    }
  });

  it("uses only the release policy's categories in [Unreleased]", () => {
    const unreleased = /^## \[Unreleased\]\n([\s\S]*?)(?=^## \[)/m.exec(
      changelog
    );
    if (unreleased) expect(notes.checkCategories(unreleased[1]!)).toEqual([]);
  });
});

describe("the header", () => {
  it("passes a section that opens with the three bullets", () => {
    expect(check(section(HEADER))).toEqual([]);
  });

  it("refuses a missing bullet", () => {
    expect(check(section([HEADER[0]!, HEADER[1]!]))).not.toEqual([]);
  });

  it("refuses an Upgrade other than required, recommended or optional", () => {
    expect(
      check(section(["- **Upgrade:** maybe", HEADER[1]!, HEADER[2]!]))
    ).not.toEqual([]);
  });

  it("refuses the bullets out of order", () => {
    expect(check(section([HEADER[1]!, HEADER[0]!, HEADER[2]!]))).not.toEqual(
      []
    );
  });

  it("asks a breaking change for its upgrade steps", () => {
    const breaking = [
      HEADER[0]!,
      "- **Breaking:** `setConversationSharing` defaults to `workspace`.",
      HEADER[2]!,
    ];
    expect(check(section(breaking))).toEqual([
      "a Breaking line other than none needs a ### Upgrading",
    ]);
    expect(
      check(section(breaking, "### Changed\n\n- x\n\n### Upgrading\n\n- y"))
    ).toEqual([]);
  });

  it("holds the Migrations line to what the journal added", () => {
    expect(check(section(HEADER), ["0010_x"])).toEqual([
      "Migrations says none, but 0010_x were added",
    ]);
    const named = [HEADER[0]!, HEADER[1]!, "- **Migrations:** `0010_x`"];
    expect(check(section(named), ["0010_x"])).toEqual([]);
    expect(
      check(section([HEADER[0]!, HEADER[1]!, "- **Migrations:** `0099_y`"]))
    ).toEqual(["0099_y is not in the migration journal"]);
  });

  it("refuses a category the release policy does not list", () => {
    expect(check(section(HEADER, "### Breaking\n\n- x"))[0]).toMatch(
      /under Removed or Changed/
    );
    expect(check(section(HEADER, "### Notes\n\n- x"))).toHaveLength(1);
  });

  it("leaves a section below HEADER_SINCE alone", () => {
    expect(check("### Fixed\n\n- A fix.", undefined, "1.2.4")).toEqual([]);
  });

  it("holds the prereleases leading to HEADER_SINCE to the header", () => {
    expect(
      check("### Fixed\n\n- A fix.", undefined, "1.3.0-next.0")
    ).not.toEqual([]);
    expect(check(section(HEADER), undefined, "1.3.0-next.0")).toEqual([]);
  });

  it("reads versions under an [Unreleased] section", () => {
    const text = [
      "# Changelog",
      "",
      "## [Unreleased]",
      "",
      "### Added",
      "",
      "- Next.",
      "",
      "## [1.3.0] — 2026-11-04",
      "",
      section(HEADER),
      "",
      "## [1.2.4] — 2026-10-21",
      "",
      "### Fixed",
      "",
      "- Old.",
      "",
    ].join("\n");
    const sections = notes.parseSections(text);
    expect(sections.map((s) => s.version)).toEqual(["1.3.0", "1.2.4"]);
    expect(check(sections[0]!.notes)).toEqual([]);
  });

  it("is left as written by prettier, so GitHub renders three lines", async () => {
    const text = `## [1.3.0] — 2026-11-04\n\n${section(HEADER)}\n`;
    expect(await prettier.format(text, { parser: "markdown" })).toBe(text);
  });
});

describe("security entries", () => {
  const LINK =
    "https://github.com/intelligo-dev/intelligo/security/advisories/GHSA-4q3c-9x2m-r8vw";
  const REQUIRED = [
    "- **Upgrade:** required — a security fix.",
    HEADER[1]!,
    HEADER[2]!,
  ];
  const advisories = (text: string, version = "1.3.0") =>
    notes.checkAdvisories(text, { version });

  it("passes an entry that links its advisory", () => {
    const body = `### Security\n\n- A first turn read forged history\n  ([GHSA-4q3c-9x2m-r8vw](${LINK})).`;
    expect(advisories(section(REQUIRED, body))).toEqual([]);
    expect(check(section(REQUIRED, body))).toEqual([]);
  });

  it("refuses an entry without one, or with a placeholder id", () => {
    expect(
      advisories(section(REQUIRED, "### Security\n\n- A fix."))
    ).toHaveLength(1);
    const placeholder = `${LINK.replace(/GHSA-.*/, "")}GHSA-TODO`;
    expect(
      advisories(section(REQUIRED, `### Security\n\n- A fix (${placeholder}).`))
    ).toHaveLength(1);
    expect(
      advisories(
        section(
          REQUIRED,
          `### Security\n\n- A fix (${LINK}).\n- Another fix.\n\n### Fixed\n\n- A bug.`
        )
      )
    ).toHaveLength(1);
  });

  it("refuses another repository's advisory", () => {
    const elsewhere = LINK.replace("intelligo-dev/intelligo", "someone/else");
    expect(
      advisories(section(REQUIRED, `### Security\n\n- A fix (${elsewhere}).`))
    ).toHaveLength(1);
  });

  it("refuses a link that only carries the advisory's address inside it", () => {
    const wrapped = `https://example.com/?to=${LINK}`;
    expect(
      advisories(section(REQUIRED, `### Security\n\n- A fix (${wrapped}).`))
    ).toHaveLength(1);
  });

  it("asks a section with a security fix to say Upgrade: required", () => {
    const body = `### Security\n\n- A fix (${LINK}).`;
    expect(advisories(section(HEADER, body))).toEqual([
      "a section with ### Security says **Upgrade:** required",
    ]);
  });

  it("holds a section below HEADER_SINCE to the link, not the header", () => {
    expect(advisories(`### Security\n\n- A fix (${LINK}).`, "1.2.5")).toEqual(
      []
    );
    expect(advisories("### Security\n\n- A fix.", "1.2.5")).toHaveLength(1);
  });

  it("leaves a section below ADVISORY_SINCE alone", () => {
    expect(advisories("### Security\n\n- A fix.", "1.2.4")).toEqual([]);
  });
});

describe("migrations across a promotion", () => {
  const repo = mkdtempSync(path.join(tmpdir(), "release-notes-"));
  afterAll(() => rmSync(repo, { recursive: true, force: true }));

  const git = (...args: string[]) =>
    execFileSync("git", args, {
      cwd: repo,
      encoding: "utf8",
      env: {
        ...process.env,
        // The developer's own git config (signing, hooks) stays out of it.
        GIT_CONFIG_GLOBAL: "/dev/null",
        GIT_CONFIG_NOSYSTEM: "1",
        GIT_AUTHOR_NAME: "test",
        GIT_AUTHOR_EMAIL: "test@example.com",
        GIT_COMMITTER_NAME: "test",
        GIT_COMMITTER_EMAIL: "test@example.com",
      },
    }).trim();

  function commit(tags: string[], message: string, tag?: string) {
    mkdirSync(path.join(repo, path.dirname(JOURNAL)), { recursive: true });
    writeFileSync(
      path.join(repo, JOURNAL),
      JSON.stringify({ entries: tags.map((t) => ({ tag: t })) })
    );
    git("add", "-A");
    git("commit", "-q", "--allow-empty", "-m", message);
    if (tag) git("tag", tag);
    return git("rev-parse", "HEAD");
  }

  git("init", "-q");
  commit(["0000_baseline"], "1.2.4", "v1.2.4");
  commit(["0000_baseline", "0010_x"], "1.3.0-next.1", "v1.3.0-next.1");
  commit(["0000_baseline", "0010_x"], "1.3.0-next.4", "v1.3.0-next.4");
  const promotion = commit(["0000_baseline", "0010_x"], "1.3.0");
  const all = ["0000_baseline", "0010_x"];

  it("counts a stable release from the previous stable release", () => {
    const base = notes.previousRelease({
      version: "1.3.0",
      sha: promotion,
      cwd: repo,
    });
    expect(base).toBe("v1.2.4");
    const added = notes.migrationsAddedSince({
      base: base!,
      cwd: repo,
      known: all,
    });
    expect(added).toEqual(["0010_x"]);
    expect(check(section(HEADER), added)).not.toEqual([]);
    expect(
      check(
        section([HEADER[0]!, HEADER[1]!, "- **Migrations:** `0010_x`"]),
        added
      )
    ).toEqual([]);
  });

  it("counts a prerelease from the previous tag of its series", () => {
    expect(
      notes.previousRelease({
        version: "1.3.0-next.5",
        sha: promotion,
        cwd: repo,
      })
    ).toBe("v1.3.0-next.4");
    expect(
      notes.previousRelease({
        version: "1.4.0-next.0",
        sha: promotion,
        cwd: repo,
      })
    ).toBe("v1.2.4");
  });
});
