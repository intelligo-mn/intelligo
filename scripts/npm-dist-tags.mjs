/**
 * The dist-tag moves a package's tags need, as npm argument lists:
 * scripts/npm-maintain.mjs runs them, since the release workflow's
 * identity can only publish.
 *
 * - `next` never resolves below `latest`. Promoting a minor publishes
 *   the same tree as a plain X.Y.0 under `latest`, which leaves `next`
 *   on the last X.Y.0-next.N; `npx @intelligo-dev/cli@next` would then
 *   install something older than a bare install. It moves to `latest`.
 * - A retired tag (`beta`, the channel before 1.0) is removed.
 * - `latest` is never moved: it is the release workflow's.
 */
import { compareVersions } from "../apps/website/scripts/registry-release.mjs";

export function planDistTags({ name, tags, retired = [] }) {
  const plan = [];
  if (tags.next && tags.latest && compareVersions(tags.next, tags.latest) < 0)
    plan.push(["dist-tag", "add", `${name}@${tags.latest}`, "next"]);
  for (const tag of retired) {
    if (tag !== "latest" && tag in tags)
      plan.push(["dist-tag", "rm", name, tag]);
  }
  return plan;
}
