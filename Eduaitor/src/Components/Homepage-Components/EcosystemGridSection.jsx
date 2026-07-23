import React from "react";
import { Link } from "react-router-dom";
import "./home-v2.css";

const modules = [
  {
    color: "purple",
    title: "School Administration",
    desc: "Manage students, staff, attendance, timetables, leaves and daily operations seamlessly.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" />
      </svg>
    ),
  },
  {
    color: "green",
    title: "Academic Management",
    desc: "Homework, assignments, exams, report cards and academic workflows—simplified.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
  },
  {
    color: "purple",
    title: "AI Assessment Generator",
    desc: "Create worksheets, tests, question papers and quizzes in seconds with AI.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6M9 15l2 2 4-4" />
      </svg>
    ),
  },
  {
    color: "blue",
    title: "AI Academic Assistant",
    desc: "24x7 AI tutor for explanations, summaries, doubt solving and learning recommendations.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="M9 9h.01M15 9h.01M9 15h6" />
      </svg>
    ),
  },
  {
    color: "orange",
    title: "Parent Empowerment",
    desc: "Real-time updates, AI test creation, homework alerts and complete visibility—all in one app.",
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
    title: "Student Success Platform",
    desc: "Personalized learning, improvement plans and goal tracking for every learner.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
  },
  {
    color: "pink",
    title: "Predictive Performance Analytics",
    desc: "AI predicts performance, identifies risks and recommends proactive interventions.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
  },
  {
    color: "blue",
    title: "Communication Suite",
    desc: "Smart announcements, group messages, SMS, email and WhatsApp integration.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    color: "orange",
    title: "School Commerce",
    desc: "Manage uniform, books, stationery, fees, events and other school purchases.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>
    ),
  },
  {
    color: "green",
    title: "Finance & Fee Management",
    desc: "Fee collection, invoicing, discounts, dues, receipts and financial accounting.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M12 8v8M8 12h8" />
      </svg>
    ),
  },
  {
    color: "purple",
    title: "Transport Management",
    desc: "Real-time GPS tracking, route management, attendance on boarding and safety alerts.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="1" y="3" width="15" height="13" rx="2" />
        <path d="M16 8h4l3 3v5h-7V8z" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  },
  {
    color: "teal",
    title: "Library Management",
    desc: "Cataloging, issue/return, digital library, member management and fines.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    ),
  },
  {
    color: "orange",
    title: "Hostel Management",
    desc: "Room allocation, mess management, attendance, leave tracking and more.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    color: "blue",
    title: "Integrations & APIs",
    desc: "Seamless integration with third-party apps, devices and government platforms.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    ),
  },
  {
    color: "purple",
    title: "Analytics & Decision Intelligence",
    desc: "Real-time dashboards, custom reports and data-driven insights for smarter decisions.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
        <path d="M22 12A10 10 0 0 0 12 2v10z" />
      </svg>
    ),
  },
];

export default function EcosystemGridSection() {
  return (
    <section className="hv-section hv-ecosystem" id="ecosystem">
      <div className="hv-container">
        <div className="hv-ecosystem__header">
          <span className="hv-badge">OUR ECOSYSTEM</span>
          <h2 className="hv-ecosystem__title">
            One Intelligent{" "}
            <span className="hv-accent hv-accent--underline">Ecosystem.</span> Endless Possibilities.
          </h2>
          <p className="hv-ecosystem__sub">
            Everything your school needs—administration, academics, AI, communication, finance,
            and more—working together on one intelligent platform.
          </p>
        </div>

        <div className="hv-ecosystem__grid">
          {modules.map((mod, i) => (
            <div className={`hv-ecosystem__card hv-ecosystem__card--${mod.color}`} key={i}>
              <div className="hv-ecosystem__card-icon">{mod.icon}</div>
              <h3 className="hv-ecosystem__card-title">{mod.title}</h3>
              <p className="hv-ecosystem__card-desc">{mod.desc}</p>
            </div>
          ))}
        </div>

        <div className="hv-ecosystem__footer">
          <Link to="/ecosystem" className="hv-btn hv-btn--primary hv-btn--lg">
            Explore the Entire Ecosystem
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
          <p className="hv-ecosystem__tagline">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="M9 12l2 2 4-4" />
            </svg>
            One Platform. Every Feature. Unlimited Possibilities.
          </p>
        </div>
      </div>
    </section>
  );
}
