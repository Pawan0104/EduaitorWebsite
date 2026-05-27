import React, { useState ,useRef,useEffect} from "react";
import "./BookDemoPage.css";
import Faqsection from "../Components/MarketPlace-components/Faqsection";
import axios from "axios";

const API = import.meta.env.VITE_API_URL || "https://eduaitor-website.onrender.com/api"; // e.g. http://localhost:5000/api

const BookDemoPage = () => {
  const [formData, setFormData] = useState({
    instName: "",
    instType: "",
    students: "",
    branches: "",
    contactName: "",
    designation: "",
    email: "",
    phone: "",
    city: "",
    date: "",
    time: "",
    mode: "zoom",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");
   const successRef = useRef(null);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.instName.trim())
      newErrors.instName = "Institution name is required";
    if (!formData.instType)
      newErrors.instType = "Please select institution type";
    if (!formData.contactName.trim())
      newErrors.contactName = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, "")))
      newErrors.phone = "Enter valid 10-digit phone";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await axios.post(`${API}/demo/book`, formData);
      setSubmitStatus(
        "Demo booked successfully! We'll confirm within 24 hours.",
      );
      setFormData({
        instName: "",
        instType: "",
        students: "",
        branches: "",
        contactName: "",
        designation: "",
        email: "",
        phone: "",
        city: "",
        date: "",
        time: "",
        mode: "zoom",
        message: "",
      });
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        "Something went wrong. Please try again.";
      setErrors({ submit: msg });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const faqs = [
    {
      question: "Is the demo free?",
      answer: "Yes, completely free with no obligation.",
    },
    {
      question: "How long does it take?",
      answer: "About 30 minutes, covering key features and a live Q&A.",
    },
    {
      question: "Can I customize the demo?",
      answer: "Yes, you can request specific modules during your demo.",
    },
  ];
 useEffect(() => {
  if (submitStatus && successRef.current) {
    const timer = setTimeout(() => {
      successRef.current.scrollIntoView({ 
        behavior: "smooth", 
        block: "center" // Changed from 'start' to 'center'
      });
    }, 150); // Slightly longer delay to ensure DOM paint

    return () => clearTimeout(timer);
  }
}, [submitStatus]);

  return (
    <div className="book-demo-page">
      {/* Single full-viewport section — hero left, form right */}
<section className="bookdemo-section">
  <div className="container">
    <div className="bookdemo-grid">

      {/* ── LEFT: Hero content ── */}
      <div className="hero-content">
        <h1>Experience EduAitor Live – Your 30-Min Demo Awaits</h1>
        <p>
          Discover how our all-in-one platform transforms institution
          management.
        </p>
        <ul className="benefits">
          <li><span>🎯</span> Personalized walkthrough</li>
          <li><span>🚀</span> Real modules demo</li>
          <li><span>💬</span> Live Q&A included</li>
          <li><span>🆓</span> Zero commitment</li>
        </ul>

        <div className="trust-panel">
          <h3>What Happens After You Book</h3>
          <div className="process-steps">
            <div className="step">
              <div className="step-number">1</div>
              <p>We review your details instantly</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <p>Confirm your slot within 24 hours</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <p>Join seamless Zoom/Meet demo</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── RIGHT: Form ── */}
      <div className="form-col" ref={successRef}>
        <form className="demo-form" onSubmit={handleSubmit}>
          {submitStatus ? (
            <div className="success-message">
              <h3>🎉 {submitStatus}</h3>
              <button
                type="button"
                onClick={() => setSubmitStatus("")}
                className="book-again"
              >
                Book Another Demo
              </button>
            </div>
          ) : (
            <>
              {errors.submit && (
                <div
                  style={{
                    color: "#ef4444",
                    background: "rgba(239,68,68,0.08)",
                    border: "1px solid rgba(239,68,68,0.2)",
                    borderRadius: 8,
                    padding: "10px 14px",
                    marginBottom: 16,
                    fontSize: 14,
                  }}
                >
                  {errors.submit}
                </div>
              )}

              <div className="form-section">
                <h4>🏫 Institution Details</h4>
                <div className="input-group">
                  <input
                    name="instName"
                    placeholder="Institution Name *"
                    value={formData.instName}
                    onChange={handleChange}
                    className={errors.instName ? "error" : ""}
                  />
                  {errors.instName && (
                    <span className="error-text">{errors.instName}</span>
                  )}
                </div>
                <div className="input-row">
                  <div className="input-group">
                    <select
                      name="instType"
                      value={formData.instType}
                      onChange={handleChange}
                    >
                      <option value="">Institution Type *</option>
                      <option value="school">School</option>
                      <option value="college">College</option>
                      <option value="coaching">Coaching Institute</option>
                      <option value="university">University</option>
                    </select>
                    {errors.instType && (
                      <span className="error-text">{errors.instType}</span>
                    )}
                  </div>
                  <div className="input-group">
                    <input
                      name="students"
                      placeholder="Number of Students"
                      value={formData.students}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="input-group">
                  <input
                    name="branches"
                    placeholder="Number of Branches"
                    value={formData.branches}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-section">
                <h4>👤 Contact Person</h4>
                <div className="input-row">
                  <div className="input-group">
                    <input
                      name="contactName"
                      placeholder="Full Name *"
                      value={formData.contactName}
                      onChange={handleChange}
                      className={errors.contactName ? "error" : ""}
                    />
                    {errors.contactName && (
                      <span className="error-text">{errors.contactName}</span>
                    )}
                  </div>
                  <div className="input-group">
                    <input
                      name="designation"
                      placeholder="Designation"
                      value={formData.designation}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="input-row">
                  <div className="input-group">
                    <input
                      name="email"
                      type="email"
                      placeholder="Official Email *"
                      value={formData.email}
                      onChange={handleChange}
                      className={errors.email ? "error" : ""}
                    />
                    {errors.email && (
                      <span className="error-text">{errors.email}</span>
                    )}
                  </div>
                  <div className="input-group">
                    <input
                      name="phone"
                      placeholder="Phone Number *"
                      value={formData.phone}
                      onChange={handleChange}
                      className={errors.phone ? "error" : ""}
                    />
                    {errors.phone && (
                      <span className="error-text">{errors.phone}</span>
                    )}
                  </div>
                </div>
                <div className="input-group">
                  <input
                    name="city"
                    placeholder="City / State"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-section">
                <h4>📅 Demo Preferences</h4>
                <div className="input-row">
                  <div className="input-group">
                    <input
                      name="date"
                      type="date"
                      value={formData.date}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="input-group">
                    <select
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                    >
                      <option value="">Preferred Time Slot</option>
                      <option value="10AM">10:00 AM – 11:00 AM</option>
                      <option value="2PM">2:00 PM – 3:00 PM</option>
                      <option value="4PM">4:00 PM – 5:00 PM</option>
                    </select>
                  </div>
                </div>
                <div className="input-group">
                  <select
                    name="mode"
                    value={formData.mode}
                    onChange={handleChange}
                  >
                    <option value="zoom">Zoom (Recommended)</option>
                    <option value="meet">Google Meet</option>
                    <option value="inperson">In-Person (Jaipur)</option>
                  </select>
                </div>
                <div className="input-group">
                  <textarea
                    name="message"
                    placeholder="Special Requirements (Optional)"
                    rows="3"
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner"></span> Booking…
                  </>
                ) : (
                  "Book Your Free Demo"
                )}
              </button>
            </>
          )}
        </form>
      </div>

    </div>
  </div>
</section>

      {/* Features */}
      <section className="features-section">
        <div className="container">
          <h2>What You'll Experience</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">👥</div>
              <h4>Student & Admission</h4>
              <p>Complete admission workflow automation</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h4>Fee Management</h4>
              <p>Automated billing & payment tracking</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h4>Parent App</h4>
              <p>Mobile app for parents & students</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📈</div>
              <h4>Analytics Dashboard</h4>
              <p>Real-time insights & reports</p>
            </div>
          </div>
        </div>
      </section>

      <Faqsection faqs={faqs} />

      <section className="trust-footer">
        <div className="container">
          <p>
            🔒 Your data is safe with us. We respect your privacy and never
            share your information.
          </p>
        </div>
      </section>
    </div>
  );
};

export default BookDemoPage;
