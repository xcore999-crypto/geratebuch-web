import type { IconName } from "@/components/ui/Icon";

export const adminNav: { label: string; href: string; icon: IconName }[] = [
  { label: "Übersicht", href: "/admin/katalog", icon: "grid" },
  { label: "Technologien", href: "/admin/katalog/technologien", icon: "layers" },
  { label: "Hersteller", href: "/admin/katalog/hersteller", icon: "briefcase" },
  { label: "Modelle", href: "/admin/katalog/modelle", icon: "device" },
  { label: "Prüfung ausstehend", href: "/admin/katalog/pruefung", icon: "exclamation-triangle" },
  { label: "Techniker-Ansicht", href: "/admin/techniker", icon: "wrench" },
];
