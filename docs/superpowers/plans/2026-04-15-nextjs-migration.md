# Kyron Landing — Next.js Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate the Kyron landing page from static HTML/CSS/JS to Next.js 15 + TypeScript + Tailwind v4 with a new Editorial Manifesto visual direction and restructured 8-section layout.

**Architecture:** Next.js 15 App Router with `output: 'export'` for static generation. Single-page landing (`/`) composed of section components. Framer Motion for scroll reveals via `LazyMotion`. Self-hosted fonts via `next/font`. Deploy to GitHub Pages at `<user>.github.io/kyron-landing` via GitHub Actions.

**Tech Stack:** Next.js 15, React 19, TypeScript (strict), Tailwind CSS v4, Framer Motion, pnpm, Node 20, sharp (for image optimization), clsx + tailwind-merge

**Related spec:** `docs/superpowers/specs/2026-04-15-nextjs-migration-design.md`

---

## Conventions for this plan

- **TDD not used**: this is a presentational landing. Verification is type-check + build + visual check per task. Automated tests are explicitly out of scope (spec §9).
- **Commit after every task** unless noted otherwise.
- **Run from repo root**: `/Users/luccavilaca/kyron-landing/kyron-landing`
- **Old files stay during migration**: `index.html`, `styles.css`, `script.js` coexist at root until Task 25 (final cleanup). Next.js ignores them.

---

## Phase 1: Bootstrap & Setup

### Task 1: Preserve legacy site in a branch

**Files:** none modified; git operations only.

- [ ] **Step 1: Create legacy branch from current state**

```bash
git checkout -b legacy-static
git push -u origin legacy-static
git checkout dev
```

Expected: branch `legacy-static` exists locally and on origin, containing the current static site. Back on `dev` to continue work.

---

### Task 2: Initialize Next.js project at repo root

**Files:**
- Create: `package.json`, `pnpm-lock.yaml`, `tsconfig.json`, `next.config.ts`, `next-env.d.ts`, `app/layout.tsx`, `app/page.tsx`, `app/globals.css`, `.eslintrc.json`, `postcss.config.mjs`, `public/` (some from create-next-app)
- Leave untouched: `index.html`, `styles.css`, `script.js`, `assets/`, `README.md`, `.gitignore`

- [ ] **Step 1: Run create-next-app at the root**

```bash
pnpm create next-app@latest . \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir=false \
  --no-import-alias \
  --use-pnpm
```

When prompted about existing files, answer **yes** to proceed (the old HTML/CSS/JS at root are not managed by Next.js and won't be overwritten — only new files will be added).

Expected: `package.json`, `app/`, `public/`, `next.config.ts`, etc. exist. `pnpm dev` would start a server.

- [ ] **Step 2: Install additional dependencies**

```bash
pnpm add framer-motion clsx tailwind-merge
pnpm add -D sharp @types/node
```

Expected: `package.json` lists `framer-motion`, `clsx`, `tailwind-merge` under deps and `sharp`, `@types/node` under devDeps.

- [ ] **Step 3: Verify Tailwind v4 is installed (not v3)**

Run: `pnpm list tailwindcss`
Expected: version `4.x.x`. If it's 3.x, upgrade with `pnpm add -D tailwindcss@latest @tailwindcss/postcss@latest`.

- [ ] **Step 4: Verify baseline build works**

```bash
pnpm tsc --noEmit
pnpm build
```

Expected: both succeed without errors. `/.next/` directory appears.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: bootstrap next.js + typescript + tailwind v4"
```

---

### Task 3: Configure next.config.ts for static export and GitHub Pages

**Files:**
- Modify: `next.config.ts`

- [ ] **Step 1: Replace next.config.ts with static-export config**

```ts
// next.config.ts
import type { NextConfig } from 'next';

const isProd = process.env.NODE_ENV === 'production';
const basePath = isProd ? '/kyron-landing' : '';

const nextConfig: NextConfig = {
  output: 'export',
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  reactStrictMode: true,
};

export default nextConfig;
```

- [ ] **Step 2: Verify build still works**

```bash
pnpm build
```

Expected: build succeeds, generates `/out` directory (not `.next/`, because of `output: 'export'`).

- [ ] **Step 3: Commit**

```bash
git add next.config.ts
git commit -m "chore: configure next for static export + basePath"
```

---

### Task 4: Move and optimize images

**Files:**
- Move: `assets/kyron_logo.jpeg` → `public/assets/kyron_logo.jpeg`
- Create: `public/assets/iphone16-home.avif`, `public/assets/iphone16-home.webp`
- Create: `public/assets/iphone16-midhero.avif`, `public/assets/iphone16-midhero.webp`
- Create: `scripts/optimize-images.mjs`
- Delete: `iphone16-top.png`, `iphone16-top-after.png`, `iphone16-top-finalcheck.png`, `iphone16-top-reloaded.png`, `iphone16-top-updated.png` (kept duplicates at root)
- Keep temporarily: `iphone16-home.png`, `iphone16-midhero.png` at root (deleted in Task 25)

- [ ] **Step 1: Move logo to public/**

```bash
mkdir -p public/assets
cp assets/kyron_logo.jpeg public/assets/kyron_logo.jpeg
```

- [ ] **Step 2: Write the image optimization script**

Create `scripts/optimize-images.mjs`:

```js
import sharp from 'sharp';
import { mkdirSync } from 'fs';
import { resolve, dirname } from 'path';

const sources = [
  { input: 'iphone16-home.png', outBase: 'public/assets/iphone16-home', maxWidth: 900 },
  { input: 'iphone16-midhero.png', outBase: 'public/assets/iphone16-midhero', maxWidth: 900 },
];

for (const { input, outBase, maxWidth } of sources) {
  const outAvif = `${outBase}.avif`;
  const outWebp = `${outBase}.webp`;
  mkdirSync(dirname(resolve(outAvif)), { recursive: true });

  const pipeline = sharp(input).resize({ width: maxWidth, withoutEnlargement: true });

  await pipeline.clone().avif({ quality: 60, effort: 6 }).toFile(outAvif);
  await pipeline.clone().webp({ quality: 78 }).toFile(outWebp);

  console.log(`✓ ${input} → ${outAvif} + ${outWebp}`);
}
```

- [ ] **Step 3: Run the script**

```bash
node scripts/optimize-images.mjs
```

Expected output:
```
✓ iphone16-home.png → public/assets/iphone16-home.avif + public/assets/iphone16-home.webp
✓ iphone16-midhero.png → public/assets/iphone16-midhero.avif + public/assets/iphone16-midhero.webp
```

Both AVIFs should be under 120KB.

- [ ] **Step 4: Delete duplicated/unused root PNGs**

```bash
rm iphone16-top.png iphone16-top-after.png iphone16-top-finalcheck.png iphone16-top-reloaded.png iphone16-top-updated.png
```

Keep `iphone16-home.png` and `iphone16-midhero.png` at the root until Task 25 (they're the source files for the script, kept for re-runs if the script needs tweaking).

- [ ] **Step 5: Commit**

```bash
git add public/assets scripts/optimize-images.mjs package.json
git rm iphone16-top.png iphone16-top-after.png iphone16-top-finalcheck.png iphone16-top-reloaded.png iphone16-top-updated.png
git commit -m "chore: optimize iphone mockups (avif + webp) and drop duplicates"
```

---

### Task 5: Configure fonts (Fraunces + Inter) in layout.tsx

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Replace `app/layout.tsx` with font-configured version**

```tsx
// app/layout.tsx
import type { Metadata, Viewport } from 'next';
import { Fraunces, Inter } from 'next/font/google';
import './globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-fraunces',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Kyron | Treino com IA, disciplina e progressão',
  description:
    'Kyron transforma rotina de treino em sistema de evolução: IA para montar sessões, score de consistência, chat, ranking e histórico de progresso.',
  openGraph: {
    title: 'Kyron | Treino com IA, disciplina e progressão',
    description:
      'Plano personalizado, execução guiada, chat esportivo, score de consistência e ranking para transformar rotina em evolução real.',
    type: 'website',
    locale: 'pt_BR',
  },
};

export const viewport: Viewport = {
  themeColor: '#0b0b0d',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${fraunces.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 2: Verify build succeeds**

```bash
pnpm build
```

Expected: build succeeds, fonts downloaded and self-hosted under `/out/_next/static/media/*.woff2`.

- [ ] **Step 3: Commit**

```bash
git add app/layout.tsx
git commit -m "feat(layout): configure fraunces and inter fonts + metadata"
```

---

### Task 6: Write globals.css with Tailwind v4 @theme tokens

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Replace globals.css completely**

```css
/* app/globals.css */
@import "tailwindcss";

@theme {
  --color-bg: #09090b;
  --color-bg-soft: #111114;
  --color-bg-card: rgba(255, 255, 255, 0.04);
  --color-ink: #f5f1e8;
  --color-ink-muted: #9a9288;
  --color-line: rgba(255, 255, 255, 0.08);
  --color-gold: #d8b25b;
  --color-gold-soft: #f2d18a;
  --color-crimson: #8f2d1d;

  --font-display: var(--font-fraunces);
  --font-sans: var(--font-inter);

  --radius-sm: 4px;
  --radius-md: 16px;
  --radius-lg: 24px;

  --container-landing: 1240px;
}

@layer base {
  html {
    scroll-behavior: smooth;
  }

  body {
    color: var(--color-ink);
    font-family: var(--font-sans), system-ui, sans-serif;
    font-feature-settings: "ss01", "cv11";
    -webkit-font-smoothing: antialiased;
    min-height: 100vh;
    background:
      radial-gradient(circle at top left, rgba(143, 45, 29, 0.28), transparent 35%),
      radial-gradient(circle at 80% 15%, rgba(216, 178, 91, 0.15), transparent 30%),
      linear-gradient(180deg, #0d0d10 0%, #09090b 45%, #060607 100%);
  }

  body::before {
    content: "";
    position: fixed;
    inset: 0;
    background-image:
      linear-gradient(rgba(255, 255, 255, 0.022) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.022) 1px, transparent 1px);
    background-size: 42px 42px;
    -webkit-mask-image: linear-gradient(180deg, rgba(0, 0, 0, 0.9), transparent 85%);
    mask-image: linear-gradient(180deg, rgba(0, 0, 0, 0.9), transparent 85%);
    pointer-events: none;
    z-index: 0;
  }

  ::selection {
    background: var(--color-gold);
    color: var(--color-bg);
  }

  @media (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto;
    }
  }
}

@layer utilities {
  .font-display {
    font-family: var(--font-display), Georgia, serif;
  }

  .text-balance {
    text-wrap: balance;
  }

  .text-pretty {
    text-wrap: pretty;
  }
}
```

- [ ] **Step 2: Replace `app/page.tsx` with a minimal smoke test**

```tsx
// app/page.tsx
export default function HomePage() {
  return (
    <main className="relative z-10 mx-auto max-w-[1240px] px-6 py-20 md:px-10 lg:px-16">
      <p className="text-xs uppercase tracking-[0.22em] text-gold">▍ Kyron</p>
      <h1 className="font-display text-6xl leading-[0.88] tracking-tight text-balance">
        Seu treino <em className="not-italic text-gold italic">deixa de ser</em> improviso.
      </h1>
    </main>
  );
}
```

- [ ] **Step 3: Run dev server and visually inspect**

```bash
pnpm dev
```

Open `http://localhost:3000`. Expected:
- Dark background with subtle crimson + gold radial gradients
- Fine grid overlay at top, fading to nothing
- "▍ Kyron" in gold uppercase
- Giant Fraunces headline with "deixa de ser" in gold italic

If fonts don't load, check that `app/layout.tsx` passes the font variables to `<html className>`.

Stop the dev server with `Ctrl+C`.

- [ ] **Step 4: Commit**

```bash
git add app/globals.css app/page.tsx
git commit -m "feat(styles): tailwind v4 theme tokens + base styles + smoke test"
```

---

## Phase 2: Primitives

### Task 7: cn() utility and Button component

**Files:**
- Create: `lib/cn.ts`
- Create: `components/ui/Button.tsx`

- [ ] **Step 1: Create lib/cn.ts**

```ts
// lib/cn.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

- [ ] **Step 2: Create components/ui/Button.tsx**

```tsx
// components/ui/Button.tsx
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'secondary';

const baseStyles =
  'inline-flex items-center justify-center rounded-sm px-[22px] py-[14px] text-[14px] font-semibold leading-none transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-bg';

const variantStyles: Record<Variant, string> = {
  primary:
    'bg-gold text-[#0b0b0d] hover:bg-gold-soft hover:-translate-y-[1px] active:translate-y-0',
  secondary:
    'border border-white/[0.18] text-ink hover:border-gold hover:-translate-y-[1px] active:translate-y-0',
};

type BaseProps = {
  variant?: Variant;
  children: ReactNode;
  className?: string;
};

type AnchorProps = BaseProps & { href: string } & Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  'href' | 'className' | 'children'
>;

type ButtonElProps = BaseProps & { href?: undefined } & Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'className' | 'children'
>;

export function Button(props: AnchorProps | ButtonElProps) {
  const variant: Variant = props.variant ?? 'primary';
  const classes = cn(baseStyles, variantStyles[variant], props.className);

  if ('href' in props && props.href) {
    const { variant: _v, className: _c, children, href, ...rest } = props;
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }

  const { variant: _v, className: _c, children, ...rest } = props as ButtonElProps;
  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  );
}
```

- [ ] **Step 3: Enable the `@/` alias in tsconfig.json**

Open `tsconfig.json` and ensure the `paths` include:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

- [ ] **Step 4: Verify type-check**

```bash
pnpm tsc --noEmit
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add lib/cn.ts components/ui/Button.tsx tsconfig.json
git commit -m "feat(ui): add cn() utility and Button component"
```

---

### Task 8: Eyebrow component

**Files:**
- Create: `components/ui/Eyebrow.tsx`

- [ ] **Step 1: Create Eyebrow**

```tsx
// components/ui/Eyebrow.tsx
import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type EyebrowProps = {
  children: ReactNode;
  className?: string;
};

export function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <p
      className={cn(
        'inline-flex items-center gap-2 text-[11px] font-medium uppercase leading-none tracking-[0.22em] text-gold',
        className
      )}
    >
      <span className="inline-block h-3 w-[3px] bg-crimson" aria-hidden="true" />
      {children}
    </p>
  );
}
```

- [ ] **Step 2: Verify type-check**

```bash
pnpm tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/ui/Eyebrow.tsx
git commit -m "feat(ui): add Eyebrow component"
```

---

### Task 9: SectionHeader component

**Files:**
- Create: `components/ui/SectionHeader.tsx`

- [ ] **Step 1: Create SectionHeader**

```tsx
// components/ui/SectionHeader.tsx
import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Eyebrow } from './Eyebrow';

type SectionHeaderProps = {
  eyebrow: string;
  heading: ReactNode;
  sub?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
};

export function SectionHeader({
  eyebrow,
  heading,
  sub,
  align = 'left',
  className,
}: SectionHeaderProps) {
  return (
    <header
      className={cn(
        'flex flex-col gap-5',
        align === 'center' && 'items-center text-center',
        className
      )}
    >
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="font-display text-[clamp(36px,5vw,64px)] font-medium leading-[0.95] tracking-[-0.025em] text-ink text-balance max-w-[22ch]">
        {heading}
      </h2>
      {sub && (
        <p className="max-w-[52ch] text-[15px] leading-relaxed text-ink-muted md:text-[17px]">
          {sub}
        </p>
      )}
    </header>
  );
}
```

- [ ] **Step 2: Verify type-check**

```bash
pnpm tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/ui/SectionHeader.tsx
git commit -m "feat(ui): add SectionHeader component"
```

---

### Task 10: PhoneMockup component

**Files:**
- Create: `components/ui/PhoneMockup.tsx`

- [ ] **Step 1: Create PhoneMockup**

```tsx
// components/ui/PhoneMockup.tsx
import { cn } from '@/lib/cn';

type PhoneMockupProps = {
  src: string;
  srcAvif?: string;
  alt: string;
  className?: string;
  priority?: boolean;
};

export function PhoneMockup({ src, srcAvif, alt, className, priority = false }: PhoneMockupProps) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const webpSrc = `${basePath}${src}`;
  const avifSrc = srcAvif ? `${basePath}${srcAvif}` : undefined;

  return (
    <div
      className={cn(
        'relative',
        'drop-shadow-[0_40px_120px_rgba(0,0,0,0.7)]',
        'after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:shadow-[0_0_120px_rgba(216,178,91,0.18)]',
        className
      )}
    >
      <picture>
        {avifSrc && <source srcSet={avifSrc} type="image/avif" />}
        <source srcSet={webpSrc} type="image/webp" />
        <img
          src={webpSrc}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
          className="relative block h-auto w-full rounded-[32px]"
        />
      </picture>
    </div>
  );
}
```

- [ ] **Step 2: Verify type-check**

```bash
pnpm tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/ui/PhoneMockup.tsx
git commit -m "feat(ui): add PhoneMockup component with avif/webp picture"
```

---

### Task 11: Reveal motion wrapper

**Files:**
- Create: `components/motion/MotionProvider.tsx`
- Create: `components/motion/Reveal.tsx`

- [ ] **Step 1: Create MotionProvider (LazyMotion wrapper)**

```tsx
// components/motion/MotionProvider.tsx
'use client';

import { LazyMotion, domAnimation } from 'framer-motion';
import type { ReactNode } from 'react';

export function MotionProvider({ children }: { children: ReactNode }) {
  return <LazyMotion features={domAnimation} strict>{children}</LazyMotion>;
}
```

- [ ] **Step 2: Create Reveal component**

```tsx
// components/motion/Reveal.tsx
'use client';

import { m, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: 'div' | 'section' | 'article' | 'li';
};

export function Reveal({ children, delay = 0, className, as = 'div' }: RevealProps) {
  const prefersReduced = useReducedMotion();
  const Tag = m[as];

  if (prefersReduced) {
    return <Tag className={cn(className)}>{children}</Tag>;
  }

  return (
    <Tag
      className={cn(className)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Tag>
  );
}
```

- [ ] **Step 3: Wrap body in MotionProvider**

Update `app/layout.tsx` — wrap `{children}` in `<MotionProvider>`:

```tsx
// app/layout.tsx (only the relevant imports and return change)
import { MotionProvider } from '@/components/motion/MotionProvider';
// ... existing imports

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${fraunces.variable} ${inter.variable}`}>
      <body>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 4: Verify build**

```bash
pnpm tsc --noEmit
pnpm build
```

Expected: both succeed. `Reveal` is marked as client component.

- [ ] **Step 5: Commit**

```bash
git add components/motion app/layout.tsx
git commit -m "feat(motion): MotionProvider (LazyMotion) + Reveal component"
```

---

### Task 12: Stagger motion wrapper

**Files:**
- Create: `components/motion/Stagger.tsx`

- [ ] **Step 1: Create Stagger component**

```tsx
// components/motion/Stagger.tsx
'use client';

import { m, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type StaggerProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
  as?: 'div' | 'ul' | 'ol';
};

export function Stagger({ children, className, stagger = 0.08, as = 'div' }: StaggerProps) {
  const prefersReduced = useReducedMotion();
  const Tag = m[as];

  if (prefersReduced) {
    return <Tag className={cn(className)}>{children}</Tag>;
  }

  return (
    <Tag
      className={cn(className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: stagger, delayChildren: 0.1 },
        },
      }}
    >
      {children}
    </Tag>
  );
}

export const staggerItemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};
```

- [ ] **Step 2: Create StaggerItem helper for children**

Add to the same file (`components/motion/Stagger.tsx`), after the `Stagger` export:

```tsx
type StaggerItemProps = {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'li' | 'article';
};

export function StaggerItem({ children, className, as = 'div' }: StaggerItemProps) {
  const prefersReduced = useReducedMotion();
  const Tag = m[as];

  if (prefersReduced) {
    return <Tag className={cn(className)}>{children}</Tag>;
  }

  return (
    <Tag className={cn(className)} variants={staggerItemVariants}>
      {children}
    </Tag>
  );
}
```

- [ ] **Step 3: Verify type-check**

```bash
pnpm tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add components/motion/Stagger.tsx
git commit -m "feat(motion): Stagger + StaggerItem for grid reveals"
```

---

### Task 13: Centralize all landing copy in lib/content.ts

**Files:**
- Create: `lib/content.ts`

- [ ] **Step 1: Create content.ts with all 8 sections' copy**

```ts
// lib/content.ts
export const content = {
  nav: [
    { label: 'Produto', href: '#prova' },
    { label: 'Como funciona', href: '#como-funciona' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Waitlist', href: '#cta' },
  ],

  hero: {
    eyebrow: 'TREINO COM IA · ARTES MARCIAIS',
    headingBefore: 'Seu treino',
    headingEmphasis: 'deixa de ser',
    headingAfter: 'improviso.',
    sub:
      'IA que monta a sessão, acompanha a execução e devolve progresso real. Feito pra quem treina boxe, MMA e rotinas de combate — dentro ou fora da academia.',
    ctaPrimary: {
      label: 'Entrar na waitlist',
      href: 'mailto:lucca.vilaca@gmail.com?subject=Quero%20testar%20o%20Kyron',
    },
    ctaSecondary: { label: 'Ver o produto', href: '#prova' },
  },

  prova: {
    eyebrow: 'PROVA',
    headingBefore: 'Mais próximo de um app real do que de uma ',
    headingEmphasis: 'promessa abstrata',
    headingAfter: '.',
    sub: 'Como o Kyron organiza contexto, treino e progresso.',
    cards: [
      {
        ordinal: 'I',
        label: 'Onboarding',
        title: 'Seu contexto entra antes do treino',
        items: [
          'Modalidade principal: Boxe',
          'Ambiente: casa com saco e corda',
          'Duração disponível: 35 minutos',
          'Objetivo da semana: voltar ao ritmo',
        ],
      },
      {
        ordinal: 'II',
        label: 'Sessão do dia',
        title: 'Técnica + cardio controlado',
        items: [
          'Aquecimento: corda 5 min',
          'Shadow boxing: 4×2 min',
          'Saco: 6 rounds com foco em volume',
          'Finisher: sprawls e core',
        ],
        featured: true,
      },
      {
        ordinal: 'III',
        label: 'Progressão',
        title: 'Consistência visível',
        items: ['7 dias — streak ativa', '+12 — score na semana', '18 — sessões registradas'],
      },
    ],
  },

  comoFunciona: {
    eyebrow: 'COMO FUNCIONA',
    headingBefore: 'Três etapas pra sair da intenção ',
    headingEmphasis: 'e entrar na rotina',
    headingAfter: '.',
    steps: [
      {
        number: '01',
        title: 'Perfil e contexto',
        description:
          'O app entende disciplina, ambiente, nível, frequência e duração da sessão, adaptando o treino à sua realidade.',
        example: 'Ex.: 30 min em casa, só com saco e corda.',
      },
      {
        number: '02',
        title: 'Treino gerado',
        description:
          'A IA monta um treino coerente com seu contexto, com foco em técnica, explosão, condicionamento e ordem de execução.',
        example: 'Ex.: 6 rounds de manopla + sprawls + shadow técnico.',
      },
      {
        number: '03',
        title: 'Evolução visível',
        description:
          'Score, histórico, streak e ranking transformam repetição em progresso percebido — não em motivação aleatória.',
        example: 'Ex.: 7 dias de streak, score +12 na semana.',
      },
    ],
  },

  diferenciais: {
    eyebrow: 'DIFERENCIAIS',
    headingBefore: 'O que faz o Kyron parecer ',
    headingEmphasis: 'produto, não demo',
    headingAfter: '.',
    items: [
      {
        title: 'IA pra artes marciais reais',
        description:
          'O treino nasce do seu ambiente, nível e tempo disponível — não de um template genérico. Funciona pra academia, mas também pra boxe e MMA com estrutura reduzida.',
        featured: true,
      },
      {
        title: 'Execução sem fricção',
        description:
          'Séries, descanso e progressão aparecem com clareza pra você treinar sem pensar na interface.',
      },
      {
        title: 'Chat útil, não decorativo',
        description:
          'Um assistente focado em treino, recuperação e performance de combate. Tom direto e contextual.',
      },
      {
        title: 'Gamificação com propósito',
        description:
          'XP, score e ranking servem pra reforçar consistência — não pra poluir a experiência.',
      },
    ],
  },

  faq: {
    eyebrow: 'FAQ',
    headingBefore: 'Objeções previsíveis, ',
    headingEmphasis: 'respostas diretas',
    headingAfter: '.',
    items: [
      {
        question: 'Serve para iniciante?',
        answer:
          'Sim, desde que o objetivo seja montar sessões compatíveis com nível e contexto. A ideia não é jogar volume avançado em quem está começando.',
      },
      {
        question: 'Substitui treinador?',
        answer:
          'Não. O Kyron funciona melhor como apoio para rotina, disciplina e treino complementar — especialmente fora do horário de aula ou do CT.',
      },
      {
        question: 'Precisa de academia completa?',
        answer:
          'Não. O produto foi pensado justamente para ambientes variáveis, inclusive casa, espaço funcional e estrutura reduzida.',
      },
      {
        question: 'Quais modalidades fazem mais sentido no início?',
        answer:
          'Boxe, MMA, muay thai e rotinas de combate com componente técnico e físico claro tendem a encaixar melhor na proposta inicial.',
      },
    ],
  },

  cta: {
    eyebrow: 'PRÓXIMO PASSO',
    headingBefore: 'Se você quer testar cedo, ',
    headingEmphasis: 'esse é o ponto de entrada',
    headingAfter: '.',
    sub:
      'Deixe seus dados e o contexto do seu treino. Entramos em contato assim que a waitlist abrir.',
    emailTo: 'lucca.vilaca@gmail.com',
    emailSubject: 'Quero testar o Kyron',
    fallbackContact: {
      label: 'Falar com o time',
      href: 'mailto:lucca.vilaca@gmail.com?subject=Quero%20conhecer%20o%20Kyron',
    },
  },

  footer: {
    brand: 'KYRON',
    tagline: 'Equipe de desenvolvimento Kyron',
    copyright: '© 2026 Todos os direitos reservados',
  },
} as const;

export type Content = typeof content;
```

- [ ] **Step 2: Verify type-check**

```bash
pnpm tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add lib/content.ts
git commit -m "feat(content): centralize landing copy in lib/content.ts"
```

---

## Phase 3: Sections

### Task 14: Header with sticky nav and mobile drawer

**Files:**
- Create: `components/sections/Header.tsx`

- [ ] **Step 1: Create Header**

```tsx
// components/sections/Header.tsx
'use client';

import { useEffect, useState } from 'react';
import { m, AnimatePresence, useReducedMotion } from 'framer-motion';
import { content } from '@/lib/content';
import { cn } from '@/lib/cn';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={cn(
        'sticky top-4 z-50 mx-auto mt-4 flex w-[min(calc(100%-32px),1240px)] items-center justify-between rounded-full border border-line px-5 py-3 backdrop-blur-xl transition-colors',
        scrolled ? 'bg-black/70' : 'bg-black/40'
      )}
    >
      <a href="#top" className="flex items-center gap-2" aria-label="Kyron">
        <img
          src={`${basePath}/assets/kyron_logo.jpeg`}
          alt=""
          className="h-7 w-7 rounded-full object-cover"
        />
        <span className="font-display text-[15px] font-semibold tracking-wide">KYRON</span>
      </a>

      <nav className="hidden md:flex items-center gap-7" aria-label="Navegação principal">
        {content.nav.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="text-[13px] text-ink-muted transition-colors hover:text-ink"
          >
            {item.label}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="md:hidden flex h-9 w-9 flex-col items-center justify-center gap-[5px]"
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? 'Fechar menu' : 'Abrir menu'}
        onClick={() => setOpen((v) => !v)}
      >
        <span
          className={cn(
            'block h-[2px] w-5 bg-ink transition-transform',
            open && 'translate-y-[7px] rotate-45'
          )}
        />
        <span className={cn('block h-[2px] w-5 bg-ink transition-opacity', open && 'opacity-0')} />
        <span
          className={cn(
            'block h-[2px] w-5 bg-ink transition-transform',
            open && '-translate-y-[7px] -rotate-45'
          )}
        />
      </button>

      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-nav"
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-bg/95 backdrop-blur-xl md:hidden"
            initial={prefersReduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={prefersReduced ? undefined : { opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {content.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="font-display text-4xl text-ink"
              >
                {item.label}
              </a>
            ))}
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
```

- [ ] **Step 2: Verify type-check**

```bash
pnpm tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/sections/Header.tsx
git commit -m "feat(sections): Header with sticky nav and mobile drawer"
```

---

### Task 15: Hero section (Asymmetric Giant)

**Files:**
- Create: `components/sections/Hero.tsx`

- [ ] **Step 1: Create Hero**

```tsx
// components/sections/Hero.tsx
'use client';

import { m, useReducedMotion } from 'framer-motion';
import { content } from '@/lib/content';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { PhoneMockup } from '@/components/ui/PhoneMockup';

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const prefersReduced = useReducedMotion();
  const { eyebrow, headingBefore, headingEmphasis, headingAfter, sub, ctaPrimary, ctaSecondary } =
    content.hero;

  const lineAnim = (delay: number) =>
    prefersReduced
      ? undefined
      : {
          initial: { opacity: 0, y: 32 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease },
        };

  return (
    <section
      id="top"
      className="relative z-10 mx-auto grid w-[min(calc(100%-32px),1240px)] min-h-[85vh] grid-cols-1 items-center gap-12 px-2 pt-24 pb-20 md:pt-36 md:pb-28 lg:grid-cols-[1.15fr_1fr] lg:gap-0"
    >
      <div className="relative z-10 flex flex-col items-start gap-8">
        <Eyebrow>{eyebrow}</Eyebrow>

        <h1 className="font-display text-[clamp(52px,9vw,132px)] font-medium leading-[0.88] tracking-[-0.035em] text-ink text-balance max-w-[14ch]">
          <m.span className="block" {...lineAnim(0)}>
            {headingBefore}
          </m.span>
          <m.span className="block italic text-gold" {...lineAnim(0.15)}>
            {headingEmphasis}
          </m.span>
          <m.span className="block" {...lineAnim(0.3)}>
            {headingAfter}
          </m.span>
        </h1>

        <m.p
          className="max-w-[52ch] text-[15px] leading-relaxed text-ink-muted md:text-[17px]"
          {...(prefersReduced
            ? {}
            : {
                initial: { opacity: 0, y: 16 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.6, delay: 0.5, ease },
              })}
        >
          {sub}
        </m.p>

        <m.div
          className="flex flex-wrap items-center gap-3"
          {...(prefersReduced
            ? {}
            : {
                initial: { opacity: 0, y: 16 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.6, delay: 0.6, ease },
              })}
        >
          <Button href={ctaPrimary.href}>{ctaPrimary.label}</Button>
          <Button href={ctaSecondary.href} variant="secondary">
            {ctaSecondary.label}
          </Button>
        </m.div>
      </div>

      <m.div
        className="relative mx-auto w-full max-w-[340px] lg:absolute lg:right-[-4%] lg:top-1/2 lg:w-[42%] lg:max-w-none lg:-translate-y-1/2"
        style={{ rotate: prefersReduced ? 0 : 6 }}
        {...(prefersReduced
          ? {}
          : {
              initial: { opacity: 0, x: 40, rotate: 12 },
              animate: { opacity: 1, x: 0, rotate: 6 },
              transition: { duration: 0.9, delay: 0.4, ease },
            })}
      >
        <PhoneMockup
          src="/assets/iphone16-home.webp"
          srcAvif="/assets/iphone16-home.avif"
          alt="Tela inicial do app Kyron mostrando o treino do dia"
          priority
        />
      </m.div>
    </section>
  );
}
```

- [ ] **Step 2: Verify type-check and build**

```bash
pnpm tsc --noEmit
pnpm build
```

Expected: both succeed.

- [ ] **Step 3: Commit**

```bash
git add components/sections/Hero.tsx
git commit -m "feat(sections): Hero with asymmetric giant layout and framer animations"
```

---

### Task 16: Prova section (3 proof cards)

**Files:**
- Create: `components/sections/Prova.tsx`

- [ ] **Step 1: Create Prova**

```tsx
// components/sections/Prova.tsx
import { content } from '@/lib/content';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Reveal } from '@/components/motion/Reveal';
import { Stagger, StaggerItem } from '@/components/motion/Stagger';
import { cn } from '@/lib/cn';

export function Prova() {
  const { eyebrow, headingBefore, headingEmphasis, headingAfter, sub, cards } = content.prova;

  return (
    <section
      id="prova"
      className="relative z-10 mx-auto w-[min(calc(100%-32px),1240px)] px-2 py-[clamp(80px,12vw,160px)]"
    >
      <Reveal>
        <SectionHeader
          eyebrow={eyebrow}
          heading={
            <>
              {headingBefore}
              <em className="not-italic font-display italic text-gold">{headingEmphasis}</em>
              {headingAfter}
            </>
          }
          sub={sub}
        />
      </Reveal>

      <Stagger className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-3" stagger={0.08}>
        {cards.map((card) => (
          <StaggerItem
            key={card.ordinal}
            as="article"
            className={cn(
              'relative overflow-hidden rounded-[16px] border border-line bg-white/[0.04] p-7 transition-colors duration-200 hover:border-gold/30',
              card.featured && 'md:scale-[1.02] border-gold/25'
            )}
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-2 -top-6 font-display text-[110px] font-semibold leading-none text-gold/[0.08]"
            >
              {card.ordinal}
            </span>

            <p className="text-[11px] uppercase tracking-[0.2em] text-gold">{card.label}</p>
            <h3 className="mt-3 font-display text-[22px] font-semibold leading-tight text-ink">
              {card.title}
            </h3>
            <ul className="mt-5 flex flex-col gap-2 text-[14px] text-ink-muted">
              {card.items.map((item) => (
                <li key={item} className="flex gap-2">
                  <span aria-hidden="true" className="text-gold">
                    ·
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
```

- [ ] **Step 2: Verify type-check**

```bash
pnpm tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/sections/Prova.tsx
git commit -m "feat(sections): Prova with 3 proof cards and stagger reveal"
```

---

### Task 17: ComoFunciona section

**Files:**
- Create: `components/sections/ComoFunciona.tsx`

- [ ] **Step 1: Create ComoFunciona**

```tsx
// components/sections/ComoFunciona.tsx
import { content } from '@/lib/content';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Reveal } from '@/components/motion/Reveal';
import { Stagger, StaggerItem } from '@/components/motion/Stagger';

export function ComoFunciona() {
  const { eyebrow, headingBefore, headingEmphasis, headingAfter, steps } = content.comoFunciona;

  return (
    <section
      id="como-funciona"
      className="relative z-10 mx-auto w-[min(calc(100%-32px),1240px)] px-2 py-[clamp(80px,12vw,160px)]"
    >
      <Reveal>
        <SectionHeader
          eyebrow={eyebrow}
          heading={
            <>
              {headingBefore}
              <em className="not-italic font-display italic text-gold">{headingEmphasis}</em>
              {headingAfter}
            </>
          }
        />
      </Reveal>

      <Stagger className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3" stagger={0.1}>
        {steps.map((step) => (
          <StaggerItem
            key={step.number}
            as="article"
            className="relative overflow-hidden rounded-[16px] border border-line bg-white/[0.03] p-8 transition-colors duration-200 hover:border-gold/25"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none block font-display text-[96px] font-semibold leading-none text-gold/20"
            >
              {step.number}
            </span>
            <h3 className="mt-2 font-display text-[24px] font-semibold leading-tight text-ink">
              {step.title}
            </h3>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">{step.description}</p>
            <p className="mt-5 font-display text-[14px] italic text-gold/80">{step.example}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
```

- [ ] **Step 2: Verify type-check**

```bash
pnpm tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/sections/ComoFunciona.tsx
git commit -m "feat(sections): ComoFunciona with 3 steps and embedded use cases"
```

---

### Task 18: Diferenciais section (4 cards with featured)

**Files:**
- Create: `components/sections/Diferenciais.tsx`

- [ ] **Step 1: Create Diferenciais**

```tsx
// components/sections/Diferenciais.tsx
import { content } from '@/lib/content';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Reveal } from '@/components/motion/Reveal';
import { Stagger, StaggerItem } from '@/components/motion/Stagger';
import { cn } from '@/lib/cn';

export function Diferenciais() {
  const { eyebrow, headingBefore, headingEmphasis, headingAfter, items } = content.diferenciais;

  return (
    <section
      id="diferenciais"
      className="relative z-10 mx-auto w-[min(calc(100%-32px),1240px)] px-2 py-[clamp(80px,12vw,160px)]"
    >
      <Reveal>
        <SectionHeader
          eyebrow={eyebrow}
          heading={
            <>
              {headingBefore}
              <em className="not-italic font-display italic text-gold">{headingEmphasis}</em>
              {headingAfter}
            </>
          }
        />
      </Reveal>

      <Stagger className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2" stagger={0.08}>
        {items.map((item) => (
          <StaggerItem
            key={item.title}
            as="article"
            className={cn(
              'rounded-[16px] border border-line bg-white/[0.03] p-8 transition-colors duration-200 hover:border-gold/30',
              item.featured && 'md:col-span-2 border-gold/25 bg-white/[0.05]'
            )}
          >
            <h3
              className={cn(
                'font-display font-semibold leading-tight text-ink',
                item.featured ? 'text-[32px] md:text-[40px]' : 'text-[22px]'
              )}
            >
              {item.title}
            </h3>
            <p className="mt-4 max-w-[52ch] text-[15px] leading-relaxed text-ink-muted">
              {item.description}
            </p>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
```

- [ ] **Step 2: Verify type-check**

```bash
pnpm tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/sections/Diferenciais.tsx
git commit -m "feat(sections): Diferenciais with 4 cards (1 featured, 3 regular)"
```

---

### Task 19: FAQ accordion section

**Files:**
- Create: `components/sections/Faq.tsx`

- [ ] **Step 1: Create Faq**

```tsx
// components/sections/Faq.tsx
'use client';

import { useState } from 'react';
import { m, AnimatePresence, useReducedMotion } from 'framer-motion';
import { content } from '@/lib/content';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Reveal } from '@/components/motion/Reveal';
import { cn } from '@/lib/cn';

export function Faq() {
  const { eyebrow, headingBefore, headingEmphasis, headingAfter, items } = content.faq;
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const prefersReduced = useReducedMotion();

  return (
    <section
      id="faq"
      className="relative z-10 mx-auto w-[min(calc(100%-32px),1240px)] px-2 py-[clamp(80px,12vw,160px)]"
    >
      <Reveal>
        <SectionHeader
          eyebrow={eyebrow}
          heading={
            <>
              {headingBefore}
              <em className="not-italic font-display italic text-gold">{headingEmphasis}</em>
              {headingAfter}
            </>
          }
        />
      </Reveal>

      <Reveal className="mt-12">
        <ul className="flex flex-col divide-y divide-line border-y border-line">
          {items.map((item, idx) => {
            const isOpen = openIdx === idx;
            const panelId = `faq-panel-${idx}`;
            const buttonId = `faq-button-${idx}`;
            return (
              <li key={item.question}>
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    className="group flex w-full items-center justify-between gap-6 py-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                  >
                    <span
                      className={cn(
                        'font-display text-[22px] font-medium leading-snug text-ink md:text-[26px]',
                        isOpen && 'text-gold'
                      )}
                    >
                      {item.question}
                    </span>
                    <span
                      aria-hidden="true"
                      className={cn(
                        'text-2xl text-gold transition-transform duration-300',
                        isOpen && 'rotate-45'
                      )}
                    >
                      +
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <m.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={prefersReduced ? false : { height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={prefersReduced ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-[64ch] pb-6 text-[15px] leading-relaxed text-ink-muted md:text-[16px]">
                        {item.answer}
                      </p>
                    </m.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </Reveal>
    </section>
  );
}
```

- [ ] **Step 2: Verify type-check**

```bash
pnpm tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/sections/Faq.tsx
git commit -m "feat(sections): FAQ accordion with framer height animation"
```

---

### Task 20: CTA / Waitlist section with mailto form

**Files:**
- Create: `components/sections/Cta.tsx`

- [ ] **Step 1: Create Cta**

```tsx
// components/sections/Cta.tsx
'use client';

import { useState, FormEvent } from 'react';
import { content } from '@/lib/content';
import { Button } from '@/components/ui/Button';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Reveal } from '@/components/motion/Reveal';

type FormState = {
  nome: string;
  email: string;
  modalidade: string;
  rotina: string;
  objetivo: string;
};

const initial: FormState = {
  nome: '',
  email: '',
  modalidade: '',
  rotina: '',
  objetivo: '',
};

export function Cta() {
  const { eyebrow, headingBefore, headingEmphasis, headingAfter, sub, emailTo, emailSubject, fallbackContact } =
    content.cta;
  const [form, setForm] = useState<FormState>(initial);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = [
      `Nome: ${form.nome}`,
      `Email: ${form.email}`,
      `Modalidade: ${form.modalidade}`,
      `Rotina: ${form.rotina}`,
      '',
      'O que quero melhorar:',
      form.objetivo,
    ].join('\n');
    const href = `mailto:${emailTo}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
  };

  const field =
    'w-full rounded-sm border border-line bg-white/[0.03] px-4 py-3 text-[14px] text-ink placeholder:text-ink-muted/60 transition-colors focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30';

  return (
    <section
      id="cta"
      className="relative z-10 mx-auto w-[min(calc(100%-32px),1240px)] px-2 py-[clamp(80px,12vw,160px)]"
    >
      <Reveal>
        <div className="rounded-[24px] border border-line bg-white/[0.03] p-8 md:p-14">
          <SectionHeader
            eyebrow={eyebrow}
            heading={
              <>
                {headingBefore}
                <em className="not-italic font-display italic text-gold">{headingEmphasis}</em>
                {headingAfter}
              </>
            }
            sub={sub}
          />

          <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-5">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <label className="flex flex-col gap-2">
                <span className="text-[11px] uppercase tracking-[0.2em] text-gold">Nome</span>
                <input
                  type="text"
                  name="nome"
                  placeholder="Seu nome"
                  required
                  className={field}
                  value={form.nome}
                  onChange={(e) => setForm({ ...form, nome: e.target.value })}
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-[11px] uppercase tracking-[0.2em] text-gold">Email</span>
                <input
                  type="email"
                  name="email"
                  placeholder="voce@email.com"
                  required
                  className={field}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-[11px] uppercase tracking-[0.2em] text-gold">Modalidade</span>
                <input
                  type="text"
                  name="modalidade"
                  placeholder="Boxe, MMA, Muay Thai..."
                  required
                  className={field}
                  value={form.modalidade}
                  onChange={(e) => setForm({ ...form, modalidade: e.target.value })}
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-[11px] uppercase tracking-[0.2em] text-gold">Rotina de treino</span>
                <select
                  name="rotina"
                  required
                  className={field}
                  value={form.rotina}
                  onChange={(e) => setForm({ ...form, rotina: e.target.value })}
                >
                  <option value="">Selecione</option>
                  <option value="Treino em casa">Treino em casa</option>
                  <option value="Academia ou CT">Academia ou CT</option>
                  <option value="Misto">Misto</option>
                </select>
              </label>
            </div>
            <label className="flex flex-col gap-2">
              <span className="text-[11px] uppercase tracking-[0.2em] text-gold">
                O que você quer melhorar?
              </span>
              <textarea
                name="objetivo"
                rows={4}
                required
                placeholder="Ex.: voltar a treinar com consistência, organizar sessões curtas, melhorar condicionamento..."
                className={field}
                value={form.objetivo}
                onChange={(e) => setForm({ ...form, objetivo: e.target.value })}
              />
            </label>
            <div className="flex flex-wrap items-center gap-3">
              <Button>Entrar na waitlist</Button>
              <Button href={fallbackContact.href} variant="secondary">
                {fallbackContact.label}
              </Button>
            </div>
            <p className="text-[12px] text-ink-muted/70">
              O envio abre seu cliente de email com assunto e mensagem prontos.
            </p>
          </form>
        </div>
      </Reveal>
    </section>
  );
}
```

- [ ] **Step 2: Verify type-check**

```bash
pnpm tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/sections/Cta.tsx
git commit -m "feat(sections): CTA with waitlist form (mailto submission)"
```

---

### Task 21: Footer section

**Files:**
- Create: `components/sections/Footer.tsx`

- [ ] **Step 1: Create Footer**

```tsx
// components/sections/Footer.tsx
import { content } from '@/lib/content';

export function Footer() {
  const { brand, tagline, copyright } = content.footer;
  return (
    <footer className="relative z-10 mx-auto mt-20 flex w-[min(calc(100%-32px),1240px)] flex-col items-start justify-between gap-4 border-t border-line py-8 md:flex-row md:items-center">
      <span className="font-display text-[15px] font-semibold tracking-wide text-ink">{brand}</span>
      <div className="flex flex-col gap-1 text-[12px] text-ink-muted md:flex-row md:gap-6">
        <span>{tagline}</span>
        <span>{copyright}</span>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Verify type-check**

```bash
pnpm tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/sections/Footer.tsx
git commit -m "feat(sections): minimal Footer"
```

---

### Task 22: Compose landing in app/page.tsx

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Replace page.tsx with full composition**

```tsx
// app/page.tsx
import { Header } from '@/components/sections/Header';
import { Hero } from '@/components/sections/Hero';
import { Prova } from '@/components/sections/Prova';
import { ComoFunciona } from '@/components/sections/ComoFunciona';
import { Diferenciais } from '@/components/sections/Diferenciais';
import { Faq } from '@/components/sections/Faq';
import { Cta } from '@/components/sections/Cta';
import { Footer } from '@/components/sections/Footer';

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Prova />
        <ComoFunciona />
        <Diferenciais />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Run dev server and visually check**

```bash
pnpm dev
```

Open `http://localhost:3000`. Walk through all 8 sections:
- Hero has giant headline with italic gold "deixa de ser" line
- iPhone mockup visible on the right, rotated ~6°, with drop shadow + gold glow
- Scroll reveals trigger on every section as you scroll
- Nav in header works (click "FAQ" → scrolls to FAQ)
- FAQ accordion expands/collapses
- Form fields are styled with gold focus ring
- Footer appears at bottom

Stop with `Ctrl+C`.

- [ ] **Step 3: Run production build**

```bash
pnpm build
```

Expected: build succeeds, `/out` contains `index.html` and all assets prefixed with `/kyron-landing/`.

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx
git commit -m "feat(page): compose all 8 sections in landing root"
```

---

## Phase 4: Deploy + Cleanup

### Task 23: robots.txt and sitemap

**Files:**
- Create: `app/robots.ts`
- Create: `app/sitemap.ts`

- [ ] **Step 1: Create robots.ts**

```ts
// app/robots.ts
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
  };
}
```

- [ ] **Step 2: Create sitemap.ts**

```ts
// app/sitemap.ts
import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const base = `https://kyron-landing.example${basePath}`;
  return [
    {
      url: `${base}/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
```

> Note: the host `kyron-landing.example` is a placeholder — replace with the real GitHub Pages URL once known (e.g. `https://<user>.github.io/kyron-landing`). Do **not** leave it as `example` in production.

- [ ] **Step 3: Verify build**

```bash
pnpm build
```

Expected: build succeeds, `/out/robots.txt` and `/out/sitemap.xml` exist.

- [ ] **Step 4: Commit**

```bash
git add app/robots.ts app/sitemap.ts
git commit -m "feat(seo): add robots.txt and sitemap.xml"
```

---

### Task 24: GitHub Actions deploy workflow

**Files:**
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1: Create the workflow file**

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v4
        with:
          version: 9

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Type check
        run: pnpm tsc --noEmit

      - name: Lint
        run: pnpm lint

      - name: Build
        run: pnpm build

      - name: Disable Jekyll
        run: touch out/.nojekyll

      - name: Deploy to gh-pages
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
          publish_branch: gh-pages
```

- [ ] **Step 2: Verify the workflow syntax locally**

```bash
cat .github/workflows/deploy.yml
```

Expected: file is valid YAML (indentation consistent, no tabs).

- [ ] **Step 3: Commit**

```bash
git add .github/workflows/deploy.yml
git commit -m "ci: add github pages deploy workflow"
```

---

### Task 25: Delete legacy files and update README

**Files:**
- Delete: `index.html`, `styles.css`, `script.js`, `assets/`, `iphone16-home.png`, `iphone16-midhero.png`
- Modify: `README.md`

- [ ] **Step 1: Delete legacy files**

```bash
git rm index.html styles.css script.js
git rm -r assets
rm iphone16-home.png iphone16-midhero.png
```

> The 2 source PNGs at root (`iphone16-home.png`, `iphone16-midhero.png`) aren't tracked in git — they existed for local use by `optimize-images.mjs`. Remove from disk only.

- [ ] **Step 2: Rewrite README.md**

Replace contents with:

```markdown
# kyron-landing

Landing page do Kyron construída com Next.js 15 + TypeScript + Tailwind v4.

## Stack
- Next.js 15 (App Router, static export)
- TypeScript (strict)
- Tailwind CSS v4
- Framer Motion (via LazyMotion)
- next/font (Fraunces + Inter self-hosted)
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
```

- [ ] **Step 3: Verify build still succeeds after cleanup**

```bash
pnpm build
```

Expected: success.

- [ ] **Step 4: Commit**

```bash
git add README.md
git commit -m "chore: remove legacy html/css/js and refresh readme"
```

---

### Task 26: Manual verification checklist

**Files:** none.

- [ ] **Step 1: Visual check at each breakpoint**

Start dev server:

```bash
pnpm dev
```

Use browser devtools to test:
- **375px (mobile):** Header shows only logo + hamburger. Clicking hamburger opens fullscreen drawer. Hero is stacked (text above phone). All sections stack vertically. Form fields stack.
- **768px (tablet):** Header still mobile-style (since nav uses `md:flex`, check that md breakpoint). Adjust if awkward.
- **1280px (desktop):** Header shows inline nav. Hero is asymmetric (text left, phone absolute right, rotated). 3-column grids in Prova and ComoFunciona.
- **1920px:** Content is centered at max 1240px.

- [ ] **Step 2: Interaction check**

- Click every nav link → scrolls smoothly to section
- Click every FAQ item → expands, aria-expanded toggles, another click collapses
- Fill the form, submit → opens mailto with correct prefilled body
- Hover over every button and card → see transitions
- Tab through the page → every interactive element has visible gold focus ring
- Press Escape with mobile menu open → menu closes

- [ ] **Step 3: Reduced motion check**

DevTools → Rendering → Emulate CSS media feature `prefers-reduced-motion: reduce`. Reload. Verify:
- No scroll reveal animations (content appears immediately)
- No hero entrance animation
- Mobile menu still works (opens/closes without fade)
- FAQ accordion still expands (instantly or with minimal animation)

- [ ] **Step 4: Keyboard-only check**

Close mouse, use only `Tab`, `Shift+Tab`, `Enter`, `Space`, `Escape`:
- Can reach every interactive element
- Can open mobile menu
- Can navigate inside mobile menu
- Can open and close FAQ items
- Can submit form

- [ ] **Step 5: Lighthouse audit**

```bash
pnpm build
pnpm exec serve out -l 3000
```

Open Chrome → DevTools → Lighthouse → Run for Mobile.
Expected: all 4 scores ≥ 95.

If Performance < 95, check:
- Images not being served (basePath issue?)
- Font weights being over-requested
- Framer Motion full bundle imported (should be `m` + `LazyMotion`)

If Accessibility < 100, check:
- Missing alt attributes
- Contrast issues
- Form labels

Stop `serve` with `Ctrl+C`.

- [ ] **Step 6: Cross-browser spot check**

Open the built site in at least Chrome and Safari (macOS). Check:
- Fonts render identically
- Phone mockup rotation is clean
- Gradients + grid background visible
- No horizontal scroll on mobile

- [ ] **Step 7: Final commit (if any fixes needed)**

If the verification above uncovered fixes, commit them individually with clear messages. Otherwise:

```bash
git log --oneline -20
```

Review the commit history — it should read as a clean migration story.

- [ ] **Step 8: Push and watch the deploy**

```bash
git push origin dev
```

(The deploy workflow runs on `main` pushes. When ready, merge `dev` → `main` and the site should deploy to `https://<user>.github.io/kyron-landing/` within ~2 minutes.)

---

## Self-Review

**Spec coverage:**

| Spec section | Task(s) |
|---|---|
| §2.1 Stack | Task 2 (bootstrap), Task 11 (framer-motion wiring) |
| §2.2 Deploy config | Task 3 (next.config.ts), Task 24 (GH Actions) |
| §3 Project structure | Tasks 2, 6, 7–22 (all create the structure incrementally) |
| §4.1 Palette | Task 6 (@theme tokens) |
| §4.2 Typography | Task 5 (fonts), Task 6 (utilities) |
| §4.3 Layout/grid | Task 6 (container token), sections set their own padding |
| §4.4 Recurring elements | Task 7 (Button), Task 8 (Eyebrow), Task 9 (SectionHeader), Task 10 (PhoneMockup) |
| §4.5 Animations | Task 11 (Reveal), Task 12 (Stagger), Task 15 (Hero entrance) |
| §5.1 Hero | Task 15 |
| §5.2 Prova | Task 16 |
| §5.3 ComoFunciona | Task 17 |
| §5.4 Diferenciais | Task 18 |
| §5.5 FAQ | Task 19 |
| §5.6 CTA | Task 20 |
| §5.7 Footer | Task 21 |
| §5.8 Header | Task 14 |
| §6 Performance | Task 4 (image optimization), Task 11 (LazyMotion), Task 26 step 5 (Lighthouse) |
| §7 Accessibility | Tasks 7, 14, 19 (ARIA), Task 26 steps 2–4 (verification) |
| §8 SEO | Task 5 (metadata), Task 23 (robots/sitemap) |
| §9 Testing | Task 26 (manual verification) |
| §10 Deploy pipeline | Task 24 |
| §11 Risks mitigated | Task 1 (legacy branch), Task 3 (basePath), Task 4 (image dedup), Task 11 (LazyMotion) |
| §12 Acceptance criteria | Verified in Task 26 |

All spec sections mapped to concrete tasks.

**Placeholder scan:** Cleaned. One flagged note: Task 23 uses `kyron-landing.example` as a sitemap host placeholder, with an explicit instruction to replace before production. Acceptable because it's called out.

**Type consistency:** `Button`, `Eyebrow`, `SectionHeader`, `PhoneMockup`, `Reveal`, `Stagger`/`StaggerItem`, `content` all referenced with matching names across tasks.
