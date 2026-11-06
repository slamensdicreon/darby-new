# Darby website — build specification

This document describes what to build for darbyinc.com. The prototype in `/prototype` is the visual and behavioral reference; this document is the specification. Where they differ, raise it before building.

Darby is a small business and the site needs little functionality: four page templates, two forms and a filterable product catalog. Keep the build light.

---

## 1. Scope

### Pages and templates

| Page | Prototype file | Template | Notes |
|---|---|---|---|
| Home | `index.html` | Home | Hero film, two divisions, proof points, contact prompt |
| Animal Nutrition | `animal-nutrition.html` | Division | 10 products, 3 categories |
| Food Ingredients | `food-ingredients.html` | Division | 13 products, 4 categories |
| Contact | `contact.html` | Contact | Inquiry form, contact details, warehouse network |

### Pages required but not designed

These are needed before launch and should follow the same header, footer, type and color system:

- Privacy policy, and a cookie policy if analytics sets cookies
- 404 page
- Optional: a dedicated About page. "About" currently links to the proof section on the home page (`index.html#about`).

### Shared elements

Header, footer and the design tokens in `/tokens` are shared by every page.

---

## 2. Shared components

### Header
- **Fields:** logo (SVG, `assets/brand/darby-wordmark-on-frond-transparent.svg`), navigation items (Animal Nutrition, Food Ingredients, About), call to action (Contact → Contact page).
- **Layout:** fixed height of 72px plus a 1px bottom border, on Frond. It is not sticky in the prototype.
- **Active state:** the current section's link gets a 2px Olein underline.
- **Phones (open item):** in the prototype the navigation wraps onto three lines (about 177px tall) and pushes the home page buttons below the fold. At 760px and below, build a menu toggle: logo, Contact button and a menu button that opens the three links.

### Footer
- **Fields:** logo (on Deep), footer links (Animal Nutrition, Food Ingredients, About, Contact), address, phone, email, LinkedIn, copyright line, RSPO member number.
- **Note:** confirm the LinkedIn URL before launch (see open items).

### Buttons
- **Gold (primary on dark):** Olein background, Ink text.
- **Outline on dark:** transparent, Kernel text, 55% Kernel border.
- **Frond (primary on light):** Frond background, Kernel text.
- **Shared:** 48px minimum height, 2px radius, 15px semibold text.

### Focus states
Every link, button and field shows a 2px Olein outline with a 2px offset on `:focus-visible`. Fields switch to a Frond border on focus.

---

## 3. Home template

### 3.1 Hero with background film
- **Fields:**
  - small label ("Palm specialists since 1992")
  - H1
  - equator line labels: left "0°", right "Malaysia · Indonesia"
  - lead paragraph
  - two calls to action (label and link)
  - video sources: 1600px and 960px MP4 (H.264)
  - poster image
- **Height:** `clamp(560px, calc(100svh - 73px), 820px)`. On laptop screens the header and hero together fill exactly the visible window. On large monitors the hero stops at 820px.
- **Layout:** content is anchored bottom-left, with a maximum width of 760px for the text column and 560px for the equator line.
- **Shade:** a shade sits between the film and the text so the text stays readable:
  - above 1100px: gradient from 0.86 to 0.28 opacity, left to right (`--hero-shade`)
  - 761–1100px: stronger gradient (`--hero-shade-tablet`)
  - 760px and below: flat 0.82 (`--hero-shade-phone`)
  - Shade color is Deep (#132A22). Do not lighten it without retesting contrast (see section 7).
- **Film behavior:**
  - Muted, looping, inline (`muted`, `loop`, `playsinline`) and decorative (`aria-hidden="true"`). There is no audio track.
  - Set the source by script: the 960px file at viewport widths of 900px and below, 1600px above. Every current browser plays H.264 MP4; where `canPlayType('video/mp4; codecs="avc1.640028"')` fails, keep the poster.
  - Set the `muted` property in script as well as the attribute. Some frameworks do not reflect the attribute, and browsers only autoplay muted video.
  - Under `prefers-reduced-motion: reduce`, do not load the film; the poster image stays.
  - Use `preload="none"` and let the poster paint first. The poster is the likely Largest Contentful Paint element, so preload it.
- **The loop:** the film is a single real shot played forward and then back. It turns around at the two calmest moments, with eased speed. It loops seamlessly and must not be trimmed or re-cut without checking the seam.

### 3.2 What we supply
- **Intro fields:** label, H2, supporting paragraph.
- **Division rows (repeatable, two):**
  - image (4:3)
  - audience label
  - title (H3)
  - description
  - category list (category name and product count)
  - call-to-action label and link
- **Category counts:** compute these from the product catalog. Do not hand-enter them.
- **Layout:** rows alternate image side (Animal Nutrition image left, Food Ingredients image right). On phones the image comes first.
- **Accessibility:** the image is also a link to the division but is hidden from assistive technology (`aria-hidden`, `tabindex="-1"`), because the button carries the same link.

### 3.3 Why Darby (`id="about"`)
- **Fields:** label, H2, three proof items (number, title, text).
- **Layout:** on Frond. Numbers are set in Olein at `--text-proof-number`.

### 3.4 Contact prompt
- **Fields:** label, H2, text, button (to the Contact page), phone link.

---

## 4. Division template (Animal Nutrition, Food Ingredients)

### 4.1 Hero
- **Fields:**
  - breadcrumb
  - H1 (division name)
  - equator line
  - standfirst
  - calls to action: "Get the specifications" (jumps to the spec form) and "Talk to a specialist" (Contact page)
  - visual panel
- **Visual panel:**
  - Animal Nutrition: a C16 statement panel (label, "C16" set large with the equator line through it, caption).
  - Food Ingredients: category list with product counts, computed from the catalog.
- **Height:** `clamp(540px, calc(100svh - 73px), 800px)`, content vertically centered. Type and spacing scale with screen height (see tokens).

### 4.2 Product catalog
- **Heading:** label, H2 ("Every {division} product, in one place.") and a live count ("Showing 13 products").
- **Filters:**
  - "All" plus one button per category.
  - Single-select buttons with `aria-pressed`.
  - Filtering hides non-matching cards and updates the count.
  - No page reload; deep-linking to a category is optional.
- **Grid:** `repeat(auto-fill, minmax(250px, 1fr))` with 20px gaps. Inside the 1280px container this gives 4 columns on laptops and larger, 3 on tablets, 2 on small tablets and 1 on phones.
- **Product card:**
  - image at 4:3, `object-fit: cover`
  - category label
  - name (H3; must support subscript for K₂CO₃)
  - subtitle
  - description
  - "Request spec sheet" link
  - The image scales to 1.04 on hover or focus; this is disabled under reduced motion.
  - The prototype's link jumps to the spec form. Once spec sheet PDFs exist, link each product to its own PDF, or prefill the request with the product name.

### 4.3 Proof strip
Three items (title and text) with a 2px Olein top rule.

### 4.4 Spec request form (`id="specs"`)
- **Fields:** first name, last name, work email.
- **Button:** "Send me the specifications".
- **Note line:** the prototype says submitting also subscribes the address to updates. Replace this with an explicit opt-in checkbox (see open items: consent).
- **Behavior:** validate the email. On success, confirm inline in the note line: "Thank you. The specifications will be sent to {email}."

### 4.5 Product data model

| Field | Type | Notes |
|---|---|---|
| name | text | Plain-text name for search and URLs (e.g. `K2CO3`) |
| display_name | rich text | Supports subscript (K₂CO₃) |
| division | reference | Animal Nutrition, Food Ingredients |
| category | reference | Per division (see `data/products.json`) |
| subtitle | text | e.g. "Darby DT98", "Compound chocolate fat" |
| description | text | One or two sentences |
| image | image | 4:3, at least 1200×900; WebP and JPG supplied |
| spec_sheet | file (PDF) | Not yet supplied by Darby |
| sort_order | number | Matches the prototype order by default |

All 23 products are in `data/products.json` and `data/products.csv`, including image paths and each image's source and approval status.

---

## 5. Contact template

### 5.1 Intro
- **Fields:**
  - breadcrumb
  - H1
  - intro text
  - contact rows: Call, Email, Visit (label and value; phone and email are links)
  - RSPO member line

### 5.2 Inquiry form

| Field | Required | Validation message |
|---|---|---|
| I'm interested in (Animal Nutrition / Food Ingredients / Both divisions) | Yes (defaults to Animal Nutrition) | n/a |
| First name | Yes | Enter your first name. |
| Last name | Yes | Enter your last name. |
| Company | Yes | Enter your company. |
| Phone | No | n/a |
| Work email | Yes | Enter your work email. / Enter an email address like name@company.com. |
| How can we help? | Yes | Tell us what you need. |
| Send me the product specifications (checkbox) | No | n/a |

- **Validation:**
  - Validate on submit.
  - Mark each invalid field with a red border (#A3301F), `aria-invalid="true"` and its message below the field.
  - Show "Check the highlighted fields." beside the button, and move focus to the first invalid field.
  - Validate again on the server.
- **Success:**
  - Replace the form with a confirmation: "Thank you, {first name}." and "Your message is with the Darby team in Armonk. A specialist will reply to {email}."
  - Move focus to the heading.
  - "Send another message" resets the form.
- **Spam protection:** use a honeypot field and server-side rate limiting rather than a visible CAPTCHA.

### 5.3 Warehouse network
- **Fields:** label, H2, text, coast groups (coast name and cities), image.
- **Content:** Atlantic: Baltimore, MD; Savannah, GA. Gulf: Houston, TX. Pacific: Los Angeles, CA; Oakland, CA; Tacoma, WA.

---

## 6. Integrations

| Need | Prototype | Build |
|---|---|---|
| Contact form | Validates and confirms in the browser only | Send to Darby's chosen destination (inbox or CRM, to be decided). Store the interest selection and the spec checkbox. |
| Spec request form | Validates the email and confirms only | Send the request. If opt-in is given, add to the update list. Ideally send the division's spec PDFs automatically. |
| Analytics | None | To be decided. Add a cookie consent banner if required. |
| Search | None | Not needed at this size |

---

## 7. Accessibility (target WCAG 2.2 AA)

- **Color contrast:** every token pairing used for text passes AA (see `02-design-system.md`).
- **Text over the film:** every hero text element was tested against every quarter-second of the film at seven screen sizes, from phone to wide monitor. All 42 checks pass. The lowest results were 5.4:1 for the headline (3:1 required) and 7.6:1 for body text (4.5:1 required). If the film or the shade changes, rerun this test.
- **Small labels over the film are Kernel, not gold.** Gold failed over the brightest frames.
- **Structure:** one H1 per page; landmarks for header, nav, main content and footer; a "Skip to content" link appears on keyboard focus.
- **Toggles and forms:** filter and interest buttons use `aria-pressed`. Every field has a visible label. Error messages are tied to their fields with `aria-describedby`.
- **Motion:** the film and the product image zoom respect `prefers-reduced-motion`.
- **Targets:** at least 44px; buttons are 48px.

## 8. Performance

| Asset | Size | Guidance |
|---|---|---|
| Hero film 1600 MP4 | 4.5 MB | Desktop only. Load after the poster. Consider skipping when `navigator.connection.saveData` is set. |
| Hero film 960 MP4 | 2.1 MB | Phones and small tablets |
| Hero poster JPG | 213 KB | Preload; likely the LCP element. Serve as WebP or AVIF through the image pipeline if available. |
| Product images | 1200×900 WebP, about 80 KB each | Generate smaller sizes (for example 600px) in the CMS or build, serve with `srcset`/`sizes`, and lazy-load below the fold |
| Font | Hanken Grotesk variable | Self-host (OFL), or Google Fonts with `preconnect` and `display=swap` |

**Targets:** LCP under 2.5s on 4G, CLS under 0.1. Images carry width and height to prevent layout shift.

## 9. SEO

| Page | Title | Meta description |
|---|---|---|
| Home | Darby \| Palm fats for feed and food | Darby supplies palm-based bypass fats for dairy and beef rations and specialty fats for bakery and confectionery, sourced from RSPO-certified producers and stocked at six U.S. ports. |
| Animal Nutrition | Animal Nutrition \| Darby | High-C16 palmitic fats, calcium salts and minerals for dairy and beef cattle, from RSPO-certified palm and stocked at six U.S. ports. |
| Food Ingredients | Food Ingredients \| Darby | Margarines, shortenings, compound chocolate fats and specialty oils for industrial bakery, confectionery and food manufacturing. |
| Contact | Contact \| Darby | Talk to a Darby palm specialist about specifications, pricing and availability. 6 Maple Ave, Armonk, NY 10504. +1 914 701 0003. |

- **Structured data:** add Organization markup (name, logo, address, phone, sameAs LinkedIn).
- **Housekeeping:** add `sitemap.xml` and `robots.txt`.
- **Redirects:** the current site runs on WordPress. Crawl it and map 301 redirects from every existing URL, including product pages and media, to the new pages before launch.

## 10. Responsive summary

| Width | Key changes |
|---|---|
| 1156px and up | 4-column catalog. Container stops at 1280px. Hero capped at 820px (home) or 800px (division). |
| 1000–1155px | 3-column catalog. Division rows sit side by side. Stronger hero shade from 1100px down. |
| 860–999px | 3-column catalog. Division rows stack, with the image first. |
| 761–859px | 2-column catalog. |
| 568–760px | 2-column catalog. Flat hero shade. 960px film from 900px down. Menu toggle in the header (to build). |
| Below 568px | Single-column catalog. |

Heroes size to the visible window height (`svh`), so laptops with short screens get a fitted first screen. Tested windows:
- 1366×768
- 1280×800
- 1536×864 (Windows at 125%)
- 1440×900
- 1470×956
- 1512×982

On all of these the hero ends exactly at the fold with its buttons visible.
