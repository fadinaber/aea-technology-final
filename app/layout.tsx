import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import Script from "next/script"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css"
import ClientLayout from "./client-layout"
import OrganizationSchema from "@/components/seo/organization-schema"
import WebsiteSchema from "@/components/seo/website-schema"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
})

export const metadata: Metadata = {
  metadataBase: new URL("https://aeatechnology.com"),
  title: {
    default: "AEA Technology - TDR, VNA & SWR Test Equipment | Made in USA",
    template: "%s | AEA Technology",
  },
  description:
    "Leading manufacturer of Time Domain Reflectometers (TDRs), Vector Network Analyzers (VNAs), and SWR meters. Professional RF and cable testing equipment designed and manufactured in the USA since 1990. Trusted by aviation, military, medical, and telecommunications industries.",
  keywords: [
    "TDR",
    "Time Domain Reflectometer",
    "VNA",
    "Vector Network Analyzer",
    "SWR meter",
    "cable tester",
    "RF test equipment",
    "cable fault locator",
    "avionics TDR",
    "E20/20 TDR",
    "Bravo MRI analyzer",
    "cable testing equipment",
    "made in USA test equipment",
    "AEA Technology",
  ],
  authors: [{ name: "AEA Technology, Inc.", url: "https://aeatechnology.com" }],
  creator: "AEA Technology, Inc.",
  publisher: "AEA Technology, Inc.",
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

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aeatechnology.com",
    siteName: "AEA Technology",
    title: "AEA Technology - Professional RF & Cable Test Equipment",
    description:
      "Leading manufacturer of TDRs, VNAs, and SWR meters. Professional RF testing equipment made in USA since 1990.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "AEA Technology" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AEA Technology - TDR, VNA & SWR Test Equipment",
    description:
      "Professional RF and cable testing equipment. Time Domain Reflectometers, Vector Network Analyzers, and SWR meters made in USA.",
    images: ["/opengraph-image"],
    creator: "@aeatech",
  },
  alternates: {
    canonical: "https://aeatechnology.com",
  },
  icons: {
    icon: "/favicon.ico",
  },
  category: "Technology",
  generator: "v0.app",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  userScalable: true,
  minimumScale: 1,
  maximumScale: 5,
  themeColor: "#2563eb",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Preload LCP image - hero featured product image */}
        <link rel="preload" href="/images/products/avionics/full-kit.png" as="image" type="image/png" fetchPriority="high" />
        {/* Preconnect to Sanity CDN for faster image loading */}
        <link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
        <OrganizationSchema />
        <WebsiteSchema />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ClientLayout>{children}</ClientLayout>

        {/* 
          ============================================
          GOOGLE ANALYTICS & ADS TRACKING
          ============================================
          Replace the placeholder IDs below with your real IDs:
          
          1. Google Analytics 4 Measurement ID
             - Replace: G-PLACEHOLDER (line 117 and 124)
             - Format: G-XXXXXXXXXX
             - Get it from: Google Analytics → Admin → Data Streams
          
          2. Google Ads Conversion ID
             - Replace: AW-PLACEHOLDER (line 131)
             - Format: AW-XXXXXXXXX
             - Get it from: Google Ads → Tools & Settings → Conversions
          ============================================
        */}
        {/* Preconnect to Google Analytics for faster loading */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-PLACEHOLDER`}
        />
        <Script id="google-analytics-config" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-PLACEHOLDER');
          `}
        </Script>

        {/* Google Ads Conversion Tracking */}
        <Script id="google-ads-conversion" strategy="afterInteractive">
          {`
            gtag('config', 'AW-PLACEHOLDER');
          `}
        </Script>

        {/* Vercel Speed Insights - Load after page is interactive */}
        <SpeedInsights />
      </body>
    </html>
  )
}
