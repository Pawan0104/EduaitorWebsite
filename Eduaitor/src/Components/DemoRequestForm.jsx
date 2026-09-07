import { useState } from "react";
import { API_URL } from "../lib/api";

const DemoRequestForm = ({ source = "feature-page", submitLabel = "Request Demo" }) => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState("");

  const set = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const validate = () => {
    const next = {};
    if (!form.name.trim() || form.name.trim().length < 2) {
      next.name = "Please enter your name";
    }
    const digits = form.phone.replace(/\D/g, "");
    if (digits.length < 10) {
      next.phone = "Enter a valid 10-digit phone number";
    }
    const trimmed = form.email.trim();
    if (!trimmed) {
      next.email = "Please enter your email";
    } else if (!/\S+@\S+\.\S+/.test(trimmed)) {
      next.email = "Enter a valid email address";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setStatus("");
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 35000);

    try {
      const response = await fetch(`${API_URL}/contact-leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: form.phone.replace(/\D/g, ""),
          email: form.email.trim().toLowerCase(),
          message: form.message.trim(),
          source,
        }),
        signal: controller.signal,
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || data.success === false) {
        throw new Error(data.message || "Unable to submit");
      }
      setStatus(data.message || "Thanks! Our team will contact you shortly.");
      setForm({ name: "", email: "", phone: "", message: "" });
      setErrors({});
    } catch (err) {
      const msg = String(err?.message || "");
      if (err?.name === "AbortError") {
        setStatus("Taking too long — please try again in a moment.");
      } else if (/failed to fetch|networkerror|load failed/i.test(msg)) {
        setStatus(
          "Could not reach the server. Check your internet connection and try again."
        );
      } else {
        setStatus(msg || "Something went wrong. Please try again.");
      }
    } finally {
      window.clearTimeout(timeoutId);
      setSubmitting(false);
    }
  };

  return (
    <form className="fl-form" onSubmit={onSubmit} noValidate>
      <h3>Request a Free Demo</h3>
      <p className="fl-form__sub">
        Tell us about your school and we will schedule a personalised walkthrough.
      </p>

      <label>
        <span>Name *</span>
        <input
          type="text"
          name="name"
          autoComplete="name"
          placeholder="Enter your name"
          value={form.name}
          onChange={set("name")}
        />
        {errors.name && <em className="fl-form__error">{errors.name}</em>}
      </label>

      <label>
        <span>Email *</span>
        <input
          type="email"
          name="email"
          autoComplete="email"
          placeholder="you@school.com"
          value={form.email}
          onChange={set("email")}
        />
        {errors.email && <em className="fl-form__error">{errors.email}</em>}
      </label>

      <label>
        <span>Phone *</span>
        <input
          type="tel"
          name="phone"
          autoComplete="tel"
          inputMode="numeric"
          placeholder="Enter 10-digit phone number"
          value={form.phone}
          onChange={(e) =>
            setForm((f) => ({
              ...f,
              phone: e.target.value.replace(/[^\d\s+-]/g, ""),
            }))
          }
          maxLength={14}
        />
        {errors.phone && <em className="fl-form__error">{errors.phone}</em>}
      </label>

      <label>
        <span>Message (optional)</span>
        <textarea
          name="message"
          placeholder="Tell us about your school size, boards, and what you'd like to explore."
          value={form.message}
          onChange={set("message")}
        />
      </label>

      {status && (
        <p
          className={`fl-form__status${
            /thanks|shortly|success/i.test(status) ? " is-ok" : " is-error"
          }`}
        >
          {status}
        </p>
      )}

      <button type="submit" className="fl-form__submit" disabled={submitting}>
        {submitting ? "Submitting…" : submitLabel}
      </button>
    </form>
  );
};

export default DemoRequestForm;