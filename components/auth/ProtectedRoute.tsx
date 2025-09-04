'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { Loader } from 'lucide-react'

interface ProtectedRouteProps {
  children: React.ReactNode
  requireAuth?: boolean
  redirectTo?: string
}

export default function ProtectedRoute({
  children,
  requireAuth = true,
  redirectTo,
}: ProtectedRouteProps) {
  const { isAuthenticated, loading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!loading && requireAuth && !isAuthenticated) {
      const redirect = redirectTo || pathname
      router.push(`/login?redirect=${encodeURIComponent(redirect)}`)
    }
  }, [loading, requireAuth, isAuthenticated, router, redirectTo, pathname])

  // Show loading state
  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <Loader className='animate-spin h-8 w-8 text-rose-600 mx-auto mb-4' />
          <p className='text-gray-600'>Laster...</p>
        </div>
      </div>
    )
  }

  // If authentication is required but user is not authenticated, don't render anything
  // (user will be redirected)
  if (requireAuth && !isAuthenticated) {
    return null
  }

  // Render children if authenticated or if authentication is not required
  return <>{children}</>
}
