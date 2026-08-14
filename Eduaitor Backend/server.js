import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import planRoute from "./routes/planRoute.js";
import settingRoute from "./routes/settingRoute.js";
import demoRoute from "./routes/demoRoute.js";
import logoRoute from "./routes/logoRoutes.js";
import testimonialRoute from "./routes/testimonialsRoute.js";
import  awardRoute from "./routes/awardRoute.js";
import authRoute from "./routes/authRoute.js";
import contactLeadRoute from "./routes/contactLeadRoute.js";
dotenv.config();

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
].filter(Boolean); // .filter(Boolean) removes undefined if CLIENT_URL isn't set

app.use(
    cors({
        origin: function (origin, callback) {
            // Allow requests with no origin (like mobile apps or curl requests)
            if (!origin) return callback(null, true);

            if (allowedOrigins.indexOf(origin) !== -1) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
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