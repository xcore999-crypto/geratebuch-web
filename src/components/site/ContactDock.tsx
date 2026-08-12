import Link from "next/link";
import { Icon, type IconName } from "@/components/ui/Icon";
import { contact, externalLinks } from "@/lib/nav";

const items: { label: string; href: string; icon: IconName; external?: boolean }[] = [
  {
    label: "Anrufen",
    href: `tel:${contact.phone.replace(/\s/g, "")}`,
    icon: "phone",
  },
  { label: "WhatsApp", href: externalLinks.whatsapp, icon: "whatsapp", external: true },
  { label: "Instagram", href: externalLinks.instagram, icon: "instagram", external: true },
  { label: "Shop", href: externalLinks.shop, icon: "shopping-bag" },
];

export function ContactDock() {
  return (
    <aside className="contact-dock fixed bottom-5 right-4 z-40 hidden flex-col gap-2 sm:flex lg:right-6" aria-label="Schnellkontakt">
      {items.map((item, index) => {
        const className =
          "group/contact flex items-center justify-end gap-2 text-sm font-semibold text-navy-900";
        const content = (
          <>
            <span className="pointer-events-none translate-x-2 rounded-full bg-white px-3 py-2 opacity-0 shadow-card transition duration-300 group-hover/contact:translate-x-0 group-hover/contact:opacity-100">
              {item.label}
            </span>
            <span className="contact-orb flex h-12 w-12 items-center justify-center rounded-full border border-white/70 bg-white text-brand-700 shadow-card-hover transition duration-300 group-hover/contact:-translate-y-1 group-hover/contact:bg-brand-500 group-hover/contact:text-white" style={{ animationDelay: `${index * 0.35}s` }}>
              <Icon name={item.icon} className="h-5 w-5" />
            </span>
          </>
        );

        return item.href.startsWith("/") ? (
          <Link key={item.label} href={item.href} className={className} aria-label={item.label}>
            {content}
          </Link>
        ) : (
          <a
            key={item.label}
            href={item.href}
            className={className}
            aria-label={item.label}
            target={item.external ? "_blank" : undefined}
            rel={item.external ? "noreferrer" : undefined}
          >
            {content}
          </a>
        );
      })}
    </aside>
  );
}
