/**
 * The admin console's product slots — consumer-owned, server-side (the
 * console's pages import it; no client component does, so a slot may
 * read the database).
 *
 * - `brandKey`: the fully-qualified message key of the name at the top of
 *   the sidebar.
 * - `backHref`: where "Back to the app" goes.
 * - `overviewPanels`: the product's own panels, rendered first on the
 *   overview, above the platform's (the work waiting for review, the
 *   numbers the product is run by).
 * - `workspacePanels(workspaceId)`: the product's own panels on a
 *   workspace's support page, under its stats and support actions.
 * - `auditFilterPlaceholderKey`: the message key of the hint in the
 *   operations page's audit filter — an action name the product records.
 *
 * A slot is called on the server for each request and may be async. One
 * that throws is reported as unreadable in its place; the rest of the page
 * still renders. Its copy belongs in a message namespace of the product's.
 */

import type { ReactNode } from "react";

export interface AdminConfig {
  brandKey: string;
  backHref: string;
  overviewPanels?: () => ReactNode | Promise<ReactNode>;
  workspacePanels?: (workspaceId: string) => ReactNode | Promise<ReactNode>;
  auditFilterPlaceholderKey: string;
}

export const adminConfig: AdminConfig = {
  brandKey: "admin-console.brand",
  backHref: "/dashboard",
  auditFilterPlaceholderKey: "admin-console.operations.audit.filter",
};
