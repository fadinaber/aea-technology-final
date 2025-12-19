import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'

// Import schemas from the parent directory
import { schemaTypes } from '../sanity/schemas'
import { documentActionsPlugin } from './plugins/document-actions'

export default defineConfig({
  name: 'aea-technology',
  title: 'AEA Technology CMS',
  
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'jvtqk7fd',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  
  basePath: '/studio',
  
  plugins: [
    deskTool(),
    visionTool(),
    documentActionsPlugin(),
  ],
  
  schema: {
    types: schemaTypes,
  },
})


