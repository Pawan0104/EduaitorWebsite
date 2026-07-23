import React, { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Icons } from "../Components/icons";
import { ecosystemModules } from "../data/ecosystemModules";
import "./EcosystemPage.css";

function ModuleIcon({ accent }) {
  return (
    <span className={`eco-feat-icon eco-feat-icon--${accent}`} aria-hidden="true">
      {React.cloneElement(Icons.check)}
    </span>
  );
}

export default function EcosystemPage() {
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
        <div className="eco-container eco-shell__grid">
          <aside className="eco-sidebar" aria-label="Ecosystem modules">
            <p className="eco-sidebar__label">THE EDUAITOR ECOSYSTEM</p>
            <nav className="eco-sidebar__nav">
              {ecosystemModules.map((mod) => (
                <button
                  key={mod.id}
                  type="button"
                  className={`eco-sidebar__item${activeId === mod.id ? " is-active" : ""}`}
                  onClick={() => selectModule(mod.id)}
                >
                  <span className="eco-sidebar__num">{mod.num}</span>
                  <span className="eco-sidebar__text">{mod.short}</span>
                </button>
              ))}
            </nav>
          </aside>

          <div className="eco-panel" id="eco-panel">
            {active.preview ? (
              <div className="eco-design">
                <img
                  src={`${active.preview}?v=3`}
                  alt={`${active.title} module details`}
                  className="eco-design__img"
                />
              </div>
            ) : (
              <div className={`eco-panel__inner eco-panel__inner--${active.accent}`}>
                <div className="eco-panel__intro">
                  <div className="eco-panel__badges">
                    <span className="eco-panel__num">{active.num}</span>
                    <span className="eco-panel__badge">{active.badge}</span>
                  </div>
                  <h2 className="eco-panel__title">{active.title}</h2>
                  <p className="eco-panel__tagline">{active.tagline}</p>
                  <p className="eco-panel__desc">{active.description}</p>

                  <div className="eco-features">
                    {active.features.map((f) => (
                      <div className="eco-feature" key={f.title}>
                        <ModuleIcon accent={active.accent} />
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
              </div>
            )}

            <div className={`eco-cta eco-cta--${active.accent}`}>
              <div className="eco-cta__copy">
                <h3>{active.ctaTitle}</h3>
                <p>{active.ctaText}</p>
              </div>
              <div className="eco-cta__actions">
                <Link to="/bookademo" className="eco-btn eco-btn--primary">
                  Book a Demo
                </Link>
                <Link to="/plans" className="eco-btn eco-btn--outline">
                  Explore EduAitor ONE
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
