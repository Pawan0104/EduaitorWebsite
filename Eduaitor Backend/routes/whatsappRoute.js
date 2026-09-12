import express from "express";
import { handleWebhookVerify, handleWebhookEvent } from "../controllers/whatsappController.js";

const router = express.Router();

/* GET — Meta webhook verification (called when you save the callback URL). */
router.get("/webhook", handleWebhookVerify);

/* POST — event delivery (message statuses, inbound messages). */
router.post("/webhook", (req, res, next) => {
  handleWebhookEvent(req, res).catch(next);
});

export default router;