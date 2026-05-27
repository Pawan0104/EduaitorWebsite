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

   router.get("/",           getPlans);
   router.get("/:id",        getPlanById);
   router.post("/",          createPlan);
   router.put("/:id",        updatePlan);
   router.delete("/:id",     deletePlan);
   router.patch("/:id/toggle", togglePlan);
export default router;