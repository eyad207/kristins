'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { generateCalendarDays, formatDate } from '@/lib/utils'
import type { TimeSlot } from '@/types'

interface DateTimeStepProps {
  serviceId: string
  onNext: (date: string, time: string, staffId: string) => void
  onBack: () => void
  selectedDate?: string
  selectedTime?: string
}

export function DateTimeStep({
  serviceId,
  onNext,
  onBack,
  selectedDate,
  selectedTime,
}: DateTimeStepProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDateState, setSelectedDateState] = useState<string>(
    selectedDate || ''
  )
  const [selectedTimeState, setSelectedTimeState] = useState<string>(
    selectedTime || ''
  )
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([])
  const [loadingSlots, setLoadingSlots] = useState(false)

  const today = new Date()
  const maxDate = new Date()
  maxDate.setDate(today.getDate() + 90) // 90 days in advance

  const fetchAvailableSlots = useCallback(
    async (date: string) => {
      setLoadingSlots(true)
      try {
        const response = await fetch(
          `/api/availability?serviceId=${serviceId}&date=${date}`
        )
        const data = await response.json()
        if (data.success) {
          setAvailableSlots(data.data.slots)
        } else {
          setAvailableSlots([])
        }
      } catch (error) {
        console.error('Feil ved henting av tilgjengelige tider:', error)
        setAvailableSlots([])
      } finally {
        setLoadingSlots(false)
      }
    },
    [serviceId]
  )

  useEffect(() => {
    if (selectedDateState) {
      fetchAvailableSlots(selectedDateState)
    }
  }, [selectedDateState, fetchAvailableSlots])

  const calendarDays = generateCalendarDays(currentMonth)

  const handleDateSelect = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0]
    setSelectedDateState(dateStr)
    setSelectedTimeState('') // Reset time when date changes
  }

  const handleTimeSelect = (slot: TimeSlot) => {
    const timeStr = new Date(slot.start).toTimeString().slice(0, 5)
    setSelectedTimeState(timeStr)
  }

  const handleNext = () => {
    if (selectedDateState && selectedTimeState) {
      const selectedSlot = availableSlots.find((slot) => {
        const slotTime = new Date(slot.start).toTimeString().slice(0, 5)
        return slotTime === selectedTimeState
      })

      if (selectedSlot && selectedSlot.staffId) {
        onNext(selectedDateState, selectedTimeState, selectedSlot.staffId)
      }
    }
  }

  const isDateDisabled = (date: Date) => {
    return (
      date < today ||
      date > maxDate ||
      date.getDay() === 0 ||
      date.getDay() === 1
    ) // Closed Sunday & Monday
  }

  const isDateSelected = (date: Date) => {
    return selectedDateState === date.toISOString().split('T')[0]
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentMonth)
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1)
    } else {
      newDate.setMonth(newDate.getMonth() + 1)
    }
    setCurrentMonth(newDate)
  }

  return (
    <div className='space-y-6'>
      <div className='text-center'>
        <h2 className='text-2xl font-serif text-gray-900 mb-2'>
          Velg dato og tid
        </h2>
        <p className='text-gray-600'>Når ønsker du din avtale?</p>
      </div>

      {/* Calendar */}
      <div className='bg-white border rounded-lg p-6'>
        <div className='flex justify-between items-center mb-4'>
          <Button
            variant='outline'
            onClick={() => navigateMonth('prev')}
            disabled={currentMonth <= today}
            className='p-2'
          >
            ←
          </Button>
          <h3 className='font-semibold text-lg'>
            {currentMonth.toLocaleDateString('no-NO', {
              month: 'long',
              year: 'numeric',
            })}
          </h3>
          <Button
            variant='outline'
            onClick={() => navigateMonth('next')}
            className='p-2'
          >
            →
          </Button>
        </div>

        <div className='grid grid-cols-7 gap-1 mb-2'>
          {['Man', 'Tir', 'Ons', 'Tor', 'Fre', 'Lør', 'Søn'].map((day) => (
            <div
              key={day}
              className='text-center text-sm font-medium text-gray-500 p-2'
            >
              {day}
            </div>
          ))}
        </div>

        <div className='grid grid-cols-7 gap-1'>
          {calendarDays.map((date: Date, index: number) => {
            const isDisabled = isDateDisabled(date)
            const isSelected = isDateSelected(date)
            const isCurrentMonth = date.getMonth() === currentMonth.getMonth()

            return (
              <button
                key={index}
                onClick={() => !isDisabled && handleDateSelect(date)}
                disabled={isDisabled || !isCurrentMonth}
                className={`
                  p-2 text-sm rounded transition-colors
                  ${!isCurrentMonth ? 'text-gray-300' : ''}
                  ${
                    isDisabled
                      ? 'text-gray-300 cursor-not-allowed'
                      : 'hover:bg-gray-100 cursor-pointer'
                  }
                  ${isSelected ? 'bg-gold text-white hover:bg-gold/90' : ''}
                `}
              >
                {date.getDate()}
              </button>
            )
          })}
        </div>
      </div>

      {/* Time slots */}
      {selectedDateState && (
        <div className='bg-white border rounded-lg p-6'>
          <h3 className='font-semibold text-lg mb-4'>
            Tilgjengelige tider - {formatDate(new Date(selectedDateState))}
          </h3>

          {loadingSlots ? (
            <div className='text-center py-4'>
              <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-gold mx-auto'></div>
              <p className='mt-2 text-gray-600'>Laster tider...</p>
            </div>
          ) : availableSlots.length > 0 ? (
            <div className='grid grid-cols-3 md:grid-cols-4 gap-3'>
              {availableSlots.map((slot, index) => {
                const timeStr = new Date(slot.start).toTimeString().slice(0, 5)
                const isSelected = selectedTimeState === timeStr

                return (
                  <button
                    key={index}
                    onClick={() => handleTimeSelect(slot)}
                    className={`
                      p-3 text-sm border rounded transition-colors
                      ${
                        isSelected
                          ? 'bg-gold text-white border-gold'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }
                    `}
                  >
                    <div className='font-medium'>{timeStr}</div>
                    <div className='text-xs opacity-75'>
                      {slot.staffName || 'Stylist'}
                    </div>
                  </button>
                )
              })}
            </div>
          ) : (
            <p className='text-gray-500 text-center py-4'>
              Ingen tilgjengelige tider denne dagen
            </p>
          )}
        </div>
      )}

      <div className='flex justify-between'>
        <Button variant='outline' onClick={onBack} className='px-8'>
          Tilbake
        </Button>
        <Button
          onClick={handleNext}
          disabled={!selectedDateState || !selectedTimeState}
        >
          Neste steg
        </Button>
      </div>
    </div>
  )
}
