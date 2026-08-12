import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Container } from "@/components/ui/Container";

const trustPoints = [
  "Herstellerunabhängiger Service",
  "Persönliche Fachberatung",
  "Lückenlose Dokumentation",
];

export function Hero() {
  return (
    <section className="hero-stage medtech-grid relative isolate min-h-[760px] overflow-hidden bg-navy-950 text-white lg:min-h-[calc(100svh-112px)]">
      <Image
        src="/images/hero-medtech.png"
        alt="Fiktives kosmetologisches Hightech-Gerät in einem dunklen Studio"
        fill
        priority
        sizes="100vw"
        className="hero-product object-cover object-[68%_center]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,19,22,0.98)_0%,rgba(3,19,22,0.92)_38%,rgba(3,19,22,0.28)_72%,rgba(3,19,22,0.18)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(3,19,22,0.95)_0%,transparent_38%),radial-gradient(circle_at_70%_35%,rgba(24,170,166,0.12),transparent_28%)]" />
      <div className="hero-scan pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-300/70 to-transparent" />

      <Container className="relative flex min-h-[760px] flex-col justify-center py-20 lg:min-h-[calc(100svh-112px)] lg:py-24">
        <div className="max-w-3xl">
          <p className="hero-enter hero-enter-1 mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.065] px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-brand-200 backdrop-blur">
            <span className="live-dot h-1.5 w-1.5 rounded-full bg-brand-300" />
            Geräteservice &amp; digitale Dokumentation
          </p>
          <h1 className="hero-enter hero-enter-2 max-w-3xl text-5xl font-bold tracking-[-0.06em] text-white sm:text-6xl lg:text-[5.4rem] lg:leading-[0.93]">
            Technik im Griff. <span className="text-brand-300">Zukunft in der Akte.</span>
          </h1>
          <p className="hero-enter hero-enter-3 mt-7 max-w-2xl text-lg leading-relaxed text-slate-300 sm:text-xl">
            Wartung, Reparatur, STK und NiSV-Unterstützung für Kosmetik- und Lasergeräte — verbunden mit Ihrer digitalen Geräteakte.
          </p>

          <div className="hero-enter hero-enter-4 mt-8 flex flex-wrap gap-3">
            <Button href="/kontakt#service-anfragen" size="lg">
              Service anfragen
              <Icon name="arrow-right" className="h-4 w-4" />
            </Button>
            <Button href="/digitales-geraetebuch" variant="outline-light" size="lg">
              Gerätebuch entdecken
            </Button>
          </div>

          <ul className="hero-enter hero-enter-5 mt-8 flex flex-wrap gap-x-6 gap-y-2">
            {trustPoints.map((point) => (
              <li key={point} className="flex items-center gap-2 text-sm text-slate-300">
                <Icon name="check-circle" className="h-4 w-4 text-brand-300" />
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="hero-enter hero-enter-5 absolute bottom-8 right-6 hidden max-w-sm rounded-[1.35rem] border border-white/15 bg-navy-950/65 p-4 shadow-card-hover backdrop-blur-xl md:block lg:right-8">
          <div className="flex items-center gap-3">
            <span className="icon-orbit flex h-11 w-11 items-center justify-center rounded-full bg-brand-500 text-white">
              <Icon name="device" className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-300">Live Geräteakte</p>
              <p className="mt-0.5 text-sm font-semibold text-white">Servicebericht synchronisiert</p>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2 border-t border-white/10 pt-3 text-xs text-slate-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            6 Geräte · 5 Dokumente · alle Fristen im Blick
          </div>
        </div>

        <a href="#serviceportfolio" className="scroll-cue absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[0.62rem] font-bold uppercase tracking-[0.2em] text-white/45 lg:flex">
          Entdecken
          <span className="relative h-10 w-6 rounded-full border border-white/25">
            <span className="absolute left-1/2 top-2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-brand-300" />
          </span>
        </a>
      </Container>
    </section>
  );
}
