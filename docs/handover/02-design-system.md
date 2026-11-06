# Darby design system — web

Tokens live in `/tokens/tokens.css` (CSS variables) and `/tokens/tokens.json`. This page explains how to use them.

## Identity in one line

Darby is a palm company. The Equator Line wordmark puts a gold line through the name, the line the palm belt sits on. That gold line recurs on the site as the equator rule under headlines and as accents. Everything else stays quiet.

## Wordmark

- **Type:** Hanken Grotesk Medium (500), letter-spaced 0.3em.
- **Line:** a gold (Olein) line passes behind the letters and shows between them and through the counters.
- **Halo:** the letters carry a stroke in the background color, so the line reads as passing behind them. Each background therefore needs its own file:

| Background | File |
|---|---|
| Frond (#1E3B2F): header | `assets/brand/darby-wordmark-on-frond-transparent.svg` |
| Deep (#132A22): footer | `assets/brand/darby-wordmark-on-deep-transparent.svg` |
| Kernel (#F3EDE2) | `assets/brand/darby-wordmark-on-kernel-transparent.svg` |
| White | `assets/brand/darby-wordmark-on-white-transparent.svg` |

Files without `-transparent` include the background color, for previews and documents.

**Sizes:** header 26px tall, footer 30px tall.

**Do not:** recolor the line, place the wordmark on a background that doesn't match its halo, or set the name in another weight or spacing.

## Color

| Token | Hex | Role |
|---|---|---|
| Frond | #1E3B2F | Primary dark ground: header, heroes, proof band, primary buttons on light |
| Deep | #132A22 | Footer, panels, hero shade |
| Olein | #D9A13B | Equator line, gold button, numbers and small labels on dark |
| Kernel | #F3EDE2 | Light ground; text on dark |
| Ink | #14161A | Text on light |
| White | #FFFFFF | Product cards, form surface |
| Gold text | #8A5F10 | Small gold labels on light (Olein is too light for small text there) |
| Muted on dark | #C9C2B3 | Secondary text on Frond and Deep |
| Muted on light | #4A5249 | Secondary text on Kernel and White |
| Error | #A3301F | Form errors |

### Contrast (WCAG AA: 4.5:1 body text, 3:1 large text)

| Text on background | Ratio | Text on background | Ratio |
|---|---|---|---|
| Kernel on Frond | 10.47 | Ink on Kernel | 15.54 |
| Muted on dark, on Frond | 6.88 | Muted on light, on Kernel | 6.95 |
| Olein on Frond | 5.29 | Gold text on Kernel | 4.84 |
| Kernel on Deep | 13.04 | Frond on Kernel | 10.47 |
| Olein on Deep | 6.59 | Ink on Olein (gold button) | 7.86 |
| Error on White | 7.00 | Muted on light, on White | 8.09 |

**Rule:** use Olein for text only on Frond or Deep. On light grounds, use Gold text.

## Type

Hanken Grotesk is the only family. It is available on Google Fonts under the SIL Open Font License, so it can be self-hosted. Weights used: 400, 500 and 600.

| Style | Size | Line height | Weight | Tracking |
|---|---|---|---|---|
| Home H1 | clamp(44px, min(6.2vw, 10.5svh), 88px) | 1.0 | 500 | -0.03em |
| Page H1 (division, contact) | clamp(44px, min(5.6vw, 9.6svh), 80px) | 1.0–1.02 | 500 | -0.025 to -0.03em |
| Contact prompt H2 | clamp(40px, 4.8vw, 68px) | 1.02 | 500 | -0.025em |
| Section H2 | clamp(34px, 4vw, 56px) | 1.06 | 500 | -0.025em |
| Division row H3 | clamp(34px, 3.6vw, 52px) | 1.04 | 500 | -0.025em |
| Proof number | clamp(48px, 5vw, 72px) | 1.0 | 400 | -0.03em |
| Product name (card) | 28px (Animal Nutrition), 22px (Food Ingredients) | 1.15 | 500 | -0.015em |
| Lead (hero) | clamp(17px, 2.7svh, 20px) | 1.55 | 400 | 0 |
| Body large | 18px | 28px | 400 | 0 |
| Body | 16px | 25px | 400 | 0 |
| Small / card body | 15px | 22–23px | 400 | 0 |
| Label | 12px, uppercase | 16px | 600 | 0.2em |
| Button | 15px | 20px | 600 | 0 |

**Notes:**
- Headlines use `text-wrap: balance` so they never end on a single word.
- Hero sizes scale with screen height (`svh`) as well as width, so short laptop screens keep the full hero above the fold.
- **Recommendation for the build:** use one product-name size (24px) on both catalogs. The prototype uses 28px and 22px because Food Ingredients names run longer; with balanced wrapping, 24px works for both.

## Layout

- **Container:** 1280px maximum, with side padding of `clamp(20px, 4vw, 56px)`.
- **Section padding:** 128px top and bottom on desktop; scaled down where the prototype shows.
- **Radius:** 2px everywhere. Corners are nearly square by design.
- **Header:** 72px plus a 1px border.
- **Grid:**
  - catalog: `repeat(auto-fill, minmax(250px, 1fr))`, 20px gap
  - division rows: two flexible columns that stack below 1000px
- **Alignment:** left-aligned throughout. Nothing is centered except icons inside controls.

## Imagery

- **Hero film:** one real, calm shot of palm fronds against a sunset over the sea, looping forward and back. No people, text or logos. Always under the Deep shade when text sits on it.
- **Product images:**
  - 4:3, top-down or slightly angled
  - the product fills the frame edge to edge, with no bowls, containers or backgrounds
  - soft daylight from the upper left, true color, neutral warm white balance
  - **For new photography, match this brief exactly** so new shots sit with the existing set.
- **Image ground:** while images load, their frame shows #EAE3D6.

## Motion

Motion is limited to three things:
- **Hero film:** loops continuously.
- **Product image zoom:** scales to 1.04 on hover or focus, over 0.6s with `cubic-bezier(.2,.7,.2,1)`.
- **Card border:** darkens on hover.

Under `prefers-reduced-motion: reduce`, the film is replaced by its poster and the zoom is off. Do not add entrance animations to sections.

## Components (visual)

| Component | Ground | Key specs |
|---|---|---|
| Header | Frond | 72px, wordmark 26px, links 15px/500, Contact gold button |
| Home hero | Film + Deep shade | Bottom-left text, equator rule 560px max, 2 buttons |
| Division row | Kernel | Image 4:3 (2px radius), label, H3, body, category list with 1px rules, Frond button |
| Proof band | Frond | Three columns with 1px top rules, Olein numbers |
| Contact prompt | Kernel | 1px Ink top rule, H2, Frond button, phone link |
| Division hero | Frond | Two columns: text and visual panel on Deep |
| Filter buttons | Kernel | 44px tall. Selected: Frond fill with Kernel text. Unselected: transparent with 30% Ink border. |
| Product card | White | 1px border (14% Ink, 32% on hover), image 4:3, 20px padding |
| Proof strip | White | Three items with 2px Olein top rule |
| Spec form | Frond | Fields on Deep with 50% Kernel border; gold button |
| Contact form | White card on Frond | Fields 48px, 30% Ink border; errors 1.5px Error border |
| Footer | Deep | Wordmark, links, contact; 1px rule above the legal line |
