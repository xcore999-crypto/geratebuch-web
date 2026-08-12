import type { Metadata } from "next";
import { PageHeader } from "@/components/portal/PageHeader";
import { DarkCard } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Badge";
import { ToggleActiveButton } from "@/components/admin/ToggleActiveButton";
import { CreateDeviceModelForm } from "@/components/admin/CreateDeviceModelForm";
import { toggleDeviceModelActiveAction } from "@/lib/actions/admin";
import { getAllDeviceModels, getAllManufacturers, getAllTechnologiesFlat } from "@/lib/catalog/queries";

export const metadata: Metadata = { title: "Modelle" };

export default async function AdminModellePage() {
  const [models, manufacturers, technologies] = await Promise.all([
    getAllDeviceModels(),
    getAllManufacturers(),
    getAllTechnologiesFlat(),
  ]);

  return (
    <div>
      <PageHeader title="Gerätemodelle" description="Modelle je Hersteller mit zugeordneten Technologien." />

      <DarkCard className="mb-6 p-5">
        <p className="mb-3 text-sm font-semibold text-white">Neues Modell anlegen</p>
        <CreateDeviceModelForm
          manufacturers={manufacturers.filter((m) => m.active).map((m) => ({ id: m.id, name: m.name }))}
          technologies={technologies.map((t) => ({ id: t.id, nameDe: t.nameDe, categoryNameDe: t.category.nameDe }))}
        />
      </DarkCard>

      <DarkCard className="divide-y divide-white/5 p-2">
        {models.map((model) => (
          <div key={model.id} className="flex flex-wrap items-center justify-between gap-3 p-3.5">
            <div className="min-w-0">
              <p className={`text-sm font-medium ${model.active ? "text-slate-200" : "text-slate-500 line-through"}`}>
                {model.manufacturer.name} {model.modelName}
              </p>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {model.technologies.map((link) => (
                  <Tag key={link.technologyId}>{link.technology.nameDe}</Tag>
                ))}
              </div>
            </div>
            <ToggleActiveButton id={model.id} active={model.active} action={toggleDeviceModelActiveAction} />
          </div>
        ))}
        {models.length === 0 && <p className="p-6 text-center text-sm text-slate-400">Noch keine Modelle im Katalog.</p>}
      </DarkCard>
    </div>
  );
}
