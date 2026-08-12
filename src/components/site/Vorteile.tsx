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
    <section className="py-24 sm:py-28" data-reveal>
      <Container>
        <SectionHeading align="center" title="Ihre Vorteile mit geratebuch.de" className="mx-auto" />
        <div className="mt-14 grid overflow-hidden rounded-card border border-slate-200/80 bg-white sm:grid-cols-2 lg:grid-cols-5">
          {items.map((item, index) => (
            <div
              key={item.title}
              className="group relative border-b border-slate-100 p-7 transition duration-300 last:border-b-0 hover:bg-brand-50/60 sm:border-r lg:border-b-0 lg:last:border-r-0"
            >
              <span className="absolute right-5 top-5 text-xs font-bold text-slate-300">0{index + 1}</span>
              <span className="icon-orbit flex h-11 w-11 items-center justify-center rounded-full bg-brand-50 text-brand-600 transition duration-300 group-hover:bg-brand-500 group-hover:text-white">
                <Icon name={item.icon} className="h-5 w-5" />
              </span>
              <p className="mt-5 text-sm font-bold text-navy-900">{item.title}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{item.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
