import { useState } from "react";
import { motion } from "framer-motion";

function randomCell(target) {
  let v;
  do {
    v = 10 + Math.floor(Math.random() * 90);
  } while (String(v).includes(String(target)));
  return v;
}

/** Speed round: exactly one target number hidden in a grid of numbers. */
export default function NumberGrid({ onFound, disabled, target = 7, size = 6, cellMs = 130 }) {
  const [grid] = useState(() => {
    const idx = Math.floor(Math.random() * size * size);
    return Array.from({ length: size * size }, (_, i) =>
      i === idx ? target : randomCell(target),
    );
  });

  return (
    <div
      className="grid gap-1.5"
      style={{ gridTemplateColumns: `repeat(${size}, minmax(0,1fr))`, maxWidth: 340 }}
    >
      {grid.map((v, i) => (
        <motion.button
          key={i}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * (cellMs / 1000), duration: 0.15 }}
          disabled={disabled}
          onClick={() => v === target && !disabled && onFound(v)}
          className="rounded-xl font-extrabold select-none active:scale-90 transition-transform"
          style={{
            aspectRatio: "1 / 1",
            background: `linear-gradient(145deg, #FFFFFF, #EEF6FF)`,
            border: "2px solid #DCEBFF",
            color: v === target ? "#27AE60" : "#1662BD",
            fontSize: size === 5 ? 22 : 20,
          }}
        >
          {v}
        </motion.button>
      ))}
    </div>
  );
}