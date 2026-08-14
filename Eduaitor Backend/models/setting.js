import mongoose from "mongoose";

/* ── Reusable ── */
const linkSchema = new mongoose.Schema(
    { label: String, path: String },
    { _id: false }
);

const policySectionSchema = new mongoose.Schema(
    { heading: String, content: String },
    { _id: false }
);

const policySchema = new mongoose.Schema(
    {
        enabled: { type: Boolean, default: true },
        title: String,
        slug: String,
        lastUpdated: String,
        sections: { type: [policySectionSchema], default: [] },
    },
    { _id: false }
);

const imageField = {
    url: { type: String, default: "" },
    publicId: { type: String, default: "" },
};

const reachCardSchema = new mongoose.Schema(
    {
        accent: { type: String, default: "blue" },
        icon: { type: String, default: "headset" },
        title: { type: String, default: "" },
        desc: { type: String, default: "" },
        email: { type: String, default: "" },
        phone: { type: String, default: "" },
        address: { type: String, default: "" },
        cta: { type: String, default: "" },
        href: { type: String, default: "" },
        openInNewTab: { type: Boolean, default: false },
    },
    { _id: false }
);

/* ── MAIN ── */
const settingSchema = new mongoose.Schema(
    {
        /* GENERAL */
        general: {
            siteName: String,
            tagline: String,
            description: String,

            logo: imageField,
            favicon: imageField,

            emails: { type: [String], default: [] },
            phones: { type: [String], default: [] },
            address: String,

            instagram: String,
            linkedin: String,
            facebook: String,
            twitter: String,

            showAppDownload: { type: Boolean, default: true },
            googlePlayUrl: String,
            appStoreUrl: String,

            copyright: String,
        },

        /* REACH US (Contact page) */
        reachUs: {
            eyebrow: { type: String, default: "—— GET IN TOUCH ——" },
            titleBefore: { type: String, default: "Multiple Ways to" },
            titleHighlight: { type: String, default: "Reach Us" },
            subtitle: {
                type: String,
                default:
                    "We're here to help you at every step. Choose the most convenient way to connect with our team.",
            },
            cards: { type: [reachCardSchema], default: [] },
            workingHoursTitle: { type: String, default: "Working Hours" },
            workingHoursDays: { type: String, default: "Monday – Saturday" },
            workingHoursTime: { type: String, default: "9:30 AM – 6:30 PM (IST)" },
            workingHoursNote: {
                type: String,
                default: "(Closed on Sundays & Public Holidays)",
            },
            newsletterTitle: { type: String, default: "Stay in the Loop" },
            newsletterDesc: {
                type: String,
                default:
                    "Subscribe to our newsletter for the latest updates, features, and education insights.",
            },
            newsletterEmail: { type: String, default: "marketing@eduaitor.com" },
            officeLabel: { type: String, default: "EduAitor Office" },
            notePrimary: {
                type: String,
                default: "We value your time and trust. Expect a response within one business day.",
            },
            noteSecondary: {
                type: String,
                default: "Thank you for considering EduAitor.",
            },
        },

        /* POLICIES */
        policies: {
            termsOfUse: policySchema,
            privacyPolicy: policySchema,
            refundPolicy: policySchema,
            helpSupport: policySchema,
            faqs: policySchema,
        },

        /* RESOURCES (footer resource pages) */
        resources: {
            helpCenter: policySchema,
            knowledgeBase: policySchema,
            blogs: policySchema,
            caseStudies: policySchema,
            webinars: policySchema,
            downloads: policySchema,
            whatsNew: policySchema,
        },

        /* COMPANY (footer company pages) */
        company: {
            aboutUs: policySchema,
            ourMission: policySchema,
            ourTeam: policySchema,
            careers: policySchema,
            partners: policySchema,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Setting", settingSchema);
