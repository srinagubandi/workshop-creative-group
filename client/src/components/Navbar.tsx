/**
 * Navbar — Sticky top navigation for Workshop Creative Group
 *
 * Always white background with dark text — desktop and mobile.
 * Phone number + CTA button on the right.
 * Hamburger menu for mobile.
 */

import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Large Format Printing", href: "/large-format-printing" },
  { label: "Graphic Design", href: "/graphic-design" },
  { label: "Print Procurement", href: "/print-procurement" },
  { label: "Brent's Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

// ── Update this phone number as needed ──
const PHONE_NUMBER = "(800) 000-0000";
const PHONE_HREF = "tel:+18000000000";

export default function Navbar() {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const isActive = (href: string) => {
    if (href === "/") return location === "/";
    return location.startsWith(href);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 transition-shadow duration-300 ${
          scrolled ? "shadow-md" : "shadow-sm"
        }`}
      >
        <div className="container">
          <nav
            className="flex items-center h-16 md:h-20"
            aria-label="Main navigation"
          >
            {/* ── Logo ── */}
            <Link
              href="/"
              className="flex-shrink-0 flex items-center"
              aria-label="Workshop Creative Group — Home"
            >
              <img
                src="/images/wscg-logo-hort.png"
                alt="Workshop Creative Group logo"
                className="h-9 md:h-11 w-auto"
                loading="eager"
              />
            </Link>

            {/* ── Spacer between logo and nav links ── */}
            <div className="w-10 md:w-14 flex-shrink-0" />

            {/* ── Desktop nav links ── */}
            <ul className="hidden xl:flex items-center gap-1 list-none m-0 p-0 flex-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
                      isActive(link.href)
                        ? "text-blue-700 bg-blue-50 font-semibold"
                        : "text-gray-700 hover:text-blue-700 hover:bg-gray-50"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* ── Desktop: phone + CTA ── */}
            <div className="hidden xl:flex items-center gap-4 ml-4 flex-shrink-0">
              {/* Phone number */}
              <a
                href={PHONE_HREF}
                className="flex items-center gap-1.5 text-gray-700 hover:text-blue-700 transition-colors duration-200 group"
                aria-label={`Call us at ${PHONE_NUMBER}`}
              >
                <div className="w-7 h-7 rounded-full bg-blue-50 group-hover:bg-blue-100 flex items-center justify-center transition-colors duration-200 flex-shrink-0">
                  <svg className="w-3.5 h-3.5 text-blue-700" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                </div>
                <span className="text-sm font-semibold whitespace-nowrap">{PHONE_NUMBER}</span>
              </a>

              {/* CTA button */}
              <Link
                href="/request-quote"
                className="btn-primary text-sm px-5 py-2.5 whitespace-nowrap"
                style={{ fontSize: "0.875rem" }}
              >
                Get Your Free Quote Comparison
              </Link>
            </div>

            {/* ── Mobile: phone icon + Free Quote + hamburger ── */}
            <div className="flex xl:hidden items-center gap-2 ml-auto">
              {/* Phone icon only on mobile */}
              <a
                href={PHONE_HREF}
                aria-label={`Call us at ${PHONE_NUMBER}`}
                className="p-2 rounded-md text-blue-700 hover:bg-blue-50 transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
              </a>

              <Link
                href="/request-quote"
                className="hidden sm:inline-flex items-center justify-center px-4 py-2 rounded-lg bg-blue-700 text-white font-semibold text-sm hover:bg-blue-800 transition-colors duration-200 whitespace-nowrap"
              >
                Free Quote
              </Link>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
                className="p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors duration-200"
              >
                <span className="sr-only">{mobileOpen ? "Close menu" : "Open menu"}</span>
                <div className="w-6 h-5 flex flex-col justify-between">
                  <span className={`block h-0.5 bg-current rounded transition-all duration-300 origin-center ${mobileOpen ? "rotate-45 translate-y-2.5" : ""}`} />
                  <span className={`block h-0.5 bg-current rounded transition-all duration-300 ${mobileOpen ? "opacity-0 scale-x-0" : ""}`} />
                  <span className={`block h-0.5 bg-current rounded transition-all duration-300 origin-center ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
                </div>
              </button>
            </div>
          </nav>
        </div>

        {/* ── Mobile menu drawer ── */}
        <div
          className={`xl:hidden overflow-hidden transition-all duration-300 ${
            mobileOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          } bg-white border-t border-gray-100`}
        >
          <div className="container py-4">
            {/* Phone number in mobile menu */}
            <a
              href={PHONE_HREF}
              className="flex items-center gap-3 px-4 py-3 mb-2 rounded-lg bg-blue-50 text-blue-700 font-semibold text-sm"
            >
              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
              {PHONE_NUMBER}
            </a>

            <ul className="list-none m-0 p-0 space-y-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      isActive(link.href)
                        ? "bg-blue-50 text-blue-700 font-semibold"
                        : "text-gray-700 hover:bg-gray-50 hover:text-blue-700"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <Link
                href="/request-quote"
                className="btn-primary w-full justify-center"
              >
                Get Your Free Quote Comparison
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 xl:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
