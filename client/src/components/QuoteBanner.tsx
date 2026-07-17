/**
 * QuoteBanner — Full-width conversion strip above the footer.
 * Blue background (#1260ae) with white CTA button.
 */

import { Link } from "wouter";

export default function QuoteBanner() {
  return (
    <section
      className="py-12 md:py-16"
      style={{ background: "#1260ae" }}
      aria-label="Request a quote"
    >
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-2"
               style={{ color: "#7dbe31" }}>
              Stop Overpaying
            </p>
            <h2 className="text-white text-2xl md:text-3xl lg:text-4xl font-serif font-bold leading-tight">
              Save Up to 20% on Your<br className="hidden md:block" /> Current Printing Costs
            </h2>
            <p className="mt-2 text-base md:text-lg" style={{ color: "rgba(255,255,255,0.75)" }}>
              Upload your invoice — we'll quote the same job at a better price.
            </p>
          </div>
          <div className="flex-shrink-0">
            <Link
              href="/request-quote"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white font-bold text-base rounded-xl shadow-lg transition-colors duration-200 active:scale-95 whitespace-nowrap"
              style={{ color: "#1260ae" }}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>
              Get Your Free Quote Comparison
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
