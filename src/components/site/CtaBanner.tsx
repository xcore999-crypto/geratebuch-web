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
    <section className="relative overflow-hidden bg-brand-500 py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(255,255,255,0.2),transparent_28%),linear-gradient(120deg,transparent,rgba(3,19,22,0.12))]" />
      <Container className="relative flex flex-col items-center gap-6 text-center" data-reveal>
        <h2 className="max-w-2xl text-4xl font-bold tracking-[-0.04em] text-white sm:text-5xl">
          {title}
        </h2>
        <p className="max-w-xl text-lg text-white/85">{description}</p>
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
