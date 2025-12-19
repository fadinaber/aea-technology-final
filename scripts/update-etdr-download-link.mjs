#!/usr/bin/env node
/**
 * Update ETDR PC Vision download link in Sanity CMS
 * This script finds the ETDR PC Vision software resource and updates its downloadUrl
 * 
 * Usage: node scripts/update-etdr-download-link.mjs
 * 
 * Requires environment variables:
 * - NEXT_PUBLIC_SANITY_PROJECT_ID
 * - NEXT_PUBLIC_SANITY_DATASET (optional, defaults to "production")
 * - SANITY_API_TOKEN
 */

import { createClient } from "@sanity/client"
import { readFileSync } from "fs"
import { fileURLToPath } from "url"
import { dirname, join } from "path"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Read .env.local file
function loadEnv() {
  try {
    const envPath = join(__dirname, "..", ".env.local")
    const envFile = readFileSync(envPath, "utf-8")
    const envVars = {}
    
    envFile.split("\n").forEach((line) => {
      const trimmed = line.trim()
      if (trimmed && !trimmed.startsWith("#")) {
        const [key, ...valueParts] = trimmed.split("=")
        if (key && valueParts.length > 0) {
          envVars[key.trim()] = valueParts.join("=").trim().replace(/^["']|["']$/g, "")
        }
      }
    })
    
    return envVars
  } catch (error) {
    console.error("❌ Could not read .env.local file:", error.message)
    console.error("💡 Make sure .env.local exists in the project root")
    process.exit(1)
  }
}

const env = loadEnv()

const ETDR_DOWNLOAD_URL = "https://s3-us-west-2.amazonaws.com/aea-technology/software/ETDR+PC+Vision+2015-3.zip"

const client = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: env.SANITY_API_TOKEN || process.env.SANITY_API_TOKEN,
})

async function updateETDRDownloadLink() {
  try {
    console.log("🔍 Searching for ETDR PC Vision resource in Sanity...")

    // Find the ETDR PC Vision resource
    const resources = await client.fetch(
      `*[_type == "resource" && type == "software" && (title match "*ETDR*PC*Vision*" || title match "*etdr*pc*vision*")]`
    )

    if (resources.length === 0) {
      console.log("⚠️  No ETDR PC Vision resource found in Sanity.")
      console.log("💡 You may need to create it manually in Sanity Studio:")
      console.log("   1. Go to Sanity Studio")
      console.log("   2. Create a new Resource")
      console.log("   3. Set Type: Software")
      console.log("   4. Set Title: ETDR PC Vision™ Software")
      console.log("   5. Set Download URL:", ETDR_DOWNLOAD_URL)
      return
    }

    if (resources.length > 1) {
      console.log(`⚠️  Found ${resources.length} ETDR PC Vision resources. Updating all of them...`)
    }

    // Update each resource
    for (const resource of resources) {
      console.log(`\n📝 Updating: ${resource.title} (ID: ${resource._id})`)
      
      const updateResult = await client
        .patch(resource._id)
        .set({
          downloadUrl: ETDR_DOWNLOAD_URL,
        })
        .commit()

      console.log(`✅ Successfully updated download URL to: ${ETDR_DOWNLOAD_URL}`)
    }

    console.log("\n✨ Done! The ETDR PC Vision download link has been updated in Sanity.")
    console.log("💡 Changes will appear on the website after the next build/deployment.")
  } catch (error) {
    console.error("❌ Error updating ETDR download link:", error.message)
    if (error.message.includes("token")) {
      console.error("\n💡 Make sure SANITY_API_TOKEN is set in your .env.local file")
    }
    process.exit(1)
  }
}

// Run the update
updateETDRDownloadLink()

