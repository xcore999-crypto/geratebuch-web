import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/site/LegalPage";

export const metadata: Metadata = { title: "AGB / Servicebedingungen" };

export default function AgbPage() {
  return (
    <LegalPage title="Allgemeine Geschäfts- und Servicebedingungen" updated="12. August 2026">
      <LegalSection title="1. Geltungsbereich">
        <p>
          Diese Bedingungen gelten für alle über geratebuch.de angefragten und
          von der EuroIPL Servicetechnik GmbH erbrachten Serviceleistungen für
          Kosmetik- und Lasergeräte gewerblicher Kundinnen und Kunden.
        </p>
      </LegalSection>

      <LegalSection title="2. Zustandekommen einer Serviceanfrage">
        <p>
          Eine Serviceanfrage über das Kontaktformular oder den Kundenbereich
          ist ein unverbindliches Angebot Ihrerseits. Der Servicevertrag
          kommt zustande, sobald EuroIPL die Anfrage annimmt und einen Termin
          oder Kostenvoranschlag bestätigt.
        </p>
      </LegalSection>

      <LegalSection title="3. Leistungsumfang">
        <p>
          Der Leistungsumfang richtet sich nach dem gewählten Service
          (Wartung &amp; Inspektion, STK-Prüfung, Reparatur &amp; Diagnose,
          DGUV V3 / VDE-Prüfung, Laserschutzbeauftragter, Beratung &amp;
          Einweisung sowie Kauf- &amp; Verkaufsbegleitung). Ob eine STK oder eine Bestellung zum
          Laserschutzbeauftragten für Ihr Gerät bzw. Studio erforderlich ist,
          wird von EuroIPL anhand der konkreten Geräteklassifizierung und der
          geltenden Vorgaben geprüft und ist nicht automatisch Bestandteil
          jeder Registrierung.
        </p>
      </LegalSection>

      <LegalSection title="4. Kostenvoranschläge & Preise">
        <p>
          Bei Reparaturen erhalten Sie vor Beginn kostenpflichtiger Arbeiten
          einen Kostenvoranschlag. Die Beauftragung darüber hinausgehender
          Arbeiten erfolgt nur nach Ihrer Zustimmung.
        </p>
      </LegalSection>

      <LegalSection title="5. Mitwirkungspflichten">
        <p>
          Sie stellen sicher, dass die von Ihnen angegebenen Gerätedaten
          korrekt sind und dass unsere Techniker Zugang zum Gerät am
          vereinbarten Termin erhalten.
        </p>
      </LegalSection>

      <LegalSection title="6. Digitale Geräteakte">
        <p>
          Finalisierte Einträge Ihrer digitalen Geräteakte werden nicht
          nachträglich verändert. Korrekturen erfolgen ausschließlich als
          gekennzeichnete Ergänzung mit Verweis auf den ursprünglichen
          Eintrag.
        </p>
      </LegalSection>

      <LegalSection title="7. Haftung">
        <p>
          EuroIPL haftet nach den gesetzlichen Bestimmungen für Vorsatz und
          grobe Fahrlässigkeit. Für leichte Fahrlässigkeit haftet EuroIPL nur
          bei Verletzung wesentlicher Vertragspflichten und beschränkt auf den
          vorhersehbaren, vertragstypischen Schaden.
        </p>
      </LegalSection>

      <LegalSection title="8. Zugriff nach Vertragsende">
        <p>
          Nach Beendigung der Zusammenarbeit erhalten Sie einen Export Ihrer
          Geräteakte. Die Dauer des fortbestehenden Online-Zugriffs auf den
          Kundenbereich wird gesondert vereinbart.
        </p>
      </LegalSection>

      <LegalSection title="9. Schlussbestimmungen">
        <p>
          Es gilt deutsches Recht. Sollte eine Bestimmung dieser Bedingungen
          unwirksam sein, bleibt die Wirksamkeit der übrigen Bestimmungen
          unberührt.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
