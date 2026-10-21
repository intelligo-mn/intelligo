// @ts-check

/**
 * Mutation testing: does the suite actually fail when the code is wrong?
 *
 * Line coverage says a line ran. It does not say an assertion would
 * have noticed had that line computed something else — and the modules
 * scoped below are exactly the ones where the difference is money:
 * a `Math.ceil` silently turned into `Math.floor` eats a fraction of a
 * minor unit on every transaction, and a `>` turned into `>=` bills one
 * request per window for free. Stryker makes those edits for us and
 * reports the ones no test caught.
 *
 * Scope grows deliberately. Every file listed in `mutate` is pure
 * enough that a surviving mutant is a missing assertion rather than a
 * missing database; the test suites that can kill them are listed in
 * `vitest.stryker.config.ts`. `pnpm test:mutation` runs it.
 */

/** @type {import('@stryker-mutator/api/core').PartialStrykerOptions} */
export default {
  packageManager: "pnpm",
  testRunner: "vitest",
  // Named rather than left to the default `@stryker-mutator/*` glob:
  // that glob resolves from Stryker's own directory, which under
  // pnpm's isolated node_modules holds only Stryker's dependencies —
  // the runner is a sibling in the root's node_modules, invisible from
  // there, and the run dies with "no TestRunner plugins were loaded".
  plugins: ["@stryker-mutator/vitest-runner"],
  vitest: { configFile: "vitest.stryker.config.ts" },
  // Run only the tests that covered the mutated line, per mutant.
  coverageAnalysis: "perTest",
  reporters: ["html", "json", "clear-text", "progress"],
  htmlReporter: { fileName: "reports/mutation/index.html" },
  jsonReporter: { fileName: "reports/mutation/mutation.json" },
  tempDirName: ".stryker-tmp",
  // The sandbox is a copy of the working tree, one per test-runner
  // process — seven of them here. Left to itself it copies Turborepo's
  // cache and every build output too, which is gigabytes per sandbox
  // and fills the disk mid-run (ENOSPC) before the run can finish.
  // None of it is reachable from the suites in scope: the workspace
  // `exports` point at `src/*.ts`, not at `dist`.
  ignorePatterns: [
    "node_modules",
    ".git",
    ".turbo",
    ".next",
    ".astro",
    ".wrangler",
    "dist",
    "coverage",
    "reports",
    "packages/registry/public",
    "*.tsbuildinfo",
    ".stryker-tmp",
  ],
  mutate: [
    "packages/core/src/money.ts",
    "packages/core/src/prompt.ts",
    "packages/core/src/registry.ts",
    "packages/core/src/documents/classifier.ts",
    "packages/executions/src/pricing.ts",
    "packages/billing/src/plan-registry.ts",
    "packages/billing/src/feature-quota.ts",
    "packages/chat/src/body.ts",
    "packages/chat/src/continuation.ts",
    "packages/chat/src/generation.ts",
    "packages/chat/src/windowing.ts",
  ],
  // `break` fails the command. It sits just under the score this scope
  // actually holds (98.5), so a regression is a red build rather than a
  // number someone stops reading. Raise it with the score; never lower
  // it to make a run pass.
  //
  // Twenty-one mutants keep it off 100.
  //
  // Five are in the chat body parser and the continuation check, and
  // each is equivalent: a `typeof` guard dropped where the next check
  // refuses the same values anyway (a primitive has no `id`; a role or a
  // media type that is not a string is in no list), `approval !== null`
  // dropped where a null approval comes back as null either way, and
  // `!isToolPart(part)` made `false`, where a part with no call id finds
  // no answer and is kept as stored. Each shares its line with killed
  // mutants of the same mutator, so a directive cannot mark it alone.
  //
  // Sixteen are in `prompt.ts`, `money.ts` and `pricing.ts`. Two are
  // equivalent: `<` for `<=` in `compare`, which the branch above it
  // already answered, and the `PROVIDER_CURRENCY` literal, evaluated at
  // module load, where the runner does not re-import the module. The
  // other fourteen change behaviour that no test observes: ten regex
  // edits in the injection list (`\s+` narrowed to `\s`, `\s*` widened
  // to `\S*`, `instructions?` narrowed to `instructions`), and in the
  // sanitizer two edits to the zero-width check that picks which form
  // to clean and the `removed / originalLength > 0.5` cut-off, plus the
  // `currency_mismatch` code of pricing's error.
  //
  // The equivalents that could be marked are marked in the source, each
  // with a reason.
  thresholds: { high: 99, low: 97, break: 97 },
};
