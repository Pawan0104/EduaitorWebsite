import React from "react";
import "./home-v2.css";

const IconDoc = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6M8 13h8M8 17h5" />
  </svg>
);
const IconUsers = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const IconBook = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);
const IconNodes = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" />
  </svg>
);

const floatingPills = [
  { color: "red", text: "Increasing Administrative Complexity", icon: IconDoc },
  { color: "purple", text: "Teachers Overwhelmed with Repetitive Tasks", icon: IconUsers },
  { color: "green", text: "Parents Want to Be Involved but Lack the Right Tools", icon: IconUsers },
  { color: "orange", text: "Students Need Personalized Learning Experiences", icon: IconBook },
  { color: "blue", text: "Disconnected Systems Create Disconnected Outcomes", icon: IconNodes },
];

const bottomCards = [
  {
    color: "red",
    title: "Too Much Time on Administration",
    desc: "Manual processes and paperwork consume time that should be spent on students.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
  },
  {
    color: "purple",
    title: "Data Without Direction",
    desc: "Reports are generated but insights are missing. Decisions are delayed.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
        <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3" />
      </svg>
    ),
  },
  {
    color: "green",
    title: "Multiple Tools, Zero Integration",
    desc: "Different systems for different needs—leading to duplication, errors and frustration.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M20.5 11H19V7a2 2 0 0 0-2-2h-4V3.5a2.5 2.5 0 0 0-5 0V5H4a2 2 0 0 0-2 2v3.8h1.5a2.7 2.7 0 0 1 0 5.4H2V20a2 2 0 0 0 2 2h3.8v-1.5a2.7 2.7 0 0 1 5.4 0V22H17a2 2 0 0 0 2-2v-4h1.5a2.5 2.5 0 0 0 0-5z" />
      </svg>
    ),
  },
  {
    color: "orange",
    title: "Limited Parent Engagement",
    desc: "Communication gaps keep parents disconnected from their child's learning journey.",
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
    title: "No Visibility into Student Potential",
    desc: "Difficult to identify challenges early and provide the right support at the right time.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
];

export default function ChallengeSection() {
  return (
    <section className="hv-section hv-challenge">
      <div className="hv-container">
        <div className="hv-challenge__top">
          <div className="hv-challenge__content">
            <span className="hv-label">THE CHALLENGE</span>
            <h2 className="hv-challenge__title">
              Education is Changing.
              <br />
              <span className="hv-accent">Schools Must Change Too.</span>
            </h2>
            <p className="hv-challenge__body">
              Schools today face more complexity than ever before. Administrative burdens,
              disconnected systems, and data without insights are taking time away from what
              truly matters—teaching, learning and student success.
            </p>
            <div className="hv-challenge__callout">
              <div className="hv-challenge__callout-icon" aria-hidden="true">
                !
              </div>
              <p>
                Managing these challenges with disconnected software and manual processes is no
                longer enough.{" "}
                <strong>
                  Schools deserve better. They deserve an intelligent ecosystem.
                </strong>
              </p>
            </div>
          </div>

          <div className="hv-challenge__visual">
            <div className="hv-challenge__photo">
              <img
                src="/home/challenge-man.png"
                alt="School administrator facing operational challenges"
                className="hv-challenge__img"
              />
            </div>

            <svg className="hv-challenge__lines" viewBox="0 0 560 480" aria-hidden="true">
              <line x1="120" y1="70" x2="240" y2="180" />
              <line x1="110" y1="230" x2="230" y2="230" />
              <line x1="440" y1="70" x2="330" y2="170" />
              <line x1="450" y1="230" x2="340" y2="230" />
              <line x1="430" y1="390" x2="330" y2="300" />
            </svg>

            <div className="hv-challenge__pills">
              {floatingPills.map((pill, i) => (
                <div
                  className={`hv-challenge__pill hv-challenge__pill--${pill.color}`}
                  key={i}
                >
                  <span className="hv-challenge__pill-icon">{pill.icon}</span>
                  <span>{pill.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="hv-challenge__cards">
          {bottomCards.map((card, i) => (
            <div className={`hv-challenge__card hv-challenge__card--${card.color}`} key={i}>
              <div className="hv-challenge__card-icon">{card.icon}</div>
              <h3 className="hv-challenge__card-title">{card.title}</h3>
              <p className="hv-challenge__card-desc">{card.desc}</p>
            </div>
          ))}
        </div>

        <div className="hv-challenge__footer">
          <span className="hv-challenge__footer-dots" aria-hidden="true" />
          <p>
            It's time for a smarter way to run schools.{" "}
            <span className="hv-accent">It's time for EduAitor.</span>
          </p>
          <span className="hv-challenge__footer-dots" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
