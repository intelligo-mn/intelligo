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
- **Triage or review**: [GOVERNANCE.md](GOVERNANCE.md) says how to take
  it on.

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

### The browser journey

`pnpm test:e2e` drives a production build of the reference app in
Chromium: sign-up, onboarding, the billing page, a chat turn, usage and
an artifact. It runs on the stub model, so it needs no provider key,
and on console email, so sign-up issues a session without a mailbox.

```bash
docker compose up -d
pnpm db:migrate
pnpm --filter app exec drizzle-kit migrate
pnpm turbo build --filter=app
pnpm exec playwright install chromium
EMAIL_PROVIDER=console GOOGLE_GENERATIVE_AI_API_KEY= pnpm test:e2e
pnpm test:e2e:types    # type-checks the specs
```

Playwright starts the app on :4002 itself, or reuses one already
running there outside CI.

### Load test

`scripts/load/chat.k6.js` puts load on `/api/chat`. It needs
[k6](https://grafana.com/docs/k6/latest/set-up/install-k6/), installed
separately, and a local production build of the reference app on the
stub model:

```bash
pnpm turbo build --filter=app
EMAIL_PROVIDER=console GOOGLE_GENERATIVE_AI_API_KEY= pnpm --filter app start
k6 run -e BASE_URL=http://localhost:4002 scripts/load/chat.k6.js
```

The script's header lists its options (`VUS`, `PACE`, `SPOOF_IP`). It
signs up accounts and spends their credits: never point it at a
deployment with a provider key or a real mail provider.

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
  deprecation in a released minor, with an entry in
  `packages/cli/src/deprecations.ts`.
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

A pull request that touches a path in the "High risk" section of
`.github/CODEOWNERS`, or carries the `security` label, also gets the
**review-window** check: it stays pending for 24 hours from the moment
the pull request is first seen as high-risk, so a change to those paths
is public for a full day before it can merge. Pushing again restarts
the clock. A release (version bumps and the changelog) touches no
high-risk path and is not held. The fix to a privately reported
vulnerability can be released from the window with the
`security-embargo` label, which counts only when a repository admin
applies it. Until the maintainers set up the app that posts it, the
check is not reported.

## AI-assisted changes

Intelligo is developed with coding agents, and contributions written
with one are welcome. The same bar applies to every line, whoever typed
it, and the person who opens the pull request answers for all of it.

**What every change passes, by machine.** Type-check, lint and
formatting; the whole Vitest suite, including `tests/architecture/`
(the boundary and dependency direction, publishability, the registry's
schema and design rules, model registration, the migration baseline,
comments); the database integration suites against a fresh Postgres;
and the mutation score over the pure modules that hold money, pricing,
quotas and prompt sanitization. Passing them is necessary. It is not a
review.

**What a person reads line by line.** The author before opening the
pull request, and the reviewer before approving it:

- every changed line under a path in the "High risk" section of
  `.github/CODEOWNERS`: auth, tenancy and persistence, money and
  billing, the execution boundary, audit, the chat transport, admin and
  impersonation, route handlers, Server Actions and the proxy,
  workflows and the release scripts;
- every changed or deleted assertion in an existing test, and every new
  `// Stryker disable`, `eslint-disable`, `@ts-expect-error` or
  architecture-test allowance. Making a check pass by loosening it is
  the failure this section exists to catch;
- every query added or changed: it filters by `workspaceId`, and by
  `userId` where the data is user-private;
- every SQL statement in a migration;
- every new dependency and every change to `pnpm.overrides`.

Generated output (the registry build, `apps/app` from
`pnpm app:regenerate`, the site's `pnpm sync` files) is compared by CI
rather than read; reading the source it came from is enough.

**What the pull request says.** Tick "AI-assisted" in the template and,
when a high-risk path is touched, list the files you read line by line.
Write the description yourself: why the change is needed, in your own
words.

**What an agent does not do here.** Push to `main`, merge, change
repository settings, publish to npm, or change a settled decision.
Those are maintainer actions.

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
