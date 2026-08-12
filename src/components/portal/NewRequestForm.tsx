"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import { services, getServiceBySlug } from "@/lib/services";
import { submitServiceRequestAction, type SubmitRequestResult } from "@/lib/actions/service-requests";

const inputClasses =
  "w-full rounded-btn border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-navy-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100";
const labelClasses = "mb-1.5 block text-sm font-medium text-navy-800";

export function NewRequestForm({ devices }: { devices: { id: string; label: string }[] }) {
  const searchParams = useSearchParams();
  const deviceParam = searchParams.get("device") ?? "";
  const serviceParam = searchParams.get("service") ?? "";

  const [deviceId, setDeviceId] = useState(devices.some((d) => d.id === deviceParam) ? deviceParam : "");
  const [serviceSlug, setServiceSlug] = useState(getServiceBySlug(serviceParam) ? serviceParam : "");
  const [usable, setUsable] = useState<"ja" | "nein" | "">("");
  const [result, setResult] = useState<SubmitRequestResult | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (result) {
    return (
      <div className="flex flex-col items-center rounded-card border border-emerald-200 bg-emerald-50 p-10 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <Icon name="check" className="h-6 w-6" />
        </span>
        <p className="mt-4 text-lg font-semibold text-navy-900">Anfrage {result.publicId} gesendet</p>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-600">
          {result.serviceName} für {result.deviceName} ist eingegangen. Wir
          melden uns in der Regel innerhalb von 1–2 Werktagen mit den nächsten
          Schritten.
        </p>
        <div className="mt-6 flex gap-3">
          <Link
            href="/portal/serviceanfragen"
            className="rounded-btn bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
          >
            Zu meinen Anfragen
          </Link>
          <Link
            href="/portal"
            className="rounded-btn border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
          >
            Zur Übersicht
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form
      className="space-y-5 rounded-card border border-slate-200 bg-white p-6 shadow-card sm:p-8"
      onSubmit={async (event) => {
        event.preventDefault();
        setError(null);
        setSubmitting(true);
        try {
          const formData = new FormData(event.currentTarget);
          const service = getServiceBySlug(String(formData.get("serviceSlug") ?? ""));
          if (service) formData.set("serviceName", service.name);
          const outcome = await submitServiceRequestAction(formData);
          setResult(outcome);
        } catch (err) {
          setError(err instanceof Error ? err.message : "Anfrage konnte nicht gesendet werden.");
        } finally {
          setSubmitting(false);
        }
      }}
    >
      <div>
        <label htmlFor="device" className={labelClasses}>
          Gerät *
        </label>
        <select
          id="device"
          name="deviceId"
          required
          value={deviceId}
          onChange={(event) => setDeviceId(event.target.value)}
          className={inputClasses}
        >
          <option value="" disabled>
            Bitte wählen
          </option>
          {devices.map((device) => (
            <option key={device.id} value={device.id}>
              {device.label}
            </option>
          ))}
        </select>
        <p className="mt-2 text-xs text-slate-500">
          Gerät nicht dabei?{" "}
          <Link href="/portal/geraete/neu" className="font-medium text-brand-700 hover:text-brand-800">
            Jetzt registrieren
          </Link>
        </p>
      </div>

      <div>
        <label htmlFor="service" className={labelClasses}>
          Service *
        </label>
        <select
          id="service"
          name="serviceSlug"
          required
          value={serviceSlug}
          onChange={(event) => setServiceSlug(event.target.value)}
          className={inputClasses}
        >
          <option value="" disabled>
            Bitte wählen
          </option>
          {services.map((service) => (
            <option key={service.slug} value={service.slug}>
              {service.name}
            </option>
          ))}
        </select>
      </div>

      {serviceSlug === "reparatur-diagnose" && (
        <div>
          <span className={labelClasses}>Kann das Gerät aktuell genutzt werden? *</span>
          <div className="flex gap-3">
            {(["ja", "nein"] as const).map((option) => (
              <label
                key={option}
                className={`flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-btn border px-3 py-2.5 text-sm font-medium ${
                  usable === option
                    ? "border-brand-500 bg-brand-50 text-brand-800"
                    : "border-slate-200 bg-white text-slate-600"
                }`}
              >
                <input
                  type="radio"
                  name="usable"
                  value={option}
                  checked={usable === option}
                  onChange={() => setUsable(option)}
                  className="sr-only"
                  required
                />
                {option === "ja" ? "Ja, eingeschränkt nutzbar" : "Nein, Gerät ist ausgefallen"}
              </label>
            ))}
          </div>
        </div>
      )}

      <div>
        <label htmlFor="description" className={labelClasses}>
          Kurzbeschreibung *
        </label>
        <textarea
          id="description"
          name="description"
          required
          rows={4}
          className={inputClasses}
          placeholder="Was benötigen Sie genau? Bei einer Störung hilft z. B. eine Fehlermeldung."
        />
      </div>

      <div>
        <label htmlFor="scheduledDate" className={labelClasses}>
          Wunschtermin (optional)
        </label>
        <input id="scheduledDate" name="scheduledDate" type="date" className={inputClasses} />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-btn bg-brand-600 px-4 py-3 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-50 sm:w-auto sm:px-8"
      >
        {submitting ? "Wird gesendet…" : "Anfrage senden"}
      </button>
    </form>
  );
}
