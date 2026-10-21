/**
 * The admin console's sidebar — consumer-owned (the contract of
 * `lib/settings-nav.ts` for the settings tabs).
 *
 * `components/admin/admin-sidebar.tsx` renders exactly this list, in this
 * order. Add the product's own console pages (`{ titleKey:
 * "admin.nav.content", href: "/admin/content", icon: Newspaper }`), group
 * several under one entry with `children`, or remove a section — no
 * component edit needed.
 *
 * `titleKey` is a fully-qualified message key resolved through a
 * namespace-less `useTranslations()`: the defaults point into this item's
 * `admin-console` namespace, and an entry you add can point into any
 * namespace you own.
 *
 * Icons are Lucide components, so this file is imported by the client
 * sidebar and never passed from a server layout: component values cannot
 * cross the RSC boundary as props.
 */

import { Activity, Gauge, Users, Wallet, type LucideIcon } from "lucide-react";

export interface AdminNavItem {
  /** Fully-qualified message key for the label. */
  titleKey: string;
  /** Locale-less href; `@/i18n/navigation`'s Link localizes it. */
  href: string;
  icon: LucideIcon;
  /** A group: the entry opens these instead of a page of its own. */
  children?: readonly AdminNavItem[];
}

export const adminNav: readonly AdminNavItem[] = [
  { titleKey: "admin-console.nav.overview", href: "/admin", icon: Gauge },
  { titleKey: "admin-console.nav.users", href: "/admin/users", icon: Users },
  {
    titleKey: "admin-console.nav.revenue",
    href: "/admin/revenue",
    icon: Wallet,
  },
  {
    titleKey: "admin-console.nav.operations",
    href: "/admin/operations",
    icon: Activity,
  },
];
