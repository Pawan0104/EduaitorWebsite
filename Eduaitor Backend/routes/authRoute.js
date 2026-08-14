import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { rateLimit } from "express-rate-limit";
import { jwtOptions, requireAdmin } from "../middlewares/auth.js";

const router = express.Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { message: "Too many login attempts. Please try again later." },
});

router.post("/login", loginLimiter, async (req, res) => {
  const email = String(req.body?.email || "").trim().toLowerCase();
  const password = String(req.body?.password || "");
  const adminEmail = String(process.env.ADMIN_EMAIL || "").trim().toLowerCase();
  const passwordHash = process.env.ADMIN_PASSWORD_HASH;
  const jwtSecret = process.env.JWT_SECRET;

  if (!adminEmail || !passwordHash || !jwtSecret) {
    console.error(
      "Admin auth requires ADMIN_EMAIL, ADMIN_PASSWORD_HASH and JWT_SECRET",
    );
    return res.status(500).json({ message: "Authentication is not configured" });
  }

  const passwordMatches =
    email === adminEmail && (await bcrypt.compare(password, passwordHash));

  if (!passwordMatches) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = jwt.sign(
    { sub: "admin", email: adminEmail, role: "admin" },
    jwtSecret,
    { ...jwtOptions, expiresIn: "8h" },
  );

  return res.json({
    token,
    admin: { email: adminEmail, role: "admin" },
    expiresIn: 8 * 60 * 60,
  });
});

router.get("/me", requireAdmin, (req, res) => {
  res.json({
    admin: { email: req.admin.email, role: req.admin.role },
  });
});

export default router;
