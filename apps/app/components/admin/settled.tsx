import "server-only";

/**
 * One read of a console page, rendered on its own: a read that failed
 * says so in its place and goes to the server log, and the rest of the
 * page still renders — the console exists to be readable while things
 * are broken.
 *
 * A page starts its reads with `Promise.allSettled` and hands each
 * result to `settled` with what it was, as a key in the `admin-console`
 * namespace's `reads` (or any fully-qualified key the product owns).
 */

import { createLogger } from "@intelligo-dev/core/logger";
import { useTranslations } from "next-intl";
import type { ReactNode } from "react";

const log = createLogger("admin-console");

/** In place of a read that failed. */
export function Unavailable({ what }: { what: string }) {
  const t = useTranslations();
  const name = t.has(what) ? t(what) : what;
  return (
    <p className="text-sm text-muted-foreground">
      {t("admin-console.unavailable", { what: name })}
    </p>
  );
}

export function settled<T>(
  result: PromiseSettledResult<T>,
  render: (value: T) => ReactNode,
  what: string
): ReactNode {
  if (result.status === "fulfilled") return render(result.value);
  const reason: unknown = result.reason;
  log.error("An admin read failed", {
    what,
    error:
      reason instanceof Error
        ? (reason.stack ?? reason.message)
        : String(reason),
  });
  return <Unavailable what={what} />;
}
