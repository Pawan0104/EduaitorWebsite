import React from "react";
import "./home-v2.css";

const stakeholders = [
  {
    color: "blue",
    title: "School Leadership",
    desc: "Make smarter strategic decisions with real-time insights, automation and actionable analytics.",
    checks: [
      "Real-time dashboards",
      "Data-driven decision making",
      "Institution-wide visibility",
    ],
    image: "/home/stakeholder-leadership.png?v=2",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    color: "green",
    title: "Administrators",
    desc: "Simplify daily operations, automate workflows and manage the school efficiently.",
    checks: ["Automated processes", "Centralized management", "Time and cost savings"],
    image: "/home/stakeholder-admin.png?v=2",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
      </svg>
    ),
  },
  {
    color: "purple",
    title: "Teachers",
    desc: "Reduce administrative workload and focus more on teaching, inspiring and mentoring.",
    checks: [
      "AI academic tools",
      "Easy lesson & assessment creation",
      "More time for what matters",
    ],
    image: "/home/stakeholder-teacher.png?v=2",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  {
    color: "orange",
    title: "Parents",
    desc: "Stay informed, engaged and empowered to support your child's learning journey.",
    checks: [
      "Real-time updates",
      "AI test creation & homework alerts",
      "Complete visibility in one app",
    ],
    image: "/home/stakeholder-parents.png?v=2",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    color: "teal",
    title: "Students",
    desc: "Learn better with personalized support, instant help and resources available anytime, anywhere.",
    checks: [
      "24x7 AI academic assistant",
      "Personalized learning",
      "Track progress & improve",
    ],
    image: "/home/stakeholder-student-school.png",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
  },
];

export default function StakeholdersSection() {
  return (
    <section className="hv-section hv-stakeholders" id="stakeholders">
      <div className="hv-container">
        <div className="hv-stakeholders__header">
          <span className="hv-badge">BUILT FOR EVERYONE WHO SHAPES EDUCATION</span>
          <h2 className="hv-stakeholders__title">
            Empowering Every Stakeholder.{" "}
            <span className="hv-accent">Strengthening Every Outcome.</span>
          </h2>
          <p className="hv-stakeholders__sub">
            EduAitor is designed for the entire school community—bringing everyone together to
            create a smarter, more connected and more successful learning environment.
          </p>
        </div>

        <div className="hv-stakeholders__grid">
          {stakeholders.map((s, i) => (
            <div className={`hv-stakeholders__card hv-stakeholders__card--${s.color}`} key={i}>
              <div className="hv-stakeholders__media">
                <img src={s.image} alt={s.title} className="hv-stakeholders__img" />
                <div className="hv-stakeholders__card-icon">{s.icon}</div>
              </div>
              <h3 className="hv-stakeholders__card-title">{s.title}</h3>
              <p className="hv-stakeholders__card-desc">{s.desc}</p>
              <ul className="hv-stakeholders__checks">
                {s.checks.map((c, j) => (
                  <li key={j}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="hv-stakeholders__bottom">
          <div className="hv-stakeholders__bottom-left">
            <div className="hv-stakeholders__bottom-icon" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                <path d="M12 14.5l1.2 1.2 2.3-2.4" />
              </svg>
            </div>
            <div className="hv-stakeholders__bottom-titles">
              <strong>One Community.</strong>
              <strong className="hv-accent">One Goal.</strong>
            </div>
          </div>
          <div className="hv-stakeholders__bottom-divider" aria-hidden="true" />
          <p className="hv-stakeholders__bottom-quote">
            When every stakeholder is empowered, every student achieves more.
          </p>
          <img
            src="/home/community-network-full.svg"
            alt=""
            className="hv-stakeholders__deco"
            aria-hidden="true"
          />
        </div>

        <p className="hv-stakeholders__tagline">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="M9 12l2 2 4-4" />
          </svg>
          One Platform. Every Stakeholder. Infinite Impact.
        </p>
      </div>
    </section>
  );
}
