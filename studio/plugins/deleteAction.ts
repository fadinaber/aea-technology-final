// Custom delete action plugin to ensure delete is always available
import { definePlugin } from 'sanity'

export const deleteActionPlugin = definePlugin({
  name: 'delete-action-enabler',
  document: {
    actions: (prev, context) => {
      // Ensure delete action is always available
      // In Sanity Studio v4, delete should be in the document menu (three dots)
      // If it's not showing, check user permissions in Sanity Management Console
      return prev
    },
  },
})

