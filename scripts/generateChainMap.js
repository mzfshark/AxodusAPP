/**
 * scripts/generateChainMap.js
 *
 * 1. Baixa https://chainlist.org/rpcs.json
 * 2. Extrai chainId  ↔  shortName
 * 3. Salva em scripts/chainMap.js (CommonJS)
 */

const fs    = require('fs');
const path  = require('path');
const axios = require('axios');

const OUTPUT_FILE   = path.resolve(__dirname, 'chainMap.js');
const CHAINLIST_URL = 'https://chainlist.org/rpcs.json';

(async () => {
  try {
    const { data } = await axios.get(CHAINLIST_URL, { timeout: 15_000 });

    if (!Array.isArray(data)) {
      throw new Error('Formato inesperado: esperado array de objetos.');
    }

    /** @type {Record<number,string>} */
    const chainMap = {};

    data.forEach(({ chainId, shortName }) => {
      if (!chainId || !shortName) return;              // campos obrigatórios

      // Remove espaços, força minúsculas → slug “oficial”
      const slug = shortName.toLowerCase().trim().replace(/\s+/g, '');

      // Evita sobrescrever se já houver entrada (várias RPCs p/ mesmo chainId)
      if (!chainMap[chainId]) {
        chainMap[chainId] = slug;
        console.log(`✅  ${slug} → chainId ${chainId}`);
      }
    });

    const fileContent =
      `// Gerado automaticamente a partir de ${CHAINLIST_URL}\n\n` +
      `module.exports = ${JSON.stringify(chainMap, null, 2)};\n`;

    fs.writeFileSync(OUTPUT_FILE, fileContent);
    console.log(`\n📝  chainMap.js salvo em ${OUTPUT_FILE}`);
  } catch (err) {
    console.error(`❌  Erro: ${err.message}`);
  }
})();
