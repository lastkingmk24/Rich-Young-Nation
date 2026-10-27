# RYN — Rich Young Nation

A production-ready storefront for **Rich Young Nation**, an independent Gen-Z streetwear label.
Built as a single-page React app with a fully client-side commerce flow — no backend required.

![RYN storefront](docs/hero.jpg)

**[→ See the full visual preview](docs/PREVIEW.md)**

## What's inside

| Area | Highlights |
| --- | --- |
| **Home** | Full-bleed editorial hero, featured collections, tabbed product grid, campaign/philosophy split, lookbook, review wall, newsletter capture |
| **Shop** | URL-synced filters (category, colour, size, price, sale, stock), 6 sort modes, active-filter chips, load-more, mobile filter sheet |
| **Product** | Colourway-driven gallery with hover zoom + lightbox, size selector with stock states, size guide, accordions, rating breakdown, review filters + write-a-review flow, related products |
| **Cart** | Slide-out drawer, free-shipping meter, promo codes, quantity controls, cross-sell rail, persistent state across reloads and tabs |
| **Checkout** | 3-step flow (contact → delivery → payment) with inline validation, ship/pickup, shipping methods, card/payment-method selection, sticky order summary |
| **Confirmation** | Order number, ETA, delivery recap, cross-sell |
| **Supporting** | Collections, lookbook, journal, about, help centre, wishlist, 404 |

## Stack

- **React 18** + **TypeScript** (strict)
- **Vite 6** with route-level code splitting
- **Tailwind CSS v4** (`@theme` design tokens, custom utilities)
- **React Router 6**
- Self-hosted typography via Fontsource — *Instrument Serif*, *Inter Tight*, *JetBrains Mono*
- No UI kit: every component is hand-built

## Design system

| Token | Value | Use |
| --- | --- | --- |
| `ink` | `#0B0B0C` | Primary text, dark surfaces |
| `paper` | `#F4F1EA` | Page background |
| `bone` | `#E9E3D7` | Image wells, quiet sections |
| `acid` | `#C9F24D` | Accent — CTAs, highlights |
| `berry` | `#7A2B3A` | Sale pricing, errors |

Type: `display` (Instrument Serif) for editorial headlines, `sans` (Inter Tight) for UI,
`mono` (JetBrains Mono) for labels, prices and metadata.

## State

- `CartContext` — reducer-backed cart persisted to `localStorage` (`ryn.cart.v1`), synced across tabs, with promo codes (`RYN10`, `GENZ15`, `FREESHIP`), tax and shipping rules
- `StoreContext` — wishlist (`ryn.wishlist.v1`), recently viewed, toast queue
- `CheckoutContext` — in-flight checkout form + generated order number

## Accessibility & motion

- Skip-to-content link, focus-visible rings, `aria-live` toasts, labelled icon buttons
- Drawers/modals: scroll lock, Escape to close, focus moved to the close affordance
- Scroll reveals are gated on a `.js` class so content can never be stranded invisible
- Full `prefers-reduced-motion` support

## Local development

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production bundle
npm run preview  # serve the production build
```

## Deploying

The build is a static SPA. Any host works — configure an SPA fallback to `index.html`
(`public/_redirects` for Netlify and `vercel.json` are included).

## Demo notes

Checkout is simulated: no payment is processed and no data leaves the browser.
Cart and wishlist live in `localStorage`. Product imagery is AI-generated editorial
photography created for this project.
