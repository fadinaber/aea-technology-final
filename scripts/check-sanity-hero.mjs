import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'jvtqk7fd',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
})

async function checkHero() {
  console.log('Checking what\'s actually in Sanity...\n')
  
  const homepage = await client.fetch('*[_type == "homepage"][0]')
  
  console.log('Hero data in Sanity:')
  console.log(JSON.stringify(homepage?.hero?.headline, null, 2))
  console.log('\nDescription:')
  console.log(homepage?.hero?.description)
  
  console.log('\n\nExpected:')
  console.log('Headline:')
  console.log(JSON.stringify({
    line1: "Professional RF",
    line2: "Testing Equipment",
    line3: "Products & Support"
  }, null, 2))
  console.log('\nDescription:')
  console.log("Trusted by aviation, military, and telecommunications professionals for over 30 years. Precision testing instruments designed and manufactured in the USA for critical applications.")
  
  const matches = 
    homepage?.hero?.headline?.line1 === "Professional RF" &&
    homepage?.hero?.headline?.line2 === "Testing Equipment" &&
    homepage?.hero?.headline?.line3 === "Products & Support"
  
  console.log('\n' + '='.repeat(60))
  if (matches) {
    console.log('✅ Sanity data is CORRECT!')
    console.log('The issue might be caching or the site not reading from Sanity.')
  } else {
    console.log('❌ Sanity data is WRONG!')
    console.log('Need to re-import the homepage.')
  }
}

checkHero().catch(console.error)

