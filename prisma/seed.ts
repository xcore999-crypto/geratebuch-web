import { prisma } from "../src/lib/db";
import { normalizeText } from "../src/lib/catalog/normalize";
import { categories } from "./seed-data";

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function main() {
  console.log("Clearing existing data...");
  await prisma.serviceRequest.deleteMany();
  await prisma.historyEvent.deleteMany();
  await prisma.document.deleteMany();
  await prisma.deviceTechnology.deleteMany();
  await prisma.device.deleteMany();
  await prisma.location.deleteMany();
  await prisma.organization.deleteMany();
  await prisma.deviceModelTechnology.deleteMany();
  await prisma.deviceModel.deleteMany();
  await prisma.manufacturer.deleteMany();
  await prisma.technology.deleteMany();
  await prisma.technologyCategory.deleteMany();

  console.log("Seeding technology catalog...");
  // key: "<categorySlug>::<nameEn>" -> technology id
  const techIdByKey = new Map<string, string>();

  for (let i = 0; i < categories.length; i++) {
    const cat = categories[i];
    const category = await prisma.technologyCategory.create({
      data: {
        nameDe: cat.nameDe,
        nameEn: cat.nameEn,
        slug: cat.slug,
        description: cat.description,
        icon: cat.icon,
        sortOrder: i,
      },
    });

    for (let j = 0; j < cat.techs.length; j++) {
      const t = cat.techs[j];
      const tech = await prisma.technology.create({
        data: {
          categoryId: category.id,
          nameDe: t.nameDe,
          nameEn: t.nameEn,
          shortName: t.short,
          slug: `${cat.slug}-${slugify(t.nameEn)}`,
          synonyms: (t.synonyms ?? []).join(","),
          sortOrder: j,
        },
      });
      techIdByKey.set(`${cat.slug}::${t.nameEn}`, tech.id);
    }
  }

  const totalTechs = categories.reduce((sum, c) => sum + c.techs.length, 0);
  console.log(`  -> ${categories.length} categories, ${totalTechs} technologies`);

  console.log("Seeding manufacturers...");
  async function upsertManufacturer(name: string, country?: string) {
    const normalizedName = normalizeText(name);
    return prisma.manufacturer.upsert({
      where: { normalizedName },
      update: {},
      create: { name, normalizedName, country },
    });
  }

  const candela = await upsertManufacturer("Candela", "USA");
  const fotona = await upsertManufacturer("Fotona", "Slowenien");
  const asclepion = await upsertManufacturer("Asclepion Laser Technologies", "Deutschland");
  const zimmer = await upsertManufacturer("Zimmer MedizinSysteme", "Deutschland");
  const alma = await upsertManufacturer("Alma Lasers", "Israel");
  const lumenis = await upsertManufacturer("Lumenis", "Israel");
  const cutera = await upsertManufacturer("Cutera", "USA");

  console.log("Seeding device models...");
  async function createModel(
    manufacturerId: string,
    modelName: string,
    techKeys: string[],
    description?: string
  ) {
    const model = await prisma.deviceModel.create({
      data: {
        manufacturerId,
        modelName,
        normalizedName: normalizeText(modelName),
        description,
      },
    });
    for (const key of techKeys) {
      const technologyId = techIdByKey.get(key);
      if (!technologyId) throw new Error(`Unknown technology key in seed: ${key}`);
      await prisma.deviceModelTechnology.create({
        data: { deviceModelId: model.id, technologyId },
      });
    }
    return model;
  }

  const gentleMaxPro = await createModel(
    candela.id,
    "GentleMax Pro",
    ["laser::Alexandrite Laser", "laser::Nd:YAG Laser"],
    "Dual-Wellenlängen-Laserplattform (Alexandrit 755nm / Nd:YAG 1064nm)."
  );
  await createModel(candela.id, "GentleLase Pro", ["laser::Alexandrite Laser"], "Alexandritlaser für Haarentfernung und Pigmentbehandlung.");
  await createModel(candela.id, "Vbeam Prima", ["gefaesse-hautlaesionen::Vascular Laser"], "Gepulster Farbstofflaser für Gefäßindikationen.");

  const starWalkerMaQX = await createModel(
    fotona.id,
    "StarWalker MaQX",
    ["laser::Nd:YAG Laser", "laser::Q-Switched Nd:YAG"],
    "Nd:YAG-Plattform mit QCW- und Q-Switched-Modi."
  );
  await createModel(fotona.id, "SP Dynamis", ["laser::Er:YAG Laser", "laser::Nd:YAG Laser"], "Kombinierte Er:YAG- / Nd:YAG-Plattform.");

  const meDioStarNeXT = await createModel(
    asclepion.id,
    "MeDioStar NeXT",
    ["laser::Diode Laser"],
    "Diodenlaser-Plattform für die Haarentfernung."
  );

  const cryo6 = await createModel(
    zimmer.id,
    "Cryo 6",
    ["kuehlung-waerme::Skin Cooling Systems"],
    "Kaltluft-Kühlsystem zur Behandlungsunterstützung."
  );

  const harmonyXlPro = await createModel(
    alma.id,
    "Harmony XL Pro",
    ["ipl-licht::IPL", "laser::Nd:YAG Laser"],
    "Modulare Plattform mit IPL- und Nd:YAG-Applikatoren."
  );

  await createModel(lumenis.id, "M22", ["ipl-licht::IPL", "laser::Nd:YAG Laser"], "Multi-Applikations-Plattform (IPL + Nd:YAG).");
  await createModel(cutera.id, "excel V+", ["gefaesse-hautlaesionen::Nd:YAG Vascular Systems", "laser::Q-Switched Nd:YAG"], "Gefäß- und Pigmentlaser (KTP/Nd:YAG).");

  console.log("Seeding demo tenant (Kosmetikinstitut Lindenhof)...");
  const org = await prisma.organization.create({
    data: {
      name: "Kosmetikinstitut Lindenhof GmbH",
      contactPerson: "Julia Hoffmann",
      email: "j.hoffmann@lindenhof-kosmetik.de",
      phone: "030 44 55 82 10",
      customerSince: new Date("2024-04-15"),
    },
  });

  const room1 = await prisma.location.create({ data: { organizationId: org.id, name: "Behandlungsraum 1", address: "Lindenhofstraße 22, 10785 Berlin" } });
  const room2 = await prisma.location.create({ data: { organizationId: org.id, name: "Behandlungsraum 2", address: "Lindenhofstraße 22, 10785 Berlin" } });
  const room3 = await prisma.location.create({ data: { organizationId: org.id, name: "Behandlungsraum 3", address: "Lindenhofstraße 22, 10785 Berlin" } });

  async function attachModelTechnologies(deviceId: string, deviceModelId: string) {
    const links = await prisma.deviceModelTechnology.findMany({ where: { deviceModelId } });
    for (const link of links) {
      await prisma.deviceTechnology.create({ data: { deviceId, technologyId: link.technologyId } });
    }
  }

  const deviceCandela = await prisma.device.create({
    data: {
      organizationId: org.id,
      locationId: room1.id,
      manufacturerId: candela.id,
      deviceModelId: gentleMaxPro.id,
      serialNumber: "GMP-192837",
      registeredAt: new Date("2024-05-02"),
      status: "ok",
      lastServiceDate: new Date("2026-02-10"),
      lastServiceType: "Wartung & Inspektion",
      nextServiceDate: new Date("2027-02-10"),
      nextServiceReason: "Turnusmäßige Jahreswartung",
      classificationStatus: "reviewed",
    },
  });
  await attachModelTechnologies(deviceCandela.id, gentleMaxPro.id);

  const deviceFotona = await prisma.device.create({
    data: {
      organizationId: org.id,
      locationId: room2.id,
      manufacturerId: fotona.id,
      deviceModelId: starWalkerMaQX.id,
      serialNumber: "SW-556677",
      registeredAt: new Date("2024-04-20"),
      status: "due_soon",
      lastServiceDate: new Date("2025-08-28"),
      lastServiceType: "Wartung & Inspektion",
      nextServiceDate: new Date("2026-09-02"),
      nextServiceReason: "Turnusmäßige Jahreswartung",
      classificationStatus: "reviewed",
    },
  });
  await attachModelTechnologies(deviceFotona.id, starWalkerMaQX.id);

  const deviceAsclepion = await prisma.device.create({
    data: {
      organizationId: org.id,
      locationId: room1.id,
      manufacturerId: asclepion.id,
      deviceModelId: meDioStarNeXT.id,
      serialNumber: "MD-112233",
      registeredAt: new Date("2024-06-11"),
      status: "ok",
      lastServiceDate: new Date("2026-01-15"),
      lastServiceType: "Reparatur & Diagnose",
      nextServiceDate: new Date("2026-12-01"),
      nextServiceReason: "Turnusmäßige Wartung",
      classificationStatus: "reviewed",
    },
  });
  await attachModelTechnologies(deviceAsclepion.id, meDioStarNeXT.id);

  const deviceZimmer = await prisma.device.create({
    data: {
      organizationId: org.id,
      locationId: room2.id,
      manufacturerId: zimmer.id,
      deviceModelId: cryo6.id,
      serialNumber: "CRY-445566",
      registeredAt: new Date("2024-04-20"),
      status: "overdue",
      lastServiceDate: new Date("2025-07-18"),
      lastServiceType: "STK-Prüfung",
      nextServiceDate: new Date("2026-07-18"),
      nextServiceReason: "Sicherheitstechnische Kontrolle (STK)",
      classificationStatus: "review_required",
      classificationNote: "STK-Anwendbarkeit für dieses Kühlsystem noch nicht final bestätigt.",
    },
  });
  await attachModelTechnologies(deviceZimmer.id, cryo6.id);

  const deviceAlma = await prisma.device.create({
    data: {
      organizationId: org.id,
      locationId: room3.id,
      manufacturerId: alma.id,
      deviceModelId: harmonyXlPro.id,
      serialNumber: "HXL-778899",
      registeredAt: new Date("2026-06-01"),
      status: "ok",
      nextServiceDate: new Date("2027-06-01"),
      nextServiceReason: "Erstwartung nach Herstellervorgabe",
      classificationStatus: "not_reviewed",
    },
  });
  await attachModelTechnologies(deviceAlma.id, harmonyXlPro.id);

  // A device registered via the "nicht gefunden" fallback — clearly demo data,
  // demonstrates the catalog review queue (Scenario B) out of the box.
  const diodeLaserTechId = techIdByKey.get("laser::Diode Laser")!;
  const deviceUnknown = await prisma.device.create({
    data: {
      organizationId: org.id,
      locationId: room3.id,
      customManufacturer: "No-Name Import GmbH (Kundenangabe)",
      customModel: "Diode 808 Pro (Kundenangabe)",
      serialNumber: "UNKN-000512",
      registeredAt: new Date("2026-07-30"),
      status: "ok",
      catalogReviewRequired: true,
      classificationStatus: "not_reviewed",
      notes: "Demo/Test: über den Fallback registriert, wartet auf Prüfung durch EuroIPL.",
    },
  });
  await prisma.deviceTechnology.create({ data: { deviceId: deviceUnknown.id, technologyId: diodeLaserTechId } });
  await prisma.historyEvent.create({
    data: {
      deviceId: deviceUnknown.id,
      date: new Date("2026-07-30"),
      type: "registrierung",
      title: "Gerät registriert (Katalogprüfung ausstehend)",
      description: "Hersteller/Modell wurden vom Kunden manuell angegeben und warten auf Prüfung durch EuroIPL.",
      technician: "System",
    },
  });

  console.log("Seeding documents & history...");
  const doc1 = await prisma.document.create({
    data: { deviceId: deviceCandela.id, title: "Wartungsprotokoll — Candela GentleMax Pro", type: "Wartungsprotokoll", date: new Date("2026-02-10"), fileSize: "312 KB" },
  });
  await prisma.historyEvent.create({ data: { deviceId: deviceCandela.id, date: new Date("2024-05-02"), type: "registrierung", title: "Gerät registriert", description: "Aufnahme in die digitale Geräteakte anhand Typenschild und Kaufbeleg.", technician: "System" } });
  await prisma.historyEvent.create({ data: { deviceId: deviceCandela.id, date: new Date("2026-02-10"), type: "wartung", title: "Wartung & Inspektion durchgeführt", description: "Jahreswartung inkl. Kühlkreislauf, Handstückprüfung und Kalibrierung. Keine Auffälligkeiten.", technician: "Michael Berger", documentId: doc1.id } });

  const doc4 = await prisma.document.create({
    data: { deviceId: deviceFotona.id, title: "Wartungsprotokoll — Fotona StarWalker MaQX", type: "Wartungsprotokoll", date: new Date("2025-08-28"), fileSize: "298 KB" },
  });
  await prisma.historyEvent.create({ data: { deviceId: deviceFotona.id, date: new Date("2024-04-20"), type: "registrierung", title: "Gerät registriert", description: "Aufnahme in die digitale Geräteakte im Rahmen der Erstbegehung.", technician: "System" } });
  await prisma.historyEvent.create({ data: { deviceId: deviceFotona.id, date: new Date("2025-08-28"), type: "wartung", title: "Wartung & Inspektion durchgeführt", description: "Reinigung des Strahlengangs, Funktionsprüfung Q-Switch-Modus, Softwarestand aktuell.", technician: "Michael Berger", documentId: doc4.id } });

  const doc2 = await prisma.document.create({
    data: { deviceId: deviceAsclepion.id, title: "Reparaturbericht — Asclepion MeDioStar NeXT", type: "Reparaturbericht", date: new Date("2026-01-15"), fileSize: "428 KB" },
  });
  await prisma.historyEvent.create({ data: { deviceId: deviceAsclepion.id, date: new Date("2024-06-11"), type: "registrierung", title: "Gerät registriert", description: "Aufnahme in die digitale Geräteakte anhand Typenschild.", technician: "System" } });
  await prisma.historyEvent.create({ data: { deviceId: deviceAsclepion.id, date: new Date("2026-01-15"), type: "reparatur", title: "Reparatur — Diodenmodul getauscht", description: "Fehlermeldung E-12 durch defektes Diodenmodul verursacht. Modul getauscht, Leistungsmessung im Sollbereich.", technician: "Michael Berger", documentId: doc2.id } });

  const doc3 = await prisma.document.create({
    data: { deviceId: deviceZimmer.id, title: "Prüfprotokoll STK — Zimmer Cryo 6", type: "Prüfprotokoll", date: new Date("2025-07-18"), fileSize: "266 KB" },
  });
  await prisma.historyEvent.create({ data: { deviceId: deviceZimmer.id, date: new Date("2024-04-20"), type: "registrierung", title: "Gerät registriert", description: "Aufnahme in die digitale Geräteakte im Rahmen der Erstbegehung.", technician: "System" } });
  await prisma.historyEvent.create({ data: { deviceId: deviceZimmer.id, date: new Date("2025-07-18"), type: "pruefung", title: "Sicherheitstechnische Kontrolle (STK)", description: "STK nach § 11 MPBetreibV durchgeführt. Messwerte im zulässigen Bereich, Plakette angebracht.", technician: "Michael Berger", documentId: doc3.id } });

  const doc5 = await prisma.document.create({
    data: { deviceId: deviceAlma.id, title: "Registrierungsbestätigung — Alma Harmony XL Pro", type: "Servicebericht", date: new Date("2026-06-01"), fileSize: "144 KB" },
  });
  await prisma.historyEvent.create({ data: { deviceId: deviceAlma.id, date: new Date("2026-06-01"), type: "registrierung", title: "Gerät registriert", description: "Neuanschaffung nach Lieferung registriert. Erstwartung noch ausstehend.", technician: "System", documentId: doc5.id } });

  console.log("Seeding service requests...");
  await prisma.serviceRequest.create({
    data: {
      publicId: "REQ-2026-041",
      organizationId: org.id,
      deviceId: deviceZimmer.id,
      serviceSlug: "stk-pruefung",
      serviceName: "STK-Prüfung",
      status: "eingeplant",
      description: "STK ist laut Geräteakte überfällig, bitte zeitnah einplanen.",
      deviceSnapshotName: "Zimmer MedizinSysteme Cryo 6",
      scheduledDate: new Date("2026-08-25"),
      lastUpdate: new Date("2026-08-04"),
      lastUpdateNote: "Termin am 25.08.2026, 09:00 Uhr bestätigt.",
      createdAt: new Date("2026-08-01"),
    },
  });
  await prisma.serviceRequest.create({
    data: {
      publicId: "REQ-2026-039",
      organizationId: org.id,
      deviceId: deviceFotona.id,
      serviceSlug: "reparatur-diagnose",
      serviceName: "Reparatur & Diagnose",
      status: "rueckfrage",
      description: "Gerät zeigt Fehlercode E-04 beim Start, Laser lässt sich nicht aktivieren.",
      deviceSnapshotName: "Fotona StarWalker MaQX",
      lastUpdate: new Date("2026-07-24"),
      lastUpdateNote: "Wir benötigen ein Foto des Fehlercodes auf dem Display, um die Diagnose einzugrenzen.",
      createdAt: new Date("2026-07-22"),
    },
  });
  await prisma.serviceRequest.create({
    data: {
      publicId: "REQ-2026-033",
      organizationId: org.id,
      deviceId: deviceCandela.id,
      serviceSlug: "wartung-inspektion",
      serviceName: "Wartung & Inspektion",
      status: "abgeschlossen",
      description: "Turnusmäßige Jahreswartung.",
      deviceSnapshotName: "Candela GentleMax Pro",
      scheduledDate: new Date("2026-02-10"),
      lastUpdate: new Date("2026-02-10"),
      lastUpdateNote: "Wartung abgeschlossen, Protokoll in der Geräteakte hinterlegt.",
      createdAt: new Date("2026-01-28"),
    },
  });
  await prisma.serviceRequest.create({
    data: {
      publicId: "REQ-2026-044",
      organizationId: org.id,
      deviceId: deviceAlma.id,
      serviceSlug: "beratung-einweisung",
      serviceName: "Beratung & Einweisung",
      status: "erhalten",
      description: "Neue Mitarbeiterin soll am Gerät eingewiesen werden, bitte um Terminvorschlag.",
      deviceSnapshotName: "Alma Lasers Harmony XL Pro",
      lastUpdate: new Date("2026-08-10"),
      lastUpdateNote: "Anfrage eingegangen, Rückmeldung folgt innerhalb von 2 Werktagen.",
      createdAt: new Date("2026-08-10"),
    },
  });

  console.log("Seed complete.");
  console.log(`Organization: ${org.name} (${org.id})`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => process.exit(0));
