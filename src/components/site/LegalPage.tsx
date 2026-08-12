import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";

export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <section className="py-16">
      <Container className="max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight text-navy-900">{title}</h1>
        <p className="mt-2 text-sm text-slate-500">Stand: {updated}</p>

        <div className="mt-6 flex gap-3 rounded-card border border-amber-200 bg-amber-50 p-4">
          <Icon name="exclamation-triangle" className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
          <p className="text-xs leading-relaxed text-amber-800">
            Vorschau-Hinweis: Dieser Text enthält Platzhalterangaben für die
            Entwicklung dieser Website und ist keine rechtsverbindliche
            Fassung. Vor Veröffentlichung muss er von einer auf deutsches
            Recht spezialisierten Fachperson geprüft werden.
          </p>
        </div>

        <div className="legal-content mt-10 space-y-8 text-sm leading-relaxed text-slate-600">
          {children}
        </div>
      </Container>
    </section>
  );
}

export function LegalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-navy-900">{title}</h2>
      <div className="mt-3 space-y-3">{children}</div>
    </div>
  );
}
