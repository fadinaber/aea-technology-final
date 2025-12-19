/**
 * Helper functions for linking local PDF files
 * 
 * File naming conventions:
 * - Application Notes: Can use any filename - the system will automatically extract the ID
 * - Datasheets: Use the product slug (e.g., "e20-20n.pdf", "via-bravo-mri-3000.pdf")
 */

/**
 * Extract application note ID from a filename
 * Handles various formats:
 * - "AN258 USB-to-Serial Communications.pdf" → "an258"
 * - "63dc295f5032918ac9873629_AN258 USB-to-Serial Communications.pdf" → "an258"
 * - "an258.pdf" → "an258"
 * - "AN258.pdf" → "an258"
 */
function extractNoteIdFromFilename(filename: string): string | null {
  // Remove extension
  const nameWithoutExt = filename.replace(/\.pdf$/i, '')
  
  // Try to find AN### pattern (case insensitive)
  const anMatch = nameWithoutExt.match(/an(\d+)/i)
  if (anMatch) {
    return `an${anMatch[1]}`.toLowerCase()
  }
  
  // Try to find just numbers that might be an ID
  const numberMatch = nameWithoutExt.match(/\b(\d{3,4})\b/)
  if (numberMatch) {
    const num = numberMatch[1]
    // Check if it's in the range of known application notes (100-259)
    const numVal = parseInt(num)
    if (numVal >= 100 && numVal <= 259) {
      return `an${num}`.toLowerCase()
    }
  }
  
  // Check for "white-paper-via" pattern
  if (nameWithoutExt.toLowerCase().includes('white paper') && nameWithoutExt.toLowerCase().includes('via')) {
    return 'white-paper-via'
  }
  
  return null
}

/**
 * Get the local path for an application note PDF
 * This function uses a dynamic route that automatically finds the file
 * by scanning the folder and matching the ID in the filename
 * 
 * @param noteId - The application note ID (e.g., "an223", "an100")
 * @returns Local file path - uses dynamic route that finds the actual file
 */
export function getApplicationNotePath(noteId: string): string | null {
  // Normalize the ID (lowercase, remove spaces)
  const normalizedId = noteId.toLowerCase().replace(/\s+/g, "-")
  
  // Use the dynamic route that will automatically find the file
  // The route handler scans the folder and matches files by ID
  return `/documents/application-notes/${normalizedId}`
}

/**
 * Get all possible filename variations for an application note
 * This helps when files have different naming conventions
 */
export function getApplicationNotePathVariations(noteId: string): string[] {
  const normalizedId = noteId.toLowerCase().replace(/\s+/g, "-")
  
  return [
    `/documents/application-notes/${normalizedId}.pdf`,
    `/documents/application-notes/${normalizedId.toUpperCase()}.pdf`,
    `/documents/application-notes/AN${normalizedId.replace("an", "")}.pdf`,
  ]
}

/**
 * Get the local path for a product datasheet PDF
 * @param productSlug - The product slug (e.g., "e20-20n", "via-bravo-mri-3000")
 * @returns Local file path
 */
export function getDatasheetPath(productSlug: string): string {
  return `/documents/datasheets/${productSlug}.pdf`
}

/**
 * Check if a local file exists (client-side only)
 * Note: This is a client-side check. For server-side, you'd need to use fs.
 */
export async function checkFileExists(path: string): Promise<boolean> {
  if (typeof window === "undefined") {
    // Server-side: assume file exists if path is valid
    return path.startsWith("/documents/")
  }
  
  // Client-side: try to fetch the file
  try {
    const response = await fetch(path, { method: "HEAD" })
    return response.ok
  } catch {
    return false
  }
}
