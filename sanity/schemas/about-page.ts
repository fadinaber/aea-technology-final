// About Page Schema for Sanity CMS (Singleton)
// Contains all content for the About page

import { defineField, defineType } from "sanity"

export default defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  groups: [
    { name: "leadership", title: "Leadership" },
    { name: "story", title: "Company Story" },
    { name: "values", title: "Core Values" },
    { name: "industries", title: "Industries" },
    { name: "certifications", title: "Certifications" },
    { name: "cta", title: "Call to Action" },
  ],
  fields: [
    // Leadership Section
    defineField({
      name: "leadership",
      title: "Leadership Profile",
      type: "object",
      group: "leadership",
      fields: [
        { name: "name", type: "string", title: "Name" },
        { name: "title", type: "string", title: "Job Title" },
        { name: "subtitle", type: "string", title: "Subtitle" },
        { name: "image", type: "image", title: "Photo", options: { hotspot: true } },
        { name: "quote", type: "text", title: "Quote", rows: 2 },
        { name: "bio", type: "array", title: "Biography", of: [{ type: "text" }] },
        { name: "tagline", type: "string", title: "Tagline" },
      ],
    }),

    // Company Story Section
    defineField({
      name: "companyStory",
      title: "Company Story",
      type: "object",
      group: "story",
      fields: [
        {
          name: "mission",
          type: "object",
          title: "Mission",
          fields: [
            { name: "title", type: "string", title: "Title" },
            { name: "content", type: "text", title: "Content", rows: 3 },
          ],
        },
        {
          name: "vision",
          type: "object",
          title: "Vision",
          fields: [
            { name: "title", type: "string", title: "Title" },
            { name: "content", type: "text", title: "Content", rows: 3 },
          ],
        },
        {
          name: "history",
          type: "array",
          title: "History Paragraphs",
          of: [{ type: "text" }],
        },
      ],
    }),

    // Core Values
    defineField({
      name: "coreValues",
      title: "Core Values",
      type: "array",
      group: "values",
      of: [
        {
          type: "object",
          fields: [
            { name: "icon", type: "string", title: "Icon Name", description: "e.g., Flag, Shield, Award, Users" },
            { name: "title", type: "string", title: "Title" },
            { name: "description", type: "text", title: "Description", rows: 2 },
            { name: "highlight", type: "string", title: "Highlight Badge" },
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "highlight",
            },
          },
        },
      ],
    }),

    // Industries Served
    defineField({
      name: "industries",
      title: "Industries Served",
      type: "array",
      group: "industries",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", type: "string", title: "Industry Name" },
            { name: "icon", type: "string", title: "Emoji Icon", description: "e.g., ✈️, 🏥, 📡" },
            { name: "description", type: "string", title: "Short Description" },
            { name: "customers", type: "string", title: "Customer Examples" },
          ],
          preview: {
            select: {
              title: "name",
              subtitle: "customers",
            },
          },
        },
      ],
    }),

    // Certifications
    defineField({
      name: "certifications",
      title: "Certifications",
      type: "object",
      group: "certifications",
      fields: [
        { name: "headline", type: "string", title: "Section Headline" },
        { name: "description", type: "text", title: "Section Description", rows: 2 },
        {
          name: "items",
          type: "array",
          title: "Certification Items",
          of: [
            {
              type: "object",
              fields: [
                { name: "name", type: "string", title: "Certification Name" },
                { name: "image", type: "image", title: "Logo/Badge" },
                { name: "link", type: "url", title: "Link (optional)" },
              ],
              preview: {
                select: {
                  title: "name",
                  media: "image",
                },
              },
            },
          ],
        },
      ],
    }),

    // Call to Action
    defineField({
      name: "cta",
      title: "Call to Action Section",
      type: "object",
      group: "cta",
      fields: [
        { name: "headline", type: "string", title: "Headline" },
        { name: "description", type: "text", title: "Description", rows: 2 },
        {
          name: "primaryButton",
          type: "object",
          title: "Primary Button",
          fields: [
            { name: "text", type: "string", title: "Button Text" },
            { name: "href", type: "string", title: "Link URL" },
          ],
        },
        {
          name: "secondaryButton",
          type: "object",
          title: "Secondary Button",
          fields: [
            { name: "text", type: "string", title: "Button Text" },
            { name: "href", type: "string", title: "Link URL" },
          ],
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "About Page",
        subtitle: "Singleton document",
      }
    },
  },
})

