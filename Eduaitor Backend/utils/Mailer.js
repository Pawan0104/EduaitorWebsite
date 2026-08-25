import nodemailer from "nodemailer";
import { Resend } from "resend";

const LOGO_URL =
  process.env.EMAIL_LOGO_URL ||
  "https://www.eduaitor.com/admin/eduaitor.png";

const BRAND = {
  name: "Eduaitor",
  teal: "#0d9488",
  violet: "#6d28d9",
  ink: "#0f172a",
  muted: "#64748b",
  line: "#e2e8f0",
  soft: "#f0fdfa",
  white: "#ffffff",
};

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function getFrom() {
  return (
    process.env.EMAIL_FROM ||
    process.env.RESEND_FROM ||
    (process.env.EMAIL_USER
      ? `Eduaitor <${process.env.EMAIL_USER}>`
      : "Eduaitor <support@eduaitor.com>")
  );
}

function getSupportTo() {
  return (
    process.env.SUPPORT_MAIL ||
    process.env.ADMIN_MAIL ||
    "support@eduaitor.com"
  );
}

function isSmtpConfigured() {
  return Boolean(
    process.env.EMAIL_HOST &&
      process.env.EMAIL_USER &&
      process.env.EMAIL_PASS,
  );
}

let smtpTransporter = null;

function getSmtpTransporter() {
  if (!isSmtpConfigured()) return null;
  if (smtpTransporter) return smtpTransporter;

  const port = Number(process.env.EMAIL_PORT || 587);
  const secure =
    String(process.env.EMAIL_SECURE || "").toLowerCase() === "true" ||
    port === 465;
  const rejectUnauthorized =
    String(process.env.EMAIL_TLS_REJECT_UNAUTHORIZED || "true").toLowerCase() !==
    "false";

  smtpTransporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port,
    secure,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: { rejectUnauthorized },
    requireTLS: !secure && port === 587,
  });
  return smtpTransporter;
}

function wrapBrandedEmail({ title, preheader = "", bodyHtml }) {
  const safeTitle = escapeHtml(title || BRAND.name);
  const year = new Date().getFullYear();
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /><title>${safeTitle}</title></head>
<body style="margin:0;padding:0;background:#eef2f7;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:${BRAND.ink}">
  ${preheader ? `<div style="display:none;max-height:0;overflow:hidden;opacity:0">${escapeHtml(preheader)}</div>` : ""}
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#eef2f7;padding:24px 12px">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:${BRAND.white};border-radius:16px;overflow:hidden;border:1px solid ${BRAND.line}">
        <tr>
          <td style="padding:22px 28px 16px;text-align:center;border-bottom:1px solid ${BRAND.line};background:linear-gradient(180deg,#f8fffd 0%,#fff 100%)">
            <img src="${escapeHtml(LOGO_URL)}" alt="Eduaitor" width="148" style="display:block;margin:0 auto 10px;max-width:148px;height:auto;border:0" />
            <p style="margin:0;font-size:12px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:${BRAND.violet}">School ERP</p>
          </td>
        </tr>
        <tr>
          <td style="padding:28px">
            <h1 style="margin:0 0 16px;font-size:22px;line-height:1.3;color:${BRAND.ink}">${safeTitle}</h1>
            ${bodyHtml || ""}
            <p style="margin:24px 0 0;font-size:12px;color:${BRAND.muted}">© ${year} Eduaitor. Track · Assess · Improve</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function detailTable(rows) {
  return `<table style="width:100%;border-collapse:collapse;font-size:14px;color:${BRAND.ink};margin:16px 0;background:${BRAND.soft};border:1px solid ${BRAND.line};border-radius:12px">
    ${rows
      .map(
        ([label, value]) =>
          `<tr>
            <td style="padding:10px 14px;color:${BRAND.muted};width:38%;border-bottom:1px solid ${BRAND.line}">${escapeHtml(label)}</td>
            <td style="padding:10px 14px;border-bottom:1px solid ${BRAND.line}"><strong>${escapeHtml(value || "—")}</strong></td>
          </tr>`,
      )
      .join("")}
  </table>`;
}

async function sendViaSmtp({ to, subject, html, text }) {
  const transporter = getSmtpTransporter();
  if (!transporter) throw new Error("SMTP not configured");
  const info = await transporter.sendMail({
    from: getFrom(),
    to: Array.isArray(to) ? to.join(", ") : to,
    subject,
    html,
    text,
  });
  console.log("[mail] SMTP sent:", info.messageId, "to:", to, subject);
  return { id: info.messageId, provider: "smtp" };
}

async function sendViaResend({ to, subject, html }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY is not set");
  const resend = new Resend(apiKey);
  const result = await resend.emails.send({
    from: getFrom(),
    to: Array.isArray(to) ? to : [to],
    subject,
    html,
  });
  if (result.error) {
    throw new Error(result.error.message || "Resend failed to send email");
  }
  console.log("[mail] Resend sent:", result.data?.id, "to:", to, subject);
  return { id: result.data?.id, provider: "resend" };
}

/**
 * Prefer eduaitor.com SMTP; fall back to Resend if SMTP unset.
 */
async function sendEmail({ to, subject, html, text }) {
  if (!to) throw new Error("Email recipient is missing");

  if (isSmtpConfigured()) {
    return sendViaSmtp({ to, subject, html, text });
  }
  if (process.env.RESEND_API_KEY) {
    return sendViaResend({ to, subject, html });
  }
  throw new Error(
    "Mail not configured. Set EMAIL_HOST/EMAIL_USER/EMAIL_PASS (or RESEND_API_KEY).",
  );
}

/** User ack after demo / Contact Us (demo book) */
export const sendUserConfirmation = async (demo) => {
  const name = demo.contactName || "there";
  const html = wrapBrandedEmail({
    title: "We received your demo request",
    preheader: "Thanks for booking a demo with Eduaitor",
    bodyHtml: `
      <p style="margin:0 0 12px;font-size:15px;line-height:1.6">Hi <strong>${escapeHtml(name)}</strong>,</p>
      <p style="margin:0 0 12px;font-size:15px;line-height:1.6;color:${BRAND.ink}">
        Thank you for booking a demo with Eduaitor. Our team will confirm your slot within <strong>24 hours</strong>.
      </p>
      ${detailTable([
        ["Institution", demo.instName],
        ["Type", demo.instType],
        ["Preferred date", demo.date || "Flexible"],
        ["Time slot", demo.time || "To be confirmed"],
        ["Mode", demo.mode || "—"],
        ["City", demo.city || "—"],
      ])}
      <p style="margin:0;font-size:14px;color:${BRAND.muted}">
        Questions? Reply to this email or write to <a href="mailto:support@eduaitor.com" style="color:${BRAND.teal}">support@eduaitor.com</a>.
      </p>
    `,
  });

  return sendEmail({
    to: demo.email,
    subject: "Your Eduaitor demo request — confirmation",
    html,
    text: `Hi ${name},\n\nThanks for booking a demo with Eduaitor. We'll confirm within 24 hours.\nInstitution: ${demo.instName}\n\n— Eduaitor`,
  });
};

/** Support inbox: new demo booking */
export const sendAdminNotification = async (demo) => {
  const html = wrapBrandedEmail({
    title: "New demo booking",
    preheader: `${demo.instName} — ${demo.contactName}`,
    bodyHtml: `
      <p style="margin:0 0 12px;font-size:15px;line-height:1.6">A new demo was booked on eduaitor.com.</p>
      ${detailTable([
        ["Institution", demo.instName],
        ["Type", demo.instType],
        ["Students", demo.students],
        ["Branches", demo.branches],
        ["Contact", demo.contactName],
        ["Designation", demo.designation],
        ["Email", demo.email],
        ["Phone", demo.phone],
        ["City", demo.city],
        ["Date", demo.date || "Flexible"],
        ["Time", demo.time],
        ["Mode", demo.mode],
        ["Message", demo.message],
      ])}
    `,
  });

  return sendEmail({
    to: getSupportTo(),
    subject: `Demo request — ${demo.instName || "New lead"} (${demo.contactName || ""})`,
    html,
    text: `New demo: ${demo.instName}\nContact: ${demo.contactName}\nEmail: ${demo.email}\nPhone: ${demo.phone}`,
  });
};

/** Support inbox: contact popup / enquiry */
export const sendContactLeadNotification = async (lead) => {
  const html = wrapBrandedEmail({
    title: "New website enquiry",
    preheader: lead.name || "New contact",
    bodyHtml: `
      <p style="margin:0 0 12px;font-size:15px;line-height:1.6">Someone submitted a form on eduaitor.com.</p>
      ${detailTable([
        ["Name", lead.name],
        ["Phone", lead.phone],
        ["Email", lead.email],
        ["School", lead.schoolName],
        ["City", lead.city],
        ["Source", lead.source || "website"],
        ["Message", lead.message],
      ])}
    `,
  });

  return sendEmail({
    to: getSupportTo(),
    subject: `Website enquiry — ${lead.name || "New lead"}`,
    html,
    text: `Enquiry from ${lead.name}\nPhone: ${lead.phone}\nEmail: ${lead.email || "—"}\nSource: ${lead.source}`,
  });
};

/** User ack for contact enquiry (when email provided) */
export const sendContactLeadAcknowledgment = async (lead) => {
  if (!lead?.email) {
    return { skipped: true, reason: "No user email" };
  }

  const name = lead.name || "there";
  const html = wrapBrandedEmail({
    title: "Thanks for contacting Eduaitor",
    preheader: "We received your message",
    bodyHtml: `
      <p style="margin:0 0 12px;font-size:15px;line-height:1.6">Hi <strong>${escapeHtml(name)}</strong>,</p>
      <p style="margin:0 0 12px;font-size:15px;line-height:1.6;color:${BRAND.ink}">
        Thanks for reaching out. Our team has received your message and will get back to you shortly.
      </p>
      ${detailTable([
        ["Phone", lead.phone],
        ["School", lead.schoolName],
        ["City", lead.city],
        ["Message", lead.message],
      ])}
      <p style="margin:0;font-size:14px;color:${BRAND.muted}">
        Prefer to talk now? Email <a href="mailto:support@eduaitor.com" style="color:${BRAND.teal}">support@eduaitor.com</a>.
      </p>
    `,
  });

  return sendEmail({
    to: lead.email,
    subject: "We received your Eduaitor enquiry",
    html,
    text: `Hi ${name},\n\nThanks for contacting Eduaitor. We'll get back to you shortly.\n\n— Eduaitor`,
  });
};
