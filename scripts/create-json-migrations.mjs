#!/usr/bin/env node
/**
 * Create JSON migration files from TypeScript data
 * These JSON files can be imported into Sanity using the import tool
 */

import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const rootDir = join(__dirname, '..')
const migrationsDir = join(rootDir, 'scripts', 'sanity-migrations')

// Create migrations directory
import { mkdirSync } from 'fs'
try {
  mkdirSync(migrationsDir, { recursive: true })
} catch (e) {
  // Directory might already exist
}

console.log('📦 Creating JSON migration files...\n')
console.log('⚠️  Note: This requires manual data extraction from TypeScript files.')
console.log('   For now, please use Sanity Studio to enter data manually.\n')
console.log('   The data files are located in: /data/\n')
console.log('   Recommended order:')
console.log('   1. site-config.ts → Site Settings (singleton)')
console.log('   2. homepage.ts → Homepage (singleton)')
console.log('   3. all-products.ts → Products')
console.log('   4. press.ts → Press Releases')
console.log('   5. resources-content.ts → Resources & FAQs')
console.log('   6. about.ts → Team Members')
console.log('   7. distributors.ts → Distributors')
console.log('   8. testimonials.ts → Testimonials\n')

console.log('✅ Migration directory created at: scripts/sanity-migrations/')
console.log('   You can manually create JSON files here for import.\n')

