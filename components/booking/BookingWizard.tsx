'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ServiceStep } from './ServiceStep'
import { DateTimeStep } from './DateTimeStep'
import { CustomerStep } from './CustomerStep'
import { ConfirmationStep } from './ConfirmationStep'
import type { Service, BookingFormData } from '@/types'

interface BookingWizardProps {
  initialServiceId?: string
}

export function BookingWizard({ initialServiceId }: BookingWizardProps) {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [service, setService] = useState<Service | null>(null)
  const [staffName, setStaffName] = useState('')

  const [bookingData, setBookingData] = useState<Partial<BookingFormData>>({
    serviceId: initialServiceId || '',
    selectedDate: new Date(),
    selectedTime: '',
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    notes: '',
    preferredStyle: '',
  })

  const steps = [
    { number: 1, title: 'Tjeneste', completed: currentStep > 1 },
    { number: 2, title: 'Dato & Tid', completed: currentStep > 2 },
    { number: 3, title: 'Kontaktinfo', completed: currentStep > 3 },
    { number: 4, title: 'Bekreft', completed: currentStep > 4 },
  ]

  useEffect(() => {
    if (bookingData.serviceId) {
      fetchService(bookingData.serviceId)
    }
  }, [bookingData.serviceId])

  const fetchService = async (serviceId: string) => {
    try {
      const response = await fetch('/api/services')
      const data = await response.json()
      if (data.success) {
        const foundService = data.data.find((s: Service) => s.id === serviceId)
        if (foundService) {
          setService(foundService)
        }
      }
    } catch (error) {
      console.error('Feil ved henting av tjeneste:', error)
    }
  }

  const handleServiceSelect = (serviceId: string) => {
    setBookingData((prev) => ({ ...prev, serviceId }))
    setCurrentStep(2)
  }

  const handleDateTimeSelect = (date: string, time: string) => {
    setBookingData((prev) => ({
      ...prev,
      selectedDate: new Date(date),
      selectedTime: time,
    }))

    // TODO: Fetch staff name
    setStaffName('Kristin') // Placeholder
    setCurrentStep(3)
  }

  const handleCustomerData = (customerData: {
    customerName: string
    customerEmail: string
    customerPhone: string
    notes?: string
    preferredStyle?: string
  }) => {
    setBookingData((prev) => ({ ...prev, ...customerData }))
    setCurrentStep(4)
  }

  const handleConfirmBooking = async () => {
    try {
      // Create the appointment
      const bookingRequest = {
        serviceId: bookingData.serviceId!,
        staffId: 'STAFF_ID', // TODO: Get from date/time selection
        selectedDate: bookingData.selectedDate!.toISOString().split('T')[0],
        selectedTime: bookingData.selectedTime!,
        customerName: bookingData.customerName!,
        customerEmail: bookingData.customerEmail!,
        customerPhone: bookingData.customerPhone!,
        notes: bookingData.notes,
        preferredStyle: bookingData.preferredStyle,
      }

      const response = await fetch('/api/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingRequest),
      })

      const data = await response.json()

      if (data.success) {
        // Redirect to payment page
        router.push(`/payment?id=${data.data.appointmentId}`)
      } else {
        throw new Error(data.error || 'Booking failed')
      }
    } catch (error) {
      console.error('Booking error:', error)
      // TODO: Show error message to user
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className='max-w-4xl mx-auto px-4 py-8'>
      {/* Progress indicator */}
      <div className='mb-8'>
        <div className='flex justify-between items-center'>
          {steps.map((step, index) => (
            <div key={step.number} className='flex items-center'>
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium
                  ${
                    step.number === currentStep
                      ? 'bg-gold text-white'
                      : step.completed
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }
                `}
              >
                {step.completed ? '✓' : step.number}
              </div>
              <div className='ml-2 hidden sm:block'>
                <div
                  className={`text-sm font-medium ${
                    step.number === currentStep ? 'text-gold' : 'text-gray-600'
                  }`}
                >
                  {step.title}
                </div>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`w-8 h-0.5 mx-4 ${
                    step.completed ? 'bg-green-500' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step content */}
      <div className='bg-cream/30 rounded-lg p-6'>
        {currentStep === 1 && (
          <ServiceStep
            onNext={handleServiceSelect}
            selectedServiceId={bookingData.serviceId}
          />
        )}

        {currentStep === 2 && bookingData.serviceId && (
          <DateTimeStep
            serviceId={bookingData.serviceId}
            onNext={handleDateTimeSelect}
            onBack={handleBack}
            selectedDate={bookingData.selectedDate?.toISOString().split('T')[0]}
            selectedTime={bookingData.selectedTime}
          />
        )}

        {currentStep === 3 && (
          <CustomerStep
            onNext={handleCustomerData}
            onBack={handleBack}
            initialData={{
              customerName: bookingData.customerName,
              customerEmail: bookingData.customerEmail,
              customerPhone: bookingData.customerPhone,
              notes: bookingData.notes,
              preferredStyle: bookingData.preferredStyle,
            }}
          />
        )}

        {currentStep === 4 && service && (
          <ConfirmationStep
            serviceId={bookingData.serviceId!}
            service={service}
            selectedDate={bookingData.selectedDate!.toISOString().split('T')[0]}
            selectedTime={bookingData.selectedTime!}
            staffName={staffName}
            customerData={{
              customerName: bookingData.customerName!,
              customerEmail: bookingData.customerEmail!,
              customerPhone: bookingData.customerPhone!,
              notes: bookingData.notes,
              preferredStyle: bookingData.preferredStyle,
            }}
            onBack={handleBack}
            onConfirm={handleConfirmBooking}
          />
        )}
      </div>
    </div>
  )
}
