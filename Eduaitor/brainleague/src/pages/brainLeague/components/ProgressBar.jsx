import { motion } from "framer-motion";
import { COLORS } from "../theme";

export default function ProgressBar({ value, level, total }) {
  return (
    <div className="w-full">
      <div className="flex items-baseline justify-between mb-1.5">
        <span className="text-[12px] font-extrabold" style={{ color: COLORS.ink }}>
          Level {level} of {total}
        </span>
        <span className="text-[12px] font-extrabold" style={{ color: COLORS.secondary }}>
          {Math.round(value)}%
        </span>
      </div>
      <div
        className="h-3.5 rounded-full overflow-hidden"
        style={{ background: "#FFE9B8", boxShadow: "inset 0 1px 2px rgba(0,0,0,0.08)" }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.secondary})`,
            backgroundSize: "24px 24px",
          }}
          animate={{ width: `${Math.min(100, Math.max(0, value))}%` }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        />
      </div>
    </div>
  );
}