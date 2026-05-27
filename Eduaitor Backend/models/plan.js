// models/plan.model.js
import mongoose from "mongoose";

const planSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Plan name is required"],
      trim: true,
    },
    short: {
      type: String,
      required: [true, "Short description is required"],
      trim: true,
    },
    CTA: {
      type: String,
      default: "Request Demo",
      trim: true,
    },
    price: {
      monthly: {
        type: Number,
        required: [true, "Monthly price is required"],
        min: [0, "Price cannot be negative"],
      },
      yearly: {
        type: Number,
        required: [true, "Yearly price is required"],
        min: [0, "Price cannot be negative"],
      },
    },
    highlight: {
      type: Boolean,
      default: false,
    },
    features: {
      type: [String],
      default: [],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0, // lower = shown first
    },
  },
  { timestamps: true }
);

export default mongoose.model("Plan", planSchema);