# darbyinc.com — website handover

Design handover for the Darby Trading Inc. website redesign, prepared by Icreon for the build team.

Darby is repositioning from a feed company to a palm company. The new site is deliberately small: four pages, two forms and a filterable product catalog. It aims to look enterprise-grade and minimal.

## Start here

1. **See the design:** open `prototype/index.html` in a browser. Every page and interaction works locally with no server or install. Filters, form validation and the hero film all run.
2. **Read the build specification:** `docs/01-build-spec.md` covers templates, components, content fields, behavior, integrations, accessibility, performance and SEO.
3. **Check open items before estimating:** `docs/05-open-items-and-qa.md` lists what Darby still has to supply and what blocks launch.

## Contents

```
darby-website-handover/
├── README.md                     this file
├── prototype/                    working HTML reference (open index.html)
│   ├── index.html                Home
│   ├── animal-nutrition.html     Animal Nutrition (10 products)
│   ├── food-ingredients.html     Food Ingredients (13 products)
│   ├── contact.html              Contact
│   └── assets/
│       ├── video/                hero film: 1600 and 960 MP4, plus poster
│       ├── products/             23 product images: 1200×900 WebP
│       └── brand/                Equator Line wordmark SVGs, one per background
├── docs/
│   ├── 01-build-spec.md          what to build and how it behaves
│   ├── 02-design-system.md       color, type, layout, imagery, motion
│   ├── 03-copy-deck.md           every line of copy, by page
│   ├── 04-assets-and-licensing.md   asset sources, rights and approvals
│   └── 05-open-items-and-qa.md   client inputs, build decisions, QA checklist
├── data/
│   ├── products.json             product catalog (23 products) with image paths and approval status
│   └── products.csv              same data for spreadsheets or CMS import
├── tokens/
│   ├── tokens.css                design tokens as CSS variables
│   └── tokens.json               same tokens as JSON
└── screenshots/                  every page at desktop (1440), laptop fold (1366×657) and phone (390)
```

## About the prototype

The prototype is a reference, not production code. Styles are inline, and the scripts are small and framework-free so the behavior is easy to read. Rebuild it as components on the chosen platform, using `tokens/tokens.css` as the single source of design values.

## Key decisions already made

- **Brand:** Equator Line wordmark; Frond and Olein palette; Hanken Grotesk only.
- **Hero:** a real, calm palm film behind the headline, looping seamlessly. A tested shade keeps text readable over every frame.
- **Above the fold:** on common laptops the header and hero fill the screen exactly; on large monitors the hero is capped.
- **Catalog:** four products across on desktop, filter by category, close-up product images with no circles.
- **Home:** two divisions as open image-and-text rows, three proof points (RSPO, six ports, since 1992), contact prompt.
- **Contact:** a dedicated page with direct details, a validated inquiry form and the warehouse network.

## Before launch (summary)

- **Images:** Darby approves or replaces the 23 AI-generated product images.
- **Product content:** spec sheets and distinct product descriptions.
- **Claims:** confirm the RSPO wording and marketing claims.
- **Forms and legal:** form destinations, privacy policy, and opt-in consent on the spec form.
- **Build tasks:** phone menu toggle, 301 redirects from the current WordPress site, and a trademark search for the wordmark.

Details and owners are in `docs/05-open-items-and-qa.md`.

## Contact details used on the site

Darby Trading Inc., 6 Maple Ave, Armonk, NY 10504 · +1 914 701 0003 · info@darbyinc.com · RSPO Member 2-1713-26-000-00
