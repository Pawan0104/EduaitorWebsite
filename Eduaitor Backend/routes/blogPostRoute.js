import express from "express";
import multer from "multer";
import {
  getBlogPosts,
  getBlogPostBySlug,
  getAllBlogPosts,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
} from "../controllers/blogPostController.js";
import {
  createComment,
  getCommentsForPost,
} from "../controllers/blogCommentController.js";
import { requireAdmin } from "../middlewares/auth.js";

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

/* ─── Public ────────────────────────────────────── */

// List published posts
router.get("/", getBlogPosts);

/* ─── Admin (declared before /:slug to win the match) ─── */
router.get("/admin/posts", requireAdmin, getAllBlogPosts);
router.post("/", requireAdmin, upload.single("coverImage"), createBlogPost);
router.put("/:id", requireAdmin, upload.single("coverImage"), updateBlogPost);
router.delete("/:id", requireAdmin, deleteBlogPost);

/* ─── Public single post + comments ────────────────── */
router.get("/:slug", getBlogPostBySlug);
router.get("/:slug/comments", getCommentsForPost);
router.post("/:slug/comments", createComment);

export default router;