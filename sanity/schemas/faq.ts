// FAQ Schema for Sanity CMS
// Standalone FAQ schema for better organization

import { defineField, defineType } from "sanity"

export default defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  groups: [
    { name: "content", title: "❓ Question & Answer", default: true },
    { name: "settings", title: "⚙️ Settings" },
  ],
  fields: [
    defineField({
      name: "question",
      title: "Question",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required(),
      description: "The question that customers frequently ask",
    }),
    defineField({
      name: "answer",
      title: "Answer",
      type: "text",
      group: "content",
      rows: 4,
      validation: (Rule) => Rule.required(),
      description: "The answer to the question. Keep it clear and concise.",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      group: "settings",
      options: {
        list: [
          { title: "General Questions", value: "General" },
          { title: "TDR Products", value: "TDR Products" },
          { title: "VNA/SWR Products", value: "VNA/SWR Products" },
          { title: "Technical Support", value: "Technical Support" },
          { title: "Orders & Shipping", value: "Orders & Shipping" },
          { title: "Calibration", value: "Calibration" },
        ],
      },
      description: "Categorize this FAQ for filtering on the website",
    }),
    defineField({
      name: "relatedProducts",
      title: "Related Products",
      type: "array",
      group: "settings",
      of: [{ type: "reference", to: [{ type: "product" }] }],
      description: "Optional: Link to products this FAQ relates to",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      group: "settings",
      initialValue: 0,
      description: "Lower numbers appear first (0 = highest priority)",
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      group: "settings",
      initialValue: false,
      description: "Featured FAQs appear more prominently",
    }),
  ],
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
    {
      title: "Newest First",
      name: "createdDesc",
      by: [{ field: "_createdAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "question",
      subtitle: "category",
      featured: "featured",
    },
    prepare({ title, subtitle, featured }) {
      return {
        title: featured ? `⭐ ${title}` : title,
        subtitle: subtitle || "Uncategorized",
      }
    },
  },
})
