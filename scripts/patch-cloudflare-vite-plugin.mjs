import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve("node_modules/.pnpm");
const needle = "await assertWranglerVersion();";

async function patchPluginEntry(entryPath) {
  const source = await readFile(entryPath, "utf8");
  if (!source.includes(needle)) return false;
  const patched = source.replace(
    needle,
    "/* Axodus: bypassed in-repo wrangler peer gate for offline/Vercel builds. */",
  );
  await writeFile(entryPath, patched);
  return true;
}

try {
  const entries = await readdir(root, { withFileTypes: true });
  const targets = [];

  for (const entry of entries) {
    if (!entry.isDirectory() || !entry.name.startsWith("@cloudflare+vite-plugin@")) continue;
    targets.push(path.join(root, entry.name, "node_modules/@cloudflare/vite-plugin/dist/index.mjs"));
  }

  let patchedCount = 0;
  for (const target of targets) {
    try {
      if (await patchPluginEntry(target)) patchedCount += 1;
    } catch {
      // Ignore incomplete installs and keep the script safe for Vercel.
    }
  }

  console.log(
    patchedCount > 0
      ? `[postinstall] Patched ${patchedCount} @cloudflare/vite-plugin installation(s).`
      : "[postinstall] No Cloudflare Vite plugin installation required patching.",
  );
} catch (error) {
  console.warn("[postinstall] Skipped Cloudflare Vite plugin patch:", error?.message ?? error);
}
