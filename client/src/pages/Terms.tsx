import PageLayout from "@/components/PageLayout";
import { Link } from "wouter";

const SUPPORT_EMAIL = "brent@workshopcreativegroup.com";

export default function Terms() {
  return (
    <PageLayout
      title="Terms and Conditions | Workshop Creative Group"
      description="Read the terms and conditions governing use of the Workshop Creative Group website and service inquiries."
    >
      <section className="page-hero" aria-labelledby="terms-hero-heading">
        <div className="container"><div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-white/85 mb-4">Terms and Conditions</p>
          <h1 id="terms-hero-heading" className="text-display text-4xl md:text-5xl lg:text-6xl text-white mb-5">Website Terms of Use</h1>
          <p className="text-xl text-white/85 leading-relaxed">Please read these terms before using this website or submitting a service request.</p>
        </div></div>
      </section>

      <section className="section-py bg-white" aria-labelledby="terms-heading">
        <div className="container"><article className="max-w-3xl mx-auto prose-wscg">
          <p className="text-sm text-gray-600 mb-8"><strong>Effective date:</strong> August 25, 2026</p>
          <p id="terms-heading">
            These Terms and Conditions govern your use of the Workshop Creative Group website. By using the website, you agree to these terms. If you do not agree, please do not use the website.
          </p>

          <h2 className="text-heading text-3xl text-gray-900 mt-10 mb-4">Website Information and Quote Requests</h2>
          <p>
            This website provides general information about Workshop Creative Group and a way to request information or a quote. A website submission, conversation, estimate, or quote request does not create a contract, guarantee pricing, reserve production capacity, or obligate either party to proceed. Scope, pricing, schedule, specifications, payment terms, and deliverables are subject to a separate written agreement or approved order.
          </p>

          <h2 className="text-heading text-3xl text-gray-900 mt-10 mb-4">Acceptable Use</h2>
          <p>
            You may use this website only for lawful purposes and in accordance with these terms. You may not attempt to interfere with the website's security or operation, upload malicious code or unlawful content, impersonate another person, access nonpublic areas without authorization, or use automated means to extract website content except as permitted by applicable law.
          </p>

          <h2 className="text-heading text-3xl text-gray-900 mt-10 mb-4">Intellectual Property</h2>
          <p>
            The website's text, graphics, branding, logos, design, and other content are owned by or licensed to Workshop Creative Group and are protected by applicable intellectual-property laws. You may view the website for personal or internal business use. You may not reproduce, distribute, modify, or create derivative works from website content without prior written permission, except as permitted by law.
          </p>

          <h2 className="text-heading text-3xl text-gray-900 mt-10 mb-4">Third-Party Content and Links</h2>
          <p>
            The website may reference third-party materials or services. Workshop Creative Group does not control and is not responsible for third-party websites, content, availability, privacy practices, or terms. Your use of third-party services is governed by their own terms and policies.
          </p>

          <h2 className="text-heading text-3xl text-gray-900 mt-10 mb-4">Disclaimers and Limits</h2>
          <p>
            This website is provided on an “as is” and “as available” basis. To the fullest extent permitted by law, Workshop Creative Group disclaims warranties of any kind, whether express or implied, including warranties of merchantability, fitness for a particular purpose, and non-infringement. Information on the website may change and may not always be complete, current, or error-free.
          </p>
          <p>
            To the fullest extent permitted by law, Workshop Creative Group will not be liable for indirect, incidental, special, consequential, or punitive damages arising from or related to use of, or inability to use, this website. Nothing in these terms limits liability that cannot be limited under applicable law.
          </p>

          <h2 className="text-heading text-3xl text-gray-900 mt-10 mb-4">Privacy and Accessibility</h2>
          <p>
            Our handling of personal information is described in our <Link className="text-blue-700 underline underline-offset-2" href="/privacy">Privacy Policy</Link>. We are working to make this website accessible. If you experience a barrier or need help completing an online task, review our <Link className="text-blue-700 underline underline-offset-2" href="/accessibility">Accessibility Statement</Link>, email <a className="text-blue-700 underline underline-offset-2" href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>, or use our <Link className="text-blue-700 underline underline-offset-2" href="/contact">Contact page</Link>.
          </p>

          <h2 className="text-heading text-3xl text-gray-900 mt-10 mb-4">Changes and Contact</h2>
          <p>
            We may update these Terms and Conditions at any time. Updates will be effective when posted with a revised effective date. For questions about these terms, contact <a className="text-blue-700 underline underline-offset-2" href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
          </p>
        </article></div>
      </section>
    </PageLayout>
  );
}
