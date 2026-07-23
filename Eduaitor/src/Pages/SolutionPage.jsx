import React from "react";
import { Link } from "react-router-dom";
import "./SolutionPage.css";

const pillars = [
  {
    num: "01",
    title: "School Operations",
    desc: "Run your school smoothly with end-to-end digital management.",
    accent: "blue",
    features: [
      "Admissions",
      "Administration",
      "Finance & Fees",
      "Transport",
      "Hostel",
      "Library",
      "Communication",
      "Daily Operations",
    ],
    link: "/ecosystem?module=school-administration",
    illustration: (
      <svg viewBox="0 0 160 100" className="sp-illu" aria-hidden="true">
        <rect x="48" y="38" width="64" height="48" rx="4" fill="#dbeafe" />
        <path d="M44 42 L80 18 L116 42" fill="#93c5fd" />
        <rect x="72" y="62" width="16" height="24" rx="2" fill="#2563eb" />
        <rect x="56" y="50" width="12" height="12" rx="1.5" fill="#fff" />
        <rect x="92" y="50" width="12" height="12" rx="1.5" fill="#fff" />
        <circle cx="36" cy="34" r="10" fill="#bfdbfe" />
        <path d="M31 34h10M36 29v10" stroke="#2563eb" strokeWidth="1.6" />
        <rect x="118" y="28" width="22" height="16" rx="3" fill="#eff6ff" stroke="#60a5fa" />
        <path d="M122 36h14M122 40h10" stroke="#3b82f6" strokeWidth="1.4" />
        <circle cx="128" cy="70" r="12" fill="#dbeafe" />
        <path d="M122 70h12M128 64v12" stroke="#2563eb" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Teaching & Learning",
    desc: "Empower teachers with AI tools and engage students in better learning.",
    accent: "green",
    features: [
      "Lesson Planning",
      "Homework & Assignments",
      "AI Assessment Generator",
      "Report Cards",
      "AI Academic Assistant",
      "Online Learning",
      "Personalized Learning",
    ],
    link: "/ecosystem?module=ai-assistant",
    illustration: (
      <svg viewBox="0 0 160 100" className="sp-illu" aria-hidden="true">
        <ellipse cx="80" cy="88" rx="48" ry="6" fill="#dcfce7" />
        <circle cx="52" cy="42" r="14" fill="#86efac" />
        <path d="M40 70c0-10 8-16 12-16s12 6 12 16v10H40V70z" fill="#22c55e" />
        <rect x="78" y="28" width="52" height="36" rx="4" fill="#bbf7d0" />
        <path d="M86 40h36M86 48h28M86 56h20" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" />
        <circle cx="118" cy="68" r="10" fill="#86efac" />
        <path d="M110 82c2-8 6-12 8-12s6 4 8 12" fill="#22c55e" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Student Success",
    desc: "Identify learning gaps, track progress and help every student excel.",
    accent: "purple",
    features: [
      "Learning Gap Detection",
      "Personalized Recommendations",
      "AI Tutor",
      "Practice Generator",
      "Progress Tracking",
      "Goal Tracking",
      "Predictive Analytics",
    ],
    link: "/ecosystem?module=student-success",
    illustration: (
      <svg viewBox="0 0 160 100" className="sp-illu" aria-hidden="true">
        <rect x="70" y="48" width="54" height="34" rx="4" fill="#ede9fe" />
        <rect x="76" y="54" width="42" height="22" rx="2" fill="#c4b5fd" />
        <circle cx="52" cy="46" r="13" fill="#c4b5fd" />
        <path d="M40 72c0-10 8-16 12-16s12 6 12 16v8H40v-8z" fill="#7c3aed" />
        <path
          d="M78 72 L90 60 L102 66 L116 48"
          fill="none"
          stroke="#7c3aed"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle cx="116" cy="48" r="4" fill="#7c3aed" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Parent Engagement",
    desc: "Keep parents informed, involved, and empowered in their child's journey.",
    accent: "orange",
    features: [
      "Attendance & Updates",
      "Homework & Assignments",
      "AI Test Generator",
      "Fee Payments",
      "School Updates",
      "Communication",
    ],
    link: "/ecosystem?module=parent-suite",
    illustration: (
      <svg viewBox="0 0 160 100" className="sp-illu" aria-hidden="true">
        <rect x="88" y="22" width="36" height="62" rx="6" fill="#ffedd5" stroke="#fb923c" strokeWidth="2" />
        <rect x="94" y="30" width="24" height="40" rx="2" fill="#fff" />
        <circle cx="106" cy="76" r="2.5" fill="#fb923c" />
        <circle cx="52" cy="40" r="14" fill="#fdba74" />
        <path d="M38 74c0-12 9-18 14-18s14 6 14 18v12H38V74z" fill="#ea580c" />
        <path d="M96 38h20M96 46h16M96 54h12" stroke="#f97316" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    num: "05",
    title: "Leadership & Intelligence",
    desc: "Make smarter decisions with real-time insights and actionable data.",
    accent: "teal",
    features: [
      "Real-time Dashboards",
      "Admissions Insights",
      "Finance Overview",
      "Attendance Insights",
      "Academics Overview",
      "Teacher Performance",
      "Student Performance",
      "Predictive Analytics",
      "Custom Reports",
    ],
    link: "/ecosystem?module=analytics",
    columns: 2,
    illustration: (
      <svg viewBox="0 0 160 100" className="sp-illu" aria-hidden="true">
        <rect x="28" y="24" width="104" height="62" rx="6" fill="#ccfbf1" />
        <rect x="36" y="32" width="28" height="18" rx="3" fill="#5eead4" />
        <rect x="70" y="32" width="28" height="18" rx="3" fill="#99f6e4" />
        <rect x="104" y="32" width="20" height="18" rx="3" fill="#2dd4bf" />
        <path
          d="M40 72 L56 58 L72 64 L90 46 L112 54"
          fill="none"
          stroke="#0d9488"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <circle cx="128" cy="48" r="14" fill="#99f6e4" />
        <path d="M128 40v16M120 48h16" stroke="#0f766e" strokeWidth="1.6" />
      </svg>
    ),
  },
  {
    num: "06",
    title: "Platform & Technology",
    desc: "Secure, scalable and future-ready technology for schools of all sizes.",
    accent: "navy",
    features: [
      "Mobile App & Multi-Roles",
      "Integrations",
      "Security & Compliance",
      "Multi-board Support",
      "Cloud / On-premise",
      "Scalable & Reliable",
    ],
    link: "/ecosystem?module=security",
    columns: 2,
    illustration: (
      <svg viewBox="0 0 160 100" className="sp-illu" aria-hidden="true">
        <path
          d="M80 18 L108 30 V52 C108 68 96 80 80 88 C64 80 52 68 52 52 V30 Z"
          fill="#dbeafe"
          stroke="#1d4ed8"
          strokeWidth="2"
        />
        <rect x="72" y="44" width="16" height="18" rx="2" fill="#1d4ed8" />
        <circle cx="80" cy="40" r="6" fill="none" stroke="#1d4ed8" strokeWidth="2" />
        <circle cx="36" cy="36" r="10" fill="#bfdbfe" />
        <circle cx="124" cy="36" r="10" fill="#93c5fd" />
        <circle cx="40" cy="72" r="9" fill="#dbeafe" />
        <circle cx="120" cy="72" r="9" fill="#bfdbfe" />
        <path d="M46 40 L70 34M114 40 L90 34M48 68 L66 58M112 68 L94 58" stroke="#60a5fa" strokeWidth="1.5" />
      </svg>
    ),
  },
];

const highlights = [
  {
    title: "AI-Powered Intelligence",
    desc: "Built-in AI across all solutions",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="8" y="9" width="8" height="10" rx="2" />
        <path d="M12 3v3M9 6h6M10 13h.01M14 13h.01M10 16h4" />
      </svg>
    ),
  },
  {
    title: "Secure & Compliant",
    desc: "End-to-end encryption and data protection standards",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Access Anywhere",
    desc: "Web & mobile access anytime, on any device",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <path d="M12 18h.01" />
      </svg>
    ),
  },
  {
    title: "Dedicated Support",
    desc: "Onboarding, training & 24x7 customer support",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
        <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
      </svg>
    ),
  },
  {
    title: "Scale Without Limits",
    desc: "From single school to multi-campus institutions",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 17l6-6 4 4 8-8" />
        <path d="M14 7h7v7" />
      </svg>
    ),
  },
];

const stats = [
  {
    value: "50,000+",
    label: "Schools Trust EduAitor",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 21h18M5 21V8l7-4 7 4v13M9 21v-6h6v6" />
      </svg>
    ),
  },
  {
    value: "10 Million+",
    label: "Students Impacted",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    value: "98%",
    label: "Customer Satisfaction",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
];

export default function SolutionPage() {
  return (
    <div className="sp-page">
      <section className="sp-hero">
        <div className="sp-container sp-hero__grid">
          <div className="sp-hero__copy">
            <h1>
              Solutions Built Around Schools.
              <br />
              Not Software.
            </h1>
            <p>
              Every school is unique, but the challenges are remarkably similar. EduAitor
              delivers intelligent solutions that simplify operations, empower educators,
              engage parents, and help every student succeed.
            </p>
            <div className="sp-hero__actions">
              <a href="#pillars" className="sp-btn sp-btn--primary">
                Explore Solutions <span aria-hidden="true">→</span>
              </a>
              <Link to="/bookademo" className="sp-btn sp-btn--outline">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <path d="M16 2v4M8 2v4M3 10h18" />
                </svg>
                Book a Demo
              </Link>
            </div>
          </div>

          <div className="sp-hero__visual">
            <div className="sp-hero__photo-wrap">
              <img
                src="/solutions/solutions-hero.png"
                alt="School leader and students using EduAitor"
                className="sp-hero__photo"
              />
            </div>
            <div className="sp-hero__stats">
              {stats.map((s) => (
                <div className="sp-stat-card" key={s.value}>
                  <span className="sp-stat-card__icon">{s.icon}</span>
                  <div>
                    <strong>{s.value}</strong>
                    <span>{s.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="sp-pillars" id="pillars">
        <div className="sp-container">
          <div className="sp-pillars__head">
            <h2>Six Solution Pillars for Every School</h2>
            <p>Comprehensive solutions designed to address every challenge. Measurable impact that matters.</p>
            <span className="sp-pillars__rule" aria-hidden="true" />
          </div>

          <div className="sp-pillars__grid">
            {pillars.map((p) => (
              <article className={`sp-card sp-card--${p.accent}`} key={p.num}>
                <div className="sp-card__top">
                  <span className="sp-card__num">{p.num}</span>
                  <h3>{p.title}</h3>
                </div>
                <p className="sp-card__desc">{p.desc}</p>
                <div className="sp-card__illu">{p.illustration}</div>
                <ul className={`sp-card__list${p.columns === 2 ? " sp-card__list--2" : ""}`}>
                  {p.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                <Link to={p.link} className="sp-card__more">
                  Learn More <span aria-hidden="true">→</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sp-highlights">
        <div className="sp-container sp-highlights__grid">
          {highlights.map((h) => (
            <div className="sp-highlight" key={h.title}>
              <span className="sp-highlight__icon">{h.icon}</span>
              <div>
                <strong>{h.title}</strong>
                <p>{h.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="sp-cta">
        <div className="sp-container sp-cta__inner">
          <div className="sp-cta__school" aria-hidden="true">
            <svg viewBox="0 0 120 90" className="sp-cta__school-svg">
              <rect x="28" y="34" width="64" height="46" rx="3" fill="#93c5fd" />
              <path d="M24 38 L60 12 L96 38" fill="#60a5fa" />
              <rect x="52" y="54" width="16" height="26" rx="2" fill="#1e3a8a" />
              <rect x="36" y="44" width="12" height="12" rx="1.5" fill="#dbeafe" />
              <rect x="72" y="44" width="12" height="12" rx="1.5" fill="#dbeafe" />
              <circle cx="60" cy="28" r="5" fill="#fbbf24" />
            </svg>
          </div>
          <div className="sp-cta__copy">
            <h2>Whatever Your School Needs, EduAitor Has a Solution.</h2>
            <p>
              From admissions to alumni, administration to analytics, and classrooms to
              communication—EduAitor brings every solution together on one intelligent platform.
            </p>
          </div>
          <Link to="/bookademo" className="sp-btn sp-btn--light">
            Book a Demo <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
