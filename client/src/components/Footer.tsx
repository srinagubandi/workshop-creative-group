/**
 * Footer — Workshop Creative Group
 *
 * Logo: colored icon + white text (no brightness-0 invert filter).
 * Brent's Blog removed from company links.
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
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-950 text-white">
      {/* Main footer content */}
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand column — colored icon + white text via CSS filter */}
          <div className="lg:col-span-1">
            <Link href="/" aria-label="Workshop Creative Group — Home">
              {/*
                The horizontal logo has a white background baked in.
                We use the no-tag PNG (just the W icon) in color,
                then show the company name as text below it.
              */}
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="/images/wscg-icon.jpg"
                  alt="Workshop Creative Group W icon"
                  className="h-10 w-10 rounded object-cover flex-shrink-0"
                  loading="lazy"
                />
                <div className="leading-tight">
                  <div className="text-white font-bold text-base tracking-wide">WorkShop</div>
                  <div className="text-gray-400 text-xs tracking-widest uppercase">Creative Group</div>
                </div>
              </div>
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
                  <Link href={link.href} className="text-white/50 text-sm hover:text-white transition-colors duration-200">
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
                  <Link href={link.href} className="text-white/50 text-sm hover:text-white transition-colors duration-200">
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
