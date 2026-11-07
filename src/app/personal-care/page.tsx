import type { Metadata } from "next";
import { ogImages, pageMetadata } from "@/lib/seo";
import { DivisionPage } from "@/components/DivisionPage";

export const metadata: Metadata = pageMetadata({
  title: "Personal Care | Darby",
  description:
    "Palm-based ingredients for personal care and cosmetic formulations, from RSPO-certified producers and stocked at six U.S. ports.",
  path: "/personal-care",
  image: ogImages.personalCare,
});

/*
 * Division added on client feedback (Nov 2026). The product list has not been supplied yet,
 * so the catalog shows a specifications-on-request state until products are added to
 * src/data/products.json with division "Personal Care".
 */
export default function PersonalCarePage() {
  return (
    <DivisionPage
      division="Personal Care"
      standfirst="Palm-based ingredients for personal care and cosmetic formulations, refined to consistent specifications and sourced from RSPO-certified producers."
      panel="rspo"
      nameSize={24}
      proof={[
        { title: "RSPO-certified origin", text: "Sourced from vetted producers in Malaysia and Indonesia." },
        { title: "Consistent specifications", text: "Refined, documented and lab-tested, batch after batch." },
        { title: "Six port warehouses", text: "Baltimore, Savannah, Houston, Los Angeles, Oakland and Tacoma." },
      ]}
    />
  );
}
