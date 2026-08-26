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

function isRelayConfigured() {
  return Boolean(process.env.MAIL_RELAY_URL && process.env.MAIL_RELAY_SECRET);
}

function parseFrom(fromHeader) {
  const raw = String(fromHeader || "").trim();
  const match = raw.match(/^(.*)<([^>]+)>$/);
  if (match) {
    return {
      name: match[1].trim().replace(/^"|"$/g, "") || "Eduaitor",
      email: match[2].trim(),
    };
  }
  if (raw.includes("@")) return { name: "Eduaitor", email: raw };
  return { name: "Eduaitor", email: "support@eduaitor.com" };
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
    connectionTimeout: 12_000,
    greetingTimeout: 12_000,
    socketTimeout: 20_000,
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
  const filled = rows.filter(([, value]) => {
    const v = String(value ?? "").trim();
    return v && v !== "—";
  });
  if (!filled.length) return "";
  return `<table style="width:100%;border-collapse:collapse;font-size:14px;color:${BRAND.ink};margin:16px 0;background:${BRAND.soft};border:1px solid ${BRAND.line};border-radius:12px">
    ${filled
      .map(
        ([label, value]) =>
          `<tr>
            <td style="padding:10px 14px;color:${BRAND.muted};width:38%;border-bottom:1px solid ${BRAND.line}">${escapeHtml(label)}</td>
            <td style="padding:10px 14px;border-bottom:1px solid ${BRAND.line}"><strong>${escapeHtml(value)}</strong></td>
          </tr>`,
      )
      .join("")}
  </table>`;
}

function getPublicContact() {
  const email =
    process.env.SUPPORT_MAIL ||
    process.env.ADMIN_MAIL ||
    "support@eduaitor.com";
  const phone = process.env.SUPPORT_PHONE || "+91 89557 89557";
  const website = process.env.PUBLIC_SITE_URL || "https://www.eduaitor.com";
  return { email, phone, website };
}

function contactDetailsBlock() {
  const { email, phone, website } = getPublicContact();
  return `
    <div style="margin:20px 0 0;padding:16px 18px;background:${BRAND.soft};border:1px solid ${BRAND.line};border-radius:12px">
      <p style="margin:0 0 8px;font-size:13px;font-weight:700;letter-spacing:0.04em;text-transform:uppercase;color:${BRAND.violet}">Need to reach us directly?</p>
      <p style="margin:0 0 6px;font-size:14px;line-height:1.6;color:${BRAND.ink}">
        Email: <a href="mailto:${escapeHtml(email)}" style="color:${BRAND.teal};font-weight:600">${escapeHtml(email)}</a>
      </p>
      <p style="margin:0 0 6px;font-size:14px;line-height:1.6;color:${BRAND.ink}">
        Phone: <a href="tel:${escapeHtml(phone.replace(/[^\d+]/g, ""))}" style="color:${BRAND.teal};font-weight:600">${escapeHtml(phone)}</a>
      </p>
      <p style="margin:0;font-size:14px;line-height:1.6;color:${BRAND.ink}">
        Website: <a href="${escapeHtml(website)}" style="color:${BRAND.teal};font-weight:600">${escapeHtml(website.replace(/^https?:\/\//, ""))}</a>
      </p>
    </div>
  `;
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

async function sendViaRelay({ to, subject, html, text }) {
  const url = process.env.MAIL_RELAY_URL;
  const secret = process.env.MAIL_RELAY_SECRET;
  if (!url || !secret) throw new Error("Mail relay not configured");

  const from = parseFrom(getFrom());
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 20_000);
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Mail-Relay-Secret": secret,
      },
      body: JSON.stringify({
        to: Array.isArray(to) ? to[0] : to,
        subject,
        text: text || "",
        html: html || "",
        fromEmail: from.email,
        fromName: from.name,
      }),
      signal: controller.signal,
    });
    const data = await res.json().catch(() => null);
    if (!data || typeof data !== "object") {
      throw new Error(
        "Mail relay returned non-JSON (ensure public_html/mail-relay is live)",
      );
    }
    if (!res.ok || data.ok === false) {
      throw new Error(data.error || `Relay HTTP ${res.status}`);
    }
    console.log("[mail] Relay sent:", data.id || "ok", "to:", to, subject);
    return { id: data.id || `relay-${Date.now()}`, provider: "cpanel-relay" };
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Delivery order (Render-safe):
 * 1) cPanel relay — GoDaddy mail() works; Render→SMTP often times out
 * 2) SMTP — works locally / if unblocked
 * 3) Resend — only if domain verified
 */
async function sendEmail({ to, subject, html, text }) {
  if (!to) throw new Error("Email recipient is missing");

  const errors = [];

  if (isRelayConfigured()) {
    try {
      return await sendViaRelay({ to, subject, html, text });
    } catch (err) {
      const msg = err?.message || String(err);
      console.warn("[mail] relay failed:", msg);
      errors.push(`relay: ${msg}`);
    }
  }

  if (isSmtpConfigured()) {
    try {
      return await Promise.race([
        sendViaSmtp({ to, subject, html, text }),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("SMTP send timeout")), 12_000),
        ),
      ]);
    } catch (err) {
      const msg = err?.message || String(err);
      console.warn("[mail] SMTP failed:", msg);
      errors.push(`smtp: ${msg}`);
    }
  }

  if (process.env.RESEND_API_KEY) {
    try {
      return await sendViaResend({ to, subject, html });
    } catch (err) {
      const msg = err?.message || String(err);
      console.warn("[mail] Resend failed:", msg);
      errors.push(`resend: ${msg}`);
    }
  }

  throw new Error(
    errors.length
      ? `Mail send failed (${errors.join(" | ")})`
      : "Mail not configured. Set MAIL_RELAY_URL/MAIL_RELAY_SECRET (recommended) or EMAIL_HOST/EMAIL_USER/EMAIL_PASS.",
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
        Thank you for requesting a demo with Eduaitor. Our support team will connect with you shortly.
      </p>
      ${contactDetailsBlock()}
    `,
  });

  const { email, phone, website } = getPublicContact();
  return sendEmail({
    to: demo.email,
    subject: "Your Eduaitor demo request — confirmation",
    html,
    text: `Hi ${name},\n\nThanks for requesting a demo with Eduaitor. Our support team will connect with you shortly.\n\nContact us:\nEmail: ${email}\nPhone: ${phone}\nWebsite: ${website}\n\n— Eduaitor`,
  });
};

/** Support inbox: new demo booking */
export const sendAdminNotification = async (demo) => {
  const html = wrapBrandedEmail({
    title: "New demo booking",
    preheader: `${demo.contactName || "New lead"} — ${demo.phone || ""}`,
    bodyHtml: `
      <p style="margin:0 0 12px;font-size:15px;line-height:1.6">A new demo was requested on eduaitor.com. Please connect with this lead.</p>
      ${detailTable([
        ["Name", demo.contactName],
        ["Email", demo.email],
        ["Phone", demo.phone],
        ["Institution", demo.instName],
        ["City", demo.city],
        ["Message", demo.message],
      ].filter(([, v]) => v))}
    `,
  });

  return sendEmail({
    to: getSupportTo(),
    subject: `Demo request — ${demo.contactName || "New lead"} (${demo.phone || demo.email || ""})`,
    html,
    text: `New demo request\nName: ${demo.contactName}\nEmail: ${demo.email}\nPhone: ${demo.phone}`,
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
    text: `Enquiry from ${lead.name}\nPhone: ${lead.phone}\nEmail: ${lead.email || ""}\nSource: ${lead.source}`,
  });
};

/** User ack for contact enquiry (when email provided) */
export const sendContactLeadAcknowledgment = async (lead) => {
  if (!lead?.email) {
    return { skipped: true, reason: "No user email" };
  }

  const name = lead.name || "there";
  const { email, phone, website } = getPublicContact();
  const html = wrapBrandedEmail({
    title: "Thanks for contacting Eduaitor",
    preheader: "We received your message",
    bodyHtml: `
      <p style="margin:0 0 12px;font-size:15px;line-height:1.6">Hi <strong>${escapeHtml(name)}</strong>,</p>
      <p style="margin:0 0 12px;font-size:15px;line-height:1.6;color:${BRAND.ink}">
        Thank you for reaching out. We’ve received your message and our team will get back to you shortly.
      </p>
      ${contactDetailsBlock()}
    `,
  });

  return sendEmail({
    to: lead.email,
    subject: "We received your Eduaitor enquiry",
    html,
    text: `Hi ${name},\n\nThank you for reaching out. We’ve received your message and our team will get back to you shortly.\n\nContact us:\nEmail: ${email}\nPhone: ${phone}\nWebsite: ${website}\n\n— Eduaitor`,
  });
};
