import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { COLORS } from "../theme";
import Countdown from "../components/Countdown";

export default function IntroScreen({ name, rounds, doubleIdx, onDone }) {
  const [phase, setPhase] = useState("ready");

  useEffect(() => {
    const t = setTimeout(() => setPhase("countdown"), 2600);
    return () => clearTimeout(t);
  }, []);

  if (phase === "countdown") return <Countdown onDone={onDone} />;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-10"
      style={{ background: `linear-gradient(180deg, #F5FAFF 0%, #EAF4FF 100%)` }}
    >
      <motion.h2
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="font-extrabold text-center mb-2"
        style={{ fontSize: "clamp(38px, 9vw, 64px)", color: COLORS.ink }}
      >
        Ready, {name}?
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-[14px] font-bold mb-1"
        style={{ color: "#7BA6CE" }}
      >
        Five random brain games — plus a final boss round.
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
        className="text-[12px] font-extrabold mb-6"
        style={{ color: COLORS.secondary }}
      >
        ❤️❤️❤️ You have 3 lives · miss and lose one · build combos for bonus ⭐
      </motion.p>

      <div className="w-full max-w-sm flex flex-col gap-2.5">
        {rounds.map((c, i) => (
          <motion.div
            key={`${c.key}-${i}`}
            initial={{ x: -60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.15 + i * 0.1 }}
            className="flex items-center gap-3 rounded-2xl px-4 py-3"
            style={{ background: COLORS.card, boxShadow: "0 4px 14px rgba(45,156,255,0.08)" }}
          >
            <span className="text-2xl">{c.icon}</span>
            <div className="flex-1 min-w-0">
              <p className="text-[15px] font-extrabold" style={{ color: COLORS.ink }}>{c.title}</p>
              <p className="text-[11px] font-bold truncate" style={{ color: "#9DB8D9" }}>{c.tagline}</p>
            </div>
            {i === doubleIdx ? (
              <span className="text-[11px] font-extrabold px-2 py-1 rounded-full text-white whitespace-nowrap"
                style={{ background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary})` }}>
                ⚡ DOUBLE
              </span>
            ) : (
              <span className="text-[11px] font-extrabold px-2 py-1 rounded-full whitespace-nowrap"
                style={{ background: "#E5F2FF", color: COLORS.blue }}>
                {c.key === "speed" ? "🔍 fast" : `${c.timeLimit}s`}
              </span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}