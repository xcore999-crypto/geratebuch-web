import { cn } from "@/lib/cn";

export function Card({
  className,
  children,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-card border border-slate-200/80 bg-white shadow-card",
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
        "rounded-card border border-white/10 bg-white/[0.045] backdrop-blur",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
