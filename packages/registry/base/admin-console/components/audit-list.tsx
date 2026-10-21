import "server-only";

/**
 * The audit trail as a console list: newest first, filtered by action
 * (the search box takes an exact action name), paged. An event's actor,
 * its workspace and — for a user or workspace resource — the resource are
 * shown by name where they still resolve, by the recorded email or id
 * otherwise. A row opens the whole event, metadata included.
 */

import {
  resolveDisplayNames,
  type DisplayNames,
  type queryAuditEvents,
} from "@intelligo-dev/admin";
import { getTranslations } from "next-intl/server";

import { DataList, type ListRow } from "@/components/admin/data-list";
import { toneOf } from "@/components/admin/panel";
import { Properties } from "@/components/admin/properties";
import { adminConfig } from "@/lib/admin-config";
import { adminFormat, type AdminFormat } from "@/lib/admin-format";
import type { ListQuery } from "@/lib/admin-list";

type AuditEvent = Awaited<ReturnType<typeof queryAuditEvents>>[number];
type T = Awaited<ReturnType<typeof getTranslations>>;

/** `user`, `system` or `support`, in the reader's words when the messages have them. */
function kindOf(e: AuditEvent, t: T): string {
  const key = `actorKinds.${e.actorKind}`;
  return t.has(key) ? t(key) : e.actorKind;
}

function actorOf(e: AuditEvent, names: DisplayNames, t: T): string {
  const user = e.actorId ? names.users[e.actorId] : undefined;
  if (user) return user.name ?? user.email;
  return e.actorEmail ?? kindOf(e, t);
}

function resourceOf(e: AuditEvent, names: DisplayNames): string {
  const id = e.resourceId;
  if (!id) return e.resourceKind;
  const named =
    e.resourceKind === "workspace"
      ? names.workspaces[id]
      : e.resourceKind === "user"
        ? (names.users[id]?.name ?? names.users[id]?.email)
        : undefined;
  return named ?? id;
}

async function namesFor(rows: AuditEvent[]): Promise<DisplayNames> {
  const ids = (kind: string) =>
    rows.flatMap((e) =>
      e.resourceKind === kind && e.resourceId ? [e.resourceId] : []
    );
  return resolveDisplayNames({
    userIds: [
      ...rows.flatMap((e) => (e.actorId ? [e.actorId] : [])),
      ...ids("user"),
    ],
    workspaceIds: [
      ...rows.flatMap((e) => (e.workspaceId ? [e.workspaceId] : [])),
      ...ids("workspace"),
    ],
  });
}

function auditRow(
  e: AuditEvent,
  names: DisplayNames,
  t: T,
  f: AdminFormat,
  tStatus: T
): ListRow {
  return {
    id: e.id,
    cells: {
      date: f.dateTime(e.createdAt),
      action: { text: e.action, mono: true },
      resource: { text: resourceOf(e, names), note: e.resourceKind },
      workspace: e.workspaceId
        ? (names.workspaces[e.workspaceId] ?? e.workspaceId)
        : "",
      actor: { text: actorOf(e, names, t), note: kindOf(e, t) },
      outcome: {
        text: "",
        badge: tStatus.has(e.outcome) ? tStatus(e.outcome) : e.outcome,
        tone: toneOf(e.outcome),
      },
    },
  };
}

export async function AuditList({
  rows,
  total,
  query,
}: {
  rows: AuditEvent[];
  total: number;
  query: ListQuery;
}) {
  const t = await getTranslations("admin-console.operations.audit");
  const tAll = await getTranslations();
  const tStatus = await getTranslations("admin-console.status");
  const f = await adminFormat();
  const names = await namesFor(rows);
  const open = rows.find((e) => e.id === query.open) ?? null;

  return (
    <DataList
      columns={[
        { key: "date", header: t("date") },
        { key: "action", header: t("action") },
        { key: "resource", header: t("resource") },
        { key: "workspace", header: t("workspace") },
        { key: "actor", header: t("actor") },
        { key: "outcome", header: t("outcome") },
      ]}
      rows={rows.map((e) => auditRow(e, names, t, f, tStatus))}
      total={total}
      page={query.page}
      pageSize={query.size}
      search={query.q}
      searchPlaceholder={tAll(adminConfig.auditFilterPlaceholderKey)}
      openId={open?.id ?? null}
      panelTitle={open?.action}
      panelDescription={open ? f.dateTime(open.createdAt) : undefined}
      fullPageHref={
        open?.workspaceId ? `/admin/users/${open.workspaceId}` : undefined
      }
      panel={
        open ? (
          <Properties
            properties={[
              {
                key: "actor",
                label: t("actor"),
                value: actorOf(open, names, t),
              },
              {
                key: "actorKind",
                label: t("actorKind"),
                value: kindOf(open, t),
              },
              {
                key: "resource",
                label: t("resource"),
                value: resourceOf(open, names),
              },
              {
                key: "resourceKind",
                label: t("resourceKind"),
                value: open.resourceKind,
              },
              {
                key: "resourceId",
                label: t("resourceId"),
                value: open.resourceId,
                mono: true,
              },
              {
                key: "workspace",
                label: t("workspace"),
                value: open.workspaceId
                  ? (names.workspaces[open.workspaceId] ?? open.workspaceId)
                  : null,
              },
              { key: "outcome", label: t("outcome"), value: open.outcome },
              { key: "metadata", label: t("metadata"), value: open.metadata },
              { key: "id", label: t("id"), value: open.id, mono: true },
            ]}
          />
        ) : undefined
      }
      empty={t("empty")}
    />
  );
}
