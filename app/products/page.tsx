import type { Metadata } from "next"
import { client } from "@/sanity/lib/client"
import { allProductsQuery } from "@/sanity/lib/queries"
import ProductsPageClient from "./products-page-client"

export const revalidate = 60

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

type SanityProductListItem = {
  _id: string
  slug: { current: string } | null
  name: string
  tagline?: string
  shortDescription?: string
  category?: string
  badges?: string[]
  imageUrl?: string
}

export default async function ProductsPage() {
  const products = await client.fetch<SanityProductListItem[]>(allProductsQuery).catch(() => [])

  return <ProductsPageClient products={products} />
}
