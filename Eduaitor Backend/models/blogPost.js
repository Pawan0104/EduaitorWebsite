import mongoose from "mongoose";

const blogPostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    excerpt: { type: String, trim: true, default: "" },
    content: { type: String, default: "" },
    coverImage: {
      url: { type: String, default: "" },
      publicId: { type: String, default: "" },
    },
    author: {
      name: { type: String, trim: true, default: "" },
      avatarUrl: { type: String, default: "" },
    },
    category: { type: String, trim: true, default: "" },
    tags: { type: [String], default: [] },
    seo: {
      metaTitle: { type: String, default: "" },
      metaDescription: { type: String, default: "" },
      keywords: { type: String, default: "" },
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
    publishedAt: { type: Date, default: null },
    featured: { type: Boolean, default: false },
    allowComments: { type: Boolean, default: true },
    viewCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

blogPostSchema.index({ status: 1, publishedAt: -1, _id: -1 });

export default mongoose.model("BlogPost", blogPostSchema);