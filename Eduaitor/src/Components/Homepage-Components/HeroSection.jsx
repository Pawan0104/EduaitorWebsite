import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaMicrochip,
  FaLayerGroup,
  FaMobileAlt,
  FaShieldAlt,
  FaGlobe,
  FaCloud,
  FaServer,
  FaSearch,
  FaBell,
  FaGraduationCap,
  FaRupeeSign,
  FaClipboardCheck,
  FaChartLine,
  FaUserFriends,
  FaRobot,
  FaArrowUp,
} from "react-icons/fa";
import "./home-v2.css";
import "./HeroSection.css";
import { useContactPopup } from "../ContactPopup";

const featureBar = [
  { label: "AI-Powered School OS", icon: FaMicrochip },
  { label: "One Platform. Every Feature.", icon: FaLayerGroup },
  { label: "Mobile Apps Included", icon: FaMobileAlt },
  { label: "Enterprise Security", icon: FaShieldAlt },
  { label: "Scalable for Every School", icon: FaGlobe },
];

const boards = ["CBSE", "ICSE", "State Boards", "Cambridge", "IB"];
const deploy = [
  { label: "Cloud", icon: FaCloud },
  { label: "SaaS", icon: FaCloud },
  { label: "On-Premise", icon: FaServer },
];

const navItems = [
  { icon: FaChartLine, label: "Dashboard", active: true },
  { icon: FaUserFriends, label: "Students" },
  { icon: FaClipboardCheck, label: "Attendance" },
  { icon: FaRupeeSign, label: "Fees" },
  { icon: FaGraduationCap, label: "Academics" },
  { icon: FaRobot, label: "AI Studio" },
];

const kpis = [
  { key: "students", label: "Students", value: 1248, icon: FaUserFriends, tone: "blue", delta: "+2.4%", format: (v) => Math.round(v).toLocaleString("en-IN") },
  { key: "attendance", label: "Attendance Today", value: 96.4, icon: FaClipboardCheck, tone: "green", delta: "+1.2%", format: (v) => `${v.toFixed(1)}%` },
  { key: "fees", label: "Fees Collected", value: 18.6, icon: FaRupeeSign, tone: "orange", delta: "+8.1%", format: (v) => `₹${v.toFixed(1)}L` },
  { key: "score", label: "Avg. Score", value: 82, icon: FaChartLine, tone: "violet", delta: "+3.0%", format: (v) => `${Math.round(v)}%` },
];

const bars = [
  { label: "Math", h: 78 },
  { label: "Sci", h: 88 },
  { label: "Eng", h: 70 },
  { label: "Soc", h: 62 },
  { label: "CS", h: 92 },
  { label: "Art", h: 55 },
];

function CountUp({ value, format, start, delay = 0 }) {
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const [display, setDisplay] = useState(reduced ? value : 0);

  useEffect(() => {
    if (!start || reduced) return undefined;
    let raf = 0;
    let t0 = 0;
    const duration = 1200;
    const tick = (now) => {
      if (!t0) t0 = now;
      const p = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(value * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    const starter = setTimeout(() => {
      raf = requestAnimationFrame(tick);
    }, delay);
    return () => {
      clearTimeout(starter);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [start, reduced, value, delay]);

  return <>{format(display)}</>;
}

export default function HeroSection() {
  const { openContactPopup } = useContactPopup();
  const [show, setShow] = useState(
    () => typeof IntersectionObserver === "undefined"
  );
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return undefined;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === "undefined") return undefined;
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia?.("(hover: hover) and (pointer: fine)").matches;
    if (reduced || !fine) return undefined;

    let raf = 0;
    const onMove = (e) => {
      if (raf) return;
      const r = el.getBoundingClientRect();
      const px = ((e.clientX - r.left) / r.width - 0.5) * 2;
      const py = ((e.clientY - r.top) / r.height - 0.5) * 2;
      raf = requestAnimationFrame(() => {
        raf = 0;
        el.style.setProperty("--hro-px", px.toFixed(3));
        el.style.setProperty("--hro-py", py.toFixed(3));
      });
    };
    const onLeave = () => {
      el.style.setProperty("--hro-px", "0");
      el.style.setProperty("--hro-py", "0");
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      className={`hv-section hv-hero ${show ? "hro--show" : ""}`}
      ref={ref}
    >
      <div className="hro-bg" aria-hidden="true">
        <span className="hro-bg__glow hro-bg__glow--blue" />
        <span className="hro-bg__glow hro-bg__glow--soft" />
        <span className="hro-bg__dots" />
      </div>

      <div className="hv-container">
        <div className="hro-grid">
          {/* ── Left: content ── */}
          <div className="hro-copy">
            <span className="hro-eyebrow">
              <span className="hro-eyebrow__dot" aria-hidden="true" />
              AI-Powered School Operating System
            </span>

            <h1 className="hro-title">
              <span className="hv-accent">Smarter</span> Schools.
              <br />
              <span className="hv-accent">Stronger</span> Students.
            </h1>

            <p className="hro-subtitle">
              The <span className="hv-accent">AI-Powered</span> School Operating System for
              Future-Ready Schools
            </p>

            <p className="hro-body">
              EduAitor brings school management, academic excellence, artificial intelligence,
              parent engagement, and student success together on one intelligent platform.
            </p>

            <div className="hro-actions">
              <button
                type="button"
                className="hv-btn hv-btn--primary"
                onClick={() => openContactPopup("home-hero-book-demo")}
              >
                Book a Demo
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
              <Link to="/ecosystem" className="hv-btn hv-btn--outline">
                Explore the Ecosystem
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <ul className="hro-trust">
              {featureBar.map((item) => {
                const Icon = item.icon;
                return (
                  <li className="hro-trust__item" key={item.label}>
                    <span className="hro-trust__icon">
                      <Icon aria-hidden />
                    </span>
                    {item.label}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* ── Right: interactive product visualization ── */}
          <div
            className="hro-stage"
            role="img"
            aria-label="Preview of the EduAitor school dashboard showing attendance, class performance analytics, AI assessment, parent communication and an AI assistant"
          >
            <div className="hro-scene">
              {/* Central ERP dashboard */}
              <div className="hro-dash">
                <div className="hro-dash__chrome" aria-hidden="true">
                  <span className="hro-dash__dot hro-dash__dot--r" />
                  <span className="hro-dash__dot hro-dash__dot--y" />
                  <span className="hro-dash__dot hro-dash__dot--g" />
                  <span className="hro-dash__addr">app.eduaitor.com/dashboard</span>
                  <span className="hro-dash__demo">Illustrative</span>
                </div>

                <div className="hro-dash__body">
                  <div className="hro-sidebar" aria-hidden="true">
                    <span className="hro-sidebar__brand">E</span>
                    {navItems.map((n) => {
                      const Icon = n.icon;
                      return (
                        <span
                          key={n.label}
                          className={`hro-sidebar__item ${n.active ? "is-active" : ""}`}
                        >
                          <Icon />
                        </span>
                      );
                    })}
                  </div>

                  <div className="hro-main">
                    <div className="hro-main__head">
                      <div>
                        <p className="hro-main__title">Dashboard</p>
                        <p className="hro-main__sub">Academic overview · Today</p>
                      </div>
                      <div className="hro-main__tools">
                        <span className="hro-search">
                          <FaSearch aria-hidden />
                          <em>Search</em>
                        </span>
                        <span className="hro-bell">
                          <FaBell aria-hidden />
                          <span className="hro-bell__dot" />
                        </span>
                        <span className="hro-avatar">A</span>
                      </div>
                    </div>

                    <div className="hro-kpis">
                      {kpis.map((k, i) => {
                        const Icon = k.icon;
                        return (
                          <div className={`hro-kpi hro-kpi--${k.tone}`} key={k.key}>
                            <span className="hro-kpi__icon">
                              <Icon aria-hidden />
                            </span>
                            <span className="hro-kpi__value">
                              <CountUp value={k.value} format={k.format} start={show} delay={240 + i * 90} />
                            </span>
                            <span className="hro-kpi__label">{k.label}</span>
                            <span className="hro-kpi__delta">
                              <FaArrowUp aria-hidden />
                              {k.delta}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    <div className="hro-panels">
                      <div className="hro-chart">
                        <div className="hro-panel__head">
                          <span>Class Performance</span>
                          <em>Avg. by subject</em>
                        </div>
                        <div className="hro-bars">
                          {bars.map((b, i) => (
                            <span className="hro-bars__col" key={b.label}>
                              <span
                                className="hro-bars__bar"
                                style={{ "--h": `${b.h}%`, "--i": i }}
                              />
                              <span className="hro-bars__label">{b.label}</span>
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="hro-donut">
                        <div className="hro-panel__head">
                          <span>Attendance</span>
                          <em>Present today</em>
                        </div>
                        <div className="hro-donut__ring">
                          <svg viewBox="0 0 120 120" aria-hidden="true">
                            <circle className="hro-ring__track" cx="60" cy="60" r="52" />
                            <circle className="hro-ring__val" cx="60" cy="60" r="52" />
                          </svg>
                          <span className="hro-donut__center">
                            <strong>
                              <CountUp value={96} format={(v) => `${Math.round(v)}%`} start={show} delay={320} />
                            </strong>
                            <em>present</em>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Connections between dashboard and floating cards */}
              <svg className="hro-links" viewBox="0 0 640 460" preserveAspectRatio="none" aria-hidden="true">
                <path className="hro-links__path" d="M150 150 C 250 120, 300 130, 372 168" />
                <path className="hro-links__path" d="M132 300 C 230 320, 280 300, 360 300" />
                <path className="hro-links__path" d="M470 330 C 500 300, 520 300, 560 316" />
                <circle className="hro-links__node" cx="150" cy="150" r="4" />
                <circle className="hro-links__node" cx="372" cy="168" r="4" />
                <circle className="hro-links__node" cx="360" cy="300" r="4" />
              </svg>

              {/* Floating feature cards */}
              <div className="hro-float hro-float--assess">
                <div className="hro-card">
                  <span className="hro-card__icon hro-card__icon--violet">
                    <FaRobot aria-hidden />
                  </span>
                  <span className="hro-card__body">
                    <strong>AI Assessment Generator</strong>
                    <em>20-question test drafted</em>
                    <span className="hro-card__chip">Ready</span>
                  </span>
                </div>
              </div>

              <div className="hro-float hro-float--parent">
                <div className="hro-card">
                  <span className="hro-card__icon hro-card__icon--orange">
                    <FaBell aria-hidden />
                    <span className="hro-card__ping" />
                  </span>
                  <span className="hro-card__body">
                    <strong>Fee Reminder Sent</strong>
                    <em>Delivered to 42 parents</em>
                    <span className="hro-card__time">2m ago</span>
                  </span>
                </div>
              </div>

              <div className="hro-float hro-float--assistant">
                <div className="hro-card hro-card--assistant">
                  <span className="hro-card__icon hro-card__icon--sky">
                    <FaRobot aria-hidden />
                  </span>
                  <span className="hro-card__body">
                    <strong>AI Academic Assistant</strong>
                    <span className="hro-assistant__line">
                      Drafting tomorrow’s lesson plan
                      <span className="hro-assistant__text"> for Class 8 Science…</span>
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Support strip */}
        <div className="hv-hero__support-inner">
          <div className="hv-hero__support-group">
            <span className="hv-hero__support-label">Supports</span>
            {boards.map((b) => (
              <span className="hv-hero__support-pill" key={b}>
                {b}
              </span>
            ))}
          </div>
          <span className="hv-hero__support-divider" aria-hidden="true" />
          <div className="hv-hero__support-group">
            {deploy.map((d) => {
              const Icon = d.icon;
              return (
                <span className="hv-hero__support-deploy" key={d.label}>
                  <Icon className="hv-hero__support-deploy-icon" aria-hidden />
                  {d.label}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
