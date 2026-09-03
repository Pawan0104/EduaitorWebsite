import HomeFrequentIconsPreference from "../models/homeFrequentIcons.js";

// Available shortcut/icon IDs that the frontend can persist.
// (This must stay in sync with the frontend “available catalog”.)
export const HOME_SHORTCUT_CATALOG = [
  { id: "demoBooking", label: "View Demo Booking" },
  { id: "contacts", label: "View Contacts" },
  { id: "uploadImage", label: "Upload Image" },
  { id: "newBlog", label: "New Blog" },
];

const VALID_ROLE_SET = new Set(["admin", "teacher", "parent", "student"]);
const VALID_ID_SET = new Set(HOME_SHORTCUT_CATALOG.map((c) => c.id));

const DEFAULT_HOME_SHORTCUT_IDS = ["demoBooking", "contacts", "uploadImage", "newBlog"];

const defaultsForRole = (role) => {
  // For now, defaults are identical across roles.
  // If you later introduce role-specific home shortcuts, update this mapping.
  if (!VALID_ROLE_SET.has(role)) return DEFAULT_HOME_SHORTCUT_IDS;
  return DEFAULT_HOME_SHORTCUT_IDS;
};

const sanitizeShortcutIds = (ids) => {
  if (!Array.isArray(ids)) return [];
  return ids
    .map((x) => String(x))
    .filter((id) => VALID_ID_SET.has(id));
};

export const getHomeFrequentIcons = async (req, res) => {
  const schoolId = String(req.query?.schoolId || "").trim();
  const role = String(req.query?.role || "").trim();
  const actorId = String(req.query?.actorId || "").trim();

  if (!schoolId || !role || !actorId) {
    return res.status(400).json({
      message: "Missing required params: schoolId, role, actorId",
    });
  }

  if (!VALID_ROLE_SET.has(role)) {
    return res.status(400).json({ message: "Invalid role" });
  }

  const doc = await HomeFrequentIconsPreference.findOne({
    schoolId,
    role,
    actorId,
  }).lean();

  const homeFrequentIcons = sanitizeShortcutIds(doc?.homeShortcutIds) ?? [];
  const effective =
    homeFrequentIcons.length > 0
      ? homeFrequentIcons
      : defaultsForRole(role);

  return res.json({ homeFrequentIcons: effective });
};

export const updateHomeFrequentIcons = async (req, res) => {
  const schoolId = String(req.body?.schoolId || "").trim();
  const role = String(req.body?.role || "").trim();
  const actorId = String(req.body?.actorId || "").trim();

  const reset = Boolean(req.body?.reset);
  const incomingIds = req.body?.homeShortcutIds ?? req.body?.homeFrequentIcons;

  if (!schoolId || !role || !actorId) {
    return res.status(400).json({
      message: "Missing required body fields: schoolId, role, actorId",
    });
  }

  if (!VALID_ROLE_SET.has(role)) {
    return res.status(400).json({ message: "Invalid role" });
  }

  const homeShortcutIds = reset
    ? defaultsForRole(role)
    : sanitizeShortcutIds(incomingIds);

  if (!reset && homeShortcutIds.length === 0) {
    return res.status(400).json({
      message:
        "homeShortcutIds/homeFrequentIcons must be a non-empty array (or use reset=true)",
    });
  }

  const doc = await HomeFrequentIconsPreference.findOneAndUpdate(
    { schoolId, role, actorId },
    { $set: { homeShortcutIds } },
    { upsert: true, new: true, setDefaultsOnInsert: true },
  );

  return res.json({
    homeFrequentIcons: sanitizeShortcutIds(doc.homeShortcutIds),
  });
};

