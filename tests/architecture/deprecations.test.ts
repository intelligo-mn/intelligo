/**
 * The register of deprecated framework API (packages/cli/src/deprecations.ts)
 * against the sources it describes.
 *
 * Every `@deprecated` tag in a published package names a register code,
 * the major that removes it and its replacement; every register entry has
 * that tag; its `since` is a released version (or Unreleased) and its
 * `removeIn` a major still ahead; a call to it warns at runtime under its
 * code (`warnDeprecated`), with the same removal major and replacement. A registry item whose source uses a
 * deprecated name is listed on the entry, so the removing major cannot
 * forget to update it.
 */

import { readFileSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import {
  DEPRECATIONS,
  REMOVED_CODES,
  type Deprecation,
} from "../../packages/cli/src/deprecations";
import { PACKAGES_DIR, ROOT, listPublishedWorkspaces, walk } from "./tree";

const CODE = /\bINTELLIGO_DEP\d{4}\b/;
const REMOVED_IN = /\bRemoved in (\d+\.0\.0)\b/;

type Tag = {
  file: string;
  module: string;
  /** The declaration the JSDoc block sits on. */
  name: string;
  /** The tag's text, from `@deprecated` to the next tag. */
  text: string;
};

/** The published packages' non-test source files, with their package name. */
function publishedSources(): { file: string; module: string }[] {
  const out: { file: string; module: string }[] = [];
  for (const dir of listPublishedWorkspaces(PACKAGES_DIR)) {
    const module = (
      JSON.parse(
        readFileSync(path.join(PACKAGES_DIR, dir, "package.json"), "utf8")
      ) as { name: string }
    ).name;
    for (const file of walk(path.join(PACKAGES_DIR, dir, "src"), (name) =>
      /\.tsx?$/.test(name)
    )) {
      if (!/\.test\.tsx?$/.test(file)) out.push({ file, module });
    }
  }
  return out;
}

/** `@deprecated` tags in the published packages' non-test source. */
function sourceTags(): Tag[] {
  const tags: Tag[] = [];
  for (const { file, module } of publishedSources()) {
    const source = readFileSync(file, "utf8");
    for (const block of source.matchAll(/\/\*\*([\s\S]*?)\*\//g)) {
      const body = block[1]!.replace(/^\s*\*/gm, "").replace(/\s+/g, " ");
      const tag = body.match(/(?:^|\s)@deprecated\b(.*?)(?=\s@[a-z]|$)/);
      if (!tag) continue;
      const after = source.slice(block.index! + block[0].length);
      const declared = after.match(
        /^\s*(?:export\s+)?(?:declare\s+)?(?:async\s+)?(?:function\*?\s+|const\s+|let\s+|var\s+|type\s+|interface\s+|class\s+|enum\s+)?([A-Za-z_$][\w$]*)/
      );
      tags.push({
        file: path.relative(ROOT, file),
        module,
        name: declared?.[1] ?? "<unknown>",
        text: tag[1]!.trim(),
      });
    }
  }
  return tags;
}

/** Version headings of CHANGELOG.md, as scripts/release-notes.mjs splits it. */
function changelogVersions(): Set<string> {
  const changelog = readFileSync(path.join(ROOT, "CHANGELOG.md"), "utf8");
  return new Set([...changelog.matchAll(/^## \[(.+?)\]/gm)].map((m) => m[1]!));
}

function major(version: string): number {
  return Number(version.split(".")[0]);
}

/** Source text with comments blanked, so a mention in a comment is no use. */
function code(source: string): string {
  return source.replace(/\/\*[\s\S]*?\*\/|(?<![:"'`\\])\/\/[^\n]*/g, (m) =>
    m.replace(/[^\n]/g, " ")
  );
}

/** Where `entry` is used in `source`, as 1-based line numbers. */
function uses(entry: Deprecation, source: string): number[] {
  const name = entry.name.replace(/[\\^$.*+?()[\]{}|]/g, "\\$&");
  // A property is read off a value (`bundle.credits`); an export is
  // named wherever it is imported or called.
  const re =
    entry.kind === "property"
      ? new RegExp(`[A-Za-z_$][\\w$]*\\??\\.${name}(?![\\w$])`, "g")
      : new RegExp(`(?<![\\w$.])${name}(?![\\w$])`, "g");
  const text = code(source);
  return [...text.matchAll(re)].map(
    (m) => text.slice(0, m.index).split("\n").length
  );
}

const REGISTRY_DIR = path.join(PACKAGES_DIR, "registry");

/** Registry item names by the source path (`base/...`) they ship. */
function itemsByFile(): Map<string, string[]> {
  const registry = JSON.parse(
    readFileSync(path.join(REGISTRY_DIR, "registry.json"), "utf8")
  ) as { items: { name: string; files?: { path: string }[] }[] };
  const owners = new Map<string, string[]>();
  for (const item of registry.items) {
    for (const file of item.files ?? []) {
      owners.set(file.path, [...(owners.get(file.path) ?? []), item.name]);
    }
  }
  return owners;
}

const tags = sourceTags();
const coreVersion = (
  JSON.parse(
    readFileSync(path.join(PACKAGES_DIR, "core", "package.json"), "utf8")
  ) as { version: string }
).version;

describe("the deprecation register", () => {
  it("finds the deprecations in the sources", () => {
    expect(tags.length).toBeGreaterThan(0);
  });

  it("each @deprecated tag names its code, its removing major and a replacement", () => {
    const bad: string[] = [];
    for (const tag of tags) {
      const where = `${tag.name} in ${tag.file}`;
      if (!CODE.test(tag.text)) bad.push(`${where}: no INTELLIGO_DEPnnnn code`);
      if (!REMOVED_IN.test(tag.text)) {
        bad.push(`${where}: no "Removed in X.0.0"`);
      }
      const entry = DEPRECATIONS.find(
        (d) => d.code === tag.text.match(CODE)?.[0]
      );
      // The replacement the register names appears in the tag too.
      const replacement = entry?.use.match(/[A-Za-z_$][\w$]*/)?.[0];
      if (entry && replacement && !tag.text.includes(`\`${replacement}\``)) {
        bad.push(`${where}: does not name \`${replacement}\``);
      }
    }
    expect(bad).toEqual([]);
  });

  it("holds every tag, and only those, with the same name, module and removal", () => {
    const missing: string[] = [];
    for (const tag of tags) {
      const code = tag.text.match(CODE)?.[0];
      const entry = DEPRECATIONS.find((d) => d.code === code);
      if (!entry) {
        missing.push(
          `${tag.name} is @deprecated in ${tag.file} but not in packages/cli/src/deprecations.ts`
        );
        continue;
      }
      if (entry.name !== tag.name || entry.module !== tag.module) {
        missing.push(
          `${entry.code} is ${entry.module} ${entry.name} in the register but ${tag.module} ${tag.name} in ${tag.file}`
        );
      }
      const removeIn = tag.text.match(REMOVED_IN)?.[1];
      if (removeIn !== entry.removeIn) {
        missing.push(
          `${entry.code}: removed in ${entry.removeIn} by the register, ${removeIn} by ${tag.file}`
        );
      }
    }
    for (const entry of DEPRECATIONS) {
      if (!tags.some((t) => t.text.match(CODE)?.[0] === entry.code)) {
        missing.push(
          `${entry.code} (${entry.name}) has no @deprecated tag in ${entry.module}`
        );
      }
    }
    expect(missing).toEqual([]);
  });

  it("dates each deprecation from a released version, or Unreleased", () => {
    const versions = changelogVersions();
    const bad = DEPRECATIONS.filter(
      (d) => d.since !== "Unreleased" && !versions.has(d.since)
    ).map((d) => `${d.code}: since ${d.since} is no CHANGELOG.md heading`);
    expect(bad).toEqual([]);
  });

  it("removes each one in a major still ahead", () => {
    const bad: string[] = [];
    for (const d of DEPRECATIONS) {
      if (!/^\d+\.0\.0$/.test(d.removeIn)) {
        bad.push(`${d.code}: removeIn ${d.removeIn} is not a major`);
      } else if (major(d.removeIn) <= major(coreVersion)) {
        bad.push(
          `${d.code} (${d.name}) is past its removal version: ${d.removeIn}, and the packages are at ${coreVersion}`
        );
      }
    }
    expect(bad).toEqual([]);
  });

  it("never repeats a code, nor reuses a removed one", () => {
    const codes = DEPRECATIONS.map((d) => d.code);
    expect(codes.every((c) => /^INTELLIGO_DEP\d{4}$/.test(c))).toBe(true);
    expect(new Set(codes).size).toBe(codes.length);
    expect(codes.filter((c) => REMOVED_CODES.includes(c))).toEqual([]);
  });

  it("warns at runtime for each one, under its code, with its removal and replacement", () => {
    const sources = publishedSources()
      .map(({ file }) => readFileSync(file, "utf8"))
      .join("\n");
    const bad: string[] = [];
    for (const d of DEPRECATIONS) {
      const calls = [
        ...sources.matchAll(
          new RegExp(
            `warnDeprecated\\(\\s*"${d.code}"\\s*,\\s*"((?:[^"\\\\]|\\\\.)*)"`,
            "g"
          )
        ),
      ];
      if (calls.length === 0) {
        bad.push(
          `${d.code} (${d.name}) has no warnDeprecated("${d.code}", "…") call`
        );
      }
      // The logged message says what the register says, as the tag does.
      const replacement = d.use.match(/[A-Za-z_$][\w$]*/)?.[0];
      for (const [, message] of calls) {
        if (!new RegExp(`\\bremoved in ${d.removeIn}\\b`, "i").test(message!)) {
          bad.push(
            `${d.code}: its warning does not say "removed in ${d.removeIn}"`
          );
        }
        if (replacement && !new RegExp(`\\b${replacement}\\b`).test(message!)) {
          bad.push(`${d.code}: its warning does not name ${replacement}`);
        }
      }
    }
    expect(bad).toEqual([]);
  });

  it("lists every registry item whose source uses a deprecated name", () => {
    const owners = itemsByFile();
    const files = walk(path.join(REGISTRY_DIR, "base"), (name) =>
      /\.tsx?$/.test(name)
    );
    const unlisted: string[] = [];
    for (const file of files) {
      const source = readFileSync(file, "utf8");
      const items = owners.get(path.relative(REGISTRY_DIR, file)) ?? [];
      for (const entry of DEPRECATIONS) {
        for (const line of uses(entry, source)) {
          if (items.some((item) => entry.items?.includes(item))) continue;
          unlisted.push(
            `${path.relative(ROOT, file)}:${line} uses ${entry.name} (${entry.code}); list its item (${items.join(", ") || "none"}) on the entry`
          );
        }
      }
    }
    expect(unlisted).toEqual([]);
  });
});
