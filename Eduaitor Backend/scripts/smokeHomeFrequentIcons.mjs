import HomeFrequentIconsPreference from "../models/homeFrequentIcons.js";
import {
  HOME_SHORTCUT_CATALOG,
} from "../controllers/homeFrequentIconsController.js";

// Lightweight smoke check:
// - ensures new modules load (syntax / ESM correctness)
// - does not connect to MongoDB

if (!HomeFrequentIconsPreference) {
  throw new Error("HomeFrequentIconsPreference model failed to load");
}

if (!Array.isArray(HOME_SHORTCUT_CATALOG) || HOME_SHORTCUT_CATALOG.length === 0) {
  throw new Error("HOME_SHORTCUT_CATALOG is missing or empty");
}

console.log(
  "smokeHomeFrequentIcons: ok",
  HomeFrequentIconsPreference.modelName,
  "catalogSize=",
  HOME_SHORTCUT_CATALOG.length,
);

