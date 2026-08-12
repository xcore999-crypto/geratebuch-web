import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { CtaBanner } from "@/components/site/CtaBanner";

export const metadata: Metadata = {
  title: "Digitales Gerätebuch",
  description:
    "Das Digitale Gerätebuch (Technische Geräteakte) von geratebuch.de dokumentiert Wartung, Reparatur und Prüfungen jedes Geräts lückenlos.",
};

const events: { icon: IconName; title: string; description: string }[] = [
  {
    icon: "device",
    title: "Registrierung",
    description: "Modell, Seriennummer, Standort und Foto des Typenschilds — der Startpunkt der Geräteakte.",
  },
  {
    icon: "wrench",
    title: "Wartung & Inspektion",
    description: "Datum, Umfang, Ergebnis und die von EuroIPL empfohlene nächste Wartung.",
  },
  {
    icon: "tool",
    title: "Reparatur & Diagnose",
    description: "Symptom, Befund, durchgeführte Maßnahmen und eventuelle Einschränkungen.",
  },
  {
    icon: "shield-check",
    title: "STK / DGUV V3 / VDE",
    description: "Art und Grundlage der Prüfung, Messwerte, Ergebnis und Prüfprotokoll.",
  },
];

const rules: { title: string; description: string }[] = [
  {
    title: "EuroIPL finalisiert jeden Eintrag",
    description: "Sie melden eine Störung oder fordern einen Service an — den technischen Eintrag erstellt und bestätigt EuroIPL nach der Leistung.",
  },
  {
    title: "Finalisierte Einträge werden nicht überschrieben",
    description: "Korrekturen erfolgen als nachvollziehbare Ergänzung mit Verweis auf die ursprüngliche Version, niemals als stille Änderung.",
  },
  {
    title: "Jederzeit als PDF exportierbar",
    description: "Die vollständige Historie sowie jedes einzelne Dokument stehen Ihnen im Kundenbereich als PDF zur Verfügung.",
  },
  {
    title: "Getrennt nach Organisation",
    description: "Sie sehen ausschließlich die Geräte und Dokumente Ihres eigenen Unternehmens.",
  },
];

export default function DigitalesGeraetebuchPage() {
  return (
    <>
      <section className="bg-slate-50 py-16 lg:py-20">
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-brand-600">
              Digitales Gerätebuch
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-navy-900 sm:text-5xl">
              Ihre Geräte, lückenlos dokumentiert.
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">
              Das Digitale Gerätebuch — auch Technische Geräteakte genannt — sammelt
              für jedes registrierte Gerät alle Wartungen, Reparaturen und Prüfungen
              an einem Ort. Kein Ordner, kein Suchen in alten E-Mails.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/login" size="lg">
                Kundenbereich öffnen
              </Button>
              <Button href="/kontakt#service-anfragen" variant="secondary" size="lg">
                Erstes Gerät registrieren
              </Button>
            </div>
          </div>

          <div className="rounded-card border border-slate-200 bg-white p-6 shadow-card-hover">
            <p className="text-sm font-semibold text-navy-900">Fotona StarWalker MaQX</p>
            <p className="text-xs text-slate-500">SN: SW-556677 · Behandlungsraum 2</p>
            <ol className="mt-5 space-y-5 border-l border-slate-200 pl-5">
              {[
                { date: "20.04.2024", label: "Gerät registriert" },
                { date: "28.08.2025", label: "Wartung & Inspektion" },
                { date: "02.09.2026", label: "Nächste Wartung geplant", muted: true },
              ].map((entry) => (
                <li key={entry.date} className="relative">
                  <span
                    className={`absolute -left-[1.65rem] top-1 h-2.5 w-2.5 rounded-full ${
                      entry.muted ? "bg-slate-300" : "bg-brand-600"
                    }`}
                  />
                  <p className="text-xs text-slate-500">{entry.date}</p>
                  <p className={`text-sm font-medium ${entry.muted ? "text-slate-500" : "text-navy-900"}`}>
                    {entry.label}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <SectionHeading
            eyebrow="Inhalt"
            title="Was in Ihrer Geräteakte gespeichert wird"
            description="Jedes Ereignis wird typisiert erfasst, damit Wartungshistorie, Prüfnachweise und Reparaturen klar auseinandergehalten werden."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {events.map((event) => (
              <div key={event.title} className="flex gap-4 rounded-card border border-slate-200 p-5 shadow-card">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                  <Icon name={event.icon} className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-navy-900">{event.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-500">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-navy-950 py-20">
        <Container>
          <SectionHeading
            light
            eyebrow="Verlässlichkeit"
            title="So bleiben Ihre Daten vertrauenswürdig"
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {rules.map((rule) => (
              <div key={rule.title} className="rounded-card border border-white/10 bg-white/[0.03] p-5">
                <p className="flex items-start gap-2.5 text-sm font-semibold text-white">
                  <Icon name="check-circle" className="mt-0.5 h-4 w-4 shrink-0 text-teal-400" />
                  {rule.title}
                </p>
                <p className="mt-2 pl-6 text-sm leading-relaxed text-slate-400">{rule.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CtaBanner />
    </>
  );
}
