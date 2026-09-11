import { cp, rm, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const src = join(here, "..", "dist");
const dst = join(
  here,
  "..",
  "..",
  "..",
  "EduAitor-Website",
  "Eduaitor",
  "public",
  "brain-league",
);

await rm(dst, { recursive: true, force: true });
await mkdir(dst, { recursive: true });
await cp(src, dst, { recursive: true });
console.log(`[brain-league] copied dist → marketing site public: ${dst}`);