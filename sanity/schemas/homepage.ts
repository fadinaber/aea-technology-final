// Homepage Schema for Sanity CMS (Page Builder Pattern)
// Migrated from /data/homepage.ts

import { defineField, defineType } from "sanity"

export default defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  groups: [
    { name: "hero", title: "Hero Section" },
    { name: "products", title: "Featured Products" },
    { name: "whyChoose", title: "Why Choose Us" },
    { name: "resources", title: "Resources Teaser" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Page Title (Internal)",
      type: "string",
      initialValue: "Homepage",
    }),

    // Hero Section
    defineField({
      name: "hero",
      title: "Hero Section",
      type: "object",
      group: "hero",
      fields: [
        { name: "enabled", type: "boolean", title: "Enabled", initialValue: true },
        {
          name: "badges",
          type: "array",
          title: "Badges",
          of: [
            {
              type: "object",
              fields: [
                { name: "text", type: "string", title: "Text" },
                { name: "icon", type: "string", title: "Icon" },
                {
                  name: "variant",
                  type: "string",
                  title: "Variant",
                  options: { list: ["default", "primary", "success"] },
                },
              ],
            },
          ],
        },
        {
          name: "headline",
          type: "object",
          title: "Headline",
          fields: [
            { name: "line1", type: "string", title: "Line 1" },
            { name: "line2", type: "string", title: "Line 2" },
            { name: "line3", type: "string", title: "Line 3" },
          ],
        },
        { name: "description", type: "text", title: "Description" },
        {
          name: "valuePropositions",
          type: "array",
          title: "Value Propositions",
          of: [
            {
              type: "object",
              fields: [
                { name: "text", type: "string", title: "Text" },
                { name: "icon", type: "string", title: "Icon" },
              ],
            },
          ],
        },
        {
          name: "cta",
          type: "object",
          title: "Call to Actions",
          fields: [
            {
              name: "primary",
              type: "object",
              title: "Primary CTA",
              fields: [
                { name: "text", type: "string", title: "Text" },
                { name: "href", type: "string", title: "URL" },
              ],
            },
            {
              name: "secondary",
              type: "object",
              title: "Secondary CTA",
              fields: [
                { name: "text", type: "string", title: "Text" },
                { name: "href", type: "string", title: "URL" },
              ],
            },
          ],
        },
        {
          name: "stats",
          type: "array",
          title: "Stats",
          of: [
            {
              type: "object",
              fields: [
                { name: "number", type: "string", title: "Number" },
                { name: "label", type: "string", title: "Label" },
                { name: "sublabel", type: "string", title: "Sublabel" },
              ],
            },
          ],
        },
        {
          name: "featuredProduct",
          type: "reference",
          title: "Featured Product (Reference)",
          to: [{ type: "product" }],
          description: "Optional: Link to a product for dynamic data",
        },
        {
          name: "featuredProductSlug",
          type: "string",
          title: "Featured Product Slug",
          description: "Product slug (alternative to reference)",
        },
        {
          name: "featuredProductData",
          type: "object",
          title: "Featured Product Data (Manual)",
          description: "Manual product data if not using reference",
          fields: [
            { name: "slug", type: "string", title: "Slug" },
            { name: "name", type: "string", title: "Name" },
            { name: "description", type: "text", title: "Description" },
            { name: "badge", type: "string", title: "Badge" },
            { name: "imageUrl", type: "string", title: "Image URL" },
            { name: "image", type: "image", title: "Image (Upload)" },
          ],
        },
      ],
    }),

    // Featured Products Section
    defineField({
      name: "featuredProducts",
      title: "Featured Products Section",
      type: "object",
      group: "products",
      fields: [
        { name: "enabled", type: "boolean", title: "Enabled", initialValue: true },
        { name: "badge", type: "string", title: "Badge Text" },
        { name: "headline", type: "string", title: "Headline" },
        { name: "description", type: "text", title: "Description" },
        {
          name: "products",
          type: "array",
          title: "Products (References)",
          of: [{ type: "reference", to: [{ type: "product" }] }],
          validation: (Rule) => Rule.max(4),
          description: "Optional: Link to products for dynamic data",
        },
        {
          name: "productsList",
          type: "array",
          title: "Products List (Manual)",
          description: "Manual product data if not using references",
          of: [
            {
              type: "object",
              fields: [
                { name: "productId", type: "string", title: "Product ID/Slug" },
                { name: "name", type: "string", title: "Name" },
                { name: "description", type: "text", title: "Description" },
                { name: "imageUrl", type: "string", title: "Image URL" },
                { name: "image", type: "image", title: "Image (Upload)" },
                { name: "category", type: "string", title: "Category" },
                { name: "features", type: "array", title: "Features", of: [{ type: "string" }] },
              ],
            },
          ],
          validation: (Rule) => Rule.max(4),
        },
        {
          name: "cta",
          type: "object",
          title: "CTA",
          fields: [
            { name: "text", type: "string", title: "Text" },
            { name: "href", type: "string", title: "URL" },
          ],
        },
      ],
    }),

    // Why Choose Us Section
    defineField({
      name: "whyChooseUs",
      title: "Why Choose Us Section",
      type: "object",
      group: "whyChoose",
      fields: [
        { name: "enabled", type: "boolean", title: "Enabled", initialValue: true },
        { name: "badge", type: "string", title: "Badge Text" },
        {
          name: "headline",
          type: "object",
          title: "Headline",
          fields: [
            { name: "line1", type: "string", title: "Line 1" },
            { name: "line2", type: "string", title: "Line 2" },
          ],
        },
        { name: "description", type: "text", title: "Description" },
        {
          name: "mainFeature",
          type: "object",
          title: "Main Feature",
          fields: [
            { name: "title", type: "string", title: "Title" },
            { name: "badge", type: "string", title: "Badge" },
            { name: "description", type: "text", title: "Description" },
            { name: "image", type: "image", title: "Image" },
          ],
        },
        {
          name: "featureCards",
          type: "array",
          title: "Feature Cards",
          of: [
            {
              type: "object",
              fields: [
                { name: "title", type: "string", title: "Title" },
                { name: "description", type: "text", title: "Description" },
                { name: "image", type: "image", title: "Image" },
                { name: "icon", type: "string", title: "Icon" },
                { name: "stat", type: "string", title: "Stat" },
              ],
            },
          ],
        },
      ],
    }),

    // Resources Teaser Section
    defineField({
      name: "resourcesTeaser",
      title: "Resources Teaser Section",
      type: "object",
      group: "resources",
      fields: [
        { name: "enabled", type: "boolean", title: "Enabled", initialValue: true },
        { name: "headline", type: "string", title: "Headline" },
        { name: "description", type: "text", title: "Description" },
        {
          name: "resourceTypes",
          type: "array",
          title: "Resource Types",
          of: [
            {
              type: "object",
              fields: [
                { name: "title", type: "string", title: "Title" },
                { name: "description", type: "string", title: "Description" },
                { name: "icon", type: "string", title: "Icon" },
                { name: "count", type: "string", title: "Count" },
              ],
            },
          ],
        },
        {
          name: "cta",
          type: "object",
          title: "CTA",
          fields: [
            { name: "text", type: "string", title: "Text" },
            { name: "href", type: "string", title: "URL" },
          ],
        },
      ],
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
  ],
  preview: {
    prepare() {
      return {
        title: "Homepage",
      }
    },
  },
})
