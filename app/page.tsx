import dynamic from "next/dynamic"

import Hero from "@/components/hero"
import { client } from "@/sanity/lib/client"
import { homepageQuery, siteSettingsQuery } from "@/sanity/lib/queries"
import type {
  FeaturedProductsSection,
  HeroSection,
  ResourcesTeaserSection,
} from "@/data/homepage"

const FeaturedProducts = dynamic(() => import("@/components/featured-products"), {
  loading: () => <div className="py-16 bg-background" />,
})

const WhyChooseUs = dynamic(() => import("@/components/why-choose-us"), {
  loading: () => <div className="py-16 bg-muted/30" />,
})

const ResourcesTeaser = dynamic(() => import("@/components/resources-teaser"))

const SupportCTA = dynamic(() => import("@/components/support-cta").then((mod) => ({ default: mod.SupportCTA })))

export const revalidate = 60

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
          imageUrl: featuredManual.imageAssetUrl || featuredManual.imageUrl,
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
      image: featured?.imageUrl ?? "/placeholder.svg",
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
            image: p.imageUrl ?? "/placeholder.svg",
            category: p.category ?? "Product",
            features: p.keyFeatures ?? [],
          }))
        : manualList.map((p) => ({
            id: p.productId ?? "",
            name: p.name ?? "Product",
            description: p.description ?? "",
            image: p.imageAssetUrl || p.imageUrl || "/placeholder.svg",
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
  const [homepage] = await Promise.all([
    client.fetch<SanityHomepage | null>(homepageQuery),
    // Site settings are fetched via Sanity but currently used at layout level.
    client.fetch(siteSettingsQuery).catch(() => null),
  ])

  const heroData = mapHeroFromSanity(homepage?.hero)
  const featuredProductsData = mapFeaturedProductsFromSanity(homepage?.featuredProducts)
  const resourcesTeaserData = mapResourcesTeaserFromSanity(homepage?.resourcesTeaser)

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

