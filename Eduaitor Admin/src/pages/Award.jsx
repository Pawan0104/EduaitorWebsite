import { useState, useEffect, useRef, useCallback } from "react";
import { API_URL, apiFetch } from "../lib/api";

// --- PASTE ALL YOUR UTILITY COMPONENTS HERE (Spin, toast, Toasts, Badge, Toggle, IBtn, Fld, DropZone, IS, STYLES) ---
// Note: I am omitting the repeating utility code to keep this concise, 
// but you should keep them at the top of this file exactly as they are in Institute.jsx.
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
`;
/* ─────── Spinner ─────── */
const Spin = ({ s=16, c="var(--accent)" }) => (
  <svg className="lm-spinner" width={s} height={s} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke={c} strokeWidth="3" opacity=".2"/>
    <path d="M12 2a10 10 0 0110 10" stroke={c} strokeWidth="3" strokeLinecap="round"/>
  </svg>
);

/* ─────── Toast ─────── */
let _push = null;
const toast = (msg, type="success") => {
  if (!_push) return;
  const id = Date.now();
  _push(p => [...p, {id, msg, type}]);
  setTimeout(() => _push(p => p.filter(t => t.id !== id)), 3200);
};
function Toasts() {
  const [list, set] = useState([]); _push = set;
  return (
    <div style={{position:"fixed",bottom:24,right:24,zIndex:9999,display:"flex",flexDirection:"column",gap:8}}>
      {list.map(t => (
        <div key={t.id} className="lm-toast" style={{
          padding:"10px 16px",borderRadius:10,fontSize:13,fontWeight:600,
          boxShadow:"0 8px 28px rgba(0,0,0,0.4)",maxWidth:300,
          display:"flex",alignItems:"center",gap:8,
          background: t.type==="error"?"var(--danger-soft)":"var(--accent-soft)",
          border:`1px solid ${t.type==="error"?"var(--danger-border)":"var(--accent-border)"}`,
          color:   t.type==="error"?"var(--danger-text)":"var(--accent-text)",
        }}>
          <span style={{fontSize:15}}>{t.type==="error"?"❌":"✅"}</span>{t.msg}
        </div>
      ))}
    </div>
  );
}

/* ─────── Badge ─────── */
const Badge = ({on}) => (
  <span className={on?"lm-badge-on":"lm-badge-off"} style={{display:"inline-flex",alignItems:"center",gap:5,fontSize:11,fontWeight:700,letterSpacing:"0.04em",padding:"3px 9px",borderRadius:20}}>
    <span style={{width:5,height:5,borderRadius:"50%",background:"currentColor"}}/>
    {on?"Active":"Hidden"}
  </span>
);

/* ─────── Toggle ─────── */
const Toggle = ({v, on}) => (
  <button onClick={on} style={{background:"none",border:"none",cursor:"pointer",padding:0,lineHeight:1}}>
    <div className="lm-toggle-bg" style={{width:38,height:22,borderRadius:11,background:v?"var(--accent)":"var(--border)",position:"relative"}}>
      <div className="lm-toggle-thumb" style={{width:16,height:16,borderRadius:"50%",background:"#fff",position:"absolute",top:3,left:v?19:3,boxShadow:"0 1px 4px rgba(0,0,0,0.3)"}}/>
    </div>
  </button>
);

/* ─────── Icon button ─────── */
const IBtn = ({onClick, title, danger, children}) => (
  <button onClick={onClick} title={title}
    className={`lm-btn-icon${danger?" lm-btn-di":""}`}
    style={{background:"var(--bg-base)",border:`1px solid ${danger?"var(--danger-border)":"var(--border)"}`,color:danger?"var(--danger-text)":"var(--text-sec)",borderRadius:8,width:30,height:30,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",transition:"all 0.14s"}}>
    {children}
  </button>
);

/* ─────── Field wrapper ─────── */
const Fld = ({label, req, note, children}) => (
  <div style={{display:"flex",flexDirection:"column",gap:6}}>
    <label style={{fontSize:11,fontWeight:700,color:"var(--text-muted)",letterSpacing:"0.06em",textTransform:"uppercase"}}>
      {label}{req&&<span style={{color:"var(--danger-text)"}}> *</span>}
      {note&&<span style={{color:"var(--text-muted)",fontWeight:400,textTransform:"none",letterSpacing:0,marginLeft:5}}>{note}</span>}
    </label>
    {children}
  </div>
);

// 
const IS = { width:"100%",padding:"9px 13px",borderRadius:9,background:"var(--bg-base)",border:"1px solid var(--border)",color:"var(--text-primary)",fontSize:13,fontFamily:"'DM Sans',sans-serif",transition:"border-color 0.15s, box-shadow 0.15s" };

/* ─────────────────────────────────────────────────────────────────────────────
    AWARD VIEW MODAL
───────────────────────────────────────────────────────────────────────────── */
function AwardViewModal({ award, close }) {
  if (!award) return null;

  return (
    <div className="lm-backdrop" onClick={close} style={{ zIndex: 1000 }}>
      <div className="lm-anim-si" onClick={e => e.stopPropagation()} style={{
        background: "var(--bg-surface)", border: "1px solid var(--border)",
        borderRadius: 18, width: "100%", maxWidth: 440,
        margin: 16, boxShadow: "var(--shadow)", overflow: "hidden",
      }}>
        {/* Header */}
        <div style={{ padding: "15px 20px", borderBottom: "1px solid var(--border-sub)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span className="lm-heading" style={{ fontWeight: 800, fontSize: 15, color: "var(--text-primary)" }}>
            Award Details
          </span>
          <button onClick={close} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", fontSize: 18 }}>✕</button>
        </div>

        {/* Hero Image Section */}
        <div style={{ background: "var(--bg-base)", padding: "20px", textAlign: "center", borderBottom: "1px solid var(--border-sub)" }}>
          <img 
            src={award.imageUrl} 
            alt={award.title} 
            style={{ width: "100%", maxHeight: 200, borderRadius: 12, objectFit: "contain", background: "#fff", border: "1px solid var(--border)" }} 
          />
        </div>

        {/* Content Section */}
        <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 800, color: "var(--text-primary)" }}>{award.title}</div>
            <div style={{ fontSize: 13, color: "var(--accent)", fontWeight: 600, marginTop: 4 }}>Recognized in {award.year}</div>
          </div>

          {award.description && (
            <div style={{ fontSize: 13, color: "var(--text-sec)", lineHeight: 1.6, background: "var(--bg-elevated)", padding: "12px 14px", borderRadius: 10, borderLeft: "3px solid var(--accent)" }}>
              {award.description}
            </div>
          )}

          {/* Meta Information */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 10, borderTop: "1px dashed var(--border)" }}>
            <div style={{ display: "flex", gap: 15 }}>
               <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
                  Order: <b style={{ color: "var(--text-primary)" }}>{award.order}</b>
               </div>
               <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
                  Visibility: <Badge on={award.isActive} />
               </div>
            </div>
            
            {/* Copy Link Button */}
            <button
              onClick={() => { navigator.clipboard.writeText(award.imageUrl); toast("Image Link copied!"); }}
              style={{ background: "var(--bg-base)", border: "1px solid var(--border)", borderRadius: 6, padding: "5px 10px", fontSize: 11, cursor: "pointer", color: "var(--text-sec)" }}
            >
              Copy Image URL
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   DROP ZONE
───────────────────────────────────────────────────────────────────────────── */
function DropZone({ preview, onChange }) {
  const ref = useRef();
  const [drag, setDrag] = useState(false);
  const handle = f => {
    if (!f?.type.startsWith("image/")) { toast("Only images allowed","error"); return; }
    if (f.size > 5*1024*1024)          { toast("Max 5 MB","error"); return; }
    onChange(f, URL.createObjectURL(f));
  };
  return (
    <div className="lm-drop lm-ic" onClick={()=>ref.current?.click()}
      onDragOver={e=>{e.preventDefault();setDrag(true)}} onDragLeave={()=>setDrag(false)}
      onDrop={e=>{e.preventDefault();setDrag(false);handle(e.dataTransfer.files[0])}}
      style={{border:`2px dashed ${drag?"var(--accent)":"var(--border)"}`,borderRadius:12,background:drag?"var(--accent-soft)":"var(--bg-base)",cursor:"pointer",transition:"all 0.15s",minHeight:126,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:8,overflow:"hidden"}}>
      {preview ? (
        <>
          <img src={preview} alt="" style={{maxHeight:110,maxWidth:"100%",objectFit:"contain",padding:"10px 16px"}}/>
          <div className="lm-ic-ov"><span style={{color:"#fff",fontSize:11,fontWeight:700,letterSpacing:"0.05em",background:"rgba(0,0,0,0.45)",padding:"4px 11px",borderRadius:6}}>CHANGE IMAGE</span></div>
        </>
      ) : (
        <>
          <div style={{width:42,height:42,borderRadius:10,background:"var(--bg-elevated)",display:"flex",alignItems:"center",justifyContent:"center"}}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.6"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
          </div>
          <div style={{textAlign:"center"}}>
            <p style={{margin:0,fontSize:13,color:"var(--text-sec)",fontWeight:500}}>Drop image or <span style={{color:"var(--accent-text)"}}>browse</span></p>
            <p style={{margin:"3px 0 0",fontSize:11,color:"var(--text-muted)"}}>PNG · SVG · WebP — max 5 MB</p>
          </div>
        </>
      )}
      <input ref={ref} type="file" accept="image/*" style={{display:"none"}} onChange={e=>handle(e.target.files[0])}/>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   ADD / EDIT FORM (Left Panel)
───────────────────────────────────────────────────────────────────────────── */
function AwardForm({ editTarget, onSuccess, clearEdit }) {
  const EMPTY = { title: "", year: "", description: "", isActive: true, order: 0 };
  const [form, setForm] = useState(EMPTY);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (editTarget) {
      setForm({ title: editTarget.title, year: editTarget.year, description: editTarget.description, isActive: editTarget.isActive, order: editTarget.order });
      setPreview(editTarget.imageUrl); setFile(null);
    } else {
      setForm(EMPTY); setPreview(""); setFile(null);
    }
  }, [editTarget]);

  const reset = () => { setForm(EMPTY); setPreview(""); setFile(null); clearEdit(); };

  const submit = async () => {
    if (!form.title.trim()) { toast("Title is required", "error"); return; }
    if (!editTarget && !file) { toast("Image is required", "error"); return; }
    
    setSaving(true);
    try {
      const fd = new FormData();
      fd.append("title", form.title.trim());
      fd.append("year", form.year.trim());
      fd.append("description", form.description.trim());
      fd.append("isActive", String(form.isActive));
      fd.append("order", String(form.order));
      if (file) fd.append("image", file);

      const url = editTarget ? `${API_URL}/awards/${editTarget._id}` : `${API_URL}/awards`;
      const res = await apiFetch(url, { method: editTarget ? "PUT" : "POST", body: fd });
      if (!res.ok) throw new Error();
      
      toast(editTarget ? "Award updated!" : "Award added!");
      reset(); onSuccess();
    } catch (e) { toast("Operation failed", "error"); }
    finally { setSaving(false); }
  };

  return (
    <div className="logo-form" style={{background:"var(--bg-surface)", border:"1px solid var(--border)", borderRadius:16, padding:22, display:"flex", flexDirection:"column", gap:16, position:"sticky", top:24}}>
      <h2 className="lm-heading" style={{fontSize:16, fontWeight:800}}>{editTarget ? "Edit Award" : "Add New Award"}</h2>
      
      <Fld label="Award Photo" req={!editTarget}>
        <DropZone preview={preview} onChange={(f, u) => { setFile(f); setPreview(u); }} />
      </Fld>

      <Fld label="Award Title" req>
        <input className="lm-input" style={IS} placeholder="e.g. Best Innovator" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
      </Fld>

      <Fld label="Year/Date">
        <input className="lm-input" style={IS} placeholder="e.g. 2024" value={form.year} onChange={e => setForm({ ...form, year: e.target.value })} />
      </Fld>

      <Fld label="Description">
        <textarea className="lm-input" style={{ ...IS, height: 80, resize: "none" }} placeholder="Brief description..." value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
      </Fld>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <Fld label="Order"><input className="lm-input" type="number" style={IS} value={form.order} onChange={e => setForm({ ...form, order: Number(e.target.value) })} /></Fld>
        <Fld label="Visibility">
          <div style={{ display: "flex", alignItems: "center", gap: 10, height: 39, padding: "0 12px", background: "var(--bg-base)", border: "1px solid var(--border)", borderRadius: 9 }}>
            <Toggle v={form.isActive} on={() => setForm({ ...form, isActive: !form.isActive })} />
            <span style={{ fontSize: 12 }}>{form.isActive ? "Visible" : "Hidden"}</span>
          </div>
        </Fld>
      </div>

      <button onClick={submit} disabled={saving} className="lm-btn-primary" style={{ width: "100%", padding: "12px", borderRadius: 10, background: "var(--accent)", color: "#fff", border: "none", fontWeight: 700, cursor: "pointer" }}>
        {saving ? <Spin s={15} c="#fff" /> : editTarget ? "Update Award" : "Add Award"}
      </button>
      {editTarget && <button onClick={reset} style={{ background: "none", border: "none", color: "var(--text-muted)", fontSize: 12, cursor: "pointer" }}>Cancel Edit</button>}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   AWARD LIST (Right Panel)
───────────────────────────────────────────────────────────────────────────── */
function AwardList({ awards, loading, onEdit, onDel,onView }) {
  if (loading) return <div style={{ padding: 40, textAlign: "center" }}><Spin s={20} /></div>;

  return (
    <div className="lm-list" style={{ overflowY: "auto", maxHeight: "calc(100vh - 220px)" }}>
      {awards.map((a) => (
        <div 
          key={a._id} 
          className="lm-row" 
          style={{ 
            display: "flex", 
            flexWrap: "wrap",      /* Allows wrapping on very small screens */
            gap: 16,               /* Increased global gap */
            padding: "16px 20px",  /* More breathing room */
            alignItems: "center", 
            borderBottom: "1px solid var(--border-sub)" 
          }}
        >
          {/* Left Section: Image and Info */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, flex: 1, minWidth: "200px" }}>
            <img 
              src={a.imageUrl} 
              style={{ width: 48, height: 48, borderRadius: 10, objectFit: "cover", flexShrink: 0 }} 
            />
            <div style={{ minWidth: 0 }}> {/* minWidth 0 allows text truncation if needed */}
              <p style={{ margin: "0 0 2px 0", fontWeight: 600, fontSize: 14, lineHeight: 1.2 }}>{a.title}</p>
              <p style={{ margin: 0, fontSize: 12, color: "var(--text-muted)" }}>{a.year}</p>
            </div>
          </div>

          {/* Right Section: Status and Actions */}
          <div style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: 16,               /* Spacing between Badge and Buttons */
            justifyContent: "flex-end",
            marginLeft: "auto"     /* Pushes this group to the right */
          }}>
            <Badge on={a.isActive} />
            
            <div style={{ display: "flex", gap: 8 }}> {/* Increased gap between Edit and Del */}
              <IBtn title="View details" onClick={() => onView(a)}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
              </IBtn>

              <IBtn 
                onClick={() => onEdit(a)} 
                style={{ padding: "6px 12px" }} /* Larger touch target */
              >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--accent-text)" strokeWidth="2">
                  <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" strokeLinecap="round" />
                  <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" strokeLinecap="round" />
                </svg>
              </IBtn>
             <IBtn 
  danger 
  onClick={() => onDel(a)} 
  style={{ padding: "6px 10px" }}
  title="Delete Award"
>
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14H6L5 6M10 11v6M14 11v6M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
  </svg>
</IBtn>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   DELETE CONFIRMATION MODAL
───────────────────────────────────────────────────────────────────────────── */
function DelModal({ item, close, confirm }) {
  if (!item) return null;

  return (
    <div className="lm-backdrop" onClick={close} style={{ zIndex: 1100 }}>
      <div className="lm-anim-si" onClick={e => e.stopPropagation()} style={{
        background: "var(--bg-surface)", border: "1px solid var(--border)",
        borderRadius: 16, maxWidth: 380, width: "100%", margin: 16,
        boxShadow: "var(--shadow)", padding: 24,
      }}>
        {/* Icon & Title Row */}
        <div style={{ display: "flex", alignItems: "center", gap: 13, marginBottom: 14 }}>
          <div style={{ 
            width: 40, height: 40, borderRadius: 10, 
            background: "var(--danger-soft)", border: "1px solid var(--danger-border)", 
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--danger-text)" strokeWidth="2">
              <polyline points="3 6 5 6 21 6" strokeLinecap="round" />
              <path d="M19 6l-1 14H6L5 6M10 11v6M14 11v6M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <p className="lm-heading" style={{ margin: 0, fontWeight: 800, fontSize: 15, color: "var(--text-primary)" }}>Delete Award</p>
            <p style={{ margin: "2px 0 0", fontSize: 11, color: "var(--text-muted)" }}>This will permanently remove the record.</p>
          </div>
        </div>

        {/* Message */}
        <p style={{ margin: "0 0 18px", fontSize: 13, color: "var(--text-sec)", lineHeight: 1.7 }}>
          Are you sure you want to delete <strong style={{ color: "var(--text-primary)" }}>{item.title}</strong>? This action cannot be undone.
        </p>

        {/* Buttons */}
        <div style={{ display: "flex", gap: 10 }}>
          <button 
            onClick={close} 
            style={{ flex: 1, padding: "10px 0", borderRadius: 9, border: "1px solid var(--border)", background: "var(--bg-base)", color: "var(--text-sec)", fontWeight: 600, fontSize: 13, cursor: "pointer" }}
          >
            Cancel
          </button>
          <button 
            onClick={() => confirm(item._id)} 
            style={{ flex: 1, padding: "10px 0", borderRadius: 9, border: "1px solid var(--danger-border)", background: "var(--danger-soft)", color: "var(--danger-text)", fontWeight: 700, fontSize: 13, cursor: "pointer" }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
/* ─────────────────────────────────────────────────────────────────────────────
   ROOT PAGE
───────────────────────────────────────────────────────────────────────────── */
export default function Award() {
  const [awards, setAwards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editT, setEditT] = useState(null);
  const [delT, setDelT] = useState(null);
  const [viewT, setViewT] = useState(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const r = await apiFetch(`${API_URL}/awards`);
      const d = await r.json();
      setAwards(d.awards || []);
    } catch { toast("Failed to load", "error"); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  const doDelete = async () => {
    try {
      await apiFetch(`${API_URL}/awards/${delT._id}`, { method: "DELETE" });
      toast("Deleted successfully"); setDelT(null); load();
    } catch { toast("Delete failed", "error"); }
  };

  return (
    <>
      <style>{STYLES}</style>
      <div className="lm-page p-8">
        <div style={{ marginBottom: 26 }}>
          <h1 className="lm-heading" style={{ fontSize: 22, fontWeight: 800 }}>Manage Awards & Achievements</h1>
          <p style={{ fontSize: 13, color: "var(--text-muted)" }}>Manage the items appearing in the Awards section of the frontend.</p>
        </div>

        <div className="institute-grid" style={{ display: "grid", gridTemplateColumns: "autofit", gap: 24, alignItems: "start" }}>
          <AwardForm editTarget={editT} onSuccess={load} clearEdit={() => setEditT(null)} />
          
          <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 16, overflow: "hidden" }}>
            <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--border-sub)", fontWeight: 700 }}>Active Awards ({awards.length})</div>
            <AwardList awards={awards} loading={loading} onEdit={setEditT} onDel={setDelT}  onView={setViewT}/>
          </div>
        </div>
      </div>
   {delT && (
  <DelModal 
    item={delT} 
    close={() => setDelT(null)} 
    confirm={() => doDelete(delT._id)} 
  />
)}
        <AwardViewModal award={viewT} close={() => setViewT(null)} />
      <Toasts />
    </>
  );
}