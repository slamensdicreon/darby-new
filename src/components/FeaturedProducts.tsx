"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { productImage, type Product } from "@/lib/products";
import { Icon } from "./icons";
import { DisplayName } from "./ui";

const divisionPath: Record<string, string> = {
  "Animal Nutrition": "/animal-nutrition",
  "Food Ingredients": "/food-ingredients",
  "Personal Care": "/personal-care",
};

/** Horizontal, snap-scrolling strip of products with previous/next controls. */
export function FeaturedProducts({ products }: { products: Product[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 2);
  }, []);

  useEffect(() => {
    update();
    const el = ref.current;
    if (!el) return;
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const step = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(".fcard");
    const w = card ? card.offsetWidth + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * w * 2, behavior: "smooth" });
  };

  return (
    <div className="featured">
      <div className="featured__controls">
        <button type="button" className="featured__btn" onClick={() => step(-1)} disabled={atStart} aria-label="Previous products">
          <Icon.arrowLeft />
        </button>
        <button type="button" className="featured__btn" onClick={() => step(1)} disabled={atEnd} aria-label="Next products">
          <Icon.arrowRight />
        </button>
      </div>
      <div ref={ref} className="featured__track" tabIndex={0} aria-label="Featured products">
        {products.map((p) => (
          <Link key={p.slug} href={`${divisionPath[p.division]}#${p.slug}`} className="fcard pcard">
            <span className="fcard__media">
              <Image className="pimg" src={productImage(p.image)} alt="" fill sizes="280px" style={{ objectFit: "cover" }} />
            </span>
            <span className="fcard__body">
              <span className="card__cat">{p.division}</span>
              <span className="fcard__name">
                <DisplayName value={p.display_name} />
              </span>
              <span className="fcard__sub">{p.subtitle}</span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
