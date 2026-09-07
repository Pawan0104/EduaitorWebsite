import BlogPost from "../models/blogPost.js";
import BlogComment from "../models/blogComment.js";
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";
import { deleteFromCloudinary } from "../utils/deleteFromCloudinary.js";

export const slugify = (value = "") =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

const uniqueSlug = async (base, excludeId) => {
  const candidate = base || "blog-post";
  let slug = candidate;
  let index = 1;
  // eslint-disable-next-line no-await-in-loop
  while (await BlogPost.findOne({ slug, _id: { $ne: excludeId } })) {
    slug = `${candidate}-${index}`;
    index += 1;
  }
  return slug;
};

const pick = (body) => ({
  title: String(body.title || "").trim(),
  slug: String(body.slug || "").trim(),
  excerpt: String(body.excerpt || "").trim(),
  content: String(body.content || ""),
  author: {
    name: String(body.authorName || body.author || "").trim(),
    avatarUrl: String(body.authorAvatarUrl || "").trim(),
  },
  category: String(body.category || "").trim(),
  tags: Array.isArray(body.tags)
    ? body.tags.map((t) => String(t).trim()).filter(Boolean)
    : String(body.tags || "")
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
  seo: {
    metaTitle: String(body.metaTitle || "").trim(),
    metaDescription: String(body.metaDescription || "").trim(),
    keywords: String(body.keywords || "").trim(),
  },
  status: body.status === "published" ? "published" : "draft",
  featured: body.featured === "true" || body.featured === true,
  allowComments:
    body.allowComments === "false" ? false : body.allowComments !== false,
});

export const getBlogPosts = async (req, res) => {
  try {
    const limit = Math.min(Number(req.query.limit) || 100, 200);
    const posts = await BlogPost.find({ status: "published" })
      .sort({ publishedAt: -1, _id: -1 })
      .limit(limit)
      .select("-content -seo");

    const counts = await BlogComment.aggregate([
      { $match: { status: "approved", post: { $in: posts.map((p) => p._id) } } },
      { $group: { _id: "$post", count: { $sum: 1 } } },
    ]);
    const countMap = Object.fromEntries(counts.map((c) => [String(c._id), c.count]));

    const data = posts.map((p) => ({
      ...p.toObject(),
      commentCount: countMap[String(p._id)] || 0,
    }));

    return res.json({ success: true, data });
  } catch (error) {
    console.error("getBlogPosts error:", error.message);
    return res.status(500).json({ success: false, message: "Failed to load blogs" });
  }
};

export const getBlogPostBySlug = async (req, res) => {
  try {
    const post = await BlogPost.findOne({
      slug: req.params.slug,
      status: "published",
    });
    if (!post) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    post.viewCount += 1;
    await post.save({ timestamps: false }).catch(() => {});

    const commentCount = await BlogComment.countDocuments({
      post: post._id,
      status: "approved",
    });

    return res.json({ success: true, data: { ...post.toObject(), commentCount } });
  } catch (error) {
    console.error("getBlogPostBySlug error:", error.message);
    return res.status(500).json({ success: false, message: "Failed to load blog" });
  }
};

/* ─── Admin ─────────────────────────────────────── */

export const getAllBlogPosts = async (req, res) => {
  try {
    const posts = await BlogPost.find()
      .sort({ updatedAt: -1, _id: -1 })
      .select("-content");
    const counts = await BlogComment.aggregate([
      { $match: { post: { $in: posts.map((p) => p._id) } } },
      { $group: { _id: "$post", total: { $sum: 1 }, approved: { $sum: { $cond: [{ $eq: ["$status", "approved"] }, 1, 0] } } } },
    ]);
    const countMap = Object.fromEntries(
      counts.map((c) => [String(c._id), c])
    );
    const data = posts.map((p) => {
      const c = countMap[String(p._id)] || { total: 0, approved: 0 };
      return {
        ...p.toObject(),
        commentCount: c.total,
        approvedCommentCount: c.approved,
      };
    });
    return res.json({ success: true, data });
  } catch (error) {
    console.error("getAllBlogPosts error:", error.message);
    return res.status(500).json({ success: false, message: "Failed to load blogs" });
  }
};

export const createBlogPost = async (req, res) => {
  try {
    const fields = pick(req.body);
    if (!fields.title) {
      return res.status(400).json({ success: false, message: "Title is required" });
    }

    let coverImage = { url: req.body.coverUrl || "", publicId: "" };
    if (req.file) {
      const uploaded = await uploadToCloudinary(req.file, "blogs");
      coverImage = { url: uploaded.url, publicId: uploaded.public_id };
    }

    const slug = await uniqueSlug(fields.slug || slugify(fields.title));
    const publishedAt = fields.status === "published" ? new Date() : null;

    const post = await BlogPost.create({
      ...fields,
      slug,
      coverImage,
      publishedAt,
    });

    return res.status(201).json({ success: true, data: post });
  } catch (error) {
    console.error("createBlogPost error:", error.message);
    return res.status(500).json({ success: false, message: "Failed to create blog" });
  }
};

export const updateBlogPost = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    const fields = pick(req.body);

    if (req.file) {
      if (post.coverImage?.publicId) {
        await deleteFromCloudinary(post.coverImage.publicId);
      }
      const uploaded = await uploadToCloudinary(req.file, "blogs");
      post.coverImage = { url: uploaded.url, publicId: uploaded.public_id };
    } else if (req.body.coverUrl) {
      post.coverImage = { url: req.body.coverUrl, publicId: "" };
    }

    Object.assign(post, fields, {
      slug: await uniqueSlug(fields.slug || slugify(fields.title), post._id),
      status: fields.status,
    });

    if (fields.status === "published" && !post.publishedAt) {
      post.publishedAt = new Date();
    }
    if (fields.status === "draft") {
      post.publishedAt = null;
    }

    await post.save();
    return res.json({ success: true, data: post });
  } catch (error) {
    console.error("updateBlogPost error:", error.message);
    return res.status(500).json({ success: false, message: "Failed to update blog" });
  }
};

export const deleteBlogPost = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }
    if (post.coverImage?.publicId) {
      await deleteFromCloudinary(post.coverImage.publicId);
    }
    await BlogComment.deleteMany({ post: post._id });
    await post.deleteOne();
    return res.json({ success: true, message: "Blog deleted" });
  } catch (error) {
    console.error("deleteBlogPost error:", error.message);
    return res.status(500).json({ success: false, message: "Failed to delete blog" });
  }
};