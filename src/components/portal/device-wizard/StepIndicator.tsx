import { cn } from "@/lib/cn";

const steps = ["Technologie", "Gerätetyp", "Hersteller", "Modell", "Gerätedaten"];

export function StepIndicator({ step }: { step: number }) {
  return (
    <ol className="mb-8 flex flex-wrap items-center gap-x-2 gap-y-3">
      {steps.map((label, index) => {
        const num = index + 1;
        const active = num === step;
        const done = num < step;
        return (
          <li key={label} className="flex items-center gap-2">
            <span
              className={cn(
                "flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold",
                active && "bg-brand-600 text-white",
                done && "bg-emerald-100 text-emerald-700",
                !active && !done && "bg-slate-100 text-slate-500"
              )}
            >
              {num}
            </span>
            <span className={cn("text-sm", active ? "font-semibold text-navy-900" : "text-slate-500")}>{label}</span>
            {num < steps.length && <span className="mx-1 h-px w-6 bg-slate-200" />}
          </li>
        );
      })}
    </ol>
  );
}
