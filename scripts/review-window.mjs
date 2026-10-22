#!/usr/bin/env node
/**
 * Sets the `review-window` commit status on open pull requests into
 * main.
 *
 * A pull request that touches a high-risk path (.github/CODEOWNERS) or
 * carries the `security` label is pending until 24 hours after this
 * app first marked its head commit pending, then success. The
 * `security-embargo` label releases it at once, but only when a
 * repository admin applied it. The status is posted with the
 * review-window GitHub App's token, whose key only runs on main can
 * read; the main ruleset accepts this context from that app alone.
 *
 *   PR_NUMBER=123 node scripts/review-window.mjs   # one pull request
 *   node scripts/review-window.mjs                 # every open one
 */
import { readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { highRiskPatterns, matchesPattern } from "./review-policy.mjs";

export const CONTEXT = "review-window";
export const WINDOW_MS = 24 * 60 * 60 * 1000;
/** The pull-request files API stops listing at this many files. */
export const FILE_LIST_CAP = 3000;

/**
 * Whether the pull request is held: it carries the `security` label,
 * touches a high-risk path (a rename counts by either name), or has
 * more files than the API lists, so the unlisted ones could be any.
 */
export function isRisky({ files, labels, patterns }) {
  if (labels.includes("security")) return true;
  if (files.length >= FILE_LIST_CAP) return true;
  return files.some((f) =>
    [f.filename, f.previous_filename]
      .filter(Boolean)
      .some((p) => patterns.some((pattern) => matchesPattern(pattern, p)))
  );
}

/**
 * When the window started: the earliest pending status the app posted
 * on the commit, or now when it has posted none.
 */
export function clockStart(statuses, app, now) {
  const pending = statuses.filter(
    (s) =>
      s.context === CONTEXT && s.state === "pending" && s.creator?.login === app
  );
  if (pending.length === 0) return now;
  return Math.min(...pending.map((s) => Date.parse(s.created_at)));
}

/** The status the commit should carry. */
export function windowState({ risky, embargo, firstSeen, now }) {
  if (!risky) return { state: "success", description: "No high-risk path" };
  if (embargo) {
    return { state: "success", description: "Embargoed security fix" };
  }
  const opens = firstSeen + WINDOW_MS;
  if (now >= opens) {
    return { state: "success", description: "24-hour review window passed" };
  }
  const at = new Date(opens).toISOString().slice(0, 16).replace("T", " ");
  return {
    state: "pending",
    description: `High-risk paths: mergeable after ${at} UTC`,
  };
}

/**
 * Runs `check` on every pull request, one at a time. A failure on one
 * is reported and the rest are still checked, so a single bad pull
 * request cannot leave every later one pending. Returns how many
 * failed.
 */
export async function sweep(prs, check, report = console.log) {
  let failed = 0;
  for (const pr of prs) {
    try {
      await check(pr);
    } catch (error) {
      failed++;
      report(`::error::#${pr.number}: ${error.message}`);
    }
  }
  return failed;
}

const API = `https://api.github.com/repos/${process.env.GITHUB_REPOSITORY}`;

class GitHubError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

async function gh(path, init = {}) {
  const url = path.startsWith("http") ? path : `${API}${path}`;
  const res = await fetch(url, {
    ...init,
    headers: {
      accept: "application/vnd.github+json",
      authorization: `Bearer ${process.env.GH_TOKEN}`,
      "content-type": "application/json",
      "x-github-api-version": "2022-11-28",
    },
  });
  if (!res.ok) {
    throw new GitHubError(
      `${init.method ?? "GET"} ${path}: ${res.status}`,
      res.status
    );
  }
  return res.json();
}

async function all(path) {
  const sep = path.includes("?") ? "&" : "?";
  const out = [];
  for (let page = 1; ; page++) {
    const batch = await gh(`${path}${sep}per_page=100&page=${page}`);
    out.push(...batch);
    if (batch.length < 100) return out;
  }
}

/** Whether the latest `security-embargo` label came from an admin. */
async function embargoedByAdmin(pr) {
  if (!pr.labels.some((l) => l.name === "security-embargo")) return false;
  const events = await all(`/issues/${pr.number}/events`);
  const applied = events
    .filter(
      (e) => e.event === "labeled" && e.label?.name === "security-embargo"
    )
    .at(-1);
  if (!applied?.actor?.login) return false;
  try {
    const { permission } = await gh(
      `/collaborators/${applied.actor.login}/permission`
    );
    return permission === "admin";
  } catch (error) {
    // A deleted account, or one that is no longer a collaborator.
    if (error.status === 404) return false;
    throw error;
  }
}

async function evaluate(pr, patterns, app, now) {
  const sha = pr.head.sha;
  const files = await all(`/pulls/${pr.number}/files`);
  const labels = pr.labels.map((l) => l.name);
  const statuses = await all(`/commits/${sha}/statuses`);
  const next = windowState({
    risky: isRisky({ files, labels, patterns }),
    embargo: await embargoedByAdmin(pr),
    firstSeen: clockStart(statuses, app, now),
    now,
  });
  // Statuses come newest first.
  const latest = statuses.find(
    (s) => s.context === CONTEXT && s.creator?.login === app
  );
  const same =
    latest?.state === next.state && latest?.description === next.description;
  if (same) return;
  await gh(`/statuses/${sha}`, {
    method: "POST",
    body: JSON.stringify({ ...next, context: CONTEXT }),
  });
  console.log(`#${pr.number} ${sha.slice(0, 7)}: ${next.state}`);
}

async function main() {
  const codeowners = readFileSync(".github/CODEOWNERS", "utf8");
  const patterns = highRiskPatterns(codeowners);
  const app = process.env.REVIEW_APP_LOGIN;
  if (!app) throw new Error("REVIEW_APP_LOGIN is not set");
  const now = Date.now();
  const prs = process.env.PR_NUMBER
    ? [await gh(`/pulls/${process.env.PR_NUMBER}`)]
    : await all("/pulls?state=open&base=main");
  const failed = await sweep(
    prs.filter((pr) => pr.base.ref === "main"),
    (pr) => evaluate(pr, patterns, app, now)
  );
  if (failed > 0) process.exitCode = 1;
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  await main();
}
