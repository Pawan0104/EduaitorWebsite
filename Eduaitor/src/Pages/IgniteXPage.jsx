import React from "react";
import { useContactPopup } from "../Components/ContactPopup";
import "./IgniteXPage.css";

const journey = [
  { label: "Explore", color: "blue" },
  { label: "Create", color: "green" },
  { label: "Innovate", color: "orange" },
  { label: "Lead", color: "red" },
];

const outcomes = [
  {
    title: "Use AI & emerging tech effectively",
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <circle cx="24" cy="20" r="10" fill="none" stroke="currentColor" strokeWidth="2.2" />
        <path d="M18 20h4l2-4 2 8 2-4h4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M16 34h16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Think critically and creatively",
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M24 8c-6 0-10 4.5-10 10 0 4 2 7 5 9v4h10v-4c3-2 5-5 5-9 0-5.5-4-10-10-10z" fill="none" stroke="currentColor" strokeWidth="2.2" />
        <path d="M20 35h8M21 38h6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Create rather than merely consume",
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M14 34l3-11 14-14a3.5 3.5 0 015 5L22 28l-8 6z" fill="none" stroke="currentColor" strokeWidth="2.2" />
        <path d="M28 12l6 6M12 38h24" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Approach problems with an innovator’s mindset",
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M18 34l6-24 4 10 8-4-6 18z" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
        <path d="M14 38h20" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Make informed decisions",
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M24 10v28M12 18h10l2 8 4-16 2 8h6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Use technology with judgement & purpose",
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M24 8l14 6v8c0 10-6 16-14 18-8-2-14-8-14-18v-8l14-6z" fill="none" stroke="currentColor" strokeWidth="2.2" />
        <circle cx="24" cy="22" r="5" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    title: "Collaborate, communicate and lead with impact",
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <circle cx="16" cy="16" r="5" fill="none" stroke="currentColor" strokeWidth="2.2" />
        <circle cx="32" cy="16" r="5" fill="none" stroke="currentColor" strokeWidth="2.2" />
        <circle cx="24" cy="28" r="5" fill="none" stroke="currentColor" strokeWidth="2.2" />
        <path d="M10 36c1.5-4 5-6 14-6s12.5 2 14 6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    ),
  },
];

const labModes = [
  { title: "Think", desc: "Research · Learn · Analyse", tone: "blue" },
  { title: "Create", desc: "Write · Design · Visualise", tone: "gold" },
  { title: "Build", desc: "Code · Prototype · Automate", tone: "orange" },
  { title: "Empower", desc: "Confidence · Agency · Purpose", tone: "cyan" },
];

const meetingPoints = [
  {
    title: "The Future",
    text: "What capabilities students need in a world shaped by AI and emerging technologies.",
    icon: (
      <svg viewBox="0 0 40 40" aria-hidden="true">
        <circle cx="20" cy="20" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M20 6v4M20 30v4M6 20h4M30 20h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M28 12l5-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "The Opportunity",
    text: "How schools can move beyond technology exposure to meaningful future-readiness.",
    icon: (
      <svg viewBox="0 0 40 40" aria-hidden="true">
        <path d="M8 28V18M16 28V12M24 28V16M32 28V8" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M8 30h24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "The IgniteX Vision",
    text: "A journey that helps students Explore, Create, Innovate and Lead — with human creativity at the centre.",
    icon: (
      <svg viewBox="0 0 40 40" aria-hidden="true">
        <circle cx="20" cy="20" r="12" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="20" cy="20" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    title: "The Possibility",
    text: "Where IgniteX and your school can work together — for students, educators and institutional growth.",
    icon: (
      <svg viewBox="0 0 40 40" aria-hidden="true">
        <path d="M12 16h8v8h-8zM20 16h8v8h-8zM16 24h8v8h-8z" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    title: "The Way Forward",
    text: "Practical next steps to begin a journey aligned to your school’s needs and readiness.",
    icon: (
      <svg viewBox="0 0 40 40" aria-hidden="true">
        <path d="M10 22c4-6 8-8 10-8s6 2 10 8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M14 26c3-4 5-5 6-5s3 1 6 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
];

function BookDemoBtn({ onClick, className = "" }) {
  return (
    <button type="button" className={`ix-btn ix-btn--primary ${className}`.trim()} onClick={onClick}>
      Book a Demo
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </button>
  );
}

export default function IgniteXPage() {
  const { openContactPopup } = useContactPopup();
  const bookDemo = () => openContactPopup("ignitex-book-demo");

  return (
    <div className="ix">
      {/* Hero */}
      <section className="ix-hero">
        <div className="ix-hero__media" aria-hidden="true">
          <img src="/ignitex/hero-students.jpg" alt="" />
        </div>
        <div className="ix-hero__shade" aria-hidden="true" />
        <div className="ix-container ix-hero__content">
          <div className="ix-logo-mark" aria-hidden="true">
            Ignite<span>X</span>
          </div>
          <p className="ix-tag">Build Future-Ready Students</p>
          <h1>IgniteX Student Innovation Program™</h1>
          <p className="ix-hero__sub">
            A journey that enables students to{" "}
            {journey.map((j, i) => (
              <React.Fragment key={j.label}>
                <span className={`ix-j ix-j--${j.color}`}>{j.label}</span>
                {i < journey.length - 1 ? " → " : " "}
              </React.Fragment>
            ))}
            into a rapidly changing future shaped by AI and evolving technologies.
          </p>
          <BookDemoBtn onClick={bookDemo} />
        </div>
      </section>

      {/* Intro */}
      <section className="ix-intro">
        <div className="ix-container ix-intro__grid">
          <div>
            <p className="ix-eyebrow">Under EduAitor</p>
            <h2>Preparing students for the world ahead</h2>
            <p>
              AI is transforming how people live, learn and work. Preparing students for this future
              is no longer optional — it is essential.
            </p>
            <p>
              IgniteX is not simply about teaching technology. It is about helping students
              understand what technology can do, what they can do with it, and where human
              capabilities must remain at the centre.
            </p>
            <p>
              Through IgniteX, students develop the ability to use AI and emerging technologies
              thoughtfully — to think, create, innovate and lead with judgement, responsibility and
              purpose.
            </p>
          </div>
          <figure className="ix-intro__photo">
            <img
              src="/ignitex/students-lab.jpg"
              alt="Students collaborating with technology in a modern learning lab"
            />
          </figure>
        </div>
      </section>

      {/* Outcomes */}
      <section className="ix-outcomes">
        <div className="ix-container">
          <div className="ix-section-head">
            <p className="ix-eyebrow">Student outcomes</p>
            <h2>What IgniteX helps students become</h2>
          </div>
          <div className="ix-outcomes__grid">
            {outcomes.map((o) => (
              <article key={o.title} className="ix-outcome">
                <div className="ix-outcome__icon">{o.icon}</div>
                <p>{o.title}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Future Lab */}
      <section className="ix-lab">
        <div className="ix-container ix-lab__grid">
          <div className="ix-lab__copy">
            <p className="ix-lab__kicker">Start here</p>
            <h2>IgniteX Future Lab™</h2>
            <p className="ix-lab__lead">
              How AI Is Changing the Way People Think, Create &amp; Build
            </p>
            <span className="ix-lab__badge">
              A <strong>FREE</strong> 2-hour hands-on experience for students
            </span>
            <p>
              IgniteX Future Lab is a dynamic 2-hour session where students experience firsthand how
              AI is reshaping the way people think, create and build — through guided, hands-on
              activities that spark curiosity and build real skills.
            </p>
            <div className="ix-lab__modes">
              {labModes.map((m) => (
                <div key={m.title} className={`ix-lab__mode ix-lab__mode--${m.tone}`}>
                  <strong>{m.title}</strong>
                  <span>{m.desc}</span>
                </div>
              ))}
            </div>
            <BookDemoBtn onClick={bookDemo} />
          </div>
          <figure className="ix-lab__photo">
            <img
              src="/ignitex/students-lab.jpg"
              alt="Hands-on IgniteX Future Lab student experience"
            />
          </figure>
        </div>
      </section>

      {/* Conversation / Meeting */}
      <section className="ix-meet">
        <div className="ix-container">
          <div className="ix-section-head">
            <p className="ix-eyebrow">Partnership conversation</p>
            <h2>The conversation we seek</h2>
            <p>
              We would value 30–45 minutes with your leadership team for an exploratory discussion
              around:
            </p>
          </div>
          <div className="ix-meet__grid">
            {meetingPoints.map((m) => (
              <article key={m.title} className="ix-meet__card">
                <div className="ix-meet__icon">{m.icon}</div>
                <h3>{m.title}</h3>
                <p>{m.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Quote + close */}
      <section className="ix-close">
        <div className="ix-container ix-close__grid">
          <div>
            <blockquote>
              We are not seeking to present another technology course. We would simply like to begin
              a conversation about what it means to prepare students for the world ahead.
            </blockquote>
            <div className="ix-sign">
              <p className="ix-sign__name">Suveer Singh</p>
              <p className="ix-sign__role">CEO — IgniteX</p>
            </div>
            <BookDemoBtn onClick={() => openContactPopup("ignitex-page-book-demo")} />
          </div>
          <figure className="ix-close__photo">
            <img src="/ignitex/ideas-book.jpg" alt="Ideas and learning — knowledge lighting the way" />
            <div className="ix-close__brand" aria-hidden="true">
              Ignite<span>X</span>
              <small>Build Future-Ready Students</small>
            </div>
          </figure>
        </div>
      </section>

      <footer className="ix-foot">
        <div className="ix-container ix-foot__row">
          <a href="mailto:suveersingh@outlook.com">suveersingh@outlook.com</a>
          <a href="tel:+917230060069">72300 60069</a>
          <span>Jaipur, India</span>
          <span className="ix-foot__love">Made with ♥ in India</span>
        </div>
      </footer>
    </div>
  );
}
