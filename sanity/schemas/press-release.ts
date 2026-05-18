// Press Release Schema for Sanity CMS
// Migrated from /data/press.ts

import { defineField, defineType } from "sanity"

export default defineType({
  name: "pressRelease",
  title: "Press Release",
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
      title: "URL Slug",
      type: "slug",
      description: "Auto-generated from the title. Click 'Generate' if empty.",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "date",
      title: "Publication Date",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "displayDate",
      title: "Display Date",
      type: "string",
      description: 'Format: "MONTH YEAR" (e.g., "APRIL 2010")',
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "content",
      title: "Full Content",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "featured",
      title: "Featured (show at top)",
      type: "boolean",
      initialValue: false,
      description: "Turn on to pin this press release to the top of the list.",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "externalUrl",
      title: "External URL",
      type: "url",
      description: "Link to external press coverage",
    }),
  ],
  orderings: [
    {
      title: "Publication Date, New",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "displayDate",
      media: "image",
    },
  },
})
