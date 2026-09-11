import express from "express";
import { requireAdmin } from "../middlewares/auth.js";
import {
  getConfig,
  getLandingStats,
  sendOtp,
  verifyOtp,
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
  listPlayers,
  getPlayerDetail,
  getStatsTrend,
} from "../controllers/brainLeagueController.js";

const router = express.Router();

/* ── Public ──────────────────────────────────────────────────────────────────── */
router.get("/config", getConfig);
router.get("/stats", getLandingStats);
router.post("/otp/send", sendOtp);
router.post("/otp/verify", verifyOtp);
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
router.get("/admin/stats/trend", requireAdmin, getStatsTrend);

// Players
router.get("/admin/players", requireAdmin, listPlayers);
router.get("/admin/players/:email", requireAdmin, getPlayerDetail);

export default router;