import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'

// Import schemas from the parent directory
import { schemaTypes } from '../sanity/schemas'
import { deskStructure } from './deskStructure'

export default defineConfig({
  name: 'aea-technology',
  title: 'AEA Technology CMS',
  
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'jvtqk7fd',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  
  // basePath is only needed when embedded in Next.js
  // For standalone deployment, it's not required
  // basePath: '/studio',
  
  plugins: [
    deskTool({
      structure: deskStructure,
    }),
    visionTool(),
  ],
  
  schema: {
    types: schemaTypes,
  },
  
  // Document actions configuration
  // In Sanity Studio v4, delete should be available by default
  // The delete button is typically found in the document menu (three dots) in the top-right
  // or accessible via keyboard shortcut: Ctrl+K (Windows) or Cmd+K (Mac), then type "delete"
  document: {
    // Return all default actions including delete
    // This ensures delete functionality is available for all document types
    actions: (prev) => prev,
  },
})


