"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { primaryNav, contact, externalLinks } from "@/lib/nav";
import { services } from "@/lib/services";
import { cn } from "@/lib/cn";

const quickLinks: { label: string; href: string; icon: IconName; external?: boolean }[] = [
  {
    label: "Anrufen",
    href: `tel:${contact.phone.replace(/\s/g, "")}`,
    icon: "phone",
  },
  { label: "Instagram", href: externalLinks.instagram, icon: "instagram", external: true },
  { label: "Shop", href: externalLinks.shop, icon: "shopping-bag" },
];

export function Header() {
  const pathname = usePathname();
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/95 shadow-[0_8px_30px_-26px_rgba(7,28,32,0.45)] backdrop-blur-xl">
      <div className="bg-brand-500 text-white">
        <div className="mx-auto flex h-8 max-w-7xl items-center justify-center gap-6 px-6 text-[0.68rem] font-semibold sm:justify-between lg:px-8">
          <span className="flex items-center gap-1.5"><Icon name="shield-check" className="h-3.5 w-3.5" /> Qualifizierter Geräteservice</span>
          <span className="hidden items-center gap-1.5 sm:flex"><Icon name="chat" className="h-3.5 w-3.5" /> Persönliche Fachberatung</span>
          <span className="hidden items-center gap-1.5 md:flex"><Icon name="globe" className="h-3.5 w-3.5" /> Deutschlandweit im Einsatz</span>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-6 py-3.5 lg:px-8">
        <Link href="/" className="shrink-0 transition hover:opacity-80" aria-label="geratebuch.de Startseite">
          <Logo withService />
        </Link>

        <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Hauptnavigation">
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              type="button"
              onClick={() => setServicesOpen((value) => !value)}
              className={cn(
                "nav-pill flex items-center gap-1 rounded-full px-3 py-2 text-sm font-semibold text-navy-700 transition hover:bg-brand-50 hover:text-brand-700",
                pathname.startsWith("/leistungen") && "bg-brand-50 text-brand-700"
              )}
              aria-expanded={servicesOpen}
            >
              Leistungen
              <Icon name="chevron-down" className={cn("h-4 w-4 transition duration-300", servicesOpen && "rotate-180")} />
            </button>

            {servicesOpen && (
              <div className="absolute left-1/2 top-full w-[850px] -translate-x-[38%] pt-3">
                <div onClick={() => setServicesOpen(false)} className="menu-pop grid grid-cols-[1fr_255px] overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white shadow-[0_32px_80px_-28px_rgba(7,28,32,0.45)]">
                  <div className="p-4">
                    <div className="mb-2 flex items-center justify-between px-2">
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Serviceportfolio</p>
                      <Link href="/leistungen" className="flex items-center gap-1 text-xs font-bold text-brand-700">Alle Leistungen <Icon name="arrow-right" className="h-3.5 w-3.5" /></Link>
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      {services.map((service) => (
                        <Link
                          key={service.slug}
                          href={`/leistungen/${service.slug}`}
                          className="group/menu flex items-start gap-3 rounded-2xl p-3 transition hover:bg-brand-50"
                        >
                          <span className="icon-orbit mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600 transition group-hover/menu:bg-brand-500 group-hover/menu:text-white">
                            <Icon name={service.icon} className="h-5 w-5" />
                          </span>
                          <span>
                            <span className="block text-sm font-bold text-navy-900">{service.name}</span>
                            <span className="mt-0.5 block text-xs leading-snug text-slate-500">{service.tagline}</span>
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="medtech-grid relative flex flex-col justify-between bg-navy-950 p-6 text-white">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(53,193,188,0.24),transparent_38%)]" />
                    <div className="relative">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-brand-200">
                        <Icon name="folder" className="h-5 w-5" />
                      </span>
                      <p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-brand-300">Kundenportal</p>
                      <p className="mt-2 text-xl font-bold leading-tight">Geräte, Fristen und Dokumente im Blick.</p>
                      <p className="mt-3 text-xs leading-relaxed text-slate-400">Ihre digitale Geräteakte ist jederzeit erreichbar.</p>
                    </div>
                    <Link href="/login" className="group relative mt-6 inline-flex items-center gap-2 text-sm font-bold text-white">
                      Portal öffnen <Icon name="arrow-right" className="h-4 w-4 transition group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          {primaryNav.slice(1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "nav-pill rounded-full px-3 py-2 text-sm font-semibold text-navy-700 transition hover:bg-brand-50 hover:text-brand-700",
                pathname === item.href && "bg-brand-50 text-brand-700"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-1.5 xl:flex">
          {quickLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="group/header relative flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-navy-700 transition hover:-translate-y-0.5 hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700"
              aria-label={item.label}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noreferrer" : undefined}
            >
              <Icon name={item.icon} className="h-4 w-4 transition duration-300 group-hover/header:scale-110 group-hover/header:-rotate-6" />
            </a>
          ))}
          <Button href="/login" variant="ghost" size="sm">Anmelden</Button>
          <Button href="/kontakt#service-anfragen" size="sm">Anfrage</Button>
        </div>

        <button
          type="button"
          className="group flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-navy-700 transition hover:bg-brand-50 xl:hidden"
          onClick={() => setMobileOpen((value) => !value)}
          aria-label={mobileOpen ? "Menü schließen" : "Menü öffnen"}
          aria-expanded={mobileOpen}
        >
          <Icon name={mobileOpen ? "x-mark" : "menu"} className="h-6 w-6 transition group-hover:scale-110" />
        </button>
      </div>

      {mobileOpen && (
        <div className="menu-pop max-h-[calc(100svh-106px)] overflow-y-auto border-t border-slate-200 bg-white px-6 pb-6 pt-2 shadow-card-hover xl:hidden">
          <nav className="flex flex-col divide-y divide-slate-100" onClick={() => setMobileOpen(false)}>
            <div className="py-3">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Leistungen</p>
              <div className="grid gap-1 sm:grid-cols-2">
                {services.map((service) => (
                  <Link key={service.slug} href={`/leistungen/${service.slug}`} className="flex items-center gap-2 rounded-xl px-2 py-2 text-sm font-medium text-navy-800 hover:bg-brand-50">
                    <Icon name={service.icon} className="h-4 w-4 text-brand-600" /> {service.name}
                  </Link>
                ))}
              </div>
            </div>
            {primaryNav.slice(1).map((item) => (
              <Link key={item.href} href={item.href} className="py-3 text-sm font-medium text-navy-800">{item.label}</Link>
            ))}
          </nav>
          <div className="mt-4 flex items-center gap-2">
            {quickLinks.map((item) => (
              <a key={item.label} href={item.href} aria-label={item.label} className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-brand-700" target={item.external ? "_blank" : undefined} rel={item.external ? "noreferrer" : undefined}>
                <Icon name={item.icon} className="h-4 w-4" />
              </a>
            ))}
            <a href={externalLinks.whatsapp} aria-label="WhatsApp" target="_blank" rel="noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-brand-700">
              <Icon name="whatsapp" className="h-4 w-4" />
            </a>
          </div>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <Button href="/kontakt#service-anfragen">Service anfragen</Button>
            <Button href="/login" variant="secondary">Anmelden</Button>
          </div>
        </div>
      )}
    </header>
  );
}
