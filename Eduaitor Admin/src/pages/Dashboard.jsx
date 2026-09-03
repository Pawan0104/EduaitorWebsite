import { useEffect, useState } from "react";
import {
  FaUsers,
  FaBook,
  FaCalendarCheck,
  FaEnvelope,
  FaArrowUp,
  FaArrowDown,
  FaCalendarAlt,
  FaImages,
  FaBlog,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { apiClient, getAdminJwtPayload } from "../lib/api";

const STATS = [
  {
    label: "Total Users",
    value: "2,481",
    change: "+12%",
    up: true,
    icon: <FaUsers />,
  },
  {
    label: "Demos",
    value: "34",
    change: "+3",
    up: true,
    icon: <FaBook />,
  },
  {
    label: "Visits Today",
    value: "128",
    change: "-5%",
    up: false,
    icon: <FaCalendarCheck />,
  },
  {
    label: "New Messages",
    value: "17",
    change: "+8",
    up: true,
    icon: <FaEnvelope />,
  },
];

const ACTIVITY = [
  { action: "New user registered", time: "2 min ago" },
  { action: "Demo 'React Basics' updated", time: "14 min ago" },
  { action: "Contact form submission", time: "1 hr ago" },
  { action: "Gallery image uploaded", time: "3 hr ago" },
  { action: "Blog post published", time: "5 hr ago" },
  { action: "Team member added", time: "Yesterday" },
];

// “Frequently used icons” shown on the dashboard home/front screen.
// This list must stay consistent with `HomeShortcuts` + backend defaults.
const HOME_SHORTCUT_CATALOG = [
  {
    id: "demoBooking",
    label: "View Demo Booking",
    path: "/admin/demo",
    icon: <FaCalendarAlt size={14} />,
  },
  {
    id: "contacts",
    label: "View Contacts",
    path: "/admin/contact",
    icon: <FaEnvelope size={14} />,
  },
  {
    id: "uploadImage",
    label: "Upload Image",
    path: "/admin/gallery",
    icon: <FaImages size={14} />,
  },
  {
    id: "newBlog",
    label: "New Blog",
    path: "/admin/blog",
    icon: <FaBlog size={14} />,
  },
];

const DEFAULT_HOME_SHORTCUT_IDS = HOME_SHORTCUT_CATALOG.map((c) => c.id);

export default function Dashboard() {
  const [selectedShortcutIds, setSelectedShortcutIds] = useState(
    DEFAULT_HOME_SHORTCUT_IDS,
  );
  const [loadingShortcuts, setLoadingShortcuts] = useState(true);

  const loadShortcuts = async () => {
    const payload = getAdminJwtPayload();

    const role = localStorage.getItem("homeShortcutRole") || "admin";
    const schoolId =
      localStorage.getItem("homeShortcutSchoolId") || "default";
    const actorId =
      localStorage.getItem("homeShortcutActorId") ||
      payload?.email ||
      "admin";

    try {
      setLoadingShortcuts(true);
      const res = await apiClient.get("/home-frequent-icons", {
        params: { schoolId, role, actorId },
      });

      const ids = Array.isArray(res.data?.homeFrequentIcons)
        ? res.data.homeFrequentIcons
        : [];
      setSelectedShortcutIds(ids.length ? ids : DEFAULT_HOME_SHORTCUT_IDS);
    } catch (err) {
      console.error("Failed to load home shortcuts:", err?.response?.data);
      setSelectedShortcutIds(DEFAULT_HOME_SHORTCUT_IDS);
    } finally {
      setLoadingShortcuts(false);
    }
  };

  useEffect(() => {
    loadShortcuts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const quickActions = selectedShortcutIds
    .map((id) => HOME_SHORTCUT_CATALOG.find((c) => c.id === id))
    .filter(Boolean);

  return (
    <div className="p-5 lg:p-8 space-y-8 max-w-7xl mx-auto w-full t-base">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black tracking-tight t-text">Dashboard   (DEMO Hard Coded)</h1>
        <p className="text-sm mt-1 t-text-sec">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {STATS.map((s) => (
          <div
            key={s.label}
            className="t-card rounded-2xl p-5 hover:scale-[1.02] transition-transform"
          >
            <div className="flex items-start justify-between mb-4">
              {/* Icon */}
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-sm t-accent-bg t-accent-text border border-(--accent-border)">
                {s.icon}
              </div>

              {/* Change */}
              <span
                className={`flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${
                  s.up
                    ? "text-green-500 bg-green-500/10"
                    : "text-red-500 bg-red-500/10"
                }`}
              >
                {s.up ? <FaArrowUp size={8} /> : <FaArrowDown size={8} />}
                {s.change}
              </span>
            </div>

            <p className="text-2xl font-black t-text">{s.value}</p>
            <p className="text-xs mt-1 t-text-sec">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Activity */}
        <div className="lg:col-span-2 t-card rounded-2xl p-6">
          <h2 className="text-sm font-bold mb-5 flex items-center gap-2 t-text">
            <span className="w-1.5 h-1.5 rounded-full bg-(--accent) animate-pulse" />
            Recent Activity
          </h2>

          <div className="space-y-4">
            {ACTIVITY.map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-(--accent)" />
                <p className="text-sm flex-1 t-text">{item.action}</p>
                <span className="text-xs t-text-muted">{item.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel */}
        <div className="t-card rounded-2xl p-6 flex flex-col gap-6">
          {/* Quick Actions */}
          <div>
            <h2 className="text-sm font-bold mb-4 t-text">Quick Actions</h2>

            <div className="space-y-2.5">
              {quickActions.map((q) => (
                <Link
                  key={q.id}
                  to={q.path}
                  className="flex items-center justify-between px-4 py-3 rounded-xl border text-sm font-semibold transition-all t-hover t-border t-text"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center text-sm t-accent-bg t-accent-text border border-(--accent-border)">
                      {q.icon}
                    </div>
                    <span>{q.label}</span>
                  </div>
                  <svg
                    className="w-3.5 h-3.5 opacity-60"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>

          {/* System Status */}
          <div className="pt-5 border-t t-divider">
            <p className="text-xs font-bold uppercase tracking-widest mb-3 t-text-muted">
              System Status
            </p>

            <div className="space-y-3">
              {[
                ["API", 98],
                ["Database", 100],
                ["Storage", 74],
              ].map(([name, pct]) => (
                <div key={name}>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="t-text-sec">{name}</span>
                    <span className="t-text-muted">{pct}%</span>
                  </div>

                  <div className="h-1 bg-(--border-sub) rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-(--accent)"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
