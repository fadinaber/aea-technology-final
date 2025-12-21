// Product Schema for Sanity CMS
// Migrated from /data/all-products.ts

import { defineField, defineType } from "sanity"

export default defineType({
  name: "product",
  title: "Product",
  type: "document",
  groups: [
    { name: "basic", title: "Basic Info" },
    { name: "files", title: "Files & Downloads" },
    { name: "media", title: "Media" },
    { name: "specs", title: "Specifications" },
    { name: "models", title: "Models & Accessories" },
    { name: "content", title: "Content" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    // Basic Info
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "basic",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "name",
      title: "Product Name",
      type: "string",
      group: "basic",
      validation: (Rule) => Rule.required(),
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
      title: "Datasheet URL (External)",
      type: "url",
      group: "files",
      description: "External link to datasheet. Leave empty if uploading a file.",
    }),
    defineField({
      name: "datasheetFile",
      title: "Datasheet File (Upload PDF)",
      type: "file",
      group: "files",
      description: "Upload datasheet PDF directly. This will be used if no external URL is provided.",
      options: {
        accept: ".pdf",
        storeOriginalFilename: true,
      },
    }),

    // ========== PRODUCT RESOURCES (Manuals, Guides, etc.) ==========
    defineField({
      name: "resources",
      title: "Product Resources (Manuals, Guides, Videos)",
      type: "array",
      group: "files",
      description: "Add manuals, guides, training materials, and videos for this product. These appear in the Resources tab on the product page.",
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
              title: "Upload File (PDF, PPT, etc.)",
              description: "Upload the resource file directly. Supports PDF, PowerPoint, and other document formats.",
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
              title: "External URL",
              description: "For external links or YouTube videos. Leave empty if uploading a file above.",
            },
            // Local file path (for existing files in /public/documents)
            {
              name: "localPath",
              type: "string",
              title: "Local File Path",
              description: "Path to file in public folder (e.g., /documents/manuals/6021/filename.pdf). Use this for existing files.",
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
            },
            prepare({ title, type, file }) {
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
              const hasFile = !!file?.asset
              return {
                title: title || "Untitled Resource",
                subtitle: `${typeEmoji[type] || "📁"} ${type}${hasFile ? " (file uploaded)" : ""}`,
              }
            },
          },
        },
      ],
    }),

    // ========== MEDIA ==========
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
