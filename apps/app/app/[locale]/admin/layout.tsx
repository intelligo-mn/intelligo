import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";

import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { ShellHeader } from "@/components/shell/shell-header";
import { TimeZoneCookie } from "@/components/shell/time-zone-cookie";
import { AISidebarInset, AISidebarProvider } from "@/components/ui/ai-sidebar";
import { adminConfig } from "@/lib/admin-config";
import { adminLayoutGate } from "@/lib/admin-page";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const t = await getTranslations("admin-console");
  return { title: t("meta.title"), robots: { index: false } };
}

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  await adminLayoutGate();
  const t = await getTranslations();

  return (
    <AISidebarProvider className="h-svh min-h-0 overflow-hidden">
      {/* Renders nothing; tells the server which day it is here. */}
      <TimeZoneCookie />
      <AdminSidebar
        brand={t(adminConfig.brandKey)}
        backHref={adminConfig.backHref}
      />
      <AISidebarInset className="min-h-0 overflow-hidden">
        <ShellHeader />
        <div className="min-h-0 min-w-0 flex-1 space-y-6 overflow-y-auto px-4 py-6 md:px-8 md:py-8">
          {children}
        </div>
      </AISidebarInset>
    </AISidebarProvider>
  );
}
