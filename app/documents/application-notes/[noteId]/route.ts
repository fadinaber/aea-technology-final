import { NextRequest, NextResponse } from "next/server"
import { readFile } from "fs/promises"
import { join } from "path"
import { getApplicationNoteMapping } from "@/lib/application-notes-mapper"

/**
 * Dynamic route to serve application note PDFs
 * This allows files to have any name - the system finds them by ID
 * 
 * Example: /documents/application-notes/an258
 * Will find and serve the file that contains "an258" or "AN258" in its name
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ noteId: string }> }
) {
  try {
    const { noteId } = await params
    const normalizedId = noteId.toLowerCase().replace(/\s+/g, "-")

    // Get the mapping of note IDs to actual filenames
    const mapping = await getApplicationNoteMapping()

    // Find the actual filename for this note ID
    const actualFilename = mapping[normalizedId]

    if (!actualFilename) {
      return new NextResponse("Application note not found", { status: 404 })
    }

    // Read the file
    const filePath = join(process.cwd(), "public", "documents", "application-notes", actualFilename)
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
    console.error("Error serving application note:", error)
    return new NextResponse("Error serving file", { status: 500 })
  }
}

