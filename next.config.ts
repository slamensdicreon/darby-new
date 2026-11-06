import type { NextConfig } from "next";

/**
 * 301 redirects from the current WordPress site (build spec 9). Mapped from the live
 * sitemaps and the WordPress REST API in November 2026: every page, category and
 * product post. Product posts land on their card in the new catalog.
 */
const AN = "/animal-nutrition";
const FI = "/food-ingredients";

const productPosts: Record<string, string> = {
  "darby-dt80": `${AN}#dt80`,
  "darby-dt98": `${AN}#dt98`,
  "darby-dt100": `${AN}#dt100`,
  "darby-dt-pro-fat-85": `${AN}#profat-85`,
  "darby-tri-fat-75": `${AN}#tri-fat-75`,
  "dt-calcium-salt": `${AN}#calcium-salt`,
  "darby-dt-ultra-cal-60": `${AN}#ultra-cal-60`,
  "darby-dt-ultra-cal-70": `${AN}#ultra-cal-70`,
  "darby-dt-omega-22": `${AN}#omega-22`,
  "darby-potassium-carbonate": `${AN}#k2co3-potassium-carbonate`,
  "darby-bake-gold-margarine-prem": `${FI}#gold-margarine-premium`,
  "shortening-4852": `${FI}#shortening-4852`,
  "darby-bake-butter-oil-substitue": `${FI}#butter-oil-substitute`,
  "darby-bake-cb-replacer": `${FI}#cocoa-butter-replacer`,
  "darby-bake-choch-9503": `${FI}#choch-9503`,
  "darby-bake-choch-7011-xc": `${FI}#choch-7011-xc`,
  "darby-bake-choch-3840": `${FI}#choch-3840`,
  "darby-bake-veg-spread": `${FI}#vegetable-spread`,
  "darby-bake-fry-short": `${FI}#fry-shortening`,
  "darby-bake-shortening-4143": `${FI}#shortening-4143`,
  "darby-bake-rcno": `${FI}#rcno`,
  "medium-chain-triglyceride": `${FI}#medium-chain-triglyceride`,
  "darby-bake-hydro-palm-flakes": `${FI}#hydro-palm-flakes`,
  // Discontinued on the new site: send to the division.
  "darby-bake-shorting-3639": FI,
};

const DATE = "/:year(\\d{4})/:month(\\d{2})/:day(\\d{2})";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Handled below so old WordPress URLs (which end in "/") reach their target in one 301.
  skipTrailingSlashRedirect: true,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85],
  },
  async redirects() {
    // `{/}?` accepts the trailing slash every WordPress URL had.
    const r = (source: string, destination: string) => ({
      source: `${source}{/}?`,
      destination,
      statusCode: 301 as const,
    });
    return [
      r("/contact-darby-trading", "/contact"),
      r("/animal-nutrition-and-food-ingredient-supplier", "/"),
      r("/privacy-policy-2", "/privacy-policy"),
      r("/sample-page", "/"),
      r("/category/animal-nutrition", AN),
      r("/category/food-ingredients", FI),
      r("/category/:slug*", "/"),
      ...Object.entries(productPosts).map(([slug, to]) => r(`${DATE}/${slug}`, to)),
      r(`${DATE}/:slug`, "/"),
      r("/:year(\\d{4})/:month(\\d{2})", "/"),
      r("/feed", "/"),
      r("/comments/feed", "/"),
      r("/wp-content/uploads/:path*", "/"),
      r("/wp-login.php", "/"),
      r("/wp-admin/:path*", "/"),
      r("/index.php", "/"),
      // Prototype file names, in case they were shared during review.
      r("/index.html", "/"),
      r("/animal-nutrition.html", AN),
      r("/food-ingredients.html", FI),
      r("/contact.html", "/contact"),
      // Any other trailing slash: strip it (Next's default, as a 308).
      { source: "/:path+/", destination: "/:path+", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      {
        source: "/assets/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }],
      },
    ];
  },
};

export default nextConfig;
