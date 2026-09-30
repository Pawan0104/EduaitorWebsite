import { createContext, useCallback, useContext, useEffect, useState } from "react";
import "./ContactPopup.css";
import "./AuthPopup.css";

const AuthPopupContext = createContext(null);

export function AuthPopupProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");

  const openAuthPopup = useCallback((next = "login") => {
    setMode(next === "signup" ? "signup" : "login");
    setForm({ name: "", email: "", password: "", confirmPassword: "" });
    setErrors({});
    setStatus("");
    setOpen(true);
  }, []);

  const closeAuthPopup = useCallback(() => {
    setOpen(false);
    setErrors({});
    setStatus("");
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") closeAuthPopup();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, closeAuthPopup]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateLogin = () => {
    const newErrors = {};
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Email is invalid";
    if (!form.password.trim()) newErrors.password = "Password is required";
    else if (form.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    return newErrors;
  };

  const validateSignup = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Email is invalid";
    if (!form.password.trim()) newErrors.password = "Password is required";
    else if (form.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (!form.confirmPassword.trim()) newErrors.confirmPassword = "Confirm password is required";
    else if (form.password !== form.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = mode === "login" ? validateLogin() : validateSignup();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setStatus(mode === "login" ? "Logging in..." : "Creating account...");
    await new Promise((resolve) => setTimeout(resolve, 1800));
    setStatus(mode === "login" ? "Login successful! Redirecting..." : "Account created! Please login.");
    setForm({ name: "", email: "", password: "", confirmPassword: "" });
    setTimeout(() => { window.location.href = "/"; }, 800);
  };

  return (
    <AuthPopupContext.Provider value={{ openAuthPopup, closeAuthPopup }}>
      {children}
      {open && (
        <div className="cu-popup" role="dialog" aria-modal="true" aria-labelledby="au-popup-title">
          <button type="button" className="cu-popup__backdrop" aria-label="Close login form" onClick={closeAuthPopup} />
          <div className="cu-popup__panel">
            <button type="button" className="cu-popup__close" onClick={closeAuthPopup} aria-label="Close">×</button>
            <p className="cu-popup__eyebrow">{mode === "login" ? "WELCOME BACK" : "JOIN EDUAITOR"}</p>
            <h2 id="au-popup-title">
              {mode === "login" ? "Login to EduAitor" : "Create your account"}
            </h2>
            <p className="cu-popup__sub">
              {mode === "login"
                ? "Sign in and continue your journey."
                : "Join EduAitor and unlock your learning potential."}
            </p>

            <div className="au-popup__tabs">
              <button
                type="button"
                className={`au-popup__tab${mode === "login" ? " is-active" : ""}`}
                onClick={() => { setMode("login"); setErrors({}); setStatus(""); }}
              >
                Login
              </button>
              <button
                type="button"
                className={`au-popup__tab${mode === "signup" ? " is-active" : ""}`}
                onClick={() => { setMode("signup"); setErrors({}); setStatus(""); }}
              >
                Sign Up
              </button>
            </div>

            {status && (
              <p
                className={`cu-popup__status${/success|created/i.test(status) ? " is-ok" : /invalid|error|fail/i.test(status) ? " is-error" : ""}`}
              >
                {status}
              </p>
            )}

            <form className="cu-popup__form" onSubmit={handleSubmit} noValidate>
              {mode === "signup" && (
                <label>
                  <span>Full Name *</span>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                  />
                  {errors.name && <em className="cu-popup__error">{errors.name}</em>}
                </label>
              )}
              <label>
                <span>Email *</span>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                />
                {errors.email && <em className="cu-popup__error">{errors.email}</em>}
              </label>
              <label>
                <span>Password *</span>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                />
                {errors.password && <em className="cu-popup__error">{errors.password}</em>}
              </label>
              {mode === "signup" && (
                <label>
                  <span>Confirm Password *</span>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                  />
                  {errors.confirmPassword && <em className="cu-popup__error">{errors.confirmPassword}</em>}
                </label>
              )}
              {mode === "login" && (
                <div style={{ textAlign: "right", marginTop: -6, marginBottom: 8 }}>
                  <span className="au-popup__forgot">Forgot Password?</span>
                </div>
              )}
              <button type="submit" className="cu-popup__submit" disabled={!!status}>
                {status || (mode === "login" ? "Sign In" : "Create Account")}
              </button>
            </form>
          </div>
        </div>
      )}
    </AuthPopupContext.Provider>
  );
}

export function useAuthPopup() {
  const ctx = useContext(AuthPopupContext);
  if (!ctx) {
    throw new Error("useAuthPopup must be used within AuthPopupProvider");
  }
  return ctx;
}
