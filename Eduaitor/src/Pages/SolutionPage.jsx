import React, { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import "./SolutionPage.css";
import SuccessStorySection from "../Components/SolutionPage-components/SuccessStorySection";

const roles = [
  {
    id: "schools",
    emoji: null,
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    tag: "Institution",
    title: "For Schools & Institutions",
    description:
      "Centralize every administrative function — fee collection, vendor coordination, staff oversight, and performance monitoring — in a single intelligent command centre.",
    features: ["Automated billing & reconciliation", "Vendor marketplace", "Real-time dashboards", "Multi-campus support"],
    accent: "#6C63FF",
    bg: "linear-gradient(135deg, #0d0d1a 0%, #12102b 100%)",
  },
  {
    id: "teachers",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    tag: "Educator",
    title: "For Teachers & Staff",
    description:
      "Spend less time on paperwork, more time teaching. Manage assessments, track student growth, and communicate with families — all from one streamlined workspace.",
    features: ["AI-assisted grading", "Attendance automation", "Student progress heatmaps", "Parent messaging hub"],
    accent: "#00C9A7",
    bg: "linear-gradient(135deg, #071a16 0%, #0a1f1c 100%)",
  },
  {
    id: "students",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
    tag: "Learner",
    title: "For Students",
    description:
      "A personalised learning portal that adapts to each student. Access resources, track achievements, and stay connected — anytime, on any device.",
    features: ["Personalised learning paths", "Progress analytics", "Assignment submissions", "Digital certificates"],
    accent: "#F7C948",
    bg: "linear-gradient(135deg, #1a1500 0%, #1f1a04 100%)",
  },
  {
    id: "parents",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    tag: "Family",
    title: "For Parents & Guardians",
    description:
      "Complete visibility into your child's school life. Pay fees securely, receive real-time alerts, and communicate directly with teachers — no app-switching required.",
    features: ["One-tap fee payments", "Live attendance alerts", "Academic report cards", "Direct teacher chat"],
    accent: "#FF6B6B",
    bg: "linear-gradient(135deg, #1a0808 0%, #1f0d0d 100%)",
  },
];

const capabilities = [
  { icon: "📊", title: "Advanced Analytics", desc: "Predictive insights across every department", span: "wide" },
  { icon: "💳", title: "Secure Payments", desc: "PCI-compliant, instant reconciliation" },
  { icon: "🛒", title: "Education Marketplace", desc: "Vetted vendors, one procurement flow" },
  { icon: "🔐", title: "Enterprise Security", desc: "SOC 2, role-based access, encrypted at rest" },
  { icon: "📩", title: "Unified Comms", desc: "SMS, email, push — all in one inbox", span: "wide" },
  { icon: "☁️", title: "Cloud Scalability", desc: "Autoscaling infrastructure for any school size" },
];

const problems = [
  { problem: "Manual fee tracking & late payments", solution: "Automated billing with real-time reconciliation" },
  { problem: "Zero vendor transparency or accountability", solution: "Integrated marketplace with verified partners" },
  { problem: "Siloed, disconnected communication", solution: "Unified multi-channel messaging platform" },
  { problem: "No data insights to guide growth", solution: "AI-powered analytics & forecasting dashboards" },
];

export default function SolutionPage() {
  const heroRef = useRef(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const onMove = (e) => {
      const { clientX: x, clientY: y } = e;
      const { width, height } = el.getBoundingClientRect();
      const xP = ((x / width) * 100).toFixed(1);
      const yP = ((y / height) * 100).toFixed(1);
      el.style.setProperty("--mx", `${xP}%`);
      el.style.setProperty("--my", `${yP}%`);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div className="sp-root">
      {/* ───────────── HERO ───────────── */}
      <section className="sp-hero" ref={heroRef}>
        <div className="sp-hero__glow sp-hero__glow--a" />
        <div className="sp-hero__glow sp-hero__glow--b" />
        <div className="sp-hero__grid" aria-hidden="true" />

        <div className="sp-hero__content">
          <span className="sp-badge">School Management Platform</span>
          <h1 className="sp-hero__h1">
            One Platform.<br />
            <span className="sp-hero__gradient-text">Every Stakeholder.</span><br />
            Zero Complexity.
          </h1>
          <p className="sp-hero__sub">
            Eduaitor unifies schools, educators, students, and parents under a single intelligent infrastructure —
            automating operations so everyone can focus on what actually matters: education.
          </p>
          <div className="sp-hero__actions">
            <NavLink to="/bookademo" className="sp-btn sp-btn--primary">
              Schedule a Demo
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </NavLink>
            <NavLink to="/features" className="sp-btn sp-btn--ghost">See all features</NavLink>
          </div>
          <div className="sp-hero__stats">
            <div className="sp-stat"><strong>500+</strong><span>Schools onboarded</span></div>
            <div className="sp-stat__divider" />
            <div className="sp-stat"><strong>2M+</strong><span>Students managed</span></div>
            <div className="sp-stat__divider" />
            <div className="sp-stat"><strong>99.9%</strong><span>Uptime SLA</span></div>
          </div>
        </div>

        <div className="sp-hero__visual" aria-hidden="true">
          <div className="sp-dashboard-mock">
            <div className="sp-mock__bar">
              <span /><span /><span />
            </div>
            <div className="sp-mock__content">
              <div className="sp-mock__row">
                <div className="sp-mock__tile sp-mock__tile--wide">
                  <div className="sp-mock__label">Fee Collection</div>
                  <div className="sp-mock__value">₹ 42,80,000</div>
                  <div className="sp-mock__tag sp-mock__tag--green">↑ 18% this month</div>
                </div>
                <div className="sp-mock__tile">
                  <div className="sp-mock__label">Attendance</div>
                  <div className="sp-mock__value">94.2%</div>
                  <div className="sp-mock__tag sp-mock__tag--blue">Live</div>
                </div>
              </div>
              <div className="sp-mock__row">
                <div className="sp-mock__tile">
                  <div className="sp-mock__label">Alerts</div>
                  <div className="sp-mock__value">3 new</div>
                </div>
                <div className="sp-mock__tile">
                  <div className="sp-mock__label">Avg. Score</div>
                  <div className="sp-mock__value">78.5</div>
                </div>
                <div className="sp-mock__tile">
                  <div className="sp-mock__label">Teachers</div>
                  <div className="sp-mock__value">124</div>
                </div>
              </div>
              <div className="sp-mock__chart">
                {[40, 65, 50, 80, 60, 90, 75].map((h, i) => (
                  <div key={i} className="sp-mock__bar-item" style={{ height: `${h}%`, animationDelay: `${i * 0.1}s` }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── ROLES ───────────── */}
      <section className="sp-section sp-roles">
        <div className="sp-section__header">
          <span className="sp-badge sp-badge--dark">Role-Based Solutions</span>
          <h2 className="sp-section__h2">Built for Every Stakeholder</h2>
          <p className="sp-section__sub">
            Each experience is purpose-built — no feature bloat, no confusion. Everyone gets exactly what they need.
          </p>
        </div>

        <div className="sp-roles__grid">
          {roles.map((role) => (
            <div className="sp-role-card" key={role.id} style={{ "--card-accent": role.accent, "--card-bg": role.bg }}>
              <div className="sp-role-card__header">
                <div className="sp-role-card__icon">{role.icon}</div>
                <span className="sp-role-card__tag">{role.tag}</span>
              </div>
              <h3 className="sp-role-card__title">{role.title}</h3>
              <p className="sp-role-card__desc">{role.description}</p>
              <ul className="sp-role-card__features">
                {role.features.map((f) => (
                  <li key={f}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ───────────── PROBLEM / SOLUTION ───────────── */}
      <section className="sp-section sp-compare">
        <div className="sp-compare__inner">
          <div className="sp-section__header sp-section__header--left">
            <span className="sp-badge">Pain → Gain</span>
            <h2 className="sp-section__h2">We Fix What's Broken</h2>
          </div>

          <div className="sp-compare__table">
            <div className="sp-compare__col sp-compare__col--problem">
              <div className="sp-compare__col-head">
                <span className="sp-compare__icon sp-compare__icon--red">✕</span>
                Without Eduaitor
              </div>
              {problems.map((p, i) => (
                <div className="sp-compare__row" key={i}>
                  <span>{p.problem}</span>
                </div>
              ))}
            </div>

            <div className="sp-compare__divider" aria-hidden="true">
              <div className="sp-compare__arrow-track">
                {problems.map((_, i) => (
                  <svg key={i} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6C63FF" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                ))}
              </div>
            </div>

            <div className="sp-compare__col sp-compare__col--solution">
              <div className="sp-compare__col-head">
                <span className="sp-compare__icon sp-compare__icon--green">✓</span>
                With Eduaitor
              </div>
              {problems.map((p, i) => (
                <div className="sp-compare__row sp-compare__row--solution" key={i}>
                  <span>{p.solution}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── SUCCESS STORY ───────────── */}
      <SuccessStorySection />

      {/* ───────────── CAPABILITIES ───────────── */}
      <section className="sp-section sp-capabilities">
        <div className="sp-section__header">
          <span className="sp-badge sp-badge--dark">Platform Core</span>
          <h2 className="sp-section__h2">Everything You Need, Nothing You Don't</h2>
        </div>

        <div className="sp-cap__bento">
          {capabilities.map((c, i) => (
            <div className={`sp-cap__card ${c.span === "wide" ? "sp-cap__card--wide" : ""}`} key={i}>
              <div className="sp-cap__card-icon">{c.icon}</div>
              <h3 className="sp-cap__card-title">{c.title}</h3>
              <p className="sp-cap__card-desc">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ───────────── SECURITY ───────────── */}
      <section className="sp-security">
        <div className="sp-security__inner">
          <div className="sp-security__left">
            <span className="sp-badge">Trust & Compliance</span>
            <h2 className="sp-security__h2">Enterprise-Grade Security, Built In</h2>
            <p className="sp-security__body">
              Every byte of data is encrypted in transit and at rest. Role-based access controls, audit trails,
              and compliance-ready architecture mean your institution is protected — always.
            </p>
            <div className="sp-security__badges">
              {["256-bit Encryption", "Role-Based Access", "SOC 2 Ready", "GDPR Compliant"].map((b) => (
                <span className="sp-security__badge" key={b}>{b}</span>
              ))}
            </div>
          </div>
          <div className="sp-security__right" aria-hidden="true">
            <div className="sp-shield">
              <div className="sp-shield__ring sp-shield__ring--1" />
              <div className="sp-shield__ring sp-shield__ring--2" />
              <div className="sp-shield__ring sp-shield__ring--3" />
              <div className="sp-shield__core">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#6C63FF" strokeWidth="1.5">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── CTA ───────────── */}
      <section className="sp-cta">
        <div className="sp-cta__glow" />
        <h2 className="sp-cta__h2">Ready to Transform Your School?</h2>
        <p className="sp-cta__sub">Join 500+ institutions already running smarter with Eduaitor.</p>
        <div className="sp-cta__actions">
          <NavLink to="/bookademo" className="sp-btn sp-btn--primary sp-btn--lg">
            Get Started Free
          </NavLink>
          <NavLink to="/plans" className="sp-btn sp-btn--ghost sp-btn--lg">View Pricing</NavLink>
        </div>
      </section>
    </div>
  );
}