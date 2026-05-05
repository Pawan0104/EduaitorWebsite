// models/Testimonial.js
import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema({
  quote: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String },
  image: { type: String }, // Cloudinary URL
  rating: { type: Number, default: 5 },
  tag: { type: String },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model("Testimonial", testimonialSchema);