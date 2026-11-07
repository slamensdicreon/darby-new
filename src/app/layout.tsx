import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { homeSeo, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import "@/styles/tokens.css";
import "@/styles/globals.css";

// Hanken Grotesk variable (SIL OFL), self-hosted. Weights 300–600 are used.
const hanken = localFont({
  src: "./fonts/hanken-grotesk-latin-wght-normal.woff2",
  weight: "100 900",
  style: "normal",
  display: "swap",
  variable: "--font-hanken",
  fallback: ["Helvetica Neue", "Arial", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  ...pageMetadata(homeSeo),
  // Pages set their own canonical; the 404 and any future page without one get none.
  alternates: undefined,
  applicationName: site.name,
  formatDetection: { telephone: false, email: false, address: false },
  robots: site.indexable ? undefined : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#1E3B2F",
  width: "device-width",
  initialScale: 1,
};

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.legalName,
  alternateName: site.name,
  url: site.url,
  logo: `${site.url}/assets/brand/darby-wordmark-on-white.svg`,
  email: site.email.display,
  telephone: site.contacts[0].href.replace("tel:", ""),
  contactPoint: site.contacts.map((c) => ({
    "@type": "ContactPoint",
    contactType: c.role,
    telephone: c.href.replace("tel:", ""),
    email: site.email.display,
    areaServed: "US",
  })),
  foundingDate: String(site.since),
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.locality,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  },
  sameAs: [site.linkedin],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={hanken.variable}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
        />
      </body>
    </html>
  );
}
