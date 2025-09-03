// Utility functions for the application

export const formatCurrency = (amount: number, currency = 'NOK'): string => {
  return new Intl.NumberFormat('no-NO', {
    style: 'currency',
    currency,
  }).format(amount)
}

export const formatDate = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('no-NO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export const formatTime = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleTimeString('no-NO', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

export const formatDateTime = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleString('no-NO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[æ]/g, 'ae')
    .replace(/[ø]/g, 'o')
    .replace(/[å]/g, 'a')
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export const cn = (
  ...classes: (string | undefined | null | false)[]
): string => {
  return classes.filter(Boolean).join(' ')
}

export const generateTimeSlots = (
  startTime: string,
  endTime: string,
  intervalMinutes: number
): string[] => {
  const slots: string[] = []
  const start = new Date(`2000-01-01T${startTime}:00`)
  const end = new Date(`2000-01-01T${endTime}:00`)

  const current = new Date(start)

  while (current < end) {
    slots.push(current.toTimeString().slice(0, 5))
    current.setMinutes(current.getMinutes() + intervalMinutes)
  }

  return slots
}

export const isTimeSlotAvailable = (
  slot: string,
  date: Date,
  existingAppointments: { start: Date; end: Date }[]
): boolean => {
  const slotDateTime = new Date(date)
  const [hours, minutes] = slot.split(':').map(Number)
  slotDateTime.setHours(hours, minutes, 0, 0)

  return !existingAppointments.some((appointment) => {
    const appointmentStart = new Date(appointment.start)
    const appointmentEnd = new Date(appointment.end)
    return slotDateTime >= appointmentStart && slotDateTime < appointmentEnd
  })
}

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePhone = (phone: string): boolean => {
  // Norwegian phone number validation
  const phoneRegex = /^(\+47|0047|47)?[2-9]\d{7}$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}

export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '')

  if (cleaned.startsWith('47')) {
    return `+${cleaned}`
  }

  if (cleaned.length === 8) {
    return `+47${cleaned}`
  }

  return phone
}

export const generateCalendarFile = (appointment: {
  start: Date
  end: Date
  title: string
  description?: string
  location?: string
}): string => {
  const formatDateForCalendar = (date: Date): string => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
  }

  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Kristins Brudesalong//Booking//NO',
    'BEGIN:VEVENT',
    `DTSTART:${formatDateForCalendar(appointment.start)}`,
    `DTEND:${formatDateForCalendar(appointment.end)}`,
    `SUMMARY:${appointment.title}`,
    appointment.description ? `DESCRIPTION:${appointment.description}` : '',
    appointment.location ? `LOCATION:${appointment.location}` : '',
    `UID:${Date.now()}@kristins-brudesalong.no`,
    'END:VEVENT',
    'END:VCALENDAR',
  ]
    .filter(Boolean)
    .join('\r\n')

  return ics
}

export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout

  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export const throttle = <T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

export const getBusinessHours = () => {
  return [
    { day: 'Mandag', open: '10:00', close: '18:00', closed: false },
    { day: 'Tirsdag', open: '10:00', close: '18:00', closed: false },
    { day: 'Onsdag', open: '10:00', close: '18:00', closed: false },
    { day: 'Torsdag', open: '10:00', close: '19:00', closed: false },
    { day: 'Fredag', open: '10:00', close: '18:00', closed: false },
    { day: 'Lørdag', open: '10:00', close: '16:00', closed: false },
    { day: 'Søndag', open: '12:00', close: '16:00', closed: false },
  ]
}

export const isBusinessOpen = (date: Date = new Date()): boolean => {
  const hours = getBusinessHours()
  const dayOfWeek = date.getDay()
  const currentTime = date.toTimeString().slice(0, 5)

  // Convert Sunday (0) to Monday-based index
  const adjustedDay = dayOfWeek === 0 ? 6 : dayOfWeek - 1
  const todayHours = hours[adjustedDay]

  if (todayHours.closed) return false

  return currentTime >= todayHours.open && currentTime <= todayHours.close
}
