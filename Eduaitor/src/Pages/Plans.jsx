import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Icons } from "../Components/icons";
import { useContactPopup } from "../Components/ContactPopup";
import "./Plans.css";

/** Fresh clone so the same icon can appear multiple times on one page */
const ic = (node) => (node ? React.cloneElement(node) : null);

const formatINR = (n) =>
  n == null || Number.isNaN(n)
    ? "—"
    : new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }).format(n);

const PRESETS = [250, 500, 750, 1000];

const included = [
  {
    title: "School Administration",
    desc: "Manage students, staff, attendance, timetable, communication & more.",
    color: "blue",
    icon: Icons.school,
  },
  {
    title: "Admissions & Leads",
    desc: "Enquiry to admission tracking, document management & follow-ups.",
    color: "green",
    icon: Icons.userPlus,
  },
  {
    title: "Academics & Examinations",
    desc: "Curriculum planning, homework, assignments, exam scheduling, results & report cards.",
    color: "purple",
    icon: Icons.book,
  },
  {
    title: "AI Assessment Generator",
    desc: "Create chapter-wise/unit-wise tests, worksheets & question papers in seconds.",
    color: "orange",
    icon: Icons.ai,
  },
  {
    title: "AI Academic Assistant",
    desc: "24x7 AI tutor for students. Doubt solving, explanations, summaries & more.",
    color: "teal",
    icon: Icons.bot,
  },
  {
    title: "Parent Empowerment Suite",
    desc: "Smart dashboards, test creation, homework alerts, communication & more.",
    color: "pink",
    icon: Icons.users,
  },
  {
    title: "Student Success Platform",
    desc: "Personalized learning, progress tracking & engagement tools.",
    color: "teal",
    icon: Icons.trending,
  },
  {
    title: "Predictive Analytics",
    desc: "AI-powered insights to predict performance, risks, subject challenges & trends.",
    color: "blue",
    icon: Icons.chart,
  },
  {
    title: "Finance & Fee Management",
    desc: "Fee collection, invoices, expenses, payroll & financial reports.",
    color: "green",
    icon: Icons.rupee,
  },
  {
    title: "Communication Suite",
    desc: "SMS, email, WhatsApp notifications & in-app announcements.",
    color: "navy",
    icon: Icons.chat,
  },
  {
    title: "Transport Management",
    desc: "Real-time vehicle tracking, route optimization & transport alerts.",
    color: "orange",
    icon: Icons.bus,
  },
  {
    title: "Library Management",
    desc: "Cataloging, issue/return, digital library & resource management.",
    color: "purple",
    icon: Icons.library,
  },
  {
    title: "Hostel Management",
    desc: "Room allocation, attendance, mess management & student support.",
    color: "purple",
    icon: Icons.bed,
  },
  {
    title: "School Commerce Suite",
    desc: "Manage school store, inventory, billing & purchases.",
    color: "pink",
    icon: Icons.cart,
  },
  {
    title: "Mobile Apps",
    desc: "Feature-rich Android & iOS apps for all stakeholders.",
    color: "blue",
    icon: Icons.phone,
  },
  {
    title: "Security & Permissions",
    desc: "Role-based access, data protection, end-to-end encryption.",
    color: "green",
    icon: Icons.lock,
  },
  {
    title: "Integrations",
    desc: "WhatsApp, payment gateways, biometric, GPS, virtual classrooms & more.",
    color: "purple",
    icon: Icons.link,
  },
  {
    title: "Future Updates",
    desc: "All future updates & new features included at no extra cost.",
    color: "blue",
    icon: Icons.refresh,
  },
];

const loveItems = [
  {
    title: "Everything Included",
    desc: "All features. All modules. No exceptions.",
    icon: Icons.star,
  },
  {
    title: "No Hidden Costs",
    desc: "What you see is what you pay. Always.",
    icon: Icons.eye,
  },
  {
    title: "No Feature Restrictions",
    desc: "Every school gets the complete platform.",
    icon: Icons.grid,
  },
  {
    title: "Unbeatable Value",
    desc: "Complete school operating system at an unbelievable price.",
    icon: Icons.rupee,
  },
  {
    title: "Future Ready",
    desc: "All future updates and innovations included.",
    icon: Icons.rocket,
  },
];

const promises = [
  {
    title: "Fair & Equal",
    desc: "Every school gets the same powerful platform and the same value.",
    icon: Icons.scales,
  },
  {
    title: "Affordable & Transparent",
    desc: "One simple price that fits schools of every size and budget.",
    icon: Icons.tag,
  },
  {
    title: "Future-Ready",
    desc: "All future updates and innovations included in your plan.",
    icon: Icons.rocket,
  },
  {
    title: "No Hidden Costs",
    desc: "No add-ons. No surprises. What you see is what you get.",
    icon: Icons.eye,
  },
  {
    title: "Save Time",
    desc: "No comparing plans. No managing upgrades. Just focus on education.",
    icon: Icons.clock,
  },
  {
    title: "Built on Trust",
    desc: "Honest pricing reflects our commitment to long-term partnerships.",
    icon: Icons.handshake,
  },
];

const enterpriseFeatures = [
  {
    title: "Multi-Campus & Multi-branch Management",
    desc: "Centralized control across every campus and branch.",
  },
  {
    title: "Custom Integrations",
    desc: "Connect your existing systems and workflows.",
  },
  {
    title: "White-label Platform",
    desc: "Your brand. Your identity. Fully customized.",
  },
  {
    title: "Dedicated Onboarding & Training",
    desc: "Hands-on setup and team enablement.",
  },
  {
    title: "Dedicated Success Manager",
    desc: "A partner invested in your long-term outcomes.",
  },
  {
    title: "Priority Support",
    desc: "Faster response when your institution needs it most.",
  },
];

const heroBar = [
  { label: "All Features Included", icon: Icons.grid },
  { label: "All Updates Included", icon: Icons.refresh },
  { label: "All Schools Included", icon: Icons.school },
  { label: "100% Secure & Reliable", icon: Icons.lock },
  { label: "Always Available Anywhere", icon: Icons.globe },
];

const onePlanFeatures = [
  { label: "All Features Included", icon: Icons.grid },
  { label: "All Modules Included", icon: Icons.school },
  { label: "All Future Updates", icon: Icons.refresh },
  { label: "Mobile Apps Included", icon: Icons.phone },
  { label: "Enterprise Security", icon: Icons.lock },
  { label: "Dedicated Support", icon: Icons.headset },
];

const orbit = [
  { label: "Smarter Administration", top: "6%", left: "30%", icon: Icons.school },
  { label: "Successful Students", top: "28%", left: "88%", icon: Icons.cap },
  { label: "Data-Driven Decisions", top: "72%", left: "82%", icon: Icons.chart },
  { label: "Empowered Teachers", top: "78%", left: "18%", icon: Icons.teach },
  { label: "Engaged Parents", top: "28%", left: "12%", icon: Icons.users },
];

const trustItems = [
  { title: "100% Transparent", desc: "No hidden charges. No surprises.", icon: Icons.eye },
  { title: "All Future Updates", desc: "New features. Always included.", icon: Icons.refresh },
  { title: "100% Secure", desc: "Your data is safe. Always.", icon: Icons.lock },
  { title: "Dedicated Support", desc: "We're always here to help you.", icon: Icons.headset },
];

export default function Plans() {
  const [preset, setPreset] = useState(null);
  const [custom, setCustom] = useState(true);
  const [studentsInput, setStudentsInput] = useState("");
  const [billing, setBilling] = useState("monthly");
  const { openContactPopup } = useContactPopup();

  const students = useMemo(() => {
    const n = parseInt(studentsInput, 10);
    if (Number.isFinite(n) && n > 0) return n;
    if (!custom && preset) return preset;
    return 0;
  }, [custom, studentsInput, preset]);

  const { monthlyCost, annualCost, savings } = useMemo(() => {
    if (students <= 0) {
      return { monthlyCost: null, annualCost: null, savings: null };
    }
    // ₹1 per student per day → monthly base = students × 30
    const monthlyBase = students * 30;
    const annualFull = monthlyBase * 12;
    const annualDiscounted = Math.round(annualFull * 0.75);

    if (billing === "annual") {
      return {
        monthlyCost: Math.round(monthlyBase * 0.75),
        annualCost: annualDiscounted,
        savings: annualFull - annualDiscounted,
      };
    }

    return {
      monthlyCost: monthlyBase,
      annualCost: annualFull,
      savings: 0,
    };
  }, [students, billing]);

  const pickPreset = (n) => {
    setCustom(false);
    setPreset(n);
    setStudentsInput(String(n));
  };

  const pickCustom = () => {
    setCustom(true);
    setPreset(null);
  };

  return (
    <div className="pp">
      {/* 1 — Hero */}
      <section className="pp-hero">
        <div className="pp-container pp-hero__grid">
          <div className="pp-hero__copy">
            <span className="pp-pill">PRICING THAT'S SIMPLE. VALUE THAT'S COMPLETE.</span>
            <h1>
              One Simple Plan.
              <span> Everything Included.</span>
            </h1>
            <ul className="pp-checks">
              <li>No hidden costs.</li>
              <li>No confusing packages.</li>
              <li>No feature restrictions.</li>
            </ul>
            <p className="pp-hero__sub">
              One platform. One price. <em>Total peace of mind.</em>
            </p>
            <div className="pp-hero__bar">
              {heroBar.map((t) => (
                <div key={t.label} className="pp-hero__bar-item">
                  <span className="pp-hero__bar-dot" aria-hidden="true">
                    {ic(t.icon)}
                  </span>
                  <span>{t.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pp-hero__visual">
            <div className="pp-hero__orbit" aria-hidden="true">
              <div className="pp-hero__ai">{ic(Icons.sparkles)}</div>
              {orbit.map((o) => (
                <div
                  key={o.label}
                  className="pp-hero__orbit-item"
                  style={{ top: o.top, left: o.left }}
                >
                  <span className="pp-hero__orbit-dot">{ic(o.icon)}</span>
                  <span>{o.label}</span>
                </div>
              ))}
            </div>
            <img
              src="/pricing/pricing-hero.png"
              alt="Teacher and student using EduAitor"
              className="pp-hero__photo"
            />
          </div>
        </div>

        <div className="pp-container">
          <div className="pp-promise">
            <div className="pp-promise__badge">Our Promise</div>
            <div className="pp-promise__text">
              <strong>Every Feature. Every Update. Every School.</strong>
              <span>No hidden costs. No feature restrictions. No complicated plans.</span>
            </div>
            <p className="pp-promise__script">Built for Schools. Designed for Impact.</p>
          </div>
        </div>
      </section>

      {/* 2 — Why One Plan */}
      <section className="pp-why">
        <div className="pp-container pp-why__grid">
          <div className="pp-why__copy">
            <p className="pp-eyebrow">— WHY WE CHOSE ONE PLAN —</p>
            <h2>
              Better Education Should Be <span>Simple.</span>
            </h2>
            <p>
              Instead of asking schools to compare Bronze, Silver, Gold, and Platinum—we decided
              to build one complete platform where every school gets every feature.
            </p>
            <div className="pp-why__callout">
              <span className="pp-why__heart" aria-hidden="true">
                {ic(Icons.heart)}
              </span>
              <p>Because better education shouldn't depend on which package you buy.</p>
            </div>
          </div>

          <div className="pp-why__compare">
            <div className="pp-old">
              <h3>The Old Way — Multiple Plans. Missing Features.</h3>
              <div className="pp-old__table">
                {["BRONZE", "SILVER", "GOLD", "PLATINUM"].map((tier, ti) => (
                  <div key={tier} className={`pp-old__col pp-old__col--${ti}`}>
                    <span>{tier}</span>
                    {[0, 1, 2, 3, 4].map((r) => (
                      <i key={r} className={r <= ti ? "is-yes" : "is-no"}>
                        {r <= ti ? "✓" : "✕"}
                      </i>
                    ))}
                  </div>
                ))}
              </div>
              <div className="pp-old__foot">
                More Plans. More Confusion. More Cost. Still Not Complete.
              </div>
            </div>

            <div className="pp-why__arrow" aria-hidden="true">
              →
            </div>

            <div className="pp-new">
              <h3>The EduAitor Way — One Plan. Everything Included.</h3>
              <div className="pp-new__brand">EduAitor ONE</div>
              <ul>
                <li>All Features</li>
                <li>All Modules</li>
                <li>All Updates</li>
                <li>All Schools</li>
                <li>One Simple Price</li>
              </ul>
              <div className="pp-new__foot">One Plan. Complete Platform. Total Peace of Mind.</div>
            </div>
          </div>
        </div>

        <div className="pp-container pp-values">
          {promises.map((p) => (
            <div className="pp-value" key={p.title}>
              <span className="pp-value__icon" aria-hidden="true">
                {ic(p.icon)}
              </span>
              <strong>{p.title}</strong>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>

        <div className="pp-container">
          <div className="pp-mission">
            <span className="pp-mission__cap" aria-hidden="true">
              {ic(Icons.cap)}
            </span>
            <p>
              One complete platform. One honest price. One mission—
              <em> student success.</em>
            </p>
          </div>
        </div>
      </section>

      {/* 3 — Choose Path */}
      <section className="pp-path">
        <div className="pp-container">
          <div className="pp-path__head">
            <h2>Choose the Right Path for Your School</h2>
            <p>One Platform. Two Powerful Solutions. Built for Every Kind of Institution.</p>
          </div>

          <div className="pp-path__grid">
            <article className="pp-one">
              <div className="pp-one__ribbon">MOST POPULAR</div>
              <div className="pp-one__top">
                <h3>
                  <span className="pp-one__star" aria-hidden="true">
                    {ic(Icons.star)}
                  </span>
                  EDUAITOR ONE
                  <span className="pp-one__star" aria-hidden="true">
                    {ic(Icons.star)}
                  </span>
                </h3>
                <span>For Individual Schools</span>
                <p>One Simple Plan. Everything Included.</p>
                <em>One Platform. One Price. Total Peace of Mind.</em>
              </div>
              <div className="pp-one__rates">
                <div className="pp-one__rate">
                  <span className="pp-one__tag">BILLED MONTHLY</span>
                  <strong>
                    ₹1 <small>per day per student</small>
                  </strong>
                  <p>Billed Monthly</p>
                </div>
                <div className="pp-one__rate pp-one__rate--annual">
                  <span className="pp-one__save">25% SAVINGS</span>
                  <span className="pp-one__tag pp-one__tag--green">BILLED ANNUALLY</span>
                  <strong>
                    ₹0.75 <small>per day per student</small>
                  </strong>
                  <p>Billed Annually</p>
                </div>
              </div>
              <div className="pp-one__included">
                <strong className="pp-one__included-title">Everything Included in One Plan</strong>
                <div className="pp-one__included-grid">
                  {onePlanFeatures.map((feature) => (
                    <div key={feature.label} className="pp-one__included-item">
                      <span aria-hidden="true">{ic(feature.icon)}</span>
                      <strong>{feature.label}</strong>
                    </div>
                  ))}
                </div>
              </div>
              <div className="pp-one__foot">
                Every Feature. Every Update. Every School. No hidden costs. No feature
                restrictions. No complicated plans.
              </div>
            </article>

            <article className="pp-ent">
              <div className="pp-ent__head">
                <span className="pp-ent__icon" aria-hidden="true">
                  {ic(Icons.building)}
                </span>
                <h3>EDUAITOR ENTERPRISE</h3>
                <p className="pp-ent__for">— For School Groups & Large Institutions —</p>
                <p className="pp-ent__desc">
                  A powerful, scalable solution for multi-campus groups with advanced needs and
                  custom requirements.
                </p>
              </div>
              <ul className="pp-ent__list">
                {enterpriseFeatures.map((f) => (
                  <li key={f.title}>
                    <strong>{f.title}</strong>
                    <span>{f.desc}</span>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className="pp-ent__cta"
                onClick={() => openContactPopup("plans-enterprise")}
              >
                <span>
                  Let's Build the Right Solution for You
                  <small>Talk to our Enterprise Team</small>
                </span>
                <span aria-hidden="true">→</span>
              </button>
            </article>
          </div>

          <div className="pp-trust">
            <div className="pp-trust__items">
              {trustItems.map((t) => (
                <div key={t.title}>
                  <span className="pp-trust__icon" aria-hidden="true">
                    {ic(t.icon)}
                  </span>
                  <strong>{t.title}</strong>
                  <p>{t.desc}</p>
                </div>
              ))}
            </div>
            <div className="pp-trust__promise">
              <strong>Better Education. Made Affordable.</strong>
              <span className="pp-promise__script">That's Our Promise.</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4 — Calculator */}
      <section className="pp-calc" id="calculator">
        <div className="pp-container">
          <div className="pp-calc__head">
            <p className="pp-eyebrow">— COST CALCULATOR —</p>
            <h2>Simple to Understand. Easy to Plan.</h2>
            <p className="pp-calc__lead">
              See how affordable complete school management can be.
            </p>
          </div>

          <div className="pp-calc__highlights">
            <div className="pp-calc__highlight">
              <span className="pp-calc__bullet-icon" aria-hidden="true">
                {ic(Icons.sparkles)}
              </span>
              <div>
                <strong>Instant Calculation</strong>
                <span>Get your monthly and annual cost in seconds.</span>
              </div>
            </div>
            <div className="pp-calc__highlight">
              <span className="pp-calc__bullet-icon" aria-hidden="true">
                {ic(Icons.rupee)}
              </span>
              <div>
                <strong>Transparent Pricing</strong>
                <span>₹1 per student per day. Billed Monthly or Annually.</span>
              </div>
            </div>
            <div className="pp-calc__highlight">
              <span className="pp-calc__bullet-icon" aria-hidden="true">
                {ic(Icons.trending)}
              </span>
              <div>
                <strong>Maximum Savings</strong>
                <span>Save 25% with Annual Billing.</span>
              </div>
            </div>
          </div>

          <div className="pp-calc__grid">
            <div className="pp-calc__card">
              <h3>Calculate Your School's Investment</h3>
              <p className="pp-calc__tagline">One Simple Plan. One Affordable Price.</p>

              <div className="pp-calc__step">
                <label>1. How many students are in your school?</label>
                <div className="pp-calc__presets">
                  {PRESETS.map((n) => (
                    <button
                      key={n}
                      type="button"
                      className={!custom && preset === n ? "is-active" : ""}
                      onClick={() => pickPreset(n)}
                    >
                      {n}
                    </button>
                  ))}
                  <button
                    type="button"
                    className={`pp-calc__custom-btn${custom ? " is-active" : ""}`}
                    onClick={pickCustom}
                  >
                    Custom
                  </button>
                </div>
                <div className="pp-calc__input">
                  <span aria-hidden="true">{ic(Icons.cap)}</span>
                  <input
                    type="number"
                    min="1"
                    placeholder="Enter number of students"
                    value={studentsInput}
                    onChange={(e) => {
                      setCustom(true);
                      setPreset(null);
                      setStudentsInput(e.target.value);
                    }}
                  />
                </div>
              </div>

              <div className="pp-calc__step">
                <label>2. Choose Your Billing Option</label>
                <div className="pp-calc__billing">
                  <button
                    type="button"
                    className={billing === "monthly" ? "is-active" : ""}
                    onClick={() => setBilling("monthly")}
                  >
                    <span className="pp-calc__bill-icon" aria-hidden="true">
                      {ic(Icons.calendar)}
                    </span>
                    <div>
                      <strong>Monthly Billing</strong>
                      <small>Pay Every Month</small>
                    </div>
                  </button>
                  <button
                    type="button"
                    className={`pp-calc__annual${billing === "annual" ? " is-active" : ""}`}
                    onClick={() => setBilling("annual")}
                  >
                    <span className="pp-calc__off">25% OFF</span>
                    <span className="pp-calc__bill-icon" aria-hidden="true">
                      {ic(Icons.calendar)}
                    </span>
                    <div>
                      <strong>Annual Billing</strong>
                      <small>Pay Once a Year</small>
                    </div>
                  </button>
                </div>
              </div>

              <div className="pp-calc__results">
                <div>
                  <span>Students</span>
                  <strong>{students || "—"}</strong>
                </div>
                <div>
                  <span>Monthly Investment</span>
                  <strong>
                    {formatINR(monthlyCost)}
                    <small> per month</small>
                  </strong>
                </div>
                <div>
                  <span>Annual Investment</span>
                  <strong>
                    {formatINR(annualCost)}
                    <small> per year</small>
                  </strong>
                </div>
              </div>

              <div className={`pp-calc__save${billing === "annual" && savings ? " is-on" : ""}`}>
                {billing === "annual" && savings
                  ? `You Save ${formatINR(savings)} with Annual Billing!`
                  : "You Save 25% with Annual Billing!"}
              </div>
            </div>

            <aside className="pp-love">
              <h3>Why Schools Love EduAitor ONE</h3>
              <ul>
                {loveItems.map((item) => (
                  <li key={item.title}>
                    <span className="pp-love__icon" aria-hidden="true">
                      {ic(item.icon)}
                    </span>
                    <div>
                      <strong>{item.title}</strong>
                      <p>{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="pp-love__promise">
                ₹1 per day. Maximum Value. That's the EduAitor Promise!
              </div>
            </aside>
          </div>

          <div className="pp-calc-foot">
            <div className="pp-calc-foot__left">
              <span className="pp-calc-foot__icon" aria-hidden="true">
                {ic(Icons.school)}
              </span>
              <div>
                <strong>EduAitor ONE – The Smartest Investment for Your School</strong>
                <div className="pp-calc-foot__checks">
                  {["One Plan", "One Price", "Everything Included", "Maximum Value", "Total Peace of Mind"].map(
                    (t) => (
                      <span key={t}>✓ {t}</span>
                    )
                  )}
                </div>
              </div>
            </div>
            <div className="pp-calc-foot__right">
              <p>
                <strong>Need Help Calculating?</strong> Our team is ready to help you.
              </p>
              <button
                type="button"
                className="pp-btn pp-btn--light"
                onClick={() => openContactPopup("plans-talk-experts")}
              >
                Talk to Our Experts
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5 — What's Included */}
      <section className="pp-included">
        <div className="pp-container">
          <div className="pp-included__head">
            <p className="pp-eyebrow">— WHAT'S INCLUDED —</p>
            <h2>Everything in EduAitor ONE Includes</h2>
            <p>One complete platform. Every feature. Every module. Every update.</p>
            <strong>No add-ons. No restrictions. No hidden costs.</strong>
          </div>

          <div className="pp-included__grid">
            {included.map((item) => (
              <article className={`pp-inc pp-inc--${item.color}`} key={item.title}>
                <span className="pp-inc__icon" aria-hidden="true">
                  {ic(item.icon)}
                </span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </article>
            ))}
          </div>

          <div className="pp-included__banner">
            <span className="pp-included__shield" aria-hidden="true">
              {ic(Icons.shield)}
            </span>
            <div>
              <strong>One Plan. Every Feature. Every Update. Every School.</strong>
              <p>No hidden costs. No feature restrictions. No complicated plans.</p>
            </div>
            <div className="pp-included__aside">
              <strong>Better Education. Made Affordable.</strong>
              <span className="pp-promise__script">That's Our Promise.</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
