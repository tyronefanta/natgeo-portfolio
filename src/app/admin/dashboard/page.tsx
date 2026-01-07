'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { usePortfolioStore } from '@/data/portfolio'
import Link from 'next/link'

export default function AdminDashboard() {
  const router = useRouter()
  const {
    data,
    updateName,
    updateTitle,
    updateEmail,
    updateInstagram,
    updateBio,
    updatePhilosophy,
    addSeries,
    updateSeries,
    deleteSeries,
    addPhoto,
    deletePhoto,
    updatePhoto,
  } = usePortfolioStore()

  const [activeTab, setActiveTab] = useState<'profile' | 'about' | 'series'>('profile')
  const [editingSeries, setEditingSeries] = useState<string | null>(null)

  // Profile form state
  const [name, setName] = useState(data.name)
  const [title, setTitle] = useState(data.title)
  const [email, setEmail] = useState(data.email)
  const [instagram, setInstagram] = useState(data.instagram || '')

  // About form state
  const [bio, setBio] = useState(data.bio)
  const [philosophy, setPhilosophy] = useState(data.philosophy)

  // Series form state
  const [seriesTitle, setSeriesTitle] = useState('')
  const [seriesDescription, setSeriesDescription] = useState('')
  const [seriesLocation, setSeriesLocation] = useState('')
  const [seriesYear, setSeriesYear] = useState(new Date().getFullYear())

  // Photo form state
  const [photoUrl, setPhotoUrl] = useState('')
  const [photoAlt, setPhotoAlt] = useState('')
  const [photoCaption, setPhotoCaption] = useState('')

  useEffect(() => {
    if (!localStorage.getItem('admin_authenticated')) {
      router.push('/admin/login')
    }
  }, [router])

  const handleSaveProfile = () => {
    if (name !== data.name) updateName(name)
    if (title !== data.title) updateTitle(title)
    if (email !== data.email) updateEmail(email)
    if (instagram !== data.instagram) updateInstagram(instagram)
  }

  const handleSaveAbout = () => {
    if (bio !== data.bio) updateBio(bio)
    if (philosophy !== data.philosophy) updatePhilosophy(philosophy)
  }

  const handleAddSeries = () => {
    if (!seriesTitle || !seriesDescription) return
    const newSeries = {
      id: `series-${Date.now()}`,
      title: seriesTitle,
      slug: seriesTitle.toLowerCase().replace(/\s+/g, '-'),
      description: seriesDescription,
      location: seriesLocation || 'Location',
      year: seriesYear,
      featured: false,
      order: data.series.length + 1,
      photos: [],
    }
    addSeries(newSeries)
    setSeriesTitle('')
    setSeriesDescription('')
    setSeriesLocation('')
    setSeriesYear(new Date().getFullYear())
  }

  const handleAddPhoto = (seriesId: string) => {
    if (!photoUrl || !photoAlt) return
    const newPhoto = {
      id: `photo-${Date.now()}`,
      url: photoUrl,
      alt: photoAlt,
      caption: photoCaption || undefined,
      width: 1600,
      height: 1066,
      featured: false,
    }
    addPhoto(seriesId, newPhoto)
    setPhotoUrl('')
    setPhotoAlt('')
    setPhotoCaption('')
  }

  const stats = [
    { label: 'Total Series', value: data.series.length },
    { label: 'Total Photos', value: data.series.reduce((acc, s) => acc + s.photos.length, 0) },
  ]

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold">Admin Dashboard</h1>
          <button
            onClick={() => {
              localStorage.removeItem('admin_authenticated')
              router.push('/admin/login')
            }}
            className="px-4 py-2 bg-nat-light/10 hover:bg-nat-light/20 rounded"
          >
            Logout
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-nat-dark/50 border border-nat-light/10 rounded-lg p-6">
              <p className="text-nat-light/60 text-sm mb-2">{stat.label}</p>
              <p className="text-3xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-nat-light/10">
          {(['profile', 'about', 'series'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-medium border-b-2 transition ${
                activeTab === tab
                  ? 'border-nat-light text-nat-light'
                  : 'border-transparent text-nat-light/60 hover:text-nat-light'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="space-y-6 bg-nat-dark/50 border border-nat-light/10 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>

            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 bg-nat-light/5 border border-nat-light/10 rounded text-nat-light focus:outline-none focus:border-nat-light/30"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Professional Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 bg-nat-light/5 border border-nat-light/10 rounded text-nat-light focus:outline-none focus:border-nat-light/30"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-nat-light/5 border border-nat-light/10 rounded text-nat-light focus:outline-none focus:border-nat-light/30"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Instagram Handle</label>
              <input
                type="text"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                placeholder="e.g., @yourhandle"
                className="w-full px-4 py-2 bg-nat-light/5 border border-nat-light/10 rounded text-nat-light placeholder-nat-light/30 focus:outline-none focus:border-nat-light/30"
              />
            </div>

            <button
              onClick={handleSaveProfile}
              className="w-full px-6 py-2 bg-nat-light text-nat-dark rounded font-medium hover:bg-nat-light/90"
            >
              Save Profile
            </button>
          </div>
        )}

        {/* About Tab */}
        {activeTab === 'about' && (
          <div className="space-y-6 bg-nat-dark/50 border border-nat-light/10 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Edit About Section</h2>

            <div>
              <label className="block text-sm font-medium mb-2">Biography</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={6}
                className="w-full px-4 py-2 bg-nat-light/5 border border-nat-light/10 rounded text-nat-light focus:outline-none focus:border-nat-light/30"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Photography Philosophy</label>
              <textarea
                value={philosophy}
                onChange={(e) => setPhilosophy(e.target.value)}
                rows={6}
                className="w-full px-4 py-2 bg-nat-light/5 border border-nat-light/10 rounded text-nat-light focus:outline-none focus:border-nat-light/30"
              />
            </div>

            <button
              onClick={handleSaveAbout}
              className="w-full px-6 py-2 bg-nat-light text-nat-dark rounded font-medium hover:bg-nat-light/90"
            >
              Save About
            </button>
          </div>
        )}

        {/* Series Tab */}
        {activeTab === 'series' && (
          <div className="space-y-8">
            {/* Create Series */}
            <div className="bg-nat-dark/50 border border-nat-light/10 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Create New Series</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  value={seriesTitle}
                  onChange={(e) => setSeriesTitle(e.target.value)}
                  placeholder="Series title"
                  className="w-full px-4 py-2 bg-nat-light/5 border border-nat-light/10 rounded text-nat-light placeholder-nat-light/30 focus:outline-none focus:border-nat-light/30"
                />
                <textarea
                  value={seriesDescription}
                  onChange={(e) => setSeriesDescription(e.target.value)}
                  placeholder="Series description"
                  rows={3}
                  className="w-full px-4 py-2 bg-nat-light/5 border border-nat-light/10 rounded text-nat-light placeholder-nat-light/30 focus:outline-none focus:border-nat-light/30"
                />
                <input
                  type="text"
                  value={seriesLocation}
                  onChange={(e) => setSeriesLocation(e.target.value)}
                  placeholder="Location"
                  className="w-full px-4 py-2 bg-nat-light/5 border border-nat-light/10 rounded text-nat-light placeholder-nat-light/30 focus:outline-none focus:border-nat-light/30"
                />
                <input
                  type="number"
                  value={seriesYear}
                  onChange={(e) => setSeriesYear(parseInt(e.target.value))}
                  placeholder="Year"
                  className="w-full px-4 py-2 bg-nat-light/5 border border-nat-light/10 rounded text-nat-light focus:outline-none focus:border-nat-light/30"
                />
                <button
                  onClick={handleAddSeries}
                  className="w-full px-4 py-2 bg-nat-light text-nat-dark rounded font-medium hover:bg-nat-light/90"
                >
                  Add Series
                </button>
              </div>
            </div>

            {/* Manage Series */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Your Series</h2>
              {data.series.map((series) => (
                <div key={series.id} className="bg-nat-dark/50 border border-nat-light/10 rounded-lg p-6">
                  {/* Series Info */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold">{series.title}</h3>
                      <p className="text-nat-light/60 text-sm">
                        {series.location} â€¢ {series.year} â€¢ {series.photos.length} photos
                      </p>
                    </div>
                    <button
                      onClick={() => deleteSeries(series.id)}
                      className="px-3 py-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded text-sm"
                    >
                      Delete
                    </button>
                  </div>

                  {/* Edit Series Toggle */}
                  <button
                    onClick={() =>
                      setEditingSeries(editingSeries === series.id ? null : series.id)
                    }
                    className="text-nat-light/60 hover:text-nat-light text-sm mb-4"
                  >
                    {editingSeries === series.id ? 'â–¼ Hide' : 'â–¶ Edit Details'}
                  </button>

                  {/* Edit Series Form */}
                  {editingSeries === series.id && (
                    <div className="bg-nat-dark/70 p-4 rounded mb-4 space-y-3 border border-nat-light/5">
                      <input
                        type="text"
                        defaultValue={series.title}
                        onBlur={(e) =>
                          updateSeries(series.id, { title: e.target.value })
                        }
                        className="w-full px-3 py-1 bg-nat-light/5 border border-nat-light/10 rounded text-sm text-nat-light focus:outline-none"
                      />
                      <textarea
                        defaultValue={series.description}
                        onBlur={(e) =>
                          updateSeries(series.id, { description: e.target.value })
                        }
                        rows={2}
                        className="w-full px-3 py-1 bg-nat-light/5 border border-nat-light/10 rounded text-sm text-nat-light focus:outline-none"
                      />
                      <input
                        type="text"
                        defaultValue={series.location}
                        onBlur={(e) =>
                          updateSeries(series.id, { location: e.target.value })
                        }
                        className="w-full px-3 py-1 bg-nat-light/5 border border-nat-light/10 rounded text-sm text-nat-light focus:outline-none"
                      />
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={series.featured}
                          onChange={(e) =>
                            updateSeries(series.id, { featured: e.target.checked })
                          }
                          className="rounded"
                        />
                        <span className="text-sm">Featured</span>
                      </label>
                    </div>
                  )}

                  {/* Photos */}
                  <div className="bg-nat-dark/70 p-4 rounded space-y-3">
                    <h4 className="font-semibold text-sm">Photos</h4>

                    {/* Add Photo Form */}
                    <div className="space-y-2 border-b border-nat-light/10 pb-3">
                      <input
                        type="text"
                        value={photoUrl}
                        onChange={(e) => setPhotoUrl(e.target.value)}
                        placeholder="Photo URL"
                        className="w-full px-3 py-1 bg-nat-light/5 border border-nat-light/10 rounded text-sm text-nat-light placeholder-nat-light/30 focus:outline-none"
                      />
                      <input
                        type="text"
                        value={photoAlt}
                        onChange={(e) => setPhotoAlt(e.target.value)}
                        placeholder="Alt text"
                        className="w-full px-3 py-1 bg-nat-light/5 border border-nat-light/10 rounded text-sm text-nat-light placeholder-nat-light/30 focus:outline-none"
                      />
                      <input
                        type="text"
                        value={photoCaption}
                        onChange={(e) => setPhotoCaption(e.target.value)}
                        placeholder="Caption (optional)"
                        className="w-full px-3 py-1 bg-nat-light/5 border border-nat-light/10 rounded text-sm text-nat-light placeholder-nat-light/30 focus:outline-none"
                      />
                      <button
                        onClick={() => handleAddPhoto(series.id)}
                        className="w-full px-3 py-1 bg-nat-light/10 hover:bg-nat-light/20 rounded text-sm"
                      >
                        Add Photo
                      </button>
                    </div>

                    {/* Photo List */}
                    {series.photos.length > 0 ? (
                      <div className="space-y-2">
                        {series.photos.map((photo) => (
                          <div
                            key={photo.id}
                            className="flex items-start gap-2 p-2 bg-nat-light/5 rounded"
                          >
                            <img
                              src={photo.url}
                              alt={photo.alt}
                              className="w-12 h-12 object-cover rounded"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-xs text-nat-light/80 truncate">
                                {photo.alt}
                              </p>
                              {photo.caption && (
                                <p className="text-xs text-nat-light/60 truncate">
                                  {photo.caption}
                                </p>
                              )}
                            </div>
                            <button
                              onClick={() => deletePhoto(series.id, photo.id)}
                              className="px-2 py-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded text-xs"
                            >
                              Delete
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-nat-light/40">No photos yet</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Last Updated */}
        <div className="mt-12 text-nat-light/40 text-sm">
          <p>Last updated: {new Date(data.lastUpdated).toLocaleString()}</p>
        </div>

        {/* Customize Theme Link */}
        <div className="mt-8 text-center">
          <Link 
            href="/admin/customize-theme" 
            className="text-nat-light/60 hover:text-nat-light text-sm underline"
          >
            Customize Theme & Colors
          </Link>
        </div>
      </div>
    </div>
  )
}
