import { cn } from "@/lib/cn";

/**
 * geratebuch.de wordmark. `withService` appends the "Ein Service von
 * EuroIPL" subline that must accompany the primary brand wherever the
 * relationship to the operating company needs to be visible.
 */
export function Logo({
  variant = "light",
  withService = false,
  className,
}: {
  variant?: "light" | "dark";
  withService?: boolean;
  className?: string;
}) {
  const textColor = variant === "light" ? "text-navy-900" : "text-white";
  const subColor = variant === "light" ? "text-slate-500" : "text-slate-400";

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark />
      <span className="flex flex-col leading-none">
        <span className={cn("text-[1.15rem] font-bold tracking-tight", textColor)}>
          geratebuch<span className="text-brand-600">.de</span>
        </span>
        {withService && (
          <span className={cn("mt-0.5 text-[0.65rem] font-medium tracking-wide", subColor)}>
            Ein Service von EuroIPL
          </span>
        )}
      </span>
    </span>
  );
}

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={cn("h-8 w-8 shrink-0", className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="40" height="40" rx="10" className="fill-brand-600" />
      <path
        d="M13 11.5C13 10.6716 13.6716 10 14.5 10H22.5L27 14.5V28.5C27 29.3284 26.3284 30 25.5 30H14.5C13.6716 30 13 29.3284 13 28.5V11.5Z"
        fill="white"
        fillOpacity="0.95"
      />
      <path d="M22.5 10V13.5C22.5 14.0523 22.9477 14.5 23.5 14.5H27" className="stroke-brand-600" strokeWidth="1.4" />
      <path
        d="M16.3 20.4L18.6 22.7L23.7 17.6"
        className="stroke-brand-600"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
