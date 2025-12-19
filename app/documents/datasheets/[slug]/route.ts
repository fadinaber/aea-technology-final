import { NextRequest, NextResponse } from "next/server"
import { readFile } from "fs/promises"
import { join } from "path"
import { getDatasheetMapping } from "@/lib/datasheet-mapper"

/**
 * Dynamic route to serve product datasheet PDFs
 * This allows files to have any name - the system finds them by product slug
 * 
 * Example: /documents/datasheets/e20-20-avionics
 * Will find and serve the file that contains "avionics" in its name
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    // Get the mapping of product slugs to actual filenames
    const mapping = await getDatasheetMapping()

    // Debug logging
    console.log("Datasheet request for slug:", slug)
    console.log("Available mappings:", Object.keys(mapping))

    // Find the actual filename for this product slug
    const actualFilename = mapping[slug]

    if (!actualFilename) {
      console.error(`No mapping found for slug: ${slug}`)
      return new NextResponse(`Datasheet not found for product: ${slug}`, { status: 404 })
    }

    console.log(`Serving datasheet: ${actualFilename} for product: ${slug}`)

    // Read the file
    const filePath = join(process.cwd(), "public", "documents", "datasheets", actualFilename)
    const fileBuffer = await readFile(filePath)

    // Return the file with proper headers
    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${actualFilename}"`,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    })
  } catch (error) {
    console.error("Error serving datasheet:", error)
    return new NextResponse(`Error serving file: ${error.message}`, { status: 500 })
  }
}

