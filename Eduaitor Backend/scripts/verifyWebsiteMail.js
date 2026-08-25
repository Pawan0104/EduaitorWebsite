/**
 * Verify website SMTP + send a sample demo/contact pair.
 * Usage: node scripts/verifyWebsiteMail.js you@example.com
 */
import "dotenv/config";
import {
  sendAdminNotification,
  sendUserConfirmation,
  sendContactLeadNotification,
  sendContactLeadAcknowledgment,
} from "../utils/Mailer.js";

const to = process.argv[2];
if (!to) {
  console.error("Usage: node scripts/verifyWebsiteMail.js you@example.com");
  process.exit(1);
}

const demo = {
  instName: "SMTP Test School",
  instType: "school",
  students: "500",
  branches: "1",
  contactName: "Test User",
  designation: "Principal",
  email: to,
  phone: "9999999999",
  city: "Jaipur",
  date: "",
  time: "",
  mode: "zoom",
  message: "Website mail verification",
};

const lead = {
  name: "Test User",
  phone: "9999999999",
  email: to,
  schoolName: "SMTP Test School",
  city: "Jaipur",
  message: "Contact popup verification",
  source: "verify-script",
};

console.log("SMTP host set:", Boolean(process.env.EMAIL_HOST));
console.log("Support to:", process.env.SUPPORT_MAIL || process.env.ADMIN_MAIL);

try {
  await sendAdminNotification(demo);
  console.log("OK support demo notify");
  await sendUserConfirmation(demo);
  console.log("OK user demo ack");
  await sendContactLeadNotification(lead);
  console.log("OK support contact notify");
  await sendContactLeadAcknowledgment(lead);
  console.log("OK user contact ack");
  console.log("All four emails attempted. Check support@ and", to);
} catch (err) {
  console.error("FAILED:", err.message || err);
  process.exit(1);
}
