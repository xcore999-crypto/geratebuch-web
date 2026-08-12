import type { Metadata } from "next";
import { inter } from "@/lib/fonts";
import { PortalShell } from "@/components/portal/PortalShell";
import { getDemoOrganization } from "@/lib/organization";
import "../globals.css";

export const metadata: Metadata = {
  title: {
    default: "Kundenbereich — geratebuch.de",
    template: "%s — geratebuch.de Kundenbereich",
  },
  description: "Ihr digitaler Geräteakte-Kundenbereich, ein Service von EuroIPL.",
};

export const dynamic = "force-dynamic";

export default async function PortalRootLayout({ children }: LayoutProps<"/portal">) {
  const org = await getDemoOrganization();

  return (
    <html lang="de" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full bg-slate-50 text-navy-900">
        <PortalShell organizationName={org.name} contactPerson={org.contactPerson}>
          {children}
        </PortalShell>
      </body>
    </html>
  );
}
