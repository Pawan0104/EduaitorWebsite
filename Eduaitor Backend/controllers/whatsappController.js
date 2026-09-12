import crypto from "crypto";
import BrainOtp from "../models/brainOtp.js";

const VERIFY_TOKEN = process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN;
const APP_SECRET = process.env.WHATSAPP_APP_SECRET;

/**
 * Meta calls this with a GET to confirm the callback URL is valid.
 * We must echo hub.challenge back when hub.verify_token matches ours.
 */
export const handleWebhookVerify = (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && VERIFY_TOKEN && token === VERIFY_TOKEN) {
    return res.status(200).send(challenge);
  }
  return res.status(403).send("Forbidden");
};

/** Beware: express.json() body might not be available if the raw body is needed
 * for signature checks. We use a captured raw body from the route middleware. */
export const handleWebhookEvent = async (req, res) => {
  // Always acknowledge quickly — Meta retries on non-200 responses.
  res.status(200).send("EVENT_RECEIVED");

  if (APP_SECRET && !isSignatureValid(req)) {
    console.error("WhatsApp webhook: invalid X-Hub-Signature-256");
    return;
  }

  processEvent(req.body).catch((err) => {
    console.error("WhatsApp webhook processEvent error:", err.message);
  });
};

function isSignatureValid(req) {
  const signature = req.get("x-hub-signature-256");
  if (!signature) return false;
  const expected = crypto
    .createHmac("sha256", APP_SECRET)
    .update(req.rawBody || JSON.stringify(req.body || {}))
    .digest("hex");
  return signature === `sha256=${expected}`;
}

async function processEvent(payload) {
  const changes = (payload?.entry ?? []).flatMap((e) => e.changes ?? []);
  if (!changes.length) {
    console.log("WhatsApp webhook ping:", JSON.stringify(payload));
    return;
  }

  for (const change of changes) {
    const value = change.value ?? {};

    // Message delivery/read/failed status updates.
    for (const status of value.statuses ?? []) {
      if (!status.id) continue;
      const update = {
        deliveryStatus: status.status,
        deliveredAt: new Date(),
        deliveryError: status.errors ? status.errors.map((e) => e.title).join(", ") : null,
      };
      let updated = await BrainOtp.updateMany({ wamid: status.id }, { $set: update }).lean();
      console.log(
        `WhatsApp delivery status: ${status.status} (wamid ${status.id}, updated ${updated.modifiedCount})`
      );
    }

    // Inbound messages (e.g. the user replying to the OTP message).
    for (const msg of value.messages ?? []) {
      const from = msg.from; // digits only, e.g. "919876543210"
      const text = msg.text?.body?.trim?.() ?? "";
      console.log(`WhatsApp inbound from ${from}: ${text.slice(0, 40)}`);

      if (from && /^\d{6}$/.test(text)) {
        const phone = `+${from}`;
        const otp = await BrainOtp.findOne({ phone }).lean();
        if (otp && otp.code === text) {
          console.log(`WhatsApp inbound: recipient replied with the correct OTP for ${phone}`);
        }
      }
    }
  }
}