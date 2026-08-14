import express from "express";
import multer from "multer";
import { getAllAwards, createAward, updateAward, deleteAward } from "../controllers/awardController.js";
import { requireAdmin } from "../middlewares/auth.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/", getAllAwards);
router.post("/", requireAdmin, upload.single("image"), createAward);
router.put("/:id", requireAdmin, upload.single("image"), updateAward);
router.delete("/:id", requireAdmin, deleteAward);

export default router;
