/**
 * Email notifications via Resend.
 * All alerts go to ALERT_EMAIL (brent@workshopcreativegroup.com).
 * Uses onboarding@resend.dev as the from address (Resend test domain — works immediately).
 */

import { Resend } from "resend";

const ALERT_EMAIL = process.env.ALERT_EMAIL || "brent@workshopcreativegroup.com";
const FROM = "Workshop Creative Group <brent@workshopcreativegroup.com>";

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  return apiKey ? new Resend(apiKey) : null;
}

// ── Send a quote request notification ────────────────────────────────────────

export async function sendQuoteAlert(data: {
  companyName: string;
  contactName: string;
  email: string;
  phone?: string | null;
  projectType?: string | null;
  quantity?: string | null;
  sizeSpecs?: string | null;
  deadline?: string | null;
  description?: string | null;
  invoiceFileName?: string | null;
  invoiceFileUrl?: string | null;
}) {
  if (!process.env.RESEND_API_KEY) {
    console.warn("[Email] RESEND_API_KEY not set — skipping quote alert");
    return;
  }
  const resend = getResendClient();
  if (!resend) return;

  const hasInvoice = !!data.invoiceFileName;

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;">
      <div style="background:#1260ae;padding:20px 24px;border-radius:8px 8px 0 0;">
        <h1 style="color:white;margin:0;font-size:20px;">New Quote Request</h1>
        <p style="color:rgba(255,255,255,0.75);margin:4px 0 0;font-size:14px;">Workshop Creative Group</p>
      </div>
      <div style="background:#f9fafb;border:1px solid #e5e7eb;border-top:none;padding:24px;border-radius:0 0 8px 8px;">
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:8px 0;color:#6b7280;font-size:13px;width:140px;">Company</td><td style="padding:8px 0;font-weight:600;color:#111827;">${data.companyName}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280;font-size:13px;">Contact</td><td style="padding:8px 0;color:#111827;">${data.contactName}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280;font-size:13px;">Email</td><td style="padding:8px 0;color:#111827;"><a href="mailto:${data.email}" style="color:#1260ae;">${data.email}</a></td></tr>
          <tr><td style="padding:8px 0;color:#6b7280;font-size:13px;">Phone</td><td style="padding:8px 0;color:#111827;">${data.phone || "Not provided"}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280;font-size:13px;">Project Type</td><td style="padding:8px 0;color:#111827;">${data.projectType || "Not specified"}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280;font-size:13px;">Quantity</td><td style="padding:8px 0;color:#111827;">${data.quantity || "Not specified"}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280;font-size:13px;">Size / Specs</td><td style="padding:8px 0;color:#111827;">${data.sizeSpecs || "Not specified"}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280;font-size:13px;">Deadline</td><td style="padding:8px 0;color:#111827;">${data.deadline || "Not specified"}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280;font-size:13px;">Invoice File</td><td style="padding:8px 0;color:#111827;">${hasInvoice ? `<strong style="color:#7dbe31;">✓ Attached</strong> — ${data.invoiceFileName}` : "No file uploaded"}</td></tr>
        </table>
        ${data.description ? `
        <div style="margin-top:16px;padding:16px;background:white;border:1px solid #e5e7eb;border-radius:6px;">
          <p style="margin:0 0 6px;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:.05em;">Project Description</p>
          <p style="margin:0;color:#111827;font-size:14px;line-height:1.6;">${data.description}</p>
        </div>` : ""}
        ${hasInvoice && data.invoiceFileUrl ? `
        <div style="margin-top:20px;">
          <a href="${data.invoiceFileUrl}" style="display:inline-block;background:#1260ae;color:white;padding:10px 20px;border-radius:6px;text-decoration:none;font-weight:600;font-size:14px;">Download Invoice</a>
        </div>` : ""}
        <div style="margin-top:24px;padding-top:16px;border-top:1px solid #e5e7eb;">
          <a href="https://web-production-d7aa.up.railway.app/admin" style="color:#1260ae;font-size:13px;text-decoration:none;">→ View in Admin Dashboard</a>
        </div>
      </div>
    </div>
  `;

  const { error } = await resend.emails.send({
    from: FROM,
    to: [ALERT_EMAIL],
    subject: `New Quote Request — ${data.companyName}`,
    html,
    replyTo: data.email,
  });

  if (error) {
    console.error("[Email] Failed to send quote alert:", error);
  } else {
    console.log(`[Email] Quote alert sent to ${ALERT_EMAIL}`);
  }
}

// ── Send a contact form notification ─────────────────────────────────────────

export async function sendContactAlert(data: {
  name: string;
  email: string;
  phone?: string | null;
  message: string;
}) {
  if (!process.env.RESEND_API_KEY) {
    console.warn("[Email] RESEND_API_KEY not set — skipping contact alert");
    return;
  }
  const resend = getResendClient();
  if (!resend) return;

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;">
      <div style="background:#1260ae;padding:20px 24px;border-radius:8px 8px 0 0;">
        <h1 style="color:white;margin:0;font-size:20px;">New Contact Message</h1>
        <p style="color:rgba(255,255,255,0.75);margin:4px 0 0;font-size:14px;">Workshop Creative Group</p>
      </div>
      <div style="background:#f9fafb;border:1px solid #e5e7eb;border-top:none;padding:24px;border-radius:0 0 8px 8px;">
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:8px 0;color:#6b7280;font-size:13px;width:100px;">Name</td><td style="padding:8px 0;font-weight:600;color:#111827;">${data.name}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280;font-size:13px;">Email</td><td style="padding:8px 0;"><a href="mailto:${data.email}" style="color:#1260ae;">${data.email}</a></td></tr>
          <tr><td style="padding:8px 0;color:#6b7280;font-size:13px;">Phone</td><td style="padding:8px 0;color:#111827;">${data.phone || "Not provided"}</td></tr>
        </table>
        <div style="margin-top:16px;padding:16px;background:white;border:1px solid #e5e7eb;border-radius:6px;">
          <p style="margin:0 0 6px;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:.05em;">Message</p>
          <p style="margin:0;color:#111827;font-size:14px;line-height:1.6;">${data.message}</p>
        </div>
        <div style="margin-top:20px;">
          <a href="mailto:${data.email}?subject=Re: Your inquiry to Workshop Creative Group" style="display:inline-block;background:#1260ae;color:white;padding:10px 20px;border-radius:6px;text-decoration:none;font-weight:600;font-size:14px;">Reply to ${data.name}</a>
        </div>
        <div style="margin-top:16px;padding-top:16px;border-top:1px solid #e5e7eb;">
          <a href="https://web-production-d7aa.up.railway.app/admin" style="color:#1260ae;font-size:13px;text-decoration:none;">→ View in Admin Dashboard</a>
        </div>
      </div>
    </div>
  `;

  const { error } = await resend.emails.send({
    from: FROM,
    to: [ALERT_EMAIL],
    subject: `New Contact Message — ${data.name}`,
    html,
    replyTo: data.email,
  });

  if (error) {
    console.error("[Email] Failed to send contact alert:", error);
  } else {
    console.log(`[Email] Contact alert sent to ${ALERT_EMAIL}`);
  }
}

// ── Send a test email ─────────────────────────────────────────────────────────

export async function sendTestEmail() {
  if (!process.env.RESEND_API_KEY) {
    return { success: false, error: "RESEND_API_KEY not set" };
  }
  const resend = getResendClient();
  if (!resend) return { success: false, error: "RESEND_API_KEY not set" };

  const { data, error } = await resend.emails.send({
    from: FROM,
    to: [ALERT_EMAIL],
    subject: "✅ Workshop Creative Group — Email Alerts Working",
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;">
        <div style="background:#7dbe31;padding:20px 24px;border-radius:8px 8px 0 0;">
          <h1 style="color:white;margin:0;font-size:20px;">Email Alerts Are Working!</h1>
          <p style="color:rgba(255,255,255,0.85);margin:4px 0 0;font-size:14px;">Workshop Creative Group</p>
        </div>
        <div style="background:#f9fafb;border:1px solid #e5e7eb;border-top:none;padding:24px;border-radius:0 0 8px 8px;">
          <p style="color:#111827;font-size:15px;line-height:1.6;">This is a test email confirming that email notifications are correctly configured for your Workshop Creative Group website.</p>
          <p style="color:#111827;font-size:15px;line-height:1.6;">You will now receive an email at <strong>${ALERT_EMAIL}</strong> whenever:</p>
          <ul style="color:#374151;font-size:14px;line-height:2;">
            <li>A visitor submits the <strong>Quote Request form</strong> (with invoice upload)</li>
            <li>A visitor submits the <strong>Contact form</strong></li>
          </ul>
          <div style="margin-top:20px;padding:16px;background:#eff6ff;border:1px solid #bfdbfe;border-radius:6px;">
            <p style="margin:0;color:#1e40af;font-size:13px;"><strong>Admin Dashboard:</strong> <a href="https://web-production-d7aa.up.railway.app/admin" style="color:#1260ae;">https://web-production-d7aa.up.railway.app/admin</a></p>
          </div>
        </div>
      </div>
    `,
  });

  if (error) {
    return { success: false, error };
  }
  return { success: true, id: data?.id };
}

// ── Send owner documentation ───────────────────────────────────────────────────
export async function sendAdminDocumentationEmail() {
  if (!process.env.RESEND_API_KEY) return { success: false, error: "RESEND_API_KEY not set" };
  const resend = getResendClient();
  if (!resend) return { success: false, error: "RESEND_API_KEY not set" };
  const html = `
    <div style="font-family:Arial,sans-serif;max-width:720px;margin:0 auto;padding:20px;color:#111827;">
      <div style="background:#1260ae;padding:22px 26px;border-radius:10px 10px 0 0;">
        <h1 style="color:#fff;margin:0;font-size:22px;">Website Update: Media System & Content Review</h1>
        <p style="color:rgba(255,255,255,.8);margin:6px 0 0;font-size:14px;">Workshop Creative Group</p>
      </div>
      <div style="border:1px solid #e5e7eb;border-top:none;padding:26px;border-radius:0 0 10px 10px;background:#fff;line-height:1.55;">
        <h2 style="font-size:18px;margin:0 0 8px;">New Admin Media System</h2>
        <p style="margin:0 0 12px;">The Media Library now manages website images and videos. New uploads stay unpublished until you publish them. You can upload JPG, PNG, and WebP images up to 20 MB (maximum 6,000 px on either side) and MP4/WebM videos up to 250 MB.</p>
        <ul style="padding-left:20px;margin:0 0 20px;"><li>Rotate or crop images before upload; then add title, caption, and accessibility alt text.</li><li>Set page, category, client, and project fields, then publish or keep as draft.</li><li>Replace items while retaining placement; reorder entries; archive rather than delete; and restore archived items later.</li><li>Use the Database Backups tab for on-demand private Railway bucket backups.</li></ul>
        <p style="margin:0 0 22px;"><a href="https://web-production-d7aa.up.railway.app/admin" style="display:inline-block;background:#7dbe31;color:#fff;padding:10px 16px;border-radius:6px;text-decoration:none;font-weight:700;">Open Admin Dashboard</a></p>
        <h2 style="font-size:18px;margin:0 0 8px;">Visible Copy Recommendations — Review Only</h2>
        <p style="margin:0 0 12px;">No visible website copy was changed. The following recommendations are ready for page-by-page review:</p>
        <ol style="padding-left:20px;margin:0 0 18px;"><li><strong>Home:</strong> Add a plain-language definition of the nationwide print-brokerage model and a scope note for the “up to 20%” savings statement.</li><li><strong>About:</strong> Add a short “How we work” explanation covering supplier matching, specifications, quality oversight, and delivery coordination.</li><li><strong>Service pages:</strong> Clarify common large-format applications, graphic-design deliverables, and transparent like-for-like procurement comparisons.</li><li><strong>Quote page:</strong> Explain the information that produces a stronger quote comparison and reassure visitors that invoices are not public.</li><li><strong>Contact and Gallery:</strong> Clarify form uses, add a gallery introduction, and review priority captions and labels for consistency.</li><li><strong>Blog:</strong> If reintroduced into navigation, publish practical articles that answer one verified business-print question at a time.</li></ol>
        <p style="margin:0;color:#4b5563;font-size:13px;">The metadata-only update is already in place: each public page has a unique title, description, canonical URL, social metadata, accurate structured data, sitemap entry, and crawl policy. Please reply with any visible-copy items you approve, revise, or decline.</p>
      </div>
    </div>`;
  const { data, error } = await resend.emails.send({
    from: FROM,
    to: [ALERT_EMAIL],
    subject: "Workshop Creative Group — Media Guide & Copy Recommendations",
    html,
  });
  return error ? { success: false, error } : { success: true, id: data?.id };
}
