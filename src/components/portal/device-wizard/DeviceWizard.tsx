"use client";

import { useMemo, useState } from "react";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Card } from "@/components/ui/Card";
import { searchInList } from "@/lib/catalog/search";
import { createDeviceAction } from "@/lib/actions/devices";
import { SearchBox } from "./SearchBox";
import { StepIndicator } from "./StepIndicator";
import type { WizardCategory, WizardManufacturer, WizardModel, WizardLocation } from "./types";

type Mode = "catalog" | "fallback";

export function DeviceWizard({
  categories,
  manufacturers,
  models,
  locations,
}: {
  categories: WizardCategory[];
  manufacturers: WizardManufacturer[];
  models: WizardModel[];
  locations: WizardLocation[];
}) {
  const [step, setStep] = useState(1);
  const [mode, setMode] = useState<Mode>("catalog");

  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [technologyId, setTechnologyId] = useState<string | null>(null);
  const [manufacturerId, setManufacturerId] = useState<string | null>(null);
  const [deviceModelId, setDeviceModelId] = useState<string | null>(null);

  const [fallbackManufacturer, setFallbackManufacturer] = useState("");
  const [fallbackModel, setFallbackModel] = useState("");
  const [fallbackTechIds, setFallbackTechIds] = useState<string[]>([]);

  const [categoryQuery, setCategoryQuery] = useState("");
  const [techQuery, setTechQuery] = useState("");
  const [manufacturerQuery, setManufacturerQuery] = useState("");
  const [modelQuery, setModelQuery] = useState("");
  const [fallbackTechQuery, setFallbackTechQuery] = useState("");

  const selectedCategory = categories.find((c) => c.id === categoryId) ?? null;
  const allTechs = useMemo(
    () => categories.flatMap((c) => c.technologies.map((t) => ({ ...t, categoryNameDe: c.nameDe }))),
    [categories]
  );
  const selectedTech = allTechs.find((t) => t.id === technologyId) ?? null;
  const selectedManufacturer = manufacturers.find((m) => m.id === manufacturerId) ?? null;
  const selectedModel = models.find((m) => m.id === deviceModelId) ?? null;

  const filteredCategories = searchInList(categories, categoryQuery, (c) => [c.nameDe, c.nameEn]);

  const filteredTechs = selectedCategory
    ? searchInList(selectedCategory.technologies, techQuery, (t) => [t.nameDe, t.nameEn, t.shortName, t.synonyms])
    : [];

  const manufacturersForTech = useMemo(() => {
    if (!technologyId) return [];
    const ids = new Set(
      models.filter((m) => m.technologies.some((t) => t.technologyId === technologyId)).map((m) => m.manufacturerId)
    );
    return manufacturers.filter((m) => ids.has(m.id));
  }, [manufacturers, models, technologyId]);
  const filteredManufacturers = searchInList(manufacturersForTech, manufacturerQuery, (m) => [m.name]);

  const modelsForSelection = useMemo(() => {
    if (!manufacturerId || !technologyId) return [];
    return models.filter(
      (m) => m.manufacturerId === manufacturerId && m.technologies.some((t) => t.technologyId === technologyId)
    );
  }, [models, manufacturerId, technologyId]);
  const filteredModels = searchInList(modelsForSelection, modelQuery, (m) => [m.modelName]);

  const filteredFallbackTechs = searchInList(allTechs, fallbackTechQuery, (t) => [
    t.nameDe,
    t.nameEn,
    t.categoryNameDe,
  ]);

  function selectCategory(id: string) {
    setCategoryId(id);
    setTechnologyId(null);
    setManufacturerId(null);
    setDeviceModelId(null);
    setMode("catalog");
    setTechQuery("");
    setStep(2);
  }

  function selectTechnology(id: string) {
    setTechnologyId(id);
    setManufacturerId(null);
    setDeviceModelId(null);
    setMode("catalog");
    setManufacturerQuery("");
    setStep(3);
  }

  function selectManufacturer(id: string) {
    setManufacturerId(id);
    setDeviceModelId(null);
    setMode("catalog");
    setModelQuery("");
    setStep(4);
  }

  function goFallbackFromManufacturer() {
    setMode("fallback");
    setFallbackManufacturer("");
    setFallbackModel("");
    setFallbackTechIds(technologyId ? [technologyId] : []);
    setStep(4);
  }

  function goFallbackFromModel() {
    setMode("fallback");
    setFallbackManufacturer(selectedManufacturer?.name ?? "");
    setFallbackModel("");
    setFallbackTechIds(technologyId ? [technologyId] : []);
  }

  function selectModel(id: string) {
    setDeviceModelId(id);
    setStep(5);
  }

  function toggleFallbackTech(id: string) {
    setFallbackTechIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  return (
    <div>
      <StepIndicator step={step} />

      {step === 1 && (
        <Card className="p-6">
          <p className="mb-4 text-sm font-semibold text-navy-900">Welche Technologie nutzt Ihr Gerät?</p>
          <SearchBox value={categoryQuery} onChange={setCategoryQuery} placeholder="Technologie suchen…" />
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => selectCategory(cat.id)}
                className="flex items-start gap-3 rounded-btn border border-slate-200 bg-white p-4 text-left transition hover:border-brand-300 hover:bg-brand-50/50"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                  <Icon name={cat.icon as IconName} className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-navy-900">{cat.nameDe}</span>
                  <span className="mt-0.5 block text-xs leading-snug text-slate-500">{cat.description}</span>
                </span>
              </button>
            ))}
            {filteredCategories.length === 0 && (
              <p className="col-span-full py-6 text-center text-sm text-slate-500">Keine Technologie gefunden.</p>
            )}
          </div>
        </Card>
      )}

      {step === 2 && selectedCategory && (
        <Card className="p-6">
          <BackLink onClick={() => setStep(1)} />
          <p className="mb-4 text-sm font-semibold text-navy-900">
            {selectedCategory.nameDe} — welcher Gerätetyp genau?
          </p>
          <SearchBox value={techQuery} onChange={setTechQuery} placeholder="Gerätetyp suchen, z. B. „Nd:YAG“…" />
          <div className="mt-5 grid gap-2 sm:grid-cols-2">
            {filteredTechs.map((tech) => (
              <button
                key={tech.id}
                type="button"
                onClick={() => selectTechnology(tech.id)}
                className="flex items-center justify-between gap-2 rounded-btn border border-slate-200 bg-white px-4 py-3 text-left text-sm font-medium text-navy-800 transition hover:border-brand-300 hover:bg-brand-50/50 hover:text-navy-900"
              >
                {tech.nameDe}
                <Icon name="chevron-right" className="h-4 w-4 shrink-0 text-slate-400" />
              </button>
            ))}
            {filteredTechs.length === 0 && (
              <p className="col-span-full py-6 text-center text-sm text-slate-500">Kein Gerätetyp gefunden.</p>
            )}
          </div>
        </Card>
      )}

      {step === 3 && selectedTech && (
        <Card className="p-6">
          <BackLink onClick={() => setStep(2)} />
          <p className="mb-4 text-sm font-semibold text-navy-900">
            {selectedTech.nameDe} — welcher Hersteller?
          </p>
          <SearchBox value={manufacturerQuery} onChange={setManufacturerQuery} placeholder="Hersteller suchen…" />
          <div className="mt-5 grid gap-2 sm:grid-cols-2">
            {filteredManufacturers.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => selectManufacturer(m.id)}
                className="flex items-center justify-between gap-2 rounded-btn border border-slate-200 bg-white px-4 py-3 text-left text-sm font-medium text-navy-800 transition hover:border-brand-300 hover:bg-brand-50/50 hover:text-navy-900"
              >
                {m.name}
                <Icon name="chevron-right" className="h-4 w-4 shrink-0 text-slate-400" />
              </button>
            ))}
          </div>
          {filteredManufacturers.length === 0 && (
            <p className="mt-4 text-sm text-slate-500">Kein Hersteller mit dieser Technologie im Katalog gefunden.</p>
          )}
          <FallbackTrigger label="Hersteller nicht gefunden? Gerät manuell erfassen" onClick={goFallbackFromManufacturer} />
        </Card>
      )}

      {step === 4 && mode === "catalog" && selectedManufacturer && selectedTech && (
        <Card className="p-6">
          <BackLink onClick={() => setStep(3)} />
          <p className="mb-4 text-sm font-semibold text-navy-900">
            {selectedManufacturer.name} — welches Modell?
          </p>
          <SearchBox value={modelQuery} onChange={setModelQuery} placeholder="Modell suchen…" />
          <div className="mt-5 grid gap-2 sm:grid-cols-2">
            {filteredModels.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => selectModel(m.id)}
                className="flex items-center justify-between gap-2 rounded-btn border border-slate-200 bg-white px-4 py-3 text-left text-sm font-medium text-navy-800 transition hover:border-brand-300 hover:bg-brand-50/50 hover:text-navy-900"
              >
                {m.modelName}
                <Icon name="chevron-right" className="h-4 w-4 shrink-0 text-slate-400" />
              </button>
            ))}
          </div>
          {filteredModels.length === 0 && (
            <p className="mt-4 text-sm text-slate-500">Kein Modell mit dieser Technologie für {selectedManufacturer.name} gefunden.</p>
          )}
          <FallbackTrigger label="Modell nicht gefunden? Gerät manuell erfassen" onClick={goFallbackFromModel} />
        </Card>
      )}

      {step === 4 && mode === "fallback" && (
        <Card className="p-6">
          <BackLink onClick={() => setStep(3)} />
          <div className="mb-4 flex items-start gap-2.5 rounded-btn border border-amber-200 bg-amber-50 p-3.5">
            <Icon name="exclamation-triangle" className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
            <p className="text-xs leading-relaxed text-amber-800">
              Dieses Gerät wird manuell erfasst und von EuroIPL geprüft, sobald die Anfrage eingeht
              (Katalogprüfung ausstehend).
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-navy-800">Hersteller *</label>
              <input
                required
                value={fallbackManufacturer}
                onChange={(e) => setFallbackManufacturer(e.target.value)}
                placeholder="z. B. No-Name Import GmbH"
                className="w-full rounded-btn border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-navy-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-navy-800">Modell</label>
              <input
                value={fallbackModel}
                onChange={(e) => setFallbackModel(e.target.value)}
                placeholder="z. B. Diode 808 Pro"
                className="w-full rounded-btn border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-navy-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
              />
            </div>
          </div>

          <div className="mt-5">
            <label className="mb-1.5 block text-sm font-medium text-navy-800">
              Technologie(n) * <span className="font-normal text-slate-500">— mehrere möglich, z. B. bei Kombigeräten</span>
            </label>
            <SearchBox value={fallbackTechQuery} onChange={setFallbackTechQuery} placeholder="Technologie suchen…" />
            <div className="mt-3 max-h-56 space-y-1 overflow-y-auto rounded-btn border border-slate-200 p-2">
              {filteredFallbackTechs.map((t) => (
                <label
                  key={t.id}
                  className="flex cursor-pointer items-center gap-2.5 rounded-btn px-2.5 py-2 text-sm text-navy-800 hover:bg-slate-50"
                >
                  <input
                    type="checkbox"
                    checked={fallbackTechIds.includes(t.id)}
                    onChange={() => toggleFallbackTech(t.id)}
                    className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                  />
                  <span className="text-slate-500">{t.categoryNameDe} ·</span> {t.nameDe}
                </label>
              ))}
            </div>
          </div>

          <button
            type="button"
            disabled={!fallbackManufacturer.trim() || fallbackTechIds.length === 0}
            onClick={() => setStep(5)}
            className="mt-5 inline-flex items-center gap-1.5 rounded-btn bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-40"
          >
            Weiter
            <Icon name="arrow-right" className="h-4 w-4" />
          </button>
        </Card>
      )}

      {step === 5 && (
        <DetailsStep
          mode={mode}
          summary={
            mode === "catalog"
              ? `${selectedManufacturer?.name ?? ""} ${selectedModel?.modelName ?? ""}`.trim()
              : `${fallbackManufacturer}${fallbackModel ? " " + fallbackModel : ""} (manuell erfasst)`
          }
          technologyLabel={
            mode === "catalog"
              ? selectedTech?.nameDe ?? ""
              : allTechs.filter((t) => fallbackTechIds.includes(t.id)).map((t) => t.nameDe).join(", ")
          }
          manufacturerId={manufacturerId}
          deviceModelId={deviceModelId}
          fallbackManufacturer={fallbackManufacturer}
          fallbackModel={fallbackModel}
          fallbackTechIds={fallbackTechIds}
          locations={locations}
          onBack={() => setStep(4)}
        />
      )}
    </div>
  );
}

function BackLink({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mb-4 inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-navy-900"
    >
      <Icon name="chevron-right" className="h-3.5 w-3.5 rotate-180" />
      Zurück
    </button>
  );
}

function FallbackTrigger({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-5 flex w-full items-center justify-center gap-1.5 rounded-btn border border-dashed border-slate-300 py-3 text-sm font-medium text-slate-600 hover:border-brand-400 hover:text-navy-900"
    >
      <Icon name="search" className="h-4 w-4" />
      {label}
    </button>
  );
}

function DetailsStep({
  mode,
  summary,
  technologyLabel,
  manufacturerId,
  deviceModelId,
  fallbackManufacturer,
  fallbackModel,
  fallbackTechIds,
  locations,
  onBack,
}: {
  mode: Mode;
  summary: string;
  technologyLabel: string;
  manufacturerId: string | null;
  deviceModelId: string | null;
  fallbackManufacturer: string;
  fallbackModel: string;
  fallbackTechIds: string[];
  locations: WizardLocation[];
  onBack: () => void;
}) {
  const [locationChoice, setLocationChoice] = useState(locations[0]?.id ?? "new");

  return (
    <Card className="p-6">
      <BackLink onClick={onBack} />

      <div className="mb-5 flex items-start gap-3 rounded-btn border border-slate-200 bg-brand-50/50 p-4">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-100 text-brand-700">
          <Icon name="device" className="h-4.5 w-4.5" />
        </span>
        <div>
          <p className="text-sm font-semibold text-navy-900">{summary || "Gerät"}</p>
          <p className="mt-0.5 text-xs text-slate-500">{technologyLabel}</p>
        </div>
      </div>

      <form action={createDeviceAction} className="space-y-5">
        <input type="hidden" name="mode" value={mode} />
        {mode === "catalog" ? (
          <>
            <input type="hidden" name="manufacturerId" value={manufacturerId ?? ""} />
            <input type="hidden" name="deviceModelId" value={deviceModelId ?? ""} />
          </>
        ) : (
          <>
            <input type="hidden" name="customManufacturer" value={fallbackManufacturer} />
            <input type="hidden" name="customModel" value={fallbackModel} />
            {fallbackTechIds.map((id) => (
              <input key={id} type="hidden" name="technologyIds" value={id} />
            ))}
          </>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="serialNumber" className="mb-1.5 block text-sm font-medium text-navy-800">
              Seriennummer *
            </label>
            <input id="serialNumber" name="serialNumber" required className={fieldClasses} placeholder="z. B. GMP-192837" />
          </div>
          <div>
            <label htmlFor="locationId" className="mb-1.5 block text-sm font-medium text-navy-800">
              Standort
            </label>
            <select
              id="locationId"
              name="locationId"
              value={locationChoice}
              onChange={(e) => setLocationChoice(e.target.value)}
              className={fieldClasses}
            >
              {locations.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {loc.name}
                </option>
              ))}
              <option value="new">+ Neuer Standort</option>
            </select>
          </div>
          {locationChoice === "new" && (
            <div className="sm:col-span-2">
              <label htmlFor="newLocationName" className="mb-1.5 block text-sm font-medium text-navy-800">
                Name des neuen Standorts
              </label>
              <input id="newLocationName" name="newLocationName" className={fieldClasses} placeholder="z. B. Behandlungsraum 4" />
            </div>
          )}
          <div>
            <label htmlFor="productionYear" className="mb-1.5 block text-sm font-medium text-navy-800">
              Baujahr
            </label>
            <input id="productionYear" name="productionYear" type="number" min={1990} max={2100} className={fieldClasses} placeholder="z. B. 2023" />
          </div>
          <div>
            <label htmlFor="purchaseDate" className="mb-1.5 block text-sm font-medium text-navy-800">
              Kaufdatum
            </label>
            <input id="purchaseDate" name="purchaseDate" type="date" className={fieldClasses} />
          </div>
          <div>
            <label htmlFor="commissioningDate" className="mb-1.5 block text-sm font-medium text-navy-800">
              Inbetriebnahme
            </label>
            <input id="commissioningDate" name="commissioningDate" type="date" className={fieldClasses} />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="devicePhoto" className="mb-1.5 block text-sm font-medium text-navy-800">
              Gerätefoto
            </label>
            <input id="devicePhoto" name="devicePhoto" type="file" accept="image/*" className={fileFieldClasses} />
          </div>
          <div>
            <label htmlFor="typenschildPhoto" className="mb-1.5 block text-sm font-medium text-navy-800">
              Foto Typenschild
            </label>
            <input id="typenschildPhoto" name="typenschildPhoto" type="file" accept="image/*" className={fileFieldClasses} />
          </div>
        </div>

        <div>
          <label htmlFor="notes" className="mb-1.5 block text-sm font-medium text-navy-800">
            Notizen (optional)
          </label>
          <textarea id="notes" name="notes" rows={3} className={fieldClasses} placeholder="Zusätzliche Hinweise für EuroIPL" />
        </div>

        <button
          type="submit"
          className="inline-flex items-center gap-1.5 rounded-btn bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-700"
        >
          Gerät speichern
          <Icon name="check" className="h-4 w-4" />
        </button>
      </form>
    </Card>
  );
}

const fieldClasses =
  "w-full rounded-btn border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-navy-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100";
const fileFieldClasses =
  "w-full rounded-btn border border-dashed border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-600 file:mr-3 file:rounded-btn file:border-0 file:bg-brand-600 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-white";
