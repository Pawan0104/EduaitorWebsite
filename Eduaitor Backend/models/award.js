import mongoose from "mongoose";

const awardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  year: { type: String }, // e.g., "2024" or "March 2024"
  description: { type: String },
  imageUrl: { type: String, required: true },
  publicId: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model("Award", awardSchema);