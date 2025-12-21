import type { Metadata } from "next"
import { client } from "@/sanity/lib/client"
import { allDistributorsQuery } from "@/sanity/lib/queries"
import DistributorLocatorClient from "./distributor-locator-client"

// Increase revalidation time for better TTFB - content doesn't change frequently
export const revalidate = 3600

export const metadata: Metadata = {
  title: "Find a Distributor | AEA Technology",
  description:
    "Locate authorized AEA Technology distributors worldwide. Find local partners for RF test equipment sales, support, and service in the US and internationally.",
  keywords: [
    "AEA Technology distributors",
    "RF equipment dealers",
    "test equipment resellers",
    "international distributors",
    "US distributors",
  ],
  openGraph: {
    title: "Find a Distributor | AEA Technology",
    description: "Locate authorized AEA Technology distributors worldwide for RF test equipment sales and support.",
    type: "website",
    url: "https://aeatechnology.com/contact/distributors",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AEA Technology Authorized Distributors Worldwide",
      },
    ],
  },
  alternates: {
    canonical: "https://aeatechnology.com/contact/distributors",
  },
}

export type SanityDistributor = {
  _id: string
  name: string
  category?: string
  region: "us" | "international"
  country?: string
  address?: string
  phone?: string
  phoneTollFree?: string
  fax?: string
  faxTollFree?: string
  email: string
  website?: string
  specialties?: string[]
}

export default async function DistributorsPage() {
  const distributors = await client.fetch<SanityDistributor[]>(allDistributorsQuery).catch(() => [])
  
  return <DistributorLocatorClient distributors={distributors} />
}
