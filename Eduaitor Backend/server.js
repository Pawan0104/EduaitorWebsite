import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

import planRoute from "./routes/planRoute.js";
import settingRoute from "./routes/settingRoute.js";
import demoRoute from "./routes/demoRoute.js";
import logoRoute from "./routes/logoRoutes.js";
import testimonialRoute from "./routes/testimonialsRoute.js";
import  awardRoute from "./routes/awardRoute.js";
import authRoute from "./routes/authRoute.js";
import contactLeadRoute from "./routes/contactLeadRoute.js";

const app = express();
app.set("trust proxy", 1);

/* ─── DB ─── */
connectDB();

/* ─── MIDDLEWARE ─── */
const allowedOrigins = [
    process.env.CLIENT_URL_1,
    process.env.CLIENT_URL_2,
    process.env.CLIENT_URL_3,
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175",
    "https://eduaitor.com",
    "https://www.eduaitor.com",
].filter(Boolean);

function isAllowedOrigin(origin) {
    if (!origin) return true;
    if (allowedOrigins.includes(origin)) return true;
    try {
        const { hostname } = new URL(origin);
        if (hostname === "eduaitor.com" || hostname.endsWith(".eduaitor.com")) {
            return true;
        }
        if (hostname.endsWith(".onrender.com")) return true;
    } catch {
        return false;
    }
    return false;
}

app.use(
    cors({
        origin: function (origin, callback) {
            if (isAllowedOrigin(origin)) return callback(null, true);
            console.warn("Blocked CORS origin:", origin);
            return callback(null, false);
        },
        credentials: true,
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ─── HEALTH ─── */
app.get("/", (req, res) => {
    res.json({ status: "ok", message: "EduAitor API running 🚀" });
});

/* ─── ROUTES ─── */
app.use("/api/auth", authRoute);
app.use("/api/plans", planRoute);
app.use("/api/settings", settingRoute);
app.use("/api/demo", demoRoute);
app.use("/api/contact-leads", contactLeadRoute);
app.use("/api/logos", logoRoute);
app.use("/api/testimonials", testimonialRoute);
app.use("/api/awards", awardRoute);

/* ─── 404 ─── */
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

/* ─── ERROR ─── */
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
});

/* ─── START ─── */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});