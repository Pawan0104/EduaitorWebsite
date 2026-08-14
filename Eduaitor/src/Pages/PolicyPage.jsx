import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./PolicyPage.css";
import { POLICY_META } from "./policyDefaults";
import { getSettingsCached, peekSettings } from "../lib/settingsCache";

const RESOURCE_META = {
  helpCenter: {
    icon: "❓",
    accent: "blue",
    fallbackTitle: "Help Center",
    fallbackUpdated: "January 15, 2025",
    fallbackSections: [
      {
        heading: "Getting Started",
        content:
          "New to EduAitor? Start with onboarding guides for administrators, teachers, and parents. Set up your school profile, invite users, and configure academic year settings in a few steps.",
      },
      {
        heading: "Common Questions",
        content:
          "Find answers on attendance, fees, exams, reports, and parent communication. Browse by role or topic to resolve issues quickly without waiting for support.",
      },
      {
        heading: "Contact Support",
        content:
          "Still need help? Reach our support team at hello@eduaitor.com or +91 89557 89557. We typically respond within one business day.",
      },
    ],
  },
  knowledgeBase: {
    icon: "📖",
    accent: "teal",
    fallbackTitle: "Knowledge Base",
    fallbackUpdated: "January 15, 2025",
    fallbackSections: [
      {
        heading: "Product Documentation",
        content:
          "Step-by-step articles covering every EduAitor module — admissions, academics, fees, HR, and more. Written for school admins and power users.",
      },
      {
        heading: "Best Practices",
        content:
          "Learn how leading schools configure workflows, automate reminders, and keep parent communication clear and consistent.",
      },
      {
        heading: "Tips & Shortcuts",
        content:
          "Discover time-saving tips for bulk uploads, report templates, role permissions, and dashboard customization.",
      },
    ],
  },
  blogs: {
    icon: "✍️",
    accent: "green",
    fallbackTitle: "Blogs",
    fallbackUpdated: "January 15, 2025",
    fallbackSections: [
      {
        heading: "Education Insights",
        content:
          "Articles on school operations, digital transformation, and how AI supports teachers, parents, and students.",
      },
      {
        heading: "Product Stories",
        content:
          "Behind-the-scenes updates on EduAitor features, customer wins, and lessons from schools using our platform every day.",
      },
      {
        heading: "Stay Informed",
        content:
          "Check back regularly for new posts, or subscribe via our newsletter to get updates in your inbox.",
      },
    ],
  },
  caseStudies: {
    icon: "📊",
    accent: "blue",
    fallbackTitle: "Case Studies",
    fallbackUpdated: "January 15, 2025",
    fallbackSections: [
      {
        heading: "Schools Succeeding with EduAitor",
        content:
          "Real stories from institutions that simplified operations, improved parent engagement, and freed staff time with EduAitor.",
      },
      {
        heading: "Results That Matter",
        content:
          "See measurable outcomes — faster fee collections, clearer attendance, and happier stakeholders across roles.",
      },
      {
        heading: "Share Your Story",
        content:
          "Already using EduAitor? Contact marketing@eduaitor.com if you would like to be featured as a success story.",
      },
    ],
  },
  webinars: {
    icon: "🎬",
    accent: "teal",
    fallbackTitle: "Webinars",
    fallbackUpdated: "January 15, 2025",
    fallbackSections: [
      {
        heading: "Live Sessions",
        content:
          "Join live webinars on product demos, onboarding best practices, and seasonal school-operations topics.",
      },
      {
        heading: "On-Demand Recordings",
        content:
          "Missed a session? Watch recordings and download slide decks when available from this page.",
      },
      {
        heading: "Request a Topic",
        content:
          "Tell us what you want to learn next — email hello@eduaitor.com with your preferred webinar topic.",
      },
    ],
  },
  downloads: {
    icon: "⬇️",
    accent: "green",
    fallbackTitle: "Downloads",
    fallbackUpdated: "January 15, 2025",
    fallbackSections: [
      {
        heading: "Brochures & One-Pagers",
        content:
          "Download product overviews, feature summaries, and pricing explainers to share with your leadership team.",
      },
      {
        heading: "Templates & Guides",
        content:
          "Useful templates for data migration checklists, parent communication samples, and go-live readiness.",
      },
      {
        heading: "Need Something Specific?",
        content:
          "Contact sales@eduaitor.com if you need a custom deck or proposal for your institution.",
      },
    ],
  },
  whatsNew: {
    icon: "✨",
    accent: "blue",
    fallbackTitle: "What's New",
    fallbackUpdated: "January 15, 2025",
    fallbackSections: [
      {
        heading: "Latest Releases",
        content:
          "Highlights of new EduAitor features, improvements, and fixes shipping to schools.",
      },
      {
        heading: "Coming Soon",
        content:
          "A peek at planned enhancements based on feedback from administrators, teachers, and parents.",
      },
      {
        heading: "Feedback Welcome",
        content:
          "Have an idea? Share it with us at hello@eduaitor.com — customer input shapes our roadmap.",
      },
    ],
  },
};

const COMPANY_META = {
  aboutUs: {
    icon: "🏫",
    accent: "blue",
    fallbackTitle: "About Us",
    fallbackUpdated: "January 15, 2025",
    fallbackSections: [
      {
        heading: "Who We Are",
        content:
          "EduAitor is an AI-Powered School Operating System built to help educational institutions simplify operations, empower educators, strengthen parent engagement, and improve student outcomes through one integrated digital ecosystem.",
      },
      {
        heading: "What We Believe",
        content:
          "We believe lasting school transformation comes from practical technology, transparent partnerships, and tools that respect the real workflows of administrators, teachers, parents, and students.",
      },
      {
        heading: "How We Work",
        content:
          "From onboarding and training to ongoing support, our team partners with schools to implement EduAitor with clarity, care, and measurable impact.",
      },
    ],
  },
  ourMission: {
    icon: "🎯",
    accent: "teal",
    fallbackTitle: "Our Mission",
    fallbackUpdated: "January 15, 2025",
    fallbackSections: [
      {
        heading: "Mission",
        content:
          "To empower every school with an intelligent operating system that reduces administrative burden, elevates teaching quality, and creates stronger connections across the education community.",
      },
      {
        heading: "Vision",
        content:
          "A future where every institution — regardless of size or board — can run with clarity, care, and confidence using technology designed for education.",
      },
      {
        heading: "Our Promise",
        content:
          "We build features that solve real school problems, communicate openly, and stand behind every partnership with reliable support.",
      },
    ],
  },
  ourTeam: {
    icon: "👥",
    accent: "green",
    fallbackTitle: "Our Team",
    fallbackUpdated: "January 15, 2025",
    fallbackSections: [
      {
        heading: "People Behind EduAitor",
        content:
          "EduAitor is built by educators, technologists, designers, and support specialists who understand how schools actually work day to day.",
      },
      {
        heading: "Cross-Functional Expertise",
        content:
          "Our product, engineering, success, and sales teams collaborate closely so every release serves administrators, teachers, parents, and students.",
      },
      {
        heading: "Join the Journey",
        content:
          "Want to meet the team or explore opportunities? Reach out at hello@eduaitor.com or visit our Careers page.",
      },
    ],
  },
  careers: {
    icon: "💼",
    accent: "blue",
    badge: "We're hiring",
    sectionTitle: "Why join EduAitor?",
    sectionDesc:
      "We offer meaningful work, growth, and the chance to impact schools across India. If you're ready to be part of something big, apply today.",
    fallbackTitle: "Careers",
    fallbackUpdated: "January 15, 2025",
    fallbackSections: [
      {
        heading: "Welcome",
        content:
          "Do you thrive among brilliant minds who share a passion for education technology? Join EduAitor and help schools operate smarter every day.",
      },
      {
        heading: "Meaningful Impact",
        content:
          "Your work helps institutions simplify operations and support teachers, parents, and students every day.",
      },
      {
        heading: "Growth Culture",
        content:
          "We invest in learning, mentorship, and ownership so you can grow with the product and the company.",
      },
      {
        heading: "Collaborative Teams",
        content:
          "Work alongside product, engineering, success, and sales teammates who care about education outcomes.",
      },
      {
        heading: "How We Hire",
        content:
          "Open roles span product, engineering, customer success, sales, and operations. We value clarity, ownership, and empathy for school users.",
      },
      {
        heading: "Apply Today",
        content:
          "Send your profile and a short note about why EduAitor interests you to hello@eduaitor.com. We'll respond if there's a potential fit.",
      },
    ],
  },
  partners: {
    icon: "🤝",
    accent: "teal",
    fallbackTitle: "Partners",
    fallbackUpdated: "January 15, 2025",
    fallbackSections: [
      {
        heading: "Grow With EduAitor",
        content:
          "We collaborate with technology providers, consultants, resellers, and education networks who help schools adopt modern operating systems.",
      },
      {
        heading: "Partnership Models",
        content:
          "Explore referral, implementation, integration, and channel partnerships tailored to how you support educational institutions.",
      },
      {
        heading: "Become a Partner",
        content:
          "Tell us about your organization and how you'd like to collaborate — email sales@eduaitor.com or hello@eduaitor.com to start the conversation.",
      },
    ],
  },
};

function formatDate(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function resolveMeta(pageKey, section) {
  if (section === "resources") {
    return RESOURCE_META[pageKey] || RESOURCE_META.helpCenter;
  }
  if (section === "company") {
    return COMPANY_META[pageKey] || COMPANY_META.aboutUs;
  }
  return POLICY_META[pageKey] || POLICY_META.termsOfUse;
}

function buildPolicy(metaConfig, data, section, policyKey) {
  const remote = data?.[section]?.[policyKey] || {};
  const sections =
    Array.isArray(remote.sections) && remote.sections.length > 0
      ? remote.sections
      : metaConfig.fallbackSections;

  return {
    enabled: data ? remote.enabled !== false : true,
    title: remote.title || metaConfig.fallbackTitle,
    lastUpdated: remote.lastUpdated || metaConfig.fallbackUpdated,
    sections,
  };
}

export default function PolicyPage({
  policyKey,
  section = "policies",
}) {
  const pageId = `${section}:${policyKey}`;
  const meta = resolveMeta(policyKey, section);

  const [activePageId, setActivePageId] = useState(pageId);
  const [policy, setPolicy] = useState(() =>
    buildPolicy(meta, peekSettings(), section, policyKey)
  );

  // Switch content immediately on navigation (no previous-page flash)
  if (activePageId !== pageId) {
    setActivePageId(pageId);
    setPolicy(buildPolicy(meta, peekSettings(), section, policyKey));
  }

  useEffect(() => {
    let cancelled = false;
    const metaConfig = resolveMeta(policyKey, section);

    getSettingsCached()
      .then((data) => {
        if (cancelled) return;
        setPolicy(buildPolicy(metaConfig, data, section, policyKey));
      })
      .catch((error) => {
        if (cancelled) return;
        console.error("Unable to load page content:", error);
        setPolicy(buildPolicy(metaConfig, null, section, policyKey));
      });

    return () => {
      cancelled = true;
    };
  }, [policyKey, section]);

  if (policy.enabled === false) {
    return (
      <div className="cms">
        <div className="cms__empty">
          <h1>Page unavailable</h1>
          <p>This page is currently disabled.</p>
          <Link to="/" className="cms__home">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const sections = policy.sections || [];
  const introIndex = sections.findIndex((s) =>
    /^(introduction|welcome|overview)$/i.test((s.heading || "").trim())
  );
  const intro = introIndex >= 0 ? sections[introIndex] : null;
  const shortIntro = intro && (intro.content || "").length < 360;
  const bodySections = shortIntro
    ? sections.filter((_, i) => i !== introIndex)
    : sections;

  const avgLen =
    bodySections.reduce((n, s) => n + (s.content || "").length, 0) /
    Math.max(bodySections.length, 1);
  const useFeatureGrid =
    bodySections.length > 0 && avgLen < 380 && bodySections.length <= 12;

  const badge =
    meta.badge ||
    (section === "company"
      ? "Company"
      : section === "resources"
        ? "Resources"
        : "Legal");

  const heroLead =
    meta.lead ||
    (shortIntro ? intro.content : null) ||
    (policy.lastUpdated
      ? `Last updated: ${formatDate(policy.lastUpdated) || policy.lastUpdated}`
      : "");

  return (
    <div className="cms" key={pageId}>
      <section className="cms-hero">
        <div className="cms-hero__inner">
          <span className="cms-badge">{badge}</span>
          <h1 className="cms-hero__title">{policy.title}</h1>
          {heroLead ? <p className="cms-hero__lead">{heroLead}</p> : null}
        </div>
      </section>

      <div className="cms-body">
        {bodySections.length === 0 ? (
          <p className="cms__loading">No content available.</p>
        ) : useFeatureGrid ? (
          <>
            <div className="cms-section-head">
              <h2 className="cms-section-head__title">
                {meta.sectionTitle || `About ${policy.title}`}
              </h2>
              <p className="cms-section-head__desc">
                {meta.sectionDesc ||
                  `Everything you need to know about ${policy.title}.`}
              </p>
            </div>
            <div className="cms-grid">
              {bodySections.map((item, index) => (
                <article
                  key={`${item.heading || "section"}-${index}`}
                  className="cms-card"
                >
                  <div className="cms-card__icon" aria-hidden>
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  {item.heading && (
                    <h3 className="cms-card__title">{item.heading}</h3>
                  )}
                  <p className="cms-card__body">{item.content}</p>
                </article>
              ))}
            </div>
          </>
        ) : (
          <div className="cms-list">
            {bodySections.map((item, index) => (
              <article
                key={`${item.heading || "section"}-${index}`}
                className="cms-panel"
              >
                <div className="cms-panel__top">
                  <span className="cms-panel__num" aria-hidden>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {item.heading && (
                    <h2 className="cms-panel__title">{item.heading}</h2>
                  )}
                </div>
                <p className="cms-panel__body">{item.content}</p>
              </article>
            ))}
          </div>
        )}

        {policy.lastUpdated &&
          !(typeof heroLead === "string" && heroLead.startsWith("Last updated")) && (
          <p className="cms-updated">
            Last updated: {formatDate(policy.lastUpdated) || policy.lastUpdated}
          </p>
        )}
      </div>
    </div>
  );
}
