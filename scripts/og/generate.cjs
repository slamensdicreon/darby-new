/**
 * Renders the Open Graph share images (1200×630 JPEG) into public/og/ and the
 * Apple touch icon into src/app/apple-icon.png.
 * Re-run after changing copy or imagery:  node scripts/og/generate.cjs
 * Needs Playwright with Chromium (npx playwright install chromium).
 */
const path = require("path");
const { pathToFileURL } = require("url");
const { chromium } = require("playwright");

const root = path.resolve(__dirname, "../..");
const template = pathToFileURL(path.join(__dirname, "template.html")).href;
const img = (p) => pathToFileURL(path.join(root, "public", p)).href;

const cards = [
  { file: "darby-home.jpg", kind: "home", data: {} },
  {
    file: "darby-animal-nutrition.jpg",
    kind: "division",
    data: {
      name: "Animal Nutrition",
      headline: "High-C16 palm fats for dairy and beef rations.",
      foot: "<b>10 products</b> · Palmitic fats · Calcium salts · Minerals",
      image: img("assets/products/calcium-salt.webp"),
      tag: "Calcium Salt",
    },
  },
  {
    file: "darby-food-ingredients.jpg",
    kind: "division",
    data: {
      name: "Food Ingredients",
      headline: "Specialty fats for bakery and confectionery.",
      foot: "<b>13 products</b> · Bakery · Confectionery · Frying · Specialty",
      image: img("assets/products/gold-margarine-premium.webp"),
      tag: "Gold Margarine Premium",
    },
  },
  {
    file: "darby-personal-care.jpg",
    kind: "division",
    data: {
      name: "Personal Care",
      headline: "Esters and triglycerides for personal care.",
      foot: "<b>3 products</b> · Esters · Triglycerides",
      image: img("assets/products/darby-ipm.webp"),
      tag: "Darby IPM",
    },
  },
  {
    file: "darby-contact.jpg",
    kind: "division",
    data: {
      name: "",
      headline: "Talk to the Darby team.",
      foot: "<b>Sales</b> +1 914 557 0514 · <b>Operations</b> +1 914 774 1660 · <b>Finance</b> +1 914 419 3993<br>info@darbyinc.com · 6 Maple Ave, Armonk, NY 10504",
      image: img("assets/video/darby-hero-poster.jpg"),
      tag: "Stocked at six U.S. ports",
    },
  },
];

(async () => {
  const browser = await chromium.launch({ args: ["--allow-file-access-from-files"] });
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  for (const c of cards) {
    const url = `${template}?kind=${c.kind}&data=${encodeURIComponent(JSON.stringify(c.data))}`;
    await page.goto(url, { waitUntil: "load" });
    await page.evaluate(async () => {
      await document.fonts.ready;
      await Promise.all([...document.images].map((i) => (i.complete ? null : new Promise((r) => (i.onload = i.onerror = r)))));
    });
    const out = path.join(root, "public/og", c.file);
    await page.screenshot({ path: out, type: "jpeg", quality: 88 });
    console.log("wrote", path.relative(root, out));
  }
  // Apple touch icon (180×180) from the favicon, for iOS home screens and bookmarks.
  const icon = await browser.newPage({ viewport: { width: 180, height: 180 }, deviceScaleFactor: 1 });
  const svg = require("fs").readFileSync(path.join(root, "src/app/icon.svg"), "utf8");
  // iOS rounds the corners itself, so the square is filled edge to edge.
  await icon.setContent(
    `<html><body style="margin:0;background:#1E3B2F">${svg.replace("<svg ", '<svg width="180" height="180" style="display:block" ')}</body></html>`,
  );
  await icon.screenshot({ path: path.join(root, "src/app/apple-icon.png") });
  console.log("wrote src/app/apple-icon.png");
  await browser.close();
})();
