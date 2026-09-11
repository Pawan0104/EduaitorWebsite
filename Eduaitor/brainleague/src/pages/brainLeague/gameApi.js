import { shareMessage } from "./quizConfig";
import { badgeFor } from "./scoring";

/**
 * Backend API boundary for EDUAITOR BRAIN LEAGUE.
 * Base URL comes from VITE_BRAIN_API (e.g. https://eduaitor-website-backend.onrender.com).
 * When it is not configured the game keeps working fully client-side and
 * attempts are recorded to localStorage only.
 */

const BRAIN_API = (import.meta.env.VITE_BRAIN_API || "").replace(/\/+$/, "");

export const QUERY_KEY = "bl"; // query param used on shared links

/** Fetch the admin-managed quiz config (bank + badges + share message). */
export const fetchQuizConfig = async () => {
  if (!BRAIN_API) return null;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 6000);
  try {
    const res = await fetch(`${BRAIN_API}/api/brain-league/config`, {
      signal: controller.signal,
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
};

/** Push a finished session to the backend (leaderboards / attempts). */
export const submitResult = async (session) => {
  if (!BRAIN_API) {
    console.info("[brain-league] submitResult staging (no VITE_BRAIN_API)", {
      name: session.name,
      score: session.score,
      type: session.type?.id,
    });
    return { ok: true, staged: true };
  }

  try {
    const badge = session.badge || badgeFor(session.score);
    const res = await fetch(`${BRAIN_API}/api/brain-league/attempts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: session.name,
        score: session.score,
        badgeName: badge?.name ?? "",
        topType: session.type?.id ?? "",
        durationMs: session.durationMs ?? 0,
        results: (session.results || []).map((r) => ({
          category: r.key,
          points: r.points || 0,
        })),
        channel: session.channel || "web",
      }),
      keepalive: true,
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return { ok: true };
  } catch (err) {
    console.warn("[brain-league] submitResult failed", err);
    return { ok: false };
  }
};

/** Public shareable URL that opens the landing page (marketing page when embedded). */
export const shareUrl = () => {
  const { origin, pathname } = window.location;
  if (pathname.includes("/brain-league")) return `${origin}/brain-league?${QUERY_KEY}=1`;
  const base = origin + pathname.replace(/\/$/, "");
  return `${base}?${QUERY_KEY}=1`;
};

/** Text used by WhatsApp / Instagram / clipboard sharing. */
export const shareText = ({ name, score, badge }) => shareMessage(name, score, badge);