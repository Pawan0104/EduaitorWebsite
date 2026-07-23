import React from "react";
import {
  FaClock,
  FaLayerGroup,
  FaRobot,
  FaMobileAlt,
  FaChartLine,
  FaSchool,
  FaShieldAlt,
} from "react-icons/fa";
import "./home-v2.css";

const impactCards = [
  {
    color: "green",
    title: "90% Less Time",
    subtitle: "Creating worksheets, assessments and question papers with AI.",
    body: "Teachers save hours every week and focus more on teaching, not paperwork.",
    icon: FaClock,
  },
  {
    color: "blue",
    title: "One Unified Platform",
    subtitle: "Administration, academics, AI, communication, finance, transport, analytics and more.",
    body: "Replace multiple disconnected systems with one intelligent, integrated ecosystem.",
    icon: FaLayerGroup,
  },
  {
    color: "purple",
    title: "24x7 AI Academic Support",
    subtitle: "Every student receives personalized learning assistance anytime, anywhere.",
    body: "Doubt solving, explanations, summaries and recommendations—always on.",
    icon: FaRobot,
  },
  {
    color: "orange",
    title: "Real-Time Parent Engagement",
    subtitle: "Homework, attendance, assessments and communication—all in one app.",
    body: "Parents stay informed, involved and empowered to support their child better.",
    icon: FaMobileAlt,
  },
  {
    color: "teal",
    title: "Smarter Decision Making",
    subtitle: "AI-powered insights and predictive analytics for school leadership.",
    body: "Identify trends, detect learning gaps and make data-driven decisions with confidence.",
    icon: FaChartLine,
  },
  {
    color: "pink",
    title: "Built for Every School",
    subtitle: "From independent schools to multi-campus institutions.",
    body: "Scalable, secure and future-ready for schools of all sizes.",
    icon: FaSchool,
  },
];

export default function RealImpactSection() {
  return (
    <section className="hv-section hv-impact">
      <div className="hv-impact__dots hv-impact__dots--tr" aria-hidden="true" />
      <div className="hv-impact__dots hv-impact__dots--bl" aria-hidden="true" />
      <div className="hv-container">
        <div className="hv-impact__header">
          <span className="hv-badge hv-badge--solid">REAL IMPACT. REAL RESULTS.</span>
          <h2 className="hv-impact__title">
            Transforming Schools. Delivering{" "}
            <span className="hv-accent hv-accent--underline">Outcomes.</span>
          </h2>
          <p className="hv-impact__sub">
            EduAitor helps schools simplify operations, empower educators, engage parents and
            support students—driving measurable improvement every single day.
          </p>
        </div>

        <div className="hv-impact__grid">
          {impactCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <div className={`hv-impact__card hv-impact__card--${card.color}`} key={i}>
                <div className="hv-impact__card-icon">
                  <Icon />
                </div>
                <div className="hv-impact__card-content">
                  <h3 className="hv-impact__card-title">{card.title}</h3>
                  <p className="hv-impact__card-sub">{card.subtitle}</p>
                  <p className="hv-impact__card-body">{card.body}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="hv-impact__banner">
          <div className="hv-impact__banner-left">
            <div className="hv-impact__banner-icon">
              <FaShieldAlt />
            </div>
            <p className="hv-impact__banner-goal">
              One Goal. Better Education Outcomes for Every Student.
            </p>
          </div>
          <div className="hv-impact__banner-divider" aria-hidden="true" />
          <p className="hv-impact__banner-text">
            EduAitor turns everyday data into meaningful action—so schools can focus on what
            matters most:{" "}
            <strong className="hv-impact__banner-strong">
              Teaching better. Learning better. Achieving more.
            </strong>
          </p>
        </div>
      </div>
    </section>
  );
}
