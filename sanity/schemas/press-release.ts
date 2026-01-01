// Press Release Schema for Sanity CMS
// Migrated from /data/press.ts

import { defineField, defineType } from "sanity"

export default defineType({
  name: "pressRelease",
  title: "Press Release",
  type: "document",
  groups: [
    { name: "content", title: "📰 Content", default: true },
    { name: "settings", title: "⚙️ Settings" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Headline",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required(),
      description: "The main headline of the press release",
    }),
    defineField({
      name: "slug",
      title: "URL Slug",
      type: "slug",
      group: "settings",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
      description: "Auto-generated from title. Click 'Generate' to create.",
    }),
    defineField({
      name: "date",
      title: "Publication Date",
      type: "date",
      group: "content",
      validation: (Rule) => Rule.required(),
      description: "When was this press release published?",
    }),
    defineField({
      name: "displayDate",
      title: "Display Date Override",
      type: "string",
      group: "settings",
      description: 'Optional: Override how the date appears (e.g., "APRIL 2010")',
    }),
    defineField({
      name: "description",
      title: "Summary",
      type: "text",
      group: "content",
      rows: 3,
      description: "A brief summary that appears in the press listing",
    }),
    defineField({
      name: "content",
      title: "Full Article",
      type: "array",
      group: "content",
      of: [{ type: "block" }],
      description: "The complete press release content",
    }),
    defineField({
      name: "image",
      title: "Featured Image",
      type: "image",
      group: "content",
      options: { hotspot: true },
      description: "An optional image for this press release",
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      group: "settings",
      initialValue: false,
      description: "Featured press releases appear first in the list",
    }),
    defineField({
      name: "externalUrl",
      title: "External Link",
      type: "url",
      group: "settings",
      description: "Link to external press coverage (optional)",
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
