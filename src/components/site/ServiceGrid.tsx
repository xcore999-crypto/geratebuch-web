import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { services } from "@/lib/services";

export function ServiceGrid({
  contained = true,
  eyebrow = "Servicekatalog",
  title = "Unser Servicekatalog",
  description = "Alle Leistungen für den sicheren und effizienten Betrieb Ihrer Geräte.",
}: {
  contained?: boolean;
  eyebrow?: string;
  title?: string;
  description?: string;
}) {
  const grid = (
    <div className="reveal-grid mt-14 grid gap-5 md:grid-cols-2">
      {services.map((service, index) => (
        <Link
          key={service.slug}
          href={`/leistungen/${service.slug}`}
          className="group relative flex min-h-72 flex-col overflow-hidden rounded-card border border-slate-200/80 bg-white p-7 shadow-card transition duration-500 hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-card-hover"
          data-reveal
        >
          <span className="absolute right-6 top-5 text-5xl font-bold tracking-tighter text-slate-100 transition group-hover:text-brand-50">{String(index + 1).padStart(2, "0")}</span>
          <span className="icon-orbit flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-600 transition duration-300 group-hover:bg-brand-500 group-hover:text-white">
            <Icon name={service.icon} className="h-5 w-5" />
          </span>
          <p className="mt-7 text-xs font-bold uppercase tracking-[0.16em] text-brand-600">{service.shortName}</p>
          <p className="mt-2 text-2xl font-bold tracking-tight text-navy-900">{service.name}</p>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-500">{service.summary}</p>
          <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-navy-900">
            Leistung entdecken
            <Icon name="arrow-right" className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </span>
        </Link>
      ))}
    </div>
  );

  if (!contained) {
    return (
      <>
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />
        {grid}
      </>
    );
  }

  return (
    <section id="service-cards" className="py-24 sm:py-28">
      <Container>
        <div data-reveal><SectionHeading eyebrow={eyebrow} title={title} description={description} /></div>
        {grid}
      </Container>
    </section>
  );
}
