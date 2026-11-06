import type { Metadata } from "next";
import Image from "next/image";
import { ContactForm } from "@/components/ContactForm";
import { Breadcrumb } from "@/components/ui";
import { site, warehouses } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact | Darby",
  description:
    "Talk to a Darby palm specialist about specifications, pricing and availability. 6 Maple Ave, Armonk, NY 10504. +1 914 701 0003.",
  alternates: { canonical: "/contact" },
  openGraph: { title: "Contact | Darby", url: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <section aria-labelledby="contact-h" className="contact">
        <div className="container contact__inner">
          <div className="contact__intro">
            <Breadcrumb current="Contact" />
            <h1 id="contact-h" className="contact__title">
              Talk to a palm specialist.
            </h1>
            <p className="contact__lead">
              Specifications, pricing and availability for Animal Nutrition and Food Ingredients. Your message goes
              straight to the team in Armonk, New York.
            </p>
            <dl className="details">
              <div className="details__row">
                <dt className="label label--olein">Call</dt>
                <dd>
                  <a href={site.phone.href} className="details__value">
                    {site.phone.display}
                  </a>
                </dd>
              </div>
              <div className="details__row">
                <dt className="label label--olein">Email</dt>
                <dd>
                  <a href={site.email.href} className="details__value">
                    {site.email.display}
                  </a>
                </dd>
              </div>
              <div className="details__row">
                <dt className="label label--olein">Visit</dt>
                <dd>
                  <span className="details__value">
                    {site.address.street}
                    <br />
                    {site.address.locality}, {site.address.region} {site.address.postalCode}
                  </span>
                </dd>
              </div>
            </dl>
            <div className="rspo-line">
              <span className="rspo-line__rule" aria-hidden="true" />
              <span className="label label--muted">RSPO Member {site.rspoMember}</span>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>

      <section aria-labelledby="ports-h">
        <div className="container ports__inner">
          <div className="ports__text">
            <span className="label label--gold">Warehouses</span>
            <h2 id="ports-h" className="ports__title">
              Stocked on three coasts.
            </h2>
            <p className="body-lg ports__lead">
              Orders ship from the port nearest your plant, LTL, FTL or as bulk liquid ex-tank, through trusted
              logistics partners.
            </p>
            <div className="coasts">
              {warehouses.map((w) => (
                <div key={w.coast} className="coast">
                  <span className="label label--gold">{w.coast}</span>
                  {w.cities.map((c) => (
                    <span key={c} className="coast__city">
                      {c}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="ports__media">
            <Image
              src="/assets/video/darby-hero-poster.jpg"
              alt="Palm fronds against a sunset over the sea"
              fill
              sizes="(min-width: 1000px) 520px, 100vw"
              style={{ objectFit: "cover", objectPosition: "30% 50%" }}
            />
          </div>
        </div>
      </section>
    </>
  );
}
