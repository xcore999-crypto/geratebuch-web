import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortalPageHeader } from "@/components/portal/PortalPageHeader";
import { Card } from "@/components/ui/Card";
import { StatusPill } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { prisma } from "@/lib/db";
import { services } from "@/lib/services";
import {
  deviceStatusTone,
  deviceStatusLabel,
  historyTypeIcon,
  requestStatusLabel,
  requestStatusTone,
  classificationLabel,
  classificationTone,
} from "@/lib/status";
import { deviceDisplayName, deviceManufacturerName, deviceModelName } from "@/lib/device-display";
import { formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

async function getDevice(id: string) {
  return prisma.device.findUnique({
    where: { id },
    include: {
      manufacturer: true,
      deviceModel: true,
      location: true,
      technologies: { include: { technology: { include: { category: true } } } },
      history: { orderBy: { date: "desc" }, include: { document: true } },
      documents: { orderBy: { date: "desc" } },
      serviceRequests: { orderBy: { createdAt: "desc" } },
    },
  });
}

export async function generateMetadata(props: PageProps<"/portal/geraete/[id]">): Promise<Metadata> {
  const { id } = await props.params;
  const device = await getDevice(id);
  return { title: device ? deviceDisplayName(device) : "Gerät" };
}

export default async function DeviceDetailPage(props: PageProps<"/portal/geraete/[id]">) {
  const { id } = await props.params;
  const device = await getDevice(id);
  if (!device) notFound();

  const manufacturer = deviceManufacturerName(device);
  const model = deviceModelName(device);
  const techLabel = device.technologies.map((t) => t.technology.nameDe).join(", ") || "—";

  return (
    <div>
      <Link
        href="/portal/geraete"
        className="mb-4 inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-navy-900"
      >
        <Icon name="chevron-right" className="h-3.5 w-3.5 rotate-180" />
        Meine Geräte
      </Link>

      <PortalPageHeader
        title={deviceDisplayName(device)}
        description={`${techLabel} · SN: ${device.serialNumber}${device.location ? " · " + device.location.name : ""}`}
        actions={
          <Link
            href={`/portal/serviceanfragen/neu?device=${device.id}`}
            className="inline-flex items-center gap-1.5 rounded-btn bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
          >
            <Icon name="plus" className="h-4 w-4" />
            Service für dieses Gerät anfragen
          </Link>
        }
      />

      {device.catalogReviewRequired && (
        <div className="mb-6 flex items-start gap-3 rounded-card border border-amber-200 bg-amber-50 p-4">
          <Icon name="exclamation-triangle" className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
          <div>
            <p className="text-sm font-semibold text-amber-900">Katalogprüfung ausstehend</p>
            <p className="mt-1 text-xs leading-relaxed text-amber-800">
              Hersteller und Modell wurden manuell erfasst und warten auf Bestätigung durch EuroIPL.
              Ihre Daten bleiben dabei vollständig erhalten.
            </p>
          </div>
        </div>
      )}

      <div className="grid gap-6 xl:grid-cols-[1fr_1.4fr]">
        <div className="space-y-6">
          <Card className="p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-navy-900">Identifikation</p>
              <StatusPill tone={deviceStatusTone(device.status)}>{deviceStatusLabel(device.status)}</StatusPill>
            </div>
            <dl className="mt-4 space-y-3 text-sm">
              {[
                ["Hersteller", manufacturer],
                ["Modell", model ?? "—"],
                ["Technologie(n)", techLabel],
                ["Seriennummer", device.serialNumber],
                ["Standort", device.location?.name ?? "—"],
                ["Registriert am", formatDate(device.registeredAt)],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between gap-4 border-b border-slate-100 pb-2.5 last:border-0 last:pb-0">
                  <dt className="text-slate-500">{label}</dt>
                  <dd className="text-right font-medium text-navy-800">{value}</dd>
                </div>
              ))}
            </dl>
          </Card>

          <Card className="p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-navy-900">Rechtliche/technische Klassifizierung</p>
              <StatusPill tone={classificationTone(device.classificationStatus)}>
                {classificationLabel(device.classificationStatus)}
              </StatusPill>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-slate-500">
              {device.classificationNote ??
                "Die Technologiezuordnung ist informativ und stellt keine automatische rechtliche Einstufung (z. B. NiSV, STK, DGUV) dar. Diese bestätigt EuroIPL gesondert."}
            </p>
          </Card>

          <Card className="p-5">
            <p className="text-sm font-semibold text-navy-900">Service jetzt</p>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex items-center justify-between gap-4">
                <dt className="text-slate-500">Letzter Service</dt>
                <dd className="text-right font-medium text-navy-800">
                  {device.lastServiceDate ? formatDate(device.lastServiceDate) : "Noch kein Service"}
                </dd>
              </div>
              {device.lastServiceType && (
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-slate-500">Art</dt>
                  <dd className="text-right font-medium text-navy-800">{device.lastServiceType}</dd>
                </div>
              )}
              <div className="flex items-center justify-between gap-4">
                <dt className="text-slate-500">Nächster Termin</dt>
                <dd className="text-right font-medium text-navy-800">
                  {device.nextServiceDate ? formatDate(device.nextServiceDate) : "—"}
                </dd>
              </div>
              {device.nextServiceReason && (
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-slate-500">Grund</dt>
                  <dd className="text-right font-medium text-navy-800">{device.nextServiceReason}</dd>
                </div>
              )}
            </dl>
          </Card>

          <Card className="p-5">
            <p className="text-sm font-semibold text-navy-900">Service anfragen</p>
            <div className="mt-4 grid grid-cols-2 gap-2.5">
              {services.map((service) => (
                <Link
                  key={service.slug}
                  href={`/portal/serviceanfragen/neu?device=${device.id}&service=${service.slug}`}
                  className="flex items-center gap-2 rounded-btn border border-slate-200 bg-white px-3 py-2.5 text-xs font-medium text-navy-800 hover:border-brand-300 hover:bg-brand-50"
                >
                  <Icon name={service.icon} className="h-4 w-4 shrink-0 text-brand-600" />
                  {service.shortName}
                </Link>
              ))}
            </div>
          </Card>

          {device.serviceRequests.length > 0 && (
            <Card className="p-5">
              <p className="text-sm font-semibold text-navy-900">Anfragen zu diesem Gerät</p>
              <div className="mt-4 space-y-3">
                {device.serviceRequests.map((request) => (
                  <Link
                    key={request.id}
                    href="/portal/serviceanfragen"
                    className="block rounded-btn border border-slate-200 bg-white p-3 hover:bg-slate-50"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs text-slate-500">{request.publicId}</span>
                      <StatusPill tone={requestStatusTone(request.status)}>
                        {requestStatusLabel(request.status)}
                      </StatusPill>
                    </div>
                    <p className="mt-1.5 text-sm text-navy-800">{request.serviceName}</p>
                  </Link>
                ))}
              </div>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          {(device.devicePhotoUrl || device.typenschildPhotoUrl) && (
            <Card className="p-5">
              <p className="text-sm font-semibold text-navy-900">Fotos</p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {device.devicePhotoUrl && (
                  <div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={device.devicePhotoUrl} alt="Gerätefoto" className="aspect-square w-full rounded-btn object-cover" />
                    <p className="mt-1.5 text-center text-xs text-slate-500">Gerätefoto</p>
                  </div>
                )}
                {device.typenschildPhotoUrl && (
                  <div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={device.typenschildPhotoUrl} alt="Typenschild" className="aspect-square w-full rounded-btn object-cover" />
                    <p className="mt-1.5 text-center text-xs text-slate-500">Typenschild</p>
                  </div>
                )}
              </div>
            </Card>
          )}

          <Card className="p-5">
            <p className="text-sm font-semibold text-navy-900">Historie</p>
            {device.history.length === 0 ? (
              <p className="mt-4 text-sm text-slate-500">Noch keine Einträge vorhanden.</p>
            ) : (
              <ol className="mt-5 space-y-6 border-l border-slate-200 pl-5">
                {device.history.map((event) => (
                  <li key={event.id} className="relative">
                    <span className="absolute -left-[1.65rem] flex h-6 w-6 items-center justify-center rounded-full bg-brand-50 ring-4 ring-white text-brand-600">
                      <Icon name={historyTypeIcon(event.type)} className="h-3 w-3" />
                    </span>
                    <p className="text-xs text-slate-500">{formatDate(event.date)} · {event.technician}</p>
                    <p className="mt-1 text-sm font-medium text-navy-900">{event.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-slate-500">{event.description}</p>
                  </li>
                ))}
              </ol>
            )}
          </Card>

          <Card className="p-5">
            <p className="text-sm font-semibold text-navy-900">Dokumente</p>
            {device.documents.length === 0 ? (
              <p className="mt-4 text-sm text-slate-500">Noch keine Dokumente vorhanden.</p>
            ) : (
              <div className="mt-4 divide-y divide-slate-100">
                {device.documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between gap-4 py-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <Icon name="document" className="h-4 w-4 shrink-0 text-slate-400" />
                      <div className="min-w-0">
                        <p className="truncate text-sm text-navy-800">{doc.title}</p>
                        <p className="text-xs text-slate-500">
                          {doc.type} · {formatDate(doc.date)} · {doc.fileSize}
                        </p>
                      </div>
                    </div>
                    <Icon name="download" className="h-4 w-4 shrink-0 text-slate-400" />
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
