import "server-only";

/**
 * The local-payment ledger (`payments`): invoices a registered payment
 * provider opened, across every workspace, with the workspace's name.
 * Cross-tenant by design: it checks that a platform admin is asking.
 */

import { db } from "@intelligo-dev/core/db";
import { organization, payments, users } from "@intelligo-dev/core/db/schema";
import { fromMinor, type Money } from "@intelligo-dev/core/money";
import { and, count, desc, eq, inArray, type SQL } from "drizzle-orm";

import { pageBounds, type Paged } from "./directory";
import { assertPlatformAdmin } from "./gate";

export type PaymentRow = {
  id: string;
  provider: string;
  /** The provider's own id for the invoice. */
  invoiceId: string | null;
  /** What was bought, as the deployment's offers name it. */
  reference: string;
  amount: Money;
  /** `opening`, `pending`, `paid` or `failed`. */
  status: string;
  /** When the plan or credit was granted; null for a paid row means it never was. */
  fulfilledAt: Date | null;
  expiresAt: Date | null;
  createdAt: Date;
  workspaceId: string;
  workspaceName: string | null;
  userId: string | null;
  userEmail: string | null;
};

/**
 * Invoices, newest first, optionally for one workspace or in the given
 * statuses (one, or any of several).
 */
export async function listPayments(input: {
  workspaceId?: string;
  status?: string | readonly string[];
  limit: number;
  offset?: number;
}): Promise<Paged<PaymentRow>> {
  await assertPlatformAdmin();
  const { limit, offset } = pageBounds(input);
  const statuses =
    typeof input.status === "string" ? [input.status] : (input.status ?? []);
  const filters: SQL[] = [];
  if (input.workspaceId)
    filters.push(eq(payments.workspaceId, input.workspaceId));
  if (statuses.length > 0)
    filters.push(inArray(payments.status, [...statuses]));
  const where = filters.length > 0 ? and(...filters) : undefined;

  const [rows, [counted]] = await Promise.all([
    db
      .select({
        id: payments.id,
        provider: payments.provider,
        invoiceId: payments.invoiceId,
        reference: payments.reference,
        amountMinor: payments.amountMinor,
        currency: payments.currency,
        status: payments.status,
        fulfilledAt: payments.fulfilledAt,
        expiresAt: payments.expiresAt,
        createdAt: payments.createdAt,
        workspaceId: payments.workspaceId,
        workspaceName: organization.name,
        userId: payments.userId,
        userEmail: users.email,
      })
      .from(payments)
      .leftJoin(organization, eq(organization.id, payments.workspaceId))
      .leftJoin(users, eq(users.id, payments.userId))
      .where(where)
      .orderBy(desc(payments.createdAt), desc(payments.id))
      .limit(limit)
      .offset(offset),
    db.select({ n: count() }).from(payments).where(where),
  ]);

  return {
    rows: rows.map(({ amountMinor, currency, ...row }) => ({
      ...row,
      amount: fromMinor(Number(amountMinor), currency.toUpperCase()),
      workspaceName: row.workspaceName ?? null,
      userEmail: row.userEmail ?? null,
    })),
    total: Number(counted?.n ?? 0),
  };
}
