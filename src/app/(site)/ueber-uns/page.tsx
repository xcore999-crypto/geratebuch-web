import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon, type IconName } from "@/components/ui/Icon";
import { CtaBanner } from "@/components/site/CtaBanner";
import { PageHero } from "@/components/site/PageHero";

export const metadata: Metadata = {
  title: "Über uns",
  description:
    "EuroIPL ist der Servicepartner hinter geratebuch.de — seit über 20 Jahren im technischen Service für Kosmetik- und Lasergeräte in Deutschland.",
};

const qualifications: { icon: IconName; title: string; description: string }[] = [
  {
    icon: "layers",
    title: "Herstellerunabhängig",
    description: "Unsere Techniker sind auf die gängigen Kosmetik- und Lasergeräte verschiedener Hersteller eingearbeitet.",
  },
  {
    icon: "shield-check",
    title: "Geschultes Fachpersonal",
    description: "Sicherheitstechnische Kontrollen und elektrische Prüfungen führt ausschließlich qualifiziertes Personal durch.",
  },
  {
    icon: "document",
    title: "Nachvollziehbare Dokumentation",
    description: "Jede Leistung wird schriftlich festgehalten — Grundlage für Ihre digitale Geräteakte.",
  },
  {
    icon: "user",
    title: "Persönlicher Kontakt",
    description: "Ein fester Ansprechpartner begleitet Ihre Anfrage von der Meldung bis zum Abschlussbericht.",
  },
];

export default function UeberUnsPage() {
  return (
    <>
      <PageHero
        eyebrow="Über uns"
        title="geratebuch.de — ein Service von EuroIPL"
        image="/images/page-ueber-uns.png"
        imageAlt="Servicetechniker bei der Prüfung eines fiktiven Kosmetikgeräts"
        description={
          <p>
            EuroIPL wartet, repariert und prüft seit über 20 Jahren Kosmetik- und
            Lasergeräte für Studios und Kliniken in Deutschland. Mit geratebuch.de
            bringen wir diesen Service in ein digitales, nachvollziehbares Format:
            Sie fordern Leistungen an, wir dokumentieren jedes Ergebnis in Ihrer
            persönlichen Geräteakte.
          </p>
        }
      />

      <section className="py-20">
        <Container>
          <SectionHeading
            eyebrow="Qualifikationen"
            title="Worauf Sie sich bei EuroIPL verlassen können"
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {qualifications.map((item) => (
              <div key={item.title} className="flex gap-4 rounded-card border border-slate-200 p-5 shadow-card">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                  <Icon name={item.icon} className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-navy-900">{item.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-500">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm text-slate-500">
            Nachweise zu einzelnen Qualifikationen und Zertifizierungen stellen wir
            auf Anfrage gerne zur Verfügung.
          </p>
        </Container>
      </section>

      <section className="bg-slate-50 py-20">
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-brand-600">
              Servicegebiet
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-navy-900">
              Deutschlandweit im Einsatz
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              Unsere Techniker sind bundesweit unterwegs. Ob Wartung, Reparatur
              oder Prüfung — wir stimmen den Termin passend zu Ihrem Standort und
              der Dringlichkeit der Anfrage mit Ihnen ab.
            </p>
          </div>
          <div className="flex items-center justify-center rounded-card border border-slate-200 bg-white p-10 shadow-card">
            <Icon name="globe" className="h-24 w-24 text-brand-200" strokeWidth={1.1} />
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container className="max-w-3xl">
          <SectionHeading eyebrow="Geschichte" title="Von der Werkstatt zur digitalen Plattform" />
          <ol className="mt-10 space-y-8 border-l border-slate-200 pl-6">
            <li>
              <p className="text-sm font-semibold text-brand-700">Seit über 20 Jahren</p>
              <p className="mt-1 text-navy-900 font-medium">Technischer Service für Kosmetik- und Lasergeräte</p>
              <p className="mt-1 text-sm leading-relaxed text-slate-500">
                EuroIPL betreut Studios und Kliniken bei Wartung, Reparatur und
                Prüfung ihrer Geräte — herstellerunabhängig und persönlich.
              </p>
            </li>
            <li>
              <p className="text-sm font-semibold text-brand-700">Heute</p>
              <p className="mt-1 text-navy-900 font-medium">geratebuch.de geht online</p>
              <p className="mt-1 text-sm leading-relaxed text-slate-500">
                Derselbe Service, jetzt mit digitaler Geräteakte, klarem
                Anfragestatus und Dokumenten, die jederzeit griffbereit sind.
              </p>
            </li>
          </ol>
        </Container>
      </section>

      <CtaBanner />
    </>
  );
}
