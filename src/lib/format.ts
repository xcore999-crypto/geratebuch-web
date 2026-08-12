function toDate(value: Date | string): Date {
  if (value instanceof Date) return value;
  return new Date(value + "T00:00:00");
}

export function formatDate(value: Date | string): string {
  return toDate(value).toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function formatDateLong(value: Date | string): string {
  return toDate(value).toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
