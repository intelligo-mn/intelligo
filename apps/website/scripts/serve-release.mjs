#!/usr/bin/env node
/**
 * Point the site at the release npm tags `latest`: `published` in
 * src/data/proof.json, and public/r/*.json as the copy of
 * public/r/<published>/. `sync` calls it, and so does every build — a
 * build after a release serves that release with nothing committed, as
 * long as the release commit carries its public/r/<version>/ (the
 * release workflow refuses to publish one that does not).
 *
 *   node scripts/serve-release.mjs     # apps/website: what `build` runs
 *
 * Needs only this directory and the network; without the network, or
 * for a version whose copy is not here, the committed answer stands.
 */
import {
  existsSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { fromRelease } from "./registry-release.mjs";

const SITE = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SEMVER = /^\d+\.\d+\.\d+(-[0-9A-Za-z.-]+)?$/;
const PROOF = join(SITE, "src/data/proof.json");
const REGISTRY_ROOT = join(SITE, "public/r");

function readProof() {
  return existsSync(PROOF) ? JSON.parse(readFileSync(PROOF, "utf8")) : {};
}

/**
 * What npm serves under `latest`, the release the site and /r serve. A
 * prerelease on another tag never changes it. The tree runs ahead of npm
 * between a version bump and its release, and stays ahead if the release
 * fails. Without the network the last answer stands.
 */
export async function publishedVersion() {
  const last = readProof().published;
  try {
    const response = await fetch(
      "https://registry.npmjs.org/-/package/@intelligo-dev%2fcore/dist-tags",
      { signal: AbortSignal.timeout(10_000) }
    );
    if (!response.ok) throw new Error(`npm answered ${response.status}`);
    const published = (await response.json()).latest;
    if (!published) throw new Error('npm has no "latest" dist-tag');
    return published;
  } catch (error) {
    console.warn(
      `proof: could not read npm (${error.message}); keeping published = ${last ?? "unknown"}`
    );
    return last;
  }
}

/**
 * Whether npm has this exact version, under any tag: once it does, its
 * public/r copy is frozen. Without the network the last answer for the
 * same version stands, and a version the proof has not seen counts as
 * not on npm.
 */
export async function onNpm(version) {
  if (!SEMVER.test(version)) throw new Error(`not a version: ${version}`);
  const proof = readProof();
  const last = proof.version === version ? proof.onNpm === true : false;
  try {
    const response = await fetch(
      `https://registry.npmjs.org/@intelligo-dev%2fcore/${encodeURIComponent(version)}`,
      { signal: AbortSignal.timeout(10_000) }
    );
    if (response.status === 404) return false;
    if (!response.ok) throw new Error(`npm answered ${response.status}`);
    return true;
  } catch (error) {
    console.warn(
      `proof: could not read npm (${error.message}); keeping onNpm = ${last} for ${version}`
    );
    return last;
  }
}

/** public/r/*.json, what the `@intelligo` namespace resolves, as `release`'s copy. */
export function serveRelease(release) {
  const dir = join(REGISTRY_ROOT, release);
  for (const f of readdirSync(REGISTRY_ROOT)) {
    if (f.endsWith(".json")) rmSync(join(REGISTRY_ROOT, f));
  }
  for (const f of readdirSync(dir)) {
    writeFileSync(
      join(REGISTRY_ROOT, f),
      fromRelease(readFileSync(join(dir, f), "utf8"), release)
    );
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const proof = readProof();
  const published = await publishedVersion();
  if (!published || published === proof.published) {
    console.log(`serve-release: /r serves ${proof.published ?? "nothing"}`);
  } else if (!existsSync(join(REGISTRY_ROOT, published))) {
    console.warn(
      `serve-release: npm has ${published} but public/r/${published} is not here; /r keeps serving ${proof.published}`
    );
  } else {
    serveRelease(published);
    writeFileSync(
      PROOF,
      JSON.stringify({ ...proof, published }, null, 2) + "\n"
    );
    console.log(
      `serve-release: /r and the site serve ${published} (committed: ${proof.published})`
    );
  }
}
