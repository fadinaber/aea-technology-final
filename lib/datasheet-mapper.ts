/**
 * Server-side utility to map product slugs to actual datasheet filenames
 * This allows datasheets to have any name - the system extracts the product from the filename
 */

import { readdir } from "fs/promises"
import { join } from "path"

export interface DatasheetMapping {
  [productSlug: string]: string // productSlug -> actual filename
}

/**
 * Extract product identifier from a datasheet filename
 */
function extractProductFromFilename(filename: string): string[] {
  const nameLower = filename.toLowerCase()
  const products: string[] = []

  // Avionics
  if (nameLower.includes("avionics")) {
    products.push("e20-20-avionics")
  }

  // Bravo EX / EX2
  if (nameLower.includes("bravo ex") || nameLower.includes("bravoex") || (nameLower.includes("bravo") && nameLower.includes("ex"))) {
    products.push("via-bravo-ex2")
  }

  // Bravo MRI
  if (nameLower.includes("bravo mri") || nameLower.includes("bravomri") || (nameLower.includes("bravo") && nameLower.includes("mri"))) {
    products.push("via-bravo-mri-3000")
  }

  // SWR
  if (nameLower.includes("swr")) {
    products.push("swr-site-analyzer")
  }

  // E20/20 General (could be multiple products)
  if (nameLower.includes("e20") || nameLower.includes("e2020")) {
    if (nameLower.includes("general") || nameLower.includes("network")) {
      // Could be e20-20n, e20-20b, or e20-20f-catv
      products.push("e20-20n")
      products.push("e20-20b")
      products.push("e20-20f-catv")
    }
  }

  return products
}

/**
 * Scan the datasheets folder and create a mapping from product slugs to filenames
 */
export async function getDatasheetMapping(): Promise<DatasheetMapping> {
  try {
    const datasheetsDir = join(process.cwd(), "public", "documents", "datasheets")

    // Read all files in the directory
    const files = await readdir(datasheetsDir)

    // Filter to only PDF files
    const pdfFiles = files.filter((f) => f.toLowerCase().endsWith(".pdf"))

    // Create mapping: productSlug -> actual filename
    const mapping: DatasheetMapping = {}

    for (const file of pdfFiles) {
      // Extract product identifiers from filename
      const products = extractProductFromFilename(file)

      // Map each product to this file
      for (const productSlug of products) {
        mapping[productSlug] = file
      }
    }

    return mapping
  } catch (error) {
    // If directory doesn't exist or can't be read, return empty mapping
    return {}
  }
}

/**
 * Get the actual file path for a product datasheet
 * Uses the mapping to find the real filename
 */
export async function getDatasheetFilePath(productSlug: string): Promise<string | null> {
  const mapping = await getDatasheetMapping()

  // Check if we have a mapping for this product
  if (mapping[productSlug]) {
    return `/documents/datasheets/${mapping[productSlug]}`
  }

  // Fallback to standard naming convention
  return `/documents/datasheets/${productSlug}.pdf`
}

