import React from "react";
import { Link } from "react-router-dom";
import "./BrainLeaguePage.css";

/**
 * BRAIN LEAGUE — the standalone gamified brain quiz, embedded as its own
 * page on the marketing website. The game itself lives in /brain-league/
 * (public static build); this page hosts it with a back-to-site chip.
 */
export default function BrainLeaguePage() {
  return (
    <div className="brainleague-page">
      <iframe
        title="EDUAITOR Brain League — 100-question brain quiz"
        src="/brain-league/index.html"
        className="bl-frame"
        loading="eager"
        allow="fullscreen"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <div className="bl-watermark" aria-hidden="true" />
      <Link to="/" className="bl-back-chip">
        <span aria-hidden="true">←</span> EduAItor
      </Link>
    </div>
  );
}