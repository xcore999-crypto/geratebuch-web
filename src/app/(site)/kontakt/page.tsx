import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { ServiceRequestForm } from "@/components/site/ServiceRequestForm";
import { contact } from "@/lib/nav";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Service anfragen oder Kontakt zu geratebuch.de aufnehmen — ein Service von EuroIPL.",
};

export default function KontaktPage() {
  return (
    <>
      <section className="bg-slate-50 py-16">
        <Container className="max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-brand-600">Kontakt</p>
          <h1 className="text-4xl font-bold tracking-tight text-navy-900 sm:text-5xl">
            Sprechen Sie mit uns.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">
            Ob konkrete Serviceanfrage oder allgemeine Frage — wir sind für Sie
            erreichbar. Bereits Kunde bei uns?{" "}
            <a href="/login" className="font-semibold text-brand-700 underline underline-offset-2">
              Melden Sie sich im Kundenbereich an
            </a>{" "}
            für den schnellsten Weg.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="flex items-start gap-3 rounded-card border border-slate-200 bg-white p-4 shadow-card">
              <Icon name="phone" className="mt-0.5 h-5 w-5 text-brand-600" />
              <span>
                <span className="block text-sm font-semibold text-navy-900">{contact.phone}</span>
                <span className="block text-xs text-slate-500">{contact.phoneHours}</span>
              </span>
            </a>
            <a href={`mailto:${contact.email}`} className="flex items-start gap-3 rounded-card border border-slate-200 bg-white p-4 shadow-card">
              <Icon name="envelope" className="mt-0.5 h-5 w-5 text-brand-600" />
              <span className="text-sm font-semibold text-navy-900">{contact.email}</span>
            </a>
            <div className="flex items-start gap-3 rounded-card border border-slate-200 bg-white p-4 shadow-card">
              <Icon name="map-pin" className="mt-0.5 h-5 w-5 text-brand-600" />
              <span className="text-sm font-semibold text-navy-900">Deutschlandweit im Einsatz</span>
            </div>
          </div>
        </Container>
      </section>

      <section id="service-anfragen" className="scroll-mt-24 py-16">
        <Container className="max-w-3xl">
          <h2 className="text-2xl font-bold text-navy-900">Service anfragen</h2>
          <p className="mt-2 text-slate-600">
            Beantworten Sie ein paar kurze Fragen — den Rest klären wir mit
            Ihnen gemeinsam.
          </p>
          <div className="mt-8">
            <ServiceRequestForm />
          </div>
        </Container>
      </section>
    </>
  );
}
