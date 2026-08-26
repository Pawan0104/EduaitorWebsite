import mongoose from "mongoose";

const demoSchema = new mongoose.Schema(
    {
        // Optional institution details (kept for older bookings / admin view)
        instName: { type: String, default: "", trim: true },
        instType: {
            type: String,
            default: "",
            enum: ["", "school", "college", "coaching", "university"],
        },
        students: { type: String, default: "" },
        branches: { type: String, default: "" },

        // Required contact
        contactName: { type: String, required: true, trim: true },
        designation: { type: String, default: "" },
        email: { type: String, required: true, lowercase: true, trim: true },
        phone: { type: String, required: true, trim: true },
        city: { type: String, default: "" },

        // Optional preferences
        date: { type: String, default: "" },
        time: { type: String, default: "" },
        mode: { type: String, default: "zoom", enum: ["zoom", "meet", "inperson"] },
        message: { type: String, default: "" },

        status: {
            type: String,
            default: "pending",
            enum: ["pending", "confirmed", "completed", "cancelled"],
        },
        adminNotes: { type: String, default: "" },
    },
    { timestamps: true }
);

const Demo = mongoose.model("Demo", demoSchema);
export default Demo;