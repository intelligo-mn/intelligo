/**
 * The console's frames: a titled section card, a stat tile, and a
 * record's status in the status tokens. Each is a registry primitive
 * (Card, StatCard, StatusBadge) under a shorter name, so a product's own
 * console pages look like the console's. Renders in a server or a client
 * component alike.
 */

import { useTranslations } from "next-intl";
import type { ReactNode } from "react";

import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  StatCard,
  StatCardFooter,
  StatCardHeader,
  StatCardLabel,
  StatCardValue,
} from "@/components/ui/stat-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { cn } from "@/lib/utils";

export interface PanelProps {
  title?: ReactNode;
  /** Top right: a link to the full list, a filter. */
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function Panel({ title, action, children, className }: PanelProps) {
  return (
    <Card>
      {(title || action) && (
        <CardHeader>
          {title && (
            <CardTitle role="heading" aria-level={2} className="font-semibold">
              {title}
            </CardTitle>
          )}
          {action && <CardAction>{action}</CardAction>}
        </CardHeader>
      )}
      <CardContent className={cn("space-y-3", className)}>
        {children}
      </CardContent>
    </Card>
  );
}

export interface StatProps {
  label: ReactNode;
  value: ReactNode;
  /** A line under the value: a link, the period it covers. */
  hint?: ReactNode;
}

export function Stat({ label, value, hint }: StatProps) {
  return (
    <StatCard>
      <StatCardHeader>
        <StatCardLabel>{label}</StatCardLabel>
        <StatCardValue>{value}</StatCardValue>
      </StatCardHeader>
      {hint && <StatCardFooter>{hint}</StatCardFooter>}
    </StatCard>
  );
}

/** A status's tone: done is success, a refusal or lapse a warning, a failure destructive. */
export type Tone = "neutral" | "info" | "success" | "warning" | "destructive";

const TONES: Record<string, Tone> = {
  ok: "success",
  paid: "success",
  succeeded: "success",
  active: "success",
  running: "info",
  settling: "info",
  pending: "info",
  opening: "info",
  degraded: "warning",
  refused: "warning",
  expired: "warning",
  cancelled: "warning",
  canceled: "warning",
  past_due: "warning",
  unconfigured: "neutral",
  down: "destructive",
  failed: "destructive",
  failure: "destructive",
};

/** The tone a status word reads in; `neutral` for one the console does not know. */
export function toneOf(status: string): Tone {
  return TONES[status] ?? "neutral";
}

/**
 * A payment's, execution's, job's or probe's status, in the reader's
 * words when `admin-console.status` has them and as stored otherwise.
 */
export function Status({ status }: { status: string }) {
  const t = useTranslations("admin-console.status");
  return (
    <StatusBadge status={toneOf(status)}>
      {t.has(status) ? t(status) : status}
    </StatusBadge>
  );
}

/** A payment's status, flagged when it was paid but its plan or credit was never granted. */
export function PaymentStatus({
  status,
  fulfilledAt,
}: {
  status: string;
  fulfilledAt: Date | null;
}) {
  const t = useTranslations("admin-console.status");
  return (
    <span className="inline-flex flex-wrap gap-1">
      <Status status={status} />
      {status === "paid" && !fulfilledAt && (
        <StatusBadge status="destructive">{t("notGranted")}</StatusBadge>
      )}
    </span>
  );
}
