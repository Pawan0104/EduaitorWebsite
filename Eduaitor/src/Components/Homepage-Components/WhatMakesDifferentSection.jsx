import React from "react";
import "./home-v2.css";

const cards = [
  {
    color: "blue",
    title: "AI-First",
    desc: "AI is at the core of everything we build—empowering educators, supporting students and simplifying every workflow.",
    image: "/home/diff-ai.png?v=4",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M12 3c-2.8 0-5 2.4-5 5.4 0 1.7.7 3.2 1.9 4.2V15a2 2 0 0 0 2 2h2.2a2 2 0 0 0 2-2v-2.4c1.2-1 1.9-2.5 1.9-4.2C17 5.4 14.8 3 12 3z" />
        <path d="M9.5 19h5M10.5 22h3" />
        <circle cx="10.2" cy="9" r="0.8" fill="currentColor" stroke="none" />
        <circle cx="13.8" cy="9" r="0.8" fill="currentColor" stroke="none" />
        <path d="M10.2 11.2c.7.7 1.9.7 2.6 0" />
      </svg>
    ),
  },
  {
    color: "green",
    title: "One Platform",
    desc: "All school operations, academics, communication, finance, transport, commerce and analytics—unified on one intelligent platform.",
    image: "/home/diff-platform.png?v=4",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M10 3.5 4.5 7v5.5L10 16l5.5-3.5V7L10 3.5z" />
        <path d="M10 16v4.5" />
        <path d="M15.5 7 20 9.8v5.2L15.5 18" />
        <path d="M4.5 12.5 10 16l5.5-3.5" />
      </svg>
    ),
  },
  {
    color: "purple",
    title: "Parent Empowerment",
    desc: "Transform parents from spectators to active learning partners with real-time visibility and AI-powered tools.",
    image: "/home/diff-parent.png?v=4",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <circle cx="8" cy="7" r="2.2" />
        <circle cx="16" cy="7" r="2.2" />
        <circle cx="12" cy="11.5" r="1.8" />
        <path d="M3.5 18.5c.4-2.4 2.3-3.8 4.5-3.8 1.1 0 2 .3 2.8.9" />
        <path d="M13.2 15.6c.8-.6 1.7-.9 2.8-.9 2.2 0 4.1 1.4 4.5 3.8" />
        <path d="M9.2 18.5c.3-1.7 1.5-2.8 2.8-2.8s2.5 1.1 2.8 2.8" />
        <path d="M12 5.2l.7 1.3 1.4.2-1 1 .2 1.4L12 8.4l-1.3.7.2-1.4-1-1 1.4-.2L12 5.2z" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    color: "teal",
    title: "Student Success",
    desc: "Personalized learning, AI academic assistant and predictive insights help every student learn better and achieve more.",
    image: "/home/diff-student.png?v=4",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M2 10.5 12 5l10 5.5-10 5.5L2 10.5z" />
        <path d="M6.5 13v4.2c0 1.3 2.5 2.8 5.5 2.8s5.5-1.5 5.5-2.8V13" />
        <path d="M22 10.5V16" />
      </svg>
    ),
  },
  {
    color: "orange",
    title: "Predictive Intelligence",
    desc: "AI-powered analytics predict risks, identify learning gaps and empower leadership with actionable insights for better decisions.",
    image: "/home/diff-analytics.png?v=4",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M4 19V9" />
        <path d="M10 19V5" />
        <path d="M16 19v-7" />
        <path d="M4 12l5-4 4 2 5-5" />
        <path d="M15 5h3v3" />
      </svg>
    ),
  },
  {
    color: "blue-dark",
    title: "Enterprise Ready",
    desc: "Scalable, secure and future-ready architecture with multi-school support, advanced integrations and enterprise-grade security.",
    image: "/home/diff-enterprise.png?v=4",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M12 3 5 6.5v5.2c0 4.3 2.9 7.4 7 8.8 4.1-1.4 7-4.5 7-8.8V6.5L12 3z" />
        <path d="M9 12.2l2 2 4-4.2" />
      </svg>
    ),
  },
];

const bannerItems = [
  {
    label: "Save Time",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    ),
  },
  {
    label: "Increase Efficiency",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2.8v2.2M12 19v2.2M4.9 4.9l1.6 1.6M17.5 17.5l1.6 1.6M2.8 12H5M19 12h2.2M4.9 19.1l1.6-1.6M17.5 6.5l1.6-1.6" />
      </svg>
    ),
  },
  {
    label: "Improve Outcomes",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 18 9.5 12l3.5 3.5L20 7" />
        <path d="M15 7h5v5" />
      </svg>
    ),
  },
  {
    label: "Create Impact",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M16.5 20v-1.8a3.4 3.4 0 0 0-3.4-3.4H6.9A3.4 3.4 0 0 0 3.5 18.2V20" />
        <circle cx="10" cy="7.5" r="3" />
        <path d="M20.5 20v-1.6a2.8 2.8 0 0 0-2.1-2.7" />
        <path d="M15.2 4.8a3 3 0 0 1 0 5.7" />
      </svg>
    ),
  },
];

export default function WhatMakesDifferentSection() {
  return (
    <section className="hv-section hv-different">
      <div className="hv-different__bg" aria-hidden="true" />
      <div className="hv-container">
        <div className="hv-different__header">
          <span className="hv-different__label">WHAT MAKES US DIFFERENT</span>
          <h2 className="hv-different__title">
            More Than Software. A Complete{" "}
            <span className="hv-accent">School Transformation</span> Platform.
          </h2>
          <p className="hv-different__sub">
            EduAitor combines the power of AI with deep domain expertise to deliver more than
            automation—we deliver transformation that impacts every learner, educator and every
            outcome.
          </p>
        </div>

        <div className="hv-different__grid">
          {cards.map((card, i) => (
            <div className={`hv-different__card hv-different__card--${card.color}`} key={i}>
              <div className="hv-different__card-icon">{card.icon}</div>
              <h3 className="hv-different__card-title">{card.title}</h3>
              <span className="hv-different__card-line" aria-hidden="true" />
              <p className="hv-different__card-desc">{card.desc}</p>
              <div className="hv-different__card-art">
                <img src={card.image} alt="" aria-hidden="true" />
              </div>
            </div>
          ))}
        </div>

        <div className="hv-different__banner">
          <div className="hv-different__banner-brand" aria-hidden="true">
            <div className="hv-different__banner-logo">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2.5 4.5 6v5.4c0 4.7 3.2 8.1 7.5 9.6 4.3-1.5 7.5-4.9 7.5-9.6V6L12 2.5z"
                  fill="#2563eb"
                />
                <text
                  x="12"
                  y="15.2"
                  textAnchor="middle"
                  fontSize="9"
                  fontWeight="800"
                  fill="#fff"
                  fontFamily="Arial, sans-serif"
                >
                  A
                </text>
              </svg>
            </div>
          </div>
          <div className="hv-different__banner-divider" aria-hidden="true" />
          <div className="hv-different__banner-copy">
            <p>We don't just digitize schools.</p>
            <p className="hv-accent">We transform the way schools operate, teach and inspire.</p>
          </div>
          <div className="hv-different__banner-divider" aria-hidden="true" />
          <div className="hv-different__banner-items">
            {bannerItems.map((item, i) => (
              <React.Fragment key={i}>
                {i > 0 && <span className="hv-different__banner-item-divider" aria-hidden="true" />}
                <div className="hv-different__banner-item">
                  <span className="hv-different__banner-item-icon">{item.icon}</span>
                  <span>{item.label}</span>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>

        <p className="hv-different__tagline">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          Better Operations. Better Teaching. Better Learning.{" "}
          <span className="hv-accent">Stronger Outcomes.</span>
        </p>
      </div>
    </section>
  );
}
