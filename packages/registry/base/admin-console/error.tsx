"use client";

/**
 * The admin console's error boundary, inside its own layout. Renders the
 * shared `RouteError` from the `route-error` item.
 */

import { RouteError } from "@/components/shared/route-error";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <RouteError
      error={error}
      reset={reset}
      scope="admin"
      homeHref="/admin"
      homeKey="goHome"
    />
  );
}
