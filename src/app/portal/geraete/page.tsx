import Link from "next/link";
import type { Metadata } from "next";
import { PortalPageHeader } from "@/components/portal/PortalPageHeader";
import { Card } from "@/components/ui/Card";
import { StatusPill } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { prisma } from "@/lib/db";
import { getDemoOrganization } from "@/lib/organization";
import { deviceStatusTone, deviceStatusLabel } from "@/lib/status";
import { deviceDisplayName } from "@/lib/device-display";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = { title: "Meine Geräte" };
export const dynamic = "force-dynamic";

export default async function GeraetePage() {
  const org = await getDemoOrganization();
  const devices = await prisma.device.findMany({
    where: { organizationId: org.id },
    include: {
      manufacturer: true,
      deviceModel: true,
      location: true,
      technologies: { include: { technology: true } },
    },
    orderBy: { registeredAt: "desc" },
  });

  return (
    <div>
      <PortalPageHeader
        title="Meine Geräte"
        description={`${devices.length} registrierte Geräte für ${org.name}.`}
        actions={
          <Link
            href="/portal/geraete/neu"
            className="inline-flex items-center gap-1.5 rounded-btn bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
          >
            <Icon name="plus" className="h-4 w-4" />
            Gerät registrieren
          </Link>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {devices.map((device) => (
          <Link key={device.id} href={`/portal/geraete/${device.id}`}>
            <Card className="h-full p-5 transition hover:border-brand-300 hover:shadow-card-hover">
              <div className="flex items-start justify-between gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <Icon name="device" className="h-5 w-5" />
                </span>
                <div className="flex flex-col items-end gap-1.5">
                  <StatusPill tone={deviceStatusTone(device.status)}>{deviceStatusLabel(device.status)}</StatusPill>
                  {device.catalogReviewRequired && (
                    <StatusPill tone="warning">Katalogprüfung ausstehend</StatusPill>
                  )}
                </div>
              </div>
              <p className="mt-4 text-sm font-semibold text-navy-900">{deviceDisplayName(device)}</p>
              <p className="mt-0.5 text-xs text-slate-500">
                {device.technologies.map((t) => t.technology.nameDe).join(", ") || "Technologie unbekannt"}
              </p>
              <div className="mt-4 space-y-1.5 border-t border-slate-100 pt-4 text-xs text-slate-500">
                <p>SN: {device.serialNumber}</p>
                <p>{device.location?.name ?? "Kein Standort hinterlegt"}</p>
                {device.nextServiceDate && <p>Nächster Termin: {formatDate(device.nextServiceDate)}</p>}
              </div>
            </Card>
          </Link>
        ))}
        {devices.length === 0 && (
          <p className="col-span-full py-10 text-center text-sm text-slate-500">
            Noch keine Geräte registriert. Starten Sie mit &bdquo;Gerät registrieren&ldquo;.
          </p>
        )}
      </div>
    </div>
  );
}
