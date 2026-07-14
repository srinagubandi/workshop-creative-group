/**
 * Home Page — Workshop Creative Group
 *
 * Sections:
 * 1. Hero — "Stop Overpaying for Print. Save Up to 30% Today."
 * 2. Two-Step Savings Process
 * 3. About Preview
 * 4. Services Preview (3 cards)
 * 5. Why Choose Us (trust signals)
 * 6. Industries We Serve
 * 7. Final CTA
 */

import PageLayout from "@/components/PageLayout";
import { Link } from "wouter";

// ─── Service Cards ────────────────────────────────────────────────────────────

const SERVICES = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 3L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
      </svg>
    ),
    title: "Large Format Printing",
    copy: "Custom signage, banners, displays, wall graphics, window graphics, retail graphics, and wide format printing solutions designed to help businesses stand out.",
    href: "/large-format-printing",
    color: "text-blue-700",
    bg: "bg-blue-50",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
    title: "Graphic Design",
    copy: "Professional graphic design and branding services for logos, marketing materials, sales collateral, trade show graphics, packaging, and business communications.",
    href: "/graphic-design",
    color: "text-green-700",
    bg: "bg-green-50",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 2.625c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125m16.5 5.625c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
      </svg>
    ),
    title: "Print Procurement",
    copy: "Access to a trusted national network for commercial printing, packaging, labels, promotional products, apparel, direct mail, and specialty print solutions.",
    href: "/print-procurement",
    color: "text-purple-700",
    bg: "bg-purple-50",
  },
];

// ─── Trust Signals ────────────────────────────────────────────────────────────

const TRUST_SIGNALS = [
  {
    stat: "30%",
    label: "Save Up to 30%",
    desc: "On your current printing costs — same quality, better price.",
    color: "text-blue-700",
  },
  {
    stat: "20+",
    label: "Years of Experience",
    desc: "Over two decades of expertise in print, design, and production.",
    color: "text-green-700",
  },
  {
    stat: "1",
    label: "Point of Contact",
    desc: "From concept through delivery — one reliable partner for everything.",
    color: "text-purple-700",
  },
  {
    stat: "USA",
    label: "Nationwide Network",
    desc: "Trusted production partners across the United States.",
    color: "text-orange-600",
  },
];

// ─── Industries ───────────────────────────────────────────────────────────────

const INDUSTRIES = [
  "Retail", "Healthcare", "Hospitality", "Manufacturing",
  "Real Estate", "Construction", "Automotive", "Education",
  "Government", "Financial Services", "Events & Trade Shows",
  "Marketing Agencies", "Corporate", "Nonprofit",
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <PageLayout
      title="Save Up to 30% on Large Format Printing & Print Procurement | Workshop Creative Group"
      description="Stop overpaying for print. Workshop Creative Group provides large format printing, graphic design, and print procurement solutions that save businesses up to 30%. Upload your invoice for a free quote comparison today."
    >
      {/* ── 1. Hero ── */}
      <section
        className="relative overflow-hidden bg-hero-gradient min-h-screen flex items-center"
        aria-labelledby="hero-heading"
      >
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-blue-400/10 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-white/3 blur-3xl" />
        </div>

        <div className="container relative z-10 py-32 md:py-40">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <div className="animate-fade-in-up mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-semibold uppercase tracking-widest backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Print Savings Specialists Since 2006
              </span>
            </div>

            {/* H1 */}
            <h1
              id="hero-heading"
              className="text-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-6 animate-fade-in-up animate-delay-100"
            >
              Stop Overpaying<br className="hidden sm:block" /> for Print.
              <span className="block text-green-400 mt-1">Save Up to 30% Today.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-white/70 mb-4 max-w-2xl animate-fade-in-up animate-delay-200 leading-relaxed">
              We help businesses simplify print purchasing and reduce costs without sacrificing quality.
            </p>
            <p className="text-base md:text-lg text-white/60 mb-10 max-w-2xl animate-fade-in-up animate-delay-300 leading-relaxed">
              Upload your current invoice, and we'll provide a quote for the exact same job at a better price — often saving you up to 30%.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animate-delay-400">
              <Link href="/request-quote" className="btn-primary text-base px-8 py-4">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>
                Upload Invoice &amp; Get Quote
              </Link>
              <Link href="/about" className="btn-ghost-white text-base px-8 py-4">
                Explore Services
              </Link>
            </div>

            {/* Social proof strip */}
            <div className="mt-12 flex flex-wrap gap-6 animate-fade-in-up animate-delay-500">
              {["Fortune 500 Brands", "Nationwide Delivery", "20+ Years Experience"].map((item) => (
                <div key={item} className="flex items-center gap-2 text-white/50 text-sm">
                  <svg className="w-4 h-4 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce" aria-hidden="true">
          <svg className="w-6 h-6 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ── 2. Two-Step Savings Process ── */}
      <section className="section-py bg-white" aria-labelledby="process-heading">
        <div className="container">
          <div className="text-center mb-12">
            <span className="section-label justify-center mb-4">How It Works</span>
            <h2 id="process-heading" className="text-heading text-3xl md:text-4xl text-gray-900 mb-4">
              See Your Savings in Two Simple Steps
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              No guesswork, no commitments. Just a clear comparison that shows you exactly how much you can save.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto stagger-children">
            {/* Step 1 */}
            <div className="step-card">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-12 rounded-xl bg-blue-700 text-white flex items-center justify-center text-xl font-serif font-bold flex-shrink-0">
                  1
                </div>
                <h3 className="text-xl font-serif font-semibold text-gray-900">
                  Upload Your Current Invoice
                </h3>
              </div>
              <p className="text-gray-500 leading-relaxed">
                Share a recent invoice for a print job you've completed or are planning. PDF, JPG, or PNG — any format works.
              </p>
              <div className="mt-5 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <div className="flex items-center gap-3 text-blue-700 text-sm font-medium">
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                  </svg>
                  Accepts PDF, JPG, PNG
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="step-card">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-12 rounded-xl bg-green-600 text-white flex items-center justify-center text-xl font-serif font-bold flex-shrink-0">
                  2
                </div>
                <h3 className="text-xl font-serif font-semibold text-gray-900">
                  Get a Better Quote
                </h3>
              </div>
              <p className="text-gray-500 leading-relaxed">
                We'll review the specs and come back with a quote for the exact same job — often saving you up to 30% on your current printing costs.
              </p>
              <div className="mt-5 p-4 bg-green-50 rounded-lg border border-green-100">
                <div className="flex items-center gap-3 text-green-700 text-sm font-medium">
                  <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Save up to 30% — same quality
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-10">
            <Link href="/request-quote" className="btn-primary text-base px-8 py-4">
              Start Saving Now
            </Link>
          </div>
        </div>
      </section>

      {/* ── 3. About Preview ── */}
      <section className="section-py bg-gray-50" aria-labelledby="about-preview-heading">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Text */}
            <div>
              <span className="section-label mb-4">About Us</span>
              <h2 id="about-preview-heading" className="text-heading text-3xl md:text-4xl text-gray-900 mb-4">
                Print Experience Backed by Creative Thinking
              </h2>
              <div className="divider" />
              <div className="prose-wscg">
                <p>
                  Workshop Creative Group brings over 20 years of experience in graphic design and print production solutions. Businesses turn to Workshop Creative Group to move ideas from concept to completion through strategic design, high-quality printing, and dependable project execution.
                </p>
                <p>
                  From automotive and retail campaigns to corporate programs and nonprofit events, the work has supported a wide range of industries and Fortune 500 brands. Whether the project is local or nationwide, simple or complex, the focus remains on quality, consistency, value, and results.
                </p>
              </div>
              <Link href="/about" className="btn-secondary mt-8 inline-flex">
                Learn More About Us
              </Link>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-5">
              {[
                { num: "20+", label: "Years of Experience", sub: "In print & design" },
                { num: "30%", label: "Average Savings", sub: "On printing costs" },
                { num: "500+", label: "Brand Partners", sub: "Nationwide" },
                { num: "1", label: "Point of Contact", sub: "For every project" },
              ].map((stat) => (
                <div key={stat.label} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <div className="stat-number text-4xl mb-1">{stat.num}</div>
                  <div className="font-semibold text-gray-900 text-sm mb-0.5">{stat.label}</div>
                  <div className="text-gray-400 text-xs">{stat.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Services Preview ── */}
      <section className="section-py bg-white" aria-labelledby="services-heading">
        <div className="container">
          <div className="text-center mb-12">
            <span className="section-label justify-center mb-4">What We Do</span>
            <h2 id="services-heading" className="text-heading text-3xl md:text-4xl text-gray-900 mb-4">
              Complete Print and Creative Solutions
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Workshop Creative Group helps businesses manage everything from large format graphics and branding support to commercial print sourcing. The service model is designed to make the process easier, more strategic, and more cost-effective.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 stagger-children">
            {SERVICES.map((service) => (
              <Link key={service.href} href={service.href} className="service-card group block">
                <div className={`w-14 h-14 rounded-xl ${service.bg} ${service.color} flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110`}>
                  {service.icon}
                </div>
                <h3 className="text-xl font-serif font-semibold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-5">
                  {service.copy}
                </p>
                <span className={`inline-flex items-center gap-1.5 text-sm font-semibold ${service.color} group-hover:gap-2.5 transition-all duration-200`}>
                  Learn More
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/large-format-printing" className="btn-secondary">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* ── 5. Why Choose Us ── */}
      <section className="section-py bg-hero-gradient" aria-labelledby="why-heading">
        <div className="container">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-semibold uppercase tracking-widest mb-4">
              Why Us
            </span>
            <h2 id="why-heading" className="text-heading text-3xl md:text-4xl text-white mb-4">
              Why Businesses Choose Workshop Creative Group
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 stagger-children">
            {TRUST_SIGNALS.map((signal) => (
              <div key={signal.label} className="trust-badge bg-white/10 border-white/20 backdrop-blur-sm">
                <div className={`text-5xl font-serif font-bold ${signal.color} bg-white rounded-xl w-20 h-20 flex items-center justify-center text-3xl`}>
                  {signal.stat}
                </div>
                <h3 className="text-white font-semibold text-base">{signal.label}</h3>
                <p className="text-white/60 text-sm text-center leading-relaxed">{signal.desc}</p>
              </div>
            ))}
          </div>

          {/* Additional bullets */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {[
              "Competitive pricing and smarter sourcing",
              "Quality control and dependable turnaround",
              "Solutions tailored to the right substrate, method, and budget",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 bg-white/10 rounded-xl p-4 border border-white/10">
                <svg className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-white/80 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Industries We Serve ── */}
      <section className="section-py bg-gray-50" aria-labelledby="industries-heading">
        <div className="container">
          <div className="text-center mb-10">
            <span className="section-label justify-center mb-4">Industries</span>
            <h2 id="industries-heading" className="text-heading text-3xl md:text-4xl text-gray-900 mb-4">
              Industries We Serve
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Workshop Creative Group works with businesses across a wide range of industries, delivering tailored print and design solutions for every environment.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {INDUSTRIES.map((industry) => (
              <span key={industry} className="tag text-sm px-4 py-2">
                {industry}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. Final CTA ── */}
      <section className="section-py bg-white" aria-labelledby="cta-heading">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <span className="section-label justify-center mb-4">Get Started</span>
            <h2 id="cta-heading" className="text-heading text-3xl md:text-4xl text-gray-900 mb-4">
              Ready to See How Much You Can Save?
            </h2>
            <p className="text-gray-500 text-lg mb-8 leading-relaxed">
              Upload your invoice today and let us provide a competitive quote for your next large format printing, graphic design, or commercial printing project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/request-quote" className="btn-primary text-base px-8 py-4">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>
                Upload Invoice &amp; Get Quote
              </Link>
              <Link href="/contact" className="btn-secondary text-base px-8 py-4">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
