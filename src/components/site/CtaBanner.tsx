import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function CtaBanner({
  title = "Bereit für Ihre digitale Geräteakte?",
  description = "Fordern Sie in wenigen Minuten einen Service an oder registrieren Sie Ihr erstes Gerät bei geratebuch.de.",
  primaryLabel = "Service anfragen",
  primaryHref = "/kontakt#service-anfragen",
  secondaryLabel = "Beratungstermin vereinbaren",
  secondaryHref = "/kontakt",
}: {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  return (
    <section className="bg-brand-600 py-16">
      <Container className="flex flex-col items-center gap-6 text-center">
        <h2 className="max-w-xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {title}
        </h2>
        <p className="max-w-lg text-brand-50/90">{description}</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button href={primaryHref} variant="secondary" size="lg">
            {primaryLabel}
          </Button>
          <Button href={secondaryHref} variant="outline-light" size="lg">
            {secondaryLabel}
          </Button>
        </div>
      </Container>
    </section>
  );
}
