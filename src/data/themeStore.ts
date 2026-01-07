import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { themes, defaultTheme, type Theme } from './themes'

interface ThemeStore {
  currentTheme: Theme
  setTheme: (themeId: string) => void
  getTheme: () => Theme
  updateCustomTheme: (updates: Partial<Theme>) => void
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      currentTheme: defaultTheme,
      setTheme: (themeId: string) => {
        const theme = themes[themeId]
        if (theme) {
          set({ currentTheme: theme })
        }
      },
      getTheme: () => get().currentTheme,
      updateCustomTheme: (updates: Partial<Theme>) => {
        set((state) => ({
          currentTheme: {
            ...state.currentTheme,
            ...updates,
          },
        }))
      },
    }),
    { name: 'theme-storage' }
  )
)
