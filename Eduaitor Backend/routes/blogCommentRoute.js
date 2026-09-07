import express from "express";
import {
  getAllComments,
  updateCommentStatus,
  deleteComment,
} from "../controllers/blogCommentController.js";
import { requireAdmin } from "../middlewares/auth.js";

const router = express.Router();

router.use(requireAdmin);

router.get("/", getAllComments);
router.patch("/:id", updateCommentStatus);
router.delete("/:id", deleteComment);

export default router;