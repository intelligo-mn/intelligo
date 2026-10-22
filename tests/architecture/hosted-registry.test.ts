/**
 * intelligo.dev/r serves a release, not main.
 *
 * public/r/<version>/ keeps each release's items, and every component
 * one of them builds on is that same release's; public/r/*.json is the
 * copy of the release npm tags `latest` (proof.json's `published`). The site
 * answers with the headers the build writes: no framing, inline scripts
 * only by hash, and the registry as JSON any origin can read.
 */

import { afterEach, describe, expect, it, vi } from "vitest";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

import { APPS_DIR } from "./tree";

type ReleaseModule = {
  REGISTRY_URL: string;
  compareVersions: (a: string, b: string) => number;
  toRelease: (text: string, release: string) => string;
  fromRelease: (text: string, release: string) => string;
};
type ServeModule = {
  publishedVersion: () => Promise<string | undefined>;
  onNpm: (version: string) => Promise<boolean>;
};
type HeadersModule = {
  inlineScriptHashes: (html: string) => Set<string>;
  contentSecurityPolicy: (hashes: Set<string>) => string;
  headersFile: (hashes: Set<string>) => string;
};

const SITE = path.join(APPS_DIR, "website");
const R = path.join(SITE, "public/r");
const release = (await import(
  path.join(SITE, "scripts/registry-release.mjs")
)) as ReleaseModule;
const serve = (await import(
  path.join(SITE, "scripts/serve-release.mjs")
)) as ServeModule;
const headers = (await import(
  path.join(SITE, "src/lib/headers.mjs")
)) as HeadersModule;

const proof = JSON.parse(
  readFileSync(path.join(SITE, "src/data/proof.json"), "utf8")
) as { version: string; published?: string; onNpm?: boolean };
const releases = readdirSync(R).filter((f) =>
  statSync(path.join(R, f)).isDirectory()
);

describe("versions", () => {
  it("orders releases by semver precedence", () => {
    const sorted = [
      "1.1.0",
      "1.0.0",
      "1.0.0-beta.13",
      "1.0.0-beta.2",
      "1.10.0",
      "1.0.0-rc.1",
      "1.2.0",
    ].sort(release.compareVersions);
    expect(sorted).toEqual([
      "1.0.0-beta.2",
      "1.0.0-beta.13",
      "1.0.0-rc.1",
      "1.0.0",
      "1.1.0",
      "1.2.0",
      "1.10.0",
    ]);
  });

  it("names a dependency by its release, and back by the namespace", () => {
    const item = JSON.stringify({
      registryDependencies: ["skeleton", "@intelligo/button"],
      files: [{ content: 'import { Button } from "@/components/ui/button";' }],
    });
    const pinned = release.toRelease(item, "1.2.3");
    expect(JSON.parse(pinned).registryDependencies).toEqual([
      "skeleton",
      `${release.REGISTRY_URL}/1.2.3/button.json`,
    ]);
    expect(release.fromRelease(pinned, "1.2.3")).toBe(item);
  });
});

describe("what npm has", () => {
  const DIST_TAGS = { latest: "1.2.4", next: "1.3.0-next.2" };

  /** npm's registry, answering the dist-tags and the versions it has. */
  function registry(versions: string[]) {
    return async (url: string) => {
      if (url.endsWith("/dist-tags"))
        return new Response(JSON.stringify(DIST_TAGS));
      const version = url.slice(url.lastIndexOf("/") + 1);
      return versions.includes(version)
        ? new Response("{}")
        : new Response("not found", { status: 404 });
    };
  }

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("serves `latest` while a prerelease is on `next`", async () => {
    vi.stubGlobal("fetch", registry(["1.2.4", "1.3.0-next.2"]));
    expect(await serve.publishedVersion()).toBe("1.2.4");
    expect(await serve.onNpm("1.3.0-next.2")).toBe(true);
  });

  it("says a version npm answers 404 for is not on npm", async () => {
    vi.stubGlobal("fetch", registry(["1.2.4"]));
    expect(await serve.onNpm("1.3.0-next.3")).toBe(false);
  });

  it("keeps the proof's last answer when npm cannot be read", async () => {
    vi.spyOn(console, "warn").mockImplementation(() => {});
    vi.stubGlobal("fetch", async () => {
      throw new Error("offline");
    });
    expect(await serve.publishedVersion()).toBe(proof.published);
    expect(await serve.onNpm(proof.version)).toBe(proof.onNpm === true);
    expect(await serve.onNpm(`${proof.version}-next.0`)).toBe(false);
  });
});

describe("public/r", () => {
  it("keeps the release npm serves, and serves it at /r", () => {
    expect(proof.published).toBeDefined();
    const current = proof.published!;
    expect(releases).toContain(current);
    const dir = path.join(R, current);
    const top = readdirSync(R).filter((f) => f.endsWith(".json"));
    expect(top.sort()).toEqual(
      readdirSync(dir)
        .filter((f) => f.endsWith(".json"))
        .sort()
    );
    for (const f of top) {
      expect(readFileSync(path.join(R, f), "utf8"), f).toBe(
        release.fromRelease(readFileSync(path.join(dir, f), "utf8"), current)
      );
    }
  });

  it("keeps the tree's own version once it is on npm", () => {
    if (proof.onNpm) expect(releases).toContain(proof.version);
  });

  it.each(releases)(
    "%s: every component an item builds on is the same release's",
    (version) => {
      const dir = path.join(R, version);
      for (const f of readdirSync(dir).filter((n) => n.endsWith(".json"))) {
        const item = JSON.parse(readFileSync(path.join(dir, f), "utf8")) as {
          registryDependencies?: string[];
        };
        for (const dep of item.registryDependencies ?? []) {
          expect(dep, `${version}/${f}`).not.toMatch(/^@intelligo\//);
          if (!dep.startsWith("https://")) continue;
          const prefix = `${release.REGISTRY_URL}/${version}/`;
          expect(dep.startsWith(prefix), `${version}/${f}: ${dep}`).toBe(true);
          expect(
            existsSync(path.join(dir, dep.slice(prefix.length))),
            `${version}/${f}: ${dep}`
          ).toBe(true);
        }
      }
    }
  );
});

describe("_headers", () => {
  it("hashes executed inline scripts only", () => {
    const html = [
      "<script>a()</script>",
      '<script type="module">b()</script>',
      '<script type="application/ld+json">{"x":1}</script>',
      '<script src="/c.js"></script>',
    ].join("");
    expect(headers.inlineScriptHashes(html)).toEqual(
      new Set([
        "'sha256-qVpDBgj7bpq5hMAcGp3AOc79J3Y1Z4HvySTwKrWDoy4='",
        "'sha256-cf242PFc/kb7xD0Qzhsmd9vvRkc+cWFmbi+k+YvtdKc='",
      ])
    );
  });

  it("refuses framing and runs no script it did not hash", () => {
    const csp = headers.contentSecurityPolicy(new Set(["'sha256-x'"]));
    expect(csp).toContain("frame-ancestors 'none'");
    expect(csp).toMatch(
      /script-src 'self' 'wasm-unsafe-eval' https:\/\/\*\.googletagmanager\.com 'sha256-x'(;|$)/
    );
    expect(csp).not.toContain("'unsafe-inline' 'sha256");
    expect(csp).not.toMatch(/script-src[^;]*'unsafe-(inline|eval)'/);
  });

  it("lets the analytics tag load and send, and nothing else off-site", () => {
    const csp = headers.contentSecurityPolicy(new Set());
    const connect = /connect-src ([^;]*)/.exec(csp)![1]!.split(" ");
    expect(connect).toEqual([
      "'self'",
      "blob:",
      "data:",
      "https://api.github.com",
      "https://*.google-analytics.com",
      "https://*.analytics.google.com",
      "https://*.googletagmanager.com",
    ]);
  });

  it("serves the registry as JSON to any origin", () => {
    const file = headers.headersFile(new Set());
    const rule = file.slice(file.indexOf("/r/*"));
    expect(rule).toContain("Content-Type: application/json");
    expect(rule).toContain("Access-Control-Allow-Origin: *");
    expect(file).toContain("X-Content-Type-Options: nosniff");
  });
});
