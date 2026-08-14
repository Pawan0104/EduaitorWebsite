import React, { useEffect, useState } from "react";
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
import { useContactPopup } from "../ContactPopup";
import { API_URL } from "../../lib/api";

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
  { label: "Help Center", to: "/help-center", icon: FaQuestionCircle },
  { label: "Knowledge Base", to: "/knowledge-base", icon: FaBookOpen },
  { label: "Blogs", to: "/blogs", icon: FaFileAlt },
  { label: "Case Studies", to: "/case-studies", icon: FaChartBar },
  { label: "Webinars", to: "/webinars", icon: FaPlayCircle },
  { label: "Downloads", to: "/downloads", icon: FaDownload },
  { label: "What's New", to: "/whats-new", icon: FaMagic },
];

const companyItems = [
  { label: "About Us", to: "/about-us", icon: FaInfoCircle },
  { label: "Our Mission", to: "/our-mission", icon: FaFlag },
  { label: "Our Team", to: "/our-team", icon: FaUsers },
  { label: "Careers", to: "/careers", icon: FaBriefcase },
  { label: "Partners", to: "/partners", icon: FaHandshake },
];

const legalItems = [
  { label: "Privacy Policy", to: "/privacy-policy" },
  { label: "Terms & Conditions", to: "/terms-and-conditions" },
  { label: "Refund & Cancellation Policy", to: "/refund-policy" },
];

const defaultSettings = {
  siteName: "EduAitor",
  tagline: "Smarter Schools. Stronger Students.",
  description:
    "EduAitor is an AI-powered School Operating System that simplifies operations, empowers educators, engages parents and helps every student reach their full potential.",
  emails: ["hello@eduaitor.com"],
  phones: ["+91 89557 89557"],
  address:
    "EduAitor Technologies Pvt. Ltd. B-28, Sector-63, Noida, Uttar Pradesh - 201301, India",
  copyright: "© 2026 EduAitor Technologies Pvt. Ltd. All rights reserved.",
};

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
  const [settings, setSettings] = useState(defaultSettings);
  const { openContactPopup } = useContactPopup();

  useEffect(() => {
    const controller = new AbortController();

    fetch(`${API_URL}/settings`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch settings");
        return response.json();
      })
      .then(({ general = {} }) => {
        setSettings((current) => ({ ...current, ...general }));
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          console.error("Unable to load site settings:", error);
        }
      });

    return () => controller.abort();
  }, []);

  const emails = settings.emails?.filter(Boolean) || [];
  const phones = settings.phones?.filter(Boolean) || [];

  return (
    <footer className="footer">
      <div className="ft-top">
        <div className="ft-main">
          <div className="ft-brand">
            <div className="ft-logo">
              {settings.siteName || defaultSettings.siteName}
            </div>
            <p className="ft-tagline">
              {settings.tagline || defaultSettings.tagline}
            </p>
            <div className="ft-brand-rule" aria-hidden />
            <p className="ft-desc">
              {settings.description || defaultSettings.description}
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
            <button
              type="button"
              className="ft-btn ft-btn-outline"
              onClick={() => openContactPopup("footer-talk-experts")}
            >
              <FaHeadset className="ft-btn-icon" aria-hidden />
              <span>Talk to Our Experts</span>
            </button>
            {settings.showAppDownload !== false && (
              <>
                <p className="ft-app-label">Download the EduAitor App</p>
                <div className="ft-badges">
                  <a
                    href={settings.googlePlayUrl || "#"}
                    aria-label="Google Play"
                  >
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                      alt="Get it on Google Play"
                    />
                  </a>
                  <a
                    href={settings.appStoreUrl || "#"}
                    aria-label="App Store"
                  >
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                      alt="Download on the App Store"
                    />
                  </a>
                </div>
              </>
            )}
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
              <p>{settings.address || defaultSettings.address}</p>
            </div>

            <div className="ft-bottom-divider" aria-hidden />

            <div className="ft-contacts">
              {emails.map((email) => (
                <a key={email} href={`mailto:${email}`}>
                <span className="ft-bottom-icon" aria-hidden>
                  <FaEnvelope />
                </span>
                  {email}
                </a>
              ))}
              {phones.map((phone) => (
                <a key={phone} href={`tel:${phone.replace(/[^\d+]/g, "")}`}>
                  <span className="ft-bottom-icon" aria-hidden>
                    <FaPhoneAlt />
                  </span>
                  {phone}
                </a>
              ))}
            </div>

            <div className="ft-bottom-divider" aria-hidden />

            <a
              className="ft-website"
              href={settings.website || "https://www.eduaitor.com"}
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
              <a href={settings.facebook || "#"} aria-label="Facebook">
                <FaFacebookF />
              </a>
              <a href={settings.linkedin || "#"} aria-label="LinkedIn">
                <FaLinkedinIn />
              </a>
              <a href="#" aria-label="YouTube">
                <FaYoutube />
              </a>
              <a href={settings.instagram || "#"} aria-label="Instagram">
                <FaInstagram />
              </a>
            </div>
          </div>

          <div className="ft-copy">
            <span>{settings.copyright || defaultSettings.copyright}</span>
            <nav className="ft-legal" aria-label="Legal">
              {legalItems.map(({ label, to }, i) => (
                <React.Fragment key={to}>
                  {i > 0 && <span className="ft-legal-sep" aria-hidden>|</span>}
                  <NavLink to={to} className="ft-legal-link">
                    {label}
                  </NavLink>
                </React.Fragment>
              ))}
            </nav>
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
