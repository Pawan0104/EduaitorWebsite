import feeImage from "../assets/fee-management-image.jpg";
import analyticsImage from "../assets/analytics-image.jpg";
import studentInfoImage from "../assets/student-info-image.avif";
import demoImage from "../assets/homepage-demo-image.avif";

/* ── Shared icon library ─────────────────────────────── */
const IcDashboard = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}>
    <rect x="3" y="3" width="7" height="9" rx="1.5" />
    <rect x="14" y="3" width="7" height="5" rx="1.5" />
    <rect x="14" y="12" width="7" height="9" rx="1.5" />
    <rect x="3" y="16" width="7" height="5" rx="1.5" />
  </svg>
);
const IcClock = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);
const IcShield = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);
const IcBell = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}>
    <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.7 21a2 2 0 0 1-3.4 0" />
  </svg>
);
const IcChart = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}>
    <path d="M3 3v18h18" />
    <path d="M7 15l4-5 3 3 5-7" />
  </svg>
);
const IcUsers = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}>
    <circle cx="9" cy="8" r="3.5" />
    <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
    <circle cx="17" cy="9" r="2.5" />
    <path d="M16 14.5a5 5 0 0 1 5.5 5.5" />
  </svg>
);
const IcCog = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}>
    <circle cx="12" cy="12" r="3" />
    <path d="M12 1.5v4M12 18.5v4M4.2 4.2l2.8 2.8M17 17l2.8 2.8M1.5 12h4M18.5 12h4M4.2 19.8l2.8-2.8M17 7l2.8-2.8" />
  </svg>
);
const IcCard = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}>
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <path d="M2 10h20" />
    <path d="M6 15h4" />
  </svg>
);
const IcBook = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}>
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15z" />
    <path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5" />
  </svg>
);
const IcFile = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6M9 13h6M9 17h6" />
  </svg>
);
const IcPhone = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}>
    <rect x="5" y="2" width="14" height="20" rx="2" />
    <path d="M12 18h.01" />
    <path d="M9 6h6" />
  </svg>
);
const IcAi = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}>
    <rect x="8" y="9" width="8" height="10" rx="2" />
    <path d="M12 3v3M9 6h6M10 13h.01M14 13h.01M10 16h4" />
  </svg>
);
const IcRoute = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}>
    <circle cx="6" cy="19" r="2.5" />
    <circle cx="18" cy="5" r="2.5" />
    <path d="M8 19h6a4 4 0 0 0 4-4v-3M8.5 5h.01M16 17v-4" />
  </svg>
);
const IcMessage = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);
const IcSpark = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}>
    <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z" />
  </svg>
);
const IcLock = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}>
    <rect x="4" y="11" width="16" height="10" rx="2" />
    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
  </svg>
);
const IcCheck = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
    <path d="M20 6L9 17l-5-5" />
  </svg>
);
const IcDownload = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
  </svg>
);
const IcMoney = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}>
    <rect x="2" y="6" width="20" height="12" rx="2" />
    <circle cx="12" cy="12" r="3" />
    <path d="M6 12h.01M18 12h.01" />
  </svg>
);
const IcPercent = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}>
    <path d="M19 5L5 19" />
    <circle cx="6.5" cy="6.5" r="2.5" />
    <circle cx="17.5" cy="17.5" r="2.5" />
  </svg>
);
const IcReceipt = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}>
    <path d="M6 2h12a1 1 0 0 1 1 1v18l-2-1-2 1-2-1-2 1-2-1-2 1V3a1 1 0 0 1 1-1z" />
    <path d="M9 7h6M9 11h6M9 15h4" />
  </svg>
);
const IcExam = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
  </svg>
);
const IcGrade = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}>
    <path d="M12 3v18M5.5 6.5c-1.5 0-3-.4-3.5-.9v14c.5.5 2 .9 3.5.9s3-.4 3.5-.9v-14c-.5.5-2 .9-3.5.9z" />
    <path d="M18.5 5.6c1.5 0 3 .4 3.5.9v14c-.5.5-2 .9-3.5.9s-3-.4-3.5-.9v-14c.5.5 2 .9 3.5.9z" />
  </svg>
);
const IcBulb = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}>
    <path d="M9 18h6M10 21h4" />
    <path d="M12 3a6 6 0 0 0-3.5 10.9c.9.7 1.5 1.6 1.5 2.6h4c0-1 .6-1.9 1.5-2.6A6 6 0 0 0 12 3z" />
  </svg>
);
const IcGroup = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}>
    <circle cx="12" cy="12" r="2.5" />
    <circle cx="19" cy="6" r="2" />
    <circle cx="5" cy="6" r="2" />
    <path d="M12 20a6 6 0 0 1 8.5-5.3M12 20a6 6 0 0 0-8.5-5.3" />
  </svg>
);
const IcVideo = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}>
    <rect x="2" y="6" width="14" height="12" rx="2" />
    <path d="M16 10l6-3v10l-6-3" />
  </svg>
);
const IcPrint = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}>
    <path d="M6 9V2h12v7" />
    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
    <path d="M6 14h12v8H6z" />
  </svg>
);
const IcGlobe = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
  </svg>
);

const sourceKey = {
  sms: "school-management-software",
  ai: "ai-school-erp",
  attendance: "attendance-management-system",
  fee: "fee-management-software",
  exam: "exam-management-system",
  parent: "parent-mobile-app",
  sis: "student-information-system",
  lms: "school-lms",
  assistant: "ai-academic-assistant",
  qpg: "ai-question-paper-generator",
  worksheet: "ai-worksheet-generator",
  reportcard: "ai-report-card-generator",
  analytics: "ai-school-analytics",
};

/* ── Page: School Management Software ───────────────── */
const schoolManagement = {
  path: "/school-erp-software/school-management-software",
  metaTitle:
    "School Management Software | Manage Your Entire School with EduAitor",
  metaDescription:
    "One platform for admissions, students, staff, attendance, fees, timetable, communication and analytics. EduAitor school management software helps CBSE, ICSE and State-board schools run smarter.",
  hero: {
    eyebrow: "SCHOOL MANAGEMENT SOFTWARE",
    title: (
      <>
        Run Your Entire School from{" "}
        <span className="fl-accent">One Intelligent Platform</span>
      </>
    ),
    subtitle:
      "EduAitor is the complete school management software that brings admissions, student records, staff, attendance, fees, timetable, exams, transport, library, hostel and parent communication together in a single cloud platform — built specially for Indian schools.",
    primary: { label: "Book a Free Demo", source: sourceKey.sms },
    secondary: { label: "Explore the Ecosystem", to: "/ecosystem" },
    trust: (
      <>
        Trusted by <strong>50,000+ schools</strong> · Used by <strong>10 Million+ students</strong>
      </>
    ),
    image: "/ecosystem/01-admin-panel.png",
    imageAlt: "EduAitor school management software admin dashboard",
    imageCaption: "EduAitor admin dashboard — every module in one place",
  },
  stats: [
    { value: "50,000+", label: "Schools using the platform" },
    { value: "10M+", label: "Students managed with EduAitor" },
    { value: "98%", label: "Client satisfaction rating" },
  ],
  intro: {
    heading: "What is EduAitor School Management Software?",
    paragraphs: [
      "School management software, also known as a School ERP, is a digital system that helps schools automate their day-to-day administrative, academic and financial operations. Instead of juggling registers, spreadsheets and separate apps, a school can manage everything from a single connected platform — student records, teacher attendance, fee collection, examinations, parent communication and more.",
      "EduAitor was designed with a simple belief at its core: schools are about education, not paperwork. Principals, administrators and office staff lose hundreds of hours every year to repetitive manual tasks. Teachers juggle attendance registers, mark sheets and parent queries. Parents wait to hear back about fees, homework and results. EduAitor removes that friction so that every stakeholder can focus on what truly matters — learning.",
      "Because EduAitor is modular, every school adopts it at its own pace. Start with student information and attendance, then switch on fees, exams, transport or the AI features as you grow. The platform scales from a single school to large multi-campus groups, and supports CBSE, ICSE, State Board and international curricula.",
    ],
  },
  why: {
    heading: "Why Schools Are Switching to EduAitor",
    lead: "Traditional systems were built for an era before AI. EduAitor is modern school software designed for the way schools actually work today.",
    points: [
      { icon: IcDashboard, title: "One System, Not Many", desc: "Stop maintaining separate apps for fees, attendance and timetables. With EduAitor, every module shares the same student data, so nothing is ever duplicated or out of sync." },
      { icon: IcClock, title: "Save Hundreds of Hours", desc: "Automate fee reminders, attendance registers, report cards and certificate generation. Staff spend minutes on tasks that earlier took hours." },
      { icon: IcChart, title: "Real-Time Insights", desc: "Leadership gets live dashboards on attendance, fees, results and admissions — so decisions are based on facts, not gut feeling at the end of the term." },
      { icon: IcAi, title: "AI Built Into Everything", desc: "Generate assessments, explain tough concepts and spot learning gaps with AI — capabilities no traditional school ERP offers." },
    ],
  },
  features: {
    heading: "Complete School Management Features",
    lead: "EduAitor covers every department of a modern school. Here is what you can manage.",
    items: [
      { icon: IcUsers, title: "Student Information", desc: "Complete digital records of every student — guardians, medical, documents, history and more." },
      { icon: IcClock, title: "Attendance", desc: "Class-wise, biometric and online attendance with instant parent notification and reports." },
      { icon: IcCard, title: "Fee Management", desc: "Fee structures, online collection, receipts, dues tracking and automatic reminders." },
      { icon: IcFile, title: "Admissions & Leads", desc: "Online applications, lead tracking, document verification and a full admission funnel." },
      { icon: IcBook, title: "Timetable & Classes", desc: "Class-wise and teacher-wise timetables with clash detection and instant updates." },
      { icon: IcMessage, title: "Communication", desc: "Send SMS, email, and WhatsApp-style messages to parents, staff and students in groups." },
      { icon: IcExam, title: "Exams & Results", desc: "Exam scheduling, marks entry, report cards, progress reports and analysis." },
      { icon: IcPrint, title: "Documents & Certificates", desc: "Generate ID cards, certificates, bonafide letters and transfer certificates in seconds." },
      { icon: IcReceipt, title: "Finance & Accounting", desc: "Income, expense, payroll and ledger views that give leadership financial clarity." },
      { icon: IcRoute, title: "Transport", desc: "GPS bus tracking, routes, boarding points and pickup/drop confirmation." },
      { icon: IcBook, title: "Library", desc: "Catalogue, issue/return, digital books and overdue fine management." },
      { icon: IcChart, title: "Analytics", desc: "Live dashboards, custom reports and AI-powered insights for every department." },
    ],
  },
  deepDive: {
    heading: "A Deeper Look Inside the Platform",
    sections: [
      {
        title: "One Database. Every Department, Always in Sync.",
        body: [
          "The biggest problem with old school management systems is fragmentation. Attendance lives in one software, fees in another and the library in a third. When a student leaves, no one updates all three systems. EduAitor solves this with a single student record that flows through every module.",
          "When a class teacher marks attendance, that same record instantly updates the day's register, creates an alert for absentees, sends a notification to parents, and feeds the monthly attendance analysis used by the principal. The same happens for fees — a payment made online appears in the receipt, ledger, dues list and finance dashboard at the same moment.",
          "This single-source-of-truth architecture means reports are always accurate, there is nothing to reconcile, and audits take minutes instead of weeks.",
        ],
        image: "/home/solution-dashboard.png",
        imageAlt: "EduAitor school dashboard overview",
        caption: "A unified dashboard connects every department's data",
        points: [
          "No duplicate data entry across modules",
          "Automatic alerts and notifications driven by real events",
          "Accurate, always-current reports for leadership",
        ],
      },
      {
        title: "Designed for Every Role in the School",
        body: [
          "Good school management software must serve every stakeholder, not only the office. EduAitor ships with dedicated experiences for school admins, principals, teachers, office staff, students and parents — each with the exact tools their role needs and nothing that clutters the screen.",
          "Teachers mark attendance on their way to class, post homework, and see student-wise performance in one glance. Office staff handle admissions, fees and documents through fast workflows. Parents open the app to see attendance, fee dues, homework deadlines and results in real time.",
          "Role-based access also keeps data secure. Each user sees only what they are allowed to — a parent sees their own children, a teacher sees their own classes, and the principal sees institution-wide analytics.",
        ],
        image: "/ecosystem/16-analytics-panel.png",
        imageAlt: "EduAitor analytics and reporting dashboard",
        caption: "Role-based dashboards keep data accessible and secure",
        points: [
          "Dedicated admin, teacher, staff, student and parent experiences",
          "Granular role-based permissions across every module",
          "Secure multi-campus and multi-board support",
        ],
      },
      {
        title: "Built for Indian Schools, Boards and Workflows",
        body: [
          "EduAitor is not a western ERP translated into English. It is built around the way Indian schools actually operate — CBSE, ICSE and State Board curricula, Hindi and regional language support, class-wise fee structures, exam patterns like PT1/PT2/PT3, and the way guardians communicate with schools.",
          "The platform supports multi-board schools, regional languages across the interface, and payments that Indian parents already use — UPI, net banking and cards. Admission documents like transfer certificates and bonafide letters are generated in the formats schools and boards expect.",
          "And because every school is different, EduAitor is configurable. Fee structures, report-card formats, certificate layouts and timetables can all be tailored to your institution's rules.",
        ],
        image: "/ecosystem/02-admissions-panel.png",
        imageAlt: "EduAitor admissions management screen",
        caption: "Admissions and document workflows built for Indian schools",
        points: [
          "CBSE, ICSE and State Board ready out of the box",
          "Regional language support across the interface",
          "Configurable fee structures, reports and certificates",
        ],
      },
    ],
  },
  screenshots: {
    heading: "See the Platform in Action",
    items: [
      { src: "/ecosystem/01-admin-panel.png", alt: "School administration dashboard", caption: "School administration dashboard" },
      { src: "/ecosystem/03-academics-panel.png", alt: "Academic management module", caption: "Academic management suite" },
      { src: "/ecosystem/16-analytics-panel.png", alt: "Analytics and reports", caption: "Analytics and decision intelligence" },
    ],
  },
  howItWorks: {
    heading: "Getting Started Takes Just Days",
    steps: [
      { num: "01", title: "Book a Demo", desc: "See the platform live and get a walkthrough tailored to your school's size and board." },
      { num: "02", title: "Onboarding & Data Migration", desc: "Our team imports your students, staff, fees and timetables so nothing is lost." },
      { num: "03", title: "Staff Training", desc: "Admins, teachers and office staff are trained with role-specific sessions." },
      { num: "04", title: "Go Live & Grow", desc: "Launch the modules you need first and switch on more (fees, transport, AI) anytime." },
    ],
  },
  benefits: {
    heading: "The EduAitor Advantage",
    lead: "Schools see measurable change within weeks of going live.",
    items: [
      "98% reduction in manual paperwork",
      "Fee collection cycle shortened by up to 60%",
      "Instant parent communication instead of phone calls",
      "Zero data duplication across departments",
      "Attendance and results available in real time",
      "Automatic report cards and certificates",
      "Mobile access for every role",
      "24x7 support and dedicated onboarding help",
    ],
  },
  summary: {
    heading: "What School Management Software Should Really Do",
    paragraphs: [
      "School management software should make a school's work lighter, not add another system to juggle. EduAitor does this by putting every department on one database, one set of records and one dashboard — so the office stops re-entering data and starts making decisions with the whole picture in front of them.",
      "The platform is modular by design. A small school can begin with student records and attendance, then bring on fees, exams, transport and the AI tools as needs grow, without changing systems or migrating data. Because EduAitor is built for Indian schools, formats for admissions, fees, reports, certificates and board inspections match the way your school already works.",
      "Schools that still keep attendance registers, separate fee spreadsheets and hand-written certificates are feeling the gap widen every year. Digital-first parents, faster-moving competitors and rising board expectations all push in one direction — and EduAitor is the platform that takes the school there without disruption to the classroom.",
    ],
  },
  faqs: {
    heading: "Frequently Asked Questions",
    items: [
      { q: "Is EduAitor suitable for small schools?", a: "Yes. EduAitor scales from a 200-student school to large multi-campus groups. Smaller schools typically start with the student information, attendance, fee and communication modules, and add the rest when they are ready. Pricing is per-school with flexible module-based plans." },
      { q: "Can EduAitor handle CBSE and ICSE reporting formats?", a: "Yes. EduAitor supports CBSE, ICSE and State Board curricula out of the box, including exam patterns, report card formats, grade calculations and certificate layouts. Multi-board schools can run different formats side by side." },
      { q: "Do teachers need training before using it?", a: "The interface is designed to be intuitive, and most teachers start using it after a single orientation session. Our onboarding team conducts role-specific training for admins, teachers and office staff, and provides documentation and video guides." },
      { q: "Is my school data safe on the cloud?", a: "Yes. Data is stored on secure cloud infrastructure with encryption in transit and at rest, role-based access control, automatic backups and audit logs. We follow privacy-first practices and never sell or share school data." },
      { q: "Can parents and teachers use EduAitor on mobile?", a: "Absolutely. EduAitor includes mobile apps for parents, teachers, students and admins, plus a mobile-optimised web version. Parents get attendance alerts, homework notifications, fee reminders and results straight on their phone." },
      { q: "How long does implementation take?", a: "Most schools go live within 2–4 weeks, depending on how many modules they adopt and how quickly student data can be exported for migration. Our team manages the entire migration so your staff can keep teaching." },
    ],
  },
  cta: {
    heading: "Ready to Simplify Your School Operations?",
    text: "Join 50,000+ schools that manage admissions, fees, attendance and academics with EduAitor. Book a free, no-obligation demo today.",
  },
  demo: {
    eyebrow: "REQUEST A FREE DEMO",
    heading: "See EduAitor Live for Your School",
    text: "Tell us a little about your school and we will schedule a personalised walkthrough with your team. No obligation, no spam — just a clear look at what the platform can do for you.",
    source: sourceKey.sms,
    submitLabel: "Request Demo",
    assurances: [
      "Personalised demo for your school size and board",
      "Live walkthrough of the modules you need most",
      "Clear pricing with no hidden charges",
    ],
  },
};

/* ── Page: AI School ERP ─────────────────────────────── */
const aiSchoolErp = {
  path: "/ai-school-erp",
  metaTitle: "AI School ERP | AI-Powered School Management System | EduAitor",
  metaDescription:
    "EduAitor is the AI school ERP that runs your school and gives every student an AI tutor. Attendance, fees, exams, analytics and AI learning in one platform.",
  hero: {
    eyebrow: "AI-POWERED SCHOOL ERP",
    title: (
      <>
        The First School ERP with <span className="fl-accent">AI Built Into Everything</span>
      </>
    ),
    subtitle:
      "Most school software merely digitises old work. EduAitor is the AI school ERP that transforms it — generating assessments with AI, explaining concepts to students 24x7, predicting performance gaps and turning your school's data into daily recommendations.",
    primary: { label: "See the AI in Action", source: sourceKey.ai },
    secondary: { label: "Explore the Ecosystem", to: "/ecosystem" },
    trust: (
      <>
        <strong>AI-first</strong> platform · <strong>24x7 AI tutor</strong> for every student
      </>
    ),
    image: analyticsImage,
    imageAlt: "EduAitor AI-powered school analytics dashboard",
    imageCaption: "AI insights turn raw school data into daily recommendations",
  },
  stats: [
    { value: "10x", label: "Faster assessment generation" },
    { value: "24x7", label: "AI tutor available to students" },
    { value: "100%", label: "Of modules connected by data" },
  ],
  intro: {
    heading: "What Makes an ERP Truly AI-Powered?",
    paragraphs: [
      "A school ERP digitises operations: it stores student records, tracks fees, and manages timetables. An AI school ERP goes further. It uses artificial intelligence to do work that used to require a human — creating question papers, explaining a chapter to a student at midnight, summarising a school's fee health, or predicting which students are likely to fall behind before the exam.",
      "EduAitor wraps AI around every core module. Teachers can generate chapter-wise worksheets and unit tests in seconds instead of hours. Students open the app to ask an AI tutor to explain a concept they did not understand in class, then practice until they feel confident. Parents generate extra practice tests for their children at home.",
      "Underneath it all, an AI engine continuously analyses attendance, homework and test patterns. It flags learning gaps, predicts performance risk and tells leadership exactly where to intervene. This is what separates EduAitor from traditional school management systems — the platform does not just record school life, it makes school life better.",
    ],
  },
  why: {
    heading: "Why Schools Are Asking for AI",
    lead: "AI is no longer a futuristic idea in education — toppers, teachers and parents are using it today. The question is who benefits.",
    points: [
      { icon: IcAi, title: "Teachers Get Time Back", desc: "AI generates lesson-aligned worksheets, test papers and answer keys in seconds, freeing teachers for actual teaching and individual student attention." },
      { icon: IcSpark, title: "Every Student Gets a Tutor", desc: "A 24x7 AI companion explains concepts in simple words, shows visuals and keeps students practising until mastery — at their own pace." },
      { icon: IcChart, title: "Predict Before You React", desc: "Predictive analytics detects at-risk students early, so interventions happen before gaps turn into failures." },
      { icon: IcShield, title: "AI Within School Controls", desc: "The AI is built into the school's own platform — parents, teachers and students benefit, while the school keeps full control and privacy." },
    ],
  },
  features: {
    heading: "AI Features Across the Platform",
    lead: "Every module of EduAitor gets an AI boost. Here is where AI shows up.",
    items: [
      { icon: IcFile, title: "AI Assessment Generator", desc: "Generate worksheets, unit tests, question papers and answer keys aligned to class, subject and board." },
      { icon: IcAi, title: "AI Academic Assistant", desc: "A 24x7 tutor that explains concepts, summarises chapters and answers doubts for every student." },
      { icon: IcVideo, title: "Visual & Audio Learning", desc: "The AI explains topics with diagrams and read-aloud support for different learning styles." },
      { icon: IcChart, title: "Predictive Analytics", desc: "Forecast exam performance and detect at-risk students from attendance, homework and test data." },
      { icon: IcBulb, title: "Learning Gap Detection", desc: "Pinpoint exactly which concepts each student has not mastered, with recommended next actions." },
      { icon: IcBook, title: "Personalised Practice", desc: "Tailored practice questions that adapt to a student's level and slow down or speed up automatically." },
      { icon: IcDashboard, title: "AI Leadership Insights", desc: "Daily, plain-language recommendations for the principal — attendance dips, fee trends, at-risk classes." },
      { icon: IcMessage, title: "Smart Communication", desc: "The system drafts parent messages and reminders, and sends the right update to the right person at the right time." },
    ],
  },
  deepDive: {
    heading: "How AI Works Inside EduAitor",
    sections: [
      {
        title: "From Question Banks to Instant Assessments",
        body: [
          "Teachers lose hours every week creating worksheets and test papers. EduAitor's AI Assessment Generator changes that completely. A teacher picks the class, subject, chapter and difficulty level, and the AI produces a ready-to-print test with an answer key and solutions.",
          "The generator supports multiple question types — MCQs, short answer, long answer and assertion-reason — and follows the exam pattern of the chosen board. Teachers can edit or regenerate any question before printing, ensuring the final paper matches their exact teaching plan.",
          "For parents, the same engine powers home practice. A parent selects their child's syllabus and gets a fresh practice paper whenever the child needs extra revision.",
        ],
        image: "/ecosystem/04-ai-assessment-panel.png",
        imageAlt: "EduAitor AI assessment generator",
        caption: "Generate board-aligned question papers in seconds",
        points: [
          "Worksheets, unit tests, question papers and answer keys",
          "Aligned to CBSE, ICSE and State Boards for Classes 1–12",
          "Edit or regenerate until the paper matches your plan",
        ],
      },
      {
        title: "A 24x7 AI Tutor for Every Student",
        body: [
          "Class time is limited and every student learns differently. EduAitor's AI Academic Assistant fills the gap. A student who misses a concept in class can ask the AI tutor for a simple explanation, a chapter summary or a practice question — anytime, day or night.",
          "The tutor does not just give answers. It explains step by step, shows diagrams, offers read-aloud support, and nudges students toward understanding rather than copying. When a student repeatedly struggles with the same concept, the AI flags it to the teacher through the learning-gap report.",
          "This turns every smartphone into a homework helper. Parents who cannot help with Class 10 algebra feel confident the AI tutor is supporting their child with accurate, syllabus-aligned guidance.",
        ],
        image: "/ecosystem/05-ai-assistant-panel.png",
        imageAlt: "EduAitor AI academic assistant for students",
        caption: "A patient AI tutor available 24x7 for every learner",
        points: [
          "Concept explanations, summaries and visual breakdowns",
          "Guided practice that builds understanding step by step",
          "Learning gaps automatically reported to teachers",
        ],
      },
      {
        title: "Predictive Analytics That Protects Outcomes",
        body: [
          "By the time a report card reveals a student is failing, the gap usually started months earlier. EduAitor's predictive analytics studies patterns — attendance, homework submission, test scores and classroom participation — to forecast where students are heading.",
          "When the model detects a likely drop in performance, it raises an early alert. The teacher sees which concepts are weak, the counsellor gets an intervention checklist, and leadership sees school-wide risk trends in the analytics dashboard.",
          "This turns the school from reactive to proactive. Instead of discovering results in the exam, teachers act in time — a small course correction that changes outcomes for individual children and protects the school's academic reputation.",
        ],
        image: "/ecosystem/16-analytics-panel.png",
        imageAlt: "EduAitor predictive performance analytics",
        caption: "Predictive insights highlight at-risk students before exams",
        points: [
          "Early alerts for at-risk students",
          "Concept-level gap analysis for every learner",
          "School-wide risk trends for leadership",
        ],
      },
    ],
  },
  screenshots: {
    heading: "AI Features, Screenshots",
    items: [
      { src: "/ecosystem/04-ai-assessment-panel.png", alt: "AI assessment generator screen", caption: "AI Assessment Generator" },
      { src: "/ecosystem/05-ai-assistant-panel.png", alt: "AI academic assistant screen", caption: "AI Academic Assistant" },
      { src: "/ecosystem/16-analytics-panel.png", alt: "Predictive analytics dashboard", caption: "Predictive Performance Analytics" },
    ],
  },
  howItWorks: {
    heading: "How AI Works for Your School",
    steps: [
      { num: "01", title: "Connect Your Data", desc: "Attendance, homework, tests and timetables live in one place, giving the AI real information to learn from." },
      { num: "02", title: "AI Learns Your Syllabus", desc: "The engine maps chapters, classes and boards so assessments and explanations are always accurate." },
      { num: "03", title: "Teachers, Students & Parents Use It", desc: "Generate papers, ask doubts and create practice tests — each role gets its own AI tools." },
      { num: "04", title: "School Gets Smarter Daily", desc: "Predictive insights and recommendations keep improving as more data flows in." },
    ],
  },
  benefits: {
    heading: "Benefits of an AI School ERP",
    lead: "The impact of AI is not theoretical — it shows up in teacher hours and student scores.",
    items: [
      "Assessment creation time cut by up to 90%",
      "Personal help for every student, not just a few",
      "Early detection of learning risks",
      "Higher homework completion with guided support",
      "Better parent confidence and engagement",
      "Data-driven decisions for leadership",
      "Less teacher burnout, more teaching time",
      "A modern-school reputation that attracts admissions",
    ],
  },
  summary: {
    heading: "What an AI School ERP Really Changes",
    paragraphs: [
      "An AI school ERP is not a better spreadsheet; it is a different relationship with work. Where traditional software digitises a task, EduAitor's AI removes the task. Teachers do not write papers and then file them; the platform drafts the paper and the teacher curates it. Students do not wait for office hours when they are stuck; an AI tutor walks them through the concept at 9 pm.",
      "The operational modules — attendance, fees, exams, communication — run on the same intelligent spine. Because the data is unified, the AI engine can find patterns a school full of registers never could: an attendance dip connected to a homework slump connected to a future exam risk.",
      "For schools deciding where technology should go next, the conversation has moved past basic digitisation. Parents recognise AI, students expect it, and schools that put it to work for teachers and students will define the standard the rest of the market has to follow.",
    ],
  },
  faqs: {
    heading: "Frequently Asked Questions",
    items: [
      { q: "Is the AI content accurate and aligned to our syllabus?", a: "Yes. The AI is fed your school's class-subject-chapter structure and board, so assessments and explanations stay aligned to CBSE, ICSE or State Board curricula. Teachers can always review, edit and regenerate anything the AI produces." },
      { q: "Do students need extra devices for the AI tutor?", a: "No. Students use the same EduAitor student app they already use for homework and timetable. The AI tutor is available inside that app on phones, tablets and web browsers." },
      { q: "Can teachers control what the AI generates?", a: "Completely. Teachers choose class, subject, chapters, question types and difficulty, then review, edit or reject questions before use. Nothing is published without teacher approval." },
      { q: "Does AI replace teachers?", a: "The opposite. AI removes repetitive work — marking, paper creation, doubt repetition — so teachers can spend more time actually teaching, mentoring and giving personal attention. EduAitor's AI is designed to amplify teachers, never replace them." },
      { q: "How does predictive analytics protect student privacy?", a: "The AI analyses learning and attendance patterns inside the school's own platform on school-linked records. Data is encrypted, role-protected and never shared with third parties." },
      { q: "Can we adopt AI features gradually?", a: "Yes. Many schools start with the AI Assessment Generator for teachers, then switch on the student AI tutor and later the predictive analytics. You adopt what your school is ready for." },
    ],
  },
  cta: {
    heading: "Give Your School an AI Advantage",
    text: "See how AI can transform assessments, learning and leadership decisions at your school. Book a personalised demo.",
  },
  demo: {
    eyebrow: "SEE THE AI LIVE",
    heading: "Watch EduAitor's AI Features in Action",
    text: "Book a demo and we will show you assessments generated in real time, a live AI tutor session, and how predictive analytics protects student outcomes.",
    source: sourceKey.ai,
    submitLabel: "Book AI Demo",
    assurances: [
      "Live generation of a real worksheet during the demo",
      "See the student AI tutor from a parent's perspective",
      "Industry pricing explained with zero pressure",
    ],
  },
};

/* ── Page: Attendance Management System ──────────────── */
const attendance = {
  path: "/attendance-management-system",
  metaTitle:
    "Attendance Management System | Automatic Attendance for Schools | EduAitor",
  metaDescription:
    "Mark attendance in seconds, notify parents instantly and analyse patterns automatically. EduAitor attendance management system for schools.",
  hero: {
    eyebrow: "ATTENDANCE MANAGEMENT SYSTEM",
    title: (
      <>
        Attendance Taken in Seconds. <span className="fl-accent">Absence Acted On</span>.
      </>
    ),
    subtitle:
      "EduAitor attendance management software turns the slowest daily task in school into the fastest. Mark class attendance on any device, get automatic parent alerts, and let analytics reveal who is at risk — all without extra hardware.",
    primary: { label: "Book a Free Demo", source: sourceKey.attendance },
    secondary: { label: "Explore the Ecosystem", to: "/ecosystem" },
    trust: (
      <>
        Works with <strong>any device</strong> · <strong>No extra hardware</strong> required
      </>
    ),
    image: "/ecosystem/01-admin-panel.png",
    imageAlt: "EduAitor attendance management dashboard",
    imageCaption: "Class-wise attendance with live registers and alerts",
  },
  stats: [
    { value: "15 sec", label: "To mark a 40-student class" },
    { value: "100%", label: "Automatic parent alerts" },
    { value: "0", label: "Registers or files to maintain" },
  ],
  intro: {
    heading: "Why Attendance Still Takes Too Long in Schools",
    paragraphs: [
      "In most schools, attendance is a daily ritual that eats teacher time: roll calls, paper registers, correcting mistakes, then entering numbers into a spreadsheet at the end of the month. When a parent calls to ask if their child reached school, the office hunts through a register. When government or board reports are due, someone compiles everything by hand.",
      "EduAitor's attendance management system does away with all of this. A teacher opens the class attendance screen and marks the roster in seconds — present, absent or late — from a phone, tablet or desktop. The leave is recorded instantly, the absentee's parent receives a notification, and the daily, weekly and monthly reports update themselves.",
      "The system also handles the specialist cases Indian schools know well: staff attendance, biometric clock-in, sports and activity attendance, hostel attendance, transport boarding attendance and online class attendance during hybrid learning. Every record flows into the same analytics engine, so patterns nobody could see before become obvious.",
    ],
  },
  why: {
    heading: "The Cost of Manual Attendance",
    lead: "Attendance is not just an office formality. It is the first early-warning signal of a student going off track.",
    points: [
      { icon: IcClock, title: "Wasted Teacher Time", desc: "Teachers lose 15–20 minutes a day on registers and re-entry — hours every month that could have been teaching time." },
      { icon: IcBell, title: "Parents Left in the Dark", desc: "When a student is absent, parents deserve to know immediately. Manual systems alert no one until someone notices." },
      { icon: IcChart, title: "No Early-Warning Visibility", desc: "Chronic absence is the strongest predictor of a student falling behind, yet most schools only notice it on the mid-term report. Automated analytics catch it in week two." },
      { icon: IcReceipt, title: "Compliance Stress", desc: "Board and government attendance reports take staff days to compile from paper registers filled with errors and gaps." },
    ],
  },
  features: {
    heading: "Attendance Features Built for Real Schools",
    lead: "From class registers to board reports, EduAitor handles it all.",
    items: [
      { icon: IcUsers, title: "Class-wise Marking", desc: "Mark the full roster in seconds — present, absent, late, leave or holiday from any device." },
      { icon: IcClock, title: "Biometric & Device Options", desc: "Support for biometric machines, RFID cards and barcode scanning if your school prefers hardware." },
      { icon: IcBell, title: "Instant Parent Alerts", desc: "SMS, email and app notification to parents the moment a child is marked absent or late." },
      { icon: IcChart, title: "Daily & Monthly Reports", desc: "Auto-generated class, section, school and subject-wise reports ready for leadership and boards." },
      { icon: IcGrade, title: "Staff Attendance", desc: "Separate attendance and leave workflows for teachers and non-teaching staff." },
      { icon: IcRoute, title: "Transport Attendance", desc: "Pick-up and drop-off confirmation on buses, linked live to parents." },
      { icon: IcBook, title: "Hostel Attendance", desc: "Evening roll call for residential students with instant alerts to wardens and house parents." },
      { icon: IcVideo, title: "Online Class Attendance", desc: "Mark and track presence in live online classes during hybrid and remote learning." },
      { icon: IcBulb, title: "At-Risk Absence Alerts", desc: "Analytics flag students crossing absence thresholds before it affects their results." },
      { icon: IcFile, title: "Board-Ready Exports", desc: "Export attendance in the formats CBSE, ICSE and State Boards expect for inspections." },
    ],
  },
  deepDive: {
    heading: "How EduAitor Attendance Works",
    sections: [
      {
        title: "A Teacher's Morning in Three Taps",
        body: [
          "Class begins. The teacher opens the EduAitor app — on the classroom phone or their own device — selects the class and section, and the day's roster appears. Marking all absent, then tapping the two or three children who are away, takes under fifteen seconds.",
          "The moment she marks a child absent, the system acts. The parent's app receives a notification. The school office sees a live count. The month-to-date attendance graph updates. Nothing is re-entered anywhere, and no register needs collecting at the end of the day.",
          "For staff and other workflows, the same logic applies: biometric punch data flows in automatically, hostel roll calls use the same screen, and bus pickups log their own attendance events. One system, every kind of attendance.",
        ],
        image: "/ecosystem/01-admin-panel.png",
        imageAlt: "Marking attendance from the EduAitor admin panel",
        caption: "Mark, alert and analyse from one screen",
        points: [
          "Roster marking in under 15 seconds per class",
          "Instant alerts to parents and the office",
          "Zero manual data entry at month end",
        ],
      },
      {
        title: "Analytics That Protect Students",
        body: [
          "A single absence means little. A pattern means everything. EduAitor's analytics engine watches every student's attendance over time and connects it with homework and test data to build an early-warning picture.",
          "When a student's absence rate crosses a school-defined threshold, the system alerts the class teacher and counsellor with context — the subjects missed, recent test dips and homework gaps. Leadership can view a heat map of absence across classes and spot a problem in one section before it spreads.",
          "This analytical layer is what turns attendance software from an administrative tool into a student-support system. Schools using it report acting weeks earlier than they did with registers.",
        ],
        image: "/home/solution-dashboard.png",
        imageAlt: "Attendance analytics in EduAitor dashboards",
        caption: "Attendance patterns surface early-warning risks",
        points: [
          "Threshold-based at-risk alerts",
          "Cross-referenced with homework and test data",
          "Class and section heat maps for leadership",
        ],
      },
      {
        title: "Biometric, Device or Online — Your Choice",
        body: [
          "Some schools want hardware punch-in at the gate; others want everything on a teacher's phone. EduAitor supports both — and combinations in between.",
          "Schools with biometric machines plug their data straight into EduAitor. Schools that want to avoid hardware use the app or a QR/barcode scan at the gate. Schools running online classes mark virtual attendance inside live sessions.",
          "Whatever the source, all records land in one register and one analytics engine, giving the school a single, consistent attendance truth.",
        ],
        image: "/ecosystem/16-analytics-panel.png",
        imageAlt: "EduAitor analytics showing attendance trends",
        caption: "Every attendance source feeds one analytics engine",
        points: [
          "Works with or without hardware",
          "Unified register from every attendance source",
          "Same analytics and alerts regardless of method",
        ],
      },
    ],
  },
  screenshots: {
    heading: "Attendance System Screens",
    items: [
      { src: "/ecosystem/01-admin-panel.png", alt: "Attendance marking in the admin panel", caption: "Class attendance marking" },
      { src: "/home/solution-dashboard.png", alt: "Dashboard with live attendance overview", caption: "Live attendance overview" },
      { src: "/ecosystem/16-analytics-panel.png", alt: "Attendance analytics dashboard", caption: "Attendance analytics" },
    ],
  },
  howItWorks: {
    heading: "Setting Up Attendance Takes One Afternoon",
    steps: [
      { num: "01", title: "Upload the Roster", desc: "Your existing class and student list is imported during onboarding — no re-typing." },
      { num: "02", title: "Choose Your Methods", desc: "Pick app-based, biometric, QR or online marking — or a mix across classes." },
      { num: "03", title: "Configure Alert Rules", desc: "Decide when parents are notified and which absence thresholds trigger early warnings." },
      { num: "04", title: "Train Teachers & Go Live", desc: "A single orientation session is enough for teachers to start marking the next morning." },
    ],
  },
  benefits: {
    heading: "What Schools Gain",
    lead: "Attendance automation pays for itself in teacher time and student outcomes.",
    items: [
      "10+ hours per teacher saved every month",
      "Parents informed before they even ask",
      "At-risk students flagged in week two, not term two",
      "Board-ready reports without overtime",
      "Fewer errors than paper registers",
      "Works offline and on every device",
      "Clear staff and hostel coverage too",
      "Audit-ready records at all times",
    ],
  },
  summary: {
    heading: "Why Attendance Deserves an Automatic System",
    paragraphs: [
      "Attendance is the most repeated administrative act in a school — which is exactly why it rewards automation more than almost anything else. Every minute a teacher saves on registers is a minute given back to teaching, and every absence alert sent in real time is a small safeguard for a child.",
      "The value compounds when attendance data is connected. Patterns that were invisible on paper become clear on a dashboard: a section sliding toward chronic absence, a term where participation drops, a student whose absences coincide with falling homework scores. Schools that see these patterns early can act, and acting early is what protects outcomes.",
      "The switch is not costly either. EduAitor's attendance module works with the devices schools already have, needs no extra hardware, and lets each campus choose its own method — app, biometric, QR or online. That is why going automatic is less a project and more an afternoon.",
    ],
  },
  faqs: {
    heading: "Frequently Asked Questions",
    items: [
      { q: "Can parents be notified instantly about absence?", a: "Yes. The moment a teacher marks a child absent or late, parents receive an automatic notification through the EduAitor app, plus optional SMS and email. You control which channels and what triggers them." },
      { q: "Does it work without biometric machines?", a: "Absolutely. Marking can be done from a phone, tablet or web browser. Biometric, RFID and QR options are available only if your school already uses, or wants, hardware — but none of it is required." },
      { q: "Can different classes use different attendance methods?", a: "Yes. Digital classrooms might mark attendance on phones, the front gate can use QR scans, and hostel roll calls can use a register-style screen. All of them feed the same database and reports." },
      { q: "How are half-days, leave and holidays handled?", a: "EduAitor distinguishes present, absent, late, half-day, leave and holiday with configurable rules. The holidays calendar is school-specific, and special leave types like sports duty or exam duty are supported." },
      { q: "Can we export board-required attendance reports?", a: "Yes. Daily, monthly and cumulative reports can be exported and formatted for CBSE, ICSE and State Board requirements, including the registers schools must maintain for inspections." },
      { q: "Is manual correction still possible?", a: "Yes. Authorised staff can correct a record at any time with the reason logged in the audit trail. Corrections notify affected parties and update all downstream reports automatically." },
    ],
  },
  cta: {
    heading: "Put Attendance on Autopilot",
    text: "Give teachers their time back and give parents real-time confidence. Book a free demo of EduAitor's attendance module.",
  },
  demo: {
    eyebrow: "REQUEST A FREE DEMO",
    heading: "See Attendance Taken in Seconds",
    text: "See a live walkthrough of class marking, parent alerts and at-risk analytics, tailored to the way your school currently manages attendance.",
    source: sourceKey.attendance,
    submitLabel: "Request Demo",
    assurances: [
      "15-second class-marking demo",
      "See exactly how parents receive alerts",
      "Clear effort for onboarding explained",
    ],
  },
};

/* ── Page: Fee Management Software ───────────────────── */
const feeManagement = {
  path: "/fee-management-software",
  metaTitle: "Fee Management Software for Schools | Online Fee Collection | EduAitor",
  metaDescription:
    "Collect fees online, auto-generate receipts, chase dues automatically and reconcile finances in minutes. EduAitor school fee management software.",
  hero: {
    eyebrow: "FEE MANAGEMENT SOFTWARE",
    title: (
      <>
        Fee Collection That Schools Don&apos;t Chase.{" "}
        <span className="fl-accent">Because It&apos;s Automatic.</span>
      </>
    ),
    subtitle:
      "EduAitor fee management software lets parents pay online by UPI, card or net banking, sends automatic reminders for dues, generates receipts instantly and gives leadership a live view of the school's financial health.",
    primary: { label: "Book a Free Demo", source: sourceKey.fee },
    secondary: { label: "Explore the Ecosystem", to: "/ecosystem" },
    trust: (
      <>
        <strong>UPI, cards, net banking</strong> supported · <strong>Bank-level</strong> security
      </>
    ),
    image: feeImage,
    imageAlt: "EduAitor online fee collection and management",
    imageCaption: "Online fee collection with receipts, dues and analytics",
  },
  stats: [
    { value: "60%", label: "Faster collection cycles" },
    { value: "100%", label: "Automatic receipts & reminders" },
    { value: "0", label: "Manual reconciliation" },
  ],
  intro: {
    heading: "The Real Cost of Manual Fee Management",
    paragraphs: [
      "Fee collection is the most sensitive process in a school. Registers get lost, receipts go missing, parents argue about what was paid, and the accounts team spends days reconciling the bank statement against paper entries. At the end of each term, the office chases parents individually, one phone call at a time.",
      "EduAitor's fee management software replaces that entire manual chain. Fee structures are configured once — class-wise, term-wise, with discounts, scholarships and late fines — and then every payment, reminder, receipt and report runs on autopilot.",
      "Parents benefit as much as the office. They see exactly what is due, pay online in under a minute with UPI, and receive a digital receipt they can keep forever. The school's leadership gets a real-time dashboard of collected versus pending, so unlike the old system, they always know the true fee status.",
    ],
  },
  why: {
    heading: "Why Fee Collection Fails With Registers",
    lead: "Manual fee systems create three silent crises: cash gaps, parent friction and unreadable accounts.",
    points: [
      { icon: IcMoney, title: "Slow Collections", desc: "Parents who must come to school to pay end up paying late. Online payment removes every excuse and every queue." },
      { icon: IcPercent, title: "Leaking Discounts", desc: "Without structured discount and scholarship rules, concessions are applied inconsistently — and the school shoulders the cost silently." },
      { icon: IcReceipt, title: "Reconciliation Chaos", desc: "Matching paper receipts against one bank account fills days of staff time at month end and still produces errors." },
      { icon: IcChart, title: "No Financial Visibility", desc: "Leadership cannot see collection rate, defaulters or cash position in real time — they find out at the annual audit." },
    ],
  },
  features: {
    heading: "Fee Management Features for Schools",
    lead: "Everything from fee structure to financial reports.",
    items: [
      { icon: IcMoney, title: "Online Payment Gateway", desc: "Secure UPI, debit/credit card and net banking collection — accepted instantly on the portal." },
      { icon: IcCard, title: "Flexible Fee Structures", desc: "Class-wise, term-wise and installment-wise structures with justifiable discounts and fines." },
      { icon: IcReceipt, title: "Automatic Receipts", desc: "Instant digital receipts, printing-friendly and acceptable for TCS, TDS and audit records." },
      { icon: IcBell, title: "Smart Dues Reminders", desc: "Automatic SMS, email and app reminders sent days before and after a due date — without manual effort." },
      { icon: IcPercent, title: "Discounts & Scholarships", desc: "Percentage or fixed discounts, merit scholarships and waivers, all logged with the approving authority." },
      { icon: IcChart, title: "Live Collection Dashboard", desc: "Real-time collected vs pending by class, term and head — visible to leadership anytime." },
      { icon: IcBook, title: "Ledger & Statements", desc: "A permanent ledger per student with full history, and printable fee statements for parents." },
      { icon: IcFile, title: "Bank Reconciliation", desc: "Export-ready data matched to bank transactions so month-end reconciliation takes minutes." },
      { icon: IcShield, title: "Secure & Audited", desc: "Every payment and change is logged with audit trails; data is encrypted end-to-end." },
      { icon: IcGlobe, title: "Any Device", desc: "Parents pay from any phone or computer; the office manages from a web dashboard." },
    ],
  },
  deepDive: {
    heading: "How EduAitor Fee Management Works",
    sections: [
      {
        title: "One Structure, Every Head, All Terms",
        body: [
          "Setup starts with the school's actual fee model. You define tuition, transport, hostel, exam and activity heads; split them by class and instalment; attach due dates; and apply the discounts or scholarships your school grants.",
          "Once the structure exists, everything downstream is automatic. When a due date passes, reminders go out by SMS, email and app. When a parent pays, the amount lands in the ledger under the right heads, a receipt is generated, and the dashboard figures update.",
          "Changes mid-year are easy too. A fee revision or a special waiver updates forward-looking instalments without rewriting history, and every change is logged so audits are clean.",
        ],
        image: "/ecosystem/16-analytics-panel.png",
        imageAlt: "EduAitor fee analytics dashboard",
        caption: "Live collection and dues analytics for leadership",
        points: [
          "Class-wise, term-wise structures under one roof",
          "Automatic reminders and receipts on every due date",
          "Full audit trail for every fee change",
        ],
      },
      {
        title: "Payment Options Parents Already Use",
        body: [
          "The most common reason fee payments are late is inconvenience, not unwillingness. EduAitor removes every barrier by accepting the payment methods Indian parents already use daily — UPI, debit and credit cards, and net banking.",
          "Parents open the fee screen, see the amount, choose an option and pay in under a minute. The transaction is confirmed in real time, the receipt appears instantly, and the family keeps a permanent digital record.",
          "For schools that still accept cash and cheques, the office can record offline payments in the same system, keeping one unified ledger across online and offline collection.",
        ],
        image: feeImage,
        imageAlt: "Online fee payment screen for parents",
        caption: "Pay dues in under a minute with UPI or cards",
        points: [
          "UPI, card and net banking — no friction for parents",
          "Offline cash and cheque collection recorded in the same ledger",
          "Instant confirmation and digital receipts",
        ],
      },
      {
        title: "Financial Visibility for Leadership",
        body: [
          "Principals and owners rarely get a straight answer to the most important question: how much fees has the school actually collected? With EduAitor, the answer is live on a dashboard — collected, pending, overdue, per class, per term, per head.",
          "The analytics layer also shows collection trends: which classes pay on time, where defaults concentrate, and which reminders work. This turns fee management from a back-office chore into a strategic financial function.",
          "At year end, reports export into the formats auditors, the income-tax filing and management accounts expect, so the finance team closes the year in days, not weeks.",
        ],
        image: "/ecosystem/01-admin-panel.png",
        imageAlt: "Fee management overview in the school admin panel",
        caption: "Every head, class and term visible in one dashboard",
        points: [
          "Real-time collected vs pending visibility",
          "Collection trend analysis by class and head",
          "Auditor-ready exports at year end",
        ],
      },
    ],
  },
  screenshots: {
    heading: "Fee Management Screens",
    items: [
      { src: feeImage, alt: "Fee collection dashboard", caption: "Fee collection dashboard" },
      { src: "/ecosystem/16-analytics-panel.png", alt: "Fee analytics and dues", caption: "Dues and collection analytics" },
      { src: "/ecosystem/01-admin-panel.png", alt: "Fee module in the admin panel", caption: "Fee module overview" },
    ],
  },
  howItWorks: {
    heading: "From Paper to Paid in Four Steps",
    steps: [
      { num: "01", title: "Import Fee Structures", desc: "Your class-wise fee heads, instalments and discounts are configured by our onboarding team." },
      { num: "02", title: "Invite Parents", desc: "Parents get access to the portal with balances auto-computed from their child's class and term." },
      { num: "03", title: "Collections Run Automatically", desc: "Parents pay online; reminders, receipts and ledgers update without staff effort." },
      { num: "04", title: "Leadership Gets Clarity", desc: "Live dashboards and exportable reports give everyone a single financial truth." },
    ],
  },
  benefits: {
    heading: "What Better Fee Management Looks Like",
    lead: "The difference shows up in collections, cash flow and staff time.",
    items: [
      "Significantly faster cash collection every term",
      "Only polite, automatic reminders — no awkward calls",
      "Zero lost or disputed receipts",
      "Month-end reconciliation in minutes, not days",
      "Transparent discount and waiver governance",
      "No cash-handling errors in the office",
      "Current and accurate dues for parents anytime",
      "Clear financials for board and audit",
    ],
  },
  summary: {
    heading: "Fee Management Should Be Invisible",
    paragraphs: [
      "The best fee systems are the ones parents and staff barely notice, because everything just works. Parents pay without standing in line, receipts appear instantly, reminders arrive politely and never urgently, and the accounts team closes the month in minutes rather than during a weekend of spreadsheets.",
      "EduAitor delivers that calm through structure: one configured fee model, automatic collection across every head and class, and live financial views that leadership can read at a glance. The office stops being the bottleneck between a parent's payment and the school's ledger.",
      "Schools that modernise fee collection report a queue of side effects no one predicted — fewer disputes at the counter, warmer parent relationships, cleaner audits and a finance team freed to focus on planning instead of chasing. That is what moving from registers to a proper fee management system actually looks like.",
    ],
  },
  faqs: {
    heading: "Frequently Asked Questions",
    items: [
      { q: "Which payment methods can parents use?", a: "Parents can pay online via UPI, debit cards, credit cards and net banking through our secure payment gateway. Schools can also record cash and cheque collections in the same ledger, giving one unified record." },
      { q: "Can we structure fees differently for each class?", a: "Yes. Fee structures are fully configurable — different heads, amounts, instalments and due dates for every class and section. Discounts, scholarships and late fines can be applied as percentage or fixed values." },
      { q: "What happens when a payment is late?", a: "EduAitor sends automatic reminders by app, SMS and email a few days before and after the due date. Late fines, if your school charges them, are computed automatically and shown to the parent. You control the reminder schedules." },
      { q: "Can parents see receipts and payment history?", a: "Yes. Every parent has a personal fee dashboard showing their child's dues, payment history and digital receipts they can download or print at any time — ending receipt disputes permanently." },
      { q: "How does reconciliation with the bank work?", a: "The gateway and ledger sit on one system, so the day's collections reconcile automatically. Exports make final matching with bank statements a minutes-long task, and monthly fee statements can be generated in one click." },
      { q: "Is our financial data secure?", a: "Yes. All payment data is handled through a PCI-compliant gateway with encryption, and school financial records are protected with role-based access and full audit logs. Only authorised finance staff see money figures." },
    ],
  },
  cta: {
    heading: "Collect Fees Sooner. Reconcile in Minutes.",
    text: "Stop chasing dues and start seeing real-time financial clarity. Book a free demo of EduAitor's fee management software.",
  },
  demo: {
    eyebrow: "REQUEST A FREE DEMO",
    heading: "See Fee Collection on Autopilot",
    text: "We will show you a live parent payment, automatic receipts, reminder flows and the leadership dashboard — all tailored to your fee structure.",
    source: sourceKey.fee,
    submitLabel: "Request Demo",
    assurances: [
      "Live demo of online payment and receipts",
      "See your-type fee structures configured",
      "Pricing that makes sense for schools of all sizes",
    ],
  },
};

/* ── Page: Exam Management System ────────────────────── */
const exam = {
  path: "/exam-management-system",
  metaTitle: "Exam Management System for Schools | Online Exam Software | EduAitor",
  metaDescription:
    "Schedule exams, generate papers with AI, mark online, print report cards automatically. EduAitor exam management system for schools.",
  hero: {
    eyebrow: "EXAM MANAGEMENT SYSTEM",
    title: (
      <>
        From Exam Schedule to Report Card —{" "}
        <span className="fl-accent">Without the Panic</span>
      </>
    ),
    subtitle:
      "EduAitor's exam management system plans the timetable, generates question papers with AI, tracks every mark, computes grades and prints report cards automatically — so exams focus on measuring learning, not creating chaos.",
    primary: { label: "Book a Free Demo", source: sourceKey.exam },
    secondary: { label: "Explore the Ecosystem", to: "/ecosystem" },
    trust: (
      <>
        <strong>AI-generated</strong> question papers · <strong>Auto</strong> report cards
      </>
    ),
    image: "/ecosystem/04-ai-assessment-panel.png",
    imageAlt: "EduAitor exam management and AI assessment generator",
    imageCaption: "Papers generated with AI, exams tracked end-to-end",
  },
  stats: [
    { value: "90%", label: "Less time writing papers" },
    { value: "1 click", label: "To print a full report card" },
    { value: "0", label: "Spreadsheets for marks" },
  ],
  intro: {
    heading: "Why Exam Season Overwhelms Schools",
    paragraphs: [
      "Exam season is the busiest time of the school year — and the most manual. Teachers spend days drafting question papers. The office assembles timetables, supervises centres and collects marks across dozens of class registers. Then grade calculations, report cards and progress reports are compiled by hand, late at night, under pressure.",
      "EduAitor's exam management system turns this into a structured, mostly-automatic workflow. Exams are planned on the academic calendar, papers are created with AI against your syllabus, marks entry is quick and validated, and results are computed, analysed and published instantly.",
      "Beyond paperwork, the system makes exams more useful. Teachers see question-wise analysis of how each class performed. Students and parents track progress against previous exams. Leadership sees subject and teacher trends that drive decisions for the next term.",
    ],
  },
  why: {
    heading: "The Hidden Costs of Manual Exam Systems",
    lead: "The real cost of manual exams is not just overtime — it is the quality of every examination itself.",
    points: [
      { icon: IcClock, title: "Paper Creation Burnout", desc: "Drafting quality, board-aligned papers by hand eats weeks of teacher time every exam cycle." },
      { icon: IcFile, title: "Coordination Chaos", desc: "Timetables, rooms, invigilation and collection are spread across registers and people's memories." },
      { icon: IcChart, title: "Marks Entry Errors", desc: "Transcribing marks into spreadsheets guarantees typos — which then silently ruin report cards and rankings." },
      { icon: IcReceipt, title: "Slow, Inconsistent Reports", desc: "Report cards produced late or inconsistently erode parent trust and add stress to already-stressed students." },
    ],
  },
  features: {
    heading: "Exam Management Features",
    lead: "A complete pipeline from planning to report card.",
    items: [
      { icon: IcBook, title: "Exam Planning", desc: "Define exams — periodic tests, half-yearly, finals — with dates and weightage on the calendar." },
      { icon: IcAi, title: "AI Question Paper Generator", desc: "Generate chapter-wise papers with answer keys in seconds, aligned to class, subject and board." },
      { icon: IcFile, title: "Question Banks", desc: "Build a reusable question bank per subject and chapter for consistent, standards-aligned papers." },
      { icon: IcClock, title: "Timetable & Rooms", desc: "Auto-generate exam timetables with conflict-free room and invigilation allocation." },
      { icon: IcGrade, title: "Marks & Grade Entry", desc: "Fast, validated marks entry by roll number with automatic grade conversion." },
      { icon: IcChart, title: "Instant Results & Analysis", desc: "Marks, percentages, ranks and question-wise class analysis appear the moment entry completes." },
      { icon: IcReceipt, title: "Report Cards & Progress Reports", desc: "Board-format report cards and multi-term progress reports print in one click." },
      { icon: IcPrint, title: "Hall Tickets & Admit Cards", desc: "Generate admit cards with exam schedules for students ahead of the exam." },
      { icon: IcMessage, title: "Result Publishing", desc: "Share individual results securely with parents via app, SMS and email." },
      { icon: IcChart, title: "Subject & Teacher Analysis", desc: "Spot weak subjects and teaching patterns across classes for the next term." },
    ],
  },
  deepDive: {
    heading: "How the Exam Lifecycle Flows",
    sections: [
      {
        title: "Planning and Papers Without the All-Nighter",
        body: [
          "The exam cycle starts on the academic calendar. The principal defines the exam, its dates and weightage, and the platform automatically builds a timetable that resolves clashes between classes, rooms and invigilators.",
          "Teachers then prepare papers using the AI generator. Pick the class, subject, chapters and question types, and the AI drafts a board-aligned paper with an answer key in under a minute. Every generated paper can be edited, regenerated or replaced, and approved papers are stored for reuse in the question bank.",
          "This removes the most dreaded part of exam season — the weekend spent writing question papers from scratch — while improving consistency across sections.",
        ],
        image: "/ecosystem/04-ai-assessment-panel.png",
        imageAlt: "AI question paper generator in EduAitor",
        caption: "Board-aligned papers and answer keys in seconds",
        points: [
          "Auto-built, clash-free exam timetables",
          "AI papers with editable, reusable question banks",
          "Approve and lock papers before printing",
        ],
      },
      {
        title: "Marks Entry That Cannot Be Lost",
        body: [
          "After the exam, teachers enter marks directly into the platform — by roll number, subject, or with the class attendance on the same screen. Validation catches out-of-range entries instantly, and partial entry is supported while marking is still in progress.",
          "The moment entry is complete, grades are computed automatically using the school's grading pattern. Percentages, ranks, positional grades and pass/fail are all derived, not recalculated by hand. Absolutely no spreadsheet passes through this system.",
          "If a teacher mis-enters a mark, an authorised correction updates every downstream report — report card, progress report, rank and analysis — in one action, with an audit trail.",
        ],
        image: "/ecosystem/03-academics-panel.png",
        imageAlt: "Academic suite with marks and grades",
        caption: "Validated marks entry with instant grade computation",
        points: [
          "Fast, validation-safe marks entry",
          "Automatic grades, ranks and percentages",
          "One-correction-updates-everything audit trail",
        ],
      },
      {
        title: "Report Cards and Analysis in One Click",
        body: [
          "Report cards are the visible output parents judge schools by. EduAitor prints board-format report cards — with grades, subject-wise scores, remarks and teacher comments — for every student in one click.",
          "Parents receive results privately through the app, with historical progress across terms. The analytics layer meanwhile builds question-wise and subject-wise performance views, showing teachers exactly where a class succeeded and where it slipped.",
          "Leadership sees school-wide exam performance — best and weakest subjects, classes trending up or down, and students who need attention — replacing guesswork with evidence.",
        ],
        image: "/ecosystem/16-analytics-panel.png",
        imageAlt: "Exam results analytics dashboard",
        caption: "Results, ranks and analysis appear instantly",
        points: [
          "Board-format report cards at the click of a button",
          "Private result publishing to parents",
          "Question-wise, class-wise and school-wide analysis",
        ],
      },
    ],
  },
  screenshots: {
    heading: "Exam Management Screens",
    items: [
      { src: "/ecosystem/04-ai-assessment-panel.png", alt: "AI assessment generator", caption: "AI question paper generator" },
      { src: "/ecosystem/03-academics-panel.png", alt: "Academic management screen", caption: "Exam planning and marks" },
      { src: "/ecosystem/16-analytics-panel.png", alt: "Results analytics", caption: "Results and performance analytics" },
    ],
  },
  howItWorks: {
    heading: "From Calendar to Report Card",
    steps: [
      { num: "01", title: "Define the Exam", desc: "Set dates, weightage and grading on the academic calendar; the timetable builds itself." },
      { num: "02", title: "Generate Papers", desc: "Teachers create AI papers with answer keys and approve them into the question bank." },
      { num: "03", title: "Enter Marks", desc: "Validated entry per class and subject; grades, ranks and percentages compute instantly." },
      { num: "04", title: "Print & Publish", desc: "Report cards print in one click and private results reach parents by app, SMS and email." },
    ],
  },
  benefits: {
    heading: "What Automated Exams Deliver",
    lead: "A shorter, calmer exam season with better data for everyone.",
    items: [
      "Weeks of paper-writing time returned to teachers",
      "Zero transcription errors in marks",
      "Consistent board-aligned papers across sections",
      "Report cards ready on time, every time",
      "Instant, accurate results and rankings",
      "Question-wise insights that improve teaching",
      "Private, paper-saving result publishing",
      "School-wide trends for leadership",
    ],
  },
  summary: {
    heading: "Exams Should Measure Learning, Not Staff Stamina",
    paragraphs: [
      "Every exam season, the same weariness repeats: teachers burning nights over question papers, the office assembling marks from scattered registers, and report cards finally reaching parents late and full of small errors. None of this fatigue measures a single thing about student learning.",
      "Moving the exam lifecycle onto one platform changes the season. Papers come from an AI generator aligned to the syllabus, marks are entered with validation, grades and ranks compute themselves, and report cards print as a batch. The time saved is real teacher time, returned to actual teaching.",
      "The quieter benefit is analytical. Question-wise and class-wise views show what students actually understood, giving teachers their best evidence on how to teach the next unit. Exam software that turns every test into a teaching signal is not just efficient — it makes the school smarter with every examination.",
      "None of this requires the school to change how it teaches. Exams, grades, boards and report formats stay exactly as they are; only the machinery around them becomes digital and automatic. That combination — no teaching change, huge operational change — is why exam seasons on EduAitor feel different from the start.",
    ],
  },
  faqs: {
    heading: "Frequently Asked Questions",
    items: [
      { q: "Can EduAitor generate question papers automatically?", a: "Yes. The AI Question Paper Generator creates chapter-wise papers with answer keys based on class, subject, board and question types. Teachers review, edit or regenerate anything before approval, and approved papers are stored for reuse." },
      { q: "Does it support our exam pattern?", a: "EduAitor supports periodic tests, half-yearly, annual, unit tests and internal assessments, with configurable grade patterns and weightage. CBSE, ICSE and State Board reporting formats are built in." },
      { q: "How are marks and grades validated?", a: "Entry screens validate scores against maximum marks, flag out-of-range and conflicting entries, and compute grades automatically from the school's grading scheme. Corrections update every downstream report with a full audit trail." },
      { q: "Can parents see results on mobile?", a: "Yes. Results are published privately through the parent app, with SMS and email options. Parents see current and past term results plus progress comparisons." },
      { q: "Do we need internet for marks entry?", a: "Entry works on the web and mobile apps. For classrooms with patchy connectivity, entries can be made on mobile and sync automatically once back online." },
      { q: "Can we customise report cards?", a: "Yes. Report card layouts, grade boundaries, comments and remarks are configurable per school and board, and you can preview before printing the full batch." },
    ],
  },
  cta: {
    heading: "Make Your Next Exam the Smoothest Yet",
    text: "See AI paper generation, validated marks entry and one-click report cards live. Book a free demo today.",
  },
  demo: {
    eyebrow: "REQUEST A FREE DEMO",
    heading: "Watch an Exam Run on EduAitor",
    text: "In a single demo we will plan an exam, generate a paper with AI, enter marks and print a report card — so you can see the whole lifecycle in twenty minutes.",
    source: sourceKey.exam,
    submitLabel: "Request Demo",
    assurances: [
      "Live AI paper generation during the demo",
      "Report card format matched to your board",
      "Clear roadmap for your exam season",
    ],
  },
};

/* ── Page: Parent Mobile App ─────────────────────────── */
const parentApp = {
  path: "/parent-mobile-app",
  metaTitle: "Parent App for Schools | School Parent Communication App | EduAitor",
  metaDescription:
    "Attendance alerts, homework reminders, fee payments, results and direct teacher messages — all in the EduAitor parent mobile app.",
  hero: {
    eyebrow: "PARENT MOBILE APP",
    title: (
      <>
        Every Moment of Your Child&apos;s School Day,{" "}
        <span className="fl-accent">At Your Fingertips</span>
      </>
    ),
    subtitle:
      "The EduAitor parent app ends the guessing game. See attendance the moment it is marked, get homework and fee reminders, track results term by term, and message teachers — all from one simple, secure mobile app.",
    primary: { label: "Book a Free Demo", source: sourceKey.parent },
    secondary: { label: "Explore the Ecosystem", to: "/ecosystem" },
    trust: (
      <>
        Works on <strong>Android & iOS</strong> · Results, fees, homework, transport — one app
      </>
    ),
    image: "/home/diff-parent.png",
    imageAlt: "EduAitor parent mobile app for schools",
    imageCaption: "The parent app keeps every school update in one place",
  },
  stats: [
    { value: "Instant", label: "Attendance & homework alerts" },
    { value: "1 min", label: "To pay fees online" },
    { value: "24x7", label: "Access to results and records" },
  ],
  intro: {
    heading: "Parents Want to Know. Schools Can't Call Everyone.",
    paragraphs: [
      "A school day is full of moments parents care about: did my child reach school? What homework was assigned? When is the PTM? How much is the instalment? Traditional communication answers these one phone call at a time — and most parents simply never get called.",
      "EduAitor's parent mobile app changes this from reactive to real-time. The same attendance event, homework post, fee reminder or exam result that teachers record in the school system automatically reaches the parent's phone — no office follow-up required.",
      "Better communication also builds trust, and trust builds admissions. Schools that keep parents informed consistently report happier families, fewer complaints at the gate and a stronger reputation in the community.",
    ],
  },
  why: {
    heading: "Why Parent Communication Fails Today",
    lead: "The gaps in school-parent communication are predictable — and fixable.",
    points: [
      { icon: IcClock, title: "Information Travels Slowly", desc: "By the time a parent learns about a missed class or an overdue fee, the opportunity to act has passed. Updates must reach parents when they happen." },
      { icon: IcMessage, title: "Overloaded Channels", desc: "WhatsApp groups mix every year, class and event into one noisy thread. Parents miss exactly the messages meant for them." },
      { icon: IcChart, title: "No Visibility Into Progress", desc: "Parents meet teachers twice a year and otherwise hear little about their child's progress until the report card." },
      { icon: IcMoney, title: "Fee Confusion", desc: "Without a clear dues view, parents get surprised by charges — and the awkwardness strains the relationship." },
    ],
  },
  features: {
    heading: "What the Parent App Includes",
    lead: "Everything a parent needs to support their child's learning.",
    items: [
      { icon: IcBell, title: "Attendance Alerts", desc: "Instant notification the moment your child is marked present, absent or late." },
      { icon: IcBook, title: "Homework & Assignments", desc: "Daily homework feeds with deadlines, attachments and submission status." },
      { icon: IcCard, title: "Fee Dashboard", desc: "Dues, payment history and receipts — pay online in under a minute." },
      { icon: IcChart, title: "Results & Progress", desc: "Exam results and progress graphs across terms, subjects and classes." },
      { icon: IcMessage, title: "Teacher Messaging", desc: "Direct, respectful messaging with teachers — no unregulated WhatsApp groups." },
      { icon: IcClock, title: "Timetable & Calendar", desc: "Daily timetable, PTMs, holidays and school events in one calendar." },
      { icon: IcAi, title: "AI Practice & Tutoring", desc: "Generate practice tests for your child and let the AI tutor help at home." },
      { icon: IcRoute, title: "Transport Tracking", desc: "Bus arrival tracking so you wait at the stop, not for the bus." },
      { icon: IcFile, title: "Documents & Notices", desc: "Circulars, notices and downloadable documents — nothing lost in school bags." },
      { icon: IcShield, title: "Private & Secure", desc: "Each parent sees only their own children; login is protected and audited." },
    ],
  },
  deepDive: {
    heading: "What Parents Experience Every Day",
    sections: [
      {
        title: "Morning to Evening, In the Loop",
        body: [
          "At 8:20 am the app pings: your child reached school. At 1:10 pm: today's homework is up, with the deadline marked. At 4:00 pm: the second fee instalment is due in five days — pay now. At 8:00 pm: your child's AI tutor flagged a weak area in fractions, practice set generated.",
          "None of these messages require a single call from the school office. Each one is produced automatically by the same system teachers already use, then delivered to the right parent through the app with SMS and email backups.",
          "By the time the PTM arrives, parents are already informed, engaged and ready to talk about progress — not catching up on three months of news.",
        ],
        image: "/home/stakeholder-parents.png",
        imageAlt: "Parent engaging with the EduAitor app",
        caption: "Parents stay informed and involved automatically",
        points: [
          "Automatic, event-driven updates through the day",
          "SMS and email fallbacks for critical alerts",
          "Parents arrive at PTMs already informed",
        ],
      },
      {
        title: "A Treasure Chest of Learning Tools",
        body: [
          "The parent app is not just a notice board — it is a learning partner. When a chapter test is near, a parent can generate a practice paper right from the app, tailored to the child's class and syllabus.",
          "If the child is stuck on a concept in the evening, the integrated AI tutor explains it step by step with visuals, then practices until the child is confident. Parents who cannot help with modern mathematics finally have a trusted helper.",
          "Progress graphs across terms show trends that a single report card could never reveal — improvement in science, a dip in mathematics, remarkable growth in confidence.",
        ],
        image: "/ecosystem/05-ai-assistant-panel.png",
        imageAlt: "AI tutor and practice tools in the parent app",
        caption: "AI tutoring and practice tools at home",
        points: [
          "Practice tests generated from the child's syllabus",
          "A 24x7 AI tutor for homework doubts",
          "Multi-term progress graphs and trends",
        ],
      },
      {
        title: "One App, Every Child, Every School",
        body: [
          "Families sometimes have children in different schools — or move schools mid-year. The EduAitor parent app elegantly supports multiple children, even across schools, from a single login.",
          "Parents switch between children and see each one's attendance, fees, homework and results without juggling apps or logins. Notifications are automatically routed to the correct child's feed.",
          "This multi-child design might sound simple, but it removes one of the most irritating parts of school software for large families.",
        ],
        image: "/home/solution-dashboard.png",
        imageAlt: "Switching between children in the parent app",
        caption: "Multiple children, multiple schools, one app",
        points: [
          "All children under one secure login",
          "Notifications routed to the right child's feed",
          "Perfect for siblings and school moves",
        ],
      },
    ],
  },
  screenshots: {
    heading: "The Parent App Experience",
    items: [
      { src: "/home/diff-parent.png", alt: "Parent app update feed", caption: "Parent update feed" },
      { src: "/home/stakeholder-parents.png", alt: "Parent engagement view", caption: "Parent engagement" },
      { src: "/ecosystem/05-ai-assistant-panel.png", alt: "Learning tools in the app", caption: "AI learning tools" },
    ],
  },
  howItWorks: {
    heading: "Reach Every Parent, Painlessly",
    steps: [
      { num: "01", title: "Connect Parents", desc: "During onboarding, parent accounts are created from existing guardian records — no new data entry." },
      { num: "02", title: "Parents Install the App", desc: "A simple invite link takes parents to the app on Android or iOS and they log in with their child's details." },
      { num: "03", title: "School Keeps Working", desc: "Teachers and staff use EduAitor as usual — every action automatically reaches the right parent." },
      { num: "04", title: "Family Stays Involved", desc: "Alerts, results, fees and learning tools build an ongoing school-home partnership." },
    ],
  },
  benefits: {
    heading: "Why Schools Add a Parent App",
    lead: "The parent app is not an add-on; it is the school's best communication channel.",
    items: [
      "Fewer calls and visits to the office",
      "Instant, accurate parent notifications",
      "Higher fee collection with clear reminders",
      "Stronger parent-school trust",
      "Better homework completion at home",
      "A modern reputation that attracts admissions",
      "Less dependence on chaotic WhatsApp groups",
      "Transparent results and progress reporting",
    ],
  },
  summary: {
    heading: "Communication Is the School's Quiet Reputation",
    paragraphs: [
      "Parents cannot see everything that happens inside a school, so they judge it by what they see. A school that answers instantly, informs consistently and involves families in learning builds a reputation no amount of advertising can buy. The parent app is where that reputation is made, daily.",
      "The practical gains are immediate too. The office takes fewer calls about attendance and fees, teachers send homework reminders without thinking, and collections improve because dues are visible instead of surprising. Every conversation that used to be a phone call becomes an automatic update.",
      "Perhaps the biggest change is cultural. When parents are given real visibility into learning — progress graphs, AI practice tools, honest results — they move from spectators to partners. Schools that open this window find families more supportive, more engaged and measurably prouder of the institution.",
    ],
  },
  faqs: {
    heading: "Frequently Asked Questions",
    items: [
      { q: "Which phones does the parent app support?", a: "The app works on Android and iOS, with a fully mobile-optimised web version as well. Any smartphone in the family can install it, and notifications also arrive by SMS and email for critical alerts." },
      { q: "Can the parent app handle more than one child?", a: "Yes. A single secure login supports multiple children, including children studying in different schools using EduAitor. Each child has their own feed and notification routing." },
      { q: "Do parents need to pay for the app?", a: "No. The parent app is provided by your school's EduAitor subscription — families pay nothing. Schools choose which communication channels to use, and parents can disable non-essential notifications." },
      { q: "How are parent-teacher messages moderated?", a: "Messaging happens through structured, school-monitored channels with optional timings and read receipts. Schools can set reply windows so teachers are not contacted at night, and all messages are logged." },
      { q: "Can fees really be paid inside the app?", a: "Yes. The fee dashboard shows exact dues, and a parent can pay by UPI, card or net banking in under a minute. Receipts and payment history stay permanently available in the app." },
      { q: "What if a parent does not use smartphones?", a: "Critical updates like attendance and fees are also delivered by SMS and email. The school office can print or share information for families without smartphones, and results are available on a web portal." },
    ],
  },
  cta: {
    heading: "Turn Parents Into Partners",
    text: "Give every family real-time visibility and better support their children. Book a free demo of the EduAitor parent app.",
  },
  demo: {
    eyebrow: "REQUEST A FREE DEMO",
    heading: "See the Parent App in Action",
    text: "We'll walk through a parent's day — alerts, homework, fees and results — so you can see exactly what your families will experience.",
    source: sourceKey.parent,
    submitLabel: "Request Demo",
    assurances: [
      "See the app from an actual parent's view",
      "Understand multi-child and multi-school support",
      "Simple steps to roll it out to your families",
    ],
  },
};

/* ── Page: Student Information System ────────────────── */
const sis = {
  path: "/student-information-system",
  metaTitle: "Student Information System | Student Records Management | EduAitor",
  metaDescription:
    "Centralise student records, admissions, documents, history and analytics. EduAitor student information system for schools.",
  hero: {
    eyebrow: "STUDENT INFORMATION SYSTEM",
    title: (
      <>
        Every Student Record, Complete and Connected —{" "}
        <span className="fl-accent">From Admission to Alumni</span>
      </>
    ),
    subtitle:
      "The EduAitor student information system (SIS) is the digital home of every student: personal data, guardians, documents, attendance, fees, academics, disciplinary notes and history — all in one secure, instantly-searchable record.",
    primary: { label: "Book a Free Demo", source: sourceKey.sis },
    secondary: { label: "Explore the Ecosystem", to: "/ecosystem" },
    trust: (
      <>
        <strong>One record</strong> powers every module · <strong>Zero</strong> duplicate files
      </>
    ),
    image: studentInfoImage,
    imageAlt: "EduAitor student information system records",
    imageCaption: "Complete, structured student records in one place",
  },
  stats: [
    { value: "1", label: "Source of truth for every student" },
    { value: "100%", label: "Documents stored digitally" },
    { value: "0", label: "Lost files or registers" },
  ],
  intro: {
    heading: "What a Student Information System Really Does",
    paragraphs: [
      "A student information system is the operational backbone of a school. It holds who a student is, where they came from, how they learn and what they have achieved — and it makes every one of those facts available instantly to the people who need it.",
      "In most schools this information lives in registers, admission files, spreadsheets and someone's memory. When a document is needed, someone walks to a cupboard. When a parent's number changes, it updates in one file and nowhere else.",
      "EduAitor's SIS centralises everything in a structured digital record. Personal details, family and guardian information, medical notes, documents, admissions history, attendance patterns, fee records, exam results, achievements and conduct — each facts folder is complete, current and connected to every module of the platform.",
    ],
  },
  why: {
    heading: "Why Fragmented Student Data Hurts Schools",
    lead: "Every duplicate register and lost file is a hidden liability.",
    points: [
      { icon: IcClock, title: "Slow, Cumbersome Lookups", desc: "Finding a student's documents or history during admissions, exams or an emergency takes minutes to hours of file-hunting." },
      { icon: IcFile, title: "Duplicate and Conflicting Data", desc: "The same student appears in six registers with six slightly different dates and numbers. Nobody knows which is right." },
      { icon: IcShield, title: "Compliance Gaps", desc: "Board inspections demand accurate, maintained student records. Manual files fail audits and create stress." },
      { icon: IcChart, title: "Invisible Patterns", desc: "Schools cannot aggregate data they cannot see. With records in files, class-level trends and risk signals stay invisible." },
    ],
  },
  features: {
    heading: "Student Information System Features",
    lead: "Comprehensive records with purpose-built workflows.",
    items: [
      { icon: IcUsers, title: "Complete Student Profiles", desc: "Personal, family, guardian, address, medical and academic data in one structured profile." },
      { icon: IcFile, title: "Document Management", desc: "Upload and verify birth certificates, Aadhaar, transfer certificates, photos and more." },
      { icon: IcClock, title: "Full History Timeline", desc: "Admission date, class changes, schools attended, awards and incidents — a complete journey." },
      { icon: IcDashboard, title: "Smart Search", desc: "Find any student in seconds by name, roll number, registration ID, guardians or any field." },
      { icon: IcBook, title: "Admissions Integration", desc: "New students flow from online admission forms straight into active student records." },
      { icon: IcBell, title: "Emergency & Health Info", desc: "Critical medical and emergency-contact data visible to authorised staff when it matters." },
      { icon: IcGrade, title: "Academics Panel", desc: "Attendance, grades, exam history and progress linked from the modules that create them." },
      { icon: IcPrint, title: "Documents & Certificates", desc: "Generate bonafide letters, TC, certificates and reports from the student's own data." },
      { icon: IcChart, title: "Cohort Analytics", desc: "Student counts, class movements and demographics visible as live, filterable reports." },
      { icon: IcShield, title: "Granular Permissions", desc: "Role-based views ensure only authorised people see sensitive student information." },
    ],
  },
  deepDive: {
    heading: "Life of a Student Record in EduAitor",
    sections: [
      {
        title: "From Application to Active Student",
        body: [
          "A student's record in EduAitor begins before they join — at the online admission application. The form captures basic details, and documents are uploaded and verified digitally as part of the workflow.",
          "When the admission is confirmed, the application becomes a full student profile. Nothing is re-typed. Fees are set from the class structure, a house and roll number are assigned, and parents gain access to the parent app with exactly the right linked child.",
          "The school's office sees the whole journey in a timeline — application, payment, onboarding, class moves, test and exam records, awards and notices — one continuous, auditable story.",
        ],
        image: "/ecosystem/02-admissions-panel.png",
        imageAlt: "Admissions flow feeding the student information system",
        caption: "Applications become complete student records automatically",
        points: [
          "Zero re-typing between admission and enrolment",
          "Digital document verification in the workflow",
          "Guardians auto-linked to the parent app",
        ],
      },
      {
        title: "Every Module Reads the Same Record",
        body: [
          "This is where a true SIS earns its name. When a class teacher marks attendance, it lands on the student's attendance history. When the office records a fee payment, it appears in the student's ledger and the parent's app. When an exam finishes, results attach themselves to the student's academic panel.",
          "Because every module reads and writes to the same student record, nothing is ever duplicated or out of sync. The principal, class teacher, office and parents are all looking at the same facts.",
          "Schools stop reconciling the inevitable — they stop reconciling entirely.",
        ],
        image: studentInfoImage,
        imageAlt: "Unified student record across modules",
        caption: "Attendance, fees and results attach to one record",
        points: [
          "Attendance, fees and results update the same profile",
          "No reconciliation between modules, ever",
          "Parents and staff view the same single truth",
        ],
      },
      {
        title: "Reports and Certificates from Live Data",
        body: [
          "Student information only delivers its value when it is used. EduAitor turns the SIS into an output machine: bonafide letters, transfer certificates, duplicate ID cards and subject-wise reports are generated from the student's own live data.",
          "Cohort views show the principal student counts by class, board and category; movement reports show who left and who arrived each term; and demographic filters power everything from mid-day meal counts to bus planning.",
          "Board inspections and audits find a complete, print-ready, exportable student register — maintained automatically, always current.",
        ],
        image: "/ecosystem/01-admin-panel.png",
        imageAlt: "Student records in the admin panel",
        caption: "Reports and certificates generated from live records",
        points: [
          "One-click bonafide letters and transfer certificates",
          "Live cohort and movement reports for leadership",
          "Inspection-ready registers maintained automatically",
        ],
      },
    ],
  },
  screenshots: {
    heading: "Student Records, Screenshots",
    items: [
      { src: "/ecosystem/02-admissions-panel.png", alt: "Admissions panel feeding student records", caption: "Admissions to enrolment" },
      { src: studentInfoImage, alt: "Student profile view", caption: "Complete student profile" },
      { src: "/ecosystem/01-admin-panel.png", alt: "Student records admin", caption: "Student records in the admin panel" },
    ],
  },
  howItWorks: {
    heading: "Building Your Digital Register",
    steps: [
      { num: "01", title: "Import Existing Records", desc: "We migrate your student data, class lists and guardian details from your current system or spreadsheets." },
      { num: "02", title: "Structure & Validate", desc: "Dates, roll numbers and categories are standardised so reports and searches work perfectly." },
      { num: "03", title: "Connect the Modules", desc: "Attendance, fees, exams and communication are switched on against the same records." },
      { num: "04", title: "Keep It Alive", desc: "Every future admission and transaction updates the register automatically, forever." },
    ],
  },
  benefits: {
    heading: "What a Centralised SIS Delivers",
    lead: "The payoffs are felt by the office every single day.",
    items: [
      "Any student found in seconds, not hours",
      "Board-ready registers without pre-audit panic",
      "No re-typing between admission, fees and classes",
      "Complete, accessible history for every learner",
      "Accurate student counts at all times",
      "Safer handling of sensitive student data",
      "Documents never lost or misfiled again",
      "A foundation every other module builds on",
    ],
  },
  summary: {
    heading: "Student Data Is the School's Real Balance Sheet",
    paragraphs: [
      "A school's records are more valuable than its furniture, yet most schools protect them worse. One fire, flood or flooded cupboard — or simply a lost register — can erase years of history. A student information system makes the school's most important records digital, backed up and instant to retrieve.",
      "Beyond safety, the value of centralised data shows up in everyday efficiency. Admissions references, board inspections, certificate requests and parent queries all become fast, accurate and comfortable because the answer lives in one place, current and structured.",
      "And because EduAitor builds attendance, fees, exams and communication directly on those records, the SIS is not a stand-alone archive — it is the engine room of the whole platform. Schools that put their student records in order are not just organising files; they are structuring the future of every decision they will make.",
      "Security sits underneath all of it. Every staff member sees only what their role allows, changes are logged, and data is backed up automatically — so the school owns a complete, safe and usable history of every learner it has served. That alone is worth the shift from registers to a system.",
    ],
  },
  faqs: {
    heading: "Frequently Asked Questions",
    items: [
      { q: "Can we import our existing student data?", a: "Yes. During onboarding we import student and guardian records from your current system, spreadsheets or printed registers, validate them and standardise formats so reports and searches are accurate from day one." },
      { q: "Who can view student information?", a: "Access is role-based. Class teachers see the students they teach, parents see only their own children, and the office and principal see institution-wide records. Sensitive fields like health and documents have additional permission levels." },
      { q: "Is the SIS connected to attendance, fees and exams?", a: "Completely. Attendance, fees, exams, transport and communication all read from and write to the same student record. That is what makes the SIS a true backbone rather than a standalone database." },
      { q: "Can we generate transfer certificates from it?", a: "Yes. Bonafide letters, transfer certificates, ID cards and various reports are generated directly from the student's live data, in the formats your school and board expect." },
      { q: "What about GDPR-style privacy for children's data?", a: "We follow privacy-first design: encryption, role-based access, audit logs and the principle of least privilege. Student data is never sold or shared, and parents can exercise their data rights through the school." },
      { q: "Does it support multi-campus institutions?", a: "Yes. Multi-campus groups can manage separate campuses while keeping leadership-level consolidated views, and new campuses can be added without disturbing existing records." },
    ],
  },
  cta: {
    heading: "Put Every Student Record in Order",
    text: "Stop hunting through files and start with a single source of truth. Book a free demo of EduAitor's student information system.",
  },
  demo: {
    eyebrow: "REQUEST A FREE DEMO",
    heading: "See Student Records the Modern Way",
    text: "We will show you a live student record, a real admission-to-enrolment flow and one-click certificate generation — on your own data model.",
    source: sourceKey.sis,
    submitLabel: "Request Demo",
    assurances: [
      "Demo built around your current record keeping",
      "Show migration of your existing data explained",
      "Clear, modular pricing for schools",
    ],
  },
};

/* ── Page: School LMS ────────────────────────────────── */
const lms = {
  path: "/school-lms",
  metaTitle: "School LMS | Learning Management System for Schools | EduAitor",
  metaDescription:
    "Homework, assignments, lessons, tests and an AI tutor — EduAitor school LMS keeps classroom and online learning together.",
  hero: {
    eyebrow: "SCHOOL LEARNING MANAGEMENT SYSTEM",
    title: (
      <>
        Homework, Assignments &amp; Lessons —{" "}
        <span className="fl-accent">Plus an AI Tutor</span>
      </>
    ),
    subtitle:
      "EduAitor's school LMS takes homework, assignments, lessons and assessments digital, then adds what no other LMS has: an AI tutor that explains, summarises and practices with every student beyond the classroom.",
    primary: { label: "Book a Free Demo", source: sourceKey.lms },
    secondary: { label: "Explore the Ecosystem", to: "/ecosystem" },
    trust: (
      <>
        <strong>Classroom + Online</strong> learning in one place · <strong>AI tutor</strong> included
      </>
    ),
    image: demoImage,
    imageAlt: "EduAitor school learning management system",
    imageCaption: "Lessons, homework and AI tutoring in one portal",
  },
  stats: [
    { value: "24x7", label: "Access to lessons and content" },
    { value: "100%", label: "Homework tracked digitally" },
    { value: "+38%", label: "Homework completion reported by schools" },
  ],
  intro: {
    heading: "What a School LMS Should Be in 2026",
    paragraphs: [
      "During the pandemic, every school rushed to put learning online. Most are still using mismatched tools: a video app for classes, a chat group for homework, a spreadsheet for marks. Teachers juggle three systems to do what should be one job — teaching a lesson.",
      "EduAitor's learning management system brings the classroom and the screen together. Teachers post lessons, homework and assignments in one place. Students submit work digitally. Parents see deadlines and results. And wherever the student is stuck, an AI tutor steps in to explain the concept.",
      "Because the LMS is part of the school ERP, learning data connects to attendance, exams and reports automatically. A teacher does not export anything; the principal sees completion rates; the next report card reflects the whole picture.",
    ],
  },
  why: {
    heading: "Why Scattered Learning Tools Fail",
    lead: "Mismatched apps create chaos that schools absorb in staff time and lost assignments.",
    points: [
      { icon: IcClock, title: "Work Gets Lost", desc: "Two teachers, three apps and a group chat mean homework regularly disappears between posting and grading." },
      { icon: IcMessage, title: "Parents Miss Deadlines", desc: "When homework lives in a WhatsApp thread, parents learn about deadlines the night before submission." },
      { icon: IcChart, title: "No Progress Visibility", desc: "Without central records, teachers cannot see completion trends or spot students quietly falling behind." },
      { icon: IcBook, title: "Learning Stops at the Bell", desc: "Students stuck on homework at 8 pm have no one to ask — unless an AI tutor is part of the platform." },
    ],
  },
  features: {
    heading: "School LMS Features",
    lead: "A complete teaching and learning workspace.",
    items: [
      { icon: IcBook, title: "Homework & Assignments", desc: "Post, submit, grade and return work digitally with deadlines and reminders." },
      { icon: IcFile, title: "Lesson & Content Library", desc: "Share notes, PDFs, presentations, videos and links, organised by class and chapter." },
      { icon: IcVideo, title: "Online Classes", desc: "Host live classes, record sessions and track virtual attendance for hybrid learning." },
      { icon: IcAi, title: "AI Tutor & Explanations", desc: "Students get concept explanations, summaries and guided practice any time of day." },
      { icon: IcAi, title: "AI Practice Generator", desc: "Chapter-wise practice sets generated automatically for revision and mastery." },
      { icon: IcChart, title: "Completion Analytics", desc: "See who submitted what, on time, with class completion dashboards for leadership." },
      { icon: IcGrade, title: "Grading & Feedback", desc: "Grade work with marks, remarks and rubrics that flow into progress reports." },
      { icon: IcMessage, title: "Parent Visibility", desc: "Deadlines, submissions and results reach parents automatically through the app." },
      { icon: IcBell, title: "Smart Reminders", desc: "Automatic nudges to students and parents before a deadline arrives." },
      { icon: IcShield, title: "Syllabus Structured", desc: "Content stays mapped to the syllabus, chapters and boards your teachers follow." },
    ],
  },
  deepDive: {
    heading: "Inside the EduAitor LMS",
    sections: [
      {
        title: "Homework That Never Gets Lost",
        body: [
          "In the old system, homework lives in notebooks and group chats — easy to lose, easy to deny. In EduAitor, every assignment is a structured record: description, attachments, due date, marks and submission status.",
          "Students submit from the student app or web; teachers grade with comments; parents see deadlines the day they are assigned. Reminders fire automatically as a deadline approaches so the 'I didn't know' excuse disappears.",
          "Completion analytics show the teacher at a glance which students are consistent and which need a nudge — before the end-of-term surprise.",
        ],
        image: "/ecosystem/03-academics-panel.png",
        imageAlt: "Homework and assignments in the academic suite",
        caption: "Structured assignments from posting to grading",
        points: [
          "Unmissable deadlines with auto-reminders",
          "Digital submissions, grading and comments",
          "Completion analytics for every teacher",
        ],
      },
      {
        title: "An AI Tutor That Gives Every Student a Second Teacher",
        body: [
          "The unique edge of EduAitor's LMS is what happens after the bell. When a student cannot solve a question at home, the AI Academic Assistant explains the concept step by step, shows a visual, and generates practice until the student is confident.",
          "Parents no longer struggle to teach modern subjects. Students get help without waiting for office hours. And the AI reports follow-up learning gaps back to the teacher, so the next class can address real confusion.",
          "This combination — a school's own content plus an always-available tutor — is what turns an LMS into a true learning assistant rather than a file drop.",
        ],
        image: "/ecosystem/05-ai-assistant-panel.png",
        imageAlt: "AI tutor inside the school LMS",
        caption: "Concepts explained 24x7 by the AI tutor",
        points: [
          "Step-by-step explanations and visuals",
          "Practice questions generated at the right level",
          "Learning gaps shared back with teachers",
        ],
      },
      {
        title: "Live Classes and Hybrid Learning Built In",
        body: [
          "EduAitor's LMS handles the online side of modern schooling without leaving the platform. Teachers start live sessions, students join from home, and attendance and participation are recorded automatically.",
          "Sessions can be recorded and stored alongside other lesson content, so students who missed class — or simply need a second viewing — can refresh anytime.",
          "Whether your school is fully offline, fully online, or blended, the same content, homework and grading engine serves all modes, and results flow into the same analytics.",
        ],
        image: "/ecosystem/16-analytics-panel.png",
        imageAlt: "Learning analytics for online and classroom work",
        caption: "Online and classroom learning in one dashboard",
        points: [
          "Live classes with recorded sessions",
          "Automatic virtual attendance",
          "One engine for classroom, online and hybrid",
        ],
      },
    ],
  },
  screenshots: {
    heading: "LMS Screens",
    items: [
      { src: "/ecosystem/03-academics-panel.png", alt: "Academic management with homework and lessons", caption: "Homework and lessons" },
      { src: "/ecosystem/05-ai-assistant-panel.png", alt: "AI academic assistant", caption: "AI academic assistant" },
      { src: "/ecosystem/16-analytics-panel.png", alt: "Learning analytics", caption: "Learning analytics" },
    ],
  },
  howItWorks: {
    heading: "Going Digital in a Week",
    steps: [
      { num: "01", title: "Map Syllabus & Classes", desc: "Classes, sections, subjects and the syllabus are structured once with your teachers." },
      { num: "02", title: "Train Teachers", desc: "A short session shows how to post homework, share content and run online classes." },
      { num: "03", title: "Connect Parents & Students", desc: "Apps installed in minutes bring deadlines, AI tutoring and submissions to every home." },
      { num: "04", title: "Grow Into AI", desc: "Switch on the AI tutor, practice generator and analytics as the school gets comfortable." },
    ],
  },
  benefits: {
    heading: "What the School Gains",
    lead: "An LMS connected to the ERP changes how teaching and learning feel.",
    items: [
      "No more lost or disputed homework",
      "Teachers post and grade in half the time",
      "Parents informed about every deadline",
      "Better homework completion and quality",
      "AI help available to every student at home",
      "Hybrid and online classes supported in-platform",
      "Learning data flows into reports automatically",
      "Leadership sees completion and performance trends",
    ],
  },
  summary: {
    heading: "The LMS Makes Learning Visible",
    paragraphs: [
      "Learning is the only course in a school that is invisible by default. A teacher grades, a student progresses, and unless someone collates everything, no one sees the whole picture. An LMS connected to the school ERP makes learning visible — homework completion, concept gaps, effort, improvement.",
      "The student experience changes as well. Work submitted on time instead of lost in notebooks, deadlines that always announce themselves, and an AI tutor ready at the exact moment a child gets stuck. Parents finally watch their child learn rather than guess at it.",
      "For the school, an LMS that shares one database with attendance, fees and exams removes a whole class of administrative redundancy — nothing is exported or re-entered, and reports compose themselves from real activity. The classroom becomes the heart of the data, not an island of paper.",
      "Best of all, the platform grows with the school's ambition. Schools add the AI tutor for after-hours support, switch on auto-graded practice, or scale to blended teaching when they are ready. Learning management on EduAitor is a journey the school controls the pace of.",
    ],
  },
  faqs: {
    heading: "Frequently Asked Questions",
    items: [
      { q: "Is the LMS separate from the rest of EduAitor?", a: "No. The LMS is one module inside the same platform that manages attendance, fees and exams. Homework and results connect automatically to student records, reports and parent communication." },
      { q: "Do we need to buy video-conferencing separately?", a: "Live online classes are integrated into the platform. If your school already prefers a specific video tool, content and simple links can be included in lessons as well." },
      { q: "How does the AI tutor help students at home?", a: "Students ask the AI to explain any concept from their syllabus; it responds with simple explanations, visuals and practice questions, and it reports recurring gaps back to the teacher for follow-up in class." },
      { q: "Can we run a completely offline school with the LMS?", a: "Yes. Many schools use only the classroom side — posted homework, digital assignments and grading — and never run online classes. The LMS adapts to your mode of teaching." },
      { q: "How do parents see homework deadlines?", a: "Every assignment creates an automatic notification to parents with the deadline and details. Parents track submissions and completed work through the parent app." },
      { q: "Is teacher training required?", a: "One or two orientation sessions are typically enough because the flows are simple: post a lesson, post homework, grade submissions. Video guides and support are included with every plan." },
    ],
  },
  cta: {
    heading: "Bring Learning, Not Just Files, Online",
    text: "See a lesson posted, homework graded and an AI tutor explain a concept — all in ten minutes. Book a free demo.",
  },
  demo: {
    eyebrow: "REQUEST A FREE DEMO",
    heading: "See Your School's LMS in Action",
    text: "We'll run through a real teacher's flow — posting lessons and homework, grading submissions and watching the AI tutor help a student.",
    source: sourceKey.lms,
    submitLabel: "Request Demo",
    assurances: [
      "Live demo of homework and grading flows",
      "See the AI tutor working on a real concept",
      "Clear plan to switch your classes over",
    ],
  },
};

/* ── Page: AI Academic Assistant ─────────────────── */
const aiAcademicAssistant = {
  path: "/ai-academic-assistant",
  metaTitle:
    "AI Academic Assistant for Students | 24x7 AI Tutor | EduAitor",
  metaDescription:
    "EduAitor's AI academic assistant is a 24x7 tutor that explains concepts, summarises chapters and answers every doubt — aligned to your child's CBSE, ICSE or State Board syllabus.",
  hero: {
    eyebrow: "AI ACADEMIC ASSISTANT",
    title: (
      <>
        Every Student Gets a <span className="fl-accent">24x7 Personal AI Tutor</span>
      </>
    ),
    subtitle:
      "Students do not learn only between 9 am and 2 pm. The EduAitor AI academic assistant answers doubts, explains chapters and builds practice — any time, any device, aligned to your school's exact syllabus.",
    primary: { label: "See the AI Tutor Live", source: sourceKey.assistant },
    secondary: { label: "Explore the Ecosystem", to: "/ecosystem" },
    trust: (
      <>
        <strong>24x7</strong> availability · Aligned to <strong>CBSE, ICSE & State Boards</strong>
      </>
    ),
    image: "/ecosystem/05-ai-assistant-panel.png",
    imageAlt: "EduAitor AI academic assistant for students",
    imageCaption: "The AI assistant explains concepts step by step, day or night",
  },
  stats: [
    { value: "24x7", label: "Help available to every student" },
    { value: "1:1", label: "Personal attention, no class size limits" },
    { value: "B1-C12", label: "Subjects and chapters supported" },
  ],
  intro: {
    heading: "What is an AI Academic Assistant?",
    paragraphs: [
      "An AI academic assistant is an artificial-intelligence tutor that helps students learn outside the classroom. It answers doubts, explains concepts in simple language, summarises chapters, provides practice questions and tracks what a student has truly mastered — all inside the school's own app.",
      "In a class of forty, a teacher cannot pause for each student. But a student who does not understand can ask EduAitor's AI assistant to explain the same concept again — slowly, with an example, with a diagram, or as a practice question. The assistant adapts to how the student asks, not the other way around.",
      "The assistant is not a chatbot with random answers. It is trained on the school's own syllabus and textbook structure, so every explanation matches what the teacher is actually teaching. When students struggle, the assistant quietly reports those gaps to the teacher so the difficulty gets fixed in the classroom too.",
    ],
  },
  why: {
    heading: "Why Every Student Needs 24x7 Help",
    lead: "Learning does not switch off at the school gate. Neither should help.",
    points: [
      { icon: IcAi, title: "Doubters Get Answers Instantly", desc: "A child stuck at 9 pm does not have to wait for the next class. The AI explains the concept immediately, in words they understand." },
      { icon: IcSpark, title: "Explanations That Adapt", desc: "Ask again in a different way and the AI tries another approach — simpler words, an example or a visual breakdown." },
      { icon: IcGrade, title: "Practice Until Mastery", desc: "Students practise with questions that adapt to their level, building confidence before the next class or test." },
      { icon: IcChart, title: "Teachers See the Gaps", desc: "Recurring struggles are reported back to teachers, turning one student's doubt into a fix for the whole class." },
    ],
  },
  features: {
    heading: "What the AI Academic Assistant Can Do",
    lead: "A complete study companion inside the school app.",
    items: [
      { icon: IcMessage, title: "Doubt Solving", desc: "Students ask questions and get step-by-step explanations instead of just answers." },
      { icon: IcBook, title: "Chapter Summaries", desc: "Long chapters condensed into clear, memory-friendly summaries and key points." },
      { icon: IcVideo, title: "Visual & Audio Learning", desc: "Diagrams, examples and read-aloud support for different learning styles." },
      { icon: IcFile, title: "Practice Questions", desc: "Syllabus-aligned questions that adjust difficulty based on the student's answers." },
      { icon: IcGrade, title: "Concept Mastery Checks", desc: "Quick tests that show exactly which topics have been mastered and which need revision." },
      { icon: IcChart, title: "Progress Tracking", desc: "Parents and teachers see how and where each student is improving week by week." },
      { icon: IcBell, title: "Learning Gap Alerts", desc: "The teacher is alerted when a student repeatedly struggles with the same concept." },
      { icon: IcLock, title: "Syllabus-Aligned & Safe", desc: "Explanations follow the school's board and textbooks, in a safe, ad-free space." },
    ],
  },
  deepDive: {
    heading: "How the Assistant Helps, Step by Step",
    sections: [
      {
        title: "A Tutor That Never Gets Tired of Questions",
        body: [
          "Ask a teacher the same question three times and you will hesitate the fourth. Ask EduAitor's AI assistant and it will explain the concept patiently — in simpler words, with an example, or in a diagram — as many times as needed, with no pressure and no judgement.",
          "The assistant follows the school's own syllabus and textbook structure, so its explanations match what the teacher is teaching. It supports CBSE, ICSE and State Board curricula from Class 1 to Class 12, across subjects including maths, science, languages and social studies.",
          "For students who are shy in class, this is transformative. They finally have a space to ask every question without embarrassment, which builds the confidence that later shows up in class participation.",
        ],
        image: "/ecosystem/05-ai-assistant-panel.png",
        imageAlt: "EduAitor AI assistant explaining a concept",
        caption: "A patient tutor with unlimited time for every question",
        points: [
          "Answers doubts at any hour, on any device",
          "Explanations follow the school's own syllabus",
          "Multiple ways to explain until it clicks",
        ],
      },
      {
        title: "From Doubt to Mastery in One Sitting",
        body: [
          "Understanding a concept and mastering it are different things. The AI assistant takes students the extra step. After explaining, it gives practice questions that adapt — easier when the student stumbles, tougher when they are ready.",
          "Each session ends with a mastery check that shows which topics have been absorbed. Struggling concepts are added to a revision list that the assistant revisits later, so learning is not left to luck.",
          "Parents see this progress in the parent app: topics mastered this week, time spent learning, and the areas their child should revise before the next test.",
        ],
        image: "/ecosystem/04-ai-assessment-panel.png",
        imageAlt: "AI practice and mastery check screen",
        caption: "Adaptive practice moves students from doubt to mastery",
        points: [
          "Adaptive practice adjusts to the student's level",
          "Mastery checks pin down what has been learned",
          "Revision lists and progress flow to the parent app",
        ],
      },
      {
        title: "The Teacher Is Never Left Out of the Loop",
        body: [
          "Some schools worry that AI help replaces the teacher. The opposite is true. The assistant surfaces what it learns to the teacher, who remains the final authority on learning.",
          "When several students struggle with the same concept, the assistant flags it. The teacher can then re-teach that topic in class, adjust the pace, or give targeted worksheets — acting on evidence instead of guesswork.",
          "This creates a loop classrooms never had: students practise at home, the AI reports gaps, and the teacher fixes them in class. Every stakeholder becomes smarter together.",
        ],
        image: "/ecosystem/16-analytics-panel.png",
        imageAlt: "Teacher view of AI learning gap reports",
        caption: "Learning gaps reported back to teachers automatically",
        points: [
          "Recurring struggles flagged to the right teacher",
          "Class-level gap trends for re-teaching decisions",
          "Teachers stay in control of the final intervention",
        ],
      },
    ],
  },
  screenshots: {
    heading: "AI Academic Assistant, Screenshots",
    items: [
      { src: "/ecosystem/05-ai-assistant-panel.png", alt: "AI academic assistant conversation", caption: "Teachers generate homework in minutes" },
      { src: "/ecosystem/04-ai-assessment-panel.png", alt: "AI practice and mastery screen", caption: "AI Practice & Mastery" },
      { src: "/ecosystem/16-analytics-panel.png", alt: "Learning gap reports", caption: "Learning Gap Reports" },
    ],
  },
  howItWorks: {
    heading: "How Students Start Using It",
    steps: [
      { num: "01", title: "School Enables the Assistant", desc: "The AI maps the classes, subjects and syllabus your school already has in EduAitor." },
      { num: "02", title: "Student Opens the App", desc: "Every student gets the assistant in their own app and web portal — no separate sign-up." },
      { num: "03", title: "Ask, Practise, Master", desc: "Students ask doubts, receive explanations and practise until concepts are mastered." },
      { num: "04", title: "Teacher Gets the Report", desc: "Gaps, progress and revision lists reach the teacher and parent automatically." },
    ],
  },
  benefits: {
    heading: "What the School and Parents Gain",
    lead: "The assistant turns idle evening hours into the most productive learning time of the day.",
    items: [
      "Every student gets individual attention — not just a few",
      "Doubts answered instantly, at any hour, on any device",
      "Coaching-style help follows the school's own syllabus",
      "Teachers receive automatic reports on learning gaps",
      "Parents see weekly progress instead of guessing",
      "Students build confidence and ask questions freely",
      "Works alongside teachers — never replacing them",
      "No extra apps, no ads, no unsafe internet searches",
    ],
  },
  summary: {
    heading: "The Case for an AI Academic Assistant",
    paragraphs: [
      "The biggest weakness of traditional schooling is that help stops when the bell rings. A student who does not understand in class faces a silent evening of frustration — and often simply moves on without mastering the concept. EduAitor's AI academic assistant is the fix for that gap.",
      "It is a tutor that never gets tired, never judges and never runs out of patience. It explains the same concept in new ways until it clicks, practises with the student until mastery, and reports every struggle back to the teacher so real help follows in class.",
      "For the school, the assistant is a quiet multiplier. It extends quality teaching beyond classroom hours without adding a single teacher's workload. It keeps parents informed, gives shy learners a voice, and gives teachers evidence that no register could ever provide.",
      "For the child, it is simpler: someone is always there when they need help. That single feeling — that they are never truly stuck alone — changes how a student approaches learning forever.",
    ],
  },
  faqs: {
    heading: "Frequently Asked Questions",
    items: [
      { q: "Does the AI assistant match our school's syllabus?", a: "Yes. The assistant works from the classes, subjects and curriculum structure configured in EduAitor, so explanations and practice stay aligned to CBSE, ICSE or State Board syllabi for Classes 1–12." },
      { q: "Will the AI replace teachers?", a: "No. The assistant is designed to complement teachers. It handles repeated doubts and practice outside class hours and reports learning gaps back to the teacher, who remains in control of instruction and intervention." },
      { q: "On which devices can students use it?", a: "Students can use the assistant on their phone through the EduAitor app, on a tablet, or in any web browser via the student portal. It works at home, in class and everywhere in between." },
      { q: "Is the assistant safe for children?", a: "The assistant operates inside the school's own platform — no open internet, no ads and no unfiltered external content. Parental and school controls govern what children can access." },
      { q: "How do teachers see student progress?", a: "Teachers receive automatic reports on concept mastery, recurring struggles and time spent practising. Class-level gap trends help teachers decide what to re-teach and where to focus." },
      { q: "Can parents track their child's learning?", a: "Yes. The parent app shows topics mastered this week, areas for revision, practice activity and the assistant's progress notes, giving parents a clear window into learning." },
    ],
  },
  cta: {
    heading: "Give Every Student a Tutor, On Demand",
    text: "Watch a student ask a doubt and get a syllabus-aligned explanation in seconds. Book a free demo of the AI academic assistant.",
  },
  demo: {
    eyebrow: "REQUEST A FREE DEMO",
    heading: "See the AI Academic Assistant in Action",
    text: "We'll show a real student asking a doubt at 9 pm and the assistant explaining the concept step by step — then reporting the gap to the teacher.",
    source: sourceKey.assistant,
    submitLabel: "Request Demo",
    assurances: [
      "Live look at doubt-solving and chapter summaries",
      "See how learning gaps reach the teacher",
      "Clear plan to enable it for your school",
    ],
  },
};

/* ── Page: AI Question Paper Generator ───────────── */
const aiQuestionPaperGenerator = {
  path: "/ai-question-paper-generator",
  metaTitle:
    "AI Question Paper Generator | Create Board-Style Papers in Seconds | EduAitor",
  metaDescription:
    "Generate chapter-wise question papers, unit tests and answer keys aligned to CBSE, ICSE and State Boards. EduAitor's AI question paper generator saves teachers hours every week.",
  hero: {
    eyebrow: "AI QUESTION PAPER GENERATOR",
    title: (
      <>
        Create Board-Style Question Papers in <span className="fl-accent">Seconds, Not Hours</span>
      </>
    ),
    subtitle:
      "Teachers waste their evenings hunting for the right questions. EduAitor's AI question paper generator creates chapter-wise, difficulty-balanced papers with answer keys — aligned to your board, your syllabus and your lesson plan.",
    primary: { label: "Generate a Sample Paper", source: sourceKey.qpg },
    secondary: { label: "Explore the Ecosystem", to: "/ecosystem" },
    trust: (
      <>
        Cuts paper-making time by <strong>up to 90%</strong> · Board-aligned for <strong>Classes 1–12</strong>
      </>
    ),
    image: "/ecosystem/04-ai-assessment-panel.png",
    imageAlt: "EduAitor AI question paper generator interface",
    imageCaption: "Pick a class and chapter — the AI drafts a full paper with answer keys",
  },
  stats: [
    { value: "90%", label: "Less time spent making papers" },
    { value: "6+", label: "Question types supported" },
    { value: "1–12", label: "Classes covered for all boards" },
  ],
  intro: {
    heading: "What is an AI Question Paper Generator?",
    paragraphs: [
      "An AI question paper generator is a tool that composes exam and test papers automatically. You choose the class, subject, chapter, difficulty and question type, and the AI produces a complete paper — questions, marks distribution, answer key and often model solutions — in under a minute.",
      "In a school, question papers are still written by hand, copied from previous years, or assembled from scattered question banks. Each paper takes hours of a teacher's evening. Multiply that by every class, subject and periodic test, and the cost across a school year is enormous.",
      "EduAitor's AI generator is built for Indian schools. It understands CBSE, ICSE and State Board exam patterns, supports formats like MCQ, short answer, long answer, assertion-reason and case-based questions, and keeps everything within the school's own platform.",
      "Under the hood, the generator draws from the school's configured curriculum — classes, subjects, chapters and teaching plans — so every paper tests what has actually been taught this term. That alignment is the difference between a generic question bank and a tool that genuinely belongs to your school.",
    ],
  },
  why: {
    heading: "Why Teachers Are Switching to AI Papers",
    lead: "Writing a paper should be part of teaching preparation, not a second job.",
    points: [
      { icon: IcClock, title: "Evenings Given Back to Teachers", desc: "A paper that took two hours now takes two minutes — including the answer key and blueprint." },
      { icon: IcExam, title: "Board Patterns, Not Guesswork", desc: "The generator follows real CBSE, ICSE and State Board mark schemes and question layouts." },
      { icon: IcShield, title: "Original, Not Recycled", desc: "Fresh, syllabus-aligned questions every time — no repeated papers leaking year after year." },
      { icon: IcGrade, title: "Balance by Design", desc: "Difficulty is spread across easy, medium and hard automatically, matching your blueprint." },
    ],
  },
  features: {
    heading: "Question Paper Generator Features",
    lead: "Everything a teacher needs to produce exam-ready papers.",
    items: [
      { icon: IcFile, title: "Chapter-Wise Papers", desc: "Choose one chapter or a whole term — the AI composes accordingly." },
      { icon: IcExam, title: "Board-Style Blueprints", desc: "Auto-applies the mark scheme and question distribution of your board." },
      { icon: IcSpark, title: "Multiple Question Types", desc: "MCQs, short, long, assertion-reason, case-based and more — mixed to your needs." },
      { icon: IcCheck, title: "Answer Keys Included", desc: "Every paper ships with a verified answer key and model solutions." },
      { icon: IcPrint, title: "Ready to Print", desc: "One click produces a clean, branded paper formatted for printing and distribution." },
      { icon: IcCog, title: "Difficulty Control", desc: "Set easy, medium or hard — or let the AI balance the full spectrum." },
      { icon: IcDashboard, title: "Paper Bank", desc: "Every generated paper is stored, searchable and reusable for retests and practice." },
      { icon: IcLock, title: "Approval by Teachers", desc: "Nothing is used until a teacher reviews, edits or regenerates it." },
    ],
  },
  deepDive: {
    heading: "Inside the Generator",
    sections: [
      {
        title: "From Selections to a Finished Paper",
        body: [
          "Generating a paper is a guided, transparent flow. A teacher selects the class, subject, chapter or chapters, question types and difficulty, and the AI composes a blueprint-matched paper in seconds, complete with marks distribution.",
          "Every question is written fresh from the syllabus rather than copied from an old paper, which keeps tests clean and original. The generator also follows the exam pattern of the chosen board, so students see the format they will actually face.",
          "Teachers are never bypassed. Each paper opens in an editing view where any question can be changed, removed or regenerated individually before the paper becomes official.",
        ],
        image: "/ecosystem/04-ai-assessment-panel.png",
        imageAlt: "AI question paper generation settings",
        caption: "Select class, subject, chapters and types — the AI drafts the paper",
        points: [
          "Blueprint-matched marks distribution",
          "Fresh questions generated from the syllabus",
          "Full editing before any paper is used",
        ],
      },
      {
        title: "Papers Built for Real Indian Exams",
        body: [
          "Indian boards follow specific patterns, and students are trained to answer in those formats. A generic western tool simply does not fit. EduAitor was built around how CBSE, ICSE and State Board papers actually look.",
          "Support includes objective sections with OMR-style MCQs, very short and short answers, descriptive questions, assertion-reason items and the increasingly common case-based questions — all respecting the official mark allocations of the board.",
          "This means the paper your students practise on resembles the real one closely enough that the exam environment stops being a surprise. That is training value no generic generator provides.",
        ],
        image: "/ecosystem/03-academics-panel.png",
        imageAlt: "Board-aligned question paper preview",
        caption: "Paper formats follow real CBSE, ICSE and State Board patterns",
        points: [
          "OMR-style MCQs and descriptive formats",
          "Assertion-reason and case-based questions",
          "Marks matched to official blueprints",
        ],
      },
      {
        title: "A Paper Bank That Pays for Itself",
        body: [
          "Every paper a school generates is stored in its own paper bank. Past years searchable by class, subject, chapter and difficulty. This turns the generator into a growing asset rather than a one-off tool.",
          "Retests, remedial tests and practice papers become quick — pull from the bank, adjust a few questions, and print. New teachers get instant access to the school's full assessment history.",
          "The bank also feeds analytics. Question-level performance data from tests can show which concepts students find hardest, guiding both future papers and classroom teaching.",
        ],
        image: "/ecosystem/01-admin-panel.png",
        imageAlt: "Question paper bank and archive",
        caption: "Every paper stored in a reusable, searchable bank",
        points: [
          "Searchable archive by class, subject and chapter",
          "Instant retests and practice papers from the bank",
          "Performance data flows into teaching decisions",
        ],
      },
    ],
  },
  screenshots: {
    heading: "AI Question Paper Generator, Screenshots",
    items: [
      { src: "/ecosystem/04-ai-assessment-panel.png", alt: "AI question paper generator", caption: "AI Question Paper Generator" },
      { src: "/ecosystem/03-academics-panel.png", alt: "Blueprinted paper with answer key", caption: "Board-Style Paper with Answer Key" },
      { src: "/ecosystem/01-admin-panel.png", alt: "Question paper bank", caption: "Question Paper Bank" },
    ],
  },
  howItWorks: {
    heading: "From Click to Printed Paper",
    steps: [
      { num: "01", title: "Choose the Paper", desc: "Set class, subject, chapters, question types, difficulty and board." },
      { num: "02", title: "AI Composes the Paper", desc: "The generator drafts the paper and answer key with board-style marks." },
      { num: "03", title: "Review & Edit", desc: "Adjust or regenerate any question — the teacher stays in charge." },
      { num: "04", title: "Print & Store", desc: "Publish for print, distribute to students and save to the paper bank." },
    ],
  },
  benefits: {
    heading: "What the School Gains",
    lead: "Faster papers, better papers — and evenings back.",
    items: [
      "Paper-making time cut by up to 90%",
      "Board-aligned formats from day one",
      "Original questions that keep tests honest",
      "Answer keys that end the marking scramble",
      "A reusable paper bank that grows every year",
      "Easy retests and practice papers for students",
      "More time for actual teaching and student help",
      "Consistent paper quality across every subject",
    ],
  },
  summary: {
    heading: "Why Paper Generation Must Be Automatic",
    paragraphs: [
      "Question paper creation is one of the most expensive unseen tasks in a school. Every teacher, every subject, every periodic test — hours of off-duty time spent writing, formatting and double-checking papers that could have been a solution instead.",
      "The EduAitor AI generator collapses that cost. The same teacher now produces a finer paper in minutes, freed to spend the saved hours on lesson planning and helping students. And because the AI follows board blueprints, the papers students practise on are closer than ever to the real thing.",
      "The system is deliberately human-centred. Nothing is used until a teacher reviews it; the machine drafts, the professional decides. That keeps quality where it belongs while removing the drudgery.",
      "For schools serious about academic quality and staff well-being, automatic paper generation is not a luxury. It is one of the clearest wins available in modern school technology.",
      "The timing could not be better. With report card seasons, board curriculums and parent expectations all demanding more, schools need every teaching hour back. The automation is invisible to parents but transformative for teachers — and that invisible gain is exactly what a generation of overworked staff, and the children who depend on them, will feel.",
    ],
  },
  faqs: {
    heading: "Frequently Asked Questions",
    items: [
      { q: "Is the paper really generated by AI?", a: "Yes. The AI composes fresh questions from the syllabus structure configured in your school's EduAitor account, so papers are original and aligned to what is being taught." },
      { q: "Does it follow our board's exam pattern?", a: "The generator supports CBSE, ICSE and State Board patterns, including objective, descriptive, assertion-reason and case-based formats, with marks matched to official blueprints." },
      { q: "Can teachers edit the AI-generated paper?", a: "Absolutely. Every paper opens in an editing view where teachers can change, remove or regenerate any question before approving it for printing." },
      { q: "Are answer keys included?", a: "Each paper ships with a verified answer key and model solutions, ending the separate hunt for answers and speeding up marking." },
      { q: "Can we store and reuse old papers?", a: "Yes. Every generated paper is saved in a searchable paper bank by class, subject, chapter and difficulty, ready for retests and practice." },
      { q: "Which classes and subjects are supported?", a: "The generator covers Classes 1–12 across the subjects schools configure — maths, science, English, languages, social studies and more." },
    ],
  },
  cta: {
    heading: "Make This Week's Papers in One Sitting",
    text: "See a complete, board-style paper with answer keys generated in under a minute. Book a free demo.",
  },
  demo: {
    eyebrow: "REQUEST A FREE DEMO",
    heading: "Watch a Paper Get Generated Live",
    text: "We'll generate a sample paper for your class and subject during the call — then show editing, answer keys and the paper bank.",
    source: sourceKey.qpg,
    submitLabel: "Request Demo",
    assurances: [
      "Your class and subject generated live",
      "Full editing and answer key walkthrough",
      "Set-up plan for every subject in your school",
    ],
  },
};

/* ── Page: AI Worksheet Generator ────────────────── */
const aiWorksheetGenerator = {
  path: "/ai-worksheet-generator",
  metaTitle:
    "AI Worksheet Generator for Teachers | Printable Practice Sheets | EduAitor",
  metaDescription:
    "Create chapter-wise worksheets, practice sheets and answer keys in seconds with EduAitor's AI worksheet generator. Aligned to your syllabus, ready to print.",
  hero: {
    eyebrow: "AI WORKSHEET GENERATOR",
    title: (
      <>
        Worksheets in Seconds, <span className="fl-accent">Homework Problems Solved</span>
      </>
    ),
    subtitle:
      "Worksheets are the most assigned, least automated teaching material in India. EduAitor's AI worksheet generator creates chapter-wise practice sheets with answer keys — differentiated, printable and aligned to your syllabus.",
    primary: { label: "Generate a Sample Worksheet", source: sourceKey.worksheet },
    secondary: { label: "Explore the Ecosystem", to: "/ecosystem" },
    trust: (
      <>
        <strong>Instant</strong> chapter-wise worksheets · Differentiated for <strong>every learner</strong>
      </>
    ),
    image: "/ecosystem/04-ai-assessment-panel.png",
    imageAlt: "EduAitor AI worksheet generator",
    imageCaption: "Teacher picks a chapter — the AI drafts a full worksheet with answers",
  },
  stats: [
    { value: "60s", label: "Average time to a full worksheet" },
    { value: "3", label: "Difficulty levels per sheet" },
    { value: "100%", label: "Aligned to the school's syllabus" },
  ],
  intro: {
    heading: "What is an AI Worksheet Generator?",
    paragraphs: [
      "An AI worksheet generator creates practice worksheets automatically. A teacher selects a class, subject, chapter and topic, and the AI produces a ready-to-print worksheet — questions, sections, answer key — matching the school's syllabus.",
      "Worksheets are essential to learning but brutal to make well. Differentiate for three ability levels and the workload triples. Most teachers either reuse old sheets, download generic ones that do not match the syllabus, or spend their weekends building them by hand.",
      "EduAitor's generator ends that compromise. It produces syllabus-accurate worksheets in under a minute, at easy, medium and hard levels, and saves every sheet to the school's own reusable library.",
      "The generator also feeds the wider platform. Sheets can be assigned through the LMS, completed online or on paper, and their results read by the analytics engine — so the homework teachers assign today quietly becomes evidence for tomorrow's classroom decisions.",
    ],
  },
  why: {
    heading: "Why Worksheet Creation Needs AI",
    lead: "Worksheets should be the fastest part of lesson preparation, not the slowest.",
    points: [
      { icon: IcClock, title: "Homework, Done in Bathing Time", desc: "A brilliant, ready-to-print sheet in under a minute — barely longer than the school bell." },
      { icon: IcGrade, title: "Real Differentiation", desc: "Generate easy, medium and hard versions of the same sheet so every student is stretched appropriately." },
      { icon: IcBook, title: "Exactly Your Syllabus", desc: "Sheets follow the chapters and topics configured for your school, not generic internet worksheets." },
      { icon: IcCheck, title: "Answers Included", desc: "Each worksheet ships with answers, so self-check, peer marking and revision become instant." },
    ],
  },
  features: {
    heading: "AI Worksheet Generator Features",
    lead: "From a blank sheet of paper to 40 solved worksheets in minutes.",
    items: [
      { icon: IcFile, title: "Chapter & Topic Sheets", desc: "Generate by chapter, unit or specific topic within any subject." },
      { icon: IcGrade, title: "Three Difficulty Levels", desc: "Easy, medium and hard versions of the same worksheet at one click." },
      { icon: IcCheck, title: "Answer Keys Standard", desc: "Every worksheet includes a full answer key for quick checking." },
      { icon: IcPrint, title: "Ready to Print", desc: "Clean, school-branded layouts that print perfectly and look professional." },
      { icon: IcSpark, title: "Mix of Question Types", desc: "Fill-in-the-blanks, MCQs, short answers, match-the-following and more." },
      { icon: IcDownload, title: "Download & Share", desc: "Export as PDF, share on the LMS or send directly to parents and students." },
      { icon: IcDashboard, title: "Worksheet Library", desc: "Every sheet saved and searchable — build a school-wide question resource." },
      { icon: IcCog, title: "Teacher Control", desc: "Edit, regenerate or adjust any question before distribution." },
    ],
  },
  deepDive: {
    heading: "How the Generator Works",
    sections: [
      {
        title: "One Topic, a Library of Exercises",
        body: [
          "Opening the generator feels like ordering from a menu. Pick the class and subject, the chapter and topic, the number of questions and the difficulty, and the AI drafts the worksheet in seconds.",
          "The sheet is formatted like a real worksheet — clear sections, instructions, space for answers and a neat layout — because students respond better to clean material. The answer key is generated separately so it never reaches students by accident.",
          "If the teacher wants a different mix — more MCQs, harder word problems, fewer fill-ins — they can regenerate the whole sheet or adjust individual sections before printing.",
        ],
        image: "/ecosystem/04-ai-assessment-panel.png",
        imageAlt: "AI worksheet generation options",
        caption: "Choose topic, difficulty and question types — the rest is automatic",
        points: [
          "Topic-level worksheets, not just chapter-level",
          "Clean, print-ready worksheet formatting",
          "Separate answer keys for safe handling",
        ],
      },
      {
        title: "Differentiation Without Extra Effort",
        body: [
          "One class rarely has one level. Weak students need consolidation, strong students need challenge and most need the middle. Manually building three versions is the reason worksheets get abandoned.",
          "The generator produces easy, medium and hard versions of the same worksheet at one click. The structures match; the difficulty scales. Weak students build confidence, strong students stay stretched, and the teacher's workload barely rises.",
          "This level of differentiation is exactly what board inspectors and modern pedagogy ask for — and what manual preparation makes practically impossible.",
        ],
        image: "/ecosystem/16-analytics-panel.png",
        imageAlt: "Differentiated worksheet assignments per student",
        caption: "Assign the right level to every student without extra effort",
        points: [
          "Easy, medium and hard versions in one click",
          "Structures match so teaching stays aligned",
          "Targeted assignments per student or group",
        ],
      },
      {
        title: "From Worksheet to Assigned Homework",
        body: [
          "Making the worksheet is half the job; distributing it is the rest. EduAitor connects the generator to the LMS and parent app, so a generated worksheet is one click from being assigned.",
          "Teachers assign to a class, a group, or specific students at specific levels. Homework deadlines trigger automatic parent notifications, and students complete and submit the sheet digitally or practice the same questions online.",
          "Completion data flows back to the teacher — who solved it, who struggled, which question registered the least understanding — closing the loop between worksheet, homework and the next lesson.",
        ],
        image: "/ecosystem/03-academics-panel.png",
        imageAlt: "Worksheet assigned through the LMS",
        caption: "Assign worksheets to the class with automatic parent updates",
        points: [
          "One-click assignment to class, group or student",
          "Automatic deadline notifications to parents",
          "Completion data informs the next lesson",
        ],
      },
    ],
  },
  screenshots: {
    heading: "AI Worksheet Generator, Screenshots",
    items: [
      { src: "/ecosystem/04-ai-assessment-panel.png", alt: "AI worksheet generator", caption: "AI Worksheet Generator" },
      { src: "/ecosystem/03-academics-panel.png", alt: "Worksheet assigned to class", caption: "Assign to Class & Parents" },
      { src: "/ecosystem/16-analytics-panel.png", alt: "Worksheet completion analytics", caption: "Completion & Concept Analytics" },
    ],
  },
  howItWorks: {
    heading: "Create and Assign in Four Steps",
    steps: [
      { num: "01", title: "Pick the Topic", desc: "Choose class, subject, chapter, topic and difficulty level." },
      { num: "02", title: "AI Drafts the Sheet", desc: "Questions and answer key are generated in under a minute." },
      { num: "03", title: "Adjust or Regenerate", desc: "Tweak questions or recreate the sheet until it is perfect." },
      { num: "04", title: "Assign & Track", desc: "Send to the class, notify parents and track completion." },
    ],
  },
  benefits: {
    heading: "What Teachers Get Back",
    lead: "The hours worksheet-making steals are the hours teaching deserves.",
    items: [
      "A full worksheet and answer key in under a minute",
      "Easy, medium and hard versions for true differentiation",
      "Sheets matched exactly to the school's syllabus",
      "Reduced photocopying through digital assignment",
      "Automatic parent notifications for every homework",
      "Completion data that shapes the next lesson",
      "A growing worksheet library for the whole school",
      "Teachers restored to teaching, not reproducing",
    ],
  },
  summary: {
    heading: "Worksheets Deserve to Be Automatic",
    paragraphs: [
      "If you listed the most time-consuming teaching tasks in an Indian school, worksheet creation would sit near the top — not because it is hard, but because it is unlimited. Every chapter, every class, every level silently demands hours of a teacher's week.",
      "The EduAitor AI worksheet generator takes those hours back. The teacher selects a topic, and within a minute holds a syllabus-accurate sheet with answers differentiated across three levels. The saved time goes directly to what only a human can do: explain, inspire and respond to each child.",
      "Because the generator is part of the school platform, worksheets flow straight into the LMS and parent app. Assignment, notification, completion tracking and analysis are no longer separate chores.",
      "Modern teaching is increasingly judged on preparation quality and differentiation. With AI doing the reproduction, schools can deliver both, at scale, every single day — without asking teachers to sacrifice their evenings.",
      "And because every sheet joins a school-wide library, the value compounds. A worksheet written today for one class becomes part of a permanent asset that serves every future teacher, every term and every batch of students. The school is quietly building its best-ever teaching resource, one minute at a time.",
      "The parent relationship benefits too. Regular, well-constructed worksheets show families exactly what children are learning, replace vague 'complete page 9' homework, and turn revision into a structured event rather than a scramble before exams. Everyone — teacher, student and parent — finally works from the same sheet of paper.",
    ],
  },
  faqs: {
    heading: "Frequently Asked Questions",
    items: [
      { q: "What types of worksheets can I generate?", a: "Chapter-wise and topic-wise practice sheets with fill-in-the-blanks, MCQs, short answers, match-the-following and more — for any configured subject." },
      { q: "Does the worksheet match our syllabus?", a: "Yes. The generator uses the classes, subjects, chapters and topics configured for your school, so sheets stay aligned to your board and textbook structure." },
      { q: "Can I create different difficulty levels?", a: "Yes. One click produces easy, medium and hard versions of the same worksheet, letting you assign the right level to every student or group." },
      { q: "Are answer keys included?", a: "Every worksheet ships with a separate answer key, so checking, self-assessment and peer marking are immediate and reliable." },
      { q: "How do students receive the worksheets?", a: "Teachers assign sheets through the LMS, students complete them digitally or in print, and parents get automatic deadline notifications through the app." },
      { q: "Can we store worksheets for reuse?", a: "All generated sheets are saved in a searchable worksheet library, building a school-wide resource that grows every year." },
    ],
  },
  cta: {
    heading: "See a Worksheet Created in Under a Minute",
    text: "Watch a topic become a printable, differentiated worksheet with answers — live in your demo. Book it now.",
  },
  demo: {
    eyebrow: "REQUEST A FREE DEMO",
    heading: "Generate a Worksheet for Your Class",
    text: "Bring a topic your teachers need — we'll generate easy, medium and hard sheets live and show assignment to the class.",
    source: sourceKey.worksheet,
    submitLabel: "Request Demo",
    assurances: [
      "Your school's topic generated live at three levels",
      "Answer keys and assignment walkthrough",
      "Roll-out plan for every subject and class",
    ],
  },
};

/* ── Page: AI Report Card Generator ──────────────── */
const aiReportCardGenerator = {
  path: "/ai-report-card-generator",
  metaTitle:
    "AI Report Card Generator | Automatic Report Cards & Progress Reports | EduAitor",
  metaDescription:
    "Generate term-wise report cards, progress reports and remarks automatically. EduAitor's AI report card generator ends the report card season scramble.",
  hero: {
    eyebrow: "AI REPORT CARD GENERATOR",
    title: (
      <>
        Report Cards That Write Themselves — <span className="fl-accent">in Minutes</span>
      </>
    ),
    subtitle:
      "The days of spreadsheet report cards and blank 'teacher remarks' grids are over. EduAitor generates complete, personalised report cards and progress reports from real exam and skill data — automatically.",
    primary: { label: "See a Sample Report Card", source: sourceKey.reportcard },
    secondary: { label: "Explore the Ecosystem", to: "/ecosystem" },
    trust: (
      <>
        Generates <strong>hundreds of report cards</strong> in one run · Remarks written by AI
      </>
    ),
    image: "/ecosystem/16-analytics-panel.png",
    imageAlt: "EduAitor AI report card generator",
    imageCaption: "Term data in, complete report cards out — automatically",
  },
  stats: [
    { value: "100s", label: "Of report cards per run" },
    { value: "100%", label: "Profiles generated from real exam data" },
    { value: "0", label: "Blank remark boxes left to the last day" },
  ],
  intro: {
    heading: "What is an AI Report Card Generator?",
    paragraphs: [
      "An AI report card generator produces student report cards and progress reports automatically. It takes the term's exam results, internal assessments and skill data, computes grades and percentages, and composes each student's report in a consistent, professional layout.",
      "In most schools, report card season still means long nights. Teachers calculate grades by hand or in spreadsheets, chase missing marks, write dozens of remarks and print hundreds of pages — repeating the entire exercise every term.",
      "EduAitor's generator runs the same job from the marks already lying in the platform. It formats grades according to the board, computes ranks and subject-wise analysis, and writes clear, individualised remarks that actually describe each child.",
      "Schools also keep full control over format and voice. Report cards can carry the school's logo, colours and grading conventions, remarks can be written in the language the parents understand, and every card is reviewed before release — automation without loss of identity.",
    ],
  },
  why: {
    heading: "Why Report Cards Can't Stay Manual",
    lead: "A report card is a legal, academic and emotional document. It deserves accuracy.",
    points: [
      { icon: IcClock, title: "Seasons of Labour, Compressed", desc: "Hundreds of cards generated from one data set — the office verifies instead of building." },
      { icon: IcGrade, title: "Zero Calculation Errors", desc: "Grades, percentages and ranks compute automatically from the marks already in the system." },
      { icon: IcMessage, title: "Remarks That Read Like a Teacher", desc: "The AI composes supportive, specific comments from each child's actual performance." },
      { icon: IcPrint, title: "Board-Ready, Parent-Ready", desc: "Clean layouts that satisfy boards, print cleanly and publish privately to parents." },
    ],
  },
  features: {
    heading: "AI Report Card Generator Features",
    lead: "Every feature built to end the report card scramble.",
    items: [
      { icon: IcGrade, title: "Automatic Grades & Ranks", desc: "Percentages, grades, class ranks and subject-wise standings compute from marks." },
      { icon: IcMessage, title: "AI-Written Remarks", desc: "Personalised remarks composed from actual performance, strengths and areas to improve." },
      { icon: IcFile, title: "Multiple Formats", desc: "Term, annual, PTM and board-style report cards — all from the same data." },
      { icon: IcPrint, title: "Batch Printing", desc: "Generate the entire class or school in one run, then print with one click." },
      { icon: IcChart, title: "Progress Comparisons", desc: "See each student's journey across terms with clear, visual progress indicators." },
      { icon: IcShield, title: "Private Parent Delivery", desc: "Each parent sees only their own child's report through the secure parent app." },
      { icon: IcDashboard, title: "Class Performance View", desc: "Leadership and teachers see class-wide patterns alongside individual cards." },
      { icon: IcCheck, title: "Version & Approval", desc: "Draft, review and approve before release — the office stays in control." },
    ],
  },
  deepDive: {
    heading: "How Report Cards Come Together",
    sections: [
      {
        title: "From Exam Marks to Finished Cards",
        body: [
          "The generator works from data the school already owns. Exam marks, internal assessments and co-curricular records sit in EduAitor, so the first step of report card season is already complete.",
          "With one click, the generator computes every grade, percentage and rank according to the board's scheme, and assembles each student's report in a clean, professional layout — header, subjects, grades, remarks and attendance summary.",
          "Nothing is printed until the office reviews it. Drafts can be edited, formats switched and specific students regenerated without affecting the rest of the batch.",
        ],
        image: "/ecosystem/03-academics-panel.png",
        imageAlt: "Automatic report card generation view",
        caption: "Marks already in the system become finished report cards",
        points: [
          "Grades and ranks computed to board schemes",
          "Clean professional layouts for every term",
          "Draft, review and approve before printing",
        ],
      },
      {
        title: "Remarks Written by AI, Reviewed by Teachers",
        body: [
          "The most dreaded line on a report card is the remark. Teachers either repeat the same sentences or leave blanks that the office fills under pressure. EduAitor's AI writes remarks from the child's actual record.",
          "It considers performance across subjects, trends between terms, attendance and participation, and produces remarks that are specific, positive and actionable — noting strengths as well as where to focus.",
          "Teachers still review and edit every remark. The machine drafts, the professional approves — the school keeps the human voice and works in a fraction of the time.",
        ],
        image: "/ecosystem/05-ai-assistant-panel.png",
        imageAlt: "AI-written teacher remarks",
        caption: "AI drafts remarks from real performance; teachers approve",
        points: [
          "Specific, individualised remarks from real data",
          "Strengths and focus areas highlighted fairly",
          "Full teacher review before anything is released",
        ],
      },
      {
        title: "Private Delivery to the Right Parent",
        body: [
          "A report card is private. EduAitor publishes each card only to that student's parents through the secure parent app and portal, ending printed-card mix-ups and shared-classroom embarrassment.",
          "Parents see the card, the progress comparison with previous terms and a clear summary in their language of comfort. The digital copy stays with the family even if the printed one is lost.",
          "For PTMs, teachers show the same screen to every parent, so conversations stay factual, constructive and aligned with what is written on the card itself.",
        ],
        image: "/home/solution-dashboard.png",
        imageAlt: "Parent view of digital report card",
        caption: "Each parent sees only their child's report, securely",
        points: [
          "Secure private delivery to each parent",
          "Progress comparison across every term",
          "Digital copies that can never be lost",
        ],
      },
    ],
  },
  screenshots: {
    heading: "AI Report Card Generator, Screenshots",
    items: [
      { src: "/ecosystem/03-academics-panel.png", alt: "Automatic report card generation", caption: "Automatic Report Card Generation" },
      { src: "/ecosystem/16-analytics-panel.png", alt: "Progress and remark analytics", caption: "Progress & Remark Analytics" },
      { src: "/home/solution-dashboard.png", alt: "Parent view of report card", caption: "Private Parent Delivery" },
    ],
  },
  howItWorks: {
    heading: "How the Season Comes Together",
    steps: [
      { num: "01", title: "Marks Are Already There", desc: "Exam and assessment results live in the platform from the term spent teaching." },
      { num: "02", title: "AI Computes Everything", desc: "Grades, ranks, analysis and personalised remarks generate in one run." },
      { num: "03", title: "Office Reviews & Approves", desc: "Drafts are checked, edited and approved before any print or publish." },
      { num: "04", title: "Parents Get It Privately", desc: "Cards reach each parent securely through the app — on time, every time." },
    ],
  },
  benefits: {
    heading: "What the School Gains",
    lead: "The report card season that used to take weeks takes days.",
    items: [
      "Hundreds of cards generated in a single run",
      "Zero arithmetic or grading errors",
      "Personalised remarks without writer's block",
      "Board-aligned grade schemes and layouts",
      "Private, secure delivery to each parent",
      "Term-on-term progress comparisons built in",
      "Teachers freed from long nights of data entry",
      "A faster, calmer, more accurate PTM season",
    ],
  },
  summary: {
    heading: "Report Cards Should Reflect a Term, Not Consume One",
    paragraphs: [
      "Every term, schools pay a hidden tax: the report card season. Teachers calculate, office staff compile, remarks get rushed, and errors slip through — all while teaching has already stopped. It is among the most stressful weeks in the school calendar.",
      "EduAitor's AI report card generator takes the machinery out of that week. The data is already in the platform; the generator computes, formats and drafts, leaving the office and teachers to review instead of build.",
      "The quiet payoff is quality. When the mechanical labour disappears, the human part rises — remarks that actually describe a child, conversations with parents based on accurate trends, cards that arrive on time and feel carefully made.",
      "Schools that automate report cards do not lose their human touch. They finally have the time to apply it properly.",
      "The change is felt beyond the office. Parents receive accurate, thoughtful cards on time and start trusting the school's attention to detail. Teachers begin the new term rested instead of exhausted. And the principal's team walks into inspection season with clean, consistent, board-ready documentation — confidence no manual season can produce.",
      "Admission season is where the payoff becomes visible. Report cards are the first document parents ask to see, and a well-designed, reliably generated card is quiet marketing for the school. Automation does not make the cards impersonal; it makes them accurate, consistent and always on time — the qualities families remember.",
    ],
  },
  faqs: {
    heading: "Frequently Asked Questions",
    items: [
      { q: "How does the report card get its data?", a: "From the exam results, internal assessments, attendance and co-curricular records already entered in EduAitor. No separate data entry is needed for report card generation." },
      { q: "Can we follow our board's grading scheme?", a: "Yes. The generator applies the grade scheme of your board — CBSE, ICSE or State Board — including grade boundaries, subject grouping and percentage handling." },
      { q: "Who writes the remarks?", a: "The AI drafts personalised remarks from each student's performance and progress, but every remark is reviewed and editable by the teacher before anything is released." },
      { q: "Can we print report cards in bulk?", a: "Yes. The entire class or school can be generated and printed in one run, with clean, board-ready layouts." },
      { q: "How do parents receive the report card?", a: "Each parent receives only their own child's card privately through the secure parent app and portal, alongside a printable and downloadable copy." },
      { q: "What happens if a mark changes after generation?", a: "You can regenerate an individual student's card at any time — only that card changes, and the office always reviews and approves before release." },
    ],
  },
  cta: {
    heading: "End This Year's Report Card Scramble",
    text: "See a whole class's report cards generated — with personalised remarks — live in your demo. Book it now.",
  },
  demo: {
    eyebrow: "REQUEST A FREE DEMO",
    heading: "Watch Report Cards Generate Live",
    text: "We'll generate sample report cards with AI-written remarks from your kind of data, and show printing and parent delivery.",
    source: sourceKey.reportcard,
    submitLabel: "Request Demo",
    assurances: [
      "Sample cards generated live on the call",
      "AI remarks and editing walkthrough",
      "Quick implementation before your next term",
    ],
  },
};

/* ── Page: AI School Analytics ───────────────────── */
const aiSchoolAnalytics = {
  path: "/ai-school-analytics",
  metaTitle:
    "AI School Analytics | School Dashboard, Insights & Reports | EduAitor",
  metaDescription:
    "Turn attendance, fees, exams and learning data into daily AI insights. EduAitor school analytics gives leadership live dashboards and predictions for a smarter school.",
  hero: {
    eyebrow: "AI SCHOOL ANALYTICS",
    title: (
      <>
        Your School's Data, Working <span className="fl-accent">For You, Every Day</span>
      </>
    ),
    subtitle:
      "Most schools sit on gold — attendance, fees, exam and learning data — without ever mining it. EduAitor school analytics turns that data into live dashboards, forecasts and plain-language recommendations for leadership.",
    primary: { label: "See the Analytics Dashboard", source: sourceKey.analytics },
    secondary: { label: "Explore the Ecosystem", to: "/ecosystem" },
    trust: (
      <>
        Live insights from <strong>every module</strong> · Predictions from <strong>real school data</strong>
      </>
    ),
    image: analyticsImage,
    imageAlt: "EduAitor AI school analytics dashboard",
    imageCaption: "One dashboard takes the guesswork out of running a school",
  },
  stats: [
    { value: "Real-time", label: "Dashboards across every department" },
    { value: "Early", label: "Alerts for at-risk students and trends" },
    { value: "1", label: "Single source of truth for leadership" },
  ],
  intro: {
    heading: "What is AI School Analytics?",
    paragraphs: [
      "AI school analytics is the practice of turning a school's operational and academic data into decisions. Attendance, fee collection, exam results, homework completion — when these live together in one system, patterns become visible that registers and spreadsheets can never reveal.",
      "Traditional reporting only looks backwards: what happened last month. EduAitor looks forward too. Its analytics engine forecasts fee collection, predicts exam outcomes, spots at-risk students and tells leadership where to intervene — in plain language.",
      "The dashboard is built for the principal's chair, not the IT office. Anyone who can read a phone screen can read EduAitor analytics: what is going well, what needs attention and what to do next.",
      "Crucially, the same engine serves every role in proportion. The class teacher sees learning gaps for their own students, the office sees finance and admissions flows, and the principal sees the institution as a whole — one data platform, many tailored windows into it.",
    ],
  },
  why: {
    heading: "Why Data Is Every School's Underused Asset",
    lead: "The answers to a school's hardest questions are already in its data.",
    points: [
      { icon: IcChart, title: "See the Whole School at Once", desc: "Attendance, fees, academics and learning on one screen — no more digging through separate registers." },
      { icon: IcAi, title: "Predict Before Problems Grow", desc: "Models forecast risk early, so action happens while outcomes can still be changed." },
      { icon: IcMessage, title: "Insights in Plain Language", desc: "Instead of charts that need an analyst, get simple recommendations you can act on today." },
      { icon: IcShield, title: "Safe, Instrumented, Private", desc: "Analytics runs inside the school platform, using the school's own data, with role-based access." },
    ],
  },
  features: {
    heading: "School Analytics Features",
    lead: "Dashboards, reports and prediction across every department.",
    items: [
      { icon: IcDashboard, title: "Leadership Dashboard", desc: "A single screen for attendance, fee health, academic performance and admissions." },
      { icon: IcChart, title: "Automated Reports", desc: "Daily, weekly and term reports generated automatically and shared with the right people." },
      { icon: IcAi, title: "Predictive Insights", desc: "Forecasts for exam outcomes and fee collection, plus early at-risk alerts." },
      { icon: IcBell, title: "Anomaly Alerts", desc: "Unusual attendance dips, fee drops or result swings flagged the moment they appear." },
      { icon: IcGrade, title: "Performance Trends", desc: "Class, subject and teacher performance compared across terms and years." },
      { icon: IcMoney, title: "Finance Views", desc: "Collections, dues and expense trends that keep the board and audit confident." },
      { icon: IcUsers, title: "Department Breakdowns", desc: "Drill into admission funnels, transport, library use and staff workload." },
      { icon: IcPrint, title: "Exportable Reports", desc: "Everything downloadable for board inspections, accreditations and parent meetings." },
    ],
  },
  deepDive: {
    heading: "What the School's Data Can Reveal",
    sections: [
      {
        title: "One Screen for the Whole School",
        body: [
          "The leadership dashboard aggregates the school's entire operation — attendance, fee collection, academic results, admissions and learning activity — into one always-current screen as a principal opens it.",
          "Each metric is live because every module of EduAitor writes to a shared database. When the sports teacher marks attendance, the dashboard moves. When a parent pays fees, the collection trend moves. No exports, no reconciliations, no stale numbers.",
          "The dashboard is not just a scoreboard. Each indicator is clickable, drilling down to the classes, students or transactions behind it, so a number can be questioned and answered in seconds.",
        ],
        image: "/ecosystem/16-analytics-panel.png",
        imageAlt: "EduAitor school analytics dashboard",
        caption: "Every department's health on a single live screen",
        points: [
          "Live data from every module in one view",
          "Click-through drill-down to the underlying detail",
          "No exports, no reconciliation, no stale numbers",
        ],
      },
      {
        title: "Prediction That Changes Outcomes",
        body: [
          "Wait for a report card to reveal a decline and the decline is usually months old. EduAitor's predictive models study attendance, homework submission and test scores to forecast where each student is heading.",
          "When a student is projected to fall behind, the system raises an early alert with the specific weak concepts. The teacher gets a target to fix, the counsellor a checklist, and the parent a heads-up — before a failure has happened.",
          "The same logic applies to the whole school. Fee-collection pace, admission funnel health and class-level academic trends are forecast so leadership can act early rather than react late.",
        ],
        image: "/ecosystem/16-analytics-panel.png",
        imageAlt: "Predictive analytics for at-risk students",
        caption: "Early alerts let schools act before problems harden",
        points: [
          "Forecasts built from attendance, homework and tests",
          "Early at-risk alerts with specific weak concepts",
          "School-wide trend forecasts for leadership",
        ],
      },
      {
        title: "Analytics Without an Analyst",
        body: [
          "Many analytics tools produce beautiful charts that nobody reads, because interpreting them is a profession. EduAitor sidesteps that with plain-language insights and recommendations.",
          "The dashboard says things like 'Class 7-B attendance dropped 12% this week — driven by 4 students with repeated absence' or 'Fee collection is at 92% for the term, with 38 families overdue beyond 30 days.' It names the problem and finds the list behind it.",
          "This is what leadership actually needs — not more data, but less processing. The school principal becomes a decision-maker on the evidence, without a data science degree.",
        ],
        image: "/home/solution-dashboard.png",
        imageAlt: "Plain-language AI insights panel",
        caption: "Recommendations written so anyone can act on them",
        points: [
          "Insights written in plain, actionable language",
          "Every insight links to the underlying student list",
          "The principal decides on evidence, not data-mining",
        ],
      },
    ],
  },
  screenshots: {
    heading: "AI School Analytics, Screenshots",
    items: [
      { src: "/ecosystem/16-analytics-panel.png", alt: "AI school analytics dashboard", caption: "AI School Analytics Dashboard" },
      { src: "/home/solution-dashboard.png", alt: "Plain-language insights panel", caption: "Plain-Language Insights" },
      { src: "/ecosystem/05-ai-assistant-panel.png", alt: "Predictive at-risk alerts", caption: "Predictive At-Risk Alerts" },
    ],
  },
  howItWorks: {
    heading: "How Analytics Comes Alive",
    steps: [
      { num: "01", title: "Data Flows Into One Place", desc: "Every module already writes attendance, fees, academics and learning to one database." },
      { num: "02", title: "AI Learns Your School", desc: "The engine builds forecasts and baselines from your school's own history." },
      { num: "03", title: "Leadership Reads Daily", desc: "Live dashboards and plain-language insights arrive every morning." },
      { num: "04", title: "Decisions Become Actions", desc: "Insights connect to student lists and workflows so advice turns into follow-through." },
    ],
  },
  benefits: {
    heading: "What the School Gains",
    lead: "Analytics is not a report card for the principal. It is a steering wheel.",
    items: [
      "The entire school's health on one live screen",
      "Early warnings before problems become failures",
      "Decisions based on patterns, not gut feeling",
      "Fee, admission and attendance trends forecast",
      "Plain-language insights anyone can act on",
      "Automatic reports for board and audit",
      "Data that already exists, put to work",
      "A culture of evidence across the leadership team",
    ],
  },
  summary: {
    heading: "A School That Measures, Improves",
    paragraphs: [
      "Every school generates data as a by-product of running: who shows up, who pays, who learns, who is struggling. For most schools that data decays in registers and spreadsheets, surfacing months late or not at all.",
      "EduAitor analytics changes what a school can see and when. It puts a live, readable picture of the entire school in front of leadership every day, and forecasts what is coming so decisions can be made early, calmly and on evidence.",
      "The long-term effect is cultural. When teachers and staff know that improvement is measured, attended to and celebrated, the whole school starts aiming at the same targets. Records stop being paperwork and start being the story of how the school is getting better.",
      "That is the difference between data as an archive and data as an engine — and it is the difference EduAitor makes possible.",
      "Analytics also earns its keep financially. Fee trends forecast early cash flow, admission funnels show where marketing works, and transport and resources reveal inefficiency. A school that measures answers questions faster, plans terms with evidence, and protects its revenue — all from systems it already runs every day.",
      "None of this demands a change in teaching or a technology project. Analytics activates the moment your school already uses EduAitor for attendance, fees and exams. The data has been arriving all along; the dashboard simply turns it into a readable story of the school's week.",
    ],
  },
  faqs: {
    heading: "Frequently Asked Questions",
    items: [
      { q: "Do we need a data analyst to use the dashboard?", a: "No. The dashboard is designed for school leadership and presents insights in plain language, with click-through lists for every finding. No technical skill is required." },
      { q: "Where does the analytics data come from?", a: "Entirely from the school's own modules in EduAitor — attendance, fees, admissions, exams, homework and learning activity. Nothing is entered separately for analytics." },
      { q: "Can we see predictions for individual students?", a: "Yes. Predictive models assess each student's trajectory and flag those at risk, with the specific weak concepts and recommended actions for the teacher." },
      { q: "Are reports available for boards and audits?", a: "Yes. Dashboards and detailed reports export for board inspections, accreditations, audits and parent meetings, in clean printable formats." },
      { q: "How do teachers and staff see analytics?", a: "Each role gets the analytics relevant to it — class teachers see class performance and gaps, office staff see finance and admissions, leadership sees the whole school." },
      { q: "Is our data safe with the analytics engine?", a: "Analytics runs inside the school's own platform on your own data. Access is role-based, encrypted and governed by the school's settings." },
    ],
  },
  cta: {
    heading: "See Your School Through Fresh Eyes",
    text: "Watch a live dashboard reveal attendance, fees and at-risk trends — then book a demo for your leadership team.",
  },
  demo: {
    eyebrow: "REQUEST A FREE DEMO",
    heading: "See AI School Analytics Live",
    text: "We'll run through the leadership dashboard, predictive alerts and plain-language insights with realistic school data.",
    source: sourceKey.analytics,
    submitLabel: "Request Demo",
    assurances: [
      "Leadership dashboard walkthrough with real data",
      "Predictive at-risk alerts demonstrated live",
      "Roadmap to connect your school's data",
    ],
  },
};

export const featureLandingPages = [
  schoolManagement,
  aiSchoolErp,
  attendance,
  feeManagement,
  exam,
  parentApp,
  sis,
  lms,
  aiAcademicAssistant,
  aiQuestionPaperGenerator,
  aiWorksheetGenerator,
  aiReportCardGenerator,
  aiSchoolAnalytics,
];

/** Lookup by exact route path. */
export const getFeatureLandingPage = (pathname) =>
  featureLandingPages.find((p) => p.path === pathname);