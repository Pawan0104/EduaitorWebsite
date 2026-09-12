import { COLORS } from "./theme";

/** Challenge catalog (8 brain games). Each run draws a random 5 from this pool. */
export const CHALLENGES = [
  {
    key: "observation",
    title: "Observation",
    icon: "👀",
    short: "Find the triangles",
    timeLimit: 15, // seconds
    tagline: "Look sharp. Really sharp.",
  },
  {
    key: "memory",
    title: "Memory",
    icon: "🧠",
    short: "Remember the objects",
    timeLimit: 10,
    tagline: "See it. Lock it in.",
  },
  {
    key: "logic",
    title: "Logic",
    icon: "⚙️",
    short: "What comes next?",
    timeLimit: 15,
    tagline: "One step ahead.",
  },
  {
    key: "pattern",
    title: "Pattern",
    icon: "🎯",
    short: "Spot the sequence",
    timeLimit: 15,
    tagline: "Letters never lie.",
  },
  {
    key: "speed",
    title: "Speed",
    icon: "⚡",
    short: "Find the 7",
    timeLimit: 10,
    tagline: "Fastest brain wins.",
  },
  {
    key: "quickmath",
    title: "Quick Math",
    icon: "➗",
    short: "Crunch the numbers",
    timeLimit: 15,
    tagline: "Fast heads do fast sums.",
  },
  {
    key: "oddone",
    title: "Odd One Out",
    icon: "🕵️",
    short: "Spot the imposter",
    timeLimit: 12,
    tagline: "One of these is NOT like the others.",
  },
  {
    key: "pairs",
    title: "Spot the Pair",
    icon: "🔍",
    short: "Find the twins",
    timeLimit: 12,
    tagline: "Two cards are identical. Find them both.",
  },
];

/** Rounds per run — a random 5 picked from the CHALLENGES pool. */
export const TOTAL_CHALLENGES = 5;
export const MAX_SCORE = 100;
export const PER_CHALLENGE = MAX_SCORE / TOTAL_CHALLENGES; // 20

/* ── Bonus system (score = base 0-100 + bonus) ────────────────────────────── */
export const MAX_LIVES = 3;
export const COMBO_BONUS_AT = 3; // combo of 3+ starts paying out
export const COMBO_BONUS = 4; // per correct while on fire
export const PERFECT_BONUS = 10; // all rounds correct
export const LIVES_BONUS_PER = 2; // per heart left at the end
export const BOSS_POINT = 2; // per boss hit
export const BOSS_HIT_CAP = 10; // 2 × 10 = max +20
export const BOSS_DURATION = 20; // seconds
export const MAX_TOTAL_SCORE = 200;

export const BRAIN_TYPES = {
  eagle: {
    id: "eagle",
    emoji: "🦅",
    name: "Eagle Mind",
    desc: "You spot details others miss and see patterns from above.",
    gradient: ["#2D9CFF", "#5AC8FA"],
  },
  owl: {
    id: "owl",
    emoji: "🦉",
    name: "Wise Owl",
    desc: "Calm, careful, and you remember everything that matters.",
    gradient: ["#A78BFA", "#7C6CFA"],
  },
  fox: {
    id: "fox",
    emoji: "🦊",
    name: "Clever Fox",
    desc: "Quick on your feet — nobody outpaces your reflexes.",
    gradient: ["#FFB800", "#FF8A00"],
  },
  wolf: {
    id: "wolf",
    emoji: "🐺",
    name: "Wolf Strategist",
    desc: "You connect the dots and plan two moves ahead.",
    gradient: ["#27AE60", "#1E9E6A"],
  },
};

export const STRENGTH_LABELS = {
  observation: "Sharp Observing Eyes",
  memory: "Strong Memory",
  logic: "Logical Thinker",
  pattern: "Pattern Hunter",
  speed: "Lightning Reflexes",
  quickmath: "Number Wizard",
  oddone: "Spot-the-Difference Eye",
  pairs: "Twin Finder",
};

export const FALLBACK_STRENGTHS = ["Never Gives Up", "Born Competitor"];

/** Achievement badges by total score — 5 distinct tiers, everyone earns their own. */
export const BADGES = [
  {
    min: 81,
    emoji: "🏆",
    name: "Brain Legend",
    label: "BRAIN LEGEND",
    color: "#FFB800",
    gradient: ["#FFB800", "#FF8A00"],
    desc: "An elite mind that crushes every challenge.",
  },
  {
    min: 61,
    emoji: "⚡",
    name: "Brain Ace",
    label: "BRAIN ACE",
    color: "#2D9CFF",
    gradient: ["#2D9CFF", "#5AC8FA"],
    desc: "Fast, sharp and consistently on the podium.",
  },
  {
    min: 41,
    emoji: "🎯",
    name: "Sharp Mind",
    label: "SHARP MIND",
    color: "#27AE60",
    gradient: ["#27AE60", "#1E9E6A"],
    desc: "Reliable focus across the whole board.",
  },
  {
    min: 21,
    emoji: "🥉",
    name: "Growing Mind",
    label: "GROWING MIND",
    color: "#FF8A00",
    gradient: ["#FF8A00", "#FFC24D"],
    desc: "You're building serious momentum.",
  },
  {
    min: 0,
    emoji: "🌱",
    name: "Brain Rookie",
    label: "BRAIN ROOKIE",
    color: "#8B5CF6",
    gradient: ["#8B5CF6", "#A78BFA"],
    desc: "Every legend started somewhere.",
  },
];

export const LANDING_STATS = [
  { icon: "👥", value: 1248, suffix: "", label: "Players" },
  { icon: "🏆", value: 97, suffix: "", label: "Highest Score" },
  { icon: "⚡", value: 154, suffix: "s", label: "Avg Time" }, // 2m 34s
];

export const SHARE_MESSAGE = (name, score, badge) =>
  `🧠 EDUAITOR BRAIN LEAGUE CHALLENGE!\n\n${name} scored ${score}/100 — ${badge.emoji} ${badge.name}!\nCan Your Brain Beat Mine?\n\nSmarter Schools. Stronger Students. — EduAItor`;