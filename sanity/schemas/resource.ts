// Resource Schema for Sanity CMS
// For managing software downloads, manuals, videos, FAQs, and application notes

import { defineField, defineType } from "sanity"

export default defineType({
  name: "resource",
  title: "Resource",
  type: "document",
  groups: [
    { name: "basic", title: "Basic Info" },
    { name: "file", title: "File & Links" },
    { name: "content", title: "Content & Details" },
    { name: "associations", title: "Product Associations" },
  ],
  fields: [
    // ========== BASIC INFO ==========
    defineField({
      name: "type",
      title: "Resource Type",
      type: "string",
      group: "basic",
      options: {
        list: [
          { title: "💾 Software", value: "software" },
          { title: "📄 Manual", value: "manual" },
          { title: "📋 Quick Start Guide", value: "guide" },
          { title: "🎥 Video", value: "video" },
          { title: "❓ FAQ", value: "faq" },
          { title: "📝 Application Note", value: "application-note" },
          { title: "🎓 Training Material", value: "training" },
        ],
      },
      validation: (Rule) => Rule.required(),
      description: "Select the type of resource",
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
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      group: "basic",
      rows: 2,
    }),

    // ========== FILE & LINKS ==========
    defineField({
      name: "file",
      title: "Upload File",
      type: "file",
      group: "file",
      description: "Upload the resource file directly (PDF, PPT, ZIP, etc.)",
      options: {
        accept: ".pdf,.ppt,.pptx,.ppsx,.doc,.docx,.zip,.exe",
        storeOriginalFilename: true,
      },
      hidden: ({ document }) => document?.type === "video" || document?.type === "faq",
    }),
    defineField({
      name: "localPath",
      title: "Local File Path",
      type: "string",
      group: "file",
      description: "Path to existing file in public folder (e.g., /documents/manuals/6021/filename.pdf)",
      hidden: ({ document }) => document?.type === "video" || document?.type === "faq",
    }),
    defineField({
      name: "downloadUrl",
      title: "External Download URL",
      type: "url",
      group: "file",
      description: "Only use if the file is hosted elsewhere (Google Drive, S3, etc.)",
      hidden: ({ document }) => document?.type === "video" || document?.type === "faq",
    }),

    // ========== CONTENT & DETAILS ==========
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      group: "content",
      options: {
        list: [
          // Software categories
          { title: "Analysis Software", value: "Analysis Software" },
          // Manual categories
          { title: "User Manuals", value: "User Manuals" },
          { title: "Quick Reference", value: "Quick Reference" },
          { title: "Technical Documentation", value: "Technical Documentation" },
          // Training
          { title: "Training", value: "Training" },
          // Application notes categories
          { title: "General Application Notes", value: "General Application Notes" },
          { title: "VNA Application Notes", value: "VNA Application Notes" },
          { title: "TDR Application Notes", value: "TDR Application Notes" },
          // Video categories
          { title: "Product Overviews", value: "Product Overviews" },
          { title: "Educational", value: "Educational" },
          { title: "Operation Tutorials", value: "Operation Tutorials" },
          { title: "Software Tutorials", value: "Software Tutorials" },
          { title: "Testing Procedures", value: "Testing Procedures" },
          // FAQ categories
          { title: "TDR Operation", value: "TDR Operation" },
          { title: "VNA Operation", value: "VNA Operation" },
          { title: "Calibration", value: "Calibration" },
          { title: "Software Support", value: "Software Support" },
          { title: "Warranty & Support", value: "Warranty & Support" },
        ],
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
      title: "File Size (e.g., 4.2 MB)",
      type: "string",
      group: "content",
      hidden: ({ document }) => document?.type === "video" || document?.type === "faq",
    }),

    // Video-specific fields
    defineField({
      name: "videoId",
      title: "YouTube Video ID",
      type: "string",
      group: "content",
      description: "The video ID from YouTube URL (e.g., dQw4w9WgXcQ from https://youtube.com/watch?v=dQw4w9WgXcQ)",
      hidden: ({ document }) => document?.type !== "video",
    }),
    defineField({
      name: "duration",
      title: "Duration (e.g., 5:30)",
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

    // ========== PRODUCT ASSOCIATIONS ==========
    defineField({
      name: "relatedProducts",
      title: "Related Products",
      type: "array",
      group: "associations",
      description: "Select which products this resource applies to",
      of: [{ type: "reference", to: [{ type: "product" }] }],
    }),
    defineField({
      name: "productSlugs",
      title: "Product Slugs (for static data)",
      type: "array",
      group: "associations",
      description: "Product slugs this resource applies to (e.g., e20-20-avionics, e20-20n). Used when products aren't in Sanity yet.",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "E20/20N TDR", value: "e20-20n" },
          { title: "Avionics TDR Kit", value: "e20-20-avionics" },
          { title: "E20/20B Network TDR", value: "e20-20b" },
          { title: "E20/20F CATV Network TDR", value: "e20-20f-catv" },
          { title: "SWR Site Analyzer", value: "swr-site-analyzer" },
          { title: "VIA Bravo Ex2", value: "via-bravo-ex2" },
          { title: "Bravo MRI-3000", value: "via-bravo-mri-3000" },
        ],
      },
    }),
  ],
  preview: {
    select: {
      title: "title",
      type: "type",
      category: "category",
      media: "file",
    },
    prepare({ title, type, category, media }) {
      const typeIcons: Record<string, string> = {
        software: "💾",
        manual: "📄",
        guide: "📋",
        video: "🎥",
        faq: "❓",
        "application-note": "📝",
        training: "🎓",
      }
      return {
        title,
        subtitle: `${typeIcons[type] || "📁"} ${type}${category ? ` • ${category}` : ""}`,
        media: media?.asset || undefined,
      }
    },
  },
  orderings: [
    {
      title: "By Type",
      name: "byType",
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
    {
      title: "Featured First",
      name: "featuredFirst",
      by: [
        { field: "featured", direction: "desc" },
        { field: "title", direction: "asc" },
      ],
    },
  ],
})
