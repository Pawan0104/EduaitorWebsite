import { useState, useEffect, useRef, useCallback } from "react";

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

      const url = editTarget ? `${import.meta.env.VITE_API_URL}/awards/${editTarget._id}` : `${import.meta.env.VITE_API_URL}/awards`;
      const res = await fetch(url, { method: editTarget ? "PUT" : "POST", body: fd });
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
function AwardList({ awards, loading, onEdit, onDel, onToggle }) {
  if (loading) return <div style={{ padding: 40, textAlign: "center" }}><Spin s={20} /></div>;

  return (
    <div className="lm-list" style={{ overflowY: "auto", maxHeight: "calc(100vh - 220px)" }}>
      {awards.map((a, i) => (
        <div key={a._id} className="lm-row" style={{ display: "grid", gridTemplateColumns: "60px 1fr 80px 100px", padding: "12px 16px", alignItems: "center", borderBottom: "1px solid var(--border-sub)" }}>
          <img src={a.imageUrl} style={{ width: 45, height: 45, borderRadius: 8, objectFit: "cover" }} />
          <div>
            <p style={{ margin: 0, fontWeight: 600, fontSize: 13 }}>{a.title}</p>
            <p style={{ margin: 0, fontSize: 11, color: "var(--text-muted)" }}>{a.year}</p>
          </div>
          <Badge on={a.isActive} />
          <div style={{ display: "flex", gap: 5 }}>
            <IBtn onClick={() => onEdit(a)}>Edit</IBtn>
            <IBtn danger onClick={() => onDel(a)}>Del</IBtn>
          </div>
        </div>
      ))}
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

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const r = await fetch(`${import.meta.env.VITE_API_URL}/awards`);
      const d = await r.json();
      setAwards(d.awards || []);
    } catch { toast("Failed to load", "error"); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  const doDelete = async () => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/awards/${delT._id}`, { method: "DELETE" });
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

        <div className="institute-grid" style={{ display: "grid", gridTemplateColumns: "400px 1fr", gap: 24, alignItems: "start" }}>
          <AwardForm editTarget={editT} onSuccess={load} clearEdit={() => setEditT(null)} />
          
          <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 16, overflow: "hidden" }}>
            <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--border-sub)", fontWeight: 700 }}>Active Awards ({awards.length})</div>
            <AwardList awards={awards} loading={loading} onEdit={setEditT} onDel={setDelT} />
          </div>
        </div>
      </div>
      {delT && <DelModal logo={delT} close={() => setDelT(null)} confirm={doDelete} />}
      <Toasts />
    </>
  );
}