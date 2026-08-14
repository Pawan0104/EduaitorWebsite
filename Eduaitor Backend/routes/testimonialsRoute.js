// routes/testimonialRoutes.js
import express from "express";
import multer  from "multer";
import {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from "../controllers/testimmmonialsController.js"; 
import { requireAdmin } from "../middlewares/auth.js";

const router = express.Router();

// ── FIX ③: multer with file-type + size validation ──────────────────────────
const upload = multer({
  storage: multer.memoryStorage(),

  // only allow real image mime types
  fileFilter: (_req, file, cb) => {
    const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];
    if (ALLOWED.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed (jpg, png, webp, gif, svg)"), false);
    }
  },

  // 5 MB hard cap
  limits: { fileSize: 5 * 1024 * 1024 },
});

const handleUpload = (req, res, next) => {
  upload.single("image")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      const msg = err.code === "LIMIT_FILE_SIZE"
        ? "Image is too large — max 5 MB"
        : err.message;
      return res.status(400).json({ success: false, message: msg });
    }
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
    next();
  });
};

router.get("/", getTestimonials);

// Admin-only mutations
router.post(  "/",    requireAdmin, handleUpload, createTestimonial);
router.put(   "/:id", requireAdmin, handleUpload, updateTestimonial);
router.delete("/:id", requireAdmin,               deleteTestimonial);

export default router;

