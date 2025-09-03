// Application constants

export const SITE_CONFIG = {
  name: 'Kristins Brudesalong',
  description:
    'Norges fremste brudesalong med eksklusive kjoler og personlig service. Book prøvetime i dag.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://kristins-brudesalong.no',
  ogImage: '/images/og-image.jpg',
  keywords: [
    'brudesalong',
    'brudekjole',
    'prøvetime',
    'bryllup',
    'tilpasning',
    'norway',
    'oslo',
    'bergen',
    'trondheim',
    'stavanger',
  ],
} as const

export const CONTACT_INFO = {
  phone: '+47 123 45 678',
  email: 'post@kristins-brudesalong.no',
  address: 'Bogstadveien 123, 0366 Oslo',
  instagram: '@kristinsbrudesalong',
  facebook: 'kristinsbrudesalong',
  pinterest: 'kristinsbrudesalong',
} as const

export const BUSINESS_HOURS = [
  { day: 'Mandag', open: '10:00', close: '18:00', closed: false },
  { day: 'Tirsdag', open: '10:00', close: '18:00', closed: false },
  { day: 'Onsdag', open: '10:00', close: '18:00', closed: false },
  { day: 'Torsdag', open: '10:00', close: '19:00', closed: false },
  { day: 'Fredag', open: '10:00', close: '18:00', closed: false },
  { day: 'Lørdag', open: '10:00', close: '16:00', closed: false },
  { day: 'Søndag', open: '12:00', close: '16:00', closed: false },
] as const

export const SERVICE_CATEGORIES = [
  'prøvetime',
  'tilpasning',
  'express',
  'after-hours',
  'gruppe',
] as const

export const DRESS_SILHOUETTES = [
  'A-line',
  'Ballgown',
  'Mermaid',
  'Sheath',
  'Trumpet',
  'Empire',
] as const

export const APPOINTMENT_STATUSES = [
  'pending',
  'confirmed',
  'cancelled',
  'no-show',
  'completed',
] as const

export const PAYMENT_PROVIDERS = ['stripe', 'vipps'] as const

export const PAYMENT_STATUSES = [
  'requires_action',
  'succeeded',
  'refunded',
  'failed',
  'pending',
] as const

export const DEFAULT_SERVICE_SETTINGS = {
  defaultDuration: 90, // minutes
  defaultBuffer: 15, // minutes
  defaultDeposit: 500, // NOK
  maxAdvanceBookingDays: 90,
  minAdvanceBookingHours: 24,
  cancellationHours: 24,
} as const

export const EMAIL_TEMPLATES = {
  booking_confirmation: 'booking-confirmation',
  booking_reminder: 'booking-reminder',
  booking_cancelled: 'booking-cancelled',
  payment_success: 'payment-success',
  payment_failed: 'payment-failed',
} as const

export const SMS_TEMPLATES = {
  booking_confirmation:
    'Hei {name}! Din prøvetime hos Kristins Brudesalong er bekreftet {date} kl {time}. Vi gleder oss til å møte deg!',
  booking_reminder:
    'Påminnelse: Du har prøvetime hos Kristins Brudesalong i morgen {date} kl {time}. Ring oss på {phone} ved spørsmål.',
  booking_cancelled:
    'Din prøvetime {date} kl {time} hos Kristins Brudesalong er avbestilt. Depositum refunderes innen 5-7 virkedager.',
} as const

export const ROUTES = {
  home: '/',
  kolleksjoner: '/kolleksjoner',
  tjenester: '/tjenester',
  booking: '/booking',
  omtaler: '/omtaler',
  lookbook: '/lookbook',
  omOss: '/om-oss',
  kontakt: '/kontakt',
  faq: '/faq',
  blogg: '/blogg',
  personvern: '/personvern',
  vilkar: '/vilkar',
  cookies: '/cookies',
  admin: '/admin',
} as const

export const API_ROUTES = {
  services: '/api/services',
  availability: '/api/availability',
  book: '/api/book',
  payments: {
    stripe: '/api/payments/stripe',
    vipps: '/api/payments/vipps',
  },
  webhooks: {
    stripe: '/api/webhooks/stripe',
    vipps: '/api/webhooks/vipps',
  },
  appointments: '/api/appointments',
  reviews: '/api/reviews',
  contact: '/api/contact',
} as const

export const CURRENCY = {
  code: 'NOK',
  symbol: 'kr',
  locale: 'no-NO',
} as const

export const DATE_FORMATS = {
  display: 'dd. MMMM yyyy',
  displayWithTime: "dd. MMMM yyyy 'kl' HH:mm",
  api: 'yyyy-MM-dd',
  time: 'HH:mm',
} as const

export const PAGINATION = {
  defaultLimit: 12,
  maxLimit: 100,
} as const

export const IMAGE_SIZES = {
  thumbnail: { width: 300, height: 400 },
  card: { width: 600, height: 800 },
  hero: { width: 1200, height: 800 },
  gallery: { width: 800, height: 1200 },
} as const

export const SEO_DEFAULTS = {
  titleSeparator: ' | ',
  defaultTitle: SITE_CONFIG.name,
  defaultDescription: SITE_CONFIG.description,
  twitterHandle: '@kristinsbrudesalong',
} as const
