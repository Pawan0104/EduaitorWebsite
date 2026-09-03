import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { FaCalendarAlt, FaEnvelope, FaBlog, FaImages } from "react-icons/fa";
import { apiClient, getAdminJwtPayload } from "../lib/api";

const ROLE_OPTIONS = [
  { value: "admin", label: "Admin" },
  { value: "teacher", label: "Teacher" },
  { value: "parent", label: "Parent" },
  { value: "student", label: "Student" },
];

// Keep in sync with backend controller catalog.
const AVAILABLE_SHORTCUTS = [
  {
    id: "demoBooking",
    label: "View Demo Booking",
    icon: <FaCalendarAlt size={16} />,
  },
  {
    id: "contacts",
    label: "View Contacts",
    icon: <FaEnvelope size={16} />,
  },
  {
    id: "uploadImage",
    label: "Upload Image",
    icon: <FaImages size={16} />,
  },
  {
    id: "newBlog",
    label: "New Blog",
    icon: <FaBlog size={16} />,
  },
];

const DEFAULT_SHORTCUT_IDS = AVAILABLE_SHORTCUTS.map((s) => s.id);

const STORAGE = {
  schoolId: "homeShortcutSchoolId",
  role: "homeShortcutRole",
  actorId: "homeShortcutActorId",
};

export default function HomeShortcuts() {
  const payload = getAdminJwtPayload();

  const initialScope = useMemo(() => {
    return {
      schoolId: localStorage.getItem(STORAGE.schoolId) || "default",
      role: localStorage.getItem(STORAGE.role) || "admin",
      actorId:
        localStorage.getItem(STORAGE.actorId) ||
        payload?.email ||
        "admin",
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [schoolId, setSchoolId] = useState(initialScope.schoolId);
  const [role, setRole] = useState(initialScope.role);
  const [actorId, setActorId] = useState(initialScope.actorId);

  const [selectedIds, setSelectedIds] = useState(DEFAULT_SHORTCUT_IDS);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    if (!schoolId.trim() || !role.trim() || !actorId.trim()) {
      toast.error("Missing scope fields (schoolId, role, actorId).");
      return;
    }

    setLoading(true);
    try {
      const res = await apiClient.get("/home-frequent-icons", {
        params: {
          schoolId: schoolId.trim(),
          role: role.trim(),
          actorId: actorId.trim(),
        },
      });

      const ids = Array.isArray(res.data?.homeFrequentIcons)
        ? res.data.homeFrequentIcons
        : [];
      setSelectedIds(ids.length ? ids : DEFAULT_SHORTCUT_IDS);
      localStorage.setItem(STORAGE.schoolId, schoolId.trim());
      localStorage.setItem(STORAGE.role, role.trim());
      localStorage.setItem(STORAGE.actorId, actorId.trim());
      toast.success("Loaded current home shortcuts");
    } catch (err) {
      console.error("Failed to load home shortcuts:", err?.response?.data);
      toast.error("Failed to load home shortcuts (check backend).");
      setSelectedIds(DEFAULT_SHORTCUT_IDS);
    } finally {
      setLoading(false);
    }
  };

  // Load on first mount for current scope.
  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggle = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const save = async () => {
    if (!schoolId.trim() || !role.trim() || !actorId.trim()) {
      toast.error("Missing scope fields (schoolId, role, actorId).");
      return;
    }
    if (selectedIds.length === 0) {
      toast.error("Select at least one shortcut icon.");
      return;
    }

    setLoading(true);
    try {
      await apiClient.put("/home-frequent-icons", {
        schoolId: schoolId.trim(),
        role: role.trim(),
        actorId: actorId.trim(),
        homeShortcutIds: selectedIds,
      });

      localStorage.setItem(STORAGE.schoolId, schoolId.trim());
      localStorage.setItem(STORAGE.role, role.trim());
      localStorage.setItem(STORAGE.actorId, actorId.trim());
      toast.success("Home shortcuts saved");
    } catch (err) {
      console.error("Failed to save home shortcuts:", err?.response?.data);
      toast.error("Failed to save home shortcuts (check backend).");
    } finally {
      setLoading(false);
    }
  };

  const resetToDefault = async () => {
    if (!schoolId.trim() || !role.trim() || !actorId.trim()) {
      toast.error("Missing scope fields (schoolId, role, actorId).");
      return;
    }

    setLoading(true);
    try {
      await apiClient.put("/home-frequent-icons", {
        schoolId: schoolId.trim(),
        role: role.trim(),
        actorId: actorId.trim(),
        reset: true,
      });

      // Backend will return defaults; easiest is to reload.
      await load();
    } catch (err) {
      console.error("Failed to reset home shortcuts:", err?.response?.data);
      toast.error("Failed to reset (check backend).");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5 lg:p-8 space-y-6 max-w-5xl mx-auto w-full t-base">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-black tracking-tight t-text">
            Home Shortcuts
          </h1>
          <p className="text-sm mt-1 t-text-sec">
            Choose which icons appear on the home/front screen.
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button
            type="button"
            onClick={load}
            disabled={loading}
            className="px-4 py-2 rounded-xl text-sm font-semibold border cursor-pointer"
            style={{ borderColor: "var(--border)", color: "var(--text-sec)" }}
          >
            {loading ? "Loading…" : "Load"}
          </button>
          <button
            type="button"
            onClick={save}
            disabled={loading}
            className="px-5 py-2 rounded-xl text-sm font-bold text-white cursor-pointer"
            style={{ background: "var(--accent)" }}
          >
            Save
          </button>
          <button
            type="button"
            onClick={resetToDefault}
            disabled={loading}
            className="px-4 py-2 rounded-xl text-sm font-semibold border cursor-pointer"
            style={{
              borderColor: "var(--danger-border)",
              color: "var(--danger-text)",
            }}
          >
            Reset
          </button>
        </div>
      </div>

      <div className="t-card rounded-2xl p-6">
        <h2 className="text-sm font-bold mb-4 t-text">Scope</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-bold uppercase tracking-widest t-text-muted">
              School ID
            </label>
            <input
              value={schoolId}
              onChange={(e) => setSchoolId(e.target.value)}
              className="mt-2 w-full px-3 py-2 rounded-xl border"
              style={{
                background: "var(--bg-elevated)",
                borderColor: "var(--border)",
                color: "var(--text-primary)",
              }}
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-widest t-text-muted">
              Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-2 w-full px-3 py-2 rounded-xl border"
              style={{
                background: "var(--bg-elevated)",
                borderColor: "var(--border)",
                color: "var(--text-primary)",
              }}
            >
              {ROLE_OPTIONS.map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-widest t-text-muted">
              Actor ID
            </label>
            <input
              value={actorId}
              onChange={(e) => setActorId(e.target.value)}
              className="mt-2 w-full px-3 py-2 rounded-xl border"
              style={{
                background: "var(--bg-elevated)",
                borderColor: "var(--border)",
                color: "var(--text-primary)",
              }}
            />
          </div>
        </div>

        <p className="text-xs mt-4 t-text-muted">
          For per-student customization, set Role to <b>student</b> and Actor ID
          to the student_id value coming from login.
        </p>
      </div>

      <div className="t-card rounded-2xl p-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <h2 className="text-sm font-bold t-text">Available icons</h2>
          <p className="text-xs t-text-muted">
            Selected: {selectedIds.length} / {AVAILABLE_SHORTCUTS.length}
          </p>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {AVAILABLE_SHORTCUTS.map((c) => {
            const isSelected = selectedIds.includes(c.id);
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => toggle(c.id)}
                className="text-left px-4 py-4 rounded-2xl border cursor-pointer transition-all"
                style={{
                  borderColor: isSelected ? "var(--accent-border)" : "var(--border)",
                  background: isSelected ? "var(--accent-soft)" : "var(--bg-elevated)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center border"
                  style={{
                    borderColor: "var(--border)",
                    background: "var(--bg-base)",
                    color: isSelected ? "var(--accent-text)" : "var(--text-sec)",
                  }}
                >
                  {c.icon}
                </div>
                <div className="mt-3 text-sm font-bold" style={{ color: "var(--text-primary)" }}>
                  {c.label}
                </div>
                <div
                  className="mt-2 text-xs font-semibold"
                  style={{ color: isSelected ? "var(--accent-text)" : "var(--text-muted)" }}
                >
                  {isSelected ? "Selected" : "Tap to add"}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

