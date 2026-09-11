import { useMemo } from "react";
import { motion } from "framer-motion";
import { COLORS } from "../theme";

const PALETTE = [COLORS.primary, COLORS.secondary, COLORS.blue, COLORS.success, "#FF5F8F", "#8B5CF6"];

/** Full-screen confetti burst using only framer-motion particles. */
export default function Confetti({ count = 90, running }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        size: 8 + Math.random() * 10,
        color: PALETTE[i % PALETTE.length],
        duration: 1.4 + Math.random() * 1.4,
        delay: Math.random() * 0.5,
        rot: 360 * (Math.random() > 0.5 ? 1 : -1),
        shape: i % 3 === 0 ? "circle" : i % 3 === 1 ? "rect" : "dot",
      })),
    [count],
  );

  if (!running) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: -30, x: `${p.x}vw`, opacity: 1, rotate: 0 }}
          animate={{ y: "110vh", rotate: p.rot, opacity: [1, 1, 0.4] }}
          transition={{ duration: p.duration, delay: p.delay, ease: "easeIn" }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: p.size,
            height: p.shape === "rect" ? p.size * 1.8 : p.size,
            background: p.color,
            borderRadius: p.shape === "circle" ? "50%" : 3,
          }}
        />
      ))}
    </div>
  );
}