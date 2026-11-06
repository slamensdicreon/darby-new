# darbyinc.com

The Darby Trading Inc. website, built in Next.js (App Router, TypeScript) from Icreon's design handover. The original handover package is kept in [`docs/handover/`](docs/handover/): build spec, design system, copy deck, tokens, product data and the HTML prototype (`prototype-src/`; its assets live in `public/assets/`).

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

Node 22 (see `.nvmrc`). Copy `.env.example` to `.env.local` to configure the site URL and form destinations.

## Deploy on Vercel

The repo deploys to Vercel with no extra configuration: Vercel detects Next.js, runs `npm install` and `next build`, and serves the API routes as functions. `main` is the production branch; other branches get preview deployments.

1. In Vercel, **Add New → Project**, import `slamensdicreon/darby-new`. Leave the framework (Next.js), build command and output directory on their defaults.
2. Under **Settings → Git**, confirm the production branch is `main`.
3. Under **Settings → Environment Variables**, add for Production (and Preview if wanted):

   | Variable | Value |
   |---|---|
   | `NEXT_PUBLIC_SITE_URL` | `https://darbyinc.com` once the domain is attached. Until then leave it unset and the `*.vercel.app` production domain is used for canonical URLs and the sitemap. |
   | `CONTACT_WEBHOOK_URL` | Where contact form submissions are POSTed as JSON |
   | `SPEC_WEBHOOK_URL` | Where spec requests are POSTed as JSON |

   Redeploy after changing them; `NEXT_PUBLIC_SITE_URL` is read at build time.
4. **Domain cutover:** under **Settings → Domains**, add `darbyinc.com` and `www.darbyinc.com` (redirect `www` to the apex), then update DNS at the registrar as Vercel instructs. The WordPress 301s in `next.config.ts` take effect as soon as DNS points at Vercel.

Notes:
- Preview deployments send `noindex` and a disallow-all `robots.txt`, so only production is indexed.
- Without webhook URLs, submissions appear only in the project's **Logs** (search for `[forms]`).
- Product and poster images use Vercel Image Optimization, which counts toward the plan's image quota. The hero film is served as a static file.

## Pages

| Route | Template | Source in the prototype |
|---|---|---|
| `/` | Home: hero film, two divisions, proof band (`#about`), contact prompt | `index.html` |
| `/animal-nutrition` | Division: C16 panel, 10 products in 3 categories | `animal-nutrition.html` |
| `/food-ingredients` | Division: category panel, 13 products in 4 categories | `food-ingredients.html` |
| `/contact` | Contact details, inquiry form, warehouse network | `contact.html` |
| `/privacy-policy` | Legal page (draft, see below) | not designed; follows the system |
| 404 | Not-found page | not designed; follows the system |

Also: `sitemap.xml`, `robots.txt`, Organization JSON-LD, per-page titles and descriptions from the build spec, and a favicon (`src/app/icon.svg`).

## How it is built

```
src/
  app/                  routes, API handlers, sitemap, robots, favicon, self-hosted font
  components/           Header, Footer, Wordmark, HeroFilm, ProductCatalog, SpecForm, ContactForm, DivisionPage, ui
  data/products.json    the 23-product catalog (from docs/handover/data, plus slug, sort_order, spec_sheet)
  lib/                  site details, catalog helpers, shared validation, server helpers
  styles/tokens.css     design tokens, copied from the handover (single source of design values)
  styles/globals.css    every style value from the prototype, as classes
public/assets/          hero film and poster, product images, wordmark SVGs
```

- **Fidelity.** Styles reproduce the prototype's values exactly (sizes, clamps, `svh` hero heights, gaps, colours). Screenshots of both, compared pixel by pixel at 1440×900 and 1366×657, match; the only differences are the additions listed below.
- **Catalog.** Category counts and "Explore N products" are computed from `products.json`, never typed in. Filters are `aria-pressed` buttons; `?category=bakery` deep-links to a filter. Each card has an anchor (`/food-ingredients#rcno`). When a product gets a `spec_sheet` path, its card links straight to the PDF.
- **Hero film.** Chosen by script: 960px file at ≤900px wide, 1600px above. Not loaded under reduced motion, Save-Data, or without H.264. The poster is preloaded and is the LCP element.
- **Images** go through `next/image` (AVIF/WebP, `srcset`, lazy below the fold, no layout shift).
- **Font.** Hanken Grotesk variable, self-hosted with `next/font/local` (SIL OFL; licence in `src/app/fonts/OFL.txt`). It has no subscript glyphs, so K₂CO₃ is rendered with `<sub>`.

## Forms

Both forms validate in the browser exactly as the prototype does, then post to API routes that validate again, drop honeypot submissions and rate-limit by IP (5 per 10 minutes per instance).

| Form | Route | Sends |
|---|---|---|
| Contact | `POST /api/contact` | interest, name, company, phone, email, message, wants specifications |
| Spec request | `POST /api/specs` | name, email, division, product (if picked from a card), marketing opt-in |

Set `CONTACT_WEBHOOK_URL` and `SPEC_WEBHOOK_URL` to receive each submission as a JSON POST (Zapier, Make, a CRM endpoint, etc.). Without them, submissions are logged on the server only. The in-memory rate limiter is per server instance; use a shared store if stricter limits are needed.

## Redirects from the WordPress site

`next.config.ts` holds 301s mapped from the live site's sitemaps and REST API: every page, category and all 24 product posts (each lands on its product card). Trailing-slash URLs redirect in one hop.

## Changes from the prototype (from the spec and open items)

- **Phone header** (≤760px): logo, Contact and a menu button that opens the three links. Below 375px, Contact moves into the menu.
- **Spec form consent** (open item #8): an explicit opt-in checkbox replaces "Submitting also subscribes this address…", and the note line links to the privacy policy.
- **Privacy link** in the footer legal line and under the contact form.
- **Hover states** on buttons and links (the prototype's inline styles suppressed them).
- **Card name size** stays at the prototype's 28px / 22px. The design system recommends one 24px size; change `nameSize` in the two division pages to adopt it.

## Before launch

From `docs/handover/05-open-items-and-qa.md`, still open:

1. Darby approves or replaces the 23 AI-generated product images.
2. Spec sheet PDFs: add each path to `spec_sheet` in `src/data/products.json`.
3. Distinct descriptions for DT98, DT100, ProFat 85 and Tri Fat 75.
4. Confirm marketing claims and RSPO wording.
5. Form destinations: set the two webhook URLs.
6. **Privacy policy:** `/privacy-policy` is a draft describing what this site actually does. Darby's counsel must review it.
7. Confirm the LinkedIn URL (`src/lib/site.ts`), trademark search, a proper favicon mark, and whether global offices should appear.
8. Real-device checks: iOS autoplay (Low Power Mode), screen readers, browsers.
