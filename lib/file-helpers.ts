/**
 * Helper functions for linking local PDF files
 * 
 * File naming conventions:
 * - Application Notes: Use the ID from resources (e.g., "an223.pdf", "an100.pdf")
 * - Datasheets: Use the product slug (e.g., "e20-20n.pdf", "via-bravo-mri-3000.pdf")
 */

/**
 * Get the local path for an application note PDF
 * @param noteId - The application note ID (e.g., "an223", "an100")
 * @returns Local file path or null if file doesn't exist
 */
export function getApplicationNotePath(noteId: string): string | null {
  // Normalize the ID (remove spaces, lowercase)
  const normalizedId = noteId.toLowerCase().replace(/\s+/g, "-")
  
  // Try common variations
  const variations = [
    `/documents/application-notes/${normalizedId}.pdf`,
    `/documents/application-notes/${normalizedId.toUpperCase()}.pdf`,
    `/documents/application-notes/AN${normalizedId.replace("an", "")}.pdf`,
  ]
  
  // Return first variation (Next.js will handle 404 if file doesn't exist)
  return variations[0]
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

