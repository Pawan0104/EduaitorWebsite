import { useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";

let ctx = null;
const ensure = () => {
  try {
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  } catch {
    return null;
  }
};

const tone = (freq, start, dur, vol = 0.18, type = "sine") => {
  const c = ensure();
  if (!c) return;
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, c.currentTime + start);
  g.gain.setValueAtTime(0.0001, c.currentTime + start);
  g.gain.exponentialRampToValueAtTime(vol, c.currentTime + start + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + start + dur);
  o.connect(g).connect(c.destination);
  o.start(c.currentTime + start);
  o.stop(c.currentTime + start + dur + 0.05);
};

/**
 * Tiny WebAudio beeps — no audio assets needed. Muted by default off? default ON.
 */
export function useSound() {
  const [muted, setMuted] = useLocalStorage("bl.sound", false);

  const play = useCallback(
    (name) => {
      if (muted) return;
      switch (name) {
        case "count":
          tone(660, 0, 0.15);
          break;
        case "go":
          tone(880, 0, 0.4, 0.22);
          break;
        case "tick":
          tone(520, 0, 0.07, 0.05, "triangle");
          break;
        case "correct":
          tone(660, 0, 0.12);
          tone(880, 0.12, 0.2, 0.2);
          break;
        case "wrong":
          tone(220, 0, 0.25, 0.18, "sawtooth");
          break;
        case "coin":
          tone(880, 0, 0.08);
          tone(1175, 0.09, 0.14, 0.18);
          break;
        case "win":
          tone(523, 0, 0.16);
          tone(659, 0.16, 0.16);
          tone(784, 0.32, 0.16);
          tone(1047, 0.48, 0.45, 0.22);
          break;
        default:
          break;
      }
    },
    [muted],
  );

  return { muted, toggle: () => setMuted((m) => !m), play };
}