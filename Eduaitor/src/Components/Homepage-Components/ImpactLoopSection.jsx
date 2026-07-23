import React from "react";
import { Link } from "react-router-dom";
import "./home-v2.css";

const impactGroups = [
  {
    color: "blue",
    title: "For Schools",
    desc: "Efficient operations, smarter decisions and stronger outcomes.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 21h18M5 21V7l7-4 7 4v14" />
      </svg>
    ),
  },
  {
    color: "green",
    title: "For Teachers",
    desc: "Less workload, more focus on what matters most—teaching and inspiring.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    color: "purple",
    title: "For Students",
    desc: "Personalized support, better performance and brighter futures.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
  },
  {
    color: "orange",
    title: "For Parents",
    desc: "Real-time visibility, meaningful engagement and peace of mind.",
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
    color: "teal",
    title: "For Society",
    desc: "A smarter education ecosystem building a better tomorrow.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
];

const loopSteps = [
  {
    num: 1,
    color: "blue",
    title: "Streamline Operations",
    desc: "Automate tasks, simplify processes and save valuable time.",
  },
  {
    num: 2,
    color: "green",
    title: "Empower Educators",
    desc: "Give teachers the right tools, insights and support to teach better.",
  },
  {
    num: 3,
    color: "purple",
    title: "Engage Students",
    desc: "Personalize learning, spark curiosity and improve outcomes.",
  },
  {
    num: 4,
    color: "orange",
    title: "Involve Parents",
    desc: "Keep parents informed, engaged and active partners in success.",
  },
  {
    num: 5,
    color: "teal",
    title: "Drive Data-Informed Decisions",
    desc: "Leverage AI and analytics to predict, plan and perform better.",
  },
  {
    num: 6,
    color: "pink",
    title: "Create Lasting Impact",
    desc: "Better outcomes today, stronger foundations for tomorrow.",
  },
];

const enabledBy = [
  {
    color: "blue",
    title: "AI-Powered Intelligence",
    desc: "Smart automation, predictive insights and personalized recommendations.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="M9 9h.01M15 9h.01M9 15h6" />
      </svg>
    ),
  },
  {
    color: "green",
    title: "Unified Platform",
    desc: "All modules, all users, one seamless and secure platform.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
      </svg>
    ),
  },
  {
    color: "purple",
    title: "Secure & Reliable",
    desc: "Enterprise-grade security, data privacy and 24x7 reliability.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    color: "orange",
    title: "Accessible Anywhere",
    desc: "Web and mobile access anytime, anywhere.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <path d="M12 18h.01" />
      </svg>
    ),
  },
  {
    color: "teal",
    title: "Future-Ready",
    desc: "Continuous innovation to keep schools ahead.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
  },
];

export default function ImpactLoopSection() {
  return (
    <section className="hv-section hv-impact-loop">
      <div className="hv-container">
        <div className="hv-impact-loop__header">
          <span className="hv-badge">THE EDUAITOR IMPACT LOOP</span>
          <h2 className="hv-impact-loop__title">
            Better Operations. Better Teaching. Better Learning. Better Future.
          </h2>
          <p className="hv-impact-loop__sub">
            A continuous cycle of intelligence and action that creates lasting impact for every
            stakeholder in the education ecosystem.
          </p>
          <div className="hv-impact-loop__callout">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            One Ecosystem. Every Connection. Infinite Impact.
          </div>
        </div>

        <div className="hv-impact-loop__body">
          <div className="hv-impact-loop__col hv-impact-loop__col--left">
            <h3 className="hv-impact-loop__col-title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                <path d="M4 22h16M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20 7 22M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20 17 22" />
                <path d="M18 2H6v7a6 6 0 0 0 12 0V2z" />
              </svg>
              THE IMPACT WE CREATE
            </h3>
            <ul className="hv-impact-loop__list">
              {impactGroups.map((item, i) => (
                <li className={`hv-impact-loop__item hv-impact-loop__item--${item.color}`} key={i}>
                  <div className="hv-impact-loop__item-icon">{item.icon}</div>
                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="hv-impact-loop__col hv-impact-loop__col--center">
            <div className="hv-impact-loop__hub">
              <span className="hv-impact-loop__hub-label">The Impact Loop</span>
              <p>Smarter Insights. Stronger Actions. Brighter Outcomes.</p>
            </div>
            <div className="hv-impact-loop__steps">
              {loopSteps.map((step) => (
                <div
                  className={`hv-impact-loop__step hv-impact-loop__step--${step.color}`}
                  key={step.num}
                  style={{ "--step-i": step.num - 1 }}
                >
                  <span className="hv-impact-loop__step-num">{step.num}</span>
                  <h4>{step.title}</h4>
                  <p>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="hv-impact-loop__col hv-impact-loop__col--right">
            <h3 className="hv-impact-loop__col-title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              ENABLED BY EDUAITOR
            </h3>
            <ul className="hv-impact-loop__list">
              {enabledBy.map((item, i) => (
                <li className={`hv-impact-loop__item hv-impact-loop__item--${item.color}`} key={i}>
                  <div className="hv-impact-loop__item-icon">{item.icon}</div>
                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="hv-impact-loop__cta-bar">
          <div className="hv-impact-loop__cta-item">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
              <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
            </svg>
            <p>
              The loop never stops. <span className="hv-accent">The impact never ends.</span>
            </p>
          </div>
          <div className="hv-impact-loop__cta-item">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <div>
              <strong>Join the EduAitor Movement</strong>
              <p>Be part of a community that's transforming education—together.</p>
            </div>
          </div>
          <div className="hv-impact-loop__cta-item">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <div>
              <strong>Start Your Impact Loop Today</strong>
              <p>One step today. Infinite impact for generations tomorrow.</p>
            </div>
          </div>
          <Link to="/bookademo" className="hv-btn hv-btn--light hv-btn--sm">
            Book a Demo
          </Link>
        </div>
      </div>
    </section>
  );
}
