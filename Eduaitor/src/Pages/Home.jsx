import React, { useRef, useEffect, useState } from "react";
import "./Home.css";
import heroimage from "../assets/homepage-1.jpg";
import logo1 from "../assets/logo1.png";
import logo2 from "../assets/logo2.png";
import logo3 from "../assets/logo3.png";
import logo4 from "../assets/logo4.png";
import logo5 from "../assets/logo5.png";
import logo6 from "../assets/logo6.png";
import logo7 from "../assets/logo7.png";
import logo8 from "../assets/logo8.png";
import logo9 from "../assets/logo9.png";
import logo10 from "../assets/logo10.png";
import logo11 from "../assets/logo11.png";
import logo12 from "../assets/logo12.png";
import logo13 from "../assets/logo13.png";
import logo14 from "../assets/logo14.png";

import ERPSection from "../Components/Homepage-Components/ERPSection";
import EcosystemSection from "../Components/Homepage-Components/EcosystemSection";
import TestimonialsSection from "../Components/Homepage-Components/TestimonialsSection";
import AwardsSection from "../Components/Homepage-Components/AwardsSection";
import { NavLink } from "react-router-dom";
import Counter from "../Components/Counter";

// const logos = [
//   logo1,
//   logo2,
//   logo3,
//   logo4,
//   logo5,
//   logo6,
//   logo7,
//   logo8,
//   logo9,
//   logo10,
//   logo11,
//   logo12,
//   logo13,
//   logo14,
// ];


const stats = [
  { end: 1250, suffix: "+", label: "Institutions Onboarded" },
  { end: 500000, suffix: "+", label: "App Downloads" },
  { end: 1500, suffix: "+ Cr", label: "Fee Processed" },
];

const whyUs = [
  {
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    title: "Instant Setup",
    desc: "Go live in under 48 hours. No IT team required.",
  },
  {
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Bank-Grade Security",
    desc: "End-to-end encryption, role-based access, SOC-ready.",
  },
  {
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    title: "99.9% Uptime SLA",
    desc: "Cloud-native infrastructure that never sleeps.",
  },
  {
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Dedicated Support",
    desc: "24/7 onboarding specialists + live chat.",
  },
];

function useScrollReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

export default function Home() {
  const [statsRef, statsVisible] = useScrollReveal();
  const [whyRef, whyVisible] = useScrollReveal();
  const [taglineRef, taglineVisible] = useScrollReveal();
  const [logos, setLogos] = useState([]);

  useEffect(() => {
  const lolo = fetch(`${import.meta.env.VITE_API_URL}/logos?activeOnly=true`)
    .then((res) => res.json())
    .then((data) => {
      console.log("Fetched logos:", data.logos)
      setLogos(data.logos.map((l) => l.imageUrl))
    })
    .catch((err) => console.error("Error fetching logos:", err));
}, []);
  return (
    <div className="hm-root">
      {/* ── HERO ─────────────────────────────────── */}
      <section className="hm-hero">
        <div className="hm-hero__bg-grid" aria-hidden="true" />
        <div className="hm-hero__blob hm-hero__blob--1" aria-hidden="true" />
        <div className="hm-hero__blob hm-hero__blob--2" aria-hidden="true" />

        <div className="hm-hero__inner">
          <div className="hm-hero__left">
            <span className="hm-pill">
              <span className="hm-pill__dot" />
              Trusted by 1,100+ institutions worldwide
            </span>

            <h1 className="hm-hero__h1">
              <span className="hm-hero__text">The Smartest Way to</span>

              <br />

              <span className="hm-hero__accent">Run Your School.</span>
            </h1>

            <p className="hm-hero__sub">
              Eduaitor unifies admissions, fees, attendance, academics, and
              parent communication — in one platform that works the moment you
              log in.
            </p>

            <div className="hm-hero__actions">
              <NavLink to="/bookademo" className="hm-btn hm-btn--primary">
                Book a Free Demo
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </NavLink>
              <NavLink to="/solution" className="hm-btn hm-btn--ghost">
                See Solutions
              </NavLink>
            </div>

            <div className="hm-hero__trust">
              <div className="hm-trust__faces">
                {[32, 45, 22, 55].map((n) => (
                  <img
                    key={n}
                    src={`https://randomuser.me/api/portraits/men/${n}.jpg`}
                    alt=""
                    className="hm-trust__avatar"
                  />
                ))}
              </div>
              <div className="hm-trust__text">
                <div className="hm-trust__stars">★★★★★</div>
                <span>4.9/5 from 800+ reviews</span>
              </div>
            </div>
          </div>

          <div className="hm-hero__right">
            <div className="hm-hero__img-wrap">
              <img
                src={heroimage}
                alt="Eduaitor Dashboard"
                className="hm-hero__img"
              />
              {/* Floating Cards */}
              <div className="hm-float hm-float--tl">
                <div className="hm-float__icon">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#9333ea"
                    strokeWidth="2"
                  >
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                    <polyline points="17 6 23 6 23 12" />
                  </svg>
                </div>
                <div>
                  <div className="hm-float__val">₹ 48.2 Cr</div>
                  <div className="hm-float__label">
                    Fees collected this term
                  </div>
                </div>
              </div>
              <div className="hm-float hm-float--br">
                <div className="hm-float__icon hm-float__icon--green">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <div>
                  <div className="hm-float__val">94.3%</div>
                  <div className="hm-float__label">Avg. attendance today</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── LOGO STRIP ──────────────────────────── */}
      <div className="hm-logos">
        <p className="hm-logos__label">
          The top choice of <strong>1,100+</strong> institutions across India
        </p>
        <div className="hm-logos__slider">
          <div className="hm-logos__track">
            {logos.map((logo, i) => (
              <img key={i} src={logo} alt="" className="hm-logos__img" />
            ))}
          </div>
        </div>
      </div>

      {/* ── STATS ───────────────────────────────── */}
      <section className="hm-stats" ref={statsRef}>
        <div className="hm-stats__inner">
          {stats.map((s, i) => (
            <div
              className={`hm-stat ${statsVisible ? "hm-stat--show" : ""}`}
              key={i}
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <div className="hm-stat__num">
                {statsVisible && <Counter end={s.end} suffix={s.suffix} />}
              </div>
              <div className="hm-stat__label">{s.label}</div>
            </div>
          ))}
        </div>

        <p
          className={`hm-tagline ${taglineVisible ? "hm-tagline--show" : ""}`}
          ref={taglineRef}
        >
          <span>Everything</span> your institution needs — unified, intelligent,
          and ready to scale.
        </p>
      </section>

      {/* ── WHY US ──────────────────────────────── */}
      <section className="hm-why" ref={whyRef}>
        <div className="hm-why__header">
          <span className="hm-label"> Why Eduaitor? </span>
          <h2 className="hm-why__h2">Built different, for education.</h2>
          <p className="hm-why__sub">
            We didn't adapt a generic SaaS tool. We built Eduaitor from the
            ground up for the unique operational demands of schools and
            institutions.
          </p>
        </div>
        <div className="hm-why__grid">
          {whyUs.map((w, i) => (
            <div
              className={`hm-why__card ${whyVisible ? "hm-why__card--show" : ""}`}
              key={i}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="hm-why__card-icon">{w.icon}</div>
              <h3 className="hm-why__card-title">{w.title}</h3>
              <p className="hm-why__card-desc">{w.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SUB-SECTIONS ─────────────────────────── */}
      <ERPSection />
      <EcosystemSection />
      <TestimonialsSection />
      <AwardsSection />
    </div>
  );
}
