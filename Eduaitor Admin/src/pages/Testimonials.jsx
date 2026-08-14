import { useState, useEffect, useRef, useCallback } from "react";
import { API_URL, apiFetch } from "../lib/api";

/* ─────────────────────────────────────────────────────────────────────────────
   STYLES  — all classes used in JSX are defined here
───────────────────────────────────────────────────────────────────────────── */
const STYLES = `
  * { box-sizing: border-box; }

  /* page shell */
  .lm-page    { font-family: 'DM Sans', system-ui, sans-serif; padding: 28px 32px; min-height: 100vh; background: var(--bg-base); }
  .lm-heading { font-family: 'DM Sans', system-ui, sans-serif; }

  /* two-column grid */
  .institute-grid {
    display: grid;
    grid-template-columns: 330px 1fr;
    gap: 22px;
    align-items: start;
  }
  @media (max-width: 900px) {
    .institute-grid { grid-template-columns: 1fr; }
    .lm-page { padding: 16px; }
  }

  /* inputs */
  .lm-input:focus {
    border-color: var(--accent) !important;
    box-shadow: 0 0 0 3px var(--accent-soft);
    outline: none;
  }

  /* drop zone */
  .lm-drop:hover { border-color: var(--accent) !important; background: var(--accent-soft) !important; }

  /* list rows */
  .lm-row { transition: background 0.14s; }
  .lm-row:hover { background: var(--bg-hover) !important; }

  /* ghost button */
  .lm-btn-ghost:hover { border-color: var(--accent-border) !important; color: var(--accent-text) !important; }

  /* icon buttons */
  .lm-btn-icon:hover { background: var(--bg-elevated) !important; }
  .lm-btn-di:hover   { background: var(--danger-soft) !important; border-color: var(--danger-border) !important; }

  /* badges */
  .lm-badge-on  { background: rgba(34,197,94,0.10); color: #4ade80; border: 1px solid rgba(34,197,94,0.22); }
  .lm-badge-off { background: var(--danger-soft);   color: var(--danger-text); border: 1px solid var(--danger-border); }

  /* toggle */
  .lm-toggle-thumb { transition: left 0.18s cubic-bezier(.4,0,.2,1); }
  .lm-toggle-bg    { transition: background 0.18s; }

  /* animations */
  @keyframes lm-fi { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
  @keyframes lm-si { from{opacity:0;transform:scale(0.95)}     to{opacity:1;transform:scale(1)} }
  @keyframes lm-sp { to{transform:rotate(360deg)} }
  @keyframes lm-ti { from{opacity:0;transform:translateX(20px)} to{opacity:1;transform:translateX(0)} }

  .lm-anim-fi { animation: lm-fi 0.22s ease both; }
  .lm-anim-si { animation: lm-si 0.18s ease both; }
  .lm-spinner { animation: lm-sp 0.7s linear infinite; }
  .lm-toast   { animation: lm-ti 0.22s ease both; }

  /* image card overlay */
  .lm-ic     { position: relative; overflow: hidden; }
  .lm-ic-ov  { position:absolute;inset:0;background:rgba(0,0,0,0.52);display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity 0.16s; }
  .lm-ic:hover .lm-ic-ov { opacity: 1; }

  /* modal backdrop */
  .lm-backdrop { position:fixed;inset:0;background:rgba(0,0,0,0.65);z-index:900;backdrop-filter:blur(5px);display:flex;align-items:center;justify-content:center; }

  /* list scrollbar */
  .lm-list::-webkit-scrollbar       { width: 4px; }
  .lm-list::-webkit-scrollbar-thumb { background: var(--border); border-radius: 4px; }

  /* star rating hover */
  .lm-star { cursor: pointer; font-size: 20px; transition: color 0.12s; }
  .lm-star:hover { color: #fbbf24 !important; }
`;

/* ─────────────────────────────────────────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────────────────────────────────────────── */
// Defined OUTSIDE component so useEffect never gets a stale reference
const EMPTY_FORM = { name: "", role: "", quote: "", tag: "", rating: 5, isActive: true };

/* ─────────────────────────────────────────────────────────────────────────────
   SPINNER
───────────────────────────────────────────────────────────────────────────── */
const Spin = ({ s = 15, c = "currentColor" }) => (
  <svg className="lm-spinner" width={s} height={s} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke={c} strokeWidth="3" opacity=".25" />
    <path d="M12 2a10 10 0 0110 10" stroke={c} strokeWidth="3" strokeLinecap="round" />
  </svg>
);

/* ─────────────────────────────────────────────────────────────────────────────
   TOAST SYSTEM
───────────────────────────────────────────────────────────────────────────── */
let _push = null;
const toast = (msg, type = "success") => {
  if (!_push) return;
  const id = Date.now();
  _push(p => [...p, { id, msg, type }]);
  setTimeout(() => _push(p => p.filter(t => t.id !== id)), 3200);
};

function Toasts() {
  const [list, set] = useState([]);
  _push = set;
  return (
    <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 9999, display: "flex", flexDirection: "column", gap: 8 }}>
      {list.map(t => (
        <div key={t.id} className="lm-toast" style={{
          padding: "10px 16px", borderRadius: 10, fontSize: 13, fontWeight: 600,
          boxShadow: "0 8px 28px rgba(0,0,0,0.4)", maxWidth: 300,
          display: "flex", alignItems: "center", gap: 8,
          background: t.type === "error" ? "var(--danger-soft)" : "var(--accent-soft)",
          border: `1px solid ${t.type === "error" ? "var(--danger-border)" : "var(--accent-border)"}`,
          color: t.type === "error" ? "var(--danger-text)" : "var(--accent-text)",
        }}>
          <span style={{ fontSize: 15 }}>{t.type === "error" ? "❌" : "✅"}</span>
          {t.msg}
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   SHARED COMPONENTS
───────────────────────────────────────────────────────────────────────────── */

/* Badge */
const Badge = ({ on }) => (
  <span className={on ? "lm-badge-on" : "lm-badge-off"} style={{
    display: "inline-flex", alignItems: "center", gap: 5,
    fontSize: 11, fontWeight: 700, letterSpacing: "0.04em",
    padding: "3px 9px", borderRadius: 20,
  }}>
    <span style={{ width: 5, height: 5, borderRadius: "50%", background: "currentColor" }} />
    {on ? "Active" : "Hidden"}
  </span>
);

/* Toggle switch */
const Toggle = ({ v, on }) => (
  <button onClick={on} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, lineHeight: 1 }}>
    <div className="lm-toggle-bg" style={{ width: 38, height: 22, borderRadius: 11, background: v ? "var(--accent)" : "var(--border)", position: "relative" }}>
      <div className="lm-toggle-thumb" style={{ width: 16, height: 16, borderRadius: "50%", background: "#fff", position: "absolute", top: 3, left: v ? 19 : 3, boxShadow: "0 1px 4px rgba(0,0,0,0.3)" }} />
    </div>
  </button>
);

/* Icon button */
const IBtn = ({ onClick, title, danger, children }) => (
  <button
    onClick={onClick}
    title={title}
    className={`lm-btn-icon${danger ? " lm-btn-di" : ""}`}
    style={{
      background: "var(--bg-base)",
      border: `1px solid ${danger ? "var(--danger-border)" : "var(--border)"}`,
      color: danger ? "var(--danger-text)" : "var(--text-sec)",
      borderRadius: 8, width: 30, height: 30,
      display: "flex", alignItems: "center", justifyContent: "center",
      cursor: "pointer", transition: "all 0.14s",
    }}
  >
    {children}
  </button>
);

/* Field label wrapper */
const Fld = ({ label, req, note, children }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
    <label style={{ fontSize: 11, fontWeight: 700, color: "var(--text-muted)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
      {label}
      {req && <span style={{ color: "var(--danger-text)" }}> *</span>}
      {note && <span style={{ color: "var(--text-muted)", fontWeight: 400, textTransform: "none", letterSpacing: 0, marginLeft: 5 }}>{note}</span>}
    </label>
    {children}
  </div>
);

/* Input style */
const IS = {
  width: "100%", padding: "9px 13px", borderRadius: 9,
  background: "var(--bg-base)", border: "1px solid var(--border)",
  color: "var(--text-primary)", fontSize: 13, fontFamily: "inherit",
  transition: "border-color 0.15s, box-shadow 0.15s",
};

/* ─────────────────────────────────────────────────────────────────────────────
   DROP ZONE
───────────────────────────────────────────────────────────────────────────── */
function DropZone({ preview, onChange }) {
  const ref = useRef();
  const [drag, setDrag] = useState(false);

  const handle = f => {
    if (!f?.type.startsWith("image/")) { toast("Only image files allowed", "error"); return; }
    if (f.size > 5 * 1024 * 1024)      { toast("Max file size is 5 MB", "error"); return; }
    onChange(f, URL.createObjectURL(f));
  };

  return (
    <div
      className="lm-drop lm-ic"
      onClick={() => ref.current?.click()}
      onDragOver={e => { e.preventDefault(); setDrag(true); }}
      onDragLeave={() => setDrag(false)}
      onDrop={e => { e.preventDefault(); setDrag(false); handle(e.dataTransfer.files[0]); }}
      style={{
        border: `2px dashed ${drag ? "var(--accent)" : "var(--border)"}`,
        borderRadius: 12,
        background: drag ? "var(--accent-soft)" : "var(--bg-base)",
        cursor: "pointer", transition: "all 0.15s",
        minHeight: 120, display: "flex", alignItems: "center",
        justifyContent: "center", flexDirection: "column", gap: 8, overflow: "hidden",
      }}
    >
      {preview ? (
        <>
          <img src={preview} alt="" style={{ width: 70, height: 70, borderRadius: "50%", objectFit: "cover", border: "2px solid var(--border)" }} />
          <div className="lm-ic-ov">
            <span style={{ color: "#fff", fontSize: 11, fontWeight: 700, letterSpacing: "0.05em", background: "rgba(0,0,0,0.45)", padding: "4px 11px", borderRadius: 6 }}>
              CHANGE PHOTO
            </span>
          </div>
        </>
      ) : (
        <>
          <div style={{ width: 44, height: 44, borderRadius: "50%", background: "var(--bg-elevated)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.6">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <div style={{ textAlign: "center" }}>
            <p style={{ margin: 0, fontSize: 13, color: "var(--text-sec)", fontWeight: 500 }}>
              Drop photo or <span style={{ color: "var(--accent-text)" }}>browse</span>
            </p>
            <p style={{ margin: "3px 0 0", fontSize: 11, color: "var(--text-muted)" }}>PNG · JPG · WebP — max 5 MB</p>
          </div>
        </>
      )}
      <input ref={ref} type="file" accept="image/*" style={{ display: "none" }} onChange={e => handle(e.target.files[0])} />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   STAR RATING
───────────────────────────────────────────────────────────────────────────── */
function StarRating({ value, onChange }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div style={{ display: "flex", gap: 3 }}>
      {[1, 2, 3, 4, 5].map(i => (
        <span
          key={i}
          className="lm-star"
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => onChange(i)}
          style={{ color: i <= (hovered || value) ? "#fbbf24" : "var(--text-muted)" }}
        >
          ★
        </span>
      ))}
      <span style={{ fontSize: 12, color: "var(--text-muted)", marginLeft: 6, alignSelf: "center" }}>
        {value}/5
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   VIEW MODAL
───────────────────────────────────────────────────────────────────────────── */
function ViewModal({ testimonial, close }) {
  if (!testimonial) return null;

  // FIX: normalise image field — backend may return either key
  const imgUrl = testimonial.imageUrl || testimonial.image || "";

  return (
    <div className="lm-backdrop" onClick={close}>
      <div className="lm-anim-si" onClick={e => e.stopPropagation()} style={{
        background: "var(--bg-surface)", border: "1px solid var(--border)",
        borderRadius: 18, width: "100%", maxWidth: 440,
        margin: 16, boxShadow: "var(--shadow)", overflow: "hidden",
      }}>
        {/* header */}
        <div style={{ padding: "15px 20px", borderBottom: "1px solid var(--border-sub)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span className="lm-heading" style={{ fontWeight: 800, fontSize: 15, color: "var(--text-primary)" }}>
            Testimonial Details
          </span>
          <button onClick={close} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", padding: 4, fontSize: 16 }}>✕</button>
        </div>

        {/* avatar */}
        <div style={{ background: "var(--bg-base)", padding: "24px", display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
          {imgUrl ? (
            <img src={imgUrl} alt={testimonial.name} style={{ width: 70, height: 70, borderRadius: "50%", objectFit: "cover", border: "2px solid var(--border)" }} />
          ) : (
            <div style={{ width: 70, height: 70, borderRadius: "50%", background: "var(--accent-soft)", border: "1px solid var(--accent-border)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 26, color: "var(--accent-text)" }}>
                {testimonial.name?.[0]?.toUpperCase() || "?"}
              </span>
            </div>
          )}
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)" }}>{testimonial.name}</div>
            <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>{testimonial.role || "—"}</div>
            <div style={{ fontSize: 13, color: "#fbbf24", marginTop: 4 }}>
              {"★".repeat(Number(testimonial.rating || 0))}
              {"☆".repeat(5 - Number(testimonial.rating || 0))}
            </div>
          </div>
        </div>

        {/* content */}
        <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: 12 }}>
          {/* quote */}
          <div style={{ fontSize: 13, color: "var(--text-sec)", lineHeight: 1.7, fontStyle: "italic", background: "var(--bg-elevated)", padding: "12px 14px", borderRadius: 10, borderLeft: "3px solid var(--accent)" }}>
            "{testimonial.quote}"
          </div>

          {/* tag + status */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            {testimonial.tag ? (
              <span style={{ fontSize: 11, padding: "4px 10px", borderRadius: 20, background: "var(--accent-soft)", color: "var(--accent-text)", border: "1px solid var(--accent-border)" }}>
                {testimonial.tag}
              </span>
            ) : <span />}
            <Badge on={testimonial.isActive} />
          </div>

          {/* meta row */}
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--text-muted)" }}>
            <span>Added {new Date(testimonial.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
          </div>

          {/* copy URL row — only show if there's an image */}
          {imgUrl && (
            <div style={{ background: "var(--bg-base)", borderRadius: 8, padding: "7px 11px", display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 10, color: "var(--text-muted)", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {imgUrl}
              </span>
              <button
                onClick={() => { navigator.clipboard.writeText(imgUrl); toast("URL copied!"); }}
                style={{ background: "var(--accent-soft)", border: "1px solid var(--accent-border)", borderRadius: 6, padding: "3px 9px", fontSize: 11, fontWeight: 600, color: "var(--accent-text)", cursor: "pointer", whiteSpace: "nowrap" }}
              >
                Copy
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   DELETE MODAL
───────────────────────────────────────────────────────────────────────────── */
function DelModal({ item, close, confirm }) {
  if (!item) return null;
  return (
    <div className="lm-backdrop" onClick={close}>
      <div className="lm-anim-si" onClick={e => e.stopPropagation()} style={{
        background: "var(--bg-surface)", border: "1px solid var(--border)",
        borderRadius: 16, maxWidth: 380, width: "100%", margin: 16,
        boxShadow: "var(--shadow)", padding: 24,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 13, marginBottom: 14 }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: "var(--danger-soft)", border: "1px solid var(--danger-border)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--danger-text)" strokeWidth="2">
              <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6M10 11v6M14 11v6M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <p className="lm-heading" style={{ margin: 0, fontWeight: 800, fontSize: 15, color: "var(--text-primary)" }}>Delete Testimonial</p>
            <p style={{ margin: "2px 0 0", fontSize: 11, color: "var(--text-muted)" }}>Also removes photo from Cloudinary</p>
          </div>
        </div>
        <p style={{ margin: "0 0 18px", fontSize: 13, color: "var(--text-sec)", lineHeight: 1.7 }}>
          Delete <strong style={{ color: "var(--text-primary)" }}>{item.name}</strong>? This cannot be undone.
        </p>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={close} style={{ flex: 1, padding: "9px 0", borderRadius: 9, border: "1px solid var(--border)", background: "var(--bg-base)", color: "var(--text-sec)", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>Cancel</button>
          <button onClick={confirm} style={{ flex: 1, padding: "9px 0", borderRadius: 9, border: "1px solid var(--danger-border)", background: "var(--danger-soft)", color: "var(--danger-text)", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>Delete</button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   ADD / EDIT FORM  (left sticky panel)
───────────────────────────────────────────────────────────────────────────── */
function TestimonialForm({ editTarget, onSuccess, clearEdit }) {
  const [form,    setForm]    = useState(EMPTY_FORM);
  const [file,    setFile]    = useState(null);
  const [preview, setPreview] = useState("");
  const [saving,  setSaving]  = useState(false);

  // FIX: use EMPTY_FORM from outer scope, no stale closure
  const reset = useCallback(() => {
    setForm(EMPTY_FORM);
    setFile(null);
    setPreview("");
    clearEdit();
  }, [clearEdit]);

  // FIX: normalise imageUrl vs image when populating edit form
  useEffect(() => {
    if (editTarget) {
      setForm({
        name    : editTarget.name     || "",
        role    : editTarget.role     || "",
        quote   : editTarget.quote    || "",
        tag     : editTarget.tag      || "",
        rating  : editTarget.rating   || 5,
        isActive: editTarget.isActive ?? true,
      });
      setPreview(editTarget.imageUrl || editTarget.image || "");
      setFile(null);
    } else {
      reset();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editTarget]);

  const submit = async () => {
    if (!form.name.trim())  { toast("Name is required", "error");  return; }
    if (!form.quote.trim()) { toast("Quote is required", "error"); return; }

    setSaving(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, String(v)));
      if (file) fd.append("image", file);

      const url    = editTarget
        ? `${API_URL}/testimonials/${editTarget._id}`
        : `${API_URL}/testimonials`;
      const method = editTarget ? "PUT" : "POST";

      const res  = await apiFetch(url, { method, body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Request failed");

      toast(editTarget ? "Testimonial updated! 🎉" : "Testimonial added! 🎉");
      reset();   // FIX: always reset after success
      onSuccess();
    } catch (e) {
      toast(e.message || "Something went wrong", "error");
    } finally {
      setSaving(false);
    }
  };

  const isEdit = !!editTarget;

  return (
    <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 16, padding: 22, display: "flex", flexDirection: "column", gap: 16, position: "sticky", top: 24 }}>

      {/* form header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div>
          <h2 className="lm-heading" style={{ margin: 0, fontSize: 16, fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
            {isEdit ? "Edit Testimonial" : "Add Testimonial"}
          </h2>
          <p style={{ margin: "3px 0 0", fontSize: 12, color: "var(--text-muted)" }}>
            {isEdit ? `Editing: ${editTarget.name}` : "Fill in the details below"}
          </p>
        </div>
        {isEdit && (
          <button onClick={reset} style={{ background: "var(--bg-base)", border: "1px solid var(--border)", borderRadius: 8, padding: "5px 11px", fontSize: 12, color: "var(--text-muted)", cursor: "pointer", fontWeight: 500, marginTop: 2 }}>
            ✕ Cancel
          </button>
        )}
      </div>

      {/* edit hint */}
      {isEdit && (
        <div style={{ background: "var(--accent-soft)", border: "1px solid var(--accent-border)", borderRadius: 8, padding: "8px 12px", fontSize: 12, color: "var(--accent-text)", display: "flex", gap: 7, alignItems: "center" }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" strokeLinecap="round" /></svg>
          Leave photo blank to keep the existing one.
        </div>
      )}

      {/* photo */}
      <Fld label="Photo" note="(optional)">
        <DropZone preview={preview} onChange={(f, u) => { setFile(f); setPreview(u); }} />
      </Fld>

      {/* name */}
      <Fld label="Name" req>
        <input
          className="lm-input"
          style={IS}
          placeholder="e.g. Ramesh Kumar"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />
      </Fld>

      {/* role */}
      <Fld label="Role / Designation">
        <input
          className="lm-input"
          style={IS}
          placeholder="e.g. Principal, DPS Jaipur"
          value={form.role}
          onChange={e => setForm({ ...form, role: e.target.value })}
        />
      </Fld>

      {/* tag */}
      <Fld label="Tag" note="(category)">
        <input
          className="lm-input"
          style={IS}
          placeholder="e.g. Analytics, Parent App"
          value={form.tag}
          onChange={e => setForm({ ...form, tag: e.target.value })}
        />
      </Fld>

      {/* quote */}
      <Fld label="Quote" req>
        <textarea
          className="lm-input"
          style={{ ...IS, minHeight: 90, resize: "vertical" }}
          placeholder="Write the testimonial quote…"
          value={form.quote}
          onChange={e => setForm({ ...form, quote: e.target.value })}
        />
      </Fld>

      {/* rating */}
      <Fld label="Rating">
        <StarRating value={form.rating} onChange={v => setForm({ ...form, rating: v })} />
      </Fld>

      {/* visibility */}
      <Fld label="Visibility">
        <div style={{ display: "flex", alignItems: "center", gap: 10, height: 39, padding: "0 12px", background: "var(--bg-base)", border: "1px solid var(--border)", borderRadius: 9 }}>
          <Toggle v={form.isActive} on={() => setForm({ ...form, isActive: !form.isActive })} />
          <span style={{ fontSize: 12, color: form.isActive ? "var(--text-primary)" : "var(--text-muted)", fontWeight: 500 }}>
            {form.isActive ? "Active — shown on site" : "Hidden — not shown"}
          </span>
        </div>
      </Fld>

      {/* submit */}
      <button
        onClick={submit}
        disabled={saving}
        style={{
          width: "100%", padding: "11px 0", borderRadius: 10,
          background: saving ? "var(--accent-soft)" : "var(--accent)",
          border: `1px solid ${saving ? "var(--accent-border)" : "transparent"}`,
          color: saving ? "var(--accent-text)" : "#fff",
          fontWeight: 700, fontSize: 14, cursor: saving ? "not-allowed" : "pointer",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          letterSpacing: "-0.01em", transition: "all 0.15s", fontFamily: "inherit",
        }}
      >
        {saving
          ? <><Spin c="var(--accent-text)" /> Saving…</>
          : isEdit ? "💾  Save Changes" : "+  Add Testimonial"
        }
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   TESTIMONIAL LIST  (right panel)  —  FIX: proper grid + IBtn + empty state
───────────────────────────────────────────────────────────────────────────── */
function TestimonialList({ data, loading, onEdit, onDel, onToggle, onView }) {
  if (loading) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 180, gap: 10, color: "var(--text-muted)", fontSize: 13 }}>
      <Spin s={18} c="var(--accent)" /> Loading…
    </div>
  );

  if (!data?.length) return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14, padding: "52px 24px" }}>
      <div style={{ width: 50, height: 50, borderRadius: "50%", background: "var(--accent-soft)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.8">
          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
        </svg>
      </div>
      <div style={{ textAlign: "center" }}>
        <p className="lm-heading" style={{ margin: 0, fontWeight: 800, fontSize: 15, color: "var(--text-primary)" }}>No testimonials yet</p>
        <p style={{ margin: "4px 0 0", fontSize: 12, color: "var(--text-muted)" }}>Add your first testimonial using the form</p>
      </div>
    </div>
  );

  return (
    <div className="lm-list" style={{ overflowY: "auto", maxHeight: "calc(100vh - 220px)" }}>
      {/* column headers */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "44px 1fr 90px 80px 80px 116px",
        padding: "8px 16px", gap: 10,
        borderBottom: "1px solid var(--border-sub)",
        position: "sticky", top: 0, background: "var(--bg-surface)", zIndex: 1,
      }}>
        {["Photo", "Name / Role", "Tag", "Rating", "Status", "Actions"].map(h => (
          <span key={h} style={{ fontSize: 10, fontWeight: 700, color: "var(--text-muted)", letterSpacing: "0.07em", textTransform: "uppercase" }}>{h}</span>
        ))}
      </div>

      {/* rows */}
      {data.map((t, i) => {
        const imgUrl = t.imageUrl || t.image || "";
        return (
          <div
            key={t._id}
            className="lm-row lm-anim-fi"
            style={{
              display: "grid",
              gridTemplateColumns: "44px 1fr 90px 80px 80px 116px",
              padding: "10px 16px", gap: 10, alignItems: "center",
              borderBottom: i < data.length - 1 ? "1px solid var(--border-sub)" : "none",
              animationDelay: `${i * 0.04}s`,
            }}
          >
            {/* avatar */}
            <div className="lm-ic" onClick={() => onView(t)} style={{ cursor: "pointer" }}>
              {imgUrl ? (
                <img src={imgUrl} alt={t.name} style={{ width: 38, height: 38, borderRadius: "50%", objectFit: "cover", border: "1px solid var(--border)", display: "block" }} />
              ) : (
                <div style={{ width: 38, height: 38, borderRadius: "50%", background: "var(--accent-soft)", border: "1px solid var(--accent-border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 700, color: "var(--accent-text)" }}>
                  {t.name?.[0]?.toUpperCase() || "?"}
                </div>
              )}
              <div className="lm-ic-ov" style={{ borderRadius: "50%" }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
              </div>
            </div>

            {/* name + role */}
            <div style={{ minWidth: 0 }}>
              <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: "var(--text-primary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{t.name}</p>
              <p style={{ margin: "2px 0 0", fontSize: 11, color: "var(--text-muted)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{t.role || <em>No role</em>}</p>
            </div>

            {/* tag */}
            <div style={{ minWidth: 0 }}>
              {t.tag ? (
                <span style={{ fontSize: 11, padding: "3px 8px", borderRadius: 20, background: "var(--accent-soft)", color: "var(--accent-text)", border: "1px solid var(--accent-border)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", display: "block" }}>
                  {t.tag}
                </span>
              ) : <span style={{ color: "var(--text-muted)", fontSize: 12 }}>—</span>}
            </div>

            {/* rating */}
            <div style={{ fontSize: 12, color: "#fbbf24", letterSpacing: 1 }}>
              {"★".repeat(Number(t.rating || 0))}
              <span style={{ color: "var(--border)", marginLeft: 1 }}>{"★".repeat(5 - Number(t.rating || 0))}</span>
            </div>

            {/* status */}
            <Badge on={t.isActive} />

            {/* actions */}
            <div style={{ display: "flex", gap: 4 }}>
              {/* view */}
              <IBtn title="View details" onClick={() => onView(t)}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
              </IBtn>
              {/* toggle */}
              <IBtn title={t.isActive ? "Hide" : "Show"} onClick={() => onToggle(t)}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  {t.isActive
                    ? <><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22" strokeLinecap="round" /></>
                    : <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></>
                  }
                </svg>
              </IBtn>
              {/* edit */}
              <IBtn title="Edit" onClick={() => onEdit(t)}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--accent-text)" strokeWidth="2">
                  <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" strokeLinecap="round" />
                  <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" strokeLinecap="round" />
                </svg>
              </IBtn>
              {/* delete */}
              <IBtn title="Delete" danger onClick={() => onDel(t)}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="3 6 5 6 21 6" strokeLinecap="round" />
                  <path d="M19 6l-1 14H6L5 6M10 11v6M14 11v6M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" strokeLinecap="round" />
                </svg>
              </IBtn>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   ROOT PAGE
───────────────────────────────────────────────────────────────────────────── */
export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [editT,  setEditT]  = useState(null);
  const [viewT,  setViewT]  = useState(null);
  const [delT,   setDelT]   = useState(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const r = await apiFetch(`${API_URL}/testimonials`);
      const d = await r.json();
      setTestimonials(d.data || []);
    } catch {
      toast("Failed to load testimonials", "error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const doToggle = async (t) => {
    try {
      const fd = new FormData();
      fd.append("isActive", String(!t.isActive));
      fd.append("name",     t.name);
      fd.append("role",     t.role     || "");
      fd.append("quote",    t.quote);
      fd.append("tag",      t.tag      || "");
      fd.append("rating",   String(t.rating));
      await apiFetch(`${API_URL}/testimonials/${t._id}`, { method: "PUT", body: fd });
      toast(t.isActive ? "Testimonial hidden" : "Testimonial is now active");
      load();
    } catch {
      toast("Update failed", "error");
    }
  };

  const doDelete = async () => {
    try {
      const res = await apiFetch(`${API_URL}/testimonials/${delT._id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      toast("Deleted successfully");
      setDelT(null);
      load();
    } catch {
      toast("Delete failed", "error");
    }
  };

  const active = testimonials.filter(t => t.isActive).length;

  return (
    <>
      <style>{STYLES}</style>
      <div className="lm-page">

        {/* page header */}
        <div style={{ marginBottom: 26 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 5, flexWrap: "wrap" }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: "var(--accent-soft)", border: "1px solid var(--accent-border)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <h1 className="lm-heading" style={{ margin: 0, fontSize: 21, fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.03em" }}>
              Testimonials
            </h1>
          </div>
          <p style={{ margin: 0, fontSize: 13, color: "var(--text-muted)" }}>
            Manage homepage testimonials ·{" "}
            <strong style={{ color: "var(--accent-text)" }}>{active}</strong> active of{" "}
            <strong style={{ color: "var(--text-sec)" }}>{testimonials.length}</strong> total
          </p>
        </div>

        {/* two-column layout */}
        <div className="institute-grid">

          {/* LEFT — form */}
          <TestimonialForm
            editTarget={editT}
            onSuccess={load}
            clearEdit={() => setEditT(null)}
          />

          {/* RIGHT — list */}
          <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 16, overflow: "hidden" }}>
            <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--border-sub)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span className="lm-heading" style={{ fontWeight: 800, fontSize: 15, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
                All Testimonials
              </span>
              <button
                onClick={load}
                className="lm-btn-ghost"
                style={{ background: "var(--bg-base)", border: "1px solid var(--border)", borderRadius: 8, padding: "6px 12px", fontSize: 12, fontWeight: 500, color: "var(--text-sec)", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, transition: "all 0.14s" }}
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" />
                  <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" strokeLinecap="round" />
                </svg>
                Refresh
              </button>
            </div>

            <TestimonialList
              data={testimonials}
              loading={loading}
              onEdit={t => { setEditT(t); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              onDel={setDelT}
              onToggle={doToggle}
              onView={setViewT}
            />
          </div>
        </div>
      </div>

      <ViewModal testimonial={viewT} close={() => setViewT(null)} />
      <DelModal  item={delT}         close={() => setDelT(null)} confirm={doDelete} />
      <Toasts />
    </>
  );
}