// GROQ Queries for Sanity CMS

import { groq } from "next-sanity"

// Products
export const allProductsQuery = groq`
  *[_type == "product"] | order(name asc) {
    _id,
    slug,
    name,
    tagline,
    shortDescription,
    category,
    badges,
    "imageUrl": modelImages[0].images[0].asset->url,
    keyFeatures[0...3]
  }
`

export const productBySlugQuery = groq`
  *[_type == "product" && slug.current == $slug][0] {
    ...,
    "modelImages": modelImages[] {
      modelIndex,
      "images": images[].asset->url
    },
    "datasheetFileUrl": datasheetFile.asset->url,
    // Get resources with file URLs resolved
    "resources": resources[] {
      type,
      title,
      description,
      url,
      localPath,
      thumbnailUrl,
      duration,
      fileSize,
      "fileUrl": file.asset->url
    }
  }
`

export const productSlugsQuery = groq`
  *[_type == "product"] { "slug": slug.current }
`

// Press Releases
export const allPressReleasesQuery = groq`
  *[_type == "pressRelease"] | order(date desc) {
    _id,
    title,
    "slug": slug.current,
    date,
    displayDate,
    description,
    featured,
    "imageUrl": image.asset->url
  }
`

// Resources
export const resourcesByTypeQuery = groq`
  *[_type == "resource" && type == $type] | order(featured desc, _createdAt desc) {
    _id,
    title,
    description,
    category,
    type,
    version,
    downloadUrl,
    localPath,
    "fileUrl": file.asset->url,
    fileSize,
    videoId,
    duration,
    tags,
    featured,
    content,
    productSlugs,
    "relatedProductSlugs": relatedProducts[]->slug.current
  }
`

export const allResourcesQuery = groq`
  *[_type == "resource"] | order(type asc, featured desc, _createdAt desc) {
    _id,
    title,
    description,
    category,
    type,
    version,
    downloadUrl,
    localPath,
    "fileUrl": file.asset->url,
    fileSize,
    videoId,
    duration,
    tags,
    featured,
    content,
    productSlugs,
    "relatedProductSlugs": relatedProducts[]->slug.current
  }
`

// Resources by product slug - for product pages
export const resourcesByProductSlugQuery = groq`
  *[_type == "resource" && ($slug in productSlugs || $slug in relatedProducts[]->slug.current)] | order(type asc, featured desc) {
    _id,
    title,
    description,
    category,
    type,
    downloadUrl,
    localPath,
    "fileUrl": file.asset->url,
    fileSize,
    videoId,
    duration,
    tags,
    featured
  }
`

// Manuals specifically - for the resources page manuals section
export const allManualsQuery = groq`
  *[_type == "resource" && (type == "manual" || type == "guide")] | order(featured desc, title asc) {
    _id,
    title,
    description,
    category,
    type,
    downloadUrl,
    localPath,
    "fileUrl": file.asset->url,
    fileSize,
    tags,
    featured,
    productSlugs,
    "relatedProductSlugs": relatedProducts[]->slug.current
  }
`

// FAQs
export const allFaqsQuery = groq`
  *[_type == "faq"] | order(order asc) {
    _id,
    question,
    answer,
    category
  }
`

// Distributors
export const distributorsByRegionQuery = groq`
  *[_type == "distributor" && region == $region] | order(order asc, name asc) {
    _id,
    name,
    category,
    country,
    address,
    phone,
    phoneTollFree,
    fax,
    faxTollFree,
    email,
    website,
    specialties
  }
`

export const allDistributorsQuery = groq`
  *[_type == "distributor"] | order(region asc, order asc, name asc) {
    _id,
    name,
    category,
    region,
    country,
    address,
    phone,
    phoneTollFree,
    fax,
    faxTollFree,
    email,
    website,
    specialties
  }
`

// Team Members
export const teamMembersQuery = groq`
  *[_type == "teamMember"] | order(order asc) {
    _id,
    name,
    title,
    subtitle,
    "imageUrl": image.asset->url,
    quote,
    bio,
    tagline,
    featured
  }
`

// Site Settings (Singleton)
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    siteName,
    tagline,
    description,
    "logoUrl": logo.asset->url,
    contact,
    social,
    footerSections,
    copyright,
    seoDefaults
  }
`

// About Page (Singleton)
export const aboutPageQuery = groq`
  *[_type == "aboutPage"][0] {
    leadership {
      name,
      title,
      subtitle,
      "imageUrl": image.asset->url,
      quote,
      bio,
      tagline
    },
    companyStory {
      mission,
      vision,
      history
    },
    coreValues[] {
      icon,
      title,
      description,
      highlight
    },
    industries[] {
      name,
      icon,
      description,
      customers
    },
    certifications {
      headline,
      description,
      items[] {
        name,
        "imageUrl": image.asset->url,
        link
      }
    },
    cta {
      headline,
      description,
      primaryButton,
      secondaryButton
    }
  }
`

// Homepage (Singleton)
export const homepageQuery = groq`
  *[_type == "homepage"][0] {
    hero {
      enabled,
      badges,
      headline,
      description,
      valuePropositions,
      cta,
      stats,
      featuredProductSlug,
      featuredProductData {
        ...,
        "imageAssetUrl": image.asset->url
      },
      "featuredProduct": featuredProduct-> {
        slug,
        name,
        shortDescription,
        "imageUrl": modelImages[0].images[0].asset->url
      }
    },
    featuredProducts {
      enabled,
      badge,
      headline,
      description,
      productsList[] {
        ...,
        "imageAssetUrl": image.asset->url
      },
      "products": products[]-> {
        _id,
        slug,
        name,
        shortDescription,
        "imageUrl": modelImages[0].images[0].asset->url,
        keyFeatures[0...3]
      },
      cta
    },
    whyChooseUs {
      enabled,
      badge,
      headline,
      description,
      mainFeature {
        title,
        badge,
        description,
        "imageUrl": image.asset->url
      },
      featureCards
    },
    resourcesTeaser {
      enabled,
      headline,
      description,
      resourceTypes,
      cta
    },
    seoTitle,
    seoDescription
  }
`
