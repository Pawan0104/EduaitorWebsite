import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LandingScreen from "./screens/LandingScreen";
import IntroScreen from "./screens/IntroScreen";
import ChallengeScreen from "./screens/ChallengeScreen";
import AnalysisScreen from "./screens/AnalysisScreen";
import ResultScreen from "./screens/ResultScreen";
import ShareScreen from "./screens/ShareScreen";
import { useSound } from "./useSound";
import { useLocalStorage } from "./useLocalStorage";
import { totalScore, brainTypeFor, strengthsFor, badgeFor } from "./scoring";
import { TOTAL_CHALLENGES } from "./gameData";
import { submitResult } from "./gameApi";

const SCREENS = ["landing", "intro", "challenge", "analysis", "result", "share"];

/**
 * BRAIN LEAGUE — a 2-3 minute gamified brain challenge.
 * Screen flow: landing → intro → 5 challenges → analysis → result → share.
 */
export default function BrainLeague() {
  const sound = useSound();
  const [screen, setScreen] = useState("landing");
  const [challengeIdx, setChallengeIdx] = useState(0);
  const [name, setName] = useState("");
  const [results, setResults] = useState([]);
  const [profile, setProfile] = useState({ score: 0, type: null, strengths: [] });

  const [, setBest] = useLocalStorage("bl.best", null);
  const [plays, setPlays] = useLocalStorage("bl.plays", 0);

  const go = useCallback((s) => setScreen(s), []);

  const resetRun = () => {
    setResults([]);
    setProfile({ score: 0, type: null, strengths: [] });
    setChallengeIdx(0);
  };

  const onStart = (finalName) => {
    setName(finalName);
    resetRun();
    go("intro");
  };

  const onChallengeFinish = (result) => {
    const done = results.length + 1 >= TOTAL_CHALLENGES;
    setResults((prev) => [...prev, result]);
    if (done) {
      go("analysis");
    } else {
      setChallengeIdx(results.length + 1);
    }
  };

  const onAnalysisDone = useCallback(() => {
    const catScores = {};
    for (const r of results) catScores[r.key] = r.points || 0;
    const type = brainTypeFor(catScores);
    const strengths = strengthsFor(catScores);
    const score = totalScore(results);
    const session = { name, score, type, strengths, results };

    setProfile({ score, type, strengths });
    setBest((prev) => (prev && prev.score >= score ? prev : { name, score, type: type.id, at: Date.now() }));
    setPlays((p) => p + 1);
    submitResult(session); // future backend hook (fire-and-forget)

    go("result");
  }, [results, name, setBest, setPlays, go]);

  const playAgain = () => {
    resetRun();
    go("landing");
  };

  // Challenge chrome consumes points accumulated so far.
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
          {screen === "intro" && <IntroScreen name={name} onDone={() => go("challenge")} />}
          {screen === "challenge" && (
            <ChallengeScreen
              key={challengeIdx}
              index={challengeIdx}
              pointsSoFar={pointsSoFar}
              onFinish={onChallengeFinish}
              sound={sound}
            />
          )}
          {screen === "analysis" && <AnalysisScreen onDone={onAnalysisDone} />}
          {screen === "result" && (
            <ResultScreen
              name={name}
              score={profile.score}
              type={profile.type}
              strengths={profile.strengths}
              playAgain={playAgain}
              onShare={() => go("share")}
            />
          )}
          {screen === "share" && (
            <ShareScreen
              session={{ name, score: profile.score, type: profile.type, badge: badgeFor(profile.score) }}
              playAgain={playAgain}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}