import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; priority: number }[] = [
    { path: "", priority: 1 },
    { path: "/animal-nutrition", priority: 0.9 },
    { path: "/food-ingredients", priority: 0.9 },
    { path: "/personal-care", priority: 0.9 },
    { path: "/contact", priority: 0.7 },
    { path: "/privacy-policy", priority: 0.2 },
  ];
  return pages.map(({ path, priority }) => ({
    url: `${site.url}${path || "/"}`,
    changeFrequency: "monthly",
    priority,
  }));
}
