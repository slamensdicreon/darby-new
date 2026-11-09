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
| `/personal-care` | Division: RSPO panel; catalog shows a request state until products are supplied | added on client feedback |
| `/contact` | Direct lines, inquiry form, network map, warehouses and offices | `contact.html` |
| `/privacy-policy` | Legal page (draft, see below) | not designed; follows the system |
| 404 | Not-found page | not designed; follows the system |

Also: `sitemap.xml`, `robots.txt`, Organization JSON-LD, a favicon (`src/app/icon.svg`) and an Apple touch icon.

## Titles, descriptions and share images

Every page builds its metadata with `pageMetadata()` in `src/lib/seo.ts`: title, description, canonical URL, Open Graph and Twitter tags, and a 1200×630 share image with alt text. Use the helper for any new page, because Next.js replaces a parent's `openGraph` object instead of merging it.

| Page | Title | Share image |
|---|---|---|
| Home | Darby \| Palm fats for feed and food | `public/og/darby-home.jpg` |
| Animal Nutrition | Animal Nutrition \| Darby | `public/og/darby-animal-nutrition.jpg` |
| Food Ingredients | Food Ingredients \| Darby | `public/og/darby-food-ingredients.jpg` |
| Contact | Contact \| Darby | `public/og/darby-contact.jpg` |
| Privacy policy | Privacy policy \| Darby | home image |

Titles and descriptions follow the build spec, except Home's description, shortened from 182 to 150 characters so search results show it in full. The share images are rendered from `scripts/og/template.html`; after changing their copy, imagery or the product counts on them, run `node scripts/og/generate.cjs` (needs Playwright with Chromium). Check a deployed URL with a share debugger, such as LinkedIn's Post Inspector, before announcing the site.

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
- **Catalog.** Category counts are computed from `products.json`, never typed in. A division with no products (Personal Care today) shows a specifications-on-request state instead of a grid; adding products with `"division": "Personal Care"` turns the catalog on.
- **Network map** (`src/components/NetworkMap.tsx`) is an inline SVG built from `src/data/map.json`, generated by `node scripts/map/generate.cjs` from Natural Earth land data. Locations, label positions and the crop live in that script. Filters are `aria-pressed` buttons; `?category=bakery` deep-links to a filter. Each card has an anchor (`/food-ingredients#rcno`). When a product gets a `spec_sheet` path, its card links straight to the PDF.
- **Hero film.** Chosen by script: 960px file at ≤900px wide, 1600px above. Not loaded under reduced motion, Save-Data, or without H.264. The poster is preloaded and is the LCP element.
- **Images** go through `next/image` (AVIF/WebP, `srcset`, lazy below the fold, no layout shift).
- **Font.** Hanken Grotesk variable, self-hosted with `next/font/local` (SIL OFL; licence in `src/app/fonts/OFL.txt`). It has no subscript glyphs, so K₂CO₃ is rendered with `<sub>`.

## Forms

Both forms validate in the browser exactly as the prototype does, then post to API routes that validate again, drop honeypot submissions and rate-limit by IP (5 per 10 minutes per instance).

| Form | Route | Sends |
|---|---|---|
| Contact | `POST /api/contact` | interests (one or more of the three divisions), name, company, phone, email, message, wants specifications |
| Spec request | `POST /api/specs` | name, email, division, product (if picked from a card), marketing opt-in |

### Email notifications

Each submission sends a branded email through [Resend](https://resend.com) (`src/lib/email.ts`, templates in `src/lib/email-templates.ts`): a contextual subject and title, the division(s) and product as chips, every field the visitor entered, the time (Eastern) and the page, and a reply button. The visitor's address is set as reply-to, so replying from the inbox answers them directly.

Set these in Vercel (Settings → Environment Variables), then redeploy:

| Variable | Value |
|---|---|
| `RESEND_API_KEY` | From resend.com → API Keys. Required; without it, submissions are only written to the function logs. |
| `MAIL_TO` | `stevelamensdorf@gmail.com` while testing, then `info@darbyinc.com`. Comma-separate for several. |
| `MAIL_FROM` | Leave unset until `darbyinc.com` is verified as a domain in Resend (DNS records they provide). Unverified accounts can send only from Resend's onboarding address and only to the account owner's own email. After verifying: `Darby Website <website@darbyinc.com>`. |

Optional: `CONTACT_WEBHOOK_URL` and `SPEC_WEBHOOK_URL` also POST each submission as JSON (Zapier, Make, a CRM). When both email and a webhook are configured, the form confirms only if every route succeeds. The in-memory rate limiter is per server instance; use a shared store if stricter limits are needed.

To preview the templates without sending: `node scripts/email/preview.cjs` writes both emails to `/tmp` as HTML.

## Redirects from the WordPress site

`next.config.ts` holds 301s mapped from the live site's sitemaps and REST API: every page, category and all 24 product posts (each lands on its product card). Trailing-slash URLs redirect in one hop.

## Richer pages (November 2026)

The client asked for a more feature- and visual-rich site, referencing waxianinternational.com. Added, all from Darby's own content:
- Home: stats strip with counting numbers; numbered division rows; "From the catalog" product carousel; four-step delivery process with line icons; Why Darby as icon tiles; "Where we are" with the network map and region toggles; certifications strip; common-questions accordion.
- Division pages: a product close-up under the brand shade behind the hero.
- Reveal-on-scroll motion on sections (`data-reveal`, `src/components/Reveal.tsx`), which the handover's design system had ruled out; it is off under `prefers-reduced-motion` and without JavaScript.
- Deliberately not copied: stock photography, claimed figures that Darby has not supplied, a blog, logo walls and third-party feeds.

## Client feedback round 1 (November 2026)

Applied:
- Third division, **Personal Care**, in the header, footer, home page, hero buttons, sitemap and share images, with its own page. Product list still to come (see below).
- Home headline is now "Palm-based ingredients for feed, food and personal care." (was "Palm, refined for feed and food."); the supply section headline is "Animal nutrition, food ingredients and personal care." (was "Two divisions. One palm supply chain."). Site title and descriptions updated to match.
- "Explore N products" buttons replaced by "Explore {division}". Product counts were later removed everywhere: per-category counts, the totals on the home page, the Food Ingredients hero panel and the share images. The catalog's "Showing N products" line is now read only by screen readers when a filter changes.
- "Palm specialist" removed everywhere: contact headlines, division buttons, the hero eyebrow, the 1992 proof item, form confirmation and metadata.
- Main line +1 914 701 0003 removed. Three direct lines added on the contact page, footer, phone menu, home contact prompt, structured data and the contact share image: Sales, Ryan Fales, +1 914 557 0517 · Operations, Michael Fales, +1 914 774 1660 · Finance, Corey Rinker, +1 914 419 3993.
- Network map on the contact page: stars for the six warehouses, the Armonk headquarters and the Thailand office, with the equator and the Malaysian and Indonesian origin marked.

After reviewing the reference sites the client sent (Waxian, Global Agri-Trade, Perdue Animal Nutrition):
- **Product detail.** Each Food Ingredients card now carries a composition line and certification chips (Halal, FSSC 22000, ISO 9001:2015), taken from the product pages on the current darbyinc.com (`composition` and `certifications` in `products.json`). Animal Nutrition products have no such data on the current site; add the fields when Darby supplies them.
- **"Who we supply"** band on the home page, naming the customer types for each division.
- **Sales line in the header** on screens 1200px and wider.
- **Product cards have no outline.** The prototype's 1px card border (14%, darkening to 32% on hover) read as a dark frame around the images on desktop, so it is removed; the hover image zoom remains.
- **Sticky header.** The header stays at the top on scroll, with a soft shadow once scrolled; anchor links land below it.
- **Contact form covers all three divisions.** "I'm interested in" is a choose-one-or-more set of Animal Nutrition, Food Ingredients and Personal Care (replacing "Both divisions"); at least one is required. "Contact the team" on a division page pre-selects that division via `/contact?interest=…`.
- **Image edges trimmed.** Every handover product image had 3 black pixel columns on the left and 2 on the right, which showed as a hairline border on the site (and in the prototype). All 23 were trimmed and re-encoded at 1200×900. Product image URLs carry `?v=N` (`PRODUCT_IMAGE_VERSION` in `src/lib/products.ts`); bump it whenever image files change in place, so Vercel's image cache refreshes.
- **Personal Care products** (Darby IPM, Darby IPP, Darby MCT) added from the client's product information, with two generated placeholder images to the design-system brief (close-up liquid, no containers) and the existing MCT image reused. Approval needed, as for the other 23.
- **Eyebrow labels removed** wherever they only restated the heading beneath them (hero, section intros, catalog, spec form, warehouses, share images). Labels that carry information stay: card categories and certifications, the Sales/Email/Visit field labels, the coast and office groups, the C16 and RSPO panel titles.

Still needed from Darby:
- **Personal Care images:** approve the two generated placeholders (IPM, IPP) or replace them with photography. Certifications for the three Personal Care products, if any.
- **Thailand office:** city and address. The map star is on Bangkok as a placeholder.
- Confirm the new headlines, the Personal Care wording and the "Who we supply" customer types.
- Composition and certifications for the ten Animal Nutrition products, and which certifications apply to which plants, for a certifications line on the division pages.
- A paragraph of company history for a proper About page (currently an anchor to the proof band).

## Changes from the prototype (from the spec and open items)

- **Phone header** (≤760px): logo, Contact and a menu button that opens the three links plus phone and email. Below 360px, Contact moves into the menu.
- **Phone layout** (≤760px; tablet and desktop are untouched): tighter section spacing, division heroes sized to their content, full-width buttons, catalog filters on one swipeable row, compact list-style product cards below 568px, an edge-to-edge contact form, and 44px tap areas on phone and email links. Hover zoom only runs on devices that can hover.
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
