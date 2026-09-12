import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LandingScreen from "./screens/LandingScreen";
import IntroScreen from "./screens/IntroScreen";
import ChallengeScreen from "./screens/ChallengeScreen";
import AnalysisScreen from "./screens/AnalysisScreen";
import ResultScreen from "./screens/ResultScreen";
import ShareScreen from "./screens/ShareScreen";
import BossScreen from "./screens/BossScreen";
import { useSound } from "./useSound";
import { useLocalStorage } from "./useLocalStorage";
import { totalScore, brainTypeFor, strengthsFor, badgeFor } from "./scoring";
import { CHALLENGES, TOTAL_CHALLENGES, MAX_LIVES, COMBO_BONUS_AT, COMBO_BONUS, PERFECT_BONUS, LIVES_BONUS_PER, BOSS_POINT, BOSS_HIT_CAP, MAX_TOTAL_SCORE } from "./gameData";
import { shuffle } from "./questions";
import { fetchQuizConfig, submitResult } from "./gameApi";
import { applyQuizConfig } from "./quizConfig";
import { setRemoteBank } from "./questions";

const SCREENS = ["landing", "intro", "challenge", "boss", "analysis", "result", "share"];

/**
 * BRAIN LEAGUE — a 2-3 minute gamified brain challenge.
 * Flow: landing → intro → 5 random brain games → boss round → analysis → result → share.
 * Bonus layer: combo streaks, double-down rounds, lives, perfect runs.
 */
export default function BrainLeague() {
  const sound = useSound();
  const [screen, setScreen] = useState("landing");
  const [roundIdx, setRoundIdx] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [verification, setVerification] = useState("");
  const [results, setResults] = useState([]);
  const [profile, setProfile] = useState({ score: 0, total: 0, bonus: 0, perfect: false, livesLeft: MAX_LIVES, maxCombo: 0, bossHits: 0, type: null, strengths: [] });

  // This run's drawn rounds + bonus flags (reshuffled on every new run).
  const [rounds, setRounds] = useState(() => shuffle(CHALLENGES).slice(0, TOTAL_CHALLENGES));
  const [doubleIdx, setDoubleIdx] = useState(() => Math.floor(Math.random() * TOTAL_CHALLENGES));
  const [combo, setCombo] = useState(0);
  const [hearts, setHearts] = useState(MAX_LIVES);
  const [bonusPoints, setBonusPoints] = useState(0);
  const [perfect, setPerfect] = useState(false);
  const [bossHits, setBossHits] = useState(0);

  const screenRef = useRef("landing");
  screenRef.current = screen;

  useEffect(() => {
    let mounted = true;
    fetchQuizConfig().then((cfg) => {
      if (!mounted || !cfg) return;
      applyQuizConfig(cfg);
      if (cfg.bank) setRemoteBank(cfg.bank);
    });
    return () => {
      mounted = false;
    };
  }, []);

  const [, setBest] = useLocalStorage("bl.best", null);
  const [plays, setPlays] = useLocalStorage("bl.plays", 0);
  const runStartRef = useRef(Date.now());

  const go = useCallback((s) => setScreen(s), []);

  const addBonus = useCallback((n) => {
    if (n > 0) setBonusPoints((b) => b + n);
  }, []);

  const resetRun = useCallback(() => {
    setRounds(shuffle(CHALLENGES).slice(0, TOTAL_CHALLENGES));
    setDoubleIdx(Math.floor(Math.random() * TOTAL_CHALLENGES));
    setResults([]);
    setProfile({ score: 0, total: 0, bonus: 0, perfect: false, livesLeft: MAX_LIVES, maxCombo: 0, bossHits: 0, type: null, strengths: [] });
    setRoundIdx(0);
    setCombo(0);
    setHearts(MAX_LIVES);
    setBonusPoints(0);
    setPerfect(false);
    setBossHits(0);
  }, []);

  const onStart = useCallback((p) => {
    setName(p?.name || "Player");
    setEmail(p?.email || "");
    setPhone(p?.phone || "");
    setVerification(p?.verification || "");
    runStartRef.current = Date.now();
    resetRun();
    go("intro");
  }, [resetRun, go]);

  const onChallengeFinish = useCallback((result) => {
    if (screenRef.current !== "challenge") return;
    const isCorrect = Boolean(result.correct);
    const doubleHere = roundIdx === doubleIdx;
    const nextResults = [...results, result];
    const nextCombo = isCorrect ? combo + 1 : 0;
    const nextHearts = isCorrect ? hearts : Math.max(0, hearts - 1);
    const allDone = nextResults.length >= rounds.length;

    setResults(nextResults);
    setCombo(nextCombo);
    setHearts(nextHearts);

    // Bonus payouts along the way.
    if (isCorrect) {
      if (nextCombo >= COMBO_BONUS_AT) addBonus(COMBO_BONUS);
      if (doubleHere) addBonus(result.points || 0);
    }

    if (allDone) {
      setBossHits(0);
      const allCorrect = nextResults.every((r) => r.correct);
      addBonus(nextHearts * LIVES_BONUS_PER);
      if (allCorrect) {
        setPerfect(true);
        addBonus(PERFECT_BONUS);
      }
      go("boss");
      return;
    }

    // Hearts out mid-run → straight to analysis (boss skipped).
    if (!isCorrect && nextHearts <= 0) {
      go("analysis");
      return;
    }

    setRoundIdx(nextResults.length);
  }, [roundIdx, doubleIdx, results, combo, hearts, rounds, addBonus, go]);

  const onBossDone = useCallback((hits) => {
    const capped = Math.min(hits ?? 0, BOSS_HIT_CAP);
    setBossHits(capped);
    addBonus(capped * BOSS_POINT);
    go("analysis");
  }, [addBonus, go]);

  const onAnalysisDone = useCallback(() => {
    const catScores = {};
    for (const r of results) catScores[r.key] = r.points || 0;
    const type = brainTypeFor(catScores);
    const strengths = strengthsFor(catScores);
    const base = totalScore(results);
    const total = Math.min(MAX_TOTAL_SCORE, base + bonusPoints);
    const durationMs = Date.now() - runStartRef.current;
    const session = { name, email, phone, verification, score: total, base, bonus: bonusPoints, perfect, livesLeft: hearts, maxCombo: combo, bossHits, type, strengths, results, durationMs };

    setProfile({ score: base, total, bonus: bonusPoints, perfect, livesLeft: hearts, maxCombo: combo, bossHits, type, strengths });
    setBest((prev) => (prev && prev.score >= total ? prev : { name, score: total, type: type.id, at: Date.now() }));
    setPlays((p) => p + 1);
    submitResult(session); // fire-and-forget backend hook

    // Quiz completed → require a fresh login the next time this phone plays.
    localStorage.removeItem("bl.verification");
    go("result");
  }, [results, name, email, phone, verification, bonusPoints, perfect, hearts, combo, setBest, setPlays, go]);

  const playAgain = () => {
    resetRun();
    go("landing");
  };

  // Adaptive difficulty: doing well (2/2 so far) from round 3 on cranks it up.
  const nowRound = rounds[roundIdx];
  const level = nowRound && roundIdx >= 2 && results.filter((r) => r.correct).length >= 2 ? 1 : 0;
  const pointsSoFar = totalScore(results);

  return (
    <div
      className="antialiased min-h-screen"
      style={{ background: "#F5FAFF", fontFamily: `'Baloo 2', 'Segoe UI', system-ui, sans-serif` }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={screen}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.3 }}
        >
          {screen === "landing" && <LandingScreen onStart={onStart} />}
          {screen === "intro" && (
            <IntroScreen name={name} rounds={rounds} doubleIdx={doubleIdx} onDone={() => go("challenge")} />
          )}
          {screen === "challenge" && nowRound && (
            <ChallengeScreen
              key={roundIdx}
              round={nowRound}
              roundIdx={roundIdx}
              roundsTotal={TOTAL_CHALLENGES}
              level={level}
              pointsSoFar={pointsSoFar}
              combo={combo}
              hearts={hearts}
              isDouble={roundIdx === doubleIdx}
              onFinish={onChallengeFinish}
              sound={sound}
            />
          )}
          {screen === "boss" && <BossScreen onDone={onBossDone} sound={sound} />}
          {screen === "analysis" && <AnalysisScreen onDone={onAnalysisDone} />}
          {screen === "result" && (
            <ResultScreen
              name={name}
              score={profile.total}
              base={profile.score}
              bonus={profile.bonus}
              perfect={profile.perfect}
              livesLeft={profile.livesLeft}
              maxCombo={profile.maxCombo}
              type={profile.type}
              strengths={profile.strengths}
              playAgain={playAgain}
              onShare={() => go("share")}
            />
          )}
          {screen === "share" && (
            <ShareScreen
              session={{ name, score: profile.total, type: profile.type, badge: badgeFor(profile.score) }}
              playAgain={playAgain}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}