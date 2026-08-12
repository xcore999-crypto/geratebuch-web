import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Icon } from "@/components/ui/Icon";
import { services } from "@/lib/services";
import { legalNav, contact } from "@/lib/nav";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-navy-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo variant="dark" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
              Die digitale Geräteakte und Serviceplattform für Kosmetik- und
              Lasergeräte in Deutschland.
            </p>
            <p className="mt-4 text-xs font-medium uppercase tracking-wide text-slate-400">
              Ein Service von EuroIPL
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-white">Leistungen</p>
            <ul className="mt-4 space-y-2.5">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/leistungen/${service.slug}`}
                    className="text-sm text-slate-400 hover:text-white"
                  >
                    {service.shortName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-white">Unternehmen</p>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link href="/ueber-uns" className="text-sm text-slate-400 hover:text-white">
                  Über uns & Qualifikationen
                </Link>
              </li>
              <li>
                <Link href="/digitales-geraetebuch" className="text-sm text-slate-400 hover:text-white">
                  Digitales Gerätebuch
                </Link>
              </li>
              <li>
                <Link href="/wissen" className="text-sm text-slate-400 hover:text-white">
                  Wissen & FAQ
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="text-sm text-slate-400 hover:text-white">
                  Kontakt
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-sm text-slate-400 hover:text-white">
                  Kundenbereich
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-white">Kontakt</p>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start gap-2.5 text-sm text-slate-400">
                <Icon name="phone" className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                <span>
                  {contact.phone}
                  <br />
                  {contact.phoneHours}
                </span>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-slate-400">
                <Icon name="envelope" className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                {contact.email}
              </li>
              <li className="flex items-start gap-2.5 text-sm text-slate-400">
                <Icon name="map-pin" className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                Deutschlandweit im Einsatz
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} EuroIPL — geratebuch.de ist die digitale Serviceplattform von EuroIPL.</p>
          <div className="flex gap-5">
            {legalNav.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-slate-300">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
