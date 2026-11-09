/** Company details and global content shared by every page. */
export const site = {
  name: "Darby",
  legalName: "Darby Trading Inc.",
  /**
   * Canonical origin for metadata, sitemap and structured data. Set NEXT_PUBLIC_SITE_URL in
   * Vercel once darbyinc.com points at the project; until then the project's production
   * domain (provided by Vercel at build time) is used.
   */
  url: (
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "") ||
    "https://darbyinc.com"
  ).replace(/\/$/, ""),
  /** Only the production deployment may be indexed; Vercel previews are kept out of search. */
  indexable: !process.env.VERCEL_ENV || process.env.VERCEL_ENV === "production",
  email: { display: "info@darbyinc.com", href: "mailto:info@darbyinc.com" },
  address: {
    street: "6 Maple Ave",
    locality: "Armonk",
    region: "NY",
    postalCode: "10504",
    country: "US",
  },
  // Open item #9: confirm the LinkedIn company URL before launch.
  linkedin: "https://www.linkedin.com/company/darby-trading-inc/",
  rspoMember: "2-1713-26-000-00",
  /** Direct lines, replacing the former main line (client feedback, Nov 2026). */
  contacts: [
    { role: "Sales", name: "Ryan Fales", display: "+1 914 557 0517", href: "tel:+19145570517" },
    { role: "Operations", name: "Michael Fales", display: "+1 914 774 1660", href: "tel:+19147741660" },
    { role: "Finance", name: "Corey Rinker", display: "+1 914 419 3993", href: "tel:+19144193993" },
  ],
  since: 1992,
} as const;

export const nav = [
  { label: "Animal Nutrition", href: "/animal-nutrition", section: "/animal-nutrition" },
  { label: "Food Ingredients", href: "/food-ingredients", section: "/food-ingredients" },
  { label: "Personal Care", href: "/personal-care", section: "/personal-care" },
  { label: "About", href: "/#about", section: null },
] as const;

/** Offices. The Thailand city and address are still to be supplied by Darby. */
export const offices = [
  { name: "Armonk, New York", detail: "Headquarters · 6 Maple Ave, Armonk, NY 10504" },
  { name: "Thailand", detail: "Office in Southeast Asia, close to origin" },
] as const;

export const warehouses = [
  { coast: "Atlantic", cities: ["Baltimore, MD", "Savannah, GA"] },
  { coast: "Gulf", cities: ["Houston, TX"] },
  { coast: "Pacific", cities: ["Los Angeles, CA", "Oakland, CA", "Tacoma, WA"] },
] as const;
