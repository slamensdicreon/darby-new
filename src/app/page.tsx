import Image from "next/image";
import Link from "next/link";
import { HeroFilm } from "@/components/HeroFilm";
import { ButtonLink, Equator } from "@/components/ui";
import { getCategories, getProducts, pluralProducts, type DivisionName } from "@/lib/products";
import { site } from "@/lib/site";

const POSTER = "/assets/video/darby-hero-poster.jpg";

const divisions: {
  name: DivisionName;
  href: string;
  image: string;
  audience: string;
  text: string;
}[] = [
  {
    name: "Animal Nutrition",
    href: "/animal-nutrition",
    image: "/assets/products/calcium-salt.webp",
    audience: "For nutritionists and feed mills",
    text: "High-C16 palmitic fats and calcium salts that add energy to dairy and beef rations, formulated for digestibility and herd health.",
  },
  {
    name: "Food Ingredients",
    href: "/food-ingredients",
    image: "/assets/products/gold-margarine-premium.webp",
    audience: "For bakery and confectionery manufacturers",
    text: "Margarines, shortenings, compound chocolate fats and specialty oils, developed for industrial production and consistent texture and taste.",
  },
];

const proof = [
  {
    number: "RSPO",
    title: "Certified origin",
    text: `Sourced from vetted, RSPO-certified producers in Malaysia and Indonesia. Member ${site.rspoMember}.`,
  },
  {
    number: "6",
    title: "Stock close to your plant",
    text: "Warehouses in Baltimore, Savannah, Houston, Los Angeles, Oakland and Tacoma, shipping LTL, FTL or bulk liquid ex-tank.",
  },
  {
    number: String(site.since),
    title: "Specialists, not generalists",
    text: "More than thirty years in palm alone, with full specifications on request from the team in Armonk.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* 3.1 Hero with background film */}
      <section aria-labelledby="hero-h" className="hero">
        <Image
          src={POSTER}
          alt=""
          aria-hidden="true"
          fill
          preload
          quality={85}
          sizes="100vw"
          className="hero__media"
          style={{ objectFit: "cover" }}
        />
        <HeroFilm poster={POSTER} />
        <div className="hero-scrim" aria-hidden="true" />
        <div className="container hero__content">
          <div className="hero__col">
            <div className="hero__head">
              <span className="label label--kernel">Palm specialists since {site.since}</span>
              <h1 id="hero-h" className="hero__title">
                Palm, refined for feed and food.
              </h1>
            </div>
            <div className="hero__equator">
              <Equator end="Malaysia · Indonesia" />
            </div>
            <p className="hero__lead">
              Bypass fats for dairy and beef rations. Specialty fats for bakery and confectionery. Sourced from
              RSPO-certified producers and stocked at six U.S. ports.
            </p>
            <div className="btn-row">
              <ButtonLink href="/animal-nutrition" variant="gold">
                Animal Nutrition
              </ButtonLink>
              <ButtonLink href="/food-ingredients" variant="outline">
                Food Ingredients
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {/* 3.2 What we supply */}
      <section aria-labelledby="supply-h">
        <div className="container supply__inner">
          <div className="intro-split">
            <div className="intro-split__head">
              <span className="label label--gold">What we supply</span>
              <h2 id="supply-h" className="h-section">
                Two divisions. One palm supply chain.
              </h2>
            </div>
            <p className="body-lg intro-split__text">
              Whether you formulate rations or run a production line, the fats come from the same certified origin and
              the same six U.S. ports.
            </p>
          </div>
          <div className="division-rows">
            {divisions.map((d, i) => {
              const categories = getCategories(d.name);
              const total = getProducts(d.name).length;
              return (
                <div key={d.name} className={`division-row pcard${i % 2 ? " division-row--reverse" : ""}`}>
                  <Link href={d.href} tabIndex={-1} aria-hidden="true" className="division-row__media">
                    <Image
                      className="pimg"
                      src={d.image}
                      alt=""
                      fill
                      sizes="(min-width: 1000px) 640px, 100vw"
                      style={{ objectFit: "cover" }}
                    />
                  </Link>
                  <div className="division-row__body">
                    <span className="label label--gold">{d.audience}</span>
                    <h3 className="division-row__title">{d.name}</h3>
                    <p className="body-lg division-row__text">{d.text}</p>
                    <ul className="cat-list">
                      {categories.map((c) => (
                        <li key={c.name} className="cat-list__row">
                          <span className="cat-list__name">{c.name}</span>
                          <span className="cat-list__count">{pluralProducts(c.count)}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="division-row__cta">
                      <ButtonLink href={d.href} variant="frond">
                        Explore {total} products
                      </ButtonLink>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3.3 Why Darby */}
      <section id="about" aria-labelledby="about-h" className="proof">
        <div className="container proof__inner">
          <div className="proof__head">
            <span className="label label--olein">Why Darby</span>
            <h2 id="about-h" className="h-section">
              Thirty years of palm, from plantation to your plant.
            </h2>
          </div>
          <div className="proof__items">
            {proof.map((p) => (
              <div key={p.title} className="proof__item">
                <span className="proof__number">{p.number}</span>
                <span className="proof__title">{p.title}</span>
                <span className="proof__text">{p.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3.4 Contact prompt */}
      <section id="contact" aria-labelledby="contact-h">
        <div className="container prompt__inner">
          <div className="prompt__rule">
            <div className="prompt__head">
              <span className="label label--gold">Contact</span>
              <h2 id="contact-h" className="prompt__title">
                Talk to a palm specialist.
              </h2>
              <p className="body-lg prompt__text">Specifications, pricing and availability for both divisions.</p>
            </div>
            <div className="prompt__actions">
              <ButtonLink href="/contact" variant="frond">
                Contact us
              </ButtonLink>
              <a href={site.phone.href} className="prompt__phone">
                {site.phone.display}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
