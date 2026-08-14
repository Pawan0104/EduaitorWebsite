import { useEffect, useState } from "react";
import { FaPhone, FaTrash, FaSearch } from "react-icons/fa";
import { apiClient } from "../lib/api";
import { toast } from "react-toastify";

const STATUS_OPTIONS = ["all", "new", "contacted", "closed"];

function StatusBadge({ status }) {
  const colors = {
    new: "bg-blue-100 text-blue-700",
    contacted: "bg-amber-100 text-amber-700",
    closed: "bg-emerald-100 text-emerald-700",
  };
  return (
    <span
      className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide ${
        colors[status] || "bg-slate-100 text-slate-600"
      }`}
    >
      {status}
    </span>
  );
}

export default function Contacts() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("all");
  const [q, setQ] = useState("");
  const [deleting, setDeleting] = useState(null);

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await apiClient.get("/contact-leads", {
        params: {
          status,
          ...(q.trim() ? { q: q.trim() } : {}),
        },
      });
      setLeads(Array.isArray(res.data.data) ? res.data.data : []);
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to load");
      toast.error("Could not load contact leads");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [status]);

  const onSearch = (e) => {
    e.preventDefault();
    load();
  };

  const updateStatus = async (id, nextStatus) => {
    try {
      await apiClient.patch(`/contact-leads/${id}`, { status: nextStatus });
      setLeads((prev) =>
        prev.map((lead) => (lead._id === id ? { ...lead, status: nextStatus } : lead))
      );
      toast.success("Status updated");
    } catch {
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this contact request?")) return;
    setDeleting(id);
    try {
      await apiClient.delete(`/contact-leads/${id}`);
      setLeads((prev) => prev.filter((lead) => lead._id !== id));
      toast.success("Deleted");
    } catch {
      toast.error("Failed to delete");
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="p-4 sm:p-6 t-base">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="m-0 text-xl font-black t-text">Contact Requests</h1>
          <p className="mt-1 text-sm t-text-sec">
            Leads captured from Contact Us / Talk to Experts popups
          </p>
        </div>
        <form onSubmit={onSearch} className="flex gap-2 flex-wrap">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search name or phone"
              className="pl-9 pr-3 py-2 rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] text-sm"
            />
          </div>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="px-3 py-2 rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] text-sm"
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s === "all" ? "All statuses" : s}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="px-4 py-2 rounded-xl text-sm font-bold text-white"
            style={{ background: "var(--accent)" }}
          >
            Search
          </button>
        </form>
      </div>

      {loading ? (
        <p className="t-text-sec">Loading…</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : leads.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[var(--border)] p-10 text-center t-text-sec">
          No contact requests yet.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)]">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b border-[var(--border)] t-text-sec">
                <th className="px-4 py-3 font-bold">Name</th>
                <th className="px-4 py-3 font-bold">Phone</th>
                <th className="px-4 py-3 font-bold">Source</th>
                <th className="px-4 py-3 font-bold">Status</th>
                <th className="px-4 py-3 font-bold">Received</th>
                <th className="px-4 py-3 font-bold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead._id} className="border-b border-[var(--border)] last:border-0">
                  <td className="px-4 py-3 font-semibold t-text">{lead.name}</td>
                  <td className="px-4 py-3">
                    <a
                      href={`tel:${lead.phone}`}
                      className="inline-flex items-center gap-1.5 text-[var(--accent-text)] font-medium"
                    >
                      <FaPhone size={11} /> {lead.phone}
                    </a>
                  </td>
                  <td className="px-4 py-3 t-text-sec">{lead.source || "—"}</td>
                  <td className="px-4 py-3">
                    <select
                      value={lead.status}
                      onChange={(e) => updateStatus(lead._id, e.target.value)}
                      className="px-2 py-1 rounded-lg border border-[var(--border)] bg-transparent text-xs font-bold"
                    >
                      <option value="new">new</option>
                      <option value="contacted">contacted</option>
                      <option value="closed">closed</option>
                    </select>
                    <div className="mt-1">
                      <StatusBadge status={lead.status} />
                    </div>
                  </td>
                  <td className="px-4 py-3 t-text-sec">
                    {new Date(lead.createdAt).toLocaleString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => handleDelete(lead._id)}
                      disabled={deleting === lead._id}
                      className="p-2 rounded-lg border border-red-200 text-red-500 hover:bg-red-50"
                      title="Delete"
                    >
                      <FaTrash size={12} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
