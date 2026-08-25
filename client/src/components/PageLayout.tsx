/**
 * PageLayout — Wraps every page with Navbar + QuoteBanner + Footer + ScrollToTop
 * Also handles setting the document title and meta description per page.
 */

import { useEffect } from "react";
import { useLocation } from "wouter";
import { SITE_ORIGIN, getRouteMetadata } from "@shared/seo";
import Footer from "./Footer";
import Navbar from "./Navbar";
import QuoteBanner from "./QuoteBanner";
import ScrollToTop from "./ScrollToTop";

interface PageLayoutProps {
  children: React.ReactNode;
  /** Page <title> tag content */
  title?: string;
  /** Meta description content */
  description?: string;
  /** Hide the QuoteBanner (e.g. on the Request a Quote page itself) */
  hideQuoteBanner?: boolean;
}

export default function PageLayout({
  children,
  title,
  description,
  hideQuoteBanner = false,
}: PageLayoutProps) {
  const [location] = useLocation();
  useEffect(() => {
    const metadata = getRouteMetadata(location);
    document.title = metadata?.title || title || document.title;
    const resolvedDescription = metadata?.description || description;
    if (resolvedDescription) {
      let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
      if (!meta) {
        meta = document.createElement("meta");
        meta.name = "description";
        document.head.appendChild(meta);
      }
      meta.content = resolvedDescription;
    }
    const upsert = (selector: string, attribute: "name" | "property", key: string, value: string) => {
      let element = document.querySelector(selector) as HTMLMetaElement | null;
      if (!element) { element = document.createElement("meta"); element.setAttribute(attribute, key); document.head.appendChild(element); }
      element.content = value;
    };
    if (metadata) {
      const canonical = `${SITE_ORIGIN}${metadata.path}`;
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!link) { link = document.createElement("link"); link.rel = "canonical"; document.head.appendChild(link); }
      link.href = canonical;
      upsert('meta[property="og:title"]', "property", "og:title", metadata.title);
      upsert('meta[property="og:description"]', "property", "og:description", metadata.description);
      upsert('meta[property="og:url"]', "property", "og:url", canonical);
      upsert('meta[name="twitter:title"]', "name", "twitter:title", metadata.title);
      upsert('meta[name="twitter:description"]', "name", "twitter:description", metadata.description);
    }
  }, [location, title, description]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <Navbar />
      <main className="flex-1" id="main-content" tabIndex={-1}>
        {children}
      </main>
      {!hideQuoteBanner && <QuoteBanner />}
      <Footer />
      <ScrollToTop />
    </div>
  );
}
