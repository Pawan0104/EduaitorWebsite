import React, { useRef, useEffect, useState } from "react";
import "./AwardsSection.css";
import { Link } from "react-router-dom";
import awardLogo1 from "../../assets/awardLogo1.webp";
import awardLogo2 from "../../assets/awardLogo2.webp";
import awardLogo3 from "../../assets/awardLogo3.webp";
import awardLogo4 from "../../assets/awardLogo4.webp";
import { API_URL } from "../../lib/api";

const awards = [
  { logo: awardLogo1, title: "Best EdTech Startup", org: "Startup India, 2023" },
  { logo: awardLogo2, title: "Top School Management Platform", org: "EduTech Asia, 2023" },
  { logo: awardLogo3, title: "Excellence in Innovation", org: "NASSCOM, 2022" },
  { logo: awardLogo4, title: "Most Trusted ERP", org: "Education World, 2024" },
];

const pressLogos = [
  { name: "TechCrunch", color: "#0A9E42" },
  { name: "YourStory", color: "#E8642A" },
  { name: "Inc42", color: "#1A73E8" },
  { name: "The Hindu", color: "#C62B2B" },
];

export default function AwardsSection() {
  const [visible, setVisible] = useState(false);
  const [awards,setAwards] =useState([]);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    fetch(`${API_URL}/awards`)
    .then(res => res.json()).then(data => {
      console.log("Fetched awards:", data.awards);
      setAwards(data.awards);
      // Here you would typically set the awards state with the fetched data
    }).catch(err => {
      console.error("Error fetching awards:", err);
    });
  }, [visible]);

  return (
    <section className="aw" ref={ref}>
      <div className="aw__inner">

        {/* Header */}
        <div className={`aw__header ${visible ? "aw__header--show" : ""}`}>
          <span className="aw__label">Recognition</span>
          <h2 className="aw__h2">
            Awards & <span>Press Coverage</span>
          </h2>
          <p className="aw__sub">
            Industry recognition from the institutions that define educational technology in India.
          </p>
        </div>

        {/* Award Cards */}
        <div className="aw__grid">
          {awards.map((a, i) => (
            <div
              className={`aw__card ${visible ? "aw__card--show" : ""}`}
              key={i}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="aw__card-badge">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                Award
              </div>
              <div className="aw__logo-wrap">
                <img src={a.imageUrl} alt={a.title} />
              </div>
              <h3 className="aw__card-title">{a.title}</h3>
              <p className="aw__card-org">{a.description} - {a.year}</p>
            </div>
          ))}
        </div>

        {/* Press strip */}
        <div className={`aw__press ${visible ? "aw__press--show" : ""}`}>
          <span className="aw__press-label">As featured in</span>
          <div className="aw__press-logos">
            {pressLogos.map((p, i) => (
              <div className="aw__press-logo" key={i} style={{ "--press-color": p.color }}>
                {p.name}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className={`aw__cta ${visible ? "aw__cta--show" : ""}`}>
          <div className="aw__cta-left">
            <h3>Join 1,100+ schools already on EduAitor</h3>
            <p>Start free. No credit card. Cancel anytime.</p>
          </div>
          <div className="aw__cta-right">
            <a href="/bookademo" className="aw__cta-btn aw__cta-btn--primary">
              Get Started Free
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a link="/palns" className="aw__cta-btn aw__cta-btn--ghost">View Pricing</a>
          </div>
        </div>

      </div>
    </section>
  );
}