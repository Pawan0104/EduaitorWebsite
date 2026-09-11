import { useMemo } from "react";
import { motion } from "framer-motion";

function randomDecoy(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/** Observation "count the {target}" puzzle. Exactly `count` targets shown. */
export default function CountEmojiGrid({ target, count, decoys, size = 6, cellMs = 120 }) {
  const cells = useMemo(() => {
    const total = size * size;
    if (count > total) throw new Error("count exceeds grid size");
    const filled = new Array(total).fill(null);
    const spots = [];
    while (spots.length < count) {
      const i = Math.floor(Math.random() * total);
      if (!spots.includes(i)) spots.push(i);
    }
    spots.forEach((i) => (filled[i] = target));
    for (let i = 0; i < total; i++) if (filled[i] === null) filled[i] = randomDecoy(decoys);
    return filled;
  }, [target, count, decoys, size]);

  return (
    <div
      className="grid gap-1"
      style={{ gridTemplateColumns: `repeat(${size}, minmax(0,1fr))`, maxWidth: 320 }}
    >
      {cells.map((e, i) => (
        <motion.span
          key={i}
          initial={{ scale: 0, rotate: -8 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: i * (cellMs / 1000), duration: 0.12 }}
          className="flex items-center justify-center rounded-lg select-none"
          style={{ aspectRatio: "1 / 1", fontSize: size === 5 ? 24 : 22 }}
        >
          {e}
        </motion.span>
      ))}
    </div>
  );
}