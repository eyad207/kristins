'use client'

import { useState, useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'
import { Button } from '@/components/ui/button'

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
)

interface PaymentFormProps {
  appointmentId: string
  amount: number
  onSuccess: () => void
  onError: (error: string) => void
}

function PaymentForm({
  appointmentId,
  amount,
  onSuccess,
  onError,
}: PaymentFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState(false)
  const [clientSecret, setClientSecret] = useState('')

  useEffect(() => {
    // Opprett payment intent når komponenten lastes
    const createPaymentIntent = async () => {
      try {
        const response = await fetch('/api/payment/stripe/create-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ appointmentId }),
        })

        const data = await response.json()

        if (data.success) {
          setClientSecret(data.clientSecret)
        } else {
          onError(data.error || 'Feil ved opprettelse av betaling')
        }
      } catch {
        onError('Nettverksfeil ved opprettelse av betaling')
      }
    }

    createPaymentIntent()
  }, [appointmentId, onError])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!stripe || !elements || !clientSecret) {
      return
    }

    setLoading(true)

    const cardElement = elements.getElement(CardElement)

    if (!cardElement) {
      onError('Kort element ikke funnet')
      setLoading(false)
      return
    }

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardElement,
        },
      }
    )

    if (error) {
      onError(error.message || 'Betalingsfeil')
    } else if (paymentIntent.status === 'succeeded') {
      onSuccess()
    }

    setLoading(false)
  }

  if (!clientSecret) {
    return (
      <div className='flex items-center justify-center p-8'>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-rose-600'></div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
      <div>
        <label className='block text-sm font-medium text-gray-700 mb-2'>
          Kortinformasjon
        </label>
        <div className='border border-gray-300 rounded-md p-3 bg-white'>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />
        </div>
      </div>

      <div className='bg-gray-50 p-4 rounded-lg'>
        <div className='flex justify-between items-center'>
          <span className='text-lg font-medium'>Totalt å betale:</span>
          <span className='text-xl font-bold text-rose-600'>
            {amount.toLocaleString('no-NO')} kr
          </span>
        </div>
      </div>

      <Button
        type='submit'
        disabled={!stripe || loading}
        className='w-full'
        size='lg'
      >
        {loading ? (
          <div className='flex items-center justify-center space-x-2'>
            <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white'></div>
            <span>Behandler betaling...</span>
          </div>
        ) : (
          `Betal ${amount.toLocaleString('no-NO')} kr`
        )}
      </Button>

      <div className='text-center text-sm text-gray-500'>
        <p>Sikker betaling med Stripe</p>
        <p>Vi lagrer ikke dine kortopplysninger</p>
      </div>
    </form>
  )
}

interface StripePaymentProps {
  appointmentId: string
  amount: number
  onSuccess: () => void
  onError: (error: string) => void
}

export default function StripePayment({
  appointmentId,
  amount,
  onSuccess,
  onError,
}: StripePaymentProps) {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm
        appointmentId={appointmentId}
        amount={amount}
        onSuccess={onSuccess}
        onError={onError}
      />
    </Elements>
  )
}
