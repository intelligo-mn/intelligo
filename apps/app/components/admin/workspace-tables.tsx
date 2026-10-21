import "server-only";

/**
 * A workspace's members, payments and recent executions, as short tables
 * on its support page. Dates and amounts are written by the server, in
 * the reader's locale and time zone.
 */

import type {
  PaymentRow,
  WorkspaceMember,
  listWorkspaceExecutions,
} from "@intelligo-dev/admin";
import { getTranslations } from "next-intl/server";

import { PaymentStatus, Status } from "@/components/admin/panel";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { adminFormat } from "@/lib/admin-format";

type Execution = Awaited<ReturnType<typeof listWorkspaceExecutions>>[number];

function Empty({ text }: { text: string }) {
  return <p className="text-sm text-muted-foreground">{text}</p>;
}

export async function MemberTable({ rows }: { rows: WorkspaceMember[] }) {
  const t = await getTranslations("admin-console.workspace.members");
  const f = await adminFormat();
  if (rows.length === 0) return <Empty text={t("empty")} />;
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{t("email")}</TableHead>
          <TableHead>{t("name")}</TableHead>
          <TableHead>{t("role")}</TableHead>
          <TableHead className="text-right">{t("joined")}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((m) => (
          <TableRow key={m.userId}>
            <TableCell>{m.email}</TableCell>
            <TableCell>{m.name ?? ""}</TableCell>
            <TableCell>
              <span className="inline-flex flex-wrap gap-1">
                <StatusBadge>{m.role}</StatusBadge>
                {m.platformRole && (
                  <StatusBadge status="info">{t("platformAdmin")}</StatusBadge>
                )}
              </span>
            </TableCell>
            <TableCell className="text-right text-xs tabular-nums">
              {f.date(m.joinedAt)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export async function PaymentTable({ rows }: { rows: PaymentRow[] }) {
  const t = await getTranslations("admin-console.workspace.payments");
  const f = await adminFormat();
  if (rows.length === 0) return <Empty text={t("empty")} />;
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{t("date")}</TableHead>
          <TableHead>{t("reference")}</TableHead>
          <TableHead>{t("status")}</TableHead>
          <TableHead className="text-right">{t("amount")}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((p) => (
          <TableRow key={p.id}>
            <TableCell className="text-xs tabular-nums">
              {f.dateTime(p.createdAt)}
            </TableCell>
            <TableCell>{p.reference}</TableCell>
            <TableCell>
              <PaymentStatus status={p.status} fulfilledAt={p.fulfilledAt} />
            </TableCell>
            <TableCell className="text-right tabular-nums">
              {f.money(p.amount)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export async function ExecutionTable({ rows }: { rows: Execution[] }) {
  const t = await getTranslations("admin-console.workspace.executions");
  const f = await adminFormat();
  if (rows.length === 0) return <Empty text={t("empty")} />;
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{t("started")}</TableHead>
          <TableHead>{t("capability")}</TableHead>
          <TableHead>{t("model")}</TableHead>
          <TableHead>{t("status")}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((e) => (
          <TableRow key={e.id}>
            <TableCell className="text-xs tabular-nums">
              {f.dateTime(e.startedAt)}
            </TableCell>
            <TableCell>{e.capability}</TableCell>
            <TableCell className="text-xs">{e.model ?? ""}</TableCell>
            <TableCell>
              <Status status={e.status} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
