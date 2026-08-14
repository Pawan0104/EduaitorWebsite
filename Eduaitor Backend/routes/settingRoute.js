import express from "express";
import { getSettings, updateSettings } from "../controllers/settingController.js";
import upload from "../middlewares/upload.js";
import { requireAdmin } from "../middlewares/auth.js";

const router = express.Router();

/* GET  /api/settings  — fetch all settings (public + admin) */
router.get("/", getSettings);

/* PUT  /api/settings  — update settings with optional image uploads */
router.put(
    "/",
    requireAdmin,
    upload.fields([
        { name: "logo", maxCount: 1 },
        { name: "favicon", maxCount: 1 },
        { name: "heroImage", maxCount: 1 },
        { name: "aboutImage", maxCount: 1 },
    ]),
    updateSettings
);

export default router;