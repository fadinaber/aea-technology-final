# Sanity CMS Migration Guide

## Overview

This document outlines the migration path from static TypeScript data files to Sanity CMS for the AEA Technology website.

## Prerequisites

1. Create a Sanity project at [sanity.io/manage](https://sanity.io/manage)
2. Install Sanity CLI: `npm install -g @sanity/cli`
3. Add environment variables to Vercel:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET` (usually "production")
   - `SANITY_API_TOKEN` (for write operations)

## Schema Structure

### Document Types (11 schemas)

| Schema | Description | Source File |
|--------|-------------|-------------|
| `product` | Products with specs, models, accessories | `/data/all-products.ts` |
| `testimonial` | Customer testimonials | `/data/testimonials.ts` |
| `pressRelease` | Press releases and news | `/data/press.ts` |
| `resource` | Software, manuals, videos | `/data/resources-content.ts` |
| `faq` | Frequently asked questions | `/data/resources-content.ts` |
| `distributor` | US and international distributors | `/data/distributors.ts` |
| `teamMember` | Leadership and team profiles | `/data/about.ts` |
| `page` | Static pages (About, Contact) | Various |
| `siteSettings` | Global site configuration | `/data/site-config.ts` |
| `homepage` | Homepage page builder | `/data/homepage.ts` |

## Migration Steps

### Phase 1: Setup (Day 1)

1. Initialize Sanity in project:
   ```bash
   npx sanity@latest init --env
   ```

2. Copy schemas from `/sanity/schemas/` to your Sanity studio

3. Deploy Sanity studio:
   ```bash
   npx sanity deploy
   ```

### Phase 2: Data Migration (Day 2-3)

1. Create migration scripts in `/scripts/sanity-migrate/`

2. Run migrations in order:
   - Products first (referenced by other types)
   - Testimonials, Press Releases, Resources
   - FAQs, Distributors, Team Members
   - Site Settings, Homepage last

3. Verify data in Sanity Studio

### Phase 3: Frontend Integration (Day 4-5)

1. Install dependencies:
   ```bash
   npm install next-sanity @portabletext/react
   ```

2. Create data fetching utilities in `/lib/sanity/`

3. Update components to use Sanity data:
   - Replace static imports with GROQ queries
   - Add loading states and error handling
   - Implement ISR for caching

### Phase 4: Testing & Cleanup (Day 6-7)

1. Test all pages with Sanity data
2. Verify SEO metadata
3. Test preview mode for editors
4. Remove unused static data files

## Data Fetching Pattern

```tsx
// Example: Products page
import { client } from '@/sanity/lib/client'
import { allProductsQuery } from '@/sanity/lib/queries'

export default async function ProductsPage() {
  const products = await client.fetch(allProductsQuery)
  return <ProductsGrid products={products} />
}

// With ISR
export const revalidate = 60 // Revalidate every 60 seconds
```

## Environment Variables Required

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-write-token
```

## Estimated Timeline

- **Phase 1**: 1 day (setup)
- **Phase 2**: 2 days (data migration)
- **Phase 3**: 2 days (frontend integration)
- **Phase 4**: 2 days (testing & cleanup)
- **Total**: ~7 days

## Post-Migration

1. Train content editors on Sanity Studio
2. Set up webhooks for cache invalidation
3. Configure preview mode for draft content
4. Set up Sanity backup/export schedule
