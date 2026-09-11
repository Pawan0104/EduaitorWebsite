import mongoose from "mongoose";

const brainOtpSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    code: {
      type: String,
      required: true,
    },
    attempts: {
      type: Number,
      default: 0,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

brainOtpSchema.index({ phone: 1, createdAt: -1 });

export default mongoose.model("BrainOtp", brainOtpSchema);