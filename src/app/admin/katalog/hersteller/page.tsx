import type { Metadata } from "next";
import { PageHeader } from "@/components/portal/PageHeader";
import { DarkCard } from "@/components/ui/Card";
import { CreateManufacturerForm } from "@/components/admin/CreateManufacturerForm";
import { MergeManufacturersForm } from "@/components/admin/MergeManufacturersForm";
import { ToggleActiveButton } from "@/components/admin/ToggleActiveButton";
import { toggleManufacturerActiveAction } from "@/lib/actions/admin";
import { getAllManufacturers } from "@/lib/catalog/queries";

export const metadata: Metadata = { title: "Hersteller" };

export default async function AdminHerstellerPage() {
  const manufacturers = await getAllManufacturers();
  const activeManufacturers = manufacturers.filter((m) => m.active);

  return (
    <div>
      <PageHeader title="Hersteller" description="Herstellerkatalog verwalten und Duplikate zusammenführen." />

      <DarkCard className="mb-6 p-5">
        <p className="mb-3 text-sm font-semibold text-white">Neuen Hersteller anlegen</p>
        <CreateManufacturerForm />
      </DarkCard>

      {activeManufacturers.length > 1 && (
        <DarkCard className="mb-6 p-5">
          <p className="mb-1 text-sm font-semibold text-white">Duplikate zusammenführen</p>
          <p className="mb-3 text-xs text-slate-400">
            Alle Modelle und Geräte des Duplikats werden dem Zielhersteller zugeordnet.
          </p>
          <MergeManufacturersForm manufacturers={activeManufacturers.map((m) => ({ id: m.id, name: m.name }))} />
        </DarkCard>
      )}

      <DarkCard className="divide-y divide-white/5 p-2">
        {manufacturers.map((m) => (
          <div key={m.id} className="flex items-center justify-between gap-3 p-3.5">
            <div className="min-w-0">
              <p className={`truncate text-sm font-medium ${m.active ? "text-slate-200" : "text-slate-500 line-through"}`}>
                {m.name}
              </p>
              <p className="mt-0.5 text-xs text-slate-500">
                {m._count.deviceModels} Modelle · {m._count.devices} Geräte{m.country ? ` · ${m.country}` : ""}
              </p>
            </div>
            <ToggleActiveButton id={m.id} active={m.active} action={toggleManufacturerActiveAction} />
          </div>
        ))}
      </DarkCard>
    </div>
  );
}
