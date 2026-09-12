import mongoose from "mongoose";

const brainAttemptSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Player name is required"],
      maxlength: [30, "Name cannot exceed 30 characters"],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, "Email is required"],
      maxlength: [120, "Email cannot exceed 120 characters"],
    },
    phone: {
      type: String,
      trim: true,
      required: [true, "Phone is required"],
      maxlength: [16, "Phone cannot exceed 16 characters"],
    },
    score: {
      type: Number,
      required: true,
      min: 0,
      max: 200, // base 100 + bonus (combos, doubles, boss, perfect, lives)
    },
    baseScore: {
      type: Number,
      default: 0,
    },
    bonusPoints: {
      type: Number,
      default: 0,
    },
    livesLeft: {
      type: Number,
      default: 0,
    },
    perfect: {
      type: Boolean,
      default: false,
    },
    maxCombo: {
      type: Number,
      default: 0,
    },
    bossHits: {
      type: Number,
      default: 0,
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
brainAttemptSchema.index({ email: 1 });
brainAttemptSchema.index({ phone: 1 });

export default mongoose.model("BrainAttempt", brainAttemptSchema);