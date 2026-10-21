/**
 * The release workflows keep the gates a release depends on: release.yml
 * publishes, release-verify.yml holds the checks it and a release pull
 * request's dry run (release-dry-run.yml) share.
 *
 * Text-based, like ci-suites.test.ts: each rule reads one job or one
 * step of a workflow and needs no YAML parser.
 */

import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";

import { ROOT } from "./tree";

function workflow(name: string): string {
  return readFileSync(path.join(ROOT, ".github/workflows", name), "utf8");
}

/** A job's lines, from its `  <job>:` key to the next job's. */
function job(text: string, name: string): string {
  const lines = text.split("\n");
  const start = lines.indexOf(`  ${name}:`);
  if (start === -1) throw new Error(`no job ${name}`);
  const end = lines.findIndex((l, i) => i > start && /^ {2}[\w-]+:/.test(l));
  return lines.slice(start, end === -1 ? undefined : end).join("\n");
}

/** A job's `if:` condition, folded onto one line. */
function jobIf(block: string): string {
  const match = /^ {4}if: (?:>-\n((?: {6}.*\n?)+)|(.*))$/m.exec(block);
  if (!match) throw new Error("the job has no if:");
  return (match[1] ?? match[2]!).replace(/\s+/g, " ").trim();
}

/** A step's lines, from its `- name: <name>` to the next step or job. */
function step(text: string, name: string): string {
  const lines = text.split("\n");
  const start = lines.findIndex((l) => l.trim() === `- name: ${name}`);
  if (start === -1) throw new Error(`no step ${name}`);
  const indent = lines[start]!.indexOf("-");
  const end = lines.findIndex((l, i) => {
    if (i <= start || l.trim() === "") return false;
    const at = l.length - l.trimStart().length;
    return at < indent || (at === indent && l.trimStart().startsWith("- "));
  });
  return lines.slice(start, end === -1 ? undefined : end).join("\n");
}

/** Every `run:` script in the workflow, inline or block. */
function runScripts(text: string): string[] {
  const scripts: string[] = [];
  const lines = text.split("\n");
  lines.forEach((line, i) => {
    const match = /^(\s*)(?:- )?run: (.*)$/.exec(line);
    if (!match) return;
    if (!/^[|>]/.test(match[2]!)) {
      scripts.push(match[2]!);
      return;
    }
    const body: string[] = [];
    for (const next of lines.slice(i + 1)) {
      if (next.trim() !== "" && next.search(/\S/) <= match[1]!.length) break;
      body.push(next);
    }
    scripts.push(body.join("\n"));
  });
  return scripts;
}

const release = workflow("release.yml");
const verify = workflow("release-verify.yml");
const dryRun = workflow("release-dry-run.yml");
const WORKFLOWS = readdirSync(path.join(ROOT, ".github/workflows"))
  .filter((name) => /\.ya?ml$/.test(name))
  .map((name) => ({ name, text: workflow(name) }));

describe("release-verify.yml", () => {
  it("resolves the version with scripts/release-version.mjs", () => {
    expect(step(verify, "Resolve the version")).toContain(
      "node scripts/release-version.mjs"
    );
    for (const { text } of WORKFLOWS) expect(text).not.toMatch(/dist_tag=/);
  });

  it("guards the dist-tags only in a run about to publish", () => {
    const guard = step(verify, "Would this move a dist-tag backwards?");
    expect(guard).toContain("if: steps.check.outputs.published != 'true'");
    expect(guard).toContain("node scripts/release-version.mjs --guard");
    expect(verify.indexOf("- name: Would this move")).toBeGreaterThan(
      verify.indexOf("- name: Already on npm?")
    );
  });

  it("counts a release's migrations from its release commit", () => {
    const check = step(verify, "Do the release notes name its migrations?");
    expect(check).toContain("if: steps.check.outputs.published != 'true'");
    expect(check).toContain("steps.check.outputs.release-sha");
    expect(check).toContain('--release-commit "$SHA"');
    expect(check).not.toContain("HEAD^");
  });

  it("finds the release commit on main's first-parent line", () => {
    expect(step(verify, "Already on npm?")).toContain(
      "git log -1 --first-parent --diff-merges=first-parent"
    );
  });

  it("checks out a release commit only to publish it", () => {
    const check = step(verify, "Already on npm?");
    const dryRunExit = check.indexOf('if [ "$MODE" = "dry-run" ]');
    expect(dryRunExit).toBeGreaterThan(-1);
    expect(check.indexOf("exit 0", dryRunExit)).toBeLessThan(
      check.indexOf('git checkout --quiet "$release"')
    );
    expect(step(verify, "Check out the commit CI passed")).toContain(
      "if: inputs.mode == 'publish' && inputs.head-sha != ''"
    );
  });

  it("runs every release check", () => {
    for (const check of [
      "node scripts/release-version.mjs",
      "node scripts/release-notes.mjs",
      "run: pnpm test",
      "- name: Packed-package compatibility",
      "pnpm app:regenerate --check",
      "scripts/consumer-smoke.sh",
      "- name: The hosted registry is this release's",
      "- name: Pack",
    ]) {
      expect(verify, check).toContain(check);
    }
  });

  it("ends a dry run with npm publish --dry-run, and uploads only to publish", () => {
    const publish = step(verify, "npm publish --dry-run");
    expect(publish).toContain("if: inputs.mode == 'dry-run'");
    expect(publish).toMatch(/npm publish .* --dry-run/);
    expect(verify).toMatch(
      /- if: inputs\.mode == 'publish'\n\s+uses: actions\/upload-artifact@/
    );
  });

  it("writes an SBOM per package from the packed tarballs, in a dry run too", () => {
    const sbom = step(verify, "SBOM");
    expect(sbom).toContain("if: steps.check.outputs.published != 'true'");
    expect(sbom).not.toContain("inputs.mode");
    expect(sbom).toContain(
      '"$RUNNER_TEMP/release/sbom" "$RUNNER_TEMP/release"'
    );
    expect(verify.indexOf("- name: SBOM")).toBeGreaterThan(
      verify.indexOf("- name: Pack")
    );
    expect(step(release, "GitHub release")).toContain(
      '"$RUNNER_TEMP"/release/sbom/*.cdx.json'
    );
  });

  it("copies npm's provenance onto the release after a publish", () => {
    const provenance = step(release, "Provenance");
    expect(provenance).toContain("if: needs.publish.result == 'success'");
    expect(provenance).toContain("https://slsa.dev/provenance/v1");
    expect(release.indexOf("- name: Provenance")).toBeLessThan(
      release.indexOf("- name: GitHub release")
    );
    const assets = step(release, "GitHub release");
    expect(assets).toContain(
      '"$RUNNER_TEMP"/release/provenance/*.sigstore.json'
    );
    expect(assets).toContain(
      '"$RUNNER_TEMP"/release/provenance/*.intoto.jsonl'
    );
  });

  it("takes the vocabulary as an optional secret", () => {
    expect(verify).toMatch(
      /secrets:\n\s+PRIVATE_VOCABULARY:\n\s+required: false/
    );
    expect(verify).toContain(
      "INTELLIGO_PRIVATE_VOCABULARY: ${{ secrets.PRIVATE_VOCABULARY }}"
    );
  });
});

describe("publishing", () => {
  it("holds the OIDC identity and the npm environment only in release.yml's publish job", () => {
    for (const { name, text } of WORKFLOWS) {
      const at = [...text.matchAll(/^\s+(id-token: write|environment: npm)/gm)];
      if (name !== "release.yml") {
        expect(at, name).toEqual([]);
        continue;
      }
      const publish = job(text, "publish");
      expect(publish).toContain("id-token: write");
      expect(publish).toContain("environment: npm");
      expect(at).toHaveLength(2);
    }
  });

  it("publishes for real only from release.yml", () => {
    for (const { name, text } of WORKFLOWS) {
      const real = text
        .split("\n")
        .filter((l) => /\bnpm publish\b/.test(l) && !/^\s*#/.test(l))
        .filter((l) => !l.includes("--dry-run"));
      if (name !== "release.yml") expect(real, name).toEqual([]);
    }
  });

  it("both callers grant read scopes and pass the vocabulary", () => {
    for (const [text, name] of [
      [job(release, "verify"), "release.yml"],
      [job(dryRun, "dry-run"), "release-dry-run.yml"],
    ] as const) {
      expect(text, name).toContain(
        "uses: ./.github/workflows/release-verify.yml"
      );
      expect(text, name).toMatch(
        /permissions:\n\s+contents: read\n\s+actions: read/
      );
      expect(text, name).toContain(
        "PRIVATE_VOCABULARY: ${{ secrets.PRIVATE_VOCABULARY }}"
      );
    }
    expect(job(release, "verify")).toContain("mode: publish");
    expect(job(dryRun, "dry-run")).toContain("mode: dry-run");
  });
});

describe("release-dry-run.yml", () => {
  it("runs on every pull request to main or a release branch", () => {
    expect(dryRun).toMatch(
      /^ {2}pull_request:\n {4}branches: \[main, "release\/\*\*"\]/m
    );
    expect(dryRun).not.toMatch(/paths(-ignore)?:/);
    expect(job(dryRun, "dry-run")).toContain("branch: ${{ github.base_ref }}");
  });

  it("dry-runs a manual run only for a version npm does not have", () => {
    const detect = step(dryRun, "Does it change the version?");
    expect(detect).toContain('npm view "@intelligo-dev/core@$head" version');
    expect(detect).not.toMatch(
      /!= "pull_request" \]; then\n\s*echo "release=true"/
    );
  });

  it("reports one check that fails unless detection and the dry run pass", () => {
    const result = job(dryRun, "result");
    expect(result).toContain("name: Release dry run");
    expect(jobIf(result)).toBe("always()");
    expect(result).toContain("needs.detect.result");
    expect(result).toContain("needs.dry-run.result");
  });
});

describe("release.yml", () => {
  it("hands event values to scripts through env, never inline", () => {
    for (const { text } of [{ text: release }, { text: verify }]) {
      for (const script of runScripts(text)) {
        expect(script).not.toMatch(/\$\{\{\s*github\.event\./);
      }
    }
  });

  it("deploys intelligo.dev only after a plain version's publish", () => {
    const condition = jobIf(job(release, "deploy-site"));
    expect(condition).toContain("needs.publish.result == 'success'");
    expect(condition).toContain("!contains(needs.verify.outputs.version, '-')");
  });
});

describe("the next channel", () => {
  it("says after a stable release when next is behind latest", () => {
    const check = step(release, "Is next behind latest?");
    expect(check).toContain(
      `if: "!contains(needs.verify.outputs.version, '-')"`
    );
    expect(check).toContain("continue-on-error: true");
    expect(check).toContain("node scripts/npm-maintain.mjs");
    expect(release).not.toContain("Is latest behind the prerelease?");
  });
});

describe("release/X.Y branches", () => {
  const ci = workflow("ci.yml");

  it("run CI on a push and a pull request", () => {
    expect(ci).toMatch(/^ {2}push:\n {4}branches: \[main, "release\/\*\*"\]/m);
    expect(ci).toMatch(
      /^ {2}pull_request:\n {4}branches: \[main, "release\/\*\*"\]/m
    );
  });

  it("publish from release.yml after their CI run", () => {
    expect(release).toMatch(
      /^ {2}workflow_run:\n(?: {4}.*\n)*? {4}branches: \[main, "release\/\*\*"\]/m
    );
    expect(job(release, "verify")).toContain(
      "branch: ${{ github.event.workflow_run.head_branch }}"
    );
  });

  it("are checked against the branch the release is on, never main by name", () => {
    for (const name of [
      "Check out the commit CI passed",
      "Resolve the version",
      "Already on npm?",
    ]) {
      const text = step(verify, name);
      expect(text, name).toContain(
        "BRANCH: ${{ steps.branch.outputs.branch }}"
      );
      expect(text, name).not.toMatch(/origin\/main|branch=main/);
    }
    expect(step(verify, "Already on npm?")).toContain('"origin/$BRANCH"');
    expect(step(verify, "Already on npm?")).toContain("branch=$BRANCH");
  });

  it("build a patch's pages from its tag, and warn until it is forward-ported", () => {
    const deploy = job(release, "deploy-site");
    expect(deploy).toMatch(/needs: \[verify, publish, release\]/);
    const pages = step(release, "Build the release's pages from its tag");
    expect(pages).toContain(
      "startsWith(needs.verify.outputs.branch, 'release/')"
    );
    expect(pages).toContain(
      'node apps/website/scripts/sync-framework.mjs --release "$VERSION"'
    );
    expect(deploy.indexOf("- name: Build the release's pages")).toBeLessThan(
      deploy.indexOf("name: Build and deploy")
    );
    const warning = step(release, "Forward-port");
    expect(warning).toContain(
      "startsWith(needs.verify.outputs.branch, 'release/')"
    );
    expect(warning).toContain("::warning title=Forward-port");
  });
});
