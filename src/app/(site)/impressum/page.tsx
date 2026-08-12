import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/site/LegalPage";

export const metadata: Metadata = { title: "Impressum" };

export default function ImpressumPage() {
  return (
    <LegalPage title="Impressum" updated="12. August 2026">
      <LegalSection title="Angaben gemäß § 5 TMG">
        <p>
          EuroIPL Servicetechnik GmbH (Platzhalter)
          <br />
          Industriestraße 14
          <br />
          40227 Düsseldorf
          <br />
          Deutschland
        </p>
      </LegalSection>

      <LegalSection title="Vertreten durch">
        <p>Geschäftsführung: Vorname Nachname (Platzhalter)</p>
      </LegalSection>

      <LegalSection title="Kontakt">
        <p>
          Telefon: 0800 55 90 210
          <br />
          E-Mail: service@geratebuch.de
        </p>
      </LegalSection>

      <LegalSection title="Registereintrag">
        <p>
          Eintragung im Handelsregister (Platzhalter).
          <br />
          Registergericht: Amtsgericht Düsseldorf
          <br />
          Registernummer: HRB XXXXXX
        </p>
      </LegalSection>

      <LegalSection title="Umsatzsteuer-ID">
        <p>
          Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:
          DE XXXXXXXXX (Platzhalter)
        </p>
      </LegalSection>

      <LegalSection title="Redaktionell verantwortlich">
        <p>Vorname Nachname, Anschrift wie oben (Platzhalter).</p>
      </LegalSection>

      <LegalSection title="Plattform & Betreiber">
        <p>
          geratebuch.de ist die digitale Serviceplattform, über die Kundinnen
          und Kunden Geräte registrieren, Services anfragen und ihre digitale
          Geräteakte einsehen. Betreiber der Plattform und Erbringer der
          technischen Leistungen ist die EuroIPL Servicetechnik GmbH.
        </p>
      </LegalSection>

      <LegalSection title="EU-Streitschlichtung">
        <p>
          Die Europäische Kommission stellt eine Plattform zur
          Online-Streitbeilegung (OS) bereit. Unsere E-Mail-Adresse finden Sie
          oben im Impressum. Wir sind nicht verpflichtet und nicht bereit, an
          Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
          teilzunehmen.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
