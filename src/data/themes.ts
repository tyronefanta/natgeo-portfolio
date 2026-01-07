```typescript
export interface Theme {
  id: string
  name: string
  primary: string
  secondary: string
  accent: string
  background: string
  surface: string
  text: string
  textSecondary: string
  border: string
  success: string
  warning: string
  error: string
}

export const themes: Record<string, Theme> = {
  natGeo: {
    id: 'natGeo',
    name: 'National Geographic',
    primary: '#1a472a',
    secondary: '#d4af37',
    accent: '#c1272d',
    background: '#0a0e27',
    surface: '#1a1f3a',
    text: '#f5f5f5',
    textSecondary: '#a0a0a0',
    border: '#2a3a5a',
    success: '#2ecc71',
    warning: '#f39c12',
    error: '#e74c3c',
  },
  minimalist: {
    id: 'minimalist',
    name: 'Minimalist',
    primary: '#000000',
    secondary: '#ffffff',
    accent: '#808080',
    background: '#ffffff',
    surface: '#f5f5f5',
    text: '#1a1a1a',
    textSecondary: '#666666',
    border: '#e0e0e0',
    success: '#27ae60',
    warning: '#f39c12',
    error: '#c0392b',
  },
  ocean: {
    id: 'ocean',
    name: 'Ocean Blue',
    primary: '#0066cc',
    secondary: '#00ccff',
    accent: '#ff6600',
    background: '#001a33',
    surface: '#003366',
    text: '#e6f2ff',
    textSecondary: '#99ccff',
    border: '#004d99',
    success: '#00cc66',
    warning: '#ffcc00',
    error: '#ff3333',
  },
  sunset: {
    id: 'sunset',
    name: 'Sunset',
    primary: '#d4610f',
    secondary: '#f5a623',
    accent: '#e8571a',
    background: '#1a0f05',
    surface: '#3d2817',
    text: '#fef5f0',
    textSecondary: '#d4a574',
    border: '#5c3d28',
    success: '#6ab04c',
    warning: '#f9ca24',
    error: '#ee5a6f',
  },
  forest: {
    id: 'forest',
    name: 'Forest',
    primary: '#1d3a1d',
    secondary: '#4a9d6f',
    accent: '#c9d5b5',
    background: '#0d1b0d',
    surface: '#1a2a1a',
    text: '#e8f0e0',
    textSecondary: '#8fa584',
    border: '#2a3a2a',
    success: '#5cb85c',
    warning: '#e8a832',
    error: '#d9534f',
  },
}

export const defaultTheme = themes.natGeo
