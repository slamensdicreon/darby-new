import type { Metadata } from "next";
import { DivisionPage } from "@/components/DivisionPage";

export const metadata: Metadata = {
  title: "Food Ingredients | Darby",
  description:
    "Margarines, shortenings, compound chocolate fats and specialty oils for industrial bakery, confectionery and food manufacturing.",
  alternates: { canonical: "/food-ingredients" },
  openGraph: { title: "Food Ingredients | Darby", url: "/food-ingredients" },
};

export default function FoodIngredientsPage() {
  return (
    <DivisionPage
      division="Food Ingredients"
      standfirst="Specialty fats for industrial bakery, confectionery and culinary applications, developed for quality extraction, texture and taste."
      panel="categories"
      nameSize={22}
      proof={[
        { title: "RSPO-certified origin", text: "Sourced from vetted producers in Malaysia and Indonesia." },
        {
          title: "Built for production",
          text: "Developed with the industrial baking and confectionery industry in mind.",
        },
        { title: "Six port warehouses", text: "Baltimore, Savannah, Houston, Los Angeles, Oakland and Tacoma." },
      ]}
    />
  );
}
