import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { COLORS } from "../theme";
import { MAX_LIVES, COMBO_BONUS_AT } from "../gameData";
import { scoreChallenge } from "../scoring";
import { buildQuestion, ordinal } from "../questions";
import ProgressBar from "../components/ProgressBar";
import Stars from "../components/Stars";
import TrianglePuzzle from "../components/TrianglePuzzle";
import NumberGrid from "../components/NumberGrid";
import CountEmojiGrid from "../components/CountEmojiGrid";

/** Sequence row of number/letter tiles with a trailing blank. */
function SequenceRow({ items, wide }) {
  return (
    <div className="flex items-end gap-2.5 flex-wrap justify-center px-4">
      {items.map((n, i) => {
        const isBlank = n === "?";
        return (
          <motion.span
            key={i}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className={`rounded-2xl flex items-center justify-center font-extrabold ${wide ? "w-[62px] h-[76px] text-[24px]" : "w-[54px] h-[62px] text-[26px]"}`}
            style={{
              background: isBlank ? "#FFE9B8" : COLORS.card,
              color: isBlank ? COLORS.secondary : COLORS.blue,
              boxShadow: "0 6px 16px rgba(45,156,255,0.12)",
              border: isBlank ? `3px dashed ${COLORS.secondary}` : "none",
            }}
          >
            {n}
          </motion.span>
        );
      })}
    </div>
  );
}

/** Spot-the-pair: tap two identical cards (mismatches just reset). */
function PairGrid({ question, answered, onAnswer }) {
  const [first, setFirst] = useState(null);
  const [wrong, setWrong] = useState(false);

  const tap = (i) => {
    if (answered) return;
    if (first === null) {
      setFirst(i);
      return;
    }
    if (first === i) {
      setFirst(null);
      return;
    }
    if (question.cards[i] === question.cards[first]) {
      onAnswer(true);
    } else {
      setWrong(true);
      setFirst(null);
      setTimeout(() => setWrong(false), 350);
    }
  };

  return (
    <div className="flex flex-col items-center gap-5">
      <p className="text-[17px] font-extrabold text-center px-4" style={{ color: COLORS.ink }}>
        Tap the two identical cards!
      </p>
      <motion.div
        animate={wrong ? { x: [-6, 6, -4, 4, 0] } : { x: 0 }}
        transition={{ duration: 0.35 }}
        className="grid grid-cols-4 gap-2.5"
      >
        {question.cards.map((e, i) => {
          const active = first === i;
          return (
            <motion.button
              key={i}
              disabled={answered}
              whileTap={{ scale: 0.9 }}
              onClick={() => tap(i)}
              className="rounded-2xl flex items-center justify-center disabled:opacity-70"
              style={{
                width: 62,
                height: 62,
                background: active ? "#FFF4D6" : COLORS.card,
                border: `3px solid ${active ? COLORS.secondary : "#DCEBFF"}`,
                boxShadow: "0 6px 16px rgba(45,156,255,0.1)",
              }}
            >
              <span className="text-[30px]">{e}</span>
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
}

/** Odd-one-out: 9 (or 12) tiles, exactly one different. */
function OddOneGrid({ question, answered, onAnswer }) {
  const cols = question.grid.length > 9 ? 4 : 3;
  return (
    <div className="flex flex-col items-center gap-5">
      <p className="text-[17px] font-extrabold text-center px-4" style={{ color: COLORS.ink }}>
        Tap the one that's different!
      </p>
      <div className="grid gap-2.5" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
        {question.grid.map((e, i) => (
          <motion.button
            key={i}
            disabled={answered}
            whileTap={{ scale: 0.9 }}
            onClick={() => onAnswer(i === question.answer)}
            className="rounded-2xl flex items-center justify-center disabled:opacity-70"
            style={{
              width: 58,
              height: 58,
              background: COLORS.card,
              border: "3px solid #DCEBFF",
              boxShadow: "0 6px 16px rgba(45,156,255,0.1)",
            }}
          >
            <span className="text-[30px]">{e}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

/** The brain-game bodies, each driven by a randomly drawn bank question. */
function ChallengeBody({ question, phase, answered, onAnswer }) {
  if (!question) return null;

  switch (question.key) {
    case "observation":
      return (
        <div className="flex flex-col items-center gap-5">
          <div className="rounded-3xl p-5" style={{ background: COLORS.card, boxShadow: "0 10px 26px rgba(45,156,255,0.12)" }}>
            {question.kind === "triangles" ? (
              <TrianglePuzzle n={question.n} size={280} />
            ) : (
              <CountEmojiGrid target={question.target} count={question.count} decoys={question.decoys} size={question.size} />
            )}
          </div>
          <p className="text-[17px] font-extrabold text-center px-4" style={{ color: COLORS.ink }}>
            {question.kind === "triangles" ? "How many triangles can you find?" : `How many ${question.target} are there?`}
          </p>
          <div className="grid grid-cols-2 gap-3 w-full max-w-[320px]">
            {question.options.map((opt) => (
              <OptionChip key={`${opt}`} disabled={answered} onClick={() => onAnswer(opt === question.answer)} label={opt} />
            ))}
          </div>
        </div>
      );

    case "memory":
      return phase === "show" ? (
        <div className="flex flex-col items-center gap-5">
          <p className="text-[17px] font-extrabold" style={{ color: COLORS.ink }}>Memorize these objects…</p>
          <div className="flex gap-2.5 flex-wrap justify-center max-w-[340px]">
            {question.show.map((item, i) => (
              <motion.span
                key={i}
                initial={{ scale: 0, rotate: -12 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: i * 0.15 }}
                className="text-4xl"
              >
                {item}
              </motion.span>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-5">
          <p className="text-[17px] font-extrabold text-center px-4" style={{ color: COLORS.ink }}>
            What was the {ordinal(question.position)} object?
          </p>
          <div className="grid grid-cols-2 gap-3 w-full max-w-[340px]">
            {question.options.map((opt, i) => (
              <OptionChip key={i} emoji disabled={answered} onClick={() => onAnswer(opt === question.answer)} option={opt} />
            ))}
          </div>
        </div>
      );

    case "logic":
      return (
        <div className="flex flex-col items-center gap-6">
          <SequenceRow items={[...question.seq, "?"]} wide />
          <p className="text-[17px] font-extrabold" style={{ color: COLORS.ink }}>What comes next?</p>
          <div className="grid grid-cols-2 gap-3 w-full max-w-[320px]">
            {question.options.map((opt) => (
              <OptionChip key={opt} disabled={answered} onClick={() => onAnswer(opt === question.answer)} label={opt} />
            ))}
          </div>
        </div>
      );

    case "pattern":
      return (
        <div className="flex flex-col items-center gap-6">
          <SequenceRow items={[...question.seq, "?"]} />
          <p className="text-[17px] font-extrabold" style={{ color: COLORS.ink }}>What's the missing letter?</p>
          <div className="grid grid-cols-2 gap-3 w-full max-w-[280px]">
            {question.options.map((opt) => (
              <OptionChip key={opt} disabled={answered} onClick={() => onAnswer(opt === question.answer)} label={opt} />
            ))}
          </div>
        </div>
      );

    case "speed":
      return (
        <div className="flex flex-col items-center gap-5">
          <motion.p
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 1 }}
            className="text-[19px] font-extrabold text-center px-4"
            style={{ color: COLORS.blue }}
          >
            👀 Find the <span style={{ color: COLORS.success }}>{question.target}</span> — fast!
          </motion.p>
          <NumberGrid onFound={() => onAnswer(true)} disabled={answered} target={question.target} size={question.size} />
        </div>
      );

    case "quickmath":
      return (
        <div className="flex flex-col items-center gap-6">
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="rounded-3xl px-10 py-6 text-[40px] font-extrabold"
            style={{ background: COLORS.card, color: COLORS.blue, boxShadow: "0 10px 26px rgba(45,156,255,0.14)" }}
          >
            {question.expr} = ?
          </motion.div>
          <p className="text-[17px] font-extrabold" style={{ color: COLORS.ink }}>Crack it fast!</p>
          <div className="grid grid-cols-2 gap-3 w-full max-w-[320px]">
            {question.options.map((opt) => (
              <OptionChip key={opt} disabled={answered} onClick={() => onAnswer(opt === question.answer)} label={opt} />
            ))}
          </div>
        </div>
      );

    case "oddone":
      return <OddOneGrid question={question} answered={answered} onAnswer={onAnswer} />;

    case "pairs":
      return <PairGrid question={question} answered={answered} onAnswer={onAnswer} />;

    default:
      return null;
  }
}

function OptionChip({ label, emoji = false, option, onClick, disabled }) {
  return (
    <motion.button
      whileTap={{ scale: 0.92 }}
      disabled={disabled}
      onClick={onClick}
      className="rounded-2xl font-extrabold active:scale-95 transition-transform disabled:opacity-50"
      style={{
        padding: emoji ? "18px 0" : "16px 0",
        fontSize: emoji ? 30 : 20,
        background: COLORS.card,
        color: COLORS.blue,
        border: "3px solid #DCEBFF",
        boxShadow: "0 6px 16px rgba(45,156,255,0.1)",
      }}
    >
      {emoji ? option : label}
    </motion.button>
  );
}

/** Timer ring + seconds. */
function TimerRing({ secondsLeft, total, onTimeout, active }) {
  const pct = secondsLeft / total;
  const R = 26;
  const C = 2 * Math.PI * R;

  useEffect(() => {
    if (typeof onTimeout !== "function") return;
    if (secondsLeft <= 0 && active) onTimeout();
  }, [secondsLeft, active, onTimeout]);

  return (
    <div className="relative w-[72px] h-[72px]">
      <svg width="72" height="72" viewBox="0 0 72 72" className="-rotate-90">
        <circle cx="36" cy="36" r={R} fill="none" stroke="#FFE9B8" strokeWidth="7" />
        <circle
          cx="36"
          cy="36"
          r={R}
          fill="none"
          stroke={secondsLeft <= 4 ? COLORS.danger : COLORS.primary}
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={C}
          strokeDashoffset={C * (1 - pct)}
          style={{ transition: "stroke-dashoffset 0.1s linear, stroke 0.3s" }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-[18px] font-extrabold"
        style={{ color: COLORS.ink }}>
        {Math.ceil(secondsLeft)}
      </div>
    </div>
  );
}

export default function ChallengeScreen({
  round,
  roundIdx,
  roundsTotal,
  level = 0,
  pointsSoFar,
  combo = 0,
  hearts = MAX_LIVES,
  isDouble = false,
  onFinish,
  sound,
}) {
  const { play } = sound;
  const memoryShowMs = level ? 2400 : 3000;
  const [phase, setPhase] = useState(round.key === "memory" ? "show" : "play");
  const [secondsLeft, setSecondsLeft] = useState(round.timeLimit);
  const [answered, setAnswered] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const startRef = useRef(null);
  const finishRef = useRef(false);

  // Random question drawn once per play — cached so options never reshuffle.
  const question = useMemo(() => buildQuestion(round.key, level), [round.key, level]);

  // Memory show → ask.
  useEffect(() => {
    if (round.key === "memory" && phase === "show") {
      const t = setTimeout(() => { setPhase("ask"); startRef.current = performance.now(); }, memoryShowMs);
      return () => clearTimeout(t);
    }
  }, [round.key, phase, memoryShowMs]);

  // Countdown timer for timed challenges (stopped once answered).
  useEffect(() => {
    if (round.key === "speed") return;
    if (answered || (phase !== "play" && phase !== "ask")) return;
    startRef.current = startRef.current ?? performance.now();
    const iv = setInterval(() => {
      setSecondsLeft((s) => {
        const next = Math.max(0, s - 0.1);
        if (next <= 4 && next > 0.01 && Math.round(next * 10) % 10 === 0) play("tick");
        return next;
      });
    }, 100);
    return () => clearInterval(iv);
  }, [round.key, phase, play, answered]);

  const elapsedMs = () => (startRef.current ? performance.now() - startRef.current : 0);

  const resolve = (correct) => {
    if (finishRef.current) return;
    finishRef.current = true;
    setAnswered(true);
    const ms = Math.round(elapsedMs());
    const raw = { key: round.key, correct, ms, timeLimitMs: round.timeLimit * 1000, isDouble };
    const scored = scoreChallenge(raw);
    setFeedback(scored);
    play(correct || round.key === "speed" ? "correct" : "wrong");
    if (scored.points > 0) setTimeout(() => play("coin"), 350);

    if (typeof onFinish === "function") {
      setTimeout(() => onFinish({ ...raw, ...scored }), 1500);
    }
  };

  const onTimeout = () => {
    if (round.key === "speed") return; // speed never times out buttons
    resolve(round.key === "memory" ? false : null);
  };

  const timedActive = round.key !== "speed" && !answered && (phase === "play" || phase === "ask");

  return (
    <div className="min-h-screen flex flex-col px-5 py-6"
      style={{ background: `linear-gradient(180deg, #F5FAFF 0%, #EAF4FF 100%)` }}
    >
      <GameChrome roundIdx={roundIdx} roundsTotal={roundsTotal} pointsSoFar={pointsSoFar} hearts={hearts} combo={combo} sound={sound} />

      <div className="flex items-center justify-between mt-4 mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-2xl">{round.icon}</span>
          <h2 className="text-[19px] font-extrabold" style={{ color: COLORS.ink }}>{round.title} Challenge</h2>
          {isDouble && (
            <motion.span
              animate={{ scale: [1, 1.12, 1] }}
              transition={{ repeat: Infinity, duration: 1.1 }}
              className="text-[11px] font-extrabold px-2 py-1 rounded-full text-white"
              style={{ background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary})` }}
            >
              ⚡ DOUBLE POINTS
            </motion.span>
          )}
        </div>
        {round.key !== "speed" && (
          <TimerRing secondsLeft={secondsLeft} total={round.timeLimit} active={timedActive} onTimeout={onTimeout} />
        )}
      </div>

      <div className="flex-1 flex items-start justify-center pt-2">
        <ChallengeBody question={question} phase={phase} answered={answered} onAnswer={resolve} />
      </div>

      {/* feedback overlay */}
      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.55)" }}
          >
            <motion.div
              initial={{ scale: 0.6, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              className="rounded-[28px] px-8 py-7 text-center"
              style={{ background: COLORS.card, boxShadow: "0 18px 50px rgba(31,41,55,0.18)" }}
            >
              <div className="text-5xl mb-2">{feedback.points > 0 ? "🎉" : "😅"}</div>
              <Stars count={feedback.stars} />
              <motion.p className="text-[22px] font-extrabold mt-3" style={{ color: feedback.points > 0 ? COLORS.success : COLORS.danger }}>
                {feedback.points > 0 ? "+" : "±"}
                {feedback.points} points
              </motion.p>
              {feedback.points > 0 && isDouble && (
                <p className="text-[13px] font-extrabold mt-1" style={{ color: COLORS.secondary }}>
                  ⚡ DOUBLE! +{feedback.points} bonus
                </p>
              )}
              {feedback.points > 0 && combo + 1 >= COMBO_BONUS_AT && (
                <p className="text-[13px] font-extrabold mt-1" style={{ color: COLORS.danger }}>
                  🔥 COMBO x{combo + 1}!
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function GameChrome({ roundIdx, roundsTotal, pointsSoFar, hearts, combo, sound }) {
  const { muted, toggle } = sound;
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <span className="text-2xl">🧠</span>
        <div className="flex-1">
          <ProgressBar value={(roundIdx / roundsTotal) * 100} level={roundIdx + 1} total={roundsTotal} />
        </div>
        <div className="flex items-center gap-1" aria-label={`${hearts} lives left`}>
          {Array.from({ length: MAX_LIVES }).map((_, i) => (
            <motion.span
              key={i}
              animate={{ scale: i < hearts ? 1 : 0.8, opacity: i < hearts ? 1 : 0.3 }}
              className="text-[15px]"
            >
              {i < hearts ? "❤️" : "🖤"}
            </motion.span>
          ))}
        </div>
        {combo >= 2 && (
          <motion.div
            key={combo}
            initial={{ scale: 1.5 }}
            animate={{ scale: 1 }}
            className="rounded-full px-2.5 py-1 text-[12px] font-extrabold"
            style={{ background: "#FFE4E1", color: COLORS.danger }}
          >
            🔥 {combo}
          </motion.div>
        )}
        <motion.div key={pointsSoFar} initial={{ scale: 1.4 }} animate={{ scale: 1 }}
          className="rounded-full px-3 py-1 text-[12px] font-extrabold flex items-center gap-1"
          style={{ background: "#FFF4D6", color: COLORS.secondary }}>
          ⭐ {pointsSoFar}
        </motion.div>
        <button onClick={toggle} aria-label="Toggle sound"
          className="w-9 h-9 rounded-full flex items-center justify-center active:scale-90 transition-transform"
          style={{ background: muted ? "#EEF1F5" : "#FFE9B8" }}>
          {muted ? "🔇" : "🔊"}
        </button>
      </div>
    </div>
  );
}
