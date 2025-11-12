// lib/utils/normalizeFilters.ts

export type PricingType = "paid_free" | "free" | "paid";
export type SortType = "recent" | "popular";

/**
 * Normalize "pricing" query param.
 * Defaults to "paid_free".
 */
export function normalizePricing(value?: string): PricingType {
  if (value === "free" || value === "paid" || value === "paid_free")
    return value;
  return "paid_free";
}

/**
 * Normalize "sort" query param.
 * Defaults to "recent".
 */
export function normalizeSort(value?: string): SortType {
  if (value === "popular" || value === "recent") return value;
  return "recent";
}

/**
 * Normalize "subcategories" query param into a string[].
 */
export function normalizeSubcategories(value?: string | string[]): string[] {
  if (typeof value === "string" && value.trim() !== "") {
    return value.split(",").map((v) => v.trim());
  }
  return [];
}
