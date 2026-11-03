import type { Express } from "express";
import { ROUTE_METADATA, SITE_ORIGIN, getRouteMetadata, type RouteMetadata } from "../shared/seo";
import { getPageStructuredData } from "../shared/structuredData";
import { getBlogPostMetadata } from "../shared/blogPresentation";
import { getAllBlogPosts, getBlogPostBySlug } from "./db";

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export async function resolvePageMetadata(pathname: string): Promise<RouteMetadata | null> {
  const path = pathname.replace(/\/$/, "") || "/";
  if (path.startsWith("/blog/")) {
    const post = await getBlogPostBySlug(decodeURIComponent(path.slice(6)));
    return post ? getBlogPostMetadata(post) : null;
  }
  return getRouteMetadata(path);
}

export function injectSeoMetadata(template: string, pathname: string, resolved?: RouteMetadata | null) {
  const metadata = resolved || getRouteMetadata(pathname.startsWith("/blog/") ? "/blog" : pathname);
  const canonical = `${SITE_ORIGIN}${resolved === null ? pathname : metadata.path}`;
  const image = metadata.image || `${SITE_ORIGIN}/site-asset/logo-horizontal`;
  const dynamic = [
    `<link rel="canonical" href="${escapeHtml(canonical)}" />`,
    `<meta name="robots" content="${resolved === null ? "noindex,follow" : "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"}" />`,
    `<meta property="og:type" content="${metadata.pageType === "article" ? "article" : "website"}" />`,
    `<meta property="og:site_name" content="Workshop Creative Group" />`,
    `<meta property="og:title" content="${escapeHtml(metadata.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(metadata.description)}" />`,
    `<meta property="og:url" content="${escapeHtml(canonical)}" />`,
    `<meta property="og:image" content="${escapeHtml(image)}" />`,
    `<meta property="og:image:alt" content="${escapeHtml(metadata.imageAlt || "Workshop Creative Group")}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(metadata.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(metadata.description)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(image)}" />`,
    ...(metadata.datePublished ? [`<meta property="article:published_time" content="${metadata.datePublished}" />`] : []),
    ...(metadata.dateModified ? [`<meta property="article:modified_time" content="${metadata.dateModified}" />`] : []),
    `<script type="application/ld+json">${JSON.stringify(getPageStructuredData(metadata)).replace(/</g, "\\u003c")}</script>`,
  ].join("\n    ");
  return template
    .replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(metadata.title)}</title>`)
    .replace(/<meta name="description" content="[^"]*"\s*\/>/, `<meta name="description" content="${escapeHtml(metadata.description)}" />`)
    .replace("<!-- SEO_DYNAMIC_METADATA -->", dynamic);
}

export function registerSeoRoutes(app: Express) {
  app.get("/robots.txt", (_req, res) => {
    res.type("text/plain").send(`User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /api/\nSitemap: ${SITE_ORIGIN}/sitemap.xml\n`);
  });
  app.get("/sitemap.xml", async (_req, res, next) => {
    try {
      const posts = await getAllBlogPosts();
      const paths = Object.values(ROUTE_METADATA).map(route => `<url><loc>${SITE_ORIGIN}${route.path}</loc></url>`);
      for (const post of posts) paths.push(`<url><loc>${SITE_ORIGIN}/blog/${escapeHtml(post.slug)}</loc><lastmod>${new Date(post.updatedAt).toISOString()}</lastmod></url>`);
      res.type("application/xml").send(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.join("")}</urlset>`);
    } catch (error) { next(error); }
  });
}
