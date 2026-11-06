import type { Metadata } from "next";
import { ogImages, pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { Breadcrumb, Equator } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Privacy policy | Darby",
  description:
    "How Darby Trading Inc. collects, uses and protects the information you share through darbyinc.com, and the choices you have.",
  path: "/privacy-policy",
  image: ogImages.home,
});

/*
 * DRAFT — open item #7. Written to describe what this site actually does (two forms, no
 * analytics cookies). Darby's counsel must review and approve it before launch, and it must
 * be updated if analytics, a CRM or a mailing tool is added.
 */
const UPDATED = "November 2026";

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="page-hero" aria-labelledby="privacy-h">
        <div className="container page-hero__inner">
          <Breadcrumb current="Privacy policy" />
          <h1 id="privacy-h" className="h-page">
            Privacy policy
          </h1>
          <Equator className="page-hero__equator" />
          <p className="page-hero__lead">
            How {site.legalName} collects, uses and protects the information you share through this website. Last
            updated {UPDATED}.
          </p>
        </div>
      </section>
      <section>
        <div className="container prose__inner">
          <div className="prose">
            <h2>Who we are</h2>
            <p>
              This website is operated by {site.legalName} (“Darby”, “we”, “us”), {site.address.street},{" "}
              {site.address.locality}, {site.address.region} {site.address.postalCode}, United States. For any question
              about this policy or your information, email <a href={site.email.href}>{site.email.display}</a> or call{" "}
              <a href={site.phone.href}>{site.phone.display}</a>.
            </p>

            <h2>What we collect</h2>
            <p>We collect only what you choose to send us through the two forms on this site:</p>
            <ul>
              <li>
                <strong>Contact form:</strong> your name, company, work email, optional phone number, the division you
                are interested in, your message, and whether you asked for product specifications.
              </li>
              <li>
                <strong>Specification requests:</strong> your name, work email, the division and product you asked
                about, and whether you opted in to product updates.
              </li>
            </ul>
            <p>
              Like most websites, our hosting provider automatically records technical information such as IP address,
              browser type and the pages requested. We use it to keep the site secure and working, for example to
              limit repeated form submissions.
            </p>

            <h2>How we use it</h2>
            <ul>
              <li>To answer your inquiry and send the specifications you request.</li>
              <li>
                To send product updates, only if you tick the opt-in box. You can unsubscribe at any time by replying to
                any update or emailing us.
              </li>
              <li>To protect the website against spam and abuse.</li>
            </ul>
            <p>We do not sell your information, and we do not use it for advertising.</p>

            <h2>Cookies</h2>
            <p>
              This website does not set advertising or analytics cookies. If that changes, we will update this policy
              and ask for your consent where the law requires it.
            </p>

            <h2>Who we share it with</h2>
            <p>
              Your information is handled by the Darby team and by service providers who host this website and deliver
              our email, under agreements that require them to protect it. We may disclose information where the law
              requires us to.
            </p>

            <h2>How long we keep it</h2>
            <p>
              We keep inquiries and requests for as long as needed to answer them and to maintain our business records,
              and opt-in details until you unsubscribe.
            </p>

            <h2>Your choices and rights</h2>
            <p>
              You can ask us to access, correct or delete the information we hold about you, or to stop sending you
              updates, by emailing <a href={site.email.href}>{site.email.display}</a>. Depending on where you live, you
              may have further rights under local privacy laws, and we will honor them.
            </p>

            <h2>Changes</h2>
            <p>
              We may update this policy from time to time. The date at the top shows when it last changed. If you have
              questions, please <Link href="/contact">contact us</Link>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
