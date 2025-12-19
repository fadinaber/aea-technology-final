import { NextResponse } from "next/server"
import { readdir } from "fs/promises"
import { join } from "path"

/**
 * API route that scans the application-notes folder and creates a mapping
 * from application note IDs to actual filenames
 * 
 * This allows users to paste files with any name, and the system will
 * automatically link them based on the ID found in the filename
 */
export async function GET() {
  try {
    const notesDir = join(process.cwd(), "public", "documents", "application-notes")
    
    // Read all files in the directory
    const files = await readdir(notesDir)
    
    // Filter to only PDF files
    const pdfFiles = files.filter((f) => f.toLowerCase().endsWith(".pdf"))
    
    // Create mapping: noteId -> actual filename
    const mapping: Record<string, string> = {}
    
    for (const file of pdfFiles) {
      // Extract note ID from filename
      const noteId = extractNoteIdFromFilename(file)
      
      if (noteId) {
        // Store the mapping (noteId -> actual filename)
        mapping[noteId] = file
      }
    }
    
    return NextResponse.json({ mapping, count: Object.keys(mapping).length })
  } catch (error) {
    // If directory doesn't exist or can't be read, return empty mapping
    return NextResponse.json({ mapping: {}, count: 0 })
  }
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

