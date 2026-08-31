import { useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../lib/api";
import "./DeleteAccountPage.css";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  schoolName: "",
  reason: "",
  confirmed: false,
};

export default function DeleteAccountPage() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const onChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim() || form.name.trim().length < 2) {
      next.name = "Please enter your full name";
    }
    const trimmedEmail = form.email.trim();
    if (!trimmedEmail) {
      next.email = "Please enter the email linked to your account";
    } else if (!/\S+@\S+\.\S+/.test(trimmedEmail)) {
      next.email = "Enter a valid email address";
    }
    const digits = form.phone.replace(/\D/g, "");
    if (digits.length < 10) {
      next.phone = "Enter the mobile number linked to your account";
    }
    if (!form.confirmed) {
      next.confirmed =
        "Please confirm that you understand deletion is permanent";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setStatus({ type: "", message: "" });

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 35000);
    const reason = form.reason.trim();
    const message = [
      "DELETE ACCOUNT REQUEST",
      "User confirmed they understand deletion is permanent.",
      reason ? `Reason: ${reason}` : "Reason: (not provided)",
    ].join("\n");

    try {
      const response = await fetch(`${API_URL}/contact-leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim().toLowerCase(),
          phone: form.phone.replace(/\D/g, ""),
          schoolName: form.schoolName.trim() || undefined,
          message,
          source: "delete-account-request",
        }),
        signal: controller.signal,
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || data.success === false) {
        throw new Error(data.message || "Unable to submit request");
      }

      setStatus({
        type: "ok",
        message:
          "Your deletion request has been submitted. Our team will process it and contact you if we need more details.",
      });
      setForm(initialForm);
      setErrors({});
    } catch (err) {
      const msg = String(err?.message || "");
      let messageText = "Something went wrong. Please try again.";
      if (err?.name === "AbortError") {
        messageText = "Taking too long — please try again in a moment.";
      } else if (/failed to fetch|networkerror|load failed/i.test(msg)) {
        messageText =
          "Could not reach the server. Check your internet connection and try again.";
      } else if (msg) {
        messageText = msg;
      }
      setStatus({ type: "error", message: messageText });
    } finally {
      window.clearTimeout(timeoutId);
      setSubmitting(false);
    }
  };

  return (
    <div className="cms dar">
      <section className="cms-hero">
        <div className="cms-hero__inner">
          <span className="cms-badge">Account &amp; Privacy</span>
          <h1 className="cms-hero__title">Delete Account Request</h1>
          <p className="cms-hero__lead">
            Submit this form to request deletion of your EduAitor account and
            associated personal data. We will verify your identity and process
            the request in line with our Privacy Policy.
          </p>
        </div>
      </section>

      <div className="cms-body dar-body">
        <div className="dar-layout">
          <aside className="dar-info cms-panel">
            <h2 className="cms-panel__title">Before you continue</h2>
            <ul className="dar-info__list">
              <li>
                Deletion removes access to the EduAitor app and related personal
                data for the account you identify below.
              </li>
              <li>
                Some records may be retained for a limited period where required
                by law, school policy, or legitimate business needs (for example
                billing or dispute resolution).
              </li>
              <li>
                Use the same email and mobile number registered with your
                EduAitor account so we can locate and verify it.
              </li>
              <li>
                Prefer email? Write to{" "}
                <a href="mailto:support@eduaitor.com">support@eduaitor.com</a>{" "}
                with the subject “Delete Account Request”.
              </li>
            </ul>
            <p className="dar-info__note">
              Related:{" "}
              <Link to="/privacy-policy">Privacy Policy</Link>
              {" · "}
              <Link to="/terms-and-conditions">Terms &amp; Conditions</Link>
            </p>
          </aside>

          <form className="dar-form cms-panel" onSubmit={onSubmit} noValidate>
            <h2 className="cms-panel__title">Request form</h2>
            <p className="dar-form__sub">
              Fields marked * are required. Submitting this form starts a
              deletion request — it is not instant.
            </p>

            <label>
              <span>Full name *</span>
              <input
                name="name"
                type="text"
                autoComplete="name"
                value={form.name}
                onChange={onChange}
                disabled={submitting}
              />
              {errors.name && <em className="dar-error">{errors.name}</em>}
            </label>

            <label>
              <span>Account email *</span>
              <input
                name="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={onChange}
                disabled={submitting}
              />
              {errors.email && <em className="dar-error">{errors.email}</em>}
            </label>

            <label>
              <span>Account mobile *</span>
              <div className="dar-phone">
                <span>+91</span>
                <input
                  name="phone"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel"
                  placeholder="10-digit mobile"
                  value={form.phone}
                  onChange={onChange}
                  disabled={submitting}
                />
              </div>
              {errors.phone && <em className="dar-error">{errors.phone}</em>}
            </label>

            <label>
              <span>School name (optional)</span>
              <input
                name="schoolName"
                type="text"
                autoComplete="organization"
                value={form.schoolName}
                onChange={onChange}
                disabled={submitting}
              />
            </label>

            <label>
              <span>Reason for deletion (optional)</span>
              <textarea
                name="reason"
                rows={4}
                value={form.reason}
                onChange={onChange}
                disabled={submitting}
                placeholder="Optional — helps us improve EduAitor"
              />
            </label>

            <label className="dar-check">
              <input
                name="confirmed"
                type="checkbox"
                checked={form.confirmed}
                onChange={onChange}
                disabled={submitting}
              />
              <span>
                I understand that account deletion is permanent and that I will
                lose access to my EduAitor account and associated data. *
              </span>
            </label>
            {errors.confirmed && (
              <em className="dar-error">{errors.confirmed}</em>
            )}

            {status.message && (
              <p
                className={`dar-status ${
                  status.type === "ok" ? "is-ok" : "is-error"
                }`}
                role="status"
              >
                {status.message}
              </p>
            )}

            <button
              type="submit"
              className="dar-submit"
              disabled={submitting}
            >
              {submitting ? "Submitting…" : "Submit deletion request"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
