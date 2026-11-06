import type { Metadata } from "next";
import { ogImages, pageMetadata } from "@/lib/seo";
import { DivisionPage } from "@/components/DivisionPage";

export const metadata: Metadata = pageMetadata({
  title: "Animal Nutrition | Darby",
  description:
    "High-C16 palmitic fats, calcium salts and minerals for dairy and beef cattle, from RSPO-certified palm and stocked at six U.S. ports.",
  path: "/animal-nutrition",
  image: ogImages.animalNutrition,
});

export default function AnimalNutritionPage() {
  return (
    <DivisionPage
      division="Animal Nutrition"
      standfirst="Palm fats and calcium salts for dairy and beef cattle, crafted and refined over 30 years for high digestibility, high energy content and herd health."
      panel="c16"
      nameSize={28}
      proof={[
        { title: "RSPO-certified origin", text: "Sourced from vetted producers in Malaysia and Indonesia." },
        { title: "Lab-tested formulations", text: "Optimized for digestibility, energy content and herd health." },
        { title: "Six port warehouses", text: "Baltimore, Savannah, Houston, Los Angeles, Oakland and Tacoma." },
      ]}
    />
  );
}
