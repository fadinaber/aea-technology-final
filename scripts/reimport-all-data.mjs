#!/usr/bin/env node
/**
 * Re-import All Data to Sanity
 * Re-imports all content to ensure everything is up to date and complete
 */

const importOrder = [
  'siteSettings',
  'products', 
  'homepage',
  'distributors',
  'press',
  'teamMembers',
  'resources'
]

async function reimportAll() {
  console.log('🚀 Re-importing all content to Sanity...\n')
  console.log('This will update/create all content from your data files.\n')

  for (const type of importOrder) {
    console.log(`\n📥 Importing ${type}...`)
    try {
      const response = await fetch('http://localhost:3000/api/sanity/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, dryRun: false }),
      })

      if (!response.ok) {
        const error = await response.text()
        console.error(`❌ Failed to import ${type}:`, error)
        continue
      }

      const result = await response.json()
      if (result.error) {
        console.error(`❌ Error importing ${type}:`, result.error)
      } else {
        const count = result.results?.length || result.imported || 'unknown'
        console.log(`✅ Imported ${type}: ${count} items`)
      }
    } catch (error) {
      console.error(`❌ Error importing ${type}:`, error.message)
      console.log('   Make sure the dev server is running on port 3000')
      process.exit(1)
    }
  }

  console.log('\n✅ All imports complete!')
  console.log('\n📝 Next steps:')
  console.log('   1. Check Sanity Studio: http://localhost:3333/studio')
  console.log('   2. Upload product images via /admin/sanity-import')
  console.log('   3. Verify all content is visible and editable')
}

reimportAll().catch(console.error)

