"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { CategoryCount, Product } from "@/lib/products";
import { ArrowIcon, DisplayName } from "./ui";

export const SPEC_PRODUCT_EVENT = "darby:spec-product";

const ALL = "All";

/** Filterable catalog (build spec 4.2). Deep-links with ?category=… */
export function ProductCatalog({
  products,
  categories,
  nameSize,
  title,
}: {
  products: Product[];
  categories: CategoryCount[];
  /** Card name size in px (prototype: 28 Animal Nutrition, 22 Food Ingredients). */
  nameSize: number;
  title: string;
}) {
  const [active, setActive] = useState<string>(ALL);

  useEffect(() => {
    const wanted = new URLSearchParams(window.location.search).get("category");
    const match = categories.find((c) => c.name.toLowerCase() === wanted?.toLowerCase());
    if (match) setActive(match.name);
  }, [categories]);

  function choose(cat: string) {
    setActive(cat);
    const url = new URL(window.location.href);
    if (cat === ALL) url.searchParams.delete("category");
    else url.searchParams.set("category", cat.toLowerCase());
    window.history.replaceState(window.history.state, "", url);
  }

  const shown = products.filter((p) => active === ALL || p.category === active).length;

  return (
    <>
      <div className="catalog__head">
        <div className="catalog__title-group">
          <span className="label label--gold">The product line</span>
          <h2 className="h-block">{title}</h2>
        </div>
        <span className="catalog__count" aria-live="polite">
          Showing {shown} {shown === 1 ? "product" : "products"}
        </span>
      </div>
      <div role="group" aria-label="Filter by type" className="filters filters--scroll">
        {[ALL, ...categories.map((c) => c.name)].map((cat) => (
          <button
            key={cat}
            type="button"
            className="pill"
            aria-pressed={active === cat}
            onClick={() => choose(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="grid" style={{ ["--card-name-size" as string]: `${nameSize}px` }}>
        {products.map((p, i) => (
          <article
            key={p.slug}
            id={p.slug}
            className="card pcard"
            hidden={!(active === ALL || p.category === active)}
          >
            <div className="card__media">
              <Image
                className="pimg"
                src={p.image}
                alt={`${p.name === p.display_name ? p.name : p.display_name}, close-up`}
                fill
                sizes="(min-width: 1156px) 290px, (min-width: 860px) 33vw, (min-width: 568px) 50vw, 100vw"
                loading={i < 4 ? "eager" : "lazy"}
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="card__body">
              <span className="card__cat">{p.category}</span>
              <h3 className="card__name">
                <DisplayName value={p.display_name} />
              </h3>
              <span className="card__subtitle">{p.subtitle}</span>
              <p className="card__desc">{p.description}</p>
              {p.composition ? <p className="card__composition">{p.composition}</p> : null}
              {p.certifications.length > 0 ? (
                <p className="card__certs">
                  <span className="card__certs-label">Certified</span>
                  {p.certifications.map((c) => (
                    <span key={c} className="card__cert">
                      {c}
                    </span>
                  ))}
                </p>
              ) : null}
              {p.spec_sheet ? (
                <a className="card__link" href={p.spec_sheet} target="_blank" rel="noopener">
                  Download spec sheet
                  <ArrowIcon />
                </a>
              ) : (
                <a
                  className="card__link"
                  href="#specs"
                  aria-label={`Request spec sheet for ${p.name}`}
                  onClick={() =>
                    window.dispatchEvent(new CustomEvent(SPEC_PRODUCT_EVENT, { detail: p.name }))
                  }
                >
                  Request spec sheet
                  <ArrowIcon />
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
