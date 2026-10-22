# Releases and support

How Intelligo versions, how often it releases, how long a version gets
fixes, which packages are stable, and how an API is retired.
[SECURITY.md](SECURITY.md) applies this to vulnerabilities.

## Versioning

Every `@intelligo-dev/*` package is released together at one version,
following [SemVer](https://semver.org/).

- **Patch**: fixes only. No new exports, options, registry items or seam
  fields.
- **Minor**: additions and deprecations. Nothing public is removed or
  changes meaning, except in an experimental package (below). Migrations
  are additive.
- **Major**: removals of deprecated API and changes of meaning, each
  listed under `### Upgrading` with what to change.

## What counts as public API

- every export of every published entry point (`@intelligo-dev/<pkg>` and
  the subpaths in its `exports`), and the options and result shapes they
  document, including schemas a consumer fills in, such as a credit
  bundle;
- the CLI's commands, flags, exit codes and `--json` output;
- environment variables the framework reads (aliases a dependency
  accepts, such as Better-Auth's, follow that dependency);
- the database schema the framework owns.

An installed registry item is your source. A release changes it only
when you run `intelligo sync`, and the changelog's `### Upgrading` says
what changed.

## Stability

| Package                     | Status       |
| --------------------------- | ------------ |
| `@intelligo-dev/core`       | Stable       |
| `@intelligo-dev/auth`       | Stable       |
| `@intelligo-dev/next`       | Stable       |
| `@intelligo-dev/billing`    | Stable       |
| `@intelligo-dev/chat`       | Stable       |
| `@intelligo-dev/executions` | Stable       |
| `@intelligo-dev/audit`      | Stable       |
| `@intelligo-dev/jobs`       | Stable       |
| `@intelligo-dev/cli`        | Stable       |
| `@intelligo-dev/admin`      | Experimental |
| `@intelligo-dev/mastra`     | Experimental |

- **`@intelligo-dev/admin`** serves the `admin-console` registry item: its
  read models, their filters and their result shapes follow what the
  console's pages need, and they are still growing with it. Its gate
  (`requireAdmin`, `isPlatformAdmin`) and impersonation keep their
  meaning; the read models may change.
- **`@intelligo-dev/mastra`** is typed structurally against the result of
  a Mastra agent run, a shape Intelligo does not own. A release of
  `@mastra/core` that changes that shape can change this package's
  options or results.

A stable package follows the versioning above. An experimental package is
released at the same version as the rest and gets the same fixes, but a
minor may change the meaning of its exports or remove one without a
deprecation period. Each such change is listed under `### Changed` or
`### Removed` with its steps under `### Upgrading`, and a patch still
changes nothing but fixes. A package becomes stable in a minor whose
changelog says so; from then on it follows the versioning above.

## Channels

- **`latest`**: stable releases. `npm install` and every scaffold resolve
  here, and a `^X.Y.Z` range never matches a prerelease.
- **`next`**: the next minor while it stabilises, as `X.Y.0-next.N`.
  `npx @intelligo-dev/cli@next create` scaffolds it, with the pages of
  that same prerelease. A minor reaches `latest` by releasing the tree
  `next` carried as a plain `X.Y.0`; `next` never stays below `latest`.

## Release cadence

- **Minor releases** at most once a month.
- **Patch releases** when a fix is ready.
- **Security fixes** out of band, on the timeline in SECURITY.md.
- **Major releases** are announced in the changelog of the minor before
  them.

## Support windows

The current minor gets every fix. Older lines get fixes only where
SECURITY.md lists them as supported, until the end date it names there;
its supported-versions table is the one place that says which lines
those are.

## Deprecation

A stable API is removed only in a major, and only after it was
deprecated in a released minor for at least 60 days. Deprecating it means
a `@deprecated` tag naming the major that removes it and the replacement,
and a `### Deprecated` changelog entry. A registry item that uses a
deprecated API is updated in the major that removes it.

The register is `packages/cli/src/deprecations.ts`: each deprecation's
`INTELLIGO_DEPnnnn` code, the version that deprecated it, the major that
removes it and its replacement. `tests/architecture/deprecations.test.ts`
holds it equal to the `@deprecated` tags and lists the registry items
each removal touches. A deprecated call logs a one-time Node
`DeprecationWarning` carrying its code.

## Breaking changes outside a major

Only a security fix may break stable public API outside a major, and
only when the API is the vulnerability. It is listed under `### Security`
with a link to its advisory, with what to change under `### Upgrading`.

## Changelog categories

`CHANGELOG.md` follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), using only
Added, Changed, Deprecated, Removed (majors, and experimental packages),
Fixed, Security and Upgrading. A breaking change in a major goes under
Removed or Changed, with its steps under Upgrading. Tests, CI and
documentation get one line under Changed. Each Security entry links its
published GitHub security advisory, and the section says
**Upgrade:** required; `scripts/release-notes.mjs` refuses a release
whose section does not.
