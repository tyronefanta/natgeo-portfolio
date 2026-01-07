'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useThemeStore } from '@/data/themeStore'
import { themes } from '@/data/themes'

export default function CustomizeThemePage() {
  const router = useRouter()
  const { currentTheme, setTheme, updateCustomTheme } = useThemeStore()
  const [themeColors, setThemeColors] = useState(currentTheme)

  useEffect(() => {
    if (!localStorage.getItem('admin_authenticated')) {
      router.push('/admin/login')
    }
  }, [router])

  const handleColorChange = (key: string, value: string) => {
    const updated = { ...themeColors, [key]: value }
    setThemeColors(updated)
    updateCustomTheme(updated)
  }

  const colorKeys = [
    { key: 'primary', label: 'Primary Color' },
    { key: 'secondary', label: 'Secondary Color' },
    { key: 'accent', label: 'Accent Color' },
    { key: 'background', label: 'Background' },
    { key: 'surface', label: 'Surface' },
    { key: 'text', label: 'Text Color' },
    { key: 'textSecondary', label: 'Secondary Text' },
    { key: 'border', label: 'Border Color' },
    { key: 'success', label: 'Success' },
    { key: 'warning', label: 'Warning' },
    { key: 'error', label: 'Error' },
  ]

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-12">Customize Theme</h1>

        {/* Preset Themes */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Preset Themes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.values(themes).map((theme) => (
              <button
                key={theme.id}
                onClick={() => {
                  setTheme(theme.id)
                  setThemeColors(theme)
                }}
                className={`p-6 rounded-lg border-2 transition`}
                style={{
                  backgroundColor: theme.background,
                  borderColor:
                    currentTheme.id === theme.id ? theme.primary : 'transparent',
                  color: theme.text,
                }}
              >
                <div className="text-lg font-semibold mb-3">{theme.name}</div>
                <div className="flex gap-2">
                  {[
                    theme.primary,
                    theme.secondary,
                    theme.accent,
                    theme.success,
                  ].map((color, i) => (
                    <div
                      key={i}
                      className="w-6 h-6 rounded"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Custom Colors */}
        <div style={{ 
          backgroundColor: '#1a1f3a',
          borderColor: '#2a3a5a'
        }} className="border rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">Custom Colors</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {colorKeys.map(({ key, label }) => (
              <div key={key}>
                <label className="block text-sm font-medium mb-2">{label}</label>
                <div className="flex gap-3 items-center">
                  <input
                    type="color"
                    value={themeColors[key as keyof typeof themeColors] || '#000000'}
                    onChange={(e) => handleColorChange(key, e.target.value)}
                    className="w-12 h-12 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={themeColors[key as keyof typeof themeColors] || '#000000'}
                    onChange={(e) => handleColorChange(key, e.target.value)}
                    className="flex-1 px-3 py-2 rounded text-sm font-mono"
                    style={{
                      backgroundColor: '#0a0e27',
                      borderColor: '#2a3a5a',
                      color: '#f5f5f5'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => router.push('/admin/dashboard')}
            className="mt-8 px-6 py-2 rounded font-medium"
            style={{
              backgroundColor: themeColors.primary,
              color: '#ffffff'
            }}
          >
            Done
          </button>
        </div>

        {/* Live Preview */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Live Preview</h2>
          <div
            className="rounded-lg p-12 text-center"
            style={{ backgroundColor: themeColors.background }}
          >
            <h3
              className="text-3xl font-bold mb-4"
              style={{ color: themeColors.text }}
            >
              Sample Heading
            </h3>
            <p
              className="mb-6"
              style={{ color: themeColors.textSecondary }}
            >
              This is how your theme looks. Adjust colors above to see changes.
            </p>
            <div className="flex justify-center gap-4">
              <button
                className="px-6 py-2 rounded font-medium transition"
                style={{
                  backgroundColor: themeColors.primary,
                  color: '#ffffff',
                }}
              >
                Primary Button
              </button>
              <button
                className="px-6 py-2 rounded font-medium transition"
                style={{
                  borderColor: themeColors.secondary,
                  color: themeColors.secondary,
                  backgroundColor: 'transparent',
                  border: '2px solid'
                }}
              >
                Secondary Button
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
