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
    wamid: {
      type: String,
      index: true,
    },
    deliveryStatus: {
      type: String,
    },
    deliveredAt: {
      type: Date,
    },
    deliveryError: {
      type: String,
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