const GRAPH_URL = "https://graph.facebook.com/v20.0";

/** Normalize an Indian phone (10 digits, with optional 0/91/+91 prefix) to E.164. */
export function e164Phone(raw) {
  const digits = String(raw || "").replace(/\D/g, "");
  if (digits.length === 10) return `+91${digits}`;
  if (digits.length === 12 && digits.startsWith("91")) return `+${digits}`;
  if (digits.length === 11 && digits.startsWith("0")) return `+91${digits.slice(1)}`;
  return null;
}

/**
 * Send an OTP message via the Meta WhatsApp Cloud API.
 * Requires process.env.WHATSAPP_ACCESS_TOKEN + WHATSAPP_PHONE_NUMBER_ID.
 * When not configured it returns { sent: false } so callers can fall back to a
 * test code in non-production flows.
 */
export async function sendWhatsAppOtp({ phone, code, templateName }) {
  const token = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  if (!token || !phoneNumberId) {
    return { sent: false, reason: "WHATSAPP_ACCESS_TOKEN / WHATSAPP_PHONE_NUMBER_ID not set" };
  }

  const res = await fetch(`${GRAPH_URL}/${phoneNumberId}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to: phone,
      type: "template",
      template: {
        name: templateName,
        language: { code: "en" },
        components: [{ type: "body", parameters: [{ type: "text", text: code }] }],
      },
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`WhatsApp API HTTP ${res.status}: ${text}`);
  }

  const body = await res.json().catch(() => ({}));
  return { sent: true, wamid: body?.messages?.[0]?.id };
}