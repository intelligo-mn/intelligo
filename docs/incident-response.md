# Incident response

What the maintainers do when a vulnerability is reported, or when
something the release depends on is compromised: a credential, the
publish path to npm, or the site that serves the page registry.
[SECURITY.md](../SECURITY.md) is the promise to reporters and users; this
is how it is kept.

## Roles

One person may hold several of these; with one maintainer on hand, that
person holds all of them. Name who holds each in the private report or
the incident's private notes when the work starts.

- **Lead** — owns the incident from first report to the last message:
  sets severity, decides what is revoked and when, and closes it.
- **Fixer** — writes and tests the fix, privately, and prepares the
  release commit.
- **Communicator** — keeps the reporter informed, and writes the
  changelog entry, the release notes and the announcement.

Nothing about an open incident goes into a public issue, pull request,
commit message, branch name or discussion before the fix is released.

## Severity and timelines

| Severity | Examples                                                                                                                                                                          | Contain                 | Fix released (from triage) |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- | -------------------------- |
| Critical | A published version or a hosted registry item that was not built from main; a credential that can publish to npm or deploy intelligo.dev in other hands; cross-tenant data access | Within 1 hour of notice | 7 days                     |
| High     | Privilege escalation inside a workspace, charging or crediting the wrong workspace, an execution that escapes its record                                                          | Within 1 day            | 14 days                    |
| Medium   | A flaw that needs an unusual configuration or an already-privileged user                                                                                                          | —                       | 30 days                    |
| Low      | Hardening with a plausible but undemonstrated impact                                                                                                                              | —                       | 90 days                    |

A report is acknowledged within 72 hours and triaged within 7 days, as
SECURITY.md says. "Contain" means the exposure has stopped growing:
the credential is revoked, the publish path is closed, the bad content
is no longer served. It comes before understanding the whole incident.

## Every incident

1. **Open a private record.** A reported vulnerability already has one:
   the private report on GitHub. For anything else, open a private
   report on the repository yourself, so the timeline, the decisions and
   the fix live in one private place.
2. **Contain.** Follow the section below that matches, if one does.
3. **Find the window.** When did exposure start and end? Which versions,
   deployments or registry items are affected? Write the answer down;
   the announcement is built from it.
4. **Fix and release** (below).
5. **Tell users** (below).
6. **Close.** Note what made the incident possible and the change that
   stops it recurring (a test, a setting, a narrower token), and track
   that change to done.

## A compromised npm account or token

The release workflow holds no npm token; a maintainer's npm account
holds the only long-lived npm credential, used for
`scripts/npm-maintain.mjs`.

1. On npmjs.com, revoke every token of the account (`npm token list`,
   `npm token revoke <id>`), change the password and re-enrol two-factor
   authentication.
2. Check who can publish: the organisation's members and each
   package's maintainers. Remove anyone who should not be there.
3. Check what was published:
   `npm view @intelligo-dev/<package> time --json` for every package.
   Every legitimate version has a release run on main and a `vX.Y.Z`
   tag. From 1.0.0 on, each also has provenance; the early betas were
   published without it. Check each suspect version directly with
   `npm view @intelligo-dev/<package>@<version> dist.attestations`, and
   compare the provenance it names with the release run and the tag.
4. For a version that is not one of ours: ask npm support to remove it as
   malicious, deprecate it at once
   (`npm deprecate "@intelligo-dev/<package>@<version>" "<message>"`),
   and publish a clean release above it (below) so that `latest` and the
   `^` ranges consumers hold resolve to a version we built.
5. Set each package's publishing access to require two-factor
   authentication and disallow tokens, so trusted publishing is the only
   way to publish.

## A compromised trusted publisher

npm accepts a publish from the `npm` environment of this repository's
`release.yml`. That path is compromised when a change to the workflow,
the environment or a release commit reached main that should not have,
or when repository write access is in other hands.

1. On npmjs.com, remove the trusted publisher from every
   `@intelligo-dev/*` package. Nothing publishes until it is restored.
2. Cancel any running Release workflow, and review the repository's
   collaborators, deploy keys, environments and recent pushes to main.
   Revoke anything unexpected.
3. Check what was published, as in steps 3 and 4 of the npm section.
4. Restore main to a known-good commit through a reviewed pull request,
   put required reviewers on the `npm` environment if it has none, and
   only then add the trusted publisher back and cut a clean release.

## A compromised Cloudflare token

`CLOUDFLARE_API_TOKEN` deploys intelligo.dev, which serves the hosted
page registry at `/r`. Content served there is installed into
applications as source, so a tampered item is a supply-chain incident,
not a defaced page.

1. In the Cloudflare dashboard, roll or delete the token, and check the
   account's audit log for what it was used for.
2. Check the site's deployments (`wrangler deployments list` in
   `apps/website`). If one did not come from a release run, roll back to
   the last one that did (`wrangler rollback <id>`).
3. Compare what `/r` serves with the release's committed copy,
   `apps/website/public/r/<version>/` at the tag `vX.Y.Z`. If any item
   differed, everyone who installed it from intelligo.dev in that window
   is affected: `intelligo sync --check` compares an installed item with
   the registry the CLI carries from npm, which the token cannot reach.
4. Create a new token limited to deploying this Worker on this account,
   store it as the repository's `CLOUDFLARE_API_TOKEN` secret, and
   re-run the last release's deploy job.

## A leaked `BETTER_AUTH_SECRET`

The secret belongs to a deployment, not to this repository; CI uses a
dummy value. The framework is involved when a template, the scaffold, a
registry item or the documentation exposed one, or when a deployment's
operator asks for help. Either way, the deployment that leaked it:

1. Generates a new value (`openssl rand -base64 32`; `intelligo doctor`
   refuses a short one), sets it and redeploys. Everything Better-Auth
   signed with the old value stops verifying, so every user signs in
   again.
2. Ends every session that existed before the rotation
   (`DELETE FROM sessions;`), so none outlives it.
3. Reviews the audit trail for the window: platform-admin grants,
   impersonations and role changes. `intelligo admin revoke <email>`
   removes a platform admin who should not be one and ends their
   sessions.

If the framework exposed the secret, the fix removes the exposure, the
release notes tell deployments to rotate, and the scaffold or item is
fixed so a new application cannot repeat it.

## Fix and release

1. Develop the fix privately: in the private report's temporary fork, or
   a branch that is not pushed to the public repository. Its test fails
   without the fix.
2. Write the advisory in the private report: the affected packages and
   ranges (`>=X.Y.Z <fixed`, from the window found above), the patched
   version, a CVSS 4.0 vector, the CWE, and what a deployment must do.
   Request a CVE from it. The draft already has its GHSA id.
3. Cut the release as any release is cut ([AGENTS.md](../AGENTS.md)): one
   commit that bumps every published manifest to the next patch version
   and heads `CHANGELOG.md` with its section, opening with
   **Upgrade:** required. The entry goes under `### Security`, says what
   was wrong in neutral terms, without the steps to reproduce it, and
   links the advisory by its GHSA id (`scripts/release-notes.mjs`
   refuses the release otherwise); what a deployment must do (upgrade,
   run `intelligo sync <item>`, rotate a secret) goes under
   `### Upgrading`.
4. Merge the fix and the release commit to main together, so as little
   time as possible passes between the fix being public and the version
   being on npm. CI passing on main starts the Release workflow: it
   publishes with provenance, tags `vX.Y.Z`, creates the GitHub release
   from the changelog section and deploys intelligo.dev.
5. Check it landed: `npm view @intelligo-dev/core dist-tags`, the
   release run's summary, and `/r` serving the new version.
6. Publish the advisory, then add it to SECURITY.md's published
   advisories and deprecate the affected versions:
   `scripts/npm-deprecations.json` gets an entry per affected package
   with the range and the advisory, and a maintainer runs
   `node scripts/npm-maintain.mjs`.
7. Every line SECURITY.md lists as supported gets the fix. A line past
   its end date does not.

## Telling users

- **The GitHub security advisory** is the record: GitHub alerts every
  repository that depends on an affected version through Dependabot, and
  `npm audit` reports it. The reporter is credited on it unless they
  asked not to be.
- **The changelog and the GitHub release notes** carry the fix, a link
  to the advisory, the versions to upgrade to and the steps under
  `### Upgrading`.
- **npm** marks the affected versions deprecated, naming the advisory,
  so an install of one warns.
- **A post in GitHub Discussions** (Announcements) the day the release
  lands: what is affected, the window for a compromise, the versions to
  upgrade to, and what a deployment must do. It links the release and
  repeats nothing the changelog does not say.
- **The reporter** hears before anyone else, with the release date.

None of these describe how to exploit the flaw. Once the fix is out,
the record in the private report is closed with a link to the release.
