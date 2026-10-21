import "server-only";

/**
 * The console's gates, for its pages and for a product's own pages under
 * `/admin`.
 *
 * `adminPage(action, resource?)` composes the framework, then requires a
 * platform admin and records the visit (`requireAdmin`), or answers 404:
 * a "not authorized" page would say the route exists. A layout does not
 * guard a page's reads or its server actions, so every page calls this
 * itself, and every action authorizes with `requireAdminOrRefuse`.
 *
 * `adminLayoutGate()` is the layout's check: the same 404, with no audit
 * row, so a visit is recorded once — by the page.
 *
 * Anything other than "not an admin" (the database is down) is thrown to
 * the console's error boundary rather than hidden behind the 404.
 */

import { notFound } from "next/navigation";

import {
  isPlatformAdmin,
  requireAdmin,
  type AdminActor,
} from "@intelligo-dev/admin";
import { isAuthGuardError } from "@intelligo-dev/auth";

import { composeIntelligo } from "@/lib/intelligo";

export async function adminPage(
  action: string,
  resource?: { kind: string; id?: string; workspaceId?: string }
): Promise<AdminActor> {
  composeIntelligo();
  try {
    return await requireAdmin(action, resource);
  } catch (error) {
    if (isAuthGuardError(error)) notFound();
    throw error;
  }
}

export async function adminLayoutGate(): Promise<void> {
  composeIntelligo();
  if (!(await isPlatformAdmin())) notFound();
}
