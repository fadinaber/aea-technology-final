// Read-only diagnostic: dumps every Sanity "resource" doc so we can see the
// exact localPath / file each download button points to. Nothing is written.
//
// Usage (from repo root):
//   cd studio && SANITY_AUTH_TOKEN="<token>" node dump-resources.mjs
//
// Paste the full output back into the chat.

import { createClient } from '@sanity/client'

const token = process.env.SANITY_AUTH_TOKEN
const client = createClient({
  projectId: 'jvtqk7fd',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

const rows = await client.fetch(`
  *[_type == "resource"] | order(type asc, title asc) {
    type,
    title,
    localPath,
    downloadUrl,
    "fileUrl": file.asset->url
  }
`)

console.log(`\nTotal resources: ${rows.length}\n`)
for (const r of rows) {
  const src =
    r.fileUrl ? `fileUrl: ${r.fileUrl}` :
    r.localPath ? `localPath: ${r.localPath}` :
    r.downloadUrl ? `downloadUrl: ${r.downloadUrl}` :
    'NO FILE'
  console.log(`[${r.type}] ${r.title}\n    ${src}`)
}
