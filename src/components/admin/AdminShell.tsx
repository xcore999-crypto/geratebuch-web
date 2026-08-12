"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { Icon } from "@/components/ui/Icon";
import { adminNav } from "@/lib/admin-nav";
import { cn } from "@/lib/cn";

function isActive(pathname: string, href: string) {
  if (href === "/admin/katalog") return pathname === "/admin/katalog";
  return pathname === href || pathname.startsWith(href + "/");
}

function NavLinks({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  return (
    <nav className="flex flex-1 flex-col gap-1 px-3">
      {adminNav.map((item) => {
        const active = isActive(pathname, item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-btn px-3 py-2.5 text-sm font-medium transition-colors",
              active ? "bg-white/10 text-white" : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
            )}
          >
            <Icon name={item.icon} className="h-4.5 w-4.5" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);

  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setMobileOpen(false);
  }

  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-white/10 bg-navy-900 lg:flex">
        <div className="px-5 py-6">
          <Link href="/">
            <Logo variant="dark" withService />
          </Link>
          <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-teal-400">EuroIPL-intern</p>
        </div>
        <NavLinks pathname={pathname} />
        <div className="border-t border-white/10 p-4">
          <Link
            href="/portal"
            className="flex items-center gap-3 rounded-btn px-3 py-2.5 text-sm font-medium text-slate-400 hover:bg-white/5 hover:text-slate-200"
          >
            <Icon name="logout" className="h-4.5 w-4.5" />
            Zum Kundenbereich
          </Link>
        </div>
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <aside className="relative flex w-72 flex-col border-r border-white/10 bg-navy-900">
            <div className="flex items-center justify-between px-5 py-6">
              <Logo variant="dark" withService />
              <button type="button" onClick={() => setMobileOpen(false)} className="text-slate-400" aria-label="Menü schließen">
                <Icon name="x-mark" className="h-5 w-5" />
              </button>
            </div>
            <NavLinks pathname={pathname} onNavigate={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}

      <div className="flex min-h-screen flex-1 flex-col">
        <header className="sticky top-0 z-40 flex items-center justify-between gap-4 border-b border-white/10 bg-navy-950/80 px-4 py-3.5 backdrop-blur lg:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-btn text-slate-300 hover:bg-white/5 lg:hidden"
              aria-label="Menü öffnen"
            >
              <Icon name="menu" className="h-5 w-5" />
            </button>
            <div className="lg:hidden">
              <Logo variant="dark" />
            </div>
            <p className="hidden text-sm font-semibold text-white lg:block">Gerätekatalog-Verwaltung</p>
          </div>
        </header>
        <main className="flex-1 px-4 py-8 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
