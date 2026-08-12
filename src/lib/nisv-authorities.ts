export type NisvLink = {
  label: string;
  href: string;
  kind: "online" | "form" | "official" | "email";
};

export type NisvAuthority = {
  area: string;
  places: string;
  authority: string;
  email?: string;
};

export type NisvState = {
  slug: string;
  name: string;
  note: string;
  authorities: NisvAuthority[];
  registration: NisvLink;
  links: NisvLink[];
};

export const federalNisvOverview =
  "https://www.bundesumweltministerium.de/themen/strahlenschutz/nichtionisierende-strahlung/kosmetische-anwendung-nichtionisierender-strahlung/zustaendigkeit-der-bundeslaender-nisv";

export const nisvStates: NisvState[] = [
  {
    slug: "baden-wuerttemberg",
    name: "Baden-Württemberg",
    note: "Die Zuständigkeit richtet sich nach dem Betriebsort: Stadtverwaltung im Stadtkreis, Landratsamt im Landkreis.",
    authorities: [
      { area: "Stadtkreise", places: "z. B. Stuttgart, Mannheim, Karlsruhe, Freiburg, Heidelberg, Ulm", authority: "Jeweilige Stadtverwaltung" },
      { area: "Landkreise", places: "Alle Städte und Gemeinden eines Landkreises", authority: "Jeweiliges Landratsamt" },
    ],
    registration: { label: "Gerät online anmelden", href: "https://www.service-bw.de/zufi/leistungen/6010993", kind: "online" },
    links: [
      { label: "Online-Anzeige mit Ortsauswahl", href: "https://www.service-bw.de/zufi/leistungen/6010993", kind: "online" },
      { label: "Formular & Behördenliste", href: "https://gewerbeaufsicht.baden-wuerttemberg.de/de/nisv-formulare", kind: "form" },
    ],
  },
  {
    slug: "bayern",
    name: "Bayern",
    note: "Zuständig ist das Gewerbeaufsichtsamt bei der Regierung des jeweiligen Regierungsbezirks.",
    authorities: [
      { area: "Oberbayern", places: "München, Ingolstadt, Rosenheim und umliegende Landkreise", authority: "Regierung von Oberbayern – Gewerbeaufsichtsamt", email: "vzgaa@reg-ob.bayern.de" },
      { area: "Niederbayern", places: "Landshut, Passau, Straubing und umliegende Landkreise", authority: "Regierung von Niederbayern – Gewerbeaufsichtsamt", email: "poststelle@reg-nb.bayern.de" },
      { area: "Oberpfalz", places: "Regensburg, Amberg, Weiden und umliegende Landkreise", authority: "Regierung der Oberpfalz – Gewerbeaufsichtsamt", email: "gewerbeaufsichtsamt@reg-opf.bayern.de" },
      { area: "Oberfranken", places: "Bamberg, Bayreuth, Coburg, Hof und umliegende Landkreise", authority: "Regierung von Oberfranken – Gewerbeaufsichtsamt", email: "poststelle@reg-ofr.bayern.de" },
      { area: "Mittelfranken", places: "Nürnberg, Fürth, Erlangen, Ansbach und umliegende Landkreise", authority: "Regierung von Mittelfranken – Gewerbeaufsichtsamt", email: "gewerbeaufsichtsamt@reg-mfr.bayern.de" },
      { area: "Unterfranken", places: "Würzburg, Aschaffenburg, Schweinfurt und umliegende Landkreise", authority: "Regierung von Unterfranken – Gewerbeaufsichtsamt", email: "gaa@reg-ufr.bayern.de" },
      { area: "Schwaben", places: "Augsburg, Kempten, Memmingen und umliegende Landkreise", authority: "Regierung von Schwaben – Gewerbeaufsichtsamt", email: "gaa@reg-schw.bayern.de" },
    ],
    registration: { label: "Anmeldung nach Ort öffnen", href: "https://verwaltung.bund.de/leistungsverzeichnis/de/leistung/99003056261000/herausgeber/BY-74818/region/090000000000", kind: "online" },
    links: [
      { label: "Online-Verfahren mit Ortsauswahl", href: "https://verwaltung.bund.de/leistungsverzeichnis/de/leistung/99003056261000/herausgeber/BY-74818/region/090000000000", kind: "online" },
      { label: "Offizielle Zuständigkeitsübersicht", href: federalNisvOverview, kind: "official" },
    ],
  },
  {
    slug: "berlin",
    name: "Berlin",
    note: "Für alle Bezirke zentral zuständig.",
    authorities: [{ area: "Landesweit", places: "Alle Berliner Bezirke", authority: "LAGetSi Berlin", email: "nisv@lagetsi.berlin.de" }],
    registration: { label: "Gerät anmelden", href: "https://service.berlin.de/dienstleistung/330109/standort/350144/", kind: "online" },
    links: [
      { label: "Online-Dienst / Leistungsseite", href: "https://service.berlin.de/dienstleistung/330109/standort/350144/", kind: "online" },
      { label: "Formulare Strahlenschutz", href: "https://www.berlin.de/lagetsi/service/eamt/formulare/strahlenschutz-formulare-1383214.php", kind: "form" },
    ],
  },
  {
    slug: "brandenburg",
    name: "Brandenburg",
    note: "Für das gesamte Land zentral beim LAVG.",
    authorities: [{ area: "Landesweit", places: "Potsdam, Cottbus, Brandenburg an der Havel, Frankfurt (Oder) und alle Landkreise", authority: "Landesamt für Arbeitsschutz, Verbraucherschutz und Gesundheit (LAVG)", email: "amr@lavg.brandenburg.de" }],
    registration: { label: "Anzeigeformular öffnen", href: "https://lavg.brandenburg.de/lavg/de/arbeitsschutz/formulare/nichtionisierende-strahlung/", kind: "form" },
    links: [{ label: "Offizielle NiSV-Anzeige & Formular", href: "https://lavg.brandenburg.de/lavg/de/arbeitsschutz/formulare/nichtionisierende-strahlung/", kind: "form" }],
  },
  {
    slug: "bremen",
    name: "Bremen",
    note: "Eine Behörde für Bremen und Bremerhaven; die Anzeige kann direkt online ausgefüllt werden.",
    authorities: [{ area: "Landesweit", places: "Bremen und Bremerhaven", authority: "Gewerbeaufsicht des Landes Bremen", email: "office@gewerbeaufsicht.bremen.de" }],
    registration: { label: "Gerät online anmelden", href: "https://www.gewerbeaufsicht.bremen.de/onlineformular-nisv-1842", kind: "online" },
    links: [{ label: "NiSV-Onlineformular", href: "https://www.gewerbeaufsicht.bremen.de/onlineformular-nisv-1842", kind: "online" }],
  },
  {
    slug: "hamburg",
    name: "Hamburg",
    note: "Zuständig ist das Bezirksamt am Betriebsort.",
    authorities: [
      { area: "Hamburg-Mitte", places: "Stadtteile im Bezirk Hamburg-Mitte", authority: "Bezirksamt Hamburg-Mitte", email: "umweltschutzmitte@hamburg-mitte.hamburg.de" },
      { area: "Altona", places: "Stadtteile im Bezirk Altona", authority: "Bezirksamt Altona", email: "umweltschutz@altona.hamburg.de" },
      { area: "Eimsbüttel", places: "Stadtteile im Bezirk Eimsbüttel", authority: "Bezirksamt Eimsbüttel", email: "nisv@eimsbuettel.hamburg.de" },
      { area: "Hamburg-Nord", places: "Stadtteile im Bezirk Hamburg-Nord", authority: "Bezirksamt Hamburg-Nord", email: "umweltschutz@hamburg-nord.hamburg.de" },
      { area: "Wandsbek", places: "Stadtteile im Bezirk Wandsbek", authority: "Bezirksamt Wandsbek", email: "verbraucherschutzamt@wandsbek.hamburg.de" },
      { area: "Bergedorf", places: "Stadtteile im Bezirk Bergedorf", authority: "Bezirksamt Bergedorf", email: "verbraucherschutz@bergedorf.hamburg.de" },
      { area: "Harburg", places: "Stadtteile im Bezirk Harburg", authority: "Bezirksamt Harburg", email: "nisv@harburg.hamburg.de" },
    ],
    registration: { label: "Anzeigeformular öffnen", href: "https://www.hamburg.de/resource/blob/88218/4438ae5ad34a65724c6fa41d25af9498/nisv-anzeige-formular-data.pdf", kind: "form" },
    links: [{ label: "Offizielle Zuständigkeitsübersicht", href: federalNisvOverview, kind: "official" }],
  },
  {
    slug: "hessen",
    name: "Hessen",
    note: "Das Verwaltungsportal ordnet die zuständige Arbeitsschutzbehörde anhand des Betriebsorts zu.",
    authorities: [
      { area: "Regierungsbezirk Darmstadt", places: "Darmstadt, Frankfurt, Wiesbaden, Offenbach und Südhessen", authority: "Regierungspräsidium Darmstadt", email: "arbeitsschutz@rpda.hessen.de" },
      { area: "Regierungsbezirk Gießen", places: "Gießen, Marburg-Biedenkopf, Vogelsberg", authority: "Regierungspräsidium Gießen", email: "arbeitsschutz-giessen@rpgi.hessen.de" },
      { area: "Lahn-Dill & Limburg-Weilburg", places: "Wetzlar, Limburg und zugehörige Landkreise", authority: "Regierungspräsidium Gießen – Standort Hadamar", email: "arbeitsschutz-hadamar@rpgi.hessen.de" },
      { area: "Regierungsbezirk Kassel", places: "Kassel und Nord-/Osthessen", authority: "Regierungspräsidium Kassel", email: "arbeitsschutz@rpks.hessen.de" },
    ],
    registration: { label: "Anmeldung nach Ort öffnen", href: "https://verwaltungsportal.hessen.de/leistung?leistung_id=L100001_369817868", kind: "online" },
    links: [
      { label: "Verwaltungsportal mit Ortsauswahl", href: "https://verwaltungsportal.hessen.de/leistung?leistung_id=L100001_369817868", kind: "online" },
      { label: "Offizielles Anzeigeformular", href: "https://rp-giessen.hessen.de/sites/rp-giessen.hessen.de/files/2021-12/anzeige_ss_3_abs._1_nisv.pdf", kind: "form" },
    ],
  },
  {
    slug: "mecklenburg-vorpommern",
    name: "Mecklenburg-Vorpommern",
    note: "Außerhalb von Gesundheitseinrichtungen ist das örtliche Gesundheitsamt zuständig; für Gesundheitseinrichtungen das LAGuS.",
    authorities: [
      { area: "Gesundheitseinrichtungen", places: "Landesweit", authority: "Landesamt für Gesundheit und Soziales (LAGuS)", email: "NiSG_Anzeigen@LAGuS.MV-Regierung.de" },
      { area: "Schwerin", places: "Landeshauptstadt Schwerin", authority: "Gesundheitsamt Schwerin", email: "gesundheitsamt@schwerin.de" },
      { area: "Rostock", places: "Hansestadt Rostock", authority: "Gesundheitsamt Rostock", email: "kerstin.neuber@rostock.de" },
      { area: "Landkreis Rostock", places: "Städte und Gemeinden des Landkreises Rostock", authority: "Gesundheitsamt Landkreis Rostock", email: "claudia.jonas@lkros.de" },
      { area: "Ludwigslust-Parchim", places: "Städte und Gemeinden des Landkreises", authority: "Gesundheitsamt Ludwigslust-Parchim", email: "ines.hannemann@kreis-lup.de" },
      { area: "Nordwestmecklenburg", places: "Wismar und Städte/Gemeinden des Landkreises", authority: "Gesundheitsamt Nordwestmecklenburg", email: "ga@nordwestmecklenburg.de" },
      { area: "Mecklenburgische Seenplatte", places: "Neubrandenburg und Städte/Gemeinden des Landkreises", authority: "Gesundheitsamt Mecklenburgische Seenplatte", email: "gesundheitsamt@lk-seenplatte.de" },
      { area: "Vorpommern-Greifswald", places: "Greifswald und Städte/Gemeinden des Landkreises", authority: "Gesundheitsamt Vorpommern-Greifswald", email: "gesundheitsamt@kreis-vg.de" },
      { area: "Vorpommern-Rügen", places: "Stralsund und Städte/Gemeinden des Landkreises", authority: "Gesundheitsamt Vorpommern-Rügen", email: "FD33@lk-vr.de" },
    ],
    registration: { label: "Anmeldung nach Ort öffnen", href: "https://www.mv-serviceportal.de/suche-a-bis-z?leistungId=132144924", kind: "online" },
    links: [
      { label: "Gesundheitsamt nach PLZ/Ort finden", href: "https://tools.rki.de/plztool/", kind: "online" },
      { label: "Offizielle Zuständigkeitsübersicht", href: federalNisvOverview, kind: "official" },
    ],
  },
  {
    slug: "niedersachsen",
    name: "Niedersachsen",
    note: "Zuständig ist das Gesundheitsamt des Landkreises oder der kreisfreien Stadt am Betriebsort.",
    authorities: [{ area: "Alle Landkreise & kreisfreien Städte", places: "z. B. Hannover, Braunschweig, Oldenburg, Osnabrück, Wolfsburg und alle Gemeinden", authority: "Örtlich zuständiges Gesundheitsamt" }],
    registration: { label: "Anmeldung nach Ort öffnen", href: "https://verwaltung.bund.de/leistungsverzeichnis/de/leistung/99003056261000", kind: "online" },
    links: [
      { label: "Gesundheitsamt nach PLZ/Ort finden", href: "https://tools.rki.de/plztool/", kind: "online" },
      { label: "Offizielle Zuständigkeitsübersicht", href: federalNisvOverview, kind: "official" },
    ],
  },
  {
    slug: "nordrhein-westfalen",
    name: "Nordrhein-Westfalen",
    note: "Seit 1. Juli 2025 für alle Städte und Kreise zentral beim LfGA NRW.",
    authorities: [{ area: "Landesweit", places: "Alle Städte und Kreise in Nordrhein-Westfalen", authority: "Landesamt für Gesundheit und Arbeitsschutz NRW (LfGA)", email: "NiSG@lfga.nrw.de" }],
    registration: { label: "Anzeigeformular öffnen", href: "https://www.lfga.nrw.de/_meta/pdf/Anzeige-NiSV.pdf", kind: "form" },
    links: [
      { label: "NiSV-Information & Einreichung", href: "https://www.lfga.nrw.de/service/pressearchiv/2025/250919_Zustaendigkeit_NiSV/index.html", kind: "official" },
      { label: "Offizielles Anzeigeformular", href: "https://www.lfga.nrw.de/_meta/pdf/Anzeige-NiSV.pdf", kind: "form" },
    ],
  },
  {
    slug: "rheinland-pfalz",
    name: "Rheinland-Pfalz",
    note: "Zuständig ist die örtliche Regionalstelle der SGD Nord oder SGD Süd.",
    authorities: [
      { area: "Trier", places: "Trier und zugeordnete Landkreise", authority: "SGD Nord – Regionalstelle Trier", email: "poststelle24@sgdnord.rlp.de" },
      { area: "Idar-Oberstein", places: "Idar-Oberstein und zugeordnete Landkreise", authority: "SGD Nord – Regionalstelle Idar-Oberstein", email: "poststelle22@sgdnord.rlp.de" },
      { area: "Koblenz", places: "Koblenz und zugeordnete Landkreise", authority: "SGD Nord – Regionalstelle Koblenz", email: "poststelle23@sgdnord.rlp.de" },
      { area: "Mainz", places: "Mainz und zugeordnete Landkreise", authority: "SGD Süd – Regionalstelle Mainz", email: "referat22@sgdsued.rlp.de" },
      { area: "Neustadt", places: "Neustadt an der Weinstraße und zugeordnete Landkreise", authority: "SGD Süd – Regionalstelle Neustadt", email: "referat23@sgdsued.rlp.de" },
    ],
    registration: { label: "Anzeigeformular öffnen", href: "https://mkuem.rlp.de/fileadmin/14/Themen/Umweltschutz/Nichtionisierende_Strahlung/NiSVFormular-1.pdf", kind: "form" },
    links: [
      { label: "NiSV-Information & Zuständigkeit", href: "https://mlwuf.rlp.de/themen/umweltschutz-/-umwelt-und-gesundheit/nisv", kind: "official" },
      { label: "Offizielles Anzeigeformular", href: "https://mkuem.rlp.de/fileadmin/14/Themen/Umweltschutz/Nichtionisierende_Strahlung/NiSVFormular-1.pdf", kind: "form" },
    ],
  },
  {
    slug: "saarland",
    name: "Saarland",
    note: "Für das gesamte Saarland zentral zuständig.",
    authorities: [{ area: "Landesweit", places: "Saarbrücken und alle Landkreise/Gemeinden", authority: "Landesamt für Umwelt- und Arbeitsschutz", email: "lua@lua.saarland.de" }],
    registration: { label: "Anzeigeformular öffnen", href: "https://www.saarland.de/SharedDocs/Downloads/DE/LUA_Formulare/NiSG/NiSV_Anzeige", kind: "form" },
    links: [{ label: "Offizielle Zuständigkeitsübersicht", href: federalNisvOverview, kind: "official" }],
  },
  {
    slug: "sachsen",
    name: "Sachsen",
    note: "Zentrale Kontaktstelle; laut BMUKN ist die endgültige Zuständigkeitszuweisung noch nicht abschließend geklärt.",
    authorities: [{ area: "Landesweit", places: "Dresden, Leipzig, Chemnitz und alle Landkreise/Gemeinden", authority: "Landesdirektion Sachsen – Referat 53", email: "strahlenschutz@lds.sachsen.de" }],
    registration: { label: "Anzeigeformular öffnen", href: "https://fs.egov.sachsen.de/formserv/findform?areashortname=142_AS&formtecid=2&shortname=smwa_as_nisv", kind: "form" },
    links: [{ label: "Offizielle Zuständigkeitsübersicht", href: federalNisvOverview, kind: "official" }],
  },
  {
    slug: "sachsen-anhalt",
    name: "Sachsen-Anhalt",
    note: "Für das gesamte Land zentral beim Landesamt für Verbraucherschutz.",
    authorities: [{ area: "Landesweit", places: "Magdeburg, Halle (Saale), Dessau-Roßlau und alle Landkreise/Gemeinden", authority: "Landesamt für Verbraucherschutz Sachsen-Anhalt", email: "lav-gazentral@sachsen-anhalt.de" }],
    registration: { label: "Gerät online anmelden", href: "https://am.sachsen-anhalt.de/intelliform/forms/ST/standard/sni_strahlung_nisv/sni_strahlung_nisv/index?vorbelegung_gebiet_id=", kind: "online" },
    links: [{ label: "Formulare & NiSV-Anmeldemuster", href: "https://verbraucherschutz.sachsen-anhalt.de/arbeitsschutz/formulare-und-arbeitshilfen", kind: "form" }],
  },
  {
    slug: "schleswig-holstein",
    name: "Schleswig-Holstein",
    note: "Landesweite Online-Anzeige ohne Registrierung möglich.",
    authorities: [{ area: "Landesweit", places: "Kiel, Lübeck, Flensburg, Neumünster und alle Kreise/Gemeinden", authority: "Landesamt für Arbeitsschutz, Soziales und Gesundheit", email: "nisvanzeige@lasg.landsh.de" }],
    registration: { label: "Gerät online anmelden", href: "https://serviceportal.schleswig-holstein.de/Verwaltungsportal/Service/Entry?id=AFM_NiSV&location=", kind: "online" },
    links: [
      { label: "NiSV-Online-Anzeige", href: "https://serviceportal.schleswig-holstein.de/Verwaltungsportal/Service/Entry?id=AFM_NiSV&location=", kind: "online" },
      { label: "Offizieller NiSV-Kontakt", href: "https://www.schleswig-holstein.de/DE/landesregierung/ministerien-behoerden/LASG/Aufgaben/Medizinprodukteueberwachung/Kontakt/FuPoNiSVanzeige", kind: "official" },
    ],
  },
  {
    slug: "thueringen",
    name: "Thüringen",
    note: "Für das gesamte Land zentral beim Thüringer Landesamt für Verbraucherschutz.",
    authorities: [{ area: "Landesweit", places: "Erfurt, Jena, Gera, Weimar und alle Landkreise/Gemeinden", authority: "Thüringer Landesamt für Verbraucherschutz – Dezernat 21", email: "NiSV@tlv.thueringen.de" }],
    registration: { label: "Meldeweg öffnen", href: "https://verbraucherschutz.thueringen.de/fileadmin/Publikationen/Produktsicherheit_u_Marktueberwachung/TLV_Merkblatt_NiSV_Anzeigepflicht.pdf", kind: "official" },
    links: [
      { label: "Offizielles NiSV-Merkblatt", href: "https://verbraucherschutz.thueringen.de/fileadmin/Publikationen/Produktsicherheit_u_Marktueberwachung/TLV_Merkblatt_NiSV_Anzeigepflicht.pdf", kind: "form" },
      { label: "Offizielle Zuständigkeitsübersicht", href: federalNisvOverview, kind: "official" },
    ],
  },
];
