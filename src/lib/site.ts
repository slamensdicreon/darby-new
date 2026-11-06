/** Company details and global content shared by every page. */
export const site = {
  name: "Darby",
  legalName: "Darby Trading Inc.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://darbyinc.com").replace(/\/$/, ""),
  phone: { display: "+1 914 701 0003", href: "tel:+19147010003" },
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
  since: 1992,
} as const;

export const nav = [
  { label: "Animal Nutrition", href: "/animal-nutrition", section: "/animal-nutrition" },
  { label: "Food Ingredients", href: "/food-ingredients", section: "/food-ingredients" },
  { label: "About", href: "/#about", section: null },
] as const;

export const warehouses = [
  { coast: "Atlantic", cities: ["Baltimore, MD", "Savannah, GA"] },
  { coast: "Gulf", cities: ["Houston, TX"] },
  { coast: "Pacific", cities: ["Los Angeles, CA", "Oakland, CA", "Tacoma, WA"] },
] as const;
