// Resource Schema for Sanity CMS
// Migrated from /data/resources-content.ts

import { defineField, defineType } from "sanity"

export default defineType({
  name: "resource",
  title: "Resource",
  type: "document",
  groups: [
    { name: "basic", title: "Basic Info" },
    { name: "file", title: "File Upload" },
    { name: "content", title: "Content & Details" },
  ],
  fields: [
    defineField({
      name: "type",
      title: "Resource Type",
      type: "string",
      group: "basic",
      options: {
        list: [
          { title: "Software", value: "software" },
          { title: "Manual", value: "manual" },
          { title: "Video", value: "video" },
          { title: "FAQ", value: "faq" },
          { title: "Application Note", value: "application-note" },
        ],
      },
      validation: (Rule) => Rule.required(),
      description: "Select 'Application Note' to create or edit an application note PDF.",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "basic",
      validation: (Rule) => Rule.required(),
      description: "For application notes, use format: 'AN### - Title' (e.g., 'AN258 - USB-to-Serial Communications')",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "basic",
      options: { source: "title", maxLength: 96 },
    }),
    // File uploads - Moved to dedicated group at top for easy access
    defineField({
      name: "file",
      title: "Upload PDF File",
      type: "file",
      group: "file",
      description: "📎 Upload the application note PDF here. Click the uploaded file to replace it with a new version. The system will automatically link it based on the title (e.g., 'AN258' in the title).",
      options: {
        accept: ".pdf",
        storeOriginalFilename: true,
      },
      hidden: ({ document }) => document?.type === "video" || document?.type === "faq",
      validation: (Rule) =>
        Rule.custom((file, context) => {
          const doc = context.document as { type?: string }
          if (doc?.type === "application-note" && !file) {
            return "Application notes require a PDF file upload"
          }
          return true
        }),
    }),
    defineField({
      name: "downloadUrl",
      title: "External Download URL (Optional)",
      type: "url",
      group: "file",
      description: "Only use if the file is hosted elsewhere. Leave empty if uploading directly to Sanity.",
      hidden: ({ document }) => document?.type === "video" || document?.type === "faq",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      group: "content",
      rows: 2,
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      group: "content",
      options: {
        list: [
          "Analysis Software",
          "User Manuals",
          "Technical Documentation",
          "General Application Notes",
          "VNA Application Notes",
          "TDR Application Notes",
          "Training",
          "Troubleshooting",
        ],
      },
      description: "For application notes, select: 'General Application Notes', 'VNA Application Notes', or 'TDR Application Notes'",
      initialValue: ({ document }) => {
        // Auto-set category based on title for application notes
        if (document?.type === "application-note") {
          const title = (document.title || "").toLowerCase()
          if (title.match(/an1[0-3]/) || title.includes("white paper") || title.includes("via")) {
            return "VNA Application Notes"
          }
          if (title.match(/an2[0-9]/)) {
            return "TDR Application Notes"
          }
          if (title.match(/an15[0-3]/) || title.includes("cold weather") || title.includes("battery") || title.includes("serial port")) {
            return "General Application Notes"
          }
        }
        return ""
      },
    }),
    // Software-specific fields
    defineField({
      name: "version",
      title: "Version",
      type: "string",
      group: "content",
      hidden: ({ document }) => document?.type !== "software",
    }),
    defineField({
      name: "fileSize",
      title: "File Size",
      type: "string",
      group: "content",
      hidden: ({ document }) => document?.type === "video" || document?.type === "faq",
    }),
    // Manual-specific fields
    defineField({
      name: "pages",
      title: "Number of Pages",
      type: "number",
      group: "content",
      hidden: ({ document }) => document?.type !== "manual",
    }),
    // Video-specific fields
    defineField({
      name: "videoId",
      title: "YouTube Video ID",
      type: "string",
      group: "content",
      hidden: ({ document }) => document?.type !== "video",
    }),
    defineField({
      name: "duration",
      title: "Duration",
      type: "string",
      group: "content",
      hidden: ({ document }) => document?.type !== "video",
    }),
    // FAQ-specific fields
    defineField({
      name: "content",
      title: "FAQ Answer / Content",
      type: "array",
      group: "content",
      of: [{ type: "block" }],
      hidden: ({ document }) => document?.type !== "faq",
    }),
    defineField({
      name: "difficulty",
      title: "Difficulty",
      type: "string",
      group: "content",
      options: { list: ["Beginner", "Intermediate", "Advanced"] },
      hidden: ({ document }) => document?.type !== "faq",
    }),
    // Common fields
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      group: "content",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      description: "Add tags to help users find this resource (e.g., 'TDR', 'Cable Testing', 'Troubleshooting')",
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      group: "content",
      initialValue: false,
      description: "Featured resources appear first in listings",
    }),
    defineField({
      name: "relatedProducts",
      title: "Related Products",
      type: "array",
      group: "content",
      of: [{ type: "reference", to: [{ type: "product" }] }],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "type",
      category: "category",
      media: "file",
    },
    prepare({ title, subtitle, category, media }) {
      const typeIcons: Record<string, string> = {
        software: "💾",
        manual: "📄",
        video: "🎬",
        faq: "❓",
        "application-note": "📝",
      }
      return {
        title,
        subtitle: `${typeIcons[subtitle] || ""} ${subtitle}${category ? ` • ${category}` : ""}`,
        media: media?.asset || undefined,
      }
    },
  },
  orderings: [
    {
      title: "Application Notes (by AN number)",
      name: "applicationNotesByNumber",
      by: [
        { field: "type", direction: "asc" },
        { field: "title", direction: "asc" },
      ],
    },
    {
      title: "By Category",
      name: "byCategory",
      by: [{ field: "category", direction: "asc" }],
    },
  ],
})
