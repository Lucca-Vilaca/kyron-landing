# kyron-landing

Landing page do Kyron construída com Next.js + TypeScript + Tailwind v4.

## Stack
- Next.js 16 (App Router, static export)
- TypeScript (strict)
- Tailwind CSS v4
- Framer Motion (via LazyMotion)
- next/font (Fraunces + Inter)
- pnpm

## Rodando localmente

```bash
pnpm install
pnpm dev
```

Acesse `http://localhost:3000`.

## Build estático

```bash
pnpm build
```

Gera o site em `/out`. Deploy automático via GitHub Actions para GitHub Pages (branch `gh-pages`).

## Estrutura
- `app/` — layout, page, globals.css, metadata, robots, sitemap
- `components/sections/` — as 8 seções da landing (Header, Hero, Prova, ComoFunciona, Diferenciais, Faq, Cta, Footer)
- `components/ui/` — primitivos (Button, Eyebrow, SectionHeader, PhoneMockup)
- `components/motion/` — wrappers de animação (MotionProvider, Reveal, Stagger)
- `lib/content.ts` — copy centralizado
- `public/assets/` — imagens otimizadas (AVIF + WebP)
- `scripts/optimize-images.mjs` — gerador de AVIF/WebP a partir de PNGs fonte

## Histórico
A versão anterior (HTML + CSS + JS puro) está preservada no branch `legacy-static`.
