/**
 * Request a Quote Page — Workshop Creative Group
 *
 * Features:
 * - Invoice file upload (PDF/JPG/PNG) with drag-and-drop
 * - Contact fields + project details
 * - tRPC mutation to submit to backend (stores in DB + notifies owner)
 * - Success confirmation screen
 */

import { trpc } from "@/lib/trpc";
import PageLayout from "@/components/PageLayout";
import { useCallback, useRef, useState } from "react";

const PROJECT_TYPES = [
  "Large Format Printing",
  "Graphic Design",
  "Commercial Printing",
  "Print Procurement",
  "Signage",
  "Trade Show Displays",
  "Direct Mail",
  "Promotional Products",
  "Other",
];

interface FormState {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  projectType: string;
  quantity: string;
  sizeSpecs: string;
  deadline: string;
  description: string;
}

const INITIAL_FORM: FormState = {
  companyName: "",
  contactName: "",
  email: "",
  phone: "",
  projectType: "",
  quantity: "",
  sizeSpecs: "",
  deadline: "",
  description: "",
};

export default function RequestQuote() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [file, setFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const submitMutation = trpc.quotes.submit.useMutation({
    onSuccess: () => setSubmitted(true),
  });

  // ── Field change ──
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // ── File handling ──
  const handleFile = (f: File) => {
    const allowed = ["application/pdf", "image/jpeg", "image/png", "image/jpg"];
    if (!allowed.includes(f.type)) {
      alert("Please upload a PDF, JPG, or PNG file.");
      return;
    }
    if (f.size > 20 * 1024 * 1024) {
      alert("File size must be under 20 MB.");
      return;
    }
    setFile(f);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) handleFile(f);
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files?.[0];
    if (f) handleFile(f);
  }, []);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => setDragOver(false);

  // ── Validation ──
  const validate = (): boolean => {
    const newErrors: Partial<FormState> = {};
    if (!form.companyName.trim()) newErrors.companyName = "Company name is required";
    if (!form.contactName.trim()) newErrors.contactName = "Contact name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = "Please enter a valid email";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ── Submit ──
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    let invoiceFile: { name: string; type: string; data: string } | undefined;

    if (file) {
      // Convert file to base64
      const buffer = await file.arrayBuffer();
      const bytes = new Uint8Array(buffer);
      let binary = "";
      for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      const base64 = btoa(binary);
      invoiceFile = { name: file.name, type: file.type, data: base64 };
    }

    submitMutation.mutate({
      ...form,
      phone: form.phone || undefined,
      projectType: form.projectType || undefined,
      quantity: form.quantity || undefined,
      sizeSpecs: form.sizeSpecs || undefined,
      deadline: form.deadline || undefined,
      description: form.description || undefined,
      invoiceFile,
    });
  };

  // ── Success screen ──
  if (submitted) {
    return (
      <PageLayout
        title="Quote Request Submitted | Workshop Creative Group"
        description="Your quote request has been received. Workshop Creative Group will review your invoice and respond with a competitive quote."
      >
        <section className="page-hero" aria-labelledby="success-heading">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 id="success-heading" className="text-display text-4xl md:text-5xl text-white mb-4">
                Quote Request Received!
              </h1>
              <p className="text-xl text-white/70 mb-8">
                Thank you for reaching out. We've received your request and will review your invoice to prepare a competitive quote. You'll hear from us shortly.
              </p>
              <a href="/" className="btn-primary text-base px-8 py-4" style={{ background: "white", color: "#1e3a5f" }}>
                Back to Home
              </a>
            </div>
          </div>
        </section>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      title="Request a Quote | Workshop Creative Group"
      description="Request a quote for large format printing, graphic design, sign printing, commercial printing, or print procurement services."
      hideQuoteBanner
    >
      {/* Hero */}
      <section className="page-hero" aria-labelledby="quote-hero-heading">
        <div className="container">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-semibold uppercase tracking-widest mb-6">
              Free Quote Comparison
            </span>
            <h1 id="quote-hero-heading" className="text-display text-4xl md:text-5xl lg:text-6xl text-white mb-5">
              Let's Compare Quotes and Save You Money
            </h1>
            <p className="text-xl text-white/70 leading-relaxed">
              Upload a recent print invoice, and we'll show you how much you could save — often up to 30% — for the exact same job.
            </p>
          </div>
        </div>
      </section>

      {/* Form section */}
      <section className="section-py bg-white" aria-labelledby="form-heading">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            {/* Intro */}
            <div className="mb-10">
              <span className="section-label mb-4">Get Started</span>
              <h2 id="form-heading" className="text-heading text-3xl md:text-4xl text-gray-900 mb-4">
                Start Your Savings Comparison
              </h2>
              <div className="divider" />
              <p className="text-gray-500 leading-relaxed">
                We believe you shouldn't have to overpay for high-quality print and design services. Share the details of your recent or upcoming project by uploading your invoice. We will review the specifications, recommend the best production approach, and provide transparent pricing that beats your current costs.
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-8">
              {/* ── Invoice Upload ── */}
              <div>
                <label className="form-label text-base mb-3 block">
                  Upload Your Current Invoice
                  <span className="ml-1 text-blue-700">*</span>
                  <span className="ml-2 text-gray-400 font-normal text-sm">(PDF, JPG, or PNG — up to 20 MB)</span>
                </label>

                <div
                  className={`upload-zone ${dragOver ? "drag-over" : ""}`}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onClick={() => fileInputRef.current?.click()}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && fileInputRef.current?.click()}
                  aria-label="Upload invoice file"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileInput}
                    className="sr-only"
                    aria-hidden="true"
                  />

                  {file ? (
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                        <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{file.name}</p>
                        <p className="text-sm text-gray-500">{(file.size / 1024).toFixed(0)} KB</p>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setFile(null); if (fileInputRef.current) fileInputRef.current.value = ""; }}
                        className="text-sm text-red-500 hover:text-red-700 font-medium"
                      >
                        Remove file
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center">
                        <svg className="w-7 h-7 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          Drop your invoice here, or <span className="text-blue-700">browse</span>
                        </p>
                        <p className="text-sm text-gray-400 mt-1">PDF, JPG, or PNG accepted</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* ── Contact Info ── */}
              <div>
                <h3 className="text-lg font-serif font-semibold text-gray-900 mb-5 pb-3 border-b border-gray-100">
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="companyName" className="form-label">
                      Company Name <span className="text-blue-700">*</span>
                    </label>
                    <input
                      id="companyName"
                      name="companyName"
                      type="text"
                      value={form.companyName}
                      onChange={handleChange}
                      placeholder="Acme Corporation"
                      className={`form-input ${errors.companyName ? "border-red-400" : ""}`}
                      aria-describedby={errors.companyName ? "companyName-error" : undefined}
                    />
                    {errors.companyName && (
                      <p id="companyName-error" className="mt-1 text-sm text-red-500">{errors.companyName}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="contactName" className="form-label">
                      Contact Name <span className="text-blue-700">*</span>
                    </label>
                    <input
                      id="contactName"
                      name="contactName"
                      type="text"
                      value={form.contactName}
                      onChange={handleChange}
                      placeholder="Jane Smith"
                      className={`form-input ${errors.contactName ? "border-red-400" : ""}`}
                      aria-describedby={errors.contactName ? "contactName-error" : undefined}
                    />
                    {errors.contactName && (
                      <p id="contactName-error" className="mt-1 text-sm text-red-500">{errors.contactName}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="form-label">
                      Email Address <span className="text-blue-700">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="jane@company.com"
                      className={`form-input ${errors.email ? "border-red-400" : ""}`}
                      aria-describedby={errors.email ? "email-error" : undefined}
                    />
                    {errors.email && (
                      <p id="email-error" className="mt-1 text-sm text-red-500">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="form-label">
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="(555) 000-0000"
                      className="form-input"
                    />
                  </div>
                </div>
              </div>

              {/* ── Project Details ── */}
              <div>
                <h3 className="text-lg font-serif font-semibold text-gray-900 mb-5 pb-3 border-b border-gray-100">
                  Project Details
                  <span className="ml-2 text-sm font-sans font-normal text-gray-400">(Optional — helps us prepare a more accurate quote)</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="projectType" className="form-label">Project Type</label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={form.projectType}
                      onChange={handleChange}
                      className="form-input"
                    >
                      <option value="">Select a type...</option>
                      {PROJECT_TYPES.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="quantity" className="form-label">Quantity</label>
                    <input
                      id="quantity"
                      name="quantity"
                      type="text"
                      value={form.quantity}
                      onChange={handleChange}
                      placeholder="e.g. 500 pieces"
                      className="form-input"
                    />
                  </div>

                  <div>
                    <label htmlFor="sizeSpecs" className="form-label">Size / Specs</label>
                    <input
                      id="sizeSpecs"
                      name="sizeSpecs"
                      type="text"
                      value={form.sizeSpecs}
                      onChange={handleChange}
                      placeholder="e.g. 24 x 36, full color"
                      className="form-input"
                    />
                  </div>

                  <div>
                    <label htmlFor="deadline" className="form-label">Deadline</label>
                    <input
                      id="deadline"
                      name="deadline"
                      type="text"
                      value={form.deadline}
                      onChange={handleChange}
                      placeholder="e.g. August 15, 2026"
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="mt-5">
                  <label htmlFor="description" className="form-label">
                    Project Description / Additional Notes
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Tell us about your project — materials, substrates, finishing, special requirements, or anything else that helps us prepare an accurate quote..."
                    className="form-input resize-y"
                  />
                </div>
              </div>

              {/* ── Submit ── */}
              <div>
                {submitMutation.error && (
                  <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                    {submitMutation.error.message || "Something went wrong. Please try again."}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitMutation.isPending}
                  className="btn-primary w-full text-base py-4 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitMutation.isPending ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    "Get My Quote Comparison"
                  )}
                </button>

                <p className="mt-4 text-center text-sm text-gray-400">
                  Every project is reviewed by our experts to ensure we match the exact specifications of your invoice while identifying smarter, more cost-effective production methods. Your data is secure and will only be used to provide your quote.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
