'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { usePortfolioStore } from '@/data/portfolio'

export default function ManageSeriesPage() {
  const router = useRouter()
  const { data, addSeries, updateSeries, deleteSeries } = usePortfolioStore()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    if (!localStorage.getItem('admin_authenticated')) {
      router.push('/admin/login')
    }
  }, [router])

  const handleAddSeries = () => {
    if (!title || !description) return

    const newSeries = {
      id: `series-${Date.now()}`,
      title,
      slug: title.toLowerCase().replace(/\s+/g, '-'),
      description,
      location: 'Location',
      year: new Date().getFullYear(),
      featured: false,
      order: data.series.length + 1,
      photos: [],
    }

    addSeries(newSeries)
    setTitle('')
    setDescription('')
  }

  return (
    <div className="min-h-screen pt-24">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-8">Manage Series</h1>

        <div className="bg-nat-dark/50 border border-nat-light/10 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Create New Series</h2>
          <div className="space-y-4">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Series title"
              className="w-full px-4 py-2 bg-nat-light/5 border border-nat-light/10 rounded text-nat-light placeholder-nat-light/30 focus:outline-none focus:border-nat-light/30"
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Series description"
              rows={4}
              className="w-full px-4 py-2 bg-nat-light/5 border border-nat-light/10 rounded text-nat-light placeholder-nat-light/30 focus:outline-none focus:border-nat-light/30"
            />
            <button
              onClick={handleAddSeries}
              className="w-full px-4 py-2 bg-nat-light text-nat-dark rounded font-medium hover:bg-nat-light/90"
            >
              Add Series
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {data.series.map((series) => (
            <div key={series.id} className="bg-nat-dark/50 border border-nat-light/10 rounded-lg p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold">{series.title}</h3>
                  <p className="text-nat-light/60 text-sm">{series.location} â€¢ {series.year} â€¢ {series.photos.length} photos</p>
                </div>
                <button
                  onClick={() => deleteSeries(series.id)}
                  className="px-3 py-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
