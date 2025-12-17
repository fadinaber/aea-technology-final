/**
 * Sanity Import API Route
 * 
 * This route can be used to import data from TypeScript files into Sanity
 * Access at: POST /api/sanity/import
 * 
 * Note: This requires proper authentication in production
 */

import { NextRequest, NextResponse } from "next/server"
import { writeClient } from "@/sanity/lib/client"
import { siteConfig } from "@/data/site-config"
import { homepageData } from "@/data/homepage"
import { allProducts } from "@/data/all-products"
import { pressPageData } from "@/data/press"
import { aboutPageData } from "@/data/about"
import { resourcesContent } from "@/data/resources-content"
import { usDistributors, flattenedDistributors } from "@/data/distributors"

// Helper to generate unique keys for array items
let keyCounter = 0
function generateKey(prefix = "key"): string {
  keyCounter++
  return `${prefix}_${Date.now()}_${keyCounter}_${Math.random().toString(36).substring(2, 9)}`
}

// Helper to add _key to array items
function withKeys<T extends object>(items: T[], prefix = "item"): (T & { _key: string })[] {
  return items.map((item, index) => ({
    ...item,
    _key: generateKey(`${prefix}_${index}`),
  }))
}

export async function POST(request: NextRequest) {
  try {
    // Reset key counter for each request
    keyCounter = 0
    
    // In production, add authentication here
    const { type, dryRun = false } = await request.json()

    if (!type) {
      return NextResponse.json(
        { error: "Type parameter required" },
        { status: 400 }
      )
    }

    let result

    switch (type) {
      case "siteSettings":
        result = await importSiteSettings(dryRun)
        break
      case "homepage":
        result = await importHomepage(dryRun)
        break
      case "products":
        result = await importProducts(dryRun)
        break
      case "press":
        result = await importPressReleases(dryRun)
        break
      case "teamMembers":
        result = await importTeamMembers(dryRun)
        break
      case "resources":
        result = await importResources(dryRun)
        break
      case "distributors":
        result = await importDistributors(dryRun)
        break
      default:
        return NextResponse.json(
          { error: `Unknown type: ${type}` },
          { status: 400 }
        )
    }

    return NextResponse.json({
      success: true,
      dryRun,
      ...result,
    })
  } catch (error: any) {
    console.error("Import error:", error)
    return NextResponse.json(
      { error: error.message || "Import failed" },
      { status: 500 }
    )
  }
}

async function importSiteSettings(dryRun: boolean) {
  const doc = {
    _type: "siteSettings",
    _id: "siteSettings",
    siteName: siteConfig.siteName,
    tagline: siteConfig.tagline,
    description: siteConfig.description,
    contact: {
      phone: siteConfig.contact.phone.local,
      phoneTollFree: siteConfig.contact.phone.tollFree,
      email: siteConfig.contact.emails.sales,
      supportEmail: siteConfig.contact.emails.support,
      address: `${siteConfig.contact.address.street}, ${siteConfig.contact.address.city}, ${siteConfig.contact.address.state} ${siteConfig.contact.address.zip}`,
      hours: `${siteConfig.contact.hours.days}, ${siteConfig.contact.hours.time} ${siteConfig.contact.hours.timezone}`,
    },
    social: withKeys(
      siteConfig.social.map((s) => ({
        platform: s.platform,
        url: s.url,
      })),
      "social"
    ),
    footerSections: withKeys(
      siteConfig.footer.sections.map((section) => ({
        ...section,
        links: withKeys(section.links || [], "footerLink"),
      })),
      "footerSection"
    ),
    copyright: siteConfig.footer.copyright,
    seoDefaults: {
      title: siteConfig.seo.defaultTitle,
      description: siteConfig.seo.defaultDescription,
      keywords: siteConfig.seo.keywords,
    },
  }

  if (dryRun) {
    return { document: doc, message: "Would create siteSettings" }
  }

  await writeClient.createOrReplace(doc)
  return { message: "Site Settings imported", id: "siteSettings" }
}

async function importHomepage(dryRun: boolean) {
  // Map homepage data to Sanity structure
  const heroSection = homepageData.sections.find((s) => s.type === "hero") as any
  const featuredProductsSection = homepageData.sections.find(
    (s) => s.type === "featured-products"
  ) as any
  const resourcesTeaserSection = homepageData.sections.find(
    (s) => s.type === "resources-teaser"
  ) as any

  const doc = {
    _type: "homepage",
    _id: "homepage",
    hero: heroSection
      ? {
          enabled: heroSection.enabled,
          badges: withKeys(heroSection.data.badges || [], "badge"),
          headline: heroSection.data.headline,
          description: heroSection.data.description,
          valuePropositions: withKeys(heroSection.data.valuePropositions || [], "valueProp"),
          cta: heroSection.data.cta,
          stats: withKeys(heroSection.data.stats || [], "stat"),
          // Store featured product as embedded object instead of reference
          featuredProductSlug: heroSection.data.featuredProduct?.slug,
          featuredProductData: heroSection.data.featuredProduct
            ? {
                slug: heroSection.data.featuredProduct.slug,
                name: heroSection.data.featuredProduct.name,
                description: heroSection.data.featuredProduct.description,
                badge: heroSection.data.featuredProduct.badge,
                imageUrl: heroSection.data.featuredProduct.image,
              }
            : undefined,
        }
      : undefined,
    featuredProducts: featuredProductsSection
      ? {
          enabled: featuredProductsSection.enabled,
          badge: featuredProductsSection.data.badge,
          headline: featuredProductsSection.data.headline,
          description: featuredProductsSection.data.description,
          // Store product data directly instead of references
          productsList: withKeys(
            featuredProductsSection.data.products?.map((p: any) => ({
              productId: p.id,
              name: p.name,
              description: p.description,
              imageUrl: p.image,
              category: p.category,
              features: p.features || [],
            })) || [],
            "featuredProduct"
          ),
          cta: featuredProductsSection.data.cta,
        }
      : undefined,
    resourcesTeaser: resourcesTeaserSection
      ? {
          enabled: resourcesTeaserSection.enabled,
          headline: resourcesTeaserSection.data.headline,
          description: resourcesTeaserSection.data.description,
          resourceTypes: withKeys(resourcesTeaserSection.data.resourceTypes || [], "resourceType"),
          cta: resourcesTeaserSection.data.cta,
        }
      : undefined,
  }

  if (dryRun) {
    return { document: doc, message: "Would create homepage" }
  }

  await writeClient.createOrReplace(doc)
  return { message: "Homepage imported", id: "homepage" }
}

async function importProducts(dryRun: boolean) {
  const results = []

  for (const product of allProducts) {
    const doc = {
      _type: "product",
      _id: `product-${product.slug}`,
      slug: {
        _type: "slug",
        current: product.slug,
      },
      name: product.name,
      tagline: product.tagline,
      shortDescription: product.shortDescription,
      category: product.category,
      badges: withKeys(
        (product.badges || []).map((b) => ({
          text: b.text,
          variant: b.variant,
        })),
        "badge"
      ),
      keyFeatures: product.keyFeatures || [],
      displayFeatures: product.displayFeatures || [],
      overviewDescription: product.overviewDescription,
      applications: product.applications || [],
      specifications: product.specifications
        ? {
            performance: withKeys(
              (product.specifications.performance || []).map((s) => ({
                parameter: s.parameter,
                value: s.value,
              })),
              "perfSpec"
            ),
            advanced: withKeys(
              (product.specifications.advanced || []).map((s) => ({
                parameter: s.parameter,
                value: s.value,
              })),
              "advSpec"
            ),
            hardware: withKeys(
              (product.specifications.hardware || []).map((s) => ({
                parameter: s.parameter,
                value: s.value,
              })),
              "hwSpec"
            ),
            physical: withKeys(
              (product.specifications.physical || []).map((s) => ({
                parameter: s.parameter,
                value: s.value,
              })),
              "physSpec"
            ),
          }
        : undefined,
      certifications: withKeys(
        (product.certifications || []).map((c) => ({
          name: c.name,
          description: c.description,
        })),
        "cert"
      ),
      models: withKeys(
        (product.models || []).map((m) => ({
          name: m.name,
          partNumber: m.partNumber,
          type: m.type,
          description: m.description,
          includes: m.includes || [],
          popular: m.popular || false,
        })),
        "model"
      ),
      accessories: withKeys(
        (product.accessories || []).map((a) => ({
          name: a.name,
          partNumber: a.partNumber,
          description: a.description,
          iconType: a.iconType,
        })),
        "accessory"
      ),
      datasheetUrl: product.datasheetUrl,
      resources: withKeys(
        (product.resources || []).map((r) => ({
          type: r.type,
          title: r.title,
          description: r.description,
          url: r.url,
          thumbnailUrl: r.thumbnailUrl,
          fileSize: r.fileSize,
          duration: r.duration,
        })),
        "resource"
      ),
      softwareInfo: product.softwareInfo
        ? {
            name: product.softwareInfo.name,
            description: product.softwareInfo.description,
            screenshotUrl: product.softwareInfo.screenshotUrl,
            features: product.softwareInfo.features || [],
          }
        : undefined,
      capabilityCards: withKeys(
        (product.capabilityCards || []).map((c) => ({
          title: c.title,
          icon: c.icon,
          items: c.items || [],
        })),
        "capCard"
      ),
    }

    if (dryRun) {
      results.push({ slug: product.slug, wouldCreate: true })
    } else {
      try {
        await writeClient.createOrReplace(doc)
        results.push({ slug: product.slug, imported: true })
      } catch (error: any) {
        results.push({ slug: product.slug, error: error.message })
      }
    }
  }

  return {
    message: `${dryRun ? "Would import" : "Imported"} ${results.length} products`,
    results,
  }
}

async function importPressReleases(dryRun: boolean) {
  const results = []

  for (const release of pressPageData.pressReleases) {
    const doc = {
      _type: "pressRelease",
      _id: `press-${release.id}`,
      title: release.title,
      slug: {
        _type: "slug",
        current: release.id,
      },
      date: release.dateISO || new Date().toISOString(),
      displayDate: release.date,
      description: release.description,
      featured: release.featured || false,
      imageUrl: release.image,
    }

    if (dryRun) {
      results.push({ id: release.id, wouldCreate: true })
    } else {
      try {
        await writeClient.createOrReplace(doc)
        results.push({ id: release.id, imported: true })
      } catch (error: any) {
        results.push({ id: release.id, error: error.message })
      }
    }
  }

  return {
    message: `${dryRun ? "Would import" : "Imported"} ${results.length} press releases`,
    results,
  }
}

async function importTeamMembers(dryRun: boolean) {
  const doc = {
    _type: "teamMember",
    _id: `team-${createSlug(aboutPageData.leadership.name)}`,
    name: aboutPageData.leadership.name,
    title: aboutPageData.leadership.title,
    subtitle: aboutPageData.leadership.subtitle,
    imageUrl: aboutPageData.leadership.image,
    quote: aboutPageData.leadership.quote,
    bio: aboutPageData.leadership.bio,
    tagline: aboutPageData.leadership.tagline,
    featured: true,
    order: 0,
  }

  if (dryRun) {
    return { document: doc, message: "Would create team member" }
  }

  await writeClient.createOrReplace(doc)
  return { message: "Team member imported", id: doc._id }
}

async function importResources(dryRun: boolean) {
  const results = []

  // Import software
  for (const item of resourcesContent.software || []) {
    const doc = {
      _type: "resource",
      _id: `resource-${item.id}`,
      title: item.title,
      description: item.description,
      category: item.category,
      type: "software",
      version: item.version,
      fileSize: item.size,
      downloadUrl: item.downloadUrl,
      tags: item.tags || [],
      featured: item.featured || false,
    }

    if (!dryRun) {
      try {
        await writeClient.createOrReplace(doc)
        results.push({ id: item.id, type: "software", imported: true })
      } catch (error: any) {
        results.push({ id: item.id, error: error.message })
      }
    } else {
      results.push({ id: item.id, wouldCreate: true })
    }
  }

  // Import manuals
  for (const item of resourcesContent.manuals || []) {
    const doc = {
      _type: "resource",
      _id: `resource-${item.id}`,
      title: item.title,
      description: item.description,
      category: item.category,
      type: "manual",
      fileSize: item.size,
      downloadUrl: item.downloadUrl,
      tags: item.tags || [],
      featured: item.featured || false,
    }

    if (!dryRun) {
      try {
        await writeClient.createOrReplace(doc)
        results.push({ id: item.id, type: "manual", imported: true })
      } catch (error: any) {
        results.push({ id: item.id, error: error.message })
      }
    } else {
      results.push({ id: item.id, wouldCreate: true })
    }
  }

  // Import videos
  for (const item of resourcesContent.videos || []) {
    const doc = {
      _type: "resource",
      _id: `resource-${item.id}`,
      title: item.title,
      description: item.description,
      category: item.category,
      type: "video",
      videoId: item.videoId,
      duration: item.duration,
      tags: item.tags || [],
      featured: item.featured || false,
    }

    if (!dryRun) {
      try {
        await writeClient.createOrReplace(doc)
        results.push({ id: item.id, type: "video", imported: true })
      } catch (error: any) {
        results.push({ id: item.id, error: error.message })
      }
    } else {
      results.push({ id: item.id, wouldCreate: true })
    }
  }

  // Import FAQs
  for (const item of resourcesContent.faqs || []) {
    const doc = {
      _type: "faq",
      _id: `faq-${item.id}`,
      question: item.title,
      answer: item.content,
      category: item.category,
      order: 0,
    }

    if (!dryRun) {
      try {
        await writeClient.createOrReplace(doc)
        results.push({ id: item.id, type: "faq", imported: true })
      } catch (error: any) {
        results.push({ id: item.id, error: error.message })
      }
    } else {
      results.push({ id: item.id, wouldCreate: true })
    }
  }

  return {
    message: `${dryRun ? "Would import" : "Imported"} ${results.length} resources`,
    results,
  }
}

async function importDistributors(dryRun: boolean) {
  const results = []

  // Import US distributors (usDistributors is an array)
  for (const dist of usDistributors) {
    const doc = {
      _type: "distributor",
      _id: `distributor-us-${createSlug(dist.name)}`,
      name: dist.name,
      category: dist.category,
      region: "us",
      country: "United States",
      address: dist.address,
      phone: dist.phone,
      phoneTollFree: dist.phoneTollFree,
      fax: dist.fax,
      faxTollFree: dist.faxTollFree,
      email: dist.email,
      website: dist.website,
      order: dist.id || 0,
    }

    if (!dryRun) {
      try {
        await writeClient.createOrReplace(doc)
        results.push({ name: dist.name, region: "us", imported: true })
      } catch (error: any) {
        results.push({ name: dist.name, region: "us", error: error.message })
      }
    } else {
      results.push({ name: dist.name, region: "us", wouldCreate: true })
    }
  }

  // Import international distributors
  for (const item of flattenedDistributors) {
    const dist = item.distributor
    // Skip "Contact Factory" placeholder entries
    if (dist.name === "Contact Factory" || dist.isContactFactory) {
      continue
    }
    
    const doc = {
      _type: "distributor",
      _id: `distributor-intl-${createSlug(item.country)}-${createSlug(dist.name)}`,
      name: dist.name,
      category: item.country,
      region: "international",
      country: item.country,
      address: dist.address,
      phone: dist.phone,
      fax: dist.fax,
      email: dist.email,
      website: dist.website,
      order: dist.id || 0,
    }

    if (!dryRun) {
      try {
        await writeClient.createOrReplace(doc)
        results.push({ name: dist.name, country: item.country, imported: true })
      } catch (error: any) {
        results.push({ name: dist.name, country: item.country, error: error.message })
      }
    } else {
      results.push({ name: dist.name, country: item.country, wouldCreate: true })
    }
  }

  return {
    message: `${dryRun ? "Would import" : "Imported"} ${results.length} distributors`,
    results,
  }
}

function createSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
}
