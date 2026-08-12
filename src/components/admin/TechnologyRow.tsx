"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { updateTechnologyAction, toggleTechnologyActiveAction } from "@/lib/actions/admin";

const fieldClasses =
  "w-full rounded-btn border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20";

export function TechnologyRow({
  id,
  nameDe,
  nameEn,
  synonyms,
  active,
}: {
  id: string;
  nameDe: string;
  nameEn: string;
  synonyms: string | null;
  active: boolean;
}) {
  const [editing, setEditing] = useState(false);

  if (editing) {
    return (
      <form
        action={async (formData) => {
          await updateTechnologyAction(formData);
          setEditing(false);
        }}
        className="space-y-2.5 rounded-btn border border-brand-500/30 bg-white/[0.03] p-3"
      >
        <input type="hidden" name="id" value={id} />
        <div className="grid gap-2 sm:grid-cols-2">
          <input name="nameDe" defaultValue={nameDe} className={fieldClasses} placeholder="Deutscher Name" />
          <input name="nameEn" defaultValue={nameEn} className={fieldClasses} placeholder="Englischer Name" />
        </div>
        <input name="synonyms" defaultValue={synonyms ?? ""} className={fieldClasses} placeholder="Synonyme, kommagetrennt" />
        <div className="flex gap-2">
          <button type="submit" className="rounded-btn bg-brand-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-700">
            Speichern
          </button>
          <button
            type="button"
            onClick={() => setEditing(false)}
            className="rounded-btn border border-white/10 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-white/5"
          >
            Abbrechen
          </button>
        </div>
      </form>
    );
  }

  return (
    <div className="flex items-center justify-between gap-3 rounded-btn border border-white/5 px-3 py-2.5 hover:bg-white/[0.02]">
      <div className="min-w-0">
        <p className={`truncate text-sm font-medium ${active ? "text-slate-200" : "text-slate-500 line-through"}`}>
          {nameDe} <span className="text-slate-500">· {nameEn}</span>
        </p>
        {synonyms && <p className="mt-0.5 truncate text-xs text-slate-500">Synonyme: {synonyms}</p>}
      </div>
      <div className="flex shrink-0 items-center gap-1.5">
        <button
          type="button"
          onClick={() => setEditing(true)}
          className="flex h-7 w-7 items-center justify-center rounded-btn text-slate-400 hover:bg-white/10 hover:text-white"
          aria-label="Bearbeiten"
        >
          <Icon name="chevron-right" className="h-3.5 w-3.5" />
        </button>
        <form
          action={async (formData) => {
            await toggleTechnologyActiveAction(formData);
          }}
        >
          <input type="hidden" name="id" value={id} />
          <input type="hidden" name="active" value={String(active)} />
          <button
            type="submit"
            className={`rounded-btn px-2.5 py-1 text-xs font-medium ${
              active ? "bg-white/5 text-slate-300 hover:bg-white/10" : "bg-emerald-500/15 text-emerald-400"
            }`}
          >
            {active ? "Aktiv" : "Inaktiv"}
          </button>
        </form>
      </div>
    </div>
  );
}
