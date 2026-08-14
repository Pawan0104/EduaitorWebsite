import express from "express";
// import {
//     getPlans,
//     getPlanById,
//     createPlan,
//     updatePlan,
//     togglePlan,
//     deletePlan,
// } from "../controllers/planController.js";

const router = express.Router();

// router.get("/", getPlans);
// router.post("/", createPlan);
// router.get("/:id", getPlanById);
// router.put("/:id", updatePlan);
// router.patch("/:id/toggle", togglePlan);
// router.delete("/:id", deletePlan);
  import  { getPlans,
  getPlanById,
  createPlan,
  updatePlan,
  deletePlan,
  togglePlan,}   from "../controllers/planController.js";
import { requireAdmin } from "../middlewares/auth.js";

   router.get("/",           getPlans);
   router.get("/:id",        getPlanById);
   router.post("/",          requireAdmin, createPlan);
   router.put("/:id",        requireAdmin, updatePlan);
   router.delete("/:id",     requireAdmin, deletePlan);
   router.patch("/:id/toggle", requireAdmin, togglePlan);
export default router;