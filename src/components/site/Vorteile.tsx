import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon, type IconName } from "@/components/ui/Icon";

const items: { icon: IconName; title: string; description: string }[] = [
  {
    icon: "shield",
    title: "Rechtssicher",
    description: "Alle Leistungen werden gemäß den geltenden Vorgaben dokumentiert.",
  },
  {
    icon: "clock",
    title: "Zeit sparen",
    description: "Digitale Prozesse reduzieren den Aufwand in Ihrem Studioalltag.",
  },
  {
    icon: "document",
    title: "Planbare Kosten",
    description: "Transparente Kostenvoranschläge vor jedem kostenpflichtigen Einsatz.",
  },
  {
    icon: "user",
    title: "Ein Ansprechpartner",
    description: "Persönlicher Support rund um alle Ihre Geräte und Anliegen.",
  },
  {
    icon: "lock",
    title: "Digital & sicher",
    description: "Alle Dokumente jederzeit griffbereit in Ihrer digitalen Geräteakte.",
  },
];

export function Vorteile() {
  return (
    <section className="py-20">
      <Container>
        <SectionHeading align="center" title="Ihre Vorteile mit geratebuch.de" className="mx-auto" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {items.map((item) => (
            <div
              key={item.title}
              className="rounded-card border border-slate-200 p-6 text-center shadow-card"
            >
              <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                <Icon name={item.icon} className="h-5 w-5" />
              </span>
              <p className="mt-4 text-sm font-semibold text-navy-900">{item.title}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{item.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
