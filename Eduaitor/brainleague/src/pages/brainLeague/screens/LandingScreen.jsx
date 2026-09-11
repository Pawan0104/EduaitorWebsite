import { useState } from "react";
import { motion } from "framer-motion";
import { COLORS } from "../theme";
import { LANDING_STATS, TOTAL_CHALLENGES } from "../gameData";
import { useCountUp, useLocalStorage } from "../useLocalStorage";

const fmtAvg = (seconds) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${s}s`;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const normalizePhone = (value) => value.replace(/[\s\-()]/g, "");

const isPhoneValid = (value) => {
  const v = normalizePhone(value);
  const digits = v.replace(/^\+?91/, "").replace(/\D/g, "");
  return digits.length === 10;
};

function Field({ label, value, onChange, error, placeholder, type = "text", maxLength = 24 }) {
  return (
    <div>
      <label className="text-[12px] font-extrabold mb-1.5 block" style={{ color: COLORS.ink }}>
        {label}
      </label>
      <input
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        placeholder={placeholder}
        type={type}
        autoComplete="off"
        className="w-full rounded-2xl border-2 px-4 py-3 text-[15px] font-bold outline-none focus:ring-4"
        style={{
          borderColor: error ? "#E5484D" : "#DCEBFF",
          background: COLORS.card,
          color: COLORS.ink,
          boxShadow: "0 4px 14px rgba(45,156,255,0.08)",
        }}
      />
      {error && <p className="text-[11px] font-bold mt-1" style={{ color: "#E5484D" }}>{error}</p>}
    </div>
  );
}

export default function LandingScreen({ onStart }) {
  const [stored, setStored] = useLocalStorage("bl.profile", { name: "", email: "", phone: "" });
  const [name, setName] = useState(stored.name || "");
  const [email, setEmail] = useState(stored.email || "");
  const [phone, setPhone] = useState(stored.phone || "");
  const [errors, setErrors] = useState({});
  const [tapped, setTapped] = useState(false);

  const start = () => {
    if (tapped) return;
    const nextErrors = {};
    if (!name.trim()) nextErrors.name = "Please enter your name.";
    if (!email.trim()) nextErrors.email = "Please enter your email address.";
    else if (!EMAIL_RE.test(email.trim())) nextErrors.email = "Enter a valid email address.";
    if (!phone.trim()) nextErrors.phone = "Please enter your phone number.";
    else if (!isPhoneValid(phone.trim())) nextErrors.phone = "Enter a valid 10-digit phone number.";
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }
    setTapped(true);
    const profile = { name: name.trim(), email: email.trim(), phone: normalizePhone(phone.trim()) };
    setStored(profile);
    onStart(profile);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-5 py-10 relative overflow-hidden"
      style={{ background: `linear-gradient(180deg, #F5FAFF 0%, #EAF4FF 100%)` }}
    >
      {/* floating decorations */}
      {["🧠", "🎯", "⚡", "🏆", "⭐", "🎖️"].map((e, i) => (
        <motion.span
          key={i}
          className="absolute select-none opacity-20 text-4xl"
          initial={{ y: 0 }}
          animate={{ y: [0, -18, 0] }}
          transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut" }}
          style={{ top: `${8 + i * 13}%`, left: `${6 + i * 15}%` }}
        >
          {e}
        </motion.span>
      ))}

      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1, rotate: [0, -6, 6, 0] }}
        transition={{ duration: 0.8, rotate: { repeat: Infinity, duration: 2.4, delay: 0.8 } }}
        className="text-[92px] leading-none select-none"
      >
        🧠
      </motion.div>

      <motion.h1
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="font-extrabold tracking-tight text-center leading-none mt-2"
        style={{ fontSize: "clamp(44px, 10vw, 84px)", color: COLORS.ink, letterSpacing: "-2px" }}
      >
        BRAIN{" "}
        <span
          style={{
            background: `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.secondary})`,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          LEAGUE
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-3 flex flex-wrap justify-center gap-2 text-[14px] font-extrabold text-white"
      >
        <span className="px-3 py-1 rounded-full" style={{ background: COLORS.blue }}>{TOTAL_CHALLENGES} Challenges</span>
        <span className="px-3 py-1 rounded-full" style={{ background: COLORS.secondary }}>3 Minutes</span>
        <span className="px-3 py-1 rounded-full" style={{ background: COLORS.primary, color: COLORS.ink }}>1 Brain Score</span>
      </motion.p>

      {/* stats */}
      <div className="grid grid-cols-3 gap-3 w-full max-w-md mt-8">
        {LANDING_STATS.map((s, i) => (
          <StatItem key={s.label} stat={s} delay={0.4 + i * 0.12} />
        ))}
      </div>

      {/* player details */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.75 }}
        className="w-full max-w-md mt-8 flex flex-col gap-4"
      >
        <Field
          label="What's your name?"
          value={name}
          onChange={(e) => { setName(e.target.value); if (errors.name) setErrors((p) => ({ ...p, name: "" })); }}
          error={errors.name}
          placeholder="Enter your name…"
          maxLength={24}
        />
        <Field
          label="Email address"
          value={email}
          onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors((p) => ({ ...p, email: "" })); }}
          error={errors.email}
          placeholder="you@example.com"
          type="email"
          maxLength={80}
        />
        <Field
          label="Phone number (10 digits)"
          value={phone}
          onChange={(e) => { setPhone(e.target.value); if (errors.phone) setErrors((p) => ({ ...p, phone: "" })); }}
          error={errors.phone}
          placeholder="98765 43210"
          type="tel"
          maxLength={14}
        />
      </motion.div>

      <motion.button
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.9 }}
        whileTap={{ scale: 0.95 }}
        onClick={start}
        className="w-full max-w-md mt-6 rounded-[22px] py-4.5 text-lg font-extrabold text-white shadow-xl active:scale-95 transition-transform"
        style={{
          background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary})`,
          boxShadow: `0 12px 26px rgba(255,138,0,0.35)`,
        }}
      >
        START CHALLENGE ⚡
      </motion.button>

      <p className="mt-6 text-[11px] font-bold" style={{ color: "#9DB8D9" }}>
        Made for sharp minds · ages 10–18
      </p>
    </div>
  );
}

function StatItem({ stat, delay }) {
  const value = useCountUp(stat.value);
  const display = stat.icon === "⚡" ? fmtAvg(value) : `${value}${stat.suffix}`;
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="rounded-2xl py-3 px-2 text-center"
      style={{ background: COLORS.card, boxShadow: "0 4px 14px rgba(45,156,255,0.1)" }}
    >
      <div className="text-xl">{stat.icon}</div>
      <div className="text-lg font-extrabold" style={{ color: COLORS.ink }}>
        {display}
      </div>
      <div className="text-[10.5px] font-bold uppercase" style={{ color: "#9DB8D9" }}>
        {stat.label}
      </div>
    </motion.div>
  );
}