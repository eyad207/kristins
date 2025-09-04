'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import type { Service } from '@/types'

interface ServiceStepProps {
  onNext: (serviceId: string) => void
  selectedServiceId?: string
}

export function ServiceStep({ onNext, selectedServiceId }: ServiceStepProps) {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedService, setSelectedService] = useState<string>(
    selectedServiceId || ''
  )

  // Fallback tjenester hvis database ikke er tilgjengelig
  const fallbackServices: Service[] = [
    {
      id: 'brudekjole-provetime',
      name: 'Brudekjole prøvetime',
      slug: 'brudekjole-provetime',
      description:
        'Personlig prøvetime for brudekjoler med vår erfarne stylist. Inkluderer champagne og personlig rådgivning.',
      durationMin: 90,
      bufferBefore: 15,
      bufferAfter: 15,
      price: 2500,
      deposit: 500,
      currency: 'NOK',
      category: 'prøvetime',
      isActive: true,
    },
    {
      id: 'selskapskjole-provetime',
      name: 'Selskapskjole prøvetime',
      slug: 'selskapskjole-provetime',
      description:
        'Finn den perfekte kjolen til fest, bal eller andre spesielle anledninger.',
      durationMin: 60,
      bufferBefore: 10,
      bufferAfter: 10,
      price: 1500,
      deposit: 300,
      currency: 'NOK',
      category: 'prøvetime',
      isActive: true,
    },
    {
      id: 'brudepike-provetime',
      name: 'Brudepike prøvetime',
      slug: 'brudepike-provetime',
      description:
        'Koordinerte brudepikekjoler som passer perfekt til bryllupstemaet.',
      durationMin: 75,
      bufferBefore: 15,
      bufferAfter: 15,
      price: 1800,
      deposit: 350,
      currency: 'NOK',
      category: 'gruppe',
      isActive: true,
    },
    {
      id: 'tilpasning-endring',
      name: 'Tilpasning og endring',
      slug: 'tilpasning-endring',
      description:
        'Profesjonell tilpasning av eksisterende kjole for perfekt passform.',
      durationMin: 45,
      bufferBefore: 10,
      bufferAfter: 10,
      price: 800,
      deposit: 200,
      currency: 'NOK',
      category: 'tilpasning',
      isActive: true,
    },
    {
      id: 'stilradgivning-konsultasjon',
      name: 'Stilrådgivning konsultasjon',
      slug: 'stilradgivning-konsultasjon',
      description: 'Personlig stilrådgivning og planlegging av brudeantrekket.',
      durationMin: 60,
      bufferBefore: 10,
      bufferAfter: 10,
      price: 1200,
      deposit: 300,
      currency: 'NOK',
      category: 'prøvetime',
      isActive: true,
    },
  ]

  useEffect(() => {
    fetchServices()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/services')
      const data = await response.json()
      if (data.success) {
        setServices(data.data)
      } else {
        // Bruk fallback hvis API feiler
        console.log('API feilet, bruker fallback tjenester')
        setServices(fallbackServices)
      }
    } catch (error) {
      console.error('Feil ved henting av tjenester:', error)
      // Bruk fallback ved feil
      setServices(fallbackServices)
    } finally {
      setLoading(false)
    }
  }

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId)
  }

  const handleNext = () => {
    if (selectedService) {
      onNext(selectedService)
    }
  }

  if (loading) {
    return (
      <div className='text-center py-8'>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-gold mx-auto'></div>
        <p className='mt-2 text-gray-600'>Laster tjenester...</p>
      </div>
    )
  }

  return (
    <div className='space-y-6'>
      <div className='text-center'>
        <h2 className='text-2xl font-serif text-gray-900 mb-2'>
          Velg tjeneste
        </h2>
        <p className='text-gray-600'>Hvilken tjeneste ønsker du å booke?</p>
      </div>

      <div className='grid gap-4 md:grid-cols-2'>
        {services.map((service) => (
          <div
            key={service.id}
            className={`border rounded-lg p-6 cursor-pointer transition-all ${
              selectedService === service.id
                ? 'border-gold bg-gold/5 ring-2 ring-gold'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => handleServiceSelect(service.id)}
          >
            <div className='flex justify-between items-start mb-3'>
              <h3 className='font-semibold text-lg text-gray-900'>
                {service.name}
              </h3>
              <div className='text-right'>
                <div className='text-lg font-bold text-gold'>
                  {service.price.toLocaleString('no-NO')} {service.currency}
                </div>
                <div className='text-sm text-gray-500'>
                  Depositum: {service.deposit.toLocaleString('no-NO')}{' '}
                  {service.currency}
                </div>
              </div>
            </div>

            <p className='text-gray-600 text-sm mb-3'>{service.description}</p>

            <div className='flex justify-between items-center text-sm text-gray-500'>
              <span>{service.durationMin} minutter</span>
              <span className='capitalize bg-gray-100 px-2 py-1 rounded'>
                {service.category}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className='flex justify-end'>
        <Button
          variant={'default'}
          onClick={handleNext}
          disabled={!selectedService}
        >
          Neste steg
        </Button>
      </div>
    </div>
  )
}
