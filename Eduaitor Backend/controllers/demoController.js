import Demo from "../models/demo.js";
import { sendUserConfirmation, sendAdminNotification } from "../utils/Mailer.js";

// ── POST /api/demo/book  (public) ────────────────────────────
export const bookDemo = async (req, res) => {
    try {
        const {
            instName = "",
            instType = "",
            students = "",
            branches = "",
            contactName,
            designation = "",
            email,
            phone,
            city = "",
            date = "",
            time = "",
            mode = "zoom",
            message = "",
        } = req.body;

        if (!contactName || !email || !phone) {
            return res.status(400).json({
                success: false,
                message: "Name, email, and phone are required.",
            });
        }

        const demo = await Demo.create({
            instName,
            instType,
            students,
            branches,
            contactName,
            designation,
            email,
            phone,
            city,
            date,
            time,
            mode,
            message,
        });

        // Respond immediately — do not wait on SMTP.
        res.status(201).json({
            success: true,
            message: "Thanks! Our team will contact you shortly.",
            data: demo,
        });

        Promise.resolve()
            .then(async () => {
                try {
                    await sendAdminNotification(demo);
                } catch (mailErr) {
                    console.error("Admin mail error:", mailErr.message || mailErr);
                }
                try {
                    await sendUserConfirmation(demo);
                } catch (mailErr) {
                    console.error("User mail error:", mailErr.message || mailErr);
                }
            })
            .catch((err) => console.error("Demo mail queue error:", err));
    } catch (err) {
        console.error("bookDemo error:", err);
        return res.status(500).json({ success: false, message: "Server error." });
    }
};

// ── GET /api/demo  (admin) ────────────────────────────────────
export const getAllDemos = async (req, res) => {
    try {
        const { status, page = 1, limit = 20 } = req.query;

        const filter = status ? { status } : {};
        const skip = (Number(page) - 1) * Number(limit);

        const [demos, total] = await Promise.all([
            Demo.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
            Demo.countDocuments(filter),
        ]);

        return res.json({
            success: true,
            data: demos,
            total,
            page: Number(page),
            pages: Math.ceil(total / Number(limit)),
        });
    } catch (err) {
        console.error("getAllDemos error:", err);
        return res.status(500).json({ success: false, message: "Server error." });
    }
};

// ── GET /api/demo/:id  (admin) ────────────────────────────────
export const getDemoById = async (req, res) => {
    try {
        const demo = await Demo.findById(req.params.id);
        if (!demo)
            return res.status(404).json({ success: false, message: "Demo not found." });
        return res.json({ success: true, data: demo });
    } catch (err) {
        return res.status(500).json({ success: false, message: "Server error." });
    }
};

// ── PATCH /api/demo/:id/status  (admin) ───────────────────────
export const updateDemoStatus = async (req, res) => {
    try {
        const { status, adminNotes } = req.body;
        const allowed = ["pending", "confirmed", "completed", "cancelled"];

        if (status && !allowed.includes(status)) {
            return res.status(400).json({ success: false, message: "Invalid status." });
        }

        const update = {};
        if (status) update.status = status;
        if (adminNotes !== undefined) update.adminNotes = adminNotes;

        const demo = await Demo.findByIdAndUpdate(
            req.params.id,
            { $set: update },
            { new: true }
        );

        if (!demo)
            return res.status(404).json({ success: false, message: "Demo not found." });

        return res.json({ success: true, data: demo });
    } catch (err) {
        return res.status(500).json({ success: false, message: "Server error." });
    }
};

// ── DELETE /api/demo/:id  (admin) ─────────────────────────────
export const deleteDemo = async (req, res) => {
    try {
        const demo = await Demo.findByIdAndDelete(req.params.id);
        if (!demo)
            return res.status(404).json({ success: false, message: "Demo not found." });
        return res.json({ success: true, message: "Demo deleted." });
    } catch (err) {
        return res.status(500).json({ success: false, message: "Server error." });
    }
};

// ── GET /api/demo/stats  (admin) ─────────────────────────────
export const getDemoStats = async (req, res) => {
    try {
        const [total, pending, confirmed, completed, cancelled] = await Promise.all([
            Demo.countDocuments(),
            Demo.countDocuments({ status: "pending" }),
            Demo.countDocuments({ status: "confirmed" }),
            Demo.countDocuments({ status: "completed" }),
            Demo.countDocuments({ status: "cancelled" }),
        ]);
        return res.json({ success: true, data: { total, pending, confirmed, completed, cancelled } });
    } catch (err) {
        return res.status(500).json({ success: false, message: "Server error." });
    }
};