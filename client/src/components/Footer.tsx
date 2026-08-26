/**
 * Footer — Workshop Creative Group
 *
 * Uses the white horizontal logo (wscg-logo-white-hort.webp) in the footer.
 * Accent colors: lime green #7dbe31, blue #1260ae, yellow #efc509
 */

import { Link } from "wouter";
import { ManagedSiteImage } from "@/components/ManagedSiteImage";

const SERVICES_LINKS = [
  { label: "Large Format Printing", href: "/large-format-printing" },
  { label: "Graphic Design", href: "/graphic-design" },
  { label: "Print Procurement", href: "/print-procurement" },
  { label: "Request a Quote", href: "/request-quote" },
];

const COMPANY_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Our Work", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

const POLICY_LINKS = [
  { label: "Accessibility", href: "/accessibility" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-950 text-white">
      {/* Main footer content */}
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand column — white horizontal logo */}
          <div className="lg:col-span-1">
            <Link href="/" aria-label="Workshop Creative Group — Home">
              <ManagedSiteImage slotKey="logo-footer-white" fallbackSrc="/images/wscg-logo-white-hort.webp" alt="Workshop Creative Group logo" className="h-10 w-auto mb-5" />
            </Link>
            <p className="footer-copy text-base font-semibold leading-relaxed mb-4">
              Large Format Printing • Graphic Design • Print Procurement
            </p>
            <p className="footer-copy text-sm font-medium">
              Serving Businesses Nationwide
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-xs uppercase tracking-widest mb-5" style={{ color: "#efc509" }}>
              Services
            </h3>
            <ul className="space-y-3 list-none m-0 p-0">
              {SERVICES_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-6 items-center text-white/85 text-sm hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-xs uppercase tracking-widest mb-5" style={{ color: "#efc509" }}>
              Company
            </h3>
            <ul className="space-y-3 list-none m-0 p-0">
              {COMPANY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-6 items-center text-white/85 text-sm hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-xs uppercase tracking-widest mb-5" style={{ color: "#efc509" }}>
              Get in Touch
            </h3>
            <div className="space-y-3">
              <p className="footer-copy text-sm">
                Have a project in mind? We'd love to hear about it.
              </p>
              <Link
                href="/contact"
                className="inline-flex min-h-6 items-center gap-2 text-sm font-semibold transition-colors duration-200"
                style={{ color: "#7dbe31" }}
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

      <div className="border-t border-white/10">
        <div className="container py-5">
          <nav aria-label="Legal and accessibility links">
            <ul className="flex flex-wrap gap-x-6 gap-y-3 list-none m-0 p-0">
              {POLICY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="inline-flex min-h-6 items-center text-white text-sm font-medium underline underline-offset-4 decoration-white/50 hover:decoration-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <p className="footer-bottom-copy">© {year} Workshop Creative Group. All rights reserved.</p>
            <p className="footer-bottom-copy">Large Format Printing • Graphic Design • Print Procurement</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
