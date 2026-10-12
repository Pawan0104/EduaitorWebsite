import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useContactPopup } from "../ContactPopup";
import "./IgniteXHighlight.css";

const highlights = [
  {
    title: "Explore AI",
    text: "See what AI can do — and what it can't.",
    tone: "blue",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="11" cy="11" r="6.4" />
        <path d="M20 20l-3.7-3.7" />
        <path d="M11 8.4v5.2M8.4 11h5.2" />
      </svg>
    ),
  },
  {
    title: "Think Creatively",
    text: "Turn curiosity into original ideas.",
    tone: "orange",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3.2a6 6 0 0 0-3.6 10.8c.6.5 1 1.2 1 2v.6h5.2v-.6c0-.8.4-1.5 1-2A6 6 0 0 0 12 3.2z" />
        <path d="M9.8 19.4h4.4M10.6 21.6h2.8" />
      </svg>
    ),
  },
  {
    title: "Build Something",
    text: "Prototype and create the real thing.",
    tone: "blue",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" />
        <path d="M4 7.5 12 12l8-4.5M12 12v9" />
      </svg>
    ),
  },
];

export default function IgniteXHighlight() {
  const { openContactPopup } = useContactPopup();
  const [show, setShow] = useState(
    () => typeof IntersectionObserver === "undefined"
  );
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      return undefined;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      className={`ixh ${show ? "ixh--show" : ""}`}
      ref={ref}
      aria-labelledby="ixh-title"
    >
      <div className="ixh__bg" aria-hidden="true">
        <span className="ixh__orb ixh__orb--blue" />
        <span className="ixh__orb ixh__orb--orange" />
        <span className="ixh__dots" />
      </div>

      <div className="ixh__inner">
        <div className="ixh__copy">
          <span className="ixh__eyebrow">
            <span className="ixh__pulse" aria-hidden="true" />
            IgniteX · Student Innovation Program™
          </span>

          <h2 id="ixh-title" className="ixh__title">
            The Future Isn’t Just to Be{" "}
            <span className="ixh__hl-blue">Learned</span>.
            <br />
            It’s to Be <span className="ixh__hl-orange">Created</span>.
          </h2>

          <p className="ixh__sub">
            Empowering students to explore AI, turn ideas into reality, and build the
            skills of tomorrow.
          </p>

          <ul className="ixh__points">
            {highlights.map((h) => (
              <li key={h.title} className={`ixh__point ixh__point--${h.tone}`}>
                <span className="ixh__point-icon">{h.icon}</span>
                <span className="ixh__point-body">
                  <strong>{h.title}</strong>
                  <em>{h.text}</em>
                </span>
              </li>
            ))}
          </ul>

          <div className="ixh__actions">
            <button
              type="button"
              className="ixh__btn ixh__btn--primary"
              onClick={() => openContactPopup("home-ignitex-bring-to-school")}
            >
              Bring IgniteX to Your School
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            <Link to="/ignitex" className="ixh__link">
              Explore the program
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <p className="ixh__note">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7.5V12l3 1.8" />
            </svg>
            Start with a <strong>Free 2-Hour Hands-On Future Lab</strong>
          </p>
        </div>

        <div className="ixh__visual">
          <figure className="ixh__frame">
            <img
              src="/ignitex/students-ai-lab.jpg"
              alt="Students collaborating on an AI-powered project with laptops and digital creation tools"
              width="1200"
              height="800"
              loading="lazy"
              decoding="async"
            />
            <span className="ixh__frame-glow" aria-hidden="true" />
            <figcaption className="ixh__chip ixh__chip--free">
              <strong>FREE</strong> 2-Hour Future Lab™
            </figcaption>
            <span className="ixh__chip ixh__chip--tags" aria-hidden="true">
              AI · Creativity · Prototyping
            </span>
          </figure>
          <span className="ixh__shape ixh__shape--ring" aria-hidden="true" />
          <span className="ixh__shape ixh__shape--square" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
