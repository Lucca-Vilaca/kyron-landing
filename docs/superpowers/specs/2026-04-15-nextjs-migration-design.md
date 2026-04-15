# Migração da landing Kyron para Next.js + TypeScript + Tailwind

**Data:** 2026-04-15
**Autor:** Lucca Vilaça (via brainstorm com Claude)
**Status:** Design aprovado — aguardando plano de implementação

---

## 1. Objetivo

Migrar a landing page estática do Kyron (atualmente HTML + CSS + JS puro) para uma stack Next.js + TypeScript + Tailwind, aproveitando a migração para:

1. Aplicar uma nova identidade visual ("Editorial Manifesto")
2. Redesenhar a hero com layout asymmetric giant usando mockups reais do iPhone
3. Reestruturar as seções (de 10 para 8), cortando redundâncias

A migração preserva o deploy no GitHub Pages em `<usuario>.github.io/kyron-landing` e o comportamento atual do formulário de waitlist (abre email via `mailto:`).

## 2. Stack e decisões técnicas

### 2.1 Stack

- **Next.js 16** (App Router) com `output: 'export'` — site 100% estático
- **TypeScript** em modo strict
- **Tailwind CSS v4** (nova arquitetura CSS-first, configuração via `@theme` no `globals.css`, sem `tailwind.config.js`)
- **Framer Motion** (com `LazyMotion` + `domAnimation`) para scroll reveals e microinterações
- **next/font** com Fraunces (display) e Inter (corpo), self-hosted
- **pnpm** como package manager

### 2.2 Deploy

- Build: `pnpm build` gera `/out` (site estático)
- `next.config.ts`:
  ```ts
  basePath: '/kyron-landing'
  assetPrefix: '/kyron-landing/'
  images: { unoptimized: true }
  output: 'export'
  ```
- GitHub Action (`.github/workflows/deploy.yml`) builda no push para `main` e publica `/out` no branch `gh-pages` via `peaceiris/actions-gh-pages`
- GitHub Pages serve do branch `gh-pages`

### 2.3 Escopo explicitamente fora

- Backend real de waitlist (permanece `mailto:`)
- Analytics, blog, CMS, i18n, modo claro
- Testes automatizados de UI (Playwright etc.)
- Rotas dinâmicas, middleware, SSR

## 3. Estrutura do projeto

```
/
├── app/
│   ├── layout.tsx           # fonts, metadata, <body> base, providers
│   ├── page.tsx             # landing (monta todas as sections em ordem)
│   ├── globals.css          # tailwind + @theme com tokens + utilities customizadas
│   └── favicon.ico
├── components/
│   ├── sections/
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── Prova.tsx
│   │   ├── ComoFunciona.tsx
│   │   ├── Diferenciais.tsx
│   │   ├── Faq.tsx
│   │   ├── Cta.tsx
│   │   └── Footer.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Eyebrow.tsx
│   │   ├── SectionHeader.tsx
│   │   └── PhoneMockup.tsx
│   └── motion/
│       ├── Reveal.tsx        # wrapper de scroll reveal
│       └── Stagger.tsx       # wrapper para stagger children
├── lib/
│   └── content.ts            # textos centralizados (copy da landing)
├── public/
│   └── assets/
│       ├── kyron_logo.jpeg   # logo (migrado do projeto atual)
│       ├── iphone16-home.webp
│       ├── iphone16-home.avif
│       ├── iphone16-midhero.webp
│       └── iphone16-midhero.avif
├── next.config.ts
├── tsconfig.json
├── package.json
├── pnpm-lock.yaml
├── .eslintrc.json
├── .gitignore
└── .github/
    └── workflows/
        └── deploy.yml
```

### Princípios da estrutura

- **Single-page** (uma única rota `/`) — sem roteamento
- **Conteúdo centralizado** em `lib/content.ts` — textos longos fora dos componentes para facilitar edição
- **Components por seção**, não componentes atômicos excessivos — YAGNI
- **Arquivos pequenos e focados** — cada seção é um arquivo de até ~150 linhas

## 4. Sistema visual

### 4.1 Paleta

```css
--bg:         #09090b;   /* preto profundo */
--bg-soft:    #111114;   /* card base */
--ink:        #f5f1e8;   /* texto principal (creme) */
--ink-muted:  #9a9288;   /* texto secundário */
--line:       rgba(255, 255, 255, 0.08);
--gold:       #d8b25b;   /* accent principal */
--gold-soft:  #f2d18a;   /* hover/highlight */
--crimson:    #8f2d1d;   /* accent de intensidade */
```

### 4.2 Tipografia

**Editorial Manifesto:**

- **Display:** Fraunces (variável, peso 300–900, `opsz`). Usado em `h1`, `h2` grandes e destaques com `<em>`.
- **Corpo:** Inter (variável). Usado em parágrafos, labels, botões, navegação.

**Escala (fluida com `clamp()`):**

| Elemento | Tamanho | Line-height | Letter-spacing |
|---|---|---|---|
| H1 hero | `clamp(52px, 9vw, 132px)` | 0.88 | -0.035em |
| H2 seção | `clamp(36px, 5vw, 64px)` | 0.95 | -0.025em |
| H3 card | 22px (weight 600) | 1.2 | -0.01em |
| Corpo | 16px mobile / 17px desktop | 1.55 | 0 |
| Eyebrow | 11px uppercase | 1 | 0.22em |

**Uso intencional do itálico:** o `<em>` do Fraunces vira elemento de design. Exemplo: "Seu treino *deixa de ser* improviso", com `<em>` em cor gold.

### 4.3 Layout e grid

- Container: `max-width: 1240px`
- Gutter: 24px mobile / 40px tablet / 64px desktop
- Padding vertical por seção: `clamp(80px, 12vw, 160px)`
- Hero: ~85vh desktop / ~90vh mobile
- Breakpoints Tailwind padrão: `sm 640 / md 768 / lg 1024 / xl 1280`

### 4.4 Elementos recorrentes

- **Eyebrow label:** barra crimson `▍` seguida de texto uppercase gold, tracking wide. Presente no topo de cada seção.
- **Botões:**
  - `primary`: bg gold, texto `#0b0b0d`, radius 4px, padding 14px 22px, weight 600. Hover: bg `gold-soft` + `translate-y(-1px)`.
  - `secondary`: transparent, border `rgba(255,255,255,0.18)`, mesma geometria. Hover: border gold.
  - Cantos retos de leve (4px), não pill.
- **Cards:** bg `rgba(255,255,255,0.04)`, border `1px solid --line`, radius 16px, padding 28px. Hover: border vira `rgba(216,178,91,0.3)`.
- **Background ambient:** grade sutil 42px + radials crimson top-left e gold top-right (herdado do atual, mais dissolvido).
- **Phone mockup:** `<PhoneMockup>` encapsula a imagem real do iPhone + sombra `0 40px 120px rgba(0,0,0,0.7)` + glow gold `0 0 120px rgba(216,178,91,0.18)`.

### 4.5 Animações (Framer Motion)

- **Reveal on scroll:** `opacity 0 + translateY 24px → opacity 1 + translateY 0`, duração 600ms, easing `[0.16, 1, 0.3, 1]`, `whileInView` com `viewport: { amount: 0.15, once: true }`.
- **Stagger em grids:** children com delay de 80ms entre si.
- **Hero entrance:** título aparece linha a linha (stagger 200ms) on mount. iPhone entra com delay 400ms + rotação final 6°.
- **Hover em cards:** `translate-y -2px` + border glow em 200ms.
- **`prefers-reduced-motion`:** animações substituídas por fade simples via variant override.

## 5. Estrutura de conteúdo (8 seções)

### 5.1 Hero — Asymmetric Giant

- **Eyebrow:** `▍ TREINO COM IA · ARTES MARCIAIS`
- **H1 (Fraunces):** "Seu treino *deixa de ser* improviso." (com `<em>` em gold)
- **Sub:** "IA que monta a sessão, acompanha a execução e devolve progresso real. Feito pra quem treina boxe, MMA e rotinas de combate — dentro ou fora da academia."
- **CTAs:** "Entrar na waitlist" (primary) + "Ver o produto" (secondary, anchor para #prova)
- **Visual:** iPhone real posicionado absoluto à direita, rotação ~6°, vazando parcialmente do container. Glow gold + sombra profunda. Background ambient.

### 5.2 Prova visual

- **Eyebrow:** `▍ PROVA`
- **H2:** "Mais próximo de um app real do que de uma *promessa abstrata*."
- **Sub:** "Como o Kyron organiza contexto, treino e progresso."
- **Layout:** 3 cards em grid (`grid-cols-1 md:grid-cols-3`):
  - Card 1 — **Onboarding:** modalidade, ambiente, duração, objetivo
  - Card 2 — **Sessão do dia** (destacado, ligeiramente maior): timeline do treino
  - Card 3 — **Progressão:** streak, score, sessões
- Cada card tem um numeral romano/ordinal grande de fundo (gold 8% opacity).

### 5.3 Como funciona (funde antigo "Fluxo" + "Casos de uso")

- **Eyebrow:** `▍ COMO FUNCIONA`
- **H2:** "Três etapas pra sair da intenção *e entrar na rotina*."
- **Layout:** 3 steps horizontais (desktop) / stack vertical (mobile). Cada step:
  - Numeral gigante (Fraunces, 96px, gold 20% opacity)
  - Título
  - Descrição (2-3 linhas)
  - **Exemplo de caso embutido** em italic, gold muted (ex: "Ex.: 30 min em casa, só com saco e corda")
- Steps: `01. Perfil e contexto` / `02. Treino gerado` / `03. Evolução visível`

### 5.4 Diferenciais (reduzido de 6 para 4)

- **Eyebrow:** `▍ DIFERENCIAIS`
- **H2:** "O que faz o Kyron parecer *produto, não demo*."
- **Layout:** `grid-cols-1 md:grid-cols-2` com 4 cards. Primeiro card é featured (borda gold sutil):
  - Featured: **IA pra artes marciais reais** — ambiente, nível, tempo (não template)
  - **Execução sem fricção** — séries, descanso, progressão claros
  - **Chat útil, não decorativo** — assistente focado em combate
  - **Gamificação com propósito** — XP, score, ranking para consistência
- Cortados: "Base pronta pra evolução" + "Foco em retenção" (genéricos).

### 5.5 FAQ

- **Eyebrow:** `▍ FAQ`
- **H2:** "Objeções previsíveis, *respostas diretas*."
- **Layout:** accordion expansível com Framer Motion (não cards estáticos).
- 4 perguntas: iniciante / substitui treinador / precisa de academia / modalidades ideais.

### 5.6 CTA / Waitlist

- **Eyebrow:** `▍ PRÓXIMO PASSO`
- **H2:** "Se você quer testar cedo, *esse é o ponto de entrada*."
- **Sub:** "Deixe seus dados e o contexto do seu treino. Entramos em contato assim que a waitlist abrir."
- **Form** (mesmo comportamento `mailto:` atual, sem backend):
  - Nome, Email, Modalidade, Rotina (select), Objetivo (textarea)
  - Campos com bg `rgba(255,255,255,0.03)`, border sutil, focus: border gold + glow
  - Submit abre email pré-preenchido
- **Sem seção de sugestões** — cortada por competir com o CTA principal.

### 5.7 Footer

- Logo Kyron + nome
- © 2026 · Equipe de desenvolvimento Kyron
- Minimalista, uma linha no desktop

### 5.8 Header (navegação)

- Logo Kyron (esquerda)
- Nav inline desktop: `Produto` · `Como funciona` · `FAQ` · `Waitlist`
- Menu hambúrguer mobile com drawer full-screen, trap de foco, fecha com ESC
- Sticky com `backdrop-blur` e bg `rgba(9,9,11,0.72)` ao scrollar

## 6. Performance

**Alvo:** Lighthouse 95+ em todas categorias (Performance, Accessibility, Best Practices, SEO).

- **Imagens:** converter PNGs do iPhone para AVIF + WebP fallback. `iphone16-home.png` atual (500KB) → alvo <80KB AVIF. Servir com `<picture>` + `srcset` responsivo.
- **Fontes:** `next/font` self-hosted, subset latin, `display: 'swap'`, preload só weights above-the-fold.
- **JS bundle:** alvo <80KB gzipped. Framer Motion via `LazyMotion` + `m` ao invés do bundle full.
- **CSS:** Tailwind v4 com tree-shaking. `globals.css` mínimo.
- **Lazy:** imagens abaixo do fold com `loading="lazy"`. Animações com `whileInView`.
- **Preload:** só hero image. Logo inline SVG.

## 7. Acessibilidade

- Contraste AA ou superior em todas combinações (gold `#d8b25b` vs bg `#09090b` = 8.1:1)
- Landmarks semânticos: `<header>`, `<main>`, `<footer>`, `<nav>`, `<section>`
- `aria-label` onde o texto visível não basta
- Foco visível: ring gold 2px em todos elementos interativos
- Form com `<label>` associado, `aria-describedby` em erros, `aria-required`
- Menu mobile: `aria-expanded`, trap de foco, ESC fecha
- `prefers-reduced-motion` respeitado
- Navegação por teclado testada em todas seções
- `lang="pt-BR"` no root

## 8. SEO

- `metadata` no `app/layout.tsx`: title, description, OG tags, Twitter card
- `robots.txt` + `app/sitemap.ts` (Next gera estático)
- Estrutura semântica: 1 `h1`, `h2` por seção
- Imagens com `alt` descritivo
- Título: "Kyron | Treino com IA, disciplina e progressão"
- Description: similar ao atual, refinada

## 9. Testing

Abordagem mínima viável — é uma landing, não um app.

- **Sem unit tests** em componentes puros de apresentação (YAGNI)
- **Type safety:** `pnpm tsc --noEmit` no CI
- **Build check:** `pnpm build` no CI
- **Lint:** ESLint com regras `next/core-web-vitals`
- **Verificação manual na conclusão:**
  - Abrir `localhost:3000`
  - Testar cada seção em mobile, tablet, desktop
  - Menu mobile (abrir, navegar, fechar, ESC, teclado)
  - Form submission (abre mailto correto)
  - Scroll reveals
  - Navegação por teclado e foco visível
  - Lighthouse local — deve atingir 95+
  - Testar com `prefers-reduced-motion` ativado

## 10. Pipeline de deploy

```yaml
# .github/workflows/deploy.yml (esquemático)
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm tsc --noEmit
      - run: pnpm lint
      - run: pnpm build
      - uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
```

## 11. Riscos e mitigações

| Risco | Mitigação |
|---|---|
| `basePath: '/kyron-landing'` quebra URLs absolutas em assets | Usar só `next/image` e `next/link`. Para casos raros, prefixar com `process.env.NEXT_PUBLIC_BASE_PATH`. |
| Static export não suporta alguns features Next | Não usamos nenhum. Limitação documentada como intencional. |
| Fraunces + Inter = ~120KB de fontes | Aceitável. Subset só latin. Preload só weights above-the-fold. |
| Framer Motion pesa ~30KB gzipped no core | `LazyMotion` + `domAnimation` reduz para ~5KB inicial. |
| 6 PNGs duplicados/quase idênticos no projeto atual | Consolidar: manter só `iphone16-home` e `iphone16-midhero`. Deletar os outros 4. |
| Migração quebra deploy atual em GH Pages | Manter branch `legacy-static` com o HTML antigo por segurança antes de mergear. |

## 12. Critérios de aceitação

A migração estará completa quando:

1. `pnpm build` gera `/out` sem erros
2. `pnpm tsc --noEmit` e `pnpm lint` passam limpos
3. Todas as 8 seções renderizam corretamente em mobile (375px), tablet (768px) e desktop (1440px)
4. Hero exibe o iPhone mockup real em posição asymmetric com rotação
5. Animações de scroll reveal funcionam e respeitam `prefers-reduced-motion`
6. Menu mobile funciona com teclado e ESC
7. Form de waitlist abre email `mailto:` corretamente preenchido
8. Lighthouse local atinge 95+ em todas as categorias
9. Deploy no GitHub Pages em `<usuario>.github.io/kyron-landing` serve o site corretamente com todos assets carregando
10. Branch `legacy-static` existe com o HTML antigo preservado
