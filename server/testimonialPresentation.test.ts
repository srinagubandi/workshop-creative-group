import { describe, expect, it } from "vitest";
import { getTestimonialLayout, getTestimonialSortUpdates, normalizeTestimonialQuote, orderTestimonials } from "../shared/testimonialPresentation";

describe("testimonial presentation safeguards", () => {
  it("returns public records in persisted sort order after an administrator reorders IDs", () => {
    const ordered = orderTestimonials([{ id: 8, sortOrder: 2 }, { id: 4, sortOrder: 0 }, { id: 6, sortOrder: 1 }]);
    expect(ordered.map(item => item.id)).toEqual([4, 6, 8]);
  });

  it("produces public output in the exact order saved by an admin reorder action", () => {
    const records = [{ id: 3, sortOrder: 0 }, { id: 8, sortOrder: 1 }, { id: 11, sortOrder: 2 }];
    const savedUpdates = getTestimonialSortUpdates([11, 3, 8]);
    const persisted = records.map(record => ({ ...record, sortOrder: savedUpdates.find(update => update.id === record.id)!.sortOrder }));
    expect(orderTestimonials(persisted).map(record => record.id)).toEqual([11, 3, 8]);
  });

  it("uses a focused layout for one approved testimonial and a responsive grid for more", () => {
    expect(getTestimonialLayout(1)).toBe("single");
    expect(getTestimonialLayout(2)).toBe("grid");
    expect(getTestimonialLayout(4)).toBe("grid");
  });

  it("removes duplicated outer quotes before public testimonial text is rendered", () => {
    expect(normalizeTestimonialQuote('““Working with Brent was exceptional.””')).toBe("Working with Brent was exceptional.");
    expect(normalizeTestimonialQuote('"A reliable partner from start to finish."')).toBe("A reliable partner from start to finish.");
  });

  it("preserves internal apostrophes and quotation punctuation", () => {
    expect(normalizeTestimonialQuote('“They said "great work" and we\'ve agreed.”')).toBe("They said \"great work\" and we've agreed.");
    expect(normalizeTestimonialQuote("We've partnered for years.")).toBe("We've partnered for years.");
  });
});
