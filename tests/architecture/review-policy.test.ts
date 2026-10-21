/**
 * The review policy.
 *
 * .github/CODEOWNERS marks the high-risk source: the paths where a
 * person reads every changed line before it merges.
 * A pattern that names a path no longer in the tree protects nothing
 * and says it does, so every pattern must match a tracked file; the
 * paths that must stay high-risk, and the ones that must not, are
 * listed here so a moved file or a widened pattern shows up as a
 * failure. A release commit bumps every package manifest, so no
 * manifest may fall in the section.
 */

import { describe, expect, it } from "vitest";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";

import {
  highRiskPatterns,
  isHighRisk,
  matchesPattern,
} from "../../scripts/review-policy.mjs";
import { ROOT } from "./tree";

const codeowners = readFileSync(path.join(ROOT, ".github/CODEOWNERS"), "utf8");
const patterns: string[] = highRiskPatterns(codeowners);

const tracked = execFileSync("git", ["ls-files"], {
  cwd: ROOT,
  encoding: "utf8",
})
  .split("\n")
  .filter(Boolean);

describe("CODEOWNERS pattern matching", () => {
  it("anchors a leading slash and treats a trailing slash as a directory", () => {
    expect(
      matchesPattern("/packages/auth/src/", "packages/auth/src/server.ts")
    ).toBe(true);
    expect(
      matchesPattern("/packages/auth/src/", "packages/authx/src/a.ts")
    ).toBe(false);
    expect(
      matchesPattern("/packages/auth/src/", "packages/auth/README.md")
    ).toBe(false);
    expect(
      matchesPattern("/packages/auth/src/", "x/packages/auth/src/a.ts")
    ).toBe(false);
  });

  it("keeps a single star inside one segment and lets a double star cross", () => {
    const actions = "/packages/registry/base/*/actions.ts";
    expect(
      matchesPattern(actions, "packages/registry/base/chat/actions.ts")
    ).toBe(true);
    expect(
      matchesPattern(actions, "packages/registry/base/chat/lib/actions.ts")
    ).toBe(false);
    expect(
      matchesPattern(
        "/packages/registry/base/**/actions.ts",
        "packages/registry/base/chat/lib/actions.ts"
      )
    ).toBe(true);
  });

  it("matches a file pattern exactly, not as a prefix", () => {
    expect(
      matchesPattern(
        "/packages/core/src/prompt.ts",
        "packages/core/src/prompt.ts"
      )
    ).toBe(true);
    expect(
      matchesPattern(
        "/packages/core/src/prompt.ts",
        "packages/core/src/prompt.test.ts"
      )
    ).toBe(false);
  });

  it("refuses a file with no high-risk section", () => {
    expect(() => highRiskPatterns("* @someone\n")).toThrow(/high-risk/);
  });
});

describe("the high-risk section of CODEOWNERS", () => {
  it("has patterns", () => {
    expect(patterns.length).toBeGreaterThan(0);
  });

  it.each(patterns)("%s matches a tracked file", (pattern) => {
    expect(tracked.some((file) => matchesPattern(pattern, file))).toBe(true);
  });

  it.each([
    "packages/auth/src/server.ts",
    "packages/billing/src/webhook-route.ts",
    "packages/executions/src/lifecycle.ts",
    "packages/core/src/db/migrations/meta/_journal.json",
    "packages/core/src/prompt.ts",
    "packages/registry/base/chat/route.ts",
    "packages/registry/base/chat/actions.ts",
    "packages/registry/base/payment-poll/routes/settle.ts",
    "packages/cli/templates/app-scaffold/stripe-webhook-route.ts.tpl",
    "apps/app/app/api/webhooks/stripe/route.ts",
    "apps/app/actions/team.ts",
    "apps/app/proxy.ts",
    "packages/registry/base/admin-console/lib/admin-page.ts",
    "packages/registry/base/admin-console/layout.tsx",
    "apps/app/lib/admin-page.ts",
    "apps/app/app/[locale]/admin/layout.tsx",
    ".github/workflows/release.yml",
    "scripts/release-notes.mjs",
  ])("covers %s", (file) => {
    expect(tracked).toContain(file);
    expect(isHighRisk(patterns, file)).toBe(true);
  });

  it.each([
    "README.md",
    "CHANGELOG.md",
    "packages/auth/README.md",
    "apps/website/src/content/docs/guides/deploy.md",
    "packages/registry/base/ui/button/button.tsx",
    "packages/jobs/src/index.ts",
    "apps/app/lib/admin-nav.ts",
  ])("leaves out %s", (file) => {
    expect(tracked).toContain(file);
    expect(isHighRisk(patterns, file)).toBe(false);
  });

  it("leaves out every package manifest, which a release bumps", () => {
    const manifests = tracked.filter((file) =>
      /^packages\/[^/]+\/package\.json$/.test(file)
    );
    expect(manifests.length).toBeGreaterThan(0);
    expect(manifests.filter((file) => isHighRisk(patterns, file))).toEqual([]);
  });
});
