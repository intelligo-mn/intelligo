#!/usr/bin/env node
/**
 * A CycloneDX 1.6 SBOM for each published package: the runtime
 * dependencies it pulls in, as this tree's pnpm-lock.yaml resolved them,
 * each with the registry's hash, and the package's own tarball hash. The
 * release workflow attaches them to the GitHub release.
 *
 *   node scripts/sbom.mjs <version> <outDir> [tarballDir]
 *
 * writes <outDir>/intelligo-dev-<package>-<version>.cdx.json for every
 * non-private packages/*. With tarballDir (the release layout,
 * <tarballDir>/<name>/*.tgz), the package and every @intelligo-dev
 * sibling it depends on carry the SHA-512 of the tarball npm is given,
 * in hex: the same digest npm serves as the version's integrity and its
 * provenance attests.
 *
 * Runtime means `pnpm list --prod`: dependencies and optional
 * dependencies, through every @intelligo-dev sibling, never dev
 * dependencies. Peer dependencies, the package's and its dependencies',
 * are the consumer's to install and are not components. The output has no timestamp and no
 * serial number, so the same tree gives the same bytes.
 */
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  writeFileSync,
} from "node:fs";
import { join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));

/** `pkg:npm/%40scope/name@version`, the purl of an npm package. */
export function purl(name, version) {
  return `pkg:npm/${name.replace(/^@/, "%40")}@${version}`;
}

/** An SRI integrity (`sha512-<base64>`) as a CycloneDX hash. */
export function sriToHash(integrity) {
  const dash = integrity.indexOf("-");
  const alg = integrity.slice(0, dash).toUpperCase().replace("SHA", "SHA-");
  const content = Buffer.from(integrity.slice(dash + 1), "base64").toString(
    "hex"
  );
  return { alg, content };
}

/**
 * Each `name@version` in pnpm-lock.yaml's `packages:` section with its
 * integrity. A scoped key is quoted (`'@scope/name@1.0.0':`), an unscoped
 * one bare (`name@1.0.0:`); `snapshots:`, where peer suffixes live, is
 * not read.
 */
export function readLockIntegrities(lockText) {
  const start = lockText.search(/^packages:$/m);
  if (start === -1) return new Map();
  const rest = lockText.slice(start);
  const end = rest.search(/^snapshots:$/m);
  const lines = (end === -1 ? rest : rest.slice(0, end)).split("\n");
  const integrities = new Map();
  for (let i = 0; i < lines.length - 1; i++) {
    const key = /^ {2}'?((?:@[^@'/]+\/)?[^@'\s]+@[^'():\s]+)'?:$/.exec(
      lines[i]
    );
    if (!key) continue;
    const resolution = /^ {4}resolution: \{integrity: (sha\d+-[^,}]+)/.exec(
      lines[i + 1]
    );
    if (resolution) integrities.set(key[1], resolution[1]);
  }
  return integrities;
}

/**
 * The SBOM document for one package. `tree` is `pnpm list`'s node for
 * the package, each node carrying `version` (or `link:` for a sibling)
 * and, read beside it, `license`; `integrities` comes from
 * readLockIntegrities; `tarballHashes` maps a package name to its
 * tarball's SHA-512 in hex.
 */
export function buildBom({
  name,
  version,
  license,
  tree,
  integrities,
  tarballHashes = {},
}) {
  const components = new Map();
  const edges = new Map();
  const licenses = (id) => (id ? [{ expression: id }] : undefined);
  const nameParts = (full) => {
    const slash = full.startsWith("@") ? full.indexOf("/") : -1;
    return slash === -1
      ? { name: full }
      : { group: full.slice(0, slash), name: full.slice(slash + 1) };
  };

  const rootRef = purl(name, version);
  const visit = (node, parentRef) => {
    for (const [depName, dep] of Object.entries(node.dependencies ?? {})) {
      const sibling = String(dep.version).startsWith("link:");
      const depVersion = sibling ? version : dep.version;
      const ref = purl(depName, depVersion);
      if (!edges.has(parentRef)) edges.set(parentRef, new Set());
      edges.get(parentRef).add(ref);
      if (components.has(ref)) continue;
      const integrity = integrities.get(`${depName}@${depVersion}`);
      const hash = sibling
        ? tarballHashes[depName] && {
            alg: "SHA-512",
            content: tarballHashes[depName],
          }
        : integrity && sriToHash(integrity);
      components.set(ref, {
        type: "library",
        "bom-ref": ref,
        ...nameParts(depName),
        version: depVersion,
        purl: ref,
        ...(dep.license ? { licenses: licenses(dep.license) } : {}),
        ...(hash ? { hashes: [hash] } : {}),
      });
      visit(dep, ref);
    }
  };
  visit(tree, rootRef);

  const byRef = (a, b) =>
    a["bom-ref"] < b["bom-ref"] ? -1 : a["bom-ref"] > b["bom-ref"] ? 1 : 0;
  const refs = [rootRef, ...components.keys()].sort();
  return {
    bomFormat: "CycloneDX",
    specVersion: "1.6",
    version: 1,
    metadata: {
      tools: {
        components: [
          {
            type: "application",
            name: "scripts/sbom.mjs",
            group: "intelligo-dev",
          },
        ],
      },
      component: {
        type: "library",
        "bom-ref": rootRef,
        ...nameParts(name),
        version,
        purl: rootRef,
        ...(license ? { licenses: licenses(license) } : {}),
        ...(tarballHashes[name]
          ? { hashes: [{ alg: "SHA-512", content: tarballHashes[name] }] }
          : {}),
      },
    },
    components: [...components.values()].sort(byRef),
    dependencies: refs.map((ref) => ({
      ref,
      dependsOn: [...(edges.get(ref) ?? [])].sort(),
    })),
  };
}

/** The SHA-512 in hex of the one tarball under `<tarballDir>/<name>/`. */
function tarballHash(tarballDir, name) {
  const dir = join(tarballDir, name);
  if (!existsSync(dir)) return undefined;
  const tgz = readdirSync(dir).filter((f) => f.endsWith(".tgz"));
  if (tgz.length !== 1) return undefined;
  return createHash("sha512")
    .update(readFileSync(join(dir, tgz[0])))
    .digest("hex");
}

/**
 * The tree as an SBOM lists it, read from the package.json pnpm points
 * each node at: every node gains its licence and loses the peer
 * dependencies pnpm resolved for it, which are its consumer's to install.
 */
function prepare(node) {
  let manifest = {};
  try {
    manifest = JSON.parse(
      readFileSync(join(node.path, "package.json"), "utf8")
    );
  } catch {
    // A package without a readable manifest is listed as pnpm saw it.
  }
  if (typeof manifest.license === "string") node.license = manifest.license;
  const own = {
    ...manifest.dependencies,
    ...manifest.optionalDependencies,
  };
  for (const peer of Object.keys(manifest.peerDependencies ?? {})) {
    if (!(peer in own)) delete node.dependencies?.[peer];
  }
  for (const dep of Object.values(node.dependencies ?? {})) prepare(dep);
  return node;
}

/** The SBOM of the package at `packageDir`, released as `version`. */
export function sbomFor(packageDir, version, { lockText, tarballDir } = {}) {
  const manifest = JSON.parse(
    readFileSync(join(ROOT, packageDir, "package.json"), "utf8")
  );
  const [listed] = JSON.parse(
    execFileSync(
      "pnpm",
      [
        "--filter",
        manifest.name,
        "list",
        "--prod",
        "--depth",
        "Infinity",
        "--json",
      ],
      { cwd: ROOT, encoding: "utf8", maxBuffer: 1 << 28 }
    )
  );
  const tree = prepare(listed);
  const tarballHashes = {};
  if (tarballDir) {
    const names = [manifest.name];
    const collect = (node) => {
      for (const [depName, dep] of Object.entries(node.dependencies ?? {})) {
        if (String(dep.version).startsWith("link:")) names.push(depName);
        collect(dep);
      }
    };
    collect(tree);
    for (const name of names) {
      const hash = tarballHash(tarballDir, name);
      if (hash) tarballHashes[name] = hash;
    }
  }
  return buildBom({
    name: manifest.name,
    version,
    license: manifest.license,
    tree,
    integrities: readLockIntegrities(
      lockText ?? readFileSync(join(ROOT, "pnpm-lock.yaml"), "utf8")
    ),
    tarballHashes,
  });
}

function main() {
  const [version, outDir, tarballDir] = process.argv.slice(2);
  if (!version || !outDir) {
    console.error("usage: sbom.mjs <version> <outDir> [tarballDir]");
    process.exit(2);
  }
  mkdirSync(outDir, { recursive: true });
  const lockText = readFileSync(join(ROOT, "pnpm-lock.yaml"), "utf8");
  for (const dir of readdirSync(join(ROOT, "packages")).sort()) {
    const file = join(ROOT, "packages", dir, "package.json");
    if (!existsSync(file)) continue;
    const manifest = JSON.parse(readFileSync(file, "utf8"));
    if (manifest.private === true) continue;
    const bom = sbomFor(`packages/${dir}`, version, { lockText, tarballDir });
    const out = join(
      outDir,
      `${manifest.name.replace(/^@/, "").replace("/", "-")}-${version}.cdx.json`
    );
    writeFileSync(out, JSON.stringify(bom, null, 2) + "\n");
    console.log(`${out}: ${bom.components.length} components`);
  }
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) main();
