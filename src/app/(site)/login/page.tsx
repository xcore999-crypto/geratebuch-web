import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { Icon } from "@/components/ui/Icon";

export const metadata: Metadata = {
  title: "Anmelden",
  description: "Anmeldung zum geratebuch.de Kundenbereich.",
};

const inputClasses =
  "w-full rounded-btn border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-navy-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100";

export default function LoginPage() {
  return (
    <section className="flex min-h-[calc(100vh-5rem)] items-center bg-slate-50 py-16">
      <Container className="max-w-md">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>
        <div className="rounded-card border border-slate-200 bg-white p-8 shadow-card-hover">
          <h1 className="text-xl font-bold text-navy-900">Anmelden</h1>
          <p className="mt-1 text-sm text-slate-500">
            Willkommen zurück in Ihrem Kundenbereich.
          </p>

          <div className="mt-6 space-y-4">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-navy-800">
                E-Mail
              </label>
              <input id="email" type="email" className={inputClasses} placeholder="name@studio.de" />
            </div>
            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-navy-800">
                Passwort
              </label>
              <input id="password" type="password" className={inputClasses} placeholder="••••••••" />
            </div>
          </div>

          <Button href="/portal" size="lg" className="mt-6 w-full">
            Anmelden
          </Button>

          <div className="mt-4 flex items-center gap-2 rounded-btn bg-brand-50 px-3.5 py-2.5 text-xs text-brand-800">
            <Icon name="shield-check" className="h-4 w-4 shrink-0" />
            Vorschau-Modus: Der Button führt direkt in den Demo-Kundenbereich —
            echte Zugangsdaten folgen zum Piloten.
          </div>

          <p className="mt-6 text-center text-sm text-slate-500">
            Noch kein Kundenkonto?{" "}
            <Link href="/kontakt#service-anfragen" className="font-semibold text-brand-700 underline underline-offset-2">
              Service anfragen
            </Link>
          </p>
        </div>
      </Container>
    </section>
  );
}
