"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { primaryNav, contact } from "@/lib/nav";
import { services } from "@/lib/services";
import { cn } from "@/lib/cn";

export function Header() {
  const pathname = usePathname();
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);

  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setServicesOpen(false);
    setMobileOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3.5 lg:px-8">
        <Link href="/" className="shrink-0">
          <Logo withService />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              type="button"
              onClick={() => setServicesOpen((v) => !v)}
              className={cn(
                "flex items-center gap-1 rounded-btn px-3 py-2 text-sm font-medium text-navy-700 hover:bg-slate-100",
                pathname.startsWith("/leistungen") && "text-brand-700"
              )}
              aria-expanded={servicesOpen}
            >
              Leistungen
              <Icon name="chevron-down" className="h-4 w-4" />
            </button>
            {servicesOpen && (
              <div className="absolute left-1/2 top-full w-[560px] -translate-x-1/2 pt-3">
                <div className="grid grid-cols-2 gap-1 rounded-card border border-slate-200 bg-white p-3 shadow-card-hover">
                  {services.map((service) => (
                    <Link
                      key={service.slug}
                      href={`/leistungen/${service.slug}`}
                      className="flex items-start gap-3 rounded-btn p-3 hover:bg-slate-50"
                    >
                      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                        <Icon name={service.icon} className="h-5 w-5" />
                      </span>
                      <span>
                        <span className="block text-sm font-semibold text-navy-900">
                          {service.name}
                        </span>
                        <span className="mt-0.5 block text-xs leading-snug text-slate-500">
                          {service.tagline}
                        </span>
                      </span>
                    </Link>
                  ))}
                  <Link
                    href="/leistungen"
                    className="col-span-2 mt-1 flex items-center justify-center gap-1.5 rounded-btn bg-slate-50 py-2.5 text-sm font-semibold text-brand-700 hover:bg-slate-100"
                  >
                    Alle Leistungen im Überblick
                    <Icon name="arrow-right" className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            )}
          </div>

          {primaryNav.slice(1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-btn px-3 py-2 text-sm font-medium text-navy-700 hover:bg-slate-100",
                pathname === item.href && "text-brand-700"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <a
            href={`tel:${contact.phone.replace(/\s/g, "")}`}
            className="mr-2 flex flex-col items-end text-xs leading-tight text-slate-500"
          >
            <span className="font-semibold text-navy-800">{contact.phone}</span>
            <span>{contact.phoneHours}</span>
          </a>
          <Button href="/login" variant="ghost" size="sm">
            Anmelden
          </Button>
          <Button href="/kontakt#service-anfragen" size="sm">
            Service anfragen
          </Button>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-btn text-navy-700 hover:bg-slate-100 lg:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Menü öffnen"
        >
          <Icon name={mobileOpen ? "x-mark" : "menu"} className="h-6 w-6" />
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white px-6 pb-6 pt-2 lg:hidden">
          <nav className="flex flex-col divide-y divide-slate-100">
            <div className="py-3">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Leistungen
              </p>
              <div className="flex flex-col gap-1">
                {services.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/leistungen/${service.slug}`}
                    className="rounded-btn px-2 py-2 text-sm font-medium text-navy-800 hover:bg-slate-50"
                  >
                    {service.name}
                  </Link>
                ))}
              </div>
            </div>
            {primaryNav.slice(1).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="py-3 text-sm font-medium text-navy-800"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 flex flex-col gap-2">
            <Button href="/kontakt#service-anfragen">Service anfragen</Button>
            <Button href="/login" variant="secondary">
              Anmelden
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
