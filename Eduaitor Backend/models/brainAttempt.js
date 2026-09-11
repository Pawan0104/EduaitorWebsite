import mongoose from "mongoose";

const brainAttemptSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Player name is required"],
      maxlength: [30, "Name cannot exceed 30 characters"],
    },
    score: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    badgeName: {
      type: String,
      default: "",
    },
    topType: {
      type: String,
      default: "",
    },
    durationMs: {
      type: Number,
      default: 0,
    },
    results: {
      _id: false,
      type: [
        {
          category: { type: String, required: true },
          points: { type: Number, default: 0 },
        },
      ],
      default: [],
    },
    channel: {
      type: String,
      default: "web",
    },
  },
  { timestamps: true }
);

brainAttemptSchema.index({ createdAt: -1 });

export default mongoose.model("BrainAttempt", brainAttemptSchema);