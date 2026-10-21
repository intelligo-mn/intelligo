/**
 * Framework API on its way out: what goes, the first published version
 * that deprecated it, the major that removes it, what replaces it, and
 * the registry items whose source uses it. tests/architecture/
 * deprecations.test.ts holds this list equal to the `@deprecated` tags in
 * each package's src and to the items under packages/registry/base. A code is
 * never reused: a removed entry's code moves to REMOVED_CODES.
 *
 * No command imports it yet. It ships in the CLI package as data, so that
 * `intelligo upgrade --check` and `doctor` can report the deprecations a
 * project still uses from the same list the sources are held to.
 */
export type Deprecation = {
  /** `INTELLIGO_DEPnnnn`, the code a `@deprecated` tag names. */
  code: string;
  /** The package the API is imported from. */
  module: string;
  /** A named export, or a field of an exported shape (`owner`). */
  kind: "export" | "property";
  name: string;
  /** For a property: the exported type that carries it. */
  owner?: string;
  /** The first version on npm that carried the deprecation, or `Unreleased`. */
  since: string;
  /** The major that removes it. */
  removeIn: string;
  /** What to use instead. */
  use: string;
  /** Registry items whose source uses it, updated in the removing major. */
  items?: readonly string[];
};

export const DEPRECATIONS: readonly Deprecation[] = [
  {
    code: "INTELLIGO_DEP0001",
    module: "@intelligo-dev/billing",
    kind: "export",
    name: "checkQuota",
    since: "1.0.0-beta.2",
    removeIn: "2.0.0",
    use: "reserveQuota to admit a run, or estimateQuota for a read-only estimate",
  },
  {
    code: "INTELLIGO_DEP0002",
    module: "@intelligo-dev/billing",
    kind: "property",
    owner: "CreditBundle",
    name: "credits",
    since: "1.0.0-beta.13",
    removeIn: "2.0.0",
    use: "grant: { amount, currency } in micros",
    items: ["billing-settings"],
  },
  {
    code: "INTELLIGO_DEP0003",
    module: "@intelligo-dev/billing",
    kind: "property",
    owner: "CreditBundle",
    name: "priceUsd",
    since: "1.0.0-beta.13",
    removeIn: "2.0.0",
    use: "price: { amount, currency } in micros",
    items: ["billing-settings"],
  },
];

/** Codes of entries already removed; never assigned again. */
export const REMOVED_CODES: readonly string[] = [];
