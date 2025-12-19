// Quick test script to verify datasheet mapping
import { readdir } from "fs/promises"
import { join } from "path"
import { fileURLToPath } from "url"
import { dirname } from "path"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

async function testMapping() {
  const datasheetsDir = join(process.cwd(), "public", "documents", "datasheets")
  const files = await readdir(datasheetsDir)
  const pdfFiles = files.filter((f) => f.toLowerCase().endsWith(".pdf"))
  
  console.log("Files found:", pdfFiles)
  
  for (const file of pdfFiles) {
    const nameLower = file.toLowerCase()
    console.log(`\nTesting: ${file}`)
    console.log(`  Lowercase: ${nameLower}`)
    
    if (nameLower.includes("e20") || nameLower.includes("e2020")) {
      if (nameLower.includes("general") || nameLower.includes("network") || nameLower.includes("data sheet")) {
        console.log(`  ✓ Matches E20/20 General pattern`)
        console.log(`  → Should map to: e20-20-avionics, e20-20n, e20-20b, e20-20f-catv`)
      }
    }
    
    if (nameLower.includes("e2020") && nameLower.includes("general")) {
      console.log(`  ✓ Also matches E2020 + General pattern`)
    }
  }
}

testMapping().catch(console.error)

