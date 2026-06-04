// One-time seed script: pre-populates the ISO + ANAB certification items
// on the homepage document so you can just swap files later instead of
// adding items from scratch.
//
// Usage (from the repo root):
//   cd studio
//   npm install @sanity/client
//   SANITY_AUTH_TOKEN="<your-editor-token>" node seed-certifications.mjs
//
// Safe to re-run: if items already exist, it does nothing.

import { createClient } from '@sanity/client'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = path.resolve(__dirname, '..')

const PDF_PATH = path.join(REPO_ROOT, 'public/documents/CERT-ISO-9001-29-JAN-2027-SCB.pdf')
const LOGO_PATH = path.join(REPO_ROOT, 'public/images/design-mode/ANAB-MS-CB-3C.png')

const token = process.env.SANITY_AUTH_TOKEN
if (!token) {
  console.error('❌  Set SANITY_AUTH_TOKEN env var. Create a token with Editor permission at https://sanity.io/manage')
  process.exit(1)
}

const client = createClient({
  projectId: 'jvtqk7fd',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

async function run() {
  console.log('• Fetching current homepage document...')
  const homepage = await client.fetch('*[_id=="homepage"][0]{ _id, whyChooseUs }')

  if (!homepage) {
    console.error('❌  No homepage document found.')
    process.exit(1)
  }

  const existing = homepage.whyChooseUs?.certifications?.items ?? []
  if (existing.length > 0) {
    console.log('✓ Certification items already exist — nothing to do. Edit them in Studio.')
    return
  }

  console.log('• Uploading ISO 9001 PDF to Sanity...')
  const pdfAsset = await client.assets.upload('file', fs.createReadStream(PDF_PATH), {
    filename: 'CERT-ISO-9001-29-JAN-2027-SCB.pdf',
  })
  console.log('  → uploaded:', pdfAsset._id)

  console.log('• Uploading ANAB logo to Sanity...')
  const logoAsset = await client.assets.upload('image', fs.createReadStream(LOGO_PATH), {
    filename: 'ANAB-MS-CB-3C.png',
  })
  console.log('  → uploaded:', logoAsset._id)

  console.log('• Patching homepage document...')
  await client
    .patch('homepage')
    .setIfMissing({ whyChooseUs: {} })
    .setIfMissing({ 'whyChooseUs.certifications': {} })
    .set({
      'whyChooseUs.certifications.sectionTitle':
        homepage.whyChooseUs?.certifications?.sectionTitle ?? 'Industry Certifications',
      'whyChooseUs.certifications.sectionDescription':
        homepage.whyChooseUs?.certifications?.sectionDescription ??
        'Recognized by leading industry standards and accreditation bodies',
      'whyChooseUs.certifications.items': [
        {
          _key: 'cert-iso-9001',
          _type: 'object',
          name: 'ISO 9001 Certificate',
          displayText: 'ISO 9001',
          isDownload: true,
          certificateFile: {
            _type: 'file',
            asset: { _type: 'reference', _ref: pdfAsset._id },
          },
        },
        {
          _key: 'cert-anab',
          _type: 'object',
          name: 'ANAB Accredited',
          displayText: 'ANAB',
          isDownload: false,
          externalLink: 'https://anab.ansi.org/',
          logo: {
            _type: 'image',
            asset: { _type: 'reference', _ref: logoAsset._id },
          },
        },
      ],
    })
    .commit()

  console.log('✅ Done. Open Studio → Homepage → Why Choose Us → Certifications.')
}

run().catch((err) => {
  console.error('❌  Failed:', err.message)
  process.exit(1)
})
