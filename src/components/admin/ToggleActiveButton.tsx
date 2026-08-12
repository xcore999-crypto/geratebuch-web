"use client";

type ToggleAction = (formData: FormData) => Promise<void>;

export function ToggleActiveButton({ id, active, action }: { id: string; active: boolean; action: ToggleAction }) {
  return (
    <form action={action}>
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
  );
}
