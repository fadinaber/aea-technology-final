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
  // Delete action should be available by default in Sanity Studio v4
  // It appears in the document menu (three dots) in the top-right corner
  // Keyboard shortcut: Ctrl+K (Windows) or Cmd+K (Mac), then type "delete"
  // If delete is not visible, check user permissions in Sanity Management Console:
  // https://www.sanity.io/manage/project/jvtqk7fd/members
  document: {
    actions: (prev) => {
      // Return all default actions including delete
      // Delete requires appropriate permissions set in Sanity Management Console
      return prev
    },
  },
})


