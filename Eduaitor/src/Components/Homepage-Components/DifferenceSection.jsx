import React from "react";
import "./home-v2.css";

const sidebarFeatures = [
  {
    color: "blue",
    title: "AI at the Core",
    desc: "Built with AI to think, predict and personalize.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z" />
      </svg>
    ),
  },
  {
    color: "green",
    title: "All-in-One Platform",
    desc: "Everything schools need, unified and simplified.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    color: "purple",
    title: "Secure & Reliable",
    desc: "Enterprise-grade security you can trust.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
  {
    color: "orange",
    title: "Mobile First",
    desc: "Powerful mobile apps for every stakeholder.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <path d="M12 18h.01" />
      </svg>
    ),
  },
  {
    color: "blue",
    title: "Future Ready",
    desc: "Scalable, flexible and built to grow with you.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
      </svg>
    ),
  },
];

const pillars = [
  {
    color: "blue",
    title: "Smarter",
    desc: "AI-driven insights, automated workflows and intelligent recommendations that save time and improve decisions.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
      </svg>
    ),
  },
  {
    color: "green",
    title: "More Engaging",
    desc: "Powerful tools that engage students, empower teachers and connect parents like never before.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    color: "purple",
    title: "More Complete",
    desc: "From administration to academics, transport to communication—everything on one unified platform.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
  },
  {
    color: "orange",
    title: "More Impactful",
    desc: "Personalized learning, predictive analytics and student success tools that drive better outcomes.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
  {
    color: "teal",
    title: "More Trusted",
    desc: "Built with robust security, data privacy and compliance at the heart of everything we do.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    color: "pink",
    title: "More Human",
    desc: "Technology that understands people—designed to support, not replace the human touch in education.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
];

const traditionalItems = [
  "Manual and time-consuming",
  "Works in isolation",
  "Limited insights and reporting",
  "Difficult to use and adopt",
  "One-size-fits-all approach",
];

const eduaitorItems = [
  "Intelligent automation that saves hours every day",
  "One platform, all functions—fully connected",
  "AI-powered insights for smarter decisions",
  "Easy to use, loved by all stakeholders",
  "Designed for every school's unique needs",
];

const footerBenefits = [
  { label: "Save Time", icon: "clock" },
  { label: "Empower Teachers", icon: "user" },
  { label: "Engage Parents", icon: "group" },
  { label: "Support Students", icon: "grad" },
  { label: "Improve Outcomes", icon: "chart" },
];

function BenefitIcon({ type }) {
  const props = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8 };
  switch (type) {
    case "clock":
      return <svg {...props}><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>;
    case "user":
      return <svg {...props}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>;
    case "group":
      return <svg {...props}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>;
    case "grad":
      return <svg {...props}><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c0 1.1 2.7 3 6 3s6-1.9 6-3v-5" /></svg>;
    default:
      return <svg {...props}><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>;
  }
}

export default function DifferenceSection() {
  return (
    <section className="hv-section hv-difference" id="difference">
      <div className="hv-container">
        <div className="hv-difference__header">
          <span className="hv-badge hv-badge--stars">★ THE EDUAITOR DIFFERENCE ★</span>
          <h2 className="hv-difference__title">
            It's Not Just a School Software.{" "}
            <span className="hv-accent">It's a Smarter Way Forward.</span>
          </h2>
          <p className="hv-difference__sub">
            EduAitor combines AI + Automation + Education Expertise to deliver{" "}
            <span className="hv-accent">unmatched value</span> for every school.
          </p>
        </div>

        <div className="hv-difference__hero">
          <div className="hv-difference__sidebar">
            {sidebarFeatures.map((f, i) => (
              <div className={`hv-difference__sidebar-item hv-difference__sidebar-item--${f.color}`} key={i}>
                <div className="hv-difference__sidebar-icon">{f.icon}</div>
                <div>
                  <h3 className="hv-difference__sidebar-title">{f.title}</h3>
                  <p className="hv-difference__sidebar-desc">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="hv-difference__visual">
            <img
              src="/home/difference-woman.png"
              alt="EduAitor platform on devices"
              className="hv-difference__img"
            />
            <div className="hv-difference__devices" aria-hidden="true">
              <div className="hv-diff-laptop">
                <div className="hv-diff-laptop__bezel">
                  <div className="hv-diff-laptop__top">
                    <strong>EduAitor</strong>
                    <em>Bright Future School</em>
                  </div>
                  <div className="hv-diff-laptop__kpis">
                    <div><b>1,245</b><i>Students</i></div>
                    <div><b>98%</b><i>Attendance</i></div>
                    <div><b>92%</b><i>Homework</i></div>
                  </div>
                  <div className="hv-diff-laptop__chart">
                    <span>Academic Performance Overview</span>
                    <svg viewBox="0 0 120 36" preserveAspectRatio="none">
                      <polyline
                        fill="none"
                        stroke="#2563eb"
                        strokeWidth="2"
                        points="0,28 20,22 40,24 60,12 80,16 100,6 120,10"
                      />
                    </svg>
                  </div>
                </div>
                <div className="hv-diff-laptop__base" />
              </div>
              <div className="hv-diff-phone">
                <div className="hv-diff-phone__notch" />
                <div className="hv-diff-phone__bar">AI Academic Assistant</div>
                <div className="hv-diff-phone__body">
                  <span>Explain steps</span>
                  <span>Summarize a lesson</span>
                  <span>Create a quiz</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hv-difference__pillars">
          {pillars.map((p, i) => (
            <div className={`hv-difference__pillar hv-difference__pillar--${p.color}`} key={i}>
              <div className="hv-difference__pillar-icon">{p.icon}</div>
              <h3 className="hv-difference__pillar-title">{p.title}</h3>
              <p className="hv-difference__pillar-desc">{p.desc}</p>
            </div>
          ))}
        </div>

        <div className="hv-difference__vs">
          <div className="hv-difference__vs-col hv-difference__vs-col--traditional">
            <div className="hv-difference__vs-header">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <path d="M8 21h8M12 17v4" />
              </svg>
              <h3>Traditional School Software</h3>
            </div>
            <ul className="hv-difference__vs-list">
              {traditionalItems.map((item, i) => (
                <li key={i}>
                  <span className="hv-difference__vs-x">✕</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="hv-difference__vs-badge">VS</div>

          <div className="hv-difference__vs-col hv-difference__vs-col--eduaitor">
            <div className="hv-difference__vs-header">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M9 12l2 2 4-4" />
              </svg>
              <h3>EduAitor</h3>
            </div>
            <ul className="hv-difference__vs-list hv-difference__vs-list--check">
              {eduaitorItems.map((item, i) => (
                <li key={i}>
                  <span className="hv-difference__vs-check">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="hv-difference__vs-callout">
            <div className="hv-difference__vs-callout-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </div>
            <p>
              We don't just manage schools.{" "}
              <strong>We help schools excel.</strong>
            </p>
          </div>
        </div>

        <div className="hv-difference__footer-bar">
          <div className="hv-difference__footer-left">
            <div className="hv-difference__footer-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                <path d="M4 22h16" />
                <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                <path d="M18 2H6v7a6 6 0 0 0 12 0V2z" />
              </svg>
            </div>
            <div>
              <h3 className="hv-difference__footer-title">The EduAitor Difference</h3>
              <p className="hv-difference__footer-sub">
                Better Technology. Better Experiences. Better Outcomes.
              </p>
            </div>
          </div>
          <div className="hv-difference__footer-divider" aria-hidden="true" />
          <div className="hv-difference__footer-benefits">
            {footerBenefits.map((b, i) => (
              <div className="hv-difference__footer-benefit" key={i}>
                <BenefitIcon type={b.icon} />
                <span>{b.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
