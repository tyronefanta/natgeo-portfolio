```typescript
'use client'

import './globals.css'
import { useThemeStore } from '@/data/themeStore'
import { useEffect, useState } from 'react'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { currentTheme } = useThemeStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const theme = useThemeStore.getState().currentTheme
    document.documentElement.style.setProperty('--color-primary', theme.primary)
    document.documentElement.style.setProperty('--color-secondary', theme.secondary)
    document.documentElement.style.setProperty('--color-accent', theme.accent)
    document.documentElement.style.setProperty('--color-background', theme.background)
    document.documentElement.style.setProperty('--color-surface', theme.surface)
    document.documentElement.style.setProperty('--color-text', theme.text)
    document.documentElement.style.setProperty('--color-text-secondary', theme.textSecondary)
    document.documentElement.style.setProperty('--color-border', theme.border)
    document.documentElement.style.setProperty('--color-success', theme.success)
    document.documentElement.style.setProperty('--color-warning', theme.warning)
    document.documentElement.style.setProperty('--color-error', theme.error)
  }, [currentTheme])

  if (!mounted) return null

  return (
    <html lang="en">
      <head>
        <title>Photography Portfolio</title>
        <meta name="description" content="National Geographic quality photography portfolio" />
      </head>
      <body style={{ 
        backgroundColor: currentTheme.background,
        color: currentTheme.text 
      }}>
        {children}
      </body>
    </html>
  )
}
```
