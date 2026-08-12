import { cn } from "@/lib/cn";

export function Card({
  className,
  children,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-card border border-slate-200 bg-white shadow-card",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

export function DarkCard({
  className,
  children,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-card border border-white/10 bg-navy-800/60",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
