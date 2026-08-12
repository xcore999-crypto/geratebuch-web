import { prisma } from "@/lib/db";
import { normalizeText } from "./normalize";

export async function getCatalogTree() {
  return prisma.technologyCategory.findMany({
    where: { active: true },
    orderBy: { sortOrder: "asc" },
    include: {
      technologies: {
        where: { active: true },
        orderBy: { sortOrder: "asc" },
      },
    },
  });
}

export async function getAllTechnologiesFlat() {
  return prisma.technology.findMany({
    include: { category: true },
    orderBy: [{ category: { sortOrder: "asc" } }, { sortOrder: "asc" }],
  });
}

export async function getAllManufacturers() {
  return prisma.manufacturer.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { deviceModels: true, devices: true } } },
  });
}

export async function getManufacturersForTechnology(technologyId: string) {
  return prisma.manufacturer.findMany({
    where: {
      active: true,
      deviceModels: { some: { active: true, technologies: { some: { technologyId } } } },
    },
    orderBy: { name: "asc" },
  });
}

export async function getModelsForManufacturerAndTechnology(manufacturerId: string, technologyId: string) {
  return prisma.deviceModel.findMany({
    where: { manufacturerId, active: true, technologies: { some: { technologyId } } },
    include: { technologies: { include: { technology: true } } },
    orderBy: { modelName: "asc" },
  });
}

export async function getAllDeviceModels() {
  return prisma.deviceModel.findMany({
    include: {
      manufacturer: true,
      technologies: { include: { technology: { include: { category: true } } } },
    },
    orderBy: { modelName: "asc" },
  });
}

/** Full catalog snapshot shipped to the client-side registration wizard once. */
export async function getWizardCatalog() {
  const [categories, manufacturers, models] = await Promise.all([
    getCatalogTree(),
    prisma.manufacturer.findMany({ where: { active: true }, orderBy: { name: "asc" } }),
    prisma.deviceModel.findMany({
      where: { active: true },
      include: { technologies: true },
      orderBy: { modelName: "asc" },
    }),
  ]);
  return { categories, manufacturers, models };
}

export async function getReviewQueue() {
  return prisma.device.findMany({
    where: { catalogReviewRequired: true },
    include: {
      organization: true,
      location: true,
      technologies: { include: { technology: { include: { category: true } } } },
    },
    orderBy: { registeredAt: "desc" },
  });
}

/**
 * Finds a manufacturer by normalized identity or creates it. Guarantees no
 * duplicate manufacturers from casing/punctuation differences.
 */
export async function findOrCreateManufacturer(name: string) {
  const trimmed = name.trim();
  const normalizedName = normalizeText(trimmed);
  const existing = await prisma.manufacturer.findUnique({ where: { normalizedName } });
  if (existing) return existing;
  return prisma.manufacturer.create({ data: { name: trimmed, normalizedName } });
}

export async function findOrCreateDeviceModel(manufacturerId: string, modelName: string) {
  const trimmed = modelName.trim();
  const normalizedName = normalizeText(trimmed);
  const existing = await prisma.deviceModel.findUnique({
    where: { manufacturerId_normalizedName: { manufacturerId, normalizedName } },
  });
  if (existing) return existing;
  return prisma.deviceModel.create({ data: { manufacturerId, modelName: trimmed, normalizedName } });
}
