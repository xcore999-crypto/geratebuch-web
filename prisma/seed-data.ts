// Full technology taxonomy for the geratebuch.de Gerätekatalog.
// English names are kept alongside German ones since manufacturers and
// clients frequently search using English/industry terminology.

export type SeedTechnology = {
  nameDe: string;
  nameEn: string;
  short?: string;
  synonyms?: string[];
};

export type SeedCategory = {
  slug: string;
  nameDe: string;
  nameEn: string;
  icon: string;
  description: string;
  techs: SeedTechnology[];
};

export const categories: SeedCategory[] = [
  {
    slug: "laser",
    nameDe: "Laser",
    nameEn: "Laser",
    icon: "bolt",
    description: "Laserbasierte Systeme für Haarentfernung, Hautverjüngung und mehr.",
    techs: [
      { nameDe: "Diodenlaser", nameEn: "Diode Laser", synonyms: ["diode", "diodenlaser", "808nm"] },
      { nameDe: "Alexandritlaser", nameEn: "Alexandrite Laser", synonyms: ["alexandrit", "755nm"] },
      { nameDe: "Nd:YAG-Laser", nameEn: "Nd:YAG Laser", short: "Nd:YAG", synonyms: ["ndyag", "nd yag", "yag laser", "1064nm"] },
      { nameDe: "Q-Switched Nd:YAG", nameEn: "Q-Switched Nd:YAG", short: "QS Nd:YAG", synonyms: ["qswitch", "q-switched", "gütegeschaltet", "qs ndyag"] },
      { nameDe: "Picosekundenlaser", nameEn: "Picosecond Laser", synonyms: ["pico", "picolaser", "ps laser"] },
      { nameDe: "Rubinlaser", nameEn: "Ruby Laser", synonyms: ["rubin", "694nm"] },
      { nameDe: "CO2-Laser", nameEn: "CO2 Laser", short: "CO2", synonyms: ["co2", "kohlendioxidlaser"] },
      { nameDe: "Er:YAG-Laser", nameEn: "Er:YAG Laser", short: "Er:YAG", synonyms: ["eryag", "erbium", "erbium yag"] },
      { nameDe: "Fraktionierter Laser", nameEn: "Fractional Laser", synonyms: ["fraktional", "fractional"] },
      { nameDe: "Dual-/Multiwellenlängen-Laser", nameEn: "Dual / Multi-Wavelength Laser", synonyms: ["dual wavelength", "multiwellenlänge"] },
      { nameDe: "Sonstiger Laser", nameEn: "Other Laser", synonyms: ["andere laser"] },
    ],
  },
  {
    slug: "ipl-licht",
    nameDe: "IPL / Licht",
    nameEn: "IPL / Light",
    icon: "sun",
    description: "Breitbandlicht- und photobasierte Systeme.",
    techs: [
      { nameDe: "IPL (Intense Pulsed Light)", nameEn: "IPL", synonyms: ["intense pulsed light", "blitzlampe"] },
      { nameDe: "SHR (Super Hair Removal)", nameEn: "SHR", synonyms: ["super hair removal"] },
      { nameDe: "E-Light (IPL + RF)", nameEn: "E-Light", synonyms: ["elight"] },
      { nameDe: "DPL (Dye Pulsed Light)", nameEn: "DPL", synonyms: ["dye pulsed light"] },
      { nameDe: "BBL / Breitbandlicht", nameEn: "BBL / Broadband Light", synonyms: ["broadband light", "bbl"] },
      { nameDe: "LED-Phototherapie", nameEn: "LED Phototherapy", synonyms: ["led therapie"] },
      { nameDe: "PDT (Photodynamische Therapie)", nameEn: "PDT systems", synonyms: ["photodynamische therapie"] },
      { nameDe: "Sonstiges lichtbasiertes System", nameEn: "Other light-based systems", synonyms: ["andere lichtsysteme"] },
    ],
  },
  {
    slug: "radiofrequenz",
    nameDe: "Radiofrequenz",
    nameEn: "Radiofrequency",
    icon: "waveform",
    description: "RF-Systeme für Hautstraffung und Konturierung.",
    techs: [
      { nameDe: "Monopolare Radiofrequenz", nameEn: "Monopolar RF", synonyms: ["monopolar"] },
      { nameDe: "Bipolare Radiofrequenz", nameEn: "Bipolar RF", synonyms: ["bipolar"] },
      { nameDe: "Multipolare Radiofrequenz", nameEn: "Multipolar RF", synonyms: ["multipolar"] },
      { nameDe: "Fraktionierte Radiofrequenz", nameEn: "Fractional RF", synonyms: ["fraktionierte rf"] },
      { nameDe: "RF-Microneedling", nameEn: "RF Microneedling", synonyms: ["radiofrequenz microneedling", "fraktioniertes rf needling"] },
      { nameDe: "Vakuum-Radiofrequenz", nameEn: "Vacuum RF", synonyms: ["vakuum rf"] },
      { nameDe: "Kapazitive/Resistive Radiofrequenz", nameEn: "Capacitive / Resistive RF", synonyms: ["kapazitiv", "resistiv"] },
      { nameDe: "Sonstige Radiofrequenz", nameEn: "Other RF", synonyms: ["andere rf"] },
    ],
  },
  {
    slug: "ultraschall",
    nameDe: "Ultraschall",
    nameEn: "Ultrasound",
    icon: "waves",
    description: "Ultraschallbasierte ästhetische Verfahren.",
    techs: [
      { nameDe: "HIFU (hochintensiver fokussierter Ultraschall)", nameEn: "HIFU", synonyms: ["high intensity focused ultrasound"] },
      { nameDe: "Mikrofokussierter Ultraschall", nameEn: "Microfocused Ultrasound", synonyms: ["mfu"] },
      { nameDe: "Ultraschallkavitation", nameEn: "Ultrasound Cavitation", synonyms: ["kavitation", "cavitation"] },
      { nameDe: "Kosmetischer Ultraschall", nameEn: "Cosmetic Ultrasound", synonyms: [] },
      { nameDe: "Sonophorese", nameEn: "Sonophoresis", synonyms: [] },
      { nameDe: "Sonstiger Ultraschall", nameEn: "Other Ultrasound", synonyms: ["anderer ultraschall"] },
    ],
  },
  {
    slug: "body-contouring",
    nameDe: "Body Contouring",
    nameEn: "Body Contouring",
    icon: "user",
    description: "Körperformende und muskelstimulierende Systeme.",
    techs: [
      { nameDe: "Kryolipolyse", nameEn: "Cryolipolysis", synonyms: ["fettabsaugung durch kälte", "cryo"] },
      { nameDe: "HIFEM", nameEn: "HIFEM", synonyms: ["high intensity focused electromagnetic"] },
      { nameDe: "EMS (Elektromuskelstimulation)", nameEn: "EMS", synonyms: ["elektromuskelstimulation"] },
      { nameDe: "Elektromagnetische Muskelstimulation", nameEn: "Electromagnetic Muscle Stimulation", synonyms: [] },
      { nameDe: "Vakuumtherapie", nameEn: "Vacuum Therapy", synonyms: ["vakuum"] },
      { nameDe: "Endermologie / Mechanische Massage", nameEn: "Endermology / Mechanical Massage", synonyms: ["endermologie"] },
      { nameDe: "Presso-/Drucktherapie", nameEn: "Pressotherapy", synonyms: ["pressotherapie"] },
      { nameDe: "Lymphatische Kompression", nameEn: "Lymphatic Compression", synonyms: ["lymphdrainage gerät"] },
      { nameDe: "Stoßwellentherapie", nameEn: "Acoustic Wave / Shockwave", synonyms: ["shockwave", "stosswelle"] },
      { nameDe: "Infrarot-Körperbehandlung", nameEn: "Infrared Body Treatment", synonyms: [] },
      { nameDe: "Kombinierte Body-Contouring-Systeme", nameEn: "Combined Body Contouring Systems", synonyms: [] },
    ],
  },
  {
    slug: "haut-gesicht",
    nameDe: "Haut / Gesicht",
    nameEn: "Skin / Facial",
    icon: "droplet",
    description: "Gesichtsbehandlung, Peeling und Hautanalyse.",
    techs: [
      { nameDe: "Hydrodermabrasion", nameEn: "Hydrodermabrasion", synonyms: [] },
      { nameDe: "Hydra-/Aqua-Facial", nameEn: "Hydradermabrasion / Aqua Facial", synonyms: ["aquafacial", "hydrafacial"] },
      { nameDe: "Mikrodermabrasion", nameEn: "Microdermabrasion", synonyms: [] },
      { nameDe: "Dermabrasion", nameEn: "Dermabrasion", synonyms: [] },
      { nameDe: "Sauerstoff-Facial", nameEn: "Oxygen Facial", synonyms: ["sauerstoffbehandlung"] },
      { nameDe: "Jet-Peel", nameEn: "Jet Peel", synonyms: [] },
      { nameDe: "Elektroporation", nameEn: "Electroporation", synonyms: [] },
      { nameDe: "Mesoporation", nameEn: "Mesoporation", synonyms: [] },
      { nameDe: "Iontophorese", nameEn: "Iontophoresis", synonyms: [] },
      { nameDe: "Galvanische Systeme", nameEn: "Galvanic systems", synonyms: ["galvanisch"] },
      { nameDe: "Hochfrequenz / Darsonval", nameEn: "High Frequency / Darsonval", synonyms: ["darsonval", "hochfrequenz gesicht"] },
      { nameDe: "Plasma-Hautbehandlung", nameEn: "Plasma Skin Treatment", synonyms: [] },
      { nameDe: "Plasma-Pen", nameEn: "Plasma Pen", synonyms: [] },
      { nameDe: "Kaltplasma", nameEn: "Cold Plasma", synonyms: [] },
      { nameDe: "Hautanalysesysteme", nameEn: "Skin Analysis Systems", synonyms: ["hautanalyse"] },
      { nameDe: "Gesichts-Multifunktionsgeräte", nameEn: "Facial multifunction systems", synonyms: [] },
    ],
  },
  {
    slug: "microneedling",
    nameDe: "Microneedling",
    nameEn: "Microneedling",
    icon: "needle",
    description: "Nadelbasierte Hauterneuerung.",
    techs: [
      { nameDe: "Mechanisches Microneedling", nameEn: "Mechanical Microneedling", synonyms: [] },
      { nameDe: "Automatisiertes Microneedling", nameEn: "Automated Microneedling", synonyms: [] },
      { nameDe: "RF-Microneedling", nameEn: "RF Microneedling", synonyms: ["radiofrequenz microneedling"] },
      { nameDe: "Kombinationssysteme", nameEn: "Combination systems", synonyms: [] },
    ],
  },
  {
    slug: "haare-kopfhaut",
    nameDe: "Haare / Kopfhaut",
    nameEn: "Hair / Scalp",
    icon: "user",
    description: "Haarentfernung und Kopfhautbehandlung.",
    techs: [
      { nameDe: "Laser-Haarentfernung", nameEn: "Hair Removal Laser", synonyms: [] },
      { nameDe: "IPL-Haarentfernung", nameEn: "IPL Hair Removal", synonyms: [] },
      { nameDe: "Kopfhaut-Behandlungssysteme", nameEn: "Scalp Treatment Systems", synonyms: [] },
      { nameDe: "Haaranalysesysteme", nameEn: "Hair Analysis Systems", synonyms: [] },
    ],
  },
  {
    slug: "pigment-tattoo",
    nameDe: "Pigment / Tattoo",
    nameEn: "Pigment / Tattoo",
    icon: "target",
    description: "Entfernung von Pigmenten, Tattoos und PMU.",
    techs: [
      { nameDe: "Q-Switched Tattooentfernung", nameEn: "Q-Switched Tattoo Removal", synonyms: [] },
      { nameDe: "Picosekunden-Tattooentfernung", nameEn: "Picosecond Tattoo Removal", synonyms: [] },
      { nameDe: "Pigmententfernungslaser", nameEn: "Pigment Removal Laser", synonyms: [] },
      { nameDe: "PMU-Entfernungssysteme", nameEn: "PMU Removal Systems", synonyms: ["permanent make up entfernung"] },
    ],
  },
  {
    slug: "gefaesse-hautlaesionen",
    nameDe: "Gefäße / Hautläsionen",
    nameEn: "Vascular / Skin Lesion",
    icon: "pulse",
    description: "Behandlung von Gefäßveränderungen und Hautläsionen.",
    techs: [
      { nameDe: "Gefäßlaser", nameEn: "Vascular Laser", synonyms: [] },
      { nameDe: "Nd:YAG-Gefäßsysteme", nameEn: "Nd:YAG Vascular Systems", synonyms: ["ndyag gefäss"] },
      { nameDe: "IPL-Gefäßsysteme", nameEn: "IPL Vascular Systems", synonyms: [] },
      { nameDe: "Sonstige Gefäßtechnologie", nameEn: "Other vascular technologies", synonyms: [] },
    ],
  },
  {
    slug: "kuehlung-waerme",
    nameDe: "Kühlung / Wärme",
    nameEn: "Cooling / Heating",
    icon: "snowflake",
    description: "Kühl- und Wärmesysteme zur Behandlungsunterstützung.",
    techs: [
      { nameDe: "Hautkühlsysteme", nameEn: "Skin Cooling Systems", synonyms: ["kühlsystem", "kaltluft"] },
      { nameDe: "Kryotherapie", nameEn: "Cryotherapy", synonyms: [] },
      { nameDe: "Lokale Kryotherapie", nameEn: "Local Cryotherapy", synonyms: [] },
      { nameDe: "Wärmetherapie", nameEn: "Thermal Therapy", synonyms: [] },
      { nameDe: "Infrarotsysteme", nameEn: "Infrared Systems", synonyms: [] },
    ],
  },
  {
    slug: "elektro-elektrolyse",
    nameDe: "Elektro / Elektrolyse",
    nameEn: "Electrical / Electrolysis",
    icon: "plug",
    description: "Elektrische Epilation und Stimulation.",
    techs: [
      { nameDe: "Elektrolyse / Nadelepilation", nameEn: "Electrolysis / Nadelepilation", synonyms: ["nadelepilation"] },
      { nameDe: "Thermolyse", nameEn: "Thermolysis", synonyms: [] },
      { nameDe: "Blend-Elektrolyse", nameEn: "Blend Electrolysis", synonyms: [] },
      { nameDe: "Elektrokoagulation", nameEn: "Electrocoagulation", synonyms: [] },
      { nameDe: "Kosmetische Elektrostimulationssysteme", nameEn: "Cosmetic electrical stimulation systems", synonyms: [] },
    ],
  },
  {
    slug: "multifunktionsgeraete",
    nameDe: "Multifunktionsgeräte",
    nameEn: "Multifunction Devices",
    icon: "grid",
    description: "Plattformen, die mehrere Technologien kombinieren.",
    techs: [
      { nameDe: "Laser + RF", nameEn: "Laser + RF", synonyms: [] },
      { nameDe: "IPL + RF", nameEn: "IPL + RF", synonyms: [] },
      { nameDe: "Vakuum + RF", nameEn: "Vacuum + RF", synonyms: [] },
      { nameDe: "Kavitation + RF", nameEn: "Cavitation + RF", synonyms: [] },
      { nameDe: "HIFU + RF", nameEn: "HIFU + RF", synonyms: [] },
      { nameDe: "Gesichts-Multifunktionsplattform", nameEn: "Facial multifunction platform", synonyms: [] },
      { nameDe: "Körper-Multifunktionsplattform", nameEn: "Body multifunction platform", synonyms: [] },
      { nameDe: "Modulare Ästhetikplattform", nameEn: "Modular aesthetic platform", synonyms: [] },
      { nameDe: "Sonstiges Kombigerät", nameEn: "Other combined systems", synonyms: [] },
    ],
  },
  {
    slug: "diagnostik-zubehoer",
    nameDe: "Diagnostik / Zubehör",
    nameEn: "Diagnostic / Support Equipment",
    icon: "camera",
    description: "Diagnose- und unterstützende Geräte ohne eigene Behandlungswirkung.",
    techs: [
      { nameDe: "Hautanalysegerät", nameEn: "Skin Analyzer", synonyms: [] },
      { nameDe: "Kamera-/Bildgebungssystem", nameEn: "Camera / Imaging System", synonyms: [] },
      { nameDe: "Laserkühlsystem", nameEn: "Laser Cooling System", synonyms: [] },
      { nameDe: "Rauchabsauger", nameEn: "Smoke Evacuator", synonyms: [] },
      { nameDe: "Wasser-/Kühleinheit", nameEn: "Water / Cooling Unit", synonyms: [] },
      { nameDe: "Behandlungs-Zubehör", nameEn: "Treatment support equipment", synonyms: [] },
      { nameDe: "Sonstiges Zubehör", nameEn: "Other", synonyms: [] },
    ],
  },
  {
    slug: "sonstige",
    nameDe: "Sonstige / Unbekannt",
    nameEn: "Other / Unknown",
    icon: "search",
    description: "Für Geräte, die sich keiner der obigen Kategorien zuordnen lassen.",
    techs: [{ nameDe: "Sonstige / unbekannte Technologie", nameEn: "Other / Unknown technology", synonyms: [] }],
  },
];
