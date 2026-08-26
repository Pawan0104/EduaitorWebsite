import { createContext, useCallback, useContext, useEffect, useState } from "react";
import "./ContactPopup.css";
import { API_URL } from "../lib/api";

const ContactPopupContext = createContext(null);

const PRESETS = {
  demo: {
    eyebrow: "BOOK A DEMO",
    title: "Request a Free Demo",
    sub: "Share your name, email, and phone. Our support team will connect with you shortly.",
    submit: "Request Demo",
  },
  ignitex: {
    eyebrow: "IGNITEX FUTURE LAB™",
    title: "Book a FREE Future Lab",
    sub: "Share your details. We'll schedule a FREE 2-hour hands-on IgniteX experience for your students.",
    submit: "Book Future Lab™",
  },
  contact: {
    eyebrow: "GET IN TOUCH",
    title: "Talk to EduAitor",
    sub: "Share your details. Our team will reach out shortly — you'll also get an email confirmation.",
    submit: "Request a Callback",
  },
  experts: {
    eyebrow: "TALK TO EXPERTS",
    title: "Talk to Our Experts",
    sub: "Tell us how to reach you. Our specialists will call or email you soon.",
    submit: "Talk to Experts",
  },
  sales: {
    eyebrow: "TALK TO SALES",
    title: "Talk to Our Sales Team",
    sub: "Leave your details and our sales team will get in touch.",
    submit: "Talk to Sales",
  },
};

function resolveCopy(input) {
  if (!input || typeof input === "string") {
    const source = input || "contact-popup";
    const key = /ignite|future.?lab/i.test(source)
      ? "ignitex"
      : /demo|book/i.test(source)
      ? "demo"
      : /expert/i.test(source)
        ? "experts"
        : /sales/i.test(source)
          ? "sales"
          : "contact";
    return { source, ...PRESETS[key] };
  }
  const source = input.source || "contact-popup";
  const preset = PRESETS[input.preset] || PRESETS.contact;
  return {
    source,
    eyebrow: input.eyebrow || preset.eyebrow,
    title: input.title || preset.title,
    sub: input.sub || preset.sub,
    submit: input.submit || preset.submit,
  };
}

export function ContactPopupProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [copy, setCopy] = useState(resolveCopy("contact-popup"));
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState("");

  const openContactPopup = useCallback((next = "contact-popup") => {
    setCopy(resolveCopy(next));
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
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      next.email = "Please enter your email";
    } else if (!/\S+@\S+\.\S+/.test(trimmedEmail)) {
      next.email = "Enter a valid email address";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setStatus("");

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 25000);

    try {
      const response = await fetch(`${API_URL}/contact-leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.replace(/\D/g, ""),
          email: email.trim().toLowerCase(),
          source: copy.source,
        }),
        signal: controller.signal,
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || data.success === false) {
        throw new Error(data.message || "Unable to submit");
      }

      setStatus(data.message || "Thanks! Our team will contact you shortly.");
      setName("");
      setPhone("");
      setEmail("");
      setErrors({});
      window.setTimeout(() => {
        setOpen(false);
        setStatus("");
      }, 1800);
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
            <p className="cu-popup__eyebrow">{copy.eyebrow}</p>
            <h2 id="cu-popup-title">{copy.title}</h2>
            <p className="cu-popup__sub">{copy.sub}</p>

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
                <span>Email *</span>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="you@school.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <em className="cu-popup__error">{errors.email}</em>}
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
                {submitting ? "Submitting…" : copy.submit}
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
