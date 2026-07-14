/**
 * Print Procurement Page — Workshop Creative Group
 * Copy sourced directly from the 2026 WSCG Website Copy Deck
 */

import PageLayout from "@/components/PageLayout";
import { Link } from "wouter";

const PRODUCTS_SOURCED = [
  "Offset printing", "Digital printing", "Commercial printing", "Promotional products",
  "Apparel", "Packaging", "Labels", "Folding cartons",
  "Direct mail", "Custom boxes", "Books", "Manuals",
  "Presentation folders", "Stickers", "Decals", "Specialty printing",
  "Custom packaging", "Fulfillment services",
];

const PROCUREMENT_BENEFITS = [
  {
    stat: "10–20%",
    label: "Typical Savings",
    desc: "By matching each project with the right process and supplier, clients often save 10% to 20% while improving efficiency.",
  },
  {
    stat: "1",
    label: "Point of Contact",
    desc: "Instead of juggling multiple contacts and unknown vendors, businesses get one experienced partner.",
  },
  {
    stat: "USA",
    label: "Nationwide Network",
    desc: "Carefully selected manufacturing partners across the United States for every print category.",
  },
];

export default function PrintProcurement() {
  return (
    <PageLayout
      title="Print Procurement & Commercial Printing Solutions | Workshop Creative Group"
      description="Source commercial printing, packaging, labels, promotional products, and specialty print solutions through a nationwide print procurement network."
    >
      {/* Hero */}
      <section className="page-hero" aria-labelledby="pp-hero-heading">
        <div className="container">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-semibold uppercase tracking-widest mb-6">
              Print Procurement
            </span>
            <h1 id="pp-hero-heading" className="text-display text-4xl md:text-5xl lg:text-6xl text-white mb-5">
              One Source. Unlimited Print Solutions.
            </h1>
            <p className="text-xl text-white/70 leading-relaxed">
              Smart print procurement backed by trusted vendor relationships, better-fit materials, and competitive pricing.
            </p>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="section-py bg-white" aria-labelledby="pp-intro-heading">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <span className="section-label mb-4">How It Works</span>
            <h2 id="pp-intro-heading" className="text-heading text-3xl md:text-4xl text-gray-900 mb-4">
              The Right Vendor for Every Job
            </h2>
            <div className="divider" />
            <div className="prose-wscg">
              <p>
                Not every project belongs on the same press, substrate, or production method. Workshop Creative Group helps businesses source the right vendor, manage the process, and secure competitive pricing without the hassle of coordinating multiple suppliers.
              </p>
              <p>
                In many cases, businesses are overpaying simply because the wrong substrate or production method is being used for the job. A consultative approach helps identify the best fit for performance, appearance, turnaround, and value.
              </p>
              <p>
                Through a national production network, Workshop Creative Group sources commercial printing and specialty products through carefully selected manufacturing partners across the United States. By matching each project with the right process and supplier, clients can often save 10% to 20% while improving efficiency and overall results.
              </p>
              <p>
                Instead of juggling multiple contacts and unknown vendors, businesses get one experienced partner focused on delivering the right solution from start to finish.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="pb-16 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {PROCUREMENT_BENEFITS.map((b) => (
              <div key={b.label} className="trust-badge bg-gray-50 border-gray-100">
                <div className="text-4xl font-serif font-bold text-blue-700">{b.stat}</div>
                <h3 className="font-semibold text-gray-900">{b.label}</h3>
                <p className="text-gray-500 text-sm text-center leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products sourced */}
      <section className="section-py bg-gray-50" aria-labelledby="pp-products-heading">
        <div className="container">
          <div className="text-center mb-10">
            <span className="section-label justify-center mb-4">What We Source</span>
            <h2 id="pp-products-heading" className="text-heading text-3xl md:text-4xl text-gray-900 mb-4">
              Products We Source
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {PRODUCTS_SOURCED.map((product) => (
              <span key={product} className="tag text-sm px-4 py-2">
                {product}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-py bg-hero-gradient" aria-labelledby="pp-cta-heading">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 id="pp-cta-heading" className="text-heading text-3xl md:text-4xl text-white mb-4">
              Need Help Finding the Right Print Solution?
            </h2>
            <p className="text-white/70 mb-8">
              Upload your current invoice and let us show you how much you can save through smarter procurement.
            </p>
            <Link href="/request-quote" className="btn-primary text-base px-8 py-4" style={{ background: "white", color: "#1e3a5f" }}>
              Request a Procurement Review
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
