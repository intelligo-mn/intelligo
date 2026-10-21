## Why

<!-- What this changes and why. Link the issue it closes. -->

## Review

- [ ] AI-assisted: an agent wrote part of this diff
- [ ] Touches a high-risk path (the "High risk" section of `.github/CODEOWNERS`); the review-window check holds it for 24 hours after it is first seen as high-risk

<!-- If either box is ticked: the files you read line by line, and any test assertion you changed or removed, and why. -->

## Checklist

- [ ] One concern, with a conventional commit subject
- [ ] A test that fails without the change (a case in `tests/architecture/` for a boundary change)
- [ ] `pnpm type-check && pnpm lint && pnpm test` pass locally
- [ ] Public API (exports, CLI flags and output, environment variables, the schema) changes only as [RELEASES.md](../RELEASES.md) allows: removals and changes of meaning wait for a major, after a deprecation
- [ ] A `CHANGELOG.md` entry under `[Unreleased]` for anything a consumer notices
- [ ] No product vocabulary in a package; installed registry components are not edited (a seam in `packages/registry/base/` instead)
