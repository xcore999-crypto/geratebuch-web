"use client";

import { useRef } from "react";
import { createTechnologyAction } from "@/lib/actions/admin";

const fieldClasses =
  "w-full rounded-btn border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20";

export function CreateTechnologyForm({ categories }: { categories: { id: string; nameDe: string }[] }) {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={formRef}
      action={async (formData) => {
        await createTechnologyAction(formData);
        formRef.current?.reset();
      }}
      className="grid gap-3 sm:grid-cols-[1fr_1fr_1fr_auto]"
    >
      <select name="categoryId" required defaultValue="" className={fieldClasses}>
        <option value="" disabled>
          Kategorie
        </option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.nameDe}
          </option>
        ))}
      </select>
      <input name="nameDe" required placeholder="Deutscher Name" className={fieldClasses} />
      <input name="nameEn" required placeholder="Englischer Name" className={fieldClasses} />
      <button type="submit" className="rounded-btn bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-700">
        Anlegen
      </button>
    </form>
  );
}
