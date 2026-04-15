const fs = require('fs');
const path = require('path');

const filesToConvert = [
    { src: 'public/mining.html', dest: 'src/pages/Mining.jsx', name: 'Mining' },
    { src: 'public/marketplace.html', dest: 'src/pages/Marketplace.jsx', name: 'Marketplace' },
    { src: 'public/academy.html', dest: 'src/pages/Academy.jsx', name: 'Academy' },
    { src: 'public/dex.html', dest: 'src/pages/Dex.jsx', name: 'Dex' },
    { src: 'public/lottery.html', dest: 'src/pages/Lottery.jsx', name: 'Lottery' },
    { src: 'public/mcps.html', dest: 'src/pages/Mcps.jsx', name: 'Mcps' }
];

for (const file of filesToConvert) {
    if (!fs.existsSync(file.src)) {
        console.log(`Skipping ${file.src}, not found.`);
        continue;
    }
    
    let content = fs.readFileSync(file.src, 'utf8');
    
    // Extract everything between <main...> and </main>
    const mainMatch = content.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
    if (!mainMatch) {
        console.log(`No <main> tag found in ${file.src}`);
        continue;
    }
    
    let mainContent = mainMatch[1];
    
    // Convert class= to className= and handle other common JSX issues
    // Just a basic find-replace for class=
    mainContent = mainContent.replace(/class=/g, 'className=');
    // Also inline styles might need conversion but looking at the HTML, it's mostly classes.
    // Close some unclosed tags like img, input, hr, br
    mainContent = mainContent.replace(/<img([^>]+)(?<!\/)>/g, '<img$1 />');
    mainContent = mainContent.replace(/<input([^>]+)(?<!\/)>/g, '<input$1 />');
    // convert style="stop-color:#c0c1ff;stop-opacity:1" to style={{stopColor: '#c0c1ff', stopOpacity: 1}}
    // But since it's an SVG inside mining.html, we can just replace known SVGs or do a regex.
    // For simplicity, let's replace stroke-linecap with strokeLinecap etc if present.
    mainContent = mainContent.replace(/stroke-linecap/g, 'strokeLinecap');
    mainContent = mainContent.replace(/stroke-width/g, 'strokeWidth');
    mainContent = mainContent.replace(/stroke-dasharray/g, 'strokeDasharray');
    mainContent = mainContent.replace(/stroke-dashoffset/g, 'strokeDashoffset');
    mainContent = mainContent.replace(/viewbox/g, 'viewBox');
    mainContent = mainContent.replace(/preserveaspectratio/g, 'preserveAspectRatio');
    mainContent = mainContent.replace(/lineargradient/g, 'linearGradient');
    mainContent = mainContent.replace(/stop-color/g, 'stopColor');
    mainContent = mainContent.replace(/stop-opacity/g, 'stopOpacity');

    // Fix style="font-variation-settings: 'FILL' 1;"
    mainContent = mainContent.replace(/style="([^"]+)"/g, (match, p1) => {
        let styleObj = {};
        p1.split(';').forEach(s => {
            if (!s.trim()) return;
            let [k, v] = s.split(':');
            if (k && v) {
                // to camelCase
                let camelK = k.trim().replace(/-([a-z])/g, (g) => g[1].toUpperCase());
                styleObj[camelK] = v.trim();
            }
        });
        return `style={${JSON.stringify(styleObj)}}`;
    });

    const jsxContent = `import React from 'react';

const ${file.name} = () => {
  return (
    <>
      ${mainContent}
    </>
  );
};

export default ${file.name};
`;

    fs.writeFileSync(file.dest, jsxContent);
    console.log(`Created ${file.dest}`);
}
