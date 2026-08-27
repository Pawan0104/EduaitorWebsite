import React, { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Icons } from "../Components/icons";
import { ecosystemModules } from "../data/ecosystemModules";
import "./EcosystemPage.css";
import { useContactPopup } from "../Components/ContactPopup";

const FEATURE_TONES = ["blue", "green", "amber", "purple", "teal", "orange", "pink", "navy"];
const STAT_TONES = ["blue", "green", "purple", "orange"];

function FeatureIcon({ tone }) {
  return (
    <span className={`eco-feat-icon eco-feat-icon--${tone}`} aria-hidden="true">
      {React.cloneElement(Icons.check)}
    </span>
  );
}

function hashSeed(str) {
  let h = 0;
  for (let i = 0; i < str.length; i += 1) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h;
}

function shortLabel(text, maxWords = 3) {
  return String(text || "")
    .split(/\s+/)
    .slice(0, maxWords)
    .join(" ");
}

function buildModuleDashboard(module) {
  const features = module.features || [];
  const seed = hashSeed(module.id || module.num || module.title);
  const pick = (i, mod) => ((seed >> (i * 3)) + i * 17) % mod;

  const overviewStats = [0, 1, 2, 3].map((i) => {
    const feature = features[i] || features[0] || { title: "Metric" };
    return {
      label: shortLabel(feature.title, 3),
      value: [
        `${(8 + pick(0, 40)) / 10}k`,
        `${78 + pick(1, 20)}.${pick(2, 9)}%`,
        `${40 + pick(3, 160)}`,
        pick(4, 2) ? "Live" : `${String(2 + pick(5, 12)).padStart(2, "0")}`,
      ][i],
      delta: [
        `↑ ${(1 + pick(0, 8))}.${pick(1, 9)}%`,
        `↑ ${(1 + pick(2, 6))}.${pick(3, 9)}%`,
        `↑ ${(2 + pick(4, 9))}.${pick(5, 9)}%`,
        pick(6, 2) ? "Today" : "Updated",
      ][i],
      tone: STAT_TONES[i],
    };
  });

  const overviewBars = Array.from({ length: 7 }, (_, i) => 34 + pick(i + 2, 55));
  const overviewActivities = features.slice(0, 4).map((f, i) => {
    const verbs = ["Updated", "Completed", "Synced", "Generated", "Sent", "Reviewed"];
    return `${verbs[(seed + i) % verbs.length]} · ${f.title}`;
  });
  const overviewActions = features.slice(0, 4).map((f) => shortLabel(f.title, 3));

  const tabs = [
    {
      id: "overview",
      label: "Overview",
      heading: module.title,
      sub: module.tagline,
      chartTitle: `${shortLabel(module.short, 3)} trend`,
      chartHint: "This week",
      bars: overviewBars,
      stats: overviewStats,
      activities:
        overviewActivities.length > 0
          ? overviewActivities
          : ["Module activity will appear here", "Reports refresh in real time"],
      quickActions:
        overviewActions.length > 0
          ? overviewActions
          : ["Open module", "View report", "Add record", "Share"],
    },
    ...features.slice(0, 5).map((f, fi) => {
      const localSeed = seed + fi * 11;
      const lp = (i, mod) => ((localSeed >> (i * 2)) + i * 13) % mod;
      return {
        id: `feature-${fi}`,
        label: shortLabel(f.title, 2),
        heading: f.title,
        sub: f.desc,
        chartTitle: `${shortLabel(f.title, 2)} trend`,
        chartHint: "Last 7 days",
        bars: Array.from({ length: 7 }, (_, i) => 28 + lp(i, 60)),
        stats: [
          {
            label: "Active records",
            value: `${120 + lp(0, 880)}`,
            delta: `↑ ${(1 + lp(1, 8))}.${lp(2, 9)}%`,
            tone: "blue",
          },
          {
            label: "Completion",
            value: `${72 + lp(3, 25)}.${lp(4, 9)}%`,
            delta: `↑ ${(1 + lp(5, 6))}.${lp(6, 9)}%`,
            tone: "green",
          },
          {
            label: "Pending",
            value: `${8 + lp(0, 40)}`,
            delta: lp(1, 2) ? "Today" : "Queue",
            tone: "orange",
          },
          {
            label: "Status",
            value: lp(2, 2) ? "Live" : "Ready",
            delta: "Synced",
            tone: "purple",
          },
        ],
        activities: [
          `Opened · ${f.title}`,
          `Updated · ${f.title} settings`,
          `Synced · ${f.title} data`,
          `Report · ${shortLabel(f.title, 2)} exported`,
        ],
        quickActions: ["Create new", "Export", "Filters", "Refresh"],
      };
    }),
    {
      id: "settings",
      label: "Settings",
      heading: `${module.title} Settings`,
      sub: "Configure access, alerts and automation for this module.",
      chartTitle: "Config health",
      chartHint: "Stable",
      bars: Array.from({ length: 7 }, (_, i) => 45 + ((seed + i * 9) % 40)),
      stats: [
        { label: "Roles", value: `${4 + (seed % 5)}`, delta: "Active", tone: "blue" },
        { label: "Alerts", value: `${2 + (seed % 6)}`, delta: "On", tone: "green" },
        { label: "Integrations", value: `${1 + (seed % 4)}`, delta: "Linked", tone: "purple" },
        { label: "Backup", value: "OK", delta: "Daily", tone: "orange" },
      ],
      activities: [
        "Updated · Role permissions",
        "Enabled · Email alerts",
        "Synced · Integration keys",
        "Reviewed · Audit log",
      ],
      quickActions: ["Users", "Alerts", "Integrations", "Audit"],
    },
  ];

  return tabs;
}

function ModuleDashboard({ module }) {
  const tabs = useMemo(() => buildModuleDashboard(module), [module]);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    setActiveTab(0);
  }, [module.id]);

  const dash = tabs[Math.min(activeTab, tabs.length - 1)] || tabs[0];

  return (
    <div className={`eco-dash eco-dash--${module.accent}`}>
      <header className="eco-dash__top">
        <div className="eco-dash__brand-row">
          <div className="eco-dash__brand">EduAitor</div>
          <nav className="eco-dash__tabs" aria-label="Dashboard sections">
            {tabs.map((item, idx) => (
              <button
                key={`${module.id}-${item.id}`}
                type="button"
                className={idx === activeTab ? "is-active" : undefined}
                onClick={() => setActiveTab(idx)}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="eco-dash__head">
          <div>
            <strong>{dash.heading}</strong>
            <p>{dash.sub}</p>
          </div>
          <div className="eco-dash__avatars" aria-hidden="true">
            <span />
            <span />
          </div>
        </div>
      </header>

      <div className="eco-dash__main">
        <div className="eco-dash__stats">
          {dash.stats.map((s) => (
            <article key={`${module.id}-${activeTab}-${s.label}`} className={`eco-dash__stat eco-dash__stat--${s.tone}`}>
              <span>{s.label}</span>
              <strong>{s.value}</strong>
              <em>{s.delta}</em>
            </article>
          ))}
        </div>
        <div className="eco-dash__widgets">
          <div className="eco-dash__chart">
            <div className="eco-dash__chart-head">
              <strong>{dash.chartTitle}</strong>
              <span>{dash.chartHint}</span>
            </div>
            <div className="eco-dash__bars" key={`${module.id}-${activeTab}`}>
              {dash.bars.map((h, i) => (
                <i key={`${module.id}-${activeTab}-bar-${i}`} style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
          <div className="eco-dash__feed">
            <div className="eco-dash__chart-head">
              <strong>Recent activity</strong>
              <span>View all</span>
            </div>
            <ul>
              {dash.activities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="eco-dash__actions">
          {dash.quickActions.map((label, idx) => (
            <button
              key={`${module.id}-${activeTab}-${label}`}
              type="button"
              onClick={() => setActiveTab(Math.min(idx + 1, tabs.length - 1))}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function EcosystemPage() {
  const { openContactPopup } = useContactPopup();
  const [params, setParams] = useSearchParams();
  const initialId = params.get("module") || ecosystemModules[0].id;
  const [activeId, setActiveId] = useState(initialId);

  useEffect(() => {
    const fromUrl = params.get("module");
    if (fromUrl && ecosystemModules.some((m) => m.id === fromUrl)) {
      setActiveId(fromUrl);
    }
  }, [params]);

  const active = useMemo(
    () => ecosystemModules.find((m) => m.id === activeId) || ecosystemModules[0],
    [activeId]
  );

  const selectModule = (id) => {
    setActiveId(id);
    setParams({ module: id }, { replace: true });
    const panel = document.getElementById("eco-panel");
    if (panel && window.matchMedia("(max-width: 980px)").matches) {
      panel.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="eco-page">
      <section className="eco-hero">
        <div className="eco-container">
          <span className="eco-hero__badge">THE EDUAITOR ECOSYSTEM</span>
          <h1 className="eco-hero__title">
            One Intelligent <span>Ecosystem.</span> Endless Possibilities.
          </h1>
          <p className="eco-hero__sub">
            Explore every module of the EduAitor platform — administration, academics, AI,
            communication, finance and more — with a live feature view for each capability.
          </p>
        </div>
      </section>

      <section className="eco-shell">
        <div className="eco-container">
          <div className={`eco-workspace eco-workspace--${active.accent}`} id="eco-panel">
            <aside className="eco-nav" aria-label="Ecosystem modules">
              <p className="eco-nav__label">THE EDUAITOR ECOSYSTEM</p>
              <nav className="eco-nav__list">
                {ecosystemModules.map((mod) => (
                  <button
                    key={mod.id}
                    type="button"
                    className={`eco-nav__item${activeId === mod.id ? " is-active" : ""}`}
                    onClick={() => selectModule(mod.id)}
                  >
                    <span className="eco-nav__num">{mod.num}</span>
                    <span className="eco-nav__text">{mod.short}</span>
                  </button>
                ))}
              </nav>
            </aside>

            <div className="eco-panel__intro">
              <div className="eco-panel__badges">
                <span className="eco-panel__num">{active.num}</span>
                <span className="eco-panel__badge">{active.badge}</span>
              </div>
              <h2 className="eco-panel__title">{active.title}</h2>
              <p className="eco-panel__tagline">{active.tagline}</p>
              <p className="eco-panel__desc">{active.description}</p>

              <div className="eco-features">
                {active.features.map((f, idx) => (
                  <div className="eco-feature" key={f.title}>
                    <FeatureIcon tone={FEATURE_TONES[idx % FEATURE_TONES.length]} />
                    <div>
                      <h3>{f.title}</h3>
                      <p>{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {active.highlights?.length > 0 && (
                <div className="eco-love">
                  <h3>Why Schools Love It</h3>
                  <ul>
                    {active.highlights.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="eco-panel__visual">
              <ModuleDashboard module={active} />
            </div>
          </div>

          <div className={`eco-cta eco-cta--${active.accent}`}>
            <div className="eco-cta__copy">
              <h3>{active.ctaTitle}</h3>
              <p>{active.ctaText}</p>
            </div>
            <div className="eco-cta__actions">
              <button
                type="button"
                className="eco-btn eco-btn--primary"
                onClick={() => openContactPopup("ecosystem-book-demo")}
              >
                Book a Demo
              </button>
              <Link to="/plans" className="eco-btn eco-btn--outline">
                Explore EduAitor ONE
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
