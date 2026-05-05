import express from "express";
import multer from "multer";
import { getAllAwards, createAward, updateAward, deleteAward } from "../controllers/awardController.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/", getAllAwards);
router.post("/", upload.single("image"), createAward);
router.put("/:id", upload.single("image"), updateAward);
router.delete("/:id", deleteAward);

export default router;
