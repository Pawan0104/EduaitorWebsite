// routes/logoRoutes.js
import express from "express";
import multer  from "multer";
import {
  getAllLogos,
  createLogo,
  updateLogo,
  deleteLogo,
  reorderLogos,
} from "../controllers/logocontroller.js";
import { requireAdmin } from "../middlewares/auth.js";

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (_req, file, cb) => {
    const ok = ["image/jpeg","image/png","image/webp","image/svg+xml","image/gif"];
    ok.includes(file.mimetype)
      ? cb(null, true)
      : cb(new Error("Only image files are allowed (jpg, png, webp, svg, gif)"), false);
  },
  limits: { fileSize: 5 * 1024 * 1024 },   // 5 MB
});

/* ── error handler for multer ── */
const handleUpload = (req, res, next) => {
  upload.single("image")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ success: false, message: err.code === "LIMIT_FILE_SIZE" ? "File too large (max 5 MB)" : err.message });
    }
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
    next();
  });
};

/* ── routes ── */
router.get   ("/"        , getAllLogos);
router.post  ("/"        , requireAdmin, handleUpload, createLogo);
router.put   ("/:id"     , requireAdmin, handleUpload, updateLogo);
router.delete("/:id"     , requireAdmin, deleteLogo);
router.patch ("/reorder" , requireAdmin, reorderLogos);

export default router;
