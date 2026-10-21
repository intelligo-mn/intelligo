# Contributing

Thank you for looking. This page is for people. [AGENTS.md](AGENTS.md)
is the map of the codebase that coding agents load; you will want it
once a change crosses packages, not before.

## Where to start

- **A question or an idea**: [Discussions](https://github.com/intelligo-dev/intelligo/discussions).
- **A bug**: an [issue](https://github.com/intelligo-dev/intelligo/issues/new/choose),
  using the template.
- **A vulnerability**: privately, per [SECURITY.md](SECURITY.md). Never
  in a public issue or pull request.
- **Code**: pick an issue labelled `good first issue` or `help wanted`
  and say in it that you are taking it. For anything larger than a fix,
  open a discussion first: most of the review happens before the code.

## The rule that decides most pull requests

Intelligo owns SaaS infrastructure: auth, workspaces and roles,
entitlements, credits, billing, execution, usage, cost and audit
records, conversation, document and identity persistence, jobs, the
admin console, the CLI and the page registry. The developer owns the
product: the AI framework used **natively**, prompts, tools, workflows,
product data, and every installed page as their own source.

Pages ship through the registry, not through packages, and an
installed page is used verbatim: what a product changes flows through
its config files (`lib/*-config`) and message files. A change that
puts product vocabulary inside a framework package will be declined
even if it works; the better pull request is the seam or port it
needs. [AGENTS.md, "The boundary"](AGENTS.md#the-boundary-read-before-writing-code)
is the full statement.

## Setup

Prerequisites: Node 22.14 or newer, pnpm 9 (`corepack enable` picks the
version from `package.json`), and Docker for a local Postgres.

```bash
docker compose up -d   # Postgres with pgvector on localhost:5445
cp .env.example .env   # DATABASE_URL already points at it
# set BETTER_AUTH_SECRET in .env:  openssl rand -base64 32
pnpm install
pnpm db:migrate        # the framework's schema (intelligo migrate)
pnpm dev               # reference app :4002, site :4003
```

Every app and package reads the repository root `.env`; an app-local
`.env` or the shell wins over it. `pnpm --filter app dev` runs only the
reference app.

## Making a change

1. **Branch from `main`, one concern per pull request.** The subject is
   a conventional commit (`fix(billing): …`); the body says why rather
   than restating the diff.
2. **Write the test that fails first.** For a bug, the test that
   reproduces it. For a change to what the architecture allows, a case
   in `tests/architecture/`.
3. **Run what CI runs:**
   `pnpm type-check && pnpm lint && pnpm test && pnpm format:check`.
   Suites that need Postgres skip unless it is configured: the service
   integration suites read `DATABASE_URL`, the database suites
   `TEST_PG_URL`. CI runs both against a fresh database.
4. **Add a changelog entry** under `[Unreleased]` in `CHANGELOG.md` for
   anything a consumer of the packages or the registry notices. A
   release's section opens with the Upgrade, Breaking and Migrations
   bullets; `scripts/release-notes.mjs` refuses one without them.
5. **Open the pull request** and fill in the template.

Some kinds of change have rules of their own:

- **Public API** follows [RELEASES.md](RELEASES.md). A patch only
  fixes; removing or changing the meaning of a stable export, CLI flag,
  environment variable or schema object waits for a major, after a
  deprecation in a released minor.
- **Migrations** are additive within a release, live in
  `packages/core/src/db/migrations/`, are registered in
  `meta/_journal.json`, and change structure, never rows. CI replays the
  whole chain against an empty database, so an unregistered or
  non-replayable migration fails the build.
- **Pages** are registry items. Edit their source under
  `packages/registry/base/`; `apps/app` is generated from it
  (`pnpm app:regenerate`) and is never edited by hand.
- **The docs site** generates its package, CLI and config pages from
  READMEs and source; edit the source, not the page.
- **A new dependency**: say in the pull request what it replaces or why
  nothing in the tree does the job.

## What review checks

CI runs three checks on every pull request: **Typecheck, lint, unit
tests**, **Mutation score**, and **Migrations and database integration
tests**. A maintainer reviews once they pass; a red check is the first
thing to fix.

## Releases

A release is a pull request titled `chore(release): X.Y.Z` that bumps
every published `packages/*/package.json`, writes the version's
`CHANGELOG.md` section and commits `pnpm sync`'s output. It is
squash-merged: the release workflow publishes the commit on `main` that
set the version, once that commit's own CI run is green. Its "Release
dry run" check runs everything the publish runs (the suite, the packed
tarballs, a consumer app outside the monorepo with every registry item,
the reference app, and `npm publish --dry-run`), so a release that would
fail does so before it merges.

Intelligo publishes on two npm channels. **`latest`** carries stable
releases; `npm i @intelligo-dev/cli` and every scaffold resolve there,
and a scaffold's `^X.Y.Z` never matches a prerelease. **`next`** carries
the next minor while it stabilises, as `X.Y.0-next.N` from `main`;
`npx @intelligo-dev/cli@next create` scaffolds it, with its own pages
from `/r/<version>/`. A minor reaches `latest` by promotion: a release
pull request sets the plain `X.Y.0` on the tree `next` already carried.
The publish identity cannot move a dist-tag, so a maintainer runs
`node scripts/npm-maintain.mjs` when a release run says `next` is behind
`latest`.

While `main` carries the next minor, a fix for the stable line lands on
`main` by pull request and is cherry-picked into `release/X.Y`, whose
release pull request publishes the patch under `latest`; a release
branch carries `X.Y.Z` patches only. A forward-port pull request then
brings the `[X.Y.Z]` section and `pnpm sync`'s
`apps/website/public/r/X.Y.Z/` to `main`. Until it merges, main's site
sync check is red, and the next site build from `main` serves the
previous release at `/r` again, so merge it before anything else lands
on `main`; the release run's warning gives the commands.

## What will be declined

- Import-side-effect registration: registries are populated from an
  explicit composition root.
- Universal wrappers over an AI framework: the framework is used
  natively, and Intelligo records only the execution boundary.
- Anything that widens a public package's dependencies past the
  allowlist. The dependency-direction test enforces this; it is not
  advisory.

## Code of conduct

Everyone taking part is expected to follow the
[Contributor Covenant](CODE_OF_CONDUCT.md).

## Licence

Contributions are accepted under [Apache-2.0](LICENSE), the licence the
project ships under.
