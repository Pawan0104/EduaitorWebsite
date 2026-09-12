import BrainQuestion from "../models/brainQuestion.js";
import BrainSetting from "../models/brainSetting.js";
import BrainAttempt from "../models/brainAttempt.js";
import BrainOtp from "../models/brainOtp.js";
import { DEFAULT_BANK, DEFAULT_SETTINGS, bankToDocuments } from "../data/brainLeagueSeed.js";
import { rateLimit } from "express-rate-limit";
import jwt from "jsonwebtoken";
import { e164Phone, sendWhatsAppOtp } from "../utils/whatsapp.js";

/* ── Validation ──────────────────────────────────────────────────────────────── */

function cleanStr(v, max = 200) {
  if (typeof v !== "string") throw new Error("Expected string");
  const s = v.trim();
  if (!s || s.length > max) throw new Error("Invalid string");
  return s;
}

function cleanInt(v, min, max) {
  const n = Number(v);
  if (!Number.isInteger(n) || n < min || n > max) throw new Error(`Expected integer ${min}–${max}`);
  return n;
}

function cleanNumArr(v, minLen, maxLen) {
  if (!Array.isArray(v) || v.length < minLen || v.length > maxLen) throw new Error(`Expected array ${minLen}–${maxLen}`);
  const out = [];
  for (const x of v) {
    const n = Number(x);
    if (!Number.isFinite(n)) throw new Error("Array contains invalid number");
    out.push(n);
  }
  return out;
}

function cleanStrArr(v, minLen, maxLen) {
  if (!Array.isArray(v) || v.length < minLen || v.length > maxLen) throw new Error(`Expected array ${minLen}–${maxLen}`);
  const out = [];
  for (const x of v) {
    const s = String(x ?? "").trim();
    if (!s) throw new Error("Array contains empty string");
    out.push(s);
  }
  return out;
}

function validateConfig(kind, raw) {
  if (!raw || typeof raw !== "object") throw new Error("Config is required");

  switch (kind) {
    case "triangles":
      return { n: cleanInt(raw.n, 2, 7) };

    case "count": {
      const target = cleanStr(String(raw.target ?? ""), 10);
      const count = cleanInt(raw.count, 1, 50);
      const decoys = cleanStrArr(raw.decoys, 2, 10);
      const size = cleanInt(raw.size, 4, 8);
      if (decoys.some((d) => d === target)) throw new Error("Decoys must not contain target");
      return { target, count, decoys, size };
    }

    case "memory": {
      const set = cleanStrArr(raw.set, 4, 8);
      const out = { set };
      if (raw.pool !== undefined && raw.pool !== null) {
        out.pool = cleanStrArr(raw.pool, 4, 40);
      }
      return out;
    }

    case "logic": {
      const seq = cleanNumArr(raw.seq, 3, 6);
      const answer = Number(raw.answer);
      if (!Number.isFinite(answer)) throw new Error("Invalid answer");
      const traps = cleanNumArr(raw.traps, 3, 10);
      return { seq, answer, traps };
    }

    case "pattern": {
      const seq = cleanStrArr(raw.seq, 3, 6);
      const answer = cleanStr(String(raw.answer ?? ""), 10);
      const traps = cleanStrArr(raw.traps, 3, 10);
      return { seq, answer, traps };
    }

    case "speed": {
      const target = cleanInt(raw.target, -20, 20);
      const size = cleanInt(raw.size, 4, 8);
      return { target, size };
    }

    default:
      throw new Error("Unknown kind");
  }
}

function normalizeQuestionInput(body) {
  const category = cleanStr(body.category, 20);
  const allowed = ["observation", "memory", "logic", "pattern", "speed"];
  if (!allowed.includes(category)) throw new Error("Invalid category");

  const kind = cleanStr(body.kind, 20);
  const config = validateConfig(kind, body.config);

  const label = body.label != null ? cleanStr(body.label, 100) : "";
  const enabled = body.enabled !== false;
  const order = body.order != null ? cleanInt(body.order, 0, 100000) : 0;

  return { category, kind, label, config, enabled, order };
}

/* ── Rate limit for attempts ─────────────────────────────────────────────────── */

export const attemptLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 12,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many attempts — please wait before playing again." },
  keyGenerator: (req) => req.ip || req.headers["x-forwarded-for"] || "unknown",
});

/* ── Public ──────────────────────────────────────────────────────────────────── */

/** Generate + deliver a WhatsApp OTP for the given Indian phone number. */
export const sendOtp = async (req, res) => {
  try {
    const rawPhone = String(req.body?.phone || "").trim();
    const phone = e164Phone(rawPhone);
    if (!phone) return res.status(400).json({ message: "Valid 10-digit phone number is required" });

    const now = Date.now();
    const dayStart = new Date();
    dayStart.setHours(0, 0, 0, 0);

    const [recent, sentToday] = await Promise.all([
      BrainOtp.findOne({ phone, createdAt: { $gte: new Date(now - 60_000) } }).lean(),
      BrainOtp.countDocuments({ phone, createdAt: { $gte: dayStart } }),
    ]);

    if (recent) {
      return res.status(429).json({ message: "Please wait 60 seconds before requesting another OTP" });
    }
    if (sentToday >= 5) {
      return res.status(429).json({
        message: "Too many OTP requests for this number today. Try again tomorrow.",
      });
    }

    const code = String(Math.floor(100000 + Math.random() * 900000));
    await BrainOtp.deleteMany({ phone });
    await BrainOtp.create({ phone, code, expiresAt: new Date(now + 5 * 60_000) });

    const templateName = process.env.WHATSAPP_OTP_TEMPLATE_NAME || "otp_verification";
    let result;
    try {
      result = await sendWhatsAppOtp({ phone, code, templateName });
    } catch (err) {
      await BrainOtp.deleteOne({ phone });
      console.error("sendWhatsAppOtp delivery error:", err.message);
      return res.status(502).json({ message: "Could not deliver OTP via WhatsApp. Try again." });
    }

    if (!result.sent) {
      return res.json({
        sent: false,
        devCode: code,
        message: "WhatsApp not configured — OTP shown for testing",
      });
    }

    return res.json({ sent: true, message: "OTP sent to your WhatsApp" });
  } catch (err) {
    console.error("sendOtp error:", err);
    res.status(500).json({ message: "Failed to send OTP" });
  }
};

/** Verify a phone + code and issue a short-lived signed verification token. */
export const verifyOtp = async (req, res) => {
  try {
    const rawPhone = String(req.body?.phone || "").trim();
    const phone = e164Phone(rawPhone);
    const code = String(req.body?.code || "").trim();
    if (!phone || !code) return res.status(400).json({ message: "Phone number and code are required" });

    const otp = await BrainOtp.findOne({ phone });
    if (!otp) return res.status(400).json({ message: "No OTP found for this number. Send a new one." });

    if (otp.expiresAt.getTime() < Date.now()) {
      await BrainOtp.deleteOne({ _id: otp._id });
      return res.status(400).json({ message: "OTP expired. Send a new one." });
    }

    if (otp.code !== code) {
      otp.attempts = (otp.attempts || 0) + 1;
      if (otp.attempts >= 5) {
        await BrainOtp.deleteOne({ _id: otp._id });
        return res.status(400).json({ message: "Too many wrong attempts. Send a new OTP." });
      }
      await otp.save();
      return res.status(400).json({ message: "Invalid OTP" });
    }

    await BrainOtp.deleteOne({ _id: otp._id });

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return res.status(500).json({ message: "Verification service is not configured" });
    }

    // Token stays valid long enough for one full quiz run (refresh-safe), even if
    // the player closes the tab and comes back before finishing.
    const verification = jwt.sign(JSON.parse(JSON.stringify({ phone, purpose: "brain-verify" })), secret, {
      expiresIn: "30d",
    });

    const prev = await BrainAttempt.findOne({ phone }).lean().select("score");
    return res.json({
      ok: true,
      verification,
      phone,
      alreadyPlayed: Boolean(prev),
      previousScore: prev?.score ?? null,
    });
  } catch (err) {
    console.error("verifyOtp error:", err);
    res.status(500).json({ message: "Failed to verify OTP" });
  }
};

export const getConfig = async (_req, res) => {
  try {
    const [questions, settings] = await Promise.all([
      BrainQuestion.find({ enabled: true })
        .select("category kind config -_id")
        .sort({ order: 1, createdAt: 1 })
        .lean(),
      BrainSetting.findOne({ key: "global" }).lean(),
    ]);

    const bank = { observation: [], memory: [], logic: [], pattern: [], speed: [] };
    for (const q of questions) {
      bank[q.category]?.push({ kind: q.kind, ...q.config });
    }

    res.json({
      settings: {
        quizTitle: settings?.quizTitle ?? DEFAULT_SETTINGS.quizTitle,
        shareMessage: settings?.shareMessage ?? DEFAULT_SETTINGS.shareMessage,
      },
      badges: settings?.badges ?? DEFAULT_SETTINGS.badges,
      bank,
    });
  } catch (err) {
    console.error("getConfig error:", err);
    res.status(500).json({ message: "Failed to load quiz config" });
  }
};

/** Lightweight public stats for the landing screen (no auth). */
export const getLandingStats = async (_req, res) => {
  try {
    const [agg] = await BrainAttempt.aggregate([
      {
        $group: {
          _id: null,
          totalAttempts: { $sum: 1 },
          players: { $addToSet: { $toLower: { $ifNull: ["$phone", { $ifNull: ["$email", "$name"] }] } } },
          bestScore: { $max: "$score" },
          avgDurationMs: { $avg: "$durationMs" },
          avgScore: { $avg: "$score" },
        },
      },
    ]);

    if (!agg) {
      return res.json({
        totalPlayers: 0,
        bestScore: 0,
        avgDurationMs: 0,
        avgScore: 0,
        totalAttempts: 0,
      });
    }

    return res.json({
      totalPlayers: agg.players?.length ?? 0,
      bestScore: agg.bestScore ?? 0,
      avgDurationMs: Math.round(agg.avgDurationMs || 0),
      avgScore: Math.round((agg.avgScore || 0) * 10) / 10,
      totalAttempts: agg.totalAttempts ?? 0,
    });
  } catch (err) {
    console.error("getLandingStats error:", err);
    res.status(500).json({ message: "Failed to fetch landing stats" });
  }
};

export const submitAttempt = async (req, res) => {
  try {
    const {
      name, email, phone, verification, score, baseScore, bonusPoints, livesLeft,
      perfect, maxCombo, bossHits, badgeName, topType, durationMs, results, channel,
    } = req.body || {};
    if (!name) return res.status(400).json({ message: "Name is required" });
    if (typeof score !== "number" || score < 0 || score > 200) {
      return res.status(400).json({ message: "Invalid score" });
    }
    const safeName = cleanStr(String(name), 30);

    const safeEmail = email != null ? cleanStr(String(email), 120) : "";
    if (!safeEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(safeEmail)) {
      return res.status(400).json({ message: "Valid email is required" });
    }
    const safePhoneRaw = phone != null ? cleanStr(String(phone), 16) : "";
    const safePhone = e164Phone(safePhoneRaw);
    if (!safePhone) {
      return res.status(400).json({ message: "Valid 10-digit phone is required" });
    }

    let verified = false;
    if (process.env.JWT_SECRET && verification) {
      try {
        const payload = jwt.verify(String(verification), process.env.JWT_SECRET);
        verified = payload?.purpose === "brain-verify" && payload?.phone === safePhone;
      } catch {
        verified = false;
      }
    }
    if (!verified) {
      return res.status(403).json({ message: "Phone verification required" });
    }

    const safeResults = Array.isArray(results)
      ? results
          .filter((r) => r && typeof r.category === "string" && typeof r.points === "number")
          .slice(0, 6)
      : [];

    // One record per verified phone — a replay OVERRIDES the previous score.
    const existing = await BrainAttempt.findOne({ phone: safePhone }).lean().select("score");

    await BrainAttempt.findOneAndUpdate(
      { phone: safePhone },
      {
        $set: {
          name: safeName,
          email: safeEmail,
          score: Math.min(200, score),
          baseScore: typeof baseScore === "number" ? baseScore : score,
          bonusPoints: typeof bonusPoints === "number" ? bonusPoints : 0,
          livesLeft: typeof livesLeft === "number" ? livesLeft : 0,
          perfect: Boolean(perfect),
          maxCombo: typeof maxCombo === "number" ? maxCombo : 0,
          bossHits: typeof bossHits === "number" ? bossHits : 0,
          badgeName: badgeName != null ? String(badgeName) : "",
          topType: topType != null ? String(topType) : "",
          durationMs: typeof durationMs === "number" ? durationMs : 0,
          results: safeResults,
          channel: channel != null ? String(channel) : "web",
        },
      },
      { upsert: true, new: true }
    );

    res.status(201).json({
      ok: true,
      replaced: Boolean(existing),
      previousScore: existing?.score ?? null,
    });
  } catch (err) {
    console.error("submitAttempt error:", err);
    res.status(500).json({ message: "Failed to record attempt" });
  }
};

/* ── Admin: Questions ────────────────────────────────────────────────────────── */

export const listQuestions = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = {};
    if (category) filter.category = category;
    const questions = await BrainQuestion.find(filter)
      .sort({ order: 1, createdAt: 1 })
      .lean();
    res.json(questions);
  } catch (err) {
    console.error("listQuestions error:", err);
    res.status(500).json({ message: "Failed to fetch questions" });
  }
};

export const createQuestion = async (req, res) => {
  try {
    const doc = normalizeQuestionInput(req.body);
    const created = await BrainQuestion.create(doc);
    res.status(201).json(created);
  } catch (err) {
    console.error("createQuestion error:", err);
    res.status(400).json({ message: err.message || "Invalid question" });
  }
};

export const updateQuestion = async (req, res) => {
  try {
    const doc = normalizeQuestionInput(req.body);
    const updated = await BrainQuestion.findByIdAndUpdate(req.params.id, doc, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ message: "Question not found" });
    res.json(updated);
  } catch (err) {
    console.error("updateQuestion error:", err);
    res.status(400).json({ message: err.message || "Failed to update" });
  }
};

export const deleteQuestion = async (req, res) => {
  try {
    const deleted = await BrainQuestion.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Question not found" });
    res.json({ ok: true });
  } catch (err) {
    console.error("deleteQuestion error:", err);
    res.status(500).json({ message: "Failed to delete" });
  }
};

export const replaceBank = async (req, res) => {
  try {
    const { questions } = req.body || {};
    if (!Array.isArray(questions) || !questions.length) {
      return res.status(400).json({ message: "Provide a questions array" });
    }
    const docs = questions.map((q, i) => {
      const d = normalizeQuestionInput(q);
      d.order = q.order ?? i;
      return d;
    });

    await BrainQuestion.deleteMany({});
    const created = await BrainQuestion.insertMany(docs, { ordered: true });

    res.json({ ok: true, inserted: created.length });
  } catch (err) {
    console.error("replaceBank error:", err);
    res.status(400).json({ message: err.message || "Failed to replace bank" });
  }
};

export const getDefaults = async (_req, res) => {
  try {
    const docs = bankToDocuments();
    res.json({ questions: docs, settings: DEFAULT_SETTINGS });
  } catch (err) {
    console.error("getDefaults error:", err);
    res.status(500).json({ message: "Failed to load defaults" });
  }
};

/* ── Admin: Settings ─────────────────────────────────────────────────────────── */

export const getSettings = async (_req, res) => {
  try {
    const settings = await BrainSetting.findOne({ key: "global" }).lean();
    res.json(settings ?? DEFAULT_SETTINGS);
  } catch (err) {
    console.error("getSettings error:", err);
    res.status(500).json({ message: "Failed to fetch settings" });
  }
};

export const updateSettings = async (req, res) => {
  try {
    const { quizTitle, shareMessage, badges } = req.body || {};
    const update = {};
    if (quizTitle !== undefined) update.quizTitle = cleanStr(String(quizTitle), 100);
    if (shareMessage !== undefined) update.shareMessage = cleanStr(String(shareMessage), 500);
    if (Array.isArray(badges)) {
      update.badges = badges.map((b) => ({
        min: Number(b.min) || 0,
        emoji: String(b.emoji ?? "🏆"),
        name: String(b.name ?? ""),
        label: String(b.label ?? ""),
        color: String(b.color ?? "#000"),
        gradient: Array.isArray(b.gradient) && b.gradient.length >= 2 ? b.gradient.slice(0, 3) : ["#000", "#000"],
        desc: String(b.desc ?? ""),
      }));
    }

    const settings = await BrainSetting.findOneAndUpdate(
      { key: "global" },
      { $set: update },
      { new: true, upsert: true, runValidators: true }
    ).lean();

    res.json(settings);
  } catch (err) {
    console.error("updateSettings error:", err);
    res.status(400).json({ message: err.message || "Failed to update settings" });
  }
};

/* ── Admin: Attempts & Stats ─────────────────────────────────────────────────── */

export const listAttempts = async (req, res) => {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(200, Math.max(1, Number(req.query.limit) || 50));
    const skip = (page - 1) * limit;
    const q = (req.query.q || "").trim();

    const filter = q
      ? {
          $or: [
            { name: { $regex: q, $options: "i" } },
            { email: { $regex: q, $options: "i" } },
            { phone: { $regex: q, $options: "i" } },
          ],
        }
      : {};

    const [items, total] = await Promise.all([
      BrainAttempt.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      BrainAttempt.countDocuments(filter),
    ]);

    res.json({
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error("listAttempts error:", err);
    res.status(500).json({ message: "Failed to fetch attempts" });
  }
};

export const getStats = async (_req, res) => {
  try {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const [facetResult, playsToday] = await Promise.all([
      BrainAttempt.aggregate([
        {
          $facet: {
            summary: [
              {
                $group: {
                  _id: null,
                  totalAttempts: { $sum: 1 },
                  avgScore: { $avg: "$score" },
                  bestScore: { $max: "$score" },
                  totalPlayers: { $addToSet: { $toLower: "$name" } },
                  lastPlayedAt: { $max: "$createdAt" },
                },
              },
            ],
            badges: [
              { $group: { _id: "$badgeName", count: { $sum: 1 } } },
              { $sort: { count: -1 } },
            ],
            categories: [
              { $unwind: "$results" },
              {
                $group: {
                  _id: "$results.category",
                  totalPoints: { $sum: "$results.points" },
                  n: { $sum: 1 },
                },
              },
              { $set: { avgPoints: { $divide: ["$totalPoints", "$n"] } } },
            ],
          },
        },
      ]),
      BrainAttempt.countDocuments({ createdAt: { $gte: todayStart } }),
    ]);

    const summary = facetResult?.[0]?.summary?.[0] ?? null;
    const badges = facetResult?.[0]?.badges ?? [];
    const categories = facetResult?.[0]?.categories ?? [];

    res.json({
      totalAttempts: summary?.totalAttempts ?? 0,
      avgScore: summary?.avgScore != null ? Math.round(summary.avgScore * 10) / 10 : 0,
      bestScore: summary?.bestScore ?? 0,
      totalPlayers: summary?.totalPlayers?.length ?? 0,
      lastPlayedAt: summary?.lastPlayedAt ?? null,
      playsToday,
      badgeDistribution: Object.fromEntries(badges.map((b) => [b._id || "unknown", b.count])),
      categoryAvg: Object.fromEntries(categories.map((c) => [c._id, Math.round(c.avgPoints * 10) / 10])),
    });
  } catch (err) {
    console.error("getStats error:", err);
    res.status(500).json({ message: "Failed to fetch stats" });
  }
};

/* ── Admin: Players ──────────────────────────────────────────────────────── */

export const listPlayers = async (req, res) => {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(200, Math.max(1, Number(req.query.limit) || 50));
    const skip = (page - 1) * limit;
    const q = (req.query.q || "").trim();

    const match = q
      ? {
          $or: [
            { name: { $regex: q, $options: "i" } },
            { email: { $regex: q, $options: "i" } },
            { phone: { $regex: q, $options: "i" } },
          ],
        }
      : {};

    const [items, total] = await Promise.all([
      BrainAttempt.aggregate([
        { $match: match },
        {
          $group: {
            _id: { $toLower: "$email" },
            email: { $first: "$email" },
            name: { $first: "$name" },
            phone: { $first: "$phone" },
            attempts: { $sum: 1 },
            bestScore: { $max: "$score" },
            avgScore: { $avg: "$score" },
            totalScore: { $sum: "$score" },
            lastPlayed: { $max: "$createdAt" },
            firstPlayed: { $min: "$createdAt" },
            badges: { $addToSet: "$badgeName" },
          },
        },
        { $sort: { lastPlayed: -1 } },
        { $skip: skip },
        { $limit: limit },
      ]),
      BrainAttempt.aggregate([
        { $match: match },
        { $group: { _id: { $toLower: "$email" } } },
        { $count: "n" },
      ]),
    ]);

    const count = total?.[0]?.n ?? 0;

    res.json({
      items: items.map((p) => ({
        email: p.email,
        name: p.name,
        phone: p.phone,
        attempts: p.attempts,
        bestScore: p.bestScore,
        avgScore: Math.round((p.avgScore || 0) * 10) / 10,
        totalScore: p.totalScore,
        lastPlayed: p.lastPlayed,
        firstPlayed: p.firstPlayed,
        badges: (p.badges || []).filter(Boolean),
      })),
      total: count,
      page,
      limit,
      totalPages: Math.ceil(count / limit),
    });
  } catch (err) {
    console.error("listPlayers error:", err);
    res.status(500).json({ message: "Failed to fetch players" });
  }
};

export const getPlayerDetail = async (req, res) => {
  try {
    const email = (req.params.email || "").trim().toLowerCase();
    if (!email) return res.status(400).json({ message: "Email is required" });

    const attempts = await BrainAttempt.find({ email })
      .sort({ createdAt: -1 })
      .lean();

    if (!attempts.length) {
      return res.status(404).json({ message: "No attempts found for this player" });
    }

    const first = attempts[attempts.length - 1];
    const best = attempts.reduce((m, a) => (a.score > m.score ? a : m), attempts[0]);
    const avg = Math.round((attempts.reduce((s, a) => s + a.score, 0) / attempts.length) * 10) / 10;

    const categoryAvg = {};
    const catCounts = {};
    for (const a of attempts) {
      for (const r of a.results || []) {
        categoryAvg[r.category] = (categoryAvg[r.category] || 0) + (r.points || 0);
        catCounts[r.category] = (catCounts[r.category] || 0) + 1;
      }
    }
    for (const c of Object.keys(categoryAvg)) {
      categoryAvg[c] = Math.round((categoryAvg[c] / (catCounts[c] || 1)) * 10) / 10;
    }

    const badgeCount = {};
    for (const a of attempts) {
      if (a.badgeName) badgeCount[a.badgeName] = (badgeCount[a.badgeName] || 0) + 1;
    }

    const scoreHistory = attempts.map((a) => ({
      score: a.score,
      badge: a.badgeName,
      date: a.createdAt,
      topType: a.topType,
    }));

    res.json({
      name: first.name,
      email: first.email,
      phone: first.phone,
      totalAttempts: attempts.length,
      bestScore: best.score,
      avgScore: avg,
      firstPlayed: first.createdAt,
      lastPlayed: best.createdAt,
      badgeCount,
      categoryAvg,
      scoreHistory,
      attempts: attempts.map((a) => ({
        _id: a._id,
        score: a.score,
        badgeName: a.badgeName,
        topType: a.topType,
        durationMs: a.durationMs,
        results: a.results,
        channel: a.channel,
        createdAt: a.createdAt,
      })),
    });
  } catch (err) {
    console.error("getPlayerDetail error:", err);
    res.status(500).json({ message: "Failed to fetch player detail" });
  }
};

/* ── Admin: Stats Trend (weekly / monthly) ────────────────────────────────── */

export const getStatsTrend = async (req, res) => {
  try {
    const period = req.query.period === "month" ? "month" : "week";
    const buckets = period === "week" ? 12 : 12;

    const now = new Date();
    const startDate = new Date();
    if (period === "week") {
      startDate.setDate(now.getDate() - (buckets * 7));
    } else {
      startDate.setMonth(now.getMonth() - buckets);
    }

    const [dailyData, topPlayers, scoreBands] = await Promise.all([
      BrainAttempt.aggregate([
        { $match: { createdAt: { $gte: startDate } } },
        {
          $group: {
            _id: {
              $dateToString: { format: period === "week" ? "%Y-%m-%d" : "%Y-%m", date: "$createdAt" },
            },
            attempts: { $sum: 1 },
            avgScore: { $avg: "$score" },
            bestScore: { $max: "$score" },
            players: { $addToSet: { $toLower: "$email" } },
          },
        },
        { $sort: { _id: 1 } },
      ]),
      BrainAttempt.aggregate([
        { $match: { createdAt: { $gte: startDate } } },
        {
          $group: {
            _id: { $toLower: "$email" },
            name: { $first: "$name" },
            email: { $first: "$email" },
            attempts: { $sum: 1 },
            avgScore: { $avg: "$score" },
            bestScore: { $max: "$score" },
          },
        },
        { $sort: { attempts: -1 } },
        { $limit: 10 },
      ]),
      BrainAttempt.aggregate([
        { $match: { createdAt: { $gte: startDate } } },
        {
          $bucket: {
            groupBy: "$score",
            boundaries: [0, 20, 40, 60, 80, 101],
            default: "other",
            output: { count: { $sum: 1 } },
          },
        },
      ]),
    ]);

    const totalAttempts = dailyData.reduce((s, d) => s + d.attempts, 0);
    const totalPlayers = dailyData.reduce((s, d) => s + (d.players?.length || 0), 0);
    const avgScore = dailyData.length
      ? Math.round((dailyData.reduce((s, d) => s + d.avgScore * d.attempts, 0) / totalAttempts) * 10) / 10
      : 0;

    res.json({
      period,
      totalAttempts,
      totalPlayers,
      avgScore,
      buckets: dailyData.map((d) => ({
        label: d._id,
        attempts: d.attempts,
        avgScore: Math.round(d.avgScore * 10) / 10,
        bestScore: d.bestScore,
        players: d.players?.length || 0,
      })),
      topPlayers: topPlayers.map((p) => ({
        name: p.name,
        email: p.email,
        attempts: p.attempts,
        avgScore: Math.round(p.avgScore * 10) / 10,
        bestScore: p.bestScore,
      })),
      scoreBands: scoreBands.map((b) => ({
        label: b._id === "other" ? "100+" : `${b._id}-${(b._id || 0) + 19}`,
        count: b.count,
      })),
    });
  } catch (err) {
    console.error("getStatsTrend error:", err);
    res.status(500).json({ message: "Failed to fetch trend stats" });
  }
};