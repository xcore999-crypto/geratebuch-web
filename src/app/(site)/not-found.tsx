import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

export default function SiteNotFound() {
  return (
    <section className="flex min-h-[calc(100vh-5rem)] items-center py-20">
      <Container className="flex flex-col items-center text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 text-brand-600">
          <Icon name="search" className="h-6 w-6" />
        </span>
        <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-brand-600">Fehler 404</p>
        <h1 className="mt-2 text-3xl font-bold text-navy-900">Diese Seite wurde nicht gefunden.</h1>
        <p className="mt-3 max-w-md text-slate-600">
          Der Link ist möglicherweise veraltet. Nutzen Sie die Navigation oder
          kehren Sie zur Startseite zurück.
        </p>
        <div className="mt-8 flex gap-3">
          <Button href="/">Zur Startseite</Button>
          <Button href="/kontakt" variant="secondary">
            Kontakt aufnehmen
          </Button>
        </div>
      </Container>
    </section>
  );
}
