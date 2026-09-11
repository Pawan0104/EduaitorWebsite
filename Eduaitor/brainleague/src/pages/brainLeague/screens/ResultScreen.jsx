import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { COLORS } from "../theme";
import { badgeFor } from "../scoring";
import Confetti from "../components/Confetti";
import { useSound } from "../useSound";

function useCountUpScore(target, duration = 1800) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return value;
}

export default function ResultScreen({ name, score, type, strengths, playAgain, onShare }) {
  const [confetti, setConfetti] = useState(true);
  const animated = useCountUpScore(score);
  const badge = badgeFor(score);
  const { play } = useSound();

  useEffect(() => {
    play("win");
    const t = setTimeout(() => setConfetti(false), 3800);
    return () => clearTimeout(t);
  }, [play]);

  return (
    <div className="min-h-screen flex flex-col items-center px-5 py-8 relative overflow-hidden"
      style={{ background: `linear-gradient(180deg, #F5FAFF 0%, #EAF4FF 100%)` }}
    >
      <Confetti running={confetti} />

      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 14 }}
        className="relative text-[64px]"
      >
        {badge.emoji}
        <motion.span
          className="absolute -top-3 -right-2 text-2xl"
          animate={{ rotate: [0, 20, 0] }}
          transition={{ repeat: Infinity, duration: 1.6 }}
        >
          ✨
        </motion.span>
      </motion.div>

      <h2 className="text-[15px] font-extrabold mt-3 text-[#7BA6CE]">Your result, {name}!</h2>
      <h1 className="text-[30px] font-extrabold" style={{ color: COLORS.ink }}>{badge.name}</h1>

      {/* score */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="relative mt-6 w-[190px] h-[190px] rounded-full flex flex-col items-center justify-center"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${badge.gradient[0]}, ${badge.gradient[1]})`,
          boxShadow: `0 18px 40px rgba(0,0,0,0.18)`,
        }}
      >
        <span className="text-white text-[13px] font-extrabold opacity-90">BRAIN SCORE</span>
        <span className="text-white text-[56px] font-extrabold leading-none">{animated}</span>
        <span className="text-white/80 text-[12px] font-bold">out of 100 🧠</span>
      </motion.div>

      {/* badge */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-5 rounded-full px-4 py-2 text-[13px] font-extrabold flex items-center gap-2"
        style={{ background: COLORS.card, color: badge.color, border: `2px dashed ${badge.color}` }}
      >
        {badge.label}
      </motion.div>

      {/* personality + description */}
      <motion.div
        initial={{ y: 16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-3 w-full max-w-sm text-center"
      >
        <p className="text-[13.5px] font-extrabold" style={{ color: COLORS.ink }}>
          {type.emoji} {type.name} at heart
        </p>
        <p className="text-[12.5px] font-bold mt-1" style={{ color: "#7BA6CE" }}>{badge.desc}</p>
      </motion.div>

      {/* strengths */}
      <div className="w-full max-w-sm mt-6 flex flex-col gap-2.5">
        <p className="text-[12px] font-extrabold uppercase text-center" style={{ color: "#9DB8D9" }}>
          Your Strengths
        </p>
        {strengths.map((s, i) => (
          <motion.div
            key={s}
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.8 + i * 0.15 }}
            className="rounded-2xl px-4 py-3 text-[14px] font-extrabold flex items-center gap-2.5"
            style={{ background: COLORS.card, color: COLORS.ink, boxShadow: "0 4px 14px rgba(45,156,255,0.08)" }}
          >
            <span style={{ color: COLORS.success }}>✔</span> {s}
          </motion.div>
        ))}
      </div>

      <div className="w-full max-w-sm mt-8 flex flex-col gap-2.5">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onShare}
          className="rounded-2xl py-4 text-[16px] font-extrabold text-white shadow-xl"
          style={{ background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary})`, boxShadow: "0 12px 26px rgba(255,138,0,0.35)" }}
        >
          Share My Score 🚀
        </motion.button>
        <button
          onClick={playAgain}
          className="rounded-2xl py-3 text-[14px] font-extrabold"
          style={{ background: COLORS.card, color: COLORS.blue, border: "3px solid #DCEBFF" }}
        >
          Play Again 🔁
        </button>
      </div>
    </div>
  );
}