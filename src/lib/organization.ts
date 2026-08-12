import { prisma } from "@/lib/db";

/**
 * Stands in for "the logged-in client's organization". There is no auth
 * system yet (see project limitations); the demo tenant loaded from
 * prisma/seed.sql is used as the current organization everywhere in the
 * client portal.
 */
export async function getDemoOrganization() {
  const org = await prisma.organization.findFirst({ orderBy: { createdAt: "asc" } });
  if (!org) throw new Error("Keine Organisation gefunden. Bitte `npm run db:seed:local` ausführen.");
  return org;
}
