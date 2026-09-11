import { motion } from "framer-motion";
import { COLORS } from "../theme";

const STAR = "⭐";

export default function Stars({ count = 0, size = "lg" }) {
  const px = size === "lg" ? "text-4xl" : "text-2xl";
  return (
    <div className="flex justify-center gap-1.5">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className={px}
          initial={{ scale: 0, rotate: -90, opacity: 0 }}
          animate={
            i < count
              ? { scale: [0, 1.5, 1], rotate: 0, opacity: 1 }
              : { opacity: 0.25 }
          }
          transition={{ delay: 0.15 * i, duration: 0.4 }}
        >
          {STAR}
        </motion.span>
      ))}
    </div>
  );
}