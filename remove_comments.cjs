const fs = require('fs');

const files = [
  'src/pages/Lottery.jsx',
  'src/pages/Dex.jsx',
  'src/pages/Mcps.jsx',
  'src/pages/Academy.jsx',
  'src/pages/Mining.jsx',
  'src/pages/Marketplace.jsx'
];

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  content = content.replace(/<!--[\s\S]*?-->/g, '');
  fs.writeFileSync(f, content, 'utf8');
});

console.log("Comments removed.");
