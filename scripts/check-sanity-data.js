// Quick script to check what data exists in Sanity
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'jvtqk7fd',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})

async function checkSanityData() {
  console.log('🔍 Checking Sanity data...\n')
  console.log(`Project ID: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'jvtqk7fd'}`)
  console.log(`Dataset: ${process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'}\n`)

  try {
    // Check each content type
    const types = [
      'product',
      'testimonial',
      'pressRelease',
      'resource',
      'faq',
      'distributor',
      'teamMember',
      'page',
      'siteSettings',
      'homepage',
    ]

    for (const type of types) {
      const count = await client.fetch(`count(*[_type == "${type}"])`)
      console.log(`${type.padEnd(20)}: ${count} document(s)`)
    }

    console.log('\n✅ Connection successful!')
    console.log('\n📝 Next steps:')
    console.log('   1. Open Sanity Studio at http://localhost:3333/studio')
    console.log('   2. Create content using the schemas')
    console.log('   3. Start with "siteSettings" and "homepage" (singletons)')
  } catch (error) {
    console.error('❌ Error connecting to Sanity:', error.message)
    if (error.message.includes('project')) {
      console.error('\n💡 Make sure your NEXT_PUBLIC_SANITY_PROJECT_ID is correct')
    }
  }
}

checkSanityData()

