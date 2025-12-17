import type { MetadataRoute } from "next"

// Product slugs for dynamic routes
const productSlugs = [
  "e20-20-avionics",
  "e20-20n",
  "e20-20f-catv",
  "e20-20b",
  "via-bravo-mri-3000",
  "via-bravo-ex2",
  "swr-site-analyzer",
]

const resourceCategories = ["software", "manuals", "videos", "faqs", "application-notes"]

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://aeatechnology.com"
  const lastModified = new Date("2025-01-13")

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/products`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/resources`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/press`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact/distributors`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ]

  // Dynamic product pages
  const productPages: MetadataRoute.Sitemap = productSlugs.map((slug) => ({
    url: `${baseUrl}/products/${slug}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.8,
  }))

  const resourcePages: MetadataRoute.Sitemap = resourceCategories.map((category) => ({
    url: `${baseUrl}/resources?tab=${category}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.6,
  }))

  return [...staticPages, ...productPages, ...resourcePages]
}
