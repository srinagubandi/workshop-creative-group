/**
 * Contact Page — Workshop Creative Group
 * Simple contact form (name, email, phone, message) separate from the quote flow.
 */

import PageLayout from "@/components/PageLayout";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { Link } from "wouter";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState<Partial<typeof form>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const notifyMutation = trpc.system.notifyOwner.useMutation({
    onSuccess: () => { setSubmitted(true); setSubmitting(false); },
    onError: () => setSubmitting(false),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof form]) setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const validate = () => {
    const errs: Partial<typeof form> = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Please enter a valid email";
    if (!form.message.trim()) errs.message = "Message is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    notifyMutation.mutate({
      title: `New Contact Message from ${form.name}`,
      content: `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone || "Not provided"}\n\nMessage:\n${form.message}`,
    });
  };

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
      <section className="section-py bg-white" aria-labelledby="contact-form-heading">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

            {/* Left: info */}
            <div>
              <span className="section-label mb-4">How Can We Help?</span>
              <h2 id="contact-form-heading" className="text-heading text-3xl md:text-4xl text-gray-900 mb-4">
                We're Here to Make the Process Easier
              </h2>
              <div className="divider" />
              <div className="prose-wscg mb-8">
                <p>
                  Need help with large format printing, graphic design, custom printing, or print procurement? Workshop Creative Group is here to make the process easier. Reach out to discuss project details, timelines, materials, substrates, or production needs.
                </p>
              </div>

              {/* Quick links */}
              <div className="space-y-3">
                {[
                  { label: "Large Format Printing", href: "/large-format-printing" },
                  { label: "Graphic Design", href: "/graphic-design" },
                  { label: "Print Procurement", href: "/print-procurement" },
                  { label: "Request a Quote", href: "/request-quote" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-colors duration-200 group"
                  >
                    <span className="text-gray-700 font-medium text-sm group-hover:text-blue-700 transition-colors duration-200">{link.label}</span>
                    <svg className="w-4 h-4 text-gray-400 group-hover:text-blue-700 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>

            {/* Right: form */}
            <div>
              {submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-2xl p-10 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-serif font-semibold text-gray-900 mb-2">Message Sent!</h3>
                  <p className="text-gray-500 text-sm">Thank you for reaching out. We'll be in touch shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div>
                    <label htmlFor="name" className="form-label">Name <span className="text-blue-700">*</span></label>
                    <input id="name" name="name" type="text" value={form.name} onChange={handleChange}
                      placeholder="Jane Smith" className={`form-input ${errors.name ? "border-red-400" : ""}`} />
                    {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="email" className="form-label">Email Address <span className="text-blue-700">*</span></label>
                    <input id="email" name="email" type="email" value={form.email} onChange={handleChange}
                      placeholder="jane@company.com" className={`form-input ${errors.email ? "border-red-400" : ""}`} />
                    {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="phone" className="form-label">Phone Number <span className="text-gray-400 font-normal">(optional)</span></label>
                    <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange}
                      placeholder="(555) 000-0000" className="form-input" />
                  </div>

                  <div>
                    <label htmlFor="message" className="form-label">Message <span className="text-blue-700">*</span></label>
                    <textarea id="message" name="message" value={form.message} onChange={handleChange} rows={5}
                      placeholder="Tell us about your project or question..."
                      className={`form-input resize-y ${errors.message ? "border-red-400" : ""}`} />
                    {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
                  </div>

                  {notifyMutation.error && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                      Something went wrong. Please try again.
                    </div>
                  )}

                  <button type="submit" disabled={submitting}
                    className="btn-primary w-full text-base py-4 disabled:opacity-60 disabled:cursor-not-allowed">
                    {submitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Sending...
                      </span>
                    ) : "Send Message"}
                  </button>

                  <p className="text-center text-sm text-gray-400">
                    Or <Link href="/request-quote" className="text-blue-700 hover:underline font-medium">upload an invoice for a quote comparison →</Link>
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
