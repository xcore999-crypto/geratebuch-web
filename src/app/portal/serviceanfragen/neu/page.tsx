import { Suspense } from "react";
import type { Metadata } from "next";
import { PortalPageHeader } from "@/components/portal/PortalPageHeader";
import { NewRequestForm } from "@/components/portal/NewRequestForm";
import { prisma } from "@/lib/db";
import { getDemoOrganization } from "@/lib/organization";
import { deviceDisplayName } from "@/lib/device-display";

export const metadata: Metadata = { title: "Neue Serviceanfrage" };
export const dynamic = "force-dynamic";

export default async function NeueServiceanfragePage() {
  const org = await getDemoOrganization();
  const devicesRaw = await prisma.device.findMany({
    where: { organizationId: org.id },
    include: { manufacturer: true, deviceModel: true },
    orderBy: { registeredAt: "desc" },
  });
  const devices = devicesRaw.map((d) => ({
    id: d.id,
    label: `${deviceDisplayName(d)} · ${d.serialNumber}`,
  }));

  return (
    <div className="mx-auto max-w-2xl">
      <PortalPageHeader
        title="Neue Serviceanfrage"
        description="Gerät und Service sind bereits ausgewählt, falls Sie von einer Geräteseite kommen. Der Rest dauert nur eine Minute."
      />
      <Suspense fallback={null}>
        <NewRequestForm devices={devices} />
      </Suspense>
    </div>
  );
}
