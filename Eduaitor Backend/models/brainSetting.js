import mongoose from "mongoose";

/**
 * Singleton game configuration for EDUAITOR BRAIN LEAGUE.
 * Badges, quiz title and the WhatsApp share-message template are managed
 * from the admin. The key is always "global".
 */
const brainSettingSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      default: "global",
      unique: true,
    },
    quizTitle: {
      type: String,
      default: "EDUAITOR BRAIN LEAGUE",
      trim: true,
    },
    shareMessage: {
      type: String,
      default:
        "🧠 EDUAITOR BRAIN LEAGUE CHALLENGE!\n\n{name} scored {score}/100 — {badgeEmoji} {badgeName}!\nCan Your Brain Beat Mine?\n\nSmarter Schools. Stronger Students. — EduAItor",
      trim: true,
    },
    badges: {
      _id: false,
      type: [
        {
          min: { type: Number, required: true },
          emoji: { type: String, default: "🏆" },
          name: { type: String, required: true },
          label: { type: String, required: true },
          color: { type: String, default: "#FFB800" },
          gradient: { type: [String], default: ["#FFB800", "#FF8A00"] },
          desc: { type: String, default: "" },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("BrainSetting", brainSettingSchema);