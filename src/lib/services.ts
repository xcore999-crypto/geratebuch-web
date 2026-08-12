export type ServiceSlug =
  | "wartung-inspektion"
  | "stk-pruefung"
  | "reparatur-diagnose"
  | "dguv-vde"
  | "laserschutzbeauftragter"
  | "beratung-einweisung"
  | "geraetekauf-verkauf"
  | "nisv-geraeteanmeldung";

export type Service = {
  slug: ServiceSlug;
  name: string;
  shortName: string;
  tagline: string;
  summary: string;
  icon: "wrench" | "shield-check" | "tool" | "bolt" | "user-shield" | "chat" | "building";
  forWhen: string[];
  included: string[];
  process: { title: string; description: string }[];
  outcome: string;
  ctaLabel: string;
  ctaHref?: string;
  requiresDevice?: boolean;
  legalNote?: string;
  callOptions?: {
    title: string;
    description: string;
    points: string[];
  }[];
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
    tagline: "Sicherheitstechnische Kontrolle nach § 12 MPBetreibV",
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
  {
    slug: "nisv-geraeteanmeldung",
    name: "NiSV-Geräteanmeldung",
    shortName: "NiSV-Anmeldung",
    tagline: "Offizielle Meldestellen für alle 16 Bundesländer",
    summary:
      "Finden Sie nach Bundesland und Betriebsort die zuständige Behörde, das offizielle Formular oder den direkten Online-Dienst für Ihre NiSV-Anzeige.",
    icon: "building",
    forWhen: [
      "Sie möchten eine NiSV-pflichtige Anlage neu in Betrieb nehmen",
      "Sie suchen die zuständige Behörde für Ihren Studio- oder Betriebsort",
      "Sie benötigen das offizielle Anzeigeformular oder den Online-Dienst Ihres Bundeslands",
    ],
    included: [
      "Alle 16 Bundesländer alphabetisch sortiert",
      "Zuordnung nach Stadt, Landkreis, Bezirk oder Regierungsbezirk",
      "Direkte Links zu offiziellen Online-Diensten und Formularen",
      "Behördenname und Funktions-E-Mail, soweit offiziell veröffentlicht",
      "Hinweise zu Frist und typischen Unterlagen vor der Einreichung",
    ],
    process: [
      { title: "Bundesland wählen", description: "Öffnen Sie das Bundesland, in dem die Anlage betrieben wird." },
      { title: "Betriebsort zuordnen", description: "Wählen Sie Stadt, Landkreis, Bezirk oder den offiziellen Ortsfinder." },
      { title: "Anzeige einreichen", description: "Nutzen Sie den verlinkten Online-Dienst oder senden Sie Formular und Fachkundenachweise an die Behörde." },
    ],
    outcome: "Offizieller Einreichungsweg zur zuständigen NiSV-Vollzugsbehörde",
    ctaLabel: "Behörde & Formular finden",
    ctaHref: "/nisv-geraeteanmeldung",
    requiresDevice: false,
    legalNote:
      "Die Übersicht verlinkt ausschließlich auf öffentliche Stellen und ersetzt keine Rechtsberatung. Prüfen Sie vor dem Versand die aktuellen Hinweise Ihrer Behörde und ob Ihre konkrete Anlage unter die NiSV fällt.",
  },
  {
    slug: "geraetekauf-verkauf",
    name: "Kauf- & Verkaufsbegleitung",
    shortName: "Kauf & Verkauf",
    tagline: "Sicher entscheiden, fair verhandeln, sauber übergeben",
    summary:
      "Unabhängige Begleitung beim Kauf oder Verkauf neuer und gebrauchter Kosmetik- und Lasergeräte — vom ersten Check bis zur Übergabe.",
    icon: "chat",
    forWhen: [
      "Sie möchten ein Kosmetik- oder Lasergerät kaufen und Fehlentscheidungen vermeiden",
      "Sie planen den Verkauf eines Geräts und möchten Preis, Unterlagen und Übergabe professionell vorbereiten",
      "Sie benötigen vor einer Entscheidung eine unabhängige technische und praktische Einschätzung",
    ],
    included: [
      "Persönlicher Buying Call oder Selling Call per Telefon oder Video",
      "Individuelle Vorbereitung anhand Ihres Geräts, Angebots und Ihrer Ziele",
      "Klare Checkliste mit offenen Punkten, Risiken und nächsten Schritten",
      "Herstellerunabhängige Einschätzung ohne Verkaufsprovision",
      "Optional: Abstimmung einer technischen Vor-Ort-Prüfung vor Kauf oder Übergabe",
    ],
    process: [
      {
        title: "Anliegen & Unterlagen senden",
        description: "Sie schildern Ihr Vorhaben und senden vorhandene Angebote, Gerätedaten, Fotos oder Dokumente.",
      },
      {
        title: "Buying oder Selling Call",
        description: "Wir gehen Ihre Fragen strukturiert durch, prüfen offene Punkte und priorisieren mögliche Risiken.",
      },
      {
        title: "Nächste Schritte",
        description: "Sie erhalten eine klare Zusammenfassung mit Handlungsempfehlungen und einer passenden Checkliste.",
      },
    ],
    outcome: "Dokumentierte Handlungsempfehlung mit Checkliste und nächsten Schritten",
    ctaLabel: "Buying oder Selling Call anfragen",
    requiresDevice: false,
    callOptions: [
      {
        title: "Buying Call",
        description: "Ihre unabhängige Vorbereitung vor dem Kauf eines Kosmetik- oder Lasergeräts.",
        points: [
          "Behandlungsziele, Zielgruppe und tatsächlichen Gerätebedarf klären",
          "Passende Technologie für das geplante Anwendungsspektrum einordnen",
          "Neukauf, Gebrauchtkauf, Leasing und Finanzierung gegenüberstellen",
          "Geeignete Hersteller und Modelle für eine Shortlist vergleichen",
          "Serviceverfügbarkeit und Herstellerunterstützung einschätzen",
          "Anbieter, Eigentumsnachweis und Plausibilität des Angebots prüfen",
          "CE-Unterlagen, Rechnung, Handbuch und Konformitätsdokumente sichten",
          "Modell, Seriennummer und Typenschild eindeutig abgleichen",
          "Betriebsstunden, Impulszahlen, Wartungen und Reparaturhistorie bewerten",
          "Fotos, Videos, Fehlermeldungen und sichtbaren Zustand vorab prüfen",
          "Anstehende Wartungen, Prüfungen und mögliche Folgekosten erkennen",
          "Ersatzteil-, Handstück-, Lampen- und Verbrauchsmaterialkosten einordnen",
          "Gesamtkosten inklusive Transport, Installation und Einweisung kalkulieren",
          "Marktpreis, Verhandlungsspielraum und sinnvolle Preisgrenze bestimmen",
          "Kauf, technische Prüfung, Vertrag und Übergabe mit einer Checkliste vorbereiten",
        ],
      },
      {
        title: "Selling Call",
        description: "Strukturierte Vorbereitung für einen transparenten und sicheren Geräteverkauf.",
        points: [
          "Verkaufsziel, Zeitrahmen und gewünschte Käufergruppe festlegen",
          "Gerät, Ausstattung und mitverkauftes Zubehör vollständig erfassen",
          "Realistischen Marktwert und eine belastbare Preisstrategie bestimmen",
          "Rechnung, CE-Unterlagen, Handbuch und weitere Nachweise zusammenstellen",
          "Seriennummer, Typenschild und technische Kerndaten sauber dokumentieren",
          "Aussagekräftige Fotos und ein sinnvolles Funktionsvideo vorbereiten",
          "Verkaufstext mit klaren technischen Angaben und Vorteilen strukturieren",
          "Bekannte Mängel, Fehlermeldungen und Nutzungsspuren transparent beschreiben",
          "Wartungs-, Reparatur- und Prüfverlauf verkaufsfähig aufbereiten",
          "Sinnvolle Wartung oder technische Prüfung vor dem Verkauf abwägen",
          "Passende Verkaufswege und Plattformen für die Zielgruppe auswählen",
          "Kaufanfragen qualifizieren und technische Rückfragen sicher beantworten",
          "Verhandlungslinie, Mindestpreis und Umgang mit Einwänden festlegen",
          "Zahlung, Demontage, Transport, Versicherung und Termin koordinieren",
          "Vertrag, Übergabeprotokoll, Unterlagen und Abschluss sauber vorbereiten",
        ],
      },
    ],
    legalNote:
      "Die Kauf- und Verkaufsbegleitung ist eine technische und praktische Einschätzung auf Basis der bereitgestellten Informationen. Sie ersetzt keine Rechts-, Steuer- oder Finanzierungsberatung und keine gesondert vereinbarte technische Vor-Ort-Prüfung.",
  },
];

export const deviceServices = services.filter((service) => service.requiresDevice !== false);

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}
