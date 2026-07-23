import React from "react";
import "./home-v2.css";

const features = [
  {
    color: "purple",
    title: "One Platform",
    desc: "Everything Connected.",
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
    color: "blue",
    title: "AI-Powered",
    desc: "Intelligence that makes a difference.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M9 9h.01M15 9h.01M9 15h6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
  },
  {
    color: "green",
    title: "Secure & Reliable",
    desc: "Enterprise-grade security you can trust.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    color: "orange",
    title: "Mobile First",
    desc: "Powerful apps for every stakeholder.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <path d="M12 18h.01" />
      </svg>
    ),
  },
  {
    color: "teal",
    title: "Future Ready",
    desc: "Scalable, flexible and built to grow with you.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
      </svg>
    ),
  },
];

const sidebarItems = [
  "Dashboard",
  "Students",
  "Attendance",
  "Academics",
  "AI Suite",
  "Parents",
  "Finance",
  "Transport",
  "Library",
  "Reports & Analytics",
  "Settings",
];

const kpis = [
  { label: "Total Students", value: "1,245", delta: "+8.5%" },
  { label: "Attendance Today", value: "98%", delta: "+5.2%" },
  { label: "Homework Submitted", value: "92%", delta: "+6.1%" },
  { label: "Fees Collection", value: "95%", delta: "+7.3%" },
];

const activities = [
  { title: "AI Worksheet Generated", meta: "Class 8A · 2m ago" },
  { title: "Homework Assigned", meta: "Science · 15m ago" },
  { title: "Fee Payment Received", meta: "₹12,500 · 1h ago" },
];

const mobileApps = ["Attendance", "Homework", "Results", "Messages", "Fees", "AI Tests"];

const schedule = [
  { subject: "Maths", time: "8:00 AM" },
  { subject: "Science", time: "8:45 AM" },
  { subject: "English", time: "9:45 AM" },
];

export default function SolutionSection() {
  return (
    <section className="hv-section hv-solution">
      <div className="hv-container">
        <div className="hv-solution__top">
          <div className="hv-solution__content">
            <span className="hv-badge hv-badge--solid">THE SOLUTION</span>
            <h2 className="hv-solution__title">Meet EduAitor</h2>
            <p className="hv-solution__subtitle">The AI-Powered School Operating System</p>
            <p className="hv-solution__body">
              EduAitor transforms school management into school intelligence. By combining
              administration, academics, AI, parent engagement and student success into one
              intelligent ecosystem, EduAitor enables schools to spend less time managing
              processes and more time nurturing potential.
            </p>
            <div className="hv-solution__info">
              <div className="hv-solution__info-icon" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z" />
                  <path d="M9 21h6" />
                  <circle cx="12" cy="9" r="2" />
                </svg>
              </div>
              <p>
                <strong>Intelligence at the core.</strong> AI that simplifies operations,
                enhances teaching, personalizes learning and drives better outcomes.
              </p>
            </div>
          </div>

          <div className="hv-solution__visual">
            <div className="hv-solution__devices">
              {/* Laptop */}
              <div className="hv-laptop">
                <div className="hv-laptop__screen">
                  <aside className="hv-dash__side">
                    <div className="hv-dash__brand">Bright Future School</div>
                    <ul>
                      {sidebarItems.map((item, i) => (
                        <li key={item} className={i === 0 ? "is-active" : ""}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </aside>
                  <div className="hv-dash__main">
                    <header className="hv-dash__top">
                      <strong>EduAitor</strong>
                      <span className="hv-dash__search">Search...</span>
                      <span className="hv-dash__avatar" />
                    </header>
                    <div className="hv-dash__kpis">
                      {kpis.map((k) => (
                        <div className="hv-dash__kpi" key={k.label}>
                          <span>{k.label}</span>
                          <strong>{k.value}</strong>
                          <em>{k.delta}</em>
                        </div>
                      ))}
                    </div>
                    <div className="hv-dash__panels">
                      <div className="hv-dash__chart">
                        <div className="hv-dash__chart-title">Academic Performance Overview</div>
                        <svg viewBox="0 0 220 90" aria-hidden="true">
                          <polyline
                            fill="none"
                            stroke="#2563eb"
                            strokeWidth="2.5"
                            points="10,70 45,58 80,62 115,40 150,35 185,20 210,28"
                          />
                          <circle cx="150" cy="35" r="4" fill="#2563eb" />
                          <text x="156" y="28" fontSize="8" fill="#2563eb">May 82%</text>
                        </svg>
                      </div>
                      <div className="hv-dash__activity">
                        <div className="hv-dash__chart-title">Recent Activities</div>
                        {activities.map((a) => (
                          <div className="hv-dash__activity-item" key={a.title}>
                            <strong>{a.title}</strong>
                            <span>{a.meta}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="hv-laptop__base" />
              </div>

              {/* Phone */}
              <div className="hv-phone">
                <div className="hv-phone__notch" />
                <div className="hv-phone__header">
                  <strong>EduAitor</strong>
                </div>
                <div className="hv-phone__body">
                  <p className="hv-phone__hello">
                    Hello, Priya Sharma
                    <span>Parent of Aarav Sharma</span>
                  </p>
                  <div className="hv-phone__grid">
                    {mobileApps.map((app) => (
                      <div key={app}>
                        <span />
                        {app}
                      </div>
                    ))}
                  </div>
                  <div className="hv-phone__schedule">
                    <strong>Today's Schedule</strong>
                    {schedule.map((s) => (
                      <div key={s.subject}>
                        <em>{s.subject}</em>
                        <span>{s.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="hv-phone__nav">
                  <span className="is-active" />
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hv-solution__features">
          {features.map((f, i) => (
            <div className={`hv-solution__feature hv-solution__feature--${f.color}`} key={i}>
              <div className="hv-solution__feature-icon">{f.icon}</div>
              <h3 className="hv-solution__feature-title">{f.title}</h3>
              <p className="hv-solution__feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="hv-solution__banner">
          <div className="hv-solution__banner-left">
            <div className="hv-solution__banner-icon" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </div>
            <span className="hv-solution__banner-label">Our Promise</span>
          </div>
          <div className="hv-solution__banner-divider" aria-hidden="true" />
          <p className="hv-solution__banner-text">
            We don't just automate schools. We empower educators, engage parents and support
            students to achieve more.
          </p>
          <span className="hv-solution__banner-dots" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
