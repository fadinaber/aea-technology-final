// Distributor Schema for Sanity CMS
// Migrated from /data/distributors.ts

import { defineField, defineType } from "sanity"

export default defineType({
  name: "distributor",
  title: "Distributor",
  type: "document",
  groups: [
    { name: "company", title: "🏢 Company Info", default: true },
    { name: "contact", title: "📞 Contact Details" },
    { name: "settings", title: "⚙️ Settings" },
  ],
  fields: [
    defineField({
      name: "name",
      title: "Company Name",
      type: "string",
      group: "company",
      validation: (Rule) => Rule.required(),
      description: "The distributor or representative company name",
    }),
    defineField({
      name: "category",
      title: "Specialty / Product Focus",
      type: "string",
      group: "company",
      options: {
        list: [
          { title: "All Products - Commercial", value: "Commercial All Products" },
          { title: "Aviation Products - GSA & Commercial", value: "Aviation Products - GSA and Commercial" },
          { title: "Aviation Products - Commercial Only", value: "Aviation Products - Commercial" },
          { title: "CATV/Telecom Products", value: "CATV/Telecom Products" },
          { title: "Broadcast Products", value: "Broadcast Products" },
          { title: "MRI/Medical Products", value: "MRI Products" },
        ],
      },
      description: "What products does this distributor specialize in?",
    }),
    defineField({
      name: "region",
      title: "Region",
      type: "string",
      group: "company",
      options: {
        list: [
          { title: "🇺🇸 United States", value: "us" },
          { title: "🌍 International", value: "international" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
      description: "Is this a US or international distributor?",
    }),
    defineField({
      name: "country",
      title: "Country",
      type: "string",
      group: "company",
      hidden: ({ document }) => document?.region !== "international",
      description: "For international distributors only",
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "text",
      group: "contact",
      rows: 3,
      description: "Full mailing address",
    }),
    defineField({
      name: "phone",
      title: "Phone Number",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "phoneTollFree",
      title: "Toll-Free Phone",
      type: "string",
      group: "contact",
      description: "Optional toll-free number",
    }),
    defineField({
      name: "fax",
      title: "Fax Number",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "faxTollFree",
      title: "Toll-Free Fax",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "email",
      title: "Email Address",
      type: "string",
      group: "contact",
      validation: (Rule) => Rule.required().email(),
      description: "Primary contact email",
    }),
    defineField({
      name: "website",
      title: "Website",
      type: "url",
      group: "contact",
      description: "Company website URL",
    }),
    defineField({
      name: "specialties",
      title: "Tags / Keywords",
      type: "array",
      group: "settings",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      description: "Optional tags for searching (e.g., 'avionics', 'catv')",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      group: "settings",
      initialValue: 0,
      description: "Lower numbers appear first (0 = top of list)",
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
