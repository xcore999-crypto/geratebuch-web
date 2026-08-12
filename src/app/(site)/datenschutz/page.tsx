import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/site/LegalPage";

export const metadata: Metadata = { title: "Datenschutzerklärung" };

export default function DatenschutzPage() {
  return (
    <LegalPage title="Datenschutzerklärung" updated="12. August 2026">
      <LegalSection title="1. Verantwortlicher">
        <p>
          Verantwortlich für die Datenverarbeitung auf geratebuch.de ist die
          EuroIPL Servicetechnik GmbH, Industriestraße 14, 40227 Düsseldorf
          (Platzhalterangaben, siehe Impressum).
        </p>
      </LegalSection>

      <LegalSection title="2. Welche Daten wir verarbeiten">
        <ul className="list-disc space-y-2 pl-5">
          <li>
            Kontaktdaten aus dem Serviceformular: Firma, Ansprechperson,
            E-Mail, Telefon.
          </li>
          <li>
            Gerätedaten: Hersteller, Modell, Seriennummer, Standort und Fotos,
            die Sie im Rahmen einer Registrierung oder Anfrage angeben.
          </li>
          <li>
            Service- und Dokumentationsdaten: Anfragen, Serviceberichte,
            Prüfprotokolle und die Historie Ihrer Geräte.
          </li>
          <li>Zugangsdaten für den Kundenbereich, sofern ein Konto besteht.</li>
        </ul>
      </LegalSection>

      <LegalSection title="3. Zwecke und Rechtsgrundlagen">
        <p>
          Wir verarbeiten Ihre Daten zur Bearbeitung Ihrer Serviceanfragen und
          zur Erfüllung des Servicevertrags (Art. 6 Abs. 1 lit. b DSGVO),
          sowie zur Erfüllung gesetzlicher Dokumentationspflichten, etwa im
          Rahmen sicherheitstechnischer Kontrollen (Art. 6 Abs. 1 lit. c
          DSGVO).
        </p>
      </LegalSection>

      <LegalSection title="4. Speicherdauer">
        <p>
          Wir speichern Ihre Daten so lange, wie es für die Erbringung des
          Service sowie zur Erfüllung gesetzlicher Dokumentations- und
          Aufbewahrungspflichten erforderlich ist. Nach Beendigung der
          Zusammenarbeit erhalten Sie einen Export Ihrer Geräteakte; die
          Zugriffsfrist auf den Online-Kundenbereich wird vertraglich
          geregelt.
        </p>
      </LegalSection>

      <LegalSection title="5. Weitergabe an Dritte">
        <p>
          Ihre Daten werden nicht an Dritte verkauft. Eine Weitergabe erfolgt
          nur, soweit dies zur Leistungserbringung notwendig ist (z. B. an
          eingesetzte Techniker) oder eine gesetzliche Verpflichtung besteht.
        </p>
      </LegalSection>

      <LegalSection title="6. Ihre Rechte">
        <p>
          Sie haben das Recht auf Auskunft, Berichtigung, Löschung,
          Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch
          gegen die Verarbeitung Ihrer Daten. Wenden Sie sich hierzu an die im
          Impressum genannten Kontaktdaten.
        </p>
      </LegalSection>

      <LegalSection title="7. Cookies">
        <p>
          geratebuch.de verwendet nur technisch notwendige Cookies, die für
          den Betrieb der Website und des Kundenbereichs erforderlich sind.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
