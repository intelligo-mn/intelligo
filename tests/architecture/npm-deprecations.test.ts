/**
 * scripts/npm-deprecations.json is what a maintainer's npm-maintain.mjs
 * applies to the registry, where a mistake reaches every install: a
 * deprecated current release warns everyone who installs it.
 *
 * The versions a security advisory affects are deprecated per package,
 * below the first version it does not affect, and the message leads to
 * the advisories. That version may be one still being released:
 * npm-maintain.mjs deprecates nothing for a package until npm has it,
 * so a bare install is never left with only deprecated versions.
 */

import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";

import { compareVersions } from "../../apps/website/scripts/registry-release.mjs";
import { FOLDED_PACKAGES, PACKAGES_DIR, ROOT } from "./tree";

type Deprecations = {
  retiredTags?: string[];
  vulnerable?: { message: string; fixedIn: Record<string, string> };
  deprecations: { name: string; message: string }[];
};

const file = JSON.parse(
  readFileSync(path.join(ROOT, "scripts/npm-deprecations.json"), "utf8")
) as Deprecations;

const published = new Map(
  readdirSync(PACKAGES_DIR).flatMap((dir) => {
    try {
      const pkg = JSON.parse(
        readFileSync(path.join(PACKAGES_DIR, dir, "package.json"), "utf8")
      ) as { name: string; version: string; private?: boolean };
      return pkg.private ? [] : [[pkg.name, pkg.version] as const];
    } catch {
      return [];
    }
  })
);

describe("scripts/npm-deprecations.json", () => {
  it("deprecates whole names only for packages the framework no longer publishes", () => {
    for (const { name } of file.deprecations) {
      expect(published.has(name), name).toBe(false);
      if (name in FOLDED_PACKAGES) continue;
      expect(name).toBe("@intelligo-dev/ui");
    }
  });

  it("deprecates vulnerable versions of published packages, up to at most the next patch", () => {
    const vulnerable = file.vulnerable;
    if (!vulnerable) return;
    for (const [name, fixedIn] of Object.entries(vulnerable.fixedIn)) {
      const current = published.get(name);
      expect(current, `${name} is not a published package`).toBeDefined();
      expect(fixedIn, name).toMatch(/^\d+\.\d+\.\d+$/);
      const [major, minor, patch] = current!
        .replace(/-.*$/, "")
        .split(".")
        .map(Number);
      expect(
        compareVersions(fixedIn, `${major}.${minor}.${patch! + 1}`),
        `${name}: fixedIn ${fixedIn} is past the next patch of ${current}`
      ).toBeLessThanOrEqual(0);
    }
  });

  it("points a vulnerable version at the published advisories", () => {
    if (!file.vulnerable) return;
    expect(file.vulnerable.message).toContain(
      "https://github.com/intelligo-dev/intelligo/security/advisories"
    );
  });
});
