// import { Resend } from "resend";

// // ── Resend client ─────────────────────────────────────────────
// // Set RESEND_API_KEY in your .env
// const resend = new Resend(process.env.RESEND_API_KEY);

// // RESEND_FROM must be a verified sender in your Resend dashboard
// // e.g.  RESEND_FROM=EduAItor <noreply@yourdomain.com>
// // During dev you can use:  onboarding@resend.dev  (only sends to your own email)
// const FROM = process.env.RESEND_FROM || "onboarding@resend.dev";
// const ADMIN_TO = process.env.ADMIN_MAIL;

// // ── Helper: confirmation to the user who booked ───────────────
// export const sendUserConfirmation = async (demo) => {
//   const html = `
//     <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
//       <div style="background:linear-gradient(135deg,#4f46e5,#6366f1);padding:32px 24px;text-align:center;">
//         <h1 style="color:#fff;margin:0;font-size:24px;">Demo Booking Confirmed! 🎉</h1>
//         <p style="color:#c7d2fe;margin:8px 0 0;">EduAItor Platform</p>
//       </div>
//       <div style="padding:32px 24px;background:#fff;">
//         <p style="color:#374151;font-size:16px;">Hi <strong>${demo.contactName}</strong>,</p>
//         <p style="color:#6b7280;">
//           Thank you for booking a demo with EduAItor. We've received your request
//           and will confirm your slot within <strong>24 hours</strong>.
//         </p>
//         <div style="background:#f0f4ff;border-radius:8px;padding:20px;margin:24px 0;">
//           <h3 style="color:#4f46e5;margin:0 0 12px;">Your Demo Details</h3>
//           <table style="width:100%;border-collapse:collapse;font-size:14px;color:#374151;">
//             <tr><td style="padding:4px 0;color:#6b7280;width:40%;">Institution</td><td><strong>${demo.instName}</strong></td></tr>
//             <tr><td style="padding:4px 0;color:#6b7280;">Type</td><td>${demo.instType}</td></tr>
//             <tr><td style="padding:4px 0;color:#6b7280;">Preferred Date</td><td>${demo.date || "Flexible"}</td></tr>
//             <tr><td style="padding:4px 0;color:#6b7280;">Time Slot</td><td>${demo.time || "To be confirmed"}</td></tr>
//             <tr><td style="padding:4px 0;color:#6b7280;">Mode</td><td>${demo.mode}</td></tr>
//           </table>
//         </div>
//         <p style="color:#6b7280;font-size:14px;">If you have any urgent queries, contact us directly.</p>
//         <p style="color:#374151;font-size:14px;margin-top:24px;">Best regards,<br/><strong>EduAItor Team</strong></p>
//       </div>
//       <div style="background:#f9fafb;padding:16px 24px;text-align:center;border-top:1px solid #e5e7eb;">
//         <p style="color:#9ca3af;font-size:12px;margin:0;">© 2025 EduAItor. All rights reserved.</p>
//       </div>
//     </div>
//   `;

//   const result = await resend.emails.send({
//     from: FROM,
//     to: [process.env.ADMIN_MAIL],
//     subject: "✅ Your EduAItor Demo is Booked!",
//     html,
//   });

//   // Log so you can see if Resend returns an error
//   console.log("User confirmation email result:", JSON.stringify(result));
//   return result;
// };

// // ── Helper: alert to admin ─────────────────────────────────────
// export const sendAdminNotification = async (demo) => {
//   const html = `
//     <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
//       <div style="background:#0f172a;padding:24px;text-align:center;">
//         <h2 style="color:#6366f1;margin:0;">🆕 New Demo Request</h2>
//       </div>
//       <div style="padding:24px;background:#fff;">
//         <h3 style="color:#374151;margin:0 0 16px;">Booking Details</h3>
//         <table style="width:100%;border-collapse:collapse;font-size:14px;color:#374151;">
//           <tr style="background:#f0f4ff;">
//             <td colspan="2" style="padding:8px 12px;font-weight:600;color:#4f46e5;">🏫 Institution</td>
//           </tr>
//           <tr><td style="padding:6px 12px;color:#6b7280;width:40%;">Name</td><td>${demo.instName}</td></tr>
//           <tr><td style="padding:6px 12px;color:#6b7280;">Type</td><td>${demo.instType}</td></tr>
//           <tr><td style="padding:6px 12px;color:#6b7280;">Students</td><td>${demo.students || "—"}</td></tr>
//           <tr><td style="padding:6px 12px;color:#6b7280;">Branches</td><td>${demo.branches || "—"}</td></tr>
//           <tr style="background:#f0f4ff;">
//             <td colspan="2" style="padding:8px 12px;font-weight:600;color:#4f46e5;">👤 Contact</td>
//           </tr>
//           <tr><td style="padding:6px 12px;color:#6b7280;">Name</td><td>${demo.contactName}</td></tr>
//           <tr><td style="padding:6px 12px;color:#6b7280;">Designation</td><td>${demo.designation || "—"}</td></tr>
//           <tr><td style="padding:6px 12px;color:#6b7280;">Email</td><td><a href="mailto:${demo.email}">${demo.email}</a></td></tr>
//           <tr><td style="padding:6px 12px;color:#6b7280;">Phone</td><td>${demo.phone}</td></tr>
//           <tr><td style="padding:6px 12px;color:#6b7280;">City</td><td>${demo.city || "—"}</td></tr>
//           <tr style="background:#f0f4ff;">
//             <td colspan="2" style="padding:8px 12px;font-weight:600;color:#4f46e5;">📅 Demo Preferences</td>
//           </tr>
//           <tr><td style="padding:6px 12px;color:#6b7280;">Date</td><td>${demo.date || "Flexible"}</td></tr>
//           <tr><td style="padding:6px 12px;color:#6b7280;">Time</td><td>${demo.time || "—"}</td></tr>
//           <tr><td style="padding:6px 12px;color:#6b7280;">Mode</td><td>${demo.mode}</td></tr>
//           <tr><td style="padding:6px 12px;color:#6b7280;">Message</td><td>${demo.message || "—"}</td></tr>
//         </table>
//       </div>
//     </div>
//   `;

//   const result = await resend.emails.send({
//     from: FROM,
//     to: [ADMIN_TO],
//     subject: `🆕 Demo Request – ${demo.instName} (${demo.instType})`,
//     html,
//   });

//   console.log("Admin notification email result:", JSON.stringify(result));
//   return result;
// };

import nodemailer from "nodemailer";

// ── Nodemailer transporter ────────────────────────────────────
// Set in your .env:
//   MAIL_USER=you@gmail.com
//   MAIL_PASS=your_app_password   ← Gmail: use an App Password, not your real password
//   ADMIN_MAIL=admin@yourdomain.com
const transporter = nodemailer.createTransport({
  service: "gmail",           // or use host/port for other providers (see note below)
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const FROM = `EduAItor <${process.env.EMAIL_USER}>`;
const ADMIN_TO = process.env.ADMIN_MAIL;

// ── Helper: confirmation to the user who booked ───────────────
export const sendUserConfirmation = async (demo) => {
  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
      <div style="background:linear-gradient(135deg,#4f46e5,#6366f1);padding:32px 24px;text-align:center;">
        <h1 style="color:#fff;margin:0;font-size:24px;">Demo Booking Confirmed! 🎉</h1>
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
        <p style="color:#9ca3af;font-size:12px;margin:0;">© 2025 EduAItor. All rights reserved.</p>
      </div>
    </div>
  `;

  const result = await transporter.sendMail({
    from: FROM,
    to: demo.email,         // ← sends to the actual user who booked
    subject: "✅ Your EduAItor Demo is Booked!",
    html,
  });

  console.log("User confirmation email result:", result.messageId);
  return result;
};

// ── Helper: alert to admin ─────────────────────────────────────
export const sendAdminNotification = async (demo) => {
  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
      <div style="background:#0f172a;padding:24px;text-align:center;">
        <h2 style="color:#6366f1;margin:0;">🆕 New Demo Request</h2>
      </div>
      <div style="padding:24px;background:#fff;">
        <h3 style="color:#374151;margin:0 0 16px;">Booking Details</h3>
        <table style="width:100%;border-collapse:collapse;font-size:14px;color:#374151;">
          <tr style="background:#f0f4ff;">
            <td colspan="2" style="padding:8px 12px;font-weight:600;color:#4f46e5;">🏫 Institution</td>
          </tr>
          <tr><td style="padding:6px 12px;color:#6b7280;width:40%;">Name</td><td>${demo.instName}</td></tr>
          <tr><td style="padding:6px 12px;color:#6b7280;">Type</td><td>${demo.instType}</td></tr>
          <tr><td style="padding:6px 12px;color:#6b7280;">Students</td><td>${demo.students || "—"}</td></tr>
          <tr><td style="padding:6px 12px;color:#6b7280;">Branches</td><td>${demo.branches || "—"}</td></tr>
          <tr style="background:#f0f4ff;">
            <td colspan="2" style="padding:8px 12px;font-weight:600;color:#4f46e5;">👤 Contact</td>
          </tr>
          <tr><td style="padding:6px 12px;color:#6b7280;">Name</td><td>${demo.contactName}</td></tr>
          <tr><td style="padding:6px 12px;color:#6b7280;">Designation</td><td>${demo.designation || "—"}</td></tr>
          <tr><td style="padding:6px 12px;color:#6b7280;">Email</td><td><a href="mailto:${demo.email}">${demo.email}</a></td></tr>
          <tr><td style="padding:6px 12px;color:#6b7280;">Phone</td><td>${demo.phone}</td></tr>
          <tr><td style="padding:6px 12px;color:#6b7280;">City</td><td>${demo.city || "—"}</td></tr>
          <tr style="background:#f0f4ff;">
            <td colspan="2" style="padding:8px 12px;font-weight:600;color:#4f46e5;">📅 Demo Preferences</td>
          </tr>
          <tr><td style="padding:6px 12px;color:#6b7280;">Date</td><td>${demo.date || "Flexible"}</td></tr>
          <tr><td style="padding:6px 12px;color:#6b7280;">Time</td><td>${demo.time || "—"}</td></tr>
          <tr><td style="padding:6px 12px;color:#6b7280;">Mode</td><td>${demo.mode}</td></tr>
          <tr><td style="padding:6px 12px;color:#6b7280;">Message</td><td>${demo.message || "—"}</td></tr>
        </table>
      </div>
    </div>
  `;

  const result = await transporter.sendMail({
    from: FROM,
    to: ADMIN_TO,
    subject: `🆕 Demo Request – ${demo.instName} (${demo.instType})`,
    html,
  });

  console.log("Admin notification email result:", result.messageId);
  return result;
};