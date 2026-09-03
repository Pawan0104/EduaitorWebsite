import express from "express";
import {
  getHomeFrequentIcons,
  updateHomeFrequentIcons,
} from "../controllers/homeFrequentIconsController.js";

const router = express.Router();

// GET current selection
router.get("/", getHomeFrequentIcons);

// PUT update (or create) selection
router.put("/", updateHomeFrequentIcons);

// POST update selection (alias)
router.post("/", updateHomeFrequentIcons);

export default router;

