'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

interface VippsPaymentProps {
  appointmentId: string
  amount: number
  onSuccess: () => void
  onError: (error: string) => void
}

export default function VippsPayment({
  appointmentId,
  amount,
  onError,
}: VippsPaymentProps) {
  const [loading, setLoading] = useState(false)

  const handleVippsPayment = async () => {
    setLoading(true)

    try {
      const response = await fetch('/api/payment/vipps/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ appointmentId }),
      })

      const data = await response.json()

      if (data.success) {
        // Redirect til Vipps
        window.location.href = data.paymentUrl
      } else {
        onError(data.error || 'Feil ved opprettelse av Vipps betaling')
      }
    } catch {
      onError('Nettverksfeil ved opprettelse av Vipps betaling')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='space-y-6'>
      <div className='text-center'>
        <div className='w-16 h-16 mx-auto mb-4 bg-orange-500 rounded-full flex items-center justify-center'>
          {/* Vipps logo */}
          <svg
            viewBox='0 0 100 100'
            className='w-10 h-10 text-white'
            fill='currentColor'
          >
            <path d='M50 0C22.4 0 0 22.4 0 50s22.4 50 50 50 50-22.4 50-50S77.6 0 50 0zm0 90c-22.1 0-40-17.9-40-40s17.9-40 40-40 40 17.9 40 40-17.9 40-40 40z' />
            <path d='M30 30h40v40H30z' />
          </svg>
        </div>
        <h3 className='text-lg font-semibold text-gray-900 mb-2'>
          Betal med Vipps
        </h3>
        <p className='text-gray-600 mb-6'>Enkelt, trygt og raskt med Vipps</p>
      </div>

      <div className='bg-gray-50 p-4 rounded-lg'>
        <div className='flex justify-between items-center'>
          <span className='text-lg font-medium'>Totalt å betale:</span>
          <span className='text-xl font-bold text-orange-600'>
            {amount.toLocaleString('no-NO')} kr
          </span>
        </div>
      </div>

      <Button
        onClick={handleVippsPayment}
        disabled={loading}
        className='w-full bg-orange-500 hover:bg-orange-600 text-white'
        size='lg'
      >
        {loading ? (
          <div className='flex items-center justify-center space-x-2'>
            <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white'></div>
            <span>Oppretter betaling...</span>
          </div>
        ) : (
          <div className='flex items-center justify-center space-x-2'>
            <svg viewBox='0 0 100 100' className='w-5 h-5' fill='currentColor'>
              <path d='M50 0C22.4 0 0 22.4 0 50s22.4 50 50 50 50-22.4 50-50S77.6 0 50 0zm0 90c-22.1 0-40-17.9-40-40s17.9-40 40-40 40 17.9 40 40-17.9 40-40 40z' />
              <path d='M30 30h40v40H30z' />
            </svg>
            <span>Betal med Vipps</span>
          </div>
        )}
      </Button>

      <div className='text-center text-sm text-gray-500'>
        <p>Du vil bli sendt til Vipps for å fullføre betalingen</p>
        <p>Etter betaling vil du bli sendt tilbake hit</p>
      </div>
    </div>
  )
}
