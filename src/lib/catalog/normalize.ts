/**
 * Canonical normalization for catalog search and manufacturer/model dedupe.
 * Strips diacritics, casing and punctuation so "Nd:YAG", "nd yag", "NdYAG"
 * and "Candela", "candela.", "CANDELA" all collapse to the same key.
 */
export function normalizeText(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "");
}

/** Splits a comma-separated synonym/alias field into normalized tokens. */
export function splitAndNormalize(value: string | null | undefined): string[] {
  if (!value) return [];
  return value
    .split(",")
    .map((part) => normalizeText(part))
    .filter(Boolean);
}

/** True if the normalized query matches (as substring, either direction) the candidate. */
export function fuzzyMatches(query: string, candidate: string): boolean {
  if (!query || !candidate) return false;
  return candidate.includes(query) || query.includes(candidate);
}
