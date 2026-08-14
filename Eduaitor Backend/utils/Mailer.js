import { Resend } from "resend";

function getFrom() {
  return (
    process.env.RESEND_FROM ||
    (process.env.EMAIL_USER
      ? `EduAItor <${process.env.EMAIL_USER}>`
      : "EduAItor <onboarding@resend.dev>")
  );
}

function getAdminTo() {
  return process.env.ADMIN_MAIL || "eeduaitor@gmail.com";
}

async function sendEmail({ to, subject, html }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not set on the backend");
  }
  if (!to) {
    throw new Error("Email recipient is missing");
  }

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

  console.log("Resend email sent:", result.data?.id, "to:", to, subject);
  return result;
}

export const sendUserConfirmation = async (demo) => {
  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
      <div style="background:linear-gradient(135deg,#4f46e5,#6366f1);padding:32px 24px;text-align:center;">
        <h1 style="color:#fff;margin:0;font-size:24px;">Demo Booking Confirmed!</h1>
        <p style="color:#c7d2fe;margin:8px 0 0;">EduAItor Platform</p>
      </div>
      <div style="padding:32px 24px;background:#fff;">
        <p style="color:#374151;font-size:16px;">Hi <strong>${demo.contactName}</strong>,</p>
        <p style="color:#6b7280;">
          Thank you for booking a demo with EduAItor. We've received your request
          and will confirm your slot within <strong>24 hours</strong>.
        </p>
        <div style="background:#f0f4ff;border-radius:8px;padding:20px;margin:24px 0;">
          <h3 style="color:#4f46e5;margin:0 0 12px;">Your Demo Details</h3>
          <table style="width:100%;border-collapse:collapse;font-size:14px;color:#374151;">
            <tr><td style="padding:4px 0;color:#6b7280;width:40%;">Institution</td><td><strong>${demo.instName}</strong></td></tr>
            <tr><td style="padding:4px 0;color:#6b7280;">Type</td><td>${demo.instType}</td></tr>
            <tr><td style="padding:4px 0;color:#6b7280;">Preferred Date</td><td>${demo.date || "Flexible"}</td></tr>
            <tr><td style="padding:4px 0;color:#6b7280;">Time Slot</td><td>${demo.time || "To be confirmed"}</td></tr>
            <tr><td style="padding:4px 0;color:#6b7280;">Mode</td><td>${demo.mode}</td></tr>
          </table>
        </div>
        <p style="color:#6b7280;font-size:14px;">If you have any urgent queries, contact us directly.</p>
        <p style="color:#374151;font-size:14px;margin-top:24px;">Best regards,<br/><strong>EduAItor Team</strong></p>
      </div>
      <div style="background:#f9fafb;padding:16px 24px;text-align:center;border-top:1px solid #e5e7eb;">
        <p style="color:#9ca3af;font-size:12px;margin:0;">© 2026 EduAItor. All rights reserved.</p>
      </div>
    </div>
  `;

  return sendEmail({
    to: demo.email,
    subject: "Your EduAItor Demo is Booked",
    html,
  });
};

export const sendAdminNotification = async (demo) => {
  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
      <div style="background:#0f172a;padding:24px;text-align:center;">
        <h2 style="color:#6366f1;margin:0;">New Demo Request</h2>
      </div>
      <div style="padding:24px;background:#fff;">
        <h3 style="color:#374151;margin:0 0 16px;">Booking Details</h3>
        <table style="width:100%;border-collapse:collapse;font-size:14px;color:#374151;">
          <tr style="background:#f0f4ff;">
            <td colspan="2" style="padding:8px 12px;font-weight:600;color:#4f46e5;">Institution</td>
          </tr>
          <tr><td style="padding:6px 12px;color:#6b7280;width:40%;">Name</td><td>${demo.instName}</td></tr>
          <tr><td style="padding:6px 12px;color:#6b7280;">Type</td><td>${demo.instType}</td></tr>
          <tr><td style="padding:6px 12px;color:#6b7280;">Students</td><td>${demo.students || "—"}</td></tr>
          <tr><td style="padding:6px 12px;color:#6b7280;">Branches</td><td>${demo.branches || "—"}</td></tr>
          <tr style="background:#f0f4ff;">
            <td colspan="2" style="padding:8px 12px;font-weight:600;color:#4f46e5;">Contact</td>
          </tr>
          <tr><td style="padding:6px 12px;color:#6b7280;">Name</td><td>${demo.contactName}</td></tr>
          <tr><td style="padding:6px 12px;color:#6b7280;">Designation</td><td>${demo.designation || "—"}</td></tr>
          <tr><td style="padding:6px 12px;color:#6b7280;">Email</td><td><a href="mailto:${demo.email}">${demo.email}</a></td></tr>
          <tr><td style="padding:6px 12px;color:#6b7280;">Phone</td><td>${demo.phone}</td></tr>
          <tr><td style="padding:6px 12px;color:#6b7280;">City</td><td>${demo.city || "—"}</td></tr>
          <tr style="background:#f0f4ff;">
            <td colspan="2" style="padding:8px 12px;font-weight:600;color:#4f46e5;">Demo Preferences</td>
          </tr>
          <tr><td style="padding:6px 12px;color:#6b7280;">Date</td><td>${demo.date || "Flexible"}</td></tr>
          <tr><td style="padding:6px 12px;color:#6b7280;">Time</td><td>${demo.time || "—"}</td></tr>
          <tr><td style="padding:6px 12px;color:#6b7280;">Mode</td><td>${demo.mode}</td></tr>
          <tr><td style="padding:6px 12px;color:#6b7280;">Message</td><td>${demo.message || "—"}</td></tr>
        </table>
      </div>
    </div>
  `;

  return sendEmail({
    to: getAdminTo(),
    subject: `Demo Request – ${demo.instName} (${demo.instType})`,
    html,
  });
};

export const sendContactLeadNotification = async (lead) => {
  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
      <div style="background:#0f172a;padding:24px;text-align:center;">
        <h2 style="color:#60a5fa;margin:0;">New website enquiry</h2>
      </div>
      <div style="padding:24px;background:#fff;">
        <p style="color:#374151;font-size:15px;">Someone submitted a form on the EduAitor website.</p>
        <table style="width:100%;border-collapse:collapse;font-size:14px;color:#374151;">
          <tr><td style="padding:8px 0;color:#6b7280;width:36%;">Name</td><td><strong>${lead.name || "—"}</strong></td></tr>
          <tr><td style="padding:8px 0;color:#6b7280;">Phone</td><td>${lead.phone || "—"}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280;">Email</td><td>${lead.email || "—"}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280;">School</td><td>${lead.schoolName || "—"}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280;">City</td><td>${lead.city || "—"}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280;">Source</td><td>${lead.source || "website"}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280;">Message</td><td>${lead.message || "—"}</td></tr>
        </table>
      </div>
    </div>
  `;

  return sendEmail({
    to: getAdminTo(),
    subject: `Website enquiry – ${lead.name || "New lead"}`,
    html,
  });
};
