"use client";

import { useRef } from "react";
import { createManufacturerAction } from "@/lib/actions/admin";

const fieldClasses =
  "w-full rounded-btn border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20";

export function CreateManufacturerForm() {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={formRef}
      action={async (formData) => {
        await createManufacturerAction(formData);
        formRef.current?.reset();
      }}
      className="grid gap-3 sm:grid-cols-[1.5fr_1fr_1fr_auto]"
    >
      <input name="name" required placeholder="Herstellername" className={fieldClasses} />
      <input name="country" placeholder="Land (optional)" className={fieldClasses} />
      <input name="website" placeholder="Website (optional)" className={fieldClasses} />
      <button type="submit" className="rounded-btn bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-700">
        Anlegen
      </button>
    </form>
  );
}
