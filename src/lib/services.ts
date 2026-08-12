export type ServiceSlug =
  | "wartung-inspektion"
  | "stk-pruefung"
  | "reparatur-diagnose"
  | "dguv-vde"
  | "laserschutzbeauftragter"
  | "beratung-einweisung";

export type Service = {
  slug: ServiceSlug;
  name: string;
  shortName: string;
  tagline: string;
  summary: string;
  icon: "wrench" | "shield-check" | "tool" | "bolt" | "user-shield" | "chat";
  forWhen: string[];
  included: string[];
  process: { title: string; description: string }[];
  outcome: string;
  ctaLabel: string;
  legalNote?: string;
};

/**
 * Single services catalog — reused by the public marketing pages (as
 * showcase content) and inside the portal (as the orderable action list
 * for a specific device), per the "ein Katalog, zwei Kontexte" concept.
 */
export const services: Service[] = [
  {
    slug: "wartung-inspektion",
    name: "Wartung & Inspektion",
    shortName: "Wartung",
    tagline: "Regelmäßige Pflege für gleichbleibende Leistung",
    summary:
      "Herstellerunabhängige Wartung nach Serviceplan, damit Ihr Gerät zuverlässig läuft und seinen Wert behält.",
    icon: "wrench",
    forWhen: [
      "Ihr letzter Wartungstermin liegt mehr als 12 Monate zurück",
      "Der Hersteller schreibt eine regelmäßige Wartung vor",
      "Sie möchten Ausfallzeiten und teure Folgereparaturen vermeiden",
    ],
    included: [
      "Sichtprüfung von Gehäuse, Kühlung, Handstücken und Kabeln",
      "Funktions- und Leistungsmessung nach Herstellervorgabe",
      "Reinigung optischer und mechanischer Komponenten",
      "Softwarestand und Kalibrierung prüfen",
      "Wartungsprotokoll für Ihre digitale Geräteakte",
    ],
    process: [
      { title: "Termin vereinbaren", description: "Sie wählen das Gerät und einen passenden Zeitraum im Kundenbereich." },
      { title: "Vor-Ort-Wartung", description: "Ein Techniker führt die Wartung nach Serviceplan direkt in Ihrem Studio durch." },
      { title: "Protokoll & nächster Termin", description: "Sie erhalten das Wartungsprotokoll sofort digital, inkl. empfohlenem nächsten Termin." },
    ],
    outcome: "Wartungsprotokoll in Ihrer digitalen Geräteakte",
    ctaLabel: "Wartung anfragen",
  },
  {
    slug: "stk-pruefung",
    name: "STK-Prüfung",
    shortName: "STK",
    tagline: "Sicherheitstechnische Kontrolle nach § 11 MPBetreibV",
    summary:
      "Wir prüfen, ob und in welchem Umfang eine STK für Ihr Gerät erforderlich ist, und führen sie bei Bedarf durch.",
    icon: "shield-check",
    forWhen: [
      "Ihr Gerät fällt unter die sicherheitstechnische Kontrolle nach Herstellervorgabe",
      "Die vom Hersteller festgelegte Prüffrist läuft in Kürze ab",
      "Sie möchten die gesetzeskonforme Dokumentation lückenlos nachweisen",
    ],
    included: [
      "Prüfung der Anwendbarkeit anhand Geräteklasse und Herstellervorgabe",
      "Sicherheitstechnische Kontrolle durch qualifiziertes Personal",
      "Messung sicherheitsrelevanter Parameter",
      "Prüfplakette und Prüfprotokoll",
      "Hinweis auf die nächste fällige Prüfung",
    ],
    process: [
      { title: "Anwendbarkeit klären", description: "Wir prüfen anhand Modell und Unterlagen, ob eine STK für Ihr Gerät vorgeschrieben ist." },
      { title: "Prüfung durchführen", description: "Ein qualifizierter Prüfer führt die STK vor Ort durch und dokumentiert die Messwerte." },
      { title: "Prüfprotokoll erhalten", description: "Protokoll und Plakette landen automatisch in der Geräteakte, inkl. nächstem Prüftermin." },
    ],
    outcome: "Prüfprotokoll in Ihrer digitalen Geräteakte",
    ctaLabel: "STK-Anwendbarkeit prüfen",
    legalNote:
      "geratebuch.de weist eine STK nicht automatisch jedem Gerät zu. Ob und in welchem Umfang eine sicherheitstechnische Kontrolle erforderlich ist, bestätigt EuroIPL anhand der konkreten Geräteklassifizierung und der Herstellerunterlagen.",
  },
  {
    slug: "reparatur-diagnose",
    name: "Reparatur & Diagnose",
    shortName: "Reparatur",
    tagline: "Schnelle Fehlersuche, transparente Kostenvoranschläge",
    summary:
      "Von der Ferndiagnose bis zum Werkstatteinsatz: Wir finden die Ursache und reparieren mit Original- oder gleichwertigen Ersatzteilen.",
    icon: "tool",
    forWhen: [
      "Ihr Gerät zeigt eine Fehlermeldung oder fällt aus",
      "Die Leistung hat spürbar nachgelassen",
      "Ein Vorbericht mit Kostenschätzung wird für die Buchhaltung benötigt",
    ],
    included: [
      "Remote-Ferndiagnose oder Vor-Ort-Termin, je nach Störung",
      "Kostenvoranschlag vor Beginn kostenpflichtiger Arbeiten",
      "Reparatur mit passenden Ersatzteilen",
      "Funktionsprüfung nach der Reparatur",
      "Reparaturbericht mit Befund, Maßnahme und Ergebnis",
    ],
    process: [
      { title: "Störung melden", description: "Sie beschreiben das Problem und laden optional Fotos oder einen Fehlercode hoch." },
      { title: "Diagnose & Angebot", description: "Wir klären die Ursache remote oder vor Ort und stimmen den Kostenrahmen mit Ihnen ab." },
      { title: "Reparatur & Bericht", description: "Nach der Reparatur erhalten Sie den Reparaturbericht direkt im Kundenbereich." },
    ],
    outcome: "Reparaturbericht in Ihrer digitalen Geräteakte",
    ctaLabel: "Störung melden",
  },
  {
    slug: "dguv-vde",
    name: "DGUV V3 / VDE-Prüfung",
    shortName: "DGUV V3",
    tagline: "Elektrische Sicherheitsprüfung ortsfester und mobiler Geräte",
    summary:
      "Prüfung ortsveränderlicher und ortsfester elektrischer Geräte nach DGUV Vorschrift 3 bzw. VDE 0701-0702.",
    icon: "bolt",
    forWhen: [
      "Ihre Betriebshaftpflicht oder Berufsgenossenschaft verlangt den Nachweis",
      "Die letzte Prüfplakette ist abgelaufen oder nicht mehr auffindbar",
      "Sie richten ein neues Studio ein und benötigen die Erstprüfung",
    ],
    included: [
      "Sicht-, Funktions- und Messprüfung nach DGUV V3 / VDE 0701-0702",
      "Prüfplakette mit nächstem Prüftermin",
      "Prüfprotokoll je Gerät",
      "Auflistung aller geprüften Geräte für Ihre Unterlagen",
    ],
    process: [
      { title: "Geräte erfassen", description: "Sie wählen die zu prüfenden Geräte in Ihrem Kundenbereich aus." },
      { title: "Prüftermin vor Ort", description: "Ein Prüfer misst und dokumentiert jedes Gerät nach Norm." },
      { title: "Protokolle & Plaketten", description: "Sie erhalten je Gerät ein Prüfprotokoll und die Prüfplakette wird angebracht." },
    ],
    outcome: "Prüfprotokoll je Gerät in Ihrer digitalen Geräteakte",
    ctaLabel: "DGUV V3 anfragen",
  },
  {
    slug: "laserschutzbeauftragter",
    name: "Laserschutzbeauftragter",
    shortName: "Laserschutz",
    tagline: "Bestellung und Begleitung nach OStrV",
    summary:
      "Beratung und Vor-Ort-Begleitung rund um die Bestellung eines Laserschutzbeauftragten für Ihr Studio.",
    icon: "user-shield",
    forWhen: [
      "Sie betreiben Laser- oder IPL-Geräte der Klasse 3B/4 und benötigen einen Laserschutzbeauftragten",
      "Ihr bisheriger Laserschutzbeauftragter hat das Studio verlassen",
      "Sie möchten Ihre Unterlagen zur Betriebsorganisation aktualisieren lassen",
    ],
    included: [
      "Beratungsgespräch zu Ihrer aktuellen Betriebssituation",
      "Einordnung nach OStrV und den geltenden Anforderungen an die Qualifikation",
      "Vor-Ort- oder Remote-Termin, je nach Anliegen",
      "Dokumentation des Beratungsergebnisses für Ihre Unterlagen",
    ],
    process: [
      { title: "Anliegen schildern", description: "Sie beschreiben Ihre Geräte und Ihre aktuelle Situation zum Laserschutz." },
      { title: "Umfang klären", description: "Wir gleichen ab, welche Unterstützung im Rahmen unserer Qualifikation möglich ist." },
      { title: "Beratung & Ergebnis", description: "Sie erhalten eine Zusammenfassung des Beratungsergebnisses für Ihre Unterlagen." },
    ],
    outcome: "Beratungsdokumentation in Ihrer digitalen Geräteakte",
    ctaLabel: "Beratung anfragen",
    legalNote:
      "Diese Leistung ersetzt keine individuelle Rechtsberatung und ist keine automatische Bestätigung der NiSV-Konformität Ihres Studios. Umfang und Inhalt richten sich nach der OStrV und dem tatsächlichen Qualifikationsumfang von EuroIPL.",
  },
  {
    slug: "beratung-einweisung",
    name: "Beratung & Einweisung",
    shortName: "Beratung",
    tagline: "Persönliche Unterstützung rund um Ihr Gerät",
    summary:
      "Ob neue Mitarbeitende, ein neu registriertes Gerät oder offene Fragen zur Anwendung — wir beraten Sie herstellerunabhängig.",
    icon: "chat",
    forWhen: [
      "Neue Mitarbeitende sollen sicher am Gerät eingewiesen werden",
      "Sie haben ein gebraucht erworbenes Gerät registriert und benötigen Unterstützung",
      "Sie sind unsicher, welcher Service für Ihr Anliegen der richtige ist",
    ],
    included: [
      "Persönliches Gespräch, telefonisch oder vor Ort",
      "Praktische Einweisung am Gerät durch geschultes Personal",
      "Individuelle Empfehlung für weitere Services",
    ],
    process: [
      { title: "Anliegen beschreiben", description: "Sie schildern kurz, wozu Sie Beratung oder eine Einweisung benötigen." },
      { title: "Termin vereinbaren", description: "Wir schlagen einen passenden Termin vor — remote oder vor Ort." },
      { title: "Durchführung", description: "Sie erhalten die Einweisung bzw. Beratung und eine kurze Zusammenfassung." },
    ],
    outcome: "Kurzzusammenfassung in Ihrer digitalen Geräteakte",
    ctaLabel: "Beratung anfragen",
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}
