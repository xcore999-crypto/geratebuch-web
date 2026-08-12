import type { Metadata } from "next";
import { inter } from "@/lib/fonts";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ScrollReveal } from "@/components/site/ScrollReveal";
import { ContactDock } from "@/components/site/ContactDock";
import "../globals.css";

export const metadata: Metadata = {
  title: {
    default: "geratebuch.de — Digitale Geräteakte & Service für Kosmetik- und Lasergeräte",
    template: "%s — geratebuch.de",
  },
  description:
    "geratebuch.de ist die digitale Geräteakte und Serviceplattform für Kosmetik- und Lasergeräte in Deutschland. Wartung, Reparatur, STK und DGUV V3 — ein Service von EuroIPL.",
};

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="de" className={`${inter.variable} h-full antialiased`} data-scroll-behavior="smooth">
      <body className="site-shell min-h-full flex flex-col bg-white text-navy-900">
        <ScrollReveal />
        <Header />
        <div className="flex-1">{children}</div>
        <ContactDock />
        <Footer />
      </body>
    </html>
  );
}
