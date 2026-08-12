import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Faq } from "@/components/site/Faq";
import { CtaBanner } from "@/components/site/CtaBanner";
import { PageHero } from "@/components/site/PageHero";

export const metadata: Metadata = {
  title: "Wissen & FAQ",
  description:
    "Antworten rund um STK-Prüfung, DGUV V3, Laserschutz und die digitale Geräteakte von geratebuch.de.",
};

const faqItems = [
  {
    question: "Was ist der Unterschied zwischen geratebuch.de und EuroIPL?",
    answer:
      "geratebuch.de ist die digitale Serviceplattform, über die Sie Geräte registrieren, Services anfragen und Ihre Geräteakte einsehen. EuroIPL ist das Unternehmen, das die technischen Leistungen tatsächlich erbringt und den Service betreibt. Kurz: geratebuch.de — ein Service von EuroIPL.",
  },
  {
    question: "Was ist eine STK-Prüfung und wann brauche ich sie?",
    answer:
      "Die sicherheitstechnische Kontrolle (STK) nach § 12 MPBetreibV ist für bestimmte Medizinprodukte vorgeschrieben. Ob Ihr Gerät betroffen ist, hängt von der Geräteklasse und den Herstellervorgaben ab. Wir prüfen die Anwendbarkeit für Ihr konkretes Gerät, bevor eine STK durchgeführt wird.",
  },
  {
    question: "Ist mein Studio automatisch „NiSV-konform“, wenn ich geratebuch.de nutze?",
    answer:
      "Nein. geratebuch.de dokumentiert Wartung, Reparatur und Prüfungen Ihrer Geräte, ersetzt aber keine individuelle Rechtsberatung und stellt keine automatische Bestätigung der NiSV-Konformität Ihres Studios aus. Für eine rechtssichere Einordnung Ihrer Betriebsorganisation empfehlen wir eine individuelle Beratung.",
  },
  {
    question: "Wie oft muss eine DGUV V3 Prüfung durchgeführt werden?",
    answer:
      "Die Prüffristen für ortsveränderliche und ortsfeste elektrische Geräte richten sich nach DGUV Vorschrift 3 bzw. VDE 0701-0702 und den betrieblichen Gegebenheiten. Nach jeder Prüfung erhalten Sie eine Plakette mit dem nächsten Prüftermin sowie einen Reminder rechtzeitig vor Fälligkeit.",
  },
  {
    question: "Muss ich ein Kundenkonto haben, um eine Anfrage zu stellen?",
    answer:
      "Nein. Die erste Serviceanfrage können Sie ohne Konto über unser Kontaktformular stellen. Ihren Kundenbereich richten wir ein, sobald die erste Anfrage angenommen wurde oder ein Gerät bei Ihnen registriert ist.",
  },
  {
    question: "Was passiert, wenn eine Reparatur nicht vor Ort möglich ist?",
    answer:
      "Nach der Ferndiagnose oder dem Vor-Ort-Termin erhalten Sie einen transparenten Kostenvoranschlag. Ist eine Reparatur nicht direkt vor Ort möglich, stimmen wir mit Ihnen einen Werkstatttermin oder eine alternative Lösung ab.",
  },
  {
    question: "Wie schnell erhalte ich eine Rückmeldung auf meine Anfrage?",
    answer:
      "In der Regel melden wir uns innerhalb von 1–2 Werktagen mit einer Einschätzung, einer Rückfrage oder einem Terminvorschlag. Den aktuellen Status jeder Anfrage sehen Sie jederzeit in Ihrem Kundenbereich.",
  },
  {
    question: "Wie sicher sind meine Daten bei geratebuch.de?",
    answer:
      "Ihre Daten werden DSGVO-konform gespeichert und sind organisationsweit getrennt — Sie sehen ausschließlich Ihre eigenen Geräte und Dokumente. Details finden Sie in unserer Datenschutzerklärung.",
  },
];

export default function WissenPage() {
  return (
    <>
      <PageHero
        eyebrow="Wissen"
        title="Häufig gestellte Fragen"
        description="Antworten rund um Services, digitale Geräteakte und die rechtlichen Grundlagen unserer Leistungen."
        image="/images/page-wissen.png"
        imageAlt="Visualisierung von technischem Wissen, Prüfungen und Gerätesicherheit"
      />
      <section className="py-16">
        <Container className="max-w-3xl">
          <Faq items={faqItems} />
        </Container>
      </section>
      <CtaBanner
        title="Ihre Frage war nicht dabei?"
        description="Schreiben Sie uns — wir melden uns persönlich zurück."
        primaryLabel="Kontakt aufnehmen"
        primaryHref="/kontakt"
        secondaryLabel="Service anfragen"
        secondaryHref="/kontakt#service-anfragen"
      />
    </>
  );
}
