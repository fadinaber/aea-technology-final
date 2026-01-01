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

// Mapping of Application Note IDs to actual PDF files
const applicationNotePdfMap: Record<string, string> = {
  "an100": "/documents/application-notes/63dc1c2e6af3bb9543250363_AN100 What SWR Does Not Show.pdf",
  "an101": "/documents/application-notes/63dc1c2e1de85ccbfd02e035_AN101 When to Use Cable Null.pdf",
  "an102": "/documents/application-notes/63dc1c2f75b1b97e0bd53262_AN102 Understanding Vector Network Analysis.pdf",
  "an103": "/documents/application-notes/63dc1c2ef0e3a9b366b4fe89_AN103 Relationships of Impedance.pdf",
  "an104": "/documents/application-notes/63dc1c31f15c5b090cfb1704_AN104 Smith Chart 101.pdf",
  "an110": "/documents/application-notes/63dc1c2e8a7ef2d82e81ec6e_AN110 Coaxial StubTuning.pdf",
  "an111": "/documents/application-notes/63dc1c2e8a3bf475d13d9c80_AN111 Find Charactoristics of an Unknown Cable.pdf",
  "an112": "/documents/application-notes/63dc1c2e3520187f364321e8_AN112 Tuning an Antenna.pdf",
  "an113": "/documents/application-notes/63dc1c2f677f580f858b4e9d_AN113 Measuring Descrete Components.pdf",
  "an114": "/documents/application-notes/63dc1c2fd459afb18ddebf2c_AN114 Tower Site Tips.pdf",
  "an120": "/documents/application-notes/63dc1c2f76dfcf02be38aec4_AN120 Measuring Amplifier Gain.pdf",
  "an121": "/documents/application-notes/63dc1c2fd459af0534debf2d_AN121 Measuring Group Delay.pdf",
  "an122": "/documents/application-notes/63dc1c30cfbac0ddd6316375_AN122 Measuring Gain Compression.pdf",
  "an124": "/documents/application-notes/63dc1c30682caa8e17590cad_AN124 Measuring Differential Amplifiers.pdf",
  "an125": "/documents/application-notes/63dc1c3098f895a00f9d469a_AN125 Measuring AM to PM Distortion.pdf",
  "an131": "/documents/application-notes/63dc1c30e06cc200834239f2_AN131 Using the Network Analyzer as a Signal Source.pdf",
  "an132": "/documents/application-notes/63dc1c319bcb4b3312ed5794_AN132 Using the Network Analyzer as a Grid Dip Oscillator.pdf",
  "an150": "/documents/application-notes/63dc1c2f9fa0e941ec65a257_AN150 Using batteries in AEA Technology equitment.pdf",
  "an152": "/documents/application-notes/63dc1c3075b1b930dcd53263_AN152 Troubleshooting Serial Port Operation on AEA Equipment.pdf",
  "an153": "/documents/application-notes/63dc1c317ff5a8f1c3cbc9eb_Cold Weather Operation of AEA Technology Instruments.pdf",
  "an200": "/documents/application-notes/63dc1cd2a86f8d0f4605c9a7_AN200 Basic Theory of TDR Operation.pdf",
  "an201": "/documents/application-notes/63dc1cd2f0e3a97f42b50787_AN201 Step vs Pulse TDR Technology.pdf",
  "an203": "/documents/application-notes/63dc1cd37ff5a85fbccbd4f0_AN203 Getting the Most From Your TDR.pdf",
  "an204": "/documents/application-notes/63dc1cd3eb55e64d961e2c84_AN204 Impedance Shifts.pdf",
  "an205": "/documents/application-notes/63dc1cd4f62b371d9e0ce770_AN205 FDR Comparison to TDR.pdf",
  "an210": "/documents/application-notes/63dc1cd3d459af7415decf64_AN210 Coax Cable Resistance.pdf",
  "an211": "/documents/application-notes/63dc1cd3677f58c31c8b582c_AN211 Poor Coax Splice.pdf",
  "an212": "/documents/application-notes/63dc1cd27ff5a8f0e6cbd4bf_AN212 Crushed or Pinched Coaxial Cable.pdf",
  "an213": "/documents/application-notes/63dc1cd36796f79d61f010c9_AN213 Wet Coaxial Cable.pdf",
  "an214": "/documents/application-notes/63dc1cd2cfbac061c6316ad3_AN214 Coaxial Cable Terminations (3).pdf",
  "an215": "/documents/application-notes/63dc1cd4352018849c432ae5_AN215 Mixed Cable Types (1).pdf",
  "an216": "/documents/application-notes/63dc1cd3523f1e2f3ba3a07a_AN216 Coaxial Cable Tee.pdf",
  "an220": "/documents/application-notes/63dc1cd4f9242a9a0a2c16b4_AN220 Twisted Pair Cable Resistance.pdf",
  "an221": "/documents/application-notes/63dc1cd37cc2a635f4a23a4f_AN221 Poor Splice in Twisted Pair Cables.pdf",
  "an222": "/documents/application-notes/63dc1cd5e06cc22d90424370_AN222 Telco Style Alligator Clips.pdf",
  "an223": "/documents/application-notes/63dc1cd65087fb49823da037_AN223 Wet Twisted Pair Cable.pdf",
  "an224": "/documents/application-notes/63dc1cd4bb0d90580e26ad1e_AN224 Twisted Pair Cable Terminations.pdf",
  "an225": "/documents/application-notes/63dc1cd66796f78aa3f010e1_AN225 Split Pairs and Resplit pairs.pdf",
  "an226": "/documents/application-notes/63dc1cd5682caa188c592050_AN226 Bridged Taps.pdf",
  "an227": "/documents/application-notes/63dc1cd4f62b37073a0ce771_AN227 Testing Premise Telco Pairs.pdf",
  "an228": "/documents/application-notes/5fecf0649903fb798c0aebd9_AN228 Testing Network Cable Shields.pdf",
  "an250": "/documents/application-notes/63dc1cd56af3bb78552511bb_AN250 Measuring a Cable From Both Ends.pdf",
  "an254": "/documents/application-notes/63dc1cd5bdd5eab79ad1d452_AN254 Intermittent Cable Operations.pdf",
  "an255": "/documents/application-notes/63dc1cd5d459af7a06decfb0_AN255 Removing Test Leads Length from Measurments.pdf",
  "an256": "/documents/application-notes/63dc1cd47ff5a8aa15cbd5bb_AN256 Sampling a Cables Velocity.pdf",
  "an257": "/documents/application-notes/63dc295f44067b74c2536d28_AN257 TDR Soft Reset and Battery Charging.pdf",
  "an258": "/documents/application-notes/63dc295f5032918ac9873629_AN258 USB-to-Serial Communications.pdf",
  "an259": "/documents/application-notes/63dc1cd64df18565366867e1_AN259 Testing Single-Wires in a Harness.pdf",
  "white-paper-via": "/documents/application-notes/63dc1c3098f895de399d469b_VIA Analyzer vs the VIA Bravo.pdf",
}

// Software download mappings
const softwareDownloadMap: Record<string, string> = {
  "etdr-pc-vision": "/documents/software/TDR_PC_Vision.zip",
  "site-analyzer-pc-vision": "/documents/software/Site_Analyzer_PC_Vision.zip",
  "mri-vision": "/documents/software/MRI_Vision.zip",
}

async function importResources(dryRun: boolean) {
  const results = []

  // Import software with correct download paths
  for (const item of resourcesContent.software || []) {
    const downloadPath = softwareDownloadMap[item.id] || item.downloadUrl
    const doc = {
      _type: "resource",
      _id: `resource-${item.id}`,
      title: item.title,
      description: item.description,
      category: item.category,
      type: "software",
      version: item.version,
      fileSize: item.size,
      localPath: downloadPath.startsWith("/") ? downloadPath : undefined,
      downloadUrl: downloadPath.startsWith("/") ? undefined : (downloadPath !== "#" ? downloadPath : undefined),
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
      results.push({ id: item.id, type: "software", wouldCreate: true })
    }
  }

  // Import manuals
  for (const item of resourcesContent.manuals || []) {
    const downloadPath = item.downloadUrl
    const doc = {
      _type: "resource",
      _id: `resource-${item.id}`,
      title: item.title,
      description: item.description,
      category: item.category,
      type: "manual",
      fileSize: item.size,
      localPath: downloadPath.startsWith("/") ? downloadPath : undefined,
      downloadUrl: downloadPath.startsWith("/") ? undefined : (downloadPath !== "#" ? downloadPath : undefined),
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
      results.push({ id: item.id, type: "manual", wouldCreate: true })
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
    }

    if (!dryRun) {
      try {
        await writeClient.createOrReplace(doc)
        results.push({ id: item.id, type: "video", imported: true })
      } catch (error: any) {
        results.push({ id: item.id, error: error.message })
      }
    } else {
      results.push({ id: item.id, type: "video", wouldCreate: true })
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
      results.push({ id: item.id, type: "faq", wouldCreate: true })
    }
  }

  // Import Application Notes with correct type and file paths
  for (const item of resourcesContent["application-notes"] || []) {
    const pdfPath = applicationNotePdfMap[item.id] || item.downloadUrl
    const doc = {
      _type: "resource",
      _id: `resource-${item.id}`,
      title: item.title,
      description: item.description,
      category: item.category,
      type: "application-note", // Use correct type!
      localPath: pdfPath.startsWith("/") ? pdfPath : undefined,
      downloadUrl: pdfPath.startsWith("/") ? undefined : (pdfPath !== "#" ? pdfPath : undefined),
      tags: item.tags || [],
      featured: false,
    }

    if (!dryRun) {
      try {
        await writeClient.createOrReplace(doc)
        results.push({ id: item.id, type: "application-note", imported: true })
      } catch (error: any) {
        results.push({ id: item.id, error: error.message })
      }
    } else {
      results.push({ id: item.id, type: "application-note", wouldCreate: true })
    }
  }

  // Import Training Materials from product resources
  const trainingMaterials = [
    {
      id: "training-bravo-mri-3000",
      title: "Bravo MRI-3000 Training Presentation",
      description: "Comprehensive training presentation covering MRI coil testing procedures",
      category: "Training",
      localPath: "/documents/manuals/6055/Bravo MRI-3000 Training PPP Aug 2021.ppsx",
      fileSize: "6.5 MB",
      tags: ["MRI", "Training", "Bravo MRI-3000"],
      productSlugs: ["via-bravo-mri-3000"],
    },
  ]

  for (const item of trainingMaterials) {
    const doc = {
      _type: "resource",
      _id: `resource-${item.id}`,
      title: item.title,
      description: item.description,
      category: item.category,
      type: "training",
      localPath: item.localPath,
      fileSize: item.fileSize,
      tags: item.tags || [],
      productSlugs: item.productSlugs || [],
      featured: false,
    }

    if (!dryRun) {
      try {
        await writeClient.createOrReplace(doc)
        results.push({ id: item.id, type: "training", imported: true })
      } catch (error: any) {
        results.push({ id: item.id, error: error.message })
      }
    } else {
      results.push({ id: item.id, type: "training", wouldCreate: true })
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
