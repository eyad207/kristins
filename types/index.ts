// Global types for the application
export interface User {
  id: string
  name: string
  email: string
  phone?: string
  role: 'customer' | 'admin' | 'staff'
  createdAt: Date
}

export interface Staff {
  id: string
  name: string
  email: string
  phone: string
  role: 'admin' | 'stylist' | 'consultant'
  bio?: string
  profileImageUrl?: string
  specialties: string[]
  languages: string[]
  workingHours: {
    monday?: { start: string; end: string }
    tuesday?: { start: string; end: string }
    wednesday?: { start: string; end: string }
    thursday?: { start: string; end: string }
    friday?: { start: string; end: string }
    saturday?: { start: string; end: string }
    sunday?: { start: string; end: string }
  }
  calendarColor: string
  isActive: boolean
  hireDate: Date
}

export interface Service {
  id: string
  name: string
  slug: string
  description: string
  durationMin: number
  bufferBefore: number
  bufferAfter: number
  price: number
  deposit: number
  currency: string
  locationId?: string
  isActive: boolean
  category: 'prøvetime' | 'tilpasning' | 'express' | 'after-hours' | 'gruppe'
}

export interface AvailabilityRule {
  id: string
  staffId?: string
  roomId?: string
  weekday: number // 0-6 (Sunday-Saturday)
  startTime: string // HH:MM format
  endTime: string // HH:MM format
  capacity: number
}

export interface Blackout {
  id: string
  staffId?: string
  roomId?: string
  start: Date
  end: Date
  reason: string
}

export interface Appointment {
  id: string
  serviceId: string
  service?: Service
  userId: string
  user?: User
  staffId?: string
  staff?: Staff
  start: Date
  end: Date
  status: 'pending' | 'confirmed' | 'cancelled' | 'no-show' | 'completed'
  notes?: string
  customerName: string
  customerEmail: string
  customerPhone: string
  preferredStyle?: string
}

export interface Payment {
  id: string
  appointmentId: string
  appointment?: Appointment
  provider: 'stripe' | 'vipps'
  amount: number
  currency: string
  status: 'requires_action' | 'succeeded' | 'refunded' | 'failed' | 'pending'
  providerIntentId: string
  receiptUrl?: string
  createdAt: Date
}

export interface Refund {
  id: string
  paymentId: string
  payment?: Payment
  amount: number
  reason: string
  createdAt: Date
}

export interface Dress {
  id: string
  name: string
  slug: string
  designer: string
  dressCollection?: string
  silhouette:
    | 'A-line'
    | 'Ballgown'
    | 'Mermaid'
    | 'Sheath'
    | 'Trumpet'
    | 'Empire'
  fabric: string
  color: string
  priceRangeMin: number
  priceRangeMax: number
  sizes: string[]
  status: 'available' | 'reserved' | 'sold' | 'on_cleaning'
  images: string[]
  description?: string
  tags: string[]
  featured: boolean
}

export interface Review {
  id: string
  userId: string
  user?: User
  rating: number // 1-5
  title: string
  body: string
  published: boolean
  createdAt: Date
  images?: string[]
}

export interface Page {
  id: string
  title: string
  slug: string
  content: string
  seo: {
    metaTitle?: string
    metaDescription?: string
    keywords?: string[]
  }
  publishedAt?: Date
  isPublished: boolean
}

export interface Setting {
  key: string
  value: string | number | boolean | object
  description?: string
}

// Booking flow types
export interface BookingStep {
  step: number
  title: string
  completed: boolean
}

export interface TimeSlot {
  start: Date
  end: Date
  available: boolean
  staffId?: string
  staffName?: string
}

export interface BookingFormData {
  serviceId: string
  selectedDate: Date
  selectedTime: string
  customerName: string
  customerEmail: string
  customerPhone: string
  notes?: string
  preferredStyle?: string
}

// API Response types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Utility types
export type DateOnly = string // YYYY-MM-DD format
export type TimeOnly = string // HH:MM format

// Component props types
export interface BaseComponentProps {
  className?: string
  children?: React.ReactNode
}

// Form types
export interface ContactFormData {
  name: string
  email: string
  phone?: string
  message: string
  subject: string
}

// Notification types
export interface NotificationSettings {
  emailConfirmation: boolean
  emailReminders: boolean
  smsConfirmation: boolean
  smsReminders: boolean
}

// Business settings
export interface BusinessHours {
  day: string
  open: string
  close: string
  closed: boolean
}

export interface BusinessInfo {
  name: string
  address: string
  phone: string
  email: string
  website: string
  hours: BusinessHours[]
  socialMedia: {
    instagram?: string
    facebook?: string
    pinterest?: string
  }
}
