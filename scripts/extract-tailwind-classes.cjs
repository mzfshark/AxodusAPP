const fs = require('fs');
const path = require('path');

// Função para extrair classes Tailwind de um arquivo JSX
function extractTailwindClasses(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const classes = new Set();
    
    // Regex para encontrar classes Tailwind
    const classRegex = /className="([^"]*)"/g;
    let match;
    
    while ((match = classRegex.exec(content)) !== null) {
      const className = match[1];
      // Dividir por espaços para obter cada utilitário
      const utilities = className.split(' ').filter(c => c.length > 0);
      utilities.forEach(utility => classes.add(utility));
    }
    
    return Array.from(classes);
  } catch (error) {
    console.error(`Erro ao ler ou processar o arquivo ${filePath}:`, error.message);
    return [];
  }
}

// Função principal para processar todos os arquivos
function processAllJsxFiles() {
  const srcPath = path.join(__dirname, '../src');
  let allClasses = new Set();
  const jsxFiles = [];

  // 1. Listar todos os arquivos .jsx em src/
  try {
    const files = fs.readdirSync(srcPath, { withFileTypes: true });
    for (const file of files) {
      if (file.isDirectory()) {
        // Recursivamente buscar em subdiretórios
        const subFiles = fs.readdirSync(path.join(srcPath, file.name), { withFileTypes: true });
        for (const subFile of subFiles) {
          if (subFile.isFile() && subFile.name.endsWith('.jsx')) {
            jsxFiles.push(path.join(srcPath, file.name, subFile.name));
          }
        }
      } else if (file.isFile() && file.name.endsWith('.jsx')) {
        jsxFiles.push(path.join(srcPath, file.name));
      }
    }
  } catch (error) {
    console.error("Erro ao listar arquivos em src/:", error.message);
    return;
  }

  if (jsxFiles.length === 0) {
    console.log("Nenhum arquivo .jsx encontrado em src/.");
    return;
  }

  console.log(`Processando ${jsxFiles.length} arquivos JSX...`);

  // 2. Extrair classes de todos os arquivos
  jsxFiles.forEach(filePath => {
    const classes = extractTailwindClasses(filePath);
    classes.forEach(cls => allClasses.add(cls));
  });

  const uniqueClasses = Array.from(allClasses).sort().join('\n');

  // 3. Salvar o mapa de classes em CSS_CLASSES_MAP.md
  const mapPath = path.join(__dirname, '../CSS_CLASSES_MAP.md');
  const markdownContent = `# Mapa de Classes Tailwind CSS\n\nEste arquivo contém todas as classes Tailwind CSS encontradas em todos os arquivos .jsx da pasta src/.\n\n\`\`\`\n${uniqueClasses}\n\`\`\``;

  try {
    fs.writeFileSync(mapPath, markdownContent);
    console.log(`\n✅ Sucesso! ${allClasses.size} classes únicas foram extraídas e salvas em ${mapPath}`);
  } catch (error) {
    console.error("Erro ao escrever o arquivo CSS_CLASSES_MAP.md:", error.message);
  }
}

// Executar o processo
processAllJsxFiles();
