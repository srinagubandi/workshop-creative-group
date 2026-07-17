/**
 * Home Page — Workshop Creative Group
 *
 * Sections:
 * 1. Hero — "Stop Overpaying for Print. Save Up to 20% Today."
 * 2. Two-Step Savings Process
 * 3. About Preview
 * 4. Services Preview (3 cards)
 * 5. Why Choose Us (polished trust signals)
 * 6. Industries We Serve
 */

import PageLayout from "@/components/PageLayout";
import { Link } from "wouter";

// ─── Service Cards ────────────────────────────────────────────────────────────

const SERVICES = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0H3" />
      </svg>
    ),
    title: "Large Format Printing",
    copy: "Custom signage, banners, displays, wall graphics, window graphics, retail graphics, and wide format printing solutions designed to help businesses stand out.",
    href: "/large-format-printing",
    color: "text-blue-700",
    bg: "bg-blue-50",
    border: "group-hover:border-blue-200",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
    title: "Graphic Design",
    copy: "Professional graphic design and branding services for logos, marketing materials, sales collateral, trade show graphics, packaging, and business communications.",
    href: "/graphic-design",
    color: "text-emerald-700",
    bg: "bg-emerald-50",
    border: "group-hover:border-emerald-200",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
      </svg>
    ),
    title: "Print Procurement",
    copy: "Access to a trusted national network for commercial printing, packaging, labels, promotional products, apparel, direct mail, and specialty print solutions.",
    href: "/print-procurement",
    color: "text-violet-700",
    bg: "bg-violet-50",
    border: "group-hover:border-violet-200",
  },
];

// ─── Why Choose Us ────────────────────────────────────────────────────────────

const WHY_US = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Save Up to 20%",
    desc: "Upload your current invoice and we'll quote the exact same job at a better price — without cutting corners on quality.",
    accent: "bg-green-50 text-green-700 border-green-100",
    iconBg: "bg-green-100 text-green-700",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
    title: "20+ Years of Experience",
    desc: "Over two decades of expertise in print production, graphic design, and nationwide sourcing across every major industry.",
    accent: "bg-blue-50 text-blue-700 border-blue-100",
    iconBg: "bg-blue-100 text-blue-700",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
    title: "One Point of Contact",
    desc: "From concept through delivery, you work with one experienced partner — no juggling vendors, no chasing down quotes.",
    accent: "bg-violet-50 text-violet-700 border-violet-100",
    iconBg: "bg-violet-100 text-violet-700",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
      </svg>
    ),
    title: "Nationwide Network",
    desc: "Carefully selected production partners across the United States, matched to each project's specs, timeline, and budget.",
    accent: "bg-amber-50 text-amber-700 border-amber-100",
    iconBg: "bg-amber-100 text-amber-700",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
    title: "Quality You Can Count On",
    desc: "Every project is reviewed to ensure the right substrate, production method, and finishing — delivered on time, every time.",
    accent: "bg-rose-50 text-rose-700 border-rose-100",
    iconBg: "bg-rose-100 text-rose-700",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: "Smarter Sourcing",
    desc: "We identify the best production method for your job — not just the easiest one — so you get better results at a lower cost.",
    accent: "bg-cyan-50 text-cyan-700 border-cyan-100",
    iconBg: "bg-cyan-100 text-cyan-700",
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
      title="Save Up to 20% on Large Format Printing & Print Procurement | Workshop Creative Group"
      description="Stop overpaying for print. Workshop Creative Group provides large format printing, graphic design, and print procurement solutions that save businesses up to 20%. Upload your invoice for a free quote comparison today."
    >
      {/* ── 1. Hero ── */}
      <section className="relative overflow-hidden bg-hero-gradient min-h-screen flex items-center" aria-labelledby="hero-heading">
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-blue-400/10 blur-3xl" />
        </div>

        <div className="container relative z-10 py-32 md:py-40">
          <div className="max-w-3xl">
            <div className="animate-fade-in-up mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-semibold uppercase tracking-widest backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Print Savings Specialists Since 2006
              </span>
            </div>

            <h1 id="hero-heading" className="text-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-6 animate-fade-in-up animate-delay-100">
              Stop Overpaying<br className="hidden sm:block" /> for Print.
              <span className="block text-green-400 mt-1">Save Up to 20% Today.</span>
            </h1>

            <p className="text-lg md:text-xl text-white/70 mb-4 max-w-2xl animate-fade-in-up animate-delay-200 leading-relaxed">
              We help businesses simplify print purchasing and reduce costs without sacrificing quality.
            </p>
            <p className="text-base md:text-lg text-white/60 mb-10 max-w-2xl animate-fade-in-up animate-delay-300 leading-relaxed">
              Upload your current invoice, and we'll provide a quote for the exact same job at a better price — often saving you up to 20%.
            </p>

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

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce" aria-hidden="true">
          <svg className="w-6 h-6 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ── 2. Two-Step Process ── */}
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
            <div className="step-card">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-12 rounded-xl bg-blue-700 text-white flex items-center justify-center text-xl font-serif font-bold flex-shrink-0">1</div>
                <h3 className="text-xl font-serif font-semibold text-gray-900">Upload Your Current Invoice</h3>
              </div>
              <p className="text-gray-500 leading-relaxed">Share a recent invoice for a print job you've completed or are planning. PDF, JPG, or PNG — any format works.</p>
              <div className="mt-5 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <div className="flex items-center gap-3 text-blue-700 text-sm font-medium">
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                  </svg>
                  Accepts PDF, JPG, PNG
                </div>
              </div>
            </div>

            <div className="step-card">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-12 rounded-xl bg-green-600 text-white flex items-center justify-center text-xl font-serif font-bold flex-shrink-0">2</div>
                <h3 className="text-xl font-serif font-semibold text-gray-900">Get a Better Quote</h3>
              </div>
              <p className="text-gray-500 leading-relaxed">We'll review the specs and come back with a quote for the exact same job — often saving you up to 20% on your current printing costs.</p>
              <div className="mt-5 p-4 bg-green-50 rounded-lg border border-green-100">
                <div className="flex items-center gap-3 text-green-700 text-sm font-medium">
                  <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Save up to 20% — same quality
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-10">
            <Link href="/request-quote" className="btn-primary text-base px-8 py-4">Start Saving Now</Link>
          </div>
        </div>
      </section>

      {/* ── 3. About Preview ── */}
      <section className="section-py bg-gray-50" aria-labelledby="about-preview-heading">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <span className="section-label mb-4">About Us</span>
              <h2 id="about-preview-heading" className="text-heading text-3xl md:text-4xl text-gray-900 mb-4">
                Print Experience Backed by Creative Thinking
              </h2>
              <div className="divider" />
              <div className="prose-wscg">
                <p>Workshop Creative Group brings over 20 years of experience in graphic design and print production solutions. Businesses turn to Workshop Creative Group to move ideas from concept to completion through strategic design, high-quality printing, and dependable project execution.</p>
                <p>From automotive and retail campaigns to corporate programs and nonprofit events, the work has supported a wide range of industries and Fortune 500 brands. Whether the project is local or nationwide, simple or complex, the focus remains on quality, consistency, value, and results.</p>
              </div>
              <Link href="/about" className="btn-secondary mt-8 inline-flex">Learn More About Us</Link>
            </div>

            <div className="grid grid-cols-2 gap-5">
              {[
                { num: "20+", label: "Years of Experience", sub: "In print & design" },
                { num: "20%", label: "Average Savings", sub: "On printing costs" },
                { num: "100+", label: "Clients Served", sub: "Nationwide" },
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
              Workshop Creative Group helps businesses manage everything from large format graphics and branding support to commercial print sourcing — easier, more strategic, and more cost-effective.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 stagger-children">
            {SERVICES.map((service) => (
              <Link key={service.href} href={service.href} className={`service-card group block border border-gray-100 ${service.border}`}>
                <div className={`w-14 h-14 rounded-xl ${service.bg} ${service.color} flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110`}>
                  {service.icon}
                </div>
                <h3 className="text-xl font-serif font-semibold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-5">{service.copy}</p>
                <span className={`inline-flex items-center gap-1.5 text-sm font-semibold ${service.color} group-hover:gap-2.5 transition-all duration-200`}>
                  Learn More
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Why Choose Us — polished 6-card grid ── */}
      <section className="section-py bg-gray-50" aria-labelledby="why-heading">
        <div className="container">
          <div className="text-center mb-12">
            <span className="section-label justify-center mb-4">Why Us</span>
            <h2 id="why-heading" className="text-heading text-3xl md:text-4xl text-gray-900 mb-4">
              Why Businesses Choose Workshop Creative Group
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              From competitive pricing to dependable turnaround, here's what sets us apart.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 stagger-children">
            {WHY_US.map((item) => (
              <div key={item.title} className={`rounded-2xl p-6 border ${item.accent} flex gap-4`}>
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${item.iconBg}`}>
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1.5 text-base">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Industries We Serve ── */}
      <section className="section-py bg-white" aria-labelledby="industries-heading">
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
              <span key={industry} className="tag text-sm px-4 py-2">{industry}</span>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
