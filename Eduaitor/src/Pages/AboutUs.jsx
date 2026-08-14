import React from "react";
import {
  FaShieldAlt,
  FaChartLine,
  FaCloud,
  FaUsers,
  FaLock,
  FaLightbulb
} from "react-icons/fa";
import "./AboutUs.css";
import Counter from "../Components/Counter";
import { NavLink } from "react-router-dom";
import { useContactPopup } from "../Components/ContactPopup";

const AboutUs = () => {
  const { openContactPopup } = useContactPopup();

  return (
    <div className="about-page">

      {/* HERO */}
      <section className="about-hero">
        <div className="hero-content">
          <h1>
            Empowering Institutions with <span>Smart Digital Solutions</span>
          </h1>
          <p>
            EduAitor simplifies institutional management through secure,
            scalable and intelligent technology.
          </p>
          <div className="hero-buttons">
           <NavLink to="/bookademo"> <button className="primary-btn">Request Demo</button></NavLink>
           <button
             type="button"
             className="secondary-btn"
             onClick={() => openContactPopup("about-contact-us")}
           >
             Contact Us
           </button>
          </div>
        </div>
      </section>

      {/* STORY */}
      <section className="about-story">
        <div className="story-container">
          <div className="story-text">
            <h2>Our Story</h2>
            <p>
              Educational institutions often struggle with manual processes,
              disconnected systems, and lack of real-time visibility.
            </p>
            <p>
              EduAitor was built to solve these challenges — providing a
              centralized, cloud-based platform that transforms how
              institutions operate and grow.
            </p>
          </div>

          <div className="story-image">
            <img
              src="https://plus.unsplash.com/premium_photo-1677087121017-b779a16ff921?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Education software"
            />
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="mission-vision">
        <div className="mv-card">
          <FaLightbulb className="mv-icon" />
          <h3>Our Mission</h3>
          <p>
            To simplify institutional management through secure,
            intelligent and scalable digital solutions.
          </p>
        </div>

        <div className="mv-card">
          <FaChartLine className="mv-icon" />
          <h3>Our Vision</h3>
          <p>
            To become the most trusted education management platform
            empowering institutions globally.
          </p>
        </div>
      </section>

      {/* USP SECTION */}
      <section className="about-usp">
        <h2>What Makes EduAitor Different</h2>

        <div className="usp-grid">
          <div className="usp-card">
            <FaCloud className="usp-icon" />
            <h4>Cloud Based</h4>
            <p>Access anytime with secure cloud infrastructure.</p>
          </div>

          <div className="usp-card">
            <FaShieldAlt className="usp-icon" />
            <h4>Secure & Reliable</h4>
            <p>Enterprise-grade encryption and data protection.</p>
          </div>

          <div className="usp-card">
            <FaUsers className="usp-icon" />
            <h4>Multi-Branch Control</h4>
            <p>Manage multiple campuses from one dashboard.</p>
          </div>

          <div className="usp-card">
            <FaChartLine className="usp-icon" />
            <h4>Advanced Analytics</h4>
            <p>Real-time dashboards for smart decisions.</p>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="about-stats">
        <div className="stats-grid">
          <div>
            <h2>
                <Counter end={1000} suffix="+"/>
                </h2>
            <p>Institutions</p>
          </div>
          <div>
            <h2><Counter end={50000} suffix="+"/></h2>
            <p>App Downloads</p>
          </div>
          <div>
            <h2><Counter end={110000} suffix="+"/></h2>
            <p>Students Managed</p>
          </div>
          <div>
            <h2><Counter end={99} suffix="%"/></h2>
            <p>Satisfaction</p>
          </div>
        </div>
      </section>

      {/* SECURITY */}
      <section className="about-security">
        <h2>Security & Trust First</h2>
        <div className="security-box">
          <FaLock className="security-icon" />
          <p>
            EduAitor ensures encrypted storage, secure cloud hosting,
            role-based access control, and regular data backups to
            protect institutional data.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <h2>Join 1000+ Institutions Transforming Education</h2>
           <NavLink to="/bookademo"> <button>Request Demo</button></NavLink>

      </section>

    </div>
  );
};

export default AboutUs;
