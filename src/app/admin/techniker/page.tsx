import type { Metadata } from "next";
import { PageHeader } from "@/components/portal/PageHeader";
import { DarkCard } from "@/components/ui/Card";
import { StatusPill } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { prisma } from "@/lib/db";
import { requestStatusLabel, requestStatusTone, historyTypeIcon } from "@/lib/status";
import { deviceDisplayName } from "@/lib/device-display";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = { title: "Techniker-Ansicht" };

export default async function TechnikerPage() {
  const assignments = await prisma.serviceRequest.findMany({
    where: { status: { in: ["eingeplant", "in_bearbeitung"] } },
    include: {
      organization: true,
      device: {
        include: {
          manufacturer: true,
          deviceModel: true,
          location: true,
          technologies: { include: { technology: true } },
          history: { orderBy: { date: "desc" }, take: 3 },
        },
      },
    },
    orderBy: { scheduledDate: "asc" },
  });

  return (
    <div>
      <PageHeader
        title="Techniker-Ansicht"
        description="Eingeplante und laufende Einsätze mit Gerätekontext — minimaler mobiler Modus für einen Techniker."
      />

      <div className="space-y-4">
        {assignments.map((request) => (
          <DarkCard key={request.id} className="p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-medium text-slate-400">{request.publicId}</p>
                <p className="mt-1 text-sm font-semibold text-white">{request.serviceName}</p>
                <p className="text-xs text-slate-400">{request.organization.name}</p>
              </div>
              <StatusPill tone={requestStatusTone(request.status)}>{requestStatusLabel(request.status)}</StatusPill>
            </div>

            <div className="mt-4 grid gap-4 border-t border-white/10 pt-4 sm:grid-cols-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Gerät</p>
                <dl className="mt-2 space-y-1.5 text-sm">
                  <div className="flex justify-between gap-3">
                    <dt className="text-slate-400">Hersteller / Modell</dt>
                    <dd className="text-right text-slate-200">{deviceDisplayName(request.device)}</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-slate-400">Technologie</dt>
                    <dd className="text-right text-slate-200">
                      {request.device.technologies.map((t) => t.technology.nameDe).join(", ") || "—"}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-slate-400">Seriennummer</dt>
                    <dd className="text-right text-slate-200">{request.device.serialNumber}</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-slate-400">Standort</dt>
                    <dd className="text-right text-slate-200">{request.device.location?.name ?? "—"}</dd>
                  </div>
                </dl>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Letzte Historie</p>
                <ul className="mt-2 space-y-2">
                  {request.device.history.map((event) => (
                    <li key={event.id} className="flex items-start gap-2 text-sm">
                      <Icon name={historyTypeIcon(event.type)} className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-400" />
                      <span className="text-slate-300">
                        {formatDate(event.date)} — {event.title}
                      </span>
                    </li>
                  ))}
                  {request.device.history.length === 0 && <li className="text-sm text-slate-500">Keine Historie vorhanden.</li>}
                </ul>
              </div>
            </div>
          </DarkCard>
        ))}
        {assignments.length === 0 && (
          <p className="py-10 text-center text-sm text-slate-400">Aktuell keine eingeplanten Einsätze.</p>
        )}
      </div>
    </div>
  );
}
