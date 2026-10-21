# Governance

How Intelligo is run: who decides, how a change is reviewed, and how a
contributor becomes a maintainer. Intelligo has one maintainer today.
This file says what changes when it has two, so that whoever relies on
the framework can see where its continuity stands.

## Roles

| Role        | Can                                                      | GitHub role               |
| ----------- | -------------------------------------------------------- | ------------------------- |
| Contributor | open issues, discussions and pull requests               | none                      |
| Triager     | label, reproduce and close issues; answer discussions    | Triage                    |
| Reviewer    | approve pull requests in the areas CODEOWNERS gives them | Write                     |
| Maintainer  | merge, release, handle security reports, change settings | Admin, org owner, npm org |

The current maintainers are the owners named in
[`.github/CODEOWNERS`](.github/CODEOWNERS).

## Becoming a triager, reviewer or maintainer

- **Triager**: ten useful triage contributions over at least a month
  (a bug reproduced, a duplicate found, a question answered). Ask in
  Discussions, or a maintainer invites you.
- **Reviewer**: five merged pull requests that are not documentation
  only, over at least two months, at least one touching a package
  service or `tests/architecture/`. Two-factor authentication required.
  A reviewer starts on paths outside the high-risk section of
  CODEOWNERS and is added to it after three months.
- **Maintainer**: at least three months as a reviewer and fifteen
  reviews; has prepared a release and handled a security report
  together with a maintainer. Nominated by a maintainer; accepted when
  no maintainer objects within seven days.

A reviewer or maintainer inactive for six months moves to emeritus;
the role is restored on request.

## How decisions are made

- **Day to day**: a pull request that passes review merges. A
  maintainer can decline a change that fits the code but not the
  boundary in [CONTRIBUTING.md](CONTRIBUTING.md), and says why.
- **Settled decisions**, listed in [AGENTS.md](AGENTS.md) under
  "Decisions", are settled, and the maintainers keep the record of why
  privately: raise it with them before changing any of them. A change
  to one that reaches a release is described in
  [CHANGELOG.md](CHANGELOG.md).

## Review

- The rulesets kept in [`.github/rulesets/`](.github/rulesets/) are
  what the repository's settings are set from, kept as files so a
  change to them is reviewed like code. They say: `main` and the
  `release/**` branches cannot be deleted or force-pushed and change
  only through pull requests, release tags cannot be moved or deleted,
  and nobody bypasses them.
- The checks those rulesets require on `main`: **Typecheck, lint, unit
  tests**, **Mutation score**, **Migrations and database integration
  tests**, **Release dry run**, the two CodeQL analyses, and
  **review-window**.
- The review window: once its GitHub App is set up, a pull request
  that touches a high-risk path, or is labelled `security`, merges no
  sooner than 24 hours after it is first seen as high-risk. The
  `security-embargo` label lifts that for the fix to a privately
  reported vulnerability, and counts only when a repository admin
  applies it.
- A release is one squash-merged pull request that bumps every
  published manifest and writes the version's changelog section; it
  touches no high-risk path.
- With one maintainer, maintainer pull requests need no approval and
  rely on the checks and the window. With two or more, every pull
  request needs one approval from someone other than its author, and
  high-risk paths need a code owner's approval after the last push.
- AI-assisted changes are held to CONTRIBUTING.md, "AI-assisted
  changes".

## Security

Reports go privately, per [SECURITY.md](SECURITY.md), which also says
how a fix is released and described. Every maintainer has access to
private reports and the security inbox.

## Access and continuity

Once there are two maintainers, each of these is held by every
maintainer, so that no one account can stop a release or a security
fix:

- GitHub organisation owner;
- npm organisation owner, and reviewer on the repository's `npm`
  publishing environment;
- the hosting account for intelligo.dev and the domain registration;
- the security inbox.

Releases need no personal token: npm publishes from the release
workflow through trusted publishing.

## Changing this file

A pull request, merged by a maintainer; with two or more maintainers,
with the approval of every maintainer.
