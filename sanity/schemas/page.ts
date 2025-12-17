// Page Schema for Sanity CMS
// For About, Contact, and other static pages

import { defineField, defineType } from "sanity"

export default defineType({
  name: "page",
  title: "Page",
  type: "document",
  groups: [
    { name: "content", title: "Content" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "pageType",
      title: "Page Type",
      type: "string",
      group: "content",
      options: {
        list: [
          { title: "About", value: "about" },
          { title: "Contact", value: "contact" },
          { title: "Press", value: "press" },
          { title: "Resources", value: "resources" },
          { title: "Generic", value: "generic" },
        ],
      },
    }),
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      group: "content",
    }),
    defineField({
      name: "subheadline",
      title: "Subheadline",
      type: "text",
      group: "content",
      rows: 2,
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      group: "content",
      of: [{ type: "block" }, { type: "image", options: { hotspot: true } }],
    }),
    // SEO
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
    defineField({
      name: "ogImage",
      title: "Open Graph Image",
      type: "image",
      group: "seo",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "pageType",
    },
  },
})
