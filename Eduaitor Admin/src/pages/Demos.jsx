import { useState, useEffect, useCallback } from "react";
import {
  FaCalendarAlt,
  FaEnvelope,
  FaPhone,
  FaVideo,
  FaTrash,
  FaEye,
  FaTimes,
  FaSync,
  FaSearch,
  FaFilter,
  FaExclamationTriangle,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { apiClient } from "../lib/api";

// ── Status config ────────────────────────────────────────────
const STATUS_STYLES = {
  pending: {
    bg: "bg-amber-500/10",
    border: "border-amber-500/25",
    text: "text-amber-400",
    label: "Pending",
  },
  confirmed: {
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/25",
    text: "text-indigo-400",
    label: "Confirmed",
  },
  completed: {
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/25",
    text: "text-emerald-400",
    label: "Completed",
  },
  cancelled: {
    bg: "bg-red-500/10",
    border: "border-red-500/25",
    text: "text-red-400",
    label: "Cancelled",
  },
};

const StatusBadge = ({ status }) => {
  const s = STATUS_STYLES[status] ?? STATUS_STYLES.pending;
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${s.bg} ${s.border} ${s.text}`}
    >
      {s.label}
    </span>
  );
};

// ── Stat card ─────────────────────────────────────────────────
const StatCard = ({ label, value, color }) => (
  <div
    className="rounded-xl p-4 t-card flex flex-col gap-1"
    style={{ border: "1px solid var(--border)" }}
  >
    <p
      className="text-xs font-semibold uppercase tracking-widest"
      style={{ color: "var(--text-muted)" }}
    >
      {label}
    </p>
    <p className={`text-2xl font-black ${color}`}>{value ?? "—"}</p>
  </div>
);

// ── Detail Modal ──────────────────────────────────────────────
const DetailModal = ({ demo, onClose, onStatusChange }) => {
  const [status, setStatus] = useState(demo.status);
  const [adminNotes, setAdminNotes] = useState(demo.adminNotes || "");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await apiClient.patch(`/demo/${demo._id}/status`, {
        status,
        adminNotes,
      });
      toast.success("Status updated");
      onStatusChange(demo._id, status, adminNotes);
      onClose();
    } catch (err) {
      console.error("Status update error:", err?.response?.data || err.message);
      toast.error("Failed to update status");
    } finally {
      setSaving(false);
    }
  };

  const Row = ({ label, value }) =>
    value ? (
      <div
        className="flex gap-3 py-2 border-b"
        style={{ borderColor: "var(--border-sub)" }}
      >
        <span
          className="w-32 shrink-0 text-xs font-semibold uppercase tracking-wide"
          style={{ color: "var(--text-muted)" }}
        >
          {label}
        </span>
        <span className="text-sm" style={{ color: "var(--text-primary)" }}>
          {value}
        </span>
      </div>
    ) : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div
        className="w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden"
        style={{
          background: "var(--bg-surface)",
          border: "1px solid var(--border)",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4 border-b"
          style={{ borderColor: "var(--border)" }}
        >
          <div>
            <h2
              className="font-black text-lg"
              style={{ color: "var(--text-primary)" }}
            >
              {demo.instName}
            </h2>
            <p
              className="text-xs mt-0.5"
              style={{ color: "var(--text-muted)" }}
            >
              Booked on{" "}
              {new Date(demo.createdAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>
          <button onClick={onClose} className="t-icon-btn">
            <FaTimes size={14} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-4 max-h-[60vh] overflow-y-auto space-y-1">
          <p
            className="text-xs font-bold uppercase tracking-widest mb-2"
            style={{ color: "var(--accent)" }}
          >
            🏫 Institution
          </p>
          <Row label="Name" value={demo.instName} />
          <Row label="Type" value={demo.instType} />
          <Row label="Students" value={demo.students} />
          <Row label="Branches" value={demo.branches} />

          <p
            className="text-xs font-bold uppercase tracking-widest mt-4 mb-2"
            style={{ color: "var(--accent)" }}
          >
            👤 Contact
          </p>
          <Row label="Name" value={demo.contactName} />
          <Row label="Designation" value={demo.designation} />
          <Row label="Email" value={demo.email} />
          <Row label="Phone" value={demo.phone} />
          <Row label="City" value={demo.city} />

          <p
            className="text-xs font-bold uppercase tracking-widest mt-4 mb-2"
            style={{ color: "var(--accent)" }}
          >
            📅 Preferences
          </p>
          <Row label="Date" value={demo.date} />
          <Row label="Time" value={demo.time} />
          <Row label="Mode" value={demo.mode} />
          <Row label="Message" value={demo.message} />

          <p
            className="text-xs font-bold uppercase tracking-widest mt-4 mb-2"
            style={{ color: "var(--accent)" }}
          >
            ⚙️ Admin
          </p>
          <div className="flex gap-3 flex-wrap">
            {Object.entries(STATUS_STYLES).map(([key, val]) => (
              <button
                key={key}
                onClick={() => setStatus(key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                  status === key
                    ? `${val.bg} ${val.border} ${val.text}`
                    : "border-transparent opacity-50 hover:opacity-80"
                }`}
                style={{
                  color: status === key ? undefined : "var(--text-sec)",
                }}
              >
                {val.label}
              </button>
            ))}
          </div>
          <textarea
            value={adminNotes}
            onChange={(e) => setAdminNotes(e.target.value)}
            rows={3}
            placeholder="Admin notes (internal)…"
            className="w-full mt-3 text-sm rounded-xl px-4 py-3 outline-none resize-none"
            style={{
              background: "var(--bg-elevated)",
              border: "1px solid var(--border)",
              color: "var(--text-primary)",
            }}
          />
        </div>

        {/* Footer */}
        <div
          className="px-6 py-4 border-t flex justify-end gap-3"
          style={{ borderColor: "var(--border)" }}
        >
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer"
            style={{ color: "var(--text-sec)", background: "var(--bg-hover)" }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-5 py-2 rounded-lg text-sm font-bold text-white transition-all disabled:opacity-60 cursor-pointer"
            style={{ background: "var(--accent)" }}
          >
            {saving ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

// ── Main Demos Page ───────────────────────────────────────────
export default function Demos() {
  const [demos, setDemos] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(""); // ← shows actual error in UI
  const [selected, setSelected] = useState(null);
  const [filterStatus, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [deleting, setDeleting] = useState(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setFetchError("");
    try {
      const [demosRes, statsRes] = await Promise.all([
        apiClient.get("/demo", {
          params: { status: filterStatus || undefined },
        }),
        apiClient.get("/demo/stats"),
      ]);

      setDemos(Array.isArray(demosRes.data.data) ? demosRes.data.data : []);
      setStats(statsRes.data.data ?? null);
    } catch (err) {
      // Log the full error so you can debug in the browser console
      const msg =
        err?.response?.data?.message || err?.message || "Unknown error";
      const status = err?.response?.status;
      const url = err?.config?.url;
      console.error(
        `Fetch error [${status}] ${url}:`,
        err?.response?.data || err.message,
      );
      setFetchError(`Failed to load (${status ?? "network error"}): ${msg}`);
      toast.error(`Demos load failed: ${msg}`);
    } finally {
      setLoading(false);
    }
  }, [filterStatus]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this demo booking?")) return;
    setDeleting(id);
    try {
      await apiClient.delete(`/demo/${id}`);
      setDemos((prev) => prev.filter((d) => d._id !== id));
      toast.success("Deleted");
    } catch (err) {
      console.error("Delete error:", err?.response?.data || err.message);
      toast.error("Delete failed");
    } finally {
      setDeleting(null);
    }
  };

  const handleStatusChange = (id, status, adminNotes) => {
    setDemos((prev) =>
      prev.map((d) => (d._id === id ? { ...d, status, adminNotes } : d)),
    );
  };

  const filtered = (Array.isArray(demos) ? demos : []).filter((d) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      d.instName?.toLowerCase().includes(q) ||
      d.contactName?.toLowerCase().includes(q) ||
      d.email?.toLowerCase().includes(q) ||
      d.phone?.includes(q)
    );
  });

  return (
    <div className="p-5 lg:p-8 space-y-6 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1
            className="text-2xl font-black tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Demo Bookings
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
            Manage all incoming demo requests
          </p>
        </div>
        <button
          onClick={fetchAll}
          className="t-icon-btn flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold cursor-pointer"
          style={{
            border: "1px solid var(--border)",
            color: "var(--text-sec)",
          }}
        >
          <FaSync size={12} className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {/* ── Error banner (shows exactly what went wrong) ── */}
      {fetchError && (
        <div
          className="flex items-start gap-3 px-4 py-3 rounded-xl text-sm"
          style={{
            background: "var(--danger-soft)",
            border: "1px solid var(--danger-border)",
            color: "var(--danger-text)",
          }}
        >
          <FaExclamationTriangle size={14} className="mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold">Could not load demo data</p>
            <p className="text-xs mt-0.5 opacity-80">{fetchError}</p>
            <p className="text-xs mt-1 opacity-70">
              Check browser console (F12) for full details. Make sure your
              backend is running and <code>VITE_API_URL</code> is correct.
            </p>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <StatCard label="Total" value={stats?.total} color="text-purple-500" />
        <StatCard
          label="Pending"
          value={stats?.pending}
          color="text-amber-400"
        />
        <StatCard
          label="Confirmed"
          value={stats?.confirmed}
          color="text-indigo-400"
        />
        <StatCard
          label="Completed"
          value={stats?.completed}
          color="text-emerald-400"
        />
        <StatCard
          label="Cancelled"
          value={stats?.cancelled}
          color="text-red-400"
        />
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-xl flex-1 min-w-48"
          style={{
            background: "var(--bg-elevated)",
            border: "1px solid var(--border)",
          }}
        >
          <FaSearch size={12} style={{ color: "var(--text-muted)" }} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search institution, contact, email…"
            className="flex-1 text-sm bg-transparent outline-none"
            style={{ color: "var(--text-primary)" }}
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <FaFilter size={11} style={{ color: "var(--text-muted)" }} />
          {["", "pending", "confirmed", "completed", "cancelled"].map((s) => {
            const style = s ? STATUS_STYLES[s] : null;
            const isActive = filterStatus === s;
            return (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                  isActive
                    ? s
                      ? `${style.bg} ${style.border} ${style.text}`
                      : "bg-indigo-500/10 border-indigo-500/25 text-indigo-400"
                    : "border-transparent opacity-50 hover:opacity-80"
                }`}
                style={{ color: isActive ? undefined : "var(--text-sec)" }}
              >
                {s ? s.charAt(0).toUpperCase() + s.slice(1) : "All"}
              </button>
            );
          })}
        </div>
      </div>

      {/* Table */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{ border: "1px solid var(--border)" }}
      >
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div
            className="py-16 text-center"
            style={{ color: "var(--text-muted)" }}
          >
            <FaCalendarAlt size={32} className="mx-auto mb-3 opacity-30" />
            <p className="font-semibold">No demo bookings found</p>
            {!fetchError && (
              <p className="text-xs mt-1 opacity-60">
                Bookings submitted on the website will appear here.
              </p>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr
                  style={{
                    background: "var(--bg-elevated)",
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  {[
                    "Institution",
                    "Contact",
                    "Preference",
                    "Status",
                    "Booked On",
                    "Actions",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-left text-xs font-bold uppercase tracking-widest"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((demo, i) => (
                  <tr
                    key={demo._id}
                    style={{
                      borderBottom:
                        i < filtered.length - 1
                          ? "1px solid var(--border-sub)"
                          : "none",
                      background: "var(--bg-surface)",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "var(--bg-hover)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "var(--bg-surface)")
                    }
                  >
                    <td className="px-4 py-3">
                      <div
                        className="font-semibold"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {demo.instName}
                      </div>
                      <div
                        className="text-xs mt-0.5 capitalize"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {demo.instType}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div
                        className="font-medium"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {demo.contactName}
                      </div>
                      <div
                        className="text-xs mt-0.5 flex items-center gap-1"
                        style={{ color: "var(--text-muted)" }}
                      >
                        <FaEnvelope size={9} /> {demo.email}
                      </div>
                      <div
                        className="text-xs flex items-center gap-1"
                        style={{ color: "var(--text-muted)" }}
                      >
                        <FaPhone size={9} /> {demo.phone}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div
                        className="text-xs flex items-center gap-1"
                        style={{ color: "var(--text-sec)" }}
                      >
                        <FaCalendarAlt size={9} /> {demo.date || "Flexible"}
                      </div>
                      <div
                        className="text-xs flex items-center gap-1 mt-0.5"
                        style={{ color: "var(--text-sec)" }}
                      >
                        <FaVideo size={9} /> {demo.mode}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={demo.status} />
                    </td>
                    <td
                      className="px-4 py-3 text-xs"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {new Date(demo.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelected(demo)}
                          className="t-icon-btn p-1.5 rounded-lg cursor-pointer"
                          title="View / Edit"
                          style={{ color: "var(--accent)" }}
                        >
                          <FaEye size={13} />
                        </button>
                        <button
                          onClick={() => handleDelete(demo._id)}
                          disabled={deleting === demo._id}
                          className="t-icon-btn p-1.5 rounded-lg cursor-pointer"
                          title="Delete"
                          style={{ color: "var(--danger-text)" }}
                        >
                          {deleting === demo._id ? (
                            <span className="w-3 h-3 border border-red-400 border-t-transparent rounded-full animate-spin block" />
                          ) : (
                            <FaTrash size={12} />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selected && (
        <DetailModal
          demo={selected}
          onClose={() => setSelected(null)}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
}
