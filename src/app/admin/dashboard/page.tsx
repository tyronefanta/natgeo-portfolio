'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { usePortfolioStore } from '@/data/portfolio'
import Link from 'next/link'

export default function AdminDashboard() {
  const router = useRouter()
  const { data } = usePortfolioStore()

  useEffect(() => {
    if (!localStorage.getItem('admin_authenticated')) {
      router.push('/admin/login')
    }
  }, [router])

  const stats = [
    { label: 'Total Series', value: data.series.length },
    { label: 'Total Photos', value: data.series.reduce((acc, s) => acc + s.photos.length, 0) },
  ]

  return (
    <div className="min-h-screen pt-24">
      <div className="max-w-7xl mx-auto px-6 py-12">
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

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/admin/edit-about" className="p-6 bg-nat-dark/50 border border-nat-light/10 rounded hover:border-nat-light/30">
            <p className="font-semibold">Edit Bio & About</p>
            <p className="text-nat-light/60 text-sm">Update your biography and philosophy</p>
          </Link>
          <Link href="/admin/manage-series" className="p-6 bg-nat-dark/50 border border-nat-light/10 rounded hover:border-nat-light/30">
            <p className="font-semibold">Manage Series</p>
            <p className="text-nat-light/60 text-sm">Create, edit, or delete series</p>
          </Link>
        </div>

        <div className="mt-12 text-nat-light/40 text-sm">
          <p>Last updated: {new Date(data.lastUpdated).toLocaleString()}</p>
        </div>
      </div>
    </div>
  )
}
