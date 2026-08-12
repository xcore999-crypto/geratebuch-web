import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

export function NisvRegistrationTeaser() {
  return (
    <section className="py-24 sm:py-28">
      <Container>
        <div className="medtech-grid relative overflow-hidden rounded-[2rem] bg-navy-950 text-white shadow-card-hover" data-reveal="scale">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(24,170,166,0.22),transparent_32%)]" />
          <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
            <div className="relative p-8 sm:p-10 lg:p-14">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-300">Offizielle Meldestellen</p>
              <h2 className="mt-4 text-4xl font-bold tracking-[-0.04em] sm:text-5xl">NiSV-Geräteanmeldung</h2>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-300">
                Finden Sie die zuständige staatliche Stelle für Ihren Betriebsort — nach Bundesland, Stadt, Landkreis oder Bezirk. Mit offiziellen Formularen und direkten Online-Diensten.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/nisv-geraeteanmeldung" size="lg">Bundesland auswählen</Button>
                <Button href="/leistungen/nisv-geraeteanmeldung" variant="outline-light" size="lg">So funktioniert es</Button>
              </div>
            </div>
            <div className="relative border-t border-white/10 bg-white/[0.045] p-8 backdrop-blur sm:p-10 lg:border-l lg:border-t-0 lg:p-14">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-300">In drei Schritten</p>
              <ol className="mt-6 space-y-5">
                {[
                  "Bundesland des Betriebsorts wählen",
                  "Stadt, Landkreis oder Bezirk zuordnen",
                  "Offizielle Anzeige öffnen oder Behörde kontaktieren",
                ].map((step, index) => (
                  <li key={step} className="flex items-start gap-3 text-sm text-slate-300">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-brand-300/30 bg-brand-500/15 text-xs font-bold text-brand-200">0{index + 1}</span>
                    <span className="pt-1">{step}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-7 flex items-start gap-2 text-xs leading-relaxed text-slate-400">
                <Icon name="shield-check" className="mt-0.5 h-4 w-4 shrink-0 text-teal-500" />
                Nur Links und Kontaktdaten offizieller Bundes- und Landesstellen.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
