import mongoose from "mongoose";

const blogCommentSchema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BlogPost",
      required: true,
      index: true,
    },
    name: { type: String, required: true, trim: true, maxlength: 100 },
    email: { type: String, trim: true, lowercase: true, default: "" },
    comment: { type: String, required: true, trim: true, maxlength: 2000 },
    status: {
      type: String,
      enum: ["approved", "pending", "spam"],
      default: "approved",
    },
  },
  { timestamps: true }
);

blogCommentSchema.index({ post: 1, status: 1, createdAt: -1 });

export default mongoose.model("BlogComment", blogCommentSchema);