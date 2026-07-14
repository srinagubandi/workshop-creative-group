/**
 * PageLayout — Wraps every page with Navbar + QuoteBanner + Footer + ScrollToTop
 * Also handles setting the document title and meta description per page.
 */

import { useEffect } from "react";
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
  useEffect(() => {
    if (title) {
      document.title = title;
    }
    if (description) {
      let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
      if (!meta) {
        meta = document.createElement("meta");
        meta.name = "description";
        document.head.appendChild(meta);
      }
      meta.content = description;
    }
  }, [title, description]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1" id="main-content">
        {children}
      </main>
      {!hideQuoteBanner && <QuoteBanner />}
      <Footer />
      <ScrollToTop />
    </div>
  );
}
