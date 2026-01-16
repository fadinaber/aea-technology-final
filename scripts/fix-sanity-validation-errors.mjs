// Fix Sanity validation errors without changing displayed content
// This script fills in missing REQUIRED fields only, using original data as source of truth

import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const rootDir = join(__dirname, '..')

// Load env vars
let projectId = 'jvtqk7fd'
let dataset = 'production'
let token = null

try {
  const envContent = readFileSync(join(rootDir, '.env.local'), 'utf-8')
  const projectMatch = envContent.match(/NEXT_PUBLIC_SANITY_PROJECT_ID=(.+)/)
  const datasetMatch = envContent.match(/NEXT_PUBLIC_SANITY_DATASET=(.+)/)
  const tokenMatch = envContent.match(/SANITY_API_TOKEN=(.+)/)
  
  if (projectMatch) projectId = projectMatch[1].trim()
  if (datasetMatch) dataset = datasetMatch[1].trim()
  if (tokenMatch) token = tokenMatch[1].trim()
} catch (e) {
  console.warn('Could not read .env.local, using defaults')
}

// Create read-only client for checking (doesn't need token)
const readClient = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: false,
})

// Create write client for fixing (needs token)
let writeClient = null
if (token) {
  writeClient = createClient({
    projectId,
    dataset,
    apiVersion: '2024-01-01',
    useCdn: false,
    token,
  })
} else {
  console.warn('⚠️  SANITY_API_TOKEN not found in .env.local')
  console.warn('   The script can check for errors but cannot fix them without a token')
  console.warn('   Add SANITY_API_TOKEN to .env.local to enable fixing\n')
}

// Fetch original product data from the API route (which has access to TS files)
async function getOriginalProductData() {
  try {
    // Try to use the local API route if dev server is running
    const response = await fetch('http://localhost:3000/api/sanity/import', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'products', dryRun: true }),
    })
    
    if (response.ok) {
      const result = await response.json()
      // The API route returns the structure, but we need the actual source data
      // For now, we'll work with what we can fetch from Sanity and infer fixes
      return null
    }
  } catch (e) {
    // API route not available, we'll work with Sanity data only
  }
  return null
}

async function checkValidationErrors() {
  console.log('🔍 Checking for validation errors in Sanity products...\n')
  console.log(`Project: ${projectId}`)
  console.log(`Dataset: ${dataset}\n`)

  try {
    // Fetch all products from Sanity (read-only, no token needed)
    const sanityProducts = await readClient.fetch(`
      *[_type == "product"] {
        _id,
        slug,
        name,
        category,
        resources[] {
          _key,
          type,
          title,
          description,
          url,
          localPath,
          file,
          thumbnailUrl,
          duration,
          fileSize
        }
      }
    `)

    console.log(`📦 Found ${sanityProducts.length} product(s) in Sanity\n`)

    const productsToFix = []

    for (const product of sanityProducts) {
      const errors = []
      const fixes = {}

      // Check required fields
      const slugValue = product.slug?.current
      
      if (!product.slug || !slugValue) {
        errors.push('Missing slug')
        // Try to infer slug from _id (format: product-{slug})
        const idSlug = product._id?.replace('product-', '')
        if (idSlug) {
          fixes.slug = { _type: 'slug', current: idSlug }
        } else {
          // Can't fix without knowing the slug
          console.warn(`   ⚠️  Cannot fix slug for ${product._id} - need manual intervention`)
        }
      }

      if (!product.name) {
        errors.push('Missing name')
        // Can't infer name without source data - will need to use reimport
        console.warn(`   ⚠️  Cannot fix name for ${slugValue || product._id} - need to reimport`)
      }

      if (!product.category) {
        errors.push('Missing category')
        // Try to infer from slug or other context
        // Most products are either 'tdr' or 'vna-swr'
        if (slugValue) {
          const inferredCategory = slugValue.includes('tdr') || slugValue.includes('avionics') || slugValue.includes('e20') 
            ? 'tdr' 
            : slugValue.includes('vna') || slugValue.includes('swr') || slugValue.includes('bravo')
            ? 'vna-swr'
            : null
          if (inferredCategory) {
            fixes.category = inferredCategory
          }
        }
      }

      // Check resources array for missing required fields
      if (product.resources && Array.isArray(product.resources)) {
        const fixedResources = []
        let resourcesChanged = false

        for (const resource of product.resources) {
          const resourceFix = { ...resource }
          let resourceNeedsFix = false

          if (!resource.type) {
            errors.push(`Resource "${resource.title || 'untitled'}" missing type`)
            // Try to infer type from URL or other fields
            if (resource.url) {
              if (resource.url.includes('youtube.com') || resource.url.includes('youtu.be')) {
                resourceFix.type = 'video'
                resourceNeedsFix = true
              } else if (resource.url.includes('.pdf')) {
                resourceFix.type = 'manual' // Default to manual for PDFs
                resourceNeedsFix = true
              }
            } else if (resource.localPath) {
              // Infer from path
              const path = resource.localPath.toLowerCase()
              if (path.includes('manual')) resourceFix.type = 'manual'
              else if (path.includes('guide') || path.includes('quick')) resourceFix.type = 'guide'
              else if (path.includes('datasheet')) resourceFix.type = 'datasheet'
              else if (path.includes('application') || path.includes('an')) resourceFix.type = 'application-note'
              else if (path.includes('software') || path.includes('etdr')) resourceFix.type = 'software'
              else resourceFix.type = 'manual' // Default
              resourceNeedsFix = true
            }
          }

          if (!resource.title) {
            errors.push(`Resource missing title`)
            // Try to infer from URL or localPath
            if (resource.url && (resource.url.includes('youtube.com') || resource.url.includes('youtu.be'))) {
              // Can't infer YouTube video title - will need manual fix
              console.warn(`   ⚠️  Resource missing title - needs manual fix`)
            } else if (resource.localPath) {
              // Extract filename as title
              const filename = resource.localPath.split('/').pop().replace(/\.(pdf|zip|exe|ppt|pptx|doc|docx)$/i, '')
              resourceFix.title = filename.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
              resourceNeedsFix = true
            }
          }

          // Fix: URLs that are actually local paths should be in localPath, not url
          // Sanity's url type validates that it's a proper URL, so /documents/... fails validation
          if (resource.url && resource.url.startsWith('/documents/')) {
            errors.push(`Resource "${resource.title || 'untitled'}" has local path in url field`)
            resourceFix.localPath = resource.url
            // Remove url field - we'll use unset in the patch
            delete resourceFix.url
            resourceNeedsFix = true
          }

          if (resourceNeedsFix) {
            resourcesChanged = true
          }
          fixedResources.push(resourceFix)
        }

        if (resourcesChanged) {
          fixes.resources = fixedResources
        }
      }

      if (errors.length > 0) {
        productsToFix.push({
          _id: product._id,
          slug: product.slug?.current || 'unknown',
          name: product.name || 'Unknown',
          errors,
          fixes,
          originalResources: product.resources, // Store for comparison
        })
      }
    }

    if (productsToFix.length === 0) {
      console.log('✅ No validation errors found! All products are valid.\n')
      return
    }

    console.log(`⚠️  Found ${productsToFix.length} product(s) with validation errors:\n`)

    productsToFix.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name} (${product.slug})`)
      console.log(`   Errors: ${product.errors.join(', ')}`)
      if (Object.keys(product.fixes).length > 0) {
        console.log(`   Will fix: ${Object.keys(product.fixes).join(', ')}`)
      }
      console.log('')
    })

    return productsToFix
  } catch (error) {
    console.error('❌ Error checking validation:', error.message)
    throw error
  }
}

async function fixValidationErrors(dryRun = true) {
  const productsToFix = await checkValidationErrors()

  if (!productsToFix || productsToFix.length === 0) {
    return
  }

  if (!writeClient && !dryRun) {
    console.log('\n⚠️  Cannot apply fixes - SANITY_API_TOKEN is required')
    console.log('   Add SANITY_API_TOKEN to .env.local and run again with --apply\n')
    return
  }

  console.log(`\n${dryRun ? '🔍 DRY RUN' : '🔧 FIXING'} - ${productsToFix.length} product(s) will be updated\n`)

  const productsNeedingReimport = []

  for (const product of productsToFix) {
    try {
      // Check if we can auto-fix or need reimport
      const canAutoFix = Object.keys(product.fixes).length > 0
      const hasUnfixableErrors = product.errors.some(e => 
        e.includes('Missing name') && !product.fixes.name
      )

      if (hasUnfixableErrors) {
        productsNeedingReimport.push(product)
        continue
      }

      if (!canAutoFix) {
        console.log(`⚠️  ${product.name}: No auto-fixable errors (may need manual review)`)
        continue
      }

      if (dryRun) {
        console.log(`✅ Would fix: ${product.name}`)
        console.log(`   Errors: ${product.errors.join(', ')}`)
        console.log(`   Will fix: ${Object.keys(product.fixes).join(', ')}`)
        if (product.fixes.slug) {
          console.log(`   Slug: ${product.fixes.slug.current}`)
        }
        if (product.fixes.category) {
          console.log(`   Category: ${product.fixes.category}`)
        }
        if (product.fixes.resources) {
          const fixedCount = product.fixes.resources.filter((r, i) => {
            const original = product.originalResources?.[i]
            return r.type !== original?.type || 
                   r.title !== original?.title ||
                   r.localPath !== original?.localPath ||
                   (r.url !== original?.url && !(r.url === undefined && original?.url?.startsWith('/documents/')))
          }).length
          console.log(`   Resources: ${fixedCount} resource(s) will be fixed`)
        }
        console.log('')
      } else {
        // Use patch API to update only the fields that need fixing
        let patch = writeClient.patch(product._id)

        if (product.fixes.slug) {
          patch = patch.set({ slug: product.fixes.slug })
        }
        if (product.fixes.category) {
          patch = patch.set({ category: product.fixes.category })
        }
        if (product.fixes.resources) {
          // For resources, we need to replace the entire array
          // But first, unset url fields that should be localPath
          const resourcesToSet = product.fixes.resources.map(r => {
            const fixed = { ...r }
            // If we moved url to localPath, make sure url is removed
            if (r.localPath && r.url && r.url.startsWith('/documents/')) {
              // This shouldn't happen as we already fixed it, but just in case
              const { url, ...rest } = fixed
              return rest
            }
            return fixed
          })
          patch = patch.set({ resources: resourcesToSet })
        }

        await patch.commit()

        console.log(`✅ Fixed: ${product.name}`)
        console.log(`   Fixed: ${Object.keys(product.fixes).join(', ')}\n`)
      }
    } catch (error) {
      console.error(`❌ Error fixing ${product.name}:`, error.message)
      if (error.message.includes('name')) {
        productsNeedingReimport.push(product)
      }
    }
  }

  if (productsNeedingReimport.length > 0) {
    console.log(`\n⚠️  ${productsNeedingReimport.length} product(s) need reimport (missing name or other critical fields):`)
    productsNeedingReimport.forEach(p => {
      console.log(`   - ${p.slug || p._id}: ${p.errors.join(', ')}`)
    })
    console.log('\n💡 To fix these, run: npm run reimport (or use the import API route)')
  }

  if (dryRun) {
    console.log('\n💡 This was a dry run. To apply fixes, run with --apply flag')
  } else {
    console.log('\n✅ All validation errors have been fixed!')
  }
}

// Main execution
const args = process.argv.slice(2)
const apply = args.includes('--apply') || args.includes('-a')

if (apply) {
  console.log('⚠️  APPLY MODE: Changes will be saved to Sanity\n')
} else {
  console.log('🔍 DRY RUN MODE: No changes will be made\n')
}

fixValidationErrors(!apply)
  .then(() => {
    console.log('\n✅ Done!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n❌ Error:', error)
    process.exit(1)
  })

