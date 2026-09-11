import { useCallback, useEffect, useRef, useState } from "react";

/** Persistent localStorage-backed state (future-proof: swap for server sync later). */
export function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const raw = window.localStorage.getItem(key);
      return raw !== null ? JSON.parse(raw) : initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* storage full / private mode — ignore */
    }
  }, [key, value]);

  return [value, setValue];
}

/** Animated count-up for stats (players, score, time). */
export function useCountUp(target, duration = 1400) {
  const [value, setValue] = useState(0);
  const raf = useRef();

  useEffect(() => {
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [target, duration]);

  return value;
}

/** Toggle a value that is always kept true/false in storage. */
export function useStoredFlag(key, initial = true) {
  const [value, setValue] = useLocalStorage(key, initial);
  const toggle = useCallback(() => setValue((v) => !v), [setValue]);
  return [value, toggle];
}