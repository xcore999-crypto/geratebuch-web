"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { DarkCard } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Badge";
import { searchInList } from "@/lib/catalog/search";
import { approveReviewDeviceAction } from "@/lib/actions/admin";
import { formatDate } from "@/lib/format";

const fieldClasses =
  "w-full rounded-btn border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20";

type FlatTech = { id: string; nameDe: string; categoryNameDe: string };

export function ReviewDeviceCard({
  device,
  manufacturers,
  technologies,
}: {
  device: {
    id: string;
    serialNumber: string;
    customManufacturer: string | null;
    customModel: string | null;
    registeredAt: Date;
    notes: string | null;
    organization: { name: string };
    location: { name: string } | null;
    technologies: { technology: { id: string; nameDe: string; category: { nameDe: string } } }[];
  };
  manufacturers: { id: string; name: string }[];
  technologies: FlatTech[];
}) {
  const [manufacturerMode, setManufacturerMode] = useState<"existing" | "new">("new");
  const [selectedTechIds, setSelectedTechIds] = useState<string[]>(device.technologies.map((t) => t.technology.id));
  const [query, setQuery] = useState("");
  const [approved, setApproved] = useState(false);

  const filtered = searchInList(technologies, query, (t) => [t.nameDe, t.categoryNameDe]);

  function toggle(id: string) {
    setSelectedTechIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  if (approved) {
    return (
      <DarkCard className="flex items-center gap-3 border-emerald-400/20 bg-emerald-500/10 p-5">
        <Icon name="check-circle" className="h-5 w-5 shrink-0 text-emerald-400" />
        <p className="text-sm text-emerald-200">
          {device.customManufacturer} {device.customModel} wurde bestätigt und dem Katalog zugeordnet.
        </p>
      </DarkCard>
    );
  }

  return (
    <DarkCard className="p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-white">
            {device.customManufacturer} {device.customModel && `— ${device.customModel}`}
          </p>
          <p className="mt-0.5 text-xs text-slate-400">
            {device.organization.name}
            {device.location ? ` · ${device.location.name}` : ""} · SN: {device.serialNumber}
          </p>
          <p className="mt-0.5 text-xs text-slate-500">Eingereicht am {formatDate(device.registeredAt)}</p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {device.technologies.map((t) => (
            <Tag key={t.technology.id}>{t.technology.nameDe}</Tag>
          ))}
        </div>
      </div>

      {device.notes && <p className="mt-3 text-xs leading-relaxed text-slate-400">Kundenhinweis: {device.notes}</p>}

      <form
        action={async (formData) => {
          await approveReviewDeviceAction(formData);
          setApproved(true);
        }}
        className="mt-4 space-y-3 border-t border-white/10 pt-4"
      >
        <input type="hidden" name="deviceId" value={device.id} />

        <div className="flex gap-2 text-xs">
          <button
            type="button"
            onClick={() => setManufacturerMode("new")}
            className={`rounded-btn px-3 py-1.5 font-medium ${manufacturerMode === "new" ? "bg-brand-600 text-white" : "bg-white/5 text-slate-300"}`}
          >
            Neuer Hersteller
          </button>
          <button
            type="button"
            onClick={() => setManufacturerMode("existing")}
            className={`rounded-btn px-3 py-1.5 font-medium ${manufacturerMode === "existing" ? "bg-brand-600 text-white" : "bg-white/5 text-slate-300"}`}
          >
            Bestehender Hersteller
          </button>
        </div>

        {manufacturerMode === "new" ? (
          <>
            <input type="hidden" name="manufacturerChoice" value="new" />
            <input
              name="newManufacturerName"
              defaultValue={device.customManufacturer ?? ""}
              required
              placeholder="Herstellername bestätigen"
              className={fieldClasses}
            />
          </>
        ) : (
          <select name="manufacturerChoice" required defaultValue="" className={fieldClasses}>
            <option value="" disabled>
              Hersteller wählen
            </option>
            {manufacturers.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>
        )}

        <input name="newModelName" defaultValue={device.customModel ?? ""} placeholder="Modellname bestätigen" className={fieldClasses} />

        <div>
          <p className="mb-1.5 text-xs font-medium text-slate-400">Technologie(n) bestätigen *</p>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Technologie suchen…"
            className={fieldClasses}
          />
          <div className="mt-2 max-h-40 space-y-1 overflow-y-auto rounded-btn border border-white/10 p-2">
            {filtered.map((t) => (
              <label key={t.id} className="flex cursor-pointer items-center gap-2.5 rounded-btn px-2.5 py-1.5 text-sm text-slate-300 hover:bg-white/5">
                <input
                  type="checkbox"
                  checked={selectedTechIds.includes(t.id)}
                  onChange={() => toggle(t.id)}
                  className="h-4 w-4 rounded border-white/20 bg-white/5 text-brand-600 focus:ring-brand-500"
                />
                <span className="text-slate-500">{t.categoryNameDe} ·</span> {t.nameDe}
              </label>
            ))}
          </div>
          {selectedTechIds.map((id) => (
            <input key={id} type="hidden" name="technologyIds" value={id} />
          ))}
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <select name="classificationStatus" defaultValue="not_reviewed" className={fieldClasses}>
            <option value="not_reviewed">Klassifizierung: Nicht geprüft</option>
            <option value="review_required">Klassifizierung: Prüfung erforderlich</option>
            <option value="reviewed">Klassifizierung: Geprüft</option>
          </select>
          <input name="classificationNote" placeholder="Notiz zur Klassifizierung (optional)" className={fieldClasses} />
        </div>

        <button
          type="submit"
          disabled={selectedTechIds.length === 0}
          className="inline-flex items-center gap-1.5 rounded-btn bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-40"
        >
          <Icon name="check" className="h-4 w-4" />
          Katalogeintrag bestätigen
        </button>
      </form>
    </DarkCard>
  );
}
