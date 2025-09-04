'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Loader } from 'lucide-react'

interface AdminGuardProps {
  children: React.ReactNode
}

export default function AdminGuard({ children }: AdminGuardProps) {
  const { loading, isAdmin, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        // Ikke innlogget - send til login med redirect
        router.push('/login?redirect=/admin')
        return
      }

      if (!isAdmin) {
        // Innlogget men ikke admin - send til hjem
        router.push('/')
        return
      }
    }
  }, [loading, isAuthenticated, isAdmin, router])

  // Vis loading state
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

  // Vis unauthorized state
  if (!isAuthenticated || !isAdmin) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <h2 className='text-2xl font-bold text-gray-900 mb-2'>
            Ikke autorisert
          </h2>
          <p className='text-gray-600 mb-4'>
            Du har ikke tilgang til admin-området.
          </p>
          <button
            onClick={() => router.push('/')}
            className='text-rose-600 hover:text-rose-500'
          >
            Tilbake til hjemmesiden
          </button>
        </div>
      </div>
    )
  }

  // Bruker er autentisert og er admin
  return <>{children}</>
}
