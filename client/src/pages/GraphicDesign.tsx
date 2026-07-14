/**
 * Graphic Design Page — Workshop Creative Group
 * Copy sourced directly from the 2026 WSCG Website Copy Deck
 */

import PageLayout from "@/components/PageLayout";
import { Link } from "wouter";

const DESIGN_SERVICES = [
  "Logo design", "Brand identity", "Branding support", "Marketing collateral",
  "Brochures", "Flyers", "Business cards", "Sales sheets",
  "Catalogs", "Packaging design", "Trade show graphics", "Large format design",
];

const DESIGN_BENEFITS = [
  {
    title: "Strategic, Not Just Aesthetic",
    desc: "Design decisions are grounded in communication goals and business outcomes — not just visual preference.",
    icon: "🎯",
  },
  {
    title: "Print-Ready Production",
    desc: "Every file is built for print production — correct color profiles, bleeds, and specs from the start.",
    icon: "🖨️",
  },
  {
    title: "Consistent Brand Voice",
    desc: "Cohesive design across all touchpoints builds recognition and trust with your audience.",
    icon: "✨",
  },
];

export default function GraphicDesign() {
  return (
    <PageLayout
      title="Graphic Design & Branding Services | Workshop Creative Group"
      description="Professional graphic design, branding, logo design, marketing materials, packaging design, and large format design for businesses."
    >
      {/* Hero */}
      <section className="page-hero" aria-labelledby="gd-hero-heading">
        <div className="container">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-semibold uppercase tracking-widest mb-6">
              Graphic Design
            </span>
            <h1 id="gd-hero-heading" className="text-display text-4xl md:text-5xl lg:text-6xl text-white mb-5">
              Graphic Design That Strengthens Your Brand
            </h1>
            <p className="text-xl text-white/70 leading-relaxed">
              Clean, professional creative built for print, marketing, and business growth.
            </p>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="section-py bg-white" aria-labelledby="gd-intro-heading">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <span className="section-label mb-4">Design Services</span>
              <h2 id="gd-intro-heading" className="text-heading text-3xl md:text-4xl text-gray-900 mb-4">
                Design That Works as Hard as You Do
              </h2>
              <div className="divider" />
              <div className="prose-wscg">
                <p>
                  Workshop Creative Group offers graphic design services that help businesses communicate clearly and present themselves professionally across print and branded materials. Whether launching a new company, refreshing an identity, or creating marketing materials, the design approach is strategic, practical, and effective.
                </p>
                <p>
                  Good design does more than look polished. It creates consistency, improves communication, and helps customers remember a business. Workshop Creative Group develops branding and graphic design solutions that support real business goals while remaining practical for print production and everyday use.
                </p>
              </div>
              <Link href="/request-quote" className="btn-primary mt-8 inline-flex">
                Start Your Design Project
              </Link>
            </div>

            {/* Benefits */}
            <div className="space-y-5">
              {DESIGN_BENEFITS.map((b) => (
                <div key={b.title} className="flex gap-4 p-6 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="text-3xl flex-shrink-0">{b.icon}</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{b.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services list */}
      <section className="section-py bg-gray-50" aria-labelledby="gd-services-heading">
        <div className="container">
          <div className="text-center mb-10">
            <span className="section-label justify-center mb-4">What We Design</span>
            <h2 id="gd-services-heading" className="text-heading text-3xl md:text-4xl text-gray-900 mb-4">
              Graphic Design Services
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {DESIGN_SERVICES.map((service) => (
              <span key={service} className="tag text-sm px-4 py-2">
                {service}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-py bg-hero-gradient" aria-labelledby="gd-cta-heading">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 id="gd-cta-heading" className="text-heading text-3xl md:text-4xl text-white mb-4">
              Ready to Elevate Your Brand?
            </h2>
            <p className="text-white/70 mb-8">
              Let's create design that communicates clearly, looks professional, and supports your business goals.
            </p>
            <Link href="/request-quote" className="btn-primary text-base px-8 py-4" style={{ background: "white", color: "#1e3a5f" }}>
              Start Your Design Project
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
