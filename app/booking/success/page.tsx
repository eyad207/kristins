'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { formatDate, formatCurrency } from '@/lib/utils'
import type { Appointment } from '@/types'

export default function BookingSuccessPage() {
  const searchParams = useSearchParams()
  const appointmentId = searchParams.get('appointmentId')
  const [appointment, setAppointment] = useState<Appointment | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (appointmentId) {
      fetchAppointment(appointmentId)
    }
  }, [appointmentId])

  const fetchAppointment = async (id: string) => {
    try {
      const response = await fetch(`/api/appointments?id=${id}`)
      const data = await response.json()
      if (data.success && data.data.length > 0) {
        setAppointment(data.data[0])
      }
    } catch (error) {
      console.error('Feil ved henting av avtale:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <main className='min-h-screen bg-gradient-to-b from-cream to-white flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-gold mx-auto'></div>
          <p className='mt-2 text-gray-600'>Laster booking detaljer...</p>
        </div>
      </main>
    )
  }

  return (
    <main className='min-h-screen bg-gradient-to-b from-cream to-white'>
      <div className='container mx-auto px-4 py-16'>
        <div className='max-w-2xl mx-auto'>
          {/* Success Message */}
          <div className='text-center mb-8'>
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
            <h1 className='text-4xl font-serif text-gray-900 mb-4'>
              Booking bekreftet! 🎉
            </h1>
            <p className='text-xl text-gray-600'>
              Takk for din booking. Vi gleder oss til å møte deg!
            </p>
          </div>

          {/* Appointment Details */}
          {appointment && (
            <div className='bg-white border rounded-lg p-6 mb-8'>
              <h2 className='text-xl font-semibold text-gray-900 mb-4'>
                Booking detaljer
              </h2>

              <div className='space-y-3'>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>Booking ID:</span>
                  <span className='font-mono text-sm'>{appointment.id}</span>
                </div>

                <div className='flex justify-between'>
                  <span className='text-gray-600'>Tjeneste:</span>
                  <span>{appointment.service?.name}</span>
                </div>

                <div className='flex justify-between'>
                  <span className='text-gray-600'>Dato og tid:</span>
                  <span>
                    {formatDate(appointment.start)} kl.{' '}
                    {appointment.start.toTimeString().slice(0, 5)}
                  </span>
                </div>

                <div className='flex justify-between'>
                  <span className='text-gray-600'>Varighet:</span>
                  <span>{appointment.service?.durationMin} minutter</span>
                </div>

                <div className='flex justify-between'>
                  <span className='text-gray-600'>Stylist:</span>
                  <span>{appointment.staff?.name}</span>
                </div>

                <div className='flex justify-between'>
                  <span className='text-gray-600'>Status:</span>
                  <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800'>
                    {appointment.status === 'pending'
                      ? 'Venter på betaling'
                      : appointment.status}
                  </span>
                </div>

                {appointment.service && (
                  <div className='border-t pt-3 mt-3'>
                    <div className='flex justify-between'>
                      <span className='text-gray-600'>Total pris:</span>
                      <span>
                        {formatCurrency(
                          appointment.service.price,
                          appointment.service.currency
                        )}
                      </span>
                    </div>
                    <div className='flex justify-between text-gold'>
                      <span className='text-gray-600'>Depositum betalt:</span>
                      <span className='font-semibold'>
                        {formatCurrency(
                          appointment.service.deposit,
                          appointment.service.currency
                        )}
                      </span>
                    </div>
                    <div className='flex justify-between text-sm text-gray-500'>
                      <span>Resterende (betales på dagen):</span>
                      <span>
                        {formatCurrency(
                          appointment.service.price -
                            appointment.service.deposit,
                          appointment.service.currency
                        )}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Next Steps */}
          <div className='bg-gold/5 border border-gold/20 rounded-lg p-6 mb-8'>
            <h3 className='font-semibold text-gray-900 mb-4'>Hva skjer nå?</h3>
            <div className='space-y-3 text-sm'>
              <div className='flex items-start space-x-3'>
                <div className='w-6 h-6 bg-gold text-white rounded-full flex items-center justify-center text-xs font-bold'>
                  1
                </div>
                <div>
                  <p className='font-medium'>E-post bekreftelse</p>
                  <p className='text-gray-600'>
                    Du vil motta en e-post med alle detaljene om din booking.
                  </p>
                </div>
              </div>

              <div className='flex items-start space-x-3'>
                <div className='w-6 h-6 bg-gold text-white rounded-full flex items-center justify-center text-xs font-bold'>
                  2
                </div>
                <div>
                  <p className='font-medium'>Påminnelse</p>
                  <p className='text-gray-600'>
                    Vi sender deg en påminnelse dagen før din avtale.
                  </p>
                </div>
              </div>

              <div className='flex items-start space-x-3'>
                <div className='w-6 h-6 bg-gold text-white rounded-full flex items-center justify-center text-xs font-bold'>
                  3
                </div>
                <div>
                  <p className='font-medium'>Møt oss i salonggen</p>
                  <p className='text-gray-600'>
                    Kom til vår salong 5-10 minutter før avtalt tid.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className='bg-white border rounded-lg p-6 mb-8'>
            <h3 className='font-semibold text-gray-900 mb-4'>Kontakt oss</h3>
            <div className='space-y-2 text-sm'>
              <p>
                <strong>Telefon:</strong> +47 99 12 34 56
              </p>
              <p>
                <strong>E-post:</strong> post@brudesalongkristin.no
              </p>
              <p>
                <strong>Adresse:</strong> Storgata 123, 0001 Oslo
              </p>
            </div>
            <p className='text-sm text-gray-600 mt-3'>
              Har du spørsmål eller behov for å endre din booking? Ikke nøl med
              å kontakte oss!
            </p>
          </div>

          {/* Action Buttons */}
          <div className='flex flex-col sm:flex-row gap-4'>
            <Button asChild className='flex-1'>
              <Link href='/'>Tilbake til forsiden</Link>
            </Button>
            <Button variant='outline' asChild className='flex-1'>
              <Link href='/lookbook'>Se våre kjoler</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
