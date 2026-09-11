import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { COLORS } from "../theme";
import { shareText, shareUrl } from "../gameApi";
import eduaitorLogo from "../../../assets/eduaitor-logo.png";

/** The exact card shown on screen, shared, and drawn to the PNG. */
export function ResultCard({ name, score, badge }) {
  return (
    <div
      className="w-full rounded-[26px] px-6 py-8 text-white relative overflow-hidden"
      style={{ background: `linear-gradient(135deg, ${badge.gradient[0]}, ${badge.gradient[1]})` }}
    >
      <div className="absolute -right-8 -top-8 w-36 h-36 rounded-full bg-white/10" />
      <div className="absolute -left-10 -bottom-10 w-44 h-44 rounded-full bg-white/10" />

      <div className="relative flex flex-col items-center text-center">
        <img src={eduaitorLogo} alt="EduAItor" className="h-11 mb-1.5" />
        <p className="text-[11px] font-extrabold tracking-[0.22em] opacity-80">BRAIN LEAGUE</p>
        <div className="text-[58px] leading-none mt-3">{badge.emoji}</div>
        <p className="text-[26px] font-extrabold mt-2 leading-tight">{name}</p>
        <div className="my-4 w-16 h-0.5 bg-white/40 rounded-full" />
        <p className="text-[13px] font-extrabold opacity-80">BRAIN SCORE</p>
        <p className="text-[64px] font-extrabold leading-none mt-1">{score}<span className="text-[22px] opacity-70">/100</span></p>
        <p className="text-[17px] font-extrabold mt-2 bg-white/20 rounded-full px-4 py-1">
          {badge.name}
        </p>
        <p className="text-[13px] font-extrabold mt-5 opacity-90">
          Can You Beat My Brain Score?
        </p>
        <p className="text-[9px] font-extrabold mt-4 tracking-[0.22em] opacity-70">
          SMARTER SCHOOLS • STRONGER STUDENTS
        </p>
      </div>
    </div>
  );
}

/** Draw the shareable card to a PNG and trigger a download. */
async function downloadCard({ name, score, badge }) {
  const canvas = document.createElement("canvas");
  canvas.width = 640;
  canvas.height = 800;
  const ctx = canvas.getContext("2d");

  const grad = ctx.createLinearGradient(0, 0, 640, 800);
  grad.addColorStop(0, badge.gradient[0]);
  grad.addColorStop(1, badge.gradient[1]);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 640, 800);

  ctx.fillStyle = "rgba(255,255,255,0.12)";
  ctx.beginPath();
  ctx.arc(560, 120, 140, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(60, 720, 170, 0, Math.PI * 2);
  ctx.fill();

  let logo = null;
  try {
    logo = new Image();
    logo.src = eduaitorLogo;
    await logo.decode();
  } catch {
    logo = null;
  }

  ctx.textAlign = "center";

  if (logo) {
    const lw = 260;
    const lh = logo.naturalHeight
      ? Math.round((logo.naturalHeight / logo.naturalWidth) * lw)
      : 80;
    ctx.drawImage(logo, 320 - lw / 2, 36, lw, lh);
    ctx.fillStyle = "rgba(255,255,255,0.9)";
    ctx.font = "600 20px 'Segoe UI', sans-serif";
    ctx.fillText("BRAIN LEAGUE", 320, 132);
  } else {
    ctx.fillStyle = "rgba(255,255,255,0.9)";
    ctx.font = "extra 800 24px 'Segoe UI', sans-serif";
    ctx.fillText("🧠 EDUAITOR · BRAIN LEAGUE", 320, 120);
  }

  ctx.font = "48px 'Segoe UI', sans-serif";
  ctx.fillText(badge.emoji, 320, 250);

  ctx.fillStyle = "#FFFFFF";
  ctx.font = "extra 700 40px 'Segoe UI', sans-serif";
  ctx.fillText(name, 320, 340);

  ctx.strokeStyle = "rgba(255,255,255,0.4)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(260, 380);
  ctx.lineTo(380, 380);
  ctx.stroke();

  ctx.fillStyle = "rgba(255,255,255,0.85)";
  ctx.font = "600 20px 'Segoe UI', sans-serif";
  ctx.fillText("BRAIN SCORE", 320, 430);

  ctx.fillStyle = "#FFFFFF";
  ctx.font = "800 108px 'Segoe UI', sans-serif";
  ctx.fillText(String(score), 320, 540);
  ctx.font = "600 22px 'Segoe UI', sans-serif";
  ctx.fillStyle = "rgba(255,255,255,0.8)";
  ctx.fillText("out of 100", 320, 580);

  ctx.fillStyle = "rgba(255,255,255,0.95)";
  ctx.font = "800 28px 'Segoe UI', sans-serif";
  ctx.fillText(`${badge.name}`, 320, 650);

  ctx.fillStyle = "rgba(255,255,255,0.95)";
  ctx.font = "700 26px 'Segoe UI', sans-serif";
  ctx.fillText("Can You Beat My Brain Score?", 320, 720);

  ctx.fillStyle = "rgba(255,255,255,0.75)";
  ctx.font = "800 18px 'Segoe UI', sans-serif";
  ctx.fillText("Smarter Schools. Stronger Students. — EduAItor", 320, 768);

  const a = document.createElement("a");
  a.download = `brain-league-${name.replace(/\s+/g, "-") || "player"}.png`;
  a.href = canvas.toDataURL("image/png");
  a.click();
}

export default function ShareScreen({ session, playAgain }) {
  const { name, score, badge } = session;
  const text = shareText(session);
  const url = shareUrl();

  const onWhatsApp = () => window.open(`https://wa.me/?text=${encodeURIComponent(text + "\n\n" + url)}`, "_blank");
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(text + "\n\n" + url);
      toast.success("Copied — paste it anywhere!");
    } catch {
      toast.error("Copy failed — select the card below instead.");
    }
  };

  const onInstagram = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: "Brain League", text, url });
        return;
      } catch { /* user cancelled */ }
    }
    await onCopy();
    toast.info("Instagram needs the image — I saved your card for you!");
    await downloadCard(session);
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-5 py-8"
      style={{ background: `linear-gradient(180deg, #F5FAFF 0%, #EAF4FF 100%)` }}
    >
      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-[24px] font-extrabold text-center"
        style={{ color: COLORS.ink }}
      >
        Show off your brain! 🎉
      </motion.h2>
      <p className="text-[12.5px] font-bold mb-6 text-center" style={{ color: "#7BA6CE" }}>
        Challenge your friends to beat your score.
      </p>

      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 160, damping: 16 }}
        className="w-full max-w-sm"
      >
        <ResultCard name={name} score={score} badge={badge} />
      </motion.div>

      <div className="w-full max-w-sm mt-6 flex flex-col gap-2.5">
        <ShareButton color="#25D366" onClick={onWhatsApp}>Share on WhatsApp</ShareButton>
        <ShareButton color="linear-gradient(135deg,#FEDA75,#FA7E1E,#D62976,#962FBF,#4F5BD5)" onClick={onInstagram}>
          Share on Instagram
        </ShareButton>
        <ShareButton color={COLORS.blue} onClick={onCopy}>Copy Link</ShareButton>
        <button
          onClick={() => { downloadCard(session); toast.success("Card downloaded 📸"); }}
          className="rounded-2xl py-3 text-[14px] font-extrabold"
          style={{ background: COLORS.card, color: COLORS.secondary, border: "3px solid #FFE9B8" }}
        >
          Download My Card 📸
        </button>
      </div>

      <button
        onClick={playAgain}
        className="w-full max-w-sm mt-6 text-[14px] font-extrabold underline underline-offset-4"
        style={{ color: "#7BA6CE" }}
      >
        Play again — beat your own score 🔁
      </button>
    </div>
  );
}

function ShareButton({ color, onClick, children }) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="rounded-2xl py-3.5 text-[15px] font-extrabold text-white shadow-lg"
      style={{ background: color, boxShadow: "0 8px 20px rgba(0,0,0,0.15)" }}
    >
      {children}
    </motion.button>
  );
}