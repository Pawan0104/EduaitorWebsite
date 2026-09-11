import express from "express";
import { requireAdmin } from "../middlewares/auth.js";
import {
  getConfig,
  submitAttempt,
  attemptLimiter,
  listQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  replaceBank,
  getDefaults,
  getSettings,
  updateSettings,
  listAttempts,
  getStats,
} from "../controllers/brainLeagueController.js";

const router = express.Router();

/* ── Public ──────────────────────────────────────────────────────────────────── */
router.get("/config", getConfig);
router.post("/attempts", attemptLimiter, submitAttempt);

/* ── Admin ───────────────────────────────────────────────────────────────────── */

// Questions
router.get("/admin/questions", requireAdmin, listQuestions);
router.post("/admin/questions", requireAdmin, createQuestion);
router.put("/admin/questions/:id", requireAdmin, updateQuestion);
router.delete("/admin/questions/:id", requireAdmin, deleteQuestion);

// Bulk replace + defaults
router.put("/admin/bank", requireAdmin, replaceBank);
router.get("/admin/bank/defaults", requireAdmin, getDefaults);

// Settings (badges, title, share message)
router.get("/admin/settings", requireAdmin, getSettings);
router.put("/admin/settings", requireAdmin, updateSettings);

// Attempts & stats
router.get("/admin/attempts", requireAdmin, listAttempts);
router.get("/admin/stats", requireAdmin, getStats);

export default router;