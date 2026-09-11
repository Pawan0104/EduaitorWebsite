import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { COLORS } from "../theme";
import { CHALLENGES } from "../gameData";
import Countdown from "../components/Countdown";

export default function IntroScreen({ name, onDone }) {
  const [phase, setPhase] = useState("ready");

  useEffect(() => {
    const t = setTimeout(() => setPhase("countdown"), 2200);
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
        className="text-[14px] font-bold mb-8"
        style={{ color: "#7BA6CE" }}
      >
        Five mini brain challenges. Give each one your best shot.
      </motion.p>

      <div className="w-full max-w-sm flex flex-col gap-2.5">
        {CHALLENGES.map((c, i) => (
          <motion.div
            key={c.key}
            initial={{ x: -60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.15 + i * 0.12 }}
            className="flex items-center gap-3 rounded-2xl px-4 py-3"
            style={{ background: COLORS.card, boxShadow: "0 4px 14px rgba(45,156,255,0.08)" }}
          >
            <span className="text-2xl">{c.icon}</span>
            <div className="flex-1">
              <p className="text-[15px] font-extrabold" style={{ color: COLORS.ink }}>{c.title}</p>
              <p className="text-[11px] font-bold" style={{ color: "#9DB8D9" }}>{c.tagline}</p>
            </div>
            <span className="text-[11px] font-extrabold px-2 py-1 rounded-full"
              style={{ background: "#E5F2FF", color: COLORS.blue }}>
              {i < 4 ? `${c.timeLimit}s` : "🔍 fast"}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}