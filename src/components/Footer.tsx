import Link from "next/link";
import { site } from "@/lib/site";
import { Wordmark } from "./Wordmark";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div className="site-footer__top">
          <Wordmark height={30} ground="deep" />
          <div className="site-footer__cols">
            <nav aria-label="Footer" className="site-footer__col">
              <Link href="/animal-nutrition">Animal Nutrition</Link>
              <Link href="/food-ingredients">Food Ingredients</Link>
              <Link href="/#about">About</Link>
              <Link href="/contact">Contact</Link>
            </nav>
            <address className="site-footer__col" style={{ fontStyle: "normal" }}>
              <span>
                {site.address.street}
                <br />
                {site.address.locality}, {site.address.region} {site.address.postalCode}
              </span>
              <a href={site.phone.href}>{site.phone.display}</a>
              <a href={site.email.href}>{site.email.display}</a>
              <a href={site.linkedin} rel="noopener">
                LinkedIn
              </a>
            </address>
          </div>
        </div>
        <div className="site-footer__legal">
          <div className="site-footer__legal-group">
            <span>© {year} {site.legalName}</span>
            <Link href="/privacy-policy">Privacy policy</Link>
          </div>
          <span>RSPO Member {site.rspoMember}</span>
        </div>
      </div>
    </footer>
  );
}
