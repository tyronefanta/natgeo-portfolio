'use client'

import { usePortfolioStore } from '@/data/portfolio'
import { useState } from 'react'
import Image from 'next/image'

export default function SeriesPage({ params }: { params: { series: string } }) {
  const { getSeries } = usePortfolioStore()
  const series = getSeries(params.series)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  if (!series) return <div className="pt-24 text-center">Series not found</div>

  return (
    <div className="min-h-screen pt-24">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 py-12 border-b border-nat-light/10">
        <h1 className="text-5xl font-bold mb-4">{series.title}</h1>
        <p className="text-nat-light/60 text-sm mb-4">{series.location} â€¢ {series.year}</p>
        <p className="text-nat-light/70">{series.description}</p>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {series.photos.map((photo, index) => (
            <button
              key={photo.id}
              onClick={() => setSelectedIndex(index)}
              className="relative aspect-square overflow-hidden rounded group"
            >
              <img
                src={photo.url}
                alt={photo.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedIndex !== null && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4" onClick={() => setSelectedIndex(null)}>
          <button onClick={() => setSelectedIndex(null)} className="absolute top-6 right-6 text-2xl">âœ•</button>
          <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <img src={series.photos[selectedIndex].url} alt="" className="w-full h-auto rounded" />
            {series.photos[selectedIndex].caption && (
              <p className="text-center mt-4 text-nat-light/80">{series.photos[selectedIndex].caption}</p>
            )}
            <div className="flex justify-between items-center mt-6">
              <button onClick={() => selectedIndex > 0 && setSelectedIndex(selectedIndex - 1)} className="px-4 py-2 bg-nat-light/10 rounded hover:bg-nat-light/20">â† Previous</button>
              <span className="text-nat-light/60">{selectedIndex + 1} of {series.photos.length}</span>
              <button onClick={() => selectedIndex < series.photos.length - 1 && setSelectedIndex(selectedIndex + 1)} className="px-4 py-2 bg-nat-light/10 rounded hover:bg-nat-light/20">Next â†’</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
