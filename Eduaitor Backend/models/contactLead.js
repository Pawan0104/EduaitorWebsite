import mongoose from "mongoose";

const contactLeadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
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
