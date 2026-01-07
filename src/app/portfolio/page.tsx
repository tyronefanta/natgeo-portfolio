'use client'

import { usePortfolioStore } from '@/data/portfolio'
import Link from 'next/link'

export default function PortfolioPage() {
  const { data } = usePortfolioStore()

  return (
    <div className="min-h-screen pt-24">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-5xl font-bold mb-12">Portfolio</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {data.series.map((series) => (
            <Link key={series.id} href={`/portfolio/${series.slug}`}>
              <div className="group cursor-pointer">
                <div className="mb-6">
                  <h3 className="text-2xl font-semibold group-hover:text-nat-light/70">{series.title}</h3>
                  <p className="text-nat-light/60 text-sm">{series.location} â€¢ {series.year}</p>
                </div>
                <p className="text-nat-light/70 mb-4">{series.description}</p>
                <p className="text-nat-light/40 text-sm">{series.photos.length} photos</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
