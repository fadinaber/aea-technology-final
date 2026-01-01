import type { Metadata } from "next"
import { client } from "@/sanity/lib/client"
import { allResourcesQuery, allFaqsQuery } from "@/sanity/lib/queries"
import ResourcesClient from "./resources-client"
import { getApplicationNotePath } from "@/lib/file-helpers"

// Increase revalidation time for better TTFB - content doesn't change frequently
// 12 hours cache for better TTFB - content changes monthly
export const revalidate = 43200

export const metadata: Metadata = {
  title: "Resources - Manuals, Software, Videos & FAQs | AEA Technology",
  description:
    "Download TDR and VNA manuals, software updates, application notes, and training videos. Find answers to frequently asked questions about AEA Technology RF test equipment.",
  keywords: [
    "TDR manual",
    "VNA manual",
    "E20/20 software",
    "cable testing videos",
    "RF testing FAQ",
    "application notes",
    "training videos",
    "product documentation",
  ],
  openGraph: {
    title: "Resources & Support | AEA Technology",
    description:
      "Access product manuals, software downloads, training videos, and FAQs for all AEA Technology test equipment.",
    url: "https://aeatechnology.com/resources",
  },
  alternates: {
    canonical: "https://aeatechnology.com/resources",
  },
}

export type SanityResource = {
  _id: string
  title: string
  description?: string
  category?: string
  type: "software" | "manual" | "video" | "faq" | "application-note"
  version?: string
  downloadUrl?: string
  fileUrl?: string
  localPath?: string
  fileSize?: string
  videoId?: string
  duration?: string
  tags?: string[]
  featured?: boolean
  content?: any // For FAQs, this is rich text
}

export type SanityFaq = {
  _id: string
  question: string
  answer: string
  category?: string
}

export default async function ResourcesPage() {
  const [resources, faqs] = await Promise.all([
    client.fetch<SanityResource[]>(allResourcesQuery).catch(() => []),
    client.fetch<SanityFaq[]>(allFaqsQuery).catch(() => []),
  ])

  // Transform Sanity resources to the format expected by the client
  const transformedResources =
    resources.length > 0
      ? {
          software: resources
            .filter((r) => r.type === "software")
            .map((r) => {
              // Map software titles to zip files
              let downloadUrl = r.localPath || r.fileUrl || r.downloadUrl || "#"
              
              // If no download URL set, map by title
              if (downloadUrl === "#" || !downloadUrl) {
                const titleLower = r.title?.toLowerCase() || ""
                if (titleLower.includes("tdr") || titleLower.includes("etdr")) {
                  downloadUrl = "/documents/software/TDR_PC_Vision.zip"
                } else if (titleLower.includes("site analyzer")) {
                  downloadUrl = "/documents/software/Site_Analyzer_PC_Vision.zip"
                } else if (titleLower.includes("mri")) {
                  downloadUrl = "/documents/software/MRI_Vision.zip"
                }
              }
              
              return {
                id: r._id,
                title: r.title,
                description: r.description || "",
                category: r.category || "Software",
                type: "software" as const,
                version: r.version,
                size: r.fileSize,
                downloadUrl: downloadUrl,
                tags: r.tags || [],
                featured: r.featured,
              }
            }),
          manuals: resources
            .filter((r) => r.type === "manual")
            .map((r) => ({
              id: r._id,
              title: r.title,
              description: r.description || "",
              category: r.category || "Manual",
              type: "manual" as const,
              size: r.fileSize,
              downloadUrl: r.localPath || r.fileUrl || r.downloadUrl || "#",
              tags: r.tags || [],
              featured: r.featured,
            })),
          videos: resources
            .filter((r) => r.type === "video")
            .map((r) => ({
              id: r._id,
              title: r.title,
              description: r.description || "",
              category: r.category || "Video",
              type: "video" as const,
              videoId: r.videoId,
              duration: r.duration,
              tags: r.tags || [],
              featured: r.featured,
            })),
          faqs:
            faqs.length > 0
              ? faqs.map((f) => ({
                  id: f._id,
                  title: f.question,
                  description: f.question,
                  category: f.category || "General",
                  type: "faq" as const,
                  content: f.answer,
                  tags: [],
                }))
              : resources
                  .filter((r) => r.type === "faq")
                  .map((r) => ({
                    id: r._id,
                    title: r.title,
                    description: r.description || "",
                    category: r.category || "FAQ",
                    type: "faq" as const,
                    content:
                      typeof r.content === "string"
                        ? r.content
                        : r.content?.[0]?.children?.[0]?.text || r.description || "",
                    tags: r.tags || [],
                  })),
          "application-notes": resources
            .filter((r) => r.type === "application-note")
            .map((r) => {
              // Map Sanity category to the expected category names
              let category = r.category || ""
              
              // Normalize category to match expected format
              if (category.includes("General") || category === "General Application Notes") {
                category = "General Application Notes"
              } else if (category.includes("VNA") || category === "VNA Application Notes") {
                category = "VNA Application Notes"
              } else if (category.includes("TDR") || category === "TDR Application Notes") {
                category = "TDR Application Notes"
              } else {
                // Try to infer category from title/description if not set
                const titleLower = r.title?.toLowerCase() || ""
                const descLower = r.description?.toLowerCase() || ""
                const combined = `${titleLower} ${descLower}`
                
                // General application notes (AN150-AN153)
                if (titleLower.match(/an15[0-3]/) || combined.includes("battery") || combined.includes("serial port") || combined.includes("cold weather")) {
                  category = "General Application Notes"
                }
                // VNA application notes (AN100-AN132, white paper)
                else if (
                  titleLower.match(/an1[0-3]/) ||
                  titleLower.includes("white paper") ||
                  titleLower.includes("via") ||
                  combined.includes("swr") ||
                  combined.includes("network analyzer") ||
                  combined.includes("smith chart") ||
                  combined.includes("impedance") ||
                  combined.includes("antenna")
                ) {
                  category = "VNA Application Notes"
                }
                // TDR application notes (AN200-AN259)
                else if (
                  titleLower.match(/an2[0-9]/) ||
                  combined.includes("tdr") ||
                  combined.includes("time domain") ||
                  combined.includes("cable") ||
                  combined.includes("coax") ||
                  combined.includes("twisted pair")
                ) {
                  category = "TDR Application Notes"
                } else {
                  // Default fallback
                  category = "General Application Notes"
                }
              }
              
              // Extract application note ID from title (e.g., "AN258" -> "an258")
              let noteId = r._id // Fallback to Sanity ID
              const titleLower = r.title?.toLowerCase() || ""
              
              // Try to extract AN number from title
              const anMatch = r.title?.match(/an(\d+)/i)
              if (anMatch) {
                noteId = `an${anMatch[1]}`.toLowerCase()
              } else if (titleLower.includes("cold weather") && titleLower.includes("operation")) {
                noteId = "an153"
              } else if (
                (titleLower.includes("white paper") && titleLower.includes("via")) ||
                (titleLower.includes("via analyzer") && titleLower.includes("via bravo")) ||
                (titleLower.includes("via") && titleLower.includes("analyzer") && titleLower.includes("bravo"))
              ) {
                noteId = "white-paper-via"
              }
              
              // Priority: localPath (from Sanity) > fileUrl (Sanity upload) > downloadUrl (external) > getApplicationNotePath (local file) > fallback
              // Use the dynamic route that automatically finds the file by ID
              const localFilePath = getApplicationNotePath(noteId)
              const downloadUrl = r.localPath || r.fileUrl || r.downloadUrl || localFilePath || "#"
              
              return {
                id: noteId, // Use extracted note ID instead of Sanity _id
                title: r.title,
                description: r.description || "",
                category: category,
                type: "manual" as const,
                size: r.fileSize,
                downloadUrl: downloadUrl,
                tags: r.tags || [],
                featured: r.featured,
              }
            }),
        }
      : undefined // Will use default static data in client

  return <ResourcesClient initialData={transformedResources} />
}
