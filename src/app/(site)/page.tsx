import { Hero } from "@/components/site/Hero";
import { TrustBar } from "@/components/site/TrustBar";
import { Vorteile } from "@/components/site/Vorteile";
import { Steps } from "@/components/site/Steps";
import { ServiceGrid } from "@/components/site/ServiceGrid";
import { PortalTeaser } from "@/components/site/PortalTeaser";
import { TrustStrip } from "@/components/site/TrustStrip";
import { CtaBanner } from "@/components/site/CtaBanner";
import { DocumentLibraryTeaser } from "@/components/site/DocumentLibraryTeaser";
import { NisvRegistrationTeaser } from "@/components/site/NisvRegistrationTeaser";
import { ImmersiveShowcase } from "@/components/site/ImmersiveShowcase";

const homeSteps = [
  { title: "Registrieren", description: "Konto anlegen und Studio- sowie Gerätedaten erfassen." },
  { title: "Anfrage stellen", description: "Service auswählen, Gerät angeben und Wunschtermin nennen." },
  { title: "Service durchführen", description: "Unser Techniker führt die Leistung vor Ort durch." },
  { title: "Bericht erhalten", description: "Prüf- oder Servicebericht wird digital bereitgestellt." },
  { title: "Geräteakte aktuell", description: "Alle Dokumente & Historie sicher in Ihrer Geräteakte." },
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <ImmersiveShowcase />
      <ServiceGrid
        eyebrow="Unser Serviceportfolio"
        title="Technikservice, auf den Sie sich verlassen können."
        description="Von der regelmäßigen Wartung bis zur NiSV-Anzeige: ein klarer Weg für jedes Anliegen rund um Ihre Geräte."
      />
      <Vorteile />
      <Steps
        eyebrow="Ablauf"
        title="So einfach funktioniert's"
        steps={homeSteps}
      />
      <NisvRegistrationTeaser />
      <DocumentLibraryTeaser />
      <PortalTeaser />
      <TrustStrip />
      <CtaBanner />
    </>
  );
}
