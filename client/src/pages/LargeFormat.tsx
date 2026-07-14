/**
 * Large Format Printing Page — Workshop Creative Group
 * Copy sourced directly from the 2026 WSCG Website Copy Deck
 */

import PageLayout from "@/components/PageLayout";
import { Link } from "wouter";

const PRODUCTS = [
  "Vinyl banners", "Banner printing", "Trade show displays", "Retractable banner stands",
  "Wall murals", "Wall graphics", "Window graphics", "Floor graphics",
  "Vehicle graphics", "Storefront signage", "Sign printing", "POP displays",
  "Retail displays", "Event graphics", "Backlit graphics", "Mounted prints",
  "Foam board signs", "PVC signs", "Acrylic signs", "Aluminum composite panels",
  "Wayfinding signage", "Construction signs", "Outdoor graphics", "Custom displays",
];

const FEATURES = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Durability First",
    desc: "Materials selected for real-world performance — indoor, outdoor, short-term, and long-term applications.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Brand Consistency",
    desc: "Color-accurate output that keeps your brand looking sharp across every format and substrate.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Dependable Turnaround",
    desc: "Production timelines you can count on, with rush options available for time-sensitive projects.",
  },
];

export default function LargeFormat() {
  return (
    <PageLayout
      title="Large Format Printing & Sign Printing | Workshop Creative Group"
      description="Explore large format printing, banner printing, wall graphics, window graphics, trade show displays, retail graphics, and signage solutions."
    >
      {/* Hero */}
      <section className="page-hero" aria-labelledby="lf-hero-heading">
        <div className="container">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-semibold uppercase tracking-widest mb-6">
              Large Format Printing
            </span>
            <h1 id="lf-hero-heading" className="text-display text-4xl md:text-5xl lg:text-6xl text-white mb-5">
              Large Format Printing That Gets You Noticed
            </h1>
            <p className="text-xl text-white/70 leading-relaxed">
              High-impact graphics, signage, and displays designed to elevate your brand.
            </p>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="section-py bg-white" aria-labelledby="lf-intro-heading">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <span className="section-label justify-center mb-4">What We Print</span>
            <h2 id="lf-intro-heading" className="text-heading text-3xl md:text-4xl text-gray-900 mb-4">
              Wide Format Solutions for Every Environment
            </h2>
            <div className="divider mx-auto" />
            <p className="text-gray-500 text-lg leading-relaxed">
              Workshop Creative Group provides large format printing and wide format printing solutions for businesses that need to stand out in retail, event, office, and exterior environments. Every project is produced with a focus on durability, visibility, brand consistency, and real-world performance.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="pb-16 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FEATURES.map((f) => (
              <div key={f.title} className="flex gap-4 p-6 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="w-10 h-10 rounded-lg bg-blue-700 text-white flex items-center justify-center flex-shrink-0">
                  {f.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{f.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="section-py bg-gray-50" aria-labelledby="lf-products-heading">
        <div className="container">
          <div className="text-center mb-10">
            <span className="section-label justify-center mb-4">Products</span>
            <h2 id="lf-products-heading" className="text-heading text-3xl md:text-4xl text-gray-900 mb-4">
              Large Format Printing Products
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {PRODUCTS.map((product) => (
              <span key={product} className="tag text-sm px-4 py-2">
                {product}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Supporting copy */}
      <section className="section-py bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="prose-wscg text-center">
              <p>
                From one-off event graphics to complete branded environments, Workshop Creative Group helps businesses select the right materials, print methods, and finishing options for the application. The goal is to deliver large format graphics that look sharp, last longer, and represent the business well.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-py bg-hero-gradient" aria-labelledby="lf-cta-heading">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 id="lf-cta-heading" className="text-heading text-3xl md:text-4xl text-white mb-4">
              Need Large Format Graphics for Your Business?
            </h2>
            <p className="text-white/70 mb-8">
              Upload your current invoice and see how much you can save on your next large format print project.
            </p>
            <Link href="/request-quote" className="btn-primary text-base px-8 py-4" style={{ background: "white", color: "#1e3a5f" }}>
              Request a Quote
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
