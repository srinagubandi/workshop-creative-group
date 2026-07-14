/**
 * Footer — Workshop Creative Group
 *
 * Contains: logo, tagline, navigation links, services links,
 * contact info, and a footer CTA.
 */

import { Link } from "wouter";

const SERVICES_LINKS = [
  { label: "Large Format Printing", href: "/large-format-printing" },
  { label: "Graphic Design", href: "/graphic-design" },
  { label: "Print Procurement", href: "/print-procurement" },
  { label: "Request a Quote", href: "/request-quote" },
];

const COMPANY_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Brent's Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-950 text-white">
      {/* Footer CTA band */}
      <div className="border-b border-white/10">
        <div className="container py-12 md:py-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-serif font-semibold text-white mb-2">
                Need a Quote for Your Next Project?
              </h2>
              <p className="text-white/60 text-sm md:text-base">
                Whether it's large format printing, graphic design, or print procurement — we're ready to help.
              </p>
            </div>
            <Link
              href="/request-quote"
              className="btn-primary flex-shrink-0 whitespace-nowrap"
              style={{ background: "white", color: "#1e3a5f" }}
            >
              Get Your Free Quote Comparison
            </Link>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" aria-label="Workshop Creative Group — Home">
              <img
                src="/manus-storage/wscg-logo-hort_3cff86b9.png"
                alt="Workshop Creative Group logo"
                className="h-10 w-auto mb-4 brightness-0 invert"
                loading="lazy"
              />
            </Link>
            <p className="text-white/50 text-sm leading-relaxed mb-4">
              Large Format Printing • Graphic Design • Print Procurement
            </p>
            <p className="text-white/40 text-sm">
              Serving Businesses Nationwide
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">
              Services
            </h3>
            <ul className="space-y-3 list-none m-0 p-0">
              {SERVICES_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/50 text-sm hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">
              Company
            </h3>
            <ul className="space-y-3 list-none m-0 p-0">
              {COMPANY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/50 text-sm hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">
              Get in Touch
            </h3>
            <div className="space-y-3">
              <p className="text-white/50 text-sm">
                Have a project in mind? We'd love to hear about it.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors duration-200"
              >
                Contact Us
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-white/30 text-xs">
            <p>© {year} Workshop Creative Group. All rights reserved.</p>
            <p>Large Format Printing • Graphic Design • Print Procurement</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
