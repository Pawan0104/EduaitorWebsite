import mongoose from "mongoose";

const contactLeadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, trim: true, lowercase: true, default: "" },
    schoolName: { type: String, trim: true, default: "" },
    city: { type: String, trim: true, default: "" },
    message: { type: String, trim: true, default: "" },
    source: { type: String, default: "contact-popup", trim: true },
    status: {
      type: String,
      default: "new",
      enum: ["new", "contacted", "closed"],
    },
    adminNotes: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("ContactLead", contactLeadSchema);
