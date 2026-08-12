import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Container } from "@/components/ui/Container";

const trustPoints = [
  "Herstellerunabhängig",
  "Schnell & zuverlässig",
  "Rechtssicher dokumentiert",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white">
      <Container className="grid items-center gap-16 py-16 lg:grid-cols-2 lg:py-24">
        <div>
          <p className="mb-5 inline-flex items-center rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-700">
            Ihr Servicepartner für Kosmetik- & Lasertechnik
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-navy-900 sm:text-5xl">
            Wartung, Reparatur, STK &amp; digitale Geräteakte — alles aus einer Hand.
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-slate-600">
            geratebuch.de ist die digitale Serviceplattform für Kosmetik- und
            Lasergeräte in Deutschland. Sie fordern Service an, wir dokumentieren
            jede Leistung — und Ihr Studio bleibt jederzeit einsatzbereit.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/kontakt#service-anfragen" size="lg">
              Service anfragen
              <Icon name="arrow-right" className="h-4 w-4" />
            </Button>
            <Button href="/digitales-geraetebuch" variant="secondary" size="lg">
              Mehr erfahren
            </Button>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
            {trustPoints.map((point) => (
              <li key={point} className="flex items-center gap-1.5 text-sm text-slate-600">
                <Icon name="check-circle" className="h-4 w-4 text-brand-600" />
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:mx-0">
          <div className="rounded-card border border-white/10 bg-navy-900 p-6 shadow-card-hover">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Digitale Geräteakte
              </span>
              <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs font-medium text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Einsatzbereit
              </span>
            </div>

            <div className="mt-5 flex items-center gap-3 border-t border-white/10 pt-5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white/10 text-white">
                <Icon name="device" className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-semibold text-white">Candela GentleMax Pro</p>
                <p className="text-xs text-slate-400">SN: GMP-192837 · Behandlungsraum 1</p>
              </div>
            </div>

            <dl className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-btn bg-white/5 p-3">
                <dt className="text-xs text-slate-400">Letzter Service</dt>
                <dd className="mt-1 text-sm font-semibold text-white">10.02.2026</dd>
              </div>
              <div className="rounded-btn bg-white/5 p-3">
                <dt className="text-xs text-slate-400">Nächster Termin</dt>
                <dd className="mt-1 text-sm font-semibold text-white">10.02.2027</dd>
              </div>
            </dl>

            <div className="mt-4 flex items-center justify-between rounded-btn bg-white/5 px-3 py-2.5">
              <span className="flex items-center gap-2 text-xs text-slate-300">
                <Icon name="document" className="h-4 w-4 text-slate-400" />
                Wartungsprotokoll.pdf
              </span>
              <Icon name="download" className="h-4 w-4 text-slate-500" />
            </div>
          </div>

          <div className="absolute -bottom-6 -left-6 hidden rounded-card border border-slate-200 bg-white px-4 py-3 shadow-card-hover sm:block">
            <p className="flex items-center gap-2 text-sm font-semibold text-navy-900">
              <Icon name="shield-check" className="h-4 w-4 text-brand-600" />
              STK-Prüfung dokumentiert
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
