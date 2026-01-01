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
  slug?: { current?: string }
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

type SanityHomepage = {
  hero?: SanityHomepageHero
  featuredProducts?: SanityHomepageFeaturedProducts
  whyChooseUs?: unknown
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

  return {
    badges: hero.badges ?? [],
    headline: hero.headline ?? {
      line1: "Professional",
      line2: "RF Testing",
      line3: "Equipment",
    },
    description:
      hero.description ??
      "Trusted by aviation, military, and telecommunications professionals for over 30 years.",
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

function mapFeaturedProductsFromSanity(
  featured?: SanityHomepageFeaturedProducts,
): FeaturedProductsSection["data"] | undefined {
  if (!featured) return undefined

  const hasRefs = (featured.products?.length ?? 0) > 0
  const manualList = featured.productsList ?? []

  return {
    badge: featured.badge ?? "Featured Products",
    headline: featured.headline ?? "Professional Testing Solutions",
    description:
      featured.description ??
      "Discover our most popular testing instruments for demanding environments.",
    products:
      (hasRefs
        ? featured.products?.map((p) => ({
            id: p.slug?.current ?? p._id ?? "",
            name: p.name ?? "Product",
            description: p.shortDescription ?? "",
            image: (p.imageUrl && p.imageUrl.trim() !== "" && p.imageUrl !== "null") 
              ? p.imageUrl 
              : "/placeholder.svg",
            category: p.category ?? "Product",
            features: p.keyFeatures ?? [],
          }))
        : manualList.map((p) => ({
            id: p.productId ?? "",
            name: p.name ?? "Product",
            description: p.description ?? "",
            image: (p.imageAssetUrl && p.imageAssetUrl.trim() !== "" && p.imageAssetUrl !== "null") 
              ? p.imageAssetUrl 
              : (p.imageUrl && p.imageUrl.trim() !== "" && p.imageUrl !== "null") 
                ? p.imageUrl 
                : "/placeholder.svg",
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

function mapResourcesTeaserFromSanity(
  resources?: SanityHomepageResourcesTeaser,
): ResourcesTeaserSection["data"] | undefined {
  if (!resources) return undefined

  return {
    headline: resources.headline ?? "Comprehensive Support Resources",
    description:
      resources.description ??
      "Access downloads, documentation, training videos, and more for your equipment.",
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
  
  // Debug logging (remove in production)
  if (process.env.NODE_ENV === "development") {
    console.log("Homepage data:", {
      hero: heroData?.featuredProduct,
      featuredProducts: featuredProductsData?.products?.map(p => ({ name: p.name, image: p.image }))
    })
  }

  return (
    <main className="min-h-screen">
      <Hero data={heroData} />
      <FeaturedProducts data={featuredProductsData} />
      <WhyChooseUs />
      <ResourcesTeaser data={resourcesTeaserData} />
      <section className="py-12 sm:py-16 bg-background">
        <div className="container mx-auto px-4">
          <SupportCTA />
        </div>
      </section>
    </main>
  )
}

