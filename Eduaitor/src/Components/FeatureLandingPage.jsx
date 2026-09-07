import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./FeatureLandingPage.css";
import { useContactPopup } from "./ContactPopup";
import DemoRequestForm from "./DemoRequestForm";

function upsertMeta(selector, attrs) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement("meta");
    document.head.appendChild(el);
  }
  Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, value));
}

const FeatureLanding = ({ page }) => {
  const { openContactPopup } = useContactPopup();
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    document.title = page.metaTitle;
    upsertMeta('meta[name="title"]', { name: "title", content: page.metaTitle });
    upsertMeta('meta[name="description"]', {
      name: "description",
      content: page.metaDescription,
    });
    upsertMeta('meta[property="og:title"]', {
      property: "og:title",
      content: page.metaTitle,
    });
    upsertMeta('meta[property="og:description"]', {
      property: "og:description",
      content: page.metaDescription,
    });
  }, [page.metaTitle, page.metaDescription]);

  return (
    <div className="fl-page">
      {/* ── Hero ─────────────────────────────────────── */}
      <section className="fl-hero">
        <div className="fl-container fl-hero__grid">
          <div className="fl-hero__copy">
            <p className="fl-eyebrow">{page.hero.eyebrow}</p>
            <h1>{page.hero.title}</h1>
            <p className="fl-hero__sub">{page.hero.subtitle}</p>
            <div className="fl-hero__actions">
              <button
                type="button"
                className="fl-btn fl-btn--primary"
                onClick={() => openContactPopup(page.hero.primary.source)}
              >
                {page.hero.primary.label} <span aria-hidden="true">→</span>
              </button>
              {page.hero.secondary && (
                <Link to={page.hero.secondary.to} className="fl-btn fl-btn--outline">
                  {page.hero.secondary.label}
                </Link>
              )}
            </div>
            <p className="fl-hero__trust">{page.hero.trust}</p>
          </div>
          <div className="fl-hero__visual">
            <figure className="fl-screenshot">
              <img
                src={page.hero.image}
                alt={page.hero.imageAlt}
                loading="eager"
              />
              <figcaption>{page.hero.imageCaption}</figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ── Stats strip ──────────────────────────────── */}
      {page.stats && (
        <section className="fl-stats">
          <div className="fl-container fl-stats__grid">
            {page.stats.map((s) => (
              <div className="fl-stat" key={s.value}>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Intro ────────────────────────────────────── */}
      {page.intro && (
        <section className="fl-intro">
          <div className="fl-container">
            <h2>{page.intro.heading}</h2>
            {page.intro.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </section>
      )}

      {/* ── Why it matters ───────────────────────────── */}
      {page.why && (
        <section className="fl-why">
          <div className="fl-container">
            <h2>{page.why.heading}</h2>
            <p className="fl-section__lead">{page.why.lead}</p>
            <div className="fl-why__grid">
              {page.why.points.map((w) => (
                <article className="fl-why__card" key={w.title}>
                  <span className="fl-why__icon">{w.icon && <w.icon />}</span>
                  <h3>{w.title}</h3>
                  <p>{w.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Features ─────────────────────────────────── */}
      {page.features && (
        <section className="fl-features">
          <div className="fl-container">
            <h2>{page.features.heading}</h2>
            <p className="fl-section__lead">{page.features.lead}</p>
            <div className="fl-features__grid">
              {page.features.items.map((f) => (
                <article className="fl-feature" key={f.title}>
                  <span className="fl-feature__icon">{f.icon && <f.icon />}</span>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Deep dive (long-form, alternating) ───────── */}
      {page.deepDive && (
        <section className="fl-dive">
          <div className="fl-container">
            <h2 className="fl-dive__title">{page.deepDive.heading}</h2>
            {page.deepDive.sections.map((s, idx) => (
              <div
                className={`fl-dive__row${idx % 2 === 1 ? " is-reverse" : ""}`}
                key={s.title}
              >
                <div className="fl-dive__copy">
                  <span className="fl-dive__num">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <h3>{s.title}</h3>
                  {s.body.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                  {s.points && (
                    <ul className="fl-dive__list">
                      {s.points.map((pt) => (
                        <li key={pt}>{pt}</li>
                      ))}
                    </ul>
                  )}
                </div>
                {s.image && (
                  <figure className="fl-screenshot fl-dive__shot">
                    <img src={s.image} alt={s.imageAlt || s.title} loading="lazy" />
                    <figcaption>{s.caption}</figcaption>
                  </figure>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Screenshots gallery ──────────────────────── */}
      {page.screenshots && (
        <section className="fl-gallery">
          <div className="fl-container">
            <h2>{page.screenshots.heading}</h2>
            <div className="fl-gallery__grid">
              {page.screenshots.items.map((s) => (
                <figure className="fl-screenshot fl-gallery__shot" key={s.src}>
                  <img src={s.src} alt={s.alt} loading="lazy" />
                  <figcaption>{s.caption}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── How it works ─────────────────────────────── */}
      {page.howItWorks && (
        <section className="fl-how">
          <div className="fl-container">
            <h2>{page.howItWorks.heading}</h2>
            <div className="fl-how__grid">
              {page.howItWorks.steps.map((st) => (
                <article className="fl-how__step" key={st.title}>
                  <span className="fl-how__num">{st.num}</span>
                  <h3>{st.title}</h3>
                  <p>{st.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Benefits checklist ───────────────────────── */}
      {page.benefits && (
        <section className="fl-benefits">
          <div className="fl-container">
            <h2>{page.benefits.heading}</h2>
            <p className="fl-section__lead">{page.benefits.lead}</p>
            <ul className="fl-benefits__list">
              {page.benefits.items.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ── Summary ───────────────────────────────────── */}
      {page.summary && (
        <section className="fl-summary">
          <div className="fl-container">
            <h2>{page.summary.heading}</h2>
            {page.summary.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </section>
      )}

      {/* ── FAQ ──────────────────────────────────────── */}
      {page.faqs && (
        <section className="fl-faq">
          <div className="fl-container">
            <h2>{page.faqs.heading}</h2>
            <div className="fl-faq__list">
              {page.faqs.items.map((f, i) => (
                <article
                  className={`fl-faq__item${openFaq === i ? " is-open" : ""}`}
                  key={i}
                >
                  <button
                    type="button"
                    className="fl-faq__q"
                    onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                    aria-expanded={openFaq === i}
                  >
                    {f.q} <span aria-hidden="true">{openFaq === i ? "−" : "+"}</span>
                  </button>
                  <div
                    className={`fl-faq__a${openFaq === i ? " is-open" : ""}`}
                    aria-hidden={openFaq !== i}
                  >
                    {f.a}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA banner ───────────────────────────────── */}
      <section className="fl-cta">
        <div className="fl-container fl-cta__inner">
          <div className="fl-cta__copy">
            <h2>{page.cta.heading}</h2>
            <p>{page.cta.text}</p>
            <button
              type="button"
              className="fl-btn fl-btn--light"
              onClick={() => openContactPopup(page.hero.primary.source)}
            >
              Book a Free Demo <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </section>

      {/* ── Demo request form ────────────────────────── */}
      <section className="fl-demo">
        <div className="fl-container fl-demo__grid">
          <div className="fl-demo__copy">
            <p className="fl-eyebrow">{page.demo.eyebrow}</p>
            <h2>{page.demo.heading}</h2>
            <p>{page.demo.text}</p>
            <ul className="fl-demo__list">
              {page.demo.assurances.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </div>
          <DemoRequestForm source={page.demo.source} submitLabel={page.demo.submitLabel} />
        </div>
      </section>
    </div>
  );
};

export default FeatureLanding;