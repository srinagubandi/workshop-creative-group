import { describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({ getPublishedTestimonials: vi.fn() }));

vi.mock("./db", async (importOriginal) => ({
  ...(await importOriginal<typeof import("./db")>()),
  getPublishedTestimonials: mocks.getPublishedTestimonials,
}));

import { appRouter } from "./routers";

describe("public testimonial router", () => {
  it("returns the exact persisted admin-reordered sequence from the public procedure", async () => {
    mocks.getPublishedTestimonials.mockResolvedValue([
      { testimonial: { id: 8, sortOrder: 2, authorName: "Approved A", quote: "Approved testimonial content", status: "published" }, media: null },
      { testimonial: { id: 11, sortOrder: 0, authorName: "Approved B", quote: "Approved testimonial content", status: "published" }, media: null },
      { testimonial: { id: 3, sortOrder: 1, authorName: "Approved C", quote: "Approved testimonial content", status: "published" }, media: null },
    ]);

    const caller = appRouter.createCaller({} as any);
    const output = await caller.testimonials.list();

    expect(output.map(item => item.id)).toEqual([11, 3, 8]);
  });
});
