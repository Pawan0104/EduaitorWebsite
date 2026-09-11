import mongoose from "mongoose";

export const BRAIN_CATEGORIES = ["observation", "memory", "logic", "pattern", "speed"];

export const BRAIN_KINDS = [
  "triangles",
  "count",
  "memory",
  "logic",
  "pattern",
  "speed",
];

const brainQuestionSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      enum: BRAIN_CATEGORIES,
      required: [true, "Category is required"],
      index: true,
    },
    kind: {
      type: String,
      enum: BRAIN_KINDS,
      required: [true, "Question kind is required"],
    },
    label: {
      type: String,
      trim: true,
      default: "",
    },
    config: {
      type: mongoose.Schema.Types.Mixed,
      required: [true, "Question config is required"],
    },
    enabled: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0, // lower = drawn first
    },
  },
  { timestamps: true }
);

export default mongoose.model("BrainQuestion", brainQuestionSchema);