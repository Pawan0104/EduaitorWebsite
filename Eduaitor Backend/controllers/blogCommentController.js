import BlogPost from "../models/blogPost.js";
import BlogComment from "../models/blogComment.js";

const publicComment = (c) => ({
  _id: c._id,
  name: c.name,
  comment: c.comment,
  createdAt: c.createdAt,
});

export const createComment = async (req, res) => {
  try {
    const post = await BlogPost.findOne({
      slug: req.params.slug,
      status: "published",
    });
    if (!post) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }
    if (post.allowComments === false) {
      return res.status(403).json({ success: false, message: "Comments are disabled for this post" });
    }

    const name = String(req.body?.name || "").trim();
    const comment = String(req.body?.comment || "").trim();
    const email = String(req.body?.email || "").trim().toLowerCase();

    if (!name || !comment) {
      return res.status(400).json({ success: false, message: "Name and comment are required" });
    }
    if (comment.length > 2000) {
      return res.status(400).json({ success: false, message: "Comment is too long" });
    }

    const created = await BlogComment.create({ post: post._id, name, email, comment });
    return res.status(201).json({ success: true, data: publicComment(created) });
  } catch (error) {
    console.error("createComment error:", error.message);
    return res.status(500).json({ success: false, message: "Failed to add comment" });
  }
};

export const getCommentsForPost = async (req, res) => {
  try {
    const post = await BlogPost.findOne({
      slug: req.params.slug,
      status: "published",
    });
    if (!post) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }
    const comments = await BlogComment.find({ post: post._id, status: "approved" })
      .sort({ createdAt: -1 })
      .limit(500);
    return res.json({ success: true, data: comments.map(publicComment) });
  } catch (error) {
    console.error("getCommentsForPost error:", error.message);
    return res.status(500).json({ success: false, message: "Failed to load comments" });
  }
};

/* ─── Admin ─────────────────────────────────────── */

export const getAllComments = async (req, res) => {
  try {
    const comments = await BlogComment.find()
      .sort({ createdAt: -1 })
      .limit(1000)
      .populate("post", "title slug status");
    return res.json({ success: true, data: comments });
  } catch (error) {
    console.error("getAllComments error:", error.message);
    return res.status(500).json({ success: false, message: "Failed to load comments" });
  }
};

export const updateCommentStatus = async (req, res) => {
  try {
    const { status } = req.body || {};
    if (!["approved", "pending", "spam"].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status" });
    }
    const comment = await BlogComment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ success: false, message: "Comment not found" });
    }
    comment.status = status;
    await comment.save();
    return res.json({ success: true, data: comment });
  } catch (error) {
    console.error("updateCommentStatus error:", error.message);
    return res.status(500).json({ success: false, message: "Failed to update comment" });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const comment = await BlogComment.findByIdAndDelete(req.params.id);
    if (!comment) {
      return res.status(404).json({ success: false, message: "Comment not found" });
    }
    return res.json({ success: true, message: "Comment deleted" });
  } catch (error) {
    console.error("deleteComment error:", error.message);
    return res.status(500).json({ success: false, message: "Failed to delete comment" });
  }
};