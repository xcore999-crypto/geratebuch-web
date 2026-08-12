"use client";

import { useRef, useState } from "react";
import { searchInList } from "@/lib/catalog/search";
import { createDeviceModelAction } from "@/lib/actions/admin";

const fieldClasses =
  "w-full rounded-btn border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20";

type FlatTech = { id: string; nameDe: string; categoryNameDe: string };

export function CreateDeviceModelForm({
  manufacturers,
  technologies,
}: {
  manufacturers: { id: string; name: string }[];
  technologies: FlatTech[];
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [selectedTechIds, setSelectedTechIds] = useState<string[]>([]);
  const [query, setQuery] = useState("");

  const filtered = searchInList(technologies, query, (t) => [t.nameDe, t.categoryNameDe]);

  function toggle(id: string) {
    setSelectedTechIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  return (
    <form
      ref={formRef}
      action={async (formData) => {
        await createDeviceModelAction(formData);
        formRef.current?.reset();
        setSelectedTechIds([]);
      }}
      className="space-y-3"
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <select name="manufacturerId" required defaultValue="" className={fieldClasses}>
          <option value="" disabled>
            Hersteller
          </option>
          {manufacturers.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>
        <input name="modelName" required placeholder="Modellname" className={fieldClasses} />
      </div>
      <input name="description" placeholder="Beschreibung (optional)" className={fieldClasses} />

      <div>
        <p className="mb-1.5 text-xs font-medium text-slate-400">Technologien zuordnen *</p>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Technologie suchen…"
          className={fieldClasses}
        />
        <div className="mt-2 max-h-48 space-y-1 overflow-y-auto rounded-btn border border-white/10 p-2">
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

      <button
        type="submit"
        disabled={selectedTechIds.length === 0}
        className="rounded-btn bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-40"
      >
        Modell anlegen
      </button>
    </form>
  );
}
