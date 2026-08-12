"use client";

import { useRef } from "react";
import { Icon } from "@/components/ui/Icon";
import { mergeManufacturersAction } from "@/lib/actions/admin";

const fieldClasses =
  "w-full rounded-btn border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-white focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20";

export function MergeManufacturersForm({ manufacturers }: { manufacturers: { id: string; name: string }[] }) {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={formRef}
      action={async (formData) => {
        await mergeManufacturersAction(formData);
        formRef.current?.reset();
      }}
      className="grid items-end gap-3 sm:grid-cols-[1fr_auto_1fr_auto]"
    >
      <div>
        <label className="mb-1.5 block text-xs font-medium text-slate-400">Duplikat (wird deaktiviert)</label>
        <select name="duplicateId" required defaultValue="" className={fieldClasses}>
          <option value="" disabled>
            Hersteller wählen
          </option>
          {manufacturers.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>
      </div>
      <Icon name="arrow-right" className="hidden h-4 w-4 shrink-0 text-slate-500 sm:block" />
      <div>
        <label className="mb-1.5 block text-xs font-medium text-slate-400">Ziel (bleibt aktiv)</label>
        <select name="primaryId" required defaultValue="" className={fieldClasses}>
          <option value="" disabled>
            Hersteller wählen
          </option>
          {manufacturers.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className="rounded-btn border border-amber-400/30 bg-amber-400/10 px-4 py-2.5 text-sm font-semibold text-amber-200 hover:bg-amber-400/20">
        Zusammenführen
      </button>
    </form>
  );
}
