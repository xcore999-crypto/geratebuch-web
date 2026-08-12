import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { documentCategories, libraryDocuments } from "@/lib/document-library";
import { PageHero } from "@/components/site/PageHero";

export const metadata: Metadata = {
  title: "Kostenlose Dokumentenvorlagen für Kosmetikstudios",
  description: "Anamnesebögen, Kundenkarten, Gerätebuch und Praxisprotokolle kostenlos als PDF und Word herunterladen.",
};

export default function DocumentLibraryPage() {
  return (
    <>
      <PageHero
        eyebrow="Kostenlos & ohne Konto"
        title="Dokumentenbibliothek für Kosmetikstudios"
        image="/images/page-dokumente-vorlagen.png"
        imageAlt="Geordnete Gerätebücher, Protokolle und Formulare für den Studioalltag"
        description={
          <p>
            Sofort nutzbare Offline-Vorlagen für Kundenakte, Behandlung, Gerätebetrieb und Hygiene. Als druckfertiges PDF oder bearbeitbare Word-Datei.
          </p>
        }
      >
          <div className="flex flex-wrap gap-3 text-sm text-slate-200">
            {[`${libraryDocuments.length} Vorlagen`, "PDF + Word", "Freier Download"].map((item) => (
              <span key={item} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-3 py-1.5 backdrop-blur">
                <Icon name="check" className="h-3.5 w-3.5 text-brand-300" />
                {item}
              </span>
            ))}
          </div>
      </PageHero>

      <section className="py-16 sm:py-20">
        <Container className="space-y-16">
          {documentCategories.map((category) => {
            const documents = libraryDocuments.filter((document) => document.category === category);
            return (
              <div key={category} id={category.toLowerCase().replaceAll(" ", "-")} className="scroll-mt-28">
                <div className="flex items-end justify-between gap-4 border-b border-slate-200 pb-4">
                  <h2 className="text-2xl font-bold text-navy-900">{category}</h2>
                  <span className="text-sm text-slate-500">{documents.length} Vorlagen</span>
                </div>
                <div className="mt-6 grid gap-5 md:grid-cols-2">
                  {documents.map((document) => (
                    <article key={document.slug} className="flex flex-col rounded-card border border-slate-200 p-6 shadow-card">
                      <div className="flex items-start gap-4">
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                          <Icon name="document" className="h-5 w-5" />
                        </span>
                        <div>
                          <h3 className="font-semibold text-navy-900">{document.title}</h3>
                          <p className="mt-1 text-xs text-slate-400">{document.pages} · PDF & Word</p>
                        </div>
                      </div>
                      <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-600">{document.description}</p>
                      <div className="mt-5 flex flex-wrap gap-3 border-t border-slate-100 pt-5">
                        <a href={document.pdfHref} download className="inline-flex h-10 items-center gap-2 rounded-btn bg-brand-600 px-4 text-sm font-semibold text-white hover:bg-brand-700">
                          <Icon name="download" className="h-4 w-4" /> PDF herunterladen
                        </a>
                        <a href={document.docxHref} download className="inline-flex h-10 items-center gap-2 rounded-btn border border-slate-200 px-4 text-sm font-semibold text-navy-800 hover:border-brand-300 hover:text-brand-700">
                          Word bearbeiten
                        </a>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            );
          })}

          <div className="flex gap-4 rounded-card border border-amber-200 bg-amber-50 p-6">
            <Icon name="exclamation-triangle" className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
            <div>
              <p className="text-sm font-semibold text-amber-900">Bitte vor Verwendung anpassen</p>
              <p className="mt-1 text-sm leading-relaxed text-amber-800">
                Die Vorlagen sind praktische Arbeitshilfen und keine Rechtsberatung. Ergänzen Sie Studioangaben, konkrete Geräte, Anwendungen, Datenschutzfristen und behördliche Vorgaben Ihres Bundeslands. Bei medizinischen oder rechtlichen Fragen ist fachkundiger Rat erforderlich.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
