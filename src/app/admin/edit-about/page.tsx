'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { usePortfolioStore } from '@/data/portfolio'

export default function EditAboutPage() {
  const router = useRouter()
  const { data, updateBio, updatePhilosophy } = usePortfolioStore()
  const [bio, setBio] = useState(data.bio)
  const [philosophy, setPhilosophy] = useState(data.philosophy)

  useEffect(() => {
    if (!localStorage.getItem('admin_authenticated')) {
      router.push('/admin/login')
    }
  }, [router])

  return (
    <div className="min-h-screen pt-24">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-8">Edit About Section</h1>

        <div className="space-y-8">
          <div>
            <label className="block text-sm font-medium mb-2">Biography</label>
            <textarea
              value={bio}
              onChange={(e) => {
                setBio(e.target.value)
                updateBio(e.target.value)
              }}
              rows={6}
              className="w-full px-4 py-2 bg-nat-light/5 border border-nat-light/10 rounded text-nat-light focus:outline-none focus:border-nat-light/30"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Photography Philosophy</label>
            <textarea
              value={philosophy}
              onChange={(e) => {
                setPhilosophy(e.target.value)
                updatePhilosophy(e.target.value)
              }}
              rows={6}
              className="w-full px-4 py-2 bg-nat-light/5 border border-nat-light/10 rounded text-nat-light focus:outline-none focus:border-nat-light/30"
            />
          </div>

          <button onClick={() => router.push('/admin/dashboard')} className="px-6 py-2 bg-nat-light text-nat-dark rounded font-medium hover:bg-nat-light/90">
            Done
          </button>
        </div>
      </div>
    </div>
  )
}
