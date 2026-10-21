/**
 * Every GitHub workflow keeps the supply-chain rules it is scored on.
 *
 * 1. A remote action is used by commit SHA, with its version tag in a
 *    comment Dependabot keeps current: a tag can be moved to other code.
 * 2. The top-level token is read-only: `{}`, `read-all`, or scopes that
 *    are each `read` or `none`.
 * 3. A write scope is granted only in a job's own `permissions:`, so it
 *    reaches the one job that needs it and no other.
 * 4. Every checkout sets `persist-credentials: false`, so no later step
 *    finds the token in .git/config.
 * 5. No `ref:`, `repository:` or `uses:`, and no other value but an `if:`
 *    condition or a concurrency group (an env var a script checks out),
 *    takes the head of the triggering event (a workflow_run, a pull
 *    request's head, head_ref): that is code the event's author chose, run
 *    with this workflow's token. A script inside `run: |` is not read, so
 *    the env var that feeds it is where the rule fires.
 * 6. No workflow triggers on pull_request_target, which runs a fork's
 *    pull request with the base repository's token and secrets.
 *
 * Line-based, like ci-suites.test.ts: the rules read a handful of shapes
 * and need no YAML parser. Comments and block scalars (`run: |`) are
 * skipped, so a script or a comment that says `write` cannot fire.
 */

import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";

import { ROOT } from "./tree";

const WORKFLOWS_DIR = path.join(ROOT, ".github/workflows");

/** Findings a workflow still carries on purpose, as `<file>: <rule>`. */
const ALLOWED = ["release.yml: ref from workflow_run"];

/** The scopes GitHub's `permissions:` accepts. */
const SCOPE =
  "actions|attestations|checks|contents|deployments|discussions|id-token|issues|models|packages|pages|pull-requests|repository-projects|security-events|statuses";
const WRITE_SCOPE = new RegExp(`^\\s+(?:${SCOPE}):\\s*write\\b`);
const READ_SCOPE = new RegExp(`^\\s*(?:${SCOPE}):\\s*(?:read|none)$`);

type Line = { n: number; indent: number; code: string; raw: string };

/** The line without its `#` comment; a `#` inside a quoted value stays. */
function stripComment(line: string): string {
  let quote: string | null = null;
  for (let i = 0; i < line.length; i++) {
    const c = line[i]!;
    if (quote) {
      if (c === quote) quote = null;
      continue;
    }
    const before = line.slice(0, i).trimEnd();
    if ((c === '"' || c === "'") && /(^|[:\-[,{])$/.test(before)) quote = c;
    else if (c === "#" && (i === 0 || /\s/.test(line[i - 1]!)))
      return line.slice(0, i).trimEnd();
  }
  return line.trimEnd();
}

/** The workflow's YAML lines: no blanks, no comments, no block scalars. */
function yamlLines(text: string): Line[] {
  const lines: Line[] = [];
  let scalarParent = -1;
  text.split("\n").forEach((raw, i) => {
    if (raw.trim() === "") return;
    const indent = raw.length - raw.trimStart().length;
    if (scalarParent >= 0) {
      if (indent > scalarParent) return;
      scalarParent = -1;
    }
    const code = stripComment(raw);
    if (code.trim() === "") return;
    const key = /^(\s*(?:-\s+)?)["']?[\w-]+["']?:\s*[|>][-+0-9]*$/.exec(code);
    if (key) scalarParent = key[1]!.length;
    lines.push({ n: i + 1, indent, code, raw });
  });
  return lines;
}

/** Each violation as `<file>:<line> <rule>`. */
function lintWorkflow(file: string, text: string): string[] {
  const found: string[] = [];
  const report = (line: Line, rule: string) =>
    found.push(`${file}:${line.n} ${rule}`);

  let section = "";
  let jobIdIndent = -1;
  let jobKeyIndent = -1;
  let topLevelPermissions = false;
  let permissions: { indent: number; jobLevel: boolean } | null = null;
  const items: { indent: number; checkout?: Line; persists: boolean }[] = [];
  const closeItems = (indent: number) => {
    while (items.length > 0 && items.at(-1)!.indent >= indent) {
      const item = items.pop()!;
      if (item.checkout && !item.persists)
        report(item.checkout, "checkout without persist-credentials: false");
    }
  };

  for (const line of yamlLines(text)) {
    const { code, indent } = line;

    if (permissions && indent <= permissions.indent) permissions = null;
    closeItems(indent);
    if (/^\s*-(\s|$)/.test(code)) items.push({ indent, persists: false });

    if (indent === 0) {
      section = /^["']?([\w-]+)["']?:/.exec(code)?.[1] ?? "";
      jobIdIndent = -1;
      jobKeyIndent = -1;
    } else if (section === "jobs") {
      if (jobIdIndent < 0) jobIdIndent = indent;
      else if (indent > jobIdIndent && jobKeyIndent < 0) jobKeyIndent = indent;
    }

    if (section === "on" && /\bpull_request_target\b/.test(code))
      report(line, "pull_request_target trigger");

    const grant = /^\s*permissions:\s*(.*)$/.exec(code);
    if (grant) {
      const value = grant[1]!.trim();
      const jobLevel = section === "jobs" && indent === jobKeyIndent;
      if (indent === 0) {
        topLevelPermissions = true;
        const readOnly =
          value === "" ||
          value === "read-all" ||
          /^\{\s*\}$/.test(value) ||
          (/^\{.*\}$/.test(value) &&
            value
              .slice(1, -1)
              .split(",")
              .every((scope) => READ_SCOPE.test(scope.trim())));
        if (!readOnly) report(line, "top-level permissions grant a write");
      } else if (value === "write-all") {
        report(line, "write-all");
      }
      if (value === "") permissions = { indent, jobLevel };
    } else if (permissions && !permissions.jobLevel) {
      if (permissions.indent === 0 && !READ_SCOPE.test(code))
        report(line, "top-level permissions grant a write");
    } else if (!permissions && WRITE_SCOPE.test(code)) {
      report(line, "write scope outside a job's permissions");
    }

    const uses = /^\s*(?:-\s+)?uses:\s*["']?([^\s"']+)/.exec(code)?.[1];
    if (uses && !uses.startsWith("./")) {
      if (!/@[0-9a-f]{40} # v\d/.test(line.raw))
        report(line, "action not pinned by commit SHA with its version");
      if (uses.startsWith("actions/checkout@") && items.length > 0)
        items.at(-1)!.checkout = line;
    }
    if (/^\s*persist-credentials:\s*false$/.test(code) && items.length > 0)
      items.at(-1)!.persists = true;

    const ref = /^\s*(?:-\s+)?(?:ref|repository|uses):\s*(.*)$/.exec(code)?.[1];
    if (ref?.includes("github.event.workflow_run."))
      report(line, "ref from workflow_run");
    if (ref?.includes("github.event.pull_request.head."))
      report(line, "ref from a pull request's head");
    if (ref && /\bgithub\.head_ref\b/.test(ref))
      report(line, "ref from head_ref");

    // The same value handed to a step any other way (an env var a script
    // checks out, an inline `run:`) reaches git all the same. `if:` only
    // decides whether a step runs, and a concurrency `group:` is a label.
    const value = /^\s*(?:-\s+)?["']?([\w-]+)["']?:\s*(.*)$/.exec(code);
    if (value && !/^(?:ref|repository|uses|if|group)$/.test(value[1]!)) {
      if (value[2]!.includes("github.event.workflow_run.head_"))
        report(line, "value from workflow_run's head");
      if (value[2]!.includes("github.event.pull_request.head."))
        report(line, "value from a pull request's head");
      if (/\bgithub\.head_ref\b/.test(value[2]!))
        report(line, "value from head_ref");
    }
  }
  closeItems(0);

  if (!topLevelPermissions) found.push(`${file}:1 no top-level permissions`);
  return found;
}

const workflows = readdirSync(WORKFLOWS_DIR)
  .filter((name) => /\.ya?ml$/.test(name))
  .sort()
  .map((name) => ({
    name,
    text: readFileSync(path.join(WORKFLOWS_DIR, name), "utf8"),
  }));

/** A finding without its line number, as ALLOWED lists it. */
const withoutLine = (finding: string) => finding.replace(/:\d+ /, ": ");

describe("workflow hygiene", () => {
  const findings = workflows.flatMap(({ name, text }) =>
    lintWorkflow(name, text)
  );

  it("finds the workflows and their uses lines", () => {
    expect(workflows.length).toBeGreaterThanOrEqual(2);
    const uses = workflows.flatMap(({ text }) =>
      yamlLines(text).filter((line) => /^\s*(?:-\s+)?uses:/.test(line.code))
    );
    expect(uses.length).toBeGreaterThanOrEqual(10);
  });

  it("every workflow keeps the rules", () => {
    expect(
      findings.filter((finding) => !ALLOWED.includes(withoutLine(finding)))
    ).toEqual([]);
  });

  it("every allowed finding still occurs", () => {
    const stale = ALLOWED.filter(
      (entry) => !findings.map(withoutLine).includes(entry)
    );
    expect(stale).toEqual([]);
  });
});

describe("lintWorkflow", () => {
  const SHA = "3d3c42e5aac5ba805825da76410c181273ba90b1";
  const workflow = (body: string) =>
    `name: X\non: push\npermissions:\n  contents: read\njobs:\n  build:\n    runs-on: ubuntu-latest\n${body}`;
  const steps = (...lines: string[]) =>
    workflow(`    steps:\n${lines.map((l) => `      ${l}`).join("\n")}\n`);

  it("passes a workflow that keeps every rule", () => {
    const text = workflow(
      [
        "    permissions:",
        "      contents: write # the tag",
        "    steps:",
        `      - uses: actions/checkout@${SHA} # v7.0.1`,
        "        with:",
        "          persist-credentials: false",
        "      - uses: ./.github/actions/local",
        "",
      ].join("\n")
    );
    expect(lintWorkflow("ok.yml", text)).toEqual([]);
  });

  it("fires on an action used by tag", () => {
    expect(
      lintWorkflow("w.yml", steps("- uses: pnpm/action-setup@v6"))
    ).toEqual(["w.yml:9 action not pinned by commit SHA with its version"]);
  });

  it("fires on a SHA without its version comment", () => {
    expect(
      lintWorkflow("w.yml", steps(`- uses: pnpm/action-setup@${SHA}`))
    ).toEqual(["w.yml:9 action not pinned by commit SHA with its version"]);
  });

  it("fires on a write scope at the top level", () => {
    const text = workflow("    steps: []\n").replace(
      "contents: read",
      "contents: write"
    );
    expect(lintWorkflow("w.yml", text)).toEqual([
      "w.yml:4 top-level permissions grant a write",
    ]);
  });

  it("fires on write-all at the top level, and on no top-level permissions", () => {
    expect(
      lintWorkflow("a.yml", "on: push\npermissions: write-all\njobs: {}\n")
    ).toEqual(["a.yml:2 top-level permissions grant a write"]);
    expect(lintWorkflow("b.yml", "on: push\njobs: {}\n")).toEqual([
      "b.yml:1 no top-level permissions",
    ]);
  });

  it("fires on a write scope outside a job's permissions", () => {
    const text = workflow(
      "    steps:\n      - uses: ./x\n        with:\n          contents: write\n"
    );
    expect(lintWorkflow("w.yml", text)).toEqual([
      "w.yml:11 write scope outside a job's permissions",
    ]);
  });

  it("stays quiet on a comment or a script that says write", () => {
    const text = workflow(
      [
        "    # contents: write would be wrong here",
        "    steps:",
        "      - run: |",
        "          echo 'contents: write'",
        "          # uses: someone/else@v1",
        "        env:",
        "          NOTE: read # only a write scope may not appear here",
        "",
      ].join("\n")
    );
    expect(lintWorkflow("w.yml", text)).toEqual([]);
  });

  it("fires on a checkout that keeps the token", () => {
    expect(
      lintWorkflow("w.yml", steps(`- uses: actions/checkout@${SHA} # v7.0.1`))
    ).toEqual(["w.yml:9 checkout without persist-credentials: false"]);
  });

  it("fires on a ref taken from the triggering event", () => {
    const text = steps(
      `- uses: actions/checkout@${SHA} # v7.0.1`,
      "  with:",
      "    ref: ${{ github.event.workflow_run.head_sha || github.sha }}",
      "    persist-credentials: false",
      `- uses: actions/checkout@${SHA} # v7.0.1`,
      "  with:",
      "    ref: ${{ github.event.pull_request.head.sha }}",
      "    persist-credentials: false"
    );
    expect(lintWorkflow("w.yml", text)).toEqual([
      "w.yml:11 ref from workflow_run",
      "w.yml:15 ref from a pull request's head",
    ]);
  });

  it("fires on the event's head handed to a step as a value", () => {
    const text = steps(
      "- if: github.event.workflow_run.head_branch == 'main'",
      "  env:",
      "    HEAD_SHA: ${{ github.event.workflow_run.head_sha }}",
      "    BRANCH: ${{ github.head_ref }}",
      "    CONCLUSION: ${{ github.event.workflow_run.conclusion }}",
      "  run: git checkout ${{ github.event.pull_request.head.sha }}"
    );
    expect(lintWorkflow("w.yml", text)).toEqual([
      "w.yml:11 value from workflow_run's head",
      "w.yml:12 value from head_ref",
      "w.yml:14 value from a pull request's head",
    ]);
  });

  it("fires on a pull_request_target trigger", () => {
    const text = workflow("    steps: []\n").replace(
      "on: push",
      "on:\n  pull_request_target:\n    branches: [main]"
    );
    expect(lintWorkflow("w.yml", text)).toEqual([
      "w.yml:3 pull_request_target trigger",
    ]);
  });
});
