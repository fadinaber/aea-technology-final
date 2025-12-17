// Site Settings Schema for Sanity CMS
// Migrated from /data/site-config.ts

import { defineField, defineType } from "sanity"

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  groups: [
    { name: "general", title: "General" },
    { name: "contact", title: "Contact" },
    { name: "navigation", title: "Navigation" },
    { name: "footer", title: "Footer" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    // General
    defineField({
      name: "siteName",
      title: "Site Name",
      type: "string",
      group: "general",
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      group: "general",
    }),
    defineField({
      name: "description",
      title: "Site Description",
      type: "text",
      group: "general",
      rows: 2,
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      group: "general",
    }),

    // Contact
    defineField({
      name: "contact",
      title: "Contact Information",
      type: "object",
      group: "contact",
      fields: [
        {
          name: "phoneLocal",
          title: "Local Phone",
          type: "string",
        },
        {
          name: "phoneTollFree",
          title: "Toll-Free Phone",
          type: "string",
        },
        {
          name: "emailSales",
          title: "Sales Email",
          type: "string",
        },
        {
          name: "emailSupport",
          title: "Support Email",
          type: "string",
        },
        {
          name: "address",
          title: "Address",
          type: "text",
          rows: 3,
        },
        {
          name: "hours",
          title: "Business Hours",
          type: "string",
        },
      ],
    }),

    // Social
    defineField({
      name: "social",
      title: "Social Media Links",
      type: "array",
      group: "general",
      of: [
        {
          type: "object",
          fields: [
            { name: "platform", type: "string", title: "Platform" },
            { name: "url", type: "url", title: "URL" },
          ],
        },
      ],
    }),

    // Footer
    defineField({
      name: "footerSections",
      title: "Footer Sections",
      type: "array",
      group: "footer",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string", title: "Section Title" },
            {
              name: "links",
              type: "array",
              title: "Links",
              of: [
                {
                  type: "object",
                  fields: [
                    { name: "label", type: "string", title: "Label" },
                    { name: "href", type: "string", title: "URL" },
                    { name: "external", type: "boolean", title: "External Link" },
                  ],
                },
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: "copyright",
      title: "Copyright Text",
      type: "string",
      group: "footer",
    }),

    // SEO
    defineField({
      name: "seoDefaults",
      title: "SEO Defaults",
      type: "object",
      group: "seo",
      fields: [
        { name: "defaultTitle", type: "string", title: "Default Title" },
        { name: "titleTemplate", type: "string", title: "Title Template" },
        { name: "defaultDescription", type: "text", title: "Default Description" },
        { name: "keywords", type: "array", title: "Keywords", of: [{ type: "string" }] },
        { name: "ogImage", type: "image", title: "Default OG Image" },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Site Settings",
      }
    },
  },
})
