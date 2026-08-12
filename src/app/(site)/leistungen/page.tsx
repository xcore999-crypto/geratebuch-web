import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceGrid } from "@/components/site/ServiceGrid";
import { CtaBanner } from "@/components/site/CtaBanner";

export const metadata: Metadata = {
  title: "Leistungen",
  description:
    "Wartung, STK-Prüfung, Reparatur & Diagnose, DGUV V3/VDE, Laserschutzbeauftragter und Beratung — der Servicekatalog von geratebuch.de.",
};

export default function LeistungenPage() {
  return (
    <>
      <section className="bg-slate-50 py-16">
        <Container>
          <SectionHeading
            eyebrow="Leistungen"
            title="Ein Katalog für alle Serviceanfragen"
            description="Auf der Website lernen Sie jede Leistung kennen. Im Kundenbereich fordern Sie dieselbe Leistung gezielt für ein registriertes Gerät an — Ihre Daten sind bereits hinterlegt."
          />
        </Container>
      </section>
      <ServiceGrid eyebrow="Übersicht" title="Alle Leistungen" description="" />
      <CtaBanner />
    </>
  );
}
