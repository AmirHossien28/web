# Aladdin DXP — Design System

A token-first system for a Persian-first (RTL) enterprise web platform. One
source of truth for colour, type, spacing, motion and interaction rules; the
interface is assembled from it rather than styled page by page.

The living version of this document is the **`/design-system`** page inside the
product, which renders every token and component below with the real
implementation.

---

## 1. Principles

| Principle | What it means in practice |
| --- | --- |
| **Rhythm over decoration** | A 4px base unit and an 8px layout rhythm. No arbitrary spacing, no gradients used as decoration, no drop shadows except to signal layering. |
| **One accent, real emphasis** | A single brand hue carries every primary action. Other hues are reserved for data and status and are never decorative. |
| **Hairlines before boxes** | Structure comes from 1px borders and background shifts, which keeps dense pages calm and print-like. |
| **Evidence next to claims** | Numbers (speed, uptime, response time, price) sit beside the assertion they support, at the same hierarchy level. |
| **Accessibility is a token property** | Contrast, focus appearance and target size are encoded in tokens and primitives, not audited at the end. |

## 2. Token architecture

Three layers, referenced in one direction only:

```
primitive  →  raw value, named for what it is        --ds-primitive-ink-900
semantic   →  role, named for what it does           --ds-color-text-primary
component  →  bound to one component (only if needed) --ds-btn-…
```

**Naming grammar:** `--ds-{layer}-{category}-{role}-{variant}-{state}`, kebab-case,
general → specific, one delimiter.

Rules enforced by `src/design-system/tokens.css`:

1. Components never read primitives — only semantic tokens.
2. No appearance words in the semantic layer (`--ds-color-text-primary`, never `--ds-color-blue`).
3. A new component token is added only when a component genuinely diverges from the system.
4. Number scales leave headroom (`100…900`) so values can be inserted without renaming neighbours.
5. Every semantic text/surface pair documents its measured contrast ratio.

## 3. Colour

| Group | Tokens | Notes |
| --- | --- | --- |
| Surfaces | `bg-canvas`, `bg-surface`, `bg-raised`, `bg-subtle`, `bg-muted`, `bg-inset` | five quiet steps; page ground is never pure white |
| Text | `text-ink`, `text-ink-2`, `text-ink-3`, `text-ink-4` | light 14.6:1 / 7.4:1 / 4.8:1 · dark 16.2:1 / 9.6:1 / 5.9:1 · ink-4 non-text only |
| Brand | `bg-brand`, `bg-brand-hover`, `bg-brand-soft`, `text-brand-ink`, `text-on-brand` | exactly one accent — **electric blue** (`brand-600 #2563eb` on light, `brand-300 #93bbfd` as text on dark); cyan (`accent-cyan`) exists only as the second stop of `text-gradient-brand` |
| Atmosphere | `glass`, `glass-strong`, `bg-glow-brand`, `bg-glow-cyan`, `bg-grid-lines`, `glow-ring`, `code-decor`, `border-glass-line(-strong)` | the depth language of the product — see § 3.1 |
| Status | `success` / `warning` / `danger` / `info` (+ `-ink`, `-line` variants) | pairs of subtle surface + readable text |
| Data | `data-1 … data-4`, `data-track` | charts, meters, score bars |
| Deep band | `bg-deep`, `text-on-deep`, `text-on-deep-muted`, `text-on-deep-accent`, `border-deep-line` | a deliberately dark surface in **both** themes, used for the closing CTA |

Themes are one switch on `<html>` (`class="dark"`) re-pointing semantic tokens.
**Dark (deep navy `#050914`) is the brand default**; light is an explicit user choice persisted in `aladdin.theme`.
Components contain **zero** conditional theme logic. A band that must stay dark in both themes (the closing CTA) simply carries the `dark` class — its subtree re-scopes every token.

### 3.1 Atmosphere — grid, light, glass

The reference language (deep-navy tech agencies, glass language pickers) is expressed with three token-driven layers, never with images:

| Layer | Utility | Definition |
| --- | --- | --- |
| Grid | `bg-grid-lines` | 1px hairlines every 56px in `--ds-color-grid-line`, faded by a radial mask so the grid never touches the edges |
| Light | `bg-glow-brand`, `bg-glow-cyan` | radial gradients from the `--ds-glow-*` rgb triplets; always `blur-3xl`, always `aria-hidden`, at most two per section |
| Glass | `glass`, `glass-strong` | `--ds-color-bg-glass` + hairline `--ds-color-border-glass` + `backdrop-filter: blur(18/24px)` + a 1px inner top highlight. `Card` uses it by default; dialogs and menus use `glass-strong` (opaque enough for text) |
| Emphasis | `glow-ring`, `shadow-glow`, `text-gradient-brand` | reserved for device frames, the primary button and one highlighted phrase per heading |
| Decor | `code-decor` | faint monospace fragments (`</>`, `cloud.deploy()`) — hidden below `lg`, never localised, never read by AT |

Rules: glows never carry information; glass panels keep ≥ 3:1 border contrast against the canvas; `letter-spacing` in `ds-overline` applies only under `[dir=ltr]`.

## 4. Typography

- Family: **Vazirmatn** (Persian + Latin), **JetBrains Mono** for codes and Latin numerals in technical strings.
- `letter-spacing: 0` everywhere — the Persian script is connected and tracking breaks letter joining.
- Body line-height **1.8–1.85** (Latin defaults of 1.5 are too tight for Persian diacritics).
- Minimum body weight 400; `text-wrap: balance` on headings, `pretty` on paragraphs.

| Token | Size / line-height | Role |
| --- | --- | --- |
| `text-display-1` | 2.75rem / 1.25 | hero |
| `text-display-2` | 2.125rem / 1.3 | page title |
| `text-title-1…3` | 1.75 → 1.125rem | section, sub-section, card |
| `text-body-lg / body / body-sm` | 1.06 → 0.94rem | lead, body, UI text |
| `text-caption` | 0.8125rem / 1.7 | metadata |
| `text-overline` | 0.75rem / 1.6 | section labels (uppercase, tracking-free) |

## 5. Space, grid, radius

- Space scale: `4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128` px (`space-1 … space-32`).
- Section rhythm: `--ds-space-section-y` (72px) → 112px from `md` up.
- Grid: 4 columns (mobile) / 8 (tablet) / 12 (desktop); page gutter 16 → 24 → 40px.
- Containers: `container-page` (1248px) for layout, `prose` (736px) for long-form reading.
- Radius: 6 / 8 / 10 / 14 / 18 px — cards use 14px, controls 8px (10px for large controls).

## 6. Elevation & motion

- Elevation exists only to express layering: `shadow-xs` (raised card), `shadow-md` (dropdown), `shadow-xl` (overlay). No decorative shadows.
- Durations: 90ms (press) · 140ms (hover/border) · 200ms (panel/dialog entry) · 320ms (section entry).
- Easings: `standard` `cubic-bezier(0.2,0,0,1)`, `entrance` `cubic-bezier(0.3,0,0,1)`.
- `prefers-reduced-motion: reduce` disables all animation and smooth scrolling.

## 7. Components (`src/design-system/primitives.tsx`)

| Primitive | Contract |
| --- | --- |
| `Button` | tones × emphasis (solid/outline/ghost/link) × sizes (44/40/34px); `iconOnly` enforces a 44px square |
| `Badge` | pill or square metadata label, optional status dot |
| `Card` | one container: level (surface = glass / solid / subtle / inverse) × elevation × padding; interactive cards lift 2px and gain `shadow-glow` |
| `Section` | enforces page rhythm, container width and band colour |
| `SectionHeading` | the single section-header pattern (overline, title + brand highlight, description, actions) |
| `Stat` | numeric proof unit (value, label, hint) |
| `Field` | label + control + hint + error, with `aria-describedby` / `aria-invalid` wired by construction |
| `Meter` | accessible progress/score bar with `role="meter"` and a text value |
| `Disclosure` | accordion row with `aria-expanded` / `aria-controls` and a labelled region |
| `IconFrame` | consistent glyph container used across feature blocks |
| `LogoMark` / `Logo` | monogram in two tilted orbit rings; `mode="emblem"` animates the orbits (welcome gate) |
| `LanguageTile` / `LanguageModal` | the "Global experience" picker: flag + native name + English name · code, search by any of them, `aria-current` on the active locale |
| `DeviceShowcase` | CSS-drawn laptop / tablet / phone with truthful KPI screens and four product-line callouts |
| `WelcomeGate` | first-visit landing (emblem, brand line, five market tiles); shown once, re-openable with `?welcome` |

## 8. Accessibility contract (WCAG 2.2 AA)

- Text contrast ≥ 4.5:1 (≥ 3:1 for large text); non-text UI ≥ 3:1.
- One global focus policy: 2px `outline` in `border-focus` with a 2px offset.
- Interactive targets ≥ 44px (absolute minimum 24×24 with spacing).
- `scroll-padding-top` keeps focused elements clear of the sticky header (2.4.11).
- Every form control has a visible label; errors are announced with `role="alert"`.
- Colour never carries meaning alone — status is always paired with text or an icon.
- Dialogs trap focus, close on `Escape`, lock background scroll and expose `aria-modal`.

## 9. RTL and numerals

- Direction lives on `<html dir>` and is switched by locale; layout uses **logical** properties (`ms-`, `me-`, `ps-`, `pe-`, `start-`, `end-`) — never `left`/`right`.
- Persian/Arabic locales render localised digits (`۰۱۲۳` / `٠١٢٣`), Latin locales render ASCII digits.
- Money reads «۱۸٬۵۰۰٬۰۰۰ تومان»: unit after the number.
- Latin runs inside RTL text (phones, domains, codes) are isolated with `.ltr-isolate` (`direction: ltr` + `unicode-bidi: isolate`).
- Numeric table columns use `font-variant-numeric: tabular-nums`.

## 10. File map

```
src/design-system/
  tokens.css      primitives, semantic tokens (light/dark), Tailwind theme bridge,
                  base layer (focus, motion, typography), utilities
  tokens.ts       typed token API (space, radius, grid, motion, z-index) + number helpers
  primitives.tsx  the component primitives listed above
src/app/
  navigation.ts   information architecture, slugs, breadcrumbs, sitemap
  i18n.ts         chrome copy for 5 locales + page metadata + digit localisation
  homeCopy.ts     proof/process/testimonial copy
src/components/
  chrome/         utility bar, header + mega menu, footer, mobile nav, action bar, page header
  sections/       home page sections, each self-contained and data-driven
  views/          one file per page
  modals/         responsive preview, consultation request
  widgets/        assistant
```

## 11. Contributing rules

1. Never write a raw colour, font size or spacing value in a component — add a token or use an existing one.
2. Prefer `Section` + `SectionHeading` over bespoke `<section>` markup so the page rhythm cannot drift.
3. New UI copy goes through `src/app/i18n.ts` (chrome) or the relevant data module — never inline in a component, except for content that is intentionally Persian-only (service descriptions, case studies).
4. Check contrast and keyboard traversal before merging: tab through the page, Escape out of every overlay.
5. Keep the component surface small: extend `primitives.tsx` rather than creating parallel one-off components.
