# Mapeamento Geral de Falhas na Interface (UI_MAPPING.md)

Este documento detalha os problemas de UI e integração identificados após a incorporação de arquivos estáticos `.html` no projeto React (Vite).

## 1. Falhas no Script de Conversão (`scripts/convert-html.cjs`)

*   **Truncamento Crítico de URLs em `style`:** O script usa `let [k, v] = s.split(':');` para converter as strings de estilo em objetos. Isso quebra qualquer propriedade que contenha URLs com `https://` (ex: `background-image: url('https://...')`), dividindo a URL ao meio. O resultado são erros sintáticos no React (ex: `style={{"backgroundImage":"url('https"}}`) e perda de imagens de fundo em páginas como `Marketplace.jsx`.
*   **Propriedades DOM Incompletas:** Embora o script substitua `class=` por `className=`, ele ignora atributos do DOM cruciais para o React. Atributos como `for` (deve ser `htmlFor`) e `tabindex` (deve ser `tabIndex`) não foram mapeados, o que gera avisos no console e pode causar bugs de acessibilidade/interação.
*   **Conversão Parcial de SVGs:** A conversão focou em alguns atributos específicos (ex: `stroke-linecap` para `strokeLinecap`), mas ignora o fato de que a sintaxe JSX para SVGs é estrita com camelCase, o que pode causar falhas visuais não rastreadas.

## 2. Erros de CSS e Variáveis Globais (`src/styles/Global.css`)

*   **Ausência de Fontes Globais:** As fontes principais definidas no CSS (`Inter` e `JetBrains Mono`) não estão sendo importadas (nenhum `@import url(...)` ou link no HTML foi detectado), causando renderização incorreta de tipografia baseada no sistema.
*   **Falha Severa de Ícones (Material Symbols):** A fonte `Material Symbols Outlined` não foi importada. Consequentemente, as chamadas para ícones estão sendo renderizadas como texto puro na UI (ex: o usuário enxerga a palavra "trending_up" solta na tela em vez do ícone visual correspondente).
*   **Conflito de Nomenclatura (Kebab-case vs CamelCase):** O `Global.css` define utilitários visuais usando notação CamelCase (ex: `.glassPanel`, `.kineticGradient`, `.ghostBorder`). No entanto, o conversor gerou o JSX mantendo o formato Kebab-case original do HTML (ex: `className="glass-panel"`, `className="kinetic-gradient"`). Devido a esse desencontro, componentes não adquirem seus efeitos esperados (como bordas de vidro e degradês).

## 3. Estruturação e "Frame Orientation" (`src/layouts/Layout.jsx` e Páginas)

*   **Erro Crítico de "Frame Orientation" (Corte de Layout e Overflow):** O `Layout.jsx` define o wrapper principal da aplicação com as propriedades `overflow-hidden` e `min-h-screen`, contendo dentro dele uma `div` com `<Sidebar />` e `<Outlet />`. O problema ocorre pois o `<Outlet />` não é envolvido por um container de rolagem (`overflow-y-auto` ou similar). Quando páginas extensas como `Mining.jsx` ou `Academy.jsx` carregam, seu conteúdo flui além da altura da tela (`h-screen`) e é completamente ocultado ou sobreposto, impedindo que o usuário dê scroll na página.
*   **Duplicação de Rodapés (Footer):** O script de conversão injetou todo o conteúdo retornado nas tags `<main>`, porém diversas das páginas recém-criadas possuíam uma tag `<footer>...</footer>` internamente (ex: final de `Marketplace.jsx`). Como o `Layout.jsx` global da aplicação já prevê e renderiza um `<Footer />` padrão, as páginas apresentam dois rodapés sendo renderizados um em cima/abaixo do outro.

---

## 4. Plano de Ação (Resolução)

Para estabilizar o projeto e unificar a visualização, siga o roteiro abaixo no modo `💻 Code`:

1.  **Ajuste da "Frame Orientation" no Layout principal:**
    *   Ir para `src/layouts/Layout.jsx`.
    *   No bloco `div` que contém o `<Outlet />`, garantir que o contêiner filho preencha a tela e possua rolagem. Ex: `<main className="flex-1 overflow-y-auto ..."> <Outlet /> </main>`.
2.  **Importação de Tipografia e Ícones:**
    *   Em `src/styles/Global.css` ou `index.html`, adicionar os links do Google Fonts correspondentes as famílias `Inter`, `JetBrains Mono`, e principalmente para os ícones `Material Symbols Outlined`.
3.  **Padronização de Nomenclaturas:**
    *   Modificar as páginas convertidas (`Mining.jsx`, `Academy.jsx`, `Marketplace.jsx`, etc.) corrigindo os estilos em kebab-case (`glass-panel`, `kinetic-gradient`, `glass-effect`) para baterem com as classes disponíveis no `Global.css` (`glassPanel`, `kineticGradient`, `glassEffect`).
4.  **Limpeza de Atributos e Estruturas Residuais nas Páginas JSX:**
    *   Remover os blocos literais `<footer>...</footer>` sobrantes no fundo das páginas convertidas.
    *   Corrigir o bloco `style={{...}}` quebrado no `Marketplace.jsx` (reconstruir a propriedade `backgroundImage` manualmente).
    *   (Opcional) Limpar atributos do DOM não suportados como `data-alt` desnecessários, checar os atributos `for/tabindex`.