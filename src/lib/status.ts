import type { StatusTone } from "@/components/ui/Badge";
import type { IconName } from "@/components/ui/Icon";

export type DeviceStatus = "ok" | "due_soon" | "overdue";
export type RequestStatus = "erhalten" | "rueckfrage" | "eingeplant" | "in_bearbeitung" | "abgeschlossen" | "storniert";
export type HistoryEventType = "registrierung" | "wartung" | "reparatur" | "pruefung" | "beratung";
export type ClassificationStatus = "not_reviewed" | "review_required" | "reviewed";

const deviceStatusToneMap: Record<DeviceStatus, StatusTone> = {
  ok: "success",
  due_soon: "warning",
  overdue: "danger",
};
export function deviceStatusTone(status: string): StatusTone {
  return deviceStatusToneMap[status as DeviceStatus] ?? "neutral";
}

const deviceStatusLabelMap: Record<DeviceStatus, string> = {
  ok: "In Ordnung",
  due_soon: "Wartung fällig",
  overdue: "Überfällig",
};
export function deviceStatusLabel(status: string): string {
  return deviceStatusLabelMap[status as DeviceStatus] ?? status;
}

const requestStatusLabelMap: Record<RequestStatus, string> = {
  erhalten: "Erhalten",
  rueckfrage: "Rückfrage nötig",
  eingeplant: "Eingeplant",
  in_bearbeitung: "In Bearbeitung",
  abgeschlossen: "Abgeschlossen",
  storniert: "Storniert",
};
export function requestStatusLabel(status: string): string {
  return requestStatusLabelMap[status as RequestStatus] ?? status;
}

const requestStatusToneMap: Record<RequestStatus, StatusTone> = {
  erhalten: "info",
  rueckfrage: "warning",
  eingeplant: "info",
  in_bearbeitung: "warning",
  abgeschlossen: "success",
  storniert: "neutral",
};
export function requestStatusTone(status: string): StatusTone {
  return requestStatusToneMap[status as RequestStatus] ?? "neutral";
}

const historyTypeIconMap: Record<HistoryEventType, IconName> = {
  registrierung: "device",
  wartung: "wrench",
  reparatur: "tool",
  pruefung: "shield-check",
  beratung: "chat",
};
export function historyTypeIcon(type: string): IconName {
  return historyTypeIconMap[type as HistoryEventType] ?? "document";
}

const classificationLabelMap: Record<ClassificationStatus, string> = {
  not_reviewed: "Nicht geprüft",
  review_required: "Prüfung erforderlich",
  reviewed: "Geprüft",
};
export function classificationLabel(status: string): string {
  return classificationLabelMap[status as ClassificationStatus] ?? status;
}

const classificationToneMap: Record<ClassificationStatus, StatusTone> = {
  not_reviewed: "neutral",
  review_required: "warning",
  reviewed: "success",
};
export function classificationTone(status: string): StatusTone {
  return classificationToneMap[status as ClassificationStatus] ?? "neutral";
}
