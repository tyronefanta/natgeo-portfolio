import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Photo {
  id: string
  url: string
  alt: string
  caption?: string
  width: number
  height: number
  featured?: boolean
}

export interface Series {
  id: string
  title: string
  slug: string
  description: string
  location: string
  year: number
  photos: Photo[]
  featured: boolean
  order: number
}

export interface PortfolioData {
  name: string
  title: string
  bio: string
  philosophy: string
  email: string
  instagram?: string
  series: Series[]
  lastUpdated: string
}

export const defaultPortfolioData: PortfolioData = {
  name: 'Jane Photographer',
  title: 'Environmental & Documentary Photographer',
  bio: 'Award-winning photographer documenting environmental change and human resilience.',
  philosophy: 'Photography is storytelling. Every image should ask a question or reveal a truth.',
  email: 'hello@example.com',
  instagram: '@janephotographer',
  series: [
    {
      id: 'series-1',
      title: 'Featured Series',
      slug: 'featured-series',
      description: 'Edit this series in the admin dashboard.',
      location: 'Location, Country',
      year: 2025,
      featured: true,
      order: 1,
      photos: [
        {
          id: 'photo-1',
          url: 'https://images.unsplash.com/photo-1606933248051-5ce98adc8ecf?w=1600',
          alt: 'Sample',
          caption: 'Sample photo - edit in admin',
          width: 1600,
          height: 1066,
          featured: true,
        },
      ],
    },
  ],
  lastUpdated: new Date().toISOString(),
}

interface PortfolioStore {
  data: PortfolioData
  updateBio: (bio: string) => void
  updatePhilosophy: (philosophy: string) => void
  addSeries: (series: Series) => void
  updateSeries: (id: string, updates: Partial<Series>) => void
  deleteSeries: (id: string) => void
  addPhoto: (seriesId: string, photo: Photo) => void
  deletePhoto: (seriesId: string, photoId: string) => void
  getSeries: (slug: string) => Series | undefined
  getFeaturedSeries: () => Series[]
}

export const usePortfolioStore = create<PortfolioStore>()(
  persist(
    (set, get) => ({
      data: defaultPortfolioData,
      updateBio: (bio: string) =>
        set((state) => ({
          data: {
            ...state.data,
            bio,
            lastUpdated: new Date().toISOString(),
          },
        })),
      updatePhilosophy: (philosophy: string) =>
        set((state) => ({
          data: {
            ...state.data,
            philosophy,
            lastUpdated: new Date().toISOString(),
          },
        })),
      addSeries: (series: Series) =>
        set((state) => ({
          data: {
            ...state.data,
            series: [...state.data.series, series],
            lastUpdated: new Date().toISOString(),
          },
        })),
      updateSeries: (id: string, updates: Partial<Series>) =>
        set((state) => ({
          data: {
            ...state.data,
            series: state.data.series.map((s) =>
              s.id === id ? { ...s, ...updates } : s
            ),
            lastUpdated: new Date().toISOString(),
          },
        })),
      deleteSeries: (id: string) =>
        set((state) => ({
          data: {
            ...state.data,
            series: state.data.series.filter((s) => s.id !== id),
            lastUpdated: new Date().toISOString(),
          },
        })),
      addPhoto: (seriesId: string, photo: Photo) =>
        set((state) => ({
          data: {
            ...state.data,
            series: state.data.series.map((s) =>
              s.id === seriesId
                ? { ...s, photos: [...s.photos, photo] }
                : s
            ),
            lastUpdated: new Date().toISOString(),
          },
        })),
      deletePhoto: (seriesId: string, photoId: string) =>
        set((state) => ({
          data: {
            ...state.data,
            series: state.data.series.map((s) =>
              s.id === seriesId
                ? { ...s, photos: s.photos.filter((p) => p.id !== photoId) }
                : s
            ),
            lastUpdated: new Date().toISOString(),
          },
        })),
      getSeries: (slug: string) => {
        return get().data.series.find((s) => s.slug === slug)
      },
      getFeaturedSeries: () => {
        return get()
          .data.series.filter((s) => s.featured)
          .sort((a, b) => a.order - b.order)
      },
    }),
    { name: 'portfolio-storage' }
  )
)
