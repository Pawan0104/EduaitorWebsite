import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

function normalizeBase(base) {
  const raw = String(base || "/").trim() || "/";
  if (raw === "./" || raw === ".") return "./";
  let b = raw.startsWith("/") ? raw : `/${raw}`;
  if (!b.endsWith("/")) b = `${b}/`;
  return b === "//" ? "/" : b;
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const base = normalizeBase(env.VITE_BASE || "/");

  return {
    base,
    plugins: [react(), tailwindcss()],
  };
});
