/**
 * The SBOM a release attaches lists a package's runtime dependencies,
 * each with the hash its registry serves, and nothing a consumer never
 * installs.
 *
 * scripts/sbom.mjs is what the release workflow runs; the live case reads
 * this tree's pnpm-lock.yaml through pnpm itself.
 */

import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";

import { ROOT } from "./tree";

type Hash = { alg: string; content: string };
type Component = {
  "bom-ref": string;
  name: string;
  group?: string;
  version: string;
  purl: string;
  hashes?: Hash[];
};
type Bom = {
  specVersion: string;
  metadata: { component: Component };
  components: Component[];
  dependencies: { ref: string; dependsOn: string[] }[];
};
type Node = {
  version: string;
  license?: string;
  dependencies?: Record<string, Node>;
};
type SbomModule = {
  purl: (name: string, version: string) => string;
  sriToHash: (integrity: string) => Hash;
  readLockIntegrities: (lockText: string) => Map<string, string>;
  buildBom: (input: {
    name: string;
    version: string;
    license?: string;
    tree: Node;
    integrities: Map<string, string>;
    tarballHashes?: Record<string, string>;
  }) => Bom;
  sbomFor: (
    packageDir: string,
    version: string,
    options?: { lockText?: string; tarballDir?: string }
  ) => Bom;
};

const sbom = (await import(path.join(ROOT, "scripts/sbom.mjs"))) as SbomModule;

const SRI = (hex: string) =>
  `sha512-${Buffer.from(hex.repeat(64), "hex").toString("base64")}`;

const LOCK = [
  "lockfileVersion: '9.0'",
  "",
  "packages:",
  "",
  "  '@scope/thing@1.0.0':",
  `    resolution: {integrity: ${SRI("aa")}}`,
  "    engines: {node: '>=22'}",
  "",
  "  accepts@2.0.0:",
  `    resolution: {integrity: ${SRI("bb")}}`,
  "",
  "snapshots:",
  "",
  "  '@scope/thing@1.0.0(zod@4.0.0)':",
  `    resolution: {integrity: ${SRI("cc")}}`,
  "",
].join("\n");

const TREE: Node = {
  version: "1.2.4",
  dependencies: {
    "@intelligo-dev/core": {
      version: "link:../core",
      license: "Apache-2.0",
      dependencies: {
        accepts: { version: "2.0.0", license: "MIT" },
      },
    },
    "@scope/thing": {
      version: "1.0.0",
      license: "MIT",
      dependencies: {
        accepts: { version: "2.0.0", license: "MIT" },
      },
    },
  },
};

function bom(tarballHashes?: Record<string, string>) {
  return sbom.buildBom({
    name: "@intelligo-dev/audit",
    version: "1.2.4",
    license: "Apache-2.0",
    tree: TREE,
    integrities: sbom.readLockIntegrities(LOCK),
    tarballHashes,
  });
}

describe("sbom", () => {
  it("encodes a scope's @ in a purl", () => {
    expect(sbom.purl("@intelligo-dev/core", "1.2.4")).toBe(
      "pkg:npm/%40intelligo-dev/core@1.2.4"
    );
    expect(sbom.purl("accepts", "2.0.0")).toBe("pkg:npm/accepts@2.0.0");
  });

  it("writes npm's integrity as the hex digest its provenance attests", () => {
    expect(
      sbom.sriToHash(
        "sha512-cRyawvFQWcKMbzeBq/XUKTyp67QHamU7x4zcVhmMdgrqXNgqAAd8ZL4FHR0pQI4osKdQitnP74GY9j59c9wZXg=="
      )
    ).toEqual({
      alg: "SHA-512",
      content:
        "711c9ac2f15059c28c6f3781abf5d4293ca9ebb4076a653bc78cdc56198c760aea5cd82a00077c64be051d1d29408e28b0a7508ad9cfef8198f63e7d73dc195e",
    });
  });

  it("reads quoted and bare lockfile keys, and not the snapshots", () => {
    expect([...sbom.readLockIntegrities(LOCK).keys()]).toEqual([
      "@scope/thing@1.0.0",
      "accepts@2.0.0",
    ]);
  });

  it("lists a package reached twice once, with every edge to it", () => {
    const doc = bom();
    expect(
      doc.components.filter((c) => c.purl === "pkg:npm/accepts@2.0.0")
    ).toHaveLength(1);
    const into = doc.dependencies.filter((d) =>
      d.dependsOn.includes("pkg:npm/accepts@2.0.0")
    );
    expect(into.map((d) => d.ref).sort()).toEqual([
      "pkg:npm/%40intelligo-dev/core@1.2.4",
      "pkg:npm/%40scope/thing@1.0.0",
    ]);
  });

  it("names a linked sibling at the release's version, hashed from its tarball", () => {
    const doc = bom({
      "@intelligo-dev/audit": "ab".repeat(64),
      "@intelligo-dev/core": "cd".repeat(64),
    });
    const core = doc.components.find((c) => c.name === "core")!;
    expect(core.purl).toBe("pkg:npm/%40intelligo-dev/core@1.2.4");
    expect(core.group).toBe("@intelligo-dev");
    expect(core.hashes).toEqual([{ alg: "SHA-512", content: "cd".repeat(64) }]);
    expect(doc.metadata.component.hashes).toEqual([
      { alg: "SHA-512", content: "ab".repeat(64) },
    ]);
  });

  it("gives the same bytes for the same tree", () => {
    expect(JSON.stringify(bom())).toBe(JSON.stringify(bom()));
  });

  it("lists a real package's runtime dependencies, each hashed", () => {
    const doc = sbom.sbomFor("packages/audit", "0.0.0-test", {
      lockText: readFileSync(path.join(ROOT, "pnpm-lock.yaml"), "utf8"),
    });
    expect(doc.specVersion).toBe("1.6");
    const names = doc.components.map((c) =>
      c.group ? `${c.group}/${c.name}` : c.name
    );
    expect(names).toContain("@intelligo-dev/core");
    for (const dev of ["vitest", "typescript", "eslint"]) {
      expect(names).not.toContain(dev);
    }
    const thirdParty = doc.components.filter(
      (c) => c.group !== "@intelligo-dev"
    );
    expect(thirdParty.length).toBeGreaterThan(0);
    for (const c of thirdParty) {
      expect(c.hashes?.[0]?.alg, c.purl).toBe("SHA-512");
    }
  });
});
