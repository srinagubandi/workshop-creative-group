import { SITE_ORIGIN, type RouteMetadata } from "./seo";

export type BlogContentBlock = { type: "paragraph"; text: string } | { type: "list"; items: string[] };

// React renders these strings as text, never trusted HTML or executable markdown.
export function getBlogContentBlocks(content: string): BlogContentBlock[] {
  const blocks: BlogContentBlock[] = [];
  let paragraph: string[] = [];
  let items: string[] = [];
  const flushParagraph = () => {
    if (paragraph.length) blocks.push({ type: "paragraph", text: paragraph.join(" ") });
    paragraph = [];
  };
  const flushList = () => {
    if (items.length) blocks.push({ type: "list", items });
    items = [];
  };
  for (const raw of content.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line) { flushParagraph(); flushList(); continue; }
    const item = line.match(/^(?:[-*•])\s+(.+)$/);
    if (item) { flushParagraph(); items.push(item[1]); }
    else { flushList(); paragraph.push(line); }
  }
  flushParagraph(); flushList();
  return blocks;
}

export function formatBlogDate(value: Date | string): string {
  return new Date(value).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
}

export interface BlogMetadataSource {
  slug: string;
  title: string;
  excerpt: string | null;
  authorName?: string | null;
  coverImageUrl?: string | null;
  coverImageAlt?: string | null;
  publishedAt: Date | string;
  updatedAt: Date | string;
}

export function getBlogPostMetadata(post: BlogMetadataSource): RouteMetadata {
  return {
    path: `/blog/${post.slug}`,
    pageType: "article",
    title: `${post.title} | Blog | Workshop Creative Group`,
    description: post.excerpt || post.title,
    headline: post.title,
    authorName: post.authorName || undefined,
    image: post.coverImageUrl ? new URL(post.coverImageUrl, SITE_ORIGIN).href : undefined,
    imageAlt: post.coverImageAlt || undefined,
    datePublished: new Date(post.publishedAt).toISOString(),
    dateModified: new Date(post.updatedAt).toISOString(),
  };
}
