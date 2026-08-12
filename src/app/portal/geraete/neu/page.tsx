import type { Metadata } from "next";
import { PortalPageHeader } from "@/components/portal/PortalPageHeader";
import { DeviceWizard } from "@/components/portal/device-wizard/DeviceWizard";
import { getWizardCatalog } from "@/lib/catalog/queries";
import { getDemoOrganization } from "@/lib/organization";
import { prisma } from "@/lib/db";

export const metadata: Metadata = { title: "Gerät registrieren" };
export const dynamic = "force-dynamic";

export default async function NewDevicePage() {
  const [{ categories, manufacturers, models }, org] = await Promise.all([
    getWizardCatalog(),
    getDemoOrganization(),
  ]);
  const locations = await prisma.location.findMany({ where: { organizationId: org.id }, orderBy: { name: "asc" } });

  return (
    <div className="mx-auto max-w-4xl">
      <PortalPageHeader
        title="Gerät registrieren"
        description="Wählen Sie Technologie, Hersteller und Modell — ist Ihr Gerät nicht gelistet, können Sie es manuell erfassen."
      />
      <DeviceWizard categories={categories} manufacturers={manufacturers} models={models} locations={locations} />
    </div>
  );
}
