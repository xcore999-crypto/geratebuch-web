import Image from "next/image";
import { Container } from "@/components/ui/Container";

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  children,
  imagePosition = "object-[72%_center]",
}: {
  eyebrow: string;
  title: string;
  description: React.ReactNode;
  image: string;
  imageAlt: string;
  children?: React.ReactNode;
  imagePosition?: string;
}) {
  return (
    <section className="page-hero medtech-grid relative isolate min-h-[560px] overflow-hidden bg-navy-950 text-white">
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className={`page-hero-image object-cover ${imagePosition}`}
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,19,22,0.98)_0%,rgba(3,19,22,0.92)_38%,rgba(3,19,22,0.3)_72%,rgba(3,19,22,0.12)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(3,19,22,0.8),transparent_45%),radial-gradient(circle_at_70%_42%,rgba(24,170,166,0.12),transparent_30%)]" />
      <div className="hero-scan pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-300/70 to-transparent" />

      <Container className="relative flex min-h-[560px] items-center py-20 sm:py-24">
        <div className="max-w-3xl">
          <p className="hero-enter hero-enter-1 mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.065] px-4 py-2 text-xs font-bold uppercase tracking-[0.17em] text-brand-200 backdrop-blur">
            <span className="live-dot h-1.5 w-1.5 rounded-full bg-brand-300" />
            {eyebrow}
          </p>
          <h1 className="hero-enter hero-enter-2 max-w-3xl text-4xl font-bold tracking-[-0.055em] text-white sm:text-5xl lg:text-6xl lg:leading-[0.98]">
            {title}
          </h1>
          <div className="hero-enter hero-enter-3 mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
            {description}
          </div>
          {children && <div className="hero-enter hero-enter-4 mt-8">{children}</div>}
        </div>
      </Container>
    </section>
  );
}
