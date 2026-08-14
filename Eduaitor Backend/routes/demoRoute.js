import express from "express";
import {
    bookDemo,
    getAllDemos,
    getDemoById,
    updateDemoStatus,
    deleteDemo,
    getDemoStats,
} from "../controllers/demoController.js";
import { requireAdmin } from "../middlewares/auth.js";

const router = express.Router();

// ── Public ────────────────────────────────────────────────────
router.post("/book", bookDemo);

// ── Admin ──────────────────────────────────────────────────────
router.use(requireAdmin);

router.get("/stats", getDemoStats);
router.get("/", getAllDemos);
router.get("/:id", getDemoById);
router.patch("/:id/status", updateDemoStatus);
router.delete("/:id", deleteDemo);

export default router;