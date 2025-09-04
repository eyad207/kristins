import { Resend } from 'resend'

if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY is not set in environment variables')
}

export const resend = new Resend(process.env.RESEND_API_KEY)

export const EMAIL_CONFIG = {
  from: 'Kristins Brudesalong <post@kristins-brudesalong.no>',
  replyTo: 'post@kristins-brudesalong.no',
  adminEmail: process.env.ADMIN_EMAIL || 'admin@kristins-brudesalong.no',
} as const

// Email templates
export const EMAIL_TEMPLATES = {
  booking_confirmation: {
    subject: 'Bekreftelse av prøvetime - Kristins Brudesalong',
    template: 'booking-confirmation',
  },
  booking_reminder: {
    subject: 'Påminnelse: Prøvetime i morgen - Kristins Brudesalong',
    template: 'booking-reminder',
  },
  booking_cancelled: {
    subject: 'Avbestilling av prøvetime - Kristins Brudesalong',
    template: 'booking-cancelled',
  },
  payment_confirmation: {
    subject: 'Betalingsbekreftelse - Kristins Brudesalong',
    template: 'payment-confirmation',
  },
} as const
