"use client";

import * as React from "react";

import { Button } from "@showcase/components/ui/button";
import { cn } from "@showcase/lib/utils";

export interface PropertyListLabels {
  empty: string;
  yes: string;
  no: string;
  /** "Show {count} empty fields". */
  showEmpty: (count: number) => string;
  hideEmpty: string;
}

export const propertyListLabels: PropertyListLabels = {
  empty: "—",
  yes: "Yes",
  no: "No",
  showEmpty: (count) =>
    count === 1 ? "Show 1 empty field" : `Show ${count} empty fields`,
  hideEmpty: "Hide empty fields",
};

export interface Property {
  key: string;
  label: string;
  /** A value already rendered, or a plain one `PropertyValue` formats. */
  value: React.ReactNode | unknown;
  /** A line under the value: its unit, its source, why it is missing. */
  hint?: React.ReactNode;
  /** Identifiers and codes read better in the monospaced face. */
  mono?: boolean;
}

/** Whether a value says nothing: missing, blank, or an empty list. */
function isBlank(value: unknown): boolean {
  return (
    value === null ||
    value === undefined ||
    value === "" ||
    (Array.isArray(value) && value.length === 0)
  );
}

/**
 * Whether a value is something React renders itself: an element, or the
 * lazy reference an element a server component rendered arrives as on the
 * client. Either is passed through, never taken apart as a record.
 */
function isReactNode(value: unknown): value is React.ReactNode {
  return (
    React.isValidElement(value) ||
    (typeof value === "object" && value !== null && "$$typeof" in value)
  );
}

const ISO_DATE =/^\d{4}-\d{2}-\d{2}(?:[T ][\d:.]+(?:Z|[+-]\d{2}:?\d{2})?)?$/;

export interface PropertyValueProps {
  value: unknown;
  /** The language numbers and dates are written in; the browser's when omitted. */
  locale?: string;
  labels?: Partial<PropertyListLabels>;
}

/**
 * A plain value as a person reads it: a date as a date, a number with its
 * separators, a list as chips, a record as a nested list — never as JSON.
 * A React element passes through unchanged, including one a server
 * component rendered.
 */
function PropertyValue({ value, locale, labels }: PropertyValueProps) {
  const l = { ...propertyListLabels, ...labels };
  if (isReactNode(value)) return <>{value}</>;
  if (isBlank(value))
    return <span className="text-muted-foreground">{l.empty}</span>;
  if (typeof value === "boolean") return <>{value ? l.yes : l.no}</>;
  if (typeof value === "number") {
    return (
      <span className="tabular-nums">
        {new Intl.NumberFormat(locale).format(value)}
      </span>
    );
  }
  if (
    value instanceof Date ||
    (typeof value === "string" && ISO_DATE.test(value))
  ) {
    const date = value instanceof Date ? value : new Date(value);
    if (!Number.isNaN(date.getTime())) {
      const withTime =
        value instanceof Date || (value as string).length > 10;
      return (
        <time dateTime={date.toISOString()} className="tabular-nums">
          {new Intl.DateTimeFormat(locale, {
            dateStyle: "medium",
            ...(withTime ? { timeStyle: "short" } : {}),
          }).format(date)}
        </time>
      );
    }
  }
  if (Array.isArray(value)) {
    return (
      <span className="flex flex-wrap gap-1">
        {value.map((item, index) => (
          <span
            key={index}
            className="inline-flex items-center rounded-md border bg-muted/40 px-1.5 text-xs"
          >
            <PropertyValue value={item} locale={locale} labels={labels} />
          </span>
        ))}
      </span>
    );
  }
  if (typeof value === "object") {
    return (
      <dl className="flex flex-col gap-1 text-xs">
        {Object.entries(value as Record<string, unknown>).map(([key, item]) => (
          <div key={key} className="flex gap-3">
            <dt className="shrink-0 text-muted-foreground">{key}</dt>
            <dd className="min-w-0 break-words">
              <PropertyValue value={item} locale={locale} labels={labels} />
            </dd>
          </div>
        ))}
      </dl>
    );
  }
  return <>{String(value)}</>;
}

export interface PropertyListProps {
  properties: Property[];
  /** Empty fields fold behind a toggle so the filled ones read first. */
  collapseEmpty?: boolean;
  locale?: string;
  labels?: Partial<PropertyListLabels>;
  className?: string;
}

/**
 * A record's fields as label and value, two columns from `sm`. The values
 * are formatted by `PropertyValue` unless the caller renders them.
 */
function PropertyList({
  properties,
  collapseEmpty = true,
  locale,
  labels,
  className,
}: PropertyListProps) {
  const l = { ...propertyListLabels, ...labels };
  const [showEmpty, setShowEmpty] = React.useState(false);
  const blank = properties.filter((p) => isBlank(p.value));
  const shown =
    collapseEmpty && !showEmpty
      ? properties.filter((p) => !isBlank(p.value))
      : properties;

  return (
    <div data-slot="property-list" className={cn("flex flex-col gap-2", className)}>
      <dl className="divide-y">
        {shown.map((property) => (
          <div
            key={property.key}
            className="grid gap-1 py-2.5 sm:grid-cols-3 sm:gap-4"
          >
            <dt className="text-sm text-muted-foreground">{property.label}</dt>
            <dd
              className={cn(
                "min-w-0 text-sm break-words sm:col-span-2",
                property.mono && "font-mono text-xs"
              )}
            >
              <PropertyValue
                value={property.value}
                locale={locale}
                labels={labels}
              />
              {property.hint && (
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {property.hint}
                </p>
              )}
            </dd>
          </div>
        ))}
      </dl>
      {collapseEmpty && blank.length > 0 && (
        <Button
          variant="ghost"
          size="xs"
          className="self-start text-muted-foreground"
          onClick={() => setShowEmpty((shown) => !shown)}
        >
          {showEmpty ? l.hideEmpty : l.showEmpty(blank.length)}
        </Button>
      )}
    </div>
  );
}

export { PropertyList, PropertyValue };
