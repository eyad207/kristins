'use client'

import { useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { validateEmail } from '@/lib/utils'

function CancelBookingContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const appointmentId = searchParams.get('id')

  const [formData, setFormData] = useState({
    email: '',
    reason: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.email || !validateEmail(formData.email)) {
      setError('Vennligst oppgi en gyldig e-postadresse')
      return
    }

    if (!formData.reason.trim()) {
      setError('Vennligst oppgi en årsak for avbestilling')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/appointments', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: appointmentId,
          status: 'cancelled',
          notes: `Avbestilt av kunde. Årsak: ${formData.reason}`,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setSuccess(true)
        setTimeout(() => {
          router.push('/')
        }, 3000)
      } else {
        setError(data.error || 'Feil ved avbestilling')
      }
    } catch {
      setError('Nettverksfeil. Prøv igjen senere.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <main className='min-h-screen bg-gradient-to-b from-cream to-white flex items-center justify-center'>
        <div className='max-w-md mx-auto text-center p-6'>
          <div className='w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4'>
            <svg
              className='w-8 h-8 text-white'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M5 13l4 4L19 7'
              />
            </svg>
          </div>
          <h1 className='text-2xl font-serif text-gray-900 mb-4'>
            Avbestilling bekreftet
          </h1>
          <p className='text-gray-600 mb-4'>
            Din booking er nå avbestilt. Du vil motta en bekreftelse på e-post.
          </p>
          <p className='text-sm text-gray-500'>
            Du blir automatisk videreført til forsiden om noen sekunder...
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className='min-h-screen bg-gradient-to-b from-cream to-white'>
      <div className='container mx-auto px-4 py-16'>
        <div className='max-w-md mx-auto'>
          <div className='text-center mb-8'>
            <h1 className='text-3xl font-serif text-gray-900 mb-4'>
              Avbestill booking
            </h1>
            <p className='text-gray-600'>
              Vi beklager at du må avbestille. Fyll ut skjemaet under for å
              bekrefte avbestillingen.
            </p>
          </div>

          <div className='bg-white border rounded-lg p-6'>
            <form onSubmit={handleSubmit} className='space-y-4'>
              {appointmentId && (
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Booking ID
                  </label>
                  <input
                    type='text'
                    value={appointmentId}
                    disabled
                    className='w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600'
                  />
                </div>
              )}

              <div>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium text-gray-700 mb-1'
                >
                  E-postadresse *
                </label>
                <input
                  type='email'
                  id='email'
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold/50'
                  placeholder='din.epost@example.com'
                  required
                />
                <p className='text-xs text-gray-500 mt-1'>
                  E-postadressen som ble brukt ved booking
                </p>
              </div>

              <div>
                <label
                  htmlFor='reason'
                  className='block text-sm font-medium text-gray-700 mb-1'
                >
                  Årsak til avbestilling *
                </label>
                <textarea
                  id='reason'
                  value={formData.reason}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, reason: e.target.value }))
                  }
                  rows={4}
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold/50'
                  placeholder='Fortell oss hvorfor du må avbestille...'
                  required
                />
              </div>

              {error && (
                <div className='bg-red-50 border border-red-200 rounded-md p-3'>
                  <p className='text-red-700 text-sm'>{error}</p>
                </div>
              )}

              <div className='bg-yellow-50 border border-yellow-200 rounded-md p-3'>
                <h3 className='font-medium text-yellow-800 mb-1'>
                  Viktig informasjon
                </h3>
                <ul className='text-sm text-yellow-700 space-y-1'>
                  <li>
                    • Avbestilling mindre enn 24 timer før avtale kan medføre
                    gebyr
                  </li>
                  <li>
                    • Depositum refunderes ved avbestilling over 24 timer før
                  </li>
                  <li>• Du vil motta e-post bekreftelse på avbestillingen</li>
                </ul>
              </div>

              <Button
                type='submit'
                disabled={loading}
                className='w-full bg-red-600 hover:bg-red-700 text-white'
              >
                {loading ? (
                  <div className='flex items-center justify-center space-x-2'>
                    <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white'></div>
                    <span>Avbestiller...</span>
                  </div>
                ) : (
                  'Bekreft avbestilling'
                )}
              </Button>
            </form>
          </div>

          <div className='text-center mt-6'>
            <Button variant='outline' onClick={() => router.back()}>
              Gå tilbake
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default function CancelBookingPage() {
  return (
    <Suspense
      fallback={
        <main className='min-h-screen bg-gradient-to-b from-cream to-white flex items-center justify-center'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-rose-600'></div>
        </main>
      }
    >
      <CancelBookingContent />
    </Suspense>
  )
}
