// Homepage Schema for Sanity CMS (Page Builder Pattern)
// Migrated from /data/homepage.ts

import { defineField, defineType } from "sanity"

export default defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  groups: [
    { name: "hero", title: "🏠 Hero Section", default: true },
    { name: "products", title: "⭐ Featured Products" },
    { name: "whyChoose", title: "✅ Why Choose Us" },
    { name: "resources", title: "📚 Resources Teaser" },
    { name: "seo", title: "🔍 SEO Settings" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Page Title (Internal Only)",
      type: "string",
      initialValue: "Homepage",
      description: "This is just for your reference in the CMS. It doesn't appear on the website.",
      hidden: true,
    }),

    // Hero Section
    defineField({
      name: "hero",
      title: "Hero Section",
      type: "object",
      group: "hero",
      description: "The main banner at the top of the homepage. This is the first thing visitors see.",
      fields: [
        { 
          name: "enabled", 
          type: "boolean", 
          title: "Show Hero Section", 
          initialValue: true,
          description: "Turn this off to hide the entire hero section",
        },
        {
          name: "badges",
          type: "array",
          title: "Trust Badges",
          description: "Small badges that appear above the headline (e.g., 'American Made', 'ISO 9001')",
          of: [
            {
              type: "object",
              fields: [
                { name: "text", type: "string", title: "Badge Text", description: "e.g., 'American Made'" },
                { name: "icon", type: "string", title: "Icon Name", description: "Optional: Flag, Shield, CheckCircle" },
                {
                  name: "variant",
                  type: "string",
                  title: "Style",
                  options: { list: [
                    { title: "Default (gray)", value: "default" },
                    { title: "Primary (blue)", value: "primary" },
                    { title: "Success (green)", value: "success" },
                  ] },
                },
              ],
              preview: {
                select: { title: 'text' }
              }
            },
          ],
        },
        {
          name: "headline",
          type: "object",
          title: "Main Headline",
          description: "The large text that appears in the hero. Split across 3 lines for styling.",
          fields: [
            { name: "line1", type: "string", title: "Line 1", description: "e.g., 'Professional'" },
            { name: "line2", type: "string", title: "Line 2 (Highlighted)", description: "This line appears in gradient color, e.g., 'RF Testing'" },
            { name: "line3", type: "string", title: "Line 3", description: "e.g., 'Equipment'" },
          ],
        },
        { 
          name: "description", 
          type: "text", 
          title: "Description",
          description: "A short paragraph that appears below the headline",
          rows: 2,
        },
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
          title: "Featured Product",
          to: [{ type: "product" }],
          description: "Select a product to feature in the hero. The product's image and details will be shown automatically.",
        },
        {
          name: "featuredProductSlug",
          type: "string",
          title: "Featured Product Page Link",
          description: "The URL slug for the featured product page (e.g., 'e20-20-avionics'). Only needed if not selecting a product above.",
          hidden: ({ parent }) => parent?.featuredProduct,
        },
        {
          name: "featuredProductData",
          type: "object",
          title: "Custom Featured Product (Advanced)",
          description: "Only use this if you want to manually enter product info instead of selecting a product above.",
          options: {
            collapsible: true,
            collapsed: true,
          },
          fields: [
            { name: "slug", type: "string", title: "Page URL Slug", description: "e.g., 'e20-20-avionics'" },
            { name: "name", type: "string", title: "Product Name" },
            { name: "description", type: "text", title: "Short Description", rows: 2 },
            { name: "badge", type: "string", title: "Badge Text", description: "e.g., 'Featured'" },
            { name: "image", type: "image", title: "Product Image", description: "Upload an image of the product" },
          ],
          hidden: ({ parent }) => parent?.featuredProduct,
        },
      ],
    }),

    // Featured Products Section
    defineField({
      name: "featuredProducts",
      title: "Featured Products Section",
      type: "object",
      group: "products",
      description: "A grid of 4 featured products shown below the hero section.",
      fields: [
        { 
          name: "enabled", 
          type: "boolean", 
          title: "Show Featured Products", 
          initialValue: true,
          description: "Turn off to hide this entire section",
        },
        { 
          name: "badge", 
          type: "string", 
          title: "Section Badge",
          description: "Small text above the headline (e.g., 'Featured Products')",
        },
        { 
          name: "headline", 
          type: "string", 
          title: "Section Headline",
          description: "The main title for this section",
        },
        { 
          name: "description", 
          type: "text", 
          title: "Section Description",
          description: "A short description that appears below the headline",
          rows: 2,
        },
        {
          name: "products",
          type: "array",
          title: "Select Products to Feature",
          of: [{ type: "reference", to: [{ type: "product" }] }],
          validation: (Rule) => Rule.max(4).error('Maximum 4 products allowed'),
          description: "Choose up to 4 products to display. Product images and details will be pulled automatically.",
        },
        {
          name: "productsList",
          type: "array",
          title: "Manual Products (Advanced)",
          description: "Only use this if you need to manually enter product info instead of selecting products above.",
          options: {
            sortable: true,
          },
          hidden: ({ parent }) => parent?.products?.length > 0,
          of: [
            {
              type: "object",
              fields: [
                { name: "productId", type: "string", title: "Product Page URL Slug", description: "e.g., 'e20-20-avionics'" },
                { name: "name", type: "string", title: "Product Name" },
                { name: "description", type: "text", title: "Short Description", rows: 2 },
                { name: "image", type: "image", title: "Product Image" },
                { 
                  name: "category", 
                  type: "string", 
                  title: "Category Badge",
                  options: { list: ['TDR', 'VNA/SWR', 'Avionics', 'MRI'] },
                },
                { name: "features", type: "array", title: "Key Features (3 max)", of: [{ type: "string" }], validation: (Rule) => Rule.max(3) },
              ],
              preview: {
                select: { title: 'name', subtitle: 'category' }
              }
            },
          ],
          validation: (Rule) => Rule.max(4),
        },
        {
          name: "cta",
          type: "object",
          title: "Button",
          description: "The 'View All Products' button at the bottom",
          fields: [
            { name: "text", type: "string", title: "Button Text", description: "e.g., 'View All Products'" },
            { name: "href", type: "string", title: "Button Link", description: "e.g., '/products'" },
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
        {
          name: "certifications",
          type: "object",
          title: "Certifications",
          description: "The ISO and ANAB certification badges shown at the bottom of this section",
          fields: [
            {
              name: "sectionTitle",
              type: "string",
              title: "Section Title",
              initialValue: "Industry Certifications",
            },
            {
              name: "sectionDescription",
              type: "string",
              title: "Section Description",
              initialValue: "Recognized by leading industry standards and accreditation bodies",
            },
            {
              name: "items",
              type: "array",
              title: "Certification Items",
              of: [
                {
                  type: "object",
                  preview: { select: { title: "name", subtitle: "displayText" } },
                  fields: [
                    {
                      name: "name",
                      type: "string",
                      title: "Name",
                      description: "e.g. ISO 9001:2015 Certificate",
                      validation: (Rule: any) => Rule.required(),
                    },
                    {
                      name: "displayText",
                      type: "string",
                      title: "Display Text",
                      description: "Short label shown on the card when no logo is uploaded (e.g. ISO 9001)",
                    },
                    {
                      name: "logo",
                      type: "image",
                      title: "Logo / Badge Image",
                      description: "Upload a PNG or JPG logo for this certification",
                      options: { hotspot: true },
                    },
                    {
                      name: "certificateFile",
                      type: "file",
                      title: "Certificate PDF",
                      description: "Upload the PDF — visitors will download this file when they click the badge",
                      options: { accept: ".pdf,application/pdf" },
                    },
                    {
                      name: "externalLink",
                      type: "url",
                      title: "External Link",
                      description: "Link to open in a new tab (e.g. https://anab.ansi.org/). Used when this is NOT a downloadable file.",
                    },
                    {
                      name: "isDownload",
                      type: "boolean",
                      title: "Downloadable Certificate",
                      description: "ON = clicking the badge downloads the PDF above. OFF = clicking opens the external link above.",
                      initialValue: false,
                    },
                  ],
                },
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
      description: "The title that appears in Google search results. Keep it under 60 characters.",
      validation: (Rule) => Rule.max(60).warning('SEO titles should be under 60 characters'),
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      group: "seo",
      rows: 3,
      description: "The description that appears in Google search results. Keep it between 120-160 characters.",
      validation: (Rule) => Rule.max(160).warning('SEO descriptions should be under 160 characters'),
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
