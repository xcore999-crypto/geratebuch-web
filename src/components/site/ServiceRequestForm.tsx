"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { services } from "@/lib/services";

const inputClasses =
  "w-full rounded-btn border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-navy-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100";
const labelClasses = "mb-1.5 block text-sm font-medium text-navy-800";

export function ServiceRequestForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="flex flex-col items-center rounded-card border border-emerald-200 bg-emerald-50 p-10 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <Icon name="check" className="h-6 w-6" />
        </span>
        <p className="mt-4 text-lg font-semibold text-navy-900">
          Vielen Dank für Ihre Anfrage!
        </p>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-600">
          Wir melden uns in der Regel innerhalb von 1–2 Werktagen bei Ihnen. Für
          bestehende Kunden: Den Status jeder Anfrage sehen Sie auch direkt im
          Kundenbereich.
        </p>
        <Button href="/login" variant="secondary" className="mt-6">
          Zum Kundenbereich
        </Button>
      </div>
    );
  }

  return (
    <form
      className="rounded-card border border-slate-200 bg-white p-6 shadow-card sm:p-8"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="company" className={labelClasses}>
            Firma / Studio *
          </label>
          <input id="company" name="company" required className={inputClasses} placeholder="z. B. Kosmetikinstitut Lindenhof" />
        </div>
        <div>
          <label htmlFor="name" className={labelClasses}>
            Ansprechpartner:in *
          </label>
          <input id="name" name="name" required className={inputClasses} placeholder="Vor- und Nachname" />
        </div>
        <div>
          <label htmlFor="email" className={labelClasses}>
            E-Mail *
          </label>
          <input id="email" name="email" type="email" required className={inputClasses} placeholder="name@studio.de" />
        </div>
        <div>
          <label htmlFor="phone" className={labelClasses}>
            Telefon
          </label>
          <input id="phone" name="phone" type="tel" className={inputClasses} placeholder="Optional" />
        </div>
        <div>
          <label htmlFor="service" className={labelClasses}>
            Gewünschter Service *
          </label>
          <select id="service" name="service" required defaultValue="" className={inputClasses}>
            <option value="" disabled>
              Bitte wählen
            </option>
            {services.map((service) => (
              <option key={service.slug} value={service.slug}>
                {service.name}
              </option>
            ))}
            <option value="unsicher">Ich bin mir nicht sicher</option>
          </select>
        </div>
        <div>
          <label htmlFor="device" className={labelClasses}>
            Gerät (Hersteller / Modell)
          </label>
          <input id="device" name="device" className={inputClasses} placeholder="z. B. Candela GentleMax Pro — falls bekannt" />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="message" className={labelClasses}>
          Kurzbeschreibung *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          className={inputClasses}
          placeholder="Worum geht es? Bei einer Störung hilft z. B. eine Fehlermeldung oder eine kurze Beschreibung des Problems."
        />
      </div>

      <p className="mt-4 text-xs leading-relaxed text-slate-500">
        Mit dem Absenden stimmen Sie der Verarbeitung Ihrer Angaben gemäß
        unserer Datenschutzerklärung zu. Ein Kundenkonto ist für die erste
        Anfrage nicht erforderlich.
      </p>

      <Button type="submit" size="lg" className="mt-6 w-full sm:w-auto">
        Anfrage absenden
      </Button>
    </form>
  );
}
