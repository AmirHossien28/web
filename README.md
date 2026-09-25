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

This app is fully client-side; no API key or server is required to run it.
`env.example` documents the optional `GEMINI_API_KEY` / `APP_URL` variables used by the
original AI Studio deployment.
