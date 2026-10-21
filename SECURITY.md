# Security policy

## Reporting a vulnerability

Report security issues privately. **Do not open a public issue,
discussion or pull request.**

- **Preferred:** [report it privately on GitHub](https://github.com/intelligo-dev/intelligo/security/advisories/new).
  Only you and the maintainers can see the report, and the fix is
  discussed there.
- **Email:** **security@intelligo.dev**, if you cannot use GitHub.

Include:

- what the issue is and which package (and version), registry item or
  route it affects;
- the steps or request that reproduce it;
- what an attacker gets from it (data read, data written, access gained,
  money moved).

## What happens next

| Step                                                           | Within             |
| -------------------------------------------------------------- | ------------------ |
| A person acknowledges the report                               | 72 hours           |
| Triage: valid or not, severity and affected versions, told you | 7 days             |
| Fix released on every supported line                           | by severity, below |

Severity is assessed with CVSS 4.0 and told to you at triage; you can
dispute it.

| Severity | Fix released within (from triage)    |
| -------- | ------------------------------------ |
| Critical | 7 days                               |
| High     | 14 days                              |
| Medium   | 30 days                              |
| Low      | 90 days, or the next minor if sooner |

If a deadline cannot be met (for example, the fix waits on an upstream
release), you are told why and given a new date before it passes, along
with any mitigation a deployment can apply itself.

The fix is listed in [CHANGELOG.md](CHANGELOG.md) under `### Fixed` or
`### Changed`, with what to change under `### Upgrading`. A fix may change
behaviour in a patch release when that behaviour is the vulnerability
([RELEASES.md](RELEASES.md)). How the maintainers run a report or an
incident from triage to release is
[docs/incident-response.md](docs/incident-response.md).

## Disclosure

Disclosure is coordinated. A vulnerability stays private until its fix is
released, and no longer than 90 days after triage. If no fix is released
by then, the maintainers agree with you what is published and when,
together with whatever mitigation exists. You are credited in the release
notes unless you ask not to be.

## Safe harbour

Research that follows this policy in good faith will not be pursued by
the maintainers: stay within your own accounts and data, test against
your own deployment and never someone else's, do not degrade a service
for others, and give the maintainers the time above before saying
anything in public. If something in this policy is unclear, ask through
the channels above before you act.

## Supported versions

All `@intelligo-dev/*` packages are released together at one version.

| Version         | Status              | Security fixes |
| --------------- | ------------------- | -------------- |
| 1.2.x           | Supported (current) | All severities |
| 1.1.x and older | Unsupported         | None: upgrade  |
| 1.0.0-beta.\*   | Unsupported         | None: upgrade  |

An older line that is still supported names the date its fixes end, as
`Supported until YYYY-MM-DD`. How long a line is supported is in
[RELEASES.md](RELEASES.md).

The current stable minor is the one npm tags `latest`. While `main`
carries the next minor on the `next` channel, fixes for a supported line
are cut from its `release/X.Y` branch and published as patch releases,
so a fix never brings unreleased features with it. `next` prereleases
receive fixes in the next `-next.N`; a superseded prerelease is not
supported. A release carrying a security fix says **Upgrade:** required
at the top of its changelog section and its GitHub release.

Registry items are source you own once installed and have no version of
their own: a fix to an item ships in a release. Upgrade `@intelligo-dev/cli`
and every `@intelligo-dev/*` package to the fixed version and run
`intelligo sync <item>`.

## How the framework is secured

What the framework enforces and what it leaves to the application, with
the production checklist and per-package threat models as they are
published: https://intelligo.dev/docs/security.

## What is in scope

The published `@intelligo-dev/*` packages, the registry items served at
`intelligo.dev/r`, the application `@intelligo-dev/cli` scaffolds, and the
reference application. The parts most worth your attention, because
getting them wrong is how a tenant sees another tenant's data or a
customer is charged wrongly:

- **tenant isolation** — any query reachable from a request that is not
  scoped by `workspaceId`, or by `userId` where the data is user-private;
- **authorization** — a platform-admin surface reachable through a
  workspace role, or a workspace role escalating itself;
- **the execution boundary** — a way to consume model tokens without an
  execution record, to settle the same execution twice, or to keep a
  credit hold open indefinitely;
- **client data** — anything a browser sends that reaches server state
  (the transcript, a conversation row, the model's input) other than the
  user's own text, files and data parts, the answer to a tool approval,
  or the result of a tool the client runs;
- **impersonation** — acting as a user without an audit event, or a
  session that outlives its 30-minute cap;
- **webhooks** — accepting a Stripe event without a valid signature, or
  replaying one;
- **the scaffold and the registry** — an application `intelligo create`
  or an installed item sets up insecurely by default, such as a secret
  committed, a route left unauthenticated or a check skipped.

## What is out of scope

Findings that require a platform administrator to already be
compromised, denial of service through ordinary volume, missing
hardening headers with no demonstrated impact, and reports produced
solely by an automated scanner with no working reproduction. A product
built on Intelligo is its owner's: report it to them, unless the flaw is
in the framework it uses.
