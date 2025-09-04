'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { formatDate, formatCurrency } from '@/lib/utils'
import type { Service } from '@/types'

interface ConfirmationStepProps {
  serviceId: string
  service?: Service
  selectedDate: string
  selectedTime: string
  staffName: string
  customerData: {
    customerName: string
    customerEmail: string
    customerPhone: string
    notes?: string
    preferredStyle?: string
  }
  onBack: () => void
  onConfirm: () => void
}

export function ConfirmationStep({
  service,
  selectedDate,
  selectedTime,
  staffName,
  customerData,
  onBack,
  onConfirm,
}: ConfirmationStepProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [agreed, setAgreed] = useState(false)

  const handleConfirm = async () => {
    if (!agreed) return

    setIsSubmitting(true)
    try {
      await onConfirm()
    } catch (error) {
      console.error('Feil ved booking:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const appointmentDateTime = new Date(`${selectedDate}T${selectedTime}:00`)

  return (
    <div className='space-y-6'>
      <div className='text-center'>
        <h2 className='text-2xl font-serif text-gray-900 mb-2'>
          Bekreft booking
        </h2>
        <p className='text-gray-600'>Sjekk at alt er riktig før du fullfører</p>
      </div>

      {/* Booking Summary */}
      <div className='bg-white border rounded-lg p-6 space-y-4'>
        <h3 className='font-semibold text-lg text-gray-900 border-b pb-2'>
          Booking detaljer
        </h3>

        <div className='grid gap-4 md:grid-cols-2'>
          <div>
            <h4 className='font-medium text-gray-700'>Tjeneste</h4>
            <p className='text-gray-900'>{service?.name}</p>
            <p className='text-sm text-gray-500'>
              {service?.durationMin} minutter
            </p>
          </div>

          <div>
            <h4 className='font-medium text-gray-700'>Dato og tid</h4>
            <p className='text-gray-900'>
              {formatDate(appointmentDateTime)} kl. {selectedTime}
            </p>
            <p className='text-sm text-gray-500'>Med {staffName}</p>
          </div>

          <div>
            <h4 className='font-medium text-gray-700'>Kunde</h4>
            <p className='text-gray-900'>{customerData.customerName}</p>
            <p className='text-sm text-gray-500'>
              {customerData.customerEmail}
            </p>
            <p className='text-sm text-gray-500'>
              {customerData.customerPhone}
            </p>
          </div>

          <div>
            <h4 className='font-medium text-gray-700'>Priser</h4>
            <div className='space-y-1'>
              <div className='flex justify-between'>
                <span>Total pris:</span>
                <span className='font-medium'>
                  {service && formatCurrency(service.price, service.currency)}
                </span>
              </div>
              <div className='flex justify-between text-gold'>
                <span>Depositum (betales nå):</span>
                <span className='font-medium'>
                  {service && formatCurrency(service.deposit, service.currency)}
                </span>
              </div>
              <div className='flex justify-between text-sm text-gray-500'>
                <span>Resterende:</span>
                <span>
                  {service &&
                    formatCurrency(
                      service.price - service.deposit,
                      service.currency
                    )}
                </span>
              </div>
            </div>
          </div>
        </div>

        {customerData.preferredStyle && (
          <div>
            <h4 className='font-medium text-gray-700'>Ønsket stil</h4>
            <p className='text-gray-900'>{customerData.preferredStyle}</p>
          </div>
        )}

        {customerData.notes && (
          <div>
            <h4 className='font-medium text-gray-700'>Notater</h4>
            <p className='text-gray-900'>{customerData.notes}</p>
          </div>
        )}
      </div>

      {/* Terms and Conditions */}
      <div className='bg-gray-50 border rounded-lg p-6'>
        <h3 className='font-semibold text-lg text-gray-900 mb-4'>
          Vilkår og betingelser
        </h3>

        <div className='space-y-3 text-sm text-gray-600'>
          <div className='flex items-start space-x-2'>
            <span className='text-gold'>•</span>
            <p>
              <strong>Avbestilling:</strong> Avtaler kan avbestilles
              kostnadsfritt frem til 24 timer før avtalt tid. Ved senere
              avbestilling belastes depositum.
            </p>
          </div>

          <div className='flex items-start space-x-2'>
            <span className='text-gold'>•</span>
            <p>
              <strong>Depositum:</strong> Depositum betales ved booking og
              trekkes fra totalprisen på prøvedagen.
            </p>
          </div>

          <div className='flex items-start space-x-2'>
            <span className='text-gold'>•</span>
            <p>
              <strong>Forsinkelse:</strong> Ved forsinkelse over 15 minutter kan
              timen bli forkortet eller avlyst uten refusjon.
            </p>
          </div>

          <div className='flex items-start space-x-2'>
            <span className='text-gold'>•</span>
            <p>
              <strong>Personvern:</strong> Vi behandler dine personopplysninger
              i henhold til gjeldende personvernlovgivning.
            </p>
          </div>
        </div>

        <div className='mt-4 flex items-center space-x-2'>
          <input
            type='checkbox'
            id='terms'
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className='rounded border-gray-300 text-gold focus:ring-gold'
          />
          <label htmlFor='terms' className='text-sm text-gray-700'>
            Jeg godtar vilkårene og bekrefter at opplysningene er korrekte
          </label>
        </div>
      </div>

      {/* Payment Info */}
      <div className='bg-gold/5 border border-gold/20 rounded-lg p-4'>
        <h3 className='font-semibold text-gray-900 mb-2'>💳 Betaling</h3>
        <p className='text-sm text-gray-600'>
          Du vil bli videreført til sikker betaling etter at du bekrefter
          bookingen. Vi aksepterer alle vanlige betalingskort samt Vipps.
        </p>
      </div>

      <div className='flex justify-between'>
        <Button
          variant='outline'
          onClick={onBack}
          disabled={isSubmitting}
          className='px-8'
        >
          Tilbake
        </Button>
        <Button
          onClick={handleConfirm}
          disabled={!agreed || isSubmitting}
          className='bg-gold hover:bg-gold/90 text-white px-8'
        >
          {isSubmitting ? (
            <div className='flex items-center space-x-2'>
              <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white'></div>
              <span>Bekrefter...</span>
            </div>
          ) : (
            `Bekreft og betal ${
              service && formatCurrency(service.deposit, service.currency)
            }`
          )}
        </Button>
      </div>
    </div>
  )
}
