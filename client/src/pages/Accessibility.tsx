import PageLayout from "@/components/PageLayout";
import { Link } from "wouter";

const SUPPORT_EMAIL = "brent@workshopcreativegroup.com";

export default function Accessibility() {
  return (
    <PageLayout
      title="Accessibility Statement | Workshop Creative Group"
      description="Learn about Workshop Creative Group's accessibility commitment and how to report a website-accessibility barrier or request assistance."
    >
      <section className="page-hero" aria-labelledby="accessibility-hero-heading">
        <div className="container">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-white/85 mb-4">Accessibility Statement</p>
            <h1 id="accessibility-hero-heading" className="text-display text-4xl md:text-5xl lg:text-6xl text-white mb-5">
              Accessibility Is Part of How We Serve Clients
            </h1>
            <p className="text-xl text-white/85 leading-relaxed">
              Workshop Creative Group is working to make our website and services easier to use for people with disabilities.
            </p>
          </div>
        </div>
      </section>

      <section className="section-py bg-white" aria-labelledby="accessibility-commitment-heading">
        <div className="container">
          <article className="max-w-3xl mx-auto prose-wscg">
            <p className="text-sm text-gray-600 mb-8"><strong>Last updated:</strong> August 26, 2026</p>
            <h2 id="accessibility-commitment-heading" className="text-heading text-3xl text-gray-900 mb-4">Our Commitment</h2>
            <p>
              Workshop Creative Group is committed to making this website usable by the widest practical audience, including people who use assistive technology. We use WCAG 2.2 Level AA as our accessibility target and continue to improve the site through design, content, and technical review.
            </p>
            <p>
              Accessibility is an ongoing effort. Our work includes reviewing keyboard navigation, color contrast, page structure, alternative text, forms, visible focus indicators, reduced-motion preferences, and support for visitors who need assistance completing an online task. We also review material updates with automated scans and targeted manual checks, then prioritize and correct identified barriers.
            </p>

            <section className="mt-10 rounded-2xl border border-blue-200 bg-blue-50 p-6 md:p-8" aria-labelledby="assistance-heading">
              <h2 id="assistance-heading" className="text-heading text-2xl text-gray-900 mb-3">Need Assistance or Found a Barrier?</h2>
              <p className="text-gray-700 mb-5">
                If you experience difficulty using this website, need information in an alternative format, or need help completing a quote request, please contact us. We will make reasonable efforts to provide assistance, offer an appropriate alternative where practical, and address reported barriers promptly.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a className="btn-primary" href={`mailto:${SUPPORT_EMAIL}?subject=Website%20Accessibility%20Support`}>
                  Email Accessibility Support
                </a>
                <Link className="btn-secondary" href="/contact">Use Our Contact Form</Link>
              </div>
              <p className="text-sm text-gray-700 mt-5 mb-0">
                When possible, please include the page address, the task you were trying to complete, and a description of the problem. You may also tell us your preferred way to be contacted.
              </p>
            </section>

            <h2 className="text-heading text-3xl text-gray-900 mt-10 mb-4">Accessibility Features</h2>
            <p>
              This website includes a skip link for keyboard users, semantic page landmarks, visible keyboard focus, responsive layouts that support browser zoom, and accessible labels and error messages on public forms. We also avoid relying on color alone to convey important information and respect reduced-motion preferences where supported by the browser.
            </p>

            <h2 className="text-heading text-3xl text-gray-900 mt-10 mb-4">Ongoing Review</h2>
            <p>
              We review material website updates with automated testing and targeted manual checks. Automated tools cannot identify every accessibility issue, so we also review critical user journeys such as navigation, contacting us, and requesting a quote. When a barrier is reported, we evaluate the task involved and work toward an appropriate alternative or correction.
            </p>

            <h2 className="text-heading text-3xl text-gray-900 mt-10 mb-4">Scope</h2>
            <p>
              While we work to improve accessibility continuously, some content or third-party services may not yet meet every accessibility expectation. This statement describes current efforts and feedback options; it is not a legal certification or a guarantee that every page or feature is free of barriers. Please contact us if you need assistance.
            </p>
          </article>
        </div>
      </section>
    </PageLayout>
  );
}
