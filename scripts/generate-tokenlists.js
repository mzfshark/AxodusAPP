/* scripts/generate-tokenlist.js */
const fs     = require('fs');
const path   = require('path');
const axios  = require('axios');
const chainMap = require('./chainMap');

const OUTPUT_DIR = path.resolve(__dirname, '../src/assets/tokenlist');

// Palavras‑chave que identificam testnets
const TESTNET_KEYWORDS = [
  'test', 'testnet', 'goerli', 'sepolia', 'rinkeby',
  'kovan', 'ropsten', 'mumbai', 'chapel', 'devnet', 'sandbox'
];

// Slugs particulares que CoinGecko usa e fogem ao padrão do chainMap
const EXTRA_ALIASES = {
  bsc:       'binance-smart-chain',
  binancecoin: 'binance-smart-chain',
  arbitrum:  'arbitrum-one',
  arb1:      'arbitrum-one',
  matic:     'polygon',
  polygon:   'polygon',
  harmony:   'harmony'
};

// Sufixos de variação para tentativa automática
const SUFFIXES = ['', '-mainnet', '-smart-chain', '-one', '-chain', '-network'];

/* ---------- utilidades ---------- */

// true  ⇒  slug indica testnet  |  false ⇒ mainnet
const isTestnet = slug =>
  TESTNET_KEYWORDS.some(k => slug.toLowerCase().includes(k));

async function findCoinGeckoSlug(chainId, baseSlug) {
  const tried = new Set();

  const enqueue = s => {
    if (s) tried.add(s.toLowerCase().replace(/\s+/g, '-'));
  };

  enqueue(EXTRA_ALIASES[baseSlug]);
  enqueue(baseSlug);
  SUFFIXES.forEach(sfx => enqueue(`${baseSlug}${sfx}`));

  for (const slug of tried) {
    if (isTestnet(slug)) return null;                           // ignora testnets logo de cara
    const url = `https://github.com/sushiswap/list/tree/088f54740a1b82882bdcc33e311988fdc8f2c8e1/lists/token-lists/default-token-list/tokens/${slug}.json`;
    try {
      const { data } = await axios.get(url, { timeout: 10_000 });
      if (data && Array.isArray(data.tokens)) return { slug, data };
    } catch { /* segue a próxima tentativa */ }
  }
  return null;
}

/* ---------- script principal ---------- */

(async () => {
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  for (const [idStr, uniSlug] of Object.entries(chainMap)) {
    const chainId = Number(idStr);

    // pular logo se o slug uniswap já indicar testnet
    if (isTestnet(uniSlug)) {
      console.log(`🔸  Skipping testnet ${uniSlug} (${chainId})`);
      continue;
    }

    const result = await findCoinGeckoSlug(chainId, uniSlug);
    if (!result) {
      console.warn(`⚠️  Lista não encontrada ou testnet ignorada para chainId ${chainId}`);
      continue;
    }

    const { slug, data } = result;
    console.log(`✅  Mainnet ${slug} (${chainId}) localizado`);

    const tokens = data.tokens
      .filter(t => t.chainId === chainId)
      .map(t => ({
        symbol:   t.symbol,
        name:     t.name,
        address:  t.address,
        decimals: t.decimals,
        logoURI:  t.logoURI ||
          `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/${slug}/assets/${t.address}/logo.png`
      }));

    fs.writeFileSync(
      path.join(OUTPUT_DIR, `${slug}.json`),
      JSON.stringify(tokens, null, 2)
    );
    console.log(`📝  ${tokens.length} tokens gravados em ${slug}.json`);
  }
})();
