import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
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
  title: "Darby | Palm fats for feed and food",
  description:
    "Darby supplies palm-based bypass fats for dairy and beef rations and specialty fats for bakery and confectionery, sourced from RSPO-certified producers and stocked at six U.S. ports.",
  applicationName: "Darby",
  openGraph: {
    type: "website",
    siteName: "Darby",
    locale: "en_US",
    images: [{ url: "/assets/video/darby-hero-poster.jpg", alt: "Palm fronds against a sunset over the sea" }],
  },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false, email: false, address: false },
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
  telephone: "+1-914-701-0003",
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
