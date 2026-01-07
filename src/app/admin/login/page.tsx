'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'demo123'
    
    if (password === adminPassword) {
      localStorage.setItem('admin_authenticated', 'true')
      router.push('/admin/dashboard')
    } else {
      setError('Incorrect password')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-nat-dark/50 border border-nat-light/10 rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-8">Admin Login</h1>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter admin password"
            className="w-full px-4 py-2 bg-nat-light/5 border border-nat-light/10 rounded text-nat-light placeholder-nat-light/30 focus:outline-none focus:border-nat-light/30"
          />
          
          {error && <div className="p-4 bg-red-500/10 border border-red-500/20 rounded text-red-400 text-sm">{error}</div>}
          
          <button type="submit" className="w-full px-4 py-2 bg-nat-light text-nat-dark rounded font-medium hover:bg-nat-light/90">
            Login
          </button>
        </form>
      </div>
    </div>
  )
}
