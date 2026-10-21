/**
 * The review policy.
 *
 * .github/CODEOWNERS marks the high-risk source: the paths where a
 * person reads every changed line before it merges (CONTRIBUTING.md).
 * A pattern that names a path no longer in the tree protects nothing
 * and says it does, so every pattern must match a tracked file; the
 * paths that must stay high-risk, and the ones that must not, are
 * listed here so a moved file or a widened pattern shows up as a
 * failure. A release commit bumps every package manifest, so no
 * manifest may fall in the section.
 *
 * A pull request that touches the section waits 24 hours on the
 * `review-window` status (scripts/review-window.mjs). Its decisions
 * are pure and tested here; its workflow is held to the shape that
 * keeps the status unforgeable: it runs main's files only, and only it
 * can reach the app key's environment.
 */

import { describe, expect, it } from "vitest";
import { execFileSync } from "node:child_process";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";

import {
  highRiskPatterns,
  isHighRisk,
  matchesPattern,
} from "../../scripts/review-policy.mjs";
import {
  CONTEXT,
  FILE_LIST_CAP,
  WINDOW_MS,
  clockStart,
  isRisky,
  sweep,
  windowState,
} from "../../scripts/review-window.mjs";
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

  it("covers the scripts that enforce it", () => {
    expect(isHighRisk(patterns, "scripts/review-policy.mjs")).toBe(true);
    expect(isHighRisk(patterns, "scripts/review-window.mjs")).toBe(true);
  });
});

describe("the review window", () => {
  const APP = "intelligo-review-window[bot]";
  const NOW = Date.parse("2026-10-22T12:00:00Z");
  const HOUR = 60 * 60 * 1000;
  const status = (state: string, at: number, login = APP) => ({
    context: CONTEXT,
    state,
    created_at: new Date(at).toISOString(),
    creator: { login },
  });

  it("holds a risky pull request for the whole window and no longer", () => {
    expect(
      windowState({
        risky: true,
        embargo: false,
        firstSeen: NOW - 24 * HOUR + 60_000,
        now: NOW,
      })
    ).toEqual({
      state: "pending",
      description: "High-risk paths: mergeable after 2026-10-22 12:01 UTC",
    });
    expect(
      windowState({
        risky: true,
        embargo: false,
        firstSeen: NOW - WINDOW_MS,
        now: NOW,
      }).state
    ).toBe("success");
  });

  it("passes a pull request that is not risky, or embargoed by an admin", () => {
    expect(
      windowState({ risky: false, embargo: false, firstSeen: NOW, now: NOW })
        .state
    ).toBe("success");
    expect(
      windowState({ risky: true, embargo: true, firstSeen: NOW, now: NOW })
    ).toEqual({ state: "success", description: "Embargoed security fix" });
  });

  it("starts the clock at the app's first pending status", () => {
    const statuses = [
      status("success", NOW - HOUR),
      status("pending", NOW - 3 * HOUR),
      status("pending", NOW - 5 * HOUR),
    ];
    expect(clockStart(statuses, APP, NOW)).toBe(NOW - 5 * HOUR);
  });

  it("starts the clock now when the commit was only ever passed", () => {
    // Seen as safe at t0, made risky (a `security` label) 48 hours later:
    // the earlier success is not a window that already ran.
    const statuses = [status("success", NOW - 48 * HOUR)];
    const firstSeen = clockStart(statuses, APP, NOW);
    expect(firstSeen).toBe(NOW);
    expect(
      windowState({ risky: true, embargo: false, firstSeen, now: NOW }).state
    ).toBe("pending");
  });

  it("ignores a status any other identity posted", () => {
    const statuses = [
      status("pending", NOW - 30 * HOUR, "github-actions[bot]"),
      { ...status("pending", NOW - 30 * HOUR), context: "ci" },
    ];
    expect(clockStart(statuses, APP, NOW)).toBe(NOW);
  });

  it("finds the risk in a path, either name of a rename, the label or the file cap", () => {
    const risky = (files: object[], labels: string[] = []) =>
      isRisky({ files, labels, patterns });
    expect(risky([{ filename: "packages/auth/src/server.ts" }])).toBe(true);
    expect(
      risky([
        {
          filename: "packages/jobs/src/moved.ts",
          previous_filename: "packages/auth/src/server.ts",
        },
      ])
    ).toBe(true);
    expect(risky([{ filename: "README.md" }], ["security"])).toBe(true);
    expect(
      risky([
        { filename: "packages/auth/README.md" },
        { filename: "apps/website/src/content/docs/guides/deploy.md" },
      ])
    ).toBe(false);
    expect(
      risky(
        Array.from({ length: FILE_LIST_CAP }, (_, i) => ({
          filename: `docs/${i}.md`,
        }))
      )
    ).toBe(true);
  });

  it("checks every pull request in a sweep when one of them fails", async () => {
    const checked: number[] = [];
    const reports: string[] = [];
    const failed = await sweep(
      [{ number: 1 }, { number: 2 }, { number: 3 }],
      async (pr: { number: number }) => {
        if (pr.number === 2) throw new Error("GET /pulls/2/files: 502");
        checked.push(pr.number);
      },
      (line: string) => reports.push(line)
    );
    expect(checked).toEqual([1, 3]);
    expect(failed).toBe(1);
    expect(reports).toEqual(["::error::#2: GET /pulls/2/files: 502"]);
  });
});

describe("the review-window workflow", () => {
  const WORKFLOWS = path.join(ROOT, ".github/workflows");
  const workflow = readFileSync(
    path.join(WORKFLOWS, "review-window.yml"),
    "utf8"
  );
  const code = workflow
    .split("\n")
    .filter((line) => !/^\s*#/.test(line))
    .join("\n");

  it("runs main's copy on pull requests into main", () => {
    expect(code).toMatch(/^ {2}pull_request_target:\n {4}branches: \[main\]$/m);
    expect(workflow).not.toContain("github.event.pull_request.head");
    expect(code).not.toMatch(/^\s*(?:ref|repository):/m);
    expect(code).toMatch(/^permissions: \{\}$/m);
  });

  it("pins every action by commit SHA", () => {
    const uses = [...code.matchAll(/^\s*(?:-\s+)?uses:\s*(\S+)/gm)].map(
      (m) => m[1]!
    );
    expect(uses.length).toBeGreaterThan(0);
    for (const action of uses) expect(action).toMatch(/@[0-9a-f]{40}$/);
  });

  it("reaches the app key only through the review-window environment", () => {
    expect(code).toMatch(/^ {4}environment: review-window$/m);
    expect(code).toContain("secrets.REVIEW_WINDOW_PRIVATE_KEY");
  });

  it("stays inactive until the app is set up", () => {
    expect(code).toMatch(
      /if: vars\.REVIEW_WINDOW_CLIENT_ID != ''\n {4}runs-on/
    );
    expect(code).toMatch(/if: vars\.REVIEW_WINDOW_CLIENT_ID == ''/);
  });

  it("is the only workflow that names the key or its environment", () => {
    const others = readdirSync(WORKFLOWS)
      .filter((name) => /\.ya?ml$/.test(name) && name !== "review-window.yml")
      .filter((name) =>
        /REVIEW_WINDOW_PRIVATE_KEY|review-window/.test(
          readFileSync(path.join(WORKFLOWS, name), "utf8")
        )
      );
    expect(others).toEqual([]);
  });
});

/**
 * The rulesets in .github/rulesets/ are what a maintainer imports into
 * the repository's settings. A required check that no workflow reports
 * blocks every merge, and a check a pull request runs that the ruleset
 * does not require can go red and merge anyway, so the two lists are
 * held equal here: every check a pull request into main runs is
 * required, or named below with the reason it is not.
 */
describe("the rulesets", () => {
  const RULESETS = path.join(ROOT, ".github/rulesets");
  const WORKFLOWS = path.join(ROOT, ".github/workflows");
  /** GitHub Actions' app id: a check reported by a workflow job. */
  const ACTIONS = 15368;

  const NOT_REQUIRED: Record<string, string> = {
    "Is this a release?":
      "a step of the release dry run, whose outcome `Release dry run` reports",
    "Release checks / Build, test and pack":
      "runs on a release pull request only; `Release dry run` reports it",
    "Review window":
      "the job that posts the review-window status; the app's status is the required check",
    "Review window (not set up)":
      "reports that the review window is not set up yet",
  };

  /**
   * While the review-window app does not exist, its id in main.json is 0.
   * The maintainer fills in the app's id before importing the ruleset and
   * empties this reason in the same change.
   */
  const REVIEW_WINDOW_APP_ID_PENDING =
    "the review-window GitHub App is created by a maintainer; its App ID replaces 0 in main.json before the ruleset is imported";

  type Check = { context: string; integration_id?: number };
  type Rule = { type: string; parameters?: Record<string, unknown> };
  type Ruleset = {
    name: string;
    target: string;
    bypass_actors: unknown[];
    rules: Rule[];
  };

  const ruleset = (name: string): Ruleset =>
    JSON.parse(readFileSync(path.join(RULESETS, name), "utf8")) as Ruleset;
  const requiredChecks = (set: Ruleset): Check[] =>
    (set.rules.find((r) => r.type === "required_status_checks")?.parameters
      ?.required_status_checks as Check[] | undefined) ?? [];

  const workflow = (file: string) =>
    readFileSync(path.join(WORKFLOWS, file), "utf8");

  /** The check names a workflow's jobs report, matrix and called workflows expanded. */
  function checkNames(file: string): string[] {
    const text = workflow(file);
    const jobs = text.slice(text.search(/^jobs:$/m));
    const blocks = jobs.split(/^ {2}(?=[\w-]+:$)/m).slice(1);
    return blocks.flatMap((block) => {
      const id = /^([\w-]+):$/m.exec(block)![1]!;
      const name = /^ {4}name: (.+)$/m.exec(block)?.[1] ?? id;
      const called = /^ {4}uses: \.\/\.github\/workflows\/([\w.-]+)$/m.exec(
        block
      )?.[1];
      if (called)
        return checkNames(called).map((inner) => `${name} / ${inner}`);
      const key = /\$\{\{ matrix\.(\w+) \}\}/.exec(name)?.[1];
      if (!key) return [name];
      const values = new RegExp(`^\\s+${key}: \\[(.+)\\]$`, "m")
        .exec(block)![1]!
        .split(",")
        .map((v) => v.trim());
      return values.map((v) => name.replace(/\$\{\{ matrix\.\w+ \}\}/, v));
    });
  }

  /** The branches a workflow's pull_request triggers name, or null. */
  function pullRequestBranches(file: string): string[] | null {
    const on =
      /^ {2}pull_request(?:_target)?:\n {4}branches: \[([^\]]*)\]/m.exec(
        workflow(file)
      );
    if (on) return on[1]!.split(",").map((b) => b.trim());
    return /^ {2}pull_request(?:_target)?:/m.test(workflow(file))
      ? ["*"]
      : null;
  }

  const workflowFiles = readdirSync(WORKFLOWS).filter((n) =>
    /\.ya?ml$/.test(n)
  );
  const checksOnPullRequestsInto = (branch: RegExp) =>
    new Set(
      workflowFiles
        .filter((file) =>
          (pullRequestBranches(file) ?? []).some(
            (b) => b === "*" || branch.test(b)
          )
        )
        .flatMap(checkNames)
    );

  const main = ruleset("main.json");
  const release = ruleset("release.json");
  const tags = ruleset("tags.json");
  const onMain = checksOnPullRequestsInto(/^main$/);

  it("requires every check a pull request into main reports, or says why not", () => {
    const required = new Set(requiredChecks(main).map((c) => c.context));
    const unaccounted = [...onMain].filter(
      (name) => !required.has(name) && !(name in NOT_REQUIRED)
    );
    expect(unaccounted).toEqual([]);
    for (const reason of Object.values(NOT_REQUIRED))
      expect(reason.length).toBeGreaterThan(0);
    expect(Object.keys(NOT_REQUIRED).filter((n) => !onMain.has(n))).toEqual([]);
  });

  it("requires only checks a pull request into main reports", () => {
    const missing = requiredChecks(main)
      .map((c) => c.context)
      .filter((name) => name !== CONTEXT && !onMain.has(name));
    expect(missing).toEqual([]);
    const releaseJobs = checkNames("release.yml");
    expect(
      requiredChecks(main).filter((c) => releaseJobs.includes(c.context))
    ).toEqual([]);
  });

  it("takes the workflow checks from GitHub Actions and review-window from its app", () => {
    for (const check of requiredChecks(main)) {
      if (check.context !== CONTEXT) {
        expect(check.integration_id, check.context).toBe(ACTIONS);
        continue;
      }
      expect(check.integration_id).not.toBe(ACTIONS);
      if (check.integration_id === 0) {
        expect(REVIEW_WINDOW_APP_ID_PENDING.length).toBeGreaterThan(0);
      } else {
        expect(Number.isInteger(check.integration_id)).toBe(true);
        expect(check.integration_id).toBeGreaterThan(0);
        expect(REVIEW_WINDOW_APP_ID_PENDING, "the id is set").toBe("");
      }
    }
    expect(requiredChecks(main).map((c) => c.context)).toContain(CONTEXT);
  });

  it("never asks for an up-to-date branch, which would restart the window", () => {
    const checks = main.rules.find((r) => r.type === "required_status_checks");
    expect(checks?.parameters?.strict_required_status_checks_policy).toBe(
      false
    );
  });

  it("lets nobody bypass them", () => {
    for (const set of [main, release, tags])
      expect(set.bypass_actors, set.name).toEqual([]);
  });

  it("keeps main and the release branches from deletion and force-push, merged by pull request", () => {
    for (const set of [main, release]) {
      const types = set.rules.map((r) => r.type);
      expect(types, set.name).toEqual(
        expect.arrayContaining(["deletion", "non_fast_forward", "pull_request"])
      );
    }
  });

  it("requires on release branches only checks that run there", () => {
    const onRelease = checksOnPullRequestsInto(/^release\//);
    expect(
      requiredChecks(release)
        .map((c) => c.context)
        .filter((name) => !onRelease.has(name))
    ).toEqual([]);
  });

  it("keeps a release tag from being moved or deleted", () => {
    expect(tags.target).toBe("tag");
    expect(tags.rules.map((r) => r.type).sort()).toEqual([
      "deletion",
      "update",
    ]);
  });

  it("marks the rulesets high-risk", () => {
    expect(isHighRisk(patterns, ".github/rulesets/main.json")).toBe(true);
  });
});
