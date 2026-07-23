import React from "react";
import { Link } from "react-router-dom";
import { Icons } from "../Components/icons";
import "./WhyEduAitorPage.css";

/* Local stroke-icon helper + extra icons not present in the shared set */
const Icon = ({ children, size = 22 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
);

const I = {
  compass: (
    <Icon>
      <circle cx="12" cy="12" r="9" />
      <path d="M14.5 9.5 10 10l-.5 4.5 4.5-.5.5-4.5z" />
    </Icon>
  ),
  gear: (
    <Icon>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
    </Icon>
  ),
  database: (
    <Icon>
      <ellipse cx="12" cy="5" rx="8" ry="3" />
      <path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5" />
      <path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />
    </Icon>
  ),
  folder: (
    <Icon>
      <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" />
    </Icon>
  ),
  alertTriangle: (
    <Icon>
      <path d="M12 3 2 20h20L12 3z" />
      <path d="M12 10v4M12 17h.01" />
    </Icon>
  ),
  monitor: (
    <Icon>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20h8M12 16v4" />
    </Icon>
  ),
  brain: (
    <Icon>
      <path d="M9 3a3 3 0 0 0-3 3v1a3 3 0 0 0 0 6v1a3 3 0 0 0 6 0V4a3 3 0 0 0-3-1z" />
      <path d="M15 3a3 3 0 0 1 3 3v1a3 3 0 0 1 0 6v1a3 3 0 0 1-6 0V4a3 3 0 0 1 3-1z" />
    </Icon>
  ),
  target: (
    <Icon>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.3" fill="currentColor" stroke="none" />
    </Icon>
  ),
  twoBuildings: (
    <Icon>
      <path d="M3 21V9l5-3v15M3 21h9M12 21V4l7 3v14M12 21h9" />
    </Icon>
  ),
  cloud: (
    <Icon>
      <path d="M17 17H8a4 4 0 1 1 1-7.8A5 5 0 0 1 19 12a3 3 0 0 1-2 5z" />
    </Icon>
  ),
  handshake: (
    <Icon>
      <path d="M11 17l-2 2a2.8 2.8 0 0 1-4-4l2-2" />
      <path d="M13 7l2-2a2.8 2.8 0 0 1 4 4l-2 2" />
      <path d="M8 12l4-4 4 4-4 4z" />
    </Icon>
  ),
};

/* ── Content data ─────────────────────────────────────────── */

const heroTrust = [
  {
    icon: Icons.ai,
    title: "AI-Powered Intelligence",
    desc: "Smarter decisions, better outcomes.",
  },
  {
    icon: Icons.shield,
    title: "Secure & Reliable",
    desc: "Enterprise-grade security you can trust.",
  },
  {
    icon: Icons.phone,
    title: "Anywhere, Anytime",
    desc: "Access your school from any device.",
  },
  {
    icon: Icons.trending,
    title: "Scalable & Future-Ready",
    desc: "Built to grow with your institution.",
  },
  {
    icon: Icons.users,
    title: "Trusted by Schools",
    desc: "Join thousands of schools across India.",
  },
];

const challenges = [
  { icon: Icons.grid, text: "Too many disconnected systems" },
  { icon: Icons.library, text: "Administrative overload" },
  { icon: Icons.teach, text: "Teacher burnout" },
  { icon: Icons.users, text: "Limited parent engagement" },
  { icon: Icons.clock, text: "Reactive decision-making" },
  { icon: Icons.cap, text: "One-size-fits-all learning" },
  { icon: Icons.chat, text: "Scattered communication" },
  { icon: I.database, text: "Data without insights" },
];

const solutions = [
  { icon: Icons.link, text: "One connected ecosystem" },
  { icon: I.gear, text: "Automated workflows" },
  { icon: Icons.ai, text: "AI-powered teaching tools" },
  { icon: Icons.users, text: "Engaged parents" },
  { icon: Icons.trending, text: "Predictive intelligence" },
  { icon: Icons.cap, text: "Personalized learning" },
  { icon: Icons.chat, text: "Unified communication" },
  { icon: Icons.chart, text: "Actionable insights" },
];

const chooseCards = [
  {
    num: "01",
    accent: "blue",
    icon: I.monitor,
    title: "One Intelligent Platform",
    desc: "No more juggling multiple software. Everything works together seamlessly.",
  },
  {
    num: "02",
    accent: "green",
    icon: I.brain,
    title: "AI Built Into Everything",
    desc: "AI isn't an add-on. It's woven into every workflow to save time, improve decisions, and deliver better outcomes.",
  },
  {
    num: "03",
    accent: "purple",
    icon: I.target,
    title: "Built Around Outcomes",
    desc: "Not features. Not modules. Real educational outcomes that truly transform schools.",
  },
  {
    num: "04",
    accent: "orange",
    icon: Icons.users,
    title: "Every Stakeholder Wins",
    desc: "School Leaders, Teachers, Parents, Students, Administration, and Management—everyone benefits with EduAitor.",
  },
  {
    num: "05",
    accent: "teal",
    icon: Icons.rocket,
    title: "Future Ready",
    desc: "AI, Automation, Analytics, Mobility, and Scalability—built to keep your school ahead of the future.",
  },
  {
    num: "06",
    accent: "navy",
    icon: I.twoBuildings,
    title: "Designed for Schools of Every Size",
    desc: "From a single-campus school to a multi-campus institution, EduAitor adapts to your needs and grows with you.",
  },
];

const beliefs = [
  {
    icon: Icons.teach,
    strong: "We don't believe technology should replace educators.",
    muted: "We believe it should empower them.",
  },
  {
    icon: Icons.users,
    strong: "We don't believe parents should simply receive updates.",
    muted:
      "We believe they should actively participate in their child's learning journey.",
  },
  {
    icon: Icons.cap,
    strong: "We don't believe students should learn at the same pace.",
    muted: "We believe every learner deserves personalized support.",
  },
  {
    icon: Icons.trending,
    strong:
      "We don't believe school leaders should make decisions based on guesswork.",
    muted: "We believe intelligent insights create stronger schools.",
  },
  {
    icon: Icons.heart,
    strong: "We don't believe education is just about today.",
    muted: "We believe every decision in a school shapes a better tomorrow.",
  },
];

const differenceRows = [
  {
    label: "Data",
    icon: I.database,
    traditional: "Manages Data",
    eduaitor: "Creates Intelligence",
  },
  {
    label: "Attendance",
    icon: Icons.check,
    traditional: "Records Attendance",
    eduaitor: "Identifies Patterns",
  },
  {
    label: "Information",
    icon: I.folder,
    traditional: "Stores Information",
    eduaitor: "Generates Insights",
  },
  {
    label: "Problem Solving",
    icon: I.alertTriangle,
    traditional: "Reports Problems",
    eduaitor: "Predicts Challenges",
  },
  {
    label: "Focus",
    icon: I.gear,
    traditional: "Digitizes Processes",
    eduaitor: "Improves Outcomes",
  },
  {
    label: "Tools",
    icon: Icons.grid,
    traditional: "Multiple Tools",
    eduaitor: "One Ecosystem",
  },
  {
    label: "Primary Focus",
    icon: Icons.building,
    traditional: "Administration Focus",
    eduaitor: "Student Success Focus",
  },
  {
    label: "Approach",
    icon: Icons.clock,
    traditional: "Reactive",
    eduaitor: "Predictive",
  },
  {
    label: "What It Is",
    icon: I.monitor,
    traditional: "Software",
    eduaitor: "AI-Powered School Operating System",
  },
];

const promiseCards = [
  {
    icon: Icons.clock,
    title: "Save Time",
    desc: "Automate routine tasks and simplify operations.",
  },
  {
    icon: Icons.users,
    title: "Empower People",
    desc: "Give educators, parents, and students the right tools to succeed.",
  },
  {
    icon: Icons.trending,
    title: "Drive Outcomes",
    desc: "Use AI and insights to improve learning and institutional performance.",
  },
  {
    icon: Icons.shield,
    title: "Build Trust",
    desc: "Ensure data security, transparency, and reliability at every step.",
  },
  {
    icon: Icons.star,
    title: "Create Impact",
    desc: "Every feature, every innovation, every decision is designed to uplift schools and strengthen students.",
  },
];

const visionBar = [
  { icon: Icons.school, text: "Smarter Schools Make Better Decisions" },
  { icon: Icons.teach, text: "Empowered Teachers Create Inspired Classrooms" },
  { icon: Icons.users, text: "Engaged Parents Build Stronger Partnerships" },
  { icon: Icons.cap, text: "Supported Students Achieve Their Full Potential" },
  { icon: Icons.trending, text: "Stronger Today. Brighter Tomorrow." },
];

const mattersCards = [
  {
    icon: Icons.check,
    title: "Every Attendance Marked",
    desc: "Strengthens accountability and ensures every student is seen, supported, and cared for.",
  },
  {
    icon: Icons.book,
    title: "Every Assignment Submitted",
    desc: "Reinforces learning, builds discipline, and helps students grow every day.",
  },
  {
    icon: Icons.users,
    title: "Every Parent Informed",
    desc: "Builds trust, strengthens partnerships, and creates a supportive learning environment.",
  },
  {
    icon: Icons.teach,
    title: "Every Teacher Empowered",
    desc: "Saves time, reduces stress, and enables them to do what they do best—inspire and teach.",
  },
  {
    icon: Icons.cap,
    title: "Every Student Supported",
    desc: "Unlocks potential, builds confidence, and helps every learner succeed.",
  },
  {
    icon: Icons.school,
    title: "Every Decision Guided",
    desc: "Turns data into insights, helps leaders act early, and drives school excellence.",
  },
];

const ctaTrust = [
  { icon: Icons.check, text: "Trusted by Future-Ready Schools" },
  { icon: Icons.lock, text: "Secure. Reliable. Scalable." },
  { icon: I.cloud, text: "AI-Powered. Data-Driven. Impactful." },
  { icon: Icons.users, text: "Built for Schools. Focused on Students." },
];

export default function WhyEduAitorPage() {
  return (
    <div className="wy">
      {/* 01 — Hero */}
      <section className="wy-hero">
        <div className="wy-container wy-hero__grid">
          <div className="wy-hero__copy">
            <h1>
              Technology Changes.
              <br />
              Education Transforms.
              <br />
              <span>The Future Belongs to Schools That Embrace Both.</span>
            </h1>
            <span className="wy-hero__rule" aria-hidden="true" />
            <p className="wy-hero__sub">
              Education is evolving faster than ever.
              <br />
              <br />
              Artificial Intelligence is reshaping how schools operate,
              teachers teach, parents engage, and students learn.
              <br />
              <br />
              <strong>EduAitor</strong> helps schools embrace this future with
              one intelligent platform built for the next generation of
              education.
            </p>
            <div className="wy-hero__actions">
              <Link to="/bookademo" className="wy-btn wy-btn--primary">
                <span aria-hidden="true">{Icons.calendar}</span> Book a Demo
              </Link>
              <Link to="/ecosystem" className="wy-btn wy-btn--outline">
                <span aria-hidden="true">{I.compass}</span> Explore the
                Ecosystem
              </Link>
            </div>
          </div>
          <div className="wy-hero__visual">
            <img src="/why/01-hero-body.png" alt="EduAitor connects school leaders, teachers, parents, students and administration" />
          </div>
        </div>
        <div className="wy-container">
          <div className="wy-trustbar">
            {heroTrust.map((item) => (
              <div key={item.title} className="wy-trustbar__item">
                <span className="wy-trustbar__icon" aria-hidden="true">
                  {item.icon}
                </span>
                <div>
                  <strong>{item.title}</strong>
                  <span>{item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 02 — Reality */}
      <section className="wy-reality">
        <div className="wy-container">
          <div className="wy-section-head">
            <p className="wy-eyebrow">— THE REALITY SCHOOLS FACE TODAY —</p>
            <h2>From Daily Challenges to Intelligent Solutions</h2>
            <p>
              Schools today struggle with disconnected systems and endless
              manual work. <strong>EduAitor</strong> brings everything
              together in one intelligent ecosystem.
            </p>
          </div>

          <div className="wy-reality__grid">
            <article className="wy-reality-card wy-reality-card--red">
              <header>
                <span className="wy-reality-card__face" aria-hidden="true">
                  ☹
                </span>
                TODAY'S CHALLENGES
              </header>
              <ul>
                {challenges.map((item) => (
                  <li key={item.text}>
                    <span className="wy-reality-card__icon" aria-hidden="true">
                      {item.icon}
                    </span>
                    <span className="wy-reality-card__text">{item.text}</span>
                    <span className="wy-reality-card__mark wy-reality-card__mark--x" aria-hidden="true">
                      ✕
                    </span>
                  </li>
                ))}
              </ul>
              <div className="wy-reality-card__photo">
                <img src="/why/challenge-photo.png" alt="School administrator overwhelmed with paperwork" />
              </div>
            </article>

            <span className="wy-reality__arrow" aria-hidden="true">
              →
            </span>

            <article className="wy-reality-card wy-reality-card--green">
              <header>
                <span className="wy-reality-card__face" aria-hidden="true">
                  ☺
                </span>
                WITH EDUAITOR
              </header>
              <ul>
                {solutions.map((item) => (
                  <li key={item.text}>
                    <span className="wy-reality-card__icon" aria-hidden="true">
                      {item.icon}
                    </span>
                    <span className="wy-reality-card__text">{item.text}</span>
                    <span className="wy-reality-card__mark wy-reality-card__mark--check" aria-hidden="true">
                      ✓
                    </span>
                  </li>
                ))}
              </ul>
              <div className="wy-reality-card__photo">
                <img src="/why/solution-photo.png" alt="Teacher using EduAitor in a connected classroom" />
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* 03 — Choose */}
      <section className="wy-choose">
        <div className="wy-container">
          <div className="wy-section-head">
            <p className="wy-eyebrow">—— WHY SCHOOLS CHOOSE EDUAITOR ——</p>
            <h2>Six Powerful Reasons. One Intelligent Choice.</h2>
            <p>
              EduAitor is more than a platform—it's a partner in your journey
              to build a smarter school and a better future for every
              student.
            </p>
          </div>
          <div className="wy-choose__grid">
            {chooseCards.map((card) => (
              <article key={card.num} className={`wy-choose-card wy-choose-card--${card.accent}`}>
                <span className="wy-choose-card__num">{card.num}</span>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
                <span className="wy-choose-card__icon" aria-hidden="true">
                  {card.icon}
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 04 — Philosophy */}
      <section className="wy-philosophy">
        <div className="wy-container wy-philosophy__grid">
          <div className="wy-philosophy__copy">
            <p className="wy-eyebrow">— THE EDUAITOR PHILOSOPHY —</p>
            <h2>Technology should empower people, not replace them.</h2>
            <div className="wy-belief__list">
              {beliefs.map((b) => (
                <div key={b.strong} className="wy-belief">
                  <span className="wy-belief__icon" aria-hidden="true">
                    {b.icon}
                  </span>
                  <span className="wy-belief__divider" aria-hidden="true" />
                  <p>
                    <strong>{b.strong}</strong>
                    <span>{b.muted}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="wy-philosophy__visual">
            <img src="/why/04-philosophy-body.png" alt="Empowered teachers, involved parents, successful students and insightful leaders" />
          </div>
        </div>
        <div className="wy-container">
          <div className="wy-philosophy__banner">
            <div className="wy-philosophy__banner-item">
              <span className="wy-philosophy__banner-icon" aria-hidden="true">
                {Icons.star}
              </span>
              <p>
                We exist to help schools create environments where every
                educator is supported, every parent is involved, every
                student is valued, and every decision leads to progress.
              </p>
            </div>
            <div className="wy-philosophy__banner-item wy-philosophy__banner-item--end">
              <strong>That's the EduAitor way.</strong>
              <span aria-hidden="true">{Icons.heart}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 05 — Difference */}
      <section className="wy-difference">
        <div className="wy-container">
          <div className="wy-section-head">
            <p className="wy-eyebrow">--- THE EDUAITOR DIFFERENCE ---</p>
            <h2>More Than Software. A Smarter Way Forward.</h2>
            <p>
              EduAitor is not just another school ERP. It's an{" "}
              <strong>AI-Powered School Operating System</strong> designed to
              drive intelligent outcomes for every stakeholder.
            </p>
          </div>

          <div className="wy-diff-table">
            <div className="wy-diff-table__head">
              <div />
              <div className="wy-diff-table__head-cell wy-diff-table__head-cell--trad">
                Traditional ERP
              </div>
              <div className="wy-diff-table__head-cell wy-diff-table__head-cell--edu">
                EduA<span>i</span>tor
              </div>
            </div>
            {differenceRows.map((row, i) => (
              <div
                key={row.label}
                className={`wy-diff-table__row${i % 2 === 1 ? " wy-diff-table__row--alt" : ""}`}
              >
                <div className="wy-diff-table__cell wy-diff-table__cell--label">
                  <span aria-hidden="true">{row.icon}</span>
                  {row.label}
                </div>
                <div className="wy-diff-table__cell wy-diff-table__cell--trad">
                  <span aria-hidden="true">{row.icon}</span>
                  {row.traditional}
                </div>
                <div className="wy-diff-table__cell wy-diff-table__cell--edu">
                  <span aria-hidden="true">{row.icon}</span>
                  {row.eduaitor}
                </div>
              </div>
            ))}
          </div>

          <div className="wy-difference__banner">
            <div className="wy-difference__banner-item">
              <span className="wy-difference__banner-icon" aria-hidden="true">
                {Icons.star}
              </span>
              <p>
                EduAitor doesn't just help you manage your school.
                <br />
                <strong>It helps you elevate it.</strong>
              </p>
            </div>
            <div className="wy-difference__banner-item wy-difference__banner-item--end">
              <span aria-hidden="true">{Icons.users}</span>
              <p>
                Smarter Operations. Intelligent Decisions.
                <br />
                Better Learning. Stronger Outcomes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 06 — Pillars (exact design diagram) */}
      <section className="wy-pillars">
        <div className="wy-container">
          <div className="wy-pillars__diagram">
            <img
              src="/why/06-pillars-body.png"
              alt="Designed Around Four Pillars — A Balanced Ecosystem. Infinite Impact. Smarter Schools, Collaboration, Empowerment and Innovation keep Stronger Students at the center."
            />
          </div>
        </div>
      </section>

      {/* 07 — Promise */}
      <section className="wy-promise">
        <div className="wy-container">
          <div className="wy-section-head">
            <p className="wy-eyebrow">OUR PROMISE</p>
            <h2>
              We Promise to Make a Real Difference<span>.</span>
            </h2>
            <p>
              We promise to help schools spend less time managing systems and
              more time <strong>transforming lives.</strong>
            </p>
            <p className="wy-promise__purpose">
              Everything we build serves one purpose:
              <br />
              <strong>Helping schools create better educational outcomes.</strong>
            </p>
          </div>

          <div className="wy-promise__grid">
            {promiseCards.map((card, i) => (
              <React.Fragment key={card.title}>
                <article className="wy-promise-card">
                  <span className="wy-promise-card__icon" aria-hidden="true">
                    {card.icon}
                  </span>
                  <h3>{card.title}</h3>
                  <p>{card.desc}</p>
                </article>
                {i < promiseCards.length - 1 && (
                  <span className="wy-promise__arrow" aria-hidden="true">
                    ›
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="wy-promise__quote">
            <div className="wy-promise__quote-text">
              <span aria-hidden="true">“</span>
              <p>
                Behind every feature, every line of code, and every
                innovation is our promise to schools:
                <br />
                <strong>You focus on education. We handle the rest.</strong>
              </p>
            </div>
            <div className="wy-promise__quote-photo">
              <img src="/why/promise-photo.png" alt="Teacher guiding students with EduAitor" />
            </div>
          </div>
        </div>
      </section>

      {/* 08 — Vision */}
      <section className="wy-vision">
        <div className="wy-container wy-vision__grid">
          <div className="wy-vision__copy">
            <p className="wy-eyebrow">—— OUR VISION ——</p>
            <h2>
              To build the world's most{" "}
              <span>intelligent education ecosystem</span> where schools
              don't just manage education—they{" "}
              <span>continuously improve it.</span>
            </h2>
            <span className="wy-hero__rule" aria-hidden="true" />
            <p className="wy-vision__sub">
              We envision a future where AI empowers every educator, engages
              every parent, supports every learner, and empowers every school
              leader to make smarter decisions—every single day.
            </p>
          </div>
          <div className="wy-vision__visual">
            <img src="/why/vision-photo.png" alt="Student envisioning an AI-driven connected school ecosystem" />
            <span className="wy-vision__badge wy-vision__badge--top">
              <span aria-hidden="true">{Icons.ai}</span>
              AI-Driven Intelligence
            </span>
          </div>
        </div>
        <div className="wy-container">
          <div className="wy-vision__bar">
            {visionBar.map((item) => (
              <div key={item.text} className="wy-vision__bar-item">
                <span aria-hidden="true">{item.icon}</span>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 09 — Matters */}
      <section className="wy-matters">
        <div className="wy-container wy-matters__grid">
          <div className="wy-matters__copy">
            <p className="wy-eyebrow">— WHY IT MATTERS —</p>
            <h2>
              Every Small Action.
              <br />
              <span>A Greater Impact.</span>
            </h2>
            <p>
              Behind every successful school is a thousand meaningful
              moments—powered by the right tools, the right insights, and
              the right support.
            </p>
            <p className="wy-matters__highlight">
              With EduAitor, every action creates a ripple that transforms
              lives.
            </p>
          </div>
          <div className="wy-matters__visual">
            <img src="/why/matters-photo.png" alt="Teacher connecting with a student" />
          </div>
          <div className="wy-matters__quote">
            <span aria-hidden="true">“</span>
            <p>
              It's not just about managing a school. It's about nurturing
              potential and building futures.
            </p>
          </div>
        </div>

        <div className="wy-container">
          <div className="wy-matters__grid-cards">
            {mattersCards.map((card) => (
              <article key={card.title} className="wy-matters-card">
                <span className="wy-matters-card__icon" aria-hidden="true">
                  {card.icon}
                </span>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="wy-matters__banner">
          <p>
            All these moments.
            <br />
            All these actions.
          </p>
          <h3>Adds up to something much bigger.</h3>
          <p className="wy-matters__script">A better future.</p>
        </div>
      </section>

      {/* 10 — Final CTA */}
      <section className="wy-cta">
        <div className="wy-container wy-cta__grid">
          <div className="wy-cta__copy">
            <p className="wy-eyebrow">— FINAL CTA —</p>
            <h2>Ready to Build a Smarter School?</h2>
            <p>
              Join forward-thinking schools that are embracing{" "}
              <strong>Artificial Intelligence</strong> to simplify
              operations, empower educators, strengthen parent partnerships,
              and help every student succeed.
            </p>
            <Link to="/bookademo" className="wy-btn wy-btn--primary">
              <span aria-hidden="true">{Icons.calendar}</span> Book a Demo
            </Link>
          </div>
          <div className="wy-cta__visual">
            <img src="/why/cta-photo.png" alt="Mother and daughter exploring EduAitor together" />
            <span className="wy-cta__badge wy-cta__badge--top">
              <span aria-hidden="true">{I.gear}</span>
              Simplify Operations
            </span>
          </div>
        </div>
        <div className="wy-container">
          <div className="wy-cta__trust">
            {ctaTrust.map((item) => (
              <div key={item.text} className="wy-cta__trust-item">
                <span aria-hidden="true">{item.icon}</span>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
          <div className="wy-cta__banner">
            <div className="wy-cta__banner-item">
              <span aria-hidden="true">{Icons.rocket}</span>
              <p>
                The future of education is intelligent.
                <br />
                <strong>Let's build it together.</strong>
              </p>
            </div>
            <div className="wy-cta__banner-item wy-cta__banner-item--end">
              <span aria-hidden="true">{Icons.users}</span>
              <p>
                One Platform. One Ecosystem. Infinite Possibilities.
                <br />
                Welcome to <strong>EduAitor</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
