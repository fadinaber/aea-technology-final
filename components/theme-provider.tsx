'use client'

import * as React from 'react'

// ThemeProvider placeholder - next-themes not installed
// If theme switching is needed, install: npm install next-themes
export function ThemeProvider({ children, ...props }: { children: React.ReactNode }) {
  return <>{children}</>
}
