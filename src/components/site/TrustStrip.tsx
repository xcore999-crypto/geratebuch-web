import { Container } from "@/components/ui/Container";
import { Icon, type IconName } from "@/components/ui/Icon";

const items: { icon: IconName; title: string; description: string }[] = [
  {
    icon: "globe",
    title: "Deutschlandweit im Einsatz",
    description: "Schnelle Reaktionszeiten und flächendeckender Service.",
  },
  {
    icon: "shield-check",
    title: "Qualifizierte Techniker",
    description: "Erfahrenes Fachpersonal für alle gängigen Hersteller.",
  },
  {
    icon: "layers",
    title: "Herstellerunabhängig",
    description: "Wir kennen Ihre Geräte — unabhängig vom Hersteller.",
  },
  {
    icon: "lock",
    title: "Sichere Daten",
    description: "Ihre Daten werden DSGVO-konform gespeichert.",
  },
];

export function TrustStrip() {
  return (
    <section className="border-t border-slate-100 py-14">
      <Container>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <div key={item.title} className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-navy-700">
                <Icon name={item.icon} className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-semibold text-navy-900">{item.title}</p>
                <p className="mt-1 text-sm leading-snug text-slate-500">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
