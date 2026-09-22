import { writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.join(__dirname, "..", "public");
const SITE_ROOT = "https://eduaitor.com";
const BLOG_API = "https://eduaitorwebsite.onrender.com/api/blog-posts";

const STATIC_ROUTES = [
  { path: "/", priority: "1.0", changefreq: "daily" },
  { path: "/solution", priority: "0.9", changefreq: "weekly" },
  { path: "/why", priority: "0.9", changefreq: "weekly" },
  { path: "/ecosystem", priority: "0.9", changefreq: "weekly" },
  { path: "/ignitex", priority: "0.8", changefreq: "weekly" },
  { path: "/plans", priority: "0.8", changefreq: "weekly" },
  { path: "/marketplace", priority: "0.7", changefreq: "monthly" },
  { path: "/bookademo", priority: "0.8", changefreq: "monthly" },
  { path: "/about-us", priority: "0.6", changefreq: "monthly" },
  { path: "/aboutus", priority: "0.6", changefreq: "monthly" },
  { path: "/our-mission", priority: "0.5", changefreq: "monthly" },
  { path: "/our-team", priority: "0.5", changefreq: "monthly" },
  { path: "/careers", priority: "0.5", changefreq: "monthly" },
  { path: "/partners", priority: "0.5", changefreq: "monthly" },
  { path: "/contactus", priority: "0.7", changefreq: "monthly" },
  { path: "/privacy-policy", priority: "0.3", changefreq: "yearly" },
  { path: "/terms-and-conditions", priority: "0.3", changefreq: "yearly" },
  { path: "/refund-policy", priority: "0.3", changefreq: "yearly" },
  { path: "/blogs", priority: "0.8", changefreq: "daily" },
  { path: "/case-studies", priority: "0.6", changefreq: "monthly" },
  { path: "/webinars", priority: "0.5", changefreq: "monthly" },
  { path: "/downloads", priority: "0.4", changefreq: "monthly" },
  { path: "/whats-new", priority: "0.5", changefreq: "weekly" },
  { path: "/help-center", priority: "0.4", changefreq: "monthly" },
  { path: "/knowledge-base", priority: "0.4", changefreq: "monthly" },
  { path: "/school-erp-software/school-management-software", priority: "0.9", changefreq: "weekly" },
  { path: "/ai-school-erp", priority: "0.9", changefreq: "weekly" },
  { path: "/attendance-management-system", priority: "0.8", changefreq: "weekly" },
  { path: "/fee-management-software", priority: "0.8", changefreq: "weekly" },
  { path: "/exam-management-system", priority: "0.8", changefreq: "weekly" },
  { path: "/parent-mobile-app", priority: "0.8", changefreq: "weekly" },
  { path: "/student-information-system", priority: "0.8", changefreq: "weekly" },
  { path: "/school-lms", priority: "0.8", changefreq: "weekly" },
  { path: "/ai-academic-assistant", priority: "0.8", changefreq: "weekly" },
  { path: "/ai-question-paper-generator", priority: "0.8", changefreq: "weekly" },
  { path: "/ai-worksheet-generator", priority: "0.8", changefreq: "weekly" },
  { path: "/ai-report-card-generator", priority: "0.8", changefreq: "weekly" },
  { path: "/ai-school-analytics", priority: "0.8", changefreq: "weekly" },
];

async function fetchBlogSlugs() {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15000);
    const res = await fetch(BLOG_API, {
      headers: { Accept: "application/json" },
      signal: controller.signal,
    });
    clearTimeout(timer);
    if (!res.ok) return [];
    const data = await res.json();
    const posts = Array.isArray(data.data) ? data.data : [];
    return posts
      .filter((p) => p && /^[a-z0-9-]+$/i.test(String(p.slug || "")))
      .map((p) => ({
        path: `/blog/${p.slug}`,
        lastmod: p.updatedAt || p.publishedAt || "",
      }));
  } catch (err) {
    console.warn("[sitemap] Could not fetch blog posts:", err.message);
    return [];
  }
}

function escapeXml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function main() {
  const blog = await fetchBlogSlugs();
  const lastmod = new Date().toISOString();

  const urls = [
    ...STATIC_ROUTES.map((r) => ({
      loc: `${SITE_ROOT}${r.path}`,
      lastmod,
      changefreq: r.changefreq,
      priority: r.priority,
    })),
    ...blog.map((b) => ({
      loc: `${SITE_ROOT}${b.path}`,
      lastmod: b.lastmod || lastmod,
      changefreq: "monthly",
      priority: "0.7",
    })),
  ];

  const body = urls
    .map(
      (u) => `  <url>
    <loc>${escapeXml(u.loc)}</loc>
    <lastmod>${escapeXml(u.lastmod)}</lastmod>
    <changefreq>${escapeXml(u.changefreq)}</changefreq>
    <priority>${escapeXml(u.priority)}</priority>
  </url>`,
    )
    .join("\n");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${body}
</urlset>
`;

  await mkdir(PUBLIC_DIR, { recursive: true });
  await writeFile(path.join(PUBLIC_DIR, "sitemap.xml"), sitemap, "utf8");

  const robots = `User-agent: *
Allow: /

Sitemap: ${SITE_ROOT}/sitemap.xml
`;
  await writeFile(path.join(PUBLIC_DIR, "robots.txt"), robots, "utf8");

  console.log(`[sitemap] Wrote ${urls.length} URLs (${blog.length} blog posts) to public/sitemap.xml + robots.txt`);
}

main().catch((err) => {
  console.error("[sitemap] Failed:", err);
  process.exit(1);
});