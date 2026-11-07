import type { Metadata } from "next";
import { site } from "./site";

/** Share images, 1200×630 JPEG, rendered by scripts/og/generate.cjs. */
export const ogImages = {
  home: { url: "/og/darby-home.jpg", alt: "Darby: palm-based ingredients for feed, food and personal care." },
  animalNutrition: {
    url: "/og/darby-animal-nutrition.jpg",
    alt: "Darby Animal Nutrition: high-C16 palm fats for dairy and beef rations.",
  },
  foodIngredients: {
    url: "/og/darby-food-ingredients.jpg",
    alt: "Darby Food Ingredients: specialty fats for bakery and confectionery.",
  },
  personalCare: {
    url: "/og/darby-personal-care.jpg",
    alt: "Darby Personal Care: palm-based ingredients for personal care and cosmetics.",
  },
  contact: { url: "/og/darby-contact.jpg", alt: "Talk to the Darby team. Sales +1 914 557 0514." },
} as const;

type PageSeo = {
  /** Full title as it should appear in search results and tabs. */
  title: string;
  /** Aim for 120–160 characters so search results show it in full. */
  description: string;
  /** Path of the page, e.g. "/contact". Used for the canonical URL and og:url. */
  path: string;
  image?: { url: string; alt: string };
};

/**
 * Complete metadata for one page. Next.js replaces nested objects such as openGraph
 * rather than merging them, so every page sets the full set through this helper.
 */
export function pageMetadata({ title, description, path, image = ogImages.home }: PageSeo): Metadata {
  const images = [{ url: image.url, width: 1200, height: 630, alt: image.alt, type: "image/jpeg" }];
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: "en_US",
      url: path,
      title,
      description,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images,
    },
  };
}

export const homeSeo: PageSeo = {
  title: "Darby | Palm ingredients for feed, food and personal care",
  description:
    "Palm-based fats, oils and derivatives for animal nutrition, food and personal care, from RSPO-certified producers and stocked at six U.S. ports.",
  path: "/",
  image: ogImages.home,
};
