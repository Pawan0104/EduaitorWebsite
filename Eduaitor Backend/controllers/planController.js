import Plan from "../models/plan.js";

/* ───────── GET ALL ───────── */
export const getPlans = async (req, res) => {
  console.log("hit api ")
  console.log("query params:", req.query?.active) // Log the 'active' query parameter;
  try {
    const filter = {};

    if (req.query.active === "true") {
      filter.isActive = true;
    }

    const plans = await Plan.find(filter).sort({ order: 1, createdAt: 1 });
    res.json(plans);
  } catch (err) {
    console.error("GET plans error:", err);
    res.status(500).json({ message: "Failed to fetch plans" });
  }
};

/* ───────── GET ONE ───────── */
export const getPlanById = async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.id);
    if (!plan) return res.status(404).json({ message: "Plan not found" });

    res.json(plan);
  } catch (err) {
    console.error("GET plan error:", err);
    res.status(500).json({ message: "Failed to fetch plan" });
  }
};

/* ───────── CREATE ───────── */
export const createPlan = async (req, res) => {
  try {
    const {
      name,
      price,
      duration,
      badge,
      badgeColor,
      ctaText,
      features,
      isActive,
      order,
    } = req.body;

    if (!name || price === undefined) {
      return res.status(400).json({ message: "Name and price are required" });
    }

    let planOrder = order;
    if (planOrder === undefined || planOrder === null) {
      const last = await Plan.findOne().sort({ order: -1 });
      planOrder = last ? last.order + 1 : 0;
    }

    const plan = await Plan.create({
      name,
      price,
      duration: duration || "monthly",
      badge: badge || "",
      badgeColor: badgeColor || "#6366f1",
      ctaText: ctaText || "Get Started",
      features: Array.isArray(features) ? features.filter(Boolean) : [],
      isActive: isActive !== undefined ? isActive : true,
      order: planOrder,
    });

    res.status(201).json(plan);
  } catch (err) {
    console.error("CREATE plan error:", err);
    res.status(500).json({ message: "Failed to create plan" });
  }
};

/* ───────── UPDATE ───────── */
export const updatePlan = async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (updateData.features) {
      updateData.features = Array.isArray(updateData.features)
        ? updateData.features.filter(Boolean)
        : [];
    }

    const plan = await Plan.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!plan) return res.status(404).json({ message: "Plan not found" });

    res.json(plan);
  } catch (err) {
    console.error("UPDATE plan error:", err);
    res.status(500).json({ message: "Failed to update plan" });
  }
};

/* ───────── TOGGLE ───────── */
export const togglePlan = async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.id);
    if (!plan) return res.status(404).json({ message: "Plan not found" });

    plan.isActive = !plan.isActive;
    await plan.save();

    res.json(plan);
  } catch (err) {
    console.error("TOGGLE plan error:", err);
    res.status(500).json({ message: "Failed to toggle plan" });
  }
};

/* ───────── DELETE ───────── */
export const deletePlan = async (req, res) => {
  try {
    const plan = await Plan.findByIdAndDelete(req.params.id);
    if (!plan) return res.status(404).json({ message: "Plan not found" });

    res.json({ message: "Plan deleted", id: req.params.id });
  } catch (err) {
    console.error("DELETE plan error:", err);
    res.status(500).json({ message: "Failed to delete plan" });
  }
};