import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { COLORS } from "../theme";
import { badgeFor } from "../scoring";
import { PERFECT_BONUS, LIVES_BONUS_PER } from "../gameData";
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

export default function ResultScreen({ name, score, base, bonus, perfect, livesLeft, maxCombo, type, strengths, playAgain, onShare }) {
  const [confetti, setConfetti] = useState(true);
  const animated = useCountUpScore(score);
  const badge = badgeFor(base || 0);
  const { play } = useSound();

  useEffect(() => {
    play("win");
    const t = setTimeout(() => setConfetti(false), 3800);
    return () => clearTimeout(t);
  }, [play]);

  const lifeBonus = Math.max(0, livesLeft || 0) * LIVES_BONUS_PER;
  const otherBonus = Math.max(0, (bonus || 0) - (perfect ? PERFECT_BONUS : 0) - lifeBonus);
  const bonusChips = [
    ...(maxCombo >= 3 ? [{ icon: "🔥", label: `Best combo x${maxCombo}`, pts: null }] : []),
    ...(otherBonus > 0 ? [{ icon: "⚡", label: "Combos & doubles", pts: otherBonus }] : []),
    ...(lifeBonus > 0 ? [{ icon: "❤️", label: `${livesLeft} hearts left`, pts: lifeBonus }] : []),
    ...(perfect ? [{ icon: "👑", label: "Perfect run", pts: PERFECT_BONUS }] : []),
  ];
  const hasBonus = bonus > 0 && bonusChips.some((c) => c.pts);

  return (
    <div className="min-h-screen flex flex-col items-center px-5 py-8 relative overflow-hidden"
      style={{ background: `linear-gradient(180deg, #F5FAFF 0%, #EAF4FF 100%)` }}
    >
      <Confetti running={confetti} />

      {perfect && (
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="rounded-full px-4 py-1.5 text-[12px] font-extrabold flex items-center gap-1.5 mb-2"
          style={{ background: "linear-gradient(135deg,#FFB800,#FF8A00)", color: "#fff", boxShadow: "0 8px 20px rgba(255,138,0,0.4)" }}
        >
          👑 PERFECT RUN — every round correct!
        </motion.div>
      )}

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

      {/* total score */}
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
        <span className="text-white text-[13px] font-extrabold opacity-90">TOTAL SCORE</span>
        <span className="text-white text-[56px] font-extrabold leading-none">{animated}</span>
        <span className="text-white/80 text-[12px] font-bold">base {base}/100{bonus ? ` +${bonus} bonus` : ""} 🧠</span>
      </motion.div>

      {/* bonus chips */}
      {hasBonus && (
        <div className="w-full max-w-sm mt-4 flex flex-col gap-2">
          <p className="text-[12px] font-extrabold uppercase text-center" style={{ color: "#9DB8D9" }}>
            Bonus earned
          </p>
          {bonusChips.map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.45 + i * 0.1 }}
              className="rounded-xl px-3.5 py-2.5 text-[13px] font-extrabold flex items-center gap-2"
              style={{ background: COLORS.card, color: COLORS.ink, boxShadow: "0 4px 12px rgba(255,138,0,0.12)" }}
            >
              <span>{c.icon}</span>
              <span className="flex-1">{c.label}</span>
              {c.pts != null && <span style={{ color: COLORS.secondary }}>+{c.pts}</span>}
            </motion.div>
          ))}
        </div>
      )}

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
          {type?.emoji} {type?.name} at heart
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