import type { Metadata } from "next";
import { PageHeader } from "@/components/portal/PageHeader";
import { ReviewDeviceCard } from "@/components/admin/ReviewDeviceCard";
import { getReviewQueue, getAllManufacturers, getAllTechnologiesFlat } from "@/lib/catalog/queries";

export const metadata: Metadata = { title: "Prüfung ausstehend" };

export default async function AdminReviewQueuePage() {
  const [queue, manufacturers, technologies] = await Promise.all([
    getReviewQueue(),
    getAllManufacturers(),
    getAllTechnologiesFlat(),
  ]);

  return (
    <div>
      <PageHeader
        title="Prüfung ausstehend"
        description="Geräte, die Kundinnen und Kunden über den Katalog-Fallback registriert haben."
      />

      <div className="space-y-4">
        {queue.map((device) => (
          <ReviewDeviceCard
            key={device.id}
            device={device}
            manufacturers={manufacturers.filter((m) => m.active).map((m) => ({ id: m.id, name: m.name }))}
            technologies={technologies.map((t) => ({ id: t.id, nameDe: t.nameDe, categoryNameDe: t.category.nameDe }))}
          />
        ))}
        {queue.length === 0 && (
          <p className="py-10 text-center text-sm text-slate-400">Aktuell keine Geräte zur Prüfung.</p>
        )}
      </div>
    </div>
  );
}
