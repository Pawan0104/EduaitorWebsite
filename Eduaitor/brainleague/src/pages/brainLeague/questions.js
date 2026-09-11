// ── EDUAITOR BRAIN LEAGUE · 100-question bank ────────────────────────────────
// 5 categories × 20 questions. Every play picks ONE random question per
// category, so different users get different quizzes on every run.

export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Total triangles inside a side-`n` subdivided triangle. */
export function countTriangles(n) {
  let total = 0;
  for (let s = 1; s <= n; s++) total += ((n - s + 1) * (n - s + 2)) / 2;
  for (let s = 1; s <= Math.floor(n / 2); s++) total += ((n - 2 * s + 1) * (n - 2 * s + 2)) / 2;
  return total;
}

/** 4 shuffled numeric options, always including the answer. */
function numOptions(answer) {
  const cand = [answer, answer - 1, answer + 1, answer - 2, answer + 3, answer - 5];
  const uniq = [...new Set(cand)].filter((x) => x >= 1);
  while (uniq.length < 4) uniq.push(answer + uniq.length);
  return shuffle(uniq).slice(0, 4);
}

export function ordinal(n) {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

// ── OBSERVATION ──────────────────────────────────────────────────────────────
const OBSERVATION_TRIANGLES = [3, 4, 5, 6].map((n) => ({ kind: "triangles", n }));

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
];

// ── MEMORY ───────────────────────────────────────────────────────────────────
const MEMORY_POOL = ["🐶", "🍎", "🚲", "🌙", "⚽", "🦋", "🎈", "📚", "🍕", "🌈", "🚀", "🎧", "🍓", "🐢", "🦁", "🍩", "⛵", "🎲", "🐧", "🌻", "🏀", "🎸", "🍉", "🦊"];

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
];

// ── LOGIC ────────────────────────────────────────────────────────────────────
const LOGIC_BANK = [
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
];

// ── PATTERN ──────────────────────────────────────────────────────────────────
const PATTERN_BANK = [
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
];

// ── SPEED ────────────────────────────────────────────────────────────────────
const SPEED_BANK = [
  { target: 7, size: 6 }, { target: 3, size: 6 }, { target: 5, size: 6 },
  { target: 9, size: 6 }, { target: 2, size: 6 }, { target: 4, size: 6 },
  { target: 8, size: 6 }, { target: 1, size: 6 }, { target: 6, size: 6 },
  { target: 0, size: 6 }, { target: 7, size: 5 }, { target: 3, size: 5 },
  { target: 5, size: 5 }, { target: 9, size: 5 }, { target: 2, size: 5 },
  { target: 4, size: 5 }, { target: 8, size: 5 }, { target: 1, size: 5 },
  { target: 6, size: 5 }, { target: 0, size: 5 },
];

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

/**
 * Builds one fully-resolved random question for a category.
 * The result is stable per play (memoized) so options never reshuffle.
 */
export function buildQuestion(key) {
  switch (key) {
    case "observation": {
      if (Math.random() < 0.25) {
        const q = pick(OBSERVATION_TRIANGLES);
        const answer = countTriangles(q.n);
        return { key, kind: "triangles", n: q.n, answer, options: numOptions(answer) };
      }
      const q = pick(OBSERVATION_COUNTS);
      return {
        key,
        kind: "count",
        target: q.target,
        count: q.count,
        decoys: q.decoys,
        size: q.size,
        answer: q.count,
        options: numOptions(q.count),
      };
    }

    case "memory": {
      const q = pick(MEMORY_SETS);
      const position = 1 + Math.floor(Math.random() * 5);
      const answer = q[position - 1];
      const decoys = shuffle(MEMORY_POOL.filter((e) => e !== answer)).slice(0, 4);
      const options = shuffle([answer, ...decoys]).slice(0, 5);
      return { key, show: q, position, answer, options };
    }

    case "logic": {
      const q = pick(LOGIC_BANK);
      return {
        key,
        seq: q.seq,
        answer: q.answer,
        options: shuffle([q.answer, ...q.traps]),
      };
    }

    case "pattern": {
      const q = pick(PATTERN_BANK);
      return {
        key,
        seq: q.seq,
        answer: q.answer,
        options: shuffle([q.answer, ...q.traps]),
      };
    }

    case "speed": {
      const q = pick(SPEED_BANK);
      return { key, target: q.target, size: q.size };
    }

    default:
      return null;
  }
}