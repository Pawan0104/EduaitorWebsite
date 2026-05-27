import { useState } from "react";
import "./LegalPage.css";

const termsOfUse = {
  title: "Terms of Use",
  icon: "scroll",
  lastUpdated: "January 15, 2025",
  sections: [
    {
      id: 1,
      heading: "Acceptance of Terms",
      content:
        "By accessing or using EduAItor School Management Software, you agree to be bound by these Terms of Use. If you do not agree to all the terms, you may not access the software. These terms apply to all users including administrators, teachers, students, and parents.",
    },
    {
      id: 2,
      heading: "User Accounts & Responsibilities",
      content:
        "Each user is responsible for maintaining the confidentiality of their login credentials. You agree to notify your school administrator immediately of any unauthorized use of your account. EduAItor is not liable for any loss resulting from unauthorized use of your account.",
    },
    {
      id: 3,
      heading: "Permitted Use",
      content:
        "EduAItor is licensed exclusively for school management purposes including student enrollment, attendance tracking, grading, fee management, and communication between school stakeholders. Any commercial resale or redistribution of the platform is strictly prohibited.",
    },
    {
      id: 4,
      heading: "Intellectual Property",
      content:
        "All content, features, and functionality of EduAItor — including but not limited to text, graphics, logos, and software — are the exclusive property of EduAItor Pvt. Ltd. and are protected by applicable intellectual property laws.",
    },
    {
      id: 5,
      heading: "Termination",
      content:
        "We reserve the right to suspend or terminate access to EduAItor at our sole discretion, without notice, for conduct that we believe violates these Terms of Use or is harmful to other users, us, third parties, or the reputation of EduAItor.",
    },
    {
      id: 6,
      heading: "Limitation of Liability",
      content:
        "EduAItor shall not be held liable for any indirect, incidental, special, or consequential damages arising from the use or inability to use the platform. Our total liability shall not exceed the fees paid by your institution in the last 3 months.",
    },
  ],
};

const privacyPolicy = {
  title: "Privacy Policy",
  icon: "shield-lock",
  lastUpdated: "February 10, 2025",
  sections: [
    {
      id: 1,
      heading: "Information We Collect",
      content:
        "We collect personal information including names, email addresses, student IDs, attendance records, grades, and fee payment details. This data is collected directly from your institution's administrators during onboarding and regular usage.",
    },
    {
      id: 2,
      heading: "How We Use Your Data",
      content:
        "Collected data is used exclusively for operating and improving EduAItor services — including generating reports, sending notifications, and providing analytics dashboards. We do not sell or rent your data to any third party under any circumstances.",
    },
    {
      id: 3,
      heading: "Data Storage & Security",
      content:
        "All data is encrypted in transit using TLS 1.3 and at rest using AES-256 encryption. Our servers are hosted in ISO 27001 certified data centres. We conduct regular security audits and penetration testing to safeguard your institution's data.",
    },
    {
      id: 4,
      heading: "Data Retention",
      content:
        "Student and academic data is retained for the duration of your subscription plus 3 years for compliance purposes. Upon account termination, institutions may request a full data export. All personal data is permanently deleted within 90 days of the retention period.",
    },
    {
      id: 5,
      heading: "Cookies & Tracking",
      content:
        "EduAItor uses essential cookies for session management and optional analytics cookies to improve performance. You can manage cookie preferences in your account settings. We do not use third-party advertising cookies.",
    },
    {
      id: 6,
      heading: "Your Rights",
      content:
        "Institution administrators have the right to access, correct, export, or delete any personal data held within EduAItor. Requests can be made through the admin dashboard or by contacting our Data Protection Officer at privacy@EduAItor.in.",
    },
  ],
};

const helpSupport = {
  title: "Help & Support",
  icon: "headset",
  channels: [
    {
      id: 1,
      icon: "messages",
      label: "Live Chat",
      value: "Available 9 AM – 6 PM IST",
      action: "Start Chat",
      color: "purple",
    },
    {
      id: 2,
      icon: "mail",
      label: "Email Support",
      value: "eduaitor.connect@gmail.com",
      action: "Send Email",
      color: "teal",
    },
    {
      id: 3,
      icon: "phone",
      label: "Phone Support",
      value: "+91 72300 60069",
      action: "Call Now",
      color: "gold",
    },
    {
      id: 4,
      icon: "book",
      label: "Documentation",
      value: "Full user guides & API docs",
      action: "Browse Docs",
      color: "purple",
    },
  ],
  guides: [
    { id: 1, icon: "users", title: "Student Enrollment Guide", tag: "Admin" },
    {
      id: 2,
      icon: "calendar-check",
      title: "Attendance Management Setup",
      tag: "Teacher",
    },
    {
      id: 3,
      icon: "report-money",
      title: "Fee Collection & Invoicing",
      tag: "Finance",
    },
    {
      id: 4,
      icon: "chart-bar",
      title: "Understanding Reports & Analytics",
      tag: "Admin",
    },
    {
      id: 5,
      icon: "device-mobile",
      title: "Mobile App for Parents",
      tag: "Parent",
    },
    {
      id: 6,
      icon: "lock",
      title: "Roles & Permission Management",
      tag: "Admin",
    },
  ],
};

const faqs = {
  title: "Frequently Asked Questions",
  icon: "help-circle",
  categories: [
    {
      id: 1,
      category: "Getting Started",
      color: "purple",
      icon: "rocket",
      questions: [
        {
          id: "gs1",
          q: "How do I set up EduAItor for my school?",
          a: "After subscribing, our onboarding team will schedule a setup call within 24 hours. We'll help you import student data, configure fee structures, set up academic years, and train your staff — all within 3–5 business days.",
        },
        {
          id: "gs2",
          q: "Can I migrate data from my existing software?",
          a: "Yes. EduAItor supports bulk data import via Excel/CSV for students, staff, classes, and fee records. Our migration specialists will assist you to ensure a smooth and accurate transfer.",
        },
        {
          id: "gs3",
          q: "Is there a free trial available?",
          a: "We offer a demo free trial with access to all features. No credit card is required. Contact us or fill book a demo request to initiate the free trial.",
        },
      ],
    },
    {
      id: 2,
      category: "Billing & Plans",
      color: "gold",
      icon: "credit-card",
      questions: [
        {
          id: "bp1",
          q: "How is pricing calculated?",
          a: "Pricing is based on the number of active students enrolled in your institution. We offer tiered plans for schools with up to 500, 1000, 2500, and 5000+ students. Annual subscriptions receive a 20% discount over monthly billing.",
        },
        {
          id: "bp2",
          q: "What payment methods are accepted?",
          a: "We accept UPI, NEFT/RTGS, credit/debit cards, and demand drafts for institutional billing. GST invoices are generated automatically for every transaction.",
        },
        {
          id: "bp3",
          q: "Can I upgrade or downgrade my plan?",
          a: "Yes, you can upgrade your plan at any time from the admin billing dashboard. Downgrades take effect at the start of the next billing cycle. Unused days are prorated and credited to your account.",
        },
      ],
    },
    {
      id: 3,
      category: "Technical",
      color: "teal",
      icon: "settings",
      questions: [
        {
          id: "t1",
          q: "What devices and browsers are supported?",
          a: "EduAItor works on all modern browsers (Chrome, Firefox, Safari, Edge). The admin dashboard is optimised for desktop while the parent and student portals are fully mobile-responsive. Native Android and iOS apps are also available.",
        },
        {
          id: "t2",
          q: "Is internet required at all times?",
          a: "The core platform requires a stable internet connection. However, the teacher's attendance module supports offline marking which auto-syncs once connectivity is restored.",
        },
        {
          id: "t3",
          q: "How often is the software updated?",
          a: "We deploy minor updates and bug fixes weekly. Major feature releases happen every quarter. All updates are pushed automatically with zero downtime during off-peak hours (1 AM – 4 AM IST).",
        },
      ],
    },
  ],
};

const TAB_META = [
  { key: "terms", label: "Terms of Use", icon: "📜" },
  { key: "privacy", label: "Privacy Policy", icon: "🔒" },
  { key: "help", label: "Help & Support", icon: "🎧" },
  { key: "faq", label: "FAQs", icon: "❓" },
];

/* ── Terms of Use ─────────────────────────────────────── */
function TermsPage() {
  const { title, lastUpdated, sections } = termsOfUse;
  return (
    <div className="lp-page">
      <div className="lp-page-header">
        <span className="lp-page-icon">📜</span>
        <div>
          <h2 className="lp-page-title">{title}</h2>
          <p className="lp-page-meta">Last updated: {lastUpdated}</p>
        </div>
      </div>
      <div className="lp-sections">
        {sections.map((s) => (
          <div key={s.id} className="lp-section-card">
            <div className="lp-section-num">
              {String(s.id).padStart(2, "0")}
            </div>
            <div>
              <h3 className="lp-section-heading">{s.heading}</h3>
              <p className="lp-section-body">{s.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Privacy Policy ───────────────────────────────────── */
function PrivacyPage() {
  const { title, lastUpdated, sections } = privacyPolicy;
  return (
    <div className="lp-page">
      <div className="lp-page-header">
        <span className="lp-page-icon">🔒</span>
        <div>
          <h2 className="lp-page-title">{title}</h2>
          <p className="lp-page-meta">Last updated: {lastUpdated}</p>
        </div>
      </div>
      <div className="lp-sections">
        {sections.map((s) => (
          <div key={s.id} className="lp-section-card lp-section-card--teal">
            <div className="lp-section-num lp-section-num--teal">
              {String(s.id).padStart(2, "0")}
            </div>
            <div>
              <h3 className="lp-section-heading">{s.heading}</h3>
              <p className="lp-section-body">{s.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Help & Support ───────────────────────────────────── */
function HelpPage() {
  const { title, channels, guides } = helpSupport;
  const colorMap = {
    purple: "lp-channel-card--purple",
    teal: "lp-channel-card--teal",
    gold: "lp-channel-card--gold",
  };
  return (
    <div className="lp-page">
      <div className="lp-page-header">
        <span className="lp-page-icon">🎧</span>
        <div>
          <h2 className="lp-page-title">{title}</h2>
          <p className="lp-page-meta">
            We're here to help you get the most out of EduAItor
          </p>
        </div>
      </div>

      <h3 className="lp-sub-heading">Contact Channels</h3>
      <div className="lp-channels-grid">
        {channels.map((c) => (
          <div
            key={c.id}
            className={`lp-channel-card ${colorMap[c.color] ?? ""}`}
          >
            <div className="lp-channel-label">{c.label}</div>
            <div className="lp-channel-value">{c.value}</div>
            <button className="lp-channel-btn">{c.action} →</button>
          </div>
        ))}
      </div>

      <h3 className="lp-sub-heading" style={{ marginTop: "2rem" }}>
        Popular Guides
      </h3>
      <div className="lp-guides-grid">
        {guides.map((g) => (
          <div key={g.id} className="lp-guide-card">
            <div className="lp-guide-tag">{g.tag}</div>
            <p className="lp-guide-title">{g.title}</p>
            <span className="lp-guide-link">Read guide →</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── FAQs ─────────────────────────────────────────────── */
function FAQPage() {
  const [open, setOpen] = useState(null);
  const { title, categories } = faqs;

  const colorMap = {
    purple: "lp-faq-category--purple",
    gold: "lp-faq-category--gold",
    teal: "lp-faq-category--teal",
  };

  return (
    <div className="lp-page">
      <div className="lp-page-header">
        <span className="lp-page-icon">❓</span>
        <div>
          <h2 className="lp-page-title">{title}</h2>
          <p className="lp-page-meta">
            Find quick answers to the most common questions
          </p>
        </div>
      </div>

      {categories.map((cat) => (
        <div key={cat.id} className="lp-faq-category">
          <div className={`lp-faq-cat-label ${colorMap[cat.color] ?? ""}`}>
            {cat.category}
          </div>
          <div className="lp-faq-list">
            {cat.questions.map((item) => {
              const isOpen = open === item.id;
              return (
                <div
                  key={item.id}
                  className={`lp-faq-item ${isOpen ? "lp-faq-item--open" : ""}`}
                  onClick={() => setOpen(isOpen ? null : item.id)}
                >
                  <div className="lp-faq-q">
                    <span>{item.q}</span>
                    <span className="lp-faq-chevron">{isOpen ? "▲" : "▼"}</span>
                  </div>
                  {isOpen && <p className="lp-faq-a">{item.a}</p>}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Root Component ───────────────────────────────────── */
export default function LegalPage() {
  const [active, setActive] = useState("terms");

  const pageMap = {
    terms: <TermsPage />,
    privacy: <PrivacyPage />,
    help: <HelpPage />,
    faq: <FAQPage />,
  };

  return (
    <div className="lp-root">
      {/* Tab Bar */}
      <nav className="lp-tabs" role="tablist">
        {TAB_META.map((t) => (
          <button
            key={t.key}
            role="tab"
            aria-selected={active === t.key}
            className={`lp-tab ${active === t.key ? "lp-tab--active" : ""}`}
            onClick={() => setActive(t.key)}
          >
            <span className="lp-tab-icon" aria-hidden="true">
              {t.icon}
            </span>
            <span className="lp-tab-label">{t.label}</span>
          </button>
        ))}
      </nav>

      {/* Content */}
      <div className="lp-content">{pageMap[active]}</div>
    </div>
  );
}
