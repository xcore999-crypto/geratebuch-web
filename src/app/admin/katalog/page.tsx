import Link from "next/link";
import type { Metadata } from "next";
import { PageHeader } from "@/components/portal/PageHeader";
import { StatTile } from "@/components/portal/StatTile";
import { DarkCard } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { prisma } from "@/lib/db";

export const metadata: Metadata = { title: "Übersicht" };

export default async function AdminKatalogPage() {
  const [categoryCount, technologyCount, manufacturerCount, modelCount, reviewCount] = await Promise.all([
    prisma.technologyCategory.count(),
    prisma.technology.count({ where: { active: true } }),
    prisma.manufacturer.count({ where: { active: true } }),
    prisma.deviceModel.count({ where: { active: true } }),
    prisma.device.count({ where: { catalogReviewRequired: true } }),
  ]);

  return (
    <div>
      <PageHeader
        title="Gerätekatalog"
        description="Technologien, Hersteller und Modelle für die geratebuch.de-Geräteregistrierung."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile icon="layers" label="Kategorien" value={categoryCount} />
        <StatTile icon="bolt" label="Technologien" value={technologyCount} />
        <StatTile icon="briefcase" label="Hersteller" value={manufacturerCount} />
        <StatTile icon="device" label="Modelle" value={modelCount} />
      </div>

      {reviewCount > 0 && (
        <DarkCard className="mt-6 flex items-center justify-between gap-4 border-amber-400/20 bg-amber-400/10 p-5">
          <div className="flex items-start gap-3">
            <Icon name="exclamation-triangle" className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />
            <div>
              <p className="text-sm font-semibold text-amber-200">
                {reviewCount} {reviewCount === 1 ? "Gerät wartet" : "Geräte warten"} auf Katalogprüfung
              </p>
              <p className="mt-1 text-xs text-amber-100/80">
                Kunden haben Geräte mit manuell erfassten Hersteller-/Modellangaben registriert.
              </p>
            </div>
          </div>
          <Link
            href="/admin/katalog/pruefung"
            className="shrink-0 rounded-btn bg-amber-400/90 px-4 py-2 text-sm font-semibold text-navy-950 hover:bg-amber-300"
          >
            Jetzt prüfen
          </Link>
        </DarkCard>
      )}

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <Link href="/admin/katalog/technologien">
          <DarkCard className="p-5 hover:border-white/20">
            <Icon name="layers" className="h-5 w-5 text-brand-400" />
            <p className="mt-3 text-sm font-semibold text-white">Technologien verwalten</p>
            <p className="mt-1 text-xs text-slate-400">Kategorien und Technologien anlegen, bearbeiten, deaktivieren.</p>
          </DarkCard>
        </Link>
        <Link href="/admin/katalog/hersteller">
          <DarkCard className="p-5 hover:border-white/20">
            <Icon name="briefcase" className="h-5 w-5 text-brand-400" />
            <p className="mt-3 text-sm font-semibold text-white">Hersteller verwalten</p>
            <p className="mt-1 text-xs text-slate-400">Neue Hersteller anlegen und Duplikate zusammenführen.</p>
          </DarkCard>
        </Link>
        <Link href="/admin/katalog/modelle">
          <DarkCard className="p-5 hover:border-white/20">
            <Icon name="device" className="h-5 w-5 text-brand-400" />
            <p className="mt-3 text-sm font-semibold text-white">Modelle verwalten</p>
            <p className="mt-1 text-xs text-slate-400">Gerätemodelle anlegen und Technologien zuordnen.</p>
          </DarkCard>
        </Link>
      </div>
    </div>
  );
}
