const PRODUCTION_API = "https://eduaitor-website-backend.onrender.com/api";
const LOCAL_API = "http://localhost:5000/api";

const envUrl = (import.meta.env.VITE_API_URL || "").trim();

/** Shared API base for the public website (always ends with /api). */
export const API_URL = import.meta.env.DEV
  ? envUrl || LOCAL_API
  : envUrl && !/localhost|127\.0\.0\.1/i.test(envUrl)
    ? envUrl
    : PRODUCTION_API;

export default API_URL;
