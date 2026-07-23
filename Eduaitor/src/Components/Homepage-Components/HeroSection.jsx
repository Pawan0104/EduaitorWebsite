import React from "react";
import { Link } from "react-router-dom";
import {
  FaMicrochip,
  FaLayerGroup,
  FaMobileAlt,
  FaShieldAlt,
  FaGlobe,
  FaCloud,
  FaServer,
  FaChartBar,
  FaUsers,
  FaBookOpen,
  FaRobot,
} from "react-icons/fa";
import "./home-v2.css";
import "./HeroSection.css";

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

const floatCards = [
  {
    key: "assessment",
    className: "hv-float hv-float--assessment",
    iconClass: "hv-float__icon hv-float__icon--purple",
    icon: <FaRobot />,
    title: "AI Assessment Generator",
    desc: "Create tests in seconds.",
  },
  {
    key: "attendance",
    className: "hv-float hv-float--attendance",
    title: "Attendance",
    big: "98%",
    desc: "Present Today",
    bar: true,
  },
  {
    key: "analytics",
    className: "hv-float hv-float--analytics",
    iconClass: "hv-float__icon hv-float__icon--blue",
    icon: <FaChartBar />,
    title: "Analytics & Insights",
    desc: "Data that drives better decisions.",
  },
  {
    key: "parent",
    className: "hv-float hv-float--parent",
    iconClass: "hv-float__icon hv-float__icon--orange",
    icon: <FaUsers />,
    title: "Parent App",
    desc: "Stay connected and informed.",
  },
  {
    key: "assistant",
    className: "hv-float hv-float--assistant",
    iconClass: "hv-float__icon hv-float__icon--sky",
    icon: <FaBookOpen />,
    title: "AI Academic Assistant",
    desc: "24x7 academic support.",
  },
];

function OrbitRings() {
  return (
    <svg className="hv-orbit" viewBox="0 0 560 560" aria-hidden="true">
      <circle cx="290" cy="270" r="120" fill="none" stroke="#93c5fd" strokeWidth="1.2" strokeDasharray="3 7" opacity="0.55" />
      <circle cx="290" cy="270" r="170" fill="none" stroke="#93c5fd" strokeWidth="1.2" strokeDasharray="3 8" opacity="0.45" />
      <circle cx="290" cy="270" r="220" fill="none" stroke="#93c5fd" strokeWidth="1.2" strokeDasharray="2 9" opacity="0.35" />
      {[
        [290, 150], [410, 270], [290, 390], [170, 270],
        [380, 170], [380, 370], [200, 170], [200, 370],
        [460, 240], [120, 300],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3.5" fill="#60a5fa" opacity="0.7" />
      ))}
    </svg>
  );
}

export default function HeroSection() {
  return (
    <section className="hv-section hv-hero">
      <div className="hv-container">
        <div className="hv-hero__grid">
          <div className="hv-hero__copy">
            <h1 className="hv-hero__title">
              <span className="hv-accent">Smarter</span> Schools.
              <br />
              <span className="hv-accent">Stronger</span> Students.
            </h1>
            <p className="hv-hero__subtitle">
              The <span className="hv-accent">AI-Powered</span> School Operating System for
              Future-Ready Schools
            </p>
            <p className="hv-hero__body">
              EduAitor brings school management, academic excellence, artificial intelligence,
              parent engagement, and student success together on one intelligent
              platform—empowering schools to operate smarter, teach better, and deliver
              stronger educational outcomes.
            </p>
            <div className="hv-hero__actions">
              <Link to="/bookademo" className="hv-btn hv-btn--primary">
                Book a Demo
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link to="/ecosystem" className="hv-btn hv-btn--outline">
                Explore the Ecosystem
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          <div className="hv-hero__stage">
            <OrbitRings />
            <img
              src="/home/hero-girl-cut.png"
              alt="Student using EduAitor"
              className="hv-hero__girl"
              draggable="false"
            />

            {floatCards.map((card) => (
              <div className={card.className} key={card.key}>
                {card.icon && <div className={card.iconClass}>{card.icon}</div>}
                <div className="hv-float__body">
                  <div className="hv-float__title">{card.title}</div>
                  {card.big ? (
                    <>
                      <div className="hv-float__big">{card.big}</div>
                      <div className="hv-float__desc">{card.desc}</div>
                      {card.bar && <div className="hv-float__bar" aria-hidden="true" />}
                    </>
                  ) : (
                    <div className="hv-float__desc">{card.desc}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="hv-hero__feature-card">
          {featureBar.map((item, i) => {
            const Icon = item.icon;
            return (
              <React.Fragment key={item.label}>
                {i > 0 && <span className="hv-hero__feature-sep" aria-hidden="true" />}
                <div className="hv-hero__feature-item">
                  <span className="hv-hero__feature-icon">
                    <Icon />
                  </span>
                  <span>{item.label}</span>
                </div>
              </React.Fragment>
            );
          })}
        </div>

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
