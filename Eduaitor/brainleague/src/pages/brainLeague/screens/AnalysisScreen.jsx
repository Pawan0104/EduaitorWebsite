import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { COLORS } from "../theme";

const STEPS = [
  "Analyzing Brain Type...",
  "Calculating Score...",
  "Comparing Results...",
];

export default function AnalysisScreen({ onDone }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step >= STEPS.length) {
      const t = setTimeout(onDone, 500);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setStep((s) => s + 1), 1450);
    return () => clearTimeout(t);
  }, [step, onDone]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 px-6"
      style={{ background: `linear-gradient(180deg, #F5FAFF 0%, #EAF4FF 100%)` }}
    >
      <motion.div
        animate={{ scale: [1, 1.12, 1], rotate: [0, -8, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.6 }}
        className="text-[84px]"
      >
        🧠
      </motion.div>

      <div className="h-20 flex items-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={step}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            className="text-[19px] font-extrabold"
            style={{ color: COLORS.ink }}
          >
            {STEPS[Math.min(step, STEPS.length - 1)]}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="flex gap-2">
        {STEPS.map((_, i) => (
          <motion.span
            key={i}
            className="rounded-full"
            style={{ width: 10, height: 10, background: i <= step ? COLORS.primary : "#DCEBFF" }}
            animate={{ scale: i === step ? 1.3 : 1 }}
          />
        ))}
      </div>
    </div>
  );
}