import React from "react";
import { useState } from "react";
import "./Plans.css";
import { DiGoogleAnalytics } from "react-icons/di";
import { TbSettingsAutomation } from "react-icons/tb";
import { RiSecurePaymentLine } from "react-icons/ri";

import PricingFAQ from "../Components/PlansPage-Components/PricingFAQ";
import { NavLink } from "react-router-dom";
import PricingSection from "./PricingSection";

const plansData = [
  {
    id: 1,
    name: "Base",
    short: "Streamline essentials and manage core operations.",
    CTA: "Request Demo",
    price: { monthly: 10, yearly: 8 },
    highlight: false,
    features: [
      "Enquiry / Admission",
      "Student Information Management",
      "Fee Management (Online / Offline)",
      "Analytics Dashboard",
      "SMS Integration",
      "Student Attendance",
    ],
  },
  {
    id: 2,
    name: "Premium",
    short: "Advanced integrations and multi-branch control.",
    CTA: "Request Demo",
    price: { monthly: 15, yearly: 12 },
    highlight: true,
    features: [
      "Everything in Base",
      "Online Exams",
      "Timetable with Substitution",
      "Library Management",
      "Expense Management",
      "Unlimited Custom Reports",
      "Online Classes with Recording",
      "Student Wallet",
      "Vendor Management",
      "Website Management",
      "Rest API Access",
    ],
  },
];

const faqData = [
  {
    question: "Is there a free trial?",
    answer:
      "Yes, we provide a demo and limited trial so you can explore all features before committing.",
  },
  {
    question: "Can I upgrade anytime?",
    answer:
      "Yes, you can upgrade or switch plans anytime as your institution grows.",
  },
  {
    question: "Is training included?",
    answer:
      "We provide complete onboarding and training for administrators and staff.",
  },
  {
    question: "Do you provide onboarding?",
    answer:
      "Yes, our team helps with setup, migration, and implementation support.",
  },
  {
    question: "Is data secure?",
    answer:
      "We use enterprise-level encryption and secure cloud infrastructure to protect your institutional data.",
  },
  {
    question: "Can I customize features?",
    answer:
      "Customization and API integrations are available in higher-tier plans.",
  },
];

const comparisonData = [
  {
    category: "Core Management",
    rows: [
      { feature: "Student Information Management", base: true, premium: true },
      { feature: "Enquiry / Admission", base: true, premium: true },
      { feature: "Student Attendance", base: true, premium: true },
      { feature: "Analytics Dashboard", base: true, premium: true },
      { feature: "SMS Integration", base: true, premium: true },
    ],
  },
  {
    category: "Fee & Finance",
    rows: [
      { feature: "Fee Management (Online / Offline)", base: true, premium: true },
      { feature: "Expense Management", base: false, premium: true },
      { feature: "Student Wallet", base: false, premium: true },
      { feature: "Vendor Management", base: false, premium: true },
    ],
  },
  {
    category: "Academics",
    rows: [
      { feature: "Online Exams", base: false, premium: true },
      { feature: "Timetable with Substitution", base: false, premium: true },
      { feature: "Library Management", base: false, premium: true },
      { feature: "Online Classes with Recording", base: false, premium: true },
      { feature: "Unlimited Custom Reports", base: false, premium: true },
    ],
  },
  {
    category: "Advanced",
    rows: [
      { feature: "Website Management", base: false, premium: true },
      { feature: "Rest API Access", base: false, premium: true },
    ],
  },
];

const STUDENT_PRESETS = [100, 250, 500, 1000, 2000];

const Plans = () => {
  const [billing, setBilling] = useState("monthly");
  const [students, setStudents] = useState(250);
  const [customStudents, setCustomStudents] = useState("");
 
  const effectiveStudents =
    customStudents !== ""
      ? Math.max(1, parseInt(customStudents) || 1)
      : students;
  return (
    <div className="pricing-page">
      {/* TOP HEADING */}
      <section className="pricing-header">
        <h1>
          {" "}
          <span> Flexible </span>Plans for Every Institution
        </h1>
        <p>Choose the right solution to digitize and scale your institution.</p>
      </section>

      {/* PLAN CARDS */}
    <PricingSection />

      {/* FEATURES SECTION */}
      <section className="feature-highlight">
        <div className="feature-container">
          <h2>Powerful Features That Drive Growth</h2>
          <p className="feature-sub">
            Built to simplify operations and improve institutional performance.
          </p>

          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon-title">
                <div className="icon-circle">
                  <DiGoogleAnalytics />
                </div>
                <h3>Smart Analytics</h3>
              </div>
              <p>
                Track performance with real-time dashboards and detailed
                insights.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-title">
                <div className="icon-circle">
                  <TbSettingsAutomation />
                </div>
                <h3>Automation</h3>
              </div>
              <p>
                Reduce manual work using automated workflows and smart triggers.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-title">
                <div className="icon-circle">
                  <RiSecurePaymentLine />
                </div>
                <h3>Secure Data</h3>
              </div>
              <p>Enterprise-grade security ensures student data protection.</p>
            </div>
          </div>
        </div>
      </section>

      {/* COMPARISON */}
     <section className="comparison-section">
        <div className="comparison-container">
          <h2>Compare Plans</h2>
          <p className="comparison-sub">
            See exactly what each plan includes — no guesswork.
          </p>
 
          <div className="comparison-table">
            {/* Sticky Header */}
            <div className="comparison-header">
              <div>Features</div>
              <div className="col-plan">
                <span className="header-plan-name">Base</span>
              </div>
              <div className="col-plan">
                <span className="header-plan-name">Premium</span>
                <span className="header-popular-pill">Most Popular</span>
              </div>
            </div>
 
            {/* Category groups */}
            {comparisonData.map((group, gi) => (
              <div className="category-group" key={gi}>
                <div className="category-label">
                  <div>{group.category}</div>
                  <div className="col-premium" />
                  <div className="col-premium" />
                </div>
 
                {group.rows.map((row, ri) => (
                  <div
                    className="comparison-row"
                    key={ri}
                    style={{ animationDelay: `${(gi * 5 + ri) * 0.04}s` }}
                  >
                    <div>{row.feature}</div>
 
                    {/* Base */}
                    <div className="col-plan-cell">
                      <span className={row.base ? "icon-check" : "icon-cross"}>
                        {row.base ? (
                          <svg width="11" height="11" viewBox="0 0 10 10" fill="none">
                            <polyline
                              points="2,5 4.5,7.5 8,3"
                              stroke="#7b4dc4"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        ) : (
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                            <line x1="3" y1="3" x2="7" y2="7" stroke="#d1d5db" strokeWidth="1.6" strokeLinecap="round" />
                            <line x1="7" y1="3" x2="3" y2="7" stroke="#d1d5db" strokeWidth="1.6" strokeLinecap="round" />
                          </svg>
                        )}
                      </span>
                    </div>
 
                    {/* Premium */}
                    <div className="col-plan-cell col-premium">
                      <span className={row.premium ? "icon-check" : "icon-cross"}>
                        {row.premium ? (
                          <svg width="11" height="11" viewBox="0 0 10 10" fill="none">
                            <polyline
                              points="2,5 4.5,7.5 8,3"
                              stroke="#7b4dc4"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        ) : (
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                            <line x1="3" y1="3" x2="7" y2="7" stroke="#d1d5db" strokeWidth="1.6" strokeLinecap="round" />
                            <line x1="7" y1="3" x2="3" y2="7" stroke="#d1d5db" strokeWidth="1.6" strokeLinecap="round" />
                          </svg>
                        )}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <PricingFAQ faqs={faqData} />
    </div>
  );
};

export default Plans;
