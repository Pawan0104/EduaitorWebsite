import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { COLORS } from "../theme";
import { useSound } from "../useSound";

const STEPS = ["3", "2", "1", "GO"];

/** 3 → 2 → 1 → GO animated countdown. */
export default function Countdown({ onDone }) {
  const [step, setStep] = useState(0);
  const { play } = useSound();

  useEffect(() => {
    if (step >= STEPS.length) {
      const t = setTimeout(onDone, 150);
      return () => clearTimeout(t);
    }
    play(step === STEPS.length - 1 ? "go" : "count");
    const t = setTimeout(() => setStep((s) => s + 1), 900);
    return () => clearTimeout(t);
  }, [step, play, onDone]);

  const label = STEPS[step] ?? "GO";
  const isGo = label === "GO";

  return (
    <div className="w-full h-full flex items-center justify-center">
      <AnimatedNumber key={step} label={label} isGo={isGo} />
    </div>
  );
}

function AnimatedNumber({ label, isGo }) {
  return (
    <motion.div
      initial={{ scale: 0.3, opacity: 0 }}
      animate={{ scale: [0.3, 1.25, 1], opacity: 1 }}
      exit={{ scale: 0.6, opacity: 0 }}
      transition={{ duration: 0.45 }}
      className="font-extrabold select-none"
      style={{
        fontSize: isGo ? 100 : 120,
        color: isGo ? COLORS.success : COLORS.blue,
        textShadow: `0 6px 0 rgba(0,0,0,0.08)`,
      }}
    >
      {label}
    </motion.div>
  );
}