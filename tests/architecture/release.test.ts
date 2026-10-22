/**
 * A release publishes under the dist-tag its version implies, and never
 * moves a tag backwards.
 *
 * scripts/release-version.mjs is what the release workflow runs: the
 * offline resolve on every run, the npm guard before a publish.
 * scripts/npm-dist-tags.mjs is the tag moves a maintainer's
 * npm-maintain.mjs makes, which the publish identity cannot. The version
 * ordering both rely on is tested in hosted-registry.test.ts.
 */

import { describe, expect, it } from "vitest";
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

import { ROOT } from "./tree";

type Manifest = { dir: string; version: string; private?: boolean };
type Resolved = { version: string; distTag: string; prerelease: boolean };
type Packument = {
  "dist-tags"?: Record<string, string>;
  versions?: Record<string, unknown>;
};
type ReleaseVersionModule = {
  resolveVersion: (input: {
    manifests: Manifest[];
    ref?: string;
    branch?: string;
  }) => Resolved;
  guardDistTag: (input: {
    version: string;
    distTag: string;
    packument: Packument;
  }) => { ok: boolean; reason: string };
};

const SCRIPT = path.join(ROOT, "scripts/release-version.mjs");
const { resolveVersion, guardDistTag } = (await import(
  SCRIPT
)) as ReleaseVersionModule;
const { planDistTags } = (await import(
  path.join(ROOT, "scripts/npm-dist-tags.mjs")
)) as {
  planDistTags: (input: {
    name: string;
    tags: Record<string, string>;
    retired?: string[];
  }) => string[][];
};

const treeVersion = (
  JSON.parse(
    readFileSync(path.join(ROOT, "packages/core/package.json"), "utf8")
  ) as { version: string }
).version;

function manifests(version: string, others: Manifest[] = []): Manifest[] {
  return [
    { dir: "packages/core/", version },
    { dir: "packages/auth/", version },
    ...others,
  ];
}

describe("resolveVersion", () => {
  it("publishes a plain version under latest", () => {
    expect(resolveVersion({ manifests: manifests("1.2.4") })).toEqual({
      version: "1.2.4",
      distTag: "latest",
      prerelease: false,
    });
  });

  it("publishes a prerelease under its id", () => {
    expect(resolveVersion({ manifests: manifests("1.3.0-next.0") })).toEqual({
      version: "1.3.0-next.0",
      distTag: "next",
      prerelease: true,
    });
  });

  it("refuses a prerelease id npm would read as a range", () => {
    expect(() => resolveVersion({ manifests: manifests("1.3.0-1") })).toThrow(
      /dist-tag "1"/
    );
  });

  it("refuses manifests that disagree, but not a private one", () => {
    expect(() =>
      resolveVersion({
        manifests: manifests("1.2.4", [
          { dir: "packages/chat/", version: "1.2.3" },
        ]),
      })
    ).toThrow("packages/chat/ is 1.2.3 but packages/core is 1.2.4");
    expect(
      resolveVersion({
        manifests: manifests("1.2.4", [
          { dir: "packages/registry/", version: "0.0.0", private: true },
        ]),
      }).version
    ).toBe("1.2.4");
  });

  it("holds a pushed tag to the manifests' version", () => {
    expect(
      resolveVersion({ manifests: manifests("1.2.4"), ref: "refs/tags/v1.2.4" })
        .version
    ).toBe("1.2.4");
    expect(() =>
      resolveVersion({ manifests: manifests("1.2.4"), ref: "refs/tags/v1.2.3" })
    ).toThrow("the tag is v1.2.3 but the manifests are 1.2.4");
    expect(
      resolveVersion({ manifests: manifests("1.2.4"), ref: "refs/heads/main" })
        .version
    ).toBe("1.2.4");
  });

  it.each([
    ["1.2.5", "release/1.2", true],
    ["1.3.0-next.0", "release/1.2", false],
    ["1.3.0", "release/1.2", false],
    ["1.12.0", "release/1.1", false],
    ["1.3.0-next.0", "", true],
    ["1.3.0-next.0", "main", true],
  ])("%s on %s: ok=%s", (version, branch, ok) => {
    const resolve = () =>
      resolveVersion({ manifests: manifests(version), branch });
    if (ok) expect(resolve().version).toBe(version);
    else expect(resolve).toThrow(`${branch} carries`);
  });
});

describe("guardDistTag", () => {
  const cases: [string, string, Packument, boolean][] = [
    // A non-release run: the version is the one npm already has.
    [
      "1.2.4",
      "latest",
      { "dist-tags": { latest: "1.2.4" }, versions: { "1.2.4": {} } },
      true,
    ],
    ["1.2.5", "latest", { "dist-tags": { latest: "1.2.4" } }, true],
    ["1.2.3", "latest", { "dist-tags": { latest: "1.2.4" } }, false],
    [
      "1.3.0-next.1",
      "next",
      { "dist-tags": { latest: "1.2.4", next: "1.3.0-next.2" } },
      false,
    ],
    [
      "1.3.0-next.2",
      "next",
      { "dist-tags": { latest: "1.2.4", next: "1.3.0-next.2" } },
      false,
    ],
    [
      "1.3.0-next.3",
      "next",
      { "dist-tags": { latest: "1.2.4", next: "1.3.0-next.2" } },
      true,
    ],
    ["1.3.0-next.0", "next", { "dist-tags": { latest: "1.3.0" } }, false],
    [
      "1.3.0",
      "latest",
      { "dist-tags": { latest: "1.2.4", next: "1.3.0-next.3" } },
      true,
    ],
    ["1.0.0", "latest", {}, true],
  ];

  it.each(cases)("%s under %s: ok=%s", (version, distTag, packument, ok) => {
    expect(guardDistTag({ version, distTag, packument }).ok).toBe(ok);
  });

  it("says which tag would move backwards", () => {
    expect(
      guardDistTag({
        version: "1.2.3",
        distTag: "latest",
        packument: { "dist-tags": { latest: "1.2.4" } },
      }).reason
    ).toBe("1.2.3 is below latest (1.2.4); npm would move latest backwards");
  });
});

describe("planDistTags", () => {
  const name = "@intelligo-dev/core";

  it("moves next up to latest after a promotion", () => {
    expect(
      planDistTags({ name, tags: { latest: "1.3.0", next: "1.3.0-next.4" } })
    ).toEqual([["dist-tag", "add", `${name}@1.3.0`, "next"]]);
  });

  it("leaves a next that leads latest, or no next at all", () => {
    expect(
      planDistTags({ name, tags: { latest: "1.3.0", next: "1.4.0-next.0" } })
    ).toEqual([]);
    expect(planDistTags({ name, tags: { latest: "1.3.0" } })).toEqual([]);
  });

  it("removes a retired tag that is present", () => {
    expect(
      planDistTags({
        name,
        tags: { latest: "1.2.4", beta: "1.0.0-beta.15" },
        retired: ["beta"],
      })
    ).toEqual([["dist-tag", "rm", name, "beta"]]);
    expect(
      planDistTags({ name, tags: { latest: "1.2.4" }, retired: ["beta"] })
    ).toEqual([]);
  });

  it("never moves latest", () => {
    const plans = [
      planDistTags({ name, tags: { latest: "1.3.0", next: "1.2.0-next.1" } }),
      planDistTags({ name, tags: { latest: "1.3.0" }, retired: ["latest"] }),
    ].flat();
    for (const args of plans) expect(args.at(-1)).not.toBe("latest");
    expect(
      plans.some((args) => args.includes("rm") && args.includes("latest"))
    ).toBe(false);
  });
});

describe("the script, as the workflow runs it", () => {
  function run(env: Record<string, string>, args: string[] = []) {
    try {
      const stdout = execFileSync("node", [SCRIPT, ...args], {
        env: {
          ...process.env,
          GITHUB_OUTPUT: "",
          VERSION: "",
          DIST_TAG: "",
          BRANCH: "",
          ...env,
        },
        encoding: "utf8",
        stdio: ["ignore", "pipe", "pipe"],
      });
      return { status: 0, stdout, stderr: "" };
    } catch (error) {
      const e = error as { status: number; stdout: string; stderr: string };
      return { status: e.status, stdout: e.stdout, stderr: e.stderr };
    }
  }

  it("writes the outputs for a pushed tag of the tree's version", () => {
    const dir = mkdtempSync(path.join(tmpdir(), "release-version-"));
    try {
      const output = path.join(dir, "output");
      const result = run({
        GITHUB_OUTPUT: output,
        GITHUB_REF: `refs/tags/v${treeVersion}`,
      });
      expect(result.status).toBe(0);
      const prerelease = treeVersion.includes("-");
      expect(readFileSync(output, "utf8")).toBe(
        [
          `version=${treeVersion}`,
          `dist-tag=${prerelease ? /-([^.]+)/.exec(treeVersion)![1] : "latest"}`,
          `prerelease=${prerelease}`,
          "",
        ].join("\n")
      );
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it("refuses a publish that would move a tag backwards", () => {
    const result = run(
      {
        VERSION: "1.2.3",
        DIST_TAG: "latest",
        INTELLIGO_NPM_PACKUMENT: JSON.stringify({
          "dist-tags": { latest: "1.2.4" },
          versions: { "1.2.4": {} },
        }),
      },
      ["--guard"]
    );
    expect(result.status).toBe(1);
    expect(result.stderr).toContain("1.2.3 is below latest (1.2.4)");
  });
});
