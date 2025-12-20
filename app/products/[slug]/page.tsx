import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { client } from "@/sanity/lib/client"
import { productBySlugQuery, productSlugsQuery } from "@/sanity/lib/queries"
import { getProductBySlug, getAllProductSlugs, type Product } from "@/data/all-products"
import ProductPageClient from "./product-page-client"
import ProductSchema from "@/components/seo/product-schema"
import BreadcrumbSchema from "@/components/seo/breadcrumb-schema"
import { getDatasheetPath } from "@/lib/file-helpers"

export const revalidate = 300 // Revalidate every 5 minutes for better caching

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

type SanityProduct = {
  _id?: string
  slug?: { current?: string }
  name?: string
  tagline?: string
  shortDescription?: string
  category?: string
  keyFeatures?: string[]
  displayFeatures?: string[]
  applications?: string[]
  badges?: { text: string; variant: "green" | "blue" }[]
  datasheetUrl?: string
  datasheetFileUrl?: string
  modelImages?: Array<{ modelIndex?: number; images?: string[] }>
}

const emptyProduct = (slug: string): Product => ({
  slug,
  name: "Product",
  tagline: "",
  shortDescription: "",
  category: "tdr",
  badges: [],
  modelImages: { 0: [] },
  keyFeatures: [],
  displayFeatures: [],
  specifications: {},
  certifications: [],
  models: [],
  accessories: [],
  datasheetUrl: "",
  resources: [],
  overviewDescription: "",
  applications: [],
  capabilityCards: [],
  softwareInfo: { name: "", description: "", features: [] },
})

function mergeSanityProduct(base: Product | undefined, sanity: SanityProduct | null, slug: string): Product | null {
  if (!base && !sanity) return null

  const merged: Product = base ? { ...base } : emptyProduct(slug)

  if (sanity) {
    if (sanity.name) merged.name = sanity.name
    if (sanity.tagline) merged.tagline = sanity.tagline
    if (sanity.shortDescription) merged.shortDescription = sanity.shortDescription
    if (sanity.category) merged.category = sanity.category as Product["category"]
    if (sanity.keyFeatures) merged.keyFeatures = sanity.keyFeatures
    if (sanity.displayFeatures) merged.displayFeatures = sanity.displayFeatures
    if (sanity.applications) merged.applications = sanity.applications
    if (sanity.badges) merged.badges = sanity.badges as Product["badges"]
    
    // Prioritize Sanity datasheet (uploaded file > external URL > local file)
    if (sanity.datasheetFileUrl) {
      // Use uploaded file from Sanity
      merged.datasheetUrl = sanity.datasheetFileUrl
    } else if (sanity.datasheetUrl) {
      // Use external URL from Sanity
      merged.datasheetUrl = sanity.datasheetUrl
    } else if (!merged.datasheetUrl || merged.datasheetUrl === "") {
      // Fallback to local datasheet if no Sanity URL is set
      merged.datasheetUrl = getDatasheetPath(slug)
    }

    if (sanity.modelImages) {
      const record: Record<number, string[]> = { ...(merged.modelImages || {}) }
      sanity.modelImages.forEach((m) => {
        const index = m.modelIndex ?? 0
        if (m.images?.length) {
          record[index] = m.images
        }
      })
      merged.modelImages = record
    }
  } else {
    // If no Sanity data, use local datasheet if base doesn't have one
    if (!merged.datasheetUrl || merged.datasheetUrl === "") {
      merged.datasheetUrl = getDatasheetPath(slug)
    }
  }

  return merged
}

// Generate static params for all products
export async function generateStaticParams() {
  const sanitySlugs = await client.fetch<{ slug: string }[]>(productSlugsQuery).catch(() => [])
  const staticSlugs = getAllProductSlugs()
  const combined = new Set<string>([...staticSlugs, ...sanitySlugs.map((s) => s.slug)])
  return Array.from(combined).map((slug) => ({ slug }))
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params
  const sanityProduct = await client.fetch<SanityProduct | null>(productBySlugQuery, { slug }).catch(() => null)
  const baseProduct = getProductBySlug(slug)
  const product = mergeSanityProduct(baseProduct, sanityProduct, slug)

  if (!product) {
    return {
      title: "Product Not Found | AEA Technology",
    }
  }

  return {
    title: `${product.name} | AEA Technology`,
    description: product.shortDescription,
    keywords: [
      product.name,
      product.category === "tdr" ? "TDR" : "VNA",
      "cable testing",
      "AEA Technology",
      ...product.applications.slice(0, 5),
    ],
    openGraph: {
      title: `${product.name} - ${product.tagline}`,
      description: product.shortDescription,
      type: "website",
      url: `https://aeatechnology.com/products/${slug}`,
      images: product.modelImages[0]?.[0] ? [product.modelImages[0][0]] : [],
    },
    alternates: {
      canonical: `https://aeatechnology.com/products/${slug}`,
    },
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const sanityProduct = await client.fetch<SanityProduct | null>(productBySlugQuery, { slug }).catch(() => null)
  const baseProduct = getProductBySlug(slug)
  const product = mergeSanityProduct(baseProduct, sanityProduct, slug)

  if (!product) {
    notFound()
  }

  return (
    <>
      <ProductSchema
        name={product.name}
        description={product.shortDescription}
        image={product.modelImages[0]?.[0] || "/placeholder.svg"}
        sku={product.models[0]?.partNumber || slug}
        category={product.category === "tdr" ? "Time Domain Reflectometer" : "Vector Network Analyzer"}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://aeatechnology.com" },
          { name: "Products", url: "https://aeatechnology.com/products" },
          { name: product.name, url: `https://aeatechnology.com/products/${slug}` },
        ]}
      />
      <ProductPageClient product={product} />
    </>
  )
}
