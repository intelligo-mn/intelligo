#!/usr/bin/env node
/**
 * Prints the CHANGELOG.md section for one version — the release notes —
 * and refuses one a reader cannot act on.
 *
 * The release workflow feeds this to the GitHub release, and refuses
 * to publish a version that has no section: a release without notes
 * is a version nobody can tell apart from the last one. From
 * HEADER_SINCE on, a section also opens with three bullets, in this
 * order, so the top of a release says whether to upgrade, what breaks
 * and which migrations run:
 *
 *   - **Upgrade:** required | recommended | optional[ — why]
 *   - **Breaking:** none | what a consumer changes (steps under ### Upgrading)
 *   - **Migrations:** none | `NNNN_name`, … (each in the journal)
 *
 * and uses only the categories in CATEGORIES.
 *
 *   node scripts/release-notes.mjs 1.3.0
 *   node scripts/release-notes.mjs 1.3.0 --release-commit <sha>
 *
 * With --release-commit, the Migrations line must name exactly the
 * journal entries added since the release before that commit: the
 * previous stable release for a plain version, which a `latest` user
 * upgrades from, or the previous tag of the same prerelease series. The
 * section is printed either way; a violation exits 1 and says which.
 */
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";

import { compareVersions } from "../apps/website/scripts/registry-release.mjs";

/** The first version whose section must open with the three bullets. */
export const HEADER_SINCE = "1.3.0";

/** The changelog categories a section from HEADER_SINCE on may use. */
export const CATEGORIES = [
  "Added",
  "Changed",
  "Deprecated",
  "Removed",
  "Fixed",
  "Upgrading",
];

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const JOURNAL = "packages/core/src/db/migrations/meta/_journal.json";

const UPGRADE = /^- \*\*Upgrade:\*\* (required|recommended|optional)( — .+)?$/;
const BREAKING = /^- \*\*Breaking:\*\* (none|.+)$/;
const MIGRATIONS = /^- \*\*Migrations:\*\* (none|.+)$/;
const SEMVER = /^\d+\.\d+\.\d+(-[0-9A-Za-z.-]+)?$/;

/**
 * The changelog's version sections, newest first: `## [<semver>]`
 * headings only, so `## [Unreleased]` is not one.
 */
export function parseSections(text) {
  const headings = [...text.matchAll(/^## \[([^\]]+)\][^\n]*$/gm)];
  return headings.flatMap((match, i) => {
    const version = match[1];
    if (!SEMVER.test(version)) return [];
    const start = match.index + match[0].length;
    const end = headings[i + 1]?.index ?? text.length;
    return [{ version, notes: text.slice(start, end).trim() }];
  });
}

/** The tags a drizzle journal lists. */
export function journalTags(journal) {
  return (journal?.entries ?? []).map((entry) => entry.tag);
}

/** The `###` headings of a section that are not in CATEGORIES, as messages. */
export function checkCategories(notes) {
  return [...notes.matchAll(/^### (.+)$/gm)].flatMap(([, heading]) => {
    const category = heading.trim();
    if (CATEGORIES.includes(category)) return [];
    return [
      category === "Breaking"
        ? "### Breaking is not a category: list a breaking change under Removed or Changed, with its steps under ### Upgrading"
        : `### ${category} is not a category; use ${CATEGORIES.join(", ")}`,
    ];
  });
}

/**
 * Whether a version's section must open with the three bullets. The
 * X.Y.Z core is compared, so the prereleases leading to HEADER_SINCE
 * (1.3.0-next.N sorts below 1.3.0) are held to it too.
 */
export function needsHeader(version) {
  return compareVersions(version.replace(/-.*$/, ""), HEADER_SINCE) >= 0;
}

/**
 * What is wrong with a section's notes, as messages; empty when nothing
 * is. `known` is every migration the journal lists; `added`, when given,
 * the ones added since the previous release, which the Migrations line
 * must name exactly.
 */
export function checkHeader(notes, { version, known, added }) {
  if (!needsHeader(version)) return [];
  const problems = checkCategories(notes);

  const [upgrade, breaking, migrations] = notes
    .split("\n")
    .filter((line) => line.trim() !== "");
  const opening = [
    [upgrade, UPGRADE, "**Upgrade:** required, recommended or optional"],
    [breaking, BREAKING, "**Breaking:** none, or what a consumer changes"],
    [migrations, MIGRATIONS, "**Migrations:** none, or the migrations"],
  ];
  let opened = true;
  for (const [i, [line, pattern, expected]] of opening.entries()) {
    if (line && pattern.test(line)) continue;
    opened = false;
    problems.push(
      `line ${i + 1} of the section must be "- ${expected}", not ${JSON.stringify(line ?? "")}`
    );
  }
  if (!opened) return problems;

  if (BREAKING.exec(breaking)[1] !== "none" && !/^### Upgrading$/m.test(notes))
    problems.push("a Breaking line other than none needs a ### Upgrading");

  const named = [...migrations.matchAll(/`(\d{4}_[A-Za-z0-9_]+)`/g)].map(
    (m) => m[1]
  );
  const none = MIGRATIONS.exec(migrations)[1] === "none";
  for (const tag of named) {
    if (!known.includes(tag))
      problems.push(`${tag} is not in the migration journal`);
  }
  if (added) {
    const missing = added.filter((tag) => !named.includes(tag));
    const extra = named.filter((tag) => !added.includes(tag));
    if (none && added.length)
      problems.push(`Migrations says none, but ${added.join(", ")} were added`);
    else if (missing.length)
      problems.push(`Migrations does not name ${missing.join(", ")}`);
    if (extra.length)
      problems.push(
        `Migrations names ${extra.join(", ")}, which the previous release already had`
      );
  }
  return problems;
}

/**
 * The release a version's migrations are counted from, as a tag
 * reachable from the parent of its release commit: the previous stable
 * release for a plain version, the previous tag of the same prerelease
 * series (falling back to the previous stable release) for a prerelease.
 * Null when there is none.
 */
export function previousRelease({ version, sha, cwd = ROOT }) {
  const describe = (match) => {
    try {
      return (
        execFileSync(
          "git",
          ["describe", "--tags", "--abbrev=0", ...match, `${sha}^`],
          { cwd, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }
        ).trim() || null
      );
    } catch {
      return null;
    }
  };
  const stable = () => describe(["--match", "v[0-9]*", "--exclude", "v*-*"]);
  if (!version.includes("-")) return stable();
  const series = version.slice(0, version.lastIndexOf("."));
  return describe(["--match", `v${series}.*`]) ?? stable();
}

/** The migrations a commit's journal has that `base`'s does not. */
export function migrationsAddedSince({ base, cwd = ROOT, known }) {
  let before = [];
  try {
    before = journalTags(
      JSON.parse(
        execFileSync("git", ["show", `${base}:${JOURNAL}`], {
          cwd,
          encoding: "utf8",
          stdio: ["ignore", "pipe", "ignore"],
        })
      )
    );
  } catch {
    before = [];
  }
  return known.filter((tag) => !before.includes(tag));
}

function main() {
  const [version, ...rest] = process.argv.slice(2);
  if (!version) {
    console.error(
      "usage: release-notes.mjs <version> [--release-commit <sha>]"
    );
    process.exit(2);
  }

  const text = readFileSync(
    new URL("../CHANGELOG.md", import.meta.url),
    "utf8"
  );
  const section = parseSections(text).find((s) => s.version === version);
  if (!section) {
    console.error(
      `CHANGELOG.md has no "## [${version}]" section — write the release notes before releasing.`
    );
    process.exit(1);
  }
  if (!section.notes) {
    console.error(`CHANGELOG.md's "## [${version}]" section is empty.`);
    process.exit(1);
  }
  process.stdout.write(section.notes + "\n");

  const known = journalTags(
    JSON.parse(readFileSync(new URL(`../${JOURNAL}`, import.meta.url), "utf8"))
  );
  let added;
  const flag = rest.indexOf("--release-commit");
  if (flag !== -1) {
    const sha = rest[flag + 1];
    if (!sha) {
      console.error("--release-commit needs a commit");
      process.exit(2);
    }
    const base = previousRelease({ version, sha });
    if (base) {
      added = migrationsAddedSince({ base, known });
      console.error(
        `release-notes: migrations since ${base}: ${added.join(", ") || "none"}`
      );
    } else {
      console.error(
        "release-notes: no earlier release to count migrations from"
      );
    }
  }

  const problems = checkHeader(section.notes, { version, known, added });
  if (problems.length) {
    console.error(
      `CHANGELOG.md's "## [${version}]" section:\n  ${problems.join("\n  ")}`
    );
    process.exit(1);
  }
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) main();
