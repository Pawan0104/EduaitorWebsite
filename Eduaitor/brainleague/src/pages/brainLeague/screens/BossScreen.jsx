import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { COLORS } from "../theme";
import { BOSS_DURATION, BOSS_POINT, BOSS_HIT_CAP } from "../gameData";
import { shuffle } from "../questions";

function genQuestion() {
  const a = 1 + Math.floor(Math.random() * 9);
  const b = 1 + Math.floor(Math.random() * 9);
  const bigOp = Math.random() < 0.5;
  const op = bigOp ? "×" : "+";
  const answer = op === "×" ? a * b : a + b;
  const opts = shuffle([answer, answer + 1, answer - 1, answer + (answer % 7 || 3)]);
  return { expr: `${a} ${op} ${b}`, answer, options: opts.slice(0, 4) };
}

/**
 * BOSS ROUND — 20 seconds of rapid-fire math. Every right answer scores
 * bonus points. Wrong answers cost nothing; speed is everything.
 */
export default function BossScreen({ onDone, sound }) {
  const { play } = sound;
  const [q, setQ] = useState(() => genQuestion());
  const [hits, setHits] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(BOSS_DURATION);
  const [done, setDone] = useState(false);
  const [burst, setBurst] = useState(null);
  const doneRef = useRef(false);

  // Countdown
  useEffect(() => {
    const iv = setInterval(() => {
      setSecondsLeft((s) => {
        const next = Math.max(0, s - 0.1);
        if (next > 0 && next <= 5) play("tick");
        return next;
      });
    }, 100);
    return () => clearInterval(iv);
  }, [play]);

  // End of round
  useEffect(() => {
    if (secondsLeft <= 0 && !doneRef.current) {
      doneRef.current = true;
      setDone(true);
      const t = setTimeout(() => onDone?.(Math.min(hits, BOSS_HIT_CAP)), 1200);
      return () => clearTimeout(t);
    }
  }, [secondsLeft, doneRef, onDone, hits]);

  const answer = useCallback(
    (val) => {
      if (doneRef.current) return;
      const correct = val === q.answer;
      if (correct) {
        setHits((h) => h + 1);
        setBurst(q.answer);
        setTimeout(() => setBurst(null), 500);
        play("correct");
      }
      setQ(genQuestion());
    },
    [q, play]
  );

  const bonus = Math.min(hits, BOSS_HIT_CAP) * BOSS_POINT;
  const danger = secondsLeft <= 5;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-8 relative overflow-hidden"
      style={{ background: `linear-gradient(180deg, #2B1B4D 0%, #4C2A7A 60%, #6B3FA0 100%)` }}
    >
      {/* boss glow */}
      <motion.div
        className="absolute w-[340px] h-[340px] rounded-full opacity-25 pointer-events-none"
        style={{ background: "radial-gradient(circle, #FFB800, transparent 70%)" }}
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ repeat: Infinity, duration: 2.4 }}
      />

      <div className="relative z-10 w-full max-w-sm flex flex-col items-center">
        <motion.div
          initial={{ scale: 0.6 }}
          animate={{ scale: 1 }}
          className="rounded-full px-5 py-2 text-[13px] font-extrabold flex items-center gap-2"
          style={{ background: "rgba(255,255,255,0.14)", color: "#FFD966", border: "2px solid #FFB800" }}
        >
          👑 BOSS ROUND
        </motion.div>

        <div className="mt-5 flex items-center gap-2">
          {done ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-white text-[26px] font-extrabold"
            >
              Time's up — calculating bonus…
            </motion.div>
          ) : (
            <div className="text-white text-[64px] font-extrabold leading-none tabular-nums" style={{ color: danger ? COLORS.danger : "#FFFFFF" }}>
              {Math.ceil(secondsLeft)}
            </div>
          )}
        </div>

        <p className="text-[13px] font-extrabold mt-1" style={{ color: "#C9B4E8" }}>
          {done ? "BONUS: +" : "Solve as many as you can → +"}
          {bonus} so far
        </p>

        <AnimatePresence mode="wait">
          {!done && (
            <motion.div
              key={q.expr}
              initial={{ scale: 0.7, opacity: 0, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="w-full mt-8 rounded-3xl px-6 py-7 text-center"
              style={{ background: "rgba(255,255,255,0.12)", border: "2px solid rgba(255,255,255,0.2)", backdropFilter: "blur(4px)" }}
            >
              <div className="text-white text-[44px] font-extrabold">{q.expr} = ?</div>
              <div className="grid grid-cols-2 gap-3 mt-6">
                {q.options.map((opt) => (
                  <motion.button
                    key={opt}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => answer(opt)}
                    className="rounded-2xl py-4 text-[26px] font-extrabold text-white active:scale-95 transition-transform"
                    style={{ background: "rgba(45,156,255,0.85)", boxShadow: "0 8px 20px rgba(0,0,0,0.25)" }}
                  >
                    {opt}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* hit ticker */}
        <div className="mt-6 flex gap-2">
          {Array.from({ length: Math.min(hits, 8) }).map((_, i) => (
            <motion.span
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-[18px]"
            >
              ⚡
            </motion.span>
          ))}
        </div>

        <AnimatePresence>
          {burst !== null && (
            <motion.div
              initial={{ scale: 0.4, opacity: 0, y: 0 }}
              animate={{ scale: 1.2, opacity: 1, y: -40 }}
              exit={{ opacity: 0 }}
              className="absolute text-[40px] font-extrabold pointer-events-none"
              style={{ color: "#FFD966" }}
            >
              +{BOSS_POINT}!
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}