import type { Metadata } from "next";
import { PortalPageHeader } from "@/components/portal/PortalPageHeader";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { prisma } from "@/lib/db";
import { getDemoOrganization } from "@/lib/organization";
import { formatDateLong } from "@/lib/format";

export const metadata: Metadata = { title: "Unternehmen" };
export const dynamic = "force-dynamic";

export default async function UnternehmenPage() {
  const org = await getDemoOrganization();
  const [deviceCount, locations] = await Promise.all([
    prisma.device.count({ where: { organizationId: org.id } }),
    prisma.location.findMany({ where: { organizationId: org.id } }),
  ]);
  const primaryLocation = locations[0];

  return (
    <div>
      <PortalPageHeader title="Unternehmen" description="Ihre Stamm- und Kontaktdaten bei geratebuch.de." />

      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <Icon name="briefcase" className="h-5 w-5" />
            </span>
            <div>
              <p className="text-base font-semibold text-navy-900">{org.name}</p>
              <p className="text-xs text-slate-500">Kunde seit {formatDateLong(org.customerSince)}</p>
            </div>
          </div>

          <dl className="mt-6 space-y-4 text-sm">
            <div className="flex items-start gap-3">
              <Icon name="map-pin" className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
              <div>
                <dt className="text-xs text-slate-500">Standort</dt>
                <dd className="text-navy-800">{primaryLocation?.address ?? "—"}</dd>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Icon name="user" className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
              <div>
                <dt className="text-xs text-slate-500">Ansprechpartner:in</dt>
                <dd className="text-navy-800">{org.contactPerson}</dd>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Icon name="envelope" className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
              <div>
                <dt className="text-xs text-slate-500">E-Mail</dt>
                <dd className="text-navy-800">{org.email}</dd>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Icon name="phone" className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
              <div>
                <dt className="text-xs text-slate-500">Telefon</dt>
                <dd className="text-navy-800">{org.phone}</dd>
              </div>
            </div>
          </dl>

          <a
            href={`mailto:${org.email}?subject=Änderung%20der%20Unternehmensdaten`}
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-800"
          >
            <Icon name="envelope" className="h-4 w-4" />
            Änderungen an unser Team melden
          </a>
        </Card>

        <Card className="p-6">
          <p className="text-sm font-semibold text-navy-900">Auf einen Blick</p>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <dt className="text-slate-500">Registrierte Geräte</dt>
              <dd className="font-medium text-navy-800">{deviceCount}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-slate-500">Standorte</dt>
              <dd className="font-medium text-navy-800">{locations.length}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-slate-500">Kundenbereich</dt>
              <dd className="font-medium text-navy-800">Aktiv</dd>
            </div>
          </dl>
        </Card>
      </div>
    </div>
  );
}
