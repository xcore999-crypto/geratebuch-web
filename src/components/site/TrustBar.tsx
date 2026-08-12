import { Container } from "@/components/ui/Container";

const manufacturers = [
  "Candela",
  "Fotona",
  "Alma Lasers",
  "Asclepion",
  "Lumenis",
  "Cutera",
  "Zimmer MedizinSysteme",
];

export function TrustBar() {
  return (
    <section className="border-y border-slate-100 bg-slate-50/60 py-8">
      <Container>
        <p className="text-center text-xs font-semibold uppercase tracking-wide text-slate-400">
          Herstellerunabhängiger Service u.&nbsp;a. für Geräte von
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {manufacturers.map((name) => (
            <span key={name} className="text-sm font-semibold text-slate-500">
              {name}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}
