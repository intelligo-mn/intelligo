import "server-only";

/**
 * How the console writes dates, numbers and money: next-intl's formatter
 * for the request, so dates read in the reader's time zone (the `tz`
 * cookie the shell writes, through `i18n/request.ts`) and in their
 * locale. The pages format on the server and hand the client plain
 * strings, so the browser's `Intl` never re-formats a value the server
 * already wrote — the two can disagree, and the page would hydrate with
 * different text than it rendered.
 */

import { getFormatter } from "next-intl/server";

import { formatMoney, type MoneyLike } from "@/lib/format-money";

export type AdminFormat = {
  /** A calendar date, or "" for none. */
  date: (value: Date | null | undefined) => string;
  /** A date and time of day, or "" for none. */
  dateTime: (value: Date | null | undefined) => string;
  number: (value: number) => string;
  money: (value: MoneyLike) => string;
  /** Several amounts in different currencies, never summed together. */
  moneyList: (values: readonly MoneyLike[]) => string;
};

export async function adminFormat(): Promise<AdminFormat> {
  const format = await getFormatter();
  const money = (value: MoneyLike) => formatMoney(format, value);
  return {
    date: (value) =>
      value ? format.dateTime(value, { dateStyle: "medium" }) : "",
    dateTime: (value) =>
      value
        ? format.dateTime(value, { dateStyle: "medium", timeStyle: "short" })
        : "",
    number: (value) => format.number(value),
    money,
    moneyList: (values) => values.map(money).join(" · "),
  };
}
