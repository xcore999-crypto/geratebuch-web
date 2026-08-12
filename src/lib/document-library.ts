export type DocumentCategory = "Kundenunterlagen" | "NiSV & Geräte" | "Betrieb & Hygiene";

export type LibraryDocument = {
  slug: string;
  title: string;
  description: string;
  category: DocumentCategory;
  pages: string;
  pdfHref: string;
  docxHref: string;
};

const downloadBase = "/downloads/dokumente";

export const libraryDocuments: LibraryDocument[] = [
  {
    slug: "anamnesebogen-kosmetik",
    title: "Anamnesebogen Kosmetik",
    description: "Gesundheitsangaben, Kontraindikationen, Medikamente, Hautzustand und Behandlungsziel strukturiert erfassen.",
    category: "Kundenunterlagen",
    pages: "2 Seiten",
    pdfHref: `${downloadBase}/anamnesebogen-kosmetik.pdf`,
    docxHref: `${downloadBase}/anamnesebogen-kosmetik.docx`,
  },
  {
    slug: "kundenkarte-behandlungshistorie",
    title: "Kundenkarte & Behandlungshistorie",
    description: "Kontaktdaten, Hautprofil, Termine, Behandlungen, Produkte und Reaktionen übersichtlich dokumentieren.",
    category: "Kundenunterlagen",
    pages: "2 Seiten",
    pdfHref: `${downloadBase}/kundenkarte-behandlungshistorie.pdf`,
    docxHref: `${downloadBase}/kundenkarte-behandlungshistorie.docx`,
  },
  {
    slug: "fotodokumentation-einwilligung",
    title: "Einwilligung Fotodokumentation",
    description: "Aufnahme, interne Behandlungsdokumentation und eine optionale Veröffentlichung getrennt freigeben lassen.",
    category: "Kundenunterlagen",
    pages: "1 Seite",
    pdfHref: `${downloadBase}/fotodokumentation-einwilligung.pdf`,
    docxHref: `${downloadBase}/fotodokumentation-einwilligung.docx`,
  },
  {
    slug: "datenschutzhinweise-kundenakte",
    title: "Datenschutzhinweise Kundenakte",
    description: "Ausfüllbares Muster für Verantwortliche, Zwecke, Rechtsgrundlagen, Speicherdauer und Betroffenenrechte.",
    category: "Kundenunterlagen",
    pages: "2 Seiten",
    pdfHref: `${downloadBase}/datenschutzhinweise-kundenakte.pdf`,
    docxHref: `${downloadBase}/datenschutzhinweise-kundenakte.docx`,
  },
  {
    slug: "nisv-beratung-einwilligung",
    title: "NiSV Beratung & Einwilligung",
    description: "Beratungs- und Aufklärungsprotokoll mit Risiken, Alternativen, Nachsorge und Einverständniserklärung.",
    category: "NiSV & Geräte",
    pages: "3 Seiten",
    pdfHref: `${downloadBase}/nisv-beratung-einwilligung.pdf`,
    docxHref: `${downloadBase}/nisv-beratung-einwilligung.docx`,
  },
  {
    slug: "geraetebuch-nisv",
    title: "Gerätebuch / NiSV-Anlagendokumentation",
    description: "Stammdaten, Installation, Einweisung, Fachkunde, Wartung, Kontrollen, Störungen und Außerbetriebnahme.",
    category: "NiSV & Geräte",
    pages: "4 Seiten",
    pdfHref: `${downloadBase}/geraetebuch-nisv.pdf`,
    docxHref: `${downloadBase}/geraetebuch-nisv.docx`,
  },
  {
    slug: "behandlungsprotokoll-laser-ipl",
    title: "Behandlungsprotokoll Laser & IPL",
    description: "Behandlungszone, Hauttyp, Parameter, Schutzmaßnahmen, Endpunkt, Reaktion und Nachsorge festhalten.",
    category: "NiSV & Geräte",
    pages: "2 Seiten",
    pdfHref: `${downloadBase}/behandlungsprotokoll-laser-ipl.pdf`,
    docxHref: `${downloadBase}/behandlungsprotokoll-laser-ipl.docx`,
  },
  {
    slug: "behandlungsprotokoll-rf-ultraschall",
    title: "Behandlungsprotokoll RF & Ultraschall",
    description: "Gerät, Applikator, Energie, Dauer, Temperatur, Kontaktmedium, Hautreaktion und Verlauf dokumentieren.",
    category: "NiSV & Geräte",
    pages: "2 Seiten",
    pdfHref: `${downloadBase}/behandlungsprotokoll-rf-ultraschall.pdf`,
    docxHref: `${downloadBase}/behandlungsprotokoll-rf-ultraschall.docx`,
  },
  {
    slug: "hygiene-reinigungsplan",
    title: "Hygiene- & Reinigungsplan",
    description: "Bereiche, Mittel, Konzentration, Einwirkzeit, Häufigkeit, Zuständigkeit und Durchführung nachweisbar planen.",
    category: "Betrieb & Hygiene",
    pages: "2 Seiten",
    pdfHref: `${downloadBase}/hygiene-reinigungsplan.pdf`,
    docxHref: `${downloadBase}/hygiene-reinigungsplan.docx`,
  },
  {
    slug: "wartung-pruefung-stoerung",
    title: "Wartungs-, Prüf- & Störungsprotokoll",
    description: "Wartungen, Sicherheitsprüfungen, Mängel, Ausfallzeiten, Maßnahmen und Freigaben in einem Formular erfassen.",
    category: "Betrieb & Hygiene",
    pages: "2 Seiten",
    pdfHref: `${downloadBase}/wartung-pruefung-stoerung.pdf`,
    docxHref: `${downloadBase}/wartung-pruefung-stoerung.docx`,
  },
  {
    slug: "stk-pruefprotokoll-medizinprodukte",
    title: "STK-Prüfprotokoll nach MPBetreibV",
    description: "Prüfgrundlage, Sicht- und Funktionsprüfung, Messwerte, Prüfmittel, Mängel, Ergebnis und nächste Fälligkeit dokumentieren.",
    category: "NiSV & Geräte",
    pages: "3 Seiten",
    pdfHref: `${downloadBase}/stk-pruefprotokoll-medizinprodukte.pdf`,
    docxHref: `${downloadBase}/stk-pruefprotokoll-medizinprodukte.docx`,
  },
];

export const documentCategories: DocumentCategory[] = [
  "Kundenunterlagen",
  "NiSV & Geräte",
  "Betrieb & Hygiene",
];
