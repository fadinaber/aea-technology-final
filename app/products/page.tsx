import type { Metadata } from "next"
import ProductsPageClient from "./products-page-client"

export const metadata: Metadata = {
  title: "TDR, VNA & SWR Test Equipment - RF & Cable Testing Products",
  description:
    "Browse our complete line of Time Domain Reflectometers (TDRs), Vector Network Analyzers (VNAs), and SWR meters. Professional cable fault locators and RF test equipment for aviation, CATV, telecommunications, and medical applications. Made in USA.",
  keywords: [
    "TDR products",
    "E20/20 TDR",
    "avionics TDR kit",
    "VNA analyzer",
    "Bravo MRI analyzer",
    "SWR site analyzer",
    "cable fault locator",
    "RF test equipment",
    "CATV TDR",
    "network TDR",
  ],
  openGraph: {
    title: "RF & Cable Test Equipment | AEA Technology Products",
    description:
      "Complete line of TDRs, VNAs, and SWR meters for professional cable and RF testing. Aviation, medical, telecom, and broadcast applications.",
    url: "https://aeatechnology.com/products",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AEA Technology Product Line - TDRs, VNAs, SWR Meters",
      },
    ],
  },
  alternates: {
    canonical: "https://aeatechnology.com/products",
  },
}

export default function ProductsPage() {
  return <ProductsPageClient />
}
