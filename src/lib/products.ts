import catalog from "@/data/products.json";

export type DivisionName = "Animal Nutrition" | "Food Ingredients" | "Personal Care";

export type Product = {
  slug: string;
  sort_order: number;
  division: DivisionName;
  category: string;
  /** Plain-text name for search and URLs (e.g. K2CO3). */
  name: string;
  /** Display name; may contain Unicode subscripts (K₂CO₃), rendered as <sub>. */
  display_name: string;
  subtitle: string;
  description: string;
  image: string;
  /** Spec sheet PDF path, once Darby supplies them (open item #2). */
  spec_sheet: string | null;
  /** What the product is made from and how it behaves; from darbyinc.com product pages. */
  composition: string | null;
  /** Certifications held, e.g. Halal, FSSC 22000, ISO 9001:2015; from darbyinc.com. */
  certifications: string[];
  image_source: string;
  image_status: string;
};

export type CategoryCount = { name: string; count: number };

const products = (catalog as Product[]).slice().sort((a, b) => a.sort_order - b.sort_order);

export function getProducts(division: DivisionName): Product[] {
  return products.filter((p) => p.division === division);
}

/** Categories in catalog order, with counts computed from the catalog (never hand-entered). */
export function getCategories(division: DivisionName): CategoryCount[] {
  const counts = new Map<string, number>();
  for (const p of getProducts(division)) counts.set(p.category, (counts.get(p.category) ?? 0) + 1);
  return Array.from(counts, ([name, count]) => ({ name, count }));
}

export function pluralProducts(n: number) {
  return `${n} ${n === 1 ? "product" : "products"}`;
}

const NUMBER_WORDS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
export function numberWord(n: number) {
  return NUMBER_WORDS[n] ?? String(n);
}
