// FAQ Schema for Sanity CMS
// Standalone FAQ schema for better organization

import { defineField, defineType } from "sanity"

export default defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  fields: [
    defineField({
      name: "question",
      title: "Question",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "answer",
      title: "Answer",
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: ["General", "TDR Products", "VNA/SWR Products", "Technical Support", "Orders & Shipping", "Calibration"],
      },
    }),
    defineField({
      name: "relatedProducts",
      title: "Related Products",
      type: "array",
      of: [{ type: "reference", to: [{ type: "product" }] }],
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Controls the order FAQs appear in. Lower numbers show first (e.g. 1 appears before 10).",
    }),
    defineField({
      name: "featured",
      title: "Show on Homepage / Featured",
      type: "boolean",
      initialValue: false,
      description: "Turn on to highlight this FAQ at the top of the list.",
    }),
  ],
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "question",
      subtitle: "category",
    },
  },
})
