'use client'

import { useState } from 'react'
import StripePayment from './StripePayment'
import VippsPayment from './VippsPayment'
import { Button } from '@/components/ui/button'

interface PaymentMethodsProps {
  appointmentId: string
  amount: number
  onSuccess: () => void
  onError: (error: string) => void
}

type PaymentMethod = 'stripe' | 'vipps' | null

export default function PaymentMethods({
  appointmentId,
  amount,
  onSuccess,
  onError,
}: PaymentMethodsProps) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(null)

  const handleMethodSelect = (method: PaymentMethod) => {
    setSelectedMethod(method)
  }

  const handleBack = () => {
    setSelectedMethod(null)
  }

  if (selectedMethod === 'stripe') {
    return (
      <div className='space-y-6'>
        <div className='flex items-center space-x-4'>
          <Button
            variant='outline'
            onClick={handleBack}
            className='flex items-center space-x-2'
          >
            <svg
              className='w-4 h-4'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M15 19l-7-7 7-7'
              />
            </svg>
            <span>Tilbake</span>
          </Button>
          <h3 className='text-lg font-semibold'>Kortbetaling</h3>
        </div>

        <StripePayment
          appointmentId={appointmentId}
          amount={amount}
          onSuccess={onSuccess}
          onError={onError}
        />
      </div>
    )
  }

  if (selectedMethod === 'vipps') {
    return (
      <div className='space-y-6'>
        <div className='flex items-center space-x-4'>
          <Button
            variant='outline'
            onClick={handleBack}
            className='flex items-center space-x-2'
          >
            <svg
              className='w-4 h-4'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M15 19l-7-7 7-7'
              />
            </svg>
            <span>Tilbake</span>
          </Button>
          <h3 className='text-lg font-semibold'>Vipps betaling</h3>
        </div>

        <VippsPayment
          appointmentId={appointmentId}
          amount={amount}
          onSuccess={onSuccess}
          onError={onError}
        />
      </div>
    )
  }

  return (
    <div className='space-y-6'>
      <div className='text-center'>
        <h3 className='text-xl font-semibold text-gray-900 mb-2'>
          Velg betalingsmetode
        </h3>
        <p className='text-gray-600 mb-6'>
          Hvordan vil du betale for prøvetimen?
        </p>
      </div>

      <div className='bg-gray-50 p-4 rounded-lg mb-6'>
        <div className='flex justify-between items-center'>
          <span className='text-lg font-medium'>Totalt å betale:</span>
          <span className='text-xl font-bold text-rose-600'>
            {amount.toLocaleString('no-NO')} kr
          </span>
        </div>
      </div>

      <div className='grid gap-4 md:grid-cols-2'>
        {/* Vipps Option */}
        <button
          onClick={() => handleMethodSelect('vipps')}
          className='group relative overflow-hidden rounded-lg border-2 border-gray-200 p-6 text-left transition-all hover:border-orange-500 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-500'
        >
          <div className='flex items-center space-x-4'>
            <div className='w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center'>
              <svg
                viewBox='0 0 100 100'
                className='w-8 h-8 text-white'
                fill='currentColor'
              >
                <path d='M50 0C22.4 0 0 22.4 0 50s22.4 50 50 50 50-22.4 50-50S77.6 0 50 0zm0 90c-22.1 0-40-17.9-40-40s17.9-40 40-40 40 17.9 40 40-17.9 40-40 40z' />
                <path d='M30 30h40v40H30z' />
              </svg>
            </div>
            <div>
              <h4 className='text-lg font-semibold text-gray-900 group-hover:text-orange-600'>
                Vipps
              </h4>
              <p className='text-sm text-gray-600'>Rask og enkel betaling</p>
            </div>
          </div>
          <div className='mt-4 text-sm text-gray-500'>
            • Ingen kortopplysninger nødvendig
            <br />
            • Norges mest brukte betalingsapp
            <br />• Øyeblikkelig bekreftelse
          </div>
        </button>

        {/* Stripe Option */}
        <button
          onClick={() => handleMethodSelect('stripe')}
          className='group relative overflow-hidden rounded-lg border-2 border-gray-200 p-6 text-left transition-all hover:border-blue-500 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
        >
          <div className='flex items-center space-x-4'>
            <div className='w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center'>
              <svg
                className='w-6 h-6 text-white'
                fill='currentColor'
                viewBox='0 0 24 24'
              >
                <path d='M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z' />
              </svg>
            </div>
            <div>
              <h4 className='text-lg font-semibold text-gray-900 group-hover:text-blue-600'>
                Kort
              </h4>
              <p className='text-sm text-gray-600'>Visa, Mastercard, Klarna</p>
            </div>
          </div>
          <div className='mt-4 text-sm text-gray-500'>
            • Alle kort akseptert
            <br />
            • Sikker SSL-kryptering
            <br />• Internasjonal standard
          </div>
        </button>
      </div>

      <div className='text-center text-sm text-gray-500 mt-6'>
        <p>🔒 Sikker betaling - Vi lagrer ikke dine betalingsopplysninger</p>
      </div>
    </div>
  )
}
