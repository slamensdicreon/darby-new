import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { GlobalPresence } from "@/components/GlobalPresence";
import { HeroFilm } from "@/components/HeroFilm";
import { Icon } from "@/components/icons";
import { StatCounter } from "@/components/StatCounter";
import { ButtonLink, Equator } from "@/components/ui";
import { getCategories, getProducts, productImage, type DivisionName } from "@/lib/products";
import { homeSeo, pageMetadata } from "@/lib/seo";
import { offices, site, warehouses } from "@/lib/site";

export const metadata: Metadata = pageMetadata(homeSeo);

const POSTER = "/assets/video/darby-hero-poster.jpg";
const DIVISIONS: DivisionName[] = ["Animal Nutrition", "Food Ingredients", "Personal Care"];

const divisions: { name: DivisionName; href: string; image: string; text: string }[] = [
  {
    name: "Animal Nutrition",
    href: "/animal-nutrition",
    image: "/assets/products/calcium-salt.webp",
    text: "High-C16 palmitic fats and calcium salts that add energy to dairy and beef rations, formulated for digestibility and herd health.",
  },
  {
    name: "Food Ingredients",
    href: "/food-ingredients",
    image: "/assets/products/gold-margarine-premium.webp",
    text: "Margarines, shortenings, compound chocolate fats and specialty oils, developed for industrial production and consistent texture and taste.",
  },
  {
    name: "Personal Care",
    href: "/personal-care",
    image: "/assets/products/darby-ipm.webp",
    text: "Emollient esters and medium-chain triglycerides for skin care, color cosmetics and topical pharmaceutical formulations.",
  },
];

const FEATURED = [
  "dt80",
  "ultra-cal-60",
  "calcium-salt",
  "k2co3-potassium-carbonate",
  "gold-margarine-premium",
  "choch-9503",
  "cocoa-butter-replacer",
  "rcno",
  "darby-ipm",
  "darby-ipp",
];

const steps = [
  {
    icon: <Icon.leaf />,
    title: "Sourced at origin",
    text: "From vetted, RSPO-certified producers in Malaysia and Indonesia, with our Thailand office close to the plantations.",
  },
  {
    icon: <Icon.flask />,
    title: "Refined to specification",
    text: "Every grade is refined and documented to a consistent specification, with full spec sheets available on request.",
  },
  {
    icon: <Icon.ship />,
    title: "Shipped to six U.S. ports",
    text: "Stock held at Baltimore, Savannah, Houston, Los Angeles, Oakland and Tacoma, so orders leave from the coast nearest your plant.",
  },
  {
    icon: <Icon.truck />,
    title: "Delivered to your plant",
    text: "LTL, FTL or bulk liquid ex-tank through trusted logistics partners, coordinated by the team in Armonk.",
  },
];

const customers = [
  { title: "Animal nutrition", text: "Feed mills, dairy and beef nutritionists, and premix and ration formulators." },
  { title: "Food manufacturing", text: "Industrial bakeries, confectioners, and snack, frozen and prepared-food producers." },
  { title: "Personal care", text: "Personal care and cosmetics manufacturers and their contract formulators." },
];

const faqs = [
  {
    q: "Where do you ship from?",
    a: "From whichever of our six port warehouses is nearest your plant: Baltimore, Savannah, Houston, Los Angeles, Oakland or Tacoma. Orders ship LTL, FTL or as bulk liquid ex-tank through our logistics partners.",
  },
  {
    q: "Is your palm RSPO-certified?",
    a: `Our products are sourced from RSPO-certified producers in Malaysia and Indonesia. Darby Trading is an RSPO member, number ${site.rspoMember}.`,
  },
  {
    q: "How do I get product specifications?",
    a: "Use the specification request on any division page and the full documents are sent by email, or ask for a specific product from its card. Pricing and availability come from the sales team.",
  },
  {
    q: "Which certifications do your products carry?",
    a: "Food Ingredients products carry Halal certification, with FSSC 22000 or ISO 9001:2015 depending on the product; each product card lists its own. Certifications for other ranges are available on request.",
  },
  {
    q: "Where is Darby based?",
    a: "Headquarters are in Armonk, New York, with an office in Thailand near our sourcing region, and warehouses on the Atlantic, Gulf and Pacific coasts.",
  },
];

export default function HomePage() {
  const all = DIVISIONS.flatMap((d) => getProducts(d));
  const featured = FEATURED.map((slug) => all.find((p) => p.slug === slug)).filter((p) => p !== undefined);
  const years = new Date().getFullYear() - site.since;

  return (
    <>
      {/* Hero with background film */}
      <section aria-labelledby="hero-h" className="hero">
        <Image src={POSTER} alt="" aria-hidden="true" fill preload quality={85} sizes="100vw" className="hero__media" style={{ objectFit: "cover" }} />
        <HeroFilm poster={POSTER} />
        <div className="hero-scrim" aria-hidden="true" />
        <div className="container hero__content">
          <div className="hero__col">
            <div className="hero__head">
              <h1 id="hero-h" className="hero__title">
                Palm-based ingredients for feed, food and personal care.
              </h1>
            </div>
            <div className="hero__equator">
              <Equator end="Malaysia · Indonesia" />
            </div>
            <p className="hero__lead">
              Fats, oils and derivatives for animal nutrition, food and personal care, sourced from RSPO-certified
              producers and stocked at six U.S. ports.
            </p>
            <div className="btn-row">
              <ButtonLink href="/animal-nutrition" variant="gold">
                Animal Nutrition
              </ButtonLink>
              <ButtonLink href="/food-ingredients" variant="outline">
                Food Ingredients
              </ButtonLink>
              <ButtonLink href="/personal-care" variant="outline">
                Personal Care
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section aria-label="Darby at a glance" className="stats">
        <div className="container stats__inner">
          <div className="stat" data-reveal="1">
            <StatCounter value={years} suffix="+" />
            <span className="stat__label">Years in palm, since {site.since}</span>
          </div>
          <div className="stat" data-reveal="2">
            <StatCounter value={warehouses.reduce((n, w) => n + w.cities.length, 0)} />
            <span className="stat__label">U.S. port warehouses on three coasts</span>
          </div>
          <div className="stat" data-reveal="3">
            <StatCounter value={DIVISIONS.length} />
            <span className="stat__label">Divisions from one certified origin</span>
          </div>
          <div className="stat" data-reveal="4">
            <StatCounter value={all.length} />
            <span className="stat__label">Products, with specifications on request</span>
          </div>
        </div>
      </section>

      {/* What we supply */}
      <section aria-labelledby="supply-h">
        <div className="container supply__inner">
          <div className="intro-split" data-reveal>
            <div className="intro-split__head">
              <h2 id="supply-h" className="h-section">
                Animal nutrition, food ingredients and personal care.
              </h2>
            </div>
            <p className="body-lg intro-split__text">
              Whether you formulate rations, run a production line or develop personal care products, the ingredients
              come from the same certified origin and the same six U.S. ports.
            </p>
          </div>
          <div className="division-rows">
            {divisions.map((d, i) => {
              const categories = getCategories(d.name);
              return (
                <div key={d.name} className={`division-row pcard${i % 2 ? " division-row--reverse" : ""}`} data-reveal>
                  <Link href={d.href} tabIndex={-1} aria-hidden="true" className="division-row__media">
                    <Image className="pimg" src={productImage(d.image)} alt="" fill sizes="(min-width: 1000px) 640px, 100vw" style={{ objectFit: "cover" }} />
                  </Link>
                  <div className="division-row__body">
                    <span className="division-row__index">0{i + 1}</span>
                    <h3 className="division-row__title">{d.name}</h3>
                    <p className="body-lg division-row__text">{d.text}</p>
                    <ul className="cat-list">
                      {categories.map((c) => (
                        <li key={c.name} className="cat-list__row">
                          <span className="cat-list__name">{c.name}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="division-row__cta">
                      <ButtonLink href={d.href} variant="frond">
                        Explore {d.name}
                      </ButtonLink>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section aria-labelledby="featured-h" className="featured-section">
        <div className="container featured-section__inner">
          <div className="intro-split" data-reveal>
            <div className="intro-split__head">
              <h2 id="featured-h" className="h-section">
                From the catalog.
              </h2>
            </div>
            <p className="body-lg intro-split__text">
              A selection from all three divisions. Every product page carries the composition, certifications and a
              specification request.
            </p>
          </div>
          <div data-reveal>
            <FeaturedProducts products={featured} />
          </div>
        </div>
      </section>

      {/* Process */}
      <section aria-labelledby="process-h">
        <div className="container process__inner">
          <div className="intro-split" data-reveal>
            <div className="intro-split__head">
              <h2 id="process-h" className="h-section">
                From plantation to your plant.
              </h2>
            </div>
            <p className="body-lg intro-split__text">
              One supply chain, run by one team, from the producers at origin to the dock at your plant.
            </p>
          </div>
          <ol className="process__steps" style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {steps.map((s, i) => (
              <li key={s.title} className="step" data-reveal={String(i + 1)}>
                <span className="step__num">0{i + 1}</span>
                <span className="step__icon">{s.icon}</span>
                <span className="step__title">{s.title}</span>
                <span className="step__text">{s.text}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Why Darby */}
      <section id="about" aria-labelledby="about-h" className="proof">
        <div className="container proof__inner">
          <div className="proof__head" data-reveal>
            <h2 id="about-h" className="h-section">
              Thirty years of palm, from plantation to your plant.
            </h2>
          </div>
          <div className="tiles">
            <div className="tile" data-reveal="1">
              <span className="tile__icon">
                <Icon.certificate />
              </span>
              <span className="tile__value">RSPO</span>
              <span className="tile__title">Certified origin</span>
              <span className="tile__text">
                Sourced from vetted, RSPO-certified producers in Malaysia and Indonesia. Member {site.rspoMember}.
              </span>
            </div>
            <div className="tile" data-reveal="2">
              <span className="tile__icon">
                <Icon.ship />
              </span>
              <span className="tile__value">6</span>
              <span className="tile__title">Stock close to your plant</span>
              <span className="tile__text">
                Warehouses in Baltimore, Savannah, Houston, Los Angeles, Oakland and Tacoma, shipping LTL, FTL or bulk
                liquid ex-tank.
              </span>
            </div>
            <div className="tile" data-reveal="3">
              <span className="tile__icon">
                <Icon.calendar />
              </span>
              <span className="tile__value">{site.since}</span>
              <span className="tile__title">Thirty years in palm</span>
              <span className="tile__text">
                Palm has been our only business since {site.since}, run from Armonk, New York, with an office in
                Thailand.
              </span>
            </div>
            <div className="tile" data-reveal="4">
              <span className="tile__icon">
                <Icon.document />
              </span>
              <span className="tile__value">{all.length}</span>
              <span className="tile__title">Specified products</span>
              <span className="tile__text">
                Every grade documented, with full specification sheets sent on request from the team in Armonk.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Where we are */}
      <section aria-labelledby="presence-h" className="presence-section">
        <div className="container presence-section__inner">
          <div className="intro-split" data-reveal>
            <div className="intro-split__head">
              <h2 id="presence-h" className="h-section">
                Stocked on three coasts. Present at origin.
              </h2>
            </div>
            <p className="body-lg body-lg--dark intro-split__text">
              Six U.S. warehouses, headquarters in New York and an office in Thailand, with palm sourced on the equator
              in Malaysia and Indonesia.
            </p>
          </div>
          <div data-reveal>
            <GlobalPresence />
          </div>
          <div className="presence__legend" data-reveal>
            {warehouses.map((w) => (
              <div key={w.coast} className="coast">
                <span className="label label--olein">{w.coast}</span>
                {w.cities.map((c) => (
                  <span key={c} className="coast__city">
                    {c}
                  </span>
                ))}
              </div>
            ))}
            <div className="coast coast--offices">
              <span className="label label--olein">Offices</span>
              {offices.map((o) => (
                <span key={o.name} className="coast__city">
                  {o.name}
                  <span className="coast__detail">{o.detail}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section aria-label="Certifications and memberships" className="certs">
        <div className="container certs__inner" data-reveal>
          <span className="certs__label">Certifications and memberships</span>
          <ul className="certs__list">
            <li className="cert">
              <Icon.certificate />
              RSPO <span className="cert__note">Member {site.rspoMember}</span>
            </li>
            <li className="cert">
              <Icon.certificate />
              Halal
            </li>
            <li className="cert">
              <Icon.certificate />
              FSSC 22000
            </li>
            <li className="cert">
              <Icon.certificate />
              ISO 9001:2015
            </li>
          </ul>
          <p className="certs__foot">Product certifications vary by grade and are listed on each product card.</p>
        </div>
      </section>

      {/* Who we supply */}
      <section aria-labelledby="customers-h" className="customers">
        <div className="container customers__inner">
          <div className="intro-split" data-reveal>
            <div className="intro-split__head">
              <h2 id="customers-h" className="h-section">
                Feed mills, food manufacturers and formulators across North America.
              </h2>
            </div>
            <p className="body-lg intro-split__text">
              Specifications, samples and pricing from the team in Armonk, and stock at the port nearest your plant.
            </p>
          </div>
          <div className="strip__inner customers__items">
            {customers.map((c, i) => (
              <div key={c.title} className="strip__item" data-reveal={String(i + 1)}>
                <span className="strip__title">{c.title}</span>
                <span className="strip__text">{c.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Common questions */}
      <section aria-labelledby="faq-h">
        <div className="container faq__inner">
          <div className="faq__head" data-reveal>
            <h2 id="faq-h" className="h-section">
              Common questions.
            </h2>
            <p className="body-lg">
              Not covered here? <Link href="/contact">Ask the team</Link>, or call sales on{" "}
              <a href={site.contacts[0].href}>{site.contacts[0].display}</a>.
            </p>
          </div>
          <div className="faq__list" data-reveal>
            {faqs.map((f) => (
              <details key={f.q} className="faq__item">
                <summary className="faq__q">{f.q}</summary>
                <p className="faq__a">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Contact prompt */}
      <section id="contact" aria-labelledby="contact-h">
        <div className="container prompt__inner">
          <div className="prompt__rule" data-reveal>
            <div className="prompt__head">
              <h2 id="contact-h" className="prompt__title">
                Talk to the Darby team.
              </h2>
              <p className="body-lg prompt__text">Specifications, pricing and availability for all three divisions.</p>
            </div>
            <div className="prompt__actions">
              <ButtonLink href="/contact" variant="frond">
                Contact us
              </ButtonLink>
              <a href={site.contacts[0].href} className="prompt__phone">
                <span className="prompt__phone-role">Sales</span> {site.contacts[0].display}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
