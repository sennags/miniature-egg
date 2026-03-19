## Miniature Egg

## Visão Geral

Projeto web estático de receitas de ovos, funcionando como um guia rápido e interativo para preparo. Arquitetura simples mas bem executada de SPA-like multi-page.

## Arquitetura

```
1-home/
├── pages/          # 4 páginas de receitas + home
├── css/            # style.css (global) + recipe.css (receitas)
├── js/             # script.js (UI) + timer.js (lógica do timer)
└── Icons/          # SVGs ilustrativos
```

**Ponto positivo**: Separação clara de responsabilidades - CSS/JS modulares, páginas HTML consistentes.

## Stack

- HTML5 semântico (lang="pt-BR", meta tags completas)
- CSS3 com Custom Properties para theming
- JavaScript Vanilla ES6+ (sem dependências)

## Funcionalidades Implementadas

### 1. Navegação por Cards
Grid 2x2 responsivo com hover states e feedback visual (translateY + box-shadow). Experiência tátil satisfatória.

### 2. Sistema de Temporizador
- Countdown com pausa/continua
- Presets para diferentes pontos de cozimento (ex: mole/cozido)
- Feedback visual ao completar (cor muda)
- Inicialização parseando o tempo do DOM (prático mas frágil)

### 3. Theme Toggle
- Light/Dark via CSS Custom Properties
- Persistência em localStorage
- Ícone dinâmico (◐/◑)

### 4. Navbar Oculta
- Aparece no hover via transform
- Auto-hide com debounce de 300ms
- Pattern interessante para UI minimalista

## Qualidade do Código

### Pontos Fortes
- CSS bem organizado com variáveis
- Responsivo (breakpoint em 768px)
- Acessibilidade básica (aria-label, alt texts)
- Feedback visual em todas interações

### Oportunidades de Melhoria

**1. JavaScript:**
- Timer inicializa parseando o DOM (`initialTime?.textContent`) - frágil e anti-pattern
- Sem validação robusta
- `dataset.time` assume formato sempre válido

**2. CSS:**
- Valores mágicos (box-shadow hardcoded)
- Alguma redundância em media queries
- Scrollbar styling específico de webkit (funciona, mas não cross-browser)

**3. Arquitetura:**
- Repetição de markup em todas páginas (nav, footer)
- Sem build step - could benefit from partials/template engine para manutenção

## Sugestões de Evolução

1. **Extração de componentes** - Navbar/footer como web components ou template strings
2. **Estado global** - Sistema de tema poderia usar contexto mais robusto
3. **PWA** - Adicionar service worker para offline, manifest.json
4. **Testes** - Cobertura mínima de unit tests para timer.js
5. **Perfis de cozimento customizáveis** pelo usuário

## Conclusão

Projeto limpo e funcional para seu propósito. A curva de aprendizado de front-end está evidente - usa padrões modernos de forma consistente. Bom candidato para primeiro portfólio ou projeto de estudo. A arquitetura simples facilita manutenção e extensibilidade.
