'use client'

import * as React from 'react'

// Resizable components - react-resizable-panels API may have changed
// If needed, check react-resizable-panels docs for correct import syntax
export function ResizablePanelGroup({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props}>{children}</div>
}

export function ResizablePanel({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props}>{children}</div>
}

export function ResizableHandle({ ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props} />
}
