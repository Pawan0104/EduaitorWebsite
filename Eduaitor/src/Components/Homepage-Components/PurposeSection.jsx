import React from "react";
import "./home-v2.css";

const beliefs = [
  {
    color: "blue",
    highlight: "empower educators",
    text: "We believe technology should empower educators to teach better, not just work faster.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  {
    color: "green",
    highlight: "active learning partners",
    text: "We believe parents should become active learning partners, every step of the way.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    color: "purple",
    highlight: "every student",
    text: "We believe every student deserves personalized support to discover their potential and achieve their dreams.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c0 1.1 2.7 3 6 3s6-1.9 6-3v-5" />
      </svg>
    ),
  },
  {
    color: "orange",
    highlight: "schools",
    text: "We believe schools should spend more time educating and less time managing.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 21h18" />
        <path d="M5 21V7l7-4 7 4v14" />
        <path d="M9 21v-6h6v6" />
      </svg>
    ),
  },
  {
    color: "navy",
    highlight: "meaningful impact",
    text: "We believe in creating meaningful impact that builds smarter schools and a better future for generations to come.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
];

const missionItems = [
  { color: "blue", label: "Simplify Operations", icon: "ops" },
  { color: "green", label: "Empower Educators", icon: "teach" },
  { color: "purple", label: "Engage Parents", icon: "parents" },
  { color: "orange", label: "Support Students", icon: "students" },
  { color: "blue", label: "Improve Outcomes", icon: "outcomes" },
];

function MissionIcon({ type }) {
  const props = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8 };
  switch (type) {
    case "ops":
      return <svg {...props}><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>;
    case "teach":
      return <svg {...props}><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></svg>;
    case "parents":
      return <svg {...props}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>;
    case "students":
      return <svg {...props}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>;
    default:
      return <svg {...props}><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>;
  }
}

function highlightBelief(text, phrase, colorClass) {
  const idx = text.toLowerCase().indexOf(phrase.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <span className={`hv-purpose__highlight hv-purpose__highlight--${colorClass}`}>
        {text.slice(idx, idx + phrase.length)}
      </span>
      {text.slice(idx + phrase.length)}
    </>
  );
}

export default function PurposeSection() {
  return (
    <section className="hv-section hv-purpose">
      <div className="hv-container">
        <div className="hv-purpose__top">
          <div className="hv-purpose__content">
            <span className="hv-label">OUR PURPOSE</span>
            <h2 className="hv-purpose__title">
              Because Education Changes Lives.
            </h2>
            <p className="hv-purpose__intro">
              At EduAitor, we believe technology should empower people, not replace them.
              That's why we built more than a platform—we built a purpose.
            </p>

            <ul className="hv-purpose__beliefs">
              {beliefs.map((b, i) => (
                <li className={`hv-purpose__belief hv-purpose__belief--${b.color}`} key={i}>
                  <div className="hv-purpose__belief-icon">{b.icon}</div>
                  <p className="hv-purpose__belief-text">
                    {highlightBelief(b.text, b.highlight, b.color)}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="hv-purpose__visual">
            <p className="hv-purpose__script">
              Empower Educators. Engage Parents. Elevate Students.
            </p>
            <div className="hv-purpose__img-wrap">
              <img
                src="/home/purpose-classroom.png"
                alt="Teacher and students in classroom"
                className="hv-purpose__img"
              />
              <div className="hv-purpose__badge">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                That is why EduAitor exists.
              </div>
            </div>
          </div>
        </div>

        <div className="hv-purpose__mission">
          <div className="hv-purpose__mission-logo">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="12" cy="12" r="10" />
              <path d="M8 14s1.5 2 4 2 4-2 4-2" />
              <line x1="9" y1="9" x2="9.01" y2="9" />
              <line x1="15" y1="9" x2="15.01" y2="9" />
            </svg>
          </div>
          <div className="hv-purpose__mission-center">
            <h3 className="hv-purpose__mission-title">Our Mission in Every Action</h3>
            <div className="hv-purpose__mission-items">
              {missionItems.map((m, i) => (
                <div className={`hv-purpose__mission-item hv-purpose__mission-item--${m.color}`} key={i}>
                  <MissionIcon type={m.icon} />
                  <span>{m.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="hv-purpose__mission-right">
            <p>Stronger Schools.</p>
            <p>Stronger Students.</p>
            <p className="hv-accent">Stronger Tomorrow.</p>
          </div>
        </div>

        <blockquote className="hv-purpose__quote">
          <span className="hv-purpose__quote-mark">"</span>
          Education is not just what we do.{" "}
          <span className="hv-accent">It's why we exist.</span>
          <span className="hv-purpose__quote-mark">"</span>
        </blockquote>
      </div>
    </section>
  );
}
