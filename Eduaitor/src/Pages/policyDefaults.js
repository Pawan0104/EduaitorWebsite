/** Fallback policy content sourced from official EduAItor Word documents. */

const bullet = (...items) => items.map((item) => `• ${item}`).join("\n");

export const POLICY_META = {
  termsOfUse: {
    icon: "📜",
    accent: "blue",
    fallbackTitle: "Terms & Conditions",
    fallbackUpdated: "August 6, 2026",
    fallbackSections: [
      {
        heading: "Welcome",
        content:
          'These Terms & Conditions ("Terms") govern your access to and use of the EduAItor website, web application, mobile applications, and all products and services provided under the EduAItor brand.\n\nBy accessing or using EduAItor, you agree to be bound by these Terms. If you do not agree with these Terms, please refrain from using our services.',
      },
      {
        heading: "1. About EduAItor",
        content:
          "EduAItor is an AI-Powered School Operating System designed to help educational institutions simplify operations, empower educators, strengthen parent engagement, and improve student outcomes through an integrated digital ecosystem.\n\nThese Terms apply to:\n" +
          bullet(
            "EduAItor Website",
            "EduAItor Web Application",
            "EduAItor Mobile Applications",
            "AI-powered services",
            "All related products and services"
          ),
      },
      {
        heading: "2. Eligibility",
        content:
          "You may use EduAItor only if:\n" +
          bullet(
            "You are authorised by your educational institution.",
            "You are at least 18 years of age, or are using the platform under the supervision of a parent, guardian, or educational institution.",
            "You agree to comply with these Terms and all applicable laws."
          ),
      },
      {
        heading: "3. User Accounts",
        content:
          "Users are responsible for maintaining the confidentiality of their login credentials.\n\nYou agree to:\n" +
          bullet(
            "Provide accurate information.",
            "Keep your password confidential.",
            "Notify EduAItor immediately of any unauthorized access.",
            "Use only your own account."
          ) +
          "\n\nEduAItor reserves the right to suspend or terminate accounts that violate these Terms.",
      },
      {
        heading: "4. Acceptable Use",
        content:
          "Users agree not to:\n" +
          bullet(
            "Use the platform for any unlawful purpose.",
            "Upload malicious software or harmful code.",
            "Attempt unauthorized access to any system or data.",
            "Disrupt platform functionality.",
            "Misrepresent their identity.",
            "Copy, reverse engineer, modify, or redistribute EduAItor software without written permission.",
            "Use EduAItor to infringe the rights of others."
          ),
      },
      {
        heading: "5. Artificial Intelligence Services",
        content:
          "EduAItor provides AI-powered tools including, but not limited to:\n" +
          bullet(
            "AI Academic Assistant",
            "AI Assessment Generator",
            "Predictive Performance Analytics",
            "Intelligent Recommendations"
          ) +
          "\n\nThese tools are intended to assist educators and administrators.\n\nAI-generated content should always be reviewed by qualified educators before implementation. Final academic and administrative decisions remain the responsibility of the educational institution.",
      },
      {
        heading: "6. School Data",
        content:
          "Educational institutions remain the owners of the data they upload or generate through EduAItor.\n\nThe institution is responsible for:\n" +
          bullet(
            "Ensuring the accuracy of data.",
            "Obtaining necessary consents from students, parents, and staff.",
            "Complying with applicable laws and regulations relating to data collection and processing."
          ) +
          "\n\nEduAItor processes such data solely for the purpose of providing agreed services.",
      },
      {
        heading: "7. Intellectual Property",
        content:
          "All intellectual property rights relating to EduAItor, including but not limited to:\n" +
          bullet(
            "Software",
            "Source code",
            "Artificial Intelligence models",
            "Algorithms",
            "Logos",
            "Branding",
            "Website content",
            "Mobile applications",
            "Graphics",
            "Documentation",
            "Training materials"
          ) +
          "\n\nremain the exclusive property of EduAItor or its licensors.\n\nNo part of the platform may be copied, reproduced, modified, distributed, or commercially exploited without prior written permission.",
      },
      {
        heading: "8. Subscription & Licensing",
        content:
          "Access to EduAItor is provided under a subscription-based license.\n\nSubscription details, pricing, billing cycles, and applicable plans are governed by the commercial agreement between EduAItor and the educational institution.\n\nAccess to premium features may depend upon the selected subscription plan.",
      },
      {
        heading: "9. Payments",
        content:
          "Schools agree to make payments in accordance with the agreed commercial terms.\n\nFailure to make timely payments may result in:\n" +
          bullet(
            "Suspension of services",
            "Restriction of access",
            "Termination of subscription",
            "Recovery proceedings, where applicable"
          ),
      },
      {
        heading: "10. Availability of Services",
        content:
          "EduAItor strives to maintain high platform availability.\n\nHowever, services may occasionally be interrupted due to:\n" +
          bullet(
            "Scheduled maintenance",
            "Software upgrades",
            "Security updates",
            "Force majeure events",
            "Technical failures beyond reasonable control"
          ) +
          "\n\nWe will make reasonable efforts to minimize disruption.",
      },
      {
        heading: "11. Third-Party Services",
        content:
          "EduAItor may integrate with third-party platforms such as:\n" +
          bullet(
            "Payment gateways",
            "SMS providers",
            "Email providers",
            "Cloud hosting services",
            "Video conferencing tools",
            "Learning Management Systems"
          ) +
          "\n\nEduAItor is not responsible for the policies or services of such third-party providers.",
      },
      {
        heading: "12. Confidentiality",
        content:
          "Both EduAItor and the educational institution agree to maintain the confidentiality of non-public information exchanged during the course of the relationship.\n\nConfidential information shall not be disclosed except:\n" +
          bullet(
            "With prior written consent.",
            "As required by law.",
            "To authorised personnel who require such access."
          ),
      },
      {
        heading: "13. Limitation of Liability",
        content:
          "To the maximum extent permitted by law, EduAItor shall not be liable for:\n" +
          bullet(
            "Indirect or consequential damages.",
            "Loss of profits.",
            "Loss of data arising from factors beyond our reasonable control.",
            "Decisions made solely on AI-generated recommendations.",
            "Service interruptions caused by third-party infrastructure or internet connectivity."
          ) +
          "\n\nOur total liability shall not exceed the fees paid by the institution for the applicable subscription period, except where prohibited by law.",
      },
      {
        heading: "14. Indemnification",
        content:
          "Users and educational institutions agree to indemnify and hold EduAItor harmless against claims, losses, liabilities, damages, costs, or expenses arising from:\n" +
          bullet(
            "Violation of these Terms.",
            "Misuse of the platform.",
            "Infringement of third-party rights.",
            "Unauthorized use of the services."
          ),
      },
      {
        heading: "15. Suspension & Termination",
        content:
          "EduAItor reserves the right to suspend or terminate access where:\n" +
          bullet(
            "These Terms are violated.",
            "Fraudulent or unlawful activities are detected.",
            "Subscription obligations are not fulfilled.",
            "Continued access poses a security risk."
          ) +
          "\n\nTermination does not affect accrued rights or obligations.",
      },
      {
        heading: "16. Governing Law & Jurisdiction",
        content:
          "These Terms shall be governed by and construed in accordance with the laws of India.\n\nAny disputes arising out of or relating to these Terms shall be subject to the exclusive jurisdiction of the competent courts located in Jaipur, Rajasthan.",
      },
      {
        heading: "17. Changes to These Terms",
        content:
          "EduAItor may revise these Terms from time to time.\n\nUpdated versions will be published on our website with the revised effective date.\n\nContinued use of the platform after such updates constitutes acceptance of the revised Terms.",
      },
      {
        heading: "18. Responsible Use of Artificial Intelligence",
        content:
          "EduAItor is committed to the responsible and ethical use of Artificial Intelligence in education.\n\nOur AI-powered features are designed to support educational institutions by enhancing efficiency, assisting educators, and providing intelligent recommendations.\n\nUsers acknowledge that:\n" +
          bullet(
            "AI-generated content is intended to assist, not replace, human judgment.",
            "Educational, academic, administrative, disciplinary, or policy decisions should always be reviewed and approved by authorized school personnel.",
            "Users are responsible for verifying the accuracy, suitability, and appropriateness of AI-generated outputs before relying upon them.",
            "EduAItor continuously improves its AI capabilities; however, AI-generated responses may occasionally contain inaccuracies or incomplete information."
          ) +
          "\n\nEduAItor encourages the responsible, transparent, and ethical use of Artificial Intelligence in ways that support the best interests of students, educators, parents, and educational institutions.",
      },
      {
        heading: "19. Beta Features & Early Access",
        content:
          "From time to time, EduAItor may introduce new features, services, artificial intelligence capabilities, integrations, or modules that are designated as Beta, Preview, Pilot, or Early Access features.\n\nSuch features are provided for evaluation and continuous improvement and may:\n" +
          bullet(
            "Contain limited functionality.",
            "Be modified, enhanced, or discontinued at any time.",
            "Be subject to additional usage limitations.",
            "Not be suitable for production use."
          ) +
          '\n\nEducational institutions using Beta features acknowledge that such features are offered "as is" and may not meet the same performance standards as generally available services.\n\nFeedback received during Beta programs helps us improve future releases.',
      },
      {
        heading: "20. Feedback & Suggestions",
        content:
          "We welcome suggestions, recommendations, feature requests, ideas, and feedback from our users.\n\nBy voluntarily submitting feedback to EduAItor, you agree that:\n" +
          bullet(
            "EduAItor may use, evaluate, modify, and incorporate such feedback into its products and services.",
            "No compensation, royalty, ownership interest, or other consideration shall be payable for such feedback.",
            "Submission of feedback does not create any confidentiality obligation unless expressly agreed in writing."
          ) +
          "\n\nOur goal is to continuously improve the EduAItor platform based on the evolving needs of educational institutions.",
      },
      {
        heading: "21. Electronic Communications",
        content:
          "By using EduAItor, you consent to receive electronic communications from us.\n\nThese communications may include:\n" +
          bullet(
            "Service announcements",
            "Platform notifications",
            "Security alerts",
            "Subscription and billing information",
            "Policy updates",
            "Product enhancements",
            "Maintenance notifications",
            "Support communications"
          ) +
          "\n\nSuch communications may be delivered through:\n" +
          bullet(
            "Email",
            "Mobile applications",
            "SMS (where applicable)",
            "In-platform notifications",
            "Official EduAItor website announcements"
          ) +
          "\n\nYou agree that electronic communications satisfy any legal requirement that such communications be provided in writing.",
      },
      {
        heading: "22. Contact Us",
        content:
          "For any questions regarding these Terms & Conditions, please contact:\n\nEduAItor\nEmail: connect@eduaitor.com\nWebsite: www.eduaitor.com\nAddress: E05, 2nd Floor, Capital High-Street Mall, Jagatpura, Jaipur – 302017, Rajasthan, India",
      },
      {
        heading: "23. Entire Agreement",
        content:
          "These Terms & Conditions, together with our Privacy Policy, Refund Policy, Subscription Agreement (where applicable), and any executed commercial agreements between EduAItor and the educational institution, constitute the entire agreement governing the use of the EduAItor platform and supersede all prior communications, understandings, proposals, or representations relating to the subject matter herein.",
      },
    ],
  },

  privacyPolicy: {
    icon: "🔒",
    accent: "teal",
    fallbackTitle: "Privacy Policy",
    fallbackUpdated: "August 6, 2026",
    fallbackSections: [
      {
        heading: "Introduction",
        content:
          "At EduAItor, we recognize that schools entrust us with one of their most valuable assets—their data. Protecting the privacy, confidentiality, and security of that information is fundamental to our commitment as an AI-Powered School Operating System.\n\nThis Privacy Policy explains how EduAItor collects, uses, stores, protects, and processes personal and institutional information when you use our website, mobile applications, and software platform.\n\nBy accessing or using EduAItor, you acknowledge that you have read and understood this Privacy Policy.",
      },
      {
        heading: "1. About EduAItor",
        content:
          "EduAItor is an AI-Powered School Operating System that helps educational institutions simplify operations, empower educators, strengthen parent engagement, and improve student outcomes through an integrated digital ecosystem.\n\nThis Privacy Policy applies to:\n" +
          bullet(
            "EduAItor Website",
            "EduAItor Web Application",
            "EduAItor Mobile Applications",
            "All products and services offered under the EduAItor brand"
          ),
      },
      {
        heading: "2. Information We Collect",
        content:
          "Depending on how you interact with EduAItor, we may collect the following categories of information.\n\nA. School Information\n" +
          bullet(
            "School Name",
            "Address",
            "Board Affiliation",
            "Contact Details",
            "Institutional Profile",
            "Administrator Details"
          ) +
          "\n\nB. User Information\nFor administrators, teachers, parents, students and staff:\n" +
          bullet(
            "Name",
            "Email Address",
            "Mobile Number",
            "Designation",
            "Username",
            "Login Credentials (encrypted)",
            "Profile Photograph (optional)",
            "Government-Issued Identification (such as Aadhaar Card), where required by the educational institution and permitted under applicable laws"
          ) +
          "\n\nC. Student Information\nWhere provided by the institution:\n" +
          bullet(
            "Student Name",
            "Admission Number",
            "Academic Records",
            "Attendance",
            "Examination Results",
            "Assignments",
            "Learning Progress",
            "Parent Information"
          ) +
          "\n\nEduAItor collects and processes student information solely on behalf of the educational institution.\n\nD. Payment Information\nWhen schools subscribe to EduAItor, we may collect:\n" +
          bullet(
            "Billing Details",
            "GST Information",
            "Invoice Information",
            "Transaction Reference"
          ) +
          "\n\nEduAItor does not store complete debit card, credit card, or banking credentials. Payments are processed through secure third-party payment partners.\n\nE. Technical Information\nWe may automatically collect:\n" +
          bullet(
            "IP Address",
            "Browser Type",
            "Device Information",
            "Operating System",
            "Application Version",
            "Login Activity",
            "Usage Statistics",
            "Cookies"
          ),
      },
      {
        heading: "3. How We Use Information",
        content:
          "We use information to:\n" +
          bullet(
            "Deliver EduAItor services",
            "Manage school operations",
            "Provide customer support",
            "Improve platform performance",
            "Generate analytics and reports",
            "Enhance AI-powered features",
            "Ensure platform security",
            "Process subscriptions and payments",
            "Communicate important updates",
            "Comply with legal obligations"
          ),
      },
      {
        heading: "4. Artificial Intelligence Features",
        content:
          "EduAItor includes AI-powered capabilities such as:\n" +
          bullet(
            "AI Assessment Generator",
            "AI Academic Assistant",
            "Predictive Performance Analytics",
            "Intelligent Recommendations"
          ) +
          "\n\nOur AI features are designed to assist educators and institutions.\n\nAI-generated suggestions are intended to support decision-making and should not replace professional educational judgment.",
      },
      {
        heading: "5. Data Security",
        content:
          "Protecting school data is one of our highest priorities.\n\nEduAItor implements appropriate administrative, technical, and organizational safeguards, including:\n" +
          bullet(
            "Encryption of sensitive data",
            "Secure cloud infrastructure",
            "Role-based access controls",
            "Multi-level authentication",
            "Regular security monitoring",
            "Backup and disaster recovery procedures",
            "Secure data transmission using SSL/TLS"
          ) +
          "\n\nWhile we employ industry-standard security practices, no online platform can guarantee absolute security.",
      },
      {
        heading: "6. Data Sharing",
        content:
          "EduAItor does not sell personal information.\n\nWe may share information only:\n" +
          bullet(
            "With the educational institution using EduAItor",
            "With trusted technology service providers supporting our platform",
            "When required by applicable law",
            "To protect legal rights and platform security"
          ) +
          "\n\nAll service providers are required to maintain appropriate confidentiality and security standards.",
      },
      {
        heading: "7. Data Retention",
        content:
          "We retain information only for as long as necessary to:\n" +
          bullet(
            "Deliver services",
            "Meet contractual obligations",
            "Comply with applicable laws",
            "Resolve disputes",
            "Maintain audit records"
          ) +
          "\n\nSchools may request data export or deletion in accordance with applicable agreements and legal requirements.",
      },
      {
        heading: "8. Cookies",
        content:
          "Our website may use cookies and similar technologies to:\n" +
          bullet(
            "Improve website functionality",
            "Remember user preferences",
            "Measure website performance",
            "Enhance user experience"
          ) +
          "\n\nUsers may manage cookie preferences through their browser settings.",
      },
      {
        heading: "9. Third-Party Services",
        content:
          "EduAItor may integrate with third-party services including:\n" +
          bullet(
            "Payment gateways",
            "Email providers",
            "SMS providers",
            "Video conferencing platforms",
            "Cloud hosting providers",
            "Learning Management integrations"
          ) +
          "\n\nThese services operate under their own privacy policies.",
      },
      {
        heading: "10. Children's Privacy",
        content:
          "EduAItor is designed for use by educational institutions.\n\nStudent information is processed only under the authority of the respective school or institution.\n\nParents or guardians seeking access to or correction of student information should contact the respective educational institution directly.",
      },
      {
        heading: "11. Your Rights",
        content:
          "Depending on applicable laws, users may have the right to:\n" +
          bullet(
            "Access their information",
            "Correct inaccurate information",
            "Request deletion where legally permissible",
            "Withdraw consent where applicable",
            "Request information regarding processing activities"
          ) +
          "\n\nRequests may be submitted through the contact information provided below.",
      },
      {
        heading: "12. International Data Processing",
        content:
          "If EduAItor provides services outside India, information may be processed in jurisdictions where our infrastructure or service providers operate.\n\nWe take appropriate safeguards to ensure data protection standards are maintained.",
      },
      {
        heading: "13. Updates to this Privacy Policy",
        content:
          "EduAItor may update this Privacy Policy periodically to reflect changes in technology, legal requirements, or our services.\n\nThe revised version will be published on this page with an updated effective date.\n\nContinued use of EduAItor after changes become effective constitutes acceptance of the updated Privacy Policy.",
      },
      {
        heading: "14. Contact Us",
        content:
          "For any questions regarding this Privacy Policy or our data practices, please contact:\n\nEduAItor\nEmail: privacy@eduaitor.com\nWebsite: www.eduaitor.com\nAddress: E05, 2nd Floor, Capital High-Street Mall, Jagatpura, Jaipur – 302017, Rajasthan, India",
      },
      {
        heading: "Our Commitment",
        content:
          "At EduAItor, we believe trust is the foundation of every successful educational partnership.\n\nEvery feature we build, every service we deliver, and every innovation we introduce is guided by our commitment to protecting the privacy, security, and integrity of the schools, educators, parents, and students who rely on our platform every day.",
      },
    ],
  },

  refundPolicy: {
    icon: "💳",
    accent: "green",
    fallbackTitle: "Refund & Cancellation Policy",
    fallbackUpdated: "August 6, 2026",
    fallbackSections: [
      {
        heading: "Introduction",
        content:
          "At EduAItor, we are committed to building long-term relationships with educational institutions through transparency, fairness, and trust. This Refund & Cancellation Policy outlines the terms governing subscription cancellations, refund eligibility, implementation charges, and data handover for all EduAItor products and services.\n\nBy subscribing to or using EduAItor's services, you acknowledge that you have read, understood, and agreed to this Refund & Cancellation Policy.",
      },
      {
        heading: "1. Scope",
        content:
          "This Refund & Cancellation Policy applies to:\n" +
          bullet(
            "EduAItor ONE Subscription",
            "EduAItor Enterprise Subscription",
            "Monthly Subscription Plans",
            "Annual Subscription Plans",
            "One-Time Setup & Implementation Services",
            "Data Migration Services",
            "Professional Services",
            "Training & Onboarding Services",
            "Any additional paid services provided by EduAItor"
          ),
      },
      {
        heading: "2. One-Time Setup & Implementation Charges",
        content:
          "The one-time implementation, onboarding, configuration, deployment, customization, data migration, and training charges are strictly non-refundable.\n\nThese charges relate to professional services performed specifically for the subscribing educational institution and are incurred immediately upon commencement of the implementation process. Accordingly, they cannot be reversed or refunded.",
      },
      {
        heading: "3. Monthly Subscription Plan",
        content:
          "Educational institutions subscribed under the Monthly Subscription Plan may discontinue their subscription by providing written notice to EduAItor.\n\nHowever:\n" +
          bullet(
            "The subscription charges for the current running month shall be non-refundable.",
            "Cancellation shall become effective after the completion of the current paid billing month unless otherwise agreed in writing by both parties.",
            "No partial-month refunds shall be issued."
          ),
      },
      {
        heading: "4. Annual Subscription Plan",
        content:
          "Educational institutions subscribed under the Annual Subscription Plan may request cancellation by submitting a written request to EduAItor.\n\nFor refund calculations:\n" +
          bullet(
            "The subscription charges applicable to the current running quarter shall be non-refundable.",
            "Refunds, where applicable, shall be calculated only after deducting the charges for the current running quarter together with any applicable taxes, outstanding dues, or other mutually agreed deductions."
          ) +
          "\n\nFor the purpose of this policy, the quarters shall be defined as follows:\n" +
          bullet(
            "Quarter 1: January – March",
            "Quarter 2: April – June",
            "Quarter 3: July – September",
            "Quarter 4: October – December"
          ),
      },
      {
        heading: "5. Student Strength Reconciliation",
        content:
          "EduAItor follows a per-student subscription model.\n\nAccordingly:\n" +
          bullet(
            "The educational institution shall provide accurate and updated student enrollment details during onboarding and whenever reasonably requested by EduAItor.",
            "EduAItor reserves the right to verify or reconcile the declared student strength at reasonable intervals.",
            "Where the actual active student strength exceeds the subscribed student count, EduAItor may invoice the institution for the additional students on a prorated basis or as per the applicable commercial agreement.",
            "Any reduction in student strength shall ordinarily be considered at the time of the next subscription renewal and shall not entitle the institution to a refund for the current billing period unless otherwise mutually agreed in writing."
          ),
      },
      {
        heading: "6. Cancellation Procedure",
        content:
          "All cancellation requests must:\n" +
          bullet(
            "Be submitted through the registered official email address of the educational institution.",
            "Clearly state the reason for cancellation.",
            "Be addressed to billing@eduaitor.com (or any other official billing email designated by EduAItor)."
          ) +
          "\n\nRequests made through telephone calls, WhatsApp messages, verbal communication, or other informal channels shall not be treated as valid cancellation requests.",
      },
      {
        heading: "7. Refund Approval Process",
        content:
          "Refunds, wherever applicable, shall be processed only after:\n" +
          bullet(
            "Receipt of a formal written cancellation request.",
            "Internal review by EduAItor.",
            "Mutual written acceptance of the refund terms by both EduAItor and the educational institution."
          ) +
          "\n\nSubmission of a cancellation request does not automatically entitle the institution to a refund.",
      },
      {
        heading: "8. Refund Processing Timeline",
        content:
          "Once a refund request has been reviewed, approved, and mutually accepted in writing by both parties:\n" +
          bullet(
            "Refunds shall be processed within 15 (fifteen) business days upon completion of the running quarter, after adjustment of all applicable non-refundable charges, taxes, outstanding dues, and other mutually agreed deductions.",
            "Refunds shall ordinarily be made through the original mode of payment.",
            "Where the original payment method is unavailable or impractical, EduAItor may process the refund through another mutually agreed banking channel."
          ),
      },
      {
        heading: "9. Non-Refundable Items",
        content:
          "The following shall not be eligible for refund:\n" +
          bullet(
            "One-time setup and implementation charges.",
            "Data migration services.",
            "Training and onboarding services already delivered.",
            "Custom software development.",
            "Third-party integration services.",
            "Professional consulting services.",
            "Subscription charges for the current running month under the Monthly Subscription Plan.",
            "Subscription charges for the current running quarter under the Annual Subscription Plan.",
            "Government taxes, statutory fees, and levies already deposited with the relevant authorities where such amounts are non-refundable under applicable law."
          ),
      },
      {
        heading: "10. Suspension Due to Non-Payment",
        content:
          "Where services are suspended due to delayed or non-payment:\n" +
          bullet(
            "Subscription fees already paid shall not be refunded.",
            "Restoration of services may require payment of all outstanding dues together with any applicable reactivation charges."
          ),
      },
      {
        heading: "11. Exceptional Circumstances",
        content:
          "EduAItor may, at its sole discretion, consider refund requests outside the scope of this policy under exceptional circumstances.\n\nAny such approval:\n" +
          bullet(
            "Shall be evaluated on a case-by-case basis.",
            "Shall not constitute a precedent for future refund requests.",
            "Shall require written approval from authorized representatives of both parties."
          ),
      },
      {
        heading: "12. Data Handover Upon Cancellation",
        content:
          "EduAItor recognizes that all institutional data uploaded to or generated through the platform remains the property of the respective educational institution.\n\nUpon cancellation of the subscription and settlement of all outstanding dues:\n" +
          bullet(
            "The institution may submit a written request for the export of its institutional data.",
            "Where technically feasible, EduAItor shall provide the data in a standard electronic format suitable for migration or archival purposes.",
            "Requests for data export must be submitted within 30 (thirty) days from the effective date of subscription termination.",
            "After the expiry of this period, EduAItor reserves the right to securely archive or permanently delete the institutional data in accordance with its data retention policies, contractual obligations, and applicable laws.",
            "EduAItor shall not be responsible for any loss of data arising from the institution's failure to request data export within the prescribed period."
          ),
      },
      {
        heading: "13. Changes to this Policy",
        content:
          "EduAItor reserves the right to amend or update this Refund & Cancellation Policy from time to time.\n\nThe revised version shall become effective from the date of publication on the EduAItor website.\n\nContinued use of EduAItor services after such publication shall constitute acceptance of the updated policy.",
      },
      {
        heading: "14. Contact Us",
        content:
          "For any questions relating to cancellations, billing, refunds, or subscription matters, please contact:\n\nEduAItor\nEmail: billing@eduaitor.com\nWebsite: www.eduaitor.com\nAddress: E05, 2nd Floor, Capital High-Street Mall, Jagatpura, Jaipur – 302017, Rajasthan, India",
      },
      {
        heading: "Fair & Transparent Billing",
        content:
          "At EduAItor, we believe lasting partnerships are built on transparency, accountability, and mutual trust.\n\nOur subscription, billing, cancellation, and refund practices are designed to be fair, predictable, and clearly communicated, ensuring that every educational institution can engage with EduAItor with complete confidence.",
      },
    ],
  },
};
