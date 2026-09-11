// Default EDUAITOR BRAIN LEAGUE bank — mirrors the original bundled game data.
// Used to seed the database and as the admin "restore defaults" payload.

const MEMORY_POOL = [
  "🐶", "🍎", "🚲", "🌙", "⚽", "🦋", "🎈", "📚", "🍕", "🌈", "🚀", "🎧",
  "🍓", "🐢", "🦁", "🍩", "⛵", "🎲", "🐧", "🌻", "🏀", "🎸", "🍉", "🦊",
];

const OBSERVATION_TRIANGLES = [3, 4, 5, 6].map((n) => ({
  kind: "triangles",
  config: { n },
}));

const OBSERVATION_COUNTS = [
  { target: "🍕", count: 8, decoys: ["🍔", "🍟", "🌮", "🍩"], size: 6 },
  { target: "🌟", count: 7, decoys: ["☁️", "🌙", "☀️", "🌈"], size: 6 },
  { target: "🎈", count: 9, decoys: ["🍭", "🎁", "🧸", "🪁"], size: 6 },
  { target: "🐼", count: 6, decoys: ["🦊", "🐨", "🐵", "🐯"], size: 6 },
  { target: "🍎", count: 10, decoys: ["🍌", "🍇", "🍓", "🍉"], size: 6 },
  { target: "🚀", count: 5, decoys: ["🌍", "🛰️", "🌙", "⭐"], size: 6 },
  { target: "⚽", count: 8, decoys: ["🏀", "🎾", "🏈", "🎳"], size: 6 },
  { target: "🦋", count: 7, decoys: ["🐝", "🐞", "🐜", "🐛"], size: 6 },
  { target: "🎸", count: 6, decoys: ["🎹", "🎺", "🎻", "🥁"], size: 6 },
  { target: "🌵", count: 9, decoys: ["🌴", "🌻", "🌷", "🍀"], size: 6 },
  { target: "🚗", count: 8, decoys: ["🚌", "🚲", "✈️", "🚚"], size: 6 },
  { target: "🐙", count: 5, decoys: ["🦀", "🐟", "🦞", "🐬"], size: 6 },
  { target: "🍪", count: 11, decoys: ["🧁", "🍬", "🍩", "🥨"], size: 6 },
  { target: "🐧", count: 12, decoys: ["🦜", "🐦", "🦉", "🐤"], size: 6 },
  { target: "🔵", count: 10, decoys: ["🔴", "🟢", "🟡", "🟣"], size: 6 },
  { target: "🦄", count: 6, decoys: ["🐪", "🦙", "🐴", "🦓"], size: 6 },
].map((c) => ({ kind: "count", config: c }));

const MEMORY_SETS = [
  ["🐶", "🍎", "🚲", "🌙", "⚽"],
  ["🦋", "🎈", "📚", "🍕", "🌈"],
  ["🚀", "🎧", "🍓", "🐢", "🌊"],
  ["🏀", "🐸", "🍩", "⭐", "📷"],
  ["🎂", "🌵", "🦊", "🍇", "🎤"],
  ["🐱", "🚗", "🎸", "🔑", "🦈"],
  ["🍉", "⚡", "🎁", "🌻", "⏰"],
  ["🍦", "🐞", "🎧", "🚢", "🌸"],
  ["🧸", "🍒", "🦜", "⛵", "🎲"],
  ["🐧", "🍋", "🎩", "🐰", "⚓"],
  ["🥑", "🛹", "🎨", "🐬", "🧦"],
  ["🍿", "🐢", "🪐", "🫖", "🎪"],
  ["🧁", "🦩", "🍏", "⏱️", "🛰️"],
  ["🍭", "🌙", "🎳", "🐹", "🍉"],
  ["⚽", "🍇", "🦉", "🎻", "🌟"],
  ["🎾", "🦀", "🍰", "🐥", "🏮"],
  ["🚲", "🌼", "🎧", "🐙", "🥕"],
  ["🦈", "🍓", "🎵", "🐢", "💍"],
  ["🎃", "🐨", "🍊", "🎸", "🧀"],
  ["🏄", "🦜", "🍩", "🐼", "⏰"],
].map((set) => ({ kind: "memory", config: { set, pool: MEMORY_POOL } }));

const LOGIC = [
  { seq: [2, 4, 8, 16], answer: 32, traps: [18, 24, 34] },
  { seq: [3, 6, 9, 12], answer: 15, traps: [13, 14, 18] },
  { seq: [5, 15, 45, 135], answer: 405, traps: [180, 275, 500] },
  { seq: [1, 4, 9, 16], answer: 25, traps: [20, 24, 36] },
  { seq: [2, 3, 5, 7], answer: 11, traps: [9, 10, 13] },
  { seq: [5, 12, 19, 26], answer: 33, traps: [32, 34, 40] },
  { seq: [64, 32, 16, 8], answer: 4, traps: [2, 6, 12] },
  { seq: [1, 3, 7, 15], answer: 31, traps: [29, 30, 63] },
  { seq: [1, 8, 27, 64], answer: 125, traps: [81, 100, 128] },
  { seq: [1, 1, 2, 3, 5], answer: 8, traps: [7, 13, 34] },
  { seq: [40, 36, 32, 28], answer: 24, traps: [22, 26, 30] },
  { seq: [1, 5, 25, 125], answer: 625, traps: [250, 600, 650] },
  { seq: [7, 17, 27, 37], answer: 47, traps: [45, 57, 67] },
  { seq: [1, 4, 16, 64], answer: 256, traps: [128, 264, 512] },
  { seq: [1, 2, 5, 10, 17], answer: 26, traps: [25, 29, 34] },
  { seq: [80, 40, 20, 10], answer: 5, traps: [2, 8, 15] },
  { seq: [100, 85, 70, 55], answer: 40, traps: [30, 45, 50] },
  { seq: [2, 12, 72, 432], answer: 2592, traps: [1728, 2590, 3000] },
  { seq: [2, 3, 5, 8, 13], answer: 21, traps: [18, 20, 34] },
  { seq: [1, 9, 81, 729], answer: 6561, traps: [6000, 6560, 6600] },
].map((q) => ({ kind: "logic", config: q }));

const PATTERN = [
  { seq: ["A", "C", "E", "G"], answer: "I", traps: ["H", "K", "F"] },
  { seq: ["B", "D", "F", "H"], answer: "J", traps: ["I", "L", "G"] },
  { seq: ["A", "Z", "B", "Y"], answer: "C", traps: ["D", "X", "B"] },
  { seq: ["M", "N", "O", "P"], answer: "Q", traps: ["P", "R", "S"] },
  { seq: ["G", "F", "E", "D"], answer: "C", traps: ["B", "E", "F"] },
  { seq: ["A", "B", "D", "G", "K"], answer: "P", traps: ["O", "Q", "L"] },
  { seq: ["Z", "X", "V", "T"], answer: "R", traps: ["S", "P", "X"] },
  { seq: ["C", "E", "H", "L"], answer: "Q", traps: ["P", "R", "M"] },
  { seq: ["D", "G", "J", "M"], answer: "P", traps: ["O", "R", "Q"] },
  { seq: ["A", "A", "B", "C", "E"], answer: "H", traps: ["G", "J", "F"] },
  { seq: ["K", "M", "O", "Q"], answer: "S", traps: ["R", "T", "U"] },
  { seq: ["P", "N", "L", "J"], answer: "H", traps: ["G", "I", "K"] },
  { seq: ["A", "C", "F", "J", "O"], answer: "U", traps: ["V", "T", "W"] },
  { seq: ["B", "C", "E", "H", "L"], answer: "Q", traps: ["P", "R", "M"] },
  { seq: ["F", "H", "J", "L"], answer: "N", traps: ["M", "O", "K"] },
  { seq: ["A", "B", "C", "E", "H"], answer: "M", traps: ["L", "N", "K"] },
  { seq: ["W", "U", "S", "Q"], answer: "O", traps: ["N", "P", "M"] },
  { seq: ["A", "D", "G", "J"], answer: "M", traps: ["N", "K", "L"] },
  { seq: ["B", "E", "H", "K"], answer: "N", traps: ["L", "M", "O"] },
  { seq: ["Z", "Y", "X", "W"], answer: "V", traps: ["U", "X", "T"] },
].map((q) => ({ kind: "pattern", config: q }));

const SPEED = [
  { target: 7, size: 6 }, { target: 3, size: 6 }, { target: 5, size: 6 },
  { target: 9, size: 6 }, { target: 2, size: 6 }, { target: 4, size: 6 },
  { target: 8, size: 6 }, { target: 1, size: 6 }, { target: 6, size: 6 },
  { target: 0, size: 6 }, { target: 7, size: 5 }, { target: 3, size: 5 },
  { target: 5, size: 5 }, { target: 9, size: 5 }, { target: 2, size: 5 },
  { target: 4, size: 5 }, { target: 8, size: 5 }, { target: 1, size: 5 },
  { target: 6, size: 5 }, { target: 0, size: 5 },
].map((q) => ({ kind: "speed", config: q }));

/** Grouped default bank: each item is { kind, config } (category implied by group). */
export const DEFAULT_BANK = {
  observation: [...OBSERVATION_TRIANGLES, ...OBSERVATION_COUNTS],
  memory: MEMORY_SETS,
  logic: LOGIC,
  pattern: PATTERN,
  speed: SPEED,
};

export const DEFAULT_SETTINGS = {
  key: "global",
  quizTitle: "EDUAITOR BRAIN LEAGUE",
  shareMessage:
    "🧠 EDUAITOR BRAIN LEAGUE CHALLENGE!\n\n{name} scored {score}/100 — {badgeEmoji} {badgeName}!\nCan Your Brain Beat Mine?\n\nSmarter Schools. Stronger Students. — EduAItor",
  badges: [
    { min: 81, emoji: "🏆", name: "Brain Legend", label: "BRAIN LEGEND", color: "#FFB800", gradient: ["#FFB800", "#FF8A00"], desc: "An elite mind that crushes every challenge." },
    { min: 61, emoji: "⚡", name: "Brain Ace", label: "BRAIN ACE", color: "#2D9CFF", gradient: ["#2D9CFF", "#5AC8FA"], desc: "Fast, sharp and consistently on the podium." },
    { min: 41, emoji: "🎯", name: "Sharp Mind", label: "SHARP MIND", color: "#27AE60", gradient: ["#27AE60", "#1E9E6A"], desc: "Reliable focus across the whole board." },
    { min: 21, emoji: "🥉", name: "Growing Mind", label: "GROWING MIND", color: "#FF8A00", gradient: ["#FF8A00", "#FFC24D"], desc: "You're building serious momentum." },
    { min: 0, emoji: "🌱", name: "Brain Rookie", label: "BRAIN ROOKIE", color: "#8B5CF6", gradient: ["#8B5CF6", "#A78BFA"], desc: "Every legend started somewhere." },
  ],
};

/** Flattens the grouped bank into BrainQuestion documents for insertion. */
export function bankToDocuments(bank = DEFAULT_BANK) {
  const docs = [];
  Object.entries(bank).forEach(([category, list]) => {
    list.forEach((item, index) => {
      docs.push({
        category,
        kind: item.kind,
        config: item.config ?? item,
        label: item.label ?? "",
        enabled: item.enabled !== false,
        order: index,
      });
    });
  });
  return docs;
}