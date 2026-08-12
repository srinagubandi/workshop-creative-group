import type { Express } from "express";
import { ROUTE_METADATA, SITE_ORIGIN, getRouteMetadata } from "../shared/seo";

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function structuredData(pathname: string) {
  const metadata = getRouteMetadata(pathname);
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_ORIGIN}/#organization`,
    name: "Workshop Creative Group",
    url: SITE_ORIGIN,
    logo: `${SITE_ORIGIN}/site-asset/brand-icon`,
    description: "Nationwide print brokerage providing large format printing, graphic design, and print procurement for businesses.",
    areaServed: { "@type": "Country", name: "United States" },
    knowsAbout: ["Print procurement", "Large format printing", "Graphic design", "Print brokerage"],
  };
  const page = metadata.pageType === "service" ? {
    "@context": "https://schema.org",
    "@type": "Service",
    name: metadata.serviceName,
    description: metadata.description,
    url: `${SITE_ORIGIN}${metadata.path}`,
    provider: { "@id": `${SITE_ORIGIN}/#organization` },
    areaServed: { "@type": "Country", name: "United States" },
  } : {
    "@context": "https://schema.org",
    "@type": metadata.pageType === "collection" ? "CollectionPage" : metadata.pageType === "contact" ? "ContactPage" : "WebPage",
    name: metadata.title,
    description: metadata.description,
    url: `${SITE_ORIGIN}${metadata.path}`,
    isPartOf: { "@type": "WebSite", "@id": `${SITE_ORIGIN}/#website`, name: "Workshop Creative Group", url: SITE_ORIGIN },
    about: { "@id": `${SITE_ORIGIN}/#organization` },
  };
  return pathname === "/" ? [organization, page] : [page];
}

export function injectSeoMetadata(template: string, pathname: string) {
  const metadata = getRouteMetadata(pathname);
  const canonical = `${SITE_ORIGIN}${metadata.path}`;
  const image = `${SITE_ORIGIN}/site-asset/logo-horizontal`;
  const dynamic = [
    `<link rel="canonical" href="${canonical}" />`,
    `<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="Workshop Creative Group" />`,
    `<meta property="og:title" content="${escapeHtml(metadata.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(metadata.description)}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(metadata.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(metadata.description)}" />`,
    `<script type="application/ld+json">${JSON.stringify(structuredData(pathname)).replace(/</g, "\\u003c")}</script>`,
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
  app.get("/sitemap.xml", (_req, res) => {
    const urls = Object.values(ROUTE_METADATA)
      .filter(route => route.path !== "/blog")
      .map(route => `<url><loc>${SITE_ORIGIN}${route.path}</loc><changefreq>monthly</changefreq><priority>${route.path === "/" ? "1.0" : "0.8"}</priority></url>`)
      .join("");
    res.type("application/xml").send(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`);
  });
}
