// merge-css.js
import fs from "fs";
import path from "path";

// diretório onde estão os arquivos CSS
const cssDir = path.resolve("src/styles");
const outFile = path.join(cssDir, "Global.module.css");

// lista todos os *.css no diretório, menos o arquivo de saída
const cssFiles = fs
  .readdirSync(cssDir)
  .filter(
    (f) =>
      f.endsWith(".css") &&
      f.toLowerCase() !== "global.module.css" &&
      f.toLowerCase() !== "global.css"
  )
  .sort(); // opcional: ordem alfabética

// banner para rastreabilidade
const banner =
  `/* Auto‑generated on ${new Date().toISOString()} */\n` +
  `/* Do not edit directly — edit source files instead. */\n\n`;

fs.writeFileSync(outFile, banner); // zera e escreve banner

cssFiles.forEach((file) => {
  const src = path.join(cssDir, file);
  const content = fs.readFileSync(src, "utf8");
  fs.appendFileSync(
    outFile,
    `/* ===== START ${file} ===== */\n${content.trim()}\n/* ===== END ${file} ===== */\n\n`
  );
});

console.log(`✅  Merged ${cssFiles.length} files → ${outFile}`);
