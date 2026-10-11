import { SITE } from "@/lib/site";

/**
 * The repository's star count, asked of GitHub once per build so the
 * nav's star button carries a number in its HTML from the first paint.
 * Every page shares the one request. A failed or slow answer is
 * `undefined`: the build goes on and the button fills in on the client.
 */
let pending: Promise<number | undefined> | undefined;

export function getGitHubStars(): Promise<number | undefined> {
  if (!SITE.githubPublic) return Promise.resolve(undefined);
  pending ??= fetch(
    `https://api.github.com/repos/${SITE.githubOwner}/${SITE.githubRepo}`,
    {
      headers: { accept: "application/vnd.github+json" },
      signal: AbortSignal.timeout(5000),
    }
  )
    .then((r) => (r.ok ? r.json() : null))
    .then((data: { stargazers_count?: unknown } | null) =>
      typeof data?.stargazers_count === "number"
        ? data.stargazers_count
        : undefined
    )
    .catch(() => undefined);
  return pending;
}
