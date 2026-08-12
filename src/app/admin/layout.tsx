import type { Metadata } from "next";
import { inter } from "@/lib/fonts";
import { AdminShell } from "@/components/admin/AdminShell";
import "../globals.css";

export const metadata: Metadata = {
  title: { default: "Gerätekatalog — EuroIPL Admin", template: "%s — EuroIPL Admin" },
  description: "Interne Katalogverwaltung für geratebuch.de.",
};

export const dynamic = "force-dynamic";

export default function AdminRootLayout({ children }: LayoutProps<"/admin">) {
  return (
    <html lang="de" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full bg-navy-950 text-slate-100">
        <AdminShell>{children}</AdminShell>
      </body>
    </html>
  );
}
