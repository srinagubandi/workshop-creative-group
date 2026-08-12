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
