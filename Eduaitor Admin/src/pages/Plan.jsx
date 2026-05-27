// admin/pages/Plan.jsx
import { useState, useEffect, useRef } from "react";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

/* ══════════════════════════════════════════════════════════
   SHARED STYLES (CSS-variable-aware, matches index.css)
══════════════════════════════════════════════════════════ */
const S = {
  page: {
    padding: "1.5rem",
    maxWidth: 1160,
    margin: "0 auto",
    fontFamily: "'Poppins', sans-serif",
  },
  card: {
    background: "#fff",
    border: "1px solid var(--border-md, rgba(147,51,234,0.2))",
    borderRadius: 16,
    padding: "1.25rem 1.5rem",
    boxShadow: "0 2px 12px rgba(147,51,234,0.06)",
  },
  btn: (variant = "ghost") => ({
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    padding: variant === "icon" ? "7px" : "9px 18px",
    borderRadius: 10,
    border: "none",
    cursor: "pointer",
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 600,
    fontSize: 13,
    transition: "all 0.18s ease",
    ...(variant === "primary" && {
      background: "var(--purple-600, #9333ea)",
      color: "#fff",
    }),
    ...(variant === "danger" && {
      background: "#fee2e2",
      color: "#dc2626",
    }),
    ...(variant === "soft" && {
      background: "var(--purple-100, #f3e8ff)",
      color: "var(--purple-700, #7e22ce)",
    }),
    ...(variant === "ghost" && {
      background: "#f3f4f6",
      color: "#374151",
    }),
    ...(variant === "icon" && {
      background: "transparent",
      color: "#6b7280",
      border: "1px solid #e5e7eb",
    }),
  }),
  input: {
    width: "100%",
    padding: "9px 12px",
    borderRadius: 10,
    border: "1.5px solid var(--border-md, rgba(147,51,234,0.2))",
    fontFamily: "'Poppins', sans-serif",
    fontSize: 13,
    color: "#111827",
    background: "#fff",
    outline: "none",
    transition: "border-color 0.18s",
    boxSizing: "border-box",
  },
  label: {
    display: "block",
    fontSize: 12,
    fontWeight: 600,
    color: "#6b7280",
    marginBottom: 5,
    textTransform: "uppercase",
    letterSpacing: "0.04em",
  },
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(10,0,30,0.45)",
    backdropFilter: "blur(4px)",
    zIndex: 200,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "1rem",
  },
};

/* ══════════════════════════════════════════════════════════
   TOAST
══════════════════════════════════════════════════════════ */
function Toast({ msg, type, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 3000);
    return () => clearTimeout(t);
  }, []);
  return (
    <div
      style={{
        position: "fixed",
        bottom: 28,
        right: 28,
        zIndex: 999,
        background: type === "error" ? "#dc2626" : "var(--purple-700, #7e22ce)",
        color: "#fff",
        padding: "12px 20px",
        borderRadius: 12,
        fontFamily: "'Poppins', sans-serif",
        fontSize: 13,
        fontWeight: 600,
        boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
        display: "flex",
        alignItems: "center",
        gap: 8,
        animation: "slideUp 0.25s ease",
      }}
    >
      <span>{type === "error" ? "✕" : "✓"}</span> {msg}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   PLAN CARD (admin view)
══════════════════════════════════════════════════════════ */
function PlanCard({ plan, onEdit, onDelete, onToggle }) {
  return (
    <div
      style={{
        ...S.card,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: 14,
        opacity: plan.isActive ? 1 : 0.65,
        transition: "opacity 0.2s",
        borderColor: plan.highlight
          ? "var(--purple-500, #a855f7)"
          : "var(--border-md, rgba(147,51,234,0.2))",
        borderWidth: plan.highlight ? 2 : 1,
      }}
    >
      {/* Badges */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {plan.highlight && (
          <span
            style={{
              background: "var(--purple-100,#f3e8ff)",
              color: "var(--purple-700,#7e22ce)",
              padding: "2px 10px",
              borderRadius: 20,
              fontSize: 11,
              fontWeight: 700,
            }}
          >
            ★ Most Popular
          </span>
        )}
        <span
          style={{
            background: plan.isActive ? "#dcfce7" : "#f3f4f6",
            color: plan.isActive ? "#15803d" : "#6b7280",
            padding: "2px 10px",
            borderRadius: 20,
            fontSize: 11,
            fontWeight: 700,
          }}
        >
          {plan.isActive ? "Active" : "Inactive"}
        </span>
      </div>

      {/* Name + desc */}
      <div>
        <h3
          style={{
            margin: 0,
            fontSize: 18,
            fontWeight: 800,
            color: "#111827",
          }}
        >
          {plan.name}
        </h3>
        <p
          style={{
            margin: "4px 0 0",
            fontSize: 12,
            color: "#6b7280",
            lineHeight: 1.5,
          }}
        >
          {plan.short}
        </p>
      </div>

      {/* Pricing */}
      <div
        style={{
          background: "var(--purple-50,#faf5ff)",
          borderRadius: 10,
          padding: "10px 14px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 8,
        }}
      >
        <div>
          <div style={{ fontSize: 11, color: "#9ca3af", fontWeight: 600 }}>
            MONTHLY
          </div>
          <div
            style={{
              fontSize: 20,
              fontWeight: 800,
              color: "var(--purple-700,#7e22ce)",
            }}
          >
            ₹{plan.price?.monthly}
            <span
              style={{ fontSize: 11, fontWeight: 500, color: "#9ca3af" }}
            >
              /student
            </span>
          </div>
        </div>
        <div>
          <div style={{ fontSize: 11, color: "#9ca3af", fontWeight: 600 }}>
            YEARLY
          </div>
          <div
            style={{
              fontSize: 20,
              fontWeight: 800,
              color: "var(--purple-700,#7e22ce)",
            }}
          >
            ₹{plan.price?.yearly}
            <span
              style={{ fontSize: 11, fontWeight: 500, color: "#9ca3af" }}
            >
              /student
            </span>
          </div>
        </div>
      </div>

      {/* Features preview */}
      <div>
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: "#9ca3af",
            textTransform: "uppercase",
            letterSpacing: "0.04em",
            marginBottom: 6,
          }}
        >
          {plan.features?.length ?? 0} Features
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {(plan.features ?? []).slice(0, 4).map((f, i) => (
            <div
              key={i}
              style={{
                fontSize: 12,
                color: "#374151",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <span style={{ color: "var(--purple-500,#a855f7)", fontSize: 10 }}>
                ✓
              </span>
              {f}
            </div>
          ))}
          {(plan.features?.length ?? 0) > 4 && (
            <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 2 }}>
              +{plan.features.length - 4} more…
            </div>
          )}
        </div>
      </div>

      {/* CTA label */}
      <div
        style={{
          fontSize: 11,
          color: "#9ca3af",
          borderTop: "1px solid #f3f4f6",
          paddingTop: 10,
        }}
      >
        CTA Button:{" "}
        <strong style={{ color: "#374151" }}>{plan.CTA || "Request Demo"}</strong>
        &nbsp;·&nbsp; Order: <strong style={{ color: "#374151" }}>{plan.order ?? 0}</strong>
      </div>

      {/* Actions */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button style={S.btn("soft")} onClick={() => onEdit(plan)}>
          ✎ Edit
        </button>
        <button
          style={{
            ...S.btn("ghost"),
            background: plan.isActive ? "#fef9c3" : "#dcfce7",
            color: plan.isActive ? "#854d0e" : "#15803d",
          }}
          onClick={() => onToggle(plan)}
        >
          {plan.isActive ? "⏸ Deactivate" : "▶ Activate"}
        </button>
        <button
          style={{ ...S.btn("danger"), marginLeft: "auto" }}
          onClick={() => onDelete(plan)}
        >
          🗑 Delete
        </button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   PLAN MODAL  (Create / Edit)
══════════════════════════════════════════════════════════ */
const EMPTY_FORM = {
  name: "",
  short: "",
  CTA: "Request Demo",
  price: { monthly: "", yearly: "" },
  highlight: false,
  isActive: true,
  order: 0,
  features: [""],
};

function PlanModal({ plan, onClose, onSave, loading }) {
  const [form, setForm] = useState(
    plan
      ? {
          ...plan,
          price: { ...plan.price },
          features: plan.features?.length ? [...plan.features] : [""],
        }
      : EMPTY_FORM
  );
  const isEdit = Boolean(plan);
  const featureRefs = useRef([]);

  const setField = (key, val) => setForm((p) => ({ ...p, [key]: val }));
  const setPrice = (key, val) =>
    setForm((p) => ({ ...p, price: { ...p.price, [key]: val } }));

  /* Features helpers */
  const addFeature = () =>
    setForm((p) => ({ ...p, features: [...p.features, ""] }));
  const removeFeature = (i) =>
    setForm((p) => ({
      ...p,
      features: p.features.filter((_, idx) => idx !== i),
    }));
  const editFeature = (i, val) =>
    setForm((p) => {
      const f = [...p.features];
      f[i] = val;
      return { ...p, features: f };
    });

  const handleSubmit = () => {
    if (!form.name.trim() || !form.short.trim()) return;
    if (!form.price.monthly || !form.price.yearly) return;
    const cleaned = {
      ...form,
      price: {
        monthly: Number(form.price.monthly),
        yearly: Number(form.price.yearly),
      },
      features: form.features.filter((f) => f.trim() !== ""),
      order: Number(form.order) || 0,
    };
    onSave(cleaned);
  };

  /* Close on backdrop click */
  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div style={S.overlay} onClick={handleBackdrop}>
      <div
        style={{
          background: "#fff",
          borderRadius: 20,
          width: "100%",
          maxWidth: 580,
          maxHeight: "90vh",
          overflowY: "auto",
          boxShadow: "0 24px 80px rgba(0,0,0,0.22)",
          animation: "slideUp 0.22s ease",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "1.5rem 1.75rem 1rem",
            borderBottom: "1px solid #f3f4f6",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "sticky",
            top: 0,
            background: "#fff",
            zIndex: 1,
            borderRadius: "20px 20px 0 0",
          }}
        >
          <div>
            <h2
              style={{
                margin: 0,
                fontSize: 18,
                fontWeight: 800,
                color: "#111827",
              }}
            >
              {isEdit ? "Edit Plan" : "New Plan"}
            </h2>
            <p style={{ margin: "2px 0 0", fontSize: 12, color: "#9ca3af" }}>
              {isEdit
                ? "Update the plan details below"
                : "Fill in the details to create a new pricing plan"}
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              ...S.btn("icon"),
              fontSize: 18,
              width: 34,
              height: 34,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div
          style={{
            padding: "1.5rem 1.75rem",
            display: "flex",
            flexDirection: "column",
            gap: 18,
          }}
        >
          {/* Name */}
          <div>
            <label style={S.label}>Plan Name *</label>
            <input
              style={S.input}
              placeholder="e.g. Premium"
              value={form.name}
              onChange={(e) => setField("name", e.target.value)}
            />
          </div>

          {/* Short desc */}
          <div>
            <label style={S.label}>Short Description *</label>
            <textarea
              style={{ ...S.input, resize: "vertical", minHeight: 72 }}
              placeholder="e.g. Advanced integrations and multi-branch control."
              value={form.short}
              onChange={(e) => setField("short", e.target.value)}
            />
          </div>

          {/* CTA */}
          <div>
            <label style={S.label}>CTA Button Text</label>
            <input
              style={S.input}
              placeholder="Request Demo"
              value={form.CTA}
              onChange={(e) => setField("CTA", e.target.value)}
            />
          </div>

          {/* Pricing */}
          <div>
            <label style={S.label}>Pricing (₹ per student / month) *</label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <div>
                <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 4 }}>
                  Monthly rate
                </div>
                <input
                  type="number"
                  min="0"
                  style={S.input}
                  placeholder="e.g. 15"
                  value={form.price.monthly}
                  onChange={(e) => setPrice("monthly", e.target.value)}
                />
              </div>
              <div>
                <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 4 }}>
                  Yearly rate
                </div>
                <input
                  type="number"
                  min="0"
                  style={S.input}
                  placeholder="e.g. 12"
                  value={form.price.yearly}
                  onChange={(e) => setPrice("yearly", e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Features */}
          <div>
            <label style={S.label}>Features</label>
            <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
              {form.features.map((f, i) => (
                <div key={i} style={{ display: "flex", gap: 6 }}>
                  <input
                    ref={(el) => (featureRefs.current[i] = el)}
                    style={{ ...S.input, flex: 1 }}
                    placeholder={`Feature ${i + 1}`}
                    value={f}
                    onChange={(e) => editFeature(i, e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addFeature();
                        setTimeout(
                          () => featureRefs.current[i + 1]?.focus(),
                          50
                        );
                      }
                    }}
                  />
                  <button
                    style={{
                      ...S.btn("icon"),
                      color: "#dc2626",
                      borderColor: "#fca5a5",
                    }}
                    onClick={() => removeFeature(i)}
                    title="Remove"
                  >
                    ×
                  </button>
                </div>
              ))}
              <button
                style={{
                  ...S.btn("ghost"),
                  alignSelf: "flex-start",
                  fontSize: 12,
                }}
                onClick={addFeature}
              >
                + Add Feature
              </button>
            </div>
          </div>

          {/* Toggles row */}
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            {[
              {
                key: "highlight",
                label: "Most Popular",
                hint: "Shows purple badge on frontend",
              },
              {
                key: "isActive",
                label: "Active",
                hint: "Visible on pricing page",
              },
            ].map(({ key, label, hint }) => (
              <label
                key={key}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 22,
                    borderRadius: 11,
                    background: form[key]
                      ? "var(--purple-600,#9333ea)"
                      : "#d1d5db",
                    position: "relative",
                    transition: "background 0.2s",
                  }}
                  onClick={() => setField(key, !form[key])}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: 3,
                      left: form[key] ? 21 : 3,
                      width: 16,
                      height: 16,
                      borderRadius: "50%",
                      background: "#fff",
                      transition: "left 0.2s",
                      boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
                    }}
                  />
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>
                    {label}
                  </div>
                  <div style={{ fontSize: 11, color: "#9ca3af" }}>{hint}</div>
                </div>
              </label>
            ))}
          </div>

          {/* Order */}
          <div>
            <label style={S.label}>Display Order</label>
            <input
              type="number"
              min="0"
              style={{ ...S.input, maxWidth: 120 }}
              value={form.order}
              onChange={(e) => setField("order", e.target.value)}
            />
            <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 4 }}>
              Lower number = shown first (0, 1, 2 …)
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            padding: "1rem 1.75rem 1.5rem",
            display: "flex",
            justifyContent: "flex-end",
            gap: 10,
            borderTop: "1px solid #f3f4f6",
            position: "sticky",
            bottom: 0,
            background: "#fff",
            borderRadius: "0 0 20px 20px",
          }}
        >
          <button style={S.btn("ghost")} onClick={onClose} disabled={loading}>
            Cancel
          </button>
          <button
            style={{
              ...S.btn("primary"),
              opacity: loading ? 0.7 : 1,
              minWidth: 110,
            }}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Saving…" : isEdit ? "Save Changes" : "Create Plan"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   DELETE CONFIRM
══════════════════════════════════════════════════════════ */
function DeleteConfirm({ plan, onClose, onConfirm, loading }) {
  return (
    <div style={S.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div
        style={{
          background: "#fff",
          borderRadius: 18,
          padding: "2rem",
          maxWidth: 420,
          width: "100%",
          textAlign: "center",
          boxShadow: "0 24px 80px rgba(0,0,0,0.2)",
          animation: "slideUp 0.2s ease",
        }}
      >
        <div style={{ fontSize: 40, marginBottom: 12 }}>🗑</div>
        <h3 style={{ margin: 0, fontSize: 17, fontWeight: 800, color: "#111827" }}>
          Delete "{plan.name}"?
        </h3>
        <p style={{ fontSize: 13, color: "#6b7280", margin: "8px 0 24px" }}>
          This will permanently remove the plan from the database and hide it
          from the pricing page.
        </p>
        <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
          <button style={S.btn("ghost")} onClick={onClose} disabled={loading}>
            Cancel
          </button>
          <button
            style={{
              ...S.btn("danger"),
              background: "#dc2626",
              color: "#fff",
              opacity: loading ? 0.7 : 1,
            }}
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? "Deleting…" : "Yes, Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════════════════ */
export default function Plan() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [modal, setModal] = useState(null); // null | "create" | plan_obj
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toast, setToast] = useState(null);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  /* ── Fetch ─────────────────────────────────────── */
  const fetchPlans = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API}/plans`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      setPlans(data);
    } catch {
      showToast("Failed to load plans", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const showToast = (msg, type = "success") => setToast({ msg, type });

  /* ── CRUD ──────────────────────────────────────── */
  const handleSave = async (form) => {
    setSaving(true);
    try {
      const isEdit = modal && modal._id;
      const url = isEdit ? `${API}/plans/${modal._id}` : `${API}/plans`;
      const method = isEdit ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      await fetchPlans();
      setModal(null);
      showToast(isEdit ? "Plan updated!" : "Plan created!");
    } catch {
      showToast("Failed to save plan", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const res = await fetch(`${API}/plans/${deleteTarget._id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error();
      await fetchPlans();
      setDeleteTarget(null);
      showToast("Plan deleted");
    } catch {
      showToast("Failed to delete plan", "error");
    } finally {
      setDeleting(false);
    }
  };

  const handleToggle = async (plan) => {
    try {
      const res = await fetch(`${API}/plans/${plan._id}/toggle`, {
        method: "PATCH",
      });
      if (!res.ok) throw new Error();
      await fetchPlans();
      showToast(`Plan ${plan.isActive ? "deactivated" : "activated"}`);
    } catch {
      showToast("Failed to update plan", "error");
    }
  };

  /* ── Filtered list ─────────────────────────────── */
  const displayed = plans.filter((p) => {
    if (filter === "active" && !p.isActive) return false;
    if (filter === "inactive" && p.isActive) return false;
    if (search && !p.name.toLowerCase().includes(search.toLowerCase()))
      return false;
    return true;
  });

  const activeCount = plans.filter((p) => p.isActive).length;

  return (
    <div style={S.page}>
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        input:focus, textarea:focus, select:focus {
          border-color: var(--purple-500, #a855f7) !important;
          box-shadow: 0 0 0 3px rgba(168,85,247,0.12);
        }
        button:hover { opacity: 0.88; }
        @media (max-width: 600px) {
          .plan-grid { grid-template-columns: 1fr !important; }
          .stats-row { grid-template-columns: repeat(2, 1fr) !important; }
          .header-row { flex-direction: column !important; align-items: flex-start !important; }
          .modal-price-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ── Page header ────────────────────────────── */}
      <div
        className="header-row"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 12,
          marginBottom: 24,
          flexWrap: "wrap",
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: 22,
              fontWeight: 900,
            }}
          >
            Plans
          </h1>
          <p style={{ margin: "4px 0 0", fontSize: 13, color: "#9ca3af" }}>
            Manage pricing plans shown on the website
          </p>
        </div>
        <button style={S.btn("primary")} onClick={() => setModal("create")}>
          <span style={{ fontSize: 18, lineHeight: 1 }}>+</span> New Plan
        </button>
      </div>

      {/* ── Stats ──────────────────────────────────── */}
      <div
        className="stats-row"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 14,
          marginBottom: 24,
        }}
      >
        {[
          { label: "Total Plans", value: plans.length, color: "var(--purple-700,#7e22ce)" },
          { label: "Active", value: activeCount, color: "#15803d" },
          { label: "Inactive", value: plans.length - activeCount, color: "#9ca3af" },
        ].map((s) => (
          <div key={s.label} style={S.card}>
            <div style={{ fontSize: 26, fontWeight: 900, color: s.color }}>
              {s.value}
            </div>
            <div style={{ fontSize: 12, color: "#9ca3af", fontWeight: 600, marginTop: 2 }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* ── Filters + search ───────────────────────── */}
      <div
        style={{
          display: "flex",
          gap: 8,
          flexWrap: "wrap",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        {["all", "active", "inactive"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: "7px 16px",
              borderRadius: 8,
              border: `1.5px solid ${filter === f ? "var(--purple-400,#c084fc)" : "#e5e7eb"}`,
              background: filter === f ? "var(--purple-50,#faf5ff)" : "#fff",
              color: filter === f ? "var(--purple-700,#7e22ce)" : "#6b7280",
              cursor: "pointer",
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 600,
              fontSize: 13,
              textTransform: "capitalize",
            }}
          >
            {f}
          </button>
        ))}
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search plans…"
          style={{ ...S.input, maxWidth: 220, width: "auto", flexGrow: 1 }}
        />
      </div>

      {/* ── Grid ───────────────────────────────────── */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "4rem 0", color: "#9ca3af" }}>
          Loading plans…
        </div>
      ) : displayed.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "4rem 0",
            color: "#9ca3af",
            border: "1.5px dashed rgba(147,51,234,0.2)",
            borderRadius: 16,
          }}
        >
          <div style={{ fontSize: 36, marginBottom: 8 }}>📋</div>
          <div style={{ fontWeight: 700, fontSize: 14 }}>No plans found</div>
          <div style={{ fontSize: 12, marginTop: 4 }}>
            {search
              ? "Try a different search term"
              : 'Click "+ New Plan" to create your first plan'}
          </div>
        </div>
      ) : (
        <div
          className="plan-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: 16,
          }}
        >
          {displayed.map((p) => (
            <PlanCard
              key={p._id}
              plan={p}
              onEdit={(plan) => setModal(plan)}
              onDelete={(plan) => setDeleteTarget(plan)}
              onToggle={handleToggle}
            />
          ))}
        </div>
      )}

      {/* ── Modals ─────────────────────────────────── */}
      {modal && (
        <PlanModal
          plan={modal === "create" ? null : modal}
          onClose={() => setModal(null)}
          onSave={handleSave}
          loading={saving}
        />
      )}
      {deleteTarget && (
        <DeleteConfirm
          plan={deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onConfirm={handleDelete}
          loading={deleting}
        />
      )}
      {toast && (
        <Toast msg={toast.msg} type={toast.type} onDone={() => setToast(null)} />
      )}
    </div>
  );
}