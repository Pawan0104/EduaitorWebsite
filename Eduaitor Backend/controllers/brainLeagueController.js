import BrainQuestion from "../models/brainQuestion.js";
import BrainSetting from "../models/brainSetting.js";
import BrainAttempt from "../models/brainAttempt.js";
import { DEFAULT_BANK, DEFAULT_SETTINGS, bankToDocuments } from "../data/brainLeagueSeed.js";
import { rateLimit } from "express-rate-limit";

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

export const submitAttempt = async (req, res) => {
  try {
    const { name, email, phone, score, badgeName, topType, durationMs, results, channel } = req.body || {};
    if (!name) return res.status(400).json({ message: "Name is required" });
    if (typeof score !== "number" || score < 0 || score > 100) {
      return res.status(400).json({ message: "Invalid score" });
    }
    const safeName = cleanStr(String(name), 30);

    const safeEmail = email != null ? cleanStr(String(email), 120) : "";
    if (!safeEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(safeEmail)) {
      return res.status(400).json({ message: "Valid email is required" });
    }
    const safePhone = phone != null ? cleanStr(String(phone), 16) : "";
    const phoneDigits = safePhone.replace(/^\+?91/, "").replace(/\D/g, "");
    if (!safePhone || phoneDigits.length !== 10) {
      return res.status(400).json({ message: "Valid 10-digit phone is required" });
    }
    const safeResults = Array.isArray(results)
      ? results
          .filter((r) => r && typeof r.category === "string" && typeof r.points === "number")
          .slice(0, 6)
      : [];

    await BrainAttempt.create({
      name: safeName,
      email: safeEmail,
      phone: safePhone,
      score,
      badgeName: badgeName != null ? String(badgeName) : "",
      topType: topType != null ? String(topType) : "",
      durationMs: typeof durationMs === "number" ? durationMs : 0,
      results: safeResults,
      channel: channel != null ? String(channel) : "web",
    });

    res.status(201).json({ ok: true });
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