import { describe, expect, it } from "vitest";
import { getBlogPresentation, MANAGED_SITE_ASSET_QUERY_OPTIONS, MANAGED_SITE_IMAGE_DEFAULTS, NAVIGATION_LOGO_IMAGE_OPTIONS, PUBLIC_PAGE_IMPORTERS } from "@/lib/renderingPerformance";

describe("rendering performance safeguards", () => {
  it("keeps each public page behind an independent lazy importer", () => {
    expect(Object.keys(PUBLIC_PAGE_IMPORTERS).sort()).toEqual([
      "about", "admin", "blog", "blogPost", "contact", "gallery", "graphicDesign", "home", "largeFormat", "printProcurement", "requestQuote",
    ]);
    expect(PUBLIC_PAGE_IMPORTERS.gallery).not.toBe(PUBLIC_PAGE_IMPORTERS.home);
  });

  it("keeps managed shared images fresh for a day without focus refetches", () => {
    expect(MANAGED_SITE_ASSET_QUERY_OPTIONS).toEqual({
      staleTime: 86_400_000,
      gcTime: 86_400_000,
      refetchOnWindowFocus: false,
    });
  });

  it("keeps shared images lazy by default while prioritizing the navigation logo", () => {
    expect(MANAGED_SITE_IMAGE_DEFAULTS).toEqual({ loading: "lazy", fetchPriority: "auto" });
    expect(NAVIGATION_LOGO_IMAGE_OPTIONS).toEqual({ loading: "eager", fetchPriority: "high" });
  });

  it("derives the featured blog post from the single list query", () => {
    const result = getBlogPresentation([
      { id: 7, featured: 0 },
      { id: 8, featured: 1 },
      { id: 9, featured: 0 },
    ], [{ id: 1, featured: 1 }]);
    expect(result.featuredPost?.id).toBe(8);
    expect(result.otherPosts.map((post) => post.id)).toEqual([7, 9]);
  });
});
