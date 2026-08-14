import { NavLink, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { clearAdminSession } from "../lib/api";
import {
  FaTachometerAlt,
  FaBook,
  FaUsers,
  FaCalendarCheck,
  FaEnvelope,
  FaImages,
  FaBlog,
  FaCog,
  FaSignOutAlt,
  FaTimes,
  FaCalendarAlt,
} from "react-icons/fa";

const NAV_SECTIONS = [
  {
    label: "Main",
    links: [
      {
        name: "Dashboard",
        path: "/admin/dashboard",
        icon: <FaTachometerAlt />,
      },
      { name: "Plans", path: "/admin/plan", icon: <FaBook /> },
      { name: "Demos", path: "/admin/demo", icon: <FaCalendarAlt /> },
      // { name: "Team", path: "/admin/team", icon: <FaUsers /> },
      // { name: "Visits", path: "/admin/visit", icon: <FaCalendarCheck /> },
    ],
  },
  {
    label: "Content",
    links: [
      {
        name: "Institutions Logos",
        path: "/admin/institute",
        icon: <FaEnvelope />,
      },
      {
        name: "Testimonials",
        path: "/admin/testimonial",
        icon: <FaEnvelope />,
      },
      { name: "Awards", path: "/admin/award", icon: <FaEnvelope /> },
      { name: "Contacts", path: "/admin/contact", icon: <FaEnvelope /> },
      { name: "Gallery", path: "/admin/gallery", icon: <FaImages /> },
      { name: "Blogs", path: "/admin/blog", icon: <FaBlog /> },
      { name: "Settings", path: "/admin/setting", icon: <FaCog /> },
    ],
  },
];

export default function Sidebar({ closeSidebar }) {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const handleLogout = () => {
    clearAdminSession();
    navigate("/admin/login");
  };

  return (
    <div className="flex flex-col h-full t-sidebar w-56">
      {/* ── Brand ───────────────────────────────────────── */}
      {closeSidebar && (
        <div
          className="flex items-center justify-between px-5 py-4 shrink-0"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          <div className="flex items-center gap-2">
            {isDark ? (
              // Dark Mode: Show TEXT only
              <span
                className="font-black text-base tracking-tight"
                style={{ color: "var(--text-primary)" }}
              >
                Edu<span style={{ color: "var(--accent)" }}>AI</span>tor
              </span>
            ) : (
              // Light Mode: Show IMAGE only
              <img
                src="/logo1-Photoroom.png"
                alt="EduAItor"
                className="h-12 w-auto object-contain"
              />
            )}
          </div>

          <button onClick={closeSidebar} className="t-icon-btn lg:hidden">
            <FaTimes size={15} />
          </button>
        </div>
      )}

      {/* ── Nav ─────────────────────────────────────────── */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
        {NAV_SECTIONS.map((section) => (
          <div key={section.label}>
            <p
              className="text-[10px] font-bold uppercase tracking-widest px-3 mb-2"
              style={{ color: "var(--text-muted)" }}
            >
              {section.label}
            </p>

            <div className="space-y-0.5">
              {section.links.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={closeSidebar}
                  className={({ isActive }) =>
                    `t-nav-link${isActive ? " active" : ""}`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {/* active indicator bar */}
                      {isActive && (
                        <span
                          className="absolute left-0 top-1/4 bottom-1/4 w-0.5 rounded-r-full"
                          style={{ backgroundColor: "var(--accent)" }}
                        />
                      )}

                      {/* icon */}
                      <span
                        className="text-xs"
                        style={{
                          color: isActive
                            ? "var(--accent)"
                            : "var(--text-muted)",
                        }}
                      >
                        {link.icon}
                      </span>

                      {link.name}
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* ── Logout ──────────────────────────────────────── */}
      <div
        className="px-3 py-4 shrink-0"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer"
          style={{
            color: "var(--danger-text)",
            background: "transparent",
            border: "1px solid transparent",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--danger-soft)";
            e.currentTarget.style.borderColor = "var(--danger-border)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.borderColor = "transparent";
          }}
        >
          <FaSignOutAlt size={13} />
          Sign Out
        </button>
      </div>
    </div>
  );
}
