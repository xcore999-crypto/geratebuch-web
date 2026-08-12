import Link from "next/link";
import type { Metadata } from "next";
import { PortalPageHeader } from "@/components/portal/PortalPageHeader";
import { Card } from "@/components/ui/Card";
import { StatusPill } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { prisma } from "@/lib/db";
import { getDemoOrganization } from "@/lib/organization";
import { requestStatusLabel, requestStatusTone } from "@/lib/status";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = { title: "Serviceanfragen" };
export const dynamic = "force-dynamic";

export default async function ServiceanfragenPage() {
  const org = await getDemoOrganization();
  const requests = await prisma.serviceRequest.findMany({
    where: { organizationId: org.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <PortalPageHeader
        title="Serviceanfragen"
        description="Alle Anfragen mit aktuellem Status und letztem Update."
        actions={
          <Link
            href="/portal/serviceanfragen/neu"
            className="inline-flex items-center gap-1.5 rounded-btn bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
          >
            <Icon name="plus" className="h-4 w-4" />
            Neue Anfrage
          </Link>
        }
      />

      <div className="space-y-3">
        {requests.map((request) => (
          <Card key={request.id} className="p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-medium text-slate-500">{request.publicId} · erstellt am {formatDate(request.createdAt)}</p>
                <p className="mt-1 text-sm font-semibold text-navy-900">{request.serviceName}</p>
                <p className="text-xs text-slate-500">{request.deviceSnapshotName}</p>
              </div>
              <StatusPill tone={requestStatusTone(request.status)}>
                {requestStatusLabel(request.status)}
              </StatusPill>
            </div>
            <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-slate-600">{request.description}</p>
            <div className="mt-4 flex items-start gap-2.5 rounded-btn border border-slate-200 bg-slate-50 p-3">
              <Icon name="chat" className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
              <div className="min-w-0">
                <p className="text-xs text-slate-500">Letztes Update · {formatDate(request.lastUpdate)}</p>
                <p className="mt-0.5 text-sm text-navy-800">{request.lastUpdateNote}</p>
              </div>
            </div>
            {request.scheduledDate && (
              <p className="mt-3 flex items-center gap-1.5 text-xs text-slate-500">
                <Icon name="calendar" className="h-3.5 w-3.5" />
                Termin: {formatDate(request.scheduledDate)}
              </p>
            )}
          </Card>
        ))}
        {requests.length === 0 && (
          <p className="py-10 text-center text-sm text-slate-500">Noch keine Serviceanfragen vorhanden.</p>
        )}
      </div>
    </div>
  );
}
