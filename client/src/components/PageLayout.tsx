import { useEffect } from "react";
import { useLocation } from "wouter";
import { SITE_ORIGIN, getRouteMetadata, type RouteMetadata } from "@shared/seo";
import { getPageStructuredData } from "@shared/structuredData";
import Footer from "./Footer";
import Navbar from "./Navbar";
import QuoteBanner from "./QuoteBanner";
import ScrollToTop from "./ScrollToTop";

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  metadata?: RouteMetadata;
  noIndex?: boolean;
  preserveMetadata?: boolean;
  hideQuoteBanner?: boolean;
}

export default function PageLayout({ children, title, description, metadata: override, noIndex = false, preserveMetadata = false, hideQuoteBanner = false }: PageLayoutProps) {
  const [location] = useLocation();
  useEffect(() => {
    // A loading/transient-error view cannot establish that a published article
    // is missing. Retain its authoritative initial HTML until data resolves.
    if (preserveMetadata) return;
    const metadata = override || (location.startsWith("/blog/")
      ? { ...getRouteMetadata("/blog"), path: location, title: title || "Blog | Workshop Creative Group", description: description || getRouteMetadata("/blog").description }
      : getRouteMetadata(location));
    document.title = metadata.title;
    const upsert = (attribute: "name" | "property", key: string, value: string) => {
      let element = document.querySelector(`meta[${attribute}="${key}"]`) as HTMLMetaElement | null;
      if (!element) { element = document.createElement("meta"); element.setAttribute(attribute, key); document.head.appendChild(element); }
      element.content = value;
    };
    upsert("name", "description", metadata.description);
    upsert("name", "robots", noIndex ? "noindex,follow" : "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1");
    const canonical = `${SITE_ORIGIN}${metadata.path}`;
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) { link = document.createElement("link"); link.rel = "canonical"; document.head.appendChild(link); }
    link.href = canonical;
    upsert("property", "og:type", metadata.pageType === "article" ? "article" : "website");
    upsert("property", "og:title", metadata.title);
    upsert("property", "og:description", metadata.description);
    upsert("property", "og:url", canonical);
    upsert("property", "og:image", metadata.image || `${SITE_ORIGIN}/site-asset/logo-horizontal`);
    upsert("property", "og:image:alt", metadata.imageAlt || "Workshop Creative Group");
    upsert("name", "twitter:title", metadata.title);
    upsert("name", "twitter:description", metadata.description);
    upsert("name", "twitter:image", metadata.image || `${SITE_ORIGIN}/site-asset/logo-horizontal`);
    for (const [key, value] of [["article:published_time", metadata.datePublished], ["article:modified_time", metadata.dateModified]]) {
      if (value) upsert("property", key!, value);
      else document.querySelector(`meta[property="${key}"]`)?.remove();
    }
    let schema = document.querySelector('script[type="application/ld+json"]');
    if (!schema) { schema = document.createElement("script"); schema.setAttribute("type", "application/ld+json"); document.head.appendChild(schema); }
    schema.textContent = JSON.stringify(getPageStructuredData(metadata));
  }, [location, title, description, override, noIndex, preserveMetadata]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <Navbar />
      <main className="flex-1" id="main-content" tabIndex={-1}>{children}</main>
      {!hideQuoteBanner && <QuoteBanner />}
      <Footer />
      <ScrollToTop />
    </div>
  );
}
