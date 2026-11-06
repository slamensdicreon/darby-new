# Open items and QA

## Inputs needed from Darby

| # | Item | Why it matters | Blocks launch |
|---|---|---|---|
| 1 | Approve or replace the 23 product images | They are AI-generated (see `04-assets-and-licensing.md`) | Yes |
| 2 | Product specifications and spec sheet PDFs | The spec request form and the "Request spec sheet" links need them | Yes |
| 3 | Distinct descriptions for DT98, DT100, ProFat 85 and Tri Fat 75 | All four share one description today | Yes |
| 4 | Confirm marketing claims: "high-C16", "formulated for digestibility and herd health", "lab-tested formulations", "more than thirty years", "six U.S. ports" and the shipping modes | Taken from the current site; must still be accurate | Yes |
| 5 | Confirm the RSPO wording | Must match Darby's membership and certification and RSPO's claims rules | Yes |
| 6 | Form destinations: who receives contact and spec requests (inbox or CRM) | Needed to wire both forms | Yes |
| 7 | Privacy policy, and a cookie policy if analytics is used | Legal requirement; forms collect personal data | Yes |
| 8 | Marketing consent: replace "Submitting also subscribes this address…" with an explicit opt-in checkbox | Bundled consent fails GDPR and best practice | Yes |
| 9 | LinkedIn company URL | The footer link is unverified | No |
| 10 | Trademark clearance for the wordmark | Brand risk before wide use | No (recommended before launch) |
| 11 | Favicon and app icon | The identity is wordmark-only; needs a small-size mark (for example a "D" with the equator line). Design task. | No |
| 12 | Global offices | The original brief mentioned international offices; the site shows only Armonk and the six U.S. warehouses. Confirm whether offices should appear. | No |

## Decisions for the build team

| # | Decision | Notes |
|---|---|---|
| 1 | Platform and hosting | Small site, little functionality. A lightweight CMS or a static site with a headless CMS fits. The content model in `01-build-spec.md` works with any of them. |
| 2 | Phone navigation | Build a menu toggle at 760px and below (see the header spec) |
| 3 | Redirects | The current site runs on WordPress. Crawl it and map 301s for every URL and media file. |
| 4 | Analytics and consent | Choose a tool; add a consent banner if it sets cookies |
| 5 | Product name size | Recommend one 24px size for both catalogs (see `02-design-system.md`) |

## QA checklist

Results marked ✅ were verified on the prototype in this package.

### Layout and fold
- ✅ On each laptop window below, the header plus hero fill the window exactly, the hero buttons are visible and no text is cut by the fold:
  - 1366×768 (657px window)
  - 1280×800 (690px)
  - 1536×864 at Windows 125% (730px)
  - 1440×900 (789px)
  - 1470×956 (835px)
  - 1512×982 (860px)
- ✅ 1920×1080 desktop: the hero is capped and the next section starts below the fold with no text cut.
- ✅ No horizontal scrolling from 390px to 1920px.
- ✅ Catalog columns: 4 from 1156px, 3 from 860px, 2 from 568px, 1 below that.
- ⬜ Phone header: build the menu toggle, then confirm the home hero buttons sit above the fold at 390×844.

### Accessibility
- ✅ Hero text contrast against every quarter-second of the film at seven sizes: 42 of 42 pass (lowest: headline 5.4:1, body 7.6:1).
- ✅ Every token text pairing passes AA (see the design system).
- ✅ Visible focus on all interactive elements; skip link; one H1 per page; `<main>` landmark.
- ✅ Forms: labels on every field, errors tied to fields, focus moves to the first error, and the success message takes focus.
- ✅ Filters and toggles expose `aria-pressed`.
- ✅ Reduced motion: no film (poster only), no image zoom.
- ⬜ Screen-reader pass (VoiceOver on macOS and iOS, NVDA on Windows) on the production build.

### Media
- ✅ Film: muted, looping and inline. The 960px file loads under 900px wide. Standard H.264 MP4 (High profile), which Chrome, Edge, Firefox and Safari play natively.
- ✅ The loop seam is invisible: the jump from last frame to first is smaller than a normal frame-to-frame change.
- ⬜ Real-device check of autoplay on iOS Safari (Low Power Mode blocks autoplay; the poster must still look right).
- ✅ Product images load at 4:3 with no layout shift (width and height set).

### Forms (prototype behavior; repeat on the production build)
- ✅ Contact form: empty submit shows five errors and focuses First name; a valid submit shows the confirmation with the person's name and email; "Send another message" resets the form.
- ✅ Spec form: rejects an invalid email; confirms a valid one.
- ⬜ Server-side validation, spam protection, delivery to the agreed destination, consent storage.

### Browsers
- ⬜ Chrome, Edge, Firefox and Safari on desktop; Safari on iOS; Chrome on Android.

### Performance
- ⬜ LCP under 2.5s on 4G (preload the hero poster), CLS under 0.1.
- ⬜ Hero film is not downloaded under reduced motion; consider skipping it on Save-Data.
