// Product Schema for Sanity CMS
// Migrated from /data/all-products.ts

import { defineField, defineType } from "sanity"

export default defineType({
  name: "product",
  title: "Product",
  type: "document",
  groups: [
    { name: "basic", title: "📝 Basic Info", default: true },
    { name: "files", title: "📁 Files & Downloads" },
    { name: "media", title: "🖼️ Images" },
    { name: "specs", title: "📊 Specifications" },
    { name: "models", title: "📦 Models & Accessories" },
    { name: "content", title: "✏️ Content" },
    { name: "seo", title: "🔍 SEO" },
  ],
  fields: [
    // Basic Info
    defineField({
      name: "slug",
      title: "URL Slug",
      type: "slug",
      group: "basic",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required(),
      description: "This creates the product page URL. Click 'Generate' to create from product name.",
    }),
    defineField({
      name: "name",
      title: "Product Name",
      type: "string",
      group: "basic",
      validation: (Rule) => Rule.required(),
      description: "The full product name as it appears on the website",
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      group: "basic",
    }),
    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "text",
      group: "basic",
      rows: 2,
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      group: "basic",
      options: {
        list: [
          { title: "TDR", value: "tdr" },
          { title: "VNA/SWR", value: "vna-swr" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "badges",
      title: "Badges",
      type: "array",
      group: "basic",
      of: [
        {
          type: "object",
          fields: [
            { name: "text", type: "string", title: "Text" },
            {
              name: "variant",
              type: "string",
              title: "Variant",
              options: { list: ["green", "blue"] },
            },
          ],
        },
      ],
    }),

    // ========== FILES & DOWNLOADS ==========
    // Datasheet
    defineField({
      name: "datasheetUrl",
      title: "Datasheet URL (External - Alternative)",
      type: "url",
      group: "files",
      description: "External link to datasheet (e.g., hosted on S3, Google Drive). Only use if not uploading a file below.",
      placeholder: "https://example.com/datasheet.pdf",
    }),
    defineField({
      name: "datasheetFile",
      title: "Datasheet File (Upload PDF - Alternative)",
      type: "file",
      group: "files",
      description: "Upload datasheet PDF directly to Sanity. Use this if the file is NOT already in your /public folder. If the file is in /public/documents/datasheets/, use a Product Resource below instead.",
      options: {
        accept: ".pdf",
        storeOriginalFilename: true,
      },
    }),

    // ========== PRODUCT RESOURCES (Manuals, Guides, etc.) ==========
    defineField({
      name: "resources",
      title: "Product Resources (Manuals, Guides, Videos, etc.)",
      type: "array",
      group: "files",
      description: "Add manuals, guides, training materials, videos, and other resources for this product. These appear in the Resources tab on the product page. IMPORTANT: Use 'Local File Path' to link to files in /public/documents/ - this is the PRIMARY method.",
      of: [
        {
          type: "object",
          name: "productResource",
          title: "Resource",
          fields: [
            {
              name: "type",
              type: "string",
              title: "Resource Type",
              options: {
                list: [
                  { title: "📄 Manual", value: "manual" },
                  { title: "📋 Quick Start Guide", value: "guide" },
                  { title: "🎥 Video", value: "video" },
                  { title: "📊 Datasheet", value: "datasheet" },
                  { title: "📝 Application Note", value: "application-note" },
                  { title: "💾 Firmware", value: "firmware" },
                  { title: "🖥️ Software", value: "software" },
                  { title: "🎓 Training Material", value: "training" },
                  { title: "❓ FAQ", value: "faq" },
                ],
              },
              validation: (Rule) => Rule.required(),
            },
            { 
              name: "title", 
              type: "string", 
              title: "Title",
              validation: (Rule) => Rule.required(),
            },
            { 
              name: "description", 
              type: "text", 
              title: "Description",
              rows: 2,
            },
            // File upload option
            {
              name: "file",
              type: "file",
              title: "Upload File (Alternative - if file not in /public folder)",
              description: "Upload the resource file directly to Sanity (PDF, PPT, ZIP, etc.). Use this ONLY if the file is NOT already in your /public folder. If you use 'Local File Path' above, you don't need to upload here.",
              options: {
                accept: ".pdf,.ppt,.pptx,.ppsx,.doc,.docx,.zip,.exe",
                storeOriginalFilename: true,
              },
              hidden: ({ parent }) => parent?.type === "video",
            },
            // External URL option (for links or videos)
            { 
              name: "url", 
              type: "url", 
              title: "External URL (For videos or external links)",
              description: "For YouTube videos or external links. For videos, paste the full YouTube URL. For other resources, use 'Local File Path' or 'Upload File' instead.",
              placeholder: "https://www.youtube.com/watch?v=... or https://example.com/file.pdf",
            },
            // Local file path (for existing files in /public/documents)
            {
              name: "localPath",
              type: "string",
              title: "Local File Path (PRIMARY - Use this for existing files)",
              description: "Path to file in public folder (e.g., /documents/manuals/6021/filename.pdf). This is the PRIMARY way to link to files that are already in your /public folder. If you use this, you don't need to upload a file above.",
              placeholder: "/documents/manuals/6021/filename.pdf",
              hidden: ({ parent }) => parent?.type === "video",
            },
            // Video-specific fields
            { 
              name: "thumbnailUrl", 
              type: "string", 
              title: "Video Thumbnail URL",
              hidden: ({ parent }) => parent?.type !== "video",
            },
            { 
              name: "duration", 
              type: "string", 
              title: "Duration (e.g., 5:30)",
              hidden: ({ parent }) => parent?.type !== "video",
            },
            // File metadata
            { 
              name: "fileSize", 
              type: "string", 
              title: "File Size (e.g., 4.2 MB)",
              hidden: ({ parent }) => parent?.type === "video",
            },
          ],
          preview: {
            select: {
              title: "title",
              type: "type",
              file: "file",
              localPath: "localPath",
              url: "url",
              fileSize: "fileSize",
            },
            prepare({ title, type, file, localPath, url, fileSize }) {
              const typeEmoji: Record<string, string> = {
                manual: "📄",
                guide: "📋",
                video: "🎥",
                datasheet: "📊",
                "application-note": "📝",
                firmware: "💾",
                software: "🖥️",
                training: "🎓",
                faq: "❓",
              }
              
              // Show file information
              let fileInfo = ""
              if (localPath) {
                fileInfo = `📁 ${localPath.split("/").pop()}`
              } else if (url) {
                if (url.includes("youtube.com") || url.includes("youtu.be")) {
                  fileInfo = "🎥 YouTube"
                } else {
                  fileInfo = "🔗 External"
                }
              } else if (file?.asset) {
                fileInfo = "📎 Uploaded"
              }
              
              if (fileSize) {
                fileInfo += fileInfo ? ` • ${fileSize}` : fileSize
              }
              
              return {
                title: title || "Untitled Resource",
                subtitle: `${typeEmoji[type] || "📁"} ${type}${fileInfo ? ` • ${fileInfo}` : ""}`,
              }
            },
          },
        },
      ],
    }),

    // ========== MEDIA ==========
    // Legacy imageUrl field (for backward compatibility with existing data)
    defineField({
      name: "imageUrl",
      title: "Image URL (Legacy)",
      type: "string",
      group: "media",
      description: "Legacy field - use Model Images below for new entries. This field is kept for backward compatibility.",
      hidden: true, // Hide from UI but keep in schema to prevent warnings
    }),
    
    defineField({
      name: "modelImages",
      title: "Model Images",
      type: "array",
      group: "media",
      of: [
        {
          type: "object",
          fields: [
            { name: "modelIndex", type: "number", title: "Model Index" },
            {
              name: "images",
              type: "array",
              title: "Images",
              of: [{ type: "image", options: { hotspot: true } }],
            },
          ],
        },
      ],
    }),

    // ========== CONTENT ==========
    defineField({
      name: "keyFeatures",
      title: "Key Features",
      type: "array",
      group: "content",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "displayFeatures",
      title: "Display Features (Hero)",
      type: "array",
      group: "content",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "overviewDescription",
      title: "Overview Description",
      type: "text",
      group: "content",
      rows: 4,
    }),
    defineField({
      name: "applications",
      title: "Applications",
      type: "array",
      group: "content",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "capabilityCards",
      title: "Capability Cards",
      type: "array",
      group: "content",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string", title: "Title" },
            { name: "icon", type: "string", title: "Icon Name" },
            { name: "items", type: "array", title: "Items", of: [{ type: "string" }] },
          ],
        },
      ],
    }),

    // ========== SPECIFICATIONS ==========
    defineField({
      name: "specifications",
      title: "Specifications",
      type: "object",
      group: "specs",
      fields: [
        {
          name: "performance",
          title: "Performance",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "parameter", type: "string", title: "Parameter" },
                { name: "value", type: "string", title: "Value" },
              ],
            },
          ],
        },
        {
          name: "advanced",
          title: "Advanced",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "parameter", type: "string", title: "Parameter" },
                { name: "value", type: "string", title: "Value" },
              ],
            },
          ],
        },
        {
          name: "hardware",
          title: "Hardware",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "parameter", type: "string", title: "Parameter" },
                { name: "value", type: "string", title: "Value" },
              ],
            },
          ],
        },
        {
          name: "physical",
          title: "Physical",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "parameter", type: "string", title: "Parameter" },
                { name: "value", type: "string", title: "Value" },
              ],
            },
          ],
        },
      ],
    }),

    // ========== MODELS & ACCESSORIES ==========
    defineField({
      name: "models",
      title: "Models",
      type: "array",
      group: "models",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", type: "string", title: "Model Name" },
            { name: "partNumber", type: "string", title: "Part Number" },
            { name: "type", type: "string", title: "Type" },
            { name: "description", type: "text", title: "Description" },
            { name: "includes", type: "array", title: "Includes", of: [{ type: "string" }] },
            { name: "popular", type: "boolean", title: "Popular" },
            { name: "includedImage", type: "image", title: "Image" },
          ],
        },
      ],
    }),
    defineField({
      name: "accessories",
      title: "Accessories",
      type: "array",
      group: "models",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", type: "string", title: "Name" },
            { name: "partNumber", type: "string", title: "Part Number" },
            { name: "description", type: "string", title: "Description" },
            { name: "image", type: "image", title: "Image" },
            {
              name: "iconType",
              type: "string",
              title: "Icon Type",
              options: { list: ["case", "cable", "power", "certificate", "battery"] },
            },
          ],
        },
      ],
    }),

    // Software Info
    defineField({
      name: "softwareInfo",
      title: "Software Information",
      type: "object",
      group: "content",
      fields: [
        { name: "name", type: "string", title: "Software Name" },
        { name: "description", type: "text", title: "Description" },
        { name: "screenshotUrl", type: "string", title: "Screenshot URL" },
        { name: "features", type: "array", title: "Features", of: [{ type: "string" }] },
      ],
    }),

    // Certifications
    defineField({
      name: "certifications",
      title: "Certifications",
      type: "array",
      group: "specs",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", type: "string", title: "Name" },
            { name: "description", type: "string", title: "Description" },
          ],
        },
      ],
    }),

    // ========== SEO ==========
    defineField({
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
      group: "seo",
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      group: "seo",
      rows: 2,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "category",
      media: "modelImages.0.images.0",
    },
  },
})
