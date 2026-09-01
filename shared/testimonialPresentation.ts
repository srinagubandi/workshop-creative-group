export type OrderedTestimonial<T extends { id: number; sortOrder: number }> = T;

/** Keeps public output deterministic even when a data source returns an unsorted collection. */
export function orderTestimonials<T extends { id: number; sortOrder: number }>(items: T[]): T[] {
  return [...items].sort((a, b) => a.sortOrder - b.sortOrder || a.id - b.id);
}

/** The exact persisted sort-order updates used by the protected admin reorder action. */
export function getTestimonialSortUpdates(ids: number[]) {
  return ids.map((id, sortOrder) => ({ id, sortOrder }));
}

export function getTestimonialLayout(count: number): "single" | "grid" {
  return count === 1 ? "single" : "grid";
}

/**
 * Removes only duplicated quotation punctuation that wraps an imported testimonial.
 * This must run before measuring, truncating, or rendering the quote so the public
 * component owns one consistent decorative blue quote treatment in every state.
 */
export function normalizeTestimonialQuote(quote: string): string {
  return quote
    .trim()
    .replace(/^[\u201c\u201d\"]+\s*/, "")
    .replace(/\s*[\u201c\u201d\"]+$/, "");
}
