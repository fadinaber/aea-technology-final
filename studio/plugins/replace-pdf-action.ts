import { DocumentActionComponent, DocumentActionsContext } from 'sanity'
import { useCallback } from 'react'

/**
 * Custom document action to replace PDF files
 * This adds a "Replace PDF" option to the document actions menu
 */
export const replacePdfAction: DocumentActionComponent = (props, context) => {
  const { onComplete } = props

  const handleReplacePdf = useCallback(() => {
    // Focus on the file field
    const fileField = document.querySelector('[data-testid="file-input-datasheetFile"], [data-testid="file-input-file"]')
    if (fileField) {
      ;(fileField as HTMLElement).click()
    }
    onComplete()
  }, [onComplete])

  // Only show for products and resources
  if (props.published?.slug?.current && (props.published?.datasheetFile || props.published?.file)) {
    return {
      label: 'Replace PDF',
      onHandle: handleReplacePdf,
      shortcut: 'mod+shift+r',
    }
  }

  return null
}

