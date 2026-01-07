'use client'

import { usePortfolioStore } from '@/data/portfolio'

export default function AboutPage() {
  const { data } = usePortfolioStore()

  return (
    <div className="min-h-screen pt-24">
      <div className="max-w-3xl mx-auto px-6 py-24">
        <h1 className="text-5xl font-bold mb-12">{data.name}</h1>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">About</h2>
          <p className="text-nat-light/70 text-lg leading-relaxed">{data.bio}</p>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Photography Philosophy</h2>
          <p className="text-nat-light/70 text-lg leading-relaxed">{data.philosophy}</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Contact</h2>
          <a href={`mailto:${data.email}`} className="inline-block px-8 py-3 bg-nat-light text-nat-dark rounded font-medium hover:bg-nat-light/90">
            Contact Me
          </a>
        </section>
      </div>
    </div>
  )
}
