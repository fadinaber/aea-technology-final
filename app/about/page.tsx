import type { Metadata } from "next"
import { client } from "@/sanity/lib/client"
import { aboutPageQuery } from "@/sanity/lib/queries"
import AboutPageClient from "./about-page-client"
import { aboutPageData } from "@/data/about"

// Increase revalidation time for better TTFB - content doesn't change frequently
export const revalidate = 3600

export const metadata: Metadata = {
  title: "About AEA Technology - American RF Test Equipment Manufacturer Since 1990",
  description:
    "Learn about AEA Technology, Inc. - America's premier RF and cable test equipment manufacturer. Over 30 years of designing and manufacturing TDRs, VNAs, and SWR meters in Carlsbad, California. ISO 9001 certified, trusted by aviation, military, medical, and telecom industries worldwide.",
  keywords: [
    "AEA Technology company",
    "RF test equipment manufacturer",
    "American test equipment",
    "Carlsbad California",
    "George Naber",
    "ISO 9001 certified",
    "made in USA",
    "cable test equipment history",
  ],
  openGraph: {
    title: "About AEA Technology - American RF Test Equipment Manufacturer",
    description:
      "Over 30 years of American manufacturing excellence. Learn about our mission, values, and commitment to quality RF testing equipment.",
    url: "https://aeatechnology.com/about",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AEA Technology - American Manufacturing Since 1990",
      },
    ],
  },
  alternates: {
    canonical: "https://aeatechnology.com/about",
  },
}

export type SanityAboutPageData = {
  leadership?: {
    name?: string
    title?: string
    subtitle?: string
    imageUrl?: string
    quote?: string
    bio?: string[]
    tagline?: string
  }
  companyStory?: {
    mission?: { title?: string; content?: string }
    vision?: { title?: string; content?: string }
    history?: string[]
  }
  coreValues?: Array<{
    icon?: string
    title?: string
    description?: string
    highlight?: string
  }>
  industries?: Array<{
    name?: string
    icon?: string
    description?: string
    customers?: string
  }>
  certifications?: {
    headline?: string
    description?: string
    items?: Array<{
      name?: string
      imageUrl?: string
      link?: string
      isDownload?: boolean
    }>
  }
  cta?: {
    headline?: string
    description?: string
    primaryButton?: { text?: string; href?: string }
    secondaryButton?: { text?: string; href?: string }
  }
}

function mergeAboutData(sanityData: SanityAboutPageData | null) {
  // If no Sanity data, use static data
  if (!sanityData) return aboutPageData

  // Merge Sanity data with static fallbacks
  return {
    meta: aboutPageData.meta,
    leadership: {
      id: "george-naber",
      name: sanityData.leadership?.name || aboutPageData.leadership.name,
      title: sanityData.leadership?.title || aboutPageData.leadership.title,
      subtitle: sanityData.leadership?.subtitle || aboutPageData.leadership.subtitle,
      image: sanityData.leadership?.imageUrl || aboutPageData.leadership.image,
      quote: sanityData.leadership?.quote || aboutPageData.leadership.quote,
      bio: sanityData.leadership?.bio || aboutPageData.leadership.bio,
      tagline: sanityData.leadership?.tagline || aboutPageData.leadership.tagline,
    },
    companyStory: {
      mission: {
        title: sanityData.companyStory?.mission?.title || aboutPageData.companyStory.mission.title,
        icon: aboutPageData.companyStory.mission.icon,
        content: sanityData.companyStory?.mission?.content || aboutPageData.companyStory.mission.content,
      },
      vision: {
        title: sanityData.companyStory?.vision?.title || aboutPageData.companyStory.vision.title,
        icon: aboutPageData.companyStory.vision.icon,
        content: sanityData.companyStory?.vision?.content || aboutPageData.companyStory.vision.content,
      },
      history: sanityData.companyStory?.history || aboutPageData.companyStory.history,
    },
    coreValues:
      sanityData.coreValues?.length
        ? sanityData.coreValues.map((v, i) => ({
            id: `value-${i}`,
            icon: v.icon || "Flag",
            title: v.title || "",
            description: v.description || "",
            highlight: v.highlight || "",
          }))
        : aboutPageData.coreValues,
    industries:
      sanityData.industries?.length
        ? sanityData.industries.map((ind, i) => ({
            id: `industry-${i}`,
            name: ind.name || "",
            icon: ind.icon || "📡",
            description: ind.description || "",
            customers: ind.customers || "",
          }))
        : aboutPageData.industries,
    certifications: {
      headline: sanityData.certifications?.headline || aboutPageData.certifications.headline,
      description: sanityData.certifications?.description || aboutPageData.certifications.description,
      items:
        sanityData.certifications?.items?.length
          ? sanityData.certifications.items.map((cert, i) => ({
              id: `cert-${i}`,
              name: cert.name || "",
              image: cert.imageUrl || "/placeholder.svg",
              link: cert.link || null,
              width: 140,
              height: 140,
              isDownload: cert.isDownload || false,
            }))
          : aboutPageData.certifications.items,
    },
    cta: {
      headline: sanityData.cta?.headline || aboutPageData.cta.headline,
      description: sanityData.cta?.description || aboutPageData.cta.description,
      primaryButton: {
        text: sanityData.cta?.primaryButton?.text || aboutPageData.cta.primaryButton.text,
        href: sanityData.cta?.primaryButton?.href || aboutPageData.cta.primaryButton.href,
      },
      secondaryButton: {
        text: sanityData.cta?.secondaryButton?.text || aboutPageData.cta.secondaryButton.text,
        href: sanityData.cta?.secondaryButton?.href || aboutPageData.cta.secondaryButton.href,
      },
    },
  }
}

export default async function AboutPage() {
  const sanityData = await client.fetch<SanityAboutPageData | null>(aboutPageQuery).catch(() => null)
  const pageData = mergeAboutData(sanityData)

  return <AboutPageClient data={pageData} />
}
