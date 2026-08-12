import Link from "next/link";
import type { Metadata } from "next";
import { PortalPageHeader } from "@/components/portal/PortalPageHeader";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { services } from "@/lib/services";

export const metadata: Metadata = { title: "Services" };

export default function PortalServicesPage() {
  return (
    <div>
      <PortalPageHeader
        title="Services"
        description="Derselbe Katalog wie auf geratebuch.de — hier fordern Sie eine Leistung direkt für eines Ihrer registrierten Geräte an."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {services.map((service) => (
          <Card key={service.slug} className="flex flex-col p-5">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <Icon name={service.icon} className="h-5 w-5" />
            </span>
            <p className="mt-4 text-sm font-semibold text-navy-900">{service.name}</p>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500">{service.summary}</p>
            <div className="mt-5 flex items-center gap-2">
              <Link
                href={`/portal/serviceanfragen/neu?service=${service.slug}`}
                className="flex-1 rounded-btn bg-brand-600 px-3 py-2 text-center text-xs font-semibold text-white hover:bg-brand-700"
              >
                Für Gerät anfragen
              </Link>
              <Link
                href={`/leistungen/${service.slug}`}
                className="rounded-btn border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50"
              >
                Details
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
