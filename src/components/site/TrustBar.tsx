const manufacturers = [
  "Candela",
  "Fotona",
  "Alma Lasers",
  "Asclepion",
  "Lumenis",
  "Cutera",
  "Zimmer MedizinSysteme",
];

function BrandRow({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="flex shrink-0" aria-hidden={hidden || undefined}>
      {manufacturers.map((name) => (
        <span key={name} className="flex min-w-52 items-center justify-center border-r border-slate-200/80 px-8 py-7 text-center text-sm font-bold tracking-tight text-slate-500 transition hover:bg-brand-50 hover:text-brand-700">
          {name}
        </span>
      ))}
    </div>
  );
}

export function TrustBar() {
  return (
    <section className="overflow-hidden border-y border-slate-200/80 bg-white py-9" id="serviceportfolio">
      <p className="text-center text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
        Herstellerunabhängiger Service u.&nbsp;a. für Geräte von
      </p>
      <div className="brand-marquee mt-6 flex w-max border-y border-slate-200/80 bg-white">
        <BrandRow />
        <BrandRow hidden />
      </div>
    </section>
  );
}
