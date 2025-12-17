# Sanity CMS Integration - Action Checklist

## 🚨 Critical: Must Do First

- [ ] **Set up environment variables**
  - Create `.env.local` in project root
  - Add `NEXT_PUBLIC_SANITY_PROJECT_ID` (get from https://sanity.io/manage)
  - Add `NEXT_PUBLIC_SANITY_DATASET=production`
  - Optional: Add `SANITY_API_TOKEN` for write operations

- [ ] **Fix Studio configuration**
  - Update `studio/sanity.config.ts` to use `process.env.NEXT_PUBLIC_SANITY_PROJECT_ID` instead of hardcoded value
  - Remove fallback project ID `'jvtqk7fd'`

- [ ] **Configure Next.js for Sanity images**
  - Update `next.config.mjs` to add Sanity CDN to `images.remotePatterns`
  - Add: `{ protocol: 'https', hostname: 'cdn.sanity.io' }`

- [ ] **Test Sanity Studio**
  - Run `cd studio && npm install` (if not done)
  - Run `cd studio && npm run dev`
  - Verify you can access studio at `http://localhost:3333/studio`
  - Verify you can see all schema types

## 📥 Data Migration

- [ ] **Import Products**
  - Open Sanity Studio
  - Create product documents matching existing products in `/data/all-products.ts`
  - Start with 2-3 products to test, then import all

- [ ] **Import Homepage Content**
  - Create `homepage` singleton document
  - Fill in hero section, featured products, why choose us, resources teaser
  - Reference product documents for featured products

- [ ] **Import Site Settings**
  - Create `siteSettings` singleton document
  - Add logo, contact info, social links, footer sections

- [ ] **Import Other Content** (in order of priority)
  - [ ] Team members (for About page)
  - [ ] Press releases
  - [ ] Resources and FAQs
  - [ ] Distributors
  - [ ] Testimonials

## 🔄 Frontend Migration

### High Priority Pages

- [ ] **About Page** (`app/about/about-page-client.tsx`)
  - Remove: `import { aboutPageData } from "@/data/about"`
  - Add: Fetch from Sanity using `teamMembersQuery` and `page` schema
  - Update component to use fetched data
  - Add loading/error states

- [ ] **Resources Page** (`app/resources/resources-client.tsx`)
  - Remove static data imports
  - Add: Fetch from `resourcesByTypeQuery` and `allFaqsQuery`
  - Update filtering logic to work with Sanity data
  - Add ISR: `export const revalidate = 60`

- [ ] **Layout** (`app/layout.tsx`)
  - Fetch `siteSettingsQuery` at layout level
  - Use Sanity logo URL instead of static
  - Update metadata to use Sanity site settings

### Medium Priority Pages

- [ ] **Press Page** (`app/press/press-page-client.tsx`)
  - Replace `pressPageData` with `allPressReleasesQuery`
  - Update component to handle Sanity data structure
  - Add ISR revalidation

- [ ] **Distributors Page** (`components/distributor-locator.tsx`)
  - Replace `@/data/distributors` with `distributorsByRegionQuery`
  - Update filtering logic for Sanity data
  - Handle region-based queries

- [ ] **Header Component** (`components/header.tsx`)
  - Fetch and use site settings from Sanity
  - Use Sanity logo if available

- [ ] **Footer Component** (`components/footer.tsx`)
  - Fetch and use site settings from Sanity
  - Use footer sections from Sanity

### Low Priority / Cleanup

- [ ] **Homepage - WhyChooseUs**
  - Update `WhyChooseUs` component to use `homepage.whyChooseUs` from Sanity
  - Remove static data fallback

- [ ] **Product Detail Page**
  - Remove static data fallback
  - Make Sanity the only source of truth
  - Remove `getProductBySlug` import

- [ ] **Remove Static Data Files** (after all pages migrated)
  - Delete `/data/about.ts`
  - Delete `/data/press.ts`
  - Delete `/data/resources-content.ts`
  - Delete `/data/distributors.ts`
  - Delete `/data/site-config.ts`
  - Keep `/data/homepage.ts` and `/data/all-products.ts` as type references only (or create separate types file)

## ✅ Testing & Verification

- [ ] **Test all pages** with Sanity data
  - Homepage
  - Products listing
  - Product detail pages
  - About page
  - Press page
  - Resources page
  - Distributors page

- [ ] **Verify SEO metadata** is working correctly
- [ ] **Test image loading** from Sanity CDN
- [ ] **Check error handling** (what happens if Sanity is down?)
- [ ] **Verify ISR** is working (check revalidation)

## 🚀 Deployment

- [ ] **Add environment variables** to production (Vercel/Netlify/etc.)
- [ ] **Deploy Sanity Studio** to production
  - Run `cd studio && npm run deploy`
  - Or configure hosting for `/studio` route
- [ ] **Set up webhooks** (optional, for cache invalidation)
- [ ] **Configure preview mode** (optional, for draft content preview)

## 📚 Documentation

- [ ] **Update README** with Sanity setup instructions
- [ ] **Document content editing** workflow for content editors
- [ ] **Create content guidelines** for each content type

---

## Quick Start Commands

```bash
# 1. Set up environment variables
# Create .env.local with your Sanity credentials

# 2. Install dependencies (if not done)
npm install
cd studio && npm install

# 3. Test Sanity Studio
cd studio
npm run dev
# Open http://localhost:3333/studio

# 4. Start Next.js dev server (in project root)
npm run dev
# Open http://localhost:3000

# 5. Deploy studio (when ready)
cd studio
npm run deploy
```

## Need Help?

- Sanity Docs: https://www.sanity.io/docs
- Next.js + Sanity: https://www.sanity.io/docs/js-client
- GROQ Query Tester: Use Sanity Vision tool in Studio

