// models/Logo.js
import mongoose from "mongoose";

const logoSchema = new mongoose.Schema(
  {
    label: {
      type     : String,
      required : [true, "Label is required"],
      trim     : true,
      maxlength: 120,
    },
    altText: {
      type   : String,
      trim   : true,
      default: "",
    },
    imageUrl: {
      type    : String,          // full Cloudinary CDN URL
      required: true,
    },
    publicId: {
      type    : String,          // Cloudinary public_id — needed to delete the image
      required: true,
    },
    isActive: {
      type   : Boolean,
      default: true,
    },
    order: {
      type   : Number,
      default: 0,
    },
  },
  { timestamps: true }
);

logoSchema.index({ isActive: 1, order: 1 });

export default mongoose.model("Logo", logoSchema);