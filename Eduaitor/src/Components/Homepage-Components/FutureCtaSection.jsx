import React from "react";
import { Link } from "react-router-dom";
import "./home-v2.css";
import { useContactPopup } from "../ContactPopup";

const features = [
  {
    color: "blue",
    title: "Transform Your School",
    desc: "Streamline operations, enhance teaching and deliver better outcomes.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 21h18M5 21V7l7-4 7 4v14" />
      </svg>
    ),
  },
  {
    color: "green",
    title: "Empower Every Stakeholder",
    desc: "Give school leaders, teachers, parents and students the tools they need to excel.",
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
    title: "Drive Real Impact",
    desc: "Make data-driven decisions, improve performance and shape brighter futures.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
  {
    color: "orange",
    title: "Be Future-Ready",
    desc: "Embrace AI, automation and innovation—stay ahead, always.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
  },
];

const actions = [
  {
    color: "blue",
    title: "BOOK A DEMO",
    desc: "See EduAitor in action. Experience the difference.",
    to: "/bookademo",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    color: "green",
    title: "TALK TO OUR EXPERTS",
    desc: "Get personalized guidance for your school.",
    to: "/contactus#get-in-touch",
    action: "popup",
    source: "home-talk-experts",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    color: "purple",
    title: "PARTNER WITH US",
    desc: "Join a growing community of future-ready schools.",
    to: "/contactus",
    action: "popup",
    source: "home-partner",
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
    color: "orange",
    title: "START YOUR JOURNEY",
    desc: "One simple step today. Infinite possibilities tomorrow.",
    to: "/bookademo",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
        <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      </svg>
    ),
  },
];

export default function FutureCtaSection() {
  const { openContactPopup } = useContactPopup();

  return (
    <section className="hv-section hv-future" id="resources">
      <div className="hv-container">
        <div className="hv-future__header">
          <span className="hv-future__label">— THE FUTURE OF EDUCATION IS HERE —</span>
          <h2 className="hv-future__title">
            Let's Build Smarter Schools. <span className="hv-future__together">Together.</span>
          </h2>
          <p className="hv-future__sub">
            EduAitor is more than a platform—it's a movement to transform education, empower every
            stakeholder and unlock the true potential of every student.
          </p>
        </div>

        <div className="hv-future__body">
          <div className="hv-future__features">
            {features.map((f, i) => (
              <div className={`hv-future__feature hv-future__feature--${f.color}`} key={i}>
                <div className="hv-future__feature-icon">{f.icon}</div>
                <div>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="hv-future__cta-box">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
              <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
            </svg>
            <h3>
              The Best Time to Start is <span className="hv-future__now">NOW!</span>
            </h3>
            <p>
              Join hundreds of forward-thinking schools already making the change.{" "}
              <em>Be the next success story!</em>
            </p>
          </div>

          <div className="hv-future__visual">
            <img src="/home/future-family.png" alt="EduAitor platform in action" className="hv-future__img" />
            <div className="hv-future__devices" aria-hidden="true">
              <div className="hv-future-laptop">
                <div className="hv-future-laptop__screen">
                  <div className="hv-future-laptop__top">
                    <strong>EduAitor</strong>
                    <em>Dashboard</em>
                  </div>
                  <div className="hv-future-laptop__kpis">
                    <div><b>1,245</b><i>Students</i></div>
                    <div><b>98%</b><i>Attendance</i></div>
                    <div><b>92%</b><i>Homework</i></div>
                  </div>
                  <div className="hv-future-laptop__chart" />
                </div>
                <div className="hv-future-laptop__base" />
              </div>
              <div className="hv-future-phone">
                <div className="hv-future-phone__hello">Good Morning, Ananya!</div>
                <div className="hv-future-phone__grid">
                  <span>Homework</span>
                  <span>Attendance</span>
                  <span>Messages</span>
                  <span>Fees</span>
                </div>
                <div className="hv-future-phone__ai">AI Academic Assistant</div>
              </div>
            </div>
          </div>
        </div>

        <div className="hv-future__action-bar">
          <p className="hv-future__action-headline">
            Let's take the next step—<span className="hv-accent">together.</span>
          </p>
          <div className="hv-future__actions">
            {actions.map((a, i) =>
              a.action === "popup" ? (
                <button
                  type="button"
                  className={`hv-future__action hv-future__action--${a.color}`}
                  key={i}
                  onClick={() => openContactPopup(a.source || "home-cta")}
                >
                  <div className="hv-future__action-icon">{a.icon}</div>
                  <strong>{a.title}</strong>
                  <p>{a.desc}</p>
                </button>
              ) : (
                <Link
                  to={a.to}
                  className={`hv-future__action hv-future__action--${a.color}`}
                  key={i}
                >
                  <div className="hv-future__action-icon">{a.icon}</div>
                  <strong>{a.title}</strong>
                  <p>{a.desc}</p>
                </Link>
              )
            )}
          </div>
        </div>

        <div className="hv-future__motto">
          <p>
            Smarter Schools. Stronger Students. Better Tomorrow.{" "}
            <em>Let's make it happen!</em>
          </p>
        </div>
      </div>
    </section>
  );
}
