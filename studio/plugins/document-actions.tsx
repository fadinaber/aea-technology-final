import { definePlugin } from 'sanity'

/**
 * Custom document actions plugin
 * Adds a "Replace PDF" action to the document actions menu (top right)
 * 
 * Note: Sanity file inputs already have built-in replace functionality.
 * This plugin makes it more accessible from the document actions menu.
 */
export const documentActionsPlugin = definePlugin({
  name: 'replace-pdf-action',
  document: {
    actions: (prev, { schemaType }) => {
      // Only add for product and resource schemas
      if (schemaType !== 'product' && schemaType !== 'resource') {
        return prev
      }

      // Add a custom action that focuses the file field
      const replacePdfAction = {
        label: 'Replace PDF',
        onHandle: () => {
          // Use setTimeout to ensure DOM is ready
          setTimeout(() => {
            // Try multiple selectors to find the file input
            const selectors = [
              'input[type="file"]',
              '[data-testid*="file-input"]',
              'button[aria-label*="Replace"]',
            ]
            
            for (const selector of selectors) {
              const element = document.querySelector(selector) as HTMLElement
              if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' })
                element.focus()
                // Try to click if it's a button
                if (element.tagName === 'BUTTON') {
                  element.click()
                }
                return
              }
            }
          }, 200)
        },
      }

      return [...prev, replacePdfAction]
    },
  },
})

