const fs = require('fs');

const files = [
    'src/pages/Marketplace.jsx',
    'src/pages/Mining.jsx',
    'src/pages/Academy.jsx',
    'src/pages/Dex.jsx',
    'src/pages/Lottery.jsx',
    'src/pages/Mcps.jsx'
];

const svgAttributes = [
    'stroke-width', 'fill-rule', 'clip-rule', 'stroke-linecap', 'stroke-linejoin',
    'stroke-miterlimit', 'fill-opacity', 'stroke-opacity', 'stop-color', 'stop-opacity',
    'xml:space', 'xmlns:xlink'
];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // 1. class -> className
    content = content.replace(/\bclass="/g, 'className="');
    content = content.replace(/\bclass='/g, "className='");

    // Fix for= -> htmlFor=
    content = content.replace(/\bfor="/g, 'htmlFor="');
    content = content.replace(/\bfor='/g, "htmlFor='");

    // Fix tabindex -> tabIndex
    content = content.replace(/\btabindex=/g, 'tabIndex=');

    // Fix autocomplete -> autoComplete
    content = content.replace(/\bautocomplete=/g, 'autoComplete=');
    
    // Fix spellcheck -> spellCheck
    content = content.replace(/\bspellcheck=/g, 'spellCheck=');

    // Fix maxlength -> maxLength
    content = content.replace(/\bmaxlength=/g, 'maxLength=');

    // Fix readonly -> readOnly
    content = content.replace(/\breadonly\b/g, 'readOnly');
    content = content.replace(/\breadOnly=""/g, 'readOnly'); // React doesn't like readOnly=""

    // Fix autofocus -> autoFocus
    content = content.replace(/\bautofocus\b/g, 'autoFocus');

    // Fix datetime -> dateTime
    content = content.replace(/\bdatetime=/g, 'dateTime=');
    
    // 2. SVG attributes
    svgAttributes.forEach(attr => {
        const camelCase = attr.replace(/[-:](\w)/g, (_, c) => c.toUpperCase());
        // Match attribute name only if preceded by space
        const regex = new RegExp(`\\b${attr}=`, 'g');
        content = content.replace(regex, `${camelCase}=`);
    });

    // Fix viewBox and other specific camelCase SVG/HTML attributes
    content = content.replace(/\bviewbox=/g, 'viewBox=');
    content = content.replace(/\bpreserveaspectratio=/g, 'preserveAspectRatio=');
    content = content.replace(/\bbaseprofile=/g, 'baseProfile=');
    content = content.replace(/\bcontentscripttype=/g, 'contentScriptType=');
    content = content.replace(/\bcontentstyletype=/g, 'contentStyleType=');

    // 3. style="string" to style={{...}}
    content = content.replace(/\bstyle="([^"]*)"/g, (match, styles) => {
        if (!styles.trim()) return `style={{}}`;
        const styleObj = {};
        styles.split(';').forEach(style => {
            const parts = style.split(':');
            if (parts.length === 2) {
                let key = parts[0].trim().replace(/-(\w)/g, (_, c) => c.toUpperCase());
                let value = parts[1].trim();
                styleObj[key] = value;
            }
        });
        return `style={${JSON.stringify(styleObj)}}`;
    });

    // 4. Broken URLs
    content = content.replace(/https:\/\s*\//g, 'https://');
    content = content.replace(/http:\/\s*\//g, 'http://');

    // Remove empty classNames that might cause issues or just look ugly
    // content = content.replace(/className=""/g, '');

    // Fix inline comments if any HTML ones leaked: <!-- comment -->
    content = content.replace(/<!--([\s\S]*?)-->/g, '{/* $1 */}');

    // 5. Remove loose <footer> ... </footer>
    // We should be careful to only remove the main footer at the bottom if possible, or any footer tags.
    // The instructions say: "Remova qualquer tag literais <footer> ... </footer> que estejam soltas no fundo dessas páginas"
    content = content.replace(/<footer\b[^>]*>[\s\S]*?<\/footer>/gi, '');

    fs.writeFileSync(file, content, 'utf8');
    console.log(`Processed ${file}`);
});
