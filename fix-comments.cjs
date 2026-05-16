const fs = require('fs');
const path = require('path');

const dir = 'src/pages';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  let original = content;
  // Replace HTML comments with JSX comments
  content = content.replace(/<!--([\s\S]*?)-->/g, '{/* $1 */}');
  
  // Also fix any unclosed br/hr/img tags that might cause issues just in case
  content = content.replace(/<br([^>]*[^/])>/gi, '<br$1 />');
  content = content.replace(/<br>/gi, '<br />');
  content = content.replace(/<hr([^>]*[^/])>/gi, '<hr$1 />');
  content = content.replace(/<hr>/gi, '<hr />');
  
  if (original !== content) {
    fs.writeFileSync(filePath, content);
    console.log('Fixed', file);
  }
});
