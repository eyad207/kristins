'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { validateEmail, validatePhone } from '@/lib/utils'

interface CustomerStepProps {
  onNext: (customerData: {
    customerName: string
    customerEmail: string
    customerPhone: string
    notes?: string
    preferredStyle?: string
  }) => void
  onBack: () => void
  initialData?: {
    customerName?: string
    customerEmail?: string
    customerPhone?: string
    notes?: string
    preferredStyle?: string
  }
}

export function CustomerStep({
  onNext,
  onBack,
  initialData,
}: CustomerStepProps) {
  const [formData, setFormData] = useState({
    customerName: initialData?.customerName || '',
    customerEmail: initialData?.customerEmail || '',
    customerPhone: initialData?.customerPhone || '',
    notes: initialData?.notes || '',
    preferredStyle: initialData?.preferredStyle || '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Navn er påkrevd'
    }

    if (!formData.customerEmail.trim()) {
      newErrors.customerEmail = 'E-post er påkrevd'
    } else if (!validateEmail(formData.customerEmail)) {
      newErrors.customerEmail = 'Ugyldig e-postadresse'
    }

    if (!formData.customerPhone.trim()) {
      newErrors.customerPhone = 'Telefonnummer er påkrevd'
    } else if (!validatePhone(formData.customerPhone)) {
      newErrors.customerPhone = 'Ugyldig telefonnummer'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateForm()) {
      onNext({
        customerName: formData.customerName.trim(),
        customerEmail: formData.customerEmail.toLowerCase().trim(),
        customerPhone: formData.customerPhone.trim(),
        notes: formData.notes.trim() || undefined,
        preferredStyle: formData.preferredStyle.trim() || undefined,
      })
    }
  }

  return (
    <div className='space-y-6'>
      <div className='text-center'>
        <h2 className='text-2xl font-serif text-gray-900 mb-2'>
          Kontaktinformasjon
        </h2>
        <p className='text-gray-600'>Fortell oss litt om deg selv</p>
      </div>

      <div className='bg-white border rounded-lg p-6 space-y-4'>
        <div>
          <label
            htmlFor='customerName'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            Fullt navn *
          </label>
          <input
            type='text'
            id='customerName'
            value={formData.customerName}
            onChange={(e) => handleInputChange('customerName', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gold/50 ${
              errors.customerName ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder='Skriv ditt fulle navn'
          />
          {errors.customerName && (
            <p className='text-red-500 text-sm mt-1'>{errors.customerName}</p>
          )}
        </div>

        <div>
          <label
            htmlFor='customerEmail'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            E-postadresse *
          </label>
          <input
            type='email'
            id='customerEmail'
            value={formData.customerEmail}
            onChange={(e) => handleInputChange('customerEmail', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gold/50 ${
              errors.customerEmail ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder='din.epost@example.com'
          />
          {errors.customerEmail && (
            <p className='text-red-500 text-sm mt-1'>{errors.customerEmail}</p>
          )}
        </div>

        <div>
          <label
            htmlFor='customerPhone'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            Telefonnummer *
          </label>
          <input
            type='tel'
            id='customerPhone'
            value={formData.customerPhone}
            onChange={(e) => handleInputChange('customerPhone', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gold/50 ${
              errors.customerPhone ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder='+47 123 45 678'
          />
          {errors.customerPhone && (
            <p className='text-red-500 text-sm mt-1'>{errors.customerPhone}</p>
          )}
        </div>

        <div>
          <label
            htmlFor='preferredStyle'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            Ønsket stil (valgfritt)
          </label>
          <select
            id='preferredStyle'
            value={formData.preferredStyle}
            onChange={(e) =>
              handleInputChange('preferredStyle', e.target.value)
            }
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold/50'
          >
            <option value=''>Velg stil</option>
            <option value='Klassisk'>Klassisk</option>
            <option value='Moderne'>Moderne</option>
            <option value='Vintage'>Vintage</option>
            <option value='Boho'>Boho</option>
            <option value='Minimalistisk'>Minimalistisk</option>
            <option value='Prinsesse'>Prinsesse</option>
            <option value='Romantisk'>Romantisk</option>
          </select>
        </div>

        <div>
          <label
            htmlFor='notes'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            Ekstra notater (valgfritt)
          </label>
          <textarea
            id='notes'
            value={formData.notes}
            onChange={(e) => handleInputChange('notes', e.target.value)}
            rows={4}
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold/50'
            placeholder='Har du spesielle ønsker eller behov? Fortell oss gjerne om din drømmekjole...'
          />
          <p className='text-gray-500 text-sm mt-1'>
            Maks 500 tegn. Dette hjelper oss å forberede oss til møtet ditt.
          </p>
        </div>
      </div>

      <div className='bg-gold/5 border border-gold/20 rounded-lg p-4'>
        <h3 className='font-semibold text-gray-900 mb-2'>📋 Personvern</h3>
        <p className='text-sm text-gray-600'>
          Vi behandler dine personopplysninger i henhold til våre retningslinjer
          for personvern. Informasjonen brukes kun til å administrere din
          booking og gi deg best mulig service.
        </p>
      </div>

      <div className='flex justify-between'>
        <Button variant='outline' onClick={onBack} className='px-8'>
          Tilbake
        </Button>
        <Button onClick={handleNext}>Neste steg</Button>
      </div>
    </div>
  )
}
