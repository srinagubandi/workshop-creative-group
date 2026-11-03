import { describe, expect, it, vi } from "vitest";
import express from "express";
import { createServer } from "node:http";
import fs from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { AIR_ZERO_ARTICLE } from "../shared/airZeroArticle";

vi.mock("./db", () => ({
  getAllBlogPosts: vi.fn(async () => []),
  getBlogPostBySlug: vi.fn(async (slug: string) => slug === AIR_ZERO_ARTICLE.slug ? { ...AIR_ZERO_ARTICLE, publishedAt: new Date("2026-11-03T17:00:00Z"), updatedAt: new Date("2026-11-03T17:00:00Z") } : null),
}));
import { serveStatic } from "./_core/vite";
import { TestimonialQuote } from "../client/src/components/TestimonialSection";

async function withProductionServer(callback: (origin: string) => Promise<void>) {
  const template = '<html><head><title>Fallback</title><meta name="description" content="Fallback" /><!-- SEO_DYNAMIC_METADATA --></head><body></body></html>';
  const read = vi.spyOn(fs.promises, "readFile").mockResolvedValue(template as any);
  const exists = vi.spyOn(fs, "existsSync").mockReturnValue(true);
  const app = express(); serveStatic(app);
  const server = createServer(app);
  await new Promise<void>(resolve => server.listen(0, "127.0.0.1", resolve));
  const address = server.address() as { port: number };
  try { await callback(`http://127.0.0.1:${address.port}`); }
  finally { await new Promise<void>(resolve => server.close(() => resolve())); read.mockRestore(); exists.mockRestore(); }
}

describe("Production wildcard route metadata", () => {
  it("retains /blog and ignores query strings rather than using Home metadata", async () => {
    await withProductionServer(async origin => {
      const response = await fetch(origin + "/blog?from=test"); const html = await response.text();
      expect(response.status).toBe(200); expect(html).toContain('<title>Blog | Workshop Creative Group</title>');
      expect(html).toContain('href="https://www.workshopcreativegroup.com/blog"');
    });
  });
  it("resolves the actual article path in initial production HTML", async () => {
    await withProductionServer(async origin => {
      const response = await fetch(origin + "/blog/" + AIR_ZERO_ARTICLE.slug); const html = await response.text();
      expect(response.status).toBe(200); expect(html).toContain(AIR_ZERO_ARTICLE.title); expect(html).toContain('"@type":"BlogPosting"');
      expect(html).toContain(`href="https://www.workshopcreativegroup.com/blog/${AIR_ZERO_ARTICLE.slug}"`);
    });
  });
  it("returns a real production 404/noindex for a missing article", async () => {
    await withProductionServer(async origin => {
      const response = await fetch(origin + "/blog/not-published"); expect(response.status).toBe(404); expect(await response.text()).toContain('content="noindex,follow"');
    });
  });
});

describe("Testimonial label-in-name", () => {
  it("keeps the visible button label in its native accessible name with an author suffix", () => {
    const html = renderToStaticMarkup(createElement(TestimonialQuote, { quote: '“' + 'Approved perspective. '.repeat(30) + '”', quoteId: "test-quote", authorName: "Approved Author" }));
    expect(html).toContain('Read full perspective<span class="sr-only"> from Approved Author</span>');
    expect(html).not.toContain('aria-label='); expect(html).toContain('aria-expanded="false"'); expect(html).toContain('aria-controls="test-quote"');
    expect(html).not.toContain('“Approved');
  });
});
