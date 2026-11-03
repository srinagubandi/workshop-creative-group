import { SITE_ORIGIN, type RouteMetadata } from "./seo";

export function getPageStructuredData(metadata: RouteMetadata) {
  const organization = {
    "@context": "https://schema.org", "@type": "Organization", "@id": `${SITE_ORIGIN}/#organization`,
    name: "Workshop Creative Group", url: SITE_ORIGIN, logo: `${SITE_ORIGIN}/site-asset/brand-icon`,
    description: "Nationwide print brokerage providing large format printing, graphic design, and print procurement for businesses.",
    areaServed: { "@type": "Country", name: "United States" }, knowsAbout: ["Print procurement", "Large format printing", "Graphic design", "Print brokerage"],
  };
  const common = { "@context": "https://schema.org", description: metadata.description, url: `${SITE_ORIGIN}${metadata.path}` };
  const page = metadata.pageType === "article" ? {
    ...common, "@type": "BlogPosting", headline: metadata.headline,
    mainEntityOfPage: `${SITE_ORIGIN}${metadata.path}`,
    author: metadata.authorName ? { "@type": "Person", name: metadata.authorName } : undefined,
    publisher: { "@type": "Organization", name: "Workshop Creative Group", url: SITE_ORIGIN },
    image: metadata.image, datePublished: metadata.datePublished, dateModified: metadata.dateModified,
  } : metadata.pageType === "service" ? {
    ...common, "@type": "Service", name: metadata.serviceName,
    provider: { "@id": `${SITE_ORIGIN}/#organization` }, areaServed: { "@type": "Country", name: "United States" },
  } : {
    ...common, "@type": metadata.pageType === "collection" ? "CollectionPage" : metadata.pageType === "contact" ? "ContactPage" : "WebPage",
    name: metadata.title,
    isPartOf: { "@type": "WebSite", "@id": `${SITE_ORIGIN}/#website`, name: "Workshop Creative Group", url: SITE_ORIGIN },
    about: { "@id": `${SITE_ORIGIN}/#organization` },
  };
  return metadata.path === "/" ? [organization, page] : [page];
}
