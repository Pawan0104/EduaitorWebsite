import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import {
  FaStar,
  FaGraduationCap,
  FaBrain,
  FaSchool,
  FaMobileAlt,
  FaUserGraduate,
  FaBookOpen,
  FaFileAlt,
  FaChartBar,
  FaMagic,
  FaBriefcase,
  FaCalendarAlt,
  FaHeadset,
  FaRupeeSign,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaGlobe,
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
  FaInstagram,
  FaTwitter,
  FaClock,
  FaHeart,
  FaArrowRight,
} from "react-icons/fa";
import "./Footer.css";
import { useContactPopup } from "../ContactPopup";
import { API_URL } from "../../lib/api";

const DEFAULT_PLAY_URL =
  "https://play.google.com/store/apps/details?id=eduaitor.app";

const productItems = [
  { label: "Features", to: "/ecosystem", icon: FaStar },
  {
    label: "AI Academic Assistant",
    to: "/ai-academic-assistant",
    icon: FaBrain,
  },
  {
    label: "AI Question Paper Generator",
    to: "/ai-question-paper-generator",
    icon: FaFileAlt,
  },
  { label: "AI Worksheet Generator", to: "/ai-worksheet-generator", icon: FaBookOpen },
  { label: "AI Report Card Generator", to: "/ai-report-card-generator", icon: FaGraduationCap },
  { label: "AI School Analytics", to: "/ai-school-analytics", icon: FaChartBar },
];

const solutionItems = [
  {
    label: "School Management Software",
    to: "/school-erp-software/school-management-software",
    icon: FaSchool,
  },
  { label: "AI School ERP", to: "/ai-school-erp", icon: FaBrain },
  {
    label: "Attendance Management",
    to: "/attendance-management-system",
    icon: FaCalendarAlt,
  },
  {
    label: "Fee Management Software",
    to: "/fee-management-software",
    icon: FaRupeeSign,
  },
  {
    label: "Exam Management System",
    to: "/exam-management-system",
    icon: FaFileAlt,
  },
  { label: "Parent Mobile App", to: "/parent-mobile-app", icon: FaMobileAlt },
  {
    label: "Student Information System",
    to: "/student-information-system",
    icon: FaUserGraduate,
  },
  { label: "School LMS", to: "/school-lms", icon: FaBookOpen },
];

// About Us / Our Mission / Our Team / Partners were removed from the column
// and are replaced by a single "Latest Update" tile that links to /about-us.
const companyItems = [
  { label: "IgniteX", to: "/ignitex", icon: FaMagic },
  { label: "Careers", to: "/careers", icon: FaBriefcase },
];

const legalItems = [
  { label: "Privacy Policy", to: "/privacy-policy" },
  { label: "Terms & Conditions", to: "/terms-and-conditions" },
  { label: "Refund & Cancellation Policy", to: "/refund-policy" },
  { label: "Delete Account", to: "/delete-account" },
];

const defaultSettings = {
  siteName: "EduAitor",
  tagline: "Smarter Schools. Stronger Students.",
  description:
    "EduAitor is an AI-powered School Operating System that simplifies operations, empowers educators, engages parents and helps every student reach their full potential.",
  emails: ["hello@eduaitor.com"],
  phones: ["+91 72300 60069"],
  address:
    "EduAitor Technologies Pvt. Ltd. B-28, Sector-63, Noida, Uttar Pradesh - 201301, India",
  googlePlayUrl: DEFAULT_PLAY_URL,
  copyright: "© 2026 EduAitor Technologies Pvt. Ltd. All rights reserved.",
};

function FooterCol({ title, items, colClass, children }) {
  return (
    <div className={colClass ? `ft-col ${colClass}` : "ft-col"}>
      <h3 className="ft-col-title">{title}</h3>
      <ul className="ft-links">
        {items.map(({ label, to, icon: Icon, external }) => (
          <li key={label}>
            {external ? (
              <a
                href={to}
                className="ft-link"
                target="_blank"
                rel="noreferrer"
              >
                <span className="ft-link-left">
                  <Icon className="ft-link-icon" aria-hidden />
                  <span>{label}</span>
                </span>
                <span className="ft-chevron" aria-hidden>
                  ›
                </span>
              </a>
            ) : to.startsWith("/") && !to.includes("#") ? (
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
      {children}
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

  // "Mobile Apps" opens the Google Play listing. Falls back to the ecosystem
  // section when no Play URL has been configured in admin settings.
  const playUrl = (settings.googlePlayUrl || DEFAULT_PLAY_URL).trim();
  const productLinks = [
    {
      label: "Mobile Apps",
      to: playUrl || "/#ecosystem",
      icon: FaMobileAlt,
      external: Boolean(playUrl),
    },
    ...productItems,
  ];

  // Only render icons that actually have a URL, so the footer never shows a
  // dead "#" link. YouTube was previously hardcoded to "#".
  const socialLinks = [
    { key: "facebook", href: settings.facebook, Icon: FaFacebookF, label: "Facebook" },
    { key: "instagram", href: settings.instagram, Icon: FaInstagram, label: "Instagram" },
    { key: "linkedin", href: settings.linkedin, Icon: FaLinkedinIn, label: "LinkedIn" },
    { key: "youtube", href: settings.youtube, Icon: FaYoutube, label: "YouTube" },
    { key: "twitter", href: settings.twitter, Icon: FaTwitter, label: "X (Twitter)" },
  ].filter((s) => (s.href || "").trim());

  return (
    <footer className="footer">
      <div className="ft-top">
        <div className="ft-main">
          <div className="ft-brand">
            <Link to="/" className="ft-logo" aria-label="EduAItor home">
              <img
                src="/logo1-eduaitor-v2.png"
                alt={settings.siteName || "EduAItor"}
                className="ft-logo-img"
              />
            </Link>
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

          <FooterCol title="PRODUCT" items={productLinks} colClass="ft-col--product" />
          <FooterCol title="SOLUTIONS" items={solutionItems} colClass="ft-col--solutions" />
          <FooterCol title="COMPANY" items={companyItems}>
            <NavLink to="/about-us" className="ft-update-tile">
              <span className="ft-update-tile-icon" aria-hidden>
                <FaClock />
              </span>
              <span className="ft-update-tile-body">
                <strong>Latest Update</strong>
                <span>See what's new at EduAitor</span>
              </span>
              <span className="ft-chevron" aria-hidden>
                ›
              </span>
            </NavLink>
          </FooterCol>

          <div className="ft-cta">
            <h3 className="ft-cta-title">
              Let's Build Smarter Schools.{" "}
              <span className="ft-cta-accent">Together.</span>
            </h3>
            <p className="ft-cta-sub">
              Book a demo or connect with our team to see EduAitor in action.
            </p>
            <button
              type="button"
              className="ft-btn ft-btn-primary"
              onClick={() => openContactPopup("footer-book-demo")}
            >
              <FaCalendarAlt className="ft-btn-icon" aria-hidden />
              <span>Book a Demo</span>
              <FaArrowRight className="ft-btn-arrow" aria-hidden />
            </button>
            <button
              type="button"
              className="ft-btn ft-btn-outline"
              onClick={() => openContactPopup("footer-talk-experts")}
            >
              <FaHeadset className="ft-btn-icon" aria-hidden />
              <span>Talk to Our Experts</span>
            </button>
            {settings.showAppDownload !== false && playUrl && (
              <>
                <p className="ft-app-label">Download the EduAitor App</p>
                <div className="ft-badges">
                  <a href={playUrl} target="_blank" rel="noreferrer" aria-label="Google Play">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                      alt="Get it on Google Play"
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
              {socialLinks.map(({ key, href, Icon, label }) => (
                <a
                  key={key}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icon />
                </a>
              ))}
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
