// Comprehensive validation check for ALL Sanity document types
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

try {
  const envContent = readFileSync(join(rootDir, '.env.local'), 'utf-8')
  const projectMatch = envContent.match(/NEXT_PUBLIC_SANITY_PROJECT_ID=(.+)/)
  const datasetMatch = envContent.match(/NEXT_PUBLIC_SANITY_DATASET=(.+)/)
  
  if (projectMatch) projectId = projectMatch[1].trim()
  if (datasetMatch) dataset = datasetMatch[1].trim()
} catch (e) {
  console.warn('Could not read .env.local, using defaults')
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: false,
})

async function checkProducts() {
  console.log('\n📦 Checking Products...')
  const products = await client.fetch(`
    *[_type == "product"] {
      _id,
      slug,
      name,
      category,
      resources[] {
        _key,
        type,
        title,
        url,
        localPath
      }
    }
  `)

  const errors = []
  for (const product of products) {
    const productErrors = []
    
    if (!product.slug?.current) productErrors.push('Missing slug')
    if (!product.name) productErrors.push('Missing name')
    if (!product.category) productErrors.push('Missing category')
    
    if (product.resources) {
      product.resources.forEach((r, i) => {
        if (!r.type) productErrors.push(`Resource ${i + 1} missing type`)
        if (!r.title) productErrors.push(`Resource ${i + 1} missing title`)
        if (r.url && r.url.startsWith('/documents/')) {
          productErrors.push(`Resource "${r.title || i + 1}" has local path in url field`)
        }
      })
    }
    
    if (productErrors.length > 0) {
      errors.push({
        _id: product._id,
        name: product.name || 'Unknown',
        slug: product.slug?.current || 'unknown',
        errors: productErrors
      })
    }
  }

  if (errors.length > 0) {
    console.log(`  ⚠️  Found ${errors.length} product(s) with errors:`)
    errors.forEach(e => {
      console.log(`    - ${e.name} (${e.slug}): ${e.errors.length} error(s)`)
    })
  } else {
    console.log('  ✅ All products valid')
  }
  
  return errors
}

async function checkResources() {
  console.log('\n📄 Checking Resources...')
  const resources = await client.fetch(`
    *[_type == "resource"] {
      _id,
      type,
      title,
      slug,
      url,
      localPath
    }
  `)

  const errors = []
  for (const resource of resources) {
    const resourceErrors = []
    
    if (!resource.type) resourceErrors.push('Missing type')
    if (!resource.title) resourceErrors.push('Missing title')
    if (resource.url && resource.url.startsWith('/documents/')) {
      resourceErrors.push('Has local path in url field')
    }
    
    if (resourceErrors.length > 0) {
      errors.push({
        _id: resource._id,
        title: resource.title || 'Unknown',
        errors: resourceErrors
      })
    }
  }

  if (errors.length > 0) {
    console.log(`  ⚠️  Found ${errors.length} resource(s) with errors:`)
    errors.forEach(e => {
      console.log(`    - ${e.title}: ${e.errors.join(', ')}`)
    })
  } else {
    console.log('  ✅ All resources valid')
  }
  
  return errors
}

async function checkPressReleases() {
  console.log('\n📰 Checking Press Releases...')
  const press = await client.fetch(`
    *[_type == "pressRelease"] {
      _id,
      title,
      slug,
      date
    }
  `)

  const errors = []
  for (const release of press) {
    const releaseErrors = []
    
    if (!release.title) releaseErrors.push('Missing title')
    if (!release.slug?.current) releaseErrors.push('Missing slug')
    if (!release.date) releaseErrors.push('Missing date')
    
    if (releaseErrors.length > 0) {
      errors.push({
        _id: release._id,
        title: release.title || 'Unknown',
        errors: releaseErrors
      })
    }
  }

  if (errors.length > 0) {
    console.log(`  ⚠️  Found ${errors.length} press release(s) with errors:`)
    errors.forEach(e => {
      console.log(`    - ${e.title}: ${e.errors.join(', ')}`)
    })
  } else {
    console.log('  ✅ All press releases valid')
  }
  
  return errors
}

async function checkFAQs() {
  console.log('\n❓ Checking FAQs...')
  const faqs = await client.fetch(`
    *[_type == "faq"] {
      _id,
      question,
      answer
    }
  `)

  const errors = []
  for (const faq of faqs) {
    const faqErrors = []
    
    if (!faq.question) faqErrors.push('Missing question')
    if (!faq.answer) faqErrors.push('Missing answer')
    
    if (faqErrors.length > 0) {
      errors.push({
        _id: faq._id,
        question: faq.question || 'Unknown',
        errors: faqErrors
      })
    }
  }

  if (errors.length > 0) {
    console.log(`  ⚠️  Found ${errors.length} FAQ(s) with errors:`)
    errors.forEach(e => {
      console.log(`    - ${e.question}: ${e.errors.join(', ')}`)
    })
  } else {
    console.log('  ✅ All FAQs valid')
  }
  
  return errors
}

async function checkDistributors() {
  console.log('\n🌍 Checking Distributors...')
  const distributors = await client.fetch(`
    *[_type == "distributor"] {
      _id,
      name,
      country,
      email
    }
  `)

  const errors = []
  for (const dist of distributors) {
    const distErrors = []
    
    if (!dist.name) distErrors.push('Missing name')
    if (!dist.country) distErrors.push('Missing country')
    if (!dist.email) distErrors.push('Missing email')
    
    if (distErrors.length > 0) {
      errors.push({
        _id: dist._id,
        name: dist.name || 'Unknown',
        errors: distErrors
      })
    }
  }

  if (errors.length > 0) {
    console.log(`  ⚠️  Found ${errors.length} distributor(s) with errors:`)
    errors.forEach(e => {
      console.log(`    - ${e.name}: ${e.errors.join(', ')}`)
    })
  } else {
    console.log('  ✅ All distributors valid')
  }
  
  return errors
}

async function checkPages() {
  console.log('\n📄 Checking Pages...')
  const pages = await client.fetch(`
    *[_type == "page"] {
      _id,
      title,
      slug
    }
  `)

  const errors = []
  for (const page of pages) {
    const pageErrors = []
    
    if (!page.title) pageErrors.push('Missing title')
    if (!page.slug?.current) pageErrors.push('Missing slug')
    
    if (pageErrors.length > 0) {
      errors.push({
        _id: page._id,
        title: page.title || 'Unknown',
        errors: pageErrors
      })
    }
  }

  if (errors.length > 0) {
    console.log(`  ⚠️  Found ${errors.length} page(s) with errors:`)
    errors.forEach(e => {
      console.log(`    - ${e.title}: ${e.errors.join(', ')}`)
    })
  } else {
    console.log('  ✅ All pages valid')
  }
  
  return errors
}

async function main() {
  console.log('🔍 Comprehensive Sanity Validation Check\n')
  console.log(`Project: ${projectId}`)
  console.log(`Dataset: ${dataset}\n`)

  try {
    const [products, resources, press, faqs, distributors, pages] = await Promise.all([
      checkProducts(),
      checkResources(),
      checkPressReleases(),
      checkFAQs(),
      checkDistributors(),
      checkPages(),
    ])

    const totalErrors = products.length + resources.length + press.length + faqs.length + distributors.length + pages.length

    console.log('\n' + '='.repeat(60))
    console.log('\n📊 SUMMARY\n')
    console.log(`Products: ${products.length} error(s)`)
    console.log(`Resources: ${resources.length} error(s)`)
    console.log(`Press Releases: ${press.length} error(s)`)
    console.log(`FAQs: ${faqs.length} error(s)`)
    console.log(`Distributors: ${distributors.length} error(s)`)
    console.log(`Pages: ${pages.length} error(s)`)
    console.log(`\nTotal: ${totalErrors} document(s) with validation errors`)

    if (totalErrors > 0) {
      console.log('\n💡 Run the fix script to automatically fix these errors:')
      console.log('   node scripts/fix-sanity-validation-errors.mjs --apply')
    } else {
      console.log('\n✅ All documents are valid!')
    }
  } catch (error) {
    console.error('❌ Error:', error.message)
    process.exit(1)
  }
}

main()

