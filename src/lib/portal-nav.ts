import type { IconName } from "@/components/ui/Icon";

export const portalNav: { label: string; href: string; icon: IconName }[] = [
  { label: "Übersicht", href: "/portal", icon: "grid" },
  { label: "Meine Geräte", href: "/portal/geraete", icon: "device" },
  { label: "Serviceanfragen", href: "/portal/serviceanfragen", icon: "inbox" },
  { label: "Dokumente", href: "/portal/dokumente", icon: "document" },
  { label: "Services", href: "/portal/services", icon: "wrench" },
  { label: "Unternehmen", href: "/portal/unternehmen", icon: "briefcase" },
];
