import { createContext, useCallback, useContext, useEffect, useState } from "react";
import "./ContactPopup.css";
import { API_URL } from "../lib/api";

const ContactPopupContext = createContext(null);

export function ContactPopupProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [source, setSource] = useState("contact-popup");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState("");

  const openContactPopup = useCallback((nextSource = "contact-popup") => {
    setSource(nextSource);
    setOpen(true);
    setStatus("");
    setErrors({});
  }, []);

  const closeContactPopup = useCallback(() => {
    if (submitting) return;
    setOpen(false);
  }, [submitting]);

  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") closeContactPopup();
    };
    document.addEventListener("keydown", onKeyDown);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previous;
    };
  }, [open, closeContactPopup]);

  const validate = () => {
    const next = {};
    if (!name.trim() || name.trim().length < 2) {
      next.name = "Please enter your name";
    }
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 10) {
      next.phone = "Enter a valid 10-digit phone number";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setStatus("");
    try {
      const response = await fetch(`${API_URL}/contact-leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.replace(/\D/g, ""),
          source,
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || data.success === false) {
        throw new Error(data.message || "Unable to submit");
      }

      setStatus(data.message || "Thanks! Our team will contact you shortly.");
      setName("");
      setPhone("");
      setErrors({});
      window.setTimeout(() => {
        setOpen(false);
        setStatus("");
      }, 1600);
    } catch (err) {
      setStatus(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ContactPopupContext.Provider value={{ openContactPopup, closeContactPopup }}>
      {children}
      {open && (
        <div className="cu-popup" role="dialog" aria-modal="true" aria-labelledby="cu-popup-title">
          <button
            type="button"
            className="cu-popup__backdrop"
            aria-label="Close contact form"
            onClick={closeContactPopup}
          />
          <div className="cu-popup__panel">
            <button
              type="button"
              className="cu-popup__close"
              onClick={closeContactPopup}
              aria-label="Close"
            >
              ×
            </button>
            <p className="cu-popup__eyebrow">GET IN TOUCH</p>
            <h2 id="cu-popup-title">Talk to EduAitor</h2>
            <p className="cu-popup__sub">
              Share your name and phone number. Our team will call you back shortly.
            </p>

            <form className="cu-popup__form" onSubmit={onSubmit} noValidate>
              <label>
                <span>Name *</span>
                <input
                  type="text"
                  name="name"
                  autoComplete="name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {errors.name && <em className="cu-popup__error">{errors.name}</em>}
              </label>

              <label>
                <span>Phone *</span>
                <div className="cu-popup__phone">
                  <span>+91</span>
                  <input
                    type="tel"
                    name="phone"
                    autoComplete="tel"
                    inputMode="numeric"
                    placeholder="Enter phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/[^\d\s+-]/g, ""))}
                    maxLength={14}
                  />
                </div>
                {errors.phone && <em className="cu-popup__error">{errors.phone}</em>}
              </label>

              {status && (
                <p
                  className={`cu-popup__status${
                    /thanks|shortly|success/i.test(status) ? " is-ok" : " is-error"
                  }`}
                >
                  {status}
                </p>
              )}

              <button type="submit" className="cu-popup__submit" disabled={submitting}>
                {submitting ? "Submitting…" : "Request a Callback"}
              </button>
            </form>
          </div>
        </div>
      )}
    </ContactPopupContext.Provider>
  );
}

export function useContactPopup() {
  const ctx = useContext(ContactPopupContext);
  if (!ctx) {
    throw new Error("useContactPopup must be used within ContactPopupProvider");
  }
  return ctx;
}
