'use client'

import * as React from 'react'

// AspectRatio component - @radix-ui/react-aspect-ratio not installed
// If needed, install: npm install @radix-ui/react-aspect-ratio
function AspectRatio({
  ratio,
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { ratio?: number }) {
  return (
    <div
      data-slot="aspect-ratio"
      className={className}
      style={{ aspectRatio: ratio ? `${ratio}` : undefined }}
      {...props}
    >
      {children}
    </div>
  )
}

export { AspectRatio }
