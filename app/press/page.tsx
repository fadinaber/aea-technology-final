import type { Metadata } from "next"
import { client } from "@/sanity/lib/client"
import { allPressReleasesQuery } from "@/sanity/lib/queries"
import PressPageClient from "./press-page-client"

// Increase revalidation time for better TTFB - content doesn't change frequently
export const revalidate = 3600

export const metadata: Metadata = {
  title: "Press Releases & News | AEA Technology",
  description:
    "Read the latest news and press releases from AEA Technology. Learn about our product announcements, industry partnerships, Boeing approval, and notable projects like IceCube at the South Pole.",
  keywords: [
    "AEA Technology news",
    "press releases",
    "Boeing approved TDR",
    "IceCube project",
    "avionics kit announcement",
    "RF test equipment news",
  ],
  openGraph: {
    title: "Press Releases & News | AEA Technology",
    description: "Latest news from AEA Technology - product announcements, industry partnerships, and company updates.",
    url: "https://aeatechnology.com/press",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AEA Technology Press Releases and News",
      },
    ],
  },
  alternates: {
    canonical: "https://aeatechnology.com/press",
  },
}

export type SanityPressRelease = {
  _id: string
  title: string
  slug: string
  date: string
  displayDate?: string
  description: string
  featured?: boolean
  imageUrl?: string
}

export default async function PressPage() {
  const pressReleases = await client.fetch<SanityPressRelease[]>(allPressReleasesQuery).catch(() => [])

  return <PressPageClient pressReleases={pressReleases} />
}
