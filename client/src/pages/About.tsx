/**
 * About Page — Workshop Creative Group
 * Copy sourced directly from the 2026 WSCG Website Copy Deck
 */

import PageLayout from "@/components/PageLayout";
import { Link } from "wouter";

const VALUES = [
  "Strategic guidance, not just order taking",
  "Experience across multiple industries and project types",
  "Reliable vendor relationships across the United States",
  "Strong focus on timelines, detail, quality, and value",
  "Creative and production expertise under one roof",
];

export default function About() {
  return (
    <PageLayout
      title="About Workshop Creative Group | Print, Design & Branding Experience"
      description="Learn about Workshop Creative Group and more than 20 years of experience in graphic design, print production, branding, and nationwide print solutions."
    >
      {/* Hero */}
      <section className="page-hero" aria-labelledby="about-hero-heading">
        <div className="container">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-semibold uppercase tracking-widest mb-6">
              Our Story
            </span>
            <h1 id="about-hero-heading" className="text-display text-4xl md:text-5xl lg:text-6xl text-white mb-5">
              Over 20 Years of Helping Businesses Stand Out
            </h1>
            <p className="text-xl text-white/70 leading-relaxed">
              Graphic design, print production, and sourcing solutions built around quality, service, and smart execution.
            </p>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="section-py bg-white" aria-labelledby="about-main-heading">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <span className="section-label mb-4">Our Philosophy</span>
              <h2 id="about-main-heading" className="text-heading text-3xl md:text-4xl text-gray-900 mb-4">
                Built on Exceptional Quality and Honest Advice
              </h2>
              <div className="divider" />
              <div className="prose-wscg">
                <p>
                  Workshop Creative Group was built on a simple philosophy: provide exceptional quality, honest advice, and outstanding customer service.
                </p>
                <p>
                  For over two decades, businesses of all sizes have partnered with Workshop Creative Group to create impactful print, branding, and graphic design solutions. From a single banner to a nationwide marketing campaign, the experience behind the company allows each project to be matched with the right solution, not simply the one that is easiest to produce.
                </p>
                <p>
                  By combining in-house large format printing with an extensive network of trusted print partners, Workshop Creative Group provides clients with access to a wide range of commercial printing and custom printing solutions through one reliable source. The mission is to simplify the print buying process while delivering exceptional results that help clients grow.
                </p>
              </div>
              <Link href="/request-quote" className="btn-primary mt-8 inline-flex">
                Request a Quote
              </Link>
            </div>

            {/* Values */}
            <div>
              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                <h2 className="text-heading text-2xl text-gray-900 mb-6">
                  What Sets Workshop Creative Group Apart
                </h2>
                <ul className="space-y-4 list-none m-0 p-0">
                  {VALUES.map((value) => (
                    <li key={value} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-700 leading-relaxed">{value}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                {[
                  { num: "2006", label: "Founded" },
                  { num: "20+", label: "Years Experience" },
                  { num: "USA", label: "Nationwide" },
                  { num: "500+", label: "Brands Served" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm text-center">
                    <div className="text-3xl font-serif font-bold text-blue-700 mb-1">{stat.num}</div>
                    <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-py bg-gray-50" aria-labelledby="about-cta-heading">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 id="about-cta-heading" className="text-heading text-3xl md:text-4xl text-gray-900 mb-4">
              Let's Talk About Your Next Project
            </h2>
            <p className="text-gray-500 mb-8">
              Whether the need is large format printing, graphic design, or print procurement — Workshop Creative Group is ready to help.
            </p>
            <Link href="/request-quote" className="btn-primary text-base px-8 py-4">
              Request a Quote
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
