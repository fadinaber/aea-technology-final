# Sanity Content Checklist

Use this as a guide when entering initial content into Sanity Studio so it matches what the frontend expects.

## Required Singletons

- **siteSettings**
  - `siteName`, `tagline`, `description`
  - `logo` (light logo image)
  - `contact` (address, phone, emails, hours)
  - `social` (optional)
  - `footerSections`, `copyright`
  - `seoDefaults` (title, description, default OG image)

- **homepage**
  - `hero` (badges, headline lines 1–3, description, valuePropositions, stats)
  - `hero.featuredProduct` (reference a `product` document)
  - `featuredProducts` (badge, headline, description, referenced products and CTA)
  - `whyChooseUs` (badge, headline, description, mainFeature image, featureCards, certifications)
  - `resourcesTeaser` (headline, description, resourceTypes, CTA)

## Core Collections

- **product**
  - Name, slug, tagline, shortDescription, category, keyFeatures
  - Model images (array) and at least one image for `modelImages[0].images[0]`
  - Specs, applications, and models/part numbers

- **pressRelease**
  - Title, slug, date/displayDate, description, featured flag, image

- **resource**
  - Title, description, category, type (manual/software/video/etc.)
  - downloadUrl (for files) or videoId/duration (for videos)
  - tags, featured flag, fileSize (optional)

- **faq**
  - question, answer, category, order

- **distributor**
  - name, region, country, address, phone, email, website, specialties

- **teamMember**
  - name, title, subtitle, image, quote, bio, tagline, featured flag


