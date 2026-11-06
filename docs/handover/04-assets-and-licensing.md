# Assets and licensing

Every asset in this package, where it came from and what must happen before launch. **Nothing marked "Approval needed" should go live without Darby's sign-off.**

| Asset | Files | Source | Rights | Status |
|---|---|---|---|---|
| Hero film | `assets/video/darby-hero-1600.mp4`, `darby-hero-960.mp4`, `darby-hero-poster.jpg` | Real footage: Mixkit clip #44504, "Sunset on the beach through leaves of a palm tree". Edited by Icreon into a forward-and-back loop with a light grade; audio removed. | Mixkit Free License (free commercial use, no attribution). Stock may not be resold or redistributed as standalone footage. | Ready. **Action:** archive a copy of the license terms from mixkit.co/license with the project records. |
| Product images (23) | `assets/products/*.webp` (1200×900) | AI-generated with Higgsfield (GPT Image 2.6). Animal Nutrition images were generated from Darby's own product photos as references; Tri Fat 75 and Omega 22 were based on sibling products; all 13 Food Ingredients images are placeholders (Darby has no product photos for them). | Commercial use per the Higgsfield account terms. Confirm with the account holder. | **Approval needed.** Darby must confirm each image fairly represents the product, or replace it with studio photography to the brief in `02-design-system.md`. Per-image detail is in `data/products.json` (`image_source`). |
| Wordmark (Equator Line) | `assets/brand/darby-wordmark-*.svg` | Designed by Icreon for Darby | Owned by Darby on handover | **Action:** trademark clearance search before launch and before any registration. |
| Typeface | Hanken Grotesk (Google Fonts) | Hanken Design Co. | SIL Open Font License 1.1: free to use and self-host | Ready |
| RSPO references | Text only: "RSPO-certified producers", "Certified origin", member number 2-1713-26-000-00 | Darby's current site | RSPO governs claims and use of its trademarks | **Approval needed.** Confirm the wording against Darby's RSPO membership and certification, and RSPO's rules on market communications and claims. No RSPO logo is used; using one requires an RSPO trademark license. |
| Original product photos | Not included (275px sources on darbyinc.com) | Darby | Darby | Reference only. Too small for the new design. |

## Previous concepts not to use

An earlier AI-generated drone film (plantation, coastline and container ship) was rejected by the client as looking artificial. It is not in this package.

## Optional upgrade: oil palm plantation footage

The approved film shows palm fronds on a beach, not an oil palm plantation. Real plantation footage is available only under paid licenses, for example Getty Images (one sunrise plantation aerial is listed at $499), Adobe Stock, Storyblocks and Kurator. If Darby wants it, license a clip, then rebuild the loop and retest the hero contrast as described in `01-build-spec.md`.
