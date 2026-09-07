import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../lib/api";
import "./Blogs.css";

const BG = "data:image/svg+xml;utf8," + encodeURIComponent(`
<svg xmlns='http://www.w3.org/2000/svg' width='600' height='400'>
  <defs>
    <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
      <stop offset='0' stop-color='#dbeafe'/>
      <stop offset='1' stop-color='#e0e7ff'/>
    </linearGradient>
  </defs>
  <rect width='600' height='400' fill='url(#g)'/>
  <text x='50%' y='50%' font-family='Poppins,sans-serif' font-size='22' font-weight='600' fill='#94a3b8' text-anchor='middle'>EduAItor</text>
</svg>`);

function Blogs() {
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const r = await fetch(`${API_URL}/blog-posts`, {
          headers: { Accept: "application/json" },
        });
        if (!r.ok) throw new Error("");
        const d = await r.json();
        if (active) {
          setPosts(d.data || []);
          setStatus("ready");
        }
      } catch {
        if (active) setStatus("error");
      }
    })();
    return () => { active = false; };
  }, []);

  return (
    <div className="blg">
      <div className="blg-hero">
        <div className="blg-container">
          <p className="blg-eyebrow">EduAItor Blog</p>
          <h1 className="blg-hero__title">Ideas &amp; Insights for Smarter Schools</h1>
          <p className="blg-hero__sub">
            Guides, trends and actionable tips on school management, admissions,
            fees, exams and AI in education — from the EduAItor team.
          </p>
        </div>
      </div>

      <div className="blg-container">
        {status === "loading" && (
          <div className="blg-state">
            <span className="blg-spinner" />
            <p>Loading articles…</p>
          </div>
        )}

        {status === "error" && (
          <div className="blg-state">
            <p className="blg-error__title">We couldn’t load the blog right now.</p>
            <p className="blg-error__sub">Please check back in a little while.</p>
          </div>
        )}

        {status === "ready" && posts.length === 0 && (
          <div className="blg-state">
            <p className="blg-error__title">New articles are on the way.</p>
            <p className="blg-error__sub">Check back soon — we’re preparing fresh content.</p>
          </div>
        )}

        {status === "ready" && posts.length > 0 && (
          <div className="blg-grid">
            {posts.map((post, i) => (
              <BlogCard key={post._id} post={post} i={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function BlogCard({ post, i }) {
  const navigate = useNavigate();
  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
    : "";
  const featured = i === 0 && post.featured;

  return (
    <article
      className={featured ? "blg-card blg-card--featured" : "blg-card"}
      onClick={() => navigate(`/blog/${post.slug}`)}
    >
      <div className="blg-card__media">
        <img
          src={post.coverImage?.url || BG}
          alt={post.title}
          loading={i < 4 ? "eager" : "lazy"}
          onError={(e) => { e.currentTarget.src = BG; }}
        />
        {post.category && <span className="blg-card__cat">{post.category}</span>}
      </div>
      <div className="blg-card__body">
        <div className="blg-card__meta">
          {post.author?.name && <span className="blg-card__author">{post.author.name}</span>}
          {date && <span className="blg-card__dot">·</span>}
          {date && <time>{date}</time>}
          {post.allowComments !== false && (
            <>
              <span className="blg-card__dot">·</span>
              <span>Comments on</span>
            </>
          )}
        </div>
        <h3 className="blg-card__title">{post.title}</h3>
        {post.excerpt && <p className="blg-card__excerpt">{post.excerpt}</p>}
        <span className="blg-card__more">
          Read article <span aria-hidden="true">→</span>
        </span>
      </div>
    </article>
  );
}

export default Blogs;