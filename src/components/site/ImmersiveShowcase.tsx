import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";

const facts = [
  ["01", "Prüfen", "Zustand, Sicherheit und Fristen im Blick"],
  ["02", "Dokumentieren", "Berichte direkt in der Geräteakte"],
  ["03", "Weiterarbeiten", "Planbar, transparent und nachvollziehbar"],
];

export function ImmersiveShowcase() {
  return (
    <section className="relative overflow-hidden bg-navy-950 py-10 text-white sm:py-16">
      <Container>
        <div className="showcase-frame medtech-grid relative min-h-[680px] overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_48px_120px_-42px_rgba(0,0,0,0.85)]" data-reveal="scale">
          <Image
            src="/images/service-core.png"
            alt="Fiktive, transparente Gerätetechnik als Symbol für Diagnose und Service"
            fill
            sizes="(max-width: 1280px) 100vw, 1216px"
            className="showcase-image object-cover object-[64%_center]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,19,22,0.96)_0%,rgba(3,19,22,0.82)_35%,rgba(3,19,22,0.18)_75%),linear-gradient(0deg,rgba(3,19,22,0.88),transparent_45%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_48%,rgba(53,193,188,0.2),transparent_35%)]" />

          <div className="relative flex min-h-[680px] flex-col justify-between p-7 sm:p-10 lg:p-14">
            <div className="flex items-center justify-between gap-4">
              <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-brand-200 backdrop-blur">
                <span className="live-dot h-2 w-2 rounded-full bg-brand-300" />
                Service in Bewegung
              </p>
              <span className="hidden text-xs font-semibold uppercase tracking-[0.18em] text-white/45 sm:block">Scroll Experience · 02</span>
            </div>

            <div className="max-w-2xl" data-reveal>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-300">Von innen verstanden</p>
              <h2 className="mt-4 text-4xl font-bold tracking-[-0.05em] sm:text-5xl lg:text-6xl">
                Technik, die weiterdenkt. Service, der bleibt.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
                Von der ersten Prüfung bis zum fertigen Bericht: Jeder Schritt wird sichtbar, jede Frist nachvollziehbar und jedes Gerät sauber dokumentiert.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/kontakt#service-anfragen" size="lg">
                  Service starten <Icon name="arrow-right" className="h-4 w-4" />
                </Button>
                <a href="#service-cards" className="group inline-flex h-13 items-center gap-3 rounded-full border border-white/20 px-5 text-sm font-semibold text-white transition hover:border-brand-300/60 hover:bg-white/10">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition group-hover:scale-110 group-hover:bg-brand-500">
                    <Icon name="play" className="ml-0.5 h-3.5 w-3.5" />
                  </span>
                  Leistungen ansehen
                </a>
              </div>
            </div>

            <div className="grid gap-2 border-t border-white/10 pt-5 sm:grid-cols-3">
              {facts.map(([number, title, description], index) => (
                <div key={number} className="showcase-fact rounded-2xl border border-white/10 bg-white/[0.055] p-4 backdrop-blur" style={{ animationDelay: `${index * 0.7}s` }}>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-brand-300">{number}</span>
                    <p className="font-bold text-white">{title}</p>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-slate-400">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
