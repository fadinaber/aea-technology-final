# Sanity CMS Quick Start Guide

## ✅ Setup Complete!

Your Sanity CMS is configured and ready to use. All pages now fetch from Sanity with fallback to static data.

## ⚠️ Fix Token Permissions (Required for Import)

Your API token needs "Editor" permissions to import data:

1. Go to **https://sanity.io/manage**
2. Select your project (`jvtqk7fd`)
3. Go to **API** → **Tokens**
4. Create a new token with **Editor** role (or "Deploy Studio" if that's an option)
5. Copy the new token and update `.env.local`:
   ```
   SANITY_API_TOKEN=your-new-token-here
   ```
6. Restart your dev server

## 🚀 Import Existing Data

After fixing the token, run the import at:
```
http://localhost:3000/admin/sanity-import
```

Or use the API directly:
```powershell
$body = @{type="siteSettings"; dryRun=$false} | ConvertTo-Json
Invoke-RestMethod -Uri "http://localhost:3000/api/sanity/import" -Method POST -ContentType "application/json" -Body $body
```

Import in this order:
1. siteSettings
2. homepage  
3. products
4. press
5. teamMembers
6. resources
7. distributors
8. testimonials

## 🚀 Accessing Sanity Studio

1. **Start the Studio** (if not already running):
   ```bash
   cd studio
   npm run dev
   ```

2. **Open in Browser**:
   - Studio URL: http://localhost:3333/studio
   - You should see all your content types in the sidebar

## 📝 Creating Your First Content

### Step 1: Site Settings (Required First)
1. In Studio, click **"Site Settings"** in the sidebar
2. This is a singleton (only one document exists)
3. Fill in:
   - Site name, tagline, description
   - Upload logo image
   - Contact information
   - Social links (optional)
   - Footer sections
   - SEO defaults

### Step 2: Homepage (Required for Homepage)
1. Click **"Homepage"** in the sidebar
2. This is also a singleton
3. Configure:
   - **Hero Section**: Headlines, description, CTA buttons, featured product
   - **Featured Products**: Select products to feature
   - **Why Choose Us**: Main feature and feature cards
   - **Resources Teaser**: Headline and resource types

### Step 3: Products
1. Click **"Product"** in the sidebar
2. Click **"Create new"**
3. Fill in:
   - **Basic Info**: Name, slug (auto-generated), tagline, category
   - **Media**: Upload product images (modelImages)
   - **Content**: Key features, overview, applications
   - **Specifications**: Performance, hardware, physical specs
   - **Models**: Product models and part numbers
   - **Accessories**: Related accessories

### Step 4: Other Content Types
- **Press Release**: News and announcements
- **Resource**: Manuals, software, videos, FAQs
- **Testimonial**: Customer testimonials
- **Team Member**: About page team profiles
- **Distributor**: Distributor locations
- **Page**: Static pages (About, Contact, etc.)

## 🎯 Recommended Order

1. **Site Settings** → Global site configuration
2. **Homepage** → Homepage content
3. **Products** → At least 2-3 products to test
4. **Team Members** → For About page
5. **Press Releases** → For Press page
6. **Resources & FAQs** → For Resources page
7. **Distributors** → For Distributors page

## 💡 Tips

- **Images**: Upload images directly in Sanity Studio - they'll be hosted on Sanity CDN
- **References**: When linking products (e.g., in Homepage), use the reference field to select existing products
- **Slugs**: Auto-generated from names, but you can customize them
- **Preview**: Use the Vision tool (eye icon) to test GROQ queries
- **Save**: Changes are saved automatically as you type

## 🔄 After Creating Content

Once you've created content in Sanity:

1. **Refresh your Next.js site** (if running)
2. The pages should now display content from Sanity
3. If pages still show empty/fallback content, check:
   - The page is fetching from Sanity (check page.tsx files)
   - Content matches the expected structure
   - No errors in browser console

## 🐛 Troubleshooting

**Studio won't start?**
- Make sure you're in the `studio` directory
- Check that `NEXT_PUBLIC_SANITY_PROJECT_ID` is set correctly
- Try `npm install` in the studio directory

**Can't see content types?**
- Check that schemas are properly exported in `sanity/schemas/index.ts`
- Restart the studio

**Changes not showing on website?**
- Some pages may still be using static data (check migration status)
- Verify the page is fetching from Sanity
- Check browser console for errors

## 📚 Next Steps

After you've created initial content:
1. Test all pages to ensure they display Sanity content
2. Migrate remaining pages that still use static data
3. Remove static data files once everything is migrated

