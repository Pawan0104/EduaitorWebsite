import React from "react";
import { NavLink, Link } from "react-router-dom";
import {
  FaStar,
  FaGraduationCap,
  FaBrain,
  FaUsers,
  FaSchool,
  FaShieldAlt,
  FaMobileAlt,
  FaChalkboardTeacher,
  FaUserGraduate,
  FaUserCog,
  FaBullseye,
  FaBookOpen,
  FaQuestionCircle,
  FaFileAlt,
  FaChartBar,
  FaPlayCircle,
  FaDownload,
  FaMagic,
  FaInfoCircle,
  FaFlag,
  FaBriefcase,
  FaHandshake,
  FaLock,
  FaFileContract,
  FaCalendarAlt,
  FaHeadset,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaGlobe,
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
  FaInstagram,
  FaHeart,
  FaArrowRight,
} from "react-icons/fa";
import "./Footer.css";

const productItems = [
  { label: "Features", to: "/ecosystem", icon: FaStar },
  { label: "Academics", to: "/solution", icon: FaGraduationCap },
  { label: "AI & Learning", to: "/solution", icon: FaBrain },
  { label: "Parent Suite", to: "/solution", icon: FaUsers },
  { label: "Admin Suite", to: "/solution", icon: FaSchool },
  { label: "Security", to: "/aboutus", icon: FaShieldAlt },
  { label: "Mobile Apps", to: "/#ecosystem", icon: FaMobileAlt },
];

const solutionItems = [
  { label: "For Schools", to: "/solution", icon: FaSchool },
  { label: "For Teachers", to: "/solution", icon: FaChalkboardTeacher },
  { label: "For Parents", to: "/solution", icon: FaUsers },
  { label: "For Students", to: "/solution", icon: FaUserGraduate },
  { label: "By Role", to: "/#stakeholders", icon: FaUserCog },
  { label: "By Need", to: "/solution", icon: FaBullseye },
  { label: "By Board", to: "/solution", icon: FaBookOpen },
];

const resourceItems = [
  { label: "Help Center", to: "/contactus", icon: FaQuestionCircle },
  { label: "Knowledge Base", to: "/aboutus", icon: FaBookOpen },
  { label: "Blogs", to: "/aboutus", icon: FaFileAlt },
  { label: "Case Studies", to: "/aboutus", icon: FaChartBar },
  { label: "Webinars", to: "/contactus", icon: FaPlayCircle },
  { label: "Downloads", to: "/contactus", icon: FaDownload },
  { label: "What's New", to: "/aboutus", icon: FaMagic },
];

const companyItems = [
  { label: "About Us", to: "/aboutus", icon: FaInfoCircle },
  { label: "Our Mission", to: "/aboutus", icon: FaFlag },
  { label: "Our Team", to: "/aboutus", icon: FaUsers },
  { label: "Careers", to: "/contactus", icon: FaBriefcase },
  { label: "Partners", to: "/contactus", icon: FaHandshake },
  { label: "Privacy Policy", to: "/legal", icon: FaLock },
  { label: "Terms of Service", to: "/legal", icon: FaFileContract },
];

function FooterCol({ title, items }) {
  return (
    <div className="ft-col">
      <h3 className="ft-col-title">{title}</h3>
      <ul className="ft-links">
        {items.map(({ label, to, icon: Icon }) => (
          <li key={label}>
            {to.startsWith("/") && !to.includes("#") ? (
              <NavLink to={to} className="ft-link">
                <span className="ft-link-left">
                  <Icon className="ft-link-icon" aria-hidden />
                  <span>{label}</span>
                </span>
                <span className="ft-chevron" aria-hidden>
                  ›
                </span>
              </NavLink>
            ) : (
              <a href={to} className="ft-link">
                <span className="ft-link-left">
                  <Icon className="ft-link-icon" aria-hidden />
                  <span>{label}</span>
                </span>
                <span className="ft-chevron" aria-hidden>
                  ›
                </span>
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

const Footer = () => {
  return (
    <footer className="footer">
      <div className="ft-top">
        <div className="ft-main">
          <div className="ft-brand">
            <div className="ft-logo">
              Edu<span>Aitor</span>
            </div>
            <p className="ft-tagline">Smarter Schools. Stronger Students.</p>
            <div className="ft-brand-rule" aria-hidden />
            <p className="ft-desc">
              EduAitor is an AI-powered School Operating System that simplifies
              operations, empowers educators, engages parents and helps every
              student reach their full potential.
            </p>
            <div className="ft-highlight">
              <span className="ft-heart" aria-hidden>
                <FaHeart />
              </span>
              <span>One Ecosystem. Every Connection. Infinite Impact.</span>
            </div>
          </div>

          <FooterCol title="PRODUCT" items={productItems} />
          <FooterCol title="SOLUTIONS" items={solutionItems} />
          <FooterCol title="RESOURCES" items={resourceItems} />
          <FooterCol title="COMPANY" items={companyItems} />

          <div className="ft-cta">
            <h3 className="ft-cta-title">
              Let's Build Smarter Schools.{" "}
              <span className="ft-cta-accent">Together.</span>
            </h3>
            <p className="ft-cta-sub">
              Book a demo or connect with our team to see EduAitor in action.
            </p>
            <Link to="/bookademo" className="ft-btn ft-btn-primary">
              <FaCalendarAlt className="ft-btn-icon" aria-hidden />
              <span>Book a Demo</span>
              <FaArrowRight className="ft-btn-arrow" aria-hidden />
            </Link>
            <Link to="/contactus" className="ft-btn ft-btn-outline">
              <FaHeadset className="ft-btn-icon" aria-hidden />
              <span>Talk to Our Experts</span>
            </Link>
            <p className="ft-app-label">Download the EduAitor App</p>
            <div className="ft-badges">
              <a href="#" aria-label="Google Play">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Get it on Google Play"
                />
              </a>
              <a href="#" aria-label="App Store">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                  alt="Download on the App Store"
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="ft-bottom">
        <div className="ft-bottom-inner">
          <div className="ft-bottom-row">
            <div className="ft-address">
              <span className="ft-bottom-icon" aria-hidden>
                <FaMapMarkerAlt />
              </span>
              <p>
                EduAitor Technologies Pvt. Ltd. B-28, Sector-63, Noida, Uttar
                Pradesh - 201301, India
              </p>
            </div>

            <div className="ft-bottom-divider" aria-hidden />

            <div className="ft-contacts">
              <a href="mailto:hello@eduaitor.com">
                <span className="ft-bottom-icon" aria-hidden>
                  <FaEnvelope />
                </span>
                hello@eduaitor.com
              </a>
              <a href="tel:+918955789557">
                <span className="ft-bottom-icon" aria-hidden>
                  <FaPhoneAlt />
                </span>
                +91 89557 89557
              </a>
            </div>

            <div className="ft-bottom-divider" aria-hidden />

            <a
              className="ft-website"
              href="https://www.eduaitor.com"
              target="_blank"
              rel="noreferrer"
            >
              <span className="ft-bottom-icon" aria-hidden>
                <FaGlobe />
              </span>
              www.eduaitor.com
            </a>

            <div className="ft-bottom-divider" aria-hidden />

            <div className="ft-social">
              <span className="ft-social-label">Follow Us</span>
              <a href="#" aria-label="Facebook">
                <FaFacebookF />
              </a>
              <a href="#" aria-label="LinkedIn">
                <FaLinkedinIn />
              </a>
              <a href="#" aria-label="YouTube">
                <FaYoutube />
              </a>
              <a href="#" aria-label="Instagram">
                <FaInstagram />
              </a>
            </div>
          </div>

          <div className="ft-copy">
            <span>© 2026 EduAitor Technologies Pvt. Ltd. All rights reserved.</span>
            <span className="ft-sep">|</span>
            <span className="ft-copy-right">
              Empowering Education. Enriching Futures.{" "}
              <FaHeart className="ft-copy-heart" aria-hidden />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
