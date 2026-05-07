import { useState, useEffect, useRef, useCallback } from "react";

/* ─────────────────────────────────────────────────────────────────────────────
   STYLES
───────────────────────────────────────────────────────────────────────────── */
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
   VIEW MODAL
───────────────────────────────────────────────────────────────────────────── */
function ViewModal({logo, close}) {
  if (!logo) return null;
  return (
    <div className="lm-backdrop" onClick={close}>
      <div className="lm-anim-si" onClick={e=>e.stopPropagation()} style={{background:"var(--bg-surface)",border:"1px solid var(--border)",borderRadius:18,width:"100%",maxWidth:420,margin:16,boxShadow:"var(--shadow)",overflow:"hidden"}}>
        <div style={{padding:"15px 20px",borderBottom:"1px solid var(--border-sub)",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <span className="lm-heading" style={{fontWeight:800,fontSize:15,color:"var(--text-primary)"}}>Logo Details</span>
          <button onClick={close} style={{background:"none",border:"none",cursor:"pointer",color:"var(--text-muted)",padding:4}}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" strokeLinecap="round"/></svg>
          </button>
        </div>
        {/* image preview */}
        <div style={{background:"var(--bg-base)",padding:"28px 32px",display:"flex",alignItems:"center",justifyContent:"center",minHeight:150,backgroundImage:"radial-gradient(var(--border-sub) 1px, transparent 1px)",backgroundSize:"18px 18px"}}>
          <img src={logo.imageUrl} alt={logo.altText} style={{maxWidth:"100%",maxHeight:130,objectFit:"contain"}}/>
        </div>
        {/* meta */}
        <div style={{padding:"16px 20px",display:"flex",flexDirection:"column",gap:10}}>
          {[["Institution",logo.label],["Alt Text",logo.altText||"—"],["Status",logo.isActive?"Active":"Hidden"],["Display Order",`#${logo.order}`],["Added",new Date(logo.createdAt).toLocaleDateString("en-IN",{day:"numeric",month:"long",year:"numeric"})]].map(([k,v])=>(
            <div key={k} style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{fontSize:12,color:"var(--text-muted)",fontWeight:500}}>{k}</span>
              <span style={{fontSize:13,color:"var(--text-primary)",fontWeight:600,maxWidth:220,textAlign:"right"}}>{v}</span>
            </div>
          ))}
          {/* copy URL */}
          <div style={{marginTop:4,background:"var(--bg-base)",borderRadius:8,padding:"7px 11px",display:"flex",alignItems:"center",gap:8}}>
            <span style={{fontSize:10,color:"var(--text-muted)",flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{logo.imageUrl}</span>
            <button onClick={()=>{navigator.clipboard.writeText(logo.imageUrl);toast("URL copied!");}} style={{background:"var(--accent-soft)",border:"1px solid var(--accent-border)",borderRadius:6,padding:"3px 9px",fontSize:11,fontWeight:600,color:"var(--accent-text)",cursor:"pointer",whiteSpace:"nowrap"}}>Copy</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   DELETE MODAL
───────────────────────────────────────────────────────────────────────────── */
function DelModal({logo, close, confirm}) {
  if (!logo) return null;
  return (
    <div className="lm-backdrop" onClick={close}>
      <div className="lm-anim-si" onClick={e=>e.stopPropagation()} style={{background:"var(--bg-surface)",border:"1px solid var(--border)",borderRadius:16,maxWidth:380,width:"100%",margin:16,boxShadow:"var(--shadow)",padding:24}}>
        <div style={{display:"flex",alignItems:"center",gap:13,marginBottom:14}}>
          <div style={{width:40,height:40,borderRadius:10,background:"var(--danger-soft)",border:"1px solid var(--danger-border)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--danger-text)" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6M10 11v6M14 11v6M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" strokeLinecap="round"/></svg>
          </div>
          <div>
            <p className="lm-heading" style={{margin:0,fontWeight:800,fontSize:15,color:"var(--text-primary)"}}>Delete Logo</p>
            <p style={{margin:"2px 0 0",fontSize:11,color:"var(--text-muted)"}}>Also removes from Cloudinary</p>
          </div>
        </div>
        <p style={{margin:"0 0 18px",fontSize:13,color:"var(--text-sec)",lineHeight:1.7}}>
          Delete <strong style={{color:"var(--text-primary)"}}>{logo.label}</strong>? This cannot be undone.
        </p>
        <div style={{display:"flex",gap:10}}>
          <button onClick={close} style={{flex:1,padding:"9px 0",borderRadius:9,border:"1px solid var(--border)",background:"var(--bg-base)",color:"var(--text-sec)",fontWeight:600,fontSize:13,cursor:"pointer"}}>Cancel</button>
          <button onClick={confirm} style={{flex:1,padding:"9px 0",borderRadius:9,border:"1px solid var(--danger-border)",background:"var(--danger-soft)",color:"var(--danger-text)",fontWeight:700,fontSize:13,cursor:"pointer"}}>Delete</button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   INPUT style helper
───────────────────────────────────────────────────────────────────────────── */
const IS = { width:"100%",padding:"9px 13px",borderRadius:9,background:"var(--bg-base)",border:"1px solid var(--border)",color:"var(--text-primary)",fontSize:13,fontFamily:"'DM Sans',sans-serif",transition:"border-color 0.15s, box-shadow 0.15s" };

/* ─────────────────────────────────────────────────────────────────────────────
   ADD / EDIT FORM  (left sticky panel)
───────────────────────────────────────────────────────────────────────────── */
function LogoForm({ editTarget, onSuccess, clearEdit }) {
  const EMPTY = { label:"", altText:"", isActive:true, order:0 };
  const [form,    setForm]    = useState(EMPTY);
  const [file,    setFile]    = useState(null);
  const [preview, setPreview] = useState("");
  const [saving,  setSaving]  = useState(false);

  useEffect(() => {
    if (editTarget) {
      setForm({ label:editTarget.label, altText:editTarget.altText, isActive:editTarget.isActive, order:editTarget.order });
      setPreview(editTarget.imageUrl); setFile(null);
    } else {
      setForm(EMPTY); setPreview(""); setFile(null);
    }
  }, [editTarget]);

  const reset = () => { setForm(EMPTY); setPreview(""); setFile(null); clearEdit(); };

  const submit = async () => {
    if (!form.label.trim())       { toast("Institution name is required","error"); return; }
    if (!editTarget && !file)     { toast("Please select an image","error");       return; }
    setSaving(true);
    try {
      const fd = new FormData();
      fd.append("label",    form.label.trim());
      fd.append("altText",  form.altText.trim());
      fd.append("isActive", String(form.isActive));
      fd.append("order",    String(form.order));
      if (file) fd.append("image", file);
      const url    = editTarget ? `${import.meta.env.VITE_API_URL}/logos/${editTarget._id}` : `${import.meta.env.VITE_API_URL}/logos`;
      const method = editTarget ? "PUT" : "POST";
      const res    = await fetch(url, {method, body:fd});
      const data   = await res.json();
      if (!res.ok) throw new Error(data.message||"Failed");
      toast(editTarget ? "Logo updated! 🎉" : "Logo added! 🎉");
      reset(); onSuccess();
    } catch(e) { toast(e.message||"Something went wrong","error"); }
    finally    { setSaving(false); }
  };

  const isEdit = !!editTarget;


  return (
    <div className="logo-form" style={{background:"var(--bg-surface)",border:"1px solid var(--border)",borderRadius:16,padding:22,display:"flex",flexDirection:"column",gap:16,position:"sticky",top:24}}>

      {/* header */}
      <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between"}}>
        <div>
          <h2 className="lm-heading" style={{margin:0,fontSize:16,fontWeight:800,color:"var(--text-primary)",letterSpacing:"-0.02em"}}>
            {isEdit ? "Edit Logo" : "Add New Logo"}
          </h2>
          <p style={{margin:"3px 0 0",fontSize:12,color:"var(--text-muted)"}}>
            {isEdit ? `Editing: ${editTarget.label}` : "Upload a logo and fill in details"}
          </p>
        </div>
        {isEdit && (
          <button onClick={reset} style={{background:"var(--bg-base)",border:"1px solid var(--border)",borderRadius:8,padding:"5px 11px",fontSize:12,color:"var(--text-muted)",cursor:"pointer",fontWeight:500,marginTop:2}}>✕ Cancel</button>
        )}
      </div>

      {/* edit hint */}
      {isEdit && (
        <div style={{background:"var(--accent-soft)",border:"1px solid var(--accent-border)",borderRadius:8,padding:"8px 12px",fontSize:12,color:"var(--accent-text)",display:"flex",gap:7,alignItems:"center"}}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01" strokeLinecap="round"/></svg>
          Leave image blank to keep the existing one.
        </div>
      )}

      {/* drop zone */}
      <Fld label="Logo Image" req={!isEdit}>
        <DropZone preview={preview} onChange={(f,u)=>{setFile(f);setPreview(u);}}/>
      </Fld>

      {/* institution name */}
      <Fld label="Institution Name" req>
        <input className="lm-input" style={IS} placeholder="e.g. IIT Bombay" value={form.label} onChange={e=>setForm({...form,label:e.target.value})}/>
      </Fld>

      {/* alt text */}
      <Fld label="Alt Text" note="(accessibility)">
        <input className="lm-input" style={IS} placeholder="e.g. IIT Bombay logo" value={form.altText} onChange={e=>setForm({...form,altText:e.target.value})}/>
      </Fld>

      {/* order + visibility */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
        <Fld label="Display Order">
          <input className="lm-input" type="number" min={0} style={IS} value={form.order} onChange={e=>setForm({...form,order:Number(e.target.value)})}/>
        </Fld>
        <Fld label="Visibility">
          <div style={{display:"flex",alignItems:"center",gap:10,height:39,padding:"0 12px",background:"var(--bg-base)",border:"1px solid var(--border)",borderRadius:9}}>
            <Toggle v={form.isActive} on={()=>setForm({...form,isActive:!form.isActive})}/>
            <span style={{fontSize:12,color:form.isActive?"var(--text-primary)":"var(--text-muted)",fontWeight:500}}>
              {form.isActive?"Visible":"Hidden"}
            </span>
          </div>
        </Fld>
      </div>

      {/* submit */}
      <button onClick={submit} disabled={saving} style={{width:"100%",padding:"11px 0",borderRadius:10,background:saving?"var(--accent-soft)":"var(--accent)",border:`1px solid ${saving?"var(--accent-border)":"transparent"}`,color:saving?"var(--accent-text)":"#fff",fontWeight:700,fontSize:14,cursor:saving?"not-allowed":"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8,fontFamily:"'Syne',sans-serif",letterSpacing:"-0.01em",transition:"all 0.15s"}}>
        {saving ? <><Spin s={15} c="var(--accent-text)"/>Saving…</> : isEdit ? "💾  Save Changes" : "+ Add Logo"}
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   LOGO LIST  (right panel)
───────────────────────────────────────────────────────────────────────────── */
function LogoList({logos, loading, onEdit, onDel, onToggle, onView}) {
  if (loading) return (
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:180,gap:10,color:"var(--text-muted)",fontSize:13}}>
      <Spin s={18}/>Loading…
    </div>
  );

  if (!logos.length) return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:14,padding:"52px 24px"}}>
      <div style={{width:50,height:50,borderRadius:12,background:"var(--accent-soft)",display:"flex",alignItems:"center",justifyContent:"center"}}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
      </div>
      <div style={{textAlign:"center"}}>
        <p className="lm-heading" style={{margin:0,fontWeight:800,fontSize:15,color:"var(--text-primary)"}}>No logos yet</p>
        <p style={{margin:"4px 0 0",fontSize:12,color:"var(--text-muted)"}}>Add your first institution logo using the form</p>
      </div>
    </div>
  );

  return (
    <div className="lm-list" style={{overflowY:"auto",maxHeight:"calc(100vh - 220px)"}}>
      {/* col headers */}
      <div style={{display:"grid",gridTemplateColumns:"48px 1fr 70px 80px 110px",padding:"8px 16px",gap:10,borderBottom:"1px solid var(--border-sub)",position:"sticky",top:0,background:"var(--bg-surface)",zIndex:1}}>
        {["Logo","Institution","Order","Status","Actions"].map(h=>(
          <span key={h} style={{fontSize:10,fontWeight:700,color:"var(--text-muted)",letterSpacing:"0.07em",textTransform:"uppercase"}}>{h}</span>
        ))}
      </div>

      {logos.map((logo,i) => (
        <div key={logo._id} className="lm-row lm-anim-fi" style={{display:"grid",gridTemplateColumns:"48px 1fr 70px 80px 110px",padding:"10px 16px",gap:10,alignItems:"center",borderBottom:i<logos.length-1?"1px solid var(--border-sub)":"none",animationDelay:`${i*0.04}s`}}>

          {/* thumb */}
          <div className="lm-ic" onClick={()=>onView(logo)} style={{width:40,height:40,borderRadius:8,background:"var(--bg-elevated)",border:"1px solid var(--border)",overflow:"hidden",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>
            <img src={logo.imageUrl} alt={logo.altText} style={{width:"100%",height:"100%",objectFit:"contain",padding:3}}/>
            <div className="lm-ic-ov" style={{borderRadius:8}}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            </div>
          </div>

          {/* label */}
          <div style={{minWidth:0}}>
            <p style={{margin:0,fontSize:13,fontWeight:600,color:"var(--text-primary)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{logo.label}</p>
            <p style={{margin:"2px 0 0",fontSize:11,color:"var(--text-muted)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{logo.altText||<em>—</em>}</p>
          </div>

          {/* order */}
          <span style={{fontSize:12,color:"var(--text-muted)",fontWeight:600}}>#{logo.order}</span>

          {/* status */}
          <Badge on={logo.isActive}/>

          {/* actions */}
          <div style={{display:"flex",gap:4}}>
            <IBtn title="View" onClick={()=>onView(logo)}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            </IBtn>
            <IBtn title={logo.isActive?"Hide":"Show"} onClick={()=>onToggle(logo)}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {logo.isActive
                  ?<><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22" strokeLinecap="round"/></>
                  :<><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>}
              </svg>
            </IBtn>
            <IBtn title="Edit" onClick={()=>onEdit(logo)}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--accent-text)" strokeWidth="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" strokeLinecap="round"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" strokeLinecap="round"/></svg>
            </IBtn>
            <IBtn title="Delete" danger onClick={()=>onDel(logo)}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6" strokeLinecap="round"/><path d="M19 6l-1 14H6L5 6M10 11v6M14 11v6M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" strokeLinecap="round"/></svg>
            </IBtn>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   ROOT PAGE
───────────────────────────────────────────────────────────────────────────── */
export default function Institute() {
  const [logos,  setLogos]  = useState([]);
  const [loading,setLoading]= useState(true);
  const [editT,  setEditT]  = useState(null);
  const [viewT,  setViewT]  = useState(null);
  const [delT,   setDelT]   = useState(null);

  const load = useCallback(async () => {
    try { setLoading(true); const r=await fetch(`${import.meta.env.VITE_API_URL}/logos`); const d=await r.json(); setLogos(d.logos||[]); }
    catch { toast("Failed to load","error"); } finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  const doToggle = async (logo) => {
    try {
      const fd=new FormData(); fd.append("isActive",String(!logo.isActive)); fd.append("label",logo.label); fd.append("altText",logo.altText); fd.append("order",String(logo.order));
      await fetch(`${import.meta.env.VITE_API_URL}/logos/${logo._id}`,{method:"PUT",body:fd});
      toast(logo.isActive?"Logo hidden":"Logo is now active"); load();
    } catch { toast("Update failed","error"); }
  };

  const doDelete = async () => {
    try { await fetch(`${import.meta.env.VITE_API_URL}/logos/${delT._id}`,{method:"DELETE"}); toast("Deleted"); setDelT(null); load(); }
    catch { toast("Delete failed","error"); }
  };

  const active = logos.filter(l=>l.isActive).length;

  return (
    <>
      <style>{STYLES}</style>
      <div className="lm-page p-8">

        {/* header */}
        <div style={{marginBottom:26}}>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:5, flexWrap:"wrap" }}>
            <div style={{width:32,height:32,borderRadius:8,background:"var(--accent-soft)",border:"1px solid var(--accent-border)",display:"flex",alignItems:"center",justifyContent:"center"}}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2"><rect x="3" y="3" width="18" height="14" rx="2"/><path d="M3 9h18M9 21l3-4 3 4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <h1 className="lm-heading" style={{margin:0,fontSize:21,fontWeight:800,color:"var(--text-primary)",letterSpacing:"-0.03em"}}>Institution Logos</h1>
          </div>
          <p style={{margin:0,fontSize:13,color:"var(--text-muted)"}}>
           Logos Detail · <strong style={{color:"var(--accent-text)"}}>{active}</strong> active of <strong style={{color:"var(--text-sec)"}}>{logos.length}</strong> total
          </p>
        </div>

        {/* two-column layout */}
        <div className="institute-grid">

          {/* ── LEFT: form ── */}
          <LogoForm editTarget={editT} onSuccess={load} clearEdit={()=>setEditT(null)}/>

          {/* ── RIGHT: list ── */}
          <div style={{background:"var(--bg-surface)",border:"1px solid var(--border)",borderRadius:16,overflow:"hidden"}}>
            <div style={{padding:"14px 18px",borderBottom:"1px solid var(--border-sub)",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <span className="lm-heading" style={{fontWeight:800,fontSize:15,color:"var(--text-primary)",letterSpacing:"-0.02em"}}>All Logos</span>
              <button onClick={load} className="lm-btn-ghost" style={{background:"var(--bg-base)",border:"1px solid var(--border)",borderRadius:8,padding:"6px 12px",fontSize:12,fontWeight:500,color:"var(--text-sec)",cursor:"pointer",display:"flex",alignItems:"center",gap:6,transition:"all 0.14s"}}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" strokeLinecap="round"/></svg>
                Refresh
              </button>
            </div>
            <LogoList logos={logos} loading={loading}
              onEdit={l=>{setEditT(l);window.scrollTo({top:0,behavior:"smooth"});}}
              onDel={setDelT} onToggle={doToggle} onView={setViewT}
            />
          </div>
        </div>
      </div>

      <ViewModal logo={viewT} close={()=>setViewT(null)}/>
      <DelModal  logo={delT}  close={()=>setDelT(null)} confirm={doDelete}/>
      <Toasts/>
    </>
  );
}