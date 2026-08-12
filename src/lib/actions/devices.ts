"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { getDemoOrganization } from "@/lib/organization";

async function fileToDataUrl(file: FormDataEntryValue | null): Promise<string | null> {
  if (!file || typeof file === "string") return null;
  if (file.size === 0) return null;
  const buffer = Buffer.from(await file.arrayBuffer());
  return `data:${file.type || "image/jpeg"};base64,${buffer.toString("base64")}`;
}

function optionalDate(value: FormDataEntryValue | null): Date | null {
  const str = typeof value === "string" ? value.trim() : "";
  return str ? new Date(str) : null;
}

/**
 * Creates a client device record. Supports both the catalog path (an
 * existing manufacturer + device model — technologies are inherited from
 * the model) and the "nicht gefunden" fallback path (free-text
 * manufacturer/model, technologies picked manually, flagged for review).
 */
export async function createDeviceAction(formData: FormData) {
  const org = await getDemoOrganization();

  const mode = String(formData.get("mode") ?? "catalog");
  const serialNumber = String(formData.get("serialNumber") ?? "").trim();
  if (!serialNumber) {
    throw new Error("Seriennummer ist erforderlich.");
  }

  let locationId = String(formData.get("locationId") ?? "");
  const newLocationName = String(formData.get("newLocationName") ?? "").trim();
  if (locationId === "new") {
    if (newLocationName) {
      const location = await prisma.location.create({
        data: { organizationId: org.id, name: newLocationName },
      });
      locationId = location.id;
    } else {
      locationId = "";
    }
  }

  const productionYearRaw = formData.get("productionYear");
  const productionYear =
    typeof productionYearRaw === "string" && productionYearRaw.trim() ? Number(productionYearRaw) : null;
  const notes = String(formData.get("notes") ?? "").trim() || null;

  const devicePhotoUrl = await fileToDataUrl(formData.get("devicePhoto"));
  const typenschildPhotoUrl = await fileToDataUrl(formData.get("typenschildPhoto"));

  let manufacturerId: string | null = null;
  let deviceModelId: string | null = null;
  let customManufacturer: string | null = null;
  let customModel: string | null = null;
  let catalogReviewRequired = false;
  let technologyIds: string[] = [];

  if (mode === "fallback") {
    customManufacturer = String(formData.get("customManufacturer") ?? "").trim();
    customModel = String(formData.get("customModel") ?? "").trim() || null;
    if (!customManufacturer) {
      throw new Error("Herstellername ist erforderlich.");
    }
    catalogReviewRequired = true;
    technologyIds = formData.getAll("technologyIds").map(String).filter(Boolean);
    if (technologyIds.length === 0) {
      throw new Error("Bitte mindestens eine Technologie auswählen.");
    }
  } else {
    manufacturerId = String(formData.get("manufacturerId") ?? "") || null;
    deviceModelId = String(formData.get("deviceModelId") ?? "") || null;
    if (!manufacturerId || !deviceModelId) {
      throw new Error("Hersteller und Modell sind erforderlich.");
    }
    const links = await prisma.deviceModelTechnology.findMany({ where: { deviceModelId } });
    technologyIds = links.map((link) => link.technologyId);
  }

  const device = await prisma.device.create({
    data: {
      organizationId: org.id,
      locationId: locationId || null,
      manufacturerId,
      deviceModelId,
      customManufacturer,
      customModel,
      serialNumber,
      productionYear,
      purchaseDate: optionalDate(formData.get("purchaseDate")),
      commissioningDate: optionalDate(formData.get("commissioningDate")),
      devicePhotoUrl,
      typenschildPhotoUrl,
      notes,
      catalogReviewRequired,
    },
  });

  for (const technologyId of technologyIds) {
    await prisma.deviceTechnology.create({ data: { deviceId: device.id, technologyId } });
  }

  await prisma.historyEvent.create({
    data: {
      deviceId: device.id,
      date: new Date(),
      type: "registrierung",
      title: catalogReviewRequired ? "Gerät registriert (Katalogprüfung ausstehend)" : "Gerät registriert",
      description: catalogReviewRequired
        ? "Hersteller/Modell wurden manuell angegeben und warten auf Prüfung durch EuroIPL."
        : "Aufnahme in die digitale Geräteakte anhand der Katalogauswahl.",
      technician: "System",
    },
  });

  revalidatePath("/portal/geraete");
  revalidatePath("/portal");
  redirect(`/portal/geraete/${device.id}`);
}
