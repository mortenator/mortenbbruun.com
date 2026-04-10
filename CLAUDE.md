# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
npm run dev          # Start dev server with Turbopack (localhost:3000)
npm run build        # Production build with Turbopack
npm start            # Start production server
```

There are no test or lint commands configured.

## Architecture

**Stack**: Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS v4 + MDX

**Homepage** (`app/page.tsx`): A React component with numbered sections (01-05) and a 2-column card grid layout. Not MDX — uses custom `SectionHeader` and `CardGrid` components defined inline.

**Blog posts**: MDX files at `app/blog/[slug]/page.mdx`. Adding a new post means creating a directory under `app/blog/` with a `page.mdx` file — routing is automatic. Each post exports `metadata` with `title`, `description`, and `alternates.canonical`. Also add the post to the `CardGrid` in the Writing section of `app/page.tsx`.

**Blog layout** (`app/blog/layout.tsx`): Wraps all blog content in `<article className="space-y-6">` for vertical rhythm between paragraphs, headings, and other block elements. No `@tailwindcss/typography` prose plugin — spacing comes from this parent wrapper, following the leerob.io pattern.

**MDX configuration**: Uses the experimental Rust-based MDX compiler (`mdxRs` with `gfm` type in next.config.ts). This means rehype/remark plugins are NOT supported. Component styling is in `mdx-components.tsx`. Code highlighting uses `sugar-high`.

## Design System

**Fonts** (loaded via `next/font/google` in layout.tsx):
- DM Sans (`font-sans`) — body text
- Instrument Serif (`font-serif`) — hero heading, logo
- JetBrains Mono (`font-mono`) — section labels, badges, code

**Theming**: CSS custom properties defined in `globals.css` (`:root` for light, `.dark` for dark) mapped to Tailwind via `@theme` block. Use semantic classes like `bg-background`, `text-foreground`, `text-muted-foreground`, `border-border`.

**Dark mode**: `next-themes` with `attribute="class"` and `defaultTheme="dark"`. Tailwind dark variant: `@custom-variant dark (&:where(.dark, .dark *))`.

## Key Files

- `app/layout.tsx` — Root layout, header (sticky with social icons), footer, font loading, metadata
- `app/page.tsx` — Homepage with all sections and card data (SectionHeader, CardGrid defined inline)
- `app/blog/layout.tsx` — Blog article wrapper with `space-y-6` vertical rhythm
- `app/globals.css` — Design tokens, Tailwind v4 `@theme`, base styles, syntax highlighting colors
- `app/providers.tsx` — ThemeProvider wrapper (client component)
- `app/theme-toggle.tsx` — Sun/moon toggle (client component, hydration-safe)
- `mdx-components.tsx` — Styled MDX primitives (headings, links, code blocks, etc.)
- `app/sitemap.ts` — Auto-generated sitemap from blog directory
- `next.config.ts` — MDX setup, optional Postgres redirects, Rust MDX compiler

## Deployment

Deployed on Vercel. Pushing to `main` triggers automatic deployment to mortenbbruun.com. Vercel Analytics is integrated.

## Gotchas

- After changing CSS variables or `@theme`, you may need to clear `.next/` and restart the dev server for Turbopack to pick up changes correctly.
- The Postgres redirects feature in next.config.ts requires a `POSTGRES_URL` env var; without it, redirects are silently skipped.
- Framer Motion is installed but not yet used.

## gstack

For all web browsing, use the `/browse` skill from gstack. **NEVER use `mcp__claude-in-chrome__*` tools** — they are slow, unreliable, and superseded by gstack's headless browser.

Available skills:

| Skill | Purpose |
|-------|---------|
| `/office-hours` | YC Office Hours — startup diagnostic + builder brainstorm |
| `/plan-ceo-review` | CEO-perspective plan review |
| `/plan-eng-review` | Engineering plan review |
| `/plan-design-review` | Design audit (report only) |
| `/plan-devex-review` | Developer experience review |
| `/design-consultation` | Design system from scratch |
| `/design-shotgun` | Visual design exploration |
| `/design-html` | HTML design artifacts |
| `/design-review` | Design audit + fix loop |
| `/review` | PR review |
| `/ship` | Ship workflow |
| `/land-and-deploy` | Merge, deploy, and canary verify |
| `/canary` | Post-deploy monitoring loop |
| `/benchmark` | Performance regression detection |
| `/browse` | Headless browser for QA, testing, and web interaction |
| `/connect-chrome` | Launch GStack Browser (alias for /open-gstack-browser) |
| `/qa` | QA testing with fixes |
| `/qa-only` | QA testing (report only, no fixes) |
| `/setup-browser-cookies` | Configure browser cookies |
| `/setup-deploy` | One-time deploy config |
| `/retro` | Retrospective |
| `/investigate` | Systematic root-cause debugging |
| `/document-release` | Post-ship doc updates |
| `/codex` | Multi-AI second opinion via OpenAI Codex CLI |
| `/cso` | OWASP Top 10 + STRIDE security audit |
| `/autoplan` | Auto-review pipeline (CEO + design + eng) |
| `/devex-review` | Developer experience review + fixes |
| `/careful` | Extra-careful mode |
| `/freeze` | Freeze changes |
| `/guard` | Guard mode |
| `/unfreeze` | Unfreeze changes |
| `/gstack-upgrade` | Upgrade gstack |
| `/learn` | Capture learnings |

