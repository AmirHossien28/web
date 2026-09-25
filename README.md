<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Aladdin DXP — پلتفرم مهندسی طراحی وب و دیزاین سیستم

A React 19 + Vite + Tailwind CSS v4 single-page marketing platform (Persian/RTL first,
5 locales) with a CMS simulator, pricing calculator, speed audit and design-system views.

## Run Locally

**Prerequisites:** Node.js 20+

1. Install dependencies:
   `npm install`
2. Start the dev server (binds to `0.0.0.0:3000`):
   `npm run dev`
3. Open http://localhost:3000

Optional: append `?lang=en|fa|ar|tr|de` to the URL to force a locale.

## Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Vite dev server on port 3000, exposed on all interfaces |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the production build |
| `npm run lint` | TypeScript type check (`tsc --noEmit`) |
| `npm run build:standalone` | Single self-contained HTML file in `standalone/` |
| `npm run verify:standalone` | Loads that file in jsdom and drives the app end to end |

## Project structure

```
index.html                 # Vite entry (RTL, dark theme, Vazirmatn font)
vite.config.ts             # React + Tailwind plugins, `@` -> repo root alias
src/
  main.tsx                 # React entry
  App.tsx                  # Page/locale/theme state machine + view routing
  types.ts                 # Shared domain types (ProjectItem, TemplateItem, ...)
  index.css                # Tailwind v4 import + base theme layers
  components/
    layout/                # TopBar, Header, Footer, MobileDrawer, MobileBottomBar
    views/                 # HomeView, PortfolioView, PricingCalculatorView, CmsSimulatorView, ...
    marketing/             # HeroSection, PricingSection, FaqSection, ... (home page sections)
    modals/                # PortfolioPreviewModal, QuickConsultModal
    widgets/               # ChatbotWidget
  data/                    # i18n, sectionsI18n, projects, services, templates, articles
```


## Design system

The interface is built from a token-first design system rather than page-level
styling. Full documentation lives in [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) and in
the product itself at `/design-system` (linked from the header menu).

```
src/design-system/
  tokens.css      primitives → semantic tokens (light + dark) → Tailwind theme bridge
  tokens.ts       typed token API (space, radius, grid, motion, z-index)
  primitives.tsx  Button, Badge, Card (glass by default), Section, SectionHeading, Stat, Field, Meter, Disclosure, IconFrame
src/app/          information architecture, i18n copy, page metadata
src/components/   chrome (header/footer/mobile nav) · sections (home) · views (pages) · modals · widgets
```

Key properties:

- **Three token layers** with one-way references; components read semantic tokens only.
- **Deep-navy dark theme by default**, light as an explicit choice — same class list, one `dark` class on `<html>`.
- **Atmosphere layer** (`bg-grid-lines`, `bg-glow-*`, `glass`, `text-gradient-brand`): the depth of the interface is built from tokens, not images.
- **Welcome gate + language dialog**: first visit lands on the emblem and the five market tiles (`?welcome=1` re-opens it); the header globe opens the searchable "Global experience" picker.
- **RTL-first**, logical CSS properties, localised digits for `fa`/`ar`, isolated Latin runs for phone numbers, domains and codes.
- **WCAG 2.2 AA** encoded in the tokens and primitives: 4.5:1 text contrast, 2px focus rings, 44px targets, focus never hidden behind the sticky header.
- **Persian typography** tuned for the script: Vazirmatn, `letter-spacing: 0`, body line-height 1.8–1.85.

## Viewing the site

The sandbox's public URLs require a traffic-access token, so an `*.e2b.app` link
cannot be opened directly from outside. Two supported ways to view the app:

1. **Live preview panel** — the running dev server is proxied by the platform,
   which injects the token; open the preview panel in the workspace UI.
2. **Single self-contained file** — build a standalone HTML file that runs from
   `file://` with no server and no install:

   ```bash
   npm run build:standalone      # → standalone/aladdin-dxp.html (~940 KB)
   npm run verify:standalone     # optional: needs `npm i -D jsdom`
   ```

   Download that file and open it in any browser (double-click).

Running it yourself locally also works: `npm install && npm run dev`.

This app is fully client-side; no API key or server is required to run it.
`env.example` documents the optional `GEMINI_API_KEY` / `APP_URL` variables used by the
original AI Studio deployment.
