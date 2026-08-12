import { Icon, type IconName } from "@/components/ui/Icon";
import { DarkCard } from "@/components/ui/Card";

export function StatTile({
  icon,
  label,
  value,
  sub,
}: {
  icon: IconName;
  label: string;
  value: string | number;
  sub?: string;
}) {
  return (
    <DarkCard className="p-5">
      <div className="flex items-center gap-2 text-slate-400">
        <Icon name={icon} className="h-4 w-4" />
        <span className="text-sm">{label}</span>
      </div>
      <p className="mt-3 text-3xl font-bold text-white">{value}</p>
      {sub && <p className="mt-1 text-xs text-slate-400">{sub}</p>}
    </DarkCard>
  );
}
