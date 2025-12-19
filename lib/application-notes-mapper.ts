/**
 * Server-side utility to map application note IDs to actual filenames
 * This allows files to have any name - the system extracts the ID automatically
 */

import { readdir } from "fs/promises"
import { join } from "path"

export interface ApplicationNoteMapping {
  [noteId: string]: string // noteId -> actual filename
}

/**
 * Extract application note ID from a filename
 */
function extractNoteIdFromFilename(filename: string): string | null {
  // Remove extension
  const nameWithoutExt = filename.replace(/\.pdf$/i, "")

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
  if (nameWithoutExt.toLowerCase().includes("white paper") && nameWithoutExt.toLowerCase().includes("via")) {
    return "white-paper-via"
  }

  return null
}

/**
 * Scan the application-notes folder and create a mapping from IDs to filenames
 */
export async function getApplicationNoteMapping(): Promise<ApplicationNoteMapping> {
  try {
    const notesDir = join(process.cwd(), "public", "documents", "application-notes")

    // Read all files in the directory
    const files = await readdir(notesDir)

    // Filter to only PDF files
    const pdfFiles = files.filter((f) => f.toLowerCase().endsWith(".pdf"))

    // Create mapping: noteId -> actual filename
    const mapping: ApplicationNoteMapping = {}

    for (const file of pdfFiles) {
      // Extract note ID from filename
      const noteId = extractNoteIdFromFilename(file)

      if (noteId) {
        // Store the mapping (noteId -> actual filename)
        mapping[noteId] = file
      }
    }

    return mapping
  } catch (error) {
    // If directory doesn't exist or can't be read, return empty mapping
    return {}
  }
}

/**
 * Get the actual file path for an application note
 * Uses the mapping to find the real filename
 */
export async function getApplicationNoteFilePath(noteId: string): Promise<string | null> {
  const mapping = await getApplicationNoteMapping()
  const normalizedId = noteId.toLowerCase().replace(/\s+/g, "-")

  // Check if we have a mapping for this ID
  if (mapping[normalizedId]) {
    return `/documents/application-notes/${mapping[normalizedId]}`
  }

  // Fallback to standard naming convention
  return `/documents/application-notes/${normalizedId}.pdf`
}

