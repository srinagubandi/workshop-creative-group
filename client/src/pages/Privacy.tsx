import PageLayout from "@/components/PageLayout";
import { Link } from "wouter";

const SUPPORT_EMAIL = "brent@workshopcreativegroup.com";

export default function Privacy() {
  return (
    <PageLayout
      title="Privacy Policy | Workshop Creative Group"
      description="Read the Workshop Creative Group Privacy Policy, including how quote requests, contact submissions, and uploaded files are handled."
    >
      <section className="page-hero" aria-labelledby="privacy-hero-heading">
        <div className="container"><div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-white/85 mb-4">Privacy Policy</p>
          <h1 id="privacy-hero-heading" className="text-display text-4xl md:text-5xl lg:text-6xl text-white mb-5">Your Information and This Website</h1>
          <p className="text-xl text-white/85 leading-relaxed">This policy explains how Workshop Creative Group handles information submitted through this website.</p>
        </div></div>
      </section>

      <section className="section-py bg-white" aria-labelledby="privacy-policy-heading">
        <div className="container"><article className="max-w-3xl mx-auto prose-wscg">
          <p className="text-sm text-gray-600 mb-8"><strong>Effective date:</strong> August 25, 2026</p>
          <p id="privacy-policy-heading">
            Workshop Creative Group respects your privacy. This Privacy Policy describes the information we collect through this website, how we use it, and the choices available to you. It applies to this website and its public quote and contact forms.
          </p>

          <h2 className="text-heading text-3xl text-gray-900 mt-10 mb-4">Information You Provide</h2>
          <p>
            When you request a quote or contact us, you may provide your name, company name, email address, phone number, project details, and message. A quote request may also include an invoice or project file that you choose to upload. Please do not upload personal, confidential, or sensitive information that is not necessary for us to review your print or design request.
          </p>

          <h2 className="text-heading text-3xl text-gray-900 mt-10 mb-4">How We Use Information</h2>
          <p>
            We use submitted information to respond to your inquiry, review and prepare a quote, communicate about requested services, operate and secure this website, maintain appropriate business records, and comply with legal obligations. We do not sell personal information submitted through this website.
          </p>

          <h2 className="text-heading text-3xl text-gray-900 mt-10 mb-4">Service Providers and Storage</h2>
          <p>
            Information submitted through the website may be processed by service providers that help us host the website, store files, operate the database, or deliver business communications. These providers may process information only as needed to provide services to us or as otherwise required by law. Uploaded files are handled as part of the quote-request process and are retained according to our operational needs, contractual obligations, and legal requirements.
          </p>

          <h2 className="text-heading text-3xl text-gray-900 mt-10 mb-4">Cookies and Similar Technologies</h2>
          <p>
            This website may use essential cookies, session storage, or local storage that are necessary for secure site administration and website functionality. Based on our current source review, the public site does not use a separate marketing or analytics tracker. If we introduce non-essential tracking technologies, we will update this policy and provide any notices or choices required by applicable law.
          </p>

          <h2 className="text-heading text-3xl text-gray-900 mt-10 mb-4">Data Security</h2>
          <p>
            We use reasonable administrative, technical, and organizational measures designed to protect information submitted through this website. No internet transmission or storage system is completely secure, so we cannot guarantee absolute security.
          </p>

          <h2 className="text-heading text-3xl text-gray-900 mt-10 mb-4">Your Choices and Requests</h2>
          <p>
            You may contact us to request access to, correction of, or deletion of information that you previously submitted, subject to applicable law and legitimate recordkeeping needs. To make a request, email <a className="text-blue-700 underline underline-offset-2" href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>. We may need information to verify your request before responding.
          </p>

          <h2 className="text-heading text-3xl text-gray-900 mt-10 mb-4">Children's Privacy</h2>
          <p>
            This website is intended for business audiences and is not directed to children under 13. We do not knowingly collect personal information from children under 13 through this website. If you believe a child has provided personal information, please contact us so we can take appropriate action.
          </p>

          <h2 className="text-heading text-3xl text-gray-900 mt-10 mb-4">Updates and Contact</h2>
          <p>
            We may update this Privacy Policy as our website or practices change. The effective date above identifies the latest revision. If you have a privacy question, please email <a className="text-blue-700 underline underline-offset-2" href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> or visit our <Link className="text-blue-700 underline underline-offset-2" href="/contact">Contact page</Link>.
          </p>
          <p>
            Visitors who need help using this website can review our <Link className="text-blue-700 underline underline-offset-2" href="/accessibility">Accessibility Statement</Link> or contact us for assistance.
          </p>
        </article></div>
      </section>
    </PageLayout>
  );
}
