const fs = require('fs');
const path = require('path');

const cssFiles = ['src/styles/Global.css', 'src/styles/overview.css'];
const targetFiles = [
  'src/pages/Marketplace.jsx',
  'src/pages/Mining.jsx',
  'src/pages/Academy.jsx',
  'src/pages/Dex.jsx',
  'src/pages/Lottery.jsx',
  'src/pages/Mcps.jsx'
];

let camelCaseClasses = new Set();

// Read CSS files and extract classes
cssFiles.forEach(file => {
  const content = fs.readFileSync(path.join(__dirname, file), 'utf8');
  // Match class definitions like .className { or .className:hover etc.
  const regex = /\.([a-zA-Z0-9_-]+)/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    camelCaseClasses.add(match[1]);
  }
});

// Create mapping from kebab-case to camelCase based on found classes
const kebabToCamel = {};
camelCaseClasses.forEach(cls => {
  if (/[A-Z]/.test(cls)) {
    // Has uppercase, it's camelCase
    // e.g. glassPanel -> glass-panel
    // Also handle possible btnPrimary -> btn-primary
    const kebab = cls.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
    if (kebab !== cls) {
      kebabToCamel[kebab] = cls;
    }
  }
});

// There might be some edge cases like `action-button` to `actionButton`.
// Let's print out the mapping to be sure
console.log('Class mapping based on CSS files:');
console.log(JSON.stringify(kebabToCamel, null, 2));

// Additional known manual mappings from user description:
// glass-panel -> glassPanel, stat-card -> statCard, btn-primary -> btnPrimary, nav-item -> navItem
// We'll merge them in case they weren't matched via regex.
const manualMappings = {
  'glass-panel': 'glassPanel',
  'stat-card': 'statCard',
  'btn-primary': 'btnPrimary',
  'nav-item': 'navItem'
};
Object.assign(kebabToCamel, manualMappings);

// Now process the target files
targetFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filePath}`);
    return;
  }
  let content = fs.readFileSync(filePath, 'utf8');
  
  Object.keys(kebabToCamel).forEach(kebab => {
    const camel = kebabToCamel[kebab];
    // We want to replace it only within className="" or className={``}
    // But replacing globally if it matches whole words is usually safe for class names.
    // Let's use lookarounds: not preceded by a letter/number/hyphen, not followed by a letter/number/hyphen
    const regex = new RegExp(`(?<![a-zA-Z0-9_-])${kebab}(?![a-zA-Z0-9_-])`, 'g');
    content = content.replace(regex, camel);
  });

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${file}`);
});
