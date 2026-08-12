import type { Metadata } from "next";
import { PageHeader } from "@/components/portal/PageHeader";
import { DarkCard } from "@/components/ui/Card";
import { TechnologyRow } from "@/components/admin/TechnologyRow";
import { CreateTechnologyForm } from "@/components/admin/CreateTechnologyForm";
import { getCatalogTree } from "@/lib/catalog/queries";
import { prisma } from "@/lib/db";

export const metadata: Metadata = { title: "Technologien" };

export default async function AdminTechnologienPage() {
  const categories = await prisma.technologyCategory.findMany({
    orderBy: { sortOrder: "asc" },
    include: { technologies: { orderBy: { sortOrder: "asc" } } },
  });
  const activeCategories = await getCatalogTree();

  return (
    <div>
      <PageHeader title="Technologien" description="Kategorien und Technologien für den Gerätekatalog." />

      <DarkCard className="mb-6 p-5">
        <p className="mb-3 text-sm font-semibold text-white">Neue Technologie anlegen</p>
        <CreateTechnologyForm categories={activeCategories.map((c) => ({ id: c.id, nameDe: c.nameDe }))} />
      </DarkCard>

      <div className="space-y-6">
        {categories.map((category) => (
          <DarkCard key={category.id} className="p-5">
            <p className="text-sm font-semibold text-white">
              {category.nameDe} <span className="text-xs font-normal text-slate-500">({category.technologies.length})</span>
            </p>
            <div className="mt-3 space-y-1.5">
              {category.technologies.map((tech) => (
                <TechnologyRow
                  key={tech.id}
                  id={tech.id}
                  nameDe={tech.nameDe}
                  nameEn={tech.nameEn}
                  synonyms={tech.synonyms}
                  active={tech.active}
                />
              ))}
            </div>
          </DarkCard>
        ))}
      </div>
    </div>
  );
}
