"use client";

/**
 * The registry's PropertyList in the console's words, so a server page can
 * hand it fields without handing it functions.
 *
 * A value the browser would format through `Intl` is written by the
 * server instead: Node's and the browser's ICU can spell the same date or
 * number differently, and a page opened with a panel would render one and
 * hydrate the other. A date-like string (`2026-09-29`, an ISO instant) or
 * a number shows as written — format it on the server first
 * (`adminFormat()`) for the reader's locale. A `Date` goes through
 * next-intl's formatter in the request's time zone, which still runs in
 * both runtimes: for a locale whose ICU data Node's build lacks, pass the
 * string `adminFormat()` wrote instead.
 */

import { useFormatter } from "next-intl";
import type { ReactNode } from "react";

import { PropertyList, type Property } from "@/components/ui/property-list";

import { usePropertyLabels } from "@/components/admin/data-list";

const DATE_LIKE = /^\d{4}-\d{2}-\d{2}(?:[T ][\d:.]+(?:Z|[+-]\d{2}:?\d{2})?)?$/;

export interface PropertiesProps {
  properties: Property[];
  /** Empty fields fold behind a toggle (the default). */
  collapseEmpty?: boolean;
}

export function Properties({ properties, collapseEmpty }: PropertiesProps) {
  const format = useFormatter();
  const labels = usePropertyLabels();
  const written = (value: Property["value"]): Property["value"] => {
    if (value instanceof Date) {
      return (
        <time dateTime={value.toISOString()} className="tabular-nums">
          {format.dateTime(value, { dateStyle: "medium", timeStyle: "short" })}
        </time>
      );
    }
    if (
      typeof value === "number" ||
      (typeof value === "string" && DATE_LIKE.test(value))
    ) {
      return <span className="tabular-nums">{value}</span>;
    }
    return value;
  };
  return (
    <PropertyList
      properties={properties.map((p) => ({ ...p, value: written(p.value) }))}
      collapseEmpty={collapseEmpty}
      labels={labels}
    />
  );
}

/** A titled part of a record's panel or page. */
export function PropertySection({
  title,
  children,
}: {
  title: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="flex flex-col gap-1">
      <h3 className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
        {title}
      </h3>
      {children}
    </section>
  );
}
