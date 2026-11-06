import type { Metadata } from "next";
import { ButtonLink, Equator } from "@/components/ui";

export const metadata: Metadata = {
  title: "Page not found | Darby",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="page-hero notfound" aria-labelledby="nf-h">
      <div className="container page-hero__inner">
        <span className="label label--olein">Error 404</span>
        <h1 id="nf-h" className="h-page">
          This page has moved or no longer exists.
        </h1>
        <Equator className="page-hero__equator" />
        <p className="page-hero__lead">
          The Darby site has been rebuilt around two divisions. Everything we supply is on one of the pages below.
        </p>
        <div className="btn-row">
          <ButtonLink href="/animal-nutrition" variant="gold">
            Animal Nutrition
          </ButtonLink>
          <ButtonLink href="/food-ingredients" variant="outline">
            Food Ingredients
          </ButtonLink>
          <ButtonLink href="/" variant="outline">
            Home
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
