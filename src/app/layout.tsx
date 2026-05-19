import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Inter, Rajdhani, Share_Tech_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500"],
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});

const shareTechMono = Share_Tech_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: "400",
});

const BASE_URL = "https://nodaltech.ae";

export const viewport: Viewport = {
  themeColor: "#070a0f",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Nodal Technical Consultancy — Precision Event Engineering",
    template: "%s | Nodal Technical Consultancy",
  },
  description:
    "Nodal Technical Consultancy FZ-LLC. Precision technical production, AV systems, and live event engineering for festivals and shows worldwide. Based in Dubai, UAE.",
  keywords: [
    "technical production",
    "event engineering",
    "AV systems",
    "festival production",
    "live events Dubai",
    "Tomorrowland",
    "MDLBEAST",
    "audio systems",
    "lighting design",
    "technical consultancy UAE",
    "live event AV",
    "systems integration",
  ],
  authors: [{ name: "Nodal Technical Consultancy" }],
  creator: "Nodal Technical Consultancy FZ-LLC",
  publisher: "Nodal Technical Consultancy FZ-LLC",
  category: "Technology",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: "Nodal Technical Consultancy — Precision Event Engineering",
    description:
      "Precision-grade production planning, AV systems integration, and full technical coordination for live events worldwide.",
    type: "website",
    url: BASE_URL,
    siteName: "Nodal Technical Consultancy",
    locale: "en_AE",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Nodal Technical Consultancy — Precision Event Engineering",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nodal Technical Consultancy — Precision Event Engineering",
    description:
      "Precision-grade production planning, AV systems integration, and full technical coordination for live events worldwide.",
    images: ["/og-image.png"],
    site: "@nodaltech",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://nodaltech.ae/#organization",
  name: "Nodal Technical Consultancy FZ-LLC",
  alternateName: "Nodal TC",
  url: "https://nodaltech.ae",
  logo: "https://nodaltech.ae/icon-512.png",
  image: "https://nodaltech.ae/og-image.png",
  description:
    "Precision technical production, AV systems integration, and live event engineering for festivals and shows worldwide. Based in Dubai, UAE.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dubai",
    addressCountry: "AE",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "25.2048",
    longitude: "55.2708",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: "info@nodaltc.com",
    availableLanguage: "English",
  },
  sameAs: [
    "https://www.linkedin.com/company/nodaltech",
    "https://www.instagram.com/nodaltech",
  ],
  serviceArea: {
    "@type": "Place",
    name: "Worldwide",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Technical Production Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "AV Systems Integration" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Live Event Engineering" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Lighting Design" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Festival Production" } },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(inter.variable, rajdhani.variable, shareTechMono.variable)}
    >
      <head>
        <Script
          id="json-ld-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#070a0f] text-[#e8f0fe] font-[var(--font-body)] antialiased overflow-x-hidden">
        {/* Skip to main content — accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:bg-[#00d4ff] focus:text-black focus:px-4 focus:py-2 focus:font-bold focus:rounded"
        >
          Skip to main content
        </a>
        <main id="main-content">
          {children}
        </main>
      </body>
    </html>
  );
}
