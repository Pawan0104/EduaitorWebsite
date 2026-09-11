import { BRAIN_TYPES, STRENGTH_LABELS, FALLBACK_STRENGTHS, BADGES, PER_CHALLENGE } from "./gameData";

/**
 * Convert a raw challenge attempt into game points + stars.
 * Every challenge is worth PER_CHALLENGE (20) → total 100.
 */
export const scoreChallenge = ({ key, correct, ms, timeLimitMs }) => {
  let points = 0;
  let stars = 0;

  if (key === "speed") {
    // Speed is scored on response time, not just correct.
    const t = ms ?? timeLimitMs;
    const frac = Math.max(0, Math.min(1, (timeLimitMs - t) / (timeLimitMs - 3000)));
    points = Math.round(PER_CHALLENGE * frac);
    stars = t < 2000 ? 3 : t < 4500 ? 2 : t < timeLimitMs ? 1 : 0;
  } else {
    points = correct ? PER_CHALLENGE : 0;
    stars = !correct ? 0 : ms !== null && ms < 6500 ? 3 : 2;
  }

  // Participation floor for speed (they found it, even if slow).
  if (key === "speed" && ms !== null && points === 0) points = 4;
  if (key === "speed" && ms !== null && stars === 0) stars = 1;

  return { points, stars };
};

export const totalScore = (results) =>
  results.reduce((sum, r) => sum + (r.points || 0), 0);

export const badgeFor = (score) => BADGES.find((b) => score >= b.min) || BADGES[BADGES.length - 1];

/**
 * Pick a brain type from the per-category scores (0–20 each of the 5).
 * Dominant category wins; ties prefer the "strategist" archetypes.
 */
export const brainTypeFor = (catScores) => {
  const sorted = Object.entries(catScores).sort((a, b) => b[1] - a[1]);
  const max = sorted[0][1];
  const leaders = sorted.filter(([, s]) => s === max).map(([k]) => k);

  const pick = (list) => {
    const key = list[0];
    if (key === "observation") return BRAIN_TYPES.eagle;
    if (key === "pattern") return BRAIN_TYPES.eagle;
    if (key === "memory") return BRAIN_TYPES.owl;
    if (key === "speed") return BRAIN_TYPES.fox;
    if (key === "logic") return BRAIN_TYPES.wolf;
    return BRAIN_TYPES.wolf;
  };

  // Balanced brain → strategist.
  if (leaders.length >= 3) return BRAIN_TYPES.wolf;
  // Tie between logic and another powerhouse → wolf.
  if (leaders.includes("logic") && leaders.length >= 2) return BRAIN_TYPES.wolf;
  // Dominant speed wins outright.
  if (leaders.includes("speed") && max >= 10) return BRAIN_TYPES.fox;
  // Otherwise go with the leader(s).
  if (max >= 10) return pick(leaders);

  // Low scores everywhere → a fresh mind, still a fox at heart.
  return BRAIN_TYPES.fox;
};

/** Lock in up to 3 strengths, falling back when a session was rough. */
export const strengthsFor = (catScores) => {
  const list = Object.entries(catScores)
    .sort((a, b) => b[1] - a[1])
    .filter(([, s]) => s >= 12)
    .map(([k]) => STRENGTH_LABELS[k]);

  const out = list.slice(0, 3);
  while (out.length < 3) out.push(FALLBACK_STRENGTHS[out.length - 1] ?? "Champion Spirit");
  return out.slice(0, 3);
};

export const fmtTime = (ms) => {
  const s = ms / 1000;
  if (s < 60) return `${s.toFixed(1)}s`;
  const m = Math.floor(s / 60);
  const r = Math.round(s % 60);
  return `${m}m ${r}s`;
};