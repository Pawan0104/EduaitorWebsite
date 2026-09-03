import mongoose from "mongoose";

// User-specific / role-specific home shortcut (frequent icons) preferences.
// This is designed for MongoDB + Mongoose.

const homeFrequentIconsSchema = new mongoose.Schema(
  {
    schoolId: { type: String, required: true, index: true },
    role: {
      type: String,
      required: true,
      index: true,
      enum: ["admin", "teacher", "parent", "student"],
    },
    // "actorId" represents the actor whose home screen we customize:
    // - admin: admin email/id
    // - student: student_id
    // - parent: parent_id (or actor representing the currently selected child)
    actorId: { type: String, required: true, index: true },
    // IDs from the frontend “catalog” of available shortcuts/icons.
    homeShortcutIds: { type: [String], default: [] },
  },
  { timestamps: true },
);

homeFrequentIconsSchema.index(
  { schoolId: 1, role: 1, actorId: 1 },
  { unique: true },
);

export default mongoose.model(
  "HomeFrequentIconsPreference",
  homeFrequentIconsSchema,
);

