import type { Metadata } from "next";
import { ogImages, pageMetadata } from "@/lib/seo";
import { DivisionPage } from "@/components/DivisionPage";

export const metadata: Metadata = pageMetadata({
  title: "Personal Care | Darby",
  description:
    "Isopropyl myristate, isopropyl palmitate and medium-chain triglycerides for skin care, cosmetics and topical pharmaceutical formulations, stocked at six U.S. ports.",
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
      standfirst="Emollient esters and medium-chain triglycerides for skin care, color cosmetics and topical pharmaceutical formulations, refined to consistent specifications."
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
