import type { Metadata } from "next";
import { ogImages, pageMetadata } from "@/lib/seo";
import { ContactForm } from "@/components/ContactForm";
import { GlobalPresence } from "@/components/GlobalPresence";
import { Breadcrumb } from "@/components/ui";
import { offices, site, warehouses } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Contact | Darby",
  description:
    "Talk to the Darby team about specifications, pricing and availability. Sales +1 914 557 0517. 6 Maple Ave, Armonk, NY 10504.",
  path: "/contact",
  image: ogImages.contact,
});

export default function ContactPage() {
  return (
    <>
      <section aria-labelledby="contact-h" className="contact">
        <div className="container contact__inner">
          <div className="contact__intro">
            <Breadcrumb current="Contact" />
            <h1 id="contact-h" className="contact__title">
              Talk to the Darby team.
            </h1>
            <p className="contact__lead">
              Specifications, pricing and availability for Animal Nutrition, Food Ingredients and Personal Care. Call
              the right person directly, or send a message to the team in Armonk, New York.
            </p>
            <dl className="details">
              {site.contacts.map((c) => (
                <div key={c.role} className="details__row">
                  <dt className="label label--olein">{c.role}</dt>
                  <dd>
                    <a href={c.href} className="details__value">
                      {c.display}
                    </a>
                    <span className="details__name">{c.name}</span>
                  </dd>
                </div>
              ))}
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
        <div className="container network__inner">
          <div className="intro-split">
            <div className="intro-split__head">
              <h2 id="ports-h" className="h-section">
                Stocked on three coasts. Present at origin.
              </h2>
            </div>
            <p className="body-lg intro-split__text">
              Orders ship from the port nearest your plant, LTL, FTL or as bulk liquid ex-tank, through trusted
              logistics partners. Our Thailand office keeps us close to the producers.
            </p>
          </div>

          <div data-reveal>
            <GlobalPresence />
          </div>

          <div className="network__legend" data-reveal>
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
            <div className="coast coast--offices">
              <span className="label label--gold">Offices</span>
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
    </>
  );
}
