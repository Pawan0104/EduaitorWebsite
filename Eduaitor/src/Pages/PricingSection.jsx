import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import "../Pages/pricing.css";

const STUDENT_PRESETS = [100, 250, 500, 1000, 2000];

export default function PricingSection() {
  const [billing, setBilling] = useState("monthly");
  const [students, setStudents] = useState(250);
  const [customStudents, setCustomStudents] = useState("");
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoading(true);
        // Only fetch active plans for the public pricing page
        const res = await axios.get(`${API}/plans?active=true`);
        setPlans(res.data);
      } catch (err) {
        console.error("Error fetching plans:", err.message);
        setError("Failed to load plans. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const effectiveStudents =
    customStudents !== ""
      ? Math.max(1, parseInt(customStudents) || 1)
      : students;

  return (
    <div className="pricing-page">
      {/* ── Billing Toggle ── */}
      <div className="billing-toggle-wrap">
        <div className="billing-toggle">
          <button
            className={`billing-btn ${billing === "monthly" ? "active" : ""}`}
            onClick={() => setBilling("monthly")}
          >
            Monthly
          </button>
          <button
            className={`billing-btn ${billing === "yearly" ? "active" : ""}`}
            onClick={() => setBilling("yearly")}
          >
            Yearly
            {billing !== "yearly" && (
              <span className="save-badge">Save up to 20%</span>
            )}
          </button>
        </div>
      </div>

      {/* ── Student Estimator ── */}
      <div className="estimator-wrap">
        <div className="estimator">
          <p className="estimator-label">
            Estimate your bill — how many students?
            <strong>
              {effectiveStudents.toLocaleString("en-IN")} students
            </strong>
          </p>
          <div className="estimator-row">
            {STUDENT_PRESETS.map((n) => (
              <button
                key={n}
                className={`preset-btn ${
                  students === n && customStudents === "" ? "selected" : ""
                }`}
                onClick={() => {
                  setStudents(n);
                  setCustomStudents("");
                }}
              >
                {n >= 1000 ? `${n / 1000}k` : n}
              </button>
            ))}
            <input
              type="number"
              className="custom-student-input"
              placeholder="Custom"
              min="1"
              value={customStudents}
              onChange={(e) => {
                setCustomStudents(e.target.value);
                setStudents(0);
              }}
            />
          </div>
        </div>
      </div>

      {/* ── Plan Cards ── */}
      <section className="plans-section">
        {/* Loading state */}
        {loading && (
          <div className="plans-loading">
            <div className="plans-spinner" />
            <p>Loading plans…</p>
          </div>
        )}

        {/* Error state */}
        {!loading && error && (
          <div className="plans-error">
            <p>{error}</p>
          </div>
        )}

        {/* Render fetched plans */}
        {!loading &&
          !error &&
          plans.map((plan) => {
            const rate = plan.price[billing];
            const totalPerMonth = rate * effectiveStudents;
            const isInherited = (f) => f.toLowerCase().startsWith("everything in");

            return (
              <div
                key={plan._id}
                className={`plan-card ${plan.highlight ? "highlighted" : ""}`}
              >
                {plan.highlight && (
                  <div className="popular-tag">Most Popular</div>
                )}

                <h2>{plan.name}</h2>
                <p className="plan-desc">{plan.short}</p>

                {/* Price */}
                <div className="price-block">
                  <div className="price-row">
                    <span className="price-currency">₹</span>
                    <span className="price-amount">{rate}</span>
                    <span className="price-unit">/ student / mo</span>
                  </div>
                  <p className="price-total">
                    ₹{totalPerMonth.toLocaleString("en-IN")} / month
                    {billing === "yearly" && (
                      <span className="yearly-note"> · billed yearly</span>
                    )}
                  </p>
                </div>

                <NavLink to="/bookademo">
                  <button
                    className={`demo-btn ${
                      plan.highlight ? "demo-btn-primary" : ""
                    }`}
                  >
                    {plan.CTA || "Request Demo"}
                  </button>
                </NavLink>

                <div className="feature-box">
                  <h4>What's included</h4>
                  <ul>
                    {plan.features.map((f, i) => (
                      <li
                        key={i}
                        className={isInherited(f) ? "feature-inherited" : ""}
                      >
                        <span className="feature-check">
                          <svg
                            width="10"
                            height="10"
                            viewBox="0 0 10 10"
                            fill="none"
                          >
                            <polyline
                              points="2,5 4.5,7.5 8,3"
                              stroke={isInherited(f) ? "#9ca3af" : "#7b4dc4"}
                              strokeWidth="1.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
      </section>

      <p className="pricing-footnote">
        Prices are per student per month. Taxes applicable as per government
        norms.{" "}
        <NavLink to="/bookademo">Contact us</NavLink> for large institutions or
        custom requirements.
      </p>
    </div>
  );
}