"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { normalizeText } from "@/lib/catalog/normalize";
import { findOrCreateManufacturer, findOrCreateDeviceModel } from "@/lib/catalog/queries";

function slugify(text: string) {
  return normalizeText(text).slice(0, 60) || `t-${Date.now()}`;
}

// ---------------------------------------------------------------------------
// Technologies & categories
// ---------------------------------------------------------------------------

export async function createTechnologyAction(formData: FormData) {
  const categoryId = String(formData.get("categoryId") ?? "");
  const nameDe = String(formData.get("nameDe") ?? "").trim();
  const nameEn = String(formData.get("nameEn") ?? "").trim();
  const synonyms = String(formData.get("synonyms") ?? "").trim();
  if (!categoryId || !nameDe || !nameEn) throw new Error("Kategorie, deutscher und englischer Name sind erforderlich.");

  const category = await prisma.technologyCategory.findUniqueOrThrow({ where: { id: categoryId } });
  await prisma.technology.create({
    data: {
      categoryId,
      nameDe,
      nameEn,
      slug: `${category.slug}-${slugify(nameEn)}-${Date.now().toString(36)}`,
      synonyms,
    },
  });
  revalidatePath("/admin/katalog/technologien");
}

export async function updateTechnologyAction(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const nameDe = String(formData.get("nameDe") ?? "").trim();
  const nameEn = String(formData.get("nameEn") ?? "").trim();
  const synonyms = String(formData.get("synonyms") ?? "").trim();
  if (!id) throw new Error("Technologie-ID fehlt.");
  await prisma.technology.update({ where: { id }, data: { nameDe, nameEn, synonyms } });
  revalidatePath("/admin/katalog/technologien");
}

export async function toggleTechnologyActiveAction(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const active = String(formData.get("active")) === "true";
  await prisma.technology.update({ where: { id }, data: { active: !active } });
  revalidatePath("/admin/katalog/technologien");
}

// ---------------------------------------------------------------------------
// Manufacturers
// ---------------------------------------------------------------------------

export async function createManufacturerAction(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const country = String(formData.get("country") ?? "").trim() || undefined;
  const website = String(formData.get("website") ?? "").trim() || undefined;
  if (!name) throw new Error("Herstellername ist erforderlich.");
  const manufacturer = await findOrCreateManufacturer(name);
  if (country || website) {
    await prisma.manufacturer.update({ where: { id: manufacturer.id }, data: { country, website } });
  }
  revalidatePath("/admin/katalog/hersteller");
}

export async function toggleManufacturerActiveAction(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const active = String(formData.get("active")) === "true";
  await prisma.manufacturer.update({ where: { id }, data: { active: !active } });
  revalidatePath("/admin/katalog/hersteller");
}

/** Reassigns every device model and device from `duplicateId` to `primaryId`, then deactivates the duplicate. */
export async function mergeManufacturersAction(formData: FormData) {
  const primaryId = String(formData.get("primaryId") ?? "");
  const duplicateId = String(formData.get("duplicateId") ?? "");
  if (!primaryId || !duplicateId || primaryId === duplicateId) {
    throw new Error("Bitte zwei unterschiedliche Hersteller auswählen.");
  }

  await prisma.$transaction([
    prisma.deviceModel.updateMany({ where: { manufacturerId: duplicateId }, data: { manufacturerId: primaryId } }),
    prisma.device.updateMany({ where: { manufacturerId: duplicateId }, data: { manufacturerId: primaryId } }),
    prisma.manufacturer.update({ where: { id: duplicateId }, data: { active: false, mergedIntoId: primaryId } }),
  ]);

  revalidatePath("/admin/katalog/hersteller");
}

// ---------------------------------------------------------------------------
// Device models
// ---------------------------------------------------------------------------

export async function createDeviceModelAction(formData: FormData) {
  const manufacturerId = String(formData.get("manufacturerId") ?? "");
  const modelName = String(formData.get("modelName") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim() || undefined;
  const technologyIds = formData.getAll("technologyIds").map(String).filter(Boolean);
  if (!manufacturerId || !modelName) throw new Error("Hersteller und Modellname sind erforderlich.");
  if (technologyIds.length === 0) throw new Error("Mindestens eine Technologie auswählen.");

  const model = await findOrCreateDeviceModel(manufacturerId, modelName);
  if (description) await prisma.deviceModel.update({ where: { id: model.id }, data: { description } });

  await prisma.deviceModelTechnology.deleteMany({ where: { deviceModelId: model.id } });
  for (const technologyId of technologyIds) {
    await prisma.deviceModelTechnology.create({ data: { deviceModelId: model.id, technologyId } });
  }

  revalidatePath("/admin/katalog/modelle");
}

export async function updateDeviceModelTechnologiesAction(formData: FormData) {
  const deviceModelId = String(formData.get("deviceModelId") ?? "");
  const technologyIds = formData.getAll("technologyIds").map(String).filter(Boolean);
  if (!deviceModelId) throw new Error("Modell-ID fehlt.");

  await prisma.deviceModelTechnology.deleteMany({ where: { deviceModelId } });
  for (const technologyId of technologyIds) {
    await prisma.deviceModelTechnology.create({ data: { deviceModelId, technologyId } });
  }
  revalidatePath("/admin/katalog/modelle");
}

export async function toggleDeviceModelActiveAction(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const active = String(formData.get("active")) === "true";
  await prisma.deviceModel.update({ where: { id }, data: { active: !active } });
  revalidatePath("/admin/katalog/modelle");
}

// ---------------------------------------------------------------------------
// Review queue — approving client-submitted unknown devices (Scenario D)
// ---------------------------------------------------------------------------

export async function approveReviewDeviceAction(formData: FormData) {
  const deviceId = String(formData.get("deviceId") ?? "");
  const manufacturerChoice = String(formData.get("manufacturerChoice") ?? ""); // existing id, or "new"
  const newManufacturerName = String(formData.get("newManufacturerName") ?? "").trim();
  const modelChoice = String(formData.get("modelChoice") ?? ""); // existing id, or "new"
  const newModelName = String(formData.get("newModelName") ?? "").trim();
  const technologyIds = formData.getAll("technologyIds").map(String).filter(Boolean);
  const classificationStatus = String(formData.get("classificationStatus") ?? "not_reviewed");
  const classificationNote = String(formData.get("classificationNote") ?? "").trim() || null;

  if (!deviceId) throw new Error("Geräte-ID fehlt.");

  const device = await prisma.device.findUniqueOrThrow({ where: { id: deviceId } });

  let manufacturerId = manufacturerChoice;
  if (manufacturerChoice === "new") {
    if (!newManufacturerName) throw new Error("Neuer Herstellername ist erforderlich.");
    const manufacturer = await findOrCreateManufacturer(newManufacturerName);
    manufacturerId = manufacturer.id;
  }
  if (!manufacturerId) throw new Error("Bitte einen Hersteller zuordnen.");

  let deviceModelId = modelChoice;
  const modelNameForNew = newModelName || device.customModel || "Unbekanntes Modell";
  if (modelChoice === "new" || !modelChoice) {
    const model = await findOrCreateDeviceModel(manufacturerId, modelNameForNew);
    deviceModelId = model.id;
    if (technologyIds.length > 0) {
      await prisma.deviceModelTechnology.deleteMany({ where: { deviceModelId } });
      for (const technologyId of technologyIds) {
        await prisma.deviceModelTechnology.create({ data: { deviceModelId, technologyId } });
      }
    }
  }

  await prisma.device.update({
    where: { id: deviceId },
    data: {
      manufacturerId,
      deviceModelId,
      catalogReviewRequired: false,
      classificationStatus,
      classificationNote,
    },
  });

  // Sync the device's own technology links with whatever the admin confirmed.
  if (technologyIds.length > 0) {
    await prisma.deviceTechnology.deleteMany({ where: { deviceId } });
    for (const technologyId of technologyIds) {
      await prisma.deviceTechnology.create({ data: { deviceId, technologyId } });
    }
  }

  await prisma.historyEvent.create({
    data: {
      deviceId,
      date: new Date(),
      type: "registrierung",
      title: "Katalogeintrag bestätigt",
      description: "EuroIPL hat Hersteller, Modell und Technologie(n) für dieses Gerät im Katalog bestätigt.",
      technician: "EuroIPL Admin",
    },
  });

  revalidatePath("/admin/katalog/pruefung");
  revalidatePath(`/portal/geraete/${deviceId}`);
}

export async function updateClassificationAction(formData: FormData) {
  const deviceId = String(formData.get("deviceId") ?? "");
  const classificationStatus = String(formData.get("classificationStatus") ?? "not_reviewed");
  const classificationNote = String(formData.get("classificationNote") ?? "").trim() || null;
  if (!deviceId) throw new Error("Geräte-ID fehlt.");
  await prisma.device.update({ where: { id: deviceId }, data: { classificationStatus, classificationNote } });
  revalidatePath("/admin/katalog/pruefung");
  revalidatePath(`/portal/geraete/${deviceId}`);
}
