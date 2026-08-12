import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { federalNisvOverview, nisvStates } from "@/lib/nisv-authorities";

export const metadata: Metadata = {
  title: "NiSV-Geräteanmeldung – Behörden & Formulare",
  description: "Zuständige NiSV-Behörde und offizielle Anzeigeformulare nach Bundesland, Stadt, Landkreis oder Bezirk finden.",
};

const kindLabel = {
  online: "Online-Dienst",
  form: "Formular",
  official: "Behördenseite",
  email: "E-Mail",
};

export default function NisvRegistrationPage() {
  return (
    <>
      <section className="bg-navy-900 py-16 text-white sm:py-20">
        <Container>
          <p className="text-sm font-semibold uppercase tracking-wide text-teal-500">Behördenfinder Deutschland</p>
          <h1 className="mt-3 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl">NiSV-Geräteanmeldung</h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-300">
            Wählen Sie zuerst das Bundesland und danach Stadt, Landkreis, Bezirk oder Regierungsbezirk. Sie gelangen direkt zur offiziellen Stelle, zum Formular oder zum Online-Verfahren.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              ["1", "Bundesland wählen"],
              ["2", "Betriebsort zuordnen"],
              ["3", "Offiziell einreichen"],
            ].map(([number, label]) => (
              <div key={number} className="flex items-center gap-3 rounded-card border border-white/10 bg-white/5 p-4 text-sm font-medium text-slate-200">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-500 font-bold text-white">{number}</span>
                {label}
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <p className="text-sm font-semibold text-navy-900">Direkt zum Bundesland</p>
              <nav className="mt-4 grid grid-cols-2 gap-1 lg:grid-cols-1">
                {nisvStates.map((state) => (
                  <a key={state.slug} href={`#${state.slug}`} className="rounded-btn px-3 py-2 text-sm text-slate-600 hover:bg-brand-50 hover:text-brand-700">
                    {state.name}
                  </a>
                ))}
              </nav>
            </aside>

            <div>
              <div className="mb-8 rounded-card border border-brand-100 bg-brand-50 p-5 text-sm leading-relaxed text-brand-900">
                <strong>Wichtig:</strong> Die NiSV verlangt eine <em>Anzeige</em>, keine behördliche Zulassung. Sie muss grundsätzlich spätestens zwei Wochen vor Inbetriebnahme erfolgen. Halten Sie Betreiber-, Standort- und Gerätedaten sowie die erforderlichen Fachkundenachweise bereit.
              </div>

              <div className="space-y-4">
                {nisvStates.map((state, index) => (
                  <details key={state.slug} id={state.slug} open={index === 0} className="group scroll-mt-28 rounded-card border border-slate-200 bg-white shadow-card">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 sm:p-6 [&::-webkit-details-marker]:hidden">
                      <span className="flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-xs font-bold text-brand-700">{String(index + 1).padStart(2, "0")}</span>
                        <span className="text-lg font-bold text-navy-900">{state.name}</span>
                      </span>
                      <Icon name="chevron-down" className="h-5 w-5 text-slate-400 transition group-open:rotate-180" />
                    </summary>

                    <div className="border-t border-slate-100 px-5 pb-6 pt-5 sm:px-6">
                      <p className="text-sm leading-relaxed text-slate-600">{state.note}</p>
                      <div className="mt-5 overflow-hidden rounded-xl border border-slate-200">
                        <div className="hidden grid-cols-[1fr_1.35fr_1.5fr] gap-4 bg-slate-50 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:grid">
                          <span>Region / Stadt</span><span>Abdeckung</span><span>Zuständige Instanz</span>
                        </div>
                        {state.authorities.map((authority) => (
                          <div key={`${state.slug}-${authority.area}`} className="grid gap-3 border-t border-slate-100 p-4 first:border-t-0 sm:grid-cols-[1fr_1.35fr_1.5fr] sm:gap-4">
                            <div><span className="text-xs font-semibold uppercase text-slate-400 sm:hidden">Region / Stadt<br /></span><span className="text-sm font-semibold text-navy-900">{authority.area}</span></div>
                            <div><span className="text-xs font-semibold uppercase text-slate-400 sm:hidden">Abdeckung<br /></span><span className="text-sm leading-relaxed text-slate-600">{authority.places}</span></div>
                            <div>
                              <span className="text-xs font-semibold uppercase text-slate-400 sm:hidden">Instanz<br /></span>
                              <p className="text-sm font-medium text-slate-700">{authority.authority}</p>
                              <div className="mt-2 flex flex-wrap items-center gap-2">
                                {authority.email && <a href={`mailto:${authority.email}`} className="break-all text-xs font-semibold text-brand-700 hover:underline">{authority.email}</a>}
                                <a href={state.registration.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-btn bg-brand-600 px-2.5 py-1.5 text-xs font-semibold text-white hover:bg-brand-700">
                                  <Icon name={state.registration.kind === "form" ? "document" : "globe"} className="h-3.5 w-3.5" />
                                  {state.registration.label}
                                </a>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {state.links.map((link) => (
                          <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-btn border border-slate-200 px-3.5 py-2 text-sm font-semibold text-navy-800 hover:border-brand-300 hover:text-brand-700">
                            {link.kind === "online" ? <Icon name="globe" className="h-4 w-4" /> : <Icon name="document" className="h-4 w-4" />}
                            {link.label}
                            <span className="text-[10px] font-medium uppercase text-slate-400">{kindLabel[link.kind]}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  </details>
                ))}
              </div>

              <div className="mt-8 flex gap-4 rounded-card border border-amber-200 bg-amber-50 p-6">
                <Icon name="exclamation-triangle" className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
                <div>
                  <p className="text-sm font-semibold text-amber-900">Aktualität & Einzelfall</p>
                  <p className="mt-1 text-sm leading-relaxed text-amber-800">
                    Behördenzuständigkeiten können sich ändern. Die Daten basieren auf der offiziellen Bundesübersicht, Stand 17.12.2025, und den verlinkten Landesportalen. Prüfen Sie vor dem Versand die aktuelle Empfängeradresse auf der Behördenseite.
                  </p>
                  <a href={federalNisvOverview} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-amber-900 underline underline-offset-2">Bundesübersicht öffnen <Icon name="arrow-right" className="h-4 w-4" /></a>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
