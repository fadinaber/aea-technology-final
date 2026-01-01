#!/usr/bin/env node
/**
 * Migration script to fix FAQ answers in Sanity
 * Converts string answers to portable text blocks (array format)
 * 
 * Usage: node scripts/fix-faq-answers.mjs [--dry-run]
 */

import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { randomBytes } from 'crypto'

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

if (!token) {
  console.error('❌ SANITY_API_TOKEN is required')
  console.log('   Add it to .env.local and try again\n')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: false,
  token,
})

/**
 * Convert a string to portable text blocks format
 */
function stringToBlocks(text) {
  if (!text || typeof text !== 'string') {
    return [
      {
        _type: 'block',
        _key: randomBytes(16).toString('hex'),
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: '',
          },
        ],
        markDefs: [],
      },
    ]
  }

  // Split by newlines to preserve paragraphs
  const paragraphs = text.split('\n').filter(p => p.trim().length > 0)
  
  if (paragraphs.length === 0) {
    return [
      {
        _type: 'block',
        _key: randomBytes(16).toString('hex'),
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: text,
          },
        ],
        markDefs: [],
      },
    ]
  }

  return paragraphs.map((para, index) => ({
    _type: 'block',
    _key: randomBytes(16).toString('hex'),
    style: 'normal',
    children: [
      {
        _type: 'span',
        text: para.trim(),
      },
    ],
    markDefs: [],
  }))
}

/**
 * Check if value is already in block format
 */
function isBlockFormat(value) {
  return Array.isArray(value) && value.length > 0 && value[0]._type === 'block'
}

async function fixFaqAnswers(dryRun = false) {
  console.log('🔍 Fetching all FAQs from Sanity...\n')
  console.log(`Project: ${projectId}`)
  console.log(`Dataset: ${dataset}`)
  console.log(`Mode: ${dryRun ? 'DRY RUN (no changes will be made)' : 'LIVE (will update FAQs)'}\n`)

  try {
    // Fetch all FAQs
    const faqs = await client.fetch(`
      *[_type == "faq"] {
        _id,
        question,
        answer,
        category,
        order,
        featured
      }
    `)

    if (!faqs || faqs.length === 0) {
      console.log('❌ No FAQs found in Sanity')
      return
    }

    console.log(`📋 Found ${faqs.length} FAQ(s)\n`)

    const toFix = []
    const alreadyFixed = []

    // Check which FAQs need fixing
    for (const faq of faqs) {
      if (!faq.answer) {
        toFix.push({ ...faq, reason: 'Missing answer' })
      } else if (typeof faq.answer === 'string') {
        toFix.push({ ...faq, reason: 'Answer is a string (needs conversion)' })
      } else if (!isBlockFormat(faq.answer)) {
        toFix.push({ ...faq, reason: 'Answer is not in block format' })
      } else {
        alreadyFixed.push(faq)
      }
    }

    console.log(`✅ ${alreadyFixed.length} FAQ(s) already in correct format`)
    console.log(`🔧 ${toFix.length} FAQ(s) need fixing\n`)

    if (toFix.length === 0) {
      console.log('🎉 All FAQs are already in the correct format!')
      return
    }

    // Show what will be fixed
    console.log('📝 FAQs to fix:\n')
    toFix.forEach((faq, index) => {
      console.log(`${index + 1}. "${faq.question}"`)
      console.log(`   Reason: ${faq.reason}`)
      if (typeof faq.answer === 'string') {
        const preview = faq.answer.substring(0, 60).replace(/\n/g, ' ')
        console.log(`   Current answer (preview): ${preview}...`)
      }
      console.log('')
    })

    if (dryRun) {
      console.log('🔍 DRY RUN: No changes made. Remove --dry-run to apply fixes.')
      return
    }

    // Fix FAQs
    console.log('🔄 Converting answers to block format...\n')

    const results = []
    for (const faq of toFix) {
      try {
        const blockAnswer = stringToBlocks(faq.answer)

        const update = {
          _id: faq._id,
          answer: blockAnswer,
        }

        await client.patch(faq._id).set({ answer: blockAnswer }).commit()

        results.push({
          id: faq._id,
          question: faq.question,
          success: true,
        })

        console.log(`✅ Fixed: "${faq.question.substring(0, 50)}..."`)
      } catch (error) {
        results.push({
          id: faq._id,
          question: faq.question,
          success: false,
          error: error.message,
        })

        console.error(`❌ Failed to fix "${faq.question}":`, error.message)
      }
    }

    console.log('\n📊 Summary:')
    const successful = results.filter(r => r.success).length
    const failed = results.filter(r => !r.success).length
    console.log(`✅ Fixed: ${successful}`)
    if (failed > 0) {
      console.log(`❌ Failed: ${failed}`)
    }
    console.log('\n🎉 Migration complete!')
  } catch (error) {
    console.error('❌ Error:', error.message)
    if (error.details) {
      console.error('Details:', error.details)
    }
    process.exit(1)
  }
}

// Parse command line arguments
const args = process.argv.slice(2)
const dryRun = args.includes('--dry-run') || args.includes('-d')

// Run migration
fixFaqAnswers(dryRun).catch(console.error)

