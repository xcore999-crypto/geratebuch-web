import Link from "next/link";
import type { Metadata } from "next";
import { PortalPageHeader } from "@/components/portal/PortalPageHeader";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { prisma } from "@/lib/db";
import { getDemoOrganization } from "@/lib/organization";
import { deviceDisplayName } from "@/lib/device-display";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = { title: "Dokumente" };
export const dynamic = "force-dynamic";

export default async function DokumentePage() {
  const org = await getDemoOrganization();
  const documents = await prisma.document.findMany({
    where: { device: { organizationId: org.id } },
    include: { device: { include: { manufacturer: true, deviceModel: true } } },
    orderBy: { date: "desc" },
  });

  return (
    <div>
      <PortalPageHeader
        title="Dokumente"
        description="Alle Serviceberichte und Prüfprotokolle Ihrer Geräte an einem Ort."
      />

      <Card className="divide-y divide-slate-100 p-2">
        {documents.map((doc) => (
          <div key={doc.id} className="flex flex-wrap items-center justify-between gap-4 p-4">
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
                <Icon name="document" className="h-4.5 w-4.5" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-navy-900">{doc.title}</p>
                <Link
                  href={`/portal/geraete/${doc.deviceId}`}
                  className="text-xs text-brand-700 hover:text-brand-800"
                >
                  {deviceDisplayName(doc.device)}
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Tag>{doc.type}</Tag>
              <span className="text-xs text-slate-500">{formatDate(doc.date)}</span>
              <span className="hidden text-xs text-slate-500 sm:inline">{doc.fileSize}</span>
              <button
                type="button"
                className="flex h-8 w-8 items-center justify-center rounded-btn text-slate-400 hover:bg-slate-100 hover:text-navy-900"
                aria-label={`${doc.title} herunterladen`}
              >
                <Icon name="download" className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
        {documents.length === 0 && (
          <p className="p-8 text-center text-sm text-slate-500">Noch keine Dokumente vorhanden.</p>
        )}
      </Card>
    </div>
  );
}
