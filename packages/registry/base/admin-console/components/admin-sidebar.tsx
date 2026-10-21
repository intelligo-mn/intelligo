"use client";

/**
 * The admin console's sidebar: the registry's AISidebar, as the app
 * shell's, so it collapses to an icon rail and becomes a drawer on a
 * phone. Entries come from `@/lib/admin-nav` (consumer config); each
 * `titleKey` is a fully-qualified message key, resolved through a
 * namespace-less `useTranslations()`.
 *
 * The most specific entry wins the highlight: `/admin/users/ws_1` lights
 * "Users", never "Overview". A group stands open while one of its pages
 * is shown, unless the reader folded it.
 */

import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

import {
  AISidebar,
  AISidebarContent,
  AISidebarFooter,
  AISidebarHeader,
  AISidebarItem,
  AISidebarMenu,
  AISidebarMenuItem,
  AISidebarRail,
  AISidebarSection,
  AISidebarSubItem,
  AISidebarSubmenu,
} from "@/components/ui/ai-sidebar";
import { Link, usePathname } from "@/i18n/navigation";
import { adminNav, type AdminNavItem } from "@/lib/admin-nav";

const PAGES = adminNav.flatMap((item) => item.children ?? [item]);

/** The href of the entry the current path belongs to most specifically. */
function activeHref(pathname: string): string | undefined {
  const matches = (href: string) =>
    href === "/admin"
      ? pathname === href
      : pathname === href || pathname.startsWith(`${href}/`);
  return PAGES.filter((item) => matches(item.href)).sort(
    (a, b) => b.href.length - a.href.length
  )[0]?.href;
}

export interface AdminSidebarProps {
  /** The name at the top, already translated by the layout. */
  brand: string;
  /** Where "Back to the app" goes. */
  backHref: string;
}

export function AdminSidebar({ brand, backHref }: AdminSidebarProps) {
  const t = useTranslations();
  const best = activeHref(usePathname());
  const [folded, setFolded] = useState<Record<string, boolean>>({});

  return (
    <AISidebar
      collapsible="icon"
      label={t("admin-console.nav.label")}
      closeLabel={t("admin-console.nav.close")}
    >
      <AISidebarHeader>
        <div className="truncate px-2 py-1 text-sm font-semibold group-data-[state=collapsed]/sidebar:hidden">
          {brand}
        </div>
      </AISidebarHeader>
      <AISidebarContent>
        <AISidebarSection>
          <AISidebarMenu>
            {adminNav.map((item) => (
              <NavEntry
                key={item.href}
                item={item}
                best={best}
                folded={folded[item.href]}
                onFold={(open) =>
                  setFolded((f) => ({ ...f, [item.href]: open }))
                }
              />
            ))}
          </AISidebarMenu>
        </AISidebarSection>
      </AISidebarContent>
      <AISidebarFooter>
        <AISidebarMenu>
          <AISidebarMenuItem>
            <AISidebarItem
              icon={<ArrowLeft />}
              tooltip={t("admin-console.nav.backToApp")}
              render={<Link href={backHref} />}
            >
              {t("admin-console.nav.backToApp")}
            </AISidebarItem>
          </AISidebarMenuItem>
        </AISidebarMenu>
      </AISidebarFooter>
      <AISidebarRail label={t("admin-console.nav.toggle")} />
    </AISidebar>
  );
}

function NavEntry({
  item,
  best,
  folded,
  onFold,
}: {
  item: AdminNavItem;
  best: string | undefined;
  folded: boolean | undefined;
  onFold: (open: boolean) => void;
}) {
  const t = useTranslations();
  const { href, titleKey, icon: Icon, children } = item;
  const label = t(titleKey);

  if (!children) {
    return (
      <AISidebarMenuItem>
        <AISidebarItem
          isActive={href === best}
          icon={<Icon />}
          tooltip={label}
          render={<Link href={href} />}
        >
          {label}
        </AISidebarItem>
      </AISidebarMenuItem>
    );
  }

  const inside = children.some((child) => child.href === best);
  const open = folded === undefined ? inside : !folded;
  return (
    <AISidebarMenuItem>
      <AISidebarItem
        isActive={inside && !open}
        icon={<Icon />}
        tooltip={label}
        expanded={open}
        onSelect={() => onFold(open)}
      >
        {label}
      </AISidebarItem>
      <AISidebarSubmenu open={open}>
        {children.map((child) => (
          <AISidebarSubItem
            key={child.href}
            isActive={child.href === best}
            icon={<child.icon />}
            render={<Link href={child.href} />}
          >
            {t(child.titleKey)}
          </AISidebarSubItem>
        ))}
      </AISidebarSubmenu>
    </AISidebarMenuItem>
  );
}
