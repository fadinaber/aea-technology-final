#!/usr/bin/env node
/**
 * Fix Homepage Hero Headline in Sanity
 * Updates the headline to match the correct content
 */

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
  console.warn('Could not read .env.local')
}

if (!token) {
  console.error('❌ SANITY_API_TOKEN is required')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: false,
  token,
})

const correctHeadline = {
  line1: "Professional RF",
  line2: "Testing Equipment",
  line3: "Products & Support"
}

async function fixHeadline() {
  console.log('🔧 Fixing homepage hero headline in Sanity...\n')

  try {
    // Fetch current homepage
    const homepage = await client.fetch('*[_type == "homepage"][0]')
    
    if (!homepage) {
      console.error('❌ No homepage document found in Sanity')
      process.exit(1)
    }

    console.log('Current headline:', JSON.stringify(homepage.hero?.headline))
    console.log('Correct headline:', JSON.stringify(correctHeadline))

    // Update the headline
    const updated = await client
      .patch(homepage._id)
      .set({
        'hero.headline': correctHeadline
      })
      .commit()

    console.log('\n✅ Homepage hero headline updated successfully!')
    console.log('New headline:', JSON.stringify(updated.hero?.headline))
    
  } catch (error) {
    console.error('❌ Error updating headline:', error.message)
    process.exit(1)
  }
}

fixHeadline().catch(console.error)

