/**
 * Contact Page — Workshop Creative Group
 * Copy sourced directly from the 2026 WSCG Website Copy Deck
 */

import PageLayout from "@/components/PageLayout";
import { Link } from "wouter";

const CONTACT_PROMPTS = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
    label: "Request a quote",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
      </svg>
    ),
    label: "Ask a project question",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
    label: "Discuss materials or substrates",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
      </svg>
    ),
    label: "Share files or specifications",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
      </svg>
    ),
    label: "Get guidance on the best print solution",
  },
];

export default function Contact() {
  return (
    <PageLayout
      title="Contact Workshop Creative Group"
      description="Contact Workshop Creative Group to discuss large format printing, graphic design, print procurement, and custom print solutions."
    >
      {/* Hero */}
      <section className="page-hero" aria-labelledby="contact-hero-heading">
        <div className="container">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-semibold uppercase tracking-widest mb-6">
              Get in Touch
            </span>
            <h1 id="contact-hero-heading" className="text-display text-4xl md:text-5xl lg:text-6xl text-white mb-5">
              Contact Workshop Creative Group
            </h1>
            <p className="text-xl text-white/70 leading-relaxed">
              Let's talk about your next print, design, or sourcing project.
            </p>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="section-py bg-white" aria-labelledby="contact-main-heading">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left: copy + prompts */}
            <div>
              <span className="section-label mb-4">How Can We Help?</span>
              <h2 id="contact-main-heading" className="text-heading text-3xl md:text-4xl text-gray-900 mb-4">
                We're Here to Make the Process Easier
              </h2>
              <div className="divider" />
              <div className="prose-wscg mb-8">
                <p>
                  Need help with large format printing, graphic design, custom printing, or print procurement? Workshop Creative Group is here to make the process easier. Reach out to discuss project details, timelines, materials, substrates, or production needs.
                </p>
              </div>

              <h3 className="text-lg font-serif font-semibold text-gray-900 mb-5">
                How Can We Help?
              </h3>
              <ul className="space-y-3 list-none m-0 p-0">
                {CONTACT_PROMPTS.map((prompt) => (
                  <li key={prompt.label} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="w-9 h-9 rounded-lg bg-blue-700 text-white flex items-center justify-center flex-shrink-0">
                      {prompt.icon}
                    </div>
                    <span className="text-gray-700 font-medium">{prompt.label}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: CTA card */}
            <div className="flex flex-col gap-6">
              {/* Primary CTA */}
              <div className="bg-hero-gradient rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-serif font-semibold mb-3">
                  Ready to Save Up to 30%?
                </h3>
                <p className="text-white/70 mb-6 leading-relaxed">
                  Upload your current print invoice and we'll provide a competitive quote for the exact same job — often saving you up to 30%.
                </p>
                <Link href="/request-quote" className="btn-primary" style={{ background: "white", color: "#1e3a5f" }}>
                  Upload Invoice &amp; Get Quote
                </Link>
              </div>

              {/* Services quick links */}
              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                <h3 className="text-lg font-serif font-semibold text-gray-900 mb-5">
                  Explore Our Services
                </h3>
                <div className="space-y-3">
                  {[
                    { label: "Large Format Printing", href: "/large-format-printing" },
                    { label: "Graphic Design", href: "/graphic-design" },
                    { label: "Print Procurement", href: "/print-procurement" },
                    { label: "About Workshop Creative Group", href: "/about" },
                  ].map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-colors duration-200 group"
                    >
                      <span className="text-gray-700 font-medium text-sm group-hover:text-blue-700 transition-colors duration-200">
                        {link.label}
                      </span>
                      <svg className="w-4 h-4 text-gray-400 group-hover:text-blue-700 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Quote form link */}
              <div className="text-center">
                <Link href="/request-quote" className="btn-secondary w-full justify-center">
                  Go to Full Quote Form
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
