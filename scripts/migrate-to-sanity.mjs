#!/usr/bin/env node
/**
 * Migration Helper: Guide for importing data to Sanity
 */

import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const rootDir = join(__dirname, '..')

// Get env vars from .env.local manually
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

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: false,
  token: token || undefined,
})

async function checkData() {
  console.log('🔍 Current Sanity Data Status\n')
  console.log(`Project: ${projectId}`)
  console.log(`Dataset: ${dataset}\n`)
  
  const types = [
    'product',
    'testimonial', 
    'pressRelease',
    'resource',
    'faq',
    'distributor',
    'teamMember',
    'siteSettings',
    'homepage'
  ]
  
  for (const type of types) {
    try {
      const count = await client.fetch(`count(*[_type == "${type}"])`)
      const status = count > 0 ? '✅' : '❌'
      console.log(`${status} ${type.padEnd(20)}: ${count} document(s)`)
    } catch (e) {
      console.log(`❌ ${type.padEnd(20)}: Error checking`)
    }
  }
}

async function main() {
  console.log('🚀 Sanity Migration Status Check\n')
  await checkData()
  
  console.log('\n📝 IMPORTANT: Your content is currently in static TypeScript files.')
  console.log('   To make it editable in Sanity Studio, you need to import it.\n')
  
  console.log('🎯 RECOMMENDED APPROACH:\n')
  console.log('   1. Open Sanity Studio: http://localhost:3333/studio')
  console.log('   2. Manually create documents using the data from /data/ files')
  console.log('   3. Start with these (in order):')
  console.log('      - Site Settings (singleton) - from data/site-config.ts')
  console.log('      - Homepage (singleton) - from data/homepage.ts')
  console.log('      - Products - from data/all-products.ts')
  console.log('      - Press Releases - from data/press.ts')
  console.log('      - Resources & FAQs - from data/resources-content.ts')
  console.log('      - Team Members - from data/about.ts')
  console.log('      - Distributors - from data/distributors.ts')
  console.log('      - Testimonials - from data/testimonials.ts\n')
  
  console.log('💡 TIP: Keep the /data/ files open in another window')
  console.log('   and copy the content into Sanity Studio fields.\n')
  
  console.log('⚡ QUICK START:')
  console.log('   1. Open http://localhost:3333/studio')
  console.log('   2. Click "Site Settings" → Create')
  console.log('   3. Fill in from data/site-config.ts')
  console.log('   4. Save and continue with Homepage\n')
}

main().catch(console.error)
