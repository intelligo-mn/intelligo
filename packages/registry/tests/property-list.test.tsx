/**
 * A property's value as a reader sees it: an element a server component
 * rendered reaches the client as a lazy reference, and it renders as what
 * it is — never as React's own fields laid out as a record.
 */

import { describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";

import { PropertyList } from "../base/ui/property-list/property-list";

vi.mock("@/lib/utils", () => ({
  cn: (...names: unknown[]) => names.filter(Boolean).join(" "),
}));
vi.mock("@/components/ui/button", () => ({
  Button: ({ children }: { children?: React.ReactNode }) => (
    <button type="button">{children}</button>
  ),
}));

/** What `<a>` rendered on the server is on the client: a resolved lazy reference. */
const fromServer = (element: React.ReactElement) => ({
  $$typeof: Symbol.for("react.lazy"),
  _payload: { status: "fulfilled", value: element },
  _init: (payload: { value: React.ReactElement }) => payload.value,
});

const render = (value: unknown) =>
  renderToStaticMarkup(
    <PropertyList properties={[{ key: "k", label: "Label", value }]} />
  );

describe("PropertyList", () => {
  it("renders an element a server component rendered as the element", () => {
    const html = render(fromServer(<a href="/source">Source</a>));
    expect(html).toContain('<a href="/source">Source</a>');
    expect(html).not.toContain("_payload");
    expect(html).not.toContain("$$typeof");
  });

  it("renders an element as itself", () => {
    expect(render(<strong>bold</strong>)).toContain("<strong>bold</strong>");
  });

  it("lays a plain record out as fields, not JSON", () => {
    const html = render({ start: 2, end: 15 });
    expect(html).toContain("start");
    expect(html).not.toContain("{");
  });

  it("folds an empty field away", () => {
    expect(render(null)).not.toContain("Label");
  });
});
