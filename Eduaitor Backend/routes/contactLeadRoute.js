import express from "express";
import {
  createContactLead,
  getContactLeads,
  updateContactLeadStatus,
  deleteContactLead,
} from "../controllers/contactLeadController.js";
import { requireAdmin } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", createContactLead);

router.use(requireAdmin);
router.get("/", getContactLeads);
router.patch("/:id", updateContactLeadStatus);
router.delete("/:id", deleteContactLead);

export default router;
