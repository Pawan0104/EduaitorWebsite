import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { API_URL, apiFetch } from "../lib/api";

const API = API_URL;

const CATEGORIES = ["observation", "memory", "logic", "pattern", "speed"];

const KIND_BY_CATEGORY = {
  observation: ["triangles", "count"],
  memory: ["memory"],
  logic: ["logic"],
  pattern: ["pattern"],
  speed: ["speed"],
};

const CATEGORY_META = {
  observation: { icon: "👀", label: "Observation" },
  memory: { icon: "🧠", label: "Memory" },
  logic: { icon: "⚙️", label: "Logic" },
  pattern: { icon: "🎯", label: "Pattern" },
  speed: { icon: "⚡", label: "Speed" },
};

const KIND_LABELS = {
  triangles: "Triangle Count",
  count: "Emoji Count",
  memory: "Memory Set",
  logic: "Number Sequence",
  pattern: "Letter Pattern",
  speed: "Fast Count",
};

const inputCls =
  "w-full bg-[var(--bg-base)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent)] transition-colors placeholder:text-[var(--text-muted)]";

const labelCls =
  "block text-[11px] font-bold tracking-widest uppercase text-[var(--text-muted)] mb-1.5";

function splitList(str) {
  return String(str || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function numList(str) {
  return splitList(str).map(Number);
}

function fillCfg(kind, existing) {
  const c = existing || {};
  switch (kind) {
    case "triangles":
      return { n: c.n ?? 4 };
    case "count":
      return {
        target: c.target ?? "🍕",
        count: c.count ?? 8,
        size: c.size ?? 6,
        decoys: (c.decoys || []).join(", "),
      };
    case "memory":
      return { set: (c.set || []).join(", "), pool: (c.pool || []).join(", ") };
    case "logic":
      return {
        seq: (c.seq || []).join(", "),
        answer: c.answer ?? "",
        traps: (c.traps || []).join(", "),
      };
    case "pattern":
      return {
        seq: (c.seq || []).join(", "),
        answer: c.answer ?? "",
        traps: (c.traps || []).join(", "),
      };
    case "speed":
      return { target: c.target ?? 7, size: c.size ?? 6 };
    default:
      return {};
  }
}

function buildConfig(kind, cfg) {
  switch (kind) {
    case "triangles":
      return { n: Number(cfg.n) };
    case "count":
      return {
        target: cfg.target,
        count: Number(cfg.count),
        size: Number(cfg.size),
        decoys: splitList(cfg.decoys),
      };
    case "memory": {
      const config = { set: splitList(cfg.set) };
      if (String(cfg.pool || "").trim()) config.pool = splitList(cfg.pool);
      return config;
    }
    case "logic":
      return { seq: numList(cfg.seq), answer: Number(cfg.answer), traps: numList(cfg.traps) };
    case "pattern":
      return { seq: splitList(cfg.seq), answer: cfg.answer, traps: splitList(cfg.traps) };
    case "speed":
      return { target: Number(cfg.target), size: Number(cfg.size) };
    default:
      return {};
  }
}

function previewQuestion(q) {
  const c = q.config || {};
  switch (q.kind) {
    case "triangles":
      return `Count triangles in a side-${c.n} figure`;
    case "count":
      return `Find ${c.target || "?"} × ${c.count}`;
    case "memory":
      return `Remember: ${(c.set || []).join(" ")}`;
    case "logic":
    case "pattern":
      return `${(c.seq || []).join(", ")} → ${c.answer}`;
    case "speed":
      return `Find the number ${c.target}, size ${c.size}×${c.size}`;
    default:
      return "";
  }
}

function emptyQuestion() {
  return {
    category: "observation",
    kind: "triangles",
    label: "",
    enabled: true,
    cfg: fillCfg("triangles", null),
  };
}

function Toast({ msg, type, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 3200);
    return () => clearTimeout(t);
  }, []);
  return (
    <div
      className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl font-bold text-sm text-white shadow-2xl"
      style={{
        background: type === "error" ? "#ef4444" : "#22c55e",
        animation: "slideUp 0.3s ease",
      }}
    >
      {msg}
    </div>
  );
}

function QuestionForm({ initial, onCancel, onSaved }) {
  const [form, setForm] = useState(initial || emptyQuestion());
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const set = (key, val) => setForm((p) => ({ ...p, [key]: val }));

  const changeCategory = (category) => {
    const kind = KIND_BY_CATEGORY[category][0];
    setForm((p) => ({ ...p, category, kind, cfg: fillCfg(kind, null) }));
  };

  const changeKind = (kind) => {
    setForm((p) => ({ ...p, kind, cfg: fillCfg(kind, null) }));
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    try {
      const payload = {
        category: form.category,
        kind: form.kind,
        label: form.label,
        enabled: form.enabled,
        config: buildConfig(form.kind, form.cfg),
      };
      const url = form._id
        ? `${API}/brain-league/admin/questions/${form._id}`
        : `${API}/brain-league/admin/questions`;
      const res = await apiFetch(url, {
        method: form._id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.message || "Save failed");
        return;
      }
      onSaved();
    } catch {
      setError("Network error");
    } finally {
      setSaving(false);
    }
  };

  const kind = form.kind;
  const cfg = form.cfg || {};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg max-h-[92vh] overflow-y-auto t-card rounded-2xl p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-base font-black t-text m-0">
            {form._id ? "Edit Question" : "Add Question"}
          </h3>
          <button
            onClick={onCancel}
            className="t-icon-btn"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {error && (
          <div className="mb-4 px-4 py-2.5 rounded-xl text-sm font-bold border border-[var(--danger-border)] bg-[var(--danger-soft)] text-[var(--danger-text)]">
            {error}
          </div>
        )}

        <div className="grid grid-cols-2 gap-x-4">
          <div className="mb-4" style={{ gridColumn: "1 / -1" }}>
            <span className={labelCls}>Category</span>
            <select
              className={inputCls}
              value={form.category}
              onChange={(e) => changeCategory(e.target.value)}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {CATEGORY_META[c].icon} {CATEGORY_META[c].label}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4" style={{ gridColumn: "1 / -1" }}>
            <span className={labelCls}>Question Type</span>
            <select className={inputCls} value={kind} onChange={(e) => changeKind(e.target.value)}>
              {(KIND_BY_CATEGORY[form.category] || []).map((k) => (
                <option key={k} value={k}>
                  {KIND_LABELS[k]}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-4">
          <span className={labelCls}>Label / Hint (optional, admin only)</span>
          <input
            className={inputCls}
            value={form.label || ""}
            onChange={(e) => set("label", e.target.value)}
            placeholder="e.g. Classic power series"
          />
        </div>

        {kind === "triangles" && (
          <div className="mb-4">
            <span className={labelCls}>Triangle figure side (n)</span>
            <input
              className={inputCls}
              type="number"
              min="2"
              max="7"
              value={cfg.n ?? ""}
              onChange={(e) => set("cfg", { ...cfg, n: e.target.value })}
            />
          </div>
        )}

        {kind === "count" && (
          <>
            <div className="grid grid-cols-2 gap-x-4">
              <div className="mb-4">
                <span className={labelCls}>Target emoji</span>
                <input
                  className={inputCls}
                  value={cfg.target ?? ""}
                  onChange={(e) => set("cfg", { ...cfg, target: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <span className={labelCls}>Count of target</span>
                <input
                  className={inputCls}
                  type="number"
                  min="1"
                  max="50"
                  value={cfg.count ?? ""}
                  onChange={(e) => set("cfg", { ...cfg, count: e.target.value })}
                />
              </div>
            </div>
            <div className="mb-4">
              <span className={labelCls}>Grid size</span>
              <input
                className={inputCls}
                type="number"
                min="4"
                max="8"
                value={cfg.size ?? ""}
                onChange={(e) => set("cfg", { ...cfg, size: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <span className={labelCls}>Decoy emojis (comma-separated)</span>
              <input
                className={inputCls}
                value={cfg.decoys ?? ""}
                onChange={(e) => set("cfg", { ...cfg, decoys: e.target.value })}
                placeholder="🍔, 🍟, 🌮, 🍩"
              />
            </div>
          </>
        )}

        {kind === "memory" && (
          <>
            <div className="mb-4">
              <span className={labelCls}>Memory set (4-8 emojis, comma-separated)</span>
              <input
                className={inputCls}
                value={cfg.set ?? ""}
                onChange={(e) => set("cfg", { ...cfg, set: e.target.value })}
                placeholder="🐶, 🍎, 🚲, 🌙, ⚽"
              />
            </div>
            <div className="mb-4">
              <span className={labelCls}>Decoy pool (comma-separated)</span>
              <input
                className={inputCls}
                value={cfg.pool ?? ""}
                onChange={(e) => set("cfg", { ...cfg, pool: e.target.value })}
                placeholder="Optional — emojis used as wrong options"
              />
            </div>
          </>
        )}

        {(kind === "logic" || kind === "pattern") && (
          <>
            <div className="mb-4">
              <span className={labelCls}>Sequence (comma-separated)</span>
              <input
                className={inputCls}
                value={cfg.seq ?? ""}
                onChange={(e) => set("cfg", { ...cfg, seq: e.target.value })}
                placeholder={kind === "logic" ? "2, 4, 8, 16" : "A, C, E, G"}
              />
            </div>
            <div className="grid grid-cols-2 gap-x-4">
              <div className="mb-4">
                <span className={labelCls}>Answer</span>
                <input
                  className={inputCls}
                  value={cfg.answer ?? ""}
                  onChange={(e) => set("cfg", { ...cfg, answer: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <span className={labelCls}>Wrong options (comma-separated)</span>
                <input
                  className={inputCls}
                  value={cfg.traps ?? ""}
                  onChange={(e) => set("cfg", { ...cfg, traps: e.target.value })}
                  placeholder="18, 24, 34"
                />
              </div>
            </div>
          </>
        )}

        {kind === "speed" && (
          <div className="grid grid-cols-2 gap-x-4">
            <div className="mb-4">
              <span className={labelCls}>Target number</span>
              <input
                className={inputCls}
                type="number"
                value={cfg.target ?? ""}
                onChange={(e) => set("cfg", { ...cfg, target: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <span className={labelCls}>Grid size</span>
              <input
                className={inputCls}
                type="number"
                min="4"
                max="8"
                value={cfg.size ?? ""}
                onChange={(e) => set("cfg", { ...cfg, size: e.target.value })}
              />
            </div>
          </div>
        )}

        <label className="flex items-center gap-3 mb-6 cursor-pointer">
          <input
            type="checkbox"
            checked={Boolean(form.enabled)}
            onChange={(e) => set("enabled", e.target.checked)}
            className="accent-[var(--accent)] w-4 h-4"
          />
          <span className="text-sm font-medium text-[var(--text-sec)]">
            Question is enabled (shown in the game)
          </span>
        </label>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-5 py-2.5 text-sm font-bold rounded-xl border border-[var(--border)] bg-[var(--bg-hover)] text-[var(--text-sec)] cursor-pointer hover:text-[var(--text-primary)] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2.5 text-sm font-bold rounded-xl text-white transition-opacity disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            style={{ background: "var(--accent)" }}
          >
            {saving ? "Saving…" : "Save Question"}
          </button>
        </div>
      </div>
    </div>
  );
}

function QuestionsTab() {
  const [questions, setQuestions] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [adding, setAdding] = useState(false);
  const [restoring, setRestoring] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = "success") => setToast({ msg, type });

  const load = async () => {
    setLoading(true);
    try {
      const res = await apiFetch(`${API}/brain-league/admin/questions`);
      if (!res.ok) throw new Error();
      setQuestions(await res.json());
    } catch {
      showToast("Failed to load questions", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const toggleEnabled = async (q) => {
    try {
      await apiFetch(`${API}/brain-league/admin/questions/${q._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category: q.category,
          kind: q.kind,
          label: q.label,
          enabled: !q.enabled,
          config: q.config,
        }),
      });
      load();
    } catch {
      showToast("Failed to update", "error");
    }
  };

  const removeQuestion = async (q) => {
    if (!window.confirm(`Delete this question?\n\n${previewQuestion(q)}`)) return;
    try {
      await apiFetch(`${API}/brain-league/admin/questions/${q._id}`, { method: "DELETE" });
      load();
    } catch {
      showToast("Failed to delete", "error");
    }
  };

  const restoreDefaults = async () => {
    if (!window.confirm("Replace the ENTIRE question bank with the original defaults? All custom questions will be removed.")) return;
    setRestoring(true);
    try {
      const defRes = await apiFetch(`${API}/brain-league/admin/bank/defaults`);
      if (!defRes.ok) throw new Error();
      const { questions: defaults } = await defRes.json();
      const res = await apiFetch(`${API}/brain-league/admin/bank`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questions: defaults }),
      });
      if (!res.ok) throw new Error();
      showToast(`Bank restored (${defaults.length} questions)`);
      load();
    } catch {
      showToast("Failed to restore defaults", "error");
    } finally {
      setRestoring(false);
    }
  };

  const counts = QUESTIONS_COUNTS(questions);

  const shown = filter === "all" ? questions : questions.filter((q) => q.category === filter);

  return (
    <div className="flex flex-col min-h-0 flex-1">
      <div className="flex items-center justify-between gap-3 flex-wrap mb-5">
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-xl text-xs font-bold border cursor-pointer transition-all ${
              filter === "all"
                ? "bg-[var(--accent-soft)] border-[var(--accent-border)] text-[var(--accent-text)]"
                : "bg-[var(--bg-elevated)] border-[var(--border)] text-[var(--text-sec)] hover:text-[var(--text-primary)]"
            }`}
          >
            All ({counts.all})
          </button>
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-4 py-2 rounded-xl text-xs font-bold border cursor-pointer transition-all ${
                filter === c
                  ? "bg-[var(--accent-soft)] border-[var(--accent-border)] text-[var(--accent-text)]"
                  : "bg-[var(--bg-elevated)] border-[var(--border)] text-[var(--text-sec)] hover:text-[var(--text-primary)]"
              }`}
            >
              {CATEGORY_META[c].icon} {CATEGORY_META[c].label} ({counts[c]})
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button
            onClick={restoreDefaults}
            disabled={restoring}
            className="px-4 py-2.5 text-xs font-bold rounded-xl border border-[var(--border)] bg-[var(--bg-hover)] text-[var(--text-sec)] cursor-pointer hover:text-[var(--text-primary)] transition-colors disabled:opacity-60"
          >
            {restoring ? "Restoring…" : "♻️ Restore Defaults"}
          </button>
          <button
            onClick={() => {
              const base = emptyQuestion();
              base.category = filter === "all" ? "observation" : filter;
              base.kind = KIND_BY_CATEGORY[base.category][0];
              base.cfg = fillCfg(base.kind, null);
              setAdding(true);
            }}
            className="px-4 py-2.5 text-xs font-bold rounded-xl text-white cursor-pointer disabled:opacity-60 transition-opacity"
            style={{ background: "var(--accent)" }}
          >
            + Add Question
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-24 text-[var(--text-muted)] text-sm">
          Loading questions…
        </div>
      ) : shown.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-[var(--border)] rounded-2xl text-[var(--text-muted)] text-sm">
          No questions in this category yet — click "+ Add Question".
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {shown.map((q, i) => (
            <div
              key={q._id}
              className="flex items-center gap-3 border border-[var(--border)] rounded-xl px-4 py-3 bg-[var(--bg-base)]"
            >
              <span className="text-xs font-bold text-[var(--text-muted)] w-8 flex-shrink-0">
                {i + 1}
              </span>
              <div className="flex flex-col min-w-0 flex-1">
                <span className="text-sm font-bold text-[var(--text-primary)]">
                  {KIND_LABELS[q.kind] || q.kind}
                  <span
                    className="ml-2 text-[10px] font-bold px-2 py-0.5 rounded-full border"
                    style={{
                      color: "var(--accent-text)",
                      borderColor: "var(--accent-border)",
                      background: "var(--accent-soft)",
                    }}
                  >
                    {CATEGORY_META[q.category]?.icon} {CATEGORY_META[q.category]?.label}
                  </span>
                </span>
                <span className="text-xs text-[var(--text-muted)] truncate">
                  {previewQuestion(q)}
                </span>
              </div>
              {!q.enabled && (
                <span className="text-[10px] font-bold px-2 py-1 rounded-full border border-[var(--border)] text-[var(--text-muted)] flex-shrink-0">
                  Hidden
                </span>
              )}
              <button
                onClick={() => toggleEnabled(q)}
                className={`flex-shrink-0 px-3 py-1.5 text-xs font-bold rounded-lg border cursor-pointer transition-colors ${
                  q.enabled
                    ? "border-[var(--danger-border)] bg-[var(--danger-soft)] text-[var(--danger-text)]"
                    : "border-[var(--accent-border)] bg-[var(--accent-soft)] text-[var(--accent-text)]"
                }`}
              >
                {q.enabled ? "Disable" : "Enable"}
              </button>
              <button
                onClick={() => setEditing(q)}
                className="flex-shrink-0 px-3 py-1.5 text-xs font-bold rounded-lg border border-[var(--border)] bg-[var(--bg-hover)] text-[var(--text-sec)] cursor-pointer hover:text-[var(--text-primary)] transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => removeQuestion(q)}
                className="flex-shrink-0 px-3 py-1.5 text-xs font-bold rounded-lg border border-[var(--danger-border)] bg-[var(--danger-soft)] text-[var(--danger-text)] cursor-pointer"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

      {(adding || editing) && (
        <QuestionForm
          initial={editing}
          onCancel={() => {
            setAdding(false);
            setEditing(null);
          }}
          onSaved={() => {
            setAdding(false);
            setEditing(null);
            showToast("Question saved!");
            load();
          }}
        />
      )}

      {toast && <Toast msg={toast.msg} type={toast.type} onDone={() => setToast(null)} />}
    </div>
  );
}

function QUESTIONS_COUNTS(questions) {
  const counts = { all: questions.length };
  CATEGORIES.forEach((c) => {
    counts[c] = questions.filter((q) => q.category === c).length;
  });
  return counts;
}

function BadgesTab() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);
  const [quizTitle, setQuizTitle] = useState("");
  const [shareMessage, setShareMessage] = useState("");
  const [badges, setBadges] = useState([]);

  const showToast = (msg, type = "success") => setToast({ msg, type });

  const load = async () => {
    setLoading(true);
    try {
      const res = await apiFetch(`${API}/brain-league/admin/settings`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      setQuizTitle(data.quizTitle || "EDUAITOR BRAIN LEAGUE");
      setShareMessage(data.shareMessage || "");
      setBadges(Array.isArray(data.badges) ? data.badges : []);
    } catch {
      showToast("Failed to load settings", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const updateBadge = (i, key, val) =>
    setBadges((list) => list.map((b, idx) => (idx === i ? { ...b, [key]: val } : b)));

  const save = async () => {
    setSaving(true);
    try {
      const res = await apiFetch(`${API}/brain-league/admin/settings`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quizTitle, shareMessage, badges }),
      });
      if (!res.ok) throw new Error();
      showToast("Settings saved!");
    } catch {
      showToast("Failed to save settings", "error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24 text-[var(--text-muted)] text-sm">
        Loading settings…
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 max-w-2xl">
      <div className="t-card rounded-2xl p-5">
        <h3 className="text-sm font-black t-text mb-4">Game Settings</h3>
        <div className="mb-4">
          <span className={labelCls}>Quiz Title</span>
          <input
            className={inputCls}
            value={quizTitle}
            onChange={(e) => setQuizTitle(e.target.value)}
          />
        </div>
        <div>
          <span className={labelCls}>Share Message Template</span>
          <textarea
            rows={4}
            className={`${inputCls} resize-y leading-relaxed`}
            value={shareMessage}
            onChange={(e) => setShareMessage(e.target.value)}
          />
          <p className="text-xs text-[var(--text-muted)] mt-2 leading-relaxed">
            Placeholders: {"{name}"}, {"{score}"}, {"{badgeEmoji}"}, {"{badgeName}"}
          </p>
        </div>
      </div>

      <div className="t-card rounded-2xl p-5">
        <h3 className="text-sm font-black t-text mb-1">Achievement Badges</h3>
        <p className="text-xs text-[var(--text-muted)] mb-4">
          Badges are awarded by score thresholds. Players reach the badge with the
          highest "min" value their score meets.
        </p>
        <div className="flex flex-col gap-4">
          {badges.map((badge, i) => (
            <div
              key={i}
              className="border border-[var(--border)] rounded-xl p-4 bg-[var(--bg-base)]"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold tracking-widest uppercase text-[var(--text-muted)]">
                  Tier {badges.length - i} · min score {badge.min}
                </span>
                <span className="text-xl">{badge.emoji}</span>
              </div>
              <div className="grid grid-cols-2 gap-x-4">
                <div className="mb-3">
                  <span className={labelCls}>Min Score</span>
                  <input
                    className={inputCls}
                    type="number"
                    value={badge.min ?? ""}
                    onChange={(e) => updateBadge(i, "min", Number(e.target.value))}
                  />
                </div>
                <div className="mb-3">
                  <span className={labelCls}>Emoji</span>
                  <input
                    className={inputCls}
                    value={badge.emoji || ""}
                    onChange={(e) => updateBadge(i, "emoji", e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <span className={labelCls}>Badge Name</span>
                  <input
                    className={inputCls}
                    value={badge.name || ""}
                    onChange={(e) => updateBadge(i, "name", e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <span className={labelCls}>Label (on card)</span>
                  <input
                    className={inputCls}
                    value={badge.label || ""}
                    onChange={(e) => updateBadge(i, "label", e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <span className={labelCls}>Color</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      className="w-10 h-9 rounded-lg border border-[var(--border)] bg-[var(--bg-base)] cursor-pointer"
                      value={badge.color || "#000000"}
                      onChange={(e) => updateBadge(i, "color", e.target.value)}
                    />
                    <input
                      className={inputCls}
                      value={badge.color || ""}
                      onChange={(e) => updateBadge(i, "color", e.target.value)}
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <span className={labelCls}>Gradient Start</span>
                  <input
                    className={inputCls}
                    value={(badge.gradient && badge.gradient[0]) || ""}
                    onChange={(e) => {
                      const base = badge.gradient || ["", ""];
                      updateBadge(i, "gradient", [e.target.value, base[1] || ""]);
                    }}
                  />
                </div>
              </div>
              <span className={labelCls}>Gradient End</span>
              <input
                className={inputCls}
                value={(badge.gradient && badge.gradient[1]) || ""}
                onChange={(e) => {
                  const base = badge.gradient || ["", ""];
                  updateBadge(i, "gradient", [base[0] || "", e.target.value]);
                }}
              />
              <div className="mt-3">
                <span className={labelCls}>Description (on card)</span>
                <input
                  className={inputCls}
                  value={badge.desc || ""}
                  onChange={(e) => updateBadge(i, "desc", e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={save}
          disabled={saving}
          className="px-6 py-2.5 text-sm font-bold rounded-xl text-white transition-opacity disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          style={{ background: "var(--accent)" }}
        >
          {saving ? "Saving…" : "💾 Save Settings"}
        </button>
      </div>

      {toast && <Toast msg={toast.msg} type={toast.type} onDone={() => setToast(null)} />}
    </div>
  );
}

function StatCard({ icon, label, value }) {
  return (
    <div className="t-card rounded-2xl p-4 flex-1 min-w-[140px]">
      <div className="flex items-center gap-2 mb-1">
        <span>{icon}</span>
        <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
          {label}
        </span>
      </div>
      <div className="text-xl font-black t-text">{value}</div>
    </div>
  );
}

function formatMs(ms) {
  if (!ms) return "—";
  const s = Math.round(ms / 1000);
  const m = Math.floor(s / 60);
  return `${m}:${String(s % 60).padStart(2, "0")}`;
}

function formatDate(d) {
  if (!d) return "—";
  return new Date(d).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function BarChart({ data, maxVal, labelKey, valueKey, color = "var(--accent)" }) {
  const max = maxVal || Math.max(...data.map((d) => d[valueKey]), 1);
  return (
    <div className="flex items-end gap-1" style={{ height: 120 }}>
      {data.map((d, i) => {
        const h = Math.max(4, (d[valueKey] / max) * 110);
        return (
          <div key={i} className="flex flex-col items-center gap-1 flex-1 min-w-0 group relative">
            <div
              className="w-full rounded-t-md transition-all"
              style={{ height: h, background: color, minHeight: 4 }}
              title={`${d[labelKey]}: ${d[valueKey]}`}
            />
            {data.length <= 15 && (
              <span className="text-[8px] font-bold text-[var(--text-muted)] truncate w-full text-center">
                {String(d[labelKey]).slice(-5)}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

function PlayerReport({ email, onBack }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await apiFetch(`${API}/brain-league/admin/players/${encodeURIComponent(email)}`);
        if (!res.ok) throw new Error();
        setData(await res.json());
      } catch {
        // handled below
      } finally {
        setLoading(false);
      }
    })();
  }, [email]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24 text-[var(--text-muted)] text-sm">
        Loading player report…
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex flex-col items-center gap-4 py-16">
        <p className="text-sm text-[var(--text-muted)]">Player not found.</p>
        <button onClick={onBack} className="px-4 py-2 text-xs font-bold rounded-lg border border-[var(--border)] bg-[var(--bg-hover)] text-[var(--text-sec)] cursor-pointer">← Back to Players</button>
      </div>
    );
  }

  const catAvg = data.categoryAvg || {};
  const badgeCount = data.badgeCount || {};
  const scoreHistory = (data.scoreHistory || []).slice().reverse();

  return (
    <div className="flex flex-col gap-5">
      <button onClick={onBack} className="self-start px-4 py-2 text-xs font-bold rounded-lg border border-[var(--border)] bg-[var(--bg-hover)] text-[var(--text-sec)] cursor-pointer">
        ← Back to Players
      </button>

      <div className="t-card rounded-2xl p-5">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl font-black text-white" style={{ background: "var(--accent)" }}>
            {(data.name || "?")[0]?.toUpperCase()}
          </div>
          <div>
            <h3 className="text-lg font-black t-text m-0">{data.name}</h3>
            <p className="text-xs text-[var(--text-muted)] m-0">{data.email}</p>
            {data.phone && <p className="text-xs text-[var(--text-muted)] m-0">{data.phone}</p>}
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatCard icon="🎮" label="Total Plays" value={data.totalAttempts} />
          <StatCard icon="🏆" label="Best Score" value={data.bestScore} />
          <StatCard icon="📊" label="Avg Score" value={data.avgScore} />
          <StatCard icon="📅" label="Last Played" value={formatDate(data.lastPlayed)} />
        </div>
      </div>

      {scoreHistory.length > 1 && (
        <div className="t-card rounded-2xl p-5">
          <h3 className="text-sm font-black t-text mb-3">Score History</h3>
          <BarChart
            data={scoreHistory.map((s) => ({ ...s, label: formatDate(s.date) }))}
            maxVal={100}
            labelKey="label"
            valueKey="score"
            color="var(--accent)"
          />
          <div className="flex justify-between mt-2">
            <span className="text-[10px] font-bold text-[var(--text-muted)]">{formatDate(scoreHistory[0]?.date)}</span>
            <span className="text-[10px] font-bold text-[var(--text-muted)]">{formatDate(scoreHistory[scoreHistory.length - 1]?.date)}</span>
          </div>
        </div>
      )}

      {Object.keys(catAvg).length > 0 && (
        <div className="t-card rounded-2xl p-5">
          <h3 className="text-sm font-black t-text mb-3">Category Averages (of 20)</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {CATEGORIES.map((c) => (
              <div key={c} className="border border-[var(--border)] rounded-xl px-3 py-3 flex flex-col items-center">
                <span className="text-sm font-black t-text">{catAvg[c] ?? "—"}</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                  {CATEGORY_META[c].icon} {CATEGORY_META[c].label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {Object.keys(badgeCount).length > 0 && (
        <div className="t-card rounded-2xl p-5">
          <h3 className="text-sm font-black t-text mb-3">Badges Earned</h3>
          <div className="flex gap-2 flex-wrap">
            {Object.entries(badgeCount).map(([b, count]) => (
              <span key={b} className="px-3 py-1.5 text-xs font-bold rounded-full border border-[var(--border)] bg-[var(--bg-base)] text-[var(--text-sec)]">
                {b} × {count}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="t-card rounded-2xl p-5">
        <h3 className="text-sm font-black t-text mb-3">All Attempts ({data.attempts?.length || 0})</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] text-left">
                <th className="pb-3 pr-3">Score</th>
                <th className="pb-3 pr-3">Badge</th>
                <th className="pb-3 pr-3">Top Type</th>
                <th className="pb-3 pr-3">Time</th>
                <th className="pb-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {(data.attempts || []).map((a) => (
                <tr key={a._id} className="border-t border-[var(--border)] text-[var(--text-primary)]">
                  <td className="py-3 pr-3 font-black">{a.score}</td>
                  <td className="py-3 pr-3">{a.badgeName || "—"}</td>
                  <td className="py-3 pr-3 capitalize">{a.topType || "—"}</td>
                  <td className="py-3 pr-3">{formatMs(a.durationMs)}</td>
                  <td className="py-3">{formatDate(a.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function PlayersTab() {
  const [players, setPlayers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = "success") => setToast({ msg, type });

  const loadPlayers = async (p, q = search) => {
    try {
      const params = `page=${p}&limit=50${q ? `&q=${encodeURIComponent(q)}` : ""}`;
      const res = await apiFetch(`${API}/brain-league/admin/players?${params}`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      setPlayers(data.items || []);
      setTotal(data.total || 0);
      setTotalPages(data.totalPages || 1);
    } catch {
      showToast("Failed to load players", "error");
    }
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      await loadPlayers(1);
      setLoading(false);
    })();
  }, []);

  const changePage = (p) => {
    setPage(p);
    loadPlayers(p, search);
  };

  const doSearch = (e) => {
    e?.preventDefault();
    setPage(1);
    loadPlayers(1, search);
  };

  if (selectedEmail) {
    return <PlayerReport email={selectedEmail} onBack={() => setSelectedEmail(null)} />;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24 text-[var(--text-muted)] text-sm">
        Loading players…
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="t-card rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4 gap-4 flex-wrap">
          <h3 className="text-sm font-black t-text m-0">All Players</h3>
          <div className="flex items-center gap-2">
            <form onSubmit={doSearch} className="flex items-center gap-2">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search name / email / phone"
                className="px-3 py-1.5 text-xs font-bold rounded-lg border border-[var(--border)] bg-[var(--bg-base)] text-[var(--text-primary)] w-56"
              />
              <button
                type="submit"
                className="px-3 py-1.5 text-xs font-bold rounded-lg border border-[var(--border)] bg-[var(--bg-hover)] text-[var(--text-sec)] cursor-pointer"
              >
                Search
              </button>
            </form>
            <span className="text-xs text-[var(--text-muted)]">{total} total</span>
          </div>
        </div>

        {players.length === 0 ? (
          <div className="text-center py-14 border border-dashed border-[var(--border)] rounded-xl text-[var(--text-muted)] text-sm">
            No players yet.
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] text-left">
                    <th className="pb-3 pr-3">Name</th>
                    <th className="pb-3 pr-3">Email</th>
                    <th className="pb-3 pr-3">Phone</th>
                    <th className="pb-3 pr-3">Plays</th>
                    <th className="pb-3 pr-3">Best</th>
                    <th className="pb-3 pr-3">Avg</th>
                    <th className="pb-3 pr-3">Badges</th>
                    <th className="pb-3">Last Played</th>
                  </tr>
                </thead>
                <tbody>
                  {players.map((p) => (
                    <tr
                      key={p.email}
                      className="border-t border-[var(--border)] text-[var(--text-primary)] cursor-pointer hover:bg-[var(--bg-hover)] transition-colors"
                      onClick={() => setSelectedEmail(p.email)}
                    >
                      <td className="py-3 pr-3 font-semibold">{p.name}</td>
                      <td className="py-3 pr-3 text-[var(--text-sec)]">{p.email}</td>
                      <td className="py-3 pr-3 text-[var(--text-sec)]">{p.phone || "—"}</td>
                      <td className="py-3 pr-3 font-black">{p.attempts}</td>
                      <td className="py-3 pr-3 font-black">{p.bestScore}</td>
                      <td className="py-3 pr-3">{p.avgScore}</td>
                      <td className="py-3 pr-3">
                        {(p.badges || []).filter(Boolean).length > 0
                          ? p.badges.filter(Boolean).join(", ")
                          : "—"}
                      </td>
                      <td className="py-3">{formatDate(p.lastPlayed)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-4">
                <button
                  onClick={() => changePage(page - 1)}
                  disabled={page <= 1}
                  className="px-3 py-1.5 text-xs font-bold rounded-lg border border-[var(--border)] bg-[var(--bg-hover)] text-[var(--text-sec)] cursor-pointer disabled:opacity-40"
                >
                  ← Prev
                </button>
                <span className="text-xs font-bold text-[var(--text-muted)]">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => changePage(page + 1)}
                  disabled={page >= totalPages}
                  className="px-3 py-1.5 text-xs font-bold rounded-lg border border-[var(--border)] bg-[var(--bg-hover)] text-[var(--text-sec)] cursor-pointer disabled:opacity-40"
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {toast && <Toast msg={toast.msg} type={toast.type} onDone={() => setToast(null)} />}
    </div>
  );
}

function AnalyticsTab() {
  const [period, setPeriod] = useState("week");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = "success") => setToast({ msg, type });

  const loadTrend = async (p) => {
    setLoading(true);
    try {
      const res = await apiFetch(`${API}/brain-league/admin/stats/trend?period=${p}`);
      if (!res.ok) throw new Error();
      setData(await res.json());
    } catch {
      showToast("Failed to load analytics", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTrend(period);
  }, [period]);

  const maxAttempts = data ? Math.max(...data.buckets.map((b) => b.attempts), 1) : 1;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setPeriod("week")}
          className={`px-4 py-2 rounded-xl text-xs font-bold border cursor-pointer transition-all ${
            period === "week"
              ? "bg-[var(--accent-soft)] border-[var(--accent-border)] text-[var(--accent-text)]"
              : "bg-[var(--bg-elevated)] border-[var(--border)] text-[var(--text-sec)] hover:text-[var(--text-primary)]"
          }`}
        >
          Weekly (12 weeks)
        </button>
        <button
          onClick={() => setPeriod("month")}
          className={`px-4 py-2 rounded-xl text-xs font-bold border cursor-pointer transition-all ${
            period === "month"
              ? "bg-[var(--accent-soft)] border-[var(--accent-border)] text-[var(--accent-text)]"
              : "bg-[var(--bg-elevated)] border-[var(--border)] text-[var(--text-sec)] hover:text-[var(--text-primary)]"
          }`}
        >
          Monthly (12 months)
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-24 text-[var(--text-muted)] text-sm">
          Loading analytics…
        </div>
      ) : !data ? (
        <div className="text-center py-14 border border-dashed border-[var(--border)] rounded-xl text-[var(--text-muted)] text-sm">
          No data available.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <StatCard icon="🎮" label="Total Attempts" value={data.totalAttempts} />
            <StatCard icon="👥" label="Unique Players" value={data.totalPlayers} />
            <StatCard icon="📊" label="Avg Score" value={data.avgScore} />
          </div>

          <div className="t-card rounded-2xl p-5">
            <h3 className="text-sm font-black t-text mb-3">
              Attempts per {period === "week" ? "Day" : "Month"}
            </h3>
            {data.buckets.length > 0 ? (
              <BarChart
                data={data.buckets.map((b) => ({ ...b, label: b.label.slice(-5) }))}
                maxVal={maxAttempts}
                labelKey="label"
                valueKey="attempts"
                color="var(--accent)"
              />
            ) : (
              <p className="text-xs text-[var(--text-muted)]">No data in this period.</p>
            )}
          </div>

          {data.scoreBands.length > 0 && (
            <div className="t-card rounded-2xl p-5">
              <h3 className="text-sm font-black t-text mb-3">Score Distribution</h3>
              <div className="flex items-end gap-3" style={{ height: 120 }}>
                {data.scoreBands.map((b, i) => {
                  const maxC = Math.max(...data.scoreBands.map((x) => x.count), 1);
                  const h = Math.max(4, (b.count / maxC) * 110);
                  const colors = ["#ef4444", "#f97316", "#eab308", "#22c55e", "#3b82f6"];
                  return (
                    <div key={i} className="flex flex-col items-center gap-1 flex-1">
                      <span className="text-[10px] font-bold t-text">{b.count}</span>
                      <div className="w-full rounded-t-md" style={{ height: h, background: colors[i] || "var(--accent)" }} />
                      <span className="text-[9px] font-bold text-[var(--text-muted)]">{b.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {data.topPlayers.length > 0 && (
            <div className="t-card rounded-2xl p-5">
              <h3 className="text-sm font-black t-text mb-3">Top Players (by attempts)</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] text-left">
                      <th className="pb-3 pr-3">#</th>
                      <th className="pb-3 pr-3">Name</th>
                      <th className="pb-3 pr-3">Email</th>
                      <th className="pb-3 pr-3">Plays</th>
                      <th className="pb-3 pr-3">Avg</th>
                      <th className="pb-3">Best</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.topPlayers.map((p, i) => (
                      <tr key={p.email} className="border-t border-[var(--border)] text-[var(--text-primary)]">
                        <td className="py-3 pr-3 font-bold text-[var(--text-muted)]">{i + 1}</td>
                        <td className="py-3 pr-3 font-semibold">{p.name}</td>
                        <td className="py-3 pr-3 text-[var(--text-sec)]">{p.email}</td>
                        <td className="py-3 pr-3 font-black">{p.attempts}</td>
                        <td className="py-3 pr-3">{p.avgScore}</td>
                        <td className="py-3 font-black">{p.bestScore}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}

      {toast && <Toast msg={toast.msg} type={toast.type} onDone={() => setToast(null)} />}
    </div>
  );
}

function AttemptsTab() {
  const [stats, setStats] = useState(null);
  const [attempts, setAttempts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = "success") => setToast({ msg, type });

  const loadStats = async () => {
    try {
      const res = await apiFetch(`${API}/brain-league/admin/stats`);
      if (!res.ok) throw new Error();
      setStats(await res.json());
    } catch {
      showToast("Failed to load stats", "error");
    }
  };

  const loadAttempts = async (p, q = search) => {
    try {
      const params = `page=${p}&limit=50${q ? `&q=${encodeURIComponent(q)}` : ""}`;
      const res = await apiFetch(`${API}/brain-league/admin/attempts?${params}`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      setAttempts(data.items || []);
      setTotal(data.total || 0);
      setTotalPages(data.totalPages || 1);
    } catch {
      showToast("Failed to load attempts", "error");
    }
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      await Promise.all([loadStats(), loadAttempts(1)]);
      setLoading(false);
    })();
  }, []);

  const changePage = (p) => {
    setPage(p);
    loadAttempts(p, search);
  };

  const doSearch = (e) => {
    e?.preventDefault();
    setPage(1);
    loadAttempts(1, search);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24 text-[var(--text-muted)] text-sm">
        Loading attempts…
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      {stats && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <StatCard icon="🎮" label="Attempts" value={stats.totalAttempts} />
            <StatCard icon="👥" label="Players" value={stats.totalPlayers} />
            <StatCard icon="📊" label="Avg Score" value={stats.avgScore} />
            <StatCard icon="🏆" label="Best Score" value={stats.bestScore} />
            <StatCard icon="📅" label="Today" value={stats.playsToday} />
          </div>

          {(stats.categoryAvg && Object.keys(stats.categoryAvg).length > 0) && (
            <div className="t-card rounded-2xl p-5">
              <h3 className="text-sm font-black t-text mb-3">
                Average Points per Category (of 20)
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                {CATEGORIES.map((c) => (
                  <div
                    key={c}
                    className="border border-[var(--border)] rounded-xl px-3 py-3 flex flex-col items-center"
                  >
                    <span className="text-sm font-black t-text">
                      {stats.categoryAvg[c] != null ? stats.categoryAvg[c] : "—"}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                      {CATEGORY_META[c].icon} {CATEGORY_META[c].label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(stats.badgeDistribution && Object.keys(stats.badgeDistribution).length > 0) && (
            <div className="t-card rounded-2xl p-5">
              <h3 className="text-sm font-black t-text mb-3">Badge Distribution</h3>
              <div className="flex gap-2 flex-wrap">
                {Object.entries(stats.badgeDistribution).map(([badge, count]) => (
                  <span
                    key={badge}
                    className="px-3 py-1.5 text-xs font-bold rounded-full border border-[var(--border)] bg-[var(--bg-base)] text-[var(--text-sec)]"
                  >
                    {badge || "unknown"} · {count}
                  </span>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      <div className="t-card rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4 gap-4 flex-wrap">
          <h3 className="text-sm font-black t-text m-0">Recent Player Attempts</h3>
          <div className="flex items-center gap-2">
            <form onSubmit={doSearch} className="flex items-center gap-2">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search name / email / phone"
                className="px-3 py-1.5 text-xs font-bold rounded-lg border border-[var(--border)] bg-[var(--bg-base)] text-[var(--text-primary)] w-56"
              />
              <button
                type="submit"
                className="px-3 py-1.5 text-xs font-bold rounded-lg border border-[var(--border)] bg-[var(--bg-hover)] text-[var(--text-sec)] cursor-pointer"
              >
                Search
              </button>
            </form>
            <span className="text-xs text-[var(--text-muted)]">{total} total</span>
          </div>
        </div>

        {attempts.length === 0 ? (
          <div className="text-center py-14 border border-dashed border-[var(--border)] rounded-xl text-[var(--text-muted)] text-sm">
            No attempts recorded yet.
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] text-left">
                    <th className="pb-3 pr-3">Player</th>
                    <th className="pb-3 pr-3">Email</th>
                    <th className="pb-3 pr-3">Phone</th>
                    <th className="pb-3 pr-3">Score</th>
                    <th className="pb-3 pr-3">Badge</th>
                    <th className="pb-3 pr-3">Top Type</th>
                    <th className="pb-3 pr-3">Time</th>
                    <th className="pb-3">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {attempts.map((a) => (
                    <tr
                      key={a._id}
                      className="border-t border-[var(--border)] text-[var(--text-primary)]"
                    >
                      <td className="py-3 pr-3 font-semibold">{a.name}</td>
                      <td className="py-3 pr-3 text-[var(--text-sec)]">{a.email || "—"}</td>
                      <td className="py-3 pr-3 text-[var(--text-sec)]">{a.phone || "—"}</td>
                      <td className="py-3 pr-3 font-black">{a.score}</td>
                      <td className="py-3 pr-3">{a.badgeName || "—"}</td>
                      <td className="py-3 pr-3 capitalize">{a.topType || "—"}</td>
                      <td className="py-3 pr-3">{formatMs(a.durationMs)}</td>
                      <td className="py-3">
                        {new Date(a.createdAt).toLocaleString(undefined, {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-4">
                <button
                  onClick={() => changePage(page - 1)}
                  disabled={page <= 1}
                  className="px-3 py-1.5 text-xs font-bold rounded-lg border border-[var(--border)] bg-[var(--bg-hover)] text-[var(--text-sec)] cursor-pointer disabled:opacity-40"
                >
                  ← Prev
                </button>
                <span className="text-xs font-bold text-[var(--text-muted)]">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => changePage(page + 1)}
                  disabled={page >= totalPages}
                  className="px-3 py-1.5 text-xs font-bold rounded-lg border border-[var(--border)] bg-[var(--bg-hover)] text-[var(--text-sec)] cursor-pointer disabled:opacity-40"
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {toast && <Toast msg={toast.msg} type={toast.type} onDone={() => setToast(null)} />}
    </div>
  );
}

const TABS = [
  { id: "questions", label: "Questions", icon: "📝" },
  { id: "badges", label: "Badges & Settings", icon: "🏅" },
  { id: "players", label: "Players", icon: "👥" },
  { id: "attempts", label: "Attempts", icon: "📊" },
  { id: "analytics", label: "Analytics", icon: "📈" },
];

export default function BrainLeague() {
  useTheme();

  const [activeTab, setActiveTab] = useState("questions");

  return (
    <div className="min-h-screen t-base">
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <header className="t-topbar sticky top-0 z-20 px-4 sm:px-6 py-4 flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h1 className="m-0 text-lg font-black t-text leading-tight">
            🧠 Brain League
          </h1>
          <p className="mt-0.5 text-xs text-[var(--text-muted)]">
            Manage the quiz bank, badges, settings & player attempts
          </p>
        </div>
      </header>

      <div className="flex" style={{ minHeight: "calc(100vh - 65px)" }}>
        <aside
          className="hidden sm:flex flex-col w-48 flex-shrink-0 t-sidebar sticky top-[65px] p-3 gap-1 overflow-y-auto"
          style={{ height: "calc(100vh - 65px)" }}
        >
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full text-left flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm border cursor-pointer transition-all ${
                activeTab === tab.id
                  ? "bg-[var(--accent-soft)] border-[var(--accent-border)] text-[var(--accent-text)] font-bold"
                  : "bg-transparent border-transparent text-[var(--text-sec)] font-medium hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]"
              }`}
            >
              <span className="text-base">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </aside>

        <main className="flex-1 px-4 sm:px-8 py-6 overflow-y-auto flex flex-col">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-xl">{TABS.find((t) => t.id === activeTab)?.icon}</span>
            <h2 className="text-base font-black t-text m-0">
              {TABS.find((t) => t.id === activeTab)?.label}
            </h2>
          </div>

          {activeTab === "questions" && <QuestionsTab />}
          {activeTab === "badges" && <BadgesTab />}
          {activeTab === "players" && <PlayersTab />}
          {activeTab === "attempts" && <AttemptsTab />}
          {activeTab === "analytics" && <AnalyticsTab />}
        </main>
      </div>
    </div>
  );
}