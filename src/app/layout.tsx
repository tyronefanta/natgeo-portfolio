import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Photography Portfolio',
  description: 'National Geographic quality photography portfolio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-nat-dark text-nat-light">
        {children}
      </body>
    </html>
  )
}
