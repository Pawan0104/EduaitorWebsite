import React from "react";
import { Link } from "react-router-dom";
import { useContactPopup } from "../ContactPopup";
import "./IgniteXHighlight.css";

export default function IgniteXHighlight() {
  const { openContactPopup } = useContactPopup();

  return (
    <section className="ixh" aria-labelledby="ixh-title">
      <div className="ixh__inner">
        <div className="ixh__badge">New under EduAitor · IgniteX</div>
        <div className="ixh__grid">
          <div className="ixh__copy">
            <p className="ixh__kicker">Student Innovation Program™</p>
            <h2 id="ixh-title">
              IgniteX — Build <span>Future-Ready</span> Students
            </h2>
            <p className="ixh__sub">
              Explore → Create → Innovate → Lead. Start with a FREE IgniteX Future Lab™ — a 2-hour
              hands-on experience on how AI is changing the way people think, create and build.
            </p>
            <div className="ixh__actions">
              <Link to="/ignitex" className="ixh__btn ixh__btn--primary">
                Discover IgniteX
              </Link>
              <button
                type="button"
                className="ixh__btn ixh__btn--ghost"
                onClick={() => openContactPopup("home-ignitex-book-demo")}
              >
                Book a Demo
              </button>
            </div>
          </div>
          <Link to="/ignitex" className="ixh__visual" aria-label="Open IgniteX page">
            <img src="/ignitex/hero-students.jpg" alt="Students in IgniteX learning experience" />
            <span className="ixh__tag">FREE Future Lab™ · 2 Hours</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
