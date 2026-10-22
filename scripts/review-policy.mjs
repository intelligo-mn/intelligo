/**
 * The high-risk paths, read from the section of .github/CODEOWNERS
 * between its "High risk" markers, and the matcher for the subset of
 * CODEOWNERS syntax that file uses.
 */
const BEGIN = "# --- High risk: begin";
const END = "# --- High risk: end";

/** The patterns of the high-risk section. */
export function highRiskPatterns(codeowners) {
  const lines = codeowners.split("\n");
  const start = lines.findIndex((l) => l.startsWith(BEGIN));
  const end = lines.findIndex((l) => l.startsWith(END));
  if (start === -1 || end <= start) {
    throw new Error("CODEOWNERS has no high-risk section");
  }
  return lines
    .slice(start + 1, end)
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("#"))
    .map((l) => l.split(/\s+/)[0]);
}

/**
 * Whether a repository path matches a pattern: a leading "/" anchors it
 * to the root, a trailing "/" makes it a directory prefix, "*" matches
 * within one segment and "**" across segments.
 */
export function matchesPattern(pattern, file) {
  const anchored = pattern.startsWith("/");
  const body = pattern.replace(/^\//, "");
  const glob = body
    .replace(/[.+?^${}()|[\]\\]/g, "\\$&")
    .replace(/\*\*/g, "\0")
    .replace(/\*/g, "[^/]*")
    .replace(/\0/g, ".*");
  const tail = body.endsWith("/") ? "" : "$";
  const head = anchored ? "^" : "(^|/)";
  return new RegExp(`${head}${glob}${tail}`).test(file);
}

/** Whether a path falls under any of the patterns. */
export function isHighRisk(patterns, file) {
  return patterns.some((pattern) => matchesPattern(pattern, file));
}
