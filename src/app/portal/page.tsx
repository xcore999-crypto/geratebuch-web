import Link from "next/link";
import type { Metadata } from "next";
import { PortalPageHeader } from "@/components/portal/PortalPageHeader";
import { PortalStatTile } from "@/components/portal/PortalStatTile";
import { Card } from "@/components/ui/Card";
import { StatusPill } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { prisma } from "@/lib/db";
import { getDemoOrganization } from "@/lib/organization";
import { deviceStatusTone, deviceStatusLabel, requestStatusLabel, requestStatusTone } from "@/lib/status";
import { deviceDisplayName } from "@/lib/device-display";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = { title: "Übersicht" };
export const dynamic = "force-dynamic";

export default async function PortalDashboardPage() {
  const org = await getDemoOrganization();

  const [devices, openRequests, documentsCount, recentDocuments] = await Promise.all([
    prisma.device.findMany({
      where: { organizationId: org.id },
      include: { manufacturer: true, deviceModel: true },
      orderBy: { registeredAt: "desc" },
    }),
    prisma.serviceRequest.findMany({
      where: { organizationId: org.id, status: { notIn: ["abgeschlossen", "storniert"] } },
      orderBy: { createdAt: "desc" },
    }),
    prisma.document.count({ where: { device: { organizationId: org.id } } }),
    prisma.document.findMany({
      where: { device: { organizationId: org.id } },
      orderBy: { date: "desc" },
      take: 4,
    }),
  ]);

  const attentionCount = devices.filter((d) => d.status !== "ok").length;

  return (
    <div>
      <PortalPageHeader
        title="Übersicht"
        description={`Willkommen zurück, ${org.contactPerson}. Hier ist der aktuelle Stand für ${org.name}.`}
        actions={
          <Link
            href="/portal/serviceanfragen/neu"
            className="inline-flex items-center gap-1.5 rounded-btn bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
          >
            <Icon name="plus" className="h-4 w-4" />
            Service anfragen
          </Link>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <PortalStatTile icon="device" label="Geräte gesamt" value={devices.length} color="blue" />
        <PortalStatTile
          icon="exclamation-triangle"
          label="Benötigen Aufmerksamkeit"
          value={attentionCount}
          sub="Wartung fällig oder überfällig"
          color="rose"
        />
        <PortalStatTile icon="inbox" label="Offene Anfragen" value={openRequests.length} color="amber" />
        <PortalStatTile icon="document" label="Dokumente gesamt" value={documentsCount} color="violet" />
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-navy-900">Ihre Geräte</p>
            <Link href="/portal/geraete" className="text-xs font-semibold text-brand-700 hover:text-brand-800">
              Alle anzeigen
            </Link>
          </div>
          <div className="mt-4 divide-y divide-slate-100 overflow-hidden rounded-btn border border-slate-200">
            {devices.map((device) => (
              <Link
                key={device.id}
                href={`/portal/geraete/${device.id}`}
                className="flex items-center justify-between gap-4 px-4 py-3.5 hover:bg-slate-50"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-navy-900">{deviceDisplayName(device)}</p>
                  <p className="mt-0.5 text-xs text-slate-500">
                    SN: {device.serialNumber} · Letzter Service{" "}
                    {device.lastServiceDate ? formatDate(device.lastServiceDate) : "—"}
                  </p>
                </div>
                <StatusPill tone={deviceStatusTone(device.status)} className="shrink-0">
                  {deviceStatusLabel(device.status)}
                </StatusPill>
              </Link>
            ))}
            {devices.length === 0 && <p className="px-4 py-6 text-sm text-slate-500">Noch keine Geräte registriert.</p>}
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-navy-900">Offene Anfragen</p>
            <Link href="/portal/serviceanfragen" className="text-xs font-semibold text-brand-700 hover:text-brand-800">
              Alle anzeigen
            </Link>
          </div>
          {openRequests.length === 0 ? (
            <p className="mt-6 text-sm text-slate-500">Aktuell keine offenen Anfragen.</p>
          ) : (
            <div className="mt-4 space-y-3">
              {openRequests.map((request) => (
                <Link
                  key={request.id}
                  href="/portal/serviceanfragen"
                  className="block rounded-btn border border-slate-200 bg-white p-3.5 hover:bg-slate-50"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-medium text-slate-500">{request.publicId}</span>
                    <StatusPill tone={requestStatusTone(request.status)}>
                      {requestStatusLabel(request.status)}
                    </StatusPill>
                  </div>
                  <p className="mt-2 text-sm font-medium text-navy-900">{request.serviceName}</p>
                  <p className="text-xs text-slate-500">{request.deviceSnapshotName}</p>
                </Link>
              ))}
            </div>
          )}
        </Card>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-navy-900">Neueste Dokumente</p>
            <Link href="/portal/dokumente" className="text-xs font-semibold text-brand-700 hover:text-brand-800">
              Alle anzeigen
            </Link>
          </div>
          <div className="mt-4 divide-y divide-slate-100">
            {recentDocuments.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between gap-4 py-3">
                <div className="flex min-w-0 items-center gap-3">
                  <Icon name="document" className="h-4 w-4 shrink-0 text-slate-400" />
                  <div className="min-w-0">
                    <p className="truncate text-sm text-navy-800">{doc.title}</p>
                    <p className="text-xs text-slate-500">{formatDate(doc.date)} · {doc.fileSize}</p>
                  </div>
                </div>
                <Icon name="download" className="h-4 w-4 shrink-0 text-slate-400" />
              </div>
            ))}
            {recentDocuments.length === 0 && <p className="py-6 text-sm text-slate-500">Noch keine Dokumente vorhanden.</p>}
          </div>
        </Card>

        <div className="flex flex-col justify-between rounded-card bg-gradient-to-br from-teal-600 to-brand-700 p-6">
          <div>
            <Icon name="wrench" className="h-7 w-7 text-white" />
            <p className="mt-3 text-lg font-semibold text-white">Ihr komplettes Leistungsangebot</p>
            <p className="mt-1.5 text-sm text-white/80">
              Wartung, STK, Reparatur, DGUV V3, Laserschutz und Beratung — alles
              für ein Gerät direkt anfragbar.
            </p>
          </div>
          <Link
            href="/portal/services"
            className="mt-5 inline-flex items-center justify-center gap-1.5 rounded-btn bg-white px-4 py-2.5 text-sm font-semibold text-navy-900 hover:bg-white/90"
          >
            Zum Servicekatalog
            <Icon name="arrow-right" className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
