import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { ServiceRequestForm } from "@/components/site/ServiceRequestForm";
import { contact } from "@/lib/nav";
import { PageHero } from "@/components/site/PageHero";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Service anfragen oder Kontakt zu geratebuch.de aufnehmen — ein Service von EuroIPL.",
};

export default function KontaktPage() {
  return (
    <>
      <PageHero
        eyebrow="Kontakt"
        title="Sprechen Sie mit uns."
        image="/images/page-kontakt.png"
        imageAlt="Moderner Servicearbeitsplatz mit Headset, Tablet und fiktivem Kosmetikgerät"
        description={
          <p>
            Ob konkrete Serviceanfrage oder allgemeine Frage — wir sind für Sie
            erreichbar. Bereits Kunde bei uns?{" "}
            <a href="/login" className="font-semibold text-brand-300 underline underline-offset-2">
              Melden Sie sich im Kundenbereich an
            </a>{" "}
            für den schnellsten Weg.
          </p>
        }
      >
          <div className="grid gap-3 sm:grid-cols-3">
            <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="group flex items-start gap-3 rounded-card border border-white/15 bg-white/[0.07] p-4 backdrop-blur transition hover:-translate-y-1 hover:bg-white/12">
              <Icon name="phone" className="mt-0.5 h-5 w-5 text-brand-300" />
              <span>
                <span className="block text-sm font-semibold text-white">{contact.phone}</span>
                <span className="block text-xs text-slate-400">{contact.phoneHours}</span>
              </span>
            </a>
            <a href={`mailto:${contact.email}`} className="flex items-start gap-3 rounded-card border border-white/15 bg-white/[0.07] p-4 backdrop-blur transition hover:-translate-y-1 hover:bg-white/12">
              <Icon name="envelope" className="mt-0.5 h-5 w-5 text-brand-300" />
              <span className="text-sm font-semibold text-white">{contact.email}</span>
            </a>
            <div className="flex items-start gap-3 rounded-card border border-white/15 bg-white/[0.07] p-4 backdrop-blur">
              <Icon name="map-pin" className="mt-0.5 h-5 w-5 text-brand-300" />
              <span className="text-sm font-semibold text-white">Deutschlandweit im Einsatz</span>
            </div>
          </div>
      </PageHero>

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
