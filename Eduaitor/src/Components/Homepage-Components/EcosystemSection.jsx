import React, { useRef, useEffect, useState } from "react";
import "./EcosystemSection.css";
import { useContactPopup } from "../ContactPopup";

const features = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
    title: "Unified Dashboard",
    desc: "Every metric — attendance, fees, grades — visible at a glance from one intelligent screen.",
    color: "#9333ea",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    title: "48-Hour Setup",
    desc: "From signup to fully operational. Our onboarding team handles data migration and training.",
    color: "#7e22ce",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Enterprise Security",
    desc: "256-bit encryption, role-based access control, and regular penetration testing.",
    color: "#6b21a8",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <path d="M12 18h.01" />
      </svg>
    ),
    title: "Mobile First",
    desc: "Full-featured iOS and Android apps for admins, teachers, students, and parents.",
    color: "#a855f7",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    title: "Real-Time Sync",
    desc: "Changes propagate instantly across all devices — no refresh, no lag, no lost data.",
    color: "#c084fc",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    title: "Smart Notifications",
    desc: "Automated SMS, push, and email alerts for fees, attendance, exams, and events.",
    color: "#9333ea",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    title: "Advanced Analytics",
    desc: "Predictive reports on student performance, fee trends, and institutional growth.",
    color: "#7e22ce",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    title: "Parent Connect",
    desc: "Direct two-way messaging between parents and teachers — no third-party apps needed.",
    color: "#6b21a8",
  },
];

export default function EcosystemSection() {
  const { openContactPopup } = useContactPopup();
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="eco" ref={ref}>
      <div className="eco__inner">
        <div className={`eco__header ${visible ? "eco__header--show" : ""}`}>
          <span className="eco__label">Our Features</span>
          <h2 className="eco__h2">
            Everything You Need to<br />
            <span>Run a Modern School</span>
          </h2>
          <p className="eco__sub">
            Eight core capabilities, thousands of schools running smoother. Each feature is
            deeply integrated — not bolted on.
          </p>
        </div>

        <div className="eco__bento">
          {features.map((f, i) => (
            <div
              className={`eco__card ${visible ? "eco__card--show" : ""}`}
              key={i}
              style={{ "--accent": f.color, animationDelay: `${i * 0.08}s` }}
            >
              <div className="eco__card-icon">{f.icon}</div>
              <h3 className="eco__card-title">{f.title}</h3>
              <p className="eco__card-desc">{f.desc}</p>
              <div className="eco__card-glow" aria-hidden="true" />
            </div>
          ))}

          {/* Center CTA card */}
          <div className="eco__card eco__card--cta">
            <div className="eco__cta-rings" aria-hidden="true">
              <div className="eco__cta-ring eco__cta-ring--1" />
              <div className="eco__cta-ring eco__cta-ring--2" />
              <div className="eco__cta-ring eco__cta-ring--3" />
            </div>
            <div className="eco__cta-content">
              <h3>Ready to see it live?</h3>
              <p>Get a personalised 30-min walkthrough with our team.</p>
              <button
                type="button"
                className="eco__cta-btn"
                onClick={() => openContactPopup("home-ecosystem-book-demo")}
              >
                Book a Demo
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}