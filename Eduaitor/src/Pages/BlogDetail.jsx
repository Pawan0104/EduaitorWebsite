import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { API_URL } from "../lib/api";
import "./BlogDetail.css";

const BG = "data:image/svg+xml;utf8," + encodeURIComponent(`
<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='560'>
  <defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
    <stop offset='0' stop-color='#dbeafe'/><stop offset='1' stop-color='#e0e7ff'/>
  </linearGradient></defs>
  <rect width='1200' height='560' fill='url(#g)'/>
  <text x='50%' y='50%' font-family='Poppins,sans-serif' font-size='30' font-weight='600' fill='#94a3b8' text-anchor='middle'>EduAItor</text>
</svg>`);

function escapeHtml(s = "") {
  return String(s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

function renderContent(content = "") {
  const html = content.trim();
  if (!html) return "";

  const looksLikeHtml = /<\/?(p|h[1-6]|div|ul|ol|li|img|video|blockquote|pre|figure|hr|table|iframe)\b/i.test(html);
  if (looksLikeHtml) {
    return html;
  }

  const paragraphs = html
    .split(/\n{2,}/)
    .map((block) => block.replace(/\n/g, "<br />"))
    .map((b) => `<p>${b}</p>`)
    .join("");
  return paragraphs;
}

const stripHtml = (html = "") =>
  html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

function BlogDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [comments, setComments] = useState([]);
  const [cStatus, setCStatus] = useState("loading"); // loading | ready | error
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [posting, setPosting] = useState(false);
  const [posted, setPosted] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const r = await fetch(`${API_URL}/blog-posts/${slug}`, {
          headers: { Accept: "application/json" },
        });
        if (r.status === 404) {
          if (active) setNotFound(true);
          return;
        }
        if (!r.ok) throw new Error("");
        const d = await r.json();
        if (!d.data) throw new Error("");
        const data = d.data;
        if (active) {
          setPost(data);
          document.title = data.seo?.metaTitle || `${data.title} | EduAItor Blog`;
          const meta = document.querySelector('meta[name="description"]');
          if (meta) meta.setAttribute("content", data.seo?.metaDescription || stripHtml(data.excerpt || ""));
          if (data.allowComments !== false) loadComments(active);
          else setCStatus("ready");
        }
      } catch {
        if (active) setNotFound(true);
      }
    })();
    return () => { active = false; };
  }, [slug]);

  const loadComments = async (active = true) => {
    setCStatus("loading");
    try {
      const r = await fetch(`${API_URL}/blog-posts/${slug}/comments`, {
        headers: { Accept: "application/json" },
      });
      const d = await r.json();
      if (active) {
        setComments(d.data || []);
        setCStatus("ready");
      }
    } catch {
      if (active) setCStatus("error");
    }
  };

  const submitComment = async (e) => {
    e.preventDefault();
    setFormError("");
    if (!name.trim() || !comment.trim()) {
      setFormError("Please provide your name and a comment.");
      return;
    }
    setPosting(true);
    try {
      const r = await fetch(`${API_URL}/blog-posts/${slug}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), comment: comment.trim() }),
      });
      const d = await r.json();
      if (!r.ok || d && d.success === false) {
        setFormError(d.message || "Could not post your comment.");
        setPosting(false);
        return;
      }
      setPosted(true);
      setName(""); setEmail(""); setComment("");
      await loadComments();
    } catch {
      setFormError("Network error. Please try again.");
    } finally {
      setPosting(false);
    }
  };

  if (notFound) {
    return (
      <div className="bld bld--state">
        <p className="bld-404__title">Article not found</p>
        <p className="bld-404__sub">It may have been unpublished or the link is incorrect.</p>
        <Link to="/blogs" className="bld-btn bld-btn--primary">Back to Blog</Link>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="bld bld--state">
        <span className="bld-spinner" />
        <p className="bld-loading">Loading article…</p>
      </div>
    );
  }

  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })
    : "";
  const wordCount = stripHtml(post.content).split(/\s+/).filter(Boolean).length;

  return (
    <div className="bld">
      <div className="bld-container">
        <Link to="/blogs" className="bld-back">← All articles</Link>

        <header className="bld-head">
          {post.category && <span className="bld-cat">{post.category}</span>}
          <h1 className="bld-title">{post.title}</h1>
          {post.excerpt && <p className="bld-excerpt">{post.excerpt}</p>}
          <div className="bld-meta">
            {post.author?.name && (
              <span className="bld-author">
                <span className="bld-avatar">{post.author.name.charAt(0)}</span>
                {post.author.name}
              </span>
            )}
            {date && <span className="bld-dot">·</span>}
            {date && <time>{date}</time>}
            {wordCount > 0 && <span className="bld-dot">·</span>}
            {wordCount > 0 && <span>{wordCount} min read</span>}
          </div>
        </header>

        <figure className="bld-cover">
          <img
            src={post.coverImage?.url || BG}
            alt={post.title}
            onError={(e) => { e.currentTarget.src = BG; }}
          />
        </figure>

        <div
          className="bld-content"
          dangerouslySetInnerHTML={{ __html: renderContent(post.content) }}
        />

        {(post.tags || []).length > 0 && (
          <div className="bld-tags">
            {(post.tags || []).map((t) => (
              <span key={t} className="bld-tag">#{t}</span>
            ))}
          </div>
        )}

        <hr className="bld-rule" />

        <section className="bld-comments">
          <h2 className="bld-comments__title">
            Comments{" "}
            <span className="bld-comments__count">
              {post.allowComments === false ? "" : `(${comments.length})`}
            </span>
          </h2>

          {post.allowComments === false ? (
            <p className="bld-comments__off">Comments are turned off for this article.</p>
          ) : (
            <>
              {cStatus === "loading" && <p className="bld-comments__off">Loading comments…</p>}
              {cStatus === "error" && <p className="bld-comments__off">Could not load comments.</p>}
              {cStatus === "ready" && comments.length === 0 && (
                <p className="bld-comments__off">
                  No comments yet — be the first to share your thoughts.
                </p>
              )}
              {cStatus === "ready" && comments.length > 0 && (
                <div className="bld-comments__list">
                  {comments.map((c) => (
                    <div key={c._id} className="bld-comment">
                      <span className="bld-comment__avatar">{escapeHtml(c.name.charAt(0).toUpperCase())}</span>
                      <div className="bld-comment__body">
                        <div className="bld-comment__head">
                          <span className="bld-comment__name">{escapeHtml(c.name)}</span>
                          <time className="bld-comment__date">
                            {new Date(c.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                          </time>
                        </div>
                        <p className="bld-comment__text">{escapeHtml(c.comment)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <form className="bld-form" onSubmit={submitComment}>
                <h3 className="bld-form__title">Leave a comment</h3>
                {posted && <p className="bld-form__ok">Thanks! Your comment has been posted.</p>}
                <div className="bld-form__row">
                  <input
                    className="bld-input"
                    placeholder="Your name *"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    maxLength={80}
                  />
                  <input
                    className="bld-input"
                    type="email"
                    placeholder="Email (optional, not shown)"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <textarea
                  className="bld-input"
                  placeholder="Write your comment… *"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  maxLength={2000}
                />
                {formError && <p className="bld-form__err">{formError}</p>}
                <button className="bld-btn bld-btn--primary" type="submit" disabled={posting}>
                  {posting ? "Posting…" : "Post Comment"}
                </button>
              </form>
            </>
          )}
        </section>
      </div>
    </div>
  );
}

export default BlogDetail;