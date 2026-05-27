import Plan from "../models/plan.js";

// /* ───────── GET ALL ───────── */
// export const getPlans = async (req, res) => {
//   console.log("hit api ")
//   console.log("query params:", req.query?.active) // Log the 'active' query parameter;
//   try {
//     const filter = {};

//     if (req.query.active === "true") {
//       filter.isActive = true;
//     }

//     const plans = await Plan.find(filter).sort({ order: 1, createdAt: 1 });
//     res.json(plans);
//   } catch (err) {
//     console.error("GET plans error:", err);
//     res.status(500).json({ message: "Failed to fetch plans" });
//   }
// };

// /* ───────── GET ONE ───────── */
// export const getPlanById = async (req, res) => {
//   try {
//     const plan = await Plan.findById(req.params.id);
//     if (!plan) return res.status(404).json({ message: "Plan not found" });

//     res.json(plan);
//   } catch (err) {
//     console.error("GET plan error:", err);
//     res.status(500).json({ message: "Failed to fetch plan" });
//   }
// };

// /* ───────── CREATE ───────── */
// export const createPlan = async (req, res) => {
//   try {
//     const {
//       name,
//       price,
//       duration,
//       badge,
//       badgeColor,
//       ctaText,
//       features,
//       isActive,
//       order,
//     } = req.body;

//     if (!name || price === undefined) {
//       return res.status(400).json({ message: "Name and price are required" });
//     }

//     let planOrder = order;
//     if (planOrder === undefined || planOrder === null) {
//       const last = await Plan.findOne().sort({ order: -1 });
//       planOrder = last ? last.order + 1 : 0;
//     }

//     const plan = await Plan.create({
//       name,
//       price,
//       duration: duration || "monthly",
//       badge: badge || "",
//       badgeColor: badgeColor || "#6366f1",
//       ctaText: ctaText || "Get Started",
//       features: Array.isArray(features) ? features.filter(Boolean) : [],
//       isActive: isActive !== undefined ? isActive : true,
//       order: planOrder,
//     });

//     res.status(201).json(plan);
//   } catch (err) {
//     console.error("CREATE plan error:", err);
//     res.status(500).json({ message: "Failed to create plan" });
//   }
// };

// /* ───────── UPDATE ───────── */
// export const updatePlan = async (req, res) => {
//   try {
//     const updateData = { ...req.body };

//     if (updateData.features) {
//       updateData.features = Array.isArray(updateData.features)
//         ? updateData.features.filter(Boolean)
//         : [];
//     }

//     const plan = await Plan.findByIdAndUpdate(
//       req.params.id,
//       { $set: updateData },
//       { new: true, runValidators: true }
//     );

//     if (!plan) return res.status(404).json({ message: "Plan not found" });

//     res.json(plan);
//   } catch (err) {
//     console.error("UPDATE plan error:", err);
//     res.status(500).json({ message: "Failed to update plan" });
//   }
// };

// /* ───────── TOGGLE ───────── */
// export const togglePlan = async (req, res) => {
//   try {
//     const plan = await Plan.findById(req.params.id);
//     if (!plan) return res.status(404).json({ message: "Plan not found" });

//     plan.isActive = !plan.isActive;
//     await plan.save();

//     res.json(plan);
//   } catch (err) {
//     console.error("TOGGLE plan error:", err);
//     res.status(500).json({ message: "Failed to toggle plan" });
//   }
// };

// /* ───────── DELETE ───────── */
// export const deletePlan = async (req, res) => {
//   try {
//     const plan = await Plan.findByIdAndDelete(req.params.id);
//     if (!plan) return res.status(404).json({ message: "Plan not found" });

//     res.json({ message: "Plan deleted", id: req.params.id });
//   } catch (err) {
//     console.error("DELETE plan error:", err);
//     res.status(500).json({ message: "Failed to delete plan" });
//   }
// };

// controllers/plan.controller.js


/* ─────────────────────────────────────────
   GET  /plans
   Query params: active=true|false
──────────────────────────────────────────*/
export const getPlans = async (req, res) => {
  try {
    const filter = {};

    // Public endpoint can request only active plans
    if (req.query.active !== undefined) {
      filter.isActive = req.query.active === "true";
    }

    const plans = await Plan.find(filter).sort({ order: 1, createdAt: 1 });
    res.status(200).json(plans);
  } catch (err) {
    console.error("getPlans error:", err);
    res.status(500).json({ message: "Failed to fetch plans" });
  }
};

/* ─────────────────────────────────────────
   GET  /plans/:id
──────────────────────────────────────────*/
export const getPlanById = async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.id);
    if (!plan) return res.status(404).json({ message: "Plan not found" });
    res.status(200).json(plan);
  } catch (err) {
    console.error("getPlanById error:", err);
    res.status(500).json({ message: "Failed to fetch plan" });
  }
};

/* ─────────────────────────────────────────
   POST /plans
──────────────────────────────────────────*/
export const createPlan = async (req, res) => {
  try {
    const { name, short, CTA, price, highlight, features, isActive, order } =
      req.body;

    // Basic validation
    if (!name || !short || price?.monthly == null || price?.yearly == null) {
      return res.status(400).json({
        message: "name, short, price.monthly and price.yearly are required",
      });
    }

    const plan = await Plan.create({
      name,
      short,
      CTA: CTA || "Request Demo",
      price,
      highlight: highlight ?? false,
      features: features ?? [],
      isActive: isActive ?? true,
      order: order ?? 0,
    });

    res.status(201).json(plan);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({ message: err.message });
    }
    console.error("createPlan error:", err);
    res.status(500).json({ message: "Failed to create plan" });
  }
};

/* ─────────────────────────────────────────
   PUT /plans/:id
──────────────────────────────────────────*/
 export const updatePlan = async (req, res) => {
  try {
    const plan = await Plan.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!plan) return res.status(404).json({ message: "Plan not found" });
    res.status(200).json(plan);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({ message: err.message });
    }
    console.error("updatePlan error:", err);
    res.status(500).json({ message: "Failed to update plan" });
  }
};

/* ─────────────────────────────────────────
   DELETE /plans/:id
──────────────────────────────────────────*/
export const deletePlan = async (req, res) => {
  try {
    const plan = await Plan.findByIdAndDelete(req.params.id);
    if (!plan) return res.status(404).json({ message: "Plan not found" });
    res.status(200).json({ message: "Plan deleted successfully" });
  } catch (err) {
    console.error("deletePlan error:", err);
    res.status(500).json({ message: "Failed to delete plan" });
  }
};

/* ─────────────────────────────────────────
   PATCH /plans/:id/toggle
   Quick active/inactive toggle
──────────────────────────────────────────*/
export const togglePlan = async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.id);
    if (!plan) return res.status(404).json({ message: "Plan not found" });

    plan.isActive = !plan.isActive;
    await plan.save();

    res.status(200).json(plan);
  } catch (err) {
    console.error("togglePlan error:", err);
    res.status(500).json({ message: "Failed to toggle plan" });
  }
};

