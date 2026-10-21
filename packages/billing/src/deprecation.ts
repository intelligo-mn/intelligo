/**
 * Runtime notice for a deprecated call: a Node `DeprecationWarning`
 * carrying the API's `INTELLIGO_DEPnnnn` code, once per code per process.
 * It reaches logs, `--no-deprecation` silences it and
 * `--throw-deprecation` turns it into an error, as with Node's own.
 * Internal to the package; not an entry point.
 */

const warned = new Set<string>();

export function warnDeprecated(code: string, message: string): void {
  if (warned.has(code)) return;
  warned.add(code);
  // A runtime without `process.emitWarning` (an edge or browser bundle)
  // still gets the notice.
  if (
    typeof process !== "undefined" &&
    typeof process.emitWarning === "function"
  ) {
    process.emitWarning(message, { type: "DeprecationWarning", code });
  } else {
    console.warn(`[${code}] ${message}`);
  }
}

/** Forgets which codes have warned, so each test sees a first call. */
export function resetDeprecationWarningsForTests(): void {
  warned.clear();
}
