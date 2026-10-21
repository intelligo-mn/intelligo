/**
 * A console page's title. A page the sidebar does not list names the way
 * back to it in `crumbs`, each step a link; `actions` sit on the right (a
 * period switcher, the page's one primary action).
 *
 * Renders in a server or a client component alike.
 */

import { ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import type { ReactNode } from "react";

import {
  PageHeader,
  PageHeaderActions,
  PageHeaderContent,
  PageHeaderDescription,
  PageHeaderTitle,
} from "@/components/ui/page-header";
import { Link } from "@/i18n/navigation";

/** A step back up the console: its label and where it goes. */
export interface Crumb {
  label: ReactNode;
  href: string;
}

export interface PageTitleProps {
  title: ReactNode;
  description?: ReactNode;
  crumbs?: Crumb[];
  actions?: ReactNode;
}

export function PageTitle({
  title,
  description,
  crumbs,
  actions,
}: PageTitleProps) {
  const t = useTranslations("admin-console");
  return (
    <PageHeader>
      <PageHeaderContent>
        {crumbs && crumbs.length > 0 && (
          <nav
            aria-label={t("crumbs")}
            className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground"
          >
            {crumbs.map((crumb, i) => (
              <span key={crumb.href} className="flex items-center gap-1">
                {i > 0 && <ChevronRight aria-hidden className="size-3.5" />}
                <Link
                  href={crumb.href}
                  className="hover:text-foreground hover:underline"
                >
                  {crumb.label}
                </Link>
              </span>
            ))}
          </nav>
        )}
        <PageHeaderTitle>{title}</PageHeaderTitle>
        {description && (
          <PageHeaderDescription>{description}</PageHeaderDescription>
        )}
      </PageHeaderContent>
      {actions && <PageHeaderActions>{actions}</PageHeaderActions>}
    </PageHeader>
  );
}
