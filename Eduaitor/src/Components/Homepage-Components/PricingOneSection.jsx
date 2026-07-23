import React from "react";
import { Link } from "react-router-dom";
import "./home-v2.css";

const features = [
  {
    title: "Complete School Management",
    desc: "Admin, academics, fees, transport & more",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  {
    title: "AI-Powered Learning",
    desc: "Assessments, assistant, personalized learning",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="M9 9h.01M15 9h.01M9 15h6" />
      </svg>
    ),
  },
  {
    title: "Parent & Student Engagement",
    desc: "Real-time updates, alerts & dashboards",
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
    title: "Smart Analytics & Reports",
    desc: "Data-driven insights for better decisions",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
  {
    title: "Secure & Reliable",
    desc: "Enterprise-grade security & data protection",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: "Always Accessible",
    desc: "Cloud-based. Anytime, anywhere.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
      </svg>
    ),
  },
];

const monthlyChecks = [
  "All features included",
  "Pay only for active students",
  "Cancel or adjust anytime",
];

const yearlyChecks = [
  "All features included",
  "25% discount vs. monthly plan",
  "Best value for your school",
];

const trustGroups = [
  {
    color: "blue",
    title: "For Schools",
    desc: "Save time, reduce workload, improve outcomes.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 21h18M5 21V7l7-4 7 4v14" />
      </svg>
    ),
  },
  {
    color: "purple",
    title: "For Teachers",
    desc: "Teach better, manage easily, inspire more.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    color: "green",
    title: "For Parents",
    desc: "Stay connected, informed and empowered.",
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
    color: "orange",
    title: "For Students",
    desc: "Learn better, achieve more, dream bigger.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
  },
];

const impactBar = [
  { label: "Save Time", desc: "Automate tasks. Focus on what matters." },
  { label: "Save Costs", desc: "Affordable pricing. Maximum value." },
  { label: "Improve Outcomes", desc: "Data-driven insights. Better decisions." },
  { label: "Stronger Community", desc: "Connected schools. Stronger future." },
];

export default function PricingOneSection() {
  return (
    <section className="hv-section hv-pricing" id="pricing-one">
      <div className="hv-container">
        <div className="hv-pricing__header">
          <span className="hv-badge hv-badge--dark">SIMPLE. TRANSPARENT. AFFORDABLE.</span>
          <h2 className="hv-pricing__title">
            Powerful. Complete. Affordable. That's{" "}
            <span className="hv-accent hv-accent--underline">EduAitor ONE.</span>
          </h2>
          <p className="hv-pricing__sub">
            All the features you need. One simple plan. Maximum value for every student.
          </p>
          <div className="hv-pricing__callout">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            One Platform. One Plan. Endless Possibilities.
          </div>
        </div>

        <div className="hv-pricing__grid">
          <div className="hv-pricing__col hv-pricing__col--left">
            <h3 className="hv-pricing__col-title">WHAT YOU GET WITH EDUAITOR ONE</h3>
            <ul className="hv-pricing__features">
              {features.map((f, i) => (
                <li className="hv-pricing__feature" key={i}>
                  <div className="hv-pricing__feature-icon">{f.icon}</div>
                  <div>
                    <strong>{f.title}</strong>
                    <p>{f.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="hv-pricing__left-bar">
              Regular updates. New features. All included. No hidden costs.
            </div>
          </div>

          <div className="hv-pricing__col hv-pricing__col--center">
            <div className="hv-pricing__plans-header">ONE PLAN. TWO OPTIONS.</div>
            <div className="hv-pricing__plans">
              <div className="hv-pricing__plan hv-pricing__plan--monthly">
                <div className="hv-pricing__plan-label">MONTHLY PLAN</div>
                <div className="hv-pricing__plan-price">
                  <span className="hv-pricing__rupee">₹</span> 1
                </div>
                <div className="hv-pricing__plan-unit">PER STUDENT PER DAY</div>
                <span className="hv-pricing__plan-badge hv-pricing__plan-badge--blue">
                  BILLED MONTHLY
                </span>
                <ul className="hv-pricing__plan-checks">
                  {monthlyChecks.map((c, i) => (
                    <li key={i}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {c}
                    </li>
                  ))}
                </ul>
                <Link to="/bookademo" className="hv-btn hv-btn--primary hv-btn--block">
                  Get Started
                </Link>
              </div>

              <div className="hv-pricing__save-badge">SAVE 25% WITH YEARLY PLAN</div>

              <div className="hv-pricing__plan hv-pricing__plan--yearly">
                <div className="hv-pricing__plan-label">YEARLY PLAN</div>
                <div className="hv-pricing__plan-price hv-pricing__plan-price--green">
                  <span className="hv-pricing__rupee">₹</span> 1
                </div>
                <div className="hv-pricing__plan-unit">PER STUDENT PER DAY</div>
                <span className="hv-pricing__plan-badge hv-pricing__plan-badge--green">
                  BILLED YEARLY
                </span>
                <ul className="hv-pricing__plan-checks hv-pricing__plan-checks--green">
                  {yearlyChecks.map((c, i) => (
                    <li key={i}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {c}
                    </li>
                  ))}
                </ul>
                <Link to="/bookademo" className="hv-btn hv-btn--green hv-btn--block">
                  Get Started
                </Link>
              </div>
            </div>
          </div>

          <div className="hv-pricing__col hv-pricing__col--right">
            <h3 className="hv-pricing__col-title hv-pricing__col-title--dark">
              TRUSTED BY SCHOOLS BUILT FOR IMPACT
            </h3>
            <ul className="hv-pricing__trust">
              {trustGroups.map((g, i) => (
                <li className={`hv-pricing__trust-item hv-pricing__trust-item--${g.color}`} key={i}>
                  <div className="hv-pricing__trust-icon">{g.icon}</div>
                  <div>
                    <strong>{g.title}</strong>
                    <p>{g.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="hv-pricing__secure">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <div>
                <strong>100% Secure</strong>
                <p>Your data is safe with enterprise-grade security.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="hv-pricing__impact-bar">
          {impactBar.map((item, i) => (
            <div className="hv-pricing__impact-item" key={i}>
              <strong>{item.label}</strong>
              <p>{item.desc}</p>
            </div>
          ))}
          <div className="hv-pricing__impact-promise">
            One Plan. Every Feature. <strong>₹1 Per Student Per Day.</strong> That's the EduAitor
            Promise.
          </div>
        </div>

        <div className="hv-pricing__footer">
          <p>
            Simple Pricing. Powerful Impact. That's{" "}
            <span className="hv-accent">EduAitor ONE.</span>
          </p>
          <p className="hv-pricing__footer-fine">
            NO COMPLEX PLANS • NO HIDDEN CHARGES • JUST REAL VALUE
          </p>
        </div>
      </div>
    </section>
  );
}
