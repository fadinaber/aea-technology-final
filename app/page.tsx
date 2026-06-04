import Hero from "@/components/hero"
import FeaturedProducts from "@/components/featured-products"
import WhyChooseUs from "@/components/why-choose-us"
import ResourcesTeaser from "@/components/resources-teaser"
import { SupportCTA } from "@/components/support-cta"
import { client } from "@/sanity/lib/client"
import { homepageQuery } from "@/sanity/lib/queries"
import type {
  FeaturedProductsSection,
  HeroSection,
  ResourcesTeaserSection,
} from "@/data/homepage"
import type { CertificationsSection } from "@/data/why-choose-us"

// Increase revalidation time for better TTFB - content changes monthly
// 12 hours cache with stale-while-revalidate for instant responses
export const revalidate = 43200

type SanityHomepageHero = {
  enabled?: boolean
  badges?: HeroSection["data"]["badges"]
  headline?: HeroSection["data"]["headline"]
  description?: string
  valuePropositions?: HeroSection["data"]["valuePropositions"]
  cta?: HeroSection["data"]["cta"]
  stats?: HeroSection["data"]["stats"]
  featuredProductSlug?: string
  featuredProductData?: {
    slug?: string
    name?: string
    description?: string
    badge?: string
    imageUrl?: string
    imageAssetUrl?: string
  }
  featuredProduct?: {
    slug?: string
    name?: string
    shortDescription?: string
    imageUrl?: string
  }
}

type SanityHomepageFeaturedProductsProduct = {
  _id?: string
  slug?: string  // Query returns slug.current directly as string
  name?: string
  shortDescription?: string
  imageUrl?: string
  category?: string
  keyFeatures?: string[]
}

type SanityHomepageFeaturedProductsManualProduct = {
  productId?: string
  name?: string
  description?: string
  imageUrl?: string
  imageAssetUrl?: string
  category?: string
  features?: string[]
}

type SanityHomepageFeaturedProducts = {
  enabled?: boolean
  badge?: string
  headline?: string
  description?: string
  products?: SanityHomepageFeaturedProductsProduct[]
  productsList?: SanityHomepageFeaturedProductsManualProduct[]
  cta?: FeaturedProductsSection["data"]["cta"]
}

type SanityHomepageResourcesTeaser = {
  enabled?: boolean
  headline?: string
  description?: string
  resourceTypes?: ResourcesTeaserSection["data"]["resourceTypes"]
  cta?: ResourcesTeaserSection["data"]["cta"]
}

type SanityWhyChooseUsCertItem = {
  name?: string
  displayText?: string
  logoUrl?: string
  fileUrl?: string
  externalLink?: string
  isDownload?: boolean
}

type SanityWhyChooseUs = {
  enabled?: boolean
  certifications?: {
    sectionTitle?: string
    sectionDescription?: string
    items?: SanityWhyChooseUsCertItem[]
  }
}

type SanityHomepage = {
  hero?: SanityHomepageHero
  featuredProducts?: SanityHomepageFeaturedProducts
  whyChooseUs?: SanityWhyChooseUs
  resourcesTeaser?: SanityHomepageResourcesTeaser
}

function mapHeroFromSanity(hero?: SanityHomepageHero): HeroSection["data"] | undefined {
  if (!hero) return undefined

  const featuredRef = hero.featuredProduct
  const featuredManual = hero.featuredProductData
  const featured =
    featuredRef ||
    (featuredManual
      ? {
          slug: featuredManual.slug || hero.featuredProductSlug,
          name: featuredManual.name,
          shortDescription: featuredManual.description,
          imageUrl: featuredManual.imageAssetUrl || featuredManual.imageUrl || undefined,
        }
      : undefined)

  // Use Sanity headline directly if it exists, otherwise use fallback
  const headline = hero.headline && hero.headline.line1 
    ? hero.headline 
    : {
        line1: "Professional RF",
        line2: "Testing Equipment",
        line3: "Products & Support",
      }

  return {
    badges: hero.badges ?? [],
    headline: headline,
    description:
      hero.description ??
      "Trusted by aviation, military, and telecommunications professionals for over 30 years. Precision testing instruments designed and manufactured in the USA for critical applications.",
    valuePropositions: hero.valuePropositions ?? [],
    cta:
      hero.cta ??
      ({
        primary: { text: "Browse Equipment", href: "/products" },
        secondary: { text: "Request Quote", href: "/contact" },
      } as HeroSection["data"]["cta"]),
    stats: hero.stats ?? [],
    featuredProduct: {
      slug: featured?.slug ?? hero.featuredProductSlug ?? "e20-20-avionics",
      name: featured?.name ?? "Featured Product",
      description:
        featured?.shortDescription ?? "Explore our professional RF and cable testing solutions.",
      image: featured?.imageUrl && featured.imageUrl.trim() !== "" 
        ? featured.imageUrl 
        : "/images/products/avionics/full-kit.png",
      badge: "Featured",
    },
  }
}

// Helper function to get featured product image from local folder
function getFeaturedProductImage(slug: string | undefined, name: string | undefined, imageUrl?: string): string {
  // If we have a valid Sanity image URL, use it
  if (imageUrl && imageUrl.trim() !== "" && imageUrl !== "null" && !imageUrl.includes("null")) {
    return imageUrl
  }
  
  // Otherwise, map to local featured images based on slug or name
  const identifier = (slug || name || "").toLowerCase()
  
  if (identifier.includes("avionics") || identifier.includes("avionics-tdr")) {
    return "/images/featured/avionics-tdr-kit.png"
  }
  if (identifier.includes("mri") || identifier.includes("bravo")) {
    return "/images/featured/bravo-mri.jpg"
  }
  if (identifier.includes("e20") || identifier.includes("e2020") || identifier.includes("tdr")) {
    return "/images/featured/e20-20-tdr.png"
  }
  if (identifier.includes("swr") || identifier.includes("site") || identifier.includes("analyzer")) {
    return "/images/featured/swr-analyzer.png"
  }
  
  return "/placeholder.svg"
}

function mapFeaturedProductsFromSanity(
  featured?: SanityHomepageFeaturedProducts,
): FeaturedProductsSection["data"] | undefined {
  if (!featured) return undefined

  const hasRefs = (featured.products?.length ?? 0) > 0
  const manualList = featured.productsList ?? []

  return {
    badge: featured.badge ?? "Featured Products",
    headline: featured.headline ?? "Professional RF Testing Products & Solutions",
    description:
      featured.description ??
      "Discover our most popular RF and cable testing products, each designed for specific applications and built to deliver exceptional performance in demanding environments.",
    products:
      (hasRefs
        ? featured.products?.map((p) => ({
            id: p.slug ?? p._id ?? "",
            name: p.name ?? "Product",
            description: p.shortDescription ?? "",
            image: getFeaturedProductImage(p.slug, p.name, p.imageUrl),
            category: p.category ?? "Product",
            features: p.keyFeatures ?? [],
          }))
        : manualList.map((p) => ({
            id: p.productId ?? "",
            name: p.name ?? "Product",
            description: p.description ?? "",
            image: getFeaturedProductImage(p.productId, p.name, p.imageAssetUrl || p.imageUrl),
            category: p.category ?? "Product",
            features: p.features ?? [],
          }))) ?? [],
    cta:
      featured.cta ??
      ({
        text: "View All Products",
        href: "/products",
      } as FeaturedProductsSection["data"]["cta"]),
  }
}

function mapCertificationsFromSanity(
  whyChooseUs?: SanityWhyChooseUs,
): CertificationsSection | undefined {
  const certs = whyChooseUs?.certifications
  if (!certs?.items?.length) return undefined

  return {
    sectionTitle: certs.sectionTitle,
    sectionDescription: certs.sectionDescription,
    items: certs.items.map((item) => ({
      id: item.name ?? "",
      name: item.name ?? "",
      displayText: item.displayText,
      image: item.logoUrl ?? "",
      link: item.isDownload ? (item.fileUrl ?? null) : (item.externalLink ?? null),
      isDownload: item.isDownload ?? false,
    })),
  }
}

function mapResourcesTeaserFromSanity(
  resources?: SanityHomepageResourcesTeaser,
): ResourcesTeaserSection["data"] | undefined {
  if (!resources) return undefined

  return {
    headline: resources.headline ?? "Comprehensive Support Resources",
    description:
      resources.description ??
      "Access everything you need to get the most out of your AEA Technology equipment. From software downloads to training materials, we've got you covered.",
    resourceTypes: resources.resourceTypes ?? [],
    cta:
      resources.cta ??
      ({
        text: "Visit Resource Hub",
        href: "/resources",
      } as ResourcesTeaserSection["data"]["cta"]),
  }
}

export default async function Home() {
  // Single optimized query - removed unused siteSettingsQuery for faster TTFB
  let homepage: SanityHomepage | null = null
  try {
    homepage = await client.fetch<SanityHomepage | null>(homepageQuery)
  } catch (error) {
    console.error("Error fetching homepage from Sanity:", error)
  }

  const heroData = mapHeroFromSanity(homepage?.hero)
  const featuredProductsData = mapFeaturedProductsFromSanity(homepage?.featuredProducts)
  const resourcesTeaserData = mapResourcesTeaserFromSanity(homepage?.resourcesTeaser)
  const certificationsData = mapCertificationsFromSanity(homepage?.whyChooseUs)
  
  // Debug logging - always log to help diagnose image issues
  console.log("🔍 HOMEPAGE DEBUG:", {
    hasHomepage: !!homepage,
    hasHero: !!homepage?.hero,
    heroEnabled: homepage?.hero?.enabled,
    heroHeadline: homepage?.hero?.headline,
    mappedHeroData: heroData?.headline,
    heroDataExists: !!heroData,
    featuredProducts: featuredProductsData?.products?.map(p => ({ 
      id: p.id, 
      name: p.name, 
      image: p.image,
      hasImage: !!p.image && p.image !== "/placeholder.svg"
    })),
    rawSanityData: {
      featuredProductsEnabled: homepage?.featuredProducts?.enabled,
      hasProductsRefs: (homepage?.featuredProducts?.products?.length ?? 0) > 0,
      hasProductsList: (homepage?.featuredProducts?.productsList?.length ?? 0) > 0,
      productsCount: homepage?.featuredProducts?.products?.length ?? 0,
      productsListCount: homepage?.featuredProducts?.productsList?.length ?? 0,
    }
  })

  return (
    <main className="min-h-screen">
      <Hero data={heroData} />
      <FeaturedProducts data={featuredProductsData} />
      <WhyChooseUs certifications={certificationsData} />
      <ResourcesTeaser data={resourcesTeaserData} />
      <section className="py-12 sm:py-16 bg-background">
        <div className="container mx-auto px-4">
          <SupportCTA />
        </div>
      </section>
    </main>
  )
}

