# Mapa de Classes CSS Customizadas - Axodus

## 📋 Classes Disponíveis por Categoria

### Glass & Transparency Effects
- `.glass-panel` - Painel com blur 20px
- `.glass-card` - Card com blur moderado
- `.glass-effect` - Efeito glass genérico
- `.glassPanel` - Alias para glass-panel
- `.glassCard` - Alias para glass-card
- `.glassEffect` - Alias para glass-effect

### Borders & Ghost
- `.ghost-border` - Borda sutil com opacity
- `.ghostBorder` - Alias para ghost-border

### Gradients
- `.hero-gradient` - Gradiente primário → primary-container
- `.kinetic-gradient` - Alias para hero-gradient
- `.kineticGradient` - Camel case alias
- `.gradient-text` - Texto com gradiente
- `.gradientText` - Alias
- `.gradient-bg` - Background com gradiente
- `.gradientBg` - Alias

### Glow Effects
- `.glow-secondary` - Glow em cor secundária
- `.glowSecondary` - Alias
- `.glow-error` - Glow em cor de erro
- `.glowError` - Alias
- `.glow-primary` - Glow em cor primária

### Typography
- `.mono` - Fonte monospace
- `.mono-text` - Monospace + tamanho XS

### Spacing Scale
#### Margins
- `.m-xs`, `.m-sm`, `.m-base`, `.m-lg`, `.m-xl`, `.m-2xl`

#### Padding
- `.p-xs`, `.p-sm`, `.p-base`, `.p-lg`, `.p-xl`, `.p-2xl`

#### Gaps
- `.gap-xs`, `.gap-sm`, `.gap-base`, `.gap-lg`, `.gap-xl`, `.gap-2xl`

### Containers
- `.container-sm` - max-width: 24rem
- `.container-md` - max-width: 28rem
- `.container-lg` - max-width: 32rem
- `.container-xl` - max-width: 36rem
- `.container-2xl` - max-width: 42rem
- `.container-full` - max-width: 100%

### Borders
- `.border-xs` - border: 0
- `.border-sm` - border: 1px
- `.border-md` - border: 2px
- `.border-lg` - border: 4px

### Shadows
- `.shadow-glass` - shadow + backdrop-blur
- `.shadow-glass-md` - Medium glass shadow
- `.shadow-glass-lg` - Large glass shadow

### Rounded Corners
- `.rounded-xs`, `.rounded-sm`, `.rounded-md`, `.rounded-lg`, `.rounded-xl`, `.rounded-full`

### Components
#### Cards
- `.card` - Card base
- `.card-sm` - Small card
- `.card-lg` - Large card

#### Buttons
- `.btn` - Button base
- `.btn-sm` - Small button
- `.btn-lg` - Large button

#### Inputs
- `.input` - Input base
- `.input-sm` - Small input
- `.input-lg` - Large input

### Responsive
- `.responsive-p` - Padding responsivo
- `.responsive-m` - Margin responsivo
- `.responsive-gap` - Gap responsivo

### Animations
- `.animate-slide-in-top` - Slide de cima
- `.animate-slide-in-left` - Slide da esquerda
- `.animate-fade-in` - Fade in

### Scrollbars
- `.no-scrollbar` - Hide scrollbar
- `.custom-scrollbar` - Custom styled scrollbar
- `.scrollbar-hide` - Alias para no-scrollbar

### Dashboard
- `.dashboard-container` - Container principal
- `.dashboard-section` - Section dentro do container

### Axodus Branding
#### Text
- `.text-axodus-primary` - Cor primária Axodus
- `.text-axodus-secondary` - Cor secundária
- `.text-axodus-tertiary` - Cor terciária

#### Background
- `.bg-axodus-primary`, `.bg-axodus-secondary`, `.bg-axodus-tertiary`

#### Borders
- `.border-axodus-primary`, `.border-axodus-secondary`, `.border-axodus-tertiary`

#### Shadows
- `.shadow-axodus` - Sombra com cor primária
- `.shadow-axodus-lg` - Sombra maior

---

## ✅ Compatibilidade

Todas as classes estão 100% definidas em `/src/styles/tailwindcss.css` que é importado por `Global.css`.

As páginas podem usar:
1. **Classes Tailwind padrão** - ex: `flex`, `grid`, `text-lg`, `bg-surface-container`
2. **Classes customizadas acima** - ex: `glass-card`, `hero-gradient`
3. **Variáveis CSS do tema** - ex: `var(--axodus-bg)`, `var(--axodus-text)`

---

## 🚀 Uso

```jsx
// Glass card com ghost border
<div className="glass-card ghost-border rounded-2xl p-6">
  Content
</div>

// Botão com gradiente
<button className="hero-gradient text-on-primary px-6 py-2 rounded-xl">
  Action
</button>

// Texto com glow
<h2 className="text-on-surface glowSecondary">
  Título
</h2>

// Container responsivo
<div className="container-xl responsive-p">
  Conteúdo
</div>
```
