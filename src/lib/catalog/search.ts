import { normalizeText, fuzzyMatches } from "./normalize";

/**
 * Generic fuzzy filter over an in-memory list. Used both server-side (SSR
 * search params) and client-side (wizard live search) against the same
 * small, pre-fetched catalog datasets.
 */
export function searchInList<T>(items: T[], query: string, getFields: (item: T) => (string | null | undefined)[]): T[] {
  const q = normalizeText(query);
  if (!q) return items;
  return items.filter((item) =>
    getFields(item).some((field) => (field ? fuzzyMatches(q, normalizeText(field)) : false))
  );
}
