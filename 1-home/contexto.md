# Miniature Egg

## Visão Geral

Guia interativo para preparo de ovos, redesenhado com estética moderna e sofisticada. Site estático multi-page com foco em experiência visual, animações suaves e usabilidade intuitiva.

## Arquitetura

```
1-home/
├── pages/          # 5 páginas (home + 4 receitas)
├── css/
│   ├── style.css    # Estilos globais, tema, componentes
│   └── recipe.css   # Layout específico de receitas
├── js/
│   ├── script.js    # Theme toggle (IIFE pattern)
│   └── timer.js     # Sistema de temporizador
├── Icons/           # SVGs ilustrativos
└── contexto.md      # Este arquivo
```

## Stack

- HTML5 semântico com scripts inline anti-flash
- CSS3 com Custom Properties (design system completo)
- JavaScript Vanilla ES6+ em IIFE pattern
- Google Fonts: DM Sans + Playfair Display

## Design System

### Paleta de Cores

| Token | Light Mode | Dark Mode |
|-------|------------|----------|
| Primary | `#F4A024` | `#F4A024` |
| Background | `#FFFBF5` | `#1A1816` |
| Card | `#FFFFFF` | `#2D2A26` |
| Text | `#2D2A26` | `#FFF8F0` |
| Border | `#F0E6DB` | `#3D3A36` |

### Tipografia
- **Display**: Playfair Display (títulos, hero)
- **Body**: DM Sans (interface, corpo de texto)

### Espaciamento
- Container máximo: 1200px
- Padding lateral: 2rem (mobile: 1rem)
- Border radius: 24px (cards), 100px (botões pill)

## Funcionalidades

### 1. Theme Toggle
- Light/Dark via CSS Custom Properties
- Persistência em localStorage
- Script inline anti-flash no `<head>`
- Ícones: ☀ (sol com rotação no hover) / ☾ (lua sem animação)

### 2. Navegação
- Navbar fixa com glassmorphism (`backdrop-filter: blur(20px)`)
- Links com underline animado no hover
- Botão de voltar nas páginas de receita

### 3. Cards de Receitas
- Grid responsivo auto-fit (min 280px)
- Hover: translateY(-8px) + shadow + gradiente top bar
- Ícone com scale + rotate no hover
- Meta info com seta animada

### 4. Sistema de Temporizador
- Estados visuais: Iniciar → Pausar → Continuar → Reiniciar
- Presets para diferentes pontos de cozimento
- Animações: pulse durante execução, celebrate ao completar
- Dados via `data-default` (melhor que parsing de DOM)

### 5. Animações
- Hero: fadeInUp/Down staggered
- Egg flutuante (float 3s infinite)
- Scroll reveal implícito via CSS

## Páginas

| Página | Descrição | Timer |
|--------|-----------|-------|
| home.html | Landing com cards de navegação | - |
| ovo-frito.html | Ovo frito clássico | 3min |
| ovo-cozido.html | Mole (6min) / Cozido (10min) | Presets |
| omelete.html | Omelete básica | 5min |
| ovo-mexido.html | Ovo mexido cremoso | 3min |

## Qualidade do Código

### Pontos Fortes
- Arquitetura CSS com variáveis bem organizadas
- Responsivo com clamp() e media queries
- IIFE pattern em JavaScript (escopo isolado)
- Acessibilidade: aria-label, alt texts, focus states
- Performance: fonts com display=swap, SVGs inline
- Anti-flash theme com script inline

### Oportunidades de Melhoria

**CSS:**
- Sem CSS variables para valores repetidos (gap, padding inline)
- Ausência de scroll-snap para carousel
- Transições könnten komplexer sein (staggered delays)

**JavaScript:**
- Sem validação de input no timer
- Não há sound notification ao completar timer
- podríabeneficiarse de requestAnimationFrame para animações

**Arquitetura:**
- Repetição de nav/footer em todas páginas
- Sem build step (Vite/Webpack)
- Sem linting (ESLint, Stylelint)
- Testes e2e könnten hilfreich sein

## Roadmap Sugerido

1. **PWA** - Service worker + manifest para offline
2. **Sound** - Notificação sonora ao completar timer
3. **SSR/SSG** - Astro ou 11ty para zero JS inicial
4. **Testes** - Playwright para e2e, Vitest para timer logic
5. **Accessibility** - WCAG 2.1 AA audit
6. **i18n** - Suporte a múltiplos idiomas

## Conclusão

Projeto bem executado com design system consistente e animações polidas. O redesign moderno elevou significativamente a qualidade visual. Pronto para uso em produção com pequenas melhorias de acessibilidade e performance.
