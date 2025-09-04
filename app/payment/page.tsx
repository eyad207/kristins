'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { PaymentMethods } from '@/components/payment'

interface AppointmentData {
  _id: string
  service: {
    name: string
    price: number
  }
  date: string
  timeSlot: string
  staff: {
    name: string
  }
  notes?: string
  totalAmount: number
}

export default function PaymentPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const appointmentId = searchParams.get('id')

  const [appointment, setAppointment] = useState<AppointmentData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchAppointment = useCallback(async () => {
    try {
      const response = await fetch(`/api/appointments/${appointmentId}`)
      const data = await response.json()

      if (data.success) {
        setAppointment(data.appointment)
      } else {
        setError('Finner ikke timen')
      }
    } catch {
      setError('Feil ved henting av timedetaljer')
    } finally {
      setLoading(false)
    }
  }, [appointmentId])

  useEffect(() => {
    if (appointmentId) {
      fetchAppointment()
    }
  }, [appointmentId, fetchAppointment])

  const handlePaymentSuccess = () => {
    router.push(`/booking/success?id=${appointmentId}`)
  }

  const handlePaymentError = (errorMessage: string) => {
    setError(errorMessage)
  }

  if (loading) {
    return (
      <main className='min-h-screen bg-gradient-to-b from-cream to-white flex items-center justify-center'>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-rose-600'></div>
      </main>
    )
  }

  if (error || !appointment) {
    return (
      <main className='min-h-screen bg-gradient-to-b from-cream to-white flex items-center justify-center'>
        <div className='max-w-md mx-auto text-center p-6'>
          <div className='w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4'>
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
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </div>
          <h1 className='text-2xl font-bold text-gray-900 mb-2'>Feil</h1>
          <p className='text-gray-600 mb-6'>{error}</p>
          <button
            onClick={() => router.push('/booking')}
            className='bg-rose-600 text-white px-6 py-2 rounded-md hover:bg-rose-700'
          >
            Tilbake til booking
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className='min-h-screen bg-gradient-to-b from-cream to-white py-12'>
      <div className='max-w-2xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-bold text-gray-900 mb-2'>
            Fullfør betaling
          </h1>
          <p className='text-gray-600'>
            Din time er reservert. Fullfør betalingen for å bekrefte bookingen.
          </p>
        </div>

        {/* Appointment Summary */}
        <div className='bg-white rounded-lg shadow-md p-6 mb-8'>
          <h2 className='text-xl font-semibold text-gray-900 mb-4'>
            📅 Dine timedetaljer
          </h2>
          <div className='space-y-3'>
            <div className='flex justify-between'>
              <span className='text-gray-600'>Tjeneste:</span>
              <span className='font-medium'>{appointment.service.name}</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-gray-600'>Dato:</span>
              <span className='font-medium'>
                {new Date(appointment.date).toLocaleDateString('no-NO')}
              </span>
            </div>
            <div className='flex justify-between'>
              <span className='text-gray-600'>Tid:</span>
              <span className='font-medium'>{appointment.timeSlot}</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-gray-600'>Stilist:</span>
              <span className='font-medium'>{appointment.staff.name}</span>
            </div>
            {appointment.notes && (
              <div className='flex justify-between'>
                <span className='text-gray-600'>Notater:</span>
                <span className='font-medium text-right max-w-xs'>
                  {appointment.notes}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Payment Methods */}
        <div className='bg-white rounded-lg shadow-md p-6'>
          <PaymentMethods
            appointmentId={appointmentId!}
            amount={appointment.totalAmount}
            onSuccess={handlePaymentSuccess}
            onError={handlePaymentError}
          />

          {error && (
            <div className='mt-4 p-4 bg-red-50 border border-red-200 rounded-md'>
              <p className='text-red-600 text-sm'>{error}</p>
            </div>
          )}
        </div>

        {/* Help Text */}
        <div className='text-center mt-8'>
          <p className='text-sm text-gray-500'>
            Trenger du hjelp? Ring oss på{' '}
            <a href='tel:+4712345678' className='text-rose-600 hover:underline'>
              +47 123 45 678
            </a>
          </p>
        </div>
      </div>
    </main>
  )
}
