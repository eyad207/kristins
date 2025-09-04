import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set in environment variables')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
  typescript: true,
})

export const STRIPE_CONFIG = {
  currency: 'nok',
  payment_methods: ['card', 'klarna'],
  capture_method: 'automatic',
  confirmation_method: 'automatic',
} as const
