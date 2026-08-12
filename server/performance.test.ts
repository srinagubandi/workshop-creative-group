import { describe, expect, it } from "vitest";
import { getStaticCacheControl } from "@shared/performance";

describe("static performance cache policy", () => {
  it("keeps Vite fingerprinted JavaScript and CSS immutable for repeat visits", () => {
    expect(getStaticCacheControl("/app/dist/public/assets/index-B6QG95xT.js")).toBe("public, max-age=31536000, immutable");
    expect(getStaticCacheControl("/app/dist/public/assets/index-B3Fu3ae7.css")).toBe("public, max-age=31536000, immutable");
  });

  it("uses safe revalidation caching for gallery and brand visuals", () => {
    expect(getStaticCacheControl("/app/dist/public/gallery/project.webp")).toBe("public, max-age=604800, stale-while-revalidate=86400");
    expect(getStaticCacheControl("/app/dist/public/images/wscg-logo.png")).toBe("public, max-age=604800, stale-while-revalidate=86400");
    expect(getStaticCacheControl("/app/dist/public/index.html")).toBeNull();
  });
});
