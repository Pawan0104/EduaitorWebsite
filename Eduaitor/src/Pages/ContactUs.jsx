import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ContactUs.css";

const Icon = ({ children, size = 22 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
);

const I = {
  calendar: (
    <Icon>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
      <path d="M9 16l2 2 4-4" />
    </Icon>
  ),
  headset: (
    <Icon>
      <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
    </Icon>
  ),
  school: (
    <Icon>
      <path d="M3 21h18M5 21V8l7-4 7 4v13" />
      <path d="M9 21v-6h6v6M9 12h.01M15 12h.01" />
    </Icon>
  ),
  handshake: (
    <Icon>
      <path d="M11 17l-2 2a2.8 2.8 0 0 1-4-4l2-2" />
      <path d="M13 7l2-2a2.8 2.8 0 0 1 4 4l-2 2" />
      <path d="M8 12l4-4 4 4-4 4z" />
      <path d="M14 16l2 2M10 8L8 6" />
    </Icon>
  ),
  monitor: (
    <Icon>
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
      <path d="M7 12l3-3 2 2 4-4" />
    </Icon>
  ),
  chat: (
    <Icon>
      <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
    </Icon>
  ),
  people: (
    <Icon>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </Icon>
  ),
  clipboard: (
    <Icon>
      <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
      <rect x="9" y="3" width="6" height="4" rx="1" />
      <path d="M9 12l2 2 4-4" />
    </Icon>
  ),
  rocket: (
    <Icon>
      <path d="M5 15c-1.5 1.5-2 4-2 4s2.5-.5 4-2c.6-.6 1-1.4 1-2.2V13H7.2c-.8 0-1.6.4-2.2 1z" />
      <path d="M13 9l5-5M9 13l-1 5 5-1 6.5-6.5a2.1 2.1 0 0 0-3-3L9 13z" />
    </Icon>
  ),
  teach: (
    <Icon>
      <path d="M4 19.5V6a2 2 0 0 1 2-2h10" />
      <path d="M8 6h10a2 2 0 0 1 2 2v11.5" />
      <path d="M8 10h8M8 14h5" />
      <circle cx="17" cy="18" r="2" />
    </Icon>
  ),
  chart: (
    <Icon>
      <path d="M3 3v18h18" />
      <path d="M7 14l4-4 3 3 5-6" />
    </Icon>
  ),
  pin: (
    <Icon>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </Icon>
  ),
  clock: (
    <Icon>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </Icon>
  ),
  cap: (
    <Icon>
      <path d="M22 10L12 5 2 10l10 5 10-5z" />
      <path d="M6 12v5c3 2 9 2 12 0v-5" />
    </Icon>
  ),
  cloud: (
    <Icon>
      <path d="M17 17H8a4 4 0 1 1 1-7.8A5 5 0 0 1 19 12a3 3 0 0 1-2 5z" />
      <path d="M12 17V9M9 12l3-3 3 3" />
    </Icon>
  ),
  devices: (
    <Icon>
      <rect x="2" y="4" width="14" height="12" rx="2" />
      <path d="M8 20h4M10 16v4" />
      <rect x="16" y="8" width="6" height="12" rx="1.5" />
    </Icon>
  ),
  gear: (
    <Icon>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </Icon>
  ),
  card: (
    <Icon>
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M2 10h20M6 15h4" />
    </Icon>
  ),
  shield: (
    <Icon>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </Icon>
  ),
  lock: (
    <Icon>
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </Icon>
  ),
  phone: (
    <Icon>
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.5-1.1a2 2 0 0 1 2.1-.4c.8.3 1.7.5 2.6.6A2 2 0 0 1 22 16.9z" />
    </Icon>
  ),
  user: (
    <Icon>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </Icon>
  ),
  doc: (
    <Icon>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6M8 13h8M8 17h5" />
    </Icon>
  ),
};

const designations = [
  "Principal",
  "Director",
  "Administrator",
  "IT Head",
  "Teacher",
  "Other",
];

const states = [
  "Andhra Pradesh",
  "Delhi",
  "Gujarat",
  "Haryana",
  "Karnataka",
  "Maharashtra",
  "Rajasthan",
  "Tamil Nadu",
  "Telangana",
  "Uttar Pradesh",
  "Other",
];

const boards = ["CBSE", "ICSE", "State Board", "IB", "Cambridge", "Other"];
const studentRanges = ["1–250", "251–500", "501–1000", "1001–2500", "2500+"];
const campusRanges = ["1", "2–5", "6–10", "10+"];
const times = [
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
];

const connectOptions = [
  {
    id: "demo",
    accent: "blue",
    icon: I.calendar,
    title: "Book a Live Demo",
    desc: "Perfect for schools evaluating EduAitor.",
    meta: "Duration 30–45 minutes",
    items: [
      "Personalized product walkthrough",
      "See features in action",
      "Get answers to your questions",
    ],
    cta: "Book a Demo",
    href: "#demo-form",
    solid: true,
  },
  {
    id: "sales",
    accent: "green",
    icon: I.headset,
    title: "Talk to Our Sales Team",
    desc: "Questions about pricing, implementation or deployment? We're here to help.",
    items: ["Pricing & plans", "Implementation guidance", "Deployment & support"],
    cta: "Talk to Sales",
    href: "#get-in-touch",
    solid: false,
  },
  {
    id: "enterprise",
    accent: "purple",
    icon: I.school,
    title: "Enterprise Consultation",
    desc: "For school groups and large institutions with advanced needs.",
    items: [
      "School Groups",
      "Multi-campus Institutions",
      "Trusts",
      "Chains",
      "White-label Partners",
    ],
    cta: "Request Consultation",
    href: "#demo-form",
    solid: true,
  },
  {
    id: "partner",
    accent: "orange",
    icon: I.handshake,
    title: "Partner With Us",
    desc: "Let's collaborate and create greater impact in education together.",
    items: [
      "Channel Partners",
      "Education Consultants",
      "Implementation Partners",
      "Technology Partners",
    ],
    cta: "Become a Partner",
    href: "#get-in-touch",
    solid: false,
  },
];

const expectItems = [
  {
    icon: I.monitor,
    title: "Personalized Walkthrough",
    desc: "See EduAitor in action, customized for your board, school size, and needs.",
  },
  {
    icon: I.chat,
    title: "Answer All Your Questions",
    desc: "Get clarity on features, implementation, pricing and more.",
  },
  {
    icon: I.people,
    title: "Tailored Recommendation",
    desc: "We'll suggest the best solution and plan for your school.",
  },
  {
    icon: I.doc,
    title: "Next Steps & Support",
    desc: "Receive a clear implementation roadmap and onboarding plan.",
  },
];

const journey = [
  {
    num: "01",
    accent: "blue",
    icon: I.calendar,
    title: "Schedule Your Demo",
    desc: "Fill out the form or choose a convenient time. We'll confirm your slot and send the details.",
  },
  {
    num: "02",
    accent: "green",
    icon: I.headset,
    title: "Meet an EduAitor Specialist",
    desc: "Our expert will understand your school's needs, answer your questions, and walk you through EduAitor.",
  },
  {
    num: "03",
    accent: "purple",
    icon: I.monitor,
    title: "See EduAitor Tailored to Your School",
    desc: "Experience a personalized demo customized for your board, school size, and specific goals.",
  },
  {
    num: "04",
    accent: "orange",
    icon: I.clipboard,
    title: "Receive Your Personalized Plan",
    desc: "Get a detailed implementation plan, pricing (if applicable), and recommendations tailored for you.",
  },
  {
    num: "05",
    accent: "navy",
    icon: I.school,
    title: "Start Transforming Your School",
    desc: "Our team supports you at every step — onboarding, training, and ongoing success.",
  },
];

const loveCards = [
  {
    accent: "blue",
    icon: I.headset,
    title: "Personalized Demonstrations",
    desc: "We understand that every school is unique. Our demos are tailored to your board, size, processes, and goals.",
  },
  {
    accent: "green",
    icon: I.rocket,
    title: "Dedicated Onboarding",
    desc: "Our onboarding experts ensure a smooth start with step-by-step guidance and complete support at every stage.",
  },
  {
    accent: "purple",
    icon: I.teach,
    title: "Implementation Support",
    desc: "From data migration to system setup, we handle the entire implementation so your school can start with confidence.",
  },
  {
    accent: "orange",
    icon: I.teach,
    title: "Teacher Training",
    desc: "We empower your teachers with hands-on training, resources, and continuous learning to get the best out of EduAitor.",
  },
  {
    accent: "blue",
    icon: I.headset,
    title: "Ongoing Customer Success",
    desc: "A dedicated success team is always available to help, resolve queries, and ensure you achieve your goals with EduAitor.",
  },
  {
    accent: "green",
    icon: I.chart,
    title: "Regular Product Updates",
    desc: "We continuously innovate based on school feedback and evolving education needs to keep you ahead, always.",
  },
];

const faqs = [
  {
    icon: I.clock,
    q: "How long does implementation take?",
    a: "Implementation typically takes 1–3 weeks depending on the size and complexity of your school. Our team ensures a smooth and timely onboarding experience.",
  },
  {
    icon: I.cap,
    q: "Do you support CBSE and ICSE?",
    a: "Yes. EduAitor supports CBSE, ICSE, state boards, IB, Cambridge, and custom curricula.",
  },
  {
    icon: I.teach,
    q: "Is training included?",
    a: "Yes. Onboarding includes administrator and teacher training, plus ongoing learning resources.",
  },
  {
    icon: I.cloud,
    q: "Can I migrate data from my existing ERP?",
    a: "Absolutely. Our team helps migrate students, staff, fees, and academic data from your current system.",
  },
  {
    icon: I.people,
    q: "Is there a minimum number of students?",
    a: "EduAitor works for schools of every size — from small campuses to large multi-branch groups.",
  },
  {
    icon: I.lock,
    q: "Is my data secure with EduAitor?",
    a: "Yes. We use encryption, role-based access, and secure cloud infrastructure to protect your data.",
  },
  {
    icon: I.devices,
    q: "On which devices can EduAitor be used?",
    a: "EduAitor works on web and mobile — Android and iOS apps for all stakeholders.",
  },
  {
    icon: I.gear,
    q: "Can we customize EduAitor for our school?",
    a: "Yes. Workflows, roles, reports, and branding can be tailored — especially for Enterprise.",
  },
  {
    icon: I.card,
    q: "What are the payment options?",
    a: "You can choose monthly or annual billing. Annual billing includes 25% savings.",
  },
];

const touchCards = [
  {
    accent: "blue",
    icon: I.headset,
    title: "Sales",
    desc: "For product demos, pricing, and general inquiries.",
    email: "sales@eduaitor.com",
    phone: "+91 6366 180 333",
    cta: "Talk to Sales",
    href: "tel:+916366180333",
  },
  {
    accent: "green",
    icon: I.school,
    title: "Enterprise",
    desc: "For school groups, multi-campus institutions, and enterprise solutions.",
    email: "enterprise@eduaitor.com",
    phone: "+91 6366 180 334",
    cta: "Contact Enterprise Team",
    href: "mailto:enterprise@eduaitor.com",
  },
  {
    accent: "purple",
    icon: I.headset,
    title: "Support",
    desc: "For technical support, training, or help with your account.",
    email: "support@eduaitor.com",
    phone: "+91 6366 180 335",
    cta: "Get Support",
    href: "mailto:support@eduaitor.com",
  },
  {
    accent: "orange",
    icon: I.pin,
    title: "Office",
    desc: "Visit our head office or send us your correspondence.",
    address:
      "EduAitor Technologies Pvt. Ltd. 6th Floor, Shipra Path, Mansarovar, Jaipur, Rajasthan – 302020, India",
    cta: "View on Map",
    href: "https://maps.google.com/?q=Shipra+Path+Mansarovar+Jaipur",
  },
];

const initialForm = {
  schoolName: "",
  name: "",
  designation: "",
  phone: "",
  email: "",
  city: "",
  state: "",
  board: "",
  students: "",
  campuses: "",
  interests: ["Demo"],
  date: "",
  time: "",
  message: "",
};

export default function ContactUs() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const toggleInterest = (item) => {
    setForm((prev) => {
      const has = prev.interests.includes(item);
      return {
        ...prev,
        interests: has
          ? prev.interests.filter((i) => i !== item)
          : [...prev.interests, item],
      };
    });
  };

  const validate = () => {
    const next = {};
    if (!form.schoolName.trim()) next.schoolName = "Required";
    if (!form.name.trim()) next.name = "Required";
    if (!form.designation) next.designation = "Required";
    if (!form.phone.trim()) next.phone = "Required";
    else if (!/^\d{10}$/.test(form.phone.replace(/\D/g, "")))
      next.phone = "Enter 10 digits";
    if (!form.email.trim()) next.email = "Required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) next.email = "Invalid email";
    if (!form.city.trim()) next.city = "Required";
    if (!form.state) next.state = "Required";
    if (!form.board) next.board = "Required";
    if (!form.students) next.students = "Required";
    return next;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const next = validate();
    if (Object.keys(next).length) {
      setErrors(next);
      return;
    }
    setSubmitting(true);
    setStatus("");
    try {
      await new Promise((r) => setTimeout(r, 1200));
      setStatus("Thank you! We'll confirm your demo shortly.");
      setForm(initialForm);
    } catch {
      setStatus("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="cu">
      {/* 1 — Hero */}
      <section className="cu-hero">
        <div className="cu-container cu-hero__grid">
          <div className="cu-hero__copy">
            <p className="cu-kicker">
              <span className="cu-kicker__icon" aria-hidden="true">
                {I.user}
              </span>{" "}
              START YOUR EDUAITOR JOURNEY
            </p>
            <h1>
              Let's Build a <span>Smarter School</span> Together.
            </h1>
            <p className="cu-hero__sub">
              Whether you're exploring EduAitor for a single school or an entire school group,
              we'd love to understand your goals and show you how EduAitor can help.
            </p>
            <div className="cu-hero__actions">
              <a href="#demo-form" className="cu-btn cu-btn--primary">
                <span aria-hidden="true">{I.calendar}</span> Book a Demo
              </a>
              <a href="#get-in-touch" className="cu-btn cu-btn--outline">
                <span aria-hidden="true">{I.phone}</span> Talk to Sales
              </a>
            </div>
          </div>
          <div className="cu-hero__visual">
            <img
              src="/contact/contact-hero.png"
              alt="EduAitor team meeting with school leaders"
              className="cu-hero__photo"
            />
          </div>
        </div>
        <div className="cu-container">
          <div className="cu-trustbar">
            {[
              {
                title: "Trusted by Schools",
                desc: "Across India",
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="M9 12l2 2 4-4" />
                  </svg>
                ),
              },
              {
                title: "Everything You Need",
                desc: "In One Complete Platform",
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                ),
              },
              {
                title: "Secure. Reliable. Scalable.",
                desc: "Built for the Future",
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="5" y="11" width="14" height="10" rx="2" />
                    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
                  </svg>
                ),
              },
              {
                title: "Here for You",
                desc: "Every Step of the Way",
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                  </svg>
                ),
              },
            ].map((item) => (
              <div key={item.title} className="cu-trustbar__item">
                <span className="cu-trustbar__icon" aria-hidden="true">
                  {item.icon}
                </span>
                <div>
                  <strong>{item.title}</strong>
                  <span>{item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2 — Connect options */}
      <section className="cu-connect" id="connect">
        <div className="cu-container">
          <div className="cu-section-head">
            <p className="cu-eyebrow">CHOOSE HOW YOU'D LIKE TO CONNECT</p>
            <h2>
              How would you like to connect with <span>EduAitor</span>?
            </h2>
            <p>Select the option that best fits your needs and our team will be happy to assist you.</p>
          </div>
          <div className="cu-connect__grid">
            {connectOptions.map((opt) => (
              <article key={opt.id} className={`cu-opt cu-opt--${opt.accent}`}>
                <span className="cu-opt__icon" aria-hidden="true">
                  {opt.icon}
                </span>
                <h3>{opt.title}</h3>
                <p className="cu-opt__desc">{opt.desc}</p>
                {opt.meta && (
                  <div className="cu-opt__meta">
                    <span aria-hidden="true">{I.clock}</span>
                    {opt.meta}
                  </div>
                )}
                <ul>
                  {opt.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <a
                  href={opt.href}
                  className={`cu-btn ${opt.solid ? "cu-btn--solid" : "cu-btn--ghost"}`}
                >
                  {opt.cta} →
                </a>
              </article>
            ))}
          </div>
          <div className="cu-connect__foot">
            <div>
              <strong>No obligation. No pressure.</strong>
              <p>We're here to understand your needs and show how EduAitor can help your school thrive.</p>
            </div>
            <div>
              <strong>Trusted by schools across India.</strong>
              <p>Join thousands of educators who are transforming education with EduAitor.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3 — Demo form */}
      <section className="cu-demo" id="demo-form">
        <div className="cu-container">
          <div className="cu-section-head">
            <p className="cu-eyebrow">— BOOK YOUR PERSONALIZED DEMO —</p>
            <h2>Tell Us About Your School</h2>
            <p>Share a few details and our team will schedule a personalized demo just for you.</p>
          </div>

          <div className="cu-demo__shell">
            <form className="cu-form" onSubmit={onSubmit} noValidate>
              <div className="cu-form__row">
                <label>
                  School Name <em>*</em>
                  <input
                    name="schoolName"
                    value={form.schoolName}
                    onChange={onChange}
                    placeholder="Enter school name"
                  />
                  {errors.schoolName && <span className="cu-err">{errors.schoolName}</span>}
                </label>
                <label>
                  Your Name <em>*</em>
                  <input
                    name="name"
                    value={form.name}
                    onChange={onChange}
                    placeholder="Enter your name"
                  />
                  {errors.name && <span className="cu-err">{errors.name}</span>}
                </label>
                <label>
                  Designation <em>*</em>
                  <select name="designation" value={form.designation} onChange={onChange}>
                    <option value="">Select designation</option>
                    {designations.map((d) => (
                      <option key={d}>{d}</option>
                    ))}
                  </select>
                  {errors.designation && <span className="cu-err">{errors.designation}</span>}
                </label>
              </div>

              <div className="cu-form__row">
                <label>
                  Mobile Number <em>*</em>
                  <div className="cu-phone">
                    <span>+91</span>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={onChange}
                      placeholder="Enter mobile number"
                    />
                  </div>
                  {errors.phone && <span className="cu-err">{errors.phone}</span>}
                </label>
                <label>
                  Email Address <em>*</em>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={onChange}
                    placeholder="Enter email address"
                  />
                  {errors.email && <span className="cu-err">{errors.email}</span>}
                </label>
                <label>
                  City <em>*</em>
                  <input
                    name="city"
                    value={form.city}
                    onChange={onChange}
                    placeholder="Enter city"
                  />
                  {errors.city && <span className="cu-err">{errors.city}</span>}
                </label>
              </div>

              <div className="cu-form__row">
                <label>
                  State <em>*</em>
                  <select name="state" value={form.state} onChange={onChange}>
                    <option value="">Select state</option>
                    {states.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                  {errors.state && <span className="cu-err">{errors.state}</span>}
                </label>
                <label>
                  Board <em>*</em>
                  <select name="board" value={form.board} onChange={onChange}>
                    <option value="">Select board</option>
                    {boards.map((b) => (
                      <option key={b}>{b}</option>
                    ))}
                  </select>
                  {errors.board && <span className="cu-err">{errors.board}</span>}
                </label>
                <label>
                  Number of Students <em>*</em>
                  <select name="students" value={form.students} onChange={onChange}>
                    <option value="">Select range</option>
                    {studentRanges.map((r) => (
                      <option key={r}>{r}</option>
                    ))}
                  </select>
                  {errors.students && <span className="cu-err">{errors.students}</span>}
                </label>
              </div>

              <div className="cu-form__row cu-form__row--mixed">
                <label>
                  Number of Campuses
                  <select name="campuses" value={form.campuses} onChange={onChange}>
                    <option value="">Select range</option>
                    {campusRanges.map((r) => (
                      <option key={r}>{r}</option>
                    ))}
                  </select>
                </label>
                <div className="cu-interests">
                  <span className="cu-interests__label">Interested In</span>
                  <div className="cu-interests__list">
                    {["Demo", "Pricing", "Enterprise", "Partnership"].map((item) => (
                      <label key={item} className="cu-check">
                        <input
                          type="checkbox"
                          checked={form.interests.includes(item)}
                          onChange={() => toggleInterest(item)}
                        />
                        <span>{item}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="cu-form__row cu-form__row--2">
                <label>
                  Preferred Date
                  <input type="date" name="date" value={form.date} onChange={onChange} />
                </label>
                <label>
                  Preferred Time
                  <select name="time" value={form.time} onChange={onChange}>
                    <option value="">Select time</option>
                    {times.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </label>
              </div>

              <label className="cu-form__message">
                Anything specific you'd like us to know? (Optional)
                <textarea
                  name="message"
                  value={form.message}
                  onChange={onChange}
                  rows={4}
                  placeholder="Your message helps us prepare the right demo for you..."
                />
              </label>

              <div className="cu-form__foot">
                <p className="cu-privacy">
                  Your information is safe with us. We respect your privacy.
                </p>
                <button type="submit" className="cu-btn cu-btn--primary" disabled={submitting}>
                  {submitting ? "Scheduling..." : "Schedule My Demo →"}
                </button>
              </div>
              {status && <p className="cu-status">{status}</p>}
            </form>

            <aside className="cu-expect">
              <div className="cu-expect__art" aria-hidden="true">
                {I.calendar}
              </div>
              <h3>What to Expect in Your Demo</h3>
              <ul>
                {expectItems.map((item) => (
                  <li key={item.title}>
                    <span className="cu-expect__icon" aria-hidden="true">
                      {item.icon}
                    </span>
                    <div>
                      <strong>{item.title}</strong>
                      <span>{item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="cu-expect__box">
                <span className="cu-expect__box-icon" aria-hidden="true">
                  {I.shield}
                </span>
                <div>
                  <strong>100% No Obligation</strong>
                  <p>No pressure. Just a helpful conversation to explore what's possible.</p>
                </div>
              </div>
            </aside>
          </div>

          <p className="cu-demo__call">
            Prefer to talk first? Call us at <a href="tel:+916366180333">+91 6366 180 333</a> or
            Email us at <a href="mailto:hello@eduaitor.com">hello@eduaitor.com</a>
          </p>
        </div>
      </section>

      {/* 4 — Journey */}
      <section className="cu-journey">
        <div className="cu-container">
          <div className="cu-section-head">
            <p className="cu-eyebrow">WHAT HAPPENS NEXT?</p>
            <h2>
              Your Journey to a Smarter School <span>Starts Here.</span>
            </h2>
            <p>
              From the first conversation to successful implementation, we're with you every step of
              the way.
            </p>
          </div>
          <div className="cu-journey__grid">
            {journey.map((step, i) => (
              <React.Fragment key={step.num}>
                <article className={`cu-step cu-step--${step.accent}`}>
                  <span className="cu-step__num">{step.num}</span>
                  <span className="cu-step__icon" aria-hidden="true">
                    {step.icon}
                  </span>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </article>
                {i < journey.length - 1 && <span className="cu-step__arrow" aria-hidden="true">→</span>}
              </React.Fragment>
            ))}
          </div>
          <div className="cu-journey__banner">
            <div>
              <strong>We Make It Simple. You Make It Powerful.</strong>
              <p>
                Our dedicated team ensures a smooth, transparent, and successful journey so you can
                focus on what matters most — your students.
              </p>
            </div>
            <ul>
              <li>No pressure. Just guidance.</li>
              <li>Clear communication at every step.</li>
              <li>Long-term partnership, not just a product.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5 — Why schools love us */}
      <section className="cu-love">
        <div className="cu-container">
          <div className="cu-section-head">
            <p className="cu-eyebrow">♥ WHY SCHOOLS LOVE US</p>
            <h2>
              Why Schools Love <span>Working With Us</span>
            </h2>
            <p>We go beyond software. We become your partner in progress.</p>
          </div>
          <div className="cu-love__grid">
            {loveCards.map((card) => (
              <article key={card.title} className={`cu-love-card cu-love-card--${card.accent}`}>
                <span className="cu-love-card__icon" aria-hidden="true">
                  {card.icon}
                </span>
                <div>
                  <h3>{card.title}</h3>
                  <p>{card.desc}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="cu-love__stats">
            <div className="cu-love__stats-copy">
              <strong>Trusted by Schools Across India</strong>
              <p>
                Schools of all sizes trust EduAitor for our commitment, reliability, and the real
                impact we create together.
              </p>
            </div>
            <div className="cu-love__stats-nums">
              {[
                ["1000+", "Schools"],
                ["10 Lakh+", "Students"],
                ["500+", "Cities"],
                ["98%", "Customer Satisfaction"],
              ].map(([n, l]) => (
                <div key={l}>
                  <strong>{n}</strong>
                  <span>{l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6 — Get in touch */}
      <section className="cu-touch" id="get-in-touch">
        <div className="cu-container">
          <div className="cu-section-head">
            <p className="cu-eyebrow">—— GET IN TOUCH ——</p>
            <h2>
              Multiple Ways to <span>Reach Us</span>
            </h2>
            <p>
              We're here to help you at every step. Choose the most convenient way to connect with
              our team.
            </p>
          </div>
          <div className="cu-touch__grid">
            {touchCards.map((card) => (
              <article key={card.title} className={`cu-touch-card cu-touch-card--${card.accent}`}>
                <span className="cu-touch-card__icon" aria-hidden="true">
                  {card.icon}
                </span>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
                {card.email && (
                  <a href={`mailto:${card.email}`} className="cu-touch-card__link">
                    {card.email}
                  </a>
                )}
                {card.phone && (
                  <a href={`tel:${card.phone.replace(/\s/g, "")}`} className="cu-touch-card__link">
                    {card.phone}
                  </a>
                )}
                {card.address && <p className="cu-touch-card__addr">{card.address}</p>}
                <a href={card.href} className="cu-btn cu-btn--solid" target={card.title === "Office" ? "_blank" : undefined} rel="noreferrer">
                  {card.cta}
                </a>
              </article>
            ))}
          </div>
          <div className="cu-touch__meta">
            <div>
              <strong>Working Hours</strong>
              <p>Monday – Saturday</p>
              <em>9:30 AM – 6:30 PM (IST)</em>
              <span>(Closed on Sundays & Public Holidays)</span>
            </div>
            <div>
              <strong>Stay in the Loop</strong>
              <p>Subscribe to our newsletter for the latest updates, features, and education insights.</p>
              <a href="mailto:marketing@eduaitor.com">marketing@eduaitor.com</a>
            </div>
            <div className="cu-touch__office-img" aria-hidden="true">
              EduAitor Office
            </div>
          </div>
          <div className="cu-touch__notes">
            <p>We value your time and trust. Expect a response within one business day.</p>
            <p>Thank you for considering EduAitor.</p>
          </div>
        </div>
      </section>

      {/* 7 — FAQ */}
      <section className="cu-faq">
        <div className="cu-container">
          <div className="cu-section-head">
            <p className="cu-eyebrow">FREQUENTLY ASKED QUESTIONS</p>
            <h2>
              Questions? We've Got <span>Answers.</span>
            </h2>
            <p>Find quick answers to the most common questions about EduAitor.</p>
          </div>
          <div className="cu-faq__grid">
            {faqs.map((item, i) => {
              const open = openFaq === i;
              return (
                <div key={item.q} className={`cu-faq__item${open ? " is-open" : ""}`}>
                  <button type="button" onClick={() => setOpenFaq(open ? -1 : i)}>
                    <span className="cu-faq__icon" aria-hidden="true">
                      {item.icon}
                    </span>
                    <span>{item.q}</span>
                    <span className="cu-faq__chev" aria-hidden="true">
                      {open ? "▴" : "▾"}
                    </span>
                  </button>
                  {open && <div className="cu-faq__a">{item.a}</div>}
                </div>
              );
            })}
          </div>
          <div className="cu-faq__cta">
            <div>
              <strong>Still have questions?</strong>
              <p>Our team is here to help you with any queries you may have.</p>
            </div>
            <div className="cu-faq__actions">
              <a href="#demo-form" className="cu-btn cu-btn--primary">
                Book a Demo
              </a>
              <a href="#get-in-touch" className="cu-btn cu-btn--outline">
                Talk to Our Team
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 8 — Closing chapter */}
      <section className="cu-chapter">
        <div className="cu-container cu-chapter__grid">
          <div className="cu-chapter__copy">
            <h2>Your School's Next Chapter Starts Here.</h2>
            <p>
              Every great transformation begins with a conversation. Let's explore how EduAitor can
              help your school <em>operate smarter</em>, <em>empower educators</em>,{" "}
              <em>strengthen parent partnerships</em>, and <em>deliver better outcomes</em> for every
              student.
            </p>
          </div>
          <div className="cu-chapter__visual">
            <img
              src="/contact/contact-chapter.png"
              alt="School leaders exploring EduAitor together"
            />
          </div>
        </div>
        <div className="cu-container">
          <div className="cu-chapter__features">
            {[
              ["Smart School Management", "Simplify operations"],
              ["Empowered Educators", "Teach with impact"],
              ["Engaged Parents", "Stronger partnerships"],
              ["Successful Students", "Better outcomes"],
              ["Secure & Reliable", "Your data, our priority"],
            ].map(([t, d]) => (
              <div key={t}>
                <strong>{t}</strong>
                <span>{d}</span>
              </div>
            ))}
          </div>
          <div className="cu-chapter__cta">
            <p>
              The future of education is intelligent, connected, and student-centric.{" "}
              <strong>Let's build it together.</strong>
            </p>
            <div className="cu-chapter__actions">
              <Link to="/bookademo" className="cu-btn cu-btn--primary">
                Book a Demo
                <small>See EduAitor in action</small>
              </Link>
              <a href="#get-in-touch" className="cu-btn cu-btn--outline">
                Talk to Sales
                <small>Speak with our team</small>
              </a>
            </div>
          </div>
          <div className="cu-chapter__trust">
            <span>Trusted by Schools Across India</span>
            <span>Dedicated Support</span>
            <span>Cloud Secured</span>
            <span>Made in India with ♥</span>
          </div>
        </div>
      </section>
    </div>
  );
}
