import { ProductCatalog } from "./ProductCatalog";
import { SpecForm } from "./SpecForm";
import { Breadcrumb, ButtonLink, Equator } from "./ui";
import { getCategories, getProducts, numberWord, pluralProducts, type DivisionName } from "@/lib/products";

export type DivisionConfig = {
  division: DivisionName;
  standfirst: string;
  /** Visual panel beside the hero text. */
  panel: "c16" | "categories";
  /** Card name size in px; the prototype uses 28 (Animal Nutrition) and 22 (Food Ingredients). */
  nameSize: number;
  proof: { title: string; text: string }[];
};

/** Division template (build spec 4): hero, catalog, proof strip, spec request. */
export function DivisionPage({ division, standfirst, panel, nameSize, proof }: DivisionConfig) {
  const products = getProducts(division);
  const categories = getCategories(division);

  return (
    <>
      <section className="dhero" aria-labelledby="division-h">
        <div className="container dhero__inner">
          <div className="dhero__text">
            <Breadcrumb current={division} />
            <h1 id="division-h" className="h-page">
              {division}
            </h1>
            <Equator className="dhero__equator" />
            <p className="dhero__lead">{standfirst}</p>
            <div className="btn-row">
              <ButtonLink href="#specs" variant="gold">
                Get the specifications
              </ButtonLink>
              <ButtonLink href="/contact" variant="outline">
                Talk to a specialist
              </ButtonLink>
            </div>
          </div>

          {panel === "c16" ? (
            <div className="dpanel dpanel--c16">
              <span className="label label--olein">The fatty acid that matters</span>
              <div className="c16" aria-hidden="true">
                <div className="c16__line" />
                <span className="c16__text">C16</span>
              </div>
              <p className="c16__caption">
                Palmitic acid is the fatty acid behind Darby’s bypass fats. Ultra Cal 60 and 70 are high in C16.
              </p>
            </div>
          ) : (
            <div className="dpanel dpanel--cats">
              <span className="label label--olein">
                {products.length} products in {numberWord(categories.length)} categories
              </span>
              <ul className="dcats">
                {categories.map((c) => (
                  <li key={c.name} className="dcats__row">
                    <span className="dcats__name">{c.name}</span>
                    <span className="dcats__count">{pluralProducts(c.count)}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      <section id="products" aria-label="Products">
        <div className="container catalog__inner">
          <ProductCatalog
            products={products}
            categories={categories}
            nameSize={nameSize}
            title={`Every ${division.toLowerCase()} product, in one place.`}
          />
        </div>
      </section>

      <section className="strip" aria-label={`Why Darby ${division}`}>
        <div className="container strip__inner">
          {proof.map((p) => (
            <div key={p.title} className="strip__item">
              <span className="strip__title">{p.title}</span>
              <span className="strip__text">{p.text}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="specs" className="specs" aria-labelledby="specs-h">
        <div className="container specs__inner">
          <div className="specs__head">
            <span className="label label--olein">Product specifications</span>
            <h2 id="specs-h" className="h-block">
              Get the full specifications.
            </h2>
            <p className="body-lg body-lg--dark specs__text">
              The complete {division} specification documents, sent by email.
            </p>
          </div>
          <SpecForm division={division} />
        </div>
      </section>
    </>
  );
}
