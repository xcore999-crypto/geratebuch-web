import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { StatusPill } from "@/components/ui/Badge";

const rows = [
  { name: "Candela GentleMax Pro", sn: "GMP-192837", status: "In Ordnung", tone: "success" as const, date: "10.02.2027" },
  { name: "Fotona StarWalker MaQX", sn: "SW-556677", status: "Wartung fällig", tone: "warning" as const, date: "02.09.2026" },
  { name: "Zimmer Cryo 6", sn: "CRY-445566", status: "STK überfällig", tone: "danger" as const, date: "18.07.2026" },
];

export function PortalTeaser() {
  return (
    <section className="bg-navy-950 py-20">
      <Container className="grid items-center gap-14 lg:grid-cols-2">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-teal-400">
            Ihr Kundenbereich
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Alle Geräte, Anfragen und Dokumente an einem Ort.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-300">
            Im geratebuch.de-Kundenbereich sehen Sie den Status jedes Geräts,
            fordern Services direkt für ein bestimmtes Gerät an und finden
            jeden Bericht sofort wieder — ganz ohne erneuten Anruf.
          </p>
          <ul className="mt-6 space-y-3">
            {[
              "Services direkt für ein registriertes Gerät anfragen",
              "Status jeder Anfrage in Echtzeit verfolgen",
              "Prüfprotokolle und Serviceberichte als PDF herunterladen",
            ].map((point) => (
              <li key={point} className="flex items-start gap-2.5 text-sm text-slate-300">
                <Icon name="check-circle" className="mt-0.5 h-4 w-4 shrink-0 text-teal-400" />
                {point}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/login" variant="primary">
              Zum Kundenbereich
            </Button>
            <Button href="/digitales-geraetebuch" variant="outline-light">
              Digitales Gerätebuch entdecken
            </Button>
          </div>
        </div>

        <div className="rounded-card border border-white/10 bg-navy-800/60 p-5 shadow-card-hover">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-white">Meine Geräte</p>
            <span className="text-xs text-slate-400">Kosmetikinstitut Lindenhof</span>
          </div>
          <div className="mt-4 divide-y divide-white/10 overflow-hidden rounded-btn border border-white/10">
            {rows.map((row) => (
              <div key={row.sn} className="flex items-center justify-between gap-3 bg-white/[0.02] px-4 py-3.5">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-white">{row.name}</p>
                  <p className="text-xs text-slate-400">SN: {row.sn} · nächster Termin {row.date}</p>
                </div>
                <StatusPill tone={row.tone}>{row.status}</StatusPill>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
