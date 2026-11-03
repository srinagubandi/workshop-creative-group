import { describe, expect, it } from "vitest";
import { AIR_ZERO_ARTICLE } from "../shared/airZeroArticle";
import { formatBlogDate, getBlogContentBlocks, getBlogPostMetadata } from "../shared/blogPresentation";
import { getPageStructuredData } from "../shared/structuredData";
import { injectSeoMetadata } from "./seo";

const date = new Date("2026-11-03T17:00:00Z");
const post = { ...AIR_ZERO_ARTICLE, publishedAt: date, updatedAt: date };
const template = '<html><head><title>Fallback</title><meta name="description" content="Fallback" /><!-- SEO_DYNAMIC_METADATA --></head></html>';

describe("Blog article publication presentation", () => {
  it("retains all five approved benefit items as one semantic list", () => {
    const blocks = getBlogContentBlocks(AIR_ZERO_ARTICLE.content);
    expect(blocks.filter(block => block.type === "list")).toEqual([{ type: "list", items: ["Low production cost", "Long-term daily exposure", "Hyper-local targeting", "Real-world proof of completed work", "Strong potential ROI from a single installation"] }]);
    expect(blocks.filter(block => block.type === "paragraph")).toHaveLength(8);
  });
  it("handles plain paragraphs, line wrapping, bullets and CRLF without unsafe HTML parsing", () => {
    expect(getBlogContentBlocks('First\r\nwrapped line\r\n\r\n• A\r\n- B\r\n\r\n<script>evil()</script>')).toEqual([
      { type: "paragraph", text: "First wrapped line" }, { type: "list", items: ["A", "B"] }, { type: "paragraph", text: "<script>evil()</script>" },
    ]);
  });
  it("does not invent content from empty input", () => { expect(getBlogContentBlocks("\n  \n")).toEqual([]); });
  it("uses one timezone-stable display publication date", () => {
    expect(formatBlogDate("2026-11-03T00:05:00Z")).toBe("November 3, 2026");
    expect(formatBlogDate(date)).toBe("November 3, 2026");
  });
  it("keeps the approved author, headline and uncropped source-image identity", () => {
    expect(AIR_ZERO_ARTICLE.authorName).toBe("Brent");
    expect(AIR_ZERO_ARTICLE.title).toBe("How Air Zero Turns Yard Signs into Neighborhood Marketing");
    expect(AIR_ZERO_ARTICLE.coverImageAlt).toContain("Just serviced this home");
    expect(AIR_ZERO_ARTICLE.content).toContain("We were just here and we did it right.");
  });
  it("gives each published article its own canonical and title, not Home metadata", () => {
    const metadata = getBlogPostMetadata(post);
    expect(metadata.title).toBe(`${AIR_ZERO_ARTICLE.title} | Blog | Workshop Creative Group`);
    expect(metadata.path).toBe(`/blog/${AIR_ZERO_ARTICLE.slug}`);
    expect(metadata.image).toBe("https://www.workshopcreativegroup.com/images/blog/air-zero-yard-sign.webp");
  });
  it("generates visible-content-matched BlogPosting schema and actual publication dates", () => {
    const schema = getPageStructuredData(getBlogPostMetadata(post))[0];
    expect(schema).toMatchObject({ "@type": "BlogPosting", headline: AIR_ZERO_ARTICLE.title, author: { "@type": "Person", name: "Brent" }, datePublished: date.toISOString() });
  });
  it("includes article metadata in initial HTML and safely escapes script boundaries", () => {
    const metadata = getBlogPostMetadata({ ...post, title: 'Print </script><script>alert(1)</script> & "Design"' });
    const html = injectSeoMetadata(template, metadata.path, metadata);
    expect(html).toContain('property="og:type" content="article"');
    expect(html).toContain('property="article:published_time"');
    expect(html).toContain("&lt;/script&gt;");
    expect(html).not.toContain('</script><script>alert(1)');
    expect(html).toContain("\\u003c/script>");
  });
  it("does not fabricate an author for future anonymous posts", () => {
    const metadata = getBlogPostMetadata({ ...post, authorName: null, coverImageUrl: null });
    expect(metadata.authorName).toBeUndefined();
    expect(getPageStructuredData(metadata)[0]).not.toHaveProperty("author", expect.anything());
  });
  it("marks nonexistent articles noindex rather than treating them as Home", () => {
    const html = injectSeoMetadata(template, "/blog/missing", null);
    expect(html).toContain('content="noindex,follow"');
    expect(html).toContain('href="https://www.workshopcreativegroup.com/blog/missing"');
    expect(html).not.toContain('"@type":"BlogPosting"');
  });
});
