const fs = require('fs');

let html = fs.readFileSync('public/tradingbots.html', 'utf8');

// Extract main content
const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
if (!mainMatch) {
  console.log("No main found");
  process.exit(1);
}

let content = mainMatch[1];

// Convert class to className
content = content.replace(/class=/g, 'className=');

// Fix comments
content = content.replace(/<!--([\s\S]*?)-->/g, '{/* $1 */}');

// Self close img tags
content = content.replace(/<img([^>]*[^/])>/g, '<img$1 />');

// Self close input tags
content = content.replace(/<input([^>]*[^/])>/g, '<input$1 />');

// Fix SVG attributes
content = content.replace(/stroke-width/g, 'strokeWidth');
content = content.replace(/stroke-linecap/g, 'strokeLinecap');
content = content.replace(/stroke-linejoin/g, 'strokeLinejoin');
content = content.replace(/fill-rule/g, 'fillRule');
content = content.replace(/clip-rule/g, 'clipRule');

// convert style string to objects (basic)
content = content.replace(/style="([^"]*)"/g, (match, p1) => {
  // basic conversion, specific to this file: style="width: 65%" => style={{ width: '65%' }}
  if (p1.includes('width: 65%')) return "style={{ width: '65%' }}";
  if (p1.includes('font-variation-settings:')) return "style={{ fontVariationSettings: '\\'FILL\\' 1' }}";
  return match;
});


const jsx = `import React from 'react';

export default function BotManagement() {
  return (
    <>
      ${content}
    </>
  );
}
`;

fs.writeFileSync('src/pages/trading/BotManagement.jsx', jsx);
console.log("Converted BotManagement.jsx");
