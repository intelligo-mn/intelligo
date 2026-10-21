#!/usr/bin/env node
/**
 * What a release publishes: the version every published manifest
 * agrees on, the npm dist-tag it goes out under, and whether it is a
 * prerelease. The release workflow runs it twice: once offline on every
 * run, and once with --guard just before a publish.
 *
 *   node scripts/release-version.mjs           # version=, dist-tag=, prerelease=
 *   node scripts/release-version.mjs --guard   # would the publish move a tag backwards?
 *
 * The lines go to $GITHUB_OUTPUT when it is set, to stdout otherwise. A
 * pushed tag (GITHUB_REF=refs/tags/v…) must equal the manifests' version,
 * and a release/X.Y branch (BRANCH) carries X.Y.Z patches only.
 * The dist-tag is the prerelease id (`1.3.0-next.2` → `next`) or
 * `latest` for a plain version.
 *
 * --guard reads the version and dist-tag from VERSION and DIST_TAG when
 * both are set, from the manifests otherwise, and npm's abbreviated
 * packument of @intelligo-dev/core. INTELLIGO_NPM_PACKUMENT, a JSON
 * string, is read in place of the fetch (tests). It exits 1 with the
 * reason when the publish would move a dist-tag backwards, and when npm
 * cannot be read.
 */
import { appendFileSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import { compareVersions } from "../apps/website/scripts/registry-release.mjs";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const PACKUMENT_URL = "https://registry.npmjs.org/@intelligo-dev%2fcore";

/**
 * The version, dist-tag and prerelease flag of a release, from the
 * manifests under packages/ (`{ dir, version, private }`), the ref the
 * run was started from and the branch it releases from (empty is main).
 * Throws on a manifest that disagrees, a tag that names another version,
 * a prerelease id npm would read as a range, or a release/X.Y branch
 * carrying anything but an X.Y.Z patch. Nothing more is needed there:
 * --guard refuses a version below `latest`, so a release branch can only
 * patch the minor `latest` is on.
 */
export function resolveVersion({ manifests, ref = "", branch = "" }) {
  const core = manifests.find((m) => /^packages\/core\/?$/.test(m.dir));
  if (!core) throw new Error("no packages/core manifest");
  const version = core.version;
  for (const m of manifests) {
    if (m.private === true) continue;
    if (m.version !== version)
      throw new Error(
        `${m.dir} is ${m.version} but packages/core is ${version}`
      );
  }
  if (ref.startsWith("refs/tags/")) {
    const tag = ref.slice("refs/tags/".length);
    if (tag !== `v${version}`)
      throw new Error(`the tag is ${tag} but the manifests are ${version}`);
  }
  const prerelease = version.includes("-");
  const distTag = prerelease
    ? version.slice(version.indexOf("-") + 1).split(".")[0]
    : "latest";
  // npm refuses a dist-tag that parses as a version range.
  if (/^[0-9v]/.test(distTag))
    throw new Error(
      `${version} would publish under dist-tag "${distTag}"; use a named prerelease (1.3.0-next.0)`
    );
  const line = /^release\/(\d+\.\d+)$/.exec(branch);
  if (line && (prerelease || !version.startsWith(`${line[1]}.`)))
    throw new Error(
      `${branch} carries ${line[1]}.Z releases only, not ${version}`
    );
  return { version, distTag, prerelease };
}

/**
 * Whether publishing `version` under `distTag` keeps every tag moving
 * forward, against npm's packument (`dist-tags` and `versions`). A
 * version npm already has is fine: nothing will be published.
 */
export function guardDistTag({ version, distTag, packument }) {
  if (Object.hasOwn(packument.versions ?? {}, version))
    return { ok: true, reason: `${version} is already on npm` };
  const tags = packument["dist-tags"] ?? {};
  const latest = tags.latest;
  if (distTag === "latest") {
    if (latest && compareVersions(version, latest) < 0)
      return {
        ok: false,
        reason: `${version} is below latest (${latest}); npm would move latest backwards`,
      };
    return { ok: true, reason: `${version} moves latest forward` };
  }
  const current = tags[distTag];
  if (current && compareVersions(version, current) <= 0)
    return {
      ok: false,
      reason: `${version} is not above ${distTag} (${current}); npm would move ${distTag} backwards`,
    };
  if (latest && compareVersions(version, latest) <= 0)
    return {
      ok: false,
      reason: `${version} is not above latest (${latest}); a prerelease must come after the stable release it leads to`,
    };
  return { ok: true, reason: `${version} moves ${distTag} forward` };
}

/** Every packages/<dir>/package.json, as resolveVersion reads them. */
function readManifests() {
  return readdirSync(join(ROOT, "packages"), { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .flatMap((d) => {
      const dir = `packages/${d.name}/`;
      try {
        const pkg = JSON.parse(
          readFileSync(join(ROOT, dir, "package.json"), "utf8")
        );
        return [{ dir, version: pkg.version, private: pkg.private }];
      } catch {
        return [];
      }
    });
}

/** npm's abbreviated packument; a package npm has never seen is empty. */
async function readPackument() {
  const stub = process.env.INTELLIGO_NPM_PACKUMENT;
  if (stub) return JSON.parse(stub);
  let failure;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const response = await fetch(PACKUMENT_URL, {
        headers: { Accept: "application/vnd.npm.install-v1+json" },
        signal: AbortSignal.timeout(10_000),
      });
      if (response.status === 404) return {};
      if (!response.ok) throw new Error(`npm answered ${response.status}`);
      return await response.json();
    } catch (error) {
      failure = error;
    }
  }
  throw new Error(`could not read npm: ${failure.message}`);
}

async function main() {
  const { VERSION, DIST_TAG } = process.env;
  const resolved =
    process.argv.includes("--guard") && VERSION && DIST_TAG
      ? { version: VERSION, distTag: DIST_TAG }
      : resolveVersion({
          manifests: readManifests(),
          ref: process.env.GITHUB_REF,
          branch: process.env.BRANCH,
        });

  if (process.argv.includes("--guard")) {
    const verdict = guardDistTag({
      ...resolved,
      packument: await readPackument(),
    });
    if (!verdict.ok) throw new Error(verdict.reason);
    console.log(verdict.reason);
    return;
  }

  const lines = [
    `version=${resolved.version}`,
    `dist-tag=${resolved.distTag}`,
    `prerelease=${resolved.prerelease}`,
  ];
  if (process.env.GITHUB_OUTPUT) {
    appendFileSync(process.env.GITHUB_OUTPUT, lines.join("\n") + "\n");
    console.log(`${resolved.version} under dist-tag ${resolved.distTag}`);
  } else {
    console.log(lines.join("\n"));
  }
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  main().catch((error) => {
    console.error(`release-version: ${error.message}`);
    process.exit(1);
  });
}
