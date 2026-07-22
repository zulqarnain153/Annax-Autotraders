import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingActionButtons } from "@/components/layout/FloatingActionButtons";
import { BackToTop } from "@/components/layout/BackToTop";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { business } from "@/lib/business";

const barlow = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-barlow",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(business.seo.siteUrl),
  title: {
    default: business.seo.defaultTitle,
    template: business.seo.titleTemplate,
  },
  description: business.seo.defaultDescription,
  keywords: [
    "used cars Staines-upon-Thames",
    "car dealership Surrey",
    "Annax Auto Traders",
    "used cars Surrey",
    "car finance UK",
    "part exchange car",
  ],
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: business.seo.siteUrl,
    siteName: business.name,
    title: business.seo.defaultTitle,
    description: business.seo.defaultDescription,
    images: [{ url: business.seo.ogImage, width: 1200, height: 630, alt: business.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: business.seo.defaultTitle,
    description: business.seo.defaultDescription,
  },
  robots: { index: true, follow: true },
  alternates: { canonical: business.seo.siteUrl },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#08080A",
};

const schema = {
  "@context": "https://schema.org",
  "@type": "AutoDealer",
  name: business.name,
  description: business.shortDescription,
  url: business.seo.siteUrl,
  telephone: business.contact.phone,
  email: business.contact.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: business.address.line1,
    addressLocality: business.address.city,
    addressRegion: business.address.county,
    postalCode: business.address.postcode,
    addressCountry: "GB",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: business.address.lat,
    longitude: business.address.lng,
  },
  openingHoursSpecification: business.hours.map((h) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: h.day,
    opens: h.open,
    closes: h.close,
  })),
  sameAs: Object.values(business.social),
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: business.reviewsSummary.average,
    reviewCount: business.reviewsSummary.count,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${barlow.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
      <body>
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
        <FloatingActionButtons />
        <BackToTop />
        <CookieBanner />
      </body>
    </html>
  );
}
