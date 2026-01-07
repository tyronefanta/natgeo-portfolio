'use client'

import { usePortfolioStore } from '@/data/portfolio'
import Link from 'next/link'

export default function Home() {
  const { data, getFeaturedSeries } = usePortfolioStore()
  const featured = getFeaturedSeries()

  return (
    <>
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-nat-dark/95 backdrop-blur z-50 border-b border-nat-light/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">{data.name}</h1>
          <div className="flex gap-8">
            <Link href="/portfolio" className="hover:text-nat-light/70">Portfolio</Link>
            <Link href="/about" className="hover:text-nat-light/70">About</Link>
            <Link href="/admin/login" className="text-nat-light/60 text-sm">Admin</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="w-full h-screen relative overflow-hidden mt-16">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40"></div>
        <div className="absolute bottom-0 left-0 right-0 p-12">
          <h2 className="text-6xl font-bold mb-4">{data.title}</h2>
          <p className="text-nat-light/80 mb-8 max-w-2xl">{data.philosophy}</p>
          <Link href="/portfolio" className="inline-block px-8 py-3 bg-nat-light text-nat-dark rounded font-medium hover:bg-nat-light/90">
            Explore Portfolio
          </Link>
        </div>
      </section>

      {/* Featured Series */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <h3 className="text-4xl font-bold mb-12">Featured Work</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {featured.map((series) => (
            <Link key={series.id} href={`/portfolio/${series.slug}`}>
              <div className="group cursor-pointer">
                <div className="mb-6">
                  <h4 className="text-2xl font-semibold group-hover:text-nat-light/70">{series.title}</h4>
                  <p className="text-nat-light/60 text-sm">{series.location} â€¢ {series.year}</p>
                </div>
                <p className="text-nat-light/70">{series.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-nat-light/10 mt-24 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h4 className="font-semibold mb-4">{data.name}</h4>
              <p className="text-nat-light/60 text-sm">{data.bio}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Links</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/" className="text-nat-light/60 hover:text-nat-light">Home</Link></li>
                <li><Link href="/portfolio" className="text-nat-light/60 hover:text-nat-light">Portfolio</Link></li>
                <li><Link href="/about" className="text-nat-light/60 hover:text-nat-light">About</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <a href={`mailto:${data.email}`} className="text-nat-light/60 hover:text-nat-light text-sm">
                {data.email}
              </a>
              {data.instagram && (
                <p className="text-nat-light/60 text-sm mt-2">
                  <a href={`https://instagram.com/${data.instagram.replace('@', '')}`} target="_blank" rel="noopener">
                    {data.instagram}
                  </a>
                </p>
              )}
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
