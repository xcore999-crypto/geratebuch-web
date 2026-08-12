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
    <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <Link
          key={service.slug}
          href={`/leistungen/${service.slug}`}
          className="group flex flex-col rounded-card border border-slate-200 p-6 shadow-card transition hover:-translate-y-0.5 hover:shadow-card-hover"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
            <Icon name={service.icon} className="h-5 w-5" />
          </span>
          <p className="mt-4 text-base font-semibold text-navy-900">{service.name}</p>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500">{service.summary}</p>
          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
            Mehr erfahren
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
    <section className="py-20">
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />
        {grid}
      </Container>
    </section>
  );
}
