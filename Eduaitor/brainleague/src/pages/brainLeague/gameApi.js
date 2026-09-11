import { SHARE_MESSAGE } from "./gameData";

/**
 * Thin backend API boundary. Today everything is client-side + localStorage.
 * Swap these stubs with real fetches when the leaderboard/achievements
 * services land on the server — call sites stay unchanged.
 */

export const QUERY_KEY = "bl"; // query param used on shared links

/** Push a finished session to the backend (leaderboards, weekly challenges). */
export const submitResult = (session) => {
  // TODO(backend): POST /api/brain-league/results
  console.info("[brain-league] submitResult staging", {
    name: session.name,
    score: session.score,
    type: session.type?.id,
    channel: session.channel,
  });
  return Promise.resolve({ ok: true, staged: true });
};

/** Public shareable URL that opens the landing page (marketing page when embedded). */
export const shareUrl = () => {
  const { origin, pathname } = window.location;
  if (pathname.includes("/brain-league")) return `${origin}/brain-league?${QUERY_KEY}=1`;
  const base = origin + pathname.replace(/\/$/, "");
  return `${base}?${QUERY_KEY}=1`;
};

/** Text used by WhatsApp / Instagram / clipboard sharing. */
export const shareText = ({ name, score, badge }) => SHARE_MESSAGE(name, score, badge);