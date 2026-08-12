import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { libraryDocuments } from "@/lib/document-library";

export function DocumentLibraryTeaser() {
  return (
    <section className="bg-slate-50 py-24 sm:py-28">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between" data-reveal>
          <SectionHeading
            eyebrow="Kostenlose Vorlagen"
            title="Dokumentenbibliothek für den Offline-Betrieb"
            description="Anamnesebögen, Kundenkarten, Gerätebuch und Praxisprotokolle — sofort als PDF oder bearbeitbare Word-Datei herunterladen. Ohne Konto und kostenlos."
          />
          <Link href="/dokumente-vorlagen" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700">
            Alle {libraryDocuments.length} Vorlagen ansehen
            <Icon name="arrow-right" className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {libraryDocuments.slice(0, 4).map((document, index) => (
            <article key={document.slug} className="group relative flex min-h-64 flex-col overflow-hidden rounded-card border border-slate-200/80 bg-white p-6 shadow-card transition duration-500 hover:-translate-y-1.5 hover:shadow-card-hover" data-reveal>
              <span className="absolute right-5 top-5 text-xs font-bold text-slate-300">0{index + 1}</span>
              <span className="icon-orbit flex h-11 w-11 items-center justify-center rounded-full bg-brand-50 text-brand-600 transition duration-300 group-hover:bg-brand-500 group-hover:text-white">
                <Icon name="document" className="h-5 w-5" />
              </span>
              <p className="mt-6 text-base font-bold text-navy-900">{document.title}</p>
              <p className="mt-2 flex-1 text-xs leading-relaxed text-slate-500">{document.description}</p>
              <div className="mt-5 flex gap-2 border-t border-slate-100 pt-4 text-xs font-semibold">
                <a href={document.pdfHref} download className="rounded-full bg-brand-50 px-3 py-1.5 text-brand-700 hover:bg-brand-100">PDF</a>
                <a href={document.docxHref} download className="rounded-full bg-slate-100 px-3 py-1.5 text-slate-600 hover:text-brand-700">Word</a>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
