import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
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
        <link rel="preload" href="/images/featured/e20-20-tdr.png" as="image" type="image/png" />
        <OrganizationSchema />
        <WebsiteSchema />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
