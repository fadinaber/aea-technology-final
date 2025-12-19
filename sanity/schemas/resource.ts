// Resource Schema for Sanity CMS
// Migrated from /data/resources-content.ts

import { defineField, defineType } from "sanity"

export default defineType({
  name: "resource",
  title: "Resource",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          "Analysis Software",
          "User Manuals",
          "Technical Documentation",
          "Application Notes",
          "Training",
          "Troubleshooting",
        ],
      },
    }),
    defineField({
      name: "type",
      title: "Resource Type",
      type: "string",
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
    }),
    // Software-specific fields
    defineField({
      name: "version",
      title: "Version",
      type: "string",
      hidden: ({ document }) => document?.type !== "software",
    }),
    defineField({
      name: "downloadUrl",
      title: "Download URL (External Link)",
      type: "url",
      description: "Use this for external download links. Leave empty if uploading a file directly.",
      hidden: ({ document }) => document?.type === "video" || document?.type === "faq",
    }),
    defineField({
      name: "file",
      title: "Upload File (PDF, ZIP, etc.)",
      type: "file",
      description: "Upload files directly to Sanity. The file URL will be auto-generated. Click the uploaded file to replace it.",
      options: {
        accept: ".pdf,.zip,.exe,.dmg,.doc,.docx,.xls,.xlsx",
        storeOriginalFilename: true,
      },
      hidden: ({ document }) => document?.type === "video" || document?.type === "faq",
    }),
    defineField({
      name: "fileSize",
      title: "File Size",
      type: "string",
      hidden: ({ document }) => document?.type === "video" || document?.type === "faq",
    }),
    // Manual-specific fields
    defineField({
      name: "pages",
      title: "Number of Pages",
      type: "number",
      hidden: ({ document }) => document?.type !== "manual",
    }),
    // Video-specific fields
    defineField({
      name: "videoId",
      title: "YouTube Video ID",
      type: "string",
      hidden: ({ document }) => document?.type !== "video",
    }),
    defineField({
      name: "duration",
      title: "Duration",
      type: "string",
      hidden: ({ document }) => document?.type !== "video",
    }),
    // FAQ-specific fields
    defineField({
      name: "content",
      title: "FAQ Answer / Content",
      type: "array",
      of: [{ type: "block" }],
      hidden: ({ document }) => document?.type !== "faq",
    }),
    defineField({
      name: "difficulty",
      title: "Difficulty",
      type: "string",
      options: { list: ["Beginner", "Intermediate", "Advanced"] },
      hidden: ({ document }) => document?.type !== "faq",
    }),
    // Common fields
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "relatedProducts",
      title: "Related Products",
      type: "array",
      of: [{ type: "reference", to: [{ type: "product" }] }],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "type",
    },
    prepare({ title, subtitle }) {
      const typeIcons: Record<string, string> = {
        software: "💾",
        manual: "📄",
        video: "🎬",
        faq: "❓",
        "application-note": "📝",
      }
      return {
        title,
        subtitle: `${typeIcons[subtitle] || ""} ${subtitle}`,
      }
    },
  },
})
