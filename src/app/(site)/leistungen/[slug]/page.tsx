import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Steps } from "@/components/site/Steps";
import { CtaBanner } from "@/components/site/CtaBanner";
import { services, getServiceBySlug } from "@/lib/services";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata(
  props: PageProps<"/leistungen/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: service.name,
    description: service.summary,
  };
}

export default async function ServiceDetailPage(
  props: PageProps<"/leistungen/[slug]">
) {
  const { slug } = await props.params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const related = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <section className="bg-slate-50 py-16">
        <Container>
          <Link
            href="/leistungen"
            className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-brand-700"
          >
            <Icon name="chevron-right" className="h-3.5 w-3.5 rotate-180" />
            Alle Leistungen
          </Link>
          <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-start">
            <div>
              <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                <Icon name={service.icon} className="h-6 w-6" />
              </span>
              <h1 className="mt-5 text-4xl font-bold tracking-tight text-navy-900">
                {service.name}
              </h1>
              <p className="mt-2 text-lg font-medium text-brand-700">{service.tagline}</p>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-slate-600">
                {service.summary}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href={service.ctaHref ?? "/kontakt#service-anfragen"} size="lg">
                  {service.ctaLabel}
                </Button>
                {service.callOptions ? (
                  <Button href="#beratungspakete" variant="secondary" size="lg">
                    Buying &amp; Selling Call ansehen
                  </Button>
                ) : (
                  <Button href="/login" variant="secondary" size="lg">
                    Im Kundenbereich anfragen
                  </Button>
                )}
              </div>
            </div>

            <div className="rounded-card border border-slate-200 bg-white p-6 shadow-card">
              <p className="text-sm font-semibold text-navy-900">Für wen geeignet</p>
              <ul className="mt-4 space-y-3">
                {service.forWhen.map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-sm text-slate-600">
                    <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-xl font-bold text-navy-900">Was ist enthalten</h2>
            <ul className="mt-5 space-y-3">
              {service.included.map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-600">
                  <Icon name="check-circle" className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-card border border-brand-100 bg-brand-50 p-6">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-brand-800">
              <Icon name="document" className="h-4 w-4" />
              Ergebnis
            </h2>
            <p className="mt-2 text-lg font-semibold text-navy-900">{service.outcome}</p>
            <p className="mt-2 text-sm leading-relaxed text-brand-900/80">
              {service.callOptions
                ? "Nach dem Gespräch erhalten Sie die Zusammenfassung und Ihre individuelle Checkliste digital. Ein bereits registriertes Gerät ist dafür nicht erforderlich."
                : "Automatisch verknüpft mit dem Gerät, für das die Leistung erbracht wurde — abrufbar in Ihrem Kundenbereich."}
            </p>
          </div>
        </Container>
      </section>

      {service.callOptions && (
        <section id="beratungspakete" className="scroll-mt-24 bg-slate-50 py-16">
          <Container>
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">
                Beratungsoptionen
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy-900">
                Buying Call oder Selling Call
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-slate-600">
                Öffnen Sie den passenden Call und sehen Sie alle 15 Punkte, bei denen wir Sie unterstützen können.
              </p>
            </div>

            <div className="mt-10 grid items-start gap-5 lg:grid-cols-2">
              {service.callOptions.map((option) => (
                <details
                  key={option.title}
                  className="group rounded-card border border-slate-200 bg-white shadow-card"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6 [&::-webkit-details-marker]:hidden">
                    <span>
                      <span className="block text-xl font-bold text-navy-900">{option.title}</span>
                      <span className="mt-1.5 block text-sm leading-relaxed text-slate-500">
                        {option.description}
                      </span>
                    </span>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700">
                      <Icon name="chevron-down" className="h-4 w-4 transition group-open:rotate-180" />
                    </span>
                  </summary>
                  <ol className="space-y-3 border-t border-slate-100 px-6 py-5">
                    {option.points.map((point, index) => (
                      <li key={point} className="flex items-start gap-3 text-sm leading-relaxed text-slate-600">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-50 text-xs font-semibold text-brand-700">
                          {index + 1}
                        </span>
                        {point}
                      </li>
                    ))}
                  </ol>
                </details>
              ))}
            </div>
          </Container>
        </section>
      )}

      <Steps eyebrow="Ablauf" title="So läuft es ab" steps={service.process} />

      {service.legalNote && (
        <section className="py-16">
          <Container>
            <div className="flex gap-4 rounded-card border border-amber-200 bg-amber-50 p-6">
              <Icon name="exclamation-triangle" className="h-5 w-5 shrink-0 text-amber-600" />
              <div>
                <p className="text-sm font-semibold text-amber-900">Wichtiger Hinweis</p>
                <p className="mt-1 text-sm leading-relaxed text-amber-800">{service.legalNote}</p>
              </div>
            </div>
          </Container>
        </section>
      )}

      <section className="border-t border-slate-100 py-16">
        <Container>
          <h2 className="text-xl font-bold text-navy-900">Weitere Leistungen</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`/leistungen/${item.slug}`}
                className="group rounded-card border border-slate-200 p-5 shadow-card hover:shadow-card-hover"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                  <Icon name={item.icon} className="h-4 w-4" />
                </span>
                <p className="mt-3 text-sm font-semibold text-navy-900">{item.name}</p>
                <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-brand-700">
                  Mehr erfahren
                  <Icon name="arrow-right" className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <CtaBanner
        title={`Bereit für ${service.name}?`}
        description={
          service.ctaHref
            ? "Wählen Sie Ihr Bundesland und öffnen Sie den offiziellen Einreichungsweg für Ihren Betriebsort."
            : service.callOptions
            ? "Schildern Sie uns kurz, ob Sie ein Gerät kaufen oder verkaufen möchten. Ein Kundenkonto oder bereits registriertes Gerät ist nicht erforderlich."
            : undefined
        }
        primaryLabel={service.ctaLabel}
        primaryHref={service.ctaHref}
      />
    </>
  );
}
