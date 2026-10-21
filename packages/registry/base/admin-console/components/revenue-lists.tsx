import "server-only";

/**
 * The revenue page's two paged lists: the local-payment ledger (a row
 * opens the invoice beside the list, with a link to its workspace) and the
 * usage ledger (a row whose charge differs from what its recorded rate
 * gives is flagged — the pricing pipeline is broken somewhere).
 */

import type { Paged, PaymentRow, UsageRecordRow } from "@intelligo-dev/admin";
import { getTranslations } from "next-intl/server";

import { DataList, type ListRow } from "@/components/admin/data-list";
import { PaymentStatus, toneOf } from "@/components/admin/panel";
import { Properties } from "@/components/admin/properties";
import { adminFormat, type AdminFormat } from "@/lib/admin-format";
import type { ListQuery } from "@/lib/admin-list";

type T = Awaited<ReturnType<typeof getTranslations>>;

const PAYMENT_STATUSES = ["opening", "pending", "paid", "failed"] as const;

function paymentRow(p: PaymentRow, t: T, tStatus: T, f: AdminFormat): ListRow {
  const ungranted = p.status === "paid" && !p.fulfilledAt;
  return {
    id: p.id,
    cells: {
      date: f.dateTime(p.createdAt),
      workspace: {
        text: p.workspaceName ?? p.workspaceId,
        note: p.userEmail ?? undefined,
      },
      reference: p.reference,
      status: {
        text: "",
        badge: tStatus.has(p.status) ? tStatus(p.status) : p.status,
        tone: ungranted ? "destructive" : toneOf(p.status),
        note: ungranted ? t("notGranted") : undefined,
      },
      amount: f.money(p.amount),
    },
  };
}

function PaymentPanel({ p, t, f }: { p: PaymentRow; t: T; f: AdminFormat }) {
  return (
    <Properties
      properties={[
        { key: "amount", label: t("amount"), value: f.money(p.amount) },
        {
          key: "workspace",
          label: t("workspace"),
          value: p.workspaceName ?? p.workspaceId,
        },
        { key: "user", label: t("user"), value: p.userEmail },
        { key: "provider", label: t("provider"), value: p.provider },
        { key: "invoice", label: t("invoice"), value: p.invoiceId, mono: true },
        { key: "created", label: t("date"), value: f.dateTime(p.createdAt) },
        { key: "expires", label: t("expires"), value: f.dateTime(p.expiresAt) },
        {
          key: "fulfilled",
          label: t("fulfilled"),
          value: f.dateTime(p.fulfilledAt),
        },
      ]}
    />
  );
}

export async function PaymentList({
  page,
  query,
}: {
  page: Paged<PaymentRow>;
  query: ListQuery;
}) {
  const t = await getTranslations("admin-console.revenue.payments");
  const tStatus = await getTranslations("admin-console.status");
  const f = await adminFormat();
  const open = page.rows.find((p) => p.id === query.open) ?? null;
  const statuses = PAYMENT_STATUSES.map((value) => ({
    value,
    label: tStatus(value),
  }));

  return (
    <DataList
      columns={[
        { key: "date", header: t("date") },
        { key: "workspace", header: t("workspace") },
        { key: "reference", header: t("reference") },
        { key: "status", header: t("status") },
        { key: "amount", header: t("amount"), className: "text-right" },
      ]}
      rows={page.rows.map((p) => paymentRow(p, t, tStatus, f))}
      total={page.total}
      page={query.page}
      pageSize={query.size}
      facets={[{ key: "status", label: t("status"), options: statuses }]}
      filters={query.filters}
      openId={open?.id ?? null}
      panelTitle={open?.reference}
      panelDescription={
        open ? (
          <PaymentStatus status={open.status} fulfilledAt={open.fulfilledAt} />
        ) : undefined
      }
      fullPageHref={open ? `/admin/users/${open.workspaceId}` : undefined}
      panel={open ? <PaymentPanel p={open} t={t} f={f} /> : undefined}
      empty={t("empty")}
    />
  );
}

function ledgerRow(r: UsageRecordRow, t: T, f: AdminFormat): ListRow {
  const mismatch =
    r.expectedCharge !== null && r.expectedCharge.amount !== r.charged.amount;
  return {
    id: r.id,
    cells: {
      date: f.dateTime(r.recordedAt),
      who: { text: r.userEmail ?? "", note: r.workspaceName ?? undefined },
      model: {
        text: r.model ?? r.type,
        note: r.agent ?? undefined,
        mono: true,
      },
      cost: f.money(r.providerCost),
      charged: {
        text: f.money(r.charged),
        ...(mismatch && r.expectedCharge
          ? {
              badge: t("expected", { amount: f.money(r.expectedCharge) }),
              tone: "destructive" as const,
            }
          : {}),
      },
    },
  };
}

function LedgerPanel({ r, t, f }: { r: UsageRecordRow; t: T; f: AdminFormat }) {
  const tokens = t("inOut", {
    input: f.number(r.inputTokens),
    output: f.number(r.outputTokens),
  });
  return (
    <Properties
      properties={[
        { key: "type", label: t("type"), value: r.type },
        { key: "user", label: t("who"), value: r.userEmail },
        { key: "workspace", label: t("workspace"), value: r.workspaceName },
        { key: "agent", label: t("agent"), value: r.agent },
        { key: "tokens", label: t("tokens"), value: tokens },
        { key: "cost", label: t("cost"), value: f.money(r.providerCost) },
        { key: "charged", label: t("charged"), value: f.money(r.charged) },
        {
          key: "expected",
          label: t("expectedCharge"),
          value: r.expectedCharge ? f.money(r.expectedCharge) : null,
        },
        { key: "id", label: t("id"), value: r.id, mono: true },
      ]}
    />
  );
}

export async function UsageLedger({
  rows,
  total,
  query,
}: {
  rows: UsageRecordRow[];
  total: number;
  query: ListQuery;
}) {
  const t = await getTranslations("admin-console.revenue.ledger");
  const f = await adminFormat();
  const open = rows.find((r) => r.id === query.open) ?? null;

  return (
    <DataList
      columns={[
        { key: "date", header: t("date") },
        { key: "who", header: t("who") },
        { key: "model", header: t("model") },
        { key: "cost", header: t("cost"), className: "text-right" },
        { key: "charged", header: t("charged"), className: "text-right" },
      ]}
      rows={rows.map((r) => ledgerRow(r, t, f))}
      total={total}
      page={query.page}
      pageSize={query.size}
      openId={open?.id ?? null}
      panelTitle={open ? (open.model ?? open.type) : undefined}
      panelDescription={open ? f.dateTime(open.recordedAt) : undefined}
      panel={open ? <LedgerPanel r={open} t={t} f={f} /> : undefined}
      empty={t("empty")}
    />
  );
}
