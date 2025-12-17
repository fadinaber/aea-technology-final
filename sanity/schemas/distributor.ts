// Distributor Schema for Sanity CMS
// Migrated from /data/distributors.ts

import { defineField, defineType } from "sanity"

export default defineType({
  name: "distributor",
  title: "Distributor",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Company Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category / Type",
      type: "string",
      description: "e.g., 'Aviation Products - GSA and Commercial', 'Commercial All Products'",
    }),
    defineField({
      name: "region",
      title: "Region",
      type: "string",
      options: {
        list: [
          { title: "United States", value: "us" },
          { title: "International", value: "international" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "country",
      title: "Country",
      type: "string",
      description: "For international distributors, specify the country",
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
    }),
    defineField({
      name: "phoneTollFree",
      title: "Phone (Toll Free)",
      type: "string",
    }),
    defineField({
      name: "fax",
      title: "Fax",
      type: "string",
    }),
    defineField({
      name: "faxTollFree",
      title: "Fax (Toll Free)",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "website",
      title: "Website",
      type: "url",
    }),
    defineField({
      name: "specialties",
      title: "Specialties",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
    {
      title: "Name",
      name: "nameAsc",
      by: [{ field: "name", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "country",
      region: "region",
    },
    prepare({ title, subtitle, region }) {
      return {
        title,
        subtitle: subtitle || (region === "us" ? "United States" : "International"),
      }
    },
  },
})
