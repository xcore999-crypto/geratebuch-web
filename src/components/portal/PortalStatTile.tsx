import { Icon, type IconName } from "@/components/ui/Icon";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/cn";

export type StatColor = "blue" | "rose" | "amber" | "violet" | "emerald";

const colorClasses: Record<StatColor, string> = {
  blue: "bg-blue-50 text-blue-600",
  rose: "bg-rose-50 text-rose-600",
  amber: "bg-amber-50 text-amber-600",
  violet: "bg-violet-50 text-violet-600",
  emerald: "bg-emerald-50 text-emerald-600",
};

export function PortalStatTile({
  icon,
  label,
  value,
  sub,
  color = "blue",
}: {
  icon: IconName;
  label: string;
  value: string | number;
  sub?: string;
  color?: StatColor;
}) {
  return (
    <Card className="p-5">
      <div className="flex items-center gap-2.5">
        <span className={cn("flex h-9 w-9 items-center justify-center rounded-lg", colorClasses[color])}>
          <Icon name={icon} className="h-4.5 w-4.5" />
        </span>
        <span className="text-sm text-slate-500">{label}</span>
      </div>
      <p className="mt-3 text-3xl font-bold text-navy-900">{value}</p>
      {sub && <p className="mt-1 text-xs text-slate-500">{sub}</p>}
    </Card>
  );
}
