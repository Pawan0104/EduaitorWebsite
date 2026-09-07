import { useState, useEffect, useRef, useCallback } from "react";
import { API_URL, apiFetch } from "../lib/api";

const STYLES = `
  .lm-input:focus { border-color: var(--accent) !important; box-shadow: 0 0 0 3px var(--accent-soft); outline: none; }
  .lm-drop:hover  { border-color: var(--accent) !important; background: var(--accent-soft) !important; }
  .lm-row         { transition: background 0.14s; }
  .lm-row:hover   { background: var(--bg-hover) !important; }
  .lm-btn-ghost:hover  { border-color: var(--accent-border) !important; color: var(--accent-text) !important; }
  .lm-btn-icon:hover   { background: var(--bg-elevated) !important; }
  .lm-btn-di:hover     { background: var(--danger-soft) !important; border-color: var(--danger-border) !important; }
  .lm-badge-on  { background:rgba(34,197,94,0.10); color:#4ade80; border:1px solid rgba(34,197,94,0.22); }
  .lm-badge-off { background:var(--danger-soft); color:var(--danger-text); border:1px solid var(--danger-border); }
  .lm-badge-pending { background:rgba(245,158,11,0.12); color:#fbbf24; border:1px solid rgba(245,158,11,0.3); }
  .lm-tab { transition: all 0.15s; }
  .lm-tab:hover { background: var(--bg-hover); }
  .lm-tab.active { background: var(--accent-soft); color: var(--accent-text); border-color: var(--accent-border) !important; }
  .lm-toggle-thumb { transition: left 0.18s cubic-bezier(.4,0,.2,1); }
  .lm-toggle-bg    { transition: background 0.18s; }
  @keyframes lm-fi  { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
  @keyframes lm-si  { from{opacity:0;transform:scale(0.95)}     to{opacity:1;transform:scale(1)} }
  @keyframes lm-sp  { to{transform:rotate(360deg)} }
  @keyframes lm-ti  { from{opacity:0;transform:translateX(20px)} to{opacity:1;transform:translateX(0)} }
  .lm-anim-fi  { animation: lm-fi 0.22s ease both; }
  .lm-anim-si  { animation: lm-si 0.18s ease both; }
  .lm-spinner  { animation: lm-sp 0.7s linear infinite; }
  .lm-toast    { animation: lm-ti 0.22s ease both; }
  .lm-ic { position:relative; overflow:hidden; }
  .lm-ic-ov { position:absolute;inset:0;background:rgba(0,0,0,0.52);display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity 0.16s; }
  .lm-ic:hover .lm-ic-ov { opacity:1; }
  .lm-backdrop { position:fixed;inset:0;background:rgba(0,0,0,0.65);z-index:900;backdrop-filter:blur(5px);display:flex;align-items:center;justify-content:center; }
  .lm-list::-webkit-scrollbar { width:4px; }
  .lm-list::-webkit-scrollbar-thumb { background:var(--border);border-radius:4px; }
  .lm-editor { font-family:'DM Sans',sans-serif; line-height:1.6; }
  .lm-editor p { margin: 0 0 12px; }
  .lm-editor h1,.lm-editor h2,.lm-editor h3 { margin: 18px 0 10px; }
  .lm-editor ul,.lm-editor ol { padding-left: 20px; margin: 0 0 12px; }
  .lm-editor img { max-width: 100%; border-radius: 10px; }
  .lm-editor blockquote { border-left: 3px solid var(--accent); padding: 4px 14px; margin: 12px 0; color: var(--text-sec); }
  .lm-editor code { background: var(--bg-elevated); padding: 2px 6px; border-radius: 5px; }
  .lm-editor pre { background: var(--bg-elevated); padding: 12px; border-radius: 10px; overflow-x: auto; }
`;

/* ─────── Spinner ─────── */
const Spin = ({ s = 16, c = "var(--accent)" }) => (
  <svg className="lm-spinner" width={s} height={s} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke={c} strokeWidth="3" opacity=".2" />
    <path d="M12 2a10 10 0 0110 10" stroke={c} strokeWidth="3" strokeLinecap="round" />
  </svg>
);

/* ─────── Toast ─────── */
let _push = null;
const toast = (msg, type = "success") => {
  if (!_push) return;
  const id = Date.now();
  _push((p) => [...p, { id, msg, type }]);
  setTimeout(() => _push((p) => p.filter((t) => t.id !== id)), 3200);
};
function Toasts() {
  const [list, set] = useState([]);
  _push = set;
  return (
    <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 9999, display: "flex", flexDirection: "column", gap: 8 }}>
      {list.map((t) => (
        <div key={t.id} className="lm-toast" style={{
          padding: "10px 16px", borderRadius: 10, fontSize: 13, fontWeight: 600,
          boxShadow: "0 8px 28px rgba(0,0,0,0.4)", maxWidth: 320,
          display: "flex", alignItems: "center", gap: 8,
          background: t.type === "error" ? "var(--danger-soft)" : "var(--accent-soft)",
          border: `1px solid ${t.type === "error" ? "var(--danger-border)" : "var(--accent-border)"}`,
          color: t.type === "error" ? "var(--danger-text)" : "var(--accent-text)",
        }}>
          <span style={{ fontSize: 15 }}>{t.type === "error" ? "❌" : "✅"}</span>{t.msg}
        </div>
      ))}
    </div>
  );
}

/* ─────── Badge ─────── */
const Badge = ({ status }) => {
  const on = status === "published";
  const cls = on ? "lm-badge-on" : status === "pending" ? "lm-badge-pending" : "lm-badge-off";
  const label = status === "published" ? "Published" : status === "pending" ? "Pending" : status === "approved" || status === "live" ? "Approved" : status === "spam" ? "Spam" : "Draft";
  return (
    <span className={cls} style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11, fontWeight: 700, letterSpacing: "0.04em", padding: "3px 9px", borderRadius: 20 }}>
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: "currentColor" }} />
      {label}
    </span>
  );
};

/* ─────── Toggle ─────── */
const Toggle = ({ v, on }) => (
  <button onClick={on} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, lineHeight: 1 }}>
    <div className="lm-toggle-bg" style={{ width: 38, height: 22, borderRadius: 11, background: v ? "var(--accent)" : "var(--border)", position: "relative" }}>
      <div className="lm-toggle-thumb" style={{ width: 16, height: 16, borderRadius: "50%", background: "#fff", position: "absolute", top: 3, left: v ? 19 : 3, boxShadow: "0 1px 4px rgba(0,0,0,0.3)" }} />
    </div>
  </button>
);

/* ─────── Icon button ─────── */
const IBtn = ({ onClick, title, danger, children }) => (
  <button onClick={onClick} title={title}
    className={`lm-btn-icon${danger ? " lm-btn-di" : ""}`}
    style={{ background: "var(--bg-base)", border: `1px solid ${danger ? "var(--danger-border)" : "var(--border)"}`, color: danger ? "var(--danger-text)" : "var(--text-sec)", borderRadius: 8, width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.14s" }}>
    {children}
  </button>
);

/* ─────── Field wrapper ─────── */
const Fld = ({ label, req, note, children }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
    <label style={{ fontSize: 11, fontWeight: 700, color: "var(--text-muted)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
      {label}{req && <span style={{ color: "var(--danger-text)" }}> *</span>}
      {note && <span style={{ color: "var(--text-muted)", fontWeight: 400, textTransform: "none", letterSpacing: 0, marginLeft: 5 }}>{note}</span>}
    </label>
    {children}
  </div>
);

const IS = { width: "100%", padding: "9px 13px", borderRadius: 9, background: "var(--bg-base)", border: "1px solid var(--border)", color: "var(--text-primary)", fontSize: 13, fontFamily: "'DM Sans',sans-serif", transition: "border-color 0.15s, box-shadow 0.15s" };

/* ─────── DropZone ─────── */
function DropZone({ preview, onChange }) {
  const ref = useRef();
  const [drag, setDrag] = useState(false);
  const handle = (f) => {
    if (!f?.type.startsWith("image/")) { toast("Only images allowed", "error"); return; }
    if (f.size > 5 * 1024 * 1024) { toast("Max 5 MB", "error"); return; }
    onChange(f, URL.createObjectURL(f));
  };
  return (
    <div className="lm-drop lm-ic" onClick={() => ref.current?.click()}
      onDragOver={(e) => { e.preventDefault(); setDrag(true); }} onDragLeave={() => setDrag(false)}
      onDrop={(e) => { e.preventDefault(); setDrag(false); handle(e.dataTransfer.files[0]); }}
      style={{ border: `2px dashed ${drag ? "var(--accent)" : "var(--border)"}`, borderRadius: 12, background: drag ? "var(--accent-soft)" : "var(--bg-base)", cursor: "pointer", transition: "all 0.15s", minHeight: 126, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 8, overflow: "hidden" }}>
      {preview ? (
        <>
          <img src={preview} alt="" style={{ maxHeight: 110, maxWidth: "100%", objectFit: "contain", padding: "10px 16px" }} />
          <div className="lm-ic-ov"><span style={{ color: "#fff", fontSize: 11, fontWeight: 700, letterSpacing: "0.05em", background: "rgba(0,0,0,0.45)", padding: "4px 11px", borderRadius: 6 }}>CHANGE IMAGE</span></div>
        </>
      ) : (
        <>
          <div style={{ width: 42, height: 42, borderRadius: 10, background: "var(--bg-elevated)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.6"><rect x="3" y="3" width="18" height="18" rx="3" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
          </div>
          <div style={{ textAlign: "center" }}>
            <p style={{ margin: 0, fontSize: 13, color: "var(--text-sec)", fontWeight: 500 }}>Drop cover image or <span style={{ color: "var(--accent-text)" }}>browse</span></p>
            <p style={{ margin: "3px 0 0", fontSize: 11, color: "var(--text-muted)" }}>PNG · JPG · WebP — max 5 MB</p>
          </div>
        </>
      )}
      <input ref={ref} type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => handle(e.target.files[0])} />
    </div>
  );
}

const slugify = (s = "") =>
  s.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");

/* ─────────────────────────────────────────────────────────────
   BLOG FORM
───────────────────────────────────────────────────────────── */
function BlogForm({ editTarget, onSuccess, clearEdit }) {
  const EMPTY = {
    title: "", slug: "", excerpt: "", content: "", authorName: "", category: "",
    tags: "", status: "draft", publishedAt: "", featured: false, allowComments: true,
    metaTitle: "", metaDescription: "", keywords: "",
  };
  const [form, setForm] = useState(EMPTY);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (editTarget) {
      setForm({
        title: editTarget.title, slug: editTarget.slug, excerpt: editTarget.excerpt || "",
        content: editTarget.content || "", authorName: editTarget.author?.name || "",
        category: editTarget.category || "", tags: (editTarget.tags || []).join(", "),
        status: editTarget.status, publishedAt: editTarget.publishedAt ? new Date(editTarget.publishedAt).toISOString().slice(0, 10) : "",
        featured: editTarget.featured, allowComments: editTarget.allowComments !== false,
        metaTitle: editTarget.seo?.metaTitle || "", metaDescription: editTarget.seo?.metaDescription || "",
        keywords: editTarget.seo?.keywords || "",
      });
      setPreview(editTarget.coverImage?.url || ""); setFile(null);
    } else {
      setForm(EMPTY); setPreview(""); setFile(null);
    }
  }, [editTarget]);

  const reset = () => { setForm(EMPTY); setPreview(""); setFile(null); clearEdit(); };
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async () => {
    if (!form.title.trim()) { toast("Title is required", "error"); return; }
    if (!editTarget && !file) { toast("Cover image is required", "error"); return; }

    setSaving(true);
    try {
      const fd = new FormData();
      fd.append("title", form.title.trim());
      fd.append("slug", slugify(form.slug || form.title));
      fd.append("excerpt", form.excerpt.trim());
      fd.append("content", form.content);
      fd.append("authorName", form.authorName.trim());
      fd.append("category", form.category.trim());
      fd.append("tags", form.tags);
      fd.append("status", form.status);
      fd.append("publishedAt", form.publishedAt);
      fd.append("featured", String(form.featured));
      fd.append("allowComments", String(form.allowComments));
      fd.append("metaTitle", form.metaTitle.trim());
      fd.append("metaDescription", form.metaDescription.trim());
      fd.append("keywords", form.keywords.trim());
      if (file) fd.append("coverImage", file);

      const url = editTarget ? `${API_URL}/blog-posts/${editTarget._id}` : `${API_URL}/blog-posts`;
      const res = await apiFetch(url, { method: editTarget ? "PUT" : "POST", body: fd });
      if (!res.ok) throw new Error();

      toast(editTarget ? "Blog updated!" : "Blog created!");
      reset(); onSuccess();
    } catch (e) { toast("Operation failed", "error"); }
    finally { setSaving(false); }
  };

  return (
    <div className="logo-form" style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 16, padding: 22, display: "flex", flexDirection: "column", gap: 16, position: "sticky", top: 24 }}>
      <h2 className="lm-heading" style={{ fontSize: 16, fontWeight: 800 }}>{editTarget ? "Edit Blog Post" : "Write New Blog Post"}</h2>

      <Fld label="Cover Image" req={!editTarget}>
        <DropZone preview={preview} onChange={(f, u) => { setFile(f); setPreview(u); }} />
      </Fld>

      <Fld label="Blog Title" req>
        <input className="lm-input" style={IS} placeholder="e.g. How AI is Changing Schools in India" value={form.title}
          onChange={(e) => set("title", e.target.value)} />
      </Fld>

      <Fld label="Slug" note="auto-filled from title">
        <input className="lm-input" style={IS} placeholder="how-ai-is-changing-schools-in-india" value={form.slug}
          onChange={(e) => set("slug", e.target.value)} />
      </Fld>

      <Fld label="Short Description / Excerpt" note="shown on blog listing & search">
        <textarea className="lm-input" style={{ ...IS, height: 70, resize: "none" }} placeholder="A two-line summary of the blog..." value={form.excerpt}
          onChange={(e) => set("excerpt", e.target.value)} />
      </Fld>

      <Fld label="Author Name">
        <input className="lm-input" style={IS} placeholder="e.g. Ananya Sharma" value={form.authorName}
          onChange={(e) => set("authorName", e.target.value)} />
      </Fld>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <Fld label="Category">
          <input className="lm-input" style={IS} placeholder="e.g. AI in Education" value={form.category}
            onChange={(e) => set("category", e.target.value)} />
        </Fld>
        <Fld label="Tags" note="comma separated">
          <input className="lm-input" style={IS} placeholder="AI, Schools, Learning" value={form.tags}
            onChange={(e) => set("tags", e.target.value)} />
        </Fld>
      </div>

      <Fld label="Blog Content" note="HTML allowed — paragraphs, headings, lists, images">
        <textarea className="lm-input lm-editor" style={{ ...IS, minHeight: 220, resize: "vertical", lineHeight: 1.7 }} placeholder={"<p>Write your blog post here...</p>"}
          value={form.content} onChange={(e) => set("content", e.target.value)} />
      </Fld>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <Fld label="Status">
          <select className="lm-input" style={IS} value={form.status} onChange={(e) => set("status", e.target.value)}>
            <option value="draft">Draft</option>
            <option value="published">Publish</option>
          </select>
        </Fld>
        <Fld label="Publish Date">
          <input className="lm-input" type="date" style={IS} value={form.publishedAt}
            onChange={(e) => set("publishedAt", e.target.value)} />
        </Fld>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <Fld label="Featured">
          <div style={{ display: "flex", alignItems: "center", gap: 10, height: 39, padding: "0 12px", background: "var(--bg-base)", border: "1px solid var(--border)", borderRadius: 9 }}>
            <Toggle v={form.featured} on={() => set("featured", !form.featured)} />
            <span style={{ fontSize: 12 }}>{form.featured ? "Featured" : "Normal"}</span>
          </div>
        </Fld>
        <Fld label="Comments">
          <div style={{ display: "flex", alignItems: "center", gap: 10, height: 39, padding: "0 12px", background: "var(--bg-base)", border: "1px solid var(--border)", borderRadius: 9 }}>
            <Toggle v={form.allowComments} on={() => set("allowComments", !form.allowComments)} />
            <span style={{ fontSize: 12 }}>{form.allowComments ? "Enabled" : "Off"}</span>
          </div>
        </Fld>
      </div>

      <details style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", borderRadius: 12, padding: "12px 14px" }}>
        <summary style={{ fontSize: 12, fontWeight: 700, color: "var(--accent-text)", cursor: "pointer" }}>SEO Settings</summary>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 12 }}>
          <Fld label="Meta Title"><input className="lm-input" style={IS} placeholder="SEO title — usually blog title" value={form.metaTitle} onChange={(e) => set("metaTitle", e.target.value)} /></Fld>
          <Fld label="Meta Description"><textarea className="lm-input" style={{ ...IS, height: 60, resize: "none" }} placeholder="150–160 char description for search engines" value={form.metaDescription} onChange={(e) => set("metaDescription", e.target.value)} /></Fld>
          <Fld label="Keywords"><input className="lm-input" style={IS} placeholder="focus keywords, comma separated" value={form.keywords} onChange={(e) => set("keywords", e.target.value)} /></Fld>
        </div>
      </details>

      <button onClick={submit} disabled={saving} className="lm-btn-primary" style={{ width: "100%", padding: "12px", borderRadius: 10, background: "var(--accent)", color: "#fff", border: "none", fontWeight: 700, cursor: "pointer" }}>
        {saving ? <Spin s={15} c="#fff" /> : editTarget ? "Update Blog" : "Create Blog"}
      </button>
      {editTarget && <button onClick={reset} style={{ background: "none", border: "none", color: "var(--text-muted)", fontSize: 12, cursor: "pointer" }}>Cancel Edit</button>}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   BLOG LIST
───────────────────────────────────────────────────────────── */
function BlogList({ posts, loading, onEdit, onDel, onView }) {
  if (loading) return <div style={{ padding: 40, textAlign: "center" }}><Spin s={20} /></div>;
  if (!posts.length) return <div style={{ padding: 40, textAlign: "center", color: "var(--text-muted)", fontSize: 13 }}>No blog posts yet — create your first one.</div>;

  return (
    <div className="lm-list" style={{ overflowY: "auto", maxHeight: "calc(100vh - 220px)" }}>
      {posts.map((p) => (
        <div key={p._id} className="lm-row" style={{ display: "flex", flexWrap: "wrap", gap: 14, padding: "14px 18px", alignItems: "center", borderBottom: "1px solid var(--border-sub)" }}>
          <img src={p.coverImage?.url || ""} alt="" style={{ width: 74, height: 48, borderRadius: 8, objectFit: "cover", flexShrink: 0, background: "var(--bg-elevated)" }} />
          <div style={{ flex: 1, minWidth: 200 }}>
            <p style={{ margin: "0 0 3px", fontWeight: 600, fontSize: 14, lineHeight: 1.3 }}>{p.title}</p>
            <p style={{ margin: 0, fontSize: 12, color: "var(--text-muted)" }}>
              {p.author?.name || "Admin"} · {p.category || "General"} · {p.publishedAt ? new Date(p.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "Not published"} · {p.commentCount || 0} comments
            </p>
            <p style={{ margin: "4px 0 0", fontSize: 11, color: "var(--text-muted)" }}>/blog/{p.slug}</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "flex-end", marginLeft: "auto" }}>
            <Badge status={p.status} />
            <div style={{ display: "flex", gap: 8 }}>
              <IBtn title="Preview" onClick={() => onView(p)}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
              </IBtn>
              <IBtn title="Edit" onClick={() => onEdit(p)}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--accent-text)" strokeWidth="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" strokeLinecap="round" /><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" strokeLinecap="round" /></svg>
              </IBtn>
              <IBtn danger title="Delete" onClick={() => onDel(p)}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6M10 11v6M14 11v6M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" /></svg>
              </IBtn>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   COMMENTS PANEL
───────────────────────────────────────────────────────────── */
function CommentsPanel({ comments, loading, onStatus, onDel }) {
  if (loading) return <div style={{ padding: 40, textAlign: "center" }}><Spin s={20} /></div>;
  if (!comments.length) return <div style={{ padding: 40, textAlign: "center", color: "var(--text-muted)", fontSize: 13 }}>No comments yet.</div>;

  return (
    <div className="lm-list" style={{ overflowY: "auto", maxHeight: "calc(100vh - 220px)" }}>
      {comments.map((c) => (
        <div key={c._id} className="lm-row" style={{ padding: "14px 18px", borderBottom: "1px solid var(--border-sub)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <span style={{ fontWeight: 700, fontSize: 13 }}>{c.name}</span>
            {c.email && <span style={{ fontSize: 11, color: "var(--text-muted)" }}>{c.email}</span>}
            <span style={{ fontSize: 11, color: "var(--text-muted)" }}>· {new Date(c.createdAt).toLocaleString("en-IN")}</span>
            <div style={{ marginLeft: "auto", display: "flex", gap: 8, alignItems: "center" }}>
              <Badge status={c.status === "approved" ? "approved" : c.status} />
              <IBtn title="Approve" onClick={() => onStatus(c, "approved")}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5" /></svg>
              </IBtn>
              <IBtn title="Mark as spam" onClick={() => onStatus(c, "spam")}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M12 7v6M12 17h.01" /></svg>
              </IBtn>
              <IBtn danger title="Delete" onClick={() => onDel(c)}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6M10 11v6M14 11v6M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" /></svg>
              </IBtn>
            </div>
          </div>
          <p style={{ margin: "10px 0 0", fontSize: 13, color: "var(--text-sec)", lineHeight: 1.6 }}>{c.comment}</p>
          <p style={{ margin: "8px 0 0", fontSize: 11, color: "var(--accent-text)" }}>On: {c.post?.title || "—"}</p>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   DELETE CONFIRM MODAL
───────────────────────────────────────────────────────────── */
function DelModal({ item, close, confirm }) {
  if (!item) return null;
  return (
    <div className="lm-backdrop" onClick={close} style={{ zIndex: 1100 }}>
      <div className="lm-anim-si" onClick={(e) => e.stopPropagation()} style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 16, maxWidth: 380, width: "100%", margin: 16, boxShadow: "var(--shadow)", padding: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 13, marginBottom: 14 }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: "var(--danger-soft)", border: "1px solid var(--danger-border)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--danger-text)" strokeWidth="2"><polyline points="3 6 5 6 21 6" strokeLinecap="round" /><path d="M19 6l-1 14H6L5 6M10 11v6M14 11v6M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" strokeLinecap="round" /></svg>
          </div>
          <div>
            <p className="lm-heading" style={{ margin: 0, fontWeight: 800, fontSize: 15, color: "var(--text-primary)" }}>{item.title ? "Delete Blog" : "Delete Comment"}</p>
            <p style={{ margin: "2px 0 0", fontSize: 11, color: "var(--text-muted)" }}>This will permanently remove the record.</p>
          </div>
        </div>
        <p style={{ margin: "0 0 18px", fontSize: 13, color: "var(--text-sec)", lineHeight: 1.7 }}>
          Are you sure you want to delete <strong style={{ color: "var(--text-primary)" }}>{item.title || item.comment?.slice(0, 60)}</strong>? This action cannot be undone.
        </p>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={close} style={{ flex: 1, padding: "10px 0", borderRadius: 9, border: "1px solid var(--border)", background: "var(--bg-base)", color: "var(--text-sec)", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>Cancel</button>
          <button onClick={() => confirm(item)} style={{ flex: 1, padding: "10px 0", borderRadius: 9, border: "1px solid var(--danger-border)", background: "var(--danger-soft)", color: "var(--danger-text)", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>Delete</button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   PREVIEW MODAL
───────────────────────────────────────────────────────────── */
function PreviewModal({ post, close }) {
  if (!post) return null;
  return (
    <div className="lm-backdrop" onClick={close} style={{ zIndex: 1010 }}>
      <div className="lm-anim-si" onClick={(e) => e.stopPropagation()} style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 18, width: "100%", maxWidth: 720, margin: 16, boxShadow: "var(--shadow)", overflow: "hidden", maxHeight: "90vh", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "15px 20px", borderBottom: "1px solid var(--border-sub)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontWeight: 800, fontSize: 15 }}>Blog Preview</span>
          <button onClick={close} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", fontSize: 18 }}>✕</button>
        </div>
        <div style={{ overflowY: "auto", padding: "22px 24px" }}>
          {post.coverImage?.url && <img src={post.coverImage.url} alt={post.title} style={{ width: "100%", maxHeight: 280, objectFit: "cover", borderRadius: 12, marginBottom: 16 }} />}
          <h1 style={{ margin: "0 0 8px", fontSize: 22, fontWeight: 800, lineHeight: 1.3 }}>{post.title}</h1>
          <p style={{ margin: "0 0 14px", fontSize: 12, color: "var(--text-muted)" }}>
            {post.author?.name || "Admin"} · {post.publishedAt ? new Date(post.publishedAt).toDateString() : "Draft"} · /blog/{post.slug}
          </p>
          {post.excerpt && <p style={{ margin: "0 0 14px", fontSize: 13, color: "var(--text-sec)", fontStyle: "italic" }}>{post.excerpt}</p>}
          <div className="lm-editor" style={{ fontSize: 14, color: "var(--text-primary)" }} dangerouslySetInnerHTML={{ __html: post.content || "<p><em>No content yet.</em></p>" }} />
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   ROOT PAGE
───────────────────────────────────────────────────────────── */
export default function Blog() {
  const [tab, setTab] = useState("posts");
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editT, setEditT] = useState(null);
  const [delT, setDelT] = useState(null);
  const [viewT, setViewT] = useState(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const r = await apiFetch(`${API_URL}/blog-posts/admin/posts`);
      const d = await r.json();
      setPosts(d.data || []);
    } catch { toast("Failed to load blogs", "error"); }
    finally { setLoading(false); }
  }, []);

  const loadComments = useCallback(async () => {
    try {
      const r = await apiFetch(`${API_URL}/blog-comments`);
      const d = await r.json();
      setComments(d.data || []);
    } catch { toast("Failed to load comments", "error"); }
  }, []);

  useEffect(() => { load(); }, [load]);
  useEffect(() => { if (tab === "comments") loadComments(); }, [tab, loadComments]);

  const doDelete = async (item) => {
    const url = item.title !== undefined
      ? `${API_URL}/blog-posts/${item._id}`
      : `${API_URL}/blog-comments/${item._id}`;
    try {
      await apiFetch(url, { method: "DELETE" });
      toast("Deleted successfully"); setDelT(null);
      if (item.title !== undefined) load(); else loadComments();
    } catch { toast("Delete failed", "error"); }
  };

  const changeStatus = async (comment, status) => {
    try {
      await apiFetch(`${API_URL}/blog-comments/${comment._id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
      toast(status === "approved" ? "Comment approved" : `Marked as ${status}`);
      loadComments();
    } catch { toast("Update failed", "error"); }
  };

  return (
    <>
      <style>{STYLES}</style>
      <div className="lm-page p-8">
        <div style={{ marginBottom: 24 }}>
          <h1 className="lm-heading" style={{ fontSize: 22, fontWeight: 800 }}>Blog Management</h1>
          <p style={{ fontSize: 13, color: "var(--text-muted)" }}>Write, publish and manage blog posts shown on the website, plus moderate comments.</p>
        </div>

        <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
          <button className={`lm-tab ${tab === "posts" ? "active" : ""}`} onClick={() => setTab("posts")}
            style={{ padding: "8px 16px", borderRadius: 9, fontSize: 13, fontWeight: 700, border: "1px solid var(--border)", background: tab === "posts" ? "var(--accent-soft)" : "var(--bg-surface)", color: tab === "posts" ? "var(--accent-text)" : "var(--text-sec)", cursor: "pointer" }}>
            Posts ({posts.length})
          </button>
          <button className={`lm-tab ${tab === "comments" ? "active" : ""}`} onClick={() => setTab("comments")}
            style={{ padding: "8px 16px", borderRadius: 9, fontSize: 13, fontWeight: 700, border: "1px solid var(--border)", background: tab === "comments" ? "var(--accent-soft)" : "var(--bg-surface)", color: tab === "comments" ? "var(--accent-text)" : "var(--text-sec)", cursor: "pointer" }}>
            Comments ({comments.length})
          </button>
        </div>

        {tab === "posts" ? (
          <div className="institute-grid" style={{ display: "grid", gridTemplateColumns: "minmax(340px, 440px) 1fr", gap: 24, alignItems: "start" }}>
            <BlogForm editTarget={editT} onSuccess={load} clearEdit={() => setEditT(null)} />
            <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 16, overflow: "hidden" }}>
              <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--border-sub)", fontWeight: 700 }}>All Posts ({posts.length})</div>
              <BlogList posts={posts} loading={loading} onEdit={setEditT} onDel={setDelT} onView={setViewT} />
            </div>
          </div>
        ) : (
          <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 16, overflow: "hidden" }}>
            <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--border-sub)", fontWeight: 700 }}>All Comments ({comments.length})</div>
            <CommentsPanel comments={comments} loading={loading} onStatus={changeStatus} onDel={(c) => setDelT(c)} />
          </div>
        )}
      </div>
      {delT && <DelModal item={delT} close={() => setDelT(null)} confirm={doDelete} />}
      <PreviewModal post={viewT} close={() => setViewT(null)} />
      <Toasts />
    </>
  );
}